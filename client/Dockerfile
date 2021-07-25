FROM node:14-alpine3.14
LABEL maintainer = "Tomer Groisman"

RUN mkdir -p /app/build
WORKDIR /app
COPY ./env.sh /app
COPY ./build /app/build

RUN npm install -g npm@latest
RUN npm install -g serve

EXPOSE 3000

CMD source env.sh && serve -s build -l 3000
