var Nore;
(function (Nore) {
  Nore.shuffle = function (_a) {
    var _b;
    var arr = _a.slice(0);
    var m = arr.length;
    while (m) {
      var i = Math.floor(Math.random() * m--);
      (_b = [arr[i], arr[m]]), (arr[m] = _b[0]), (arr[i] = _b[1]);
    }
    return arr;
  };
})(Nore || (Nore = {}));
