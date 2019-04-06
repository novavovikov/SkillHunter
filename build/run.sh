#!/usr/bin/env bash

export USER_ID=$(id -u)
export GROUP_ID=$(id -g)

docker-compose build
docker-compose up --force-recreate
