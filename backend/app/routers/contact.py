from fastapi import APIRouter, Depends, Request, HTTPException, status
from sqlalchemy.orm import Session
from app.db.database import SessionLocal
from app.models.contact import Contact
from app.schemas.contact import ContactCreate, ContactRead
from app.core.limiter import limiter

router = APIRouter(prefix="/contact", tags=["Contato"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=ContactRead, status_code=status.HTTP_201_CREATED)
@limiter.limit("5/minute")
def send_message(
    contact_in: ContactCreate, 
    request: Request, 
    db: Session = Depends(get_db)
):
    client_host = request.client.host if request.client else "Unknown"
    
    new_message = Contact(
        name=contact_in.name,
        email=contact_in.email,
        message=contact_in.message,
        ip_address=client_host
    )
    
    db.add(new_message)
    db.commit()
    db.refresh(new_message)
    
    return new_message