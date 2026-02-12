# backend/app/models/blog.py
from typing import Optional
from datetime import datetime
from sqlalchemy import String, Text, Boolean, DateTime
from sqlalchemy.orm import Mapped, mapped_column
from .base import Base

class Post(Base):

    __tablename__ = "posts" 
    # ------------------------------------

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    title: Mapped[str] = mapped_column(String(200))
    slug: Mapped[str] = mapped_column(String(250), unique=True, index=True)
    content: Mapped[str] = mapped_column(Text)
    excerpt: Mapped[Optional[str]] = mapped_column(String(300))
    category: Mapped[str] = mapped_column(String(50), default="Geral")
    author: Mapped[str] = mapped_column(String(100), default="Pablo")
    read_time: Mapped[str] = mapped_column(String(20), default="5 min")
    image_url: Mapped[Optional[str]] = mapped_column(String(500))
    
    published: Mapped[bool] = mapped_column(Boolean, default=False)
    published_at: Mapped[Optional[datetime]] = mapped_column(DateTime, nullable=True)
