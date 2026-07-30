import uuid
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict


class OrganizationBase(BaseModel):
    name: str
    slug: str
    is_active: bool = True


class OrganizationCreate(OrganizationBase):
    pass


class OrganizationResponse(OrganizationBase):
    id: uuid.UUID
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
