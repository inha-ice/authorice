FROM node:erbium-alpine

# Set timezone
RUN apk add --no-cache tzdata
ENV TZ Asia/Seoul

# Create app directory
WORKDIR /usr/src/authorice

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# If you are building your code for production
RUN apk add --no-cache --virtual .gyp python3 make g++\
    && npm ci --only=production\
    && apk del .gyp

# Bundle app source
COPY . .

EXPOSE 3000
CMD ["npm", "start"]
