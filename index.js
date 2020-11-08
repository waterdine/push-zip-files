
const core = require('@actions/core');
const github = require('@actions/github');

try {
  const repo = core.getInput('repo');
  const { exec, spawn } = require('child_process');
  
  if (repo.includes('\'') || repo.includes('"'))
  {
     core.setFailed("Invalid characters in string");
  }
  
  exec('"C:\\Program Files\\Git\\bin\\git.exe" add *.zip', {cwd:repo}, (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    if (err) {
      core.setFailed(err);
      return;
    }
  });
  
  exec('"C:\\Program Files\\Git\\bin\\git.exe"  commit -m "Update binaries"', {cwd:repo}, (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    if (err) {
      core.setFailed(err);
      return;
    }
  });
  
  exec('"C:\\Program Files\\Git\\bin\\git.exe"  push origin main', {cwd:repo}, (err, stdout, stderr) => {
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
