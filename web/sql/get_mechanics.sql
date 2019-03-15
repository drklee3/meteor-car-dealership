-- Part D
DECLARE
    max_emp INTEGER;
BEGIN
    -- emp with most hours
          SELECT emp_id
            INTO max_emp
            FROM mechanics
    NATURAL JOIN repair_jobs
    -- shouldn't have name here, not necessarily unique
        GROUP BY emp_id, name
          HAVING SUM(labour_hours) >= ALL (
                     SELECT SUM(labour_hours)
                       FROM mechanics
               NATURAL JOIN repair_jobs
                   GROUP BY emp_id);
    
   -- emp with least hours
  	  SELECT emp_id
            FROM mechanics
    NATURAL JOIN repair_jobs 
	GROUP BY emp_id, name
	 HAVING SUM(labour_hours) <= ALL (
		      SELECT SUM(labour_hours)
			FROM mechanics
		NATURAL JOIN repair_jobs
		    GROUP BY emp_id);

   -- emp avg hours
	  SELECT emp_id
            FROM mechanics
    NATURAL JOIN repair_jobs
	GROUP BY emp_id, name
	  -- dunno if need ALL after = 
	  HAVING labour_hours = 
		      SELECT AVG(labour_hours)
		        FROM mechanics
		NATURAL JOIN repair_jobs
		    GROUP BY emp_id;
END;
