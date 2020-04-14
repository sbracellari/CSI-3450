DELIMITER $$
CREATE DEFINER=`admin`@`%` PROCEDURE `isChecking1`(ACCTNUM int(11))
BEGIN
#For error handling to see if an account is a checking account
SELECT isChecking(ACCTNUM);
END$$
DELIMITER ;
