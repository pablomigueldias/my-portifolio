from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.core.security import validate_admin
from app.db.database import get_db
from app.services.portfolio import PortfolioService
from app.schemas.project import ProjectRead, ProjectUpdate, ProjectCreate

router = APIRouter(prefix="/projects", tags=["Portfolio"])

@router.post("/", response_model=ProjectRead, status_code=status.HTTP_201_CREATED, dependencies=[Depends(validate_admin)])
def create_project(project_in: ProjectCreate, db: Session = Depends(get_db)):
    service = PortfolioService(db)
    return service.create_project(project_in)

@router.get("/", response_model=List[ProjectRead])
def get_projects(db: Session = Depends(get_db)):
    service = PortfolioService(db)
    return service.list_projects()

@router.patch("/{project_id}/", response_model=ProjectRead, dependencies=[Depends(validate_admin)])
def update_project(project_id: int, project_in: ProjectUpdate, db: Session = Depends(get_db)):
    service = PortfolioService(db)
    project = service.update_project(project_id, project_in)
    if not project:
        raise HTTPException(status_code=404, detail="Projeto não encontrado")
    return project

@router.delete("/{project_id}/", status_code=status.HTTP_204_NO_CONTENT, dependencies=[Depends(validate_admin)])
def delete_project(project_id: int, db: Session = Depends(get_db)):
    service = PortfolioService(db)
    success = service.delete_project(project_id)
    
    if not success:
        raise HTTPException(status_code=404, detail="Projeto não encontrado")
    
    return None # Retorna vazio (204)