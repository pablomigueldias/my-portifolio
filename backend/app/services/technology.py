# backend/app/services/technology.py
from sqlalchemy.orm import Session
# Certifique-se de que o modelo está importado corretamente
from app.models.portfolio import Technology
from app.schemas.technology import TechnologyUpdate


class TechnologyService:
    def __init__(self, db: Session):
        self.db = db

    def list_technologies(self):
        return self.db.query(Technology).all()

    def update_technology(self, tech_id: int, tech_in: TechnologyUpdate):
        db_tech = self.db.query(Technology).filter(
            Technology.id == tech_id).first()

        if not db_tech:
            return None

        # Extrai apenas os campos que foram enviados no JSON (exclude_unset=True)
        update_data = tech_in.model_dump(exclude_unset=True)

        for field, value in update_data.items():
            setattr(db_tech, field, value)

        self.db.commit()
        self.db.refresh(db_tech)
        return db_tech
