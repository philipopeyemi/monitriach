import uuid
from datetime import datetime
from typing import Optional, Dict, Any
from pydantic import BaseModel, ConfigDict


class NotificationBase(BaseModel):
    title: str
    message: str
    notification_type: str
    link: Optional[str] = None
    extra_data: Optional[Dict[str, Any]] = None


class NotificationCreate(NotificationBase):
    user_id: Optional[uuid.UUID] = None


class NotificationResponse(NotificationBase):
    id: uuid.UUID
    is_read: bool
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
