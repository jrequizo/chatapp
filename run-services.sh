#!/bin/bash 

_term() { 
  echo "Caught SIGTERM signal!" 
  pkill -9 $$
}

npm run start:services

trap _term SIGINT
trap _term EXIT