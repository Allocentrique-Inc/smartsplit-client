FROM node:14 AS node-modules
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install

FROM node-modules AS production-bundle
WORKDIR /app
COPY . .
RUN yarn cache clean
RUN yarn run expo build:web --dev

FROM nginx:stable-alpine AS production-server
WORKDIR /app
COPY --from=production-bundle /app/web-build /app
COPY deploy/nginx-server.conf /etc/nginx/conf.d/default.conf
COPY deploy/htpasswd /etc/nginx/htpasswd
