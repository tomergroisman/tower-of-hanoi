FROM node:16
LABEL maintainer = "Tomer Groisman"

RUN mkdir /app
WORKDIR /app
COPY . /app

RUN npm install -g npm@latest
RUN npm install

EXPOSE 3000

CMD ["npm", "start"]