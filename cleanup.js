const { existsSync , rmSync , mkdirSync , readdirSync} = require('fs');
const artifact = require('@actions/artifact');
const { run } = require('./shared');



const main = async () => {
    const containers_names = await run("docker ps --format '{{.Names}}'");

    // check if folder docker-logs exists if not create one if yes then clean it
    const dir = `${__dirname}/docker-logs`;
    if(existsSync(dir)){
        rmSync(dir, { recursive: true, force: true });
    };
    mkdirSync(dir);
    containers_names.forEach(async (name)=> {
        await run(`docker logs ${name} > docker-logs/${name}.$LOG_FORMAT`)
    });

    const artifactClient = artifact.create()
    const artifactName = 'docker-logs';
    const path = `${__dirname}/docker-logs`
    const files = readdirSync(path)
    const options = {
        continueOnError: true
    }

    const uploadResult = await artifactClient.uploadArtifact(artifactName, files, path, options)

}

main();