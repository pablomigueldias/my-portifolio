from pydantic import BaseModel, EmailStr, Field, ConfigDict
from datetime import datetime
from typing import Optional

class ContactCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    message: str = Field(..., min_length=10, max_length=2000)

class ContactRead(ContactCreate):
    id: int
    create_at: datetime
    is_read: bool

    model_config = ConfigDict(from_attributes=True)