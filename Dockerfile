FROM nginx:alpine
COPY ./public /var/www/html
COPY deploy/default.conf /etc/nginx/conf.d/default.conf
COPY deploy/nginx.conf /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]
