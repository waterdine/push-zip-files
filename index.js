
const core = require('@actions/core');
const github = require('@actions/github');

try {
  const repo = core.getInput('repo');
  const { exec, spawn } = require('child_process');
  
  if (repo.includes('\'') || repo.includes('"'))
  {
     core.setFailed("Invalid characters in string");
  }
  
  exec('git add *.zip', {cwd:repo}, (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    if (err) {
      core.setFailed(err);
      return;
    }
  });
  
  exec('git commit -m "Update binaries"', {cwd:repo}, (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    if (err) {
      core.setFailed(err);
      return;
    }
  });
  
  exec('git push origin main', {cwd:repo}, (err, stdout, stderr) => {
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
