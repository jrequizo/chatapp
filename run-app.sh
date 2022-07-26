#!/bin/bash 

_term() { 
  echo "Caught SIGTERM signal!"
  pkill -9 $$
}

npm run start

trap _term SIGINT
trap _term EXIT