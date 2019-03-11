CREATE TABLE repair_problems(
	problem_id INT NOT NULL,
	repair_id  INT NOT NULL,
	CONSTRAINT repair_pk  PRIMARY KEY(problem_id, repair_id),
	CONSTRAINT problem_fk FOREIGN KEY(problem_id)
			REFERENCES problems(id),
	CONSTRAINT repair_fk  FOREIGN KEY(repair_id)
			REFERENCES repair_jobs(repair_id)
)
