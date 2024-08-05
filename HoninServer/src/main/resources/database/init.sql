ALTER TABLE `honin`.`canonymous`
ADD INDEX `canonymous_f1_idx` (`writer` ASC) VISIBLE;
;
ALTER TABLE `honin`.`canonymous`
ADD CONSTRAINT `canonymous_f1`
  FOREIGN KEY (`writer`)
  REFERENCES `honin`.`member` (`nickname`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

ALTER TABLE `honin`.`canonymousreply`
ADD INDEX `canonymousreply_f1_idx` (`writer` ASC) VISIBLE,
ADD INDEX `canonymousreply_f2_idx` (`canum` ASC) VISIBLE;
;
ALTER TABLE `honin`.`canonymousreply`
ADD CONSTRAINT `canonymousreply_f1`
  FOREIGN KEY (`writer`)
  REFERENCES `honin`.`member` (`nickname`)
  ON DELETE CASCADE
  ON UPDATE CASCADE,
ADD CONSTRAINT `canonymousreply_f2`
  FOREIGN KEY (`canum`)
  REFERENCES `honin`.`canonymous` (`canum`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

ALTER TABLE `honin`.`cfree`
ADD INDEX `cfree_f1_idx` (`writer` ASC) VISIBLE;
;
ALTER TABLE `honin`.`cfree`
ADD CONSTRAINT `cfree_f1`
  FOREIGN KEY (`writer`)
  REFERENCES `honin`.`member` (`nickname`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

ALTER TABLE `honin`.`cfreereply`
ADD INDEX `cfreereply_f1_idx` (`writer` ASC) VISIBLE,
ADD INDEX `cfreereply_f2_idx` (`cfnum` ASC) VISIBLE;
;
ALTER TABLE `honin`.`cfreereply`
ADD CONSTRAINT `cfreereply_f1`
  FOREIGN KEY (`writer`)
  REFERENCES `honin`.`member` (`nickname`)
  ON DELETE CASCADE
  ON UPDATE CASCADE,
ADD CONSTRAINT `cfreereply_f2`
  FOREIGN KEY (`cfnum`)
  REFERENCES `honin`.`cfree` (`cfnum`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

ALTER TABLE `honin`.`crecommended`
ADD INDEX `crecommended_f1_idx` (`writer` ASC) VISIBLE;
;
ALTER TABLE `honin`.`crecommended`
ADD CONSTRAINT `crecommended_f1`
  FOREIGN KEY (`writer`)
  REFERENCES `honin`.`member` (`nickname`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

ALTER TABLE `honin`.`crecommendedreply`
ADD INDEX `crecommendedreply_f1_idx` (`writer` ASC) VISIBLE,
ADD INDEX `crecommendedreply_f2_idx` (`crnum` ASC) VISIBLE;
;
ALTER TABLE `honin`.`crecommendedreply`
ADD CONSTRAINT `crecommendedreply_f1`
  FOREIGN KEY (`writer`)
  REFERENCES `honin`.`member` (`nickname`)
  ON DELETE CASCADE
  ON UPDATE CASCADE,
ADD CONSTRAINT `crecommendedreply_f2`
  FOREIGN KEY (`crnum`)
  REFERENCES `honin`.`crecommended` (`crnum`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

ALTER TABLE `honin`.`ctip`
ADD INDEX `ctip_f1_idx` (`writer` ASC) VISIBLE;
;
ALTER TABLE `honin`.`ctip`
ADD CONSTRAINT `ctip_f1`
  FOREIGN KEY (`writer`)
  REFERENCES `honin`.`member` (`nickname`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

ALTER TABLE `honin`.`ctipreply`
ADD INDEX `ctipreply_f1_idx` (`writer` ASC) VISIBLE,
ADD INDEX `ctipreply_f2_idx` (`ctnum` ASC) VISIBLE;
;
ALTER TABLE `honin`.`ctipreply`
ADD CONSTRAINT `ctipreply_f1`
  FOREIGN KEY (`writer`)
  REFERENCES `honin`.`member` (`nickname`)
  ON DELETE CASCADE
  ON UPDATE CASCADE,
ADD CONSTRAINT `ctipreply_f2`
  FOREIGN KEY (`ctnum`)
  REFERENCES `honin`.`ctip` (`ctnum`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

ALTER TABLE `honin`.`infoshare`
ADD INDEX `infoshare_f1_idx` (`writer` ASC) VISIBLE;
;
ALTER TABLE `honin`.`infoshare`
ADD CONSTRAINT `infoshare_f1`
  FOREIGN KEY (`writer`)
  REFERENCES `honin`.`member` (`nickname`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

ALTER TABLE `honin`.`ireply`
ADD INDEX `ireply_f1_idx` (`writer` ASC) VISIBLE,
ADD INDEX `ireply_f2_idx` (`inum` ASC) VISIBLE;
;

ALTER TABLE `honin`.`ireply`
ADD INDEX `ireply_f1_idx` (`writer` ASC) VISIBLE,
ADD INDEX `ireply_f2_idx` (`inum` ASC) VISIBLE;
;
ALTER TABLE `honin`.`ireply`
ADD CONSTRAINT `ireply_f1`
  FOREIGN KEY (`writer`)
  REFERENCES `honin`.`member` (`nickname`)
  ON DELETE CASCADE
  ON UPDATE CASCADE,
ADD CONSTRAINT `ireply_f2`
  FOREIGN KEY (`inum`)
  REFERENCES `honin`.`infoshare` (`inum`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

ALTER TABLE `honin`.`myfood`
ADD INDEX `myfood_f1_idx` (`owner` ASC) VISIBLE;
;
ALTER TABLE `honin`.`myfood`
ADD CONSTRAINT `myfood_f1`
  FOREIGN KEY (`owner`)
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

ALTER TABLE `honin`.`simages`
ADD INDEX `simages_f1_idx` (`snum` ASC) VISIBLE;
;
ALTER TABLE `honin`.`simages`
ADD CONSTRAINT `simages_f1`
  FOREIGN KEY (`snum`)
  REFERENCES `honin`.`secondhand` (`snum`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;


ALTER TABLE `honin`.`sreply`
ADD INDEX `sreply_f1_idx` (`writer` ASC) VISIBLE,
ADD INDEX `sreply_f2_idx` (`snum` ASC) VISIBLE;
;
ALTER TABLE `honin`.`sreply`
ADD CONSTRAINT `sreply_f1`
  FOREIGN KEY (`writer`)
  REFERENCES `honin`.`member` (`nickname`)
  ON DELETE CASCADE
  ON UPDATE CASCADE,
ADD CONSTRAINT `sreply_f2`
  FOREIGN KEY (`snum`)
  REFERENCES `honin`.`secondhand` (`snum`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;
