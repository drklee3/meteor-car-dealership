CREATE OR REPLACE FUNCTION assign_repair_id
RETURN NUMBER
AS
    new_repair_id INTEGER := 0;
BEGIN 
    SELECT MAX(repair_id) 
      INTO new_repair_id 
      FROM repair_jobs;

    new_repair_id := new_repair_id + 1;
    RETURN new_repair_id;
END;
