# set env
ENV NODE_ENV=production
ENV HOST 0.0.0.0
# expose port
EXPOSE 3000

# build
COPY . /opt/app/

# start service
WORKDIR /opt/app
CMD npm run start
