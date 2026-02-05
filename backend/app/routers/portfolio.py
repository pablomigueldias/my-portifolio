from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.core.security import validate_admin
from app.db.database import SessionLocal
from app.services.portfolio import PortfolioService
from app.schemas.project import ProjectRead, ProjectUpdate
from app.schemas.technology import TechnologyRead

router = APIRouter(prefix="/projects", tags=["Portfolio"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/", response_model=List[ProjectRead])
def get_projects(db: Session = Depends(get_db)):
    service = PortfolioService(db)
    return service.list_projects()

@router.patch("/{project_id}/", response_model=ProjectRead, dependencies=[Depends(validate_admin)])
def update_project(project_id: int, project_in: ProjectUpdate, db: Session = Depends(get_db)):
    service = PortfolioService(db)
    return service.update_project(project_id, project_in)
