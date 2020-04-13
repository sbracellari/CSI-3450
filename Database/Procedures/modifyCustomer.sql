DELIMITER $$
CREATE DEFINER=`admin`@`%` PROCEDURE `modifyCustomer`(userid int(11), fname varchar(20), lname varchar(20), areacode int(3), phone int(7), email varchar(45), pass varchar(20))
BEGIN
# takes user id from local storage 
# and user attributes from text fields in frontend to update record in USER table
UPDATE `USER` 
SET USER_FNAME = fname, 
	USER_LNAME = lname, 
    USER_AREACODE = areacode, 
    USER_PHONE = phone, 
    USER_EMAIL = email, 
    USER_PASS = pass
WHERE USER_ID = userid;
END$$
DELIMITER ;
