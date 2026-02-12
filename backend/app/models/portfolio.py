from typing import List, Optional
from sqlalchemy import String, Text, ForeignKey, Table, Column, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .base import Base

project_tech_link = Table(
    'project_tech_link',
    Base.metadata,
    Column('project_id', Integer, ForeignKey('projects.id'), primary_key=True),
    Column('technology_id', Integer, ForeignKey(
        'technologies.id'), primary_key=True),
)


class Technology(Base):
    __tablename__ = 'technologies'

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(50), unique=True, index=True)
    icon_key: Mapped[Optional[str]] = mapped_column(String(50))
    color_class: Mapped[Optional[str]] = mapped_column(String(100))

    projects: Mapped[List["Project"]] = relationship(
        secondary=project_tech_link, back_populates="technologies"
    )


class Challenge(Base):
    __tablename__ = 'challenges'

    id: Mapped[int] = mapped_column(primary_key=True)
    description: Mapped[str] = mapped_column(Text)

    project_id: Mapped[int] = mapped_column(ForeignKey('projects.id'))

    project: Mapped["Project"] = relationship(back_populates="challenges")


class Project(Base):
    __tablename__ = 'projects'

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(100), index=True)
    category: Mapped[str] = mapped_column(String(50))

    image_url: Mapped[Optional[str]] = mapped_column(String(255))
    github_link: Mapped[Optional[str]] = mapped_column(String(255))
    deploy_link: Mapped[Optional[str]] = mapped_column(String(255))

    short_description: Mapped[str] = mapped_column(Text)
    long_description: Mapped[Optional[str]] = mapped_column(Text)

    challenges: Mapped[List['Challenge']] = relationship(
        back_populates='project', cascade='all, delete-orphan')

    technologies: Mapped[List['Technology']] = relationship(
        secondary=project_tech_link, back_populates='projects')
