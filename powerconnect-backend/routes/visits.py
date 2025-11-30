from flask_restful import Resource, reqparse
from models import db
from models.visits import Visit
from notifications.notify import send_notification
from models.complaints import Complaint
from sqlalchemy.exc import SQLAlchemyError

parser = reqparse.RequestParser()
parser.add_argument('complaint_id', type=int, required=True)
parser.add_argument('engineer_name', type=str, required=True)
parser.add_argument('scheduled_date', type=str, required=True)
parser.add_argument('scheduled_time', type=str, required=True)
parser.add_argument('status', type=str, required=False)

class VisitListAPI(Resource):
    def get(self):
        try:
            visits = Visit.query.all()
            return [v.to_dict() for v in visits], 200
        except SQLAlchemyError:
            return {"error": "Failed to fetch visits."}, 500

    def post(self):
        try:
            args = parser.parse_args()

            visit = Visit(
                complaint_id=args['complaint_id'],
                engineer_name=args['engineer_name'],
                scheduled_date=args['scheduled_date'],
                scheduled_time=args['scheduled_time'],
                status=args.get('status', 'Scheduled')
            )

            db.session.add(visit)
            db.session.commit()

            complaint = Complaint.query.get_or_404(visit.complaint_id)

            send_notification(
                complaint.user_id,
                f"Engineer {visit.engineer_name} scheduled for your complaint #{complaint.id} "
                f"on {visit.scheduled_date} at {visit.scheduled_time}."
            )

            return visit.to_dict(), 201

        except SQLAlchemyError:
            db.session.rollback()
            return {"error": "Failed to create visit."}, 500
        except Exception:
            return {"error": "Invalid visit data."}, 400
        
class VisitAPI(Resource):
    def get(self, visit_id):
        visit = Visit.query.get_or_404(visit_id)
        return visit.to_dict(), 200
