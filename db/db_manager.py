import pymysql

def get_connection():
    return pymysql.connect(
        host="localhost",
        user="root",
        password="0731",
        database="garbageguard",
        charset="utf8mb4",
        cursorclass=pymysql.cursors.DictCursor
    )

def insert_upload(filename, predicted_type, carbon_estimate):
    conn = get_connection()
    with conn.cursor() as cursor:
        sql = "INSERT INTO uploads (filename, upload_time, predicted_type, carbon_estimate) VALUES (%s, NOW(), %s, %s)"
        cursor.execute(sql, (filename, predicted_type, carbon_estimate))
        conn.commit()
    conn.close()
