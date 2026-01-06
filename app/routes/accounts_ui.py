from flask import Blueprint, render_template, request, redirect, url_for, current_app, flash

accounts_ui_bp = Blueprint('accounts_ui', __name__, template_folder='templates')


@accounts_ui_bp.route('/')
def list_accounts_ui():
    svc = getattr(current_app, 'firestore', None)
    accounts = []
    if svc and svc.client:
        accounts = svc.list_documents('debit_accounts')
    return render_template('accounts/list.html', accounts=accounts)


@accounts_ui_bp.route('/create', methods=['GET', 'POST'])
def create_account_ui():
    if request.method == 'POST':
        try:
            init_bal = float(request.form.get('initial_balance') or 0)
        except ValueError:
            init_bal = 0.0
        data = {
            'account_name': request.form.get('account_name'),
            'account_type': request.form.get('account_type'),
            'initial_balance': init_bal,
            'current_balance': init_bal,
            'currency': request.form.get('currency') or current_app.config.get('DEFAULT_CURRENCY', 'USD'),
            'status': 'active'
        }
        svc = getattr(current_app, 'firestore', None)
        if svc and svc.client:
            svc.create_document('debit_accounts', data)
            flash('Account created', 'success')
            return redirect(url_for('accounts_ui.list_accounts_ui'))
        else:
            flash('Firestore not configured; account not saved', 'warning')
            return redirect(url_for('accounts_ui.list_accounts_ui'))
    return render_template('accounts/create.html')
