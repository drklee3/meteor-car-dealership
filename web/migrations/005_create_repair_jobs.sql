CREATE table repair_jobs(
	repair_id     INT         PRIMARY KEY,
	emp_id        INT         NOT NULL
	licence_no    INT         NOT NULL
	time_in       VARCHAR(10) NOT NULL,
	time_out      VARCHAR(10),
	CONSTRAINT emp_id_fk     FOREIGN KEY(emp_id)
		REFERENCES mechanics(emp_id),
	CONSTRAINT licence_no_fk FOREIGN KEY(licence_no)
		REFERENCES car(licence_no)
)
