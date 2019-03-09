CREATE TABLE repairProblems(
	problemId int(20) FOREIGN KEY REFERENCES problem(problemId),
	repairId int(20) FOREIGN KEY REFERENCES repairJobs(repairId)
)
