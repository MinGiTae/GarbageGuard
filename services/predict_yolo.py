import os

from ultralytics import YOLO


# from ultralytics import YOLO

def run_yolo_and_save_result(input_img_path, save_dir, save_name):
    """
    YOLOv8 모델을 이용해 input_img_path의 이미지를 분석하고,
    분석 결과 이미지를 save_dir/save_name 경로에 저장합니다.

    Parameters:
    - input_img_path (str): 원본 이미지 경로
    - save_dir (str): 결과 이미지 저장 폴더 경로
    - save_name (str): 저장할 파일 이름 (예: 2024-04-22.jpg)

    Returns:
    - result_img_path (str): 실제 저장된 결과 이미지 경로
    - label_counts (dict): 탐지된 객체별 개수
    """
    model = YOLO("runs/detect/train_codd_final7/weights/best.pt")

    # YOLO 예측 수행 (저장 없이 메모리에서 처리)
    results = model.predict(
        source=input_img_path,
        save=False,
        save_txt=False,
        save_conf=True
    )

    # 저장 디렉토리 생성
    os.makedirs(save_dir, exist_ok=True)
    result_img_path = os.path.join(save_dir, save_name)

    # 시각화 이미지 저장
    for r in results:
        r.save(filename=result_img_path)

    # 객체 수 세기
    label_counts = {}
    for box in results[0].boxes:
        cls = int(box.cls)
        label = results[0].names[cls]
        label_counts[label] = label_counts.get(label, 0) + 1

    return result_img_path, label_counts