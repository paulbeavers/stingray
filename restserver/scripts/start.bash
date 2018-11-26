#!/bin/bash

#---------------------------------------------------------------------
# startup script for restserver
#---------------------------------------------------------------------

#---------------------------------------------------------------------
# Load configuration
#---------------------------------------------------------------------
source $HOSTNAME.conf

echo PORT=$PORT
echo SERVER_HOME=$SERVER_HOME
echo DATA_DIR=$DATA_DIR
echo DB_STRING=$DB_STRING
echo DB_HOSTNAME=$DB_HOSTNAME
echo DB_PORT=$DB_PORT
echo DB_USER=$DB_USER
echo DB_PASSWORD=$DB_PASSWORD
echo DB_DATABASE=$DB_DATABASE
echo LOG_DIR=$LOG_DIR
echo LOG_LEVEL=$LOG_LEVEL

#---------------------------------------------------------------------
# Start the server
#---------------------------------------------------------------------
cd ../app
node ./index.js


