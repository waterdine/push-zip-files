
const core = require('@actions/core');
const github = require('@actions/github');

try {
  const repo = core.getInput('repo');
  const { exec, spawn } = require('child_process');
  
  if (repo.includes('\'') || repo.includes('"'))
  {
     core.setFailed("Invalid characters in string");
  }
  
  exec('"C:\\Program Files\\Git\\cmd\\git.exe" -C "' + repo + '" add *.zip', (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    if (err) {
      core.setFailed(err);
      return;
    }
  });
  
  exec('"C:\\Program Files\\Git\\cmd\\git.exe" -C "' + repo + '" commit -m "Update binaries"', (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    if (err) {
      core.setFailed(err);
      return;
    }
  });
  
  exec('"C:\\Program Files\\Git\\cmd\\git.exe" -C "' + repo + '" push origin main', (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    if (err) {
      core.setFailed(err);
      return;
    }
  });
} catch (error) {
  core.setFailed(error.message);
}
