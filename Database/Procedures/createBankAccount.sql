DELIMITER $$
CREATE DEFINER=`admin`@`%` PROCEDURE `createBankAccount`(accttype int(11), acctbal double, cusid int(11))
BEGIN
-- Get the account number based off the previous account's creation
SELECT ACCT_NUMBER INTO @acct FROM `ACCOUNT` ORDER BY ACCT_ID DESC LIMIT 1;

-- Create checking account
IF accttype = 1 THEN
	INSERT INTO `ACCOUNT` (ACCT_NUMBER, ACCT_BALANCE, CUS_ID)
	VALUES (@acct + 1, acctbal, cusid);
END IF;

-- Create savings account
IF accttype = 2 THEN
	INSERT INTO `ACCOUNT` (ACCT_NUMBER, ACCT_BALANCE, CUS_ID)
	VALUES (@acct + 1, acctbal, cusid);

	-- Make record of savings account in SAVINGS table. LAST_INSERT_ID() gets ACCT_ID 
    -- from the insertion of the account in the ACCOUNT table.  
	INSERT INTO SAVINGS 
    VALUES (LAST_INSERT_ID(), 0.015);
END IF;

-- Create money market account
IF accttype = 3 AND acctbal >= 5000 THEN
	INSERT INTO `ACCOUNT` (ACCT_NUMBER, ACCT_BALANCE, CUS_ID)
	VALUES (@acct + 1, acctbal, cusid);

	-- Make record of savings account in MONEYMARKET table. LAST_INSERT_ID() gets ACCT_ID 
    -- from the insertion of the account in the ACCOUNT table. 
	INSERT INTO MONEYMARKET 
    VALUES (LAST_INSERT_ID(), 5000, 0.02);
-- If initial balance is below 5000, throw error
ELSE
	IF accttype = 3 AND acctbal < 5000 THEN
		SIGNAL SQLSTATE '45000'
		SET MESSAGE_TEXT = 'Money Market balance must be at least 5000.';
	END IF;
END IF;

END$$
DELIMITER ;
