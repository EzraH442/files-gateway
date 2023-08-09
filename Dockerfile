FROM node:alpine

ARG b2bucketSourceId
ARG b2AppKey
ARG b2AppKeyId
ARG authUrl

ENV ENV=prod
ENV authUrl=${authUrl}
ENV b2bucketSourceId=${b2bucketSourceId}
ENV b2AppKey=${b2AppKey}
ENV b2AppKeyId=${b2AppKeyId}

WORKDIR /app
COPY ./package*.json ./
RUN npm install
RUN npm install pm2 -g
COPY ./ ./

RUN npm run build
EXPOSE 3010
CMD [ "pm2-runtime", "./build/app.js" ]
