#!/bin/bash

#-------------------------------------------------------------
# Example script to call restserver API
# adminuser
#-------------------------------------------------------------

curl -H "Content-Type: application/json" -X POST http://localhost:2999/adminuser \
-d  @- <<'EOF'

{  "tenant":"Tenant 3",  
    "adminuser":"paul", 
    "password":"pw",  
    "currentadminuser":"paul", 
    "currentpassword":"pw" 
}

EOF
