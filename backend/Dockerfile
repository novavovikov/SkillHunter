FROM node:10.15.3-alpine

WORKDIR /app

RUN npm i -g @nestjs/cli

COPY .prettierrc /app/
COPY *.json /app/

RUN npm i

CMD [ "npm", "start" ]
