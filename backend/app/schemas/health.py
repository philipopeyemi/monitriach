from typing import Dict
from pydantic import BaseModel


class HealthCheck(BaseModel):
    status: str = "ok"
    version: str
    environment: str
    services: Dict[str, str] # e.g. {"database": "healthy", "redis": "healthy"}
