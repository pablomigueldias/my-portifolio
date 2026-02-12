from typing import List
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from sqlalchemy.orm import Session

# Imports Internos
from app.db.database import get_db
from app.models.blog import Post
from app.schemas.post import PostResponse, PostUpdate, AIRequest
from app.services.blog import BlogService
from app.services.ai_generator import AIBlogService
from app.core.security import validate_admin

router = APIRouter(prefix="/blog", tags=["Blog"])


@router.get("/", response_model=List[PostResponse], summary="Listar posts publicados")
def list_public_posts(
    skip: int = 0,
    limit: int = 10,
    db: Session = Depends(get_db)
):
    posts = db.query(Post)\
        .filter(Post.published == True)\
        .order_by(Post.create_at.desc())\
        .offset(skip)\
        .limit(limit)\
        .all()
    return posts


@router.get("/{slug}/", response_model=PostResponse, summary="Ler post completo")
def read_post_by_slug(slug: str, db: Session = Depends(get_db)):
    db_post = BlogService.get_post_by_slug(db, slug)

    if db_post is None:
        raise HTTPException(status_code=404, detail="Artigo não encontrado")

    if not db_post.published:
        pass

    return db_post


@router.put("/{slug}/", response_model=PostResponse, dependencies=[Depends(validate_admin)])
def update_post(slug: str, post_in: PostUpdate, db: Session = Depends(get_db)):
    updated_post = BlogService.update_post(db, slug, post_in)
    if not updated_post:
        raise HTTPException(status_code=404, detail="Não encontrado.")
    return updated_post


@router.delete("/{slug}/", status_code=status.HTTP_204_NO_CONTENT, dependencies=[Depends(validate_admin)])
def delete_post(slug: str, db: Session = Depends(get_db)):
    success = BlogService.delete_post(db, slug)
    if not success:
        raise HTTPException(
            status_code=404, detail="Artigo não encontrado ou já excluído.")
    return None 


@router.post("/generate", dependencies=[Depends(validate_admin)])
def generate_draft(request: AIRequest):
    return AIBlogService.generate_draft(request.notes)


@router.post("/generate-from-file", dependencies=[Depends(validate_admin)])
async def generate_from_md_file(file: UploadFile = File(...)):
    content = await file.read()
    try:
        notes_text = content.decode("utf-8")
    except UnicodeDecodeError:
        notes_text = content.decode("latin-1")

    return AIBlogService.generate_draft(notes_text)
