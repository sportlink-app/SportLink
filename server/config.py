# config.py
import os

class Config:
    SECRET_KEY = os.environ.get('WACWAC')
    SQLALCHEMY_DATABASE_URI = 'mysql+mysqlconnector://roota:root@localhost/SPL'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

