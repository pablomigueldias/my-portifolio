from sqlalchemy import Column, Integer, String, Text, Boolean
from .base import Base

class Post(Base):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    slug = Column(String(250), unique=True, index=True, nullable=False)
    content = Column(Text, nullable=False)
    excerpt = Column(String(300))
    category = Column(String(50), default="Geral")
    author = Column(String(100), default="Pablo")
    read_time = Column(String(20), default="5 min")
    image_url = Column(String(500))
    published = Column(Boolean, default=False)
