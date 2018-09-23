#!/bin/bash

#-------------------------------------------------------------
# Example script to call restserver API
# adminuser
#-------------------------------------------------------------

curl -H "Content-Type: application/json"  \
	-X POST http://localhost:2999/user \
	-u STINGRAY:pw \
-d  @- <<'EOF'

{  "tenant_name":"New Tenant 2",  
    "user_id":"paulbeavers@sandsol.com", 
    "password":"pw3",  
    "role":"TENANTADMIN" 
}

EOF
