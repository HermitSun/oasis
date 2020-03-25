#!/bin/sh

# build nuxt release
sudo npm run build
# set current time as version
version=$(date "+%Y%m%d%H%M%S")
# build docker image
sudo docker build -t registry.cn-hangzhou.aliyuncs.com/seciii/frontend-app:"${version}" .
# add latest tag
sudo docker tag \
registry.cn-hangzhou.aliyuncs.com/seciii/frontend-app:"${version}" \
registry.cn-hangzhou.aliyuncs.com/seciii/frontend-app:latest
# push image
sudo docker push registry.cn-hangzhou.aliyuncs.com/seciii/frontend-app:"${version}"
sudo docker push registry.cn-hangzhou.aliyuncs.com/seciii/frontend-app:latest
