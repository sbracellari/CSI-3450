DELIMITER $$
CREATE DEFINER=`admin`@`%` PROCEDURE `weeklyTransactions`(cusid int(11))
BEGIN
DECLARE a INT;
# only shows weekly transactions from user's checking account
SELECT ACCT_ID INTO a FROM `ACCOUNT`
WHERE CUS_ID = cusid AND (SELECT isChecking(ACCT_NUMBER)) = 1;

# outputs approved transactions from within 7 days
SELECT UPDATE_DATE, UPDATE_AMOUNT FROM `UPDATE`
INNER JOIN `TRANSFER` ON `UPDATE`.TRANS_ID = `TRANSFER`.TRANS_ID
INNER JOIN `ACCOUNT` ON `UPDATE`.ACCT_ID = `ACCOUNT`.ACCT_ID
WHERE `ACCOUNT`.CUS_ID = cusid AND `ACCOUNT`.ACCT_ID = a
AND TRANS_APPROVED = 1 AND DATEDIFF(NOW(), UPDATE_DATE) <= 7;
END$$
DELIMITER ;
