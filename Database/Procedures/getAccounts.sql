DELIMITER $$
CREATE DEFINER=`admin`@`%` PROCEDURE `getAccounts`(cusid int(11))
BEGIN
#Returns all accounts associated with this customer ID.
SELECT ACCT_ID, ACCT_NUMBER FROM `ACCOUNT`
WHERE CUS_ID = cusid;
END$$
DELIMITER ;
