import sqlite3
DB = 'dati.db'
conn = sqlite3.connect(DB)
cursor = conn.cursor()
id_dzest = int(input('Ievadi dzešama ieraksta ID:'))
cursor.execute('SELECT * FROM rezultati WHERE id = ?', (id_dzest,))
ieraksts = cursor.fetchone()
if not ieraksts:
    print(f'Ieraksts ar ID-{id_dzest} nav atrodams')
else:
    cursor.execute('DELETE FROM rezultati WHERE id = ?', (id_dzest))
    conn.commit()
    print(f'Ieraksts ar ID-{id_dzest} tika izdzests')
    conn.close()