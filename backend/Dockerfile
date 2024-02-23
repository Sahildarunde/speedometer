FROM node:latest

WORKDIR /backend

COPY package*.json ./


RUN yarn install

COPY . .


EXPOSE 5173

CMD ["yarn", "start"]