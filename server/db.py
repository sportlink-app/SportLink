# db.py
from flask import current_app, g
from flask_sqlalchemy import SQLAlchemy
from mysql.connector import connect, Error
from config import Config

db = SQLAlchemy()

def get_db_connection():
    if 'db_conn' not in g:
        try:
            g.db_conn = connect(
                user=Config.SQLALCHEMY_DATABASE_URI.split(':')[1][2:], 
                password=Config.SQLALCHEMY_DATABASE_URI.split(':')[2].split('@')[0],
                host=Config.SQLALCHEMY_DATABASE_URI.split('@')[1].split('/')[0],
                database=Config.SQLALCHEMY_DATABASE_URI.split('/')[-1]
            )
        except Error as e:
            current_app.logger.error(f"Error connecting to database: {str(e)}")
            g.db_conn = None
    return g.db_conn

def close_db_connection(e=None):
    db_conn = g.pop('db_conn', None)
    if db_conn is not None:
        db_conn.close()

