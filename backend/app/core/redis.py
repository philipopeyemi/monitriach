import redis.asyncio as aioredis
from app.core.config import settings

redis_pool = None


async def get_redis_client() -> aioredis.Redis:
    """Get async Redis client instance."""
    global redis_pool
    if redis_pool is None:
        redis_pool = aioredis.ConnectionPool.from_url(
            settings.REDIS_URL,
            decode_responses=True
        )
    return aioredis.Redis(connection_pool=redis_pool)


async def close_redis_connection():
    """Close Redis connection pool."""
    global redis_pool
    if redis_pool:
        await redis_pool.disconnect()
        redis_pool = None
