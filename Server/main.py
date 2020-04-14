# import necessary modules
import mysql.connector, json, requests, re
from mysql.connector import errorcode
from flask import Flask, jsonify, request
from requests import get
import scraper as s
from flask_cors import CORS

# Database connection
bankdb = mysql.connector.connect(user='admin', password='SYBBankisawesome1234', host='sybbank.c2ao7w5qbjh5.us-east-2.rds.amazonaws.com', database='sybbank')

# create the cursor. use 'dictionary=True' to ease up the process of returning data
cur = bankdb.cursor(dictionary=True)

# use auto commit so that anytime an endpoint calls a procedure that manipulates the database,
# it will be saved automatically
bankdb.autocommit = True

# Flask initialization
app = Flask(__name__)

# enable cross origin requests (CORS) to allow communication between the frontend and backend
CORS(app)

# MAIN ACTOR: USER
# PREDICTED QUERIES TO BE USED: MySQL SELECT
# METHOD PURPOSE: login to account
# INPUT PARAMETERS: only params needed for the SQL query are email
# OUTPUT: will return the user's password and ID if the email was valid. If valid and the user
# entered in a correct password, they will be directed to their home page
@app.route('/syb-bank/login', methods=['POST']) # POST request since the email is sent in the body
def login():

    # getting the email from the fetch request in the frontend
    email = request.json.get('email') 

    data = [] 

    # call the login procedure with the email as an argument
    cur.callproc('login', [email]) 

    # iterate through the result set 
    for set in cur.stored_results():
        for row in set:
            data.append(dict(zip(set.column_names,row))) # append each row of the result set to an array
    return jsonify(data) # jsonify the array so the frontend will accept it

# MAIN ACTOR: USER
# PREDICTED QUERIES TO BE USED: MySQL INSERT
# METHOD PURPOSE: create a user account
# INPUT PARAMETERS: params needed for the SQL query are first_name, last_name, area_code, phone, email, and password
# OUTPUT: a new row will be inserted in USER table, and user will be taken to the login page
@app.route('/syb-bank/register', methods=['POST']) # POST request since we are manipulating the DB
def register():

    # get request attributes from the frontend
    first_name = request.json.get('first_name')
    last_name = request.json.get('last_name')
    area_code = request.json.get('area_code')
    phone = request.json.get('phone')
    email = request.json.get('email')
    password = request.json.get('password')

    # since nothing is returned, there is no result set to iterate through
    # this will just return the network response (200, 404, 500, etd.)
    return cur.callproc('createUserAccount', [first_name, last_name, area_code, phone, email, password])

# MAIN ACTOR: USER
# PREDICTED QUERIES TO BE USED: MySQL INSERT
# METHOD PURPOSE: initiate a withdrawal
# INPUT PARAMETERS: only params needed for the SQL query are acc_from, amount, and user_id
# OUTPUT: TRANSFER and UPDATE records will be created while attributes not mentioned are default vals and
# will be generated on transfer creation
@app.route('/syb-bank/withdraw', methods=['POST']) # POST request since we are manipulating the DB
def withdraw():

    # read the user's ID from local storage using the scraper in scraper.py
    user_id = s.read_local_storage()

    # get request attributes from the frontend
    acc_from = request.json.get('acc_from')
    amt = request.json.get('amount')

    # since nothing is returned, there is no result set to iterate through
    # this will just return the network response (200, 404, 500, etd.)
    return cur.callproc('withdraw', [acc_from, amt, user_id])

# MAIN ACTOR: USER
# PREDICTED QUERIES TO BE USED: MySQL INSERT
# METHOD PURPOSE: initiate a deposit
# INPUT PARAMETERS: only params needed for the SQL query are acc_to, amount, and user_id
# OUTPUT: TRANSFER and UPDATE records will be created while attributes not mentioned are default vals and
# will be generated on transfer creation
@app.route('/syb-bank/deposit', methods=['POST']) # POST request since we are manipulating the DB
def deposit():

    # read the user's ID from local storage using the scraper in scraper.py
    user_id = s.read_local_storage()

    # get request attributes from the frontend
    acc_to = request.json.get('acc_to')
    amt = request.json.get('amount')

    # since nothing is returned, there is no result set to iterate through
    # this will just return the network response (200, 404, 500, etd.)
    return cur.callproc('deposit', [acc_to, amt, user_id])

# MAIN ACTOR: USER
# PREDICTED QUERIES TO BE USED: MySQL INSERT
# METHOD PURPOSE: initiate a transfer
# INPUT PARAMETERS: only params needed for the SQL query are acc_from, acc_to, amount, and user_id
# OUTPUT: TRANSFER and UPDATE records will be created while attributes not mentioned are default vals and
# will be generated on transfer creation
@app.route('/syb-bank/transfer', methods=['POST']) # POST request since we are manipulating the DB
def transfer():

    # read the user's ID from local storage using the scraper in scraper.py
    user_id = s.read_local_storage()

    # get request attributes from the frontend
    acc_from = request.json.get('acc_from')
    acc_to = request.json.get('acc_to')
    amt = request.json.get('amount')

    # since nothing is returned, there is no result set to iterate through
    # this will just return the network response (200, 404, 500, etd.)
    return cur.callproc('transfer', [acc_from, acc_to, amt, user_id])

# MAIN ACTOR: USER
# PREDICTED QUERIES TO BE USED: MySQL INSERT
# METHOD PURPOSE: create a new bank account
# INPUT PARAMETERS: only params needed for the SQL query are acc_type, starting balance, and user_id all other fields
# of the ACCOUNT table are default vals and will be generated on bank account creation
# OUTPUT: ACCOUNT table will be updated, i.e. a new row will be inserted
@app.route('/syb-bank/create-bank-account', methods=['POST']) # POST request since we are manipulating the DB
def create_bank_account(): 

    # read the user's ID from local storage using the scraper in scraper.py
    user_id = s.read_local_storage()

    # get request attributes from the frontend
    acc_type = request.json.get('acc_type')
    starting_balance = request.json.get('starting_balance')

    accounts, balances = [], []

    # call createBankAccount procedure 
    cur.callproc('createBankAccount', [acc_type, starting_balance, user_id])

    # call getBalances procedure with user ID
    cur.callproc('getBalances', [user_id])

    # iterate through result set
    for set in cur.stored_results():
        for row in set:
            balances.append(dict(zip(set.column_names,row))) # append each row to an array

    # call the getAccounts procedure with user ID
    cur.callproc('getAccounts', [user_id])

    # iterate through the result set
    for set in cur.stored_results():
        for row in set:
            accounts.append(dict(zip(set.column_names,row))) # append each row to an array
    
    # jsonify the four arrays so the frontend will accept the return value
    return jsonify({
        'BALANCES': balances, 
        'ACCOUNTS': accounts
    })


# MAIN ACTOR: ADMINISTRATOR
# PREDICTED QUERIES TO BE USED: MySQL UPDATE
# METHOD PURPOSE: modify customer info
# INPUT PARAMETERS: first_name, last_name, area_code, phone, email, password
# OUTPUT: the selected account will be updated in the USER table, and the query will
# return a new result set of the customers
@app.route('/syb-bank/modify-customer', methods=['POST']) # POST request since we are manipulating the DB
def modify_customer():

    try: # use a try/except to ensure that the user ID is not null since it is not being read from local storage

        # get request attributes from the frontend
        user_id = request.json.get('user_id')
        first_name = request.json.get('first_name')
        last_name = request.json.get('last_name')
        area_code = request.json.get('area_code')
        phone = request.json.get('phone')
        email = request.json.get('email')
        password = request.json.get('password')

        # call the modifyCustomer procedure with all of the above attributes
        cur.callproc('modifyCustomer', [user_id, first_name, last_name, area_code, phone, email, password])
        
        # call the getCustomers procedure with user ID
        cur.callproc('getCustomers', [user_id])

        customers = []

        # iterate through the result set
        for set in cur.stored_results():
            for row in set:
                customers.append(dict(zip(set.column_names,row))) # append each row to an array
                
        # jsonify the result so the frontend will accept it
        return jsonify({
            'CUSTOMERS': customers
        })
    
    # null check on the user ID
    except user_id is None:
        return jsonify([]) # return empty jsonified array if user ID is null

# MAIN ACTOR: ADMINISTRATOR
# PREDICTED QUERIES TO BE USED: MySQL UPDATE
# METHOD PURPOSE: review a pending transaction
# INPUT PARAMETERS: SQL takes params transaction_id and a boolean value of approved, which determines 
# whether or not the transactions was approved or not
# OUTPUT: TRANSACTION table will be updated, i.e. the approved field will be updated with a value of true or false
@app.route('/syb-bank/review-transaction', methods=['GET', 'POST']) # POST request since we are manipulating the DB, GET for getting transactions
def review_transaction():
    try: # use a try/except since user ID is not used in one of the queries

        # read the user's ID from local storage using the scraper in scraper.py
        user_id = s.read_local_storage()

        # get request attributes from the frontend
        trans_id = request.json.get('transaction_id')
        approved = request.json.get('approved')

        pending_transactions = []

        # call the reviewTransaction procedure first, then call the viewTransactionsAdmin procedure to get
        # the new list of pending transactions after one has been approved 
        cur.callproc('reviewTransaction', [trans_id, approved])
        cur.callproc('viewTransactionsAdmin', [user_id])

        # iterate through the result set
        for set in cur.stored_results():
            for row in set:
                pending_transactions.append(dict(zip(set.column_names,row))) # append each row to an array
            
        # jsonify the result so the frontend will accept it
        return jsonify({
            'PENDING_TRANSACTIONS': pending_transactions
        })
    
    # null check on the user ID
    except user_id is None:
        return jsonify([])

# MAIN ACTOR: USER
# PREDICTED QUERIES TO BE USED: MySQL SELECT
# METHOD PURPOSE: to grab the 4 main components of the user's information - 
# their weekly spending, their account balances, their current debit card usage, 
# and a list of all of their active accounts
# INPUT PARAMETERS: only param needed is user_id
# OUTPUT: displays user's balances, weekly transactions, debit card usage, and a list of their active accounts
@app.route('/syb-bank/user-details', methods=['GET']) # GET request since we are not manipulating the DB
def get_user_details():

    # read the user's ID from local storage using the scraper in scraper.py
    user_id = s.read_local_storage()

    balances, accounts, weekly_transactions = [], [], []
    debit_card_usage = 0

    # call getBalances procedure with user ID
    cur.callproc('getBalances', [user_id])

    # iterate through result set
    for set in cur.stored_results():
        for row in set:
            balances.append(dict(zip(set.column_names,row))) # append each row to an array

    # call the getAccounts procedure with user ID
    cur.callproc('getAccounts', [user_id])

    # iterate through the result set
    for set in cur.stored_results():
        for row in set:
            accounts.append(dict(zip(set.column_names,row))) # append each row to an array

    # call the weeklyTransactions procedure with user ID
    cur.callproc('weeklyTransactions', [user_id])

    # iterate through the result set
    for set in cur.stored_results():
        for row in set:
            weekly_transactions.append(dict(zip(set.column_names,row))) # append each row to an array
    
    # call the debitCardUsage procedure with user ID
    cur.callproc('debitCardUsage', [user_id])

    # iterate through the result set
    for set in cur.stored_results():
        for row in set:
            debit_card_usage = dict(zip(set.column_names,row)) # append each row to an array

    # jsonify the four arrays so the frontend will accept the return value
    return jsonify({
        'BALANCES': balances, 
        'ACCOUNTS': accounts,
        'WEEKLY_TRANSACTIONS': weekly_transactions,
        'DEBIT_CARD_USAGE': debit_card_usage
    })

# MAIN ACTOR: USER
# PREDICTED QUERIES TO BE USED: MySQL SELECT
# METHOD PURPOSE: to grab the transaction history of a specified account
# INPUT PARAMETERS: only params needed are user_id and account_number
# OUTPUT: displays user's transaction history for a specified account
@app.route('/syb-bank/transaction-history', methods=['POST']) # POST request since we are sending a request body
def get_transaction_history():

    # read the user's ID from local storage using the scraper in scraper.py
    user_id = s.read_local_storage()

    # get request attributes from the frontend
    account_num = request.json.get('account_num')

    transaction_history = []

    # call the transactionHistory procedure with user ID and account number
    cur.callproc('transactionsHistory', [user_id, account_num])

    # iterate through the result set
    for set in cur.stored_results():
        for row in set:
            transaction_history.append(dict(zip(set.column_names,row))) # append each row to an array
    
    # jsonify the result so the frontend will accept it
    return jsonify({
        'TRANSACTION_HISTORY': transaction_history
    })

# MAIN ACTOR: ADMINISTRATOR
# PREDICTED QUERIES TO BE USED: MySQL SELECT
# METHOD PURPOSE: to grab the 2 main components of the admin's information - 
# their managed customers and their pending transactions
# INPUT PARAMETERS: only param needed is user_id
# OUTPUT: displays  admin's customers and pending transactions
@app.route('/syb-bank/admin-details', methods=['GET']) # GET request since we are not manipulating the DB
def get_admin_details():

    # read the user's ID from local storage using the scraper in scraper.py
    user_id = s.read_local_storage()

    customers, pending_transactions = [], []

    # call the getCustomers procedure with user ID
    cur.callproc('getCustomers', [user_id])

    # iterate through the result set
    for set in cur.stored_results():
        for row in set:
            customers.append(dict(zip(set.column_names,row))) # append each row to an array

    # call the viewTransactionsAdmin procedure with user ID
    cur.callproc('viewTransactionsAdmin', [user_id])

    # iterate through the result set 
    for set in cur.stored_results():
        for row in set:
            pending_transactions.append(dict(zip(set.column_names,row))) # append each row to an array

    # jsonify the result so it is accepted by the frontend
    return jsonify({
        'CUSTOMERS': customers, 
        'PENDING_TRANSACTIONS': pending_transactions
    })

# MAIN ACTOR: USER
# PREDICTED QUERIES TO BE USED: MySQL DELETE
# METHOD PURPOSE: delete an existing account
# INPUT PARAMETERS: only param needed is account_number
# OUTPUT: removes the account and its associated updates from the db
@app.route('/syb-bank/delete-account', methods=['POST']) # POST request since we are manipulating the DB
def delete_account():

    # read the user's ID from local storage using the scraper in scraper.py
    user_id = s.read_local_storage()

    # get request attribute from the frontend
    account_number = request.json.get('account_num')

    balances, accounts, data = [], [], []

    # call isChecking prodecure to check if the account number belongs to a checking account
    cur.callproc('isChecking1', [account_number])

    # iterate through the result set
    for result in cur.stored_results():
        data = result.fetchone() # there's only one row, so we can just fetch it right away

    data = str(data)[1]

    # if the result is a 1, the account is a checking and cannot be deleted
    if data == '1':
        return '0'
    
    # else, the account is either a savings or a money market and can be deleted, so fetch
    # updated data
    else:
        # call deleteBankAccountProcedure
        cur.callproc('deleteBankAccount', [account_number])

        # call getBalances procedure with user ID
        cur.callproc('getBalances', [user_id])

        # iterate through result set
        for set in cur.stored_results():
            for row in set:
                balances.append(dict(zip(set.column_names,row))) # append each row to an array

        # call the getAccounts procedure with user ID
        cur.callproc('getAccounts', [user_id])

        # iterate through the result set
        for set in cur.stored_results():
            for row in set:
                accounts.append(dict(zip(set.column_names,row))) # append each row to an array

        # jsonify the two arrays so the frontend will accept the return value
        return jsonify({
            'BALANCES': balances, 
            'ACCOUNTS': accounts
        })

app.run() # spins up a server on port 5000