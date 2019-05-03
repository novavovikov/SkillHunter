FROM node:10.15.3-alpine

RUN npm i -g ts-node
RUN npm i -g typeorm

WORKDIR /app

COPY *.json /app/
COPY *.js /app/
COPY src/ /app/src/
COPY test/ /app/test/

RUN npm ci

CMD [ "npm", "run", "start" ]
