import sqlite3
DB = 'dati.db'
conn = sqlite3.connect(DB)
cursor = conn.cursor()
cursor.execute('SELECT AVG (svars) FROM preces')
videjais = cursor.fetchone()[0]
conn.close()
if videjais is not None:
    print(f'Videjais rezultāts: {videjais:.2f}')
else:
    print('Nav ierakstu datubāzē')