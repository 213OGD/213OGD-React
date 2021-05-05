#!/bin/sh
GATEWAY_PORT=$PORT docker-compose -f docker-compose.yml -f docker-compose-prod.yml up --build -d