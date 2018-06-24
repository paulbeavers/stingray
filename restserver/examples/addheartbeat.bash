#!/bin/bash

#-------------------------------------------------------------
# Example script to call restserver API
# adminuser
#-------------------------------------------------------------

curl -H "Content-Type: application/json"  \
	-X POST http://localhost:2999/heartbeat \
	-u STINGRAY:stingraypw \
-d  @- <<'EOF'

{  "tenant_name":"New Tenant 2",  
    "user_id":"paul_pbeavers@mac.com", 
    "device_name":"xubuntu.pbeavers.net"  
}

EOF