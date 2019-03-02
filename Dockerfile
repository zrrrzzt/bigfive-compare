# Setting the base to nodejs 8.1.4
FROM node:8.15.1-alpine@sha256:32e73aad77719468ac82097642fde0f4747258a386f48e9bad25c91546d8e37d

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