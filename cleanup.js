const { existsSync , rmSync , mkdirSync , readdirSync} = require('fs');
const { create } = require('@actions/artifact');
const { run } = require('./shared');



const main = async () => {
    const containers_names = await run("docker ps --format '{{.Names}}'");

    // check if folder docker_logs exists if not create one if yes then clean it
    const dir = `${__dirname}/docker_logs`;
    if(existsSync(dir)){
        rmSync(dir, { recursive: true, force: true });
    };
    mkdirSync(dir);
    containers_names.forEach(async (name)=> {
        await run(`docker logs ${name} > docker_logs/${name}.$LOG_FORMAT`)
    });

    const artifactClient = create()
    const artifactName = 'docker_logs';
    const path = `${__dirname}/docker_logs`
    const files = readdirSync(path)
    const options = {
        continueOnError: true
    }

    await artifactClient.uploadArtifact(artifactName, files, path, options)

}

main();