FROM node:lts-alpine AS react

RUN mkdir /home/node/web
COPY ./web/package.json /home/node/web
COPY ./web/yarn.lock /home/node/web
WORKDIR /home/node/web

RUN yarn install -s

COPY ./web /home/node/web
RUN yarn build

FROM node:lts-alpine

RUN mkdir /home/node/api
COPY ./api/package.json /home/node/api
COPY ./api/yarn.lock /home/node/api
WORKDIR /home/node/api

RUN yarn install -s
COPY ./api /home/node/api
COPY --from=react /home/node/web/build /home/node/api/public

EXPOSE 3001
ENV NODE_ENV=production
RUN yarn build
CMD ["node", "./build/index.js"]
