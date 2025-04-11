# from ultralytics import YOLO
# import cv2
# import numpy as np
# import requests
# from PIL import Image
# from io import BytesIO
#
# # 1. YOLO 모델 불러오기
# model = YOLO('yolov8n.pt')
#
# # 2. 이미지 로드
# # img_url = 'https://media.roboflow.com/notebooks/examples/dog.jpeg'
# img_url = 'https://ultralytics.com/images/bus.jpg'
#
# response = requests.get(img_url)
# img_pil = Image.open(BytesIO(response.content)).convert('RGB')
# img = np.array(img_pil)
#
# # 3. 예측 수행
# results = model.predict(img, conf=0.25)
#
# # 4. 시각화
# for result in results:
#     boxes = result.boxes.xyxy.cpu().numpy().astype(int)
#     scores = result.boxes.conf.cpu().numpy()
#     class_ids = result.boxes.cls.cpu().numpy().astype(int)
#     names = result.names
#
#     for box, score, class_id in zip(boxes, scores, class_ids):
#         x1, y1, x2, y2 = box
#         label = f"{names[class_id]} {score:.2f}"
#
#         # 바운딩 박스
#         cv2.rectangle(img, (x1, y1), (x2, y2), (0, 255, 0), 2)
#
#         # 라벨 표시
#         cv2.putText(img, label, (x1, y1 - 10),
#                     cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 0), 2)
#
# # 5. 이미지 보기
# cv2.imshow('YOLOv8 Detection', img)
# cv2.waitKey(0)
# cv2.destroyAllWindows()

from ultralytics import YOLO

# YOLOv8 모델 로드
model = YOLO('yolov8n.pt')

# IP Webcam 스트리밍 주소로 예측 실행
model.predict(
    source='http://192.168.113.142:8080/video',
    conf=0.25,
    show=True
)