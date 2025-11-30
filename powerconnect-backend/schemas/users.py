from . import ma
from models.users import User

class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        load_instance = True
        include_fk = True
        # Exclude password from serialized output
        exclude = ("password",)
