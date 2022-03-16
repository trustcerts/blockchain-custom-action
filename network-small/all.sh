docker network inspect test-network >/dev/null 2>&1 || \
    docker network create test-network

for id in validator1 validator2 gateway1 observer1
do
    ./$id.sh $@
done