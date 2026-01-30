from typing import Optional
from pydantic import Field
from .base import SchemaBase, TimestampMixin


class TechnologyBase(SchemaBase):
    name: str = Field(..., min_length=2, max_length=50,
                      description='Nome da tecnologia (ex: React)')
    icon_key: Optional[str] = Field(
        None, max_length=50, description='Chave do ícone (ex: SiReact)')
    color_class: Optional[str] = Field(
        None, max_length=100, description='Classe CSS (Tailwind)')
    
class TechnologyCreate(TechnologyBase):
    pass

class TechnologyRead(TechnologyBase,TimestampMixin):
    id: int