import mysql.connector
from mysql.connector import errorcode

bankdb = mysql.connector.connect(user='admin', password='SYBBankisawesome1234', host='sybbank.c2ao7w5qbjh5.us-east-2.rds.amazonaws.com', database='banking_db')

mycursor = bankdb.cursor()

mycursor.execute("SELECT * FROM `ACCOUNT`")

myresult = mycursor.fetchall()

for x in myresult:
    print(x)

