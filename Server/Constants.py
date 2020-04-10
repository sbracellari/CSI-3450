LOGIN = '''CALL login(%s)'''

CREATE_USER_ACCOUNT = '''CALL createUserAccount(%s, %s, %d, %d, %s, %s)'''

WITHDRAW = '''CALL withdraw(%d, %d, %d)'''

DEPOSIT = '''CALL deposit(%d, %d, %d)'''

TRANSFER = '''CALL transfer(%d, %d, %d, %d)'''

CREATE_BANK_ACCOUNT = '''CALL createBankAccount(%d, %d, %d, %d)'''

MODIFY_CUSTOMER = '''CALL modifyCustomer(%d, %s, %s, %d, %d, %s, %s, %d)'''

REVIEW_TRANSACTION = '''CALL reviewTransaction(%d, %d)'''

GET_WEEKLY_SPENDING = ''''''

GET_TRANSACTION_HISTORY = ''''''

GET_BALANCES = ''''''

GET_CUSTOMERS = ''''''

GET_PENDING_TRANSACTIONS = ''''''

DELETE_ACCOUNT = ''''''