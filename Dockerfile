# Set the base image
FROM node:lts-alpine3.9 as dependencies
# Define working directory
WORKDIR /var/www/app

# Install node_modules with yarn
ADD package.json /tmp/

RUN cd /tmp && yarn --pure-lockfile
RUN mkdir -p /var/www/app && cd /var/www/app && ln -s /tmp/node_modules

FROM dependencies as final
# Copy app
COPY . /var/www/app
# Expose port
EXPOSE 3000
# Run app
RUN yarn build
RUN cp .env.development .env

RUN node scripts/integration/full-marketplace.js
RUN node scripts/integration/marketplace.js
RUN node scripts/integration/twilio-video.js

ENTRYPOINT ["yarn","run", "dev"]