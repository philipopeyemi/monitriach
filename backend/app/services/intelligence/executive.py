import logging
import time
from typing import Dict, Any, List
from app.services.intelligence.base import BaseAIAgent
from app.core.events import event_bus, Event, SystemEventType

logger = logging.getLogger("monitriach.ai_executive")


class DummyResearchAgent(BaseAIAgent):
    def __init__(self):
        super().__init__("research_agent", "Research Agent")

    async def validate(self, inputs: Dict[str, Any]) -> bool:
        return bool(inputs.get("domain"))

    async def execute(self, inputs: Dict[str, Any]) -> Dict[str, Any]:
        start = time.time()
        domain = inputs.get("domain", "target-company.com")
        self._last_execution_time = time.time() - start
        self._last_confidence = 0.96
        self._last_reasoning = f"Crawled 12 pages for {domain}. Identified B2B SaaS growth stack."
        return {
            "status": "completed",
            "domain": domain,
            "pain_points": ["High CAC", "Manual Outbound", "Deliverability drop"],
            "tech_stack": ["React", "FastAPI", "PostgreSQL", "AWS SES"]
        }


class DummyAEGISAgent(BaseAIAgent):
    def __init__(self):
        super().__init__("aegis_core", "AEGIS Core Executive")

    async def validate(self, inputs: Dict[str, Any]) -> bool:
        return "research" in inputs

    async def execute(self, inputs: Dict[str, Any]) -> Dict[str, Any]:
        start = time.time()
        self._last_execution_time = time.time() - start
        self._last_confidence = 0.98
        self._last_reasoning = "Matched pain points with 14-day free pilot offer for Autonomous AI Sales OS."
        return {
            "status": "completed",
            "offer_title": "Autonomous AI Sales OS 14-Day Pilot",
            "value_prop": "Automate 80% of SDR outbound research and personalized email copywriting."
        }


class AIExecutive:
    """Master AI Executive Supervising all MONITRIACH Agents."""

    def __init__(self):
        self.agents: Dict[str, BaseAIAgent] = {
            "research": DummyResearchAgent(),
            "aegis": DummyAEGISAgent()
        }
        self.execution_history: List[Dict[str, Any]] = []

    async def orchestrate_opportunity(self, opportunity_id: str, domain: str) -> Dict[str, Any]:
        logger.info(f"AI Executive initiating orchestration cycle for Opportunity {opportunity_id} ({domain})")
        
        # Step 1: Trigger Research Agent
        research_agent = self.agents["research"]
        inputs = {"domain": domain}
        
        await event_bus.publish(Event(SystemEventType.RESEARCH_STARTED, {"opportunity_id": opportunity_id, "domain": domain}))
        
        if await research_agent.validate(inputs):
            research_res = await research_agent.execute(inputs)
            await event_bus.publish(Event(SystemEventType.RESEARCH_COMPLETED, {"opportunity_id": opportunity_id, "result": research_res}))
        else:
            research_res = {"status": "failed", "error": "Validation failed"}

        # Step 2: Trigger AEGIS Core Strategy
        aegis_agent = self.agents["aegis"]
        aegis_inputs = {"research": research_res}
        if await aegis_agent.validate(aegis_inputs):
            aegis_res = await aegis_agent.execute(aegis_inputs)
            await event_bus.publish(Event(SystemEventType.OFFER_GENERATED, {"opportunity_id": opportunity_id, "offer": aegis_res}))
        else:
            aegis_res = {"status": "failed"}

        summary = {
            "opportunity_id": opportunity_id,
            "research": research_res,
            "aegis_strategy": aegis_res,
            "executive_confidence": (research_agent.confidence_score() + aegis_agent.confidence_score()) / 2
        }

        self.execution_history.append(summary)
        return summary


# Global AI Executive instance
ai_executive = AIExecutive()
