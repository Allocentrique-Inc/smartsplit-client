FROM node:10.16.0-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ARG mdp
COPY . .
ENV AWSCLI_VERSION "1.14.10"
RUN mkdir -p /run/nginx
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
    nginx\
    && pip install awscli==$AWSCLI_VERSION --upgrade --user \
    && apk --purge -v del py-pip \
    && rm -rf /var/cache/apk/*
RUN adduser -D -g 'www' www
RUN npm config set user 0
RUN npm install node-gyp
RUN npm install
RUN echo "secret:\$apr1\$al2g0SdX\$rLkdWi2UunyTHzm5XFAQi0" > /etc/nginx/.htpasswd
RUN /bin/busybox sed -i 's/user nginx;/user www;/g' /etc/nginx/conf.d/default.conf
RUN /bin/busybox sed -i 's/return 404;/proxy_pass http:\/\/localhost:3000; proxy_http_version 1.1; proxy_set_header Upgrade $http_upgrade; proxy_set_header Connection "upgrade"; proxy_set_header Host $host; proxy_cache_bypass $http_upgrade; auth_basic "Acces restreint"; auth_basic_user_file \/etc\/nginx\/.htpasswd;/g' /etc/nginx/conf.d/default.conf
EXPOSE 80
ENV PORT 3000
CMD ["npm", "start"]