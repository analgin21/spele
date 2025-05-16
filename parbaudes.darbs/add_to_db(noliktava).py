import sqlite3
DB = 'dati.db'
conn = sqlite3.connect(DB)
cursor = conn.cursor()
dati = []
for i in range(7):
    print(f'\nIevadi {i+1}. preču ierakstu:')
    preces = int(input('Cik ir preču:'))
    nosaukums = input('Preces nosāukums:')
    svars = int(input('Preces svars(kg):'))
    dati.append((preces, nosaukums, svars))
cursor.executemany('''
    INSERT INTO preces (preces, nosaukums, svars)
    VALUES (?, ?, ?)               
''', dati)
conn.commit()
conn.close()
print('Tiks pievienoti 7 ieraksti')