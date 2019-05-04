FROM node:8-alpine

WORKDIR /app

COPY *.json /app/
COPY *.js /app/
COPY pages/ /app/pages/
COPY static/ /app/static/
COPY styles/ /app/styles/
COPY components/ /app/components/
COPY constants/ /app/constants/

RUN chmod -R 755 /app/*

RUN npm ci
