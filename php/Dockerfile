FROM php:7.2-fpm

RUN apt-get update && apt-get install -y libpng-dev libgd3 libgd-tools  libxml2 libxml2-dev && docker-php-ext-install pdo_mysql  mysqli gd
