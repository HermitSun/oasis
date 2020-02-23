#!/bin/sh

# get proxy's id
proxy_id=$(docker container ls -aqf name="frontend-proxy")
if [ "$proxy_id" ]; then
  docker container rm -v -f "$proxy_id"
else
  echo 'no service'
fi
