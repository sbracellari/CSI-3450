DELIMITER $$
CREATE DEFINER=`admin`@`%` PROCEDURE `deleteBankAccount`(acctnum int(11))
BEGIN
DECLARE M INT;
DECLARE S INT;

#This checks to see if the selected account for deletion is a money market account
#If so, M recieves a value of 1, else 0.
SELECT COUNT(`ACCOUNT`.ACCT_ID) INTO M FROM MONEYMARKET
INNER JOIN `ACCOUNT` ON MONEYMARKET.ACCT_ID = `ACCOUNT`.ACCT_ID
WHERE ACCT_NUMBER = acctnum;

#This checks to see if the selected account for deletion is a savings account
#If so, S recieves a value of 1, else 0.
SELECT COUNT(`ACCOUNT`.ACCT_ID) INTO S FROM SAVINGS
INNER JOIN `ACCOUNT` ON SAVINGS.ACCT_ID = `ACCOUNT`.ACCT_ID
WHERE ACCT_NUMBER = acctnum;

#If the account selected for deletion is neither a savings or money market account
#deny the deletion as it is a chacking account and checking accounts may not be deleted.
IF (M = 0 AND S = 0) THEN
	SIGNAL SQLSTATE '45000'
		SET MESSAGE_TEXT = 'Checking account cannot be deleted.';
#If the account is not a checking account, then it way be deleted. 
ELSE 
	DELETE FROM `ACCOUNT`
	WHERE ACCT_NUMBER = acctnum;
END IF;
END$$
DELIMITER ;
