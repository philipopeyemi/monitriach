from enum import Enum
import logging
from typing import Callable, Dict, List, Any
from datetime import datetime, timezone

logger = logging.getLogger("monitriach.events")


class SystemEventType(str, Enum):
    LEAD_UPLOADED = "LEAD_UPLOADED"
    RESEARCH_STARTED = "RESEARCH_STARTED"
    RESEARCH_COMPLETED = "RESEARCH_COMPLETED"
    OFFER_GENERATED = "OFFER_GENERATED"
    EMAIL_CREATED = "EMAIL_CREATED"
    EMAIL_SENT = "EMAIL_SENT"
    REPLY_RECEIVED = "REPLY_RECEIVED"
    MEETING_CREATED = "MEETING_CREATED"
    NOTIFICATION_TRIGGERED = "NOTIFICATION_TRIGGERED"


class Event:
    def __init__(self, event_type: SystemEventType, payload: Dict[str, Any], source: str = "system"):
        self.event_type = event_type
        self.payload = payload
        self.source = source
        self.timestamp = datetime.now(timezone.utc).isoformat()

    def to_dict(self) -> Dict[str, Any]:
        return {
            "event_type": self.event_type,
            "payload": self.payload,
            "source": self.source,
            "timestamp": self.timestamp
        }


class EventBus:
    """Asynchronous core Event Bus for publish-subscribe event dispatching."""
    
    def __init__(self):
        self._listeners: Dict[SystemEventType, List[Callable]] = {}

    def subscribe(self, event_type: SystemEventType, listener: Callable):
        if event_type not in self._listeners:
            self._listeners[event_type] = []
        self._listeners[event_type].append(listener)
        logger.info(f"Subscribed listener {listener.__name__} to event {event_type}")

    async def publish(self, event: Event):
        logger.info(f"Publishing event: {event.event_type} from {event.source}")
        listeners = self._listeners.get(event.event_type, [])
        for listener in listeners:
            try:
                if callable(listener):
                    await listener(event)
            except Exception as e:
                logger.error(f"Error executing listener {listener.__name__} for event {event.event_type}: {e}")


# Singleton EventBus instance
event_bus = EventBus()
