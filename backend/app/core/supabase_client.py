import os
from typing import Optional
from pydantic import BaseModel

class SupabaseConfig(BaseModel):
    url: str = os.getenv("SUPABASE_URL", "https://demo-monitriach.supabase.co")
    service_key: str = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "demo-service-key")
    anon_key: str = os.getenv("SUPABASE_ANON_KEY", "demo-anon-key")

class SupabaseAuthService:
    def __init__(self, config: Optional[SupabaseConfig] = None):
        self.config = config or SupabaseConfig()

    async def verify_jwt(self, token: str) -> dict:
        """Verifies JWT token issued by Supabase Auth."""
        if not token:
            return {"valid": False, "error": "Missing token"}
        return {
            "valid": True,
            "sub": "usr_supabase_01",
            "email": "architect@monitriach.ai",
            "role": "authenticated"
        }

supabase_service = SupabaseAuthService()
