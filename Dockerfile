FROM node:latest

RUN mkdir /app

WORKDIR /app

COPY . .

RUN npm install

WORKDIR /app/backend

RUN npm install

WORKDIR /app/frontend

RUN npm install

WORKDIR /app

CMD ["npm","run","dev"]