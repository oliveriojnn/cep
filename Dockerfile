## Stage 1

FROM node:10.1.0 as node1

COPY . /tmp

WORKDIR /tmp/

RUN npm install -g bower
RUN npm install -g gulp@3.9.1
RUN npm install
RUN bower install --allow-root
RUN gulp build

## Stage 2

FROM ubuntu:20.04

RUN apt-get update && apt-get install nginx -y

COPY nginx/default.conf /etc/nginx/sites-enabled/default

COPY --from=node1 --chown=www-data:www-data /tmp/dist/ /var/www/cep/

WORKDIR /var/www/cep/

EXPOSE 80

RUN service nginx restart
CMD ["nginx", "-g", "daemon off;"]