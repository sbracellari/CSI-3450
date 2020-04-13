DELIMITER $$
CREATE DEFINER=`admin`@`%` PROCEDURE `withdraw`(ACCTnum int(11), amount double, cusID int(11))
BEGIN
DECLARE M INT;
DECLARE A double;
DECLARE I INT; 

#If the selected account to withdraw from is a money market account, M will be a 1. 
SELECT COUNT(`ACCOUNT`.ACCT_ID) INTO M FROM MONEYMARKET
INNER JOIN `ACCOUNT` ON MONEYMARKET.ACCT_ID = `ACCOUNT`.ACCT_ID
WHERE ACCT_NUMBER = acctnum;

#This gets the account balance from the selected account to be withdrawn.
SELECT ACCT_BALANCE, ACCT_ID INTO A, I FROM `ACCOUNT`
WHERE ACCT_NUMBER = ACCTnum;

#If the selected account is a money market account and this withdraw will bring its balance under 5000,
#then it will throw and error
IF M = 1 AND (A - amount) < 5000 THEN
	SIGNAL SQLSTATE '45000'
	SET MESSAGE_TEXT = 'Money Market Account Balance cannot be below 5000.';
#If not, it will continue the withdraw
ELSE
	#Create a new transfer for this customer and assign it to the admin account.
	INSERT INTO TRANSFER (CUS_ID, EMP_ID) 
	VALUES (cusID, 1);

	#Create an update record to be used once the transaction is approved. 
	INSERT INTO `UPDATE` 
	VALUES (I, LAST_INSERT_ID(), (0 - amount), NOW()); 
END IF;
END$$
DELIMITER ;
