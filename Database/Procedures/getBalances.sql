DELIMITER $$
CREATE DEFINER=`admin`@`%` PROCEDURE `getBalances`(cusId int(11))
BEGIN

#LEFT JOIN the tables ACCOUNT, SAVINGS, and MONEYMARKET, to determine what each of a user's accounts are.
#If the respective ACCT_ID columns for SAVINGS and MONEYMARKET are not null, then they are one of those account types.
#It will create a new column to say what the account type is.
SELECT ACCT_NUMBER, IF(s.ACCT_ID IS NOT NULL, "SYB-Savings", IF(m.ACCT_ID IS NOT NULL, "SYB-MoneyMarket", "SYB-Checking")) AS ACCT_TYPE, ACCT_BALANCE
FROM `ACCOUNT` a
LEFT JOIN SAVINGS s ON s.ACCT_ID = a.ACCT_ID
LEFT JOIN MONEYMARKET m ON m.ACCT_ID = a.ACCT_ID
WHERE a.CUS_ID = cusId;

END$$
DELIMITER ;
