import mysql.connector, json, requests, re
from mysql.connector import errorcode
from flask import Flask, jsonify, request
from requests import get
import Constants
import scraper as s
from flask_cors import CORS

# Database connection
bankdb = mysql.connector.connect(user='admin', password='SYBBankisawesome1234', host='sybbank.c2ao7w5qbjh5.us-east-2.rds.amazonaws.com', database='sybbank')

cur = bankdb.cursor(dictionary=True)

# Flask initialization
app = Flask(__name__)
CORS(app)

@app.route('/test', methods=['GET'])
def test():
    return s.read_local_storage()

# MAIN ACTOR: USER
# PREDICTED QUERIES TO BE USED: MySQL SELECT
# METHOD PURPOSE: login to account
# INPUT PARAMETERS: only params needed for the SQL query are email
# OUTPUT: displays the correct home page, depending on if the user is an admin or a customer
@app.route('/syb-bank/login', methods=['POST'])
def login():
    email = request.json.get('email')

    data = [] 

    cur.callproc('login', [email])
    for set in cur.stored_results():
        for row in set:
            data.append(dict(zip(set.column_names,row)))
    return jsonify(data)

# MAIN ACTOR: USER
# PREDICTED QUERIES TO BE USED: MySQL INSERT
# METHOD PURPOSE: create a user account
# INPUT PARAMETERS: params needed for the SQL query are first_name, last_name, area_code, phone, email, and password
# OUTPUT: a new row will be inserted in USER table, and user will be taken to their home page
@app.route('/syb-bank/register', methods=['POST'])
def register():
    first_name = request.json.get('first_name')
    last_name = request.json.get('last_name')
    area_code = request.json.get('area_code')
    phone = request.json.get('phone')
    email = request.json.get('email')
    password = request.json.get('password')

    return cur.callproc('createUserAccount', [first_name, last_name, area_code, phone, email, password])

# MAIN ACTOR: USER
# PREDICTED QUERIES TO BE USED: MySQL INSERT
# METHOD PURPOSE: start a withdrawal
# INPUT PARAMETERS: only params needed for the SQL query are acc_from, amount, and user_id
# OUTPUT: TRANSFER and UPDATE records will be created 
# while attributes not mentioned are default vals and
# will be generated on transfer creation
@app.route('/syb-bank/withdraw', methods=['POST'])
def withdraw():
    user_id = s.read_local_storage()
    acc_from = request.json.get('acc_from')
    amt = request.json.get('amt')

    return cur.callproc('withdraw', [acc_from, amt, user_id])

# MAIN ACTOR: USER
# PREDICTED QUERIES TO BE USED: MySQL INSERT
# METHOD PURPOSE: start a withdrawal
# INPUT PARAMETERS: only params needed for the SQL query are acc_to, amount, and user_id
# OUTPUT: TRANSFER and UPDATE records will be created 
# while attributes not mentioned are default vals and
# will be generated on transfer creation
@app.route('/syb-bank/deposit', methods=['POST'])
def deposit():
    user_id = s.read_local_storage()
    acc_to = request.json.get('acc_from')
    amt = request.json.get('amt')

    return cur.callproc('deposit', [acc_to, amt, user_id])

# MAIN ACTOR: USER
# PREDICTED QUERIES TO BE USED: MySQL INSERT
# METHOD PURPOSE: start a withdrawal
# INPUT PARAMETERS: only params needed for the SQL query are acc_from, acc_to, amount, and user_id
# OUTPUT: TRANSFER and UPDATE records will be created 
# while attributes not mentioned are default vals and
# will be generated on transfer creation
@app.route('/syb-bank/transfer', methods=['POST'])
def transfer():
    user_id = s.read_local_storage()
    acc_from = request.json.get('acc_from')
    acc_to = request.json.get('acc_to')
    amt = request.json.get('amount')

    return cur.callproc('transfer', [acc_from, acc_to, amt, user_id])

# MAIN ACTOR: USER
# PREDICTED QUERIES TO BE USED: MySQL INSERT
# METHOD PURPOSE: create a new bank account
# INPUT PARAMETERS: only params needed for the SQL 
# query are acc_type, starting balance, and user_id all other fields
# of the ACCOUNT table are default vals and will be 
# generated on bank account creation
# OUTPUT: ACCOUNT table will be updated, i.e. a new
# row will be inserted
@app.route('/syb-bank/create-bank-acount', methods=['POST'])
def create_bank_account(): 
    user_id = s.read_local_storage()
    acc_type = request.json.get('acc_type')
    starting_balance = request.json.get('starting_balance')

    return cur.callproc('createBankAccont', [acc_type, starting_balance, user_id])

# MAIN ACTOR: ADMINISTRATOR
# PREDICTED QUERIES TO BE USED: MySQL UPDATE
# METHOD PURPOSE: modify customer info
# INPUT PARAMETERS: first_name, last_name, area_code, phone, email, password
# OUTPUT: the selected account will be updated in the USER table
@app.route('/syb-bank/modify-customer', methods=['POST'])
def modify_customer():
    try:
        user_id = request.json.get('user_id')
        first_name = request.json.get('first_name')
        last_name = request.json.get('last_name')
        area_code = request.json.get('area_code')
        phone = request.json.get('phone')
        email = request.json.get('email')
        password = request.json.get('password')

        cur.callproc('modifyCustomer', [user_id, first_name, last_name, area_code, phone, email, password])
        res = []
        for set in cur.stored_results():
            for row in set:
                res.append(dict(zip(set.column_names,row)))
                
        return jsonify({
            'RES': res
        })
    except user_id is None:
        return jsonify([])

# MAIN ACTOR: ADMINISTRATOR
# PREDICTED QUERIES TO BE USED: MySQL UPDATE
# METHOD PURPOSE: review a pending transaction
# INPUT PARAMETERS: SQL takes params transaction_id and a boolean 
# value of approved, which determines whether or not the 
# transactions was approved or not
# OUTPUT: TRANSACTION table will be updated, i.e. the approved
# field will be updated with a value of true or false
@app.route('/syb-bank/review-transaction', methods=['POST'])
def review_transaction():
    try: 
        user_id = s.read_local_storage()
        trans_id = request.json.get('trans_id')
        approved = request.json.get('approved')
        pending_transactions = []

        cur.callproc('reviewTransaction', [trans_id, approved])
        for set in cur.stored_results():
            for row in set:
                pending_transactions.append(dict(zip(set.column_names,row)))
            
        return jsonify({
            'PENDING_TRANSACTIONS': pending_transactions
        })
    except user_id is None:
        return jsonify([])

# MAIN ACTOR: USER
# PREDICTED QUERIES TO BE USED: MySQL SELECT
# METHOD PURPOSE: to grab the 3 main components of the user's information - 
# their weekly spending, their account balances, and a list of all of their active accounts
# INPUT PARAMETERS: only param needed is user_id
# OUTPUT: displays user's balances, weekly transactions, and a list of their active accounts
@app.route('/syb-bank/user-details', methods=['GET'])
def get_user_details():
    user_id = s.read_local_storage()
    balances, accounts, weekly_transactions = [], [], []
    debit_card_usage = 0

    cur.callproc('getBalances', [user_id])
    for set in cur.stored_results():
        for row in set:
            balances.append(dict(zip(set.column_names,row)))

    cur.callproc('getAccounts', [user_id])
    for set in cur.stored_results():
        for row in set:
            accounts.append(dict(zip(set.column_names,row)))

    cur.callproc('weeklyTransactions', [user_id])
    for set in cur.stored_results():
        for row in set:
            weekly_transactions.append(dict(zip(set.column_names,row)))
    
    cur.callproc('debitCardUsage', [user_id])
    for set in cur.stored_results():
        for row in set:
            debit_card_usage = dict(zip(set.column_names,row))

    return jsonify({
        'BALANCES': balances, 
        'ACCOUNTS': accounts,
        'WEEKLY_TRANSACTIONS': weekly_transactions,
        'DEBIT_CARD_USAGE': debit_card_usage
    })

# MAIN ACTOR: USER
# PREDICTED QUERIES TO BE USED: MySQL SELECT
# METHOD PURPOSE: to grab the transaction history of a specified account
# INPUT PARAMETERS: only param needed is user_id and account_number
# OUTPUT: displays user's transaction history for a specified account
@app.route('/syb-bank/transaction-history', methods=['POST'])
def get_transaction_history():
    user_id = s.read_local_storage()
    account_num = request.json.get('account_num')
    transaction_history = []

    cur.callproc('transactionsHistory', [user_id, account_num])
    for set in cur.stored_results():
        for row in set:
            transaction_history.append(dict(zip(set.column_names,row)))
    return jsonify({
        'TRANSACTION_HISTORY': transaction_history
     })

# MAIN ACTOR: ADMINISTRATOR
# PREDICTED QUERIES TO BE USED: MySQL SELECT
# METHOD PURPOSE: to grab the 2 main components of the admin's information - 
# their managed customers and their pending transactions
# INPUT PARAMETERS: only param needed is user_id
# OUTPUT: displays  admin's customers and pending transactions
@app.route('/syb-bank/admin-details', methods=['GET'])
def get_admin_details():
    # user_id = s.read_local_storage()

    user_id = 1

    customers, pending_transactions = [], []

    cur.callproc('getCustomers', [user_id])
    for set in cur.stored_results():
        for row in set:
            customers.append(dict(zip(set.column_names,row)))


    cur.callproc('viewTransactionsAdmin', [user_id])
    for set in cur.stored_results():
        for row in set:
            pending_transactions.append(dict(zip(set.column_names,row)))

    return jsonify({
        'CUSTOMERS': customers, 
        'PENDING_TRANSACTIONS': pending_transactions
    })

# MAIN ACTOR: USER
# PREDICTED QUERIES TO BE USED: MySQL DELETE
# METHOD PURPOSE: delete an existing account
# INPUT PARAMETERS: only param needed is account_number
# OUTPUT: removes the account and its associated updates from the db
@app.route('/syb-bank/delete-account', methods=['POST'])
def delete_account(): 
    user_id = s.read_local_storage()
    account_number = request.json.get('account_num')

    return cur.callproc('deleteBankAccount', [account_number])

app.run()