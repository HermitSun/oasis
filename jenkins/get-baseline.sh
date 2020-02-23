#!/bin/sh

# get baseline's id
baseline_id=$(docker container ls -aqf name="frontend-baseline")
if [ "$baseline_id" ]; then
  echo 'baseline has been prepared'
else
  docker run -d --name="frontend-baseline" registry.cn-hangzhou.aliyuncs.com/seciii/frontend-baseline:latest
fi
