var __extends =
  (this && this.__extends) ||
  (function () {
    var extendStatics = function (d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (d, b) {
            d.__proto__ = b;
          }) ||
        function (d, b) {
          for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        };
      return extendStatics(d, b);
    };
    return function (d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype =
        b === null
          ? Object.create(b)
          : ((__.prototype = b.prototype), new __());
    };
  })();
var Nore;
(function (Nore) {
  var Scene_Talk = /** @class */ (function (_super) {
    __extends(Scene_Talk, _super);
    function Scene_Talk() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Scene_Talk.prototype.playScenario = function (id) {
      this._lastScenario = id;
      this._interpreter = new Game_Interpreter();
      this._interpreter._list = [];
      this._interpreter._list.push({
        code: 357,
        indent: 0,
        parameters: ["Nore_Tes", "Run", null, { id: id }],
      });
      this._interpreter._list.push({ code: 0, indent: 0, parameters: [] });
    };
    Scene_Talk.prototype.update = function () {
      _super.prototype.update.call(this);
      this.updateInterpreter();
    };
    Scene_Talk.prototype.updateInterpreter = function () {
      if (!this._interpreter) {
        return;
      }
      this._interpreter.update();
      if (!this._interpreter.isRunning()) {
        this._interpreter = null;
        this.finishScenario();
      }
    };
    Scene_Talk.prototype.finishScenario = function () {};
    Scene_Talk.prototype.isInterpreterRunning = function () {
      if (!this._interpreter) {
        return false;
      }
      return this._interpreter.isRunning();
    };
    return Scene_Talk;
  })(Scene_Message);
  Nore.Scene_Talk = Scene_Talk;
})(Nore || (Nore = {}));
