FROM node:10-alpine

WORKDIR /app
COPY . /app

RUN npm ci

CMD [ "npm", "run", "build" ]

