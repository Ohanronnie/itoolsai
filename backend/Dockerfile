FROM node:alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
COPY wait-for-mongo.sh ./wait-for-mongo.sh
RUN chmod +x ./wait-for-mongo.sh
EXPOSE 3000
CMD ["sh","wait-for-mongo.sh", "npm", "run", "dev"]