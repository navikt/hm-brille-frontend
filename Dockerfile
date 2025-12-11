FROM node:lts-alpine AS node
ENV HUSKY=0
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN --mount=type=secret,id=NODE_AUTH_TOKEN \
    pnpm config set //npm.pkg.github.com/:_authToken=$(cat /run/secrets/NODE_AUTH_TOKEN)
RUN pnpm config set @navikt:registry=https://npm.pkg.github.com

# build client
FROM node AS client-builder
WORKDIR /app
COPY client/package.json client/pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY client .
RUN pnpm run build

# build server
FROM golang:1.25.1-alpine AS server-builder
WORKDIR /app
COPY server ./
RUN go build .

# runtime
FROM gcr.io/distroless/static-debian12 AS runtime
WORKDIR /app

ENV TZ="Europe/Oslo"
EXPOSE 5000

COPY --from=client-builder /app/dist ./dist
COPY --from=server-builder /app/hm-brille-frontend .

CMD [ "./hm-brille-frontend" ]
