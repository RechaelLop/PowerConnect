from . import db
from datetime import datetime

class Outage(db.Model):
    __tablename__ = 'outages'

    id = db.Column(db.Integer, primary_key=True)
    area = db.Column(db.String(100), nullable=False)
    reason = db.Column(db.String(200), nullable=False)
    start_time = db.Column(db.DateTime, nullable=False)
    end_time = db.Column(db.DateTime, nullable=False)
    status = db.Column(db.String(50), default='Active')

    def to_dict(self):
        return {
            'id': self.id,
            'area': self.area,
            'reason': self.reason,
            'start_time': self.start_time.strftime("%Y-%m-%d %H:%M"),
            'end_time': self.end_time.strftime("%Y-%m-%d %H:%M"),
            'status': self.status
        }
