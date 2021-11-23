let dockerFile = `FROM node

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]
`

function dockerComposeFile(port, needsMongo) {
    let composeWithMongo = `version: "3.5"
services:
  standard-server:
    container_name: standard-server
    restart: always
    networks: 
      - standard-network
    build: .
    ports:
    - "${port}:${port}"
  standard-mongo:
    container_name: message_DB
    networks: 
      - standard-network
    image: mongo
    ports:
      - "27017:27017"

networks:
  standard-network:
    name: standard-network
    `
    let composeWithoutMongo = `version: "3.5"
services:
  standard-server:
    container_name: standard-server
    restart: always
    networks: 
      - standard-network
    build: .
    ports:
    - "${port}:${port}"
    `
    return needsMongo ? composeWithMongo : composeWithoutMongo
}

module.exports = {
    dockerFile,
    dockerComposeFile
}