#!/bin/bash

#-------------------------------------------------------------
# Example script to call restserver API
# adminuser
#-------------------------------------------------------------

curl -H "Content-Type: application/json"  \
	-X POST http://localhost:2999/user \
	-u paul:pw \
-d  @- <<'EOF'
{  "tenant_name":"Tenant 3",  
    "user_id":"paul", 
    "password":"pw",  
    "role":"ADMIN" 
}

EOF
