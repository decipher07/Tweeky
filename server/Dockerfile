FROM node:latest
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

EXPOSE  3001 3001

RUN npm install nodemon -g

CMD [ "nodemon" ]