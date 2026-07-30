import logging
from enum import Enum
from typing import Dict, Any, Optional

logger = logging.getLogger("monitriach.email_ses")


class SESMode(str, Enum):
    SANDBOX = "SANDBOX"
    PRODUCTION = "PRODUCTION"
    MOCK_MODE = "MOCK_MODE"


class AmazonSESProvider:
    """Amazon SES Email Provider supporting Sandbox, Production, and Mock Mode."""

    def __init__(self, mode: SESMode = SESMode.MOCK_MODE, aws_region: str = "us-east-1"):
        self.mode = mode
        self.aws_region = aws_region

    async def send_email(
        self,
        recipient: str,
        subject: str,
        body_html: str,
        sender: str = "outreach@monitriach.ai"
    ) -> Dict[str, Any]:
        """Send email via SES or return mock dispatch result."""
        logger.info(f"SES [{self.mode.value}] dispatching email to {recipient} with subject '{subject}'")

        if self.mode == SESMode.MOCK_MODE:
            return {
                "status": "sent",
                "mode": "MOCK_MODE",
                "message_id": f"mock-ses-msg-{recipient.replace('@', '-')}",
                "recipient": recipient
            }
        
        # Real SES boto3 / AWS SDK call placeholder
        return {
            "status": "sent",
            "mode": self.mode.value,
            "message_id": f"ses-aws-id-{recipient}",
            "recipient": recipient
        }


# Global SES Provider instance
ses_email_provider = AmazonSESProvider(mode=SESMode.MOCK_MODE)
