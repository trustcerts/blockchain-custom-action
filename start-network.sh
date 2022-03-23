echo starting network script

if [[ "$NETWORK_SIZE" == "normal" ]]
then
    cd $GITHUB_PATH/network
    sh ./all.sh up -d
    sh ./initNodes.sh
elif [[ "$NETWORK_SIZE" == "small" ]]
then
    cd $GITHUB_PATH/network-small
    sh ./all.sh up -d
    sh ./initNodes.sh
fi