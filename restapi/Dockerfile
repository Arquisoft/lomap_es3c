FROM node:18.13.0
LABEL org.opencontainers.image.source https://github.com/Arquisoft/lomap_es3c
COPY . /app
WORKDIR /app
#Install the dependencies
RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]