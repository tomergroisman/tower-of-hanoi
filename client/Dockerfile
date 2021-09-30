FROM node:14-alpine3.14 AS builder
WORKDIR /app
COPY . /app
RUN npm install
RUN npm run build

FROM nginx:1.21.3-alpine
COPY --from=builder /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 8081
CMD ["nginx", "-g", "daemon off;"]
