import mysql.connector, json, requests, re
from mysql.connector import errorcode
from flask import Flask, jsonify, request

#Database connection
bankdb = mysql.connector.connect(user='admin', password='SYBBankisawesome1234', host='sybbank.c2ao7w5qbjh5.us-east-2.rds.amazonaws.com', database='banking_db')

#Flask initialization
app = Flask(__name__)

@app.route('/login', methods=['GET'])
def login():
    try: 
        username = request.json.GET('username')
    else:
        print("error")


