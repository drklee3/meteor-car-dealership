CREATE TABLE part_orders(
	part_name VARCHAR(20) NOT NULL,
	repair_id INT(20)     NOT NULL,
	quantity  INT(20)     NOT NULL,
	CONSTRAINT part_name_fk FOREIGN KEY(part_name)
		REFERENCES parts(name),
	CONSTRAINT repair_id_fk FOREIGN KEY(repair_id)
		REFERENCES repair_job(repair_id)
)
