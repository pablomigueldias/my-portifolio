from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.routers.portfolio import get_db
from app.schemas.post import PostCreate, PostResponse,PostUpdate
from app.services.blog import BlogService

router = APIRouter(prefix="/blog", tags=["Blog"])

@router.post("/", response_model=PostResponse, status_code=status.HTTP_201_CREATED)
def create_new_post(post: PostCreate, db: Session = Depends(get_db)):
    return BlogService.create_post(db, post)

@router.get("/", response_model=List[PostResponse])
def read_posts(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return BlogService.get_all_posts(db, skip=skip, limit=limit)

@router.get("/{slug}", response_model=PostResponse)
def read_post_by_slug(slug: str, db: Session = Depends(get_db)):
    db_post = BlogService.get_post_by_slug(db, slug)
    if db_post is None:
        raise HTTPException(status_code=404, detail="Artigo não encontrado")
    return db_post

from fastapi import HTTPException # Adicione no topo se ainda não tiver

@router.put("/{slug}", response_model=PostResponse)
def update_post(slug: str, post_in: PostUpdate, db: Session = Depends(get_db)):
    """Atualiza um post existente buscando pelo Slug"""
    updated_post = BlogService.update_post(db, slug, post_in)
    
    if not updated_post:
        raise HTTPException(status_code=404, detail="Artigo não encontrado no banco de dados.")
        
    return updated_post