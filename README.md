# 🛠 GarbageGuard

읽으세요 ^^

ISO 14001 기반 건설 현장 포해물 관리 시스템

---

## 📌 프로젝트 구조 (Flask + HTML/CSS/JS)

```
GarbageGuard/
├── app.py                  # Flask 메인 서버
├── requirements.txt        # 필요 패키지 목록
├── templates/              # HTML 파일 저장 폴더
│   └── GG_001_main.html    # 건설현장 화면
├── static/                 # 정적 파일 (CSS, JS, 이미지 등)
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── script.js
│   └── img/
│       └── sample.png
├── routes/                 # Blueprint 라우트 파일
│   └── input_predict.py    # 자재 기반 포해물 예측 API
├── services/               # YOLO 연계 구현 서비스
│   └── predict_yolo.py
├── config/                 # 메타 매칭 값 구조
│   └── material_map.py     # 도치/기준 자재 매칭
├── db/                     # 데이터베이스 관리 포털 (데이터연결 또는 ORM)
└── README.md               # 이 문서
```

---

## 🚀 실행 방법

1. 필요한 패키지 설치
   ```
   pip install -r requirements.txt
   ```

2. Flask 서버 실행
   ```
   python app.py
   ```

3. 브라우저에서 `http://localhost:5000` 접속

---

## 👥 역할 분당

| 이름     | 역할         |
|----------|--------------|
| 박민환   | 백어드, DB, ML |
| 송기윤   | 프론트엔드, 시각화 |
| 권태희   | 프론트엔드, 디자인 |

---

## 📂 작업 가이드

- HTML 파일은 `templates/` 폴더에 저장
- CSS/JS 파일은 `static/css`, `static/js` 폴더에 구성
- 컨트롤은 Blueprint 구조 따라 `routes/`, `services/` 분리
- 패션별으로 HTML 파일 이름을 GG_001_메인 같이 지정 (요구사항 명세서 참조)
- 컨미팅 메시지는 기능 단위로: `feat: 로그인 화면 구현`, `fix: 버튼 정렬 오류 수정` 형식

---

## 📊 DB 테이블 구조

| 테이블 이름         | 설명 |
|----------------------|-------|
| `construction_sites` | 건설 현장 정보 (site_id, 현장명, 주소) |
| `waste_management`   | 포해물 데이터 (포해물 종류, 수량, 특정 현장과 연결) |
| `users` (optional)   | 관리자 및 사용자 목록 (id, 이름, 권한 등) |

- 건설현장 테이블과 포해물 데이터는 `site_id` 를 객체적 연결으로 관리
- 현장에서 출판된 포해물 종류가 다른 방식으로 등록되고, 탄소 배출량 기본값과 계산되어 저장
- 해당 정보는 `/region-data/<region_name>` 연동에서 JSON 형태로 출력 가능

---
