from ultralytics import YOLO
import os

#  모델 경로
model_path = 'runs/detect/train_codd5/weights/best.pt'

#  테스트 이미지 폴더
test_folder = 'test_images'

#  결과 저장 위치
output_project = 'runs/detect'
output_name = 'predict_test'

# 모델 로드
model = YOLO(model_path)

# 예측 실행
results = model.predict(
    source=test_folder,
    save=True,           # 결과 이미지 저장
    save_txt=True,       # 라벨 txt도 저장
    project=output_project,
    name=output_name
)

print(f'추론 완료 결과 {os.path.join(output_project, output_name)} 에 저장')

# from ultralytics import YOLO
# import os

# # 모델 불러오기
# model = YOLO('runs/detect/cw3_experiment3/weights/best.pt')
#
# # 테스트 이미지 폴더 경로
# image_dir = 'test_images'
# image_list = os.listdir(image_dir)
#
# # 예측 수행
# for image_name in image_list:
#     image_path = os.path.join(image_dir, image_name)
#     results = model.predict(source=image_path, save=True, conf=0.25)
#     print(f"[✅] 예측 완료: {image_name}")
#
# print("모든 이미지에 대한 예측이 완료되었습니다.")
#
# from ultralytics import YOLO
#
# model = YOLO("runs/detect/cw3_experiment3/weights/best.pt")
#
# results = model.predict(
#     source="test_images/sample3.png",  # ← 너가 넣은 항공샷
#     conf=0.5,      # ← confidence threshold ↑
#     iou=0.5,       # ← 겹치는 박스 제거 강도
#     save=True,
#     save_txt=False,
#     show_labels=True,
#     show_conf=True
# )
#
