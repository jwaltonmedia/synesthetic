FROM node:latest

RUN apt-get update
RUN apt-get install -y apt-utils
RUN apt-get install -y lsof
RUN apt-get install -y nano
RUN apt-get install -y gstreamer1.0-tools

RUN mkdir /src

COPY ./src/package.json /src
WORKDIR /src
RUN npm install
COPY ./src /src

EXPOSE 3333
CMD ["npm", "start"]
