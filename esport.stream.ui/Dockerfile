FROM node:latest as build
WORKDIR /app

COPY package.json /app/package.json
RUN npm install
RUN npm install -g @angular/cli@latest

COPY . /app

RUN ng build --configuration=production --output-path=dist

FROM nginx:1.16.0-alpine

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./fullchain.pem /etc/keys/fullchain.pem
COPY ./privkey.pem /etc/keys/privkey.pem
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
