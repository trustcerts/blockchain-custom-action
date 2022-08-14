echo "reset"
for HOST in localhost:4501 localhost:4511 localhost:4541 localhost:4561 ; do
    until $(curl --output /dev/null --silent --head --fail "http://$HOST"); do
    printf "$HOST is not there yet\n"
    sleep 5
    done
    curl -X POST "http://$HOST/reset" -H "accept: */*" -H "Authorization: Bearer test" -d ""
done

echo "create the root cert"
curl -X POST "http://localhost:4501/did/genesis" -H "accept: */*" -H "Authorization: Bearer test" -H "Content-Type: application/json" -d "[\"testing-validator1_network_1:3000\",\"testing-validator2_network_1:3000\"]"

echo "invite gateway"
curl -X POST "http://localhost:4501/did/invite" -H "accept: */*" -H "Authorization: Bearer test" -H "Content-Type: application/json" -d "{\"id\":\"did:trust:tc:test:id:4GqRUNp2wRgnHAPUZb8X9X\",\"name\":\"Gateway1\",\"secret\":\"foobar\",\"role\":\"Gateway\"}"
echo "invite observer" &
curl -X POST "http://localhost:4501/did/invite" -H "accept: */*" -H "Authorization: Bearer test" -H "Content-Type: application/json" -d "{\"id\":\"did:trust:tc:test:id:FDPrCrhPCnVPgSyWEfQyJj\",\"name\":\"Observer1\",\"secret\":\"foobar\",\"role\":\"Observer\"}"
echo "add gateway" &
curl -X POST "http://localhost:4541/init" -H "accept: */*" -H "Authorization: Bearer test" -H "Content-Type: application/json" -d "{\"id\":\"did:trust:tc:test:id:4GqRUNp2wRgnHAPUZb8X9X\",\"secret\":\"foobar\",\"endpoint\":\"testing-validator1_http_1:3000\"}"
echo "add observer" &
curl -X POST "http://localhost:4561/init" -H "accept: */*" -H "Authorization: Bearer test" -H "Content-Type: application/json" -d "{\"id\":\"did:trust:tc:test:id:FDPrCrhPCnVPgSyWEfQyJj\",\"secret\":\"foobar\",\"endpoint\":\"testing-validator1_http_1:3000\"}"
echo "add client" &
curl -X POST "http://localhost:4541/did/invite" -H "accept: */*" -H "Authorization: Bearer test" -H "Content-Type: application/json" -d "{\"id\":\"$DID_ID\",\"name\":\"$CLIENT_NAME\",\"secret\":\"$CLIENT_SECRET\",\"role\":\"Client\"}" &
exit