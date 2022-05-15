FROM node:12-alpine AS BUILD_IMAGE

WORKDIR /app

COPY . /app

EXPOSE 3000

RUN npm i

RUN npm run gcp-build

RUN npm prune --production

FROM node:12-alpine

WORKDIR /app

COPY --from=BUILD_IMAGE /app/dist ./dist
COPY --from=BUILD_IMAGE /app/node_modules ./node_modules

CMD ["node", "dist/index.js"]