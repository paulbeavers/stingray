#!/bin/bash

#-------------------------------------------------------------
# Example script to call restserver API
# adminuser
#-------------------------------------------------------------

curl -H "Content-Type: application/json"  \
	-X GET http://localhost:2999/user/STINGRAY \
	-u STINGRAY:pw
