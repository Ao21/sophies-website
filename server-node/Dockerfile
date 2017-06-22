# create a file named Dockerfile
FROM node:latest
RUN mkdir /src
WORKDIR /src

ADD package.json ./
RUN npm install
COPY ./src /src
EXPOSE 3000
CMD ["npm","run","debug"]