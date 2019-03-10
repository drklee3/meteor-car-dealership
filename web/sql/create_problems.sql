create or replace procedure insert_problems(problem_count,:problem,repair_id)
As
	number qty;
	number num_prob;
	number prob_id;
begin
	select count(*) into problem_count from problem;
	num_prob:=dbms_random.values(1,problem_count);
	for i in 1..num_prob loop
		prob_id:=dbms_random.values(1,problem_count);
		insert into problem values (prob_id,:problem);
		insert into Rep_Problems values(prob_id, repair_id);
	end loop
	qty:=num_prob*rand(0,1);
	Select part_name into pname From parts sample(qty);
	for i in 1..qty loop
		insert into part_orders values(pname,repair_id,qty);
	end loop;
end;
/
show errors;