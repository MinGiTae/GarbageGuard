import pymysql
import pymysql.cursors

def get_connection():
    return pymysql.connect(
        host="localhost",
        user="root",
        password="0000",
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

def upload_construction_site(site_name,address,manager_name):
    conn= get_connection()
    with conn.cursor() as cursor:
        sql= "INSERT INTO construction_sites(site_name,address,manager_name) VALUES (%s, %s,%s)"
        cursor.execute(sql,(site_name,address,manager_name))
        conn.commit()
    conn.close()

def delete_construction_site(site_name,address,manager_name):
    conn = get_connection()
    with conn.cursor() as cursor:
        sql = """
            DELETE FROM construction_sites
            WHERE site_name = %s AND address = %s AND manager_name = %s
        """
        cursor.execute(sql, (site_name, address, manager_name))
        conn.commit()
    conn.close()


# 현장 탄소 배출량 / 폐기물 종류량 db 연결하는 함수

