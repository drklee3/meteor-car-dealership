--have not done parts insertion and mechanic
DECLARE 
	Type array_t
		is Table
		of varchar2 (20)
		INDEX BY Binary_Integer;
	repair_id NUMBER;
Procedure insertArray(arr IN array_t, repair_id) IS
	begin
		FOR i in 1..arr.count LOOP
			Insert INTO repair_problems VALUES (repair_id,arr(i));
		End LOOP;
	end;
begin
	insert into customer values(:name, :phone, :email, :address);
	insert into car values(:license_No, :phone, :email, :model);
	repair_id:=assign_repair_id();
	select count(*) into mech_count from mechanic;
	insert into repair_job values(repair_id, dbms_random.values(1,mech_count), :license_No, :time_in, NULL);
	insertArray(:problems,repair_id);
End;