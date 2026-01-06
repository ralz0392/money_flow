from flask import Blueprint, jsonify, request, current_app

accounts_bp = Blueprint('accounts', __name__)


@accounts_bp.route('/', methods=['GET'])
def list_accounts():
    svc = getattr(current_app, 'firestore', None)
    if svc and svc.client:
        docs = svc.list_documents('debit_accounts')
        return jsonify(docs)
    return jsonify([])


@accounts_bp.route('/', methods=['POST'])
def create_account():
    data = request.json or {}
    svc = getattr(current_app, 'firestore', None)
    if svc and svc.client:
        doc_ref = svc.create_document('debit_accounts', data)
        return jsonify({'id': doc_ref}), 201
    return jsonify({'error': 'firestore not configured'}), 500
