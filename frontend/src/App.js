import "@/App.css";
import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import WebHelmLanding from "@/pages/WebHelmLanding";

// /work is its own route — code-split so it doesn't weigh down the landing bundle.
const OurWork = lazy(() => import("@/pages/OurWork"));

/**
 * Force every route change to land at the top of the page (unless a hash
 * anchor is present). Without this, React Router preserves the previous
 * scroll position — so clicking "Explore all projects" from mid-landing
 * would open /work already mid-hero instead of showing the clean
 * boat-in-window opening state.
 */
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) return; // let in-page anchors handle their own scroll
    // Disable any browser scroll restoration for this nav, then jump to 0.
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<div className="min-h-screen bg-[#0b0b0b]" />}>
          <Routes>
            <Route path="/" element={<WebHelmLanding />} />
            <Route path="/work" element={<OurWork />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;
