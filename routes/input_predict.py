from flask import Blueprint, request, jsonify
from config.material_map import MATERIAL_ALIASES, MATERIAL_TO_WASTE

input_predict_bp = Blueprint('input_predict_bp', __name__)

@input_predict_bp.route('/input_waste', methods=['POST'])
def predict_waste():
    data = request.get_json()
    material_input = data.get('material', '').strip().lower()
    amount = float(data.get('amount', 0))

    # 다국어 → 대표 자재명 변환
    normalized = MATERIAL_ALIASES.get(material_input)
    if not normalized:
        return jsonify({"error": f"'{material_input}' 자재는 등록되어 있지 않습니다."}), 400

    mapping = MATERIAL_TO_WASTE[normalized]
    predicted_kg = amount * mapping['factor']

    return jsonify({
        "material": material_input,
        "normalized": normalized,
        "waste_type": mapping["type"],
        "amount": amount,
        "predicted_kg": predicted_kg
    })
