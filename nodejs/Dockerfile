FROM node:12-alpine
WORKDIR /nodejs
COPY . .
RUN yarn install --production
CMD ["node", "index.js"]