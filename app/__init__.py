from flask import Flask


def create_app():
    app = Flask(__name__, template_folder='templates', static_folder='static')

    # load config from environment
    try:
        from .config import Config
        app.config.from_object(Config)
    except Exception:
        pass

    # initialize services
    try:
        from .services.firestore_service import FirestoreService
        app.firestore = FirestoreService(app.config.get('FIRESTORE_PROJECT_ID'))
    except Exception:
        app.firestore = None

    # register blueprints
    try:
        from .routes.main import main_bp
        app.register_blueprint(main_bp)
    except Exception:
        pass

    try:
        from .routes.accounts import accounts_bp
        app.register_blueprint(accounts_bp, url_prefix='/api/accounts')
    except Exception:
        pass

    try:
        from .routes.accounts_ui import accounts_ui_bp
        app.register_blueprint(accounts_ui_bp, url_prefix='/accounts')
    except Exception:
        pass

    return app
