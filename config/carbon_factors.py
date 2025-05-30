# 자재별 탄소 배출 계수 정의
# 단위: kg CO₂ per kg 자재 (톤 기준 값을 1000으로 나눈 것)
#
# 출처: 한국에너지공단 TIPS (탄소정보 제공시스템)
#        "국가 온실가스 배출계수 통합DB" → [건축자재/건설 부문 항목 참조]
#        https://tips.energy.or.kr/carbon/Ggas_tatistics03.do
#
# 변환 방법:
#     - 원자료는 대부분 "kg CO₂ / ton 자재" 단위로 제공됨
#     - 계산 편의를 위해 모두 "kg CO₂ / kg 자재" 단위로 변환함 (→ ÷ 1000)
#     - 예: 127 kg CO₂/ton → 0.127 kg CO₂/kg

CARBON_EMISSION_FACTORS = {
    "콘크리트": 0.127,     # 콘크리트: 127 kg CO₂/ton
    "벽돌": 0.220,         # 벽돌: 220 kg CO₂/ton
    "목재": 0.150,         # 목재: 150 kg CO₂/ton
    "철강": 2.500,         # 철강: 2500 kg CO₂/ton
    "플라스틱": 2.000,     # 플라스틱: 2000 kg CO₂/ton
    "유리": 0.850,         # 유리: 850 kg CO₂/ton
    "석고보드": 0.100,     # 석고보드: 100 kg CO₂/ton
    "타일": 0.950,         # 타일: 950 kg CO₂/ton
    "스티로폼": 3.000,     # 스티로폼(발포수지류): 3000 kg CO₂/ton
    "파이프": 1.800,       # 파이프(금속 혼합 추정): 1800 kg CO₂/ton
    "잡자재": 0.500        # 잡자재(혼합평균 추정): 500 kg CO₂/ton
}
