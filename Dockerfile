FROM node:7
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD node server/index.js node server/elasticsearch.js
EXPOSE 3000
