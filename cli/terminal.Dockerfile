FROM ubuntu:xenial
WORKDIR /app
RUN apt-get update
RUN apt-get -y install curl gnupg git
RUN curl -sL https://deb.nodesource.com/setup_16.x  | bash -
RUN apt-get -y install nodejs
RUN npm install --global yarn
ENTRYPOINT /bin/bash