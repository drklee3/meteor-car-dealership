CREATE TABLE cars (
    license_number VARCHAR(20) PRIMARY KEY,
    model          VARCHAR(20) NOT NULL,
    phone          VARCHAR(20),
    email          VARCHAR(20),
    CONSTRAINT phone_or_email
         CHECK (phone IS NOT NULL
            OR email IS NOT NULL)
);

