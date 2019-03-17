DECLARE 
	r_emp_id INT;
	r_licence_no VARCHAR(20);
	r_labour_hours NUMBER;
	r_time_in repair_job.time_in%type;
	r_time_out repair_job.time_out%type;
	
PROCEDURE insert_logtable(r_repair_id NUMBER)
	IS
	BEGIN 
		SELECT emp_id INTO r_emp_id,
					 licence_no INTO r_licence_no,
					 labour_hours INTO r_labour_hours,
					 time_in INTO r_time_in,
					 time_out INTO r_time_out
			FROM repair_job
			WHERE r_repair_id = repair_id;
		INSERT INTO logtable 
			VALUES(r_repair_id, r_emp_id ) 
	END insert_logtable;
/
show errors;