import psycopg2
from psycopg2 import OperationalError
try:
    conn = psycopg2.connect(
        dbname="powerconnect",
        user="powerconnect_user",
        password="New@user1",
        host="localhost",
        port="5432"
    )
    print("Connected!")
    conn.close()
except OperationalError as e:
    print("Error:", e)
