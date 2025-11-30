from . import db
from datetime import datetime

class Visit(db.Model):
    __tablename__ = 'visits'

    id = db.Column(db.Integer, primary_key=True)
    complaint_id = db.Column(db.Integer, db.ForeignKey('complaints.id'), nullable=False)
    engineer_name = db.Column(db.String(100), nullable=False)
    scheduled_date = db.Column(db.Date, nullable=False)
    scheduled_time = db.Column(db.Time, nullable=False)
    status = db.Column(db.String(50), default='Scheduled')

    def to_dict(self):
        return {
            'id': self.id,
            'complaint_id': self.complaint_id,
            'engineer_name': self.engineer_name,
            'scheduled_date': self.scheduled_date.strftime("%Y-%m-%d"),
            'scheduled_time': self.scheduled_time.strftime("%H:%M"),
            'status': self.status
        }
