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

# 홈 페이지
@app.route('/')
def home():
    return render_template('index.html')

# 업로드 페이지
@app.route('/upload', methods=['GET', 'POST'])
def upload_image():
    if request.method == 'POST':
        if 'image' not in request.files:
            return "이미지 파일이 없습니다."
        file = request.files['image']
        if file.filename == '':
            return "파일이 선택되지 않았습니다."
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(filepath)

            # OpenCV/YOLO 분석 및 DB 저장
            handle_upload(filepath, filename)

            return redirect(url_for('show_image', filename=filename))
        return "❌ 허용되지 않는 파일 형식입니다."
    return render_template('upload.html')

# 업로드 이미지 보기
@app.route('/show/<filename>')
def show_image(filename):
    return render_template('show.html', filename=filename)

# 업로드된 파일 제공
@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

# DB 연결 확인용
@app.route('/db-check')
def db_check():
    result = get_connection()
    return result

# 서버 실행
if __name__ == '__main__':
    app.run(debug=True)
