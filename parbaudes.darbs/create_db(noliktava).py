import sqlite3
DB = 'dati.db'
conn = sqlite3.connect(DB)
cursor = conn.cursor()
cursor.execute('''
    CREATE TABLE IF NOT EXISTS preces (
               id INTEGER PRIMARY KEY AUTOINCREMENT,
               preces TEXT NOT NULL,
               nosaukums TEXT NOT NULL,
               svars INTEGER NOT NULL
               )
''')
conn.commit()
conn.close()
print('Tabula Rezultati izveidota')