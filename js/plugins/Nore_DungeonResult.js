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
  var Scene_DungeonResult = /** @class */ (function (_super) {
    __extends(Scene_DungeonResult, _super);
    function Scene_DungeonResult() {
      var _this = (_super !== null && _super.apply(this, arguments)) || this;
      _this._wait = 10;
      return _this;
    }
    Scene_DungeonResult.prototype.create = function () {
      _super.prototype.create.call(this);
      this.createResultWindow();
    };
    Scene_DungeonResult.prototype.createResultWindow = function () {
      var ww = 540;
      var rect = new Rectangle((Graphics.width - ww) / 2, 200, ww, 300);
      this._resultWindow = new Window_DungeonResult(rect);
      this.addChild(this._resultWindow);
      this._resultWindow.refresh();
    };
    Scene_DungeonResult.prototype.update = function () {
      _super.prototype.update.call(this);
      if (this._wait > 0) {
        this._wait--;
        return;
      }
      if (
        Input.isPressed("ok") ||
        Input.isPressed("cancel") ||
        TouchInput.isTriggered()
      ) {
        this.popScene();
      }
    };
    return Scene_DungeonResult;
  })(Scene_MenuBase);
  Nore.Scene_DungeonResult = Scene_DungeonResult;
  var Window_DungeonResult = /** @class */ (function (_super) {
    __extends(Window_DungeonResult, _super);
    function Window_DungeonResult() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Window_DungeonResult.prototype.refresh = function () {
      this.contents.clear();
      this.drawText(TextManager.dungeonResult, 10, 10, 500, "center");
      var dungeon = $gameSystem.getDungeonInfo();
      var lh = 34;
      var yy = 80;
      var xx = 40;
      this.contents.fontSize = 24;
      this.drawText(TextManager.elapsedDays, xx, yy, 250, "left");
      var day = $gameSystem.realDay() - $gameSystem.lastRecord()._startDay;
      this.drawText(day, 210, yy, 250, "right");
      yy += lh;
      this.drawText(TextManager.dungeonResultSp, xx, yy, 250, "left");
      this.drawText(dungeon.skillPoint(), 210, yy, 250, "right");
      yy += lh;
      yy += lh;
    };
    return Window_DungeonResult;
  })(Window_Base);
})(Nore || (Nore = {}));
