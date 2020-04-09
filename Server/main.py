import mysql.connector, json, requests, re
from mysql.connector import errorcode
from flask import Flask, jsonify, request
from requests import get
import Server.Constants as constants

#Database connection
bankdb = mysql.connector.connect(user='admin', password='SYBBankisawesome1234', host='sybbank.c2ao7w5qbjh5.us-east-2.rds.amazonaws.com', database='banking_db')

cur = bankdb.cursor()

#Flask initialization
app = Flask(__name__)

@app.route('syb-bank/login', methods=['GET'])
def login():
    email = request.json.get('email')

    return cur.execute(constants.LOGIN, [email])

@app.route('syb-bank/register', methods=['POST'])
def register():
    first_name = request.json.get('first_name')
    last_name = request.json.get('last_name')
    area_code = request.json.get('area_code')
    phone = request.json.get('phone')
    email = request.json.get('email')
    password = request.json.get('password')

    return cur.execute(constants.CREATE_USER_ACCOUNT, [first_name, last_name, area_code, phone, email, password])

@app.route('syb-bank/withdraw', methods=['POST'])
def withdraw():
    cus_id = read_local_storage('cus_id') # <- theoretical name of the fcn to read from local storage
    acc_from = request.json.get('acc_from')
    amt = request.json.get('amt')

    return cur.execute(constants.WITHDRAW, [acc_from, amt, cus_id])


@app.route('syb-bank/deposit', methods=['POST'])
def deposit():
    cus_id = read_local_storage('cus_id')
    acc_to = request.json.get('acc_from')
    amt = request.json.get('amt')

    return cur.execute(constants.DEPOSIT, [acc_to, amt, cus_id])

@app.route('syb-bank/transfer', methods=['POST'])
def transfer():
    cus_id = read_local_storage('cus_id')
    acc_from = request.json.get('acc_from')
    acc_to = request.json.get('acc_to')
    amt = request.json.get('amt')

    return cur.execute(constants.TRANSFER, [acc_from, acc_to, amt, cus_id])

@app.route('/syb-bank/create-bank-acount', methods=['POST'])
def create_bank_account(): 
    cus_id = read_local_storage('cus_id')
    acc_type = request.json.get('acc_type')

    return cur.execute(constants.CREATE_BANK_ACCOUNT, [acc_type, cus_id])

@app.route('/syb-bank/modify-customer', methods=['POST'])
def modify_customer():
    cus_id = read_local_storage('cus_id')
    first_name = request.json.get('first_name')
    last_name = request.json.get('last_name')
    area_code = request.json.get('area_code')
    phone = request.json.get('phone')
    email = request.json.get('email')
    password = request.json.get('password')

    return cur.execute(constants.MODIFY_CUSTOMER, [cus_id, first_name, last_name, area_code, phone, email, password])

@app.route('/syb-bank/review-transaction', methods=['POST'])
def review-transaction():
    cus_id = read_local_storage('cus_id')
    trans_id = request.json.get('trans_id')
    approved = request.json.get('approved')

    return cur.execute(constants.REVIEW_TRANSACTION, [trans_id, approved])