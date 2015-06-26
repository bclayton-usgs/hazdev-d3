'use strict';

var config = require('./config');

var cssmin = {
  dist: {
    src: config.build + '/' + config.src + '/hazdev-d3.css',
    dest: config.dist + '/hazdev-d3.css'
  }
};

module.exports = cssmin;
