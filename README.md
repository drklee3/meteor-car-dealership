# meteor-car-dealership

Final project for COEN 178 (Intro to Database Systems).  This application is designed to automate a record-maintenance system for a car repair department with the following tasks:

* Maintain a detailed list of the customer records with information of the repair jobs done.  The management uses the customer records to schedule the routine maintenance dates for its regular customers.
* Maintain a record of the repair jobs to assist the management in customer billing, compute the mechanic’s pay.
* Maintain a record of all the mechanics, the repair-jobs they are responsible for and their work hours. This information helps the management compute the total pay of each mechanic. Additionally, the information helps the management assess the future hiring needs and allocation of duties to the mechanics.
* All the information in the database helps the management assess their monthly and yearly revenues.

Tools and Technologies required: Oracle Database, HTML and PHP.  At least one PLSQL procedure or function and at least one trigger.

## Prerequisites

* [Docker](https://docs.docker.com/install/)

* [Docker Compose](https://docs.docker.com/compose/install/)

* Oracle Database XE
  1. Clone [Oracle docker images](https://github.com/oracle/docker-images).

        ```bash
        git clone --depth 1 https://github.com/oracle/docker-images.git
        cd docker-images/OracleDatabase/SingleInstance/dockerfiles/
        ```

  2. Download [Oracle Database 11.2.0.2. (11gR2) Express Edition for Linux x64](https://www.oracle.com/technetwork/database/database-technologies/express-edition/downloads/xe-prior-releases-5172097.html) (Download the Linux x64 version even if you are developing on a Windows host).  You will have to make an Oracle account first to download it... 😠

        ```bash
        # move the zip to the corresponding version directory
        mv oracle-xe-11.2.0-1.0.x86_64.rpm.zip 11.2.0.2/
        ```

  3. Build the Oracle Database Express Edition 11.2.0.2 Docker image.

       ```bash
       ./buildDockerImage.sh -v 11.2.0.2 -x
       ```

## Installation

1. Clone this repository.

    ```bash
    git clone https://github.com/drklee3/meteor-car-dealership.git
    ```

2. Create an .env file from the example given. You can change the Oracle database password in the [.env file](web/.env.example).

    ```bash
    # copy the example environment file
    cp web/.env.example web/.env
    ```

3. Run docker containers.

    ```bash
    docker-compose up
    ```

4. Wait for the `DATABASE IS READY TO USE` message, then open [localhost:8080](http://localhost:8080/) in your browser.

    To access the database via `sqplus` you can use the following command

    ```bash
    docker exec -ti <docker image name> sqlplus <username>@<database>

    # example
    docker exec -ti meteor-car-dealership_database_1 sqlplus dlee@XE
    ```

## Testing

Tests are located in [`web/tests/`](web/tests/) utilizing [PHPUnit](https://phpunit.de/index.html).

You can run the tests within the running php Docker container via the following command

```bash
docker exec meteor-car-dealership_php_1 bash -c "cd /var/www; ./vendor/bin/phpunit --bootstrap vendor/autoload.php tests"
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
