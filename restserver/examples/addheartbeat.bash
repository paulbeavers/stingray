#!/bin/bash

#-------------------------------------------------------------
# Example script to call restserver API
# adminuser
#-------------------------------------------------------------

curl -H "Content-Type: application/json"  \
	-X POST http://localhost:2998/heartbeat \
	-u paul_beavers@mac.com:pw3 \
-d  @- <<'EOF'

{  "tenant_name":"New Tenant 3",  
    "user_id":"beavers@mac.com", 
    "message_text":"goodbye cruel world", 
    "device_name":"restserver.pbeavers.net"  
}

EOF
