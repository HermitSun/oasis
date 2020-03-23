#!/bin/sh

# get app's id
app_id=$(docker container ls -aqf name="frontend-app")
if [ "$app_id" ]; then
  docker container rm -v -f "$app_id"
else
  echo 'no service'
fi
