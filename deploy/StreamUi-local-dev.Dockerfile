FROM node:latest as build
WORKDIR /app

COPY package.json /app/package.json
RUN npm install
RUN npm install -g @angular/cli@latest

WORKDIR /usr/src/app/app-ui

COPY package*.json ./

RUN npm install -g @angular/cli @angular-devkit/build-angular && npm install

EXPOSE 4200

CMD ["npm", "start"]