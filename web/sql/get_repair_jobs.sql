      SELECT model
             , repair_id
             , name
        FROM repair_jobs
NATURAL JOIN mechanics
NATURAL JOIN cars
       WHERE time_in
     BETWEEN :start_date
         AND :end_date
