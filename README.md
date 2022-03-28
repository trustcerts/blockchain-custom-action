# TrustCerts Blockchain Custom Action
<b>The main aim of this action to help our repo to create a custom test blockchain



# Valid inputs 
<b>if nothing were given then the value will be the default value

## did_id:
    description: the id of the client
    default: did:trust:tc:test:id:XLzBJ69tqEgq7oqqCLiEnT

##  network_size:
    description: choose the network size either small or normal
    default: "small"

##  client_name:
    description: name of the client
    default: "client"

##  client_secret:
    description: secret of the client
    default: "client"

##  log_format:
    description: log format of docker containers logs
    default: "log"



# Example of how it works
```
- name: TrustCerts Custom Blockchain
  uses: trustcerts/blockchain-custom-action@main
  with:
    did_id: did:trust:tc:dev:id:XLzBJ69tqEgq7oqqCLiEnT
    network_size: normal
    client_name: dev
    client_secret: dev
    log_format: json
```