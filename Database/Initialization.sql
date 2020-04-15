-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema sybbank
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema sybbank
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `sybbank` ;
USE `sybbank` ;

-- -----------------------------------------------------
-- Table `sybbank`.`USER`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sybbank`.`USER` (
  `USER_ID` INT NOT NULL AUTO_INCREMENT,
  `USER_FNAME` VARCHAR(20) NOT NULL,
  `USER_LNAME` VARCHAR(20) NOT NULL,
  `USER_AREACODE` INT(3) NOT NULL,
  `USER_PHONE` INT(7) NOT NULL,
  `USER_EMAIL` VARCHAR(45) NOT NULL,
  `USER_PASS` VARCHAR(20) NOT NULL,
  `USER_TYPE` INT NOT NULL,
  PRIMARY KEY (`USER_ID`),
  UNIQUE INDEX `USER_EMAIL_UNIQUE` (`USER_EMAIL` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sybbank`.`EMPLOYEE`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sybbank`.`EMPLOYEE` (
  `USER_ID` INT NOT NULL,
  `EMP_SALARY` INT NOT NULL,
  UNIQUE INDEX `USER_ID_UNIQUE` (`USER_ID` ASC) VISIBLE,
  PRIMARY KEY (`USER_ID`),
  CONSTRAINT `USER_ID`
    FOREIGN KEY (`USER_ID`)
    REFERENCES `sybbank`.`USER` (`USER_ID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sybbank`.`CUSTOMER`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sybbank`.`CUSTOMER` (
  `USER_ID` INT NOT NULL,
  `EMP_ID` INT NOT NULL,
  PRIMARY KEY (`USER_ID`),
  UNIQUE INDEX `CUS_ID_UNIQUE` (`USER_ID` ASC) VISIBLE,
  INDEX `EMP_ID_idx` (`EMP_ID` ASC) VISIBLE,
  CONSTRAINT `USER_ID1`
    FOREIGN KEY (`USER_ID`)
    REFERENCES `sybbank`.`USER` (`USER_ID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `EMP_ID`
    FOREIGN KEY (`EMP_ID`)
    REFERENCES `sybbank`.`EMPLOYEE` (`USER_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sybbank`.`ACCOUNT`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sybbank`.`ACCOUNT` (
  `ACCT_ID` INT NOT NULL AUTO_INCREMENT,
  `ACCT_NUMBER` INT NOT NULL,
  `ACCT_BALANCE` DOUBLE NOT NULL,
  `CUS_ID` INT NOT NULL,
  PRIMARY KEY (`ACCT_ID`),
  INDEX `CUS_ID_idx` (`CUS_ID` ASC) VISIBLE,
  UNIQUE INDEX `ACCT_ID_UNIQUE` (`ACCT_ID` ASC) VISIBLE,
  UNIQUE INDEX `ACCT_NUMBER_UNIQUE` (`ACCT_NUMBER` ASC) VISIBLE,
  CONSTRAINT `CUS_ID`
    FOREIGN KEY (`CUS_ID`)
    REFERENCES `sybbank`.`CUSTOMER` (`USER_ID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sybbank`.`TRANSFER`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sybbank`.`TRANSFER` (
  `TRANS_ID` INT NOT NULL AUTO_INCREMENT,
  `CUS_ID` INT NOT NULL,
  `EMP_ID` INT NOT NULL,
  `TRANS_APPROVED` TINYINT(1) NOT NULL,
  PRIMARY KEY (`TRANS_ID`),
  UNIQUE INDEX `TRANS_ID_UNIQUE` (`TRANS_ID` ASC) VISIBLE,
  INDEX `fk_TRANSACTION_CUSTOMER1_idx` (`CUS_ID` ASC) VISIBLE,
  INDEX `EMP_ID_idx` (`EMP_ID` ASC) VISIBLE,
  CONSTRAINT `fk_TRANSACTION_CUSTOMER1`
    FOREIGN KEY (`CUS_ID`)
    REFERENCES `sybbank`.`CUSTOMER` (`USER_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `EMP_ID1`
    FOREIGN KEY (`EMP_ID`)
    REFERENCES `sybbank`.`EMPLOYEE` (`USER_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sybbank`.`UPDATE`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sybbank`.`UPDATE` (
  `ACCT_ID` INT NOT NULL,
  `TRANS_ID` INT NOT NULL,
  `UPDATE_AMOUNT` DOUBLE NOT NULL,
  `UPDATE_DATE` DATETIME NOT NULL,
  PRIMARY KEY (`ACCT_ID`, `TRANS_ID`),
  INDEX `fk_ACCOUNT_has_TRANSACTION_TRANSACTION1_idx` (`TRANS_ID` ASC) VISIBLE,
  INDEX `fk_ACCOUNT_has_TRANSACTION_ACCOUNT1_idx` (`ACCT_ID` ASC) VISIBLE,
  CONSTRAINT `fk_ACCOUNT_has_TRANSACTION_ACCOUNT1`
    FOREIGN KEY (`ACCT_ID`)
    REFERENCES `sybbank`.`ACCOUNT` (`ACCT_ID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ACCOUNT_has_TRANSACTION_TRANSACTION1`
    FOREIGN KEY (`TRANS_ID`)
    REFERENCES `sybbank`.`TRANSFER` (`TRANS_ID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sybbank`.`SAVINGS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sybbank`.`SAVINGS` (
  `ACCT_ID` INT NOT NULL,
  `SAV_RATE` FLOAT NOT NULL,
  PRIMARY KEY (`ACCT_ID`),
  CONSTRAINT `SAV_ID`
    FOREIGN KEY (`ACCT_ID`)
    REFERENCES `sybbank`.`ACCOUNT` (`ACCT_ID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sybbank`.`MONEYMARKET`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sybbank`.`MONEYMARKET` (
  `ACCT_ID` INT NOT NULL,
  `MKT_MINBAL` DOUBLE NOT NULL,
  `MKT_RATE` FLOAT NOT NULL,
  PRIMARY KEY (`ACCT_ID`),
  CONSTRAINT `MKT_ID`
    FOREIGN KEY (`ACCT_ID`)
    REFERENCES `sybbank`.`ACCOUNT` (`ACCT_ID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
