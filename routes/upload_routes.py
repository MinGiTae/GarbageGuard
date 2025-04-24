from flask import Blueprint, render_template, request, jsonify
from werkzeug.utils import secure_filename
from datetime import datetime
import os

# from services.predict_yolo import run_yolo_and_save_result
from db.db_manager import (
    get_site_id_by_name,
    get_object_id_by_name,
    insert_waste_photo,
    insert_waste_management,
    get_detection_summary
)

upload_bp = Blueprint('upload_bp', __name__)

UPLOAD_FOLDER = os.path.join(os.getcwd(), 'uploads')
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@upload_bp.route('/waste_disposal', methods=['GET', 'POST'])
def waste_disposal():
    result_img = None
    detected_objects_dict = {}
    prefilled_site_name = ''
    prefilled_date = ''
    site_id = None

    # ─── 1) 갤러리에서 GET 요청으로 결과 불러오기 ───
    if request.method == 'GET':
        site_arg   = request.args.get('site_name')
        date_arg   = request.args.get('site_date')
        result_arg = request.args.get('result_img')

        if site_arg and date_arg and result_arg:
            prefilled_site_name = site_arg
            prefilled_date = date_arg
            result_img = result_arg
            site_id = get_site_id_by_name(site_arg)

            if site_id:
                summary = get_detection_summary(site_id, os.path.basename(result_arg))
                if summary:
                    for part in summary.split(','):
                        name, cnt = part.strip().split(' ')
                        detected_objects_dict[name] = int(cnt.rstrip('개'))

    # ─── 2) POST 요청으로 이미지 업로드 및 분석 ───
    if request.method == 'POST':
        file = request.files.get('photo')
        site_name = request.form.get('site_name','').strip()
        date_str = request.form.get('site_date','uploaded_image').strip()
        prefilled_site_name = site_name
        prefilled_date = date_str
        site_id = get_site_id_by_name(site_name)

        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            filepath = os.path.join(UPLOAD_FOLDER, filename)
            file.save(filepath)

            save_dir = os.path.join("runs", "detect", site_name.replace(' ', '_'))
            save_name = f"{date_str}.jpg"
            result_img, detected_objects_dict = run_yolo_and_save_result(
                input_img_path=filepath,
                save_dir=save_dir,
                save_name=save_name
            )

            if result_img:
                result_img = os.path.join(
                    site_name.replace(' ', '_'),
                    save_name
                ).replace('\\', '/')

    return render_template(
        'GG_002_waste_disposal.html',
        result_img=result_img,
        detected_objects_dict=detected_objects_dict,
        prefilled_site_name=prefilled_site_name,
        prefilled_date=prefilled_date,
        site_id=site_id
    )

@upload_bp.route('/save_result', methods=['POST'])
def save_result():
    data = request.get_json()
    site_name = data.get('site_name','').strip()
    date_str = data.get('site_date','').strip()
    result_img_path = data.get('result_img','')
    detected = data.get('detected', {})

    if not site_name or not date_str or not result_img_path or not detected:
        return jsonify({'message':'❌ 누락된 정보가 있어 저장할 수 없습니다.'}), 400

    site_id = get_site_id_by_name(site_name)
    if not site_id:
        return jsonify({'message':f"❌ '{site_name}'은(는) 등록된 현장이 아닙니다."}), 400

    summary = ', '.join(f"{k} {v}개" for k,v in detected.items())

    try:
        main_object = max(detected, key=detected.get)
    except (ValueError, TypeError):
        return jsonify({'message':'❌ 탐지된 객체가 없습니다.'}), 400

    object_id = get_object_id_by_name(main_object)
    if not object_id:
        return jsonify({'message':f"❌ '{main_object}' 객체를 찾을 수 없습니다."}), 400

    try:
        upload_dt = datetime.strptime(date_str, '%Y-%m-%d')
    except ValueError:
        upload_dt = datetime.now()

    filename = os.path.basename(result_img_path)

    try:
        insert_waste_photo(
            site_id=site_id,
            object_id=object_id,
            image_filename=filename,
            detection_summary=summary,
            uploaded_at=upload_dt
        )

        amount = detected[main_object]
        carbon = amount * 0.5
        insert_waste_management(
            site_id=site_id,
            waste_type=main_object,
            waste_amount=amount,
            carbon_emission=carbon,
            disposal_date=date_str
        )

        return jsonify({'message':'✅ 저장 완료!'})
    except Exception as e:
        print("[❌ DB 저장 오류]", e)
        return jsonify({'message':'❌ 저장 중 오류가 발생했습니다.'}), 500