'use strict';

var D33dGroup = require('./D33dGroup'),
    D33dPath = require('./D33dPath'),
    D33dText = require('./D33dText'),
    Util = require('util/Util'),
    Vector = require('math/Vector');


var _DEFAULTS = {
  className: 'D33dAxis',
  extent: [
    [0, 0, 0],
    [1, 0, 0]
  ],
  format: function (coord) {
    return ''+coord;
  },
  labelAnchor: 'middle',
  labelVector: null,
  padding: 0.05,
  scale: null,
  tickVector: [0, 0, 1],
  ticks: 10,
  title: 'Axis',
  titleAnchor: 'middle',
  titleVector: null
};


/**
 * A 3d axis.
 *
 * @param options {Object}
 * @param options.extent {Array<Array<Number>>}
 *        default [[0, 0, 0], [1, 0, 0]].
 *        axis extent.
 * @param options.format {Function(Array<Number>)}
 *        format one coordinate (for ticks).
 * @param options.labelAnchor {'start'|'middle'|'end'}
 *        default 'middle'.
 *        svg text-anchor property for tick labels.
 * @param options.labelVector {Array<Number>}
 *        default tickVector.multiply(2).
 *        placement of tick labels
 * @param options.padding {Number}
 *        default 0.05
 *        padding outside extent.  0.05 would be 5% padding based on extent.
 * @param options.tickVector {Array<Number>}
 *        direction and length of tick marks.
 * @param options.ticks {Number}
 *        number of ticks to create.
 * @param options.title {String}
 *        axis title.
 * @param options.titleAnchor {'start'|'middle'|'end'}
 *        default 'middle'.
 *        svg text-anchor property for title.
 * @param options.titleVector {Array<Number>}
 *        default Vector(tickVector).multiply(5).
 *        direction and length of tick marks.
 */
var D3Axis = function (options) {
  var _this,
      _initialize,
      // variables
      _extent,
      _ticks,
      _title,
      // methods
      _createTicks;


  _this = D33dGroup(options);

  _initialize = function (options) {
    options = Util.extend({}, _DEFAULTS, options);

    _this.model.set({
      extent: options.extent,
      format: options.format,
      labelAnchor: options.labelAnchor,
      labelVector: options.labelVector,
      padding: options.padding,
      tickVector: options.tickVector,
      ticks: options.ticks,
      title: options.title,
      titleAnchor: options.titleAnchor,
      titleVector: options.titleVector
    }, {silent: true});

    _extent = D33dPath({
      className: 'axis-extent'
    });
    _title = D33dText({
      className: 'axis-title'
    });
    _ticks = [];

    _createTicks();
    _this.model.on('change', _createTicks);
  };

  /**
   * Update the _ticks array and model "items" property.
   */
  _createTicks = function () {
    var extent,
        format,
        i,
        labelAnchor,
        labelVector,
        padding,
        tickEnd,
        tick,
        tickStart,
        tickUnit,
        tickVector,
        ticks,
        title,
        titleAnchor,
        titleVector;

    _ticks.forEach(function (tick) {
      tick.destroy();
    });
    _ticks = [];

    extent = _this.model.get('extent');
    format = _this.model.get('format');
    labelAnchor = _this.model.get('labelAnchor');
    labelVector = _this.model.get('labelVector');
    padding = _this.model.get('padding');
    tickVector = _this.model.get('tickVector');
    ticks = _this.model.get('ticks');
    title = _this.model.get('title');
    titleAnchor = _this.model.get('titleAnchor');
    titleVector = _this.model.get('titleVector');

    tickEnd = Vector(extent[1]);
    tickStart = Vector(extent[0]);
    tickVector = Vector(tickVector);
    titleVector = (titleVector ? Vector(titleVector) : tickVector.multiply(5));

    // update extent
    if (padding !== 0) {
      padding = tickEnd.subtract(tickStart).multiply(padding);
      extent[0] = Vector(extent[0]).subtract(padding).data();
      extent[1] = Vector(extent[1]).add(padding).data();
    }
    _extent.model.set({
      coords: extent
    });
    _title.model.set({
      coords: Vector(extent[0])
          // center within axis
          .add(tickEnd.subtract(tickStart).multiply(0.5))
          // offset
          .add(titleVector)
          .data(),
      text: title,
      textAnchor: titleAnchor
    });

    // create ticks
    tickUnit = tickEnd.subtract(tickStart).multiply(1 / ticks);
    labelVector = (labelVector ? Vector(labelVector) : tickVector.multiply(2));
    for (i = 0; i <= ticks; i++) {
      tick = tickStart.add(tickUnit.multiply(i));

      _ticks.push(D33dGroup({
        className: 'axis-tick',
        items: [
          D33dPath({
            coords: [
              tick.data(),
              tick.add(tickVector).data()
            ]
          }),
          D33dText({
            coords: tick.add(labelVector).data(),
            text: format(tick.data()),
            textAnchor: labelAnchor
          })
        ]
      }));
    }

    _this.model.set({
      items: [
        _extent,
        _title
      ].concat(_ticks)
    }, {silent: true});
  };

  /**
   * Free references.
   */
  _this.destroy = Util.compose(function () {
    if (_this === null) {
      return;
    }

    _this.model.off('change', _createTicks);

    _extent.destroy();
    _title.destroy();
    _ticks.forEach(function (tick) {
      tick.destroy();
    });

    _createTicks = null;
    _extent = null;
    _initialize = null;
    _this = null;
    _ticks = null;
    _title = null;
  }, _this.destroy);


  _initialize(options);
  options = null;
  return _this;
};


module.exports = D3Axis;
