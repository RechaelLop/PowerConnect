from flask import Blueprint, jsonify
from flask_restful import Api, Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from notifications.notify import get_user_notifications, mark_as_read

notifications_bp = Blueprint("notifications", __name__)
api = Api(notifications_bp)

class NotificationListAPI(Resource):
    @jwt_required()
    def get(self):
        current_user_id = get_jwt_identity()
        notifications = get_user_notifications(current_user_id)
        return [n.to_dict() for n in notifications], 200

class NotificationAPI(Resource):
    @jwt_required()
    def put(self, notification_id):
        note = mark_as_read(notification_id)
        if note:
            return note.to_dict(), 200
        return {"message": "Notification not found"}, 404

api.add_resource(NotificationListAPI, "/notifications")
api.add_resource(NotificationAPI, "/notifications/<int:notification_id>")
