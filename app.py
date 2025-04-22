from flask import Flask, render_template, request, send_from_directory, jsonify
from werkzeug.utils import secure_filename
import os, uuid

from db.db_manager import get_connection
from services.predict_yolo import run_yolo_and_save_result

app = Flask(__name__)
UPLOAD_FOLDER = os.path.join(app.root_path, 'uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def home():
    return render_template('main.html')

@app.route('/waste_disposal', methods=['GET', 'POST'])
def waste_disposal():
    result_img = None
    detected_objects_dict = {}

    if request.method == 'POST':
        file = request.files.get('photo')
        site_name = request.form.get('site_name', 'default_site').strip().replace(' ', '_')
        date_str = request.form.get('site_date', 'uploaded_image')
        print("[📥 file 객체 수신됨]", file)

        if file and allowed_file(file.filename):
            print("  ✅ 확장자 통과됨 → 저장 및 YOLO 분석")
            filename = secure_filename(file.filename)
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(filepath)
            print(f"  ✅ 저장 완료: {filepath}")

            save_dir = os.path.join("runs", "detect", site_name)
            save_name = f"{date_str}.jpg"

            result_img, detected_objects_dict = run_yolo_and_save_result(
                input_img_path=filepath,
                save_dir=save_dir,
                save_name=save_name
            )

            if result_img:
                result_img = os.path.join(site_name, save_name).replace('\\', '/')
        else:
            print("  ❌ 유효하지 않은 파일 또는 파일 없음")

    print("[🌐 템플릿 전달값]")
    print("  📷 result_img =", result_img)
    print("  🧾 detected_objects_dict =", detected_objects_dict)
    print("------------------------------------------------\n")

    return render_template('waste_disposal.html',
                           result_img=result_img,
                           detected_objects_dict=detected_objects_dict)

@app.route('/result/<path:filename>')
def result_file(filename):
    return send_from_directory('runs/detect', filename)

# @app.route('/gallery')
# def gallery():
#     base_path = os.path.join("runs", "detect")
#     galleries = {}
#
#     if os.path.exists(base_path):
#         for site_name in os.listdir(base_path):
#             site_path = os.path.join(base_path, site_name)
#             if os.path.isdir(site_path):
#                 images = []
#                 for img in os.listdir(site_path):
#                     if img.lower().endswith(('.png', '.jpg', '.jpeg')):
#                         images.append(f"{site_name}/{img}")
#                 if images:
#                     galleries[site_name] = sorted(images, reverse=True)
#
#     return render_template('gallery.html', galleries=galleries)



# 현장별,폐기물 종류 불러오는 함수
@app.route('/region-data/<region_name>')
def get_region_data(region_name):
    conn = get_connection()
    with conn.cursor() as cursor:
        sql = """
            SELECT 
                wm.waste_type,
                SUM(wm.waste_amount) AS total_waste,
                SUM(wm.carbon_emission) AS total_emission
            FROM waste_management wm
            JOIN construction_sites cs ON wm.site_id = cs.site_id
            WHERE cs.address LIKE %s
            GROUP BY wm.waste_type
        """
        # LIKE 검색으로 서울특별시, 경기도 수원시 등 포함 가능
        cursor.execute(sql, (f"%{region_name}%",))
        result = cursor.fetchall()
    conn.close()

    # 결과 정리해서 JSON 응답
    data = [
        {
            "waste_type": row[0],
            "total_waste": float(row[1]),
            "total_emission": float(row[2])
        }
        for row in result
    ]

    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
