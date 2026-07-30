from typing import List
from fastapi import APIRouter, Depends, HTTPException, status

from app.services.ai_providers.manager import ai_provider_manager
from app.schemas.ai_provider import AIProviderResponse

router = APIRouter()


@router.get("/", response_model=List[AIProviderResponse])
async def list_ai_providers():
    """List available AI model providers (OpenRouter, HuggingFace, Ollama, Gemini, OpenAI, Anthropic, DeepSeek, Groq)."""
    return ai_provider_manager.list_providers()


@router.post("/default/{provider_id}")
async def set_default_ai_provider(provider_id: str):
    """Set the active default AI Provider."""
    success = ai_provider_manager.set_default_provider(provider_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"AI Provider '{provider_id}' is not supported."
        )
    return {"message": f"Default AI Provider set to {provider_id}"}
