# Runner
FROM nginx:1.23-alpine AS runner
COPY ./lib /usr/share/nginx/html/lib
COPY ./index.html /usr/share/nginx/html/index.html
COPY ./k8s/nginx.conf /etc/nginx/conf.d/default.conf

RUN apk update
RUN apk upgrade

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
