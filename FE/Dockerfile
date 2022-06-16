FROM node:14.18-alpine3.14 as Builder

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

COPY --chown=node:node yarn.lock ./

COPY --chown=node:node . .

RUN yarn install

CMD ["yarn", "start"]