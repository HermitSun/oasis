#!/bin/sh

# stop running app
app_id=$(sudo docker container ls -aqf name="frontend-app")
if [ "$app_id" ]; then
  sudo docker container rm -v -f "$app_id"
else
  echo 'no service'
fi

# pull & restart
sudo docker pull registry.cn-hangzhou.aliyuncs.com/seciii/frontend-app:latest
sudo docker run -d \
  --name frontend-app \
  --network host \
  -p 443:443 \
  registry.cn-hangzhou.aliyuncs.com/seciii/frontend-app:latest
