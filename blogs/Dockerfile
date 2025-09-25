FROM node:24
WORKDIR /app
COPY package*.json ./
RUN npm install -g typescript && npm install
COPY . .
EXPOSE 3000

