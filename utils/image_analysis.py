# from ultralytics import YOLO
# import os
# import shutil
# from collections import Counter
#
# model_path = "best.pt"
# if not os.path.exists(model_path):
#     raise FileNotFoundError(f"💥 YOLO 모델 파일이 '{model_path}'에 존재하지 않습니다. 파일 경로를 확인하세요.")
#
# model = YOLO(model_path)
#
# def analyze_image(filepath):
#     results = model.predict(source=filepath, save=True, conf=0.5)
#     result = results[0]
#
#     saved_dir = result.save_dir
#     filename = os.path.basename(filepath)
#     result_img_path = os.path.join(saved_dir, filename)
#
#     static_path = os.path.join("static", "result", filename)
#     shutil.copy(result_img_path, static_path)
#
#     names = model.names
#     class_ids = result.boxes.cls.tolist()
#     class_labels = [names[int(i)] for i in class_ids]
#     detected_count = dict(Counter(class_labels))
#
#     return os.path.join("result", filename), detected_count
