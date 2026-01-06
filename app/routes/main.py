from flask import Blueprint, render_template, current_app

main_bp = Blueprint('main', __name__)


@main_bp.route('/')
def dashboard():
    # Minimal placeholder values; replace with real calculations
    assets = 0
    liabilities = 0
    net_worth = assets - liabilities
    return render_template('dashboard.html', assets=assets, liabilities=liabilities, net_worth=net_worth)
