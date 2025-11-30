from models import db
from models.users import User
from models.notifications import Notification
from datetime import datetime

def send_notification(user_id, message):
    """Create a notification for a specific user."""
    notification = Notification(
        user_id=user_id,
        message=message,
        created_at=datetime.utcnow()
    )
    db.session.add(notification)
    db.session.commit()
    return notification

def get_user_notifications(user_id):
    """Fetch all notifications for a user, most recent first."""
    return Notification.query.filter_by(user_id=user_id).order_by(Notification.created_at.desc()).all()

def mark_as_read(notification_id):
    """Mark a notification as read."""
    note = Notification.query.get(notification_id)
    if note:
        note.is_read = True
        db.session.commit()
        return note
    return None
