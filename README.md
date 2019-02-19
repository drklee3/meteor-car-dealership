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

2. Create and update a `oracle/setup/create_user.sql` file from the given [example](oracle/setup/create_user.sql.example) with an unique username and password for the Oracle database.
    If you skip this step you will have to create your user and grant according permissions manually via SQL*Plus **or** delete database data shown below and restart.

    ```bash
    cd oracle/setup/
    # copy the sample file
    cp create_user.sql.sample create_user.sql
    # update the username / password variables in the file
    vim create_user.sql
    ```

3. Create an .env file from the given [example](web/.env.example). Update the `ORACLE_USR` and `ORACLE_PWD` variables with your credentials you used above.

    ```bash
    cd web
    # copy the example environment file
    cp .env.example .env
    # update ORACLE_USR and ORACLE_PWD
    vim .env
    ```

4. Run docker containers.

    ```bash
    docker-compose up
    ```

5. Wait for the `DATABASE IS READY TO USE` message, then open [localhost:8080](http://localhost:8080/) in your browser.

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
docker exec meteor-car-dealership_php_1 \
    bash -c \
    "cd /var/www; \
    ./vendor/bin/phpunit --bootstrap vendor/autoload.php tests"
```

## Troubleshooting

* To delete the database data

    ```bash
    docker-compose down
    rm -rf oradata/*
    ```

* If on startup you get database errors similar to the following

    ```text
    database_1  | mkdir: cannot create directory '/u01/app/oracle/oradata': Permission denied
    database_1  | mv: failed to access '/u01/app/oracle/oradata/dbconfig/XE/': Permission denied
    database_1  | mv: failed to access '/u01/app/oracle/oradata/dbconfig/XE/': Permission denied
    database_1  | mv: failed to access '/u01/app/oracle/oradata/dbconfig/XE/': Permission denied
    database_1  | mv: failed to access '/u01/app/oracle/oradata/dbconfig/XE/': Permission denied
    ```

    Delete and recreate the `oracle/oradata` directory as your user instead of root

    ```bash
    sudo rm -rf oracle/oradata
    mkdir oracle/oradata
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
