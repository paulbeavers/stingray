#!/bin/bash

#-------------------------------------------------------------
# Example script to call restserver API
# adminuser
#-------------------------------------------------------------

curl -H "Content-Type: application/json"  \
	-X GET http://localhost:2999/users \
	-u STINGRAY:pw
