FROM node:alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
COPY wait-for-mongo.sh ./wait-for-mongo.sh
RUN chmod +x ./wait-for-mongo.sh
EXPOSE 4000
CMD ["npm", "run", "dev"]