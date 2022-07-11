#!/bin/bash 

_term() { 
  echo "Caught SIGTERM signal!" 
  kill -9 $$
}

npm run start:client

trap _term SIGINT
trap _term EXIT