CREATE TABLE customers(
	address VARCHAR(100) PRIMARY KEY,
	phone   INT(20),
	email   VARCHAR(40), 
	name    VARCHAR(40)  NOT NULL,
	CONSTRAINT phone_or_email
		CHECK (phone IS NOT NULL
			OR email IS NOT NULL)
)
