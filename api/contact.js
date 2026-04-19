// Vercel serverless function — replaces the Python FastAPI /api/contact endpoint.
// Deployed automatically by Vercel at https://webhelm.co/api/contact
//
// Required env vars (set in Vercel dashboard → Settings → Environment Variables):
//   RESEND_API_KEY   – from resend.com (free tier: 3k emails/month)
//   RECIPIENT_EMAIL  – where form submissions go (e.g. contact@webhelm.co)
//   SENDER_EMAIL     – verified sender (defaults to onboarding@resend.dev for testing)
//
// No database — submissions are emailed directly. If you later want a DB,
// swap in Vercel KV, Vercel Postgres, or Supabase; the surface stays identical.

const ALLOWED_ORIGINS = [
  "https://webhelm.co",
  "https://www.webhelm.co",
  "http://localhost:3000",
];

function setCors(req, res) {
  const origin = req.headers.origin;
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Vary", "Origin");
}

function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export default async function handler(req, res) {
  setCors(req, res);

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const {
    name = "",
    email = "",
    businessName = "",
    projectType = "",
    budget = "",
    message = "",
  } = req.body || {};

  // Basic validation — bounce obvious garbage without burning Resend quota.
  if (!name.trim() || !email.trim() || !message.trim()) {
    return res
      .status(400)
      .json({ success: false, message: "Name, email, and message are required." });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ success: false, message: "Invalid email address." });
  }
  if (message.length > 5000) {
    return res.status(400).json({ success: false, message: "Message too long." });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.RECIPIENT_EMAIL;
  const sender = process.env.SENDER_EMAIL || "onboarding@resend.dev";

  // If Resend isn't configured we still return 200 so the form doesn't break
  // during initial deploy — but we log so Teco can spot it in Vercel logs.
  if (!apiKey || !recipient) {
    console.warn(
      "[contact] RESEND_API_KEY or RECIPIENT_EMAIL missing — submission dropped.",
      { name, email, businessName }
    );
    return res.status(200).json({
      success: true,
      message: "Thanks — we'll be in touch soon.",
    });
  }

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
      <h2 style="color:#007bff;">New WebHelm enquiry</h2>
      <div style="background:#f5f5f5;padding:20px;border-radius:8px;">
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Business:</strong> ${escapeHtml(businessName)}</p>
        <p><strong>Project type:</strong> ${escapeHtml(projectType)}</p>
        <p><strong>Budget:</strong> ${escapeHtml(budget)}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space:pre-wrap;">${escapeHtml(message)}</p>
      </div>
      <p style="color:#666;font-size:12px;margin-top:20px;">
        Submitted ${new Date().toISOString()}
      </p>
    </div>
  `;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: sender,
        to: [recipient],
        reply_to: email,
        subject: `WebHelm: new enquiry from ${name}`,
        html,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("[contact] Resend failed:", response.status, errText);
      return res
        .status(500)
        .json({ success: false, message: "Failed to send message." });
    }

    return res.status(200).json({
      success: true,
      message: "Thanks — we'll respond within 24 hours.",
    });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Failed to send message." });
  }
}
