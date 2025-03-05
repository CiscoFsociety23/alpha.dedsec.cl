FROM node:slim
WORKDIR /alpha.dedsec.cl
RUN apt-get update && apt-get install -y procps openssl
COPY ./package.json .
COPY ./dist ./dist
COPY ./.env .
COPY ./prisma .
RUN npm install
RUN npx prisma generate
EXPOSE 2400
CMD ["npm", "run", "start:prod"]
