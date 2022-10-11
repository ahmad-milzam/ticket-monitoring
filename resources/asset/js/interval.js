function interval(duration, fn) {
  var _this = this;
  this.baseline = undefined;

  this.run = function () {
    if (_this.baseline === undefined) {
      _this.baseline = new Date().getTime();
    }
    fn();
    var end = new Date().getTime();
    _this.baseline += duration;

    var nextTick = duration - (end - _this.baseline);
    if (nextTick < 0) {
      nextTick = 0;
    }

    _this.timer = setTimeout(function () {
      _this.run(end);
    }, nextTick);
  };

  this.stop = function () {
    clearTimeout(_this.timer);
  };
}
