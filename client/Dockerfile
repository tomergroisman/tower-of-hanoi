FROM node:14-alpine3.14
LABEL maintainer = "Tomer Groisman"

RUN mkdir /app
WORKDIR /app
COPY . /app

RUN npm install -g npm@latest
RUN npm install -g serve
RUN npm install

RUN npm run build

EXPOSE 3000

CMD source env.sh && cat build/env-config.js && serve -s build -l 3000
