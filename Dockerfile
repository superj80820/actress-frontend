FROM node:10.11.0-alpine AS build-env
WORKDIR /messfar-frontend
ADD ./build /messfar-frontend/build
# RUN npm run build

FROM httpd:2.4
COPY --from=build-env /messfar-frontend/build /usr/local/apache2/htdocs/