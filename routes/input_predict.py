# routes/input_predict.py
from flask import Blueprint, request, jsonify

input_predict_bp = Blueprint('input_predict_bp', __name__)

MATERIAL_TO_WASTE = {
    "콘크리트": {"type": "폐콘크리트", "factor": 300},
    "철근": {"type": "폐금속류", "factor": 150},
    "석고보드": {"type": "폐보드류", "factor": 500},
    "목재": {"type": "폐목재", "factor": 400},
    "타일": {"type": "폐타일 및 폐도자기", "factor": 250},
}

@input_predict_bp.route('/input_waste', methods=['POST'])
def predict_waste():
    data = request.get_json()
    material = data.get('material')
    amount = float(data.get('amount', 0))

    if material not in MATERIAL_TO_WASTE:
        return jsonify({"error": f"{material} 자재 정보가 등록되어 있지 않습니다."}), 400

    mapping = MATERIAL_TO_WASTE[material]
    predicted_kg = amount * mapping['factor']

    return jsonify({
        "material": material,
        "waste_type": mapping["type"],
        "amount": amount,
        "predicted_kg": predicted_kg
    })
