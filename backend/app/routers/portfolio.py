# backend/app/routers/portfolio.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.db.database import SessionLocal
from app.services.portfolio import PortfolioService
from app.schemas.project import ProjectRead, ProjectUpdate
from app.schemas.technology import TechnologyRead

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/projects", response_model=List[ProjectRead], summary="Listar todos os projetos")
def get_projects(db: Session = Depends(get_db)):

    service = PortfolioService(db)
    return service.list_projects()


@router.get("/technologies", response_model=List[TechnologyRead], summary="Listar tecnologias")
def get_technologies(db: Session = Depends(get_db)):

    service = PortfolioService(db)
    return service.list_technologies()

@router.patch("/projects/{project_id}", response_model=ProjectRead, summary="Atualizar um projeto")
def update_project(project_id: int, project_in: ProjectUpdate, db: Session = Depends(get_db)):

    service = PortfolioService(db)
    return service.update_project(project_id, project_in)
