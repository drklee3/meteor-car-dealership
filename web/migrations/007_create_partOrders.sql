CREATE TABLE partOrders (
	partName VARCHAR(20) FOREIGN KEY REFERENCES parts(name),
	repairId INT(20) FOREIGN KEY REFERENCES repairJob(repairId),
	quantity INT(20)
)
