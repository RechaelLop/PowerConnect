# schemas/__init__.py
from flask_marshmallow import Marshmallow

ma = Marshmallow()

# Import schema classes so they are available from `schemas`
# (these imports intentionally come after ma so modules can use `ma`)
from .users import UserSchema
from .complaints import ComplaintSchema
from .visits import VisitSchema
from .outages import OutageSchema
from .notifications import NotificationSchema

__all__ = [
    "ma",
    "UserSchema",
    "ComplaintSchema",
    "VisitSchema",
    "OutageSchema",
    "NotificationSchema",
]
