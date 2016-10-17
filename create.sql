CREATE TABLE USER (
	ID int NOT NULL AUTO_INCREMENT,
	LOGIN varchar(30) NOT NULL,
	MDP TEXT NOT NULL,
	SOLDE int NOT NULL,
	MAIL varchar(50),
	VILLE varchar(50),
	DATEINS date,
	PRIMARY KEY (ID)
);

CREATE TABLE LIVRE (
	ID int NOT NULL AUTO_INCREMENT,
	NOM varchar(100) NOT NULL,
	AUTEUR varchar(100) NOT NULL,
	VALEUR int,
	DATEPUB date,
	ETAT varchar(30),
	RESUME TEXT,
	PRIMARY KEY(ID)
);

CREATE TABLE LIVREDEP (
	IDLIVRE int NOT NULL,
	IDUSER int NOT NULL,
	PRIMARY KEY(IDLIVRE,IDUSER),
	FOREIGN KEY (IDLIVRE) REFERENCES LIVRE(ID),
	FOREIGN KEY (IDUSER) REFERENCES USER(ID)
);

CREATE TABLE LIVRESOU (
	NOMLIVRE varchar(100) NOT NULL,
	IDUSER int NOT NULL,
	PRIMARY KEY(NOMLIVRE,IDUSER),
	FOREIGN KEY (IDUSER) REFERENCES USER(ID)
);
	
CREATE TABLE SERIE (
	ID int NOT NULL AUTO_INCREMENT,
	NOM varchar(100) NOT NULL,
	PRIMARY KEY (ID)
);

CREATE TABLE SERIELIVRE (
	IDSERIE int NOT NULL,
	IDLIVRE int NOT NULL,
	PRIMARYKEY(IDSERIE,IDLIVRE),
	FOREIGN KEY (IDSERIE) REFERENCES SERIE(ID),
	FOREIGN KEY (IDLIVRE) REFERENCES LIVRE(ID)
);


