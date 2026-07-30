import uuid
from datetime import datetime
from typing import Optional, Dict, Any
from pydantic import BaseModel, ConfigDict


class RevenueOpportunityBase(BaseModel):
    company_name: str
    domain: str
    contact_name: Optional[str] = None
    contact_email: Optional[str] = None
    stage: str = "RESEARCHING"
    value_amount: float = 0.0
    ai_confidence_score: float = 0.0
    buying_signals: Optional[Dict[str, Any]] = None
    research_summary: Optional[str] = None
    ai_reasoning: Optional[Dict[str, Any]] = None
    business_memory: Optional[Dict[str, Any]] = None
    crm_metadata: Optional[Dict[str, Any]] = None


class RevenueOpportunityCreate(RevenueOpportunityBase):
    workspace_id: Optional[uuid.UUID] = None
    organization_id: Optional[uuid.UUID] = None


class RevenueOpportunityResponse(RevenueOpportunityBase):
    id: uuid.UUID
    workspace_id: Optional[uuid.UUID] = None
    organization_id: Optional[uuid.UUID] = None
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
