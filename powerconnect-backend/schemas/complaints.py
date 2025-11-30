from . import ma
from models.complaints import Complaint
from schemas.users import UserSchema

class ComplaintSchema(ma.SQLAlchemyAutoSchema):
    user = ma.Nested(UserSchema, only=("id", "name", "email"))

    class Meta:
        model = Complaint
        load_instance = True
        include_fk = True
        datetimeformat = "%Y-%m-%d %H:%M:%S"
