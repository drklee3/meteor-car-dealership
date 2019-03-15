CREATE TABLE repair_jobs (
    repair_id    INT         PRIMARY KEY,
    emp_id       INT         NOT NULL,
    licence_no   VARCHAR(20) NOT NULL,
    labour_hours INT         NOT NULL,
    time_in      TIMESTAMP   NOT NULL,
    time_out     TIMESTAMP,
    CONSTRAINT emp_id_fk     FOREIGN KEY(emp_id)
                             REFERENCES mechanics(emp_id),
    CONSTRAINT licence_no_fk FOREIGN KEY(licence_no)
                             REFERENCES cars(licence_no)
)
