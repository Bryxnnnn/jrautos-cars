from fastapi import FastAPI, APIRouter, HTTPException, Depends, Header, UploadFile, File
from fastapi.staticfiles import StaticFiles
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
import hashlib
import aiofiles

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Create uploads directory
UPLOADS_DIR = ROOT_DIR / 'uploads'
UPLOADS_DIR.mkdir(exist_ok=True)

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Resend configuration
RESEND_API_KEY = os.environ.get('RESEND_API_KEY')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
RECIPIENT_EMAIL = os.environ.get('RECIPIENT_EMAIL', 'alan.can85@gmail.com')

# Admin password (hashed)
ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', 'jrautos2024')

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
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: Optional[str] = None
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactMessageCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    message: str

# Vehicle Models
class VehicleImage(BaseModel):
    url: str
    order: int = 0

class Vehicle(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    year: str
    brand: str
    bodyType: str
    engine: str
    fuel: str
    transmission: str
    description_es: str
    description_en: str
    images: List[str] = []
    cover_image: str = ""
    available: bool = True
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class VehicleCreate(BaseModel):
    name: str
    year: str
    brand: str
    bodyType: str
    engine: str
    fuel: str
    transmission: str
    description_es: str
    description_en: str
    images: List[str] = []
    cover_image: str = ""

class VehicleUpdate(BaseModel):
    name: Optional[str] = None
    year: Optional[str] = None
    brand: Optional[str] = None
    bodyType: Optional[str] = None
    engine: Optional[str] = None
    fuel: Optional[str] = None
    transmission: Optional[str] = None
    description_es: Optional[str] = None
    description_en: Optional[str] = None
    images: Optional[List[str]] = None
    cover_image: Optional[str] = None
    available: Optional[bool] = None

class AdminLogin(BaseModel):
    password: str

class AdminToken(BaseModel):
    token: str
    message: str


# Admin authentication
def verify_admin_token(authorization: str = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="No authorization header")
    
    try:
        scheme, token = authorization.split()
        if scheme.lower() != "bearer":
            raise HTTPException(status_code=401, detail="Invalid authentication scheme")
        
        # Simple token verification - token is hash of password
        expected_token = hashlib.sha256(ADMIN_PASSWORD.encode()).hexdigest()
        if token != expected_token:
            raise HTTPException(status_code=401, detail="Invalid token")
        
        return True
    except ValueError:
        raise HTTPException(status_code=401, detail="Invalid authorization header")


# Routes
@api_router.get("/")
async def root():
    return {"message": "J.R Autos API - Welcome!"}

@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "service": "J.R Autos API"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks


# Contact Form API
@api_router.post("/contact", response_model=ContactMessage)
async def submit_contact(input: ContactMessageCreate):
    """Submit a contact form message"""
    logger.info(f"Received contact form submission from: {input.name} ({input.email})")
    
    contact_dict = input.model_dump()
    contact_obj = ContactMessage(**contact_dict)
    
    doc = contact_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    # Store in database
    try:
        result = await db.contact_messages.insert_one(doc)
        logger.info(f"Contact message saved to database - ID: {contact_obj.id}, MongoDB ID: {result.inserted_id}")
    except Exception as e:
        logger.error(f"Failed to save contact message to database: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to save message to database")
    
    # Try to send email if Resend is configured
    if RESEND_API_KEY:
        try:
            import resend
            resend.api_key = RESEND_API_KEY
            
            html_content = f"""
            <html>
            <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #333;">Nuevo Mensaje de Contacto - J.R Autos</h2>
                <hr style="border: 1px solid #ddd;">
                <p><strong>Nombre:</strong> {input.name}</p>
                <p><strong>Email:</strong> {input.email}</p>
                <p><strong>Teléfono:</strong> {input.phone or 'No proporcionado'}</p>
                <hr style="border: 1px solid #ddd;">
                <p><strong>Mensaje:</strong></p>
                <p style="background: #f5f5f5; padding: 15px; border-radius: 5px;">{input.message}</p>
                <hr style="border: 1px solid #ddd;">
                <p style="color: #666; font-size: 12px;">Este mensaje fue enviado desde el formulario de contacto de J.R Autos</p>
            </body>
            </html>
            """
            
            params = {
                "from": SENDER_EMAIL,
                "to": [RECIPIENT_EMAIL],
                "subject": f"Nuevo Contacto: {input.name}",
                "html": html_content
            }
            
            # Run sync SDK in thread to keep FastAPI non-blocking
            await asyncio.to_thread(resend.Emails.send, params)
            logger.info(f"Email sent successfully for contact from {input.email}")
        except Exception as e:
            # Log error but don't fail the request - message is still saved
            logger.error(f"Failed to send email: {str(e)}")
    else:
        logger.info("Resend not configured - contact message saved to database only")
    
    return contact_obj


@api_router.get("/contact", response_model=List[ContactMessage])
async def get_contact_messages():
    """Get all contact messages (for admin use)"""
    messages = await db.contact_messages.find({}, {"_id": 0}).to_list(1000)
    
    for msg in messages:
        if isinstance(msg.get('created_at'), str):
            msg['created_at'] = datetime.fromisoformat(msg['created_at'])
    
    return messages


# ==================== PUBLIC VEHICLE API ====================

@api_router.get("/vehicles", response_model=List[Vehicle])
async def get_vehicles():
    """Get all available vehicles (public)"""
    vehicles = await db.vehicles.find({"available": True}, {"_id": 0}).sort("created_at", -1).to_list(100)
    
    for vehicle in vehicles:
        if isinstance(vehicle.get('created_at'), str):
            vehicle['created_at'] = datetime.fromisoformat(vehicle['created_at'])
        if isinstance(vehicle.get('updated_at'), str):
            vehicle['updated_at'] = datetime.fromisoformat(vehicle['updated_at'])
    
    return vehicles

@api_router.get("/vehicles/{vehicle_id}", response_model=Vehicle)
async def get_vehicle(vehicle_id: str):
    """Get a single vehicle by ID (public)"""
    vehicle = await db.vehicles.find_one({"id": vehicle_id, "available": True}, {"_id": 0})
    
    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    
    if isinstance(vehicle.get('created_at'), str):
        vehicle['created_at'] = datetime.fromisoformat(vehicle['created_at'])
    if isinstance(vehicle.get('updated_at'), str):
        vehicle['updated_at'] = datetime.fromisoformat(vehicle['updated_at'])
    
    return vehicle


# ==================== ADMIN API ====================

@api_router.post("/admin/login", response_model=AdminToken)
async def admin_login(login: AdminLogin):
    """Admin login - returns token if password matches"""
    if login.password == ADMIN_PASSWORD:
        token = hashlib.sha256(ADMIN_PASSWORD.encode()).hexdigest()
        return AdminToken(token=token, message="Login successful")
    else:
        raise HTTPException(status_code=401, detail="Invalid password")

@api_router.get("/admin/vehicles", response_model=List[Vehicle])
async def admin_get_vehicles(authorized: bool = Depends(verify_admin_token)):
    """Get all vehicles including unavailable (admin only)"""
    vehicles = await db.vehicles.find({}, {"_id": 0}).sort("created_at", -1).to_list(100)
    
    for vehicle in vehicles:
        if isinstance(vehicle.get('created_at'), str):
            vehicle['created_at'] = datetime.fromisoformat(vehicle['created_at'])
        if isinstance(vehicle.get('updated_at'), str):
            vehicle['updated_at'] = datetime.fromisoformat(vehicle['updated_at'])
    
    return vehicles

@api_router.post("/admin/vehicles", response_model=Vehicle)
async def admin_create_vehicle(vehicle_input: VehicleCreate, authorized: bool = Depends(verify_admin_token)):
    """Create a new vehicle (admin only)"""
    vehicle_dict = vehicle_input.model_dump()
    vehicle_obj = Vehicle(**vehicle_dict)
    
    # Set cover image to first image if not specified
    if not vehicle_obj.cover_image and vehicle_obj.images:
        vehicle_obj.cover_image = vehicle_obj.images[0]
    
    doc = vehicle_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    doc['updated_at'] = doc['updated_at'].isoformat()
    
    await db.vehicles.insert_one(doc)
    logger.info(f"Vehicle created: {vehicle_obj.name} (ID: {vehicle_obj.id})")
    
    return vehicle_obj

@api_router.put("/admin/vehicles/{vehicle_id}", response_model=Vehicle)
async def admin_update_vehicle(vehicle_id: str, vehicle_update: VehicleUpdate, authorized: bool = Depends(verify_admin_token)):
    """Update a vehicle (admin only)"""
    # Get existing vehicle
    existing = await db.vehicles.find_one({"id": vehicle_id}, {"_id": 0})
    if not existing:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    
    # Update only provided fields
    update_data = {k: v for k, v in vehicle_update.model_dump().items() if v is not None}
    update_data['updated_at'] = datetime.now(timezone.utc).isoformat()
    
    await db.vehicles.update_one({"id": vehicle_id}, {"$set": update_data})
    
    # Return updated vehicle
    updated = await db.vehicles.find_one({"id": vehicle_id}, {"_id": 0})
    
    if isinstance(updated.get('created_at'), str):
        updated['created_at'] = datetime.fromisoformat(updated['created_at'])
    if isinstance(updated.get('updated_at'), str):
        updated['updated_at'] = datetime.fromisoformat(updated['updated_at'])
    
    logger.info(f"Vehicle updated: {updated['name']} (ID: {vehicle_id})")
    return updated

@api_router.delete("/admin/vehicles/{vehicle_id}")
async def admin_delete_vehicle(vehicle_id: str, authorized: bool = Depends(verify_admin_token)):
    """Delete a vehicle (admin only)"""
    result = await db.vehicles.delete_one({"id": vehicle_id})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    
    logger.info(f"Vehicle deleted: {vehicle_id}")
    return {"message": "Vehicle deleted successfully"}

@api_router.get("/admin/contacts", response_model=List[ContactMessage])
async def admin_get_contacts(authorized: bool = Depends(verify_admin_token)):
    """Get all contact messages (admin only)"""
    messages = await db.contact_messages.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    
    for msg in messages:
        if isinstance(msg.get('created_at'), str):
            msg['created_at'] = datetime.fromisoformat(msg['created_at'])
    
    return messages


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
