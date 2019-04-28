#!/usr/bin/env bash

set -x

DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

if ! docker ps -q &> /dev/null
then
    echo "You must be in docker group or root"
    exit 1
fi

docker rm -f $(docker ps -a -q)
docker rmi -f $(docker images -a -q)
docker volume rm $(docker volume ls -q)
