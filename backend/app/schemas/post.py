from pydantic import BaseModel, Field, ConfigDict
from datetime import datetime
from typing import Optional,List

class PostBase(BaseModel):
    title: str = Field(..., min_length=5, max_length=200)
    content: str
    excerpt: Optional[str] = None
    category: str = "Geral"
    author: str = "Pablo"
    read_time: str = "5 min"
    image_url: Optional[str] = None
    published: bool = False

class PostCreate(PostBase):
    pass

class PostResponse(PostBase):
    id: int
    slug: str
    create_at: datetime

    model_config = ConfigDict(from_attributes=True)

class PostUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    excerpt: Optional[str] = None
    category: Optional[str] = None
    author: Optional[str] = None
    read_time: Optional[str] = None
    image_url: Optional[str] = None
    published: Optional[bool] = None
    technologies: Optional[List[str]] = None