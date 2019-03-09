CREATE table repairJob (
	problemId    INT(20) PRIMARY KEY,
	empId        INT(20) FOREIGN KEY REFERENCES mechanics(empId),
	carLicenceNo INT(20) FOREIGN KEY REFERENCES car(carLicenceNo),
	timeIn       VARCHAR(10),
	timeOut      VARCHAR(10)
)
