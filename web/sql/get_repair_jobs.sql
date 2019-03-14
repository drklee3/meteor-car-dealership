      SELECT model
             , repair_id
             , name
        FROM repair_jobs
NATURAL JOIN mechanics
NATURAL JOIN cars
       WHERE time_in
     BETWEEN TO_DATE(:start_date, 'YYYY-MM-DD')
         AND TO_DATE(:end_date, 'YYYY-MM-DD')
    ORDER BY repair_id
