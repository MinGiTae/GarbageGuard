import cv2
import os

def analyze_image(filepath):
    try:
        img = cv2.imread(filepath)
        filename = os.path.basename(filepath)
        print(f"[분석] 파일명: {filename}")

        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        avg_brightness = gray.mean()
        print(f"[분석] 평균 밝기: {avg_brightness:.2f}")

        if avg_brightness < 80:
            predicted_type = "어두운 폐기물"
        elif avg_brightness < 160:
            predicted_type = "중간톤 폐기물"
        else:
            predicted_type = "밝은 폐기물"

        carbon_estimate = round((255 - avg_brightness) / 10, 2)

        print(f"[분석] 예측 타입: {predicted_type}")
        print(f"[분석] 탄소 추정량: {carbon_estimate} kgCO₂")

        return predicted_type, carbon_estimate
    except Exception as e:
        print(f"[오류] 이미지 분석 실패: {str(e)}")
        return "분석 실패", 0.0

# 테스트
if __name__ == "__main__":
    test_img_path = "garbage.jpg"

    if os.path.exists(test_img_path):
        print("[테스트 시작]")
        analyze_image(test_img_path)
        print("[테스트 종료]")
    else:
        print(f"[오류] 파일 없음: {test_img_path}")
