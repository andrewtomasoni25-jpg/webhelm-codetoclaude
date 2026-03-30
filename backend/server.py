from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import asyncio
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Resend setup (optional - only if API key is provided)
RESEND_API_KEY = os.environ.get('RESEND_API_KEY')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
RECIPIENT_EMAIL = os.environ.get('RECIPIENT_EMAIL', '')

if RESEND_API_KEY:
    import resend
    resend.api_key = RESEND_API_KEY

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Define Models
class ContactSubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    businessName: str
    projectType: str
    budget: str
    message: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactSubmissionCreate(BaseModel):
    name: str
    email: EmailStr
    businessName: str
    projectType: str = ""
    budget: str = ""
    message: str

class ContactResponse(BaseModel):
    success: bool
    message: str
    submission_id: Optional[str] = None

# Routes
@api_router.get("/")
async def root():
    return {"message": "WebHelm API is running"}

@api_router.post("/contact", response_model=ContactResponse)
async def submit_contact(submission: ContactSubmissionCreate):
    """Handle contact form submission"""
    try:
        # Create submission object
        contact_obj = ContactSubmission(**submission.model_dump())
        
        # Prepare document for MongoDB
        doc = contact_obj.model_dump()
        doc['timestamp'] = doc['timestamp'].isoformat()
        
        # Save to database
        await db.contact_submissions.insert_one(doc)
        logger.info(f"Contact submission saved: {contact_obj.id}")
        
        # Send email notification if Resend is configured
        if RESEND_API_KEY and RECIPIENT_EMAIL:
            try:
                html_content = f"""
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #007bff;">New Contact Form Submission</h2>
                    <div style="background: #f5f5f5; padding: 20px; border-radius: 8px;">
                        <p><strong>Name:</strong> {contact_obj.name}</p>
                        <p><strong>Email:</strong> {contact_obj.email}</p>
                        <p><strong>Business:</strong> {contact_obj.businessName}</p>
                        <p><strong>Project Type:</strong> {contact_obj.projectType}</p>
                        <p><strong>Budget:</strong> {contact_obj.budget}</p>
                        <p><strong>Message:</strong></p>
                        <p style="white-space: pre-wrap;">{contact_obj.message}</p>
                    </div>
                    <p style="color: #666; font-size: 12px; margin-top: 20px;">
                        Submitted at: {contact_obj.timestamp.isoformat()}
                    </p>
                </div>
                """
                
                params = {
                    "from": SENDER_EMAIL,
                    "to": [RECIPIENT_EMAIL],
                    "subject": f"WebHelm: New inquiry from {contact_obj.name}",
                    "html": html_content
                }
                
                await asyncio.to_thread(resend.Emails.send, params)
                logger.info(f"Email notification sent for submission: {contact_obj.id}")
            except Exception as e:
                logger.error(f"Failed to send email notification: {str(e)}")
                # Don't fail the request if email fails
        
        return ContactResponse(
            success=True,
            message="Thank you for your message! We'll respond within 24 hours.",
            submission_id=contact_obj.id
        )
        
    except Exception as e:
        logger.error(f"Error processing contact submission: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to process submission")

@api_router.get("/contact/submissions", response_model=List[ContactSubmission])
async def get_contact_submissions():
    """Get all contact submissions (for admin purposes)"""
    submissions = await db.contact_submissions.find({}, {"_id": 0}).to_list(100)
    
    for sub in submissions:
        if isinstance(sub.get('timestamp'), str):
            sub['timestamp'] = datetime.fromisoformat(sub['timestamp'])
    
    return submissions

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
