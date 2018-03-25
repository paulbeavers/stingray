#!/bin/bash

#---------------------------------------------------------------------
# startup script for restserver
#---------------------------------------------------------------------

#---------------------------------------------------------------------
# Load configuration
#---------------------------------------------------------------------
export PORT=2999
export SERVER_HOME=/home/pbeavers/stingray/restserver
export DATA_DIR="$SERVER_HOME/data"
export DB_STRING=postgres://stingray_user:stingraypw@localhost:5432/stingraydb
export DB_HOSTNAME=localhost
export DB_PORT=5432
export DB_USER=stingray_user
export DB_PASSWORD=stingraypw
export DB_DATABASE=stingraydb

#---------------------------------------------------------------------
# Start the server
#---------------------------------------------------------------------
cd ../app
node ./index.js


