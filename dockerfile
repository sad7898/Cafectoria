FROM node:16-alpine AS base
WORKDIR /
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --prod=true --no-lockfile && yarn cache clean

FROM base AS build
WORKDIR /
COPY . .
RUN yarn build

FROM node:16-alpine AS prod
WORKDIR /app
ENV NODE_ENV=production
COPY --from=base package.json ./
COPY --from=build /build ./build
COPY --from=build /public ./public
RUN npm install -g serve
EXPOSE 3000
CMD ["npx","serve","build"]
