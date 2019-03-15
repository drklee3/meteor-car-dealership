DECLARE
     FUNCTION get_description(rep_id IN INTEGER)
     RETURN VARCHAR2
     AS
          CURSOR problems_cur IS
          SELECT problem_type
            FROM repair_problems, problems
           WHERE repair_problems.problem_id = problems.id
           AND repair_id = rep_id;
          
          problem problems_cur % ROWTYPE;
          
          problem_desc VARCHAR2(100) := '';
     BEGIN
          FOR problem IN problems_cur
          LOOP
               problem_desc := problem_desc || ', ' || problem.problem_type;
          END LOOP;

          RETURN problem_desc;
     END;
     
BEGIN
     -- description?
           SELECT model
                  , repair_id
                  , LISTAGG(problem_type, ',')
                       WITHIN GROUP
                    (ORDER BY problem_type)
                  , name
             FROM repair_jobs
     NATURAL JOIN mechanics
     NATURAL JOIN cars
     NATURAL JOIN repair_problems
       INNER JOIN problems
               ON problems.id = repair_problems.problem_id
            WHERE time_in
          BETWEEN TO_DATE(:start_date, 'YYYY-MM-DD')
              AND TO_DATE(:end_date, 'YYYY-MM-DD')
         GROUP BY repair_id
         ORDER BY repair_id;

           SELECT model
                  , repair_id
                  , LISTAGG(problem_type, ', ')
                       WITHIN GROUP
                    (ORDER BY problem_type)
                           AS description
                  , name
             FROM repair_jobs
     NATURAL JOIN mechanics
     NATURAL JOIN cars
     NATURAL JOIN repair_problems
  LEFT OUTER JOIN problems
               ON problems.id = repair_problems.problem_id
         GROUP BY repair_id
                  , model
                  , name
         ORDER BY repair_id;
         -- cant groupu by model / name or loses stuff
         
         SELECT model
                  , repair_id
                  , name
             FROM repair_jobs
     NATURAL JOIN mechanics
     NATURAL JOIN cars
     NATURAL JOIN repair_problems
         GROUP BY repair_id
         ORDER BY repair_id;
END;