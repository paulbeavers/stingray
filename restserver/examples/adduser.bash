#!/bin/bash

#-------------------------------------------------------------
# Example script to call restserver API
# adminuser
#-------------------------------------------------------------

curl -H "Content-Type: application/json"  \
	-X POST http://localhost:2999/user \
	-u STINGRAY:mypw \
-d  @- <<'EOF'

{  "tenant_name":"New Tenant 3",  
    "user_id":"paul_beavers@mac.com", 
    "password":"pw3",  
    "role":"TENANTADMIN" 
}

EOF
