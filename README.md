# meteor-car-dealership

Final project for COEN 178 (Intro to Database Systems)

## Schema

### Cars

Either phone, email or both have to be given

| Field          | Type    | Constraint  |
| -------------- | ------- | ----------- |
| license_number | VARCHAR | PRIMARY KEY |
| model          | VARCHAR | NOT NULL    |
| phone          | VARCHAR |             |
| email          | VARCHAR |             |

### Problems

| Field        | Type    | Constraint  |
| ------------ | ------- | ----------- |
| problem_type | VARCHAR | NOT NULL    |
| problem_id   | NUMBER  | PRIMARY KEY |

### Customers

| Field   | Type    | Constraint |
| ------- | ------- | ---------- |
| name    | VARCHAR | NOT NULL   |
| phone   | VARCHAR | UNIQUE     |
| email   | VARCHAR | UNIQUE     |
| address | VARCHAR | UNIQUE     |

### Repair Jobs

| Field       | Type    | Constraint  |
| ----------- | ------- | ----------- |
| job_id      | NUMBER  | PRIMARY KEY |
| mechanic_id | NUMBER  | NOT NULL    |

### Employees

| Field       | Type    | Constraint  |
| ----------- | ------- | ----------- |
| employee_id | NUMBER  | PRIMARY KEY |
| name        | VARCHAR | NOT NULL    |
| phone       | VARCHAR | NOT NULL    |
| hourly_pay  | NUMBER  | NOT NULL    |
