FROM node:18.18.1-alpine3.18

WORKDIR /

COPY . .

WORKDIR /

RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]
