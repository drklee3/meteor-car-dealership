CREATE TABLE cars(
	licence_no   INT         PRIMARY KEY,
	address      VARCHAR(40) NOT NULL,
	model        VARCHAR(20) NOT NULL,
	CONSTRAINT cars_fk FOREIGN KEY(address)
		REFERENCES customers(address)
)
