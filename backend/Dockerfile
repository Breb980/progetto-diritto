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
ENV PORT=5000
EXPOSE $PORT

# start command (npm run start)
CMD ["npm", "run", "start"]