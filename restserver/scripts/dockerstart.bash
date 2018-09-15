#!/bin/bash

#---------------------------------------------------------------------
# startup script for restserver
#---------------------------------------------------------------------

#---------------------------------------------------------------------
# Load configuration
#---------------------------------------------------------------------
export PORT=2999
export SERVER_HOME=/opt/stingray/restserver
export DATA_DIR="$SERVER_HOME/data"
export DB_STRING=postgres://stingray_user:stingraypw@192.168.166.183:5432/stingraydb
export DB_HOSTNAME=192.168.166.183
export DB_PORT=5432
export DB_USER=stingray_user
export DB_PASSWORD=stingraypw
export DB_DATABASE=stingraydb
export LOG_DIR="$SERVER_HOME/log"
export LOG_LEVEL="info"


/usr/sbin/sshd -D &

#---------------------------------------------------------------------
# Start the server
#---------------------------------------------------------------------
cd /opt/stingray/restserver/app
node ./index.js


