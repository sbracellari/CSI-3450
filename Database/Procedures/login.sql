DELIMITER $$
CREATE DEFINER=`admin`@`%` PROCEDURE `login`(email varchar(45))
BEGIN
--  outputs the password to authenticate via string-match in the frontend 
--  outputs user id to store in local storage for other queries
SELECT USER_PASS, USER_ID FROM `USER` 
WHERE USER_EMAIL = email;
END$$
DELIMITER ;
