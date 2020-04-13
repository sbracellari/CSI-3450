DELIMITER $$
CREATE DEFINER=`admin`@`%` PROCEDURE `deposit`(ACCTnum int(11), amount double, cusID int(11))
BEGIN
#Get the account ID from the account number and insert it into a.
DECLARE a INT;
SELECT (ACCT_ID) INTO a FROM `ACCOUNT` WHERE ACCT_NUMBER = ACCTnum;

#Create a new transfer for this customer and assign it to the admin account.
INSERT INTO TRANSFER (CUS_ID, EMP_ID) 
VALUES (cusID, 1);

#Create an update record to be used once the transaction is approved. 
INSERT INTO `UPDATE` 
VALUES (a, LAST_INSERT_ID(), amount, NOW());
END$$
DELIMITER ;
