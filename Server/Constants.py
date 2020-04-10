#`login`(email varchar(45))
LOGIN = '''CALL login(%s)'''

#`createUserAccount`(fname varchar(20), lname varchar(20), areacode int(3), phone int(7), email varchar(45), pass varchar(20))
CREATE_USER_ACCOUNT = '''CALL createUserAccount(%s, %s, %d, %d, %s, %s)'''

#`withdraw`(ACCTnum int(11), amount double, cusID int(11))
WITHDRAW = '''CALL withdraw(%d, %d, %d)'''

#`deposit`(ACCTnum int(11), amount double, cusID int(11))
DEPOSIT = '''CALL deposit(%d, %d, %d)'''

#`transfer`(ACCTnum1 int(11), ACCTnum2 int(11), amount double, cusID int(11))
TRANSFER = '''CALL transfer(%d, %d, %d, %d)'''

#`createBankAccount`(accttype int(11), acctbal double, cusid int(11))
CREATE_BANK_ACCOUNT = '''CALL createBankAccount(%d, %d, %d)'''

#`modifyCustomer`(userid int(11), fname varchar(20), lname varchar(20), areacode int(3), phone int(7), email varchar(45), pass varchar(20))
MODIFY_CUSTOMER = '''CALL modifyCustomer(%d, %s, %s, %d, %d, %s, %s)'''

#`reviewTransaction`(transid int(11), approved tinyint(1))
REVIEW_TRANSACTION = '''CALL reviewTransaction(%d, %d)'''

#`weeklyTransactions`(cusid int(11))
GET_WEEKLY_SPENDING = '''CALL weeklyTransactions(%d)'''

#`transactionHistory`(cusid int(11), acctnum int(11))
GET_TRANSACTION_HISTORY = '''CALL transactionHistory(%d, %d)'''

#`getBalances`(cusId int(11))
GET_BALANCES = '''CALL getBalances(%d)'''

#`getCustomers`(empid int(11))
GET_CUSTOMERS = '''CALL getCustomers(%d)'''

#`viewTransactionsAdmin`(empid int(11))
GET_PENDING_TRANSACTIONS = '''CALL viewTransactionsAdmin(%d)'''

#`deleteBankAccount`(acctnum int(11))
DELETE_ACCOUNT = '''CALL deleteBankAccount(%d)'''