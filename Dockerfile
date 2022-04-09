FROM node:14.19.1

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY . .

EXPOSE 80

VOLUME ["app/src"]

COPY ./.env ./.env

ENTRYPOINT ["npm", "run", "dev"]
