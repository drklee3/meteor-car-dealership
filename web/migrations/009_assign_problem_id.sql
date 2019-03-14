CREATE OR REPLACE PROCEDURE assign_problem_id (current_problem_type VARCHAR(20))
AS
	new_problem_id INTEGER := 1;
BEGIN 
	SELECT max(problem_id) 
		INTO new_problem_id 
		FROM problems;
	FOR i IN 1..dbms_random.values(1,5) LOOP
		INSERT INTO problems(new_problem_id + i, current_problem_type);
END;