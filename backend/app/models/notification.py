import uuid
from typing import Optional
from sqlalchemy import String, Text, Boolean, ForeignKey, JSON
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.dialects.postgresql import UUID

from app.core.database import Base
from app.models.base import UUIDMixin, TimestampMixin


class Notification(Base, UUIDMixin, TimestampMixin):
    """Model tracking system and user notifications."""
    __tablename__ = "notifications"

    user_id: Mapped[Optional[uuid.UUID]] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=True)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    message: Mapped[str] = mapped_column(Text, nullable=False)
    notification_type: Mapped[str] = mapped_column(String(100), nullable=False, index=True) # CAMPAIGN_FINISHED, RESEARCH_FAILED, API_LIMIT, etc.
    is_read: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False, index=True)
    link: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)
    extra_data: Mapped[Optional[dict]] = mapped_column(JSON, nullable=True)
