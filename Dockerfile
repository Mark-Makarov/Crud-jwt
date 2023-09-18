FROM node:20

WORKDIR .

COPY package.json yarn.lock ./


RUN yarn install --production

COPY . .

EXPOSE 8080:8080

CMD yarn start
