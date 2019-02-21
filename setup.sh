#!/bin/bash

ORACLE_BIN_URL="https://meteor.drklee.me/protected/oracle-xe-11.2.0-1.0.x86_64.rpm.zip"
SHOULD_INSTALL_DOCKER="true"
SHOULD_BUILD_ORACLE="true"

install_docker() {
    echo "Installing Dependencies"
    # install prereqs
    sudo apt-get install \
        apt-transport-https \
        ca-certificates \
        curl \
        gnupg-agent \
        software-properties-common

    echo "Installing Docker"
    # install docker
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

    sudo add-apt-repository \
    "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
    $(lsb_release -cs) \
    stable"

    sudo apt update
    sudo apt install docker-ce

    echo "Installing Docker Compose"

    # install docker-compose
    sudo curl -L https://github.com/docker/compose/releases/download/1.18.0/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    docker-compose --version

    echo "Adding you to the Docker group"
    # add self to docker group
    sudo groupadd docker
    sudo usermod -aG docker $USER
}

build_oracle() {
    # set up oracle docker image
    echo "Cloning Oracle Docker images"
    git clone --depth 1 https://github.com/oracle/docker-images.git
    cd docker-images/OracleDatabase/SingleInstance/dockerfiles/

    read -p "Enter password: " passwd

    echo "Downloading Oracle"
    wget -P 11.2.0.2/ --user hello --password "$passwd" "$ORACLE_BIN_URL"
    if [[ $? -ne 0 ]]; then
        echo "Invalid password"
        exit 1; 
    fi

    # build oracle database xe
    bash buildDockerImage.sh -v 11.2.0.2 -x

    cd ../../../../

    # clean up
    rm -rf docker-images/
}

usage() {
  echo "Usage: $0 [-dh]"
  echo "  -d          skip installation of Docker and Docker Compose"
  echo "  -o          skip build of Oracle Docker image"
  echo "  -h          display help"
  exit 1
}

# parse input flags
while getopts "doh" flag; do
  case $flag in
    d) SHOULD_INSTALL_DOCKER="false" ;;
    o) SHOULD_BUILD_ORACLE="false" ;;
    h) usage ;;
    *) echo "Unexpected option ${flag}"; exit 2;;
  esac
done

if [ $SHOULD_INSTALL_DOCKER == "true" ]; then
    install_docker
fi

if [ $SHOULD_BUILD_ORACLE == "true" ]; then
    build_oracle
fi

## set up oracle auth

# copy sample file
cp oracle/setup/create_user.sql.example oracle/setup/create_user.sql

# get user input
read -p "Enter Oracle username: " ORACLE_USR
read -sp "Enter Oracle password: " ORACLE_PWD
echo ""
read -sp "Confirm password: " ORACLE_PWD_CNFM

# check if valid
if [ -z "$ORACLE_USR" ]; then
    echo "Username cannot be empty"
    exit 1
fi

if [ -z "$ORACLE_PWD" ]; then
    echo "Password cannot be empty"
    exit 1
fi

if [ "$ORACLE_PWD" != "$ORACLE_PWD_CNFM" ]; then
    echo "Password does not match"
    exit 1
fi

# replace given auth
sed -i "s/dlee/$ORACLE_USR/g" oracle/setup/create_user.sql
sed -i "s/Hunter2/$ORACLE_PWD/g" oracle/setup/create_user.sql

# copy auth to env file
cp web/.env.example web/.env
sed -i "s/dlee/$ORACLE_USR/g" web/.env
sed -i "s/Hunter2/$ORACLE_PWD/g" web/.env

printf "Set up complete! Run the following to start the application:\n"
printf "\t docker-compose up\n\n"
printf "Open http://localhost:8080 in your browser after you see 'DATABASE IS READY TO USE'\n"

