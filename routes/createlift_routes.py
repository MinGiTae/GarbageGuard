# routes/createlift_routes.py

from flask import Blueprint, render_template
from db.db_manager import get_site_id_by_name

createlift_bp = Blueprint('createlift', __name__)

@createlift_bp.route('/Create_lift')
def show_createlift():
    return render_template('GG_006_createlift.html')



#  해당 건설현장의 ISO 체크리스트랑 폐기물 체크리스트를 조회하여 반환해주는 쿼리
@createlift_bp.route('/select-site', methods=['POST'])
def select_site():
    site_name = request.form.get('site_name')  # 폼에서 넘긴 site_name 받기
    print(f"✅ 선택된 건설현장: {site_name}")

    # 예시: site_name으로 site_id 조회
    site_id = get_site_id_by_name(site_name)
    print(f"✅ 해당 건설현장 site_id: {site_id}")

    result = {
        "iso_checks": [True, True, False, True, True, True, True],
        "waste_checks": [True, True, True, True, True, True, True]
    }

    return jsonify(result)


@createlift_bp.route('/search-site')
def search_site():
    keyword = request.args.get('keyword', '').lower()

    # 나중에 DB 연결될 때 여기를 수정
    dummy_data = [
        {"site_name": "서울 건설현장", "address": "서울특별시 강남구"},
        {"site_name": "부산 건설현장", "address": "부산광역시 해운대구"},
        {"site_name": "대구 건설현장", "address": "대구광역시 수성구"},
    ]

    results = [site for site in dummy_data if keyword in site['site_name'].lower()]
    return jsonify(results)





