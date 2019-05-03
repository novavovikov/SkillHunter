#!/usr/bin/env bash

set -x

export USER_ID=$(id -u)
export GROUP_ID=$(id -g)

chown -R $USER_ID:$GROUP_ID ./*

