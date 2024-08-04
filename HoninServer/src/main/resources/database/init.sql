ALTER TABLE `honin`.`myfood`
ADD INDEX `myfood_f1_idx` (`owner` ASC) VISIBLE;

ALTER TABLE `honin`.`myfood`
ADD CONSTRAINT `myfood_f1`
  FOREIGN KEY (`owner`)
  REFERENCES `honin`.`member` (`nickname`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

ALTER TABLE `honin`.`infoshare`
ADD INDEX `infoshare_f1_idx` (`writer` ASC) VISIBLE;

ALTER TABLE `honin`.`infoshare`
ADD CONSTRAINT `infoshare_f1`
  FOREIGN KEY (`writer`)
  REFERENCES `honin`.`member` (`nickname`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

  ALTER TABLE `honin`.`ireply`
ADD INDEX `ireply_f1_idx` (`inum` ASC) VISIBLE,
ADD INDEX `ireply_f2_idx` (`writer` ASC) VISIBLE;
;
ALTER TABLE `honin`.`ireply`
ADD CONSTRAINT `ireply_f1`
  FOREIGN KEY (`inum`)
  REFERENCES `honin`.`infoshare` (`inum`)
  ON DELETE CASCADE
  ON UPDATE CASCADE,
ADD CONSTRAINT `ireply_f2`
  FOREIGN KEY (`writer`)
  REFERENCES `honin`.`member` (`nickname`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

ALTER TABLE `honin`.`secondhand`
ADD INDEX `secondhand_f1_idx` (`seller` ASC) VISIBLE;
;
ALTER TABLE `honin`.`secondhand`
ADD CONSTRAINT `secondhand_f1`
  FOREIGN KEY (`seller`)
  REFERENCES `honin`.`member` (`nickname`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

ALTER TABLE sreply DROP COLUMN seller;

ALTER TABLE `honin`.`sreply`
ADD INDEX `sreply_f1_idx` (`writer` ASC) VISIBLE,
ADD INDEX `sreply_f2_idx` (`snum` ASC) VISIBLE;
;
ALTER TABLE `honin`.`sreply`
ADD CONSTRAINT `sreply_f1`
  FOREIGN KEY (`nickname`)
  REFERENCES `honin`.`member` (`nickname`)
  ON DELETE CASCADE
  ON UPDATE CASCADE,
ADD CONSTRAINT `sreply_f2`
  FOREIGN KEY (`snum`)
  REFERENCES `honin`.`secondhand` (`snum`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

ALTER TABLE `honin`.`fboard`
ADD INDEX `fboard_f1_idx` (`writer` ASC) VISIBLE;
;
ALTER TABLE `honin`.`fboard`
ADD CONSTRAINT `fboard_f1`
  FOREIGN KEY (`writer`)
  REFERENCES `honin`.`member` (`nickname`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

ALTER TABLE freply DROP COLUMN nickname;

ALTER TABLE `honin`.`freply`
ADD INDEX `freply_f1_idx` (`writer` ASC) VISIBLE,
ADD INDEX `freply_f2_idx` (`fnum` ASC) VISIBLE;
;
ALTER TABLE `honin`.`freply`
ADD CONSTRAINT `freply_f1`
  FOREIGN KEY (`nickname`)
  REFERENCES `honin`.`member` (`nickname`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
ADD CONSTRAINT `freply_f2`
  FOREIGN KEY (`fnum`)
  REFERENCES `honin`.`fboard` (`fnum`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

ALTER TABLE member
    MODIFY userstate CHAR(1) NOT NULL DEFAULT 'Y';
