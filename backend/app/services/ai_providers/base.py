from abc import ABC, abstractmethod
from typing import Dict, Any, Optional


class BaseAIProvider(ABC):
    """Abstract base class for all AI Model Providers in MONITRIACH CORE."""

    def __init__(self, provider_id: str, name: str, default_model: str, api_key: Optional[str] = None, base_url: Optional[str] = None):
        self.provider_id = provider_id
        self.name = name
        self.default_model = default_model
        self.api_key = api_key
        self.base_url = base_url

    @abstractmethod
    async def generate_completion(self, prompt: str, model: Optional[str] = None, **kwargs) -> Dict[str, Any]:
        """Generate text completion response from provider."""
        pass

    @abstractmethod
    async def health_check(self) -> bool:
        """Check availability of provider service."""
        pass
