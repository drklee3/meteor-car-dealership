CREATE table repairJob (
	problemId int(20) PRIMARY KEY,
	empId int(20) FOREIGN KEY REFERENCES mechanics(empId),
	carLicenceNo int(20) FOREIGN KEY REFERENCES car(carLicenceNo),
	timeIn varchar(10),
	timeOut varchar(10)
)
