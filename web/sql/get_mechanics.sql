      SELECT emp_id
             , name
        FROM mechanics
NATURAL JOIN repair_jobs
-- shouldn't have name here, not ncessarily unique
    GROUP BY emp_id, name
      HAVING SUM(labour_hours) >= ALL (
                 SELECT SUM(labour_hours)
                   FROM mechanics
           NATURAL JOIN repair_jobs
               GROUP BY emp_id);

DECLARE
    max_emp INTEGER;
BEGIN
    -- emp with most hours
          SELECT emp_id
            INTO max_emp
            FROM mechanics
    NATURAL JOIN repair_jobs
    -- shouldn't have name here, not ncessarily unique
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
	  HAVING labour_hours = ALL (
		      SELECT AVG(labour_hours)
		        FROM mechanics
		NATURAL JOIN repair_jobs
		    GROUP BY emp_id);
END;
