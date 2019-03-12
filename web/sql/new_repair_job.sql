--have not done parts insertion and mechanic
DECLARE 
	TYPE array_t
		IS Table
		OF varchar2 (20)
		INDEX BY Binary_Integer;
	repair_id NUMBER;
PROCEDURE insertArray(arr IN array_t, repair_id) IS
	BEGIN
		FOR i IN 1..arr.count LOOP
			INSERT INTO repair_problems VALUES (repair_id,arr(i));
		END LOOP;
	END;
BEGIN
	INSERT INTO customer 
	VALUES(:name, :phone, :email, :address);
	INSERT INTO car 
	VALUES(:license_No, :phone, :email, :model);
	repair_id:=assign_repair_id();
	SELECT count(*) 
	INTO mech_count 
	FROM mechanic;
	INSERT INTO repair_job 
	values(repair_id, dbms_random.values(1,mech_count), :license_No, :time_in, NULL);
	insertArray(:problems,repair_id);
END;