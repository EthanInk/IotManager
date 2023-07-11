#!/bin/sh
echo "auth_opt_http_host $BACKEND_DOMAIN" >> /mosquitto/etc/conf.d/go-auth.conf
echo "auth_opt_http_port $BACKEND_PORT" >> /mosquitto/etc/conf.d/go-auth.conf
# Rest of your startup script
/usr/sbin/mosquitto -c /etc/mosquitto/mosquitto.conf