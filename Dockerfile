FROM node:16
WORKDIR /usr/src/app

COPY . .

# install client dependencies and build it
WORKDIR /usr/src/app/client
RUN npm ci
RUN npm run build

# install server dependencies
WORKDIR /usr/src/app
RUN npm ci

COPY . .

ENV PORT=80
CMD ["npm", "start"]