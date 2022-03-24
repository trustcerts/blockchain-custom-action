const { spawn } = require('child_process');

let getData;
async function run(cmd) {
    const ls = spawn(cmd, { shell: true });
    return new Promise((resolve) => {
      // noinspection JSUnresolvedFunction
      ls.stdout.on('data', (data) => {
        console.log(data.toString());
        getData = data ? data.toString().split('\n'): []
      });
  
      // noinspection JSUnresolvedFunction
      ls.stderr.on('data', (data) => {
        console.warn(data.toString());
      });
  
      ls.on('error', (error) => {
        core.setFailed(error.message);
      });
  
      ls.on('close', () => {
        if(getData) { 
          resolve(getData.filter(item => item != ''));
        }
        resolve()
      });
    });
  };


  module.exports.run = run;