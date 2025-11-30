from flask_restful import Resource
from flask import request, abort
from models import db
from models.outages import Outage
from models.users import User
from schemas import OutageSchema
from notifications.notify import send_notification
from sqlalchemy.exc import SQLAlchemyError
from marshmallow import ValidationError

outage_schema = OutageSchema()
outages_schema = OutageSchema(many=True)


class OutageListAPI(Resource):
    def get(self):
        outages = Outage.query.all()
        return outages_schema.dump(outages), 200

    def post(self):
        data = request.get_json()

        if not data:
            abort(400, description="Missing JSON body")

        # Validate with Marshmallow
        try:
            validated_data = outage_schema.load(data)
        except ValidationError as err:
            abort(400, description=err.messages)

        outage = Outage(
            area=validated_data['area'],
            reason=validated_data['reason'],
            start_time=validated_data['start_time'],
            end_time=validated_data['end_time'],
            status=validated_data.get('status', 'Scheduled')
        )

        try:
            db.session.add(outage)
            db.session.commit()
        except SQLAlchemyError:
            db.session.rollback()
            abort(500, description="Database error while creating outage")

        # Notify all users
        users = User.query.all()
        for user in users:
            send_notification(
                user.id,
                f"New outage in {outage.area} from {outage.start_time} to {outage.end_time}. Reason: {outage.reason}"
            )

        return outage_schema.dump(outage), 201


class OutageAPI(Resource):
    def get(self, outage_id):
        outage = Outage.query.get(outage_id)
        if not outage:
            abort(404, description="Outage not found")
        return outage_schema.dump(outage), 200
