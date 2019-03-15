-- Part B
DECLARE
	total NUMBER(100,2);
BEGIN
      SELECT customers.name
             , address
             , customers.phone
             , customers.email
             , licence_no
             , cars.model
             , repair_jobs.time_in
             , repair_jobs.time_out
             , labour_hours * hourly_pay + 30
	     , parts.cost
               AS cost
               -- but we need cost of parts here too
        FROM repair_jobs
NATURAL JOIN customers
NATURAL JOIN cars
NATURAL JOIN parts
        JOIN mechanics
          ON repair_jobs.emp_id = mechanics.emp_id

	SELECT total
	FROM
	(
		-- total cost?
		SELECT labour_costs * hourly_pay + 30
		FROM mechanics
		NATURAL JOIN parts
		UNION ALL 
		SELECT cost
		FROM parts
	)
END;
