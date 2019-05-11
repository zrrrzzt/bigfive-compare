# Setting the base to nodejs 8.1.4
FROM node:8.16.0-alpine@sha256:2d6ffd6ee67dcee6a6595805c903f411afdec773f935539b0752579818273eb8

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