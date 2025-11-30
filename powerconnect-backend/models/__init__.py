from db.db_init import db  # import the single db instance

# Import all models so they are registered with SQLAlchemy
from .users import User
from .complaints import Complaint
from .visits import Visit
from .outages import Outage
from .notifications import Notification
