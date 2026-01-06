#!/usr/bin/env bash
set -e

docker build -t money-flow-backend-test .
docker run --rm money-flow-backend-test
