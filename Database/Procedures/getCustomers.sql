DELIMITER $$
CREATE DEFINER=`admin`@`%` PROCEDURE `getCustomers`(empid int(11))
BEGIN
#This procedure gets all the customer information for the admin user. 
SELECT u.USER_ID, u.USER_FNAME, u.USER_LNAME, u.USER_AREACODE, u.USER_PHONE, u.USER_EMAIL, u.USER_PASS
FROM `USER` u
INNER JOIN CUSTOMER c ON c.USER_ID = u.USER_ID
WHERE c.EMP_ID = 1;
END$$
DELIMITER ;
