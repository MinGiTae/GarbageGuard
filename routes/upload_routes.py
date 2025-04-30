# routes/upload_routes.py

from flask import Blueprint, render_template, request, jsonify, send_from_directory
from werkzeug.utils import secure_filename
from datetime import datetime, date
import os

from db.db_manager import (
    get_all_companies,
    get_all_sites,
    get_company_by_id,
    get_site_id_by_name,
    get_site_by_id,
    get_object_id_by_name,
    insert_waste_photo,
    insert_waste_management,
    get_detection_summary,
    get_monthly_stats
)
from services.predict_yolo import run_yolo_and_save_result

upload_bp = Blueprint('upload_bp', __name__)

@upload_bp.route('/result/<path:subpath>')
def result_file(subpath):
    base = os.path.join(os.getcwd(), 'runs', 'detect')
    return send_from_directory(base, subpath)

UPLOAD_FOLDER = os.path.join(os.getcwd(), 'uploads')
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
def allowed_file(fn):
    return '.' in fn and fn.rsplit('.',1)[1].lower() in ALLOWED_EXTENSIONS

@upload_bp.route('/waste_disposal', methods=['GET', 'POST'])
def waste_disposal():
    company_list = get_all_companies()
    site_list    = get_all_sites()

    # 1) Collect parameters from GET or POST
    pre_site_id    = request.values.get('site_id','').strip()
    pre_date       = request.values.get('site_date','').strip() or date.today().isoformat()
    result_img     = request.values.get('result_img','').strip() or None

    # ↳ Fallback: if no site_id but gallery passed site_name, convert it
    if not pre_site_id:
        param_site_name = request.values.get('site_name','').strip()
        if param_site_name:
            sid = get_site_id_by_name(param_site_name)
            pre_site_id = str(sid) if sid else ''

    pre_company_id   = ''
    pre_company_name = ''
    detected_objects_dict = {}

    # 2) Lookup site & company by ID
    pre_site_name = ''
    if pre_site_id.isdigit():
        site_info = get_site_by_id(int(pre_site_id))
        if site_info:
            pre_site_name    = site_info['site_name']
            pre_company_id   = site_info['company_id']
            comp = get_company_by_id(pre_company_id)
            pre_company_name = comp['company_name'] if comp else ''

    # 3) If result_img passed (e.g. gallery), load its summary
    if result_img and pre_site_id.isdigit():
        summary = get_detection_summary(int(pre_site_id), os.path.basename(result_img))
        if summary:
            for part in summary.split(','):
                name, cnt = part.strip().split(' ')
                detected_objects_dict[name] = int(cnt.replace('개',''))

    # 4) Handle file upload & YOLO on POST
    if request.method == 'POST':
        file         = request.files.get('photo')
        form_site_id = request.form.get('site_id','').strip()
        form_date    = request.form.get('site_date','').strip()

        if form_site_id:
            pre_site_id = form_site_id
        if form_date:
            pre_date = form_date

        # re-lookup after form override
        if pre_site_id.isdigit():
            info = get_site_by_id(int(pre_site_id))
            if info:
                pre_site_name    = info['site_name']
                pre_company_id   = info['company_id']
                comp             = get_company_by_id(pre_company_id)
                pre_company_name = comp['company_name'] if comp else ''

        if file and allowed_file(file.filename) and pre_site_name:
            filename    = secure_filename(file.filename)
            upload_path = os.path.join(UPLOAD_FOLDER, filename)
            file.save(upload_path)

            folder   = pre_site_name.replace(' ','_')
            save_dir = os.path.join('runs','detect',folder)
            os.makedirs(save_dir, exist_ok=True)
            save_name = f"{folder}_{pre_date}.jpg"

            result_img, detected_objects_dict = run_yolo_and_save_result(
                input_img_path=upload_path,
                save_dir=save_dir,
                save_name=save_name
            )
            if result_img:
                result_img = f"{folder}/{save_name}"

    # 5) After POST, if summary still empty but we have result_img, reload
    if result_img and not detected_objects_dict and pre_site_id.isdigit():
        summary = get_detection_summary(int(pre_site_id), os.path.basename(result_img))
        if summary:
            for part in summary.split(','):
                name, cnt = part.strip().split(' ')
                detected_objects_dict[name] = int(cnt.replace('개',''))

    # 6) Render the template with all prefilled values
    return render_template(
        'GG_002_waste_disposal.html',
        company_list=company_list,
        site_list=site_list,
        result_img=result_img,
        detected_objects_dict=detected_objects_dict,
        prefilled_company_id=pre_company_id,
        prefilled_company_name=pre_company_name,
        prefilled_site_id=pre_site_id,
        prefilled_site_name=pre_site_name,
        prefilled_date=pre_date
    )

@upload_bp.route('/save_result', methods=['POST'])
def save_result():
    data         = request.get_json() or {}
    company_id   = data.get('company_id')
    site_id      = data.get('site_id')
    site_name    = data.get('site_name','').strip()
    date_str     = data.get('site_date','').strip()
    result_img_p = data.get('result_img','').strip()
    detected     = data.get('detected',{})

    if not all([company_id, site_id, site_name, date_str, result_img_p, detected]):
        return jsonify({'message':'❌ 누락된 정보'}),400

    site_info = get_site_by_id(int(site_id))
    if not site_info or str(site_info['company_id'])!=str(company_id):
        return jsonify({'message':'❌ 잘못된 현장'}),400

    summary = ', '.join(f"{k} {v}개" for k,v in detected.items())
    try:
        main_obj = max(detected, key=detected.get)
    except:
        return jsonify({'message':'❌ 객체 없음'}),400

    object_id = get_object_id_by_name(main_obj)
    if not object_id:
        return jsonify({'message':f"❌ '{main_obj}' 없음"}),400

    try:
        dt = datetime.strptime(date_str,'%Y-%m-%d')
    except:
        dt = datetime.now()

    fn = os.path.basename(result_img_p)
    try:
        insert_waste_photo(
            site_id=site_info['site_id'],
            object_id=object_id,
            image_filename=fn,
            detection_summary=summary,
            uploaded_at=dt
        )
        amt = detected[main_obj]
        insert_waste_management(
            site_id=site_info['site_id'],
            waste_type=main_obj,
            waste_amount=amt,
            carbon_emission=amt*0.5,
            disposal_date=date_str
        )
    except Exception as e:
        print('[DB❌]',e)
        return jsonify({'message':'❌ 저장 실패'}),500

    return jsonify({'message':'✅ 저장 완료!'})

@upload_bp.route('/monthly_stats', methods=['GET'])
def waste_monthly_stats():
    sid  = request.args.get('site_id', type=int)
    rows = get_monthly_stats(sid)
    result = [{'month':r['month'], 'total_waste':r['total_waste'], 'total_emission':r['total_emission']} for r in rows]
    return jsonify(result)
