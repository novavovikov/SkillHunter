FROM node:10.15.3-alpine

WORKDIR /app

COPY *.json /app/
COPY *.js /app/
COPY migrations/ /app/migrations/
COPY src/ /app/src/
COPY test/ /app/test/

RUN npm i

CMD [ "npm", "run", "start" ]
