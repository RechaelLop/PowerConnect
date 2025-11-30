from flask_restful import Resource
from flask import request, abort
from models import db
from models.users import User
from schemas import UserSchema
from werkzeug.security import generate_password_hash
from sqlalchemy.exc import IntegrityError
from marshmallow import ValidationError

user_schema = UserSchema()
users_schema = UserSchema(many=True)


class UserListAPI(Resource):
    def get(self):
        users = User.query.all()
        return users_schema.dump(users), 200

    def post(self):
        data = request.get_json()

        if not data:
            abort(400, description="Missing JSON body")

        # Validate user input
        try:
            validated_data = user_schema.load(data)
        except ValidationError as e:
            abort(400, description=e.messages)

        # Check if email already exists
        existing = User.query.filter_by(email=validated_data["email"]).first()
        if existing:
            abort(409, description="Email already registered")

        # Hash the password
        hashed_password = generate_password_hash(validated_data["password"])

        user = User(
            name=validated_data["name"],
            email=validated_data["email"],
            password=hashed_password
        )

        try:
            db.session.add(user)
            db.session.commit()
        except IntegrityError:
            db.session.rollback()
            abort(500, description="Database error while creating user")

        return user_schema.dump(user), 201


class UserAPI(Resource):
    def get(self, user_id):
        user = User.query.get(user_id)
        if not user:
            abort(404, description="User not found")
        return user_schema.dump(user), 200
