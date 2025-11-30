from . import db
from datetime import datetime

class Complaint(db.Model):
    __tablename__ = 'complaints'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    area = db.Column(db.String(100), nullable=False)
    issue_type = db.Column(db.String(100), nullable=False)
    urgency = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text, nullable=False)
    status = db.Column(db.String(50), default='Pending')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    visits = db.relationship('Visit', backref='complaint', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'area': self.area,
            'issue_type': self.issue_type,
            'urgency': self.urgency,
            'description': self.description,
            'status': self.status,
            'created_at': self.created_at.strftime("%Y-%m-%d %H:%M:%S")
        }
