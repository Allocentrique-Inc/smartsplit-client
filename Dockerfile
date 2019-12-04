FROM node:10.16.0-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
ENV AWSCLI_VERSION "1.14.10"
RUN apk add --update \
    python \
    python-dev \
    py-pip \
    build-base \
    pixman \
    pixman-dev \
    cairo \
    cairo-dev \
    pango \
    pango-dev \
    libjpeg-turbo-dev \
    && pip install awscli==$AWSCLI_VERSION --upgrade --user \
    && apk --purge -v del py-pip \
    && rm -rf /var/cache/apk/*
RUN npm config set user 0
RUN npm install node-gyp
RUN npm install
EXPOSE 80
ENV PORT 80
CMD [ "npm", "start" ]