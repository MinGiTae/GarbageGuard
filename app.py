# app.py
from flask import Flask
from routes.main_routes import main_bp
from routes.upload_routes import upload_bp
from routes.stats_routes import stats_bp
from routes.gallery_routes import gallery_bp
from routes.predict_routes import predict_bp

app = Flask(__name__)
app.secret_key = 'go_home'

# ✅ Blueprint 등록 (URL prefix도 함께)
app.register_blueprint(main_bp)                            # /
# app.register_blueprint(upload_bp, url_prefix='/upload')    # /upload/*
app.register_blueprint(stats_bp)                           # /region-data/*
app.register_blueprint(gallery_bp)                         # /gallery
app.register_blueprint(predict_bp)                         # /input_waste

if __name__ == '__main__':
    app.run(debug=True)
