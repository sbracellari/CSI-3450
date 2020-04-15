DELIMITER $$
CREATE DEFINER=`admin`@`%` FUNCTION `isChecking`(acctnum int(11)) RETURNS tinyint(1)
BEGIN
DECLARE M INT;
DECLARE S INT;
--  counts if specified account is moneymarket account
SELECT COUNT(`ACCOUNT`.ACCT_ID) INTO M FROM MONEYMARKET
INNER JOIN `ACCOUNT` ON MONEYMARKET.ACCT_ID = `ACCOUNT`.ACCT_ID
WHERE ACCT_NUMBER = acctnum;
--  counts if specified account is savings account
SELECT COUNT(`ACCOUNT`.ACCT_ID) INTO S FROM SAVINGS
INNER JOIN `ACCOUNT` ON SAVINGS.ACCT_ID = `ACCOUNT`.ACCT_ID
WHERE ACCT_NUMBER = acctnum;
--  if neither, assume checking account, return boolean value
IF (M = 0 AND S = 0) THEN
RETURN 1;
ELSE RETURN 0;
END IF;
END$$
DELIMITER ;
