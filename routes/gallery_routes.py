from flask import Blueprint, render_template, request
from db.db_manager import (
    get_all_construction_sites,
    get_photos_by_site,
    get_photos_by_site_and_date
)

gallery_bp = Blueprint('gallery_bp', __name__)

@gallery_bp.route('/gallery', methods=['GET'])
def show_gallery():
    site_id       = request.args.get('site_id')
    date          = request.args.get('date')
    sites         = get_all_construction_sites()
    photos        = []
    selected_name = None

    if site_id:
        # 선택된 site_id로 실제 site_name 찾아두기
        for s in sites:
            if str(s['site_id']) == site_id:
                selected_name = s['site_name']
                break

        if selected_name:
            if date:
                photos = get_photos_by_site_and_date(site_id, date)
            else:
                photos = get_photos_by_site(site_id)

    return render_template(
        'gallery.html',
        sites=sites,
        photos=photos,
        selected_site=site_id,
        selected_date=date,
        selected_name=selected_name
    )
