DECLARE
    new_repair_id  INTEGER;
    mech_id        INTEGER := 0;
    labour_hours   INTEGER;
    cust_address   VARCHAR2(100);
    car_licence_no VARCHAR2(20);

    cust_exists    INTEGER;
    car_exists     INTEGER;
    
    -- get # of problems
    num_problems INTEGER := DBMS_RANDOM.VALUE(1, 5);
    
    -- get random problems
    CURSOR problem_cur IS
        SELECT *
          FROM (SELECT id
                  FROM problems
              ORDER BY DBMS_RANDOM.RANDOM)
         WHERE ROWNUM <= num_problems;
    
    problem problem_cur % ROWTYPE;

    -- get # of parts, scaled by number of problems
    num_parts INTEGER := num_problems * DBMS_RANDOM.VALUE(1, 3);

    CURSOR parts_cur IS
        SELECT *
          FROM (SELECT name
                  FROM parts
              ORDER BY DBMS_RANDOM.RANDOM)
         WHERE ROWNUM <= num_parts;
        
    part parts_cur % ROWTYPE;

    part_quantity INTEGER;
BEGIN
    cust_address := :address;
    car_licence_no := :licence_no;

    SELECT COUNT(*)
      INTO cust_exists
      FROM customers
     WHERE address = cust_address;

    -- insert only new customer
    IF cust_exists IS NULL OR cust_exists = 0 THEN
        INSERT
          INTO customers
        VALUES (cust_address, :phone, :email, :name);
    END IF;

    -- check if car already exists
    SELECT COUNT(*)
      INTO car_exists
      FROM cars
     WHERE licence_no = car_licence_no;
    
    -- insert only if car doesn't exist
    IF car_exists IS NULL OR car_exists = 0 THEN
        -- insert car data
        INSERT
          INTO cars
        VALUES (car_licence_no, cust_address, :model);
    END IF;
    
    -- get a new repair_id
    SELECT MAX(repair_id) 
      INTO new_repair_id 
      FROM repair_jobs;
    
    -- start repair ids at 0 or increment
    IF new_repair_id IS NULL THEN
        new_repair_id := 0;
    ELSE
        new_repair_id := new_repair_id + 1;
    END IF;

    -- get random mechanic
    SELECT emp_id
      INTO mech_id
      FROM (SELECT emp_id
              FROM mechanics
          ORDER BY DBMS_RANDOM.VALUE)
     WHERE ROWNUM = 1;

    -- insert repair problems
    FOR problem IN problem_cur
    LOOP
        INSERT
          INTO repair_problems
        VALUES (problem.id, new_repair_id);
    END LOOP;

    -- get labour hours
    labour_hours := num_problems * DBMS_RANDOM.VALUE(2, 5);

    INSERT
      INTO repair_jobs 
    VALUES (new_repair_id
            , mech_id
            , car_licence_no
            , labour_hours
            , TO_DATE(:time_in, 'YYYY-MM-DD')
            , NULL);
    

    -- insert part orders
    FOR part IN parts_cur
    LOOP
        part_quantity := DBMS_RANDOM.VALUE(1, 5);
        INSERT
          INTO part_orders
        VALUES (part.name, new_repair_id, part_quantity);
    END LOOP;
END;
