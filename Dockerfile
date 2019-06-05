# Setting the base to nodejs 8.1.4
FROM node:8.16.0-alpine@sha256:15ac3cbf6c860d0edf043b05d12500c1e21a6b53ca68298eccb2ada0a81359c6

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