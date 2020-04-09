#!/bin/sh

# build
sudo docker build -t seciii/frontend-proxy:latest .

# get app's id
proxy_id=$(sudo docker container ls -aqf name="frontend-proxy")
if [ "$proxy_id" ]; then
  sudo docker container rm -v -f "$proxy_id"
else
  echo 'no service'
fi

# restart
sudo docker run -d \
  --name frontend-proxy \
  --network host \
  -p 80:80 \
  -p 443:443 \
  seciii/frontend-proxy:latest
