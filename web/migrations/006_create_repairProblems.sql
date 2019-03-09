CREATE TABLE repairProblems(
	problemId INT(20) FOREIGN KEY REFERENCES problem(problemId),
	repairId  INT(20) FOREIGN KEY REFERENCES repairJobs(repairId)
)
