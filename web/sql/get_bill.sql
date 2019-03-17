      SELECT customers.name
             , address
             , customers.phone
             , customers.email
             , licence_no
             , cars.model
             , repair_jobs.time_in
             , repair_jobs.time_out
             , labour_hours * hourly_pay + 30
               AS cost
               -- but we need cost of parts here too
        FROM repair_jobs
NATURAL JOIN customers
NATURAL JOIN cars
        JOIN mechanics
          ON repair_jobs.emp_id = mechanics.emp_id

DELETE FROM REPAIR_JOB;
