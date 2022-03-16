if [[ "$NETWORK_SIZE" == "normal" ]]
then
    cd ./network
    sh ./all.sh up -d
    sh ./initNodes.sh
elif [[ "$NETWORK_SIZE" == "small" ]]
then
    cd ./network-small
    sh ./all.sh up -d
    sh ./initNodes.sh
fi