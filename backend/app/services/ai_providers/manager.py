from typing import Dict, List, Optional
import logging
from app.schemas.ai_provider import AIProviderResponse

logger = logging.getLogger("monitriach.ai_providers")


class AIProviderManager:
    """Core AI Provider Manager with Free-First Priority Ordering."""

    def __init__(self):
        # Priority order: OpenRouter Free -> HuggingFace -> Ollama -> Gemini -> Groq
        self._providers: Dict[str, Dict] = {
            "openrouter": {
                "name": "OpenRouter (Free Models)",
                "default_model": "meta-llama/llama-3.1-8b-instruct:free",
                "is_active": True,
                "is_default": True,
                "has_api_key": False,
                "is_free": True
            },
            "huggingface": {
                "name": "Hugging Face Inference API",
                "default_model": "meta-llama/Llama-3-70b-instruct",
                "is_active": True,
                "is_default": False,
                "has_api_key": False,
                "is_free": True
            },
            "ollama": {
                "name": "Ollama (Local Offline)",
                "default_model": "llama3:latest",
                "is_active": True,
                "is_default": False,
                "has_api_key": False,
                "is_free": True
            },
            "gemini": {
                "name": "Google Gemini (Free Tier)",
                "default_model": "gemini-1.5-flash",
                "is_active": True,
                "is_default": False,
                "has_api_key": False,
                "is_free": True
            },
            "groq": {
                "name": "Groq (Free Tier)",
                "default_model": "llama3-70b-8192",
                "is_active": True,
                "is_default": False,
                "has_api_key": False,
                "is_free": True
            },
            "openai": {
                "name": "OpenAI",
                "default_model": "gpt-4o-mini",
                "is_active": True,
                "is_default": False,
                "has_api_key": False,
                "is_free": False
            },
            "anthropic": {
                "name": "Anthropic",
                "default_model": "claude-3-5-sonnet-20240620",
                "is_active": True,
                "is_default": False,
                "has_api_key": False,
                "is_free": False
            },
            "deepseek": {
                "name": "DeepSeek",
                "default_model": "deepseek-coder",
                "is_active": True,
                "is_default": False,
                "has_api_key": False,
                "is_free": False
            }
        }
        self.default_provider_id = "openrouter"

    def list_providers(self) -> List[AIProviderResponse]:
        """Return list of supported AI Providers ordered by Free-First priority."""
        return [
            AIProviderResponse(
                provider_id=pid,
                name=data["name"],
                is_active=data["is_active"],
                is_default=(pid == self.default_provider_id),
                default_model=data["default_model"],
                has_api_key=data["has_api_key"]
            )
            for pid, data in self._providers.items()
        ]

    def set_default_provider(self, provider_id: str) -> bool:
        if provider_id in self._providers:
            self.default_provider_id = provider_id
            logger.info(f"Set default AI provider to {provider_id}")
            return True
        return False


# Global AI Provider Manager instance
ai_provider_manager = AIProviderManager()
