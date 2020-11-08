
const core = require('@actions/core');
const github = require('@actions/github');

try {
  const repo = core.getInput('repo');
  const username = core.getInput('username');
  const email = core.getInput('email');
  const { execSync, spawn } = require('child_process');
  
  if (repo.includes('\'') || repo.includes('"') || username.includes('\'') || username.includes('"') || email.includes('\'') || email.includes('"'))
  {
     core.setFailed("Invalid characters in string");
  }
  
  execSync('"C:\\Program Files\\Git\\cmd\\git.exe" -C "' + repo + '" config user.email "' + email + '"', (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    if (err) {
      core.setFailed(err);
      return;
    }
  });
  
  execSync('"C:\\Program Files\\Git\\cmd\\git.exe" -C "' + repo + '" config user.name "' + username + '"', (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    if (err) {
      core.setFailed(err);
      return;
    }
  });
  
  execSync('"C:\\Program Files\\Git\\cmd\\git.exe" -C "' + repo + '" add *.zip', (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    if (err) {
      core.setFailed(err);
      return;
    }
  });
  
  execSync('"C:\\Program Files\\Git\\cmd\\git.exe" -C "' + repo + '" commit -m "Update binaries"', (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    if (err) {
      core.setFailed(err);
      return;
    }
  });
  
  execSync('"C:\\Program Files\\Git\\cmd\\git.exe" -C "' + repo + '" push origin main', (err, stdout, stderr) => {
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
