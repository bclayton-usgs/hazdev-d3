/* global chai, describe, it */
'use strict';

var expect = chai.expect,
    D3LineView = require('d3/D3LineView');


describe('D3LineView', function () {

  describe('constructor', function () {

    it('is defined', function () {
      expect(D3LineView).to.not.equal(null);
    });

  });

});
