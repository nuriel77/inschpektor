# Build image
FROM node:10-alpine AS build

RUN apk --no-cache add --update \
        g++ \
        gcc \
        libgcc \
        libstdc++ \
        make \
        python && \
        npm install --quiet node-gyp -g

WORKDIR /build
COPY package*.json ./
RUN npm i -g inschpektor --unsafe-perm && \
    npm prune --production

# Final image
FROM node:10-alpine

ENV PORT=8732 \
    TINI_VERSION=v0.18.0

WORKDIR /app
COPY --from=build /usr/local/lib/node_modules/inschpektor .

ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini-static /usr/bin/tini
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini-static.asc /tmp/tini.asc

RUN apk --no-cache add --update gnupg \
 && gpg --batch --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys 595E85A6B1B4779EA4DAAEC70B588DFF0527A9B7 \
 && gpg --batch --verify /tmp/tini.asc /usr/bin/tini \
 && ln -s backend/server.js inschpektor \
 && chmod +x /usr/bin/tini

ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["/app/inschpektor"]
