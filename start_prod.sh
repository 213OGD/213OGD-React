#!/bin/sh
git fetch origin && git reset --hard origin/master && git clean -f -d
GATEWAY_PORT=$PORT docker-compose -f docker-compose.yml -f docker-compose-prod.yml up --build -d