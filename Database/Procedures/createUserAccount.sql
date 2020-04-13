DELIMITER $$
CREATE DEFINER=`admin`@`%` PROCEDURE `createUserAccount`(fname varchar(20), lname varchar(20), areacode int(3), phone int(7), email varchar(45), pass varchar(20))
BEGIN
#Create new user record for the USER table based on input from front end.
INSERT INTO `USER` (USER_FNAME, USER_LNAME, USER_AREACODE, USER_PHONE, USER_EMAIL, USER_PASS, USER_TYPE)
VALUES (fname, lname, areacode, phone, email, pass, 2);

#Insert customer ID into CUSTOMER table from LAST_INSERT_ID() and assign it to our admin account. 
INSERT INTO `CUSTOMER` 
VALUES (LAST_INSERT_ID(), 1);

#Upon account creation, a cheking account is automatically created. 
CALL createBankAccount(1, 0, LAST_INSERT_ID());
END$$
DELIMITER ;
