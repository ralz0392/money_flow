from dataclasses import dataclass, field
from datetime import datetime
from typing import Optional


@dataclass
class DebitAccount:
    account_id: Optional[str]
    account_name: str
    account_type: str = 'checking'
    initial_balance: float = 0.0
    current_balance: float = 0.0
    currency: str = 'USD'
    status: str = 'active'
    created_at: datetime = field(default_factory=datetime.utcnow)


@dataclass
class CreditAccount:
    account_id: Optional[str]
    card_name: str
    credit_limit: float = 0.0
    current_balance: float = 0.0
    apr: Optional[float] = None
    payment_due_date: Optional[int] = None
    minimum_payment: Optional[float] = None
    status: str = 'active'
    created_at: datetime = field(default_factory=datetime.utcnow)
