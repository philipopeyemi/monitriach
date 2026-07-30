import uuid
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.database import get_db
from app.models.opportunity import RevenueOpportunity
from app.schemas.opportunity import RevenueOpportunityResponse, RevenueOpportunityCreate
from app.services.intelligence.executive import ai_executive

router = APIRouter()


@router.get("/", response_model=List[RevenueOpportunityResponse])
async def list_opportunities(db: AsyncSession = Depends(get_db)):
    """List all Revenue Opportunities."""
    result = await db.execute(select(RevenueOpportunity).order_by(RevenueOpportunity.created_at.desc()))
    return result.scalars().all()


@router.post("/", response_model=RevenueOpportunityResponse, status_code=status.HTTP_201_CREATED)
async def create_opportunity(request: RevenueOpportunityCreate, db: AsyncSession = Depends(get_db)):
    """Create a new Revenue Opportunity and initiate AI Executive orchestration."""
    opp = RevenueOpportunity(
        company_name=request.company_name,
        domain=request.domain,
        contact_name=request.contact_name,
        contact_email=request.contact_email,
        stage=request.stage,
        value_amount=request.value_amount,
        ai_confidence_score=request.ai_confidence_score,
        buying_signals=request.buying_signals or {},
        research_summary=request.research_summary or "",
        ai_reasoning=request.ai_reasoning or {},
        business_memory=request.business_memory or {},
        crm_metadata=request.crm_metadata or {}
    )
    db.add(opp)
    await db.commit()
    await db.refresh(opp)

    # Trigger AI Executive Orchestration
    await ai_executive.orchestrate_opportunity(str(opp.id), opp.domain)

    return opp


@router.get("/{opportunity_id}", response_model=RevenueOpportunityResponse)
async def get_opportunity(opportunity_id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    """Get Revenue Opportunity by ID."""
    result = await db.execute(select(RevenueOpportunity).where(RevenueOpportunity.id == opportunity_id))
    opp = result.scalar_one_or_none()
    if not opp:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Revenue Opportunity not found")
    return opp
