# meteor-car-dealership

Final project for COEN 178 (Intro to Database Systems)

## Installation

1. Install [Docker](https://docs.docker.com/install/) and [Docker Compose](https://docs.docker.com/compose/install/)
2. Clone [Oracle docker images](https://github.com/oracle/docker-images)
    ```bash
    git clone --depth 1 https://github.com/oracle/docker-images.git
    cd docker-images/OracleDatabase/SingleInstance/dockerfiles/
    ```
3. Download [Oracle XE 11.2.0.2](https://www.oracle.com/technetwork/database/database-technologies/express-edition/downloads/xe-prior-releases-5172097.html).  You will have to make an account first to download it... 😠
    ```bash
    # move the zip to the corresponding version directory
    mv oracle-xe-11.2.0-1.0.x86_64.rpm.zip 11.2.0.2/
    ```
4. Build the Oracle Docker image
    ```bash
    ./buildDockerImage.sh -v 11.2.0.2 -x
    ```
5. Clone this repository
    ```bash
    git clone https://github.com/drklee3/meteor-car-dealership.git
    ```
6. Create an .env file. You can change the Oracle database password in the
    [.env file](web/.env.example)
    ```bash
    cd web
    # copy the example environment file
    cp .env.example .env
    ```
7. Run docker containers
    ```bash
    docker-compose up
    ```

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
