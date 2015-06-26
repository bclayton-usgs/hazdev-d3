'use strict';

var config = require('./config');

var compass = {
  src: {
    options: {
      sassDir: config.src,
      specify: config.src + '/hazdev-d3.scss',
      cssDir: config.build + '/' + config.src,
      environment: 'development'
    }
  }
};

module.exports = compass;
