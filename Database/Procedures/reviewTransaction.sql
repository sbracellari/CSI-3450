DELIMITER $$
CREATE DEFINER=`admin`@`%` PROCEDURE `reviewTransaction`(transid int(11), approved tinyint(1))
BEGIN
DECLARE e INT;
IF approved = 1 THEN 
	# stores emp id for calling procedure to refresh table in frontend
    SELECT EMP_ID INTO e FROM TRANSFER 
    WHERE TRANS_ID = transid;
    #transfer is approved 
	UPDATE TRANSFER
	SET TRANS_APPROVED = approved
	WHERE TRANS_ID = transid;
    # account balances are updated with transactions
    UPDATE `ACCOUNT` a
    INNER JOIN `UPDATE` u ON u.ACCT_ID = a.ACCT_ID
    SET a.ACCT_BALANCE = a.ACCT_BALANCE + u.UPDATE_AMOUNT
    WHERE u.TRANS_ID = transid;
    
    # outputs updated table of pending transactions
    CALL viewTransactionsAdmin(e); 
ELSE
	# transfer denied
	DELETE FROM TRANSFER 
    WHERE TRANS_ID = transid;
END IF;    
END$$
DELIMITER ;
