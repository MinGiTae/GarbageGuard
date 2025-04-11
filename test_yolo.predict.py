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

print(f'✅ 추론 완료! 결과는 {os.path.join(output_project, output_name)} 에 저장됨')
