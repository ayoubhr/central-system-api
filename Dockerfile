FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci && npm cache clean --force && npm install -g typescript

USER node

COPY --chown=node:node . .