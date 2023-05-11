# base node image
FROM node:18-bullseye-slim as base

# set for base and all layer that inherit from it
ENV NODE_ENV production

# Install fuse3 and ca-certificates for litefs on fly.io
RUN apt-get update && apt-get install -y fuse3 ca-certificates

# Install all node_modules, including dev dependencies
FROM base as deps

WORKDIR /myapp

ADD package.json package-lock.json ./
RUN npm install --production=false

# Setup production node_modules
FROM base as production-deps

WORKDIR /myapp

COPY --from=deps /myapp/node_modules /myapp/node_modules
ADD package.json package-lock.json ./
RUN npm prune --production

# Build the app
FROM base as build

WORKDIR /myapp

COPY --from=deps /myapp/node_modules /myapp/node_modules

ADD . .
RUN npm run build

# Finally, build the production image with minimal footprint
FROM base

WORKDIR /myapp

ENV FLY "true"
ENV LITEFS_DIR "/data"
# ENV INTERNAL_PORT "8080"
# ENV PORT "8081"
ENV PORT "8080"
ENV CACHE_DATABASE_FILENAME "cache.db"
ENV CACHE_DATABASE_PATH "/$LITEFS_DIR/$CACHE_DATABASE_FILENAME"

COPY --from=production-deps /myapp/node_modules /myapp/node_modules
COPY --from=production-deps /myapp/node_modules /myapp/node_modules

COPY --from=build /myapp/build /myapp/build
COPY --from=build /myapp/public /myapp/public

ADD . .


# prepare for litefs
COPY --from=flyio/litefs:sha-9ff02a3 /usr/local/bin/litefs /usr/local/bin/litefs
ADD other/litefs.yml /etc/litefs.yml
RUN mkdir -p /data ${LITEFS_DIR}

#CMD ["litefs", "mount", "--", "npm", "start"]
CMD ["npm", "start"]