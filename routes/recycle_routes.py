from flask import Blueprint, render_template

recycle_bp = Blueprint('recycle', __name__)

@recycle_bp.route('/recycle')
def analytics_page():
    return render_template('recycle.html')