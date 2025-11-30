from flask import Flask, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from config import Config
from models import db
from routes import api_bp
from schemas import ma
from werkzeug.exceptions import HTTPException

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Enable CORS
    CORS(app, resources={r"/*": {"origins": "*"}})

    # Initialize database and migrations
    db.init_app(app)
    Migrate(app, db)

    # Initialize Marshmallow
    ma.init_app(app)

    # Register API blueprint (all RESTful resources)
    app.register_blueprint(api_bp, url_prefix='/api')

    # ---------------------------
    # Global Error Handlers
    # ---------------------------
    @app.errorhandler(HTTPException)
    def handle_http_exception(e):
        """Handles standard HTTP exceptions (404, 400, etc.)"""
        return jsonify({
            "error": {
                "code": e.code,
                "name": e.name,
                "description": e.description
            }
        }), e.code

    @app.errorhandler(404)
    def handle_404(e):
        return jsonify({"error": {"code": 404, "message": "Resource not found"}}), 404

    @app.errorhandler(400)
    def handle_400(e):
        return jsonify({"error": {"code": 400, "message": "Bad request"}}), 400

    @app.errorhandler(500)
    def handle_500(e):
        return jsonify({"error": {"code": 500, "message": "Internal server error"}}), 500

    @app.errorhandler(Exception)
    def handle_generic_exception(e):
        """Catch-all for uncaught exceptions"""
        return jsonify({"error": {"code": 500, "message": str(e)}}), 500

    # ---------------------------
    # Default route
    # ---------------------------
    @app.route("/")
    def home():
        return {"message": "PowerConnect Backend Running"}

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
