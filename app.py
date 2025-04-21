from flask import Flask, render_template, request, send_from_directory
from werkzeug.utils import secure_filename
import os, uuid
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

if __name__ == '__main__':
    app.run(debug=True)
