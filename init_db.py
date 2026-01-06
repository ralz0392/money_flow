"""Initialize Firestore with starter categories and basic data."""
from app.services.firestore_service import FirestoreService
import os


def main():
    project = os.environ.get('FIRESTORE_PROJECT_ID')
    svc = FirestoreService(project)
    if not svc.client:
        print('Firestore not configured. Set GOOGLE_APPLICATION_CREDENTIALS and FIRESTORE_PROJECT_ID.')
        return

    categories = [
        {'name': 'Salary', 'type': 'income'},
        {'name': 'Groceries', 'type': 'expense'},
        {'name': 'Rent/Mortgage', 'type': 'expense'},
        {'name': 'Utilities', 'type': 'expense'},
    ]

    for c in categories:
        svc.create_document('categories', c)
    print('Seeded categories')


if __name__ == '__main__':
    main()
