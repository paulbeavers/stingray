#!/bin/bash

#-------------------------------------------------------------
# Example script to call restserver API
# adminuser
#-------------------------------------------------------------

curl -H "Content-Type: application/json"  \
	-X POST http://localhost:2998/user \
	-u STINGRAY:pw \
-d  @- <<'EOF'

{  "tenant_name":"MASTER",  
    "user_id":"STINGRAY", 
    "password":"pw",  
    "role":"SUPERADMIN" 
}

EOF
