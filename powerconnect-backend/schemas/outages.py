from . import ma
from models.outages import PowerOutage

class OutageSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = PowerOutage
        load_instance = True
        include_fk = True
        datetimeformat = "%Y-%m-%d %H:%M"
