# basic image
FROM node:12.16.0-alpine

# copy package.json
COPY package.json /tmp/package.json
# resolve dependencies
RUN cd /tmp \
&& npm i node-sass --sass_binary_site=https://npm.taobao.org/mirrors/node-sass/ \
&& npm install chromedriver --chromedriver_cdnurl=http://npm.taobao.org/mirrors/chromedriver \
&& npm install geckodriver --geckodriver_cdnurl=http://npm.taobao.org/mirrors/geckodriver \
&& npm install --registry=https://registry.npm.taobao.org

# copy node_modules
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/
# copy other files
WORKDIR /opt/app
COPY . /opt/app

# serve as a volume container
# 'volume' must be here, or node_modules will be missing
VOLUME /opt/app
