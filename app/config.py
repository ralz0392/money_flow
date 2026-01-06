import os


class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', 'dev-secret')
    FIRESTORE_PROJECT_ID = os.environ.get('FIRESTORE_PROJECT_ID')
    GOOGLE_APPLICATION_CREDENTIALS = os.environ.get('GOOGLE_APPLICATION_CREDENTIALS')
    # Application settings
    DEFAULT_CURRENCY = os.environ.get('DEFAULT_CURRENCY', 'USD')
    ITEMS_PER_PAGE = int(os.environ.get('ITEMS_PER_PAGE', 25))
