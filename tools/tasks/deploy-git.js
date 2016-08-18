var gulp = require('gulp');
var opts = require('../options');

var exec = require('child_process').exec;
var path = require('path');
var rootDir = path.resolve("./");

gulp.task('deploy-to-git', [], (done) => {
  var inquirer = require('inquirer');
  var chalk = require('chalk');
  var git = require('gulp-git');

  var shouldCommit = false;

  git.status({args : '--porcelain', quiet:true}, function (err, stdout) {
    if (err) throw err;
    if (stdout && stdout.length) {
      shouldCommit = true;
    }
    getDetails();
  });

  function getDetails() {
    console.log('\n');
    console.log(chalk.bold('Preparing to deploy a new static demo to: ' + chalk.cyan(opts.demoUrl) ));
    console.log('To cancel, hit ' + chalk.cyan('CTRL+C.') + '\n');

    inquirer.prompt([
      {
        type: 'confirm',
        name: 'gitCommit',
        message: 'Commit files to GIT before deploy?',
        default: true,
        when: function(result) {
          return shouldCommit;
        }
      },
      {
        type: 'input',
        name: 'message',
        default: 'Commit static demo',
        message: 'Enter GIT commit message:',
        when: function(result) {
          return result.gitCommit;
        }
      }]).then((result) => {
      if (result.gitCommit) {
        console.log(chalk.bold('Commiting changes to GIT'));

        //First add all changes
        git.exec({args : 'add .'}, (err, stdout) => {
          if (err) throw err;

          //Then commit
          git.exec({args : 'commit -m "' + result.message + '"'}, (err, stdout) => {
            if (err) throw err;
            git.push('Masterpass', 'development', function (err) {
              if (err) throw err;
              deployDirectory();
            });
          });
        });
      } else {
        deployDirectory();
      }
    })
  }

  /**
   * Deploy the dist directory to branch
   */
  function deployDirectory() {
    console.log(chalk.bold('Deploying to BitBucket'));
    _command('npm run deploy-demo', (result) => {
      console.log(chalk.bold('Deployed!'));
      console.log('Site will be visible on ' + chalk.cyan(opts.demoUrl) + ' shortly.');

      done();
    });
  }
});

function _command (cmd, cb) {
  exec(cmd, { cwd: rootDir }, function (err, stdout, stderr) {
    if (err) throw err;
    cb(stdout.split('\n').join(''))
  })
}