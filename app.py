from flask import Flask, render_template, request
from werkzeug.utils import secure_filename
import os
from db.db_manager import get_connection, upload_construction_site, delete_construction_site
# from utils.image_analysis import analyze_image  # ⬅️ YOLO 분석 함수

app = Flask(__name__)

# 업로드 설정
UPLOAD_FOLDER = os.path.join(app.root_path, 'uploads')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# 메인 화면
@app.route('/')
def home():
    return render_template('main.html')

# YOLO 분석 포함된 waste_disposal 라우터
@app.route('/waste_disposal', methods=['GET', 'POST'])
def upload_photo():
    if request.method == 'POST':
        file = request.files['photo']
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(filepath)

            # 이미지 분석 수행
            result_img, detected_objects = analyze_image(filepath)

            return render_template('waste_disposal.html',
                                   result_img=result_img,
                                   detected_objects=detected_objects)
    return render_template('waste_disposal.html')

@app.route('/construction_site_registration')
def registration():
    return render_template('Csr.html')

@app.route('/Create_lift')
def create_lift():
    return render_template('Createlift.html')

@app.route('/db-check')
def db_check():
    try:
        conn = get_connection()
        with conn.cursor() as cursor:
            cursor.execute("SELECT 1")
            result = cursor.fetchone()
        conn.close()
        return f"✅ DB 연결 성공! 결과: {result}"
    except Exception as e:
        return f"❌ DB 연결 실패: {e}"

@app.route('/insert-site', methods=['POST'])
def handle_site():
    action = request.form['action']
    site_name = request.form['site_name']
    address = request.form['address']
    manager_name = request.form['manager_name']

    if action == "insert":
        upload_construction_site(site_name, address, manager_name)
        return "✅ 등록 완료!"
    elif action == "delete":
        delete_construction_site(site_name, address, manager_name)
        return "🗑️ 삭제 완료!"
    else:
        return "❌ 알 수 없는 요청"

if __name__ == '__main__':
    app.run(debug=True)
