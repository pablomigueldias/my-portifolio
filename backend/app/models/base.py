from datetime import datetime
from sqlalchemy.orm import DeclarativeBase,Mapped,mapped_column
from sqlalchemy import func

class Base(DeclarativeBase):

    create_at: Mapped[datetime] = mapped_column(server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(server_default=func.now(), onupdate=func.now())