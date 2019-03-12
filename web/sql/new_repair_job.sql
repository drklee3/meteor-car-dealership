DECLARE
	TYPE array_t
		IS Table
		OF varchar2 (20)
		INDEX BY Binary_Integer;
	repairId NUMBER;
	mech_count NUMBER;
	num_of_problems NUMBER;
	labour_hours NUMBER;
	qty number;
	prob_id number;
	problem_count number;
	pname varchar(20);
	CREATE OR REPLACE PROCEDURE assign_problem_id (current_problem_type)
	AS
		new_problem_id := 1;
	BEGIN 
		SELECT max(problem_id) 
			INTO new_problem_id 
			FROM problems;
		FOR i IN 1..dbms_random.values(1,5) LOOP
			INSERT INTO problems(new_problem_id+i, current_problem_type);
	END assign_problem_id;
	CREATE OR REPLACE PROCEDURE assign_repair_id
	AS
	RETURN number IS
		new_repair_id := 0;
	BEGIN 
		SELECT max(repair_id) 
			into new_repair_id 
			from repair_job;
		new_repair_id := new_repair_id + 1;
		RETURN new_repair_id;
	END assign_repair_id;
	PROCEDURE insertArray(arr IN array_t, repairId repair_jobs.repair_id%type) 
	IS
	BEGIN
		FOR i IN 1..arr.count LOOP
			SELECT count(*) 
				INTO num_of_problems
				FROM problems;
			FOR j IN 1..dbms_random.values(1,num_of_problems)
				INSERT INTO repair_problems 
					VALUES (repairId,arr(i));
		END LOOP;
	END insertArray;
	FUNCTION insert_problems (problem_types in array_t, repairId repair_jobs.repair_id%type) RETURN 
	IS NUMBER num_prob
	BEGIN
		SELECT count(*) 
			INTO problem_count 
			FROM problems;
		num_prob := dbms_random.values (1, problem_count);
		FOR i IN 1..num_prob LOOP
			prob_id := dbms_random.values (1, problems_count);
			FOR i IN 1..problem_types.count LOOP
				assign_problem_id(problem_types(i));
		END LOOP
		qty:=num_prob * rand(0,1);
		SELECT name 
			INTO pname 
			FROM parts SAMPLE (qty);
		FOR i IN 1..qty LOOP
			insert into part_orders 
				values(pname,repairId,qty);
		END LOOP;
		RETURN num_prob;
	END insert_problems;
BEGIN
	INSERT INTO customers
		VALUES(:address, :phone, :email, :name);
	INSERT INTO cars
		VALUES(:licence_No, :address, :model);
	repairId := assign_repair_id();
	SELECT count(*) 
		INTO mech_count 
		FROM mechanics;
	insertArray(:problems, repairId);
	num_of_problems := insert_problems(:problems, repairId);
	labour_hours := num_of_problems * dbms_random.values(2, 5);
	INSERT INTO repair_jobs 
		VALUES (repairId, dbms_random.values(1, mech_count), :licence_No, labour_hours, :time_in, NULL);
END;
/
show errors;