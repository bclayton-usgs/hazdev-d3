'use strict';

var config = require('./config');


var addMiddleware = function (connect, options, middlewares) {
  var bases,
      gateway;

  gateway = require('gateway');

  // push in reverse order
  bases = options.base.slice(0);
  bases.reverse();
  bases.forEach(function (base) {
    middlewares.unshift(gateway(base, {
      '.php': 'php-cgi',
      'env': {
        'PHPRC': 'node_modules/hazdev-template/dist/conf/php.ini'
      }
    }));
  });

  middlewares.unshift(
    require('compression')({
      filter: function (req, res) {
        var type = res.getHeader('Content-Type');
        return (type+'').match(/(css|javascript)/);
      }
    }),
    require('grunt-connect-proxy/lib/utils').proxyRequest
  );

  return middlewares;
};


var connect = {
  options: {
    hostname: '*'
  },

  proxies: [
    {
      context: '/theme/',
      host: 'localhost',
      port: 8003,
      rewrite: {
        '^/theme': ''
      }
    }
  ],

  dev: {
    options: {
      base: [
        // example must come first for now, until the following PR is merged:
        // https://github.com/fgnass/gateway/pull/11
        config.example,
        config.build + '/' + config.src
      ],
      livereload: true,
      middleware: addMiddleware,
      open: 'http://localhost:8000/example.php',
      port: 8000
    }
  },

  test: {
    options: {
      base: [
        config.build + '/' + config.src,
        config.build + '/' + config.test,
        'node_modules'
      ],
      open: 'http://localhost:8001/test.html',
      port: 8001
    }
  },

  dist: {
    options: {
      base: [
        config.dist,
        config.example
      ],
      keepalive: true,
      open: 'http://localhost:8002/example.html',
      port: 8002
    }
  },

  template: {
    options: {
      base: ['node_modules/hazdev-template/dist/htdocs'],
      port: 8003
    }
  }
};

module.exports = connect;
