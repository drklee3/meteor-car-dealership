CREATE table repair_job (
	problem_id    INT(20)     PRIMARY KEY,
	emp_id        INT(20)     FOREIGN KEY REFERENCES mechanics(emp_id),
	licence_no    INT(20)     FOREIGN KEY REFERENCES car(licence_no),
	time_in       VARCHAR(10) NOT NULL,
	time_out      VARCHAR(10)

	CONSTRAINT fk_not_null
		CHECK (emp_id IS NOT NULL
			AND licence_no IS NOT NULL)
)
