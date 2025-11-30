from flask import Blueprint
from flask_restful import Api

# Create a blueprint
api_bp = Blueprint('api', __name__)
api = Api(api_bp)

# Import resource classes
from .complaints import ComplaintListAPI, ComplaintAPI
from .visits import VisitListAPI, VisitAPI
from .outages import OutageListAPI, OutageAPI
from .users import UserListAPI, UserAPI
from .notifications import NotificationListAPI, NotificationAPI  # <- use the notifications blueprint

# Complaints routes
api.add_resource(ComplaintListAPI, '/complaints')
api.add_resource(ComplaintAPI, '/complaints/<int:complaint_id>')

# Visits routes
api.add_resource(VisitListAPI, '/visits')
api.add_resource(VisitAPI, '/visits/<int:visit_id>')

# Outages routes
api.add_resource(OutageListAPI, '/outages')
api.add_resource(OutageAPI, '/outages/<int:outage_id>')

# Users routes
api.add_resource(UserListAPI, '/users')
api.add_resource(UserAPI, '/users/<int:user_id>')

# Notifications routes
api.add_resource(NotificationListAPI, '/notifications/<int:user_id>')
api.add_resource(NotificationAPI, '/notification/<int:notification_id>')
