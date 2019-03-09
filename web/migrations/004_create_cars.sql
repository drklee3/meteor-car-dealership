CREATE TABLE cars (
	carLicenceNo INT(20) PRIMARY KEY,
	phone        INT(20) FOREIGN KEY REFERENCES customer(phone),
	email        VARCHAR(40) FOREIGN KEY REFERENCES customer(email),
	model        VARCHAR(20)
)
