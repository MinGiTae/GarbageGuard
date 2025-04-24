import pymysql
import pymysql.cursors
from datetime import datetime

# ✅ DB 연결 함수 (공통)
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

# ✅ 회사 등록
def insert_company(company_name, address, ceo_name, contact):
    conn = get_connection()
    with conn.cursor() as cursor:
        sql = """
            INSERT INTO companies (company_name, address, ceo_name, contact)
            VALUES (%s, %s, %s, %s)
        """
        cursor.execute(sql, (company_name, address, ceo_name, contact))
        conn.commit()
    conn.close()

# ✅ 회사 목록 조회
def get_all_companies():
    conn = get_connection()
    with conn.cursor() as cursor:
        cursor.execute("SELECT company_id, company_name FROM companies ORDER BY company_name")
        companies = cursor.fetchall()
    conn.close()
    return companies

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
            cursor.execute(sql_simple, (site_id, object_id, image_filename, detection_summary, True))
        else:
            cursor.execute(sql_full, (site_id, object_id, image_filename, detection_summary, uploaded_at, True))
        conn.commit()
    conn.close()

# ✅ detection_summary 조회 추가
def get_detection_summary(site_id, image_filename):
    conn = get_connection()
    with conn.cursor() as cursor:
        cursor.execute("""
            SELECT detection_summary
              FROM waste_photos
             WHERE site_id=%s AND image_filename=%s
        """, (site_id, image_filename))
        result = cursor.fetchone()
    conn.close()
    return result['detection_summary'] if result else None

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

# ✅ 월별 통계
def get_monthly_stats(site_id=None):
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

# ✅ 월별 통계용 폐기물 저장
def insert_waste_management(site_id, waste_type, waste_amount, carbon_emission, disposal_date):
    conn = get_connection()
    with conn.cursor() as cursor:
        cursor.execute("""
            INSERT INTO waste_management
              (site_id, waste_type, waste_amount, carbon_emission, disposal_date)
            VALUES (%s,%s,%s,%s,%s)
        """, (site_id, waste_type, waste_amount, carbon_emission, disposal_date))
        conn.commit()
    conn.close()

# ✅ 위도·경도 및 회사ID 포함 건설 현장 등록 함수
def upload_construction_site(site_name, address, manager_name, latitude, longitude, company_id):
    """
    새로운 건설 현장을 데이터베이스에 저장합니다.

    :param site_name: 현장 이름
    :param address: 주소
    :param manager_name: 담당자 이름
    :param latitude: 위도
    :param longitude: 경도
    :param company_id: 소속 회사 ID
    """
    conn = get_connection()
    with conn.cursor() as cursor:
        sql = """
            INSERT INTO construction_sites (site_name, address, manager_name, latitude, longitude, company_id)
            VALUES (%s, %s, %s, %s, %s, %s)
        """
        cursor.execute(sql, (site_name, address, manager_name, latitude, longitude, company_id))
        conn.commit()
    conn.close()
