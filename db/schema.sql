### Schema

CREATE DATABASE budget_db;
USE budget_db;

CREATE TABLE budget
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
	expense BOOLEAN DEFAULT false,
	income BOOLEAN DEFAULT false,
	PRIMARY KEY (id)
);
