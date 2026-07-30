import uuid
from typing import Optional
from sqlalchemy import String, Text, ForeignKey, JSON
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.dialects.postgresql import UUID

from app.core.database import Base
from app.models.base import UUIDMixin, TimestampMixin


class LeadActivityTimeline(Base, UUIDMixin, TimestampMixin):
    """Model tracking step-by-step activity progression for leads."""
    __tablename__ = "lead_activity_timelines"

    lead_id: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    step_title: Mapped[str] = mapped_column(String(255), nullable=False)
    step_description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    status: Mapped[str] = mapped_column(String(50), nullable=False, default="completed") # pending, processing, completed, failed
    metadata_json: Mapped[Optional[dict]] = mapped_column(JSON, nullable=True)

    workspace_id: Mapped[Optional[uuid.UUID]] = mapped_column(UUID(as_uuid=True), ForeignKey("workspaces.id", ondelete="CASCADE"), nullable=True)
