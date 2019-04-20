# Setting the base to nodejs 8.1.4
FROM node:8.16.0-alpine@sha256:c9a6d98f2191a74fd1a46b1f99f0be1d555ec26b52643ec0788457b9b17d5cc2

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