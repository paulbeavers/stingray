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

#---------------------------------------------------------------------
# Check for the DATA_DIR, create if it does not exist
#---------------------------------------------------------------------
echo "DATA_DIR=$DATA_DIR"
if [ ! -d "$DATA_DIR" ] ; then
	echo "$DATA_DIR does not exist. Attempting to create."
	mkdir $DATA_DIR
fi

#---------------------------------------------------------------------
# Start the server
#---------------------------------------------------------------------
cd ../app
node ./index.js


