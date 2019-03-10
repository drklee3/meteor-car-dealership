CREATE TABLE cars (
	licence_no   INT(20)     PRIMARY KEY,
	address      VARCHAR(40) FOREIGN KEY REFERENCES customer(address),
	model        VARCHAR(20) NOT NULL
)
