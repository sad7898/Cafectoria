FROM node:16-alpine AS base
WORKDIR /
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --prod=true --no-lockfile && yarn cache clean

FROM base AS build
WORKDIR /
COPY . .
RUN yarn build


FROM nginx
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf 
ENV NODE_ENV=production
WORKDIR /usr/share/nginx/html
COPY --from=build /build .
