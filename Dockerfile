FROM node:16-alpine as build
USER node
WORKDIR /app/
COPY ./ /app/
# production environment
FROM nginx:1.17
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
