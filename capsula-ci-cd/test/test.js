'use strict';

require('mocha');
var fs = require('fs');
var path = require('path');
var assert = require('assert');
var generate = require('generate');
var npm = require('npm-install-global');
var del = require('delete');
var generator = require('..');
var app;
var actual = path.resolve.bind(path, __dirname, 'actual');

function exists(name, cb) {
  return function(err) {
    if (err) return cb(err);
    var filepath = actual(name);
    fs.stat(filepath, function(err, stat) {
      if (err) return cb(err);
      assert(stat);
      del(actual(), cb);
    });
  };
}

describe('capsula-ci-cd', function() {
  if (!process.env.CI && !process.env.TRAVIS) {
    before(function(cb) {
      npm.maybeInstall('generate', cb);
    });
  }
  
  before(function(cb) {
    del(actual(), cb);
  });
  after(function(cb) {
    del(actual(), cb);
  });

  beforeEach(function() {
    app = generate({silent: true});
    app.option('dest', actual());
    app.cwd = actual();
  });
  
  describe('plugin', function() {
    it('should only register the plugin once', function(cb) {
      var count = 0;
      app.on('plugin', function(name) {
        if (name === 'capsula-ci-cd') {
          count++;
        }
      });
      app.use(generator);
      app.use(generator);
      app.use(generator);
      assert.equal(count, 1);
      cb();
    });
  });
  
  describe('tasks', function() {
    beforeEach(function() {
      app.use(generator);
    });

    it('should extend tasks onto the instance', function() {
      assert(app.tasks.hasOwnProperty('default'));
      assert(app.tasks.hasOwnProperty('travis'));
      assert(app.tasks.hasOwnProperty('deploy'));
      assert(app.tasks.hasOwnProperty('release'));
      assert(app.tasks.hasOwnProperty('trigger_travis_build'));
    });

    it('should run the `travis` task with .generate', function(cb) {
      app.generate('travis', exists('.travis.yml', cb));
    });
  
    it('should run the `deploy` task with .generate', function(cb) {
      app.generate('deploy', exists('build/deploy.sh', cb));
    });
  
    it('should run the `release` task with .generate', function(cb) {
      app.generate('release', exists('build/release.sh', cb));
    });
  
    it('should run the `trigger_travis_build` task with .generate', function(cb) {
      app.generate('trigger_travis_build', exists('build/trigger_travis_build.sh', cb));
    });
  });
});
