from flask_restful import Resource, reqparse
from flask import abort
from models import db
from models.complaints import Complaint
from models.users import User
from notifications.notify import send_notification
from sqlalchemy.exc import SQLAlchemyError

parser = reqparse.RequestParser()
parser.add_argument('user_id', type=int, required=True)
parser.add_argument('area', type=str, required=True)
parser.add_argument('issue_type', type=str, required=True)
parser.add_argument('urgency', type=str, required=True)
parser.add_argument('description', type=str, required=True)
parser.add_argument('status', type=str, required=False)  # optional for PUT


class ComplaintListAPI(Resource):
    def get(self):
        complaints = Complaint.query.all()
        return [c.to_dict() for c in complaints], 200

    def post(self):
        args = parser.parse_args()

        # Validate referenced user
        user = User.query.get(args["user_id"])
        if not user:
            abort(404, description="User not found")

        complaint = Complaint(
            user_id=args['user_id'],
            area=args['area'],
            issue_type=args['issue_type'],
            urgency=args['urgency'],
            description=args['description'],
            status='Pending'
        )

        try:
            db.session.add(complaint)
            db.session.commit()
        except SQLAlchemyError:
            db.session.rollback()
            abort(500, description="Database error while creating complaint")

        # Notification wrapped safely
        try:
            send_notification(
                complaint.user_id,
                f"Your complaint #{complaint.id} has been submitted successfully."
            )
        except Exception:
            # Do not crash the API if notification fails
            pass

        return complaint.to_dict(), 201


class ComplaintAPI(Resource):
    def get(self, complaint_id):
        complaint = Complaint.query.get(complaint_id)
        if not complaint:
            abort(404, description="Complaint not found")
        return complaint.to_dict(), 200

    def put(self, complaint_id):
        complaint = Complaint.query.get(complaint_id)
        if not complaint:
            abort(404, description="Complaint not found")

        args = parser.parse_args()
        old_status = complaint.status

        complaint.area = args['area']
        complaint.issue_type = args['issue_type']
        complaint.urgency = args['urgency']
        complaint.description = args['description']
        complaint.status = args.get('status', complaint.status)

        try:
            db.session.commit()
        except SQLAlchemyError:
            db.session.rollback()
            abort(500, description="Database error while updating complaint")

        # Notify only if status changed
        if complaint.status != old_status:
            try:
                send_notification(
                    complaint.user_id,
                    f"Your complaint #{complaint.id} status updated to '{complaint.status}'."
                )
            except Exception:
                pass

        return complaint.to_dict(), 200
