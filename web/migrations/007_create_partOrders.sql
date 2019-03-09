CREATE TABLE partOrders (
	partName varchar(20) FOREIGN KEY REFERENCES parts(name),
	repairId int(20) FOREIGN KEY REFERENCES repairJob(repairId),
	quantity int(20)
);
