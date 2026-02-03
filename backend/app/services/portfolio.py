from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from fastapi import HTTPException, status
from typing import List


from app.models.portfolio import Project, Technology, Challenge, project_tech_link
from app.schemas.project import ProjectCreate
from app.schemas.technology import TechnologyCreate


class PortfolioService:

    def __init__(self, db: Session):
        self.db = db

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

    def list_technologies(self) -> List[Technology]:
        return self.db.query(Technology).all()

    def create_project(self, project_in: ProjectCreate) -> Project:

        db_project = Project(
            title=project_in.title,
            category=project_in.category,
            image_url=str(
                project_in.image_url) if project_in.image_url else None,
            github_link=str(
                project_in.github_link) if project_in.github_link else None,
            deploy_link=str(
                project_in.deploy_link) if project_in.deploy_link else None,
            short_description=project_in.short_description,
            long_description=project_in.long_description
        )
        self.db.add(db_project)

        try:
            self.db.flush()

            if project_in.technology_ids:
                techs = self.db.query(Technology).filter(
                    Technology.id.in_(project_in.technology_ids)).all()
                db_project.technologies = techs

            for challenge_in in project_in.challenges:
                db_challenge = Challenge(
                    description=challenge_in.description,
                    project_id=db_project.id
                )
                self.db.add(db_challenge)

            self.db.commit()
            self.db.refresh(db_project)
            return db_project

        except IntegrityError as e:
            self.db.rollback()
            raise HTTPException(
                status_code=400, detail=f"Erro de integridade: {str(e)}")
        except Exception as e:
            self.db.rollback()
            raise HTTPException(
                status_code=500, detail=f"Erro ao criar projeto: {str(e)}")

    def list_projects(self) -> List[Project]:
        return self.db.query(Project).all()
