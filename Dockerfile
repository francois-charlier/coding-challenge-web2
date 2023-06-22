FROM node:latest

RUN mkdir /app

WORKDIR /app

COPY . .

RUN npm install

WORKDIR /backend

RUN npm install

WORKDIR ../frontend

RUN npm install

WORKDIR /app

CMD ["npm","run","dev"]