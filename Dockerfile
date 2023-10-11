FROM node:16-alpine

# Install necessary packages including OpenSSL
RUN apk update && apk add --no-cache \
    curl \
    curl-dev \
    openssl \
    libc6-compat


WORKDIR /app

COPY package.json .

# Install app dependencies
RUN cd /app && npm install

# Bundle app source
COPY . /app

EXPOSE 6042

CMD [ "node", "app.js"]
