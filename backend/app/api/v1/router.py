from fastapi import APIRouter
from app.api.v1.endpoints import health, auth, users, workspaces, ai_providers, notifications, opportunities

api_router = APIRouter()

api_router.include_router(health.router, tags=["Health"])
api_router.include_router(auth.router, prefix="/auth", tags=["Auth"])
api_router.include_router(users.router, prefix="/users", tags=["Users"])
api_router.include_router(workspaces.router, prefix="/workspaces", tags=["Workspaces"])
api_router.include_router(ai_providers.router, prefix="/ai-providers", tags=["AI Providers"])
api_router.include_router(notifications.router, prefix="/notifications", tags=["Notifications"])
api_router.include_router(opportunities.router, prefix="/opportunities", tags=["Revenue Opportunities"])
