#!/bin/sh

# get baseline's id
baseline_id=$(docker container ls -aqf name="frontend-baseline")
if [ "$baseline_id" ]; then
  docker container rm -v -f "$baseline_id"
fi
