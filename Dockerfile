FROM nginx:alpine

WORKDIR /usr/share/nginx/html
COPY game/* ./

EXPOSE 80 

CMD ["nginx", "-g", "daemon off;"]