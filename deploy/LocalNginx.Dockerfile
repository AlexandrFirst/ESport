FROM nginx:1.16.0-alpine

COPY ./deploy/nginx-local.conf /etc/nginx/conf.d/default.conf
COPY ./certificates/local/localhost-key.pem /etc/letsencrypt/live/e-sport.cloud/privkey.pem
COPY ./certificates/local/localhost.pem /etc/letsencrypt/live/e-sport.cloud/fullchain.pem

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]