[![Build Status](https://img.shields.io/travis/drklee3/meteor-car-dealership.svg?style=for-the-badge)](https://travis-ci.org/drklee3/meteor-car-dealership)
[![Codacy grade](https://img.shields.io/codacy/grade/f970b9ee9265492d85f74c7c806f6d6b.svg?style=for-the-badge)](https://www.codacy.com/app/drklee3/meteor-car-dealership?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=drklee3/meteor-car-dealership&amp;utm_campaign=Badge_Grade)

# meteor-car-dealership

Final project for COEN 178 (Intro to Database Systems).  This application is designed to automate a record-maintenance system for a car repair department with the following tasks:

* Maintain a detailed list of the customer records with information of the repair jobs done.  The management uses the customer records to schedule the routine maintenance dates for its regular customers.
* Maintain a record of the repair jobs to assist the management in customer billing, compute the mechanic’s pay.
* Maintain a record of all the mechanics, the repair-jobs they are responsible for and their work hours. This information helps the management compute the total pay of each mechanic. Additionally, the information helps the management assess the future hiring needs and allocation of duties to the mechanics.
* All the information in the database helps the management assess their monthly and yearly revenues.

Tools and Technologies required: Oracle Database, HTML and PHP.  At least one PLSQL procedure or function and at least one trigger.
[Full instructions](COEN178.project.winter.2019.pdf)

## Table of Contents

* [meteor-car-dealership](#meteor-car-dealership)
  * [Table of Contents](#table-of-contents)
  * [Installation (Script)](#installation-script)
  * [Manual Installation](#manual-installation)
    * [Prerequisites](#prerequisites)
    * [Back-End](#back-end)
    * [Front-End](#front-end)
    * [Installation (Manual)](#installation-manual)
  * [Running](#running)
  * [Project Layout](#project-layout)
    * [Directory / File Structure](#directory--file-structure)
  * [Troubleshooting](#troubleshooting)
  * [Testing](#testing)
  * [Back Up / Restore Database](#back-up--restore-database)
  * [ER models](#er-models)
    * [Crows Foot Notation](#crows-foot-notation)
    * [Textbook Notation](#textbook-notation)
    * [UML Notation](#uml-notation)

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

If passing the `-e` flag to read authentication options from environment variables, set the following environment variables before executing the script: `ORACLE_BIN_PWD` (Binary download password), `ORACLE_USR`, `ORACLE_PWD` (Desired database username and password).

## Manual Installation

### Prerequisites

You will need to download and install the following prerequisites.

### Back-End

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

### Front-End

* [Node.js](https://nodejs.org/en/download/)
* [npm](https://www.npmjs.com/get-npm)

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

4. Install front-end dependencies.

    ```bash
    cd web/app/
    npm install
    ```

## Running

1. Start docker containers.

    ```bash
    docker-compose up
    ```

2. Build the front-end application for production.

    ```bash
    cd web/app/
    npm run build
    ```

    To run it in development mode with live reloading.

    ```bash
    cd web/app/
    npm start
    ```

3. Wait for the `DATABASE IS READY TO USE` message, then open [localhost:8080](http://localhost:8080/) in your browser.
   If running the front end in development mode, open [localhost:3000](http://localhost:3000/).

To access the database via `sqplus` you can use the following command

```bash
docker exec -ti <docker image name> sqlplus <username>@<database>

# example
docker exec -ti meteor-car-dealership_database_1 sqlplus dlee@XE
```

## Project Layout

This application uses the following technologies.

Back-End: [Docker](https://www.docker.com/) (OS level virtualization / containerization), [nginx](https://nginx.org/en/) (HTTP server), [PHP-FPM](https://php-fpm.org/) (FastCGI Process Manager for PHP), [composer](https://getcomposer.org/) (Dependency Manager for PHP), [Oracle Database XE](https://www.oracle.com/database/technologies/appdev/xe.html) (a database duh).

Front-End: [React](https://reactjs.org/) (JavaScript library for user interfaces), [TypeScript](https://www.typescriptlang.org/) (superset of JavaScript with static typing, compiles to JS), [Sass](https://sass-lang.com/) (extension of CSS, compiles to CSS), [Bulma](https://bulma.io/) (SASS/CSS framework based on Flexbox).

### Directory / File Structure

Bolded directories are where the important logic of the application is located.

* [docker](docker/) - Dockerfiles used to create Docker images.
* [oracle](oracle/) - Set up and start up scripts for Oracle Database.
* [web](web/) - Website content.
  * [**app**](web/app/) - Front end application.
    * [public](web/app/public/) - Public static files.
    * [src](web/app/src/) - React and TypeScript application source code.
      * [components](web/app/src/components) - React components.
      * [styles](web/app/src/styles) - SASS files.
  * [**migrations**](web/migrations/) - SQL migrations.

    These SQL statements will run at start once (after it executes once, it will not run again). This is where you would create / delete / modify your SQL tables.  Migrations will run in ascending order based on filename (`000-xxx`, `001-xxx`, `002-xxx`, ...). Make sure SQL statements **do not** end with a semicolon (`;`) and PL/SQL statements **do** end with a semicolon.

  * [**public**](web/public/) - The root directory of the publicly accessible web server. Avoid storing private information or keys here.
  * [**sql**](web/sql/) - SQL queries for fetching/modifying table data.

    If multiple queries are required per file, wrap all statements in an anonymous PL/SQL block.  Follow the end semicolon usage as above in migrations, otherwise statements will produce errors on execution.

    ```sql
    BEGIN
        INSERT INTO tbl VALUES (1, 'uwu');
        INSERT INTO tbl VALUES (2, 'whats');
        INSERT INTO tbl VALUES (3, 'this');
    END;
    ```

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

## ER models

### Crows Foot Notation

![Crows Foot Notation](images/crows_foot.png)

### Textbook Notation

![Textbook Notation](images/textbook.png)

### UML Notation

![UML Notation](images/uml.png)
