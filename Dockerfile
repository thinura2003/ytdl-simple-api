FROM node:current-alpine
WORKDIR /app
COPY ./ /app
RUN npm install && npm cache clean --force
ENV PORT 80
EXPOSE 80
CMD [ "npm", "start" ]