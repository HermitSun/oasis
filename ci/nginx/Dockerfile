FROM nginx:1.16.1

# just a proxy
# nginx conf
COPY nginx.conf /etc/nginx/nginx.conf
COPY default.conf /etc/nginx/conf.d/default.conf
# https conf
COPY 2670671_wensun.top.pem /etc/nginx/cert/4254584_wensun.top.pem
COPY 2670671_wensun.top.key /etc/nginx/cert/4254584_wensun.top.key
# modules
COPY modules /etc/nginx/modules
