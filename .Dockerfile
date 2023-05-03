FROM node:18.16-alpine3.17 AS builder

WORKDIR /home/app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn run build

FROM node:18.16-alpine3.17

ARG PORT=3000

ENV PORT=${PORT}

WORKDIR /home/app

COPY package.json yarn.lock ./

RUN yarn install --prod --frozen-lockfile

COPY --from=builder /home/app/dist ./dist

CMD ["node", "dist/main"]

EXPOSE ${PORT}
