FROM node:20-alpine
LABEL maintainer="Karyna Shevchenko" version="1.0"
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
EXPOSE 4001
CMD ["node", "index.js"]
