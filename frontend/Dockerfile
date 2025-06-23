FROM node:alpine
WORKDIR /app
COPY ./package.json ./package-lock.json ./
RUN npm install

COPY . .
RUN npm build

EXPOSE 3000
CMD ["npm", "start"]