CREATE TABLE repair_problems(
	problem_id INT(20) NOT NULL,
	repair_id  INT(20) NOT NULL,

	CONSTRAINT repair_pk  PRIMARY KEY(problem_id, repair_id),
	CONSTRAINT problem_fk FOREIGN KEY(problem_id)
			REFERENCES problem(problem_id),
	CONSTRAINT repair_fk  FOREIGN KEY(repair_id)
			REFERENCES repair_jobs(repair_id)
)
