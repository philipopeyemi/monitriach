import uuid
from typing import Optional
from sqlalchemy import String, Text, Float, Integer, ForeignKey, JSON
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.dialects.postgresql import UUID

from app.core.database import Base
from app.models.base import UUIDMixin, TimestampMixin, SoftDeleteMixin


class RevenueOpportunity(Base, UUIDMixin, TimestampMixin, SoftDeleteMixin):
    """Primary Business Entity in MONITRIACH CORE — Autonomous AI Revenue OS."""
    __tablename__ = "revenue_opportunities"

    company_name: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    domain: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    contact_name: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    contact_email: Mapped[Optional[str]] = mapped_column(String(255), nullable=True, index=True)
    stage: Mapped[str] = mapped_column(String(100), nullable=False, default="RESEARCHING", index=True) # RESEARCHING, OFFER_MATCHED, OUTREACH_SENT, ENGAGED, MEETING_BOOKED, WON, LOST
    
    value_amount: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)
    ai_confidence_score: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)
    
    # Nested structured memory & intelligence state
    buying_signals: Mapped[Optional[dict]] = mapped_column(JSON, nullable=True)
    research_summary: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    ai_reasoning: Mapped[Optional[dict]] = mapped_column(JSON, nullable=True)
    business_memory: Mapped[Optional[dict]] = mapped_column(JSON, nullable=True)
    crm_metadata: Mapped[Optional[dict]] = mapped_column(JSON, nullable=True)

    workspace_id: Mapped[Optional[uuid.UUID]] = mapped_column(UUID(as_uuid=True), ForeignKey("workspaces.id", ondelete="CASCADE"), nullable=True)
    organization_id: Mapped[Optional[uuid.UUID]] = mapped_column(UUID(as_uuid=True), ForeignKey("organizations.id", ondelete="CASCADE"), nullable=True)
