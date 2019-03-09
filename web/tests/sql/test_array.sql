DECLARE
    TYPE array_t
      IS TABLE
      OF VARCHAR2(20)
      INDEX BY BINARY_INTEGER;
    PROCEDURE insertArray(arr IN array_t) IS 
    BEGIN
        FOR i IN 1..arr.count LOOP
            INSERT INTO testing123 VALUES (arr(i));
        END LOOP;
    END;
BEGIN
    insertArray(:numbers);
END;
