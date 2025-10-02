# docker image
FROM node:18-alpine

# create app directory
WORKDIR /app

# copy packege.json and install dependencies
COPY package*.json ./
RUN npm install

# copy the frontend in docker image
COPY . .

# expose port 5000
EXPOSE 5000

# start command (npm run start)
CMD ["npm", "run", "start"]