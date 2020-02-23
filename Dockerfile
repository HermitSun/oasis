FROM nginx:1.16.1-alpine

# static resources
COPY dist/ /etc/nginx/html/

# nginx conf
COPY jenkins/nginx/default.conf /etc/nginx/conf.d/default.conf
# https conf
COPY jenkins/nginx/2670671_wensun.top.pem /etc/nginx/cert/2670671_wensun.top.pem
COPY jenkins/nginx/2670671_wensun.top.key /etc/nginx/cert/2670671_wensun.top.key
