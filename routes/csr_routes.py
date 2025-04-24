from flask import Blueprint, render_template, request, redirect, flash
from db.db_manager import (
    get_all_construction_sites,
    upload_construction_site,
    insert_company,
    get_all_companies
)

csr_bp = Blueprint('csr', __name__, url_prefix='/csr')

# ──────────────── 페이지 렌더 ────────────────
@csr_bp.route('/', methods=['GET'])
def show_csr():
    companies = get_all_companies()
    return render_template('GG_003_csr.html', companies=companies)

# ──────────────── 회사 등록 ────────────────
@csr_bp.route('/register_company', methods=['POST'])
def register_company():
    try:
        insert_company(
            request.form['company_name'],
            request.form.get('address'),
            request.form.get('ceo_name'),
            request.form.get('contact')
        )
        flash('✅ 회사 등록에 성공했습니다.', 'success')
    except Exception as e:
        flash(f'❌ 회사 등록 중 오류 발생: {str(e)}', 'error')
    return redirect('/csr/')

# ──────────────── 건설현장 등록 ────────────────
@csr_bp.route('/register_site', methods=['POST'])
def register_site():
    try:
        site_name = request.form['site_name']
        address = request.form['address']
        manager_name = request.form['manager_name']
        latitude = request.form['latitude']
        longitude = request.form['longitude']
        company_id = request.form['company_id']

        upload_construction_site(
            site_name,
            address,
            manager_name,
            float(latitude),
            float(longitude),
            int(company_id)
        )
        flash('✅ 건설 현장 등록에 성공했습니다.', 'success')
    except Exception as e:
        flash(f'❌ 건설 현장 등록 중 오류 발생: {str(e)}', 'error')
    return redirect('/csr/')
