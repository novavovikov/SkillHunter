FROM node:10-alpine

WORKDIR /app

RUN npm config set unsafe-perm true
RUN npm install -g yarn

COPY ./ /app/

RUN chmod -R 755 /app/*

RUN yarn install
RUN yarn run clean
RUN yarn workspace web build
