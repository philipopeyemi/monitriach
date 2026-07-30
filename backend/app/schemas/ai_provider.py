from typing import Optional, Dict, Any
from pydantic import BaseModel


class AIProviderConfig(BaseModel):
    provider_id: str # openrouter, huggingface, ollama, gemini, openai, anthropic, deepseek, groq
    name: str
    is_active: bool = True
    is_default: bool = False
    api_key: Optional[str] = None
    base_url: Optional[str] = None
    default_model: str
    extra_settings: Optional[Dict[str, Any]] = None


class AIProviderResponse(BaseModel):
    provider_id: str
    name: str
    is_active: bool
    is_default: bool
    default_model: str
    has_api_key: bool
