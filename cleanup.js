const { existsSync , rmSync , mkdirSync , readdirSync} = require('fs');
const { getInput } = require('@actions/core');
const { create } = require('@actions/artifact');
const { run } = require('./shared');



const main = async () => {
    const log_format = getInput('log_format');
    const containers_names = await run("docker ps -a --format '{{.Names}}'");

    // check if folder docker_logs exists if not create one if yes then clean it
    const dir = `${__dirname}/docker_logs`;
    if(existsSync(dir)){
        rmSync(dir, { recursive: true, force: true });
    };
    mkdirSync(dir);
    containers_names.forEach(async (name)=> {
        await run(`docker logs ${name} > ${__dirname}/docker_logs/${name}.${log_format}`)
    });

    const artifactClient = create()
    const artifactName = `docker-logs${Math.floor(Math.random()*1000000)}`;
    const path = `${__dirname}/docker_logs`;
    const files = readdirSync(path).map((file) => `${path}/${file}`);
    const options = {
        continueOnError: true
    };
    await artifactClient.uploadArtifact(artifactName, files, path, options);

}

main();