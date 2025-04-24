# routes/csr_routes.py

from flask import Blueprint, render_template

csr_bp = Blueprint('csr', __name__, url_prefix='/csr')

@csr_bp.route('/')
def show_csr():
    return render_template('GG_003_csr.html')

