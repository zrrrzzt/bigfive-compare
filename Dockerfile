# Setting the base to nodejs 8.1.4
FROM node:8.11.2-alpine@sha256:fa780aed930805d83a238381edf858855ddb0e9e0c06a9b7b5c382d2f3de9c24

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