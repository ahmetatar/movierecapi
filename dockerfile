FROM node:8.4
LABEL Author="Ahmet Atar <ahhmetatar@gmail.com>"

ENV NODE_ENV=production
ENV DEBUG=app

ADD https://github.com/Yelp/dumb-init/releases/download/v1.2.0/dumb-init_1.2.0_amd64 /usr/local/bin/dumb-init
RUN chmod +x usr/local/bin/dumb-init

COPY package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /app && cp -a /tmp/node_modules /app/

WORKDIR /app
COPY . /app/

EXPOSE 1453

CMD ["dumb-init", "node", "index.js"]