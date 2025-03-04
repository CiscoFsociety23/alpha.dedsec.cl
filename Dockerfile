FROM node:slim

WORKDIR /alpha.dedsec.cl
RUN apt-get update && apt-get install -y procps openssl
COPY ./package.json /alpha.dedsec.cl/
COPY ./dist/ /alpha.dedsec.cl/dist/
RUN npm install
EXPOSE 2400

CMD ["npm", "run", "start:prod"]
