const { spawn } = require('child_process');

let getData;
async function run(cmd) {
    const ls = spawn(cmd, { shell: true });
    return new Promise((resolve) => {
      // noinspection JSUnresolvedFunction
      ls.stdout.on('data', (data) => {
        console.log(data.toString());
        getData = data.toString().split('\n')
      });
  
      // noinspection JSUnresolvedFunction
      ls.stderr.on('data', (data) => {
        console.warn(data.toString());
      });
  
      ls.on('error', (error) => {
        core.setFailed(error.message);
      });
  
      ls.on('close', () => {
        resolve(getData.filter(item => item != ''));
      });
    });
  };


  module.exports.run = run;