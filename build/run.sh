#!/usr/bin/env bash

export USER_ID=$(id -u)
export GROUP_ID=$(id -g)

export COMPOSE_FILE=docker-compose.dev.yml

docker-compose build
docker-compose up --force-recreate
