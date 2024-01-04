/*:ja
 * @target MZ
 */
var Nore;
(function (Nore) {
  Nore.TEMP_SWITCH1 = 20;
  Nore.TEMP_VAR1 = 20;
  Nore.applyMyMethods = function (myClass, presetClass, applyConstructor) {
    for (var p_1 in myClass.prototype) {
      if (myClass.prototype.hasOwnProperty(p_1)) {
        if (p_1 === "constructor" && !applyConstructor) {
          continue;
        }
        Object.defineProperty(
          presetClass.prototype,
          p_1,
          Object.getOwnPropertyDescriptor(myClass.prototype, p_1)
        );
        //presetClass.prototype[p] = myClass.prototype[p];
      }
    }
  };
  Nore.toIntArray = function (list) {
    var ret = [];
    for (var i = 0; i < list.length; i++) {
      ret[i] = parseInt(list[i]);
    }
    return ret;
  };
  Nore.toIntArrayByStr = function (str, minLength) {
    if (minLength === void 0) {
      minLength = 0;
    }
    var ret = [];
    for (var i = 0; i < minLength; i++) {
      ret[i] = 0;
    }
    if (!str) {
      return ret;
    }
    var list = str.split(",");
    for (var i = 0; i < list.length; i++) {
      ret[i] = parseInt(list[i]);
      if (isNaN(ret[i])) {
        ret[i] = 0;
      }
    }
    return ret;
  };
  Nore.parseIntValue = function (value, defaultValue) {
    var intNum = parseInt(value);
    if (isNaN(intNum)) {
      return defaultValue;
    } else {
      return intNum;
    }
  };
})(Nore || (Nore = {}));
function hankaku2Zenkaku(str) {
  return (str + "").replace(/[A-Za-z0-9]/g, function (s) {
    return String.fromCharCode(s.charCodeAt(0) + 0xfee0);
  });
}
function rnorm() {
  return (
    Math.sqrt(-2 * Math.log(1 - Math.random())) *
    Math.cos(2 * Math.PI * Math.random())
  );
}
