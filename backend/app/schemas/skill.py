from pydantic import Field
from .base import SchemaBase, TimestampMixin


class SkillBase(SchemaBase):
    name: str = Field(..., min_length=2)
    level: int = Field(..., ge=0, le=100, description="Nível de 0 a 100")
    category: str = Field(..., pattern='^(frontend|backend|devops|mobile)$')


class SkillCreate(SkillBase):
    pass


class SkillRead(SkillBase, TimestampMixin):
    id: int
