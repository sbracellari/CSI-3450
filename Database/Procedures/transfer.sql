DELIMITER $$
CREATE DEFINER=`admin`@`%` PROCEDURE `transfer`(ACCTnum1 int(11), ACCTnum2 int(11), amount double, cusID int(11))
BEGIN
DECLARE M INT;
DECLARE I INT; 
DECLARE A double;
DECLARE b INT;

--  sets variable M to indicate if the transfering bank account is a moneymarket account
SELECT COUNT(`ACCOUNT`.ACCT_ID) INTO M FROM MONEYMARKET
INNER JOIN `ACCOUNT` ON MONEYMARKET.ACCT_ID = `ACCOUNT`.ACCT_ID
WHERE ACCT_NUMBER = ACCTnum1;

--  sets variable I as account id for inserting into UPDATE table 
--  sets variable A as the account balance to check for moneymarket constraints
SELECT ACCT_ID, ACCT_BALANCE INTO I, A FROM `ACCOUNT` WHERE ACCT_NUMBER = ACCTnum1;
SELECT (ACCT_ID) INTO b FROM `ACCOUNT` WHERE ACCT_NUMBER = ACCTnum2;

--  moneymarket constraint: cannot transfer an amount that would put account below 5000
IF M = 1 AND (A - amount) < 5000 THEN
	SIGNAL SQLSTATE '45000'
	SET MESSAGE_TEXT = 'Money Market Account Balance cannot be below 5000.';
ELSE
	--  creates record of transaction, the only emp id is 1
	INSERT INTO TRANSFER (CUS_ID, EMP_ID) 
	VALUES (cusID, 1);
	--  creates records of the balance updates of both accounts involved
	INSERT INTO `UPDATE` 
	VALUES (I, LAST_INSERT_ID(), (0 - amount), NOW()),
    (b, LAST_INSERT_ID(), amount, NOW());
END IF; 
END$$
DELIMITER ;
