import os
from dotenv import load_dotenv

load_dotenv()  # loads .env file

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY")  # pulled from .env
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")  # pulled from .env
    SQLALCHEMY_TRACK_MODIFICATIONS = False
