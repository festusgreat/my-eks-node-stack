#fresh pipeline trigger
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

RUN apk update && apk upgrade --no-cache

# Copy lockfiles over first
COPY package*.json ./

# Clean cache and install production-only dependencies using the modern flag
RUN npm cache clean --force && npm install --omit=dev

# Copy the rest of your application code
COPY . .

EXPOSE 3000

CMD ["node", "app.js"]

