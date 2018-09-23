#!/bin/bash

#-------------------------------------------------------------
# Example script to call restserver API
# adminuser
#-------------------------------------------------------------

curl -H "Content-Type: application/json"  \
	-X POST http://localhost:2999/user \
	-u STINGRAY:mypw \
-d  @- <<'EOF'

{  "tenant_name":"MASTER",  
    "user_id":"STINGRAY", 
    "password":"pw",  
    "role":"SUPERADMIN" 
}

EOF
