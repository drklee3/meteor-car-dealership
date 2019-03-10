--find max repair_id, then + 1

CREATE or REPLACE Procedure assign_repair_id
As
RETURN number IS
	new_repair_id :=0;
BEGIN 
	SELECT max(repair_id) into new_repair_id from repair_job;
	new_repair_id := new_repair_id + 1;
	RETURN new_repair_id;
END;
/
show errors;	
