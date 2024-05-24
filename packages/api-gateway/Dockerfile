# It uses Node.js version 21 on the Alpine Linux 3.18 distribution
FROM node:21-alpine3.18 as builder
# create the directory
WORKDIR /app
# copy package from host machine
COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src
# Installs the latest version of npm globally in the containe
RUN npm install -g npm@latest\
# Installs dependencies based on the package-lock.json file.
RUN npm ci && npm run build

FROM node:21-alpine3.18

WORKDIR /app
# Uses Alpine's package manager apk to install curl without cache to keep the image small
RUN apk add --no-cache curl
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install -g pm2 npm@latest
# Installs only the production dependencies based on the package-lock.json file
RUN npm ci --production
# Copies the build directory from the builder stage to the /app/build directory in this final stage
COPY --from=builder /app/build ./build
# Informs Docker that the container will listen on port 3000 at runtime.
EXPOSE 3000
# Specifies the command to run when the container starts.
CMD [ "npm", "run", "start:dev" ]