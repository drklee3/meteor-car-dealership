CREATE TABLE part_orders (
	part_name VARCHAR(20) NOT NULL FOREIGN KEY REFERENCES parts(name),
	repair_id INT(20) NOT NULL FOREIGN KEY REFERENCES repair_job(repair_id),
	quantity INT(20) NOT NULL
)
