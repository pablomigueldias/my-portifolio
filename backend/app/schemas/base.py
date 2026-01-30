from pydantic import BaseModel, ConfigDict
from datetime import datetime


class SchemaBase(BaseModel):
    model_config = ConfigDict(from_attributes=True)


class TimestampMixin(SchemaBase):
    
    created_at: datetime
    updated_at: datetime