from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text

from app.core.config import settings
from app.core.database import get_db
from app.core.redis import get_redis_client
from app.schemas.health import HealthCheck

router = APIRouter()


@router.get("/health", response_model=HealthCheck)
async def get_health(db: AsyncSession = Depends(get_db)):
    """System health check endpoint verifying Database and Redis status."""
    db_status = "healthy"
    redis_status = "healthy"

    # Verify DB connection
    try:
        await db.execute(text("SELECT 1"))
    except Exception:
        db_status = "unhealthy"

    # Verify Redis connection
    try:
        redis = await get_redis_client()
        await redis.ping()
    except Exception:
        redis_status = "unhealthy"

    overall_status = "ok" if (db_status == "healthy" and redis_status == "healthy") else "degraded"

    return HealthCheck(
        status=overall_status,
        version=settings.VERSION,
        environment=settings.ENVIRONMENT,
        services={
            "database": db_status,
            "redis": redis_status,
        }
    )
