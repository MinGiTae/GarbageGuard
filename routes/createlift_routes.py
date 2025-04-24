# routes/createlift_routes.py

from flask import Blueprint, render_template

createlift_bp = Blueprint('createlift', __name__)

@createlift_bp.route('/Create_lift')
def show_createlift():
    return render_template('GG_006_createlift.html')
