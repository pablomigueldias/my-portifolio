from typing import List, Optional
from pydantic import HttpUrl,Field
from .base import SchemaBase,TimestampMixin
from .technology import TechnologyRead


class ChallengeBase(SchemaBase):
    description: str = Field(...,min_length=10)


class ChallengeCreate(ChallengeBase):
    pass

class ChallengeRead(ChallengeBase):
    id: int

class ProjectBase(SchemaBase):
    title: str = Field(...,min_length=5,max_length=100)
    category: str = Field(..., max_length=50)
    image_url: Optional[HttpUrl] = None
    github_link: Optional[HttpUrl] = None
    deploy_link: Optional[HttpUrl] = None
    short_description: str = Field(..., max_length=300)
    long_description: Optional[str] = None


class ProjectCreate(ProjectBase):
    technology_ids: List[int] = []
    challenges: List[ChallengeCreate] = []

class ProjectRead(ProjectBase,TimestampMixin):
    id: int
    technologies: List[TechnologyRead] = []
    challenges: List[ChallengeRead] = []

