FROM node:12-alpine
COPY . .
RUN yarn install --production
CMD ["echo", "asdskdjkjik"]
