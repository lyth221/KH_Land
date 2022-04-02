FROM node:14.15.4

# Create app directory
WORKDIR /var/BE/

# Install app dependencies
COPY ./package.json ./
COPY ./yarn.lock ./yarn.lock
RUN yarn install

# Bundle app source
COPY ./ ./
RUN yarn build

RUN yarn build
COPY ./public ./public

EXPOSE 4100 5100
ENV HOST 0.0.0.0

CMD ["yarn", "production"]
