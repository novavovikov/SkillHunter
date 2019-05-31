#!/usr/bin/env bash

set -x

docker run -it --rm \
      -v certs:/etc/letsencrypt \
      -v certs_data:/data/letsencrypt \
      deliverous/certbot \
      certonly \
      --webroot --webroot-path=/data/letsencrypt \
      -d skillhunter.io \
      -d app.skillhunter.io \
      -d admin.skillhunter.io
