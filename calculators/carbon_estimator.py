# 탄소 배출량 계수 (예시 단위: kg CO2 per object)
CARBON_MAP = {
    "Plastic bottle": 0.1,
    "Can": 0.05,
    "Glass bottle": 0.12,
    "Battery": 0.3,
    "Other": 0.08,
    # ...
}

def estimate_carbon(detected_objects):
    """
    detected_objects: list of class names detected by YOLO (예: ["Can", "Plastic bottle", "Can"])
    returns: total CO2 emission in kg
    """
    total = 0.0
    for obj in detected_objects:
        carbon = CARBON_MAP.get(obj, 0.05)  # 기본값
        total += carbon
    return round(total, 3)
