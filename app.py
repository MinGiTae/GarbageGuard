from flask import Flask, render_template
import os

app = Flask(__name__)

# 정적 파일 위치 (기본값이 static이라 따로 설정 안 해도 됨)
# 템플릿 폴더는 templates/ 자동 인식

# ✅ 홈 페이지 → 메인 화면 렌더링
@app.route('/')
def home():
    return render_template('Main.html')

@app.route('/waste_disposal')
def waste_disposal():
    return render_template('waste_disposal.html')

@app.route('/construction_site_registration')
def construction_site_registration():
    return render_template('construction_site_registration.html')


# 🔒 추후 기능은 비활성화 (주석 처리 또는 삭제)
"""
from flask import request, redirect, url_for, send_from_directory
from werkzeug.utils import secure_filename
from services.upload_service import handle_upload
from db.db_manager import get_connection

UPLOAD_FOLDER = os.path.join(app.root_path, 'uploads')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload', methods=['GET', 'POST'])
def upload_image():
    ...

@app.route('/show/<filename>')
def show_image(filename):
    ...

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    ...

@app.route('/db-check')
def db_check():
    ...
"""

# ✅ 서버 실행
if __name__ == '__main__':
    app.run(debug=True)
