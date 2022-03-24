const { getInput, setFailed } = require('@actions/core');
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
      const log_format = getInput('log_format');
        
      // export variables
      await run(`export DID_ID=${did_id}`);
      await run(`export NETWORK_SIZE=${network_size}`);
      await run(`export CLIENT_NAME=${client_name}`);
      await run(`export CLIENT_SECRET=${client_secret}`);
      await run(`export LOG_FORMAT=${log_format}`);
      await run(`export NODE_PATH=${__dirname}/nodes`);
      await run(`export GITHUB_PATH=${__dirname}`);

      // give permission to bash file
      await run(`chmod 777 ${__dirname}/start-network.sh`)
      //start bash file
      await run(`bash ${__dirname}/start-network.sh`)
        
    } catch(err) {
        setFailed(error.message);
    }
}


main();
