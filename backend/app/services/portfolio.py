from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from fastapi import HTTPException, status
from typing import List, Optional

from app.models.portfolio import Project, Technology, Challenge
from app.schemas.project import ProjectCreate, ProjectUpdate


class PortfolioService:

    def __init__(self, db: Session):
        self.db = db

    def list_projects(self) -> List[Project]:
        return self.db.query(Project).all()

    def list_technologies(self) -> List[Technology]:
        return self.db.query(Technology).order_by(Technology.id).all()

    def get_project_by_id(self, project_id: int) -> Optional[Project]:
        return self.db.query(Project).filter(Project.id == project_id).first()

    def create_project(self, project_in: ProjectCreate) -> Project:
        try:
            project_data = project_in.model_dump(
                exclude={"technology_ids", "challenges"})

            for key, value in project_data.items():
                if value is not None and not isinstance(value, (str, int, float, bool)):
                    project_data[key] = str(value)

            db_project = Project(**project_data)

            if project_in.technology_ids:
                techs = self.db.query(Technology).filter(
                    Technology.id.in_(project_in.technology_ids)
                ).all()
                db_project.technologies = techs

            self.db.add(db_project)
            self.db.flush()

            if project_in.challenges:
                for challenge_data in project_in.challenges:
                    new_challenge = Challenge(
                        **challenge_data.model_dump(),
                        project_id=db_project.id
                    )
                    self.db.add(new_challenge)

            self.db.commit()
            self.db.refresh(db_project)
            return db_project

        except IntegrityError as e:
            self.db.rollback()
            raise HTTPException(
                status_code=400, detail=f"Erro de integridade: {str(e)}")
        except Exception as e:
            self.db.rollback()
            print(f"Erro detalhado: {e}")
            raise HTTPException(
                status_code=500, detail="Erro interno ao criar projeto.")

    # --- UPDATE ---
    def update_project(self, project_id: int, project_in: ProjectUpdate):
        db_project = self.get_project_by_id(project_id)

        if not db_project:
            return None

        update_data = project_in.model_dump(exclude_unset=True)

        if "technology_ids" in update_data:
            tech_ids = update_data.pop("technology_ids")
            if tech_ids:
                techs = self.db.query(Technology).filter(
                    Technology.id.in_(tech_ids)).all()
                db_project.technologies = techs
            else:
                db_project.technologies = []

        if "challenges" in update_data:
            del update_data["challenges"]

        for field, value in update_data.items():
            if value is not None and not isinstance(value, (str, int, float, bool, list)):
                value = str(value)
            setattr(db_project, field, value)

        try:
            self.db.commit()
            self.db.refresh(db_project)
            return db_project
        except Exception as e:
            self.db.rollback()
            raise HTTPException(
                status_code=500, detail=f"Erro ao atualizar: {str(e)}")

    def delete_project(self, project_id: int) -> bool:
        db_project = self.get_project_by_id(project_id)
        if not db_project:
            return False

        self.db.delete(db_project)
        self.db.commit()
        return True

    def get_or_create_technology(self, tech_name: str) -> Technology:
        tech = self.db.query(Technology).filter(
            Technology.name == tech_name).first()
        if not tech:
            tech = Technology(
                name=tech_name, icon_key=f"Fa{tech_name.capitalize()}")
            self.db.add(tech)
            self.db.commit()
            self.db.refresh(tech)
        return tech
