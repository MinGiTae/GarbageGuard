# db/db_manager.py

import pymysql
import pymysql.cursors
from datetime import datetime

# ✅ DB 연결 함수 (모든 함수가 이걸 사용)
def get_connection():
    return pymysql.connect(
        host="localhost",
        user="root",
        password="0731",
        database="garbageguard",
        charset="utf8mb4",
        cursorclass=pymysql.cursors.DictCursor
    )

# ✅ 건설 현장 등록
def upload_construction_site(site_name, address, manager_name):
    conn = get_connection()
    with conn.cursor() as cursor:
        sql = """
            INSERT INTO construction_sites (site_name, address, manager_name)
            VALUES (%s, %s, %s)
        """
        cursor.execute(sql, (site_name, address, manager_name))
        conn.commit()
    conn.close()

# ✅ 건설 현장 삭제
def delete_construction_site(site_name, address, manager_name):
    conn = get_connection()
    with conn.cursor() as cursor:
        sql = """
            DELETE FROM construction_sites
            WHERE site_name=%s AND address=%s AND manager_name=%s
        """
        cursor.execute(sql, (site_name, address, manager_name))
        conn.commit()
    conn.close()

# ✅ YOLO 결과 저장
def insert_waste_photo(site_id, object_id, image_filename, detection_summary, uploaded_at=None):
    conn = get_connection()
    with conn.cursor() as cursor:
        sql_full = """
            INSERT INTO waste_photos
            (site_id, object_id, image_filename, detection_summary, uploaded_at, is_analyzed)
            VALUES (%s, %s, %s, %s, %s, %s)
        """
        sql_simple = """
            INSERT INTO waste_photos
            (site_id, object_id, image_filename, detection_summary, is_analyzed)
            VALUES (%s, %s, %s, %s, %s)
        """
        if uploaded_at is None:
            cursor.execute(sql_simple,
                           (site_id, object_id, image_filename, detection_summary, True))
        else:
            cursor.execute(sql_full,
                           (site_id, object_id, image_filename, detection_summary, uploaded_at, True))
        conn.commit()
    conn.close()

# ✅ 특정 날짜의 현장 이미지 조회
def get_photos_by_site_and_date(site_id, date):
    conn = get_connection()
    with conn.cursor() as cursor:
        sql = """
            SELECT image_filename, detection_summary, uploaded_at
            FROM waste_photos
            WHERE site_id=%s AND DATE(uploaded_at)=%s
            ORDER BY uploaded_at DESC
        """
        cursor.execute(sql, (site_id, date))
        result = cursor.fetchall()
    conn.close()
    return result

# ✅ 현장 전체 목록
def get_all_construction_sites():
    conn = get_connection()
    with conn.cursor() as cursor:
        cursor.execute("SELECT site_id, site_name FROM construction_sites")
        result = cursor.fetchall()
    conn.close()
    return result

# ✅ 특정 현장의 모든 이미지
def get_photos_by_site(site_id):
    conn = get_connection()
    with conn.cursor() as cursor:
        sql = """
            SELECT image_filename, detection_summary, uploaded_at
            FROM waste_photos
            WHERE site_id=%s
            ORDER BY uploaded_at DESC
        """
        cursor.execute(sql, (site_id,))
        result = cursor.fetchall()
    conn.close()
    return result

# ✅ site_name → site_id
def get_site_id_by_name(site_name):
    conn = get_connection()
    with conn.cursor() as cursor:
        cursor.execute(
            "SELECT site_id FROM construction_sites WHERE site_name=%s",
            (site_name,)
        )
        row = cursor.fetchone()
    conn.close()
    return row['site_id'] if row else None

# ✅ object_name → object_id (없으면 자동 INSERT 후 반환)
def get_object_id_by_name(object_name):
    conn = get_connection()
    with conn.cursor() as cursor:
        cursor.execute(
            "SELECT object_id FROM waste_objects WHERE object_name=%s",
            (object_name,)
        )
        row = cursor.fetchone()
        if row:
            obj_id = row['object_id']
        else:
            cursor.execute(
                "INSERT INTO waste_objects (object_name) VALUES (%s)",
                (object_name,)
            )
            conn.commit()
            obj_id = cursor.lastrowid
    conn.close()
    return obj_id

# db/db_manager.py

def get_monthly_stats(site_id=None):
    """
    site_id를 지정하면 그 현장만, 지정하지 않으면 전체를
    월별(YYYY-MM) 합계로 가져옵니다.
    """
    conn = get_connection()
    with conn.cursor() as cursor:
        if site_id:
            sql = """
                SELECT 
                  DATE_FORMAT(disposal_date, '%%Y-%%m') AS month,
                  SUM(waste_amount)     AS total_waste,
                  SUM(carbon_emission)  AS total_emission
                FROM waste_management wm
                WHERE wm.site_id = %s
                GROUP BY month
                ORDER BY month
            """
            cursor.execute(sql, (site_id,))
        else:
            sql = """
                SELECT 
                  DATE_FORMAT(disposal_date, '%%Y-%%m') AS month,
                  SUM(waste_amount)     AS total_waste,
                  SUM(carbon_emission)  AS total_emission
                FROM waste_management
                GROUP BY month
                ORDER BY month
            """
            cursor.execute(sql)
        rows = cursor.fetchall()
    conn.close()
    return rows

def insert_waste_management(site_id, waste_type, waste_amount, carbon_emission, disposal_date):
    """
    사진 저장 시점에, 해당 폐기물 종류·수량·탄소·날짜를
    monthly 차트를 위해 waste_management에 함께 저장합니다.
    """
    conn = get_connection()
    with conn.cursor() as cursor:
        cursor.execute("""
            INSERT INTO waste_management
              (site_id, waste_type, waste_amount, carbon_emission, disposal_date)
            VALUES (%s,%s,%s,%s,%s)
        """, (site_id, waste_type, waste_amount, carbon_emission, disposal_date))
        conn.commit()
    conn.close()

def get_monthly_stats(site_id=None):
    """
    site_id 지정 시 해당 현장만, 없으면 전체.
    YYYY-MM 단위로 waste/ emission 합계를 가져옵니다.
    """
    conn = get_connection()
    with conn.cursor() as cursor:
        if site_id:
            cursor.execute("""
                SELECT DATE_FORMAT(disposal_date,'%%Y-%%m') AS month,
                       SUM(waste_amount)    AS total_waste,
                       SUM(carbon_emission) AS total_emission
                  FROM waste_management
                 WHERE site_id=%s
                 GROUP BY month
                 ORDER BY month
            """, (site_id,))
        else:
            cursor.execute("""
                SELECT DATE_FORMAT(disposal_date,'%%Y-%%m') AS month,
                       SUM(waste_amount)    AS total_waste,
                       SUM(carbon_emission) AS total_emission
                  FROM waste_management
                 GROUP BY month
                 ORDER BY month
            """)
        rows = cursor.fetchall()
    conn.close()
    return rows
