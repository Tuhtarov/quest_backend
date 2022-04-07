FROM node:14.19.1

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY . .

EXPOSE 8001:80

VOLUME ["/app/src", "/app/config"]

CMD ["npm", "run", "dev"]
