FROM node:18-alpine

WORKDIR /usr/src/app

COPY package.json package-lock.json* ./
RUN npm ci --silent

COPY . .

# Run tests by default in the container; override CMD to use the app.
CMD ["npm", "test"]
