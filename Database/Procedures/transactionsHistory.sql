DELIMITER $$
CREATE DEFINER=`admin`@`%` PROCEDURE `transactionsHistory`(cusid int(11), acctnum int(11))
BEGIN
# outputs all transactions made by specified customer from specified bank account and approval status
SELECT UPDATE_DATE, UPDATE_AMOUNT, IF(TRANS_APPROVED = 0, "NOT APPROVED", "APPROVED") AS APPROVED FROM `UPDATE`
INNER JOIN TRANSFER ON `UPDATE`.TRANS_ID = TRANSFER.TRANS_ID
INNER JOIN `ACCOUNT` ON `UPDATE`.ACCT_ID = `ACCOUNT`.ACCT_ID
WHERE `ACCOUNT`.CUS_ID = cusid AND ACCT_NUMBER = acctnum;
END$$
DELIMITER ;
