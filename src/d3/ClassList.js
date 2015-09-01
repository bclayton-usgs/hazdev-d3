'use strict';



/**
 * Simulates a class list.
 *
 * If changes are made outside this object, resync using synchronize().
 */
var ClassList = function (el) {
  var _this,
      _initialize,
      // variables
      _classList,
      _syncValue,
      // methods
      _sync;


  _this = {};

  /**
   * Initialize ClassList.
   */
  _initialize = function () {
    _syncValue = null;
    _classList = [];
    _this.length = 0;

    _sync(true);
  };


  /**
   * Synchronize with element state.
   *
   * @param load {Boolean}
   *        when true, read state from element.
   *        otherwise, set element state.
   */
  _sync = function (load) {
    var value;

    if (load) {
      // read from element
      value = el.getAttribute('class');
      if (value === null) {
        _classList = [];
        _this.length = 0;
      } else {
        value = '' + value;
        _classList = value.split(' ');
        _this.length = _classList.length;
      }
    } else {
      // update element
      value = _classList.join(' ');
      el.setAttribute('class', value);
    }
    _syncValue = value;
  };

  /**
   * Add a class.
   *
   * @param className {String}
   *        class to add.
   */
  _this.add = function (className) {
    var pos;
    // load from element
    _sync(true);
    pos = _classList.indexOf(className);
    if (pos === -1) {
      _classList.push(className);
      _this.length++;
      // update element
      _sync(false);
    }
  };

  /**
   * Check if element has a class.
   *
   * @param className {String}
   *        class to add.
   * @return {Boolean}
   *         true if element list includes class.
   */
  _this.contains = function (className) {
    var pos;
    // load from element
    _sync(true);
    pos = _classList.indexOf(className);
    return (pos !== -1);
  };

  /**
   * Access a class.
   *
   * @param pos {String}
   *        index in list [0,ClassList.length-1].
   * @return className in list, or null if out of range.
   */
  _this.item = function (pos) {
    // load from element
    _sync(true);
    if (pos < 0 || pos >= _classList.length) {
      return null;
    }
    return _classList[pos];
  };

  /**
   * Remove a class.
   *
   * @param className {String}
   *        class to remove.
   */
  _this.remove = function (className) {
    var pos;
    // load from element
    _sync(true);
    pos = _classList.indexOf(className);
    if (pos !== -1) {
      _classList.splice(pos, 1);
      _this.length--;
      // update element
      _sync(false);
    }
  };

  /**
   * Toggle a class.
   *
   * Add is not in list, otherwise remove.
   *
   * @param className {String}
   *        class to add.
   */
  _this.toggle = function (className) {
    if (_this.has(className)) {
      _this.remove(className);
    } else {
      _this.add(className);
    }
  };


  _initialize();
  return _this;
};


/**
 * Add classList if element doesn't natively support classList.
 *
 * Some SVG implementations do not support classList.
 *
 * @param el {Element}
 *        element to polyfill.
 */
ClassList.polyfill = function (el) {
  if (!el.classList) {
    el.classList = ClassList(el);
  }
};


module.exports = ClassList;
