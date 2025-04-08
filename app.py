from flask import Flask

app = Flask(__name__)

@app.route("/")
def home():
    return "✅ Flask 서버 시작 완료!"

if __name__ == "__main__":
    app.run(debug=True)
