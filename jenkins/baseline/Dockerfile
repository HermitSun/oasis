# basic image
FROM node:12.16.0-alpine

# copy package.json
COPY package.json /opt/app/package.json
# resolve dependencies
RUN cd /opt/app && npm install --registry=https://registry.npm.taobao.org
