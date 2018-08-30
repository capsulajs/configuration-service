'use strict';

var path = require('path');
var isValid = require('is-valid-app');

module.exports = function(app) {
  if (!isValid(app, 'capsula-ci-cd')) return;
  
  app.task('travis', { silent: true }, function(cb) {
    return app.src('_travis.yml', {cwd: path.resolve(__dirname, 'templates')})
      .pipe(app.dest(function(file) {
        file.basename = '.travis.yml';
        return app.cwd;
      }));
  });
  
  app.task('default', ['travis']);
};
