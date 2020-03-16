#!/bin/sh

# get server's pid
port=3000
pid=$(netstat -nlp | grep :$port | awk '{print $7}' | awk -F"/" '{ print $1 }')

# kill server
if [ -n "$pid" ]; then
  kill -9 "$pid"
fi
