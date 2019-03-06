FROM php:7-fpm
RUN apt-get update && apt-get -y install wget bsdtar libaio1 && \
 wget -qO- https://raw.githubusercontent.com/caffeinalab/php-fpm-oci8/master/oracle/instantclient-basic-linux.x64-12.2.0.1.0.zip | bsdtar -xvf- -C /usr/local && \
 wget -qO- https://raw.githubusercontent.com/caffeinalab/php-fpm-oci8/master/oracle/instantclient-sdk-linux.x64-12.2.0.1.0.zip | bsdtar -xvf-  -C /usr/local && \
 wget -qO- https://raw.githubusercontent.com/caffeinalab/php-fpm-oci8/master/oracle/instantclient-sqlplus-linux.x64-12.2.0.1.0.zip | bsdtar -xvf- -C /usr/local && \
 ln -s /usr/local/instantclient_12_2 /usr/local/instantclient && \
 ln -s /usr/local/instantclient/libclntsh.so.* /usr/local/instantclient/libclntsh.so && \
 ln -s /usr/local/instantclient/lib* /usr/lib && \
 ln -s /usr/local/instantclient/sqlplus /usr/bin/sqlplus && \
 docker-php-ext-configure oci8 --with-oci8=instantclient,/usr/local/instantclient && \
 docker-php-ext-install oci8 && \
 rm -rf /var/lib/apt/lists/* && \
 php -v

RUN wget -O php-7.3.2.tar.gz http://us1.php.net/get/php-7.3.2.tar.gz/from/this/mirror && \
    mkdir /php_oci && \
    mv php-7.3.2.tar.gz /php_oci
WORKDIR /php_oci
RUN tar xfz php-7.3.2.tar.gz
WORKDIR /php_oci/php-7.3.2/ext/pdo_oci
RUN phpize && \
    ./configure --with-pdo-oci=instantclient,/usr/local/instantclient,12.1 && \
    make && \
    make install && \
    echo extension=pdo_oci.so > /usr/local/etc/php/conf.d/pdo_oci.ini && \
    php -v && \
    php -m

RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini" && \
    sed -i "s/;cgi.fix_pathinfo=1/cgi.fix_pathinfo=0/" "$PHP_INI_DIR/php.ini"
