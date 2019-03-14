CREATE OR REPLACE PROCEDURE assign_problem_id (current_problem_type IN VARCHAR2)
AS
    new_problem_id INTEGER := 1;
BEGIN 
    SELECT MAX(id)
      INTO new_problem_id 
      FROM problems;
    
    IF new_problem_id IS NULL THEN
        new_problem_id := 1;
    end if;

    FOR i IN 1..DBMS_RANDOM.VALUE(1, 5)
    LOOP
        INSERT INTO problems VALUES (new_problem_id + i, current_problem_type);
    END LOOP;
END;

