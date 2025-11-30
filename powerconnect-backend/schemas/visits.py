from . import ma
from models.visits import Visit
from schemas.complaints import ComplaintSchema

class VisitSchema(ma.SQLAlchemyAutoSchema):
    complaint = ma.Nested(ComplaintSchema, only=("id", "area", "issue_type", "status"))

    class Meta:
        model = Visit
        load_instance = True
        include_fk = True
        datetimeformat = "%Y-%m-%d"
