FROM node:alpine

ARG bucketSourceId
ARG b2AppKey
ARG b2AppKeyId

ENV ENV=prod
ENV bucketSourceId=${bucketSourceId}
ENV b2AppKey=${b2AppKeyId}
ENV b2AppKeyId=${b2AppKeyId]}

WORKDIR /app
COPY ./package*.json ./
RUN npm install
RUN npm install pm2 -g
COPY ./ ./

RUN npm run build
EXPOSE 3010
CMD [ "pm2-runtime", "./build/app.js" ]
