from utils.image_analysis import analyze_image
from db.db_manager import insert_upload

def handle_upload(filepath, filename):
    predicted_type, carbon_estimate = analyze_image(filepath)
    insert_upload(filename, predicted_type, carbon_estimate)
    return predicted_type, carbon_estimate
