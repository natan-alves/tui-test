FROM node:12-slim

WORKDIR /usr/src/app

COPY index.ts ./
COPY package*.json ./
COPY tsconfig.json ./
COPY src/ ./src
COPY dist/ ./dist

RUN npm install

EXPOSE 8080

CMD [ "npm", "start" ]