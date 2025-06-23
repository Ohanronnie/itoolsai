FROM node:alpine
WORKDIR /app
COPY ./package.json ./package-lock.json ./
RUN npm install
ENV NEXT_PUBLIC_BACKEND_URL="https://api.itoolsai.com"
COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]