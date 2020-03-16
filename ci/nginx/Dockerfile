FROM nginx:1.16.1-alpine

# just a proxy
# nginx conf
COPY default.conf /etc/nginx/conf.d/default.conf
# https conf
COPY 2670671_wensun.top.pem /etc/nginx/cert/2670671_wensun.top.pem
COPY 2670671_wensun.top.key /etc/nginx/cert/2670671_wensun.top.key
