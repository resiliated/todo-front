FROM node:18-alpine as builder
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

FROM nginx:latest AS server
COPY --from=builder ./app/build /usr/share/nginx/html