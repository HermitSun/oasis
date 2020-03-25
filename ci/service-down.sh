#!/bin/sh

# get app's id
app_id=$(sudo docker container ls -aqf name="frontend-app")
if [ "$app_id" ]; then
  sudo docker container rm -v -f "$app_id"
else
  echo 'no service'
fi
