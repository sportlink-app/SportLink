import mysql.connector

config = {
    'user': 'roota',
    'password': 'root',
    'host': 'localhost',
    'database': 'SPL'
}

try:
    conn = mysql.connector.connect(**config)
    cursor = conn.cursor()
    cursor.execute("SELECT VERSION();")
    version = cursor.fetchone()
    print("Database version:", version)
except mysql.connector.Error as err:
    print("Error:", str(err))
finally:
    if conn.is_connected():
        cursor.close()
        conn.close()
        print("Connection closed.")

