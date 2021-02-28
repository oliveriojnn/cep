## Stage 1

FROM node:10.1.0 as node

COPY . /tmp

WORKDIR /tmp/

RUN npm install -g bower
RUN npm install -g gulp@3.9.1
RUN npm install
RUN bower install --allow-root
RUN gulp build

## Stage 2

FROM nginx:alpine

COPY --from=node /tmp/dist/ /usr/share/nginx/html/

WORKDIR /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]