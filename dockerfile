FROM node
MAINTAINER "Ahmet Atar <ahhmetatar@gmail.com>"

COPY package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /app && cp -a /tmp/node_modules /app/

WORKDIR /app
COPY . /app/

EXPOSE 1453

CMD ["node", "index.js"]