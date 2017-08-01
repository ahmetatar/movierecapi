FROM node
EXPOSE 1453
EXPOSE 5858
WORKDIR /usr/app/
COPY ./package.json /usr/app/
RUN npm install
COPY . /usr/app/
CMD ["npm", "start"]