CREATE TABLE (
	repair_id INT PRIMARY KEY, 
	emp_id INT NOT NULL,
	licence_no VARCHAR(20) NOT NULL,
	labour_hours INT NOT NULL
	time_in TIMESTAMP NOT NULL,
	time_out TIMESTAMP,
);