FROM node:10-alpine

RUN apk add --update git

RUN npm install -g gulp

WORKDIR /app

ENTRYPOINT [ "/app/build.sh" ]
