import psycopg2

uri = "postgresql://neondb_owner:npg_xfaOCALyQ0w1@ep-aged-mountain-anccjfy3.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require"

try:
    conn = psycopg2.connect(uri)
    cursor = conn.cursor()
    cursor.execute("SELECT version();")
    record = cursor.fetchone()
    print("Database Connection Status: SUCCESS")
    print("Postgres Version:", record[0])
    cursor.close()
    conn.close()
except Exception as e:
    print("Database Connection Status: FAILED")
    print("Error:", e)
