from flask import Flask, render_template, request, redirect, url_for, send_from_directory
from werkzeug.utils import secure_filename
import os
from services.upload_service import handle_upload
from db.db_manager import get_connection

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
    result = get_connection()
    return result

# 서버 실행
if __name__ == '__main__':
    app.run(debug=True)
