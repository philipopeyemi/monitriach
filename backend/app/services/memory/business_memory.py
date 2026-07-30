import logging
from typing import Dict, Any, Optional

logger = logging.getLogger("monitriach.business_memory")


class BusinessMemoryStore:
    """Persistent Business Memory Store for Company Context, Pain Points, Offers, and History."""

    def __init__(self):
        self._memory_cache: Dict[str, Dict[str, Any]] = {}

    async def get_company_memory(self, domain: str) -> Dict[str, Any]:
        """Retrieve full Business Memory context for a target domain."""
        if domain not in self._memory_cache:
            self._memory_cache[domain] = {
                "domain": domain,
                "pain_points": [],
                "buying_signals": [],
                "offer_history": [],
                "frameworks_used": [],
                "reasoning_history": [],
                "objections": [],
                "touchpoints_count": 0
            }
        return self._memory_cache[domain]

    async def save_company_memory(self, domain: str, memory_data: Dict[str, Any]):
        """Persist updated memory context for a target domain."""
        current = await self.get_company_memory(domain)
        current.update(memory_data)
        self._memory_cache[domain] = current
        logger.info(f"Persisted Business Memory update for domain {domain}")


# Global Business Memory instance
business_memory_store = BusinessMemoryStore()
