FROM node:16-alpine3.11
LABEL maintainer = "Tomer Groisman"

RUN mkdir -p /app
WORKDIR /app
COPY . /app

RUN npm install -g npm@latest
RUN npm install

EXPOSE 3000

CMD ["npm", "start"]