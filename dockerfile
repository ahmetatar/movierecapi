FROM node
MAINTAINER "Ahmet Atar <ahhmetatar@gmail.com>"

ENV PORT=1453
ENV NODE_ENV="production"
ENV DB_URL="mongodb://db:27017/moviedb"

COPY package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /app && cp -a /tmp/node_modules /app/

WORKDIR /app
COPY . /app/

EXPOSE 1453

CMD ["node", "index.js"]