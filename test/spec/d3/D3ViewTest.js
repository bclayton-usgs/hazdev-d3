/* global chai, describe, it */
'use strict';

var expect = chai.expect,
    D3View = require('d3/D3View');


describe('D3View', function () {

  describe('constructor', function () {

    it('is defined', function () {
      expect(D3View).to.not.equal(null);
    });

  });

});
