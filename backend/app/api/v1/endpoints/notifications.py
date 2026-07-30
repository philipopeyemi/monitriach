import uuid
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update

from app.core.database import get_db
from app.models.notification import Notification
from app.schemas.notification import NotificationResponse

router = APIRouter()


@router.get("/", response_model=List[NotificationResponse])
async def list_notifications(db: AsyncSession = Depends(get_db)):
    """List system notifications."""
    result = await db.execute(select(Notification).order_by(Notification.created_at.desc()).limit(50))
    return result.scalars().all()


@router.post("/{notification_id}/read")
async def mark_notification_read(notification_id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    """Mark a notification as read."""
    await db.execute(
        update(Notification)
        .where(Notification.id == notification_id)
        .values(is_read=True)
    )
    await db.commit()
    return {"message": "Notification marked as read"}
