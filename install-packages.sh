#!/bin/bash

_term() { 
  echo "Caught SIGTERM signal!" 
  pkill -9 $$
}

set -vx

npm run install:root
npm run install:packages

trap _term SIGTERM
trap _term EXIT