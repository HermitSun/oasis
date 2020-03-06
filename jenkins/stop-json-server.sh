#!/bin/sh

# get json-server's pid
port=3180
pid=$(netstat -nlp | grep :$port | awk '{print $7}' | awk -F"/" '{ print $1 }')

# kill json-server
if [ -n "$pid" ]; then
  kill -9 "$pid"
fi
