FROM node:21

WORKDIR /app

# RUN apt update

# RUN apt install -y ffmpeg

COPY package.json /app/

RUN npm install

RUN npm install @ffmpeg-installer/linux-arm64 --force

EXPOSE 8000