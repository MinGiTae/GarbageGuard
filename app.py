from flask import Flask, render_template, request, redirect, url_for, send_from_directory
from werkzeug.utils import secure_filename
import os
from services.upload_service import handle_upload
from db.db_manager import get_connection
from db.db_manager import upload_construction_site
from db.db_manager import delete_construction_site


app = Flask(__name__)

# 업로드 설정
UPLOAD_FOLDER = os.path.join(app.root_path, 'uploads')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

# 파일 허용 확장자 검사
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# 메인 화면
@app.route('/')
def home():
    return render_template('main.html')

@app.route('/waste_disposal')
def upload_photo():
    return render_template('waste_disposal.html')

@app.route('/construction_site_registration')
def registration():
    return render_template('Csr.html')

@app.route('/Create_lift')
def create_lift():
    return render_template('Createlift.html')

# DB 연결 확인용
@app.route('/db-check')
def db_check():

    # result = get_connection()
    # return result
    try:
        conn = get_connection()
        with conn.cursor() as cursor:
            cursor.execute("SELECT 1")  # ✅ DB 응답만 확인
            result = cursor.fetchone()
        conn.close()
        return f"✅ DB 연결 성공! 결과: {result}"
    except Exception as e:
        return f"❌ DB 연결 실패: {e}"


# @app.route('/insert-site', methods=['POST'])
# def insert_site():
#     site_name = request.form['site_name']
#     address = request.form['address']
#     manager_name = request.form['manager_name']
#
#     upload_construction_site(site_name, address, manager_name)  # DB 저장
#
#     return "✅ 등록 완료!"
#
# @app.route('/delete-site', methods=['POST'])
# def delete_site():
#     if request.form['action'] == 'delete':
#         site_name = request.form['site_name']
#         address = request.form['address']
#         manager_name = request.form['manager_name']
#         delete_construction_site(site_name, address, manager_name)
#         return "삭제 완료"

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


# 서버 실행
if __name__ == '__main__':
    app.run(debug=True)
