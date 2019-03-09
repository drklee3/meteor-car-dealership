CREATE TABLE cars (
	carLicenceNo int(20) PRIMARY KEY,
	phone int(20) FOREIGN KEY REFERENCES customer(phone)
	email varchar(40) FOREIGN KEY REFERENCES customer(email)
	model varchar(20)
)
