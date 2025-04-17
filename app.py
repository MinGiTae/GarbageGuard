import os
from flask import Flask, render_template, request, jsonify, url_for, send_from_directory
from werkzeug.utils import secure_filename
from ultralytics import YOLO
from PIL import Image

app = Flask(__name__)

UPLOAD_FOLDER = os.path.join(app.root_path, 'uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(fn):
    return '.' in fn and fn.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# ✅ CODD 재학습한 모델(best.pt) 경로
WEIGHTS_PATH = os.path.join(
    app.root_path,
    'runs', 'detect', 'train_codd_fixed', 'weights', 'best.pt'
)
model = YOLO(WEIGHTS_PATH)

@app.route('/')
def home():
    return render_template('main.html')

@app.route('/waste_disposal')
def waste_disposal():
    return render_template('waste_disposal.html')

@app.route('/detect', methods=['POST'])
def detect():
    file = request.files.get('image')
    if not file or not allowed_file(file.filename):
        return jsonify({'error': 'Invalid file'}), 400

    filename = secure_filename(file.filename)
    src_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(src_path)

    # 1) 예측 (저장 없이 결과만 가져오기)
    results = model.predict(source=src_path, save=False)
    res = results[0]

    # 2) 박스 그린 이미지 저장
    img_with_boxes = res.plot()  # numpy array
    out_name = f"det_{filename}"
    out_path = os.path.join(app.config['UPLOAD_FOLDER'], out_name)
    Image.fromarray(img_with_boxes).save(out_path)

    # 3) 클래스별 탐지 결과 집계
    counts = {}
    for cls in res.boxes.cls.cpu().numpy().astype(int):
        name = res.names[cls]
        counts[name] = counts.get(name, 0) + 1

    # 4) 결과 반환
    result_url = url_for('uploaded_file', filename=out_name)
    return jsonify({'result_url': result_url, 'counts': counts})

@app.route('/uploads/<path:filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

if __name__ == '__main__':
    app.run(debug=True)
