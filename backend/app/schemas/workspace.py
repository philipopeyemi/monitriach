import uuid
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict


class WorkspaceBase(BaseModel):
    name: str
    slug: str
    is_active: bool = True


class WorkspaceCreate(WorkspaceBase):
    organization_id: uuid.UUID


class WorkspaceResponse(WorkspaceBase):
    id: uuid.UUID
    organization_id: uuid.UUID
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
