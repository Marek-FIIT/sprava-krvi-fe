FROM node:20.11.0 AS build

RUN mkdir /build
WORKDIR /build

COPY package.json .
RUN npm install

COPY . .
RUN npm run build


FROM milung/spa-server as spa-build

COPY --from=build /build/www public
RUN ./build.sh


FROM scratch
ENV CSP_HEADER=false

COPY --from=spa-build /app/server /server
CMD ["/server"]
EXPOSE 8080
