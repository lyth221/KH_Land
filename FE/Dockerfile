FROM node:14.18-alpine3.14 as Builder

COPY ./ ./

RUN yarn install

CMD ["yarn", "start"]