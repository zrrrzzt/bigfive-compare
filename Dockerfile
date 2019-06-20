# Setting the base to nodejs 8.1.4
FROM node:8.16.0-alpine@sha256:f457c62e5dabdd52bab39f2f2b426e32dbd7345d7c23059b53e0efa1a1826092

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