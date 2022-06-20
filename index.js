const { getInput, setFailed, ExitCode } = require('@actions/core');
const { run } = require('./shared');

const main = async () => {
  try {
    /**
     * We need to fetch all the inputs that were provided to our action
     * and store them in variables for us to use.
     **/
    const did_id = getInput('did_id');
    const network_size = getInput('network_size');
    const client_name = getInput('client_name');
    const client_secret = getInput('client_secret');
    const image_tag = getInput('image_tag');


    //start bash file
    await run(`NODE_PATH=${__dirname}/nodes\
      NETWORK_SIZE=${network_size}\
      DID_ID=${did_id}\
      CLIENT_NAME=${client_name}\
      CLIENT_SECRET=${client_secret}\
      IMAGE_TAG=${image_tag}\
      GITHUB_PATH=${__dirname}\
      bash ${__dirname}/start-network.sh`)

  } catch (err) {
    setFailed(err.message);
  }
}


main();
