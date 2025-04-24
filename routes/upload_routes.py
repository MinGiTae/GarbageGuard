# routes/upload_routes.py

from flask import Blueprint, render_template, request, jsonify
from werkzeug.utils import secure_filename
from datetime import datetime
import os

# from services.predict_yolo import run_yolo_and_save_result
from db.db_manager import (
    get_connection,
    get_site_id_by_name,
    get_object_id_by_name,
    insert_waste_photo,
    insert_waste_management   # ← 월별 통계용 함수
)

upload_bp = Blueprint('upload_bp', __name__)

# 업로드 폴더 및 허용 확장자 설정
UPLOAD_FOLDER      = os.path.join(os.getcwd(), 'uploads')
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

def allowed_file(filename):
    return (
        '.' in filename and
        filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
    )

@upload_bp.route('/waste_disposal', methods=['GET', 'POST'])
def waste_disposal():
    result_img = None
    detected_objects_dict = {}
    prefilled_site_name = ''
    prefilled_date = ''
    site_id = None

    # ─── 1) 갤러리에서 넘어오는 GET 파라미터로 결과 재조회 ───
    if request.method == 'GET':
        site_arg   = request.args.get('site_name')
        date_arg   = request.args.get('site_date')
        result_arg = request.args.get('result_img')  # "현장명/파일명.jpg"

        if site_arg and date_arg and result_arg:
            prefilled_site_name = site_arg
            prefilled_date      = date_arg
            result_img          = result_arg
            site_id             = get_site_id_by_name(site_arg)

            # DB에서 저장된 detection_summary 로드
            if site_id:
                conn = get_connection()
                with conn.cursor() as cursor:
                    cursor.execute("""
                        SELECT detection_summary
                          FROM waste_photos
                         WHERE site_id=%s
                           AND image_filename=%s
                    """, (site_id, os.path.basename(result_arg)))
                    row = cursor.fetchone()
                conn.close()

                if row and row.get('detection_summary'):
                    for part in row['detection_summary'].split(','):
                        name, cnt = part.strip().split(' ')
                        detected_objects_dict[name] = int(cnt.rstrip('개'))

    # ─── 2) 새 이미지 업로드 & YOLO 분석 처리 ───
    if request.method == 'POST':
        file      = request.files.get('photo')
        site_name = request.form.get('site_name','').strip()
        date_str  = request.form.get('site_date','uploaded_image').strip()
        prefilled_site_name = site_name
        prefilled_date      = date_str
        site_id             = get_site_id_by_name(site_name)

        if file and allowed_file(file.filename):
            # (1) 원본 이미지 저장
            filename = secure_filename(file.filename)
            filepath = os.path.join(UPLOAD_FOLDER, filename)
            file.save(filepath)

            # (2) YOLO 분석 실행
            save_dir  = os.path.join("runs", "detect", site_name.replace(' ', '_'))
            save_name = f"{date_str}.jpg"
            result_img, detected_objects_dict = run_yolo_and_save_result(
                input_img_path=filepath,
                save_dir=save_dir,
                save_name=save_name
            )

            # (3) 브라우저에 보여줄 경로로 변환
            if result_img:
                result_img = os.path.join(
                    site_name.replace(' ', '_'),
                    save_name
                ).replace('\\', '/')

    # ─── 3) 템플릿 렌더링 ───
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
    data            = request.get_json()
    site_name       = data.get('site_name','').strip()
    date_str        = data.get('site_date','').strip()       # "YYYY-MM-DD"
    result_img_path = data.get('result_img','')
    detected        = data.get('detected', {})

    # 1) 필수 값 체크
    if not site_name or not date_str or not result_img_path or not detected:
        return jsonify({'message':'❌ 누락된 정보가 있어 저장할 수 없습니다.'}), 400

    # 2) site_id 조회
    site_id = get_site_id_by_name(site_name)
    if not site_id:
        return jsonify({'message':f"❌ '{site_name}'은(는) 등록된 현장이 아닙니다."}), 400

    # 3) summary 생성
    summary = ', '.join(f"{k} {v}개" for k,v in detected.items())

    # 4) 대표 객체 선정
    try:
        main_object = max(detected, key=detected.get)
    except (ValueError, TypeError):
        return jsonify({'message':'❌ 탐지된 객체가 없습니다.'}), 400

    # 5) object_id 조회
    object_id = get_object_id_by_name(main_object)
    if not object_id:
        return jsonify({'message':f"❌ '{main_object}' 객체를 찾을 수 없습니다."}), 400

    # 6) 날짜 파싱 (DB에 쓰일 uploaded_at)
    try:
        upload_dt = datetime.strptime(date_str, '%Y-%m-%d')
    except ValueError:
        upload_dt = datetime.now()

    # 7) 파일명만 분리
    filename = os.path.basename(result_img_path)

    # 8) DB 저장
    try:
        # 8a) 분석 이미지 & 요약을 waste_photos 테이블에 저장
        insert_waste_photo(
            site_id=site_id,
            object_id=object_id,
            image_filename=filename,
            detection_summary=summary,
            uploaded_at=upload_dt
        )

        # 8b) 월별 통계용 waste_management 테이블에도 저장
        amount = detected[main_object]       # 개수
        carbon = amount * 0.5                # kg
        insert_waste_management(
            site_id=site_id,
            waste_type=main_object,
            waste_amount=amount,
            carbon_emission=carbon,
            disposal_date=date_str      # "YYYY-MM-DD" 형식 그대로
        )

        return jsonify({'message':'✅ 저장 완료!'})
    except Exception as e:
        print("[❌ DB 저장 오류]", e)
        return jsonify({'message':'❌ 저장 중 오류가 발생했습니다.'}), 500
