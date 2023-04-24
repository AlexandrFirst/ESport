FROM node:18-alpine
WORKDIR /opt/app
ADD package.json package.json
RUN npm install --force
ADD . .
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
RUN npm run build
RUN #npm prune --production
CMD ["npm", "start"]
EXPOSE 3000
