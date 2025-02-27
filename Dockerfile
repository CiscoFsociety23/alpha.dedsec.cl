FROM node:slim

WORKDIR /alpha.dedsec.cl
RUN apt-get update && apt-get install -y procps openssl
COPY ./package.json /alpha.dedsec.cl/
COPY ./tsconfig.json /alpha.dedsec.cl/
COPY ./tsconfig.build.json /alpha.dedsec.cl/
COPY ./nest-cli.json /alpha.dedsec.cl/
COPY .env /alpha.dedsec.cl/
COPY ./src /alpha.dedsec.cl/
RUN npm install
RUN npm run build
EXPOSE 2400

CMD ["npm", "run", "start:prod"]
