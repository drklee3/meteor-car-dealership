[![Build Status](https://img.shields.io/travis/drklee3/meteor-car-dealership.svg?style=for-the-badge)](https://travis-ci.org/drklee3/meteor-car-dealership)
[![Codacy grade](https://img.shields.io/codacy/grade/f970b9ee9265492d85f74c7c806f6d6b.svg?style=for-the-badge)](https://www.codacy.com/app/drklee3/meteor-car-dealership?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=drklee3/meteor-car-dealership&amp;utm_campaign=Badge_Grade)

# meteor-car-dealership

Final project for COEN 178 (Intro to Database Systems).  This application is designed to automate a record-maintenance system for a car repair department with the following tasks:

* Maintain a detailed list of the customer records with information of the repair jobs done.  The management uses the customer records to schedule the routine maintenance dates for its regular customers.
* Maintain a record of the repair jobs to assist the management in customer billing, compute the mechanic’s pay.
* Maintain a record of all the mechanics, the repair-jobs they are responsible for and their work hours. This information helps the management compute the total pay of each mechanic. Additionally, the information helps the management assess the future hiring needs and allocation of duties to the mechanics.
* All the information in the database helps the management assess their monthly and yearly revenues.

Tools and Technologies required: Oracle Database, HTML and PHP.  At least one PLSQL procedure or function and at least one trigger.

## Table of Contents

* [meteor-car-dealership](#meteor-car-dealership)
  * [Table of Contents](#table-of-contents)
  * [Installation (Script)](#installation-script)
  * [Manual Installation](#manual-installation)
    * [Prerequisites](#prerequisites)
    * [Installation (Manual)](#installation-manual)
  * [Project Layout](#project-layout)
    * [Directory / File Structure](#directory--file-structure)
  * [Troubleshooting](#troubleshooting)
  * [Testing](#testing)
  * [Back Up / Restore Database](#back-up--restore-database)
  * [Schema](#schema)
    * [Cars](#cars)
    * [Problems](#problems)
    * [Customers](#customers)
    * [Repair Jobs](#repair-jobs)
    * [Employees](#employees)

## Installation (Script)

You can install the prerequisites listed above along with required dependencies with the provided `setup.sh` script.  You need to input a desired login username and password for the database after installation finishes.  You can skip certain steps by passing the corresponding flags.

```bash
chmod +x setup.sh

# will install Docker, Docker Compose, & Oracle
# and configure the Database with given authentication options
./setup.sh
```

```text
Usage: ./setup.sh [-doemh]
  -d          skip installation of Docker and Docker Compose
  -o          skip build of Oracle Docker image
  -e          read authentication options from environment
  -m          use manually downloaded Oracle binaries
  -h          display help
```

If you are manually downloading the Oracle Database binaries, download them to the root directory in this repository then run the script with the `-m` flag.  Do not unzip the file.

## Manual Installation

### Prerequisites

You will need to download and install the following prerequisites.

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

### Installation (Manual)

1. Clone this repository.

    ```bash
    git clone https://github.com/drklee3/meteor-car-dealership.git
    ```

2. Create and update a `oracle/setup/create_user.sql` file from the given [example](oracle/setup/create_user.sql.example) with an unique username and password for the Oracle database.
    If you skip this step you will have to create your user and grant according permissions manually via SQL*Plus **or** delete database data shown below and restart.

    ```bash
    cd oracle/setup/
    # copy the example file
    cp create_user.sql.example create_user.sql
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

## Project Layout

This application uses the following technologies: [Docker](https://www.docker.com/) (OS level virtualization / containerization), [nginx](https://nginx.org/en/) (HTTP server), [PHP-FPM](https://php-fpm.org/) (FastCGI Process Manager for PHP), [composer](https://getcomposer.org/) (Dependency Manager for PHP), [Oracle Database XE](https://www.oracle.com/database/technologies/appdev/xe.html) (a database duh).

### Directory / File Structure

Bolded directories are where the important logic of the application is located.

* [docker](docker/) - Dockerfiles used to create Docker images.
* [oracle](oracle/) - Set up and start up scripts for Oracle Database.
* [web](web/) - Website content.
  * [**migrations**](web/migrations/) - SQL migrations. These SQL statements will run at start once (after it executes once, it will not run again). This is where you would create / delete / modify your SQL tables.  Migrations will run in ascending order based on filename (`000-xxx`, `001-xxx`, `002-xxx`, ...).
  * [**public**](web/public/) - The root directory of the publicly accessible web server. Avoid storing private information or keys here.
  * [**src**](web/src/) - Source code of the web application.  Private information can be stored here.
  * [**tests**](web/tests/) - PHP unit tests.
  * [.env.example](web/.env.example) - Example environment file for database authentication options. The file that will actually be used is `.env` in the same directory.
  * .migrations - File to store migrations that have been already run.
  * [composer.json](web/composer.json) - PHP dependencies.
* [docker-compose.yml](docker-compose.yml) - Defines and runs multi-container Docker applications.
* [setup.sh](setup.sh) - Setup script to install dependencies and setup the database.
* [site.conf](site.conf) - nginx configuration.

## Troubleshooting

If you run into a permission error relating to saving the `.migrations` file, create an empty file called `.migrations` in the `web/` directory.  Then allow give ownership to the `http` user / group with the command `chown http:http .migrations` and grant read / write permissions to owner with `chmod 644 .migrations`.

## Testing

Tests are located in [`web/tests/`](web/tests/) utilizing [PHPUnit](https://phpunit.de/index.html).

You can run the tests within the running php Docker container via the following command

```bash
docker exec meteor_php \
    bash -c \
    "cd /var/www; \
    ./vendor/bin/phpunit --bootstrap vendor/autoload.php tests"
```

## Back Up / Restore Database

You can make a tar archive of the Database content via the following commands

```bash
# backup volume in Oracle container
$ docker run --rm --volumes-from meteor_oracle -v $(pwd):/backup ubuntu tar cvf /backup/backup.tar /u01/app/oracle/oradata
```

To restore data

```bash
# restore to Oracle container's volume
docker run -v /u01/app/oracle/oradata --name db_data ubuntu /bin/bash

docker run --rm --volumes-from db_data -v $(pwd):/backup ubuntu bash -c "cd /u01/app/oracle/oradata && tar xvf /backup/backup.tar --strip 1"
```

To delete the database data, stop any running docker containers (ctrl + c if you ran `docker-compose up`) then run the following

```bash
docker-compose down

# find volume name via docker volume ls
docker volume rm meteor-car-dealership_db-data
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
| car_id      | VARCHAR | FOREIGN KEY |

### Employees

| Field       | Type    | Constraint  |
| ----------- | ------- | ----------- |
| employee_id | NUMBER  | PRIMARY KEY |
| name        | VARCHAR | NOT NULL    |
| phone       | VARCHAR | NOT NULL    |
| hourly_pay  | NUMBER  | NOT NULL    |
