FROM node:14-alpine As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm install -g nx

COPY . .

RUN nx run api:build:production

FROM node:14-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/competition/main"]
