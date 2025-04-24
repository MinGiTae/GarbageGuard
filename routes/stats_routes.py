# routes/stats_routes.py

from flask import Blueprint, render_template

stats_bp = Blueprint('stats', __name__)

@stats_bp.route('/analytics')
def analytics_page():
    return render_template('GG_005_analytics_and_statstics.html')
