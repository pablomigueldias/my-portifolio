from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status, UploadFile, File
from sqlalchemy.orm import Session
from pydantic import BaseModel, field_validator
import re
import unicodedata
from datetime import datetime
from zoneinfo import ZoneInfo


from app.db.database import get_db
from app.models.blog import Post
from app.schemas.post import PostCreate, PostUpdate, PostResponse
from app.routers.auth import get_current_user

from app.services.ai_generator import generate_blog_post, generate_from_file

router = APIRouter(
    prefix="/blog",
    tags=["Blog"]
)

class AIRequest(BaseModel):
    notes: str

    @field_validator('notes')
    @classmethod
    def sanitize_control_chars(cls, v: str) -> str:
        return "".join(ch for ch in v if ch >= " " or ch in "\n\r")


def slugify(value: str) -> str:
    value = unicodedata.normalize('NFKD', value).encode('ascii', 'ignore').decode('ascii')
    value = re.sub(r'[^\w\s-]', '', value.lower())
    return re.sub(r'[-\s]+', '-', value).strip('-')


@router.post("/generate")
def generate_draft_endpoint(request: AIRequest):
    try:
        content = generate_blog_post(request.notes)
        return content
    except Exception as e:
        print(f"Erro na IA: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/generate-from-file")
async def generate_from_file_endpoint(file: UploadFile = File(...)):
    try:
        content = await generate_from_file(file)
        return content
    except Exception as e:
        print(f"Erro no Arquivo: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/", response_model=List[PostResponse])
def read_posts(
    skip: int = 0,
    limit: int = 100,
    status: str = Query("published"),
    db: Session = Depends(get_db)
):
    query = db.query(Post)
    
    if status == "published":

        br_timezone = ZoneInfo("America/Sao_Paulo")
        now_in_brazil = datetime.now(br_timezone)
        

        limit_date = now_in_brazil.replace(tzinfo=None)

        query = query.filter(
            Post.published == True,
            (Post.published_at <= limit_date) | (Post.published_at == None)
        )
        
    return query.order_by(Post.create_at.desc()).offset(skip).limit(limit).all()

@router.get("/{slug}/", response_model=PostResponse)
def read_post(slug: str, db: Session = Depends(get_db)):
    post = db.query(Post).filter(Post.slug == slug).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post

@router.post("/", response_model=PostResponse, status_code=status.HTTP_201_CREATED)
def create_post(
    post: PostCreate, 
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    base_slug = slugify(post.title)
    slug = base_slug
    counter = 1
    
    # Garante slug único
    while db.query(Post).filter(Post.slug == slug).first():
        slug = f"{base_slug}-{counter}"
        counter += 1

    new_post = Post(
        **post.model_dump(exclude={"slug"}), 
        slug=slug
    )
    
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return new_post

@router.put("/{slug}/", response_model=PostResponse)
def update_post(
    slug: str, 
    post_update: PostUpdate, 
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    db_post = db.query(Post).filter(Post.slug == slug).first()
    if not db_post:
        raise HTTPException(status_code=404, detail="Post not found")

    update_data = post_update.model_dump(exclude_unset=True)
    
    for key, value in update_data.items():
        setattr(db_post, key, value)

    db.commit()
    db.refresh(db_post)
    return db_post

@router.delete("/{slug}/", status_code=status.HTTP_204_NO_CONTENT)
def delete_post(
    slug: str, 
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    db_post = db.query(Post).filter(Post.slug == slug).first()
    if not db_post:
        raise HTTPException(status_code=404, detail="Post not found")

    db.delete(db_post)
    db.commit()
    return None