FROM node:8-alpine

WORKDIR /app

COPY . /app
RUN npm ci
RUN npm rebuild node-sass

CMD [ "npm", "run", "dev" ]
