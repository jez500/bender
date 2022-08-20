# build stage
FROM node:lts-alpine as build-stage

WORKDIR /app

COPY package*.json ./
RUN npm install --frozen-lockfile

COPY . .
RUN npm run build

# production stage
FROM node:lts-alpine

ENV GID 1000
ENV UID 1000
ENV PORT 8080
ENV INIT_ASSETS 1

WORKDIR /app

COPY --from=build-stage --chown=${UID}:${GID} /app /app
COPY --from=build-stage --chown=${UID}:${GID} /app/static /app/static-default

HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:${PORT}/ || exit 1

EXPOSE ${PORT}
VOLUME /app/static/

ENTRYPOINT ["/bin/sh", "/app/entrypoint.sh"]
