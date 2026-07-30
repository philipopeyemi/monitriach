from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.database import get_db
from app.models.workspace import Workspace
from app.schemas.workspace import WorkspaceResponse, WorkspaceCreate
from app.api.v1.endpoints.users import get_current_user
from app.models.user import User

router = APIRouter()


@router.get("/", response_model=List[WorkspaceResponse])
async def list_workspaces(db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    """List workspaces accessible to the user's organization."""
    if not current_user.organization_id:
        return []
    result = await db.execute(select(Workspace).where(Workspace.organization_id == current_user.organization_id))
    return result.scalars().all()


@router.post("/", response_model=WorkspaceResponse, status_code=status.HTTP_201_CREATED)
async def create_workspace(request: WorkspaceCreate, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    """Create a new workspace."""
    workspace = Workspace(
        name=request.name,
        slug=request.slug,
        organization_id=request.organization_id
    )
    db.add(workspace)
    await db.commit()
    await db.refresh(workspace)
    return workspace
