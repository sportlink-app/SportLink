from flask import Flask, jsonify
from flask_migrate import Migrate
from flask_cors import CORS
from .config import Config
from .models import db, create_default_sports  # Import the function
from .blueprints.home_blueprint import home_blueprint
from .blueprints.user_blueprint import user_blueprint
from .blueprints.sports_blueprint import sports_blueprint
from .blueprints.blog_blueprint import blog_blueprint  

migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)

    # Allow CORS for all origins (consider restricting in production)
    CORS(app, origins=["http://localhost:5173"], supports_credentials=True, methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"])

    # Register your blueprints here
    app.register_blueprint(user_blueprint)
    app.register_blueprint(home_blueprint)
    app.register_blueprint(sports_blueprint)
    app.register_blueprint(blog_blueprint)  

    @app.before_first_request
    def create_tables_and_insert_data():
        db.create_all()  # Create database tables
        create_default_sports()  # Insert default sports

    @app.errorhandler(404)
    def not_found_error(error):
        return jsonify({"message": "Resource not found!"}), 404

    @app.errorhandler(500)
    def internal_error(error):
        return jsonify({"message": "Internal server error!"}), 500

    return app