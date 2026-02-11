from sqlalchemy.orm import Session
from app.models.portfolio import Technology
from app.schemas.technology import TechnologyCreate, TechnologyUpdate

class TechnologyService:
    def __init__(self, db: Session):
        self.db = db

    def list_technologies(self):
        return self.db.query(Technology).all()

    def create_technology(self, tech_in: TechnologyCreate):
        tech = Technology(**tech_in.model_dump())
        self.db.add(tech)
        self.db.commit()
        self.db.refresh(tech)
        return tech

    def update_technology(self, tech_id: int, tech_in: TechnologyUpdate):
        tech = self.db.query(Technology).filter(Technology.id == tech_id).first()
        if not tech:
            return None
        
        update_data = tech_in.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(tech, key, value)
            
        self.db.commit()
        self.db.refresh(tech)
        return tech

    def delete_technology(self, tech_id: int) -> bool:
        tech = self.db.query(Technology).filter(Technology.id == tech_id).first()
        if not tech:
            return False
        self.db.delete(tech)
        self.db.commit()
        return True