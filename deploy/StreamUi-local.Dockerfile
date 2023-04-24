FROM node:latest as build
WORKDIR /app

COPY package.json /app/package.json
RUN npm install
RUN npm install -g @angular/cli@latest

COPY . /app

RUN ng build --configuration=local --output-path=dist

FROM nginx:1.16.0-alpine

COPY ./nginx-local.conf /etc/nginx/conf.d/default.conf
COPY ./.cerf/localhost.pem /etc/keys/localhost.pem
COPY ./.cerf/localhost-key.pem /etc/keys/localhost-key.pem
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]
