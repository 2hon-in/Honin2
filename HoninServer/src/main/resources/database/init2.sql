CREATE TABLE `member` (
	`nickname`	varchar(50)	NOT NULL,
	`username`	varchar(50)	NULL,
	`password`	varchar(50)	NULL,
	`email`	varchar(100)	NULL,
	`phone`	varchar(30)	NULL,
	`profileimg`	varchar(1000)	NULL,
	`profilemsg`	varchar(1000)	NULL,
	`provider`	varchar(20)	NULL,
	`snsid`	varchar(50)	NULL,
	`indate`	datetime	NULL	DEFAULT now(),
	`address1`	varchar(100)	NULL,
	`address2`	varchar(100)	NULL,
	`address3`	varchar(100)	NULL,
	`userstate`	char(1)	NULL	DEFAULT 'Y',
	`zipnum`	varchar(15)	NULL
);

CREATE TABLE `myfood` (
	`mfnum`	integer	NOT NULL,
	`owner`	varchar(50)	NOT NULL,
	`fname`	vachar(50)	NOT NULL,
	`exdate`	datetime	NOT NULL,
	`indate`	datetime	NULL	DEFAULT now(),
	`image`	vachar(1000)	NULL,
	`savefilename`	vachar(1000)	NULL,
	`memo`	varchar(500)	NULL,
	`fstate`	char(1)	NULL	DEFAULT 'Y'
);

CREATE TABLE `CfreeReply` (
	`cfrnum`	integer	NOT NULL,
	`cfnum`	integer	NOT NULL,
	`writer`	varchar(50)	NOT NULL,
	`content`	varchar(500)	NULL,
	`writedate`	datetime	NULL	DEFAULT now()
);

CREATE TABLE `Cfree` (
	`cfnum`	integer	NOT NULL,
	`writer`	varchar(50)	NOT NULL,
	`title`	varchar(50)	NOT NULL,
	`content`	text	NULL,
	`writedate`	datetime	NULL	DEFAULT now(),
	`readcount`	integer	NULL,
	`image`	varchar(1000)	NULL,
	`savefilename`	varchar(1000)	NULL
);

CREATE TABLE `Ctip` (
	`ctnum`	integer	NOT NULL,
	`writer`	varchar(50)	NOT NULL,
	`title`	varchar(50)	NOT NULL,
	`content`	text	NULL,
	`writedate`	datetime	NULL	DEFAULT now(),
	`readcount`	integer	NULL,
	`image`	varchar(1000)	NULL,
	`savefilename`	varchar(1000)	NULL
);

CREATE TABLE `Ctipreply` (
	`ctrnum`	integer	NOT NULL,
	`ctnum`	integer	NOT NULL,
	`writer`	varchar(50)	NOT NULL,
	`content`	varchar(500)	NULL,
	`writedate`	datetime	NULL	DEFAULT now()
);

CREATE TABLE `NPolicy` (
	`npnum`	integer	NOT NULL,
	`writer`	varchar(50)	NOT NULL,
	`title`	varchar(50)	NOT NULL,
	`content`	text	NULL,
	`writedate`	datetime	NULL	DEFAULT now(),
	`readcount`	integer	NULL,
	`image`	varchar(1000)	NULL,
	`savefilename`	varchar(1000)	NULL,
	`fixstate`	char(1)	NULL	DEFAULT 'N'
);

CREATE TABLE `secondhand` (
	`snum`	integer	NOT NULL,
	`seller`	varchar(50)	NOT NULL,
	`title`	varchar(50)	NOT NULL,
	`content`	text	NULL,
	`writedate`	datetime	NULL	DEFAULT now(),
	`readcount`	integer	NULL,
	`state`	char(1)	NULL	DEFAULT 'Y',
	`price`	integer	NULL,
	`savefilename`	varchar(1000)	NULL,
	`image`	varchar(1000)	NULL
);

CREATE TABLE `sreply` (
	`srnum`	integer	NOT NULL,
	`snum`	integer	NOT NULL,
	`writer`	varchar(50)	NOT NULL,
	`content`	varchar(500)	NULL,
	`writedate`	datetime	NULL	DEFAULT now()
);

CREATE TABLE `NCareer` (
	`ncnum`	integer	NOT NULL,
	`writer`	varchar(50)	NOT NULL,
	`title`	varchar(50)	NOT NULL,
	`content`	text	NULL,
	`writedate`	datetime	NULL	DEFAULT now(),
	`readcount`	integer	NULL,
	`image`	varchar(1000)	NULL,
	`savefilename`	varchar(1000)	NULL,
	`fixstate`	char(1)	NULL	DEFAULT 'N'
);

CREATE TABLE `Crecommended` (
	`crnum`	integer	NOT NULL,
	`writer`	varchar(50)	NOT NULL,
	`title`	varchar(50)	NOT NULL,
	`content`	text	NULL,
	`writedate`	datetime	NULL	DEFAULT now(),
	`readcount`	integer	NULL,
	`image`	varchar(1000)	NULL,
	`savefilename`	varchar(1000)	NULL
);

CREATE TABLE `CrecommendedReply` (
	`crrnum`	integer	NOT NULL,
	`writer`	varchar(50)	NOT NULL,
	`crnum`	integer	NOT NULL,
	`content`	varchar(500)	NULL,
	`writedate`	datetime	NULL	DEFAULT now()
);

CREATE TABLE `Canonymous` (
	`canum`	integer	NOT NULL,
	`writer`	varchar(50)	NOT NULL,
	`title`	varchar(50)	NOT NULL,
	`content`	text	NULL,
	`writedate`	datetime	NULL	DEFAULT now(),
	`readcount`	integer	NULL,
	`image`	varchar(1000)	NULL,
	`savefilename`	varchar(1000)	NULL
);

CREATE TABLE `Canonymousreply` (
	`carnum`	integer	NOT NULL,
	`writer`	varchar(50)	NOT NULL,
	`canum`	integer	NOT NULL,
	`content`	varchar(500)	NULL,
	`writedate`	datetime	NULL	DEFAULT now()
);

ALTER TABLE `member` ADD CONSTRAINT `PK_MEMBER` PRIMARY KEY (
	`nickname`
);

ALTER TABLE `myfood` ADD CONSTRAINT `PK_MYFOOD` PRIMARY KEY (
	`mfnum`,
	`owner`
);

ALTER TABLE `CfreeReply` ADD CONSTRAINT `PK_CFREEREPLY` PRIMARY KEY (
	`cfrnum`,
	`cfnum`,
	`writer`
);

ALTER TABLE `Cfree` ADD CONSTRAINT `PK_CFREE` PRIMARY KEY (
	`cfnum`,
	`writer`
);

ALTER TABLE `Ctip` ADD CONSTRAINT `PK_CTIP` PRIMARY KEY (
	`ctnum`,
	`writer`
);

ALTER TABLE `Ctipreply` ADD CONSTRAINT `PK_CTIPREPLY` PRIMARY KEY (
	`ctrnum`,
	`ctnum`,
	`writer`
);

ALTER TABLE `NPolicy` ADD CONSTRAINT `PK_NPOLICY` PRIMARY KEY (
	`npnum`
);

ALTER TABLE `secondhand` ADD CONSTRAINT `PK_SECONDHAND` PRIMARY KEY (
	`snum`,
	`seller`
);

ALTER TABLE `sreply` ADD CONSTRAINT `PK_SREPLY` PRIMARY KEY (
	`srnum`,
	`snum`,
	`writer`
);

ALTER TABLE `NCareer` ADD CONSTRAINT `PK_NCAREER` PRIMARY KEY (
	`ncnum`
);

ALTER TABLE `Crecommended` ADD CONSTRAINT `PK_CRECOMMENDED` PRIMARY KEY (
	`crnum`,
	`writer`
);

ALTER TABLE `CrecommendedReply` ADD CONSTRAINT `PK_CRECOMMENDEDREPLY` PRIMARY KEY (
	`crrnum`,
	`writer`,
	`crnum`
);

ALTER TABLE `Canonymous` ADD CONSTRAINT `PK_CANONYMOUS` PRIMARY KEY (
	`canum`,
	`writer`
);

ALTER TABLE `Canonymousreply` ADD CONSTRAINT `PK_CANONYMOUSREPLY` PRIMARY KEY (
	`carnum`,
	`writer`,
	`canum`
);

ALTER TABLE `myfood` ADD CONSTRAINT `FK_member_TO_myfood_1` FOREIGN KEY (
	`owner`
)
REFERENCES `member` (
	`nickname`
);

ALTER TABLE `CfreeReply` ADD CONSTRAINT `FK_Cfree_TO_CfreeReply_1` FOREIGN KEY (
	`cfnum`
)
REFERENCES `Cfree` (
	`cfnum`
);

ALTER TABLE `CfreeReply` ADD CONSTRAINT `FK_member_TO_CfreeReply_1` FOREIGN KEY (
	`writer`
)
REFERENCES `member` (
	`nickname`
);

ALTER TABLE `Cfree` ADD CONSTRAINT `FK_member_TO_Cfree_1` FOREIGN KEY (
	`writer`
)
REFERENCES `member` (
	`nickname`
);

ALTER TABLE `Ctip` ADD CONSTRAINT `FK_member_TO_Ctip_1` FOREIGN KEY (
	`writer`
)
REFERENCES `member` (
	`nickname`
);

ALTER TABLE `Ctipreply` ADD CONSTRAINT `FK_Ctip_TO_Ctipreply_1` FOREIGN KEY (
	`ctnum`
)
REFERENCES `Ctip` (
	`ctnum`
);

ALTER TABLE `Ctipreply` ADD CONSTRAINT `FK_member_TO_Ctipreply_1` FOREIGN KEY (
	`writer`
)
REFERENCES `member` (
	`nickname`
);

ALTER TABLE `secondhand` ADD CONSTRAINT `FK_member_TO_secondhand_1` FOREIGN KEY (
	`seller`
)
REFERENCES `member` (
	`nickname`
);

ALTER TABLE `sreply` ADD CONSTRAINT `FK_secondhand_TO_sreply_1` FOREIGN KEY (
	`snum`
)
REFERENCES `secondhand` (
	`snum`
);

ALTER TABLE `sreply` ADD CONSTRAINT `FK_member_TO_sreply_1` FOREIGN KEY (
	`writer`
)
REFERENCES `member` (
	`nickname`
);

ALTER TABLE `Crecommended` ADD CONSTRAINT `FK_member_TO_Crecommended_1` FOREIGN KEY (
	`writer`
)
REFERENCES `member` (
	`nickname`
);

ALTER TABLE `CrecommendedReply` ADD CONSTRAINT `FK_member_TO_CrecommendedReply_1` FOREIGN KEY (
	`writer`
)
REFERENCES `member` (
	`nickname`
);

ALTER TABLE `CrecommendedReply` ADD CONSTRAINT `FK_Crecommended_TO_CrecommendedReply_1` FOREIGN KEY (
	`crnum`
)
REFERENCES `Crecommended` (
	`crnum`
);

ALTER TABLE `Canonymous` ADD CONSTRAINT `FK_member_TO_Canonymous_1` FOREIGN KEY (
	`writer`
)
REFERENCES `member` (
	`nickname`
);

ALTER TABLE `Canonymousreply` ADD CONSTRAINT `FK_member_TO_Canonymousreply_1` FOREIGN KEY (
	`writer`
)
REFERENCES `member` (
	`nickname`
);

ALTER TABLE `Canonymousreply` ADD CONSTRAINT `FK_Canonymous_TO_Canonymousreply_1` FOREIGN KEY (
	`canum`
)
REFERENCES `Canonymous` (
	`canum`
);

