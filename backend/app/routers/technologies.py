# backend/app/routers/technologies.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.db.database import SessionLocal
from app.services.technology import TechnologyService  # Criaremos este a seguir
from app.schemas.technology import TechnologyRead, TechnologyUpdate
from app.routers.portfolio import get_db


router = APIRouter(prefix="/technologies", tags=["Technologies"])


@router.patch("/{tech_id}", response_model=TechnologyRead, summary="Atualizar uma tecnologia")
def update_technology(tech_id: int, tech_in: TechnologyUpdate, db: Session = Depends(get_db)):
    service = TechnologyService(db)
    updated_tech = service.update_technology(tech_id, tech_in)

    if not updated_tech:
        raise HTTPException(
            status_code=404, detail="Tecnologia não encontrada no banco de dados.")

    return updated_tech


@router.get("/", response_model=List[TechnologyRead], summary="Listar todas as tecnologias")
def list_technologies(db: Session = Depends(get_db)):
    service = TechnologyService(db)
    return service.list_technologies()
