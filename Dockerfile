FROM node:erbium-alpine

# Set timezone
RUN apk add --no-cache tzdata
ENV TZ Asia/Seoul

# Create app directory
WORKDIR /usr/src/authorice

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# RUN npm install
# If you are building your code for production
RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 3000
CMD ["npm", "start"]
