# 🛠 GarbageGuard

ISO 14001 기반 건설 현장 폐기물 관리 시스템

---

## 📌 프로젝트 구조 (Flask + HTML/CSS/JS)

```
GarbageGuard/
├── app.py                  # Flask 메인 서버
├── requirements.txt        # 필요 패키지 목록
├── templates/              # HTML 파일 저장 폴더
│   └── index.html
├── static/                 # 정적 파일 (CSS, JS, 이미지 등)
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── script.js
│   └── img/
│       └── sample.png
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

## 👥 역할 분담

| 이름     | 역할         |
|----------|--------------|
| 박민환   | 백엔드, DB, ML |
| 송기윤   | 프론트엔드, 시각화 |
| 권태희   | 프론트엔드, 디자인 |

---

## 📂 작업 가이드

- HTML 파일은 `templates/` 폴더에
- CSS/JS 파일은 `static/css`, `static/js` 폴더에
- 커밋 메시지는 기능 단위로 작성 (예: `feat: 로그인 화면 구현`)
