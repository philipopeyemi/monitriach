from abc import ABC, abstractmethod
from typing import Dict, Any


class BaseAIAgent(ABC):
    """Standard Agent Contract for all AI Agents in MONITRIACH CORE."""

    def __init__(self, agent_id: str, name: str):
        self.agent_id = agent_id
        self.name = name
        self._last_execution_time: float = 0.0
        self._last_cost: float = 0.0
        self._last_confidence: float = 0.95
        self._last_reasoning: str = "Standard agent execution cycle completed."

    @abstractmethod
    async def execute(self, inputs: Dict[str, Any]) -> Dict[str, Any]:
        """Execute agent workflow on given inputs."""
        pass

    @abstractmethod
    async def validate(self, inputs: Dict[str, Any]) -> bool:
        """Validate input preconditions before execution."""
        pass

    def confidence_score(self) -> float:
        """Return confidence score (0.0 - 1.0) of last execution."""
        return self._last_confidence

    def explain_reasoning(self) -> str:
        """Return human-readable explanation of AI agent decisions."""
        return self._last_reasoning

    def estimated_cost(self) -> float:
        """Return estimated API token cost of execution in USD."""
        return self._last_cost

    def execution_time(self) -> float:
        """Return execution duration in seconds."""
        return self._last_execution_time
