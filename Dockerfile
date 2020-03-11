FROM node:10.16.0-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
RUN apk add --update \
    build-base \
    && rm -rf /var/cache/apk/*
RUN npm install
EXPOSE 80
ENV PORT 80
CMD [ "npm", "start" ]
