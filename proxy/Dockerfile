FROM nginx:latest

COPY certs/certificate_bundled.crt /etc/nginx/certs/certificate_bundled.crt
COPY certs/private.key /etc/nginx/certs/private.key

COPY conf.d/nginx.conf /etc/nginx/nginx.conf
