from . import ma
from models.notifications import Notification
from schemas.users import UserSchema

class NotificationSchema(ma.SQLAlchemyAutoSchema):
    user = ma.Nested(UserSchema, only=("id", "name"))

    class Meta:
        model = Notification
        load_instance = True
        include_fk = True
        datetimeformat = "%Y-%m-%d %H:%M:%S"
