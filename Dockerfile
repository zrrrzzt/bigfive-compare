# Setting the base to nodejs 8.1.4
FROM node:8.1.4-alpine@sha256:b9d990b3e7de4c6d1bd5b77ebab0392bade033db06efae68fc15ae68b6a4bb24

# Maintainer
MAINTAINER Geir Gåsodden

#### Begin setup ####

# Installs git
RUN apk add --update --no-cache git

# Bundle app source
COPY . /src

# Change working directory
WORKDIR "/src"

# Install dependencies
RUN npm install --production

# Expose 3000
EXPOSE 3000

# Startup
ENTRYPOINT npm start