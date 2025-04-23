# routes/stats_routes.py

from flask import Blueprint, render_template, request, jsonify
from db.db_manager import (
    get_connection,
    get_all_construction_sites,
    get_monthly_stats
)

stats_bp = Blueprint('stats_bp', __name__)

# ──────────────── ANALYTICS PAGE ────────────────
@stats_bp.route('/analytics_and_statistics')
def analytics_and_statistics():
    """
    월별 통계 대시보드 페이지 렌더링
    """
    sites = get_all_construction_sites()
    return render_template(
        'analytics_and_statistics.html',
        sites=sites
    )

# ──────────────── MONTHLY STATS API ────────────────
@stats_bp.route('/api/monthly_stats')
def api_monthly_stats():
    """
    월별 폐기물량·탄소배출량 데이터 반환
    쿼리 파라미터 site_id가 있으면 특정 현장,
    없으면 전체 현장 통계
    """
    site_id = request.args.get('site_id', type=int)
    rows = get_monthly_stats(site_id)
    # rows: [
    #   {'month': '2025-03', 'total_waste': xx.xx, 'total_emission': yy.yy},
    #   {'month': '2025-04', 'total_waste': xx.xx, 'total_emission': yy.yy},
    #   ...
    # ]
    return jsonify(rows)

# ──────────────── REGION-BASED DATA API ────────────────
@stats_bp.route('/region-data/<region_name>')
def get_region_data(region_name):
    """
    주소(region_name) 포함하는 현장들의 폐기물 종류별
    총량 및 탄소배출량을 반환
    """
    conn = get_connection()
    with conn.cursor() as cursor:
        sql = """
            SELECT 
                wm.waste_type,
                SUM(wm.waste_amount)   AS total_waste,
                SUM(wm.carbon_emission) AS total_emission
            FROM waste_management wm
            JOIN construction_sites cs 
              ON wm.site_id = cs.site_id
            WHERE cs.address LIKE %s
            GROUP BY wm.waste_type
        """
        cursor.execute(sql, (f"%{region_name}%",))
        result = cursor.fetchall()
    conn.close()

    data = [
        {
            "waste_type": row[0],
            "total_waste": float(row[1]),
            "total_emission": float(row[2])
        }
        for row in result
    ]
    return jsonify(data)
