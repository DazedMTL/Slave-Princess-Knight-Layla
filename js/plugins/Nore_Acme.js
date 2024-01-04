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
  var _Scene_Map_updateMain = Scene_Map.prototype.updateMain;
  Scene_Map.prototype.updateMain = function () {
    _Scene_Map_updateMain.call(this);
    if (this.isShowAcmeWindow()) {
      this.showAcmeWindow();
    } else {
      this.hideAcmeWindow();
    }
  };
  Scene_Map.prototype.isShowAcmeWindow = function () {
    return $gameSwitches.value(15);
  };
  Scene_Map.prototype.showAcmeWindow = function () {
    if (!this._acmeWindow) {
      this._acmeWindow = new Window_AcmeCount(new Rectangle(970, 10, 285, 85));
      this._spriteset.addChild(this._acmeWindow);
    }
    this._acmeWindow.show();
  };
  Scene_Map.prototype.hideAcmeWindow = function () {
    if (this._acmeWindow) {
      this._acmeWindow.hide();
    }
  };
  Nore.ACME_VAR = 13;
  var Window_AcmeCount = /** @class */ (function (_super) {
    __extends(Window_AcmeCount, _super);
    function Window_AcmeCount() {
      var _this = (_super !== null && _super.apply(this, arguments)) || this;
      _this._lastAcme = -1;
      return _this;
    }
    Window_AcmeCount.prototype.update = function () {
      _super.prototype.update.call(this);
      if (this.isChanged()) {
        this.refresh();
      }
    };
    Window_AcmeCount.prototype.isChanged = function () {
      if (this._lastAcme != $gameVariables.value(Nore.ACME_VAR)) {
        return true;
      }
      return false;
    };
    Window_AcmeCount.prototype.refresh = function () {
      this.contents.clear();
      this.saveLastCount();
      this.drawAcmeCount();
    };
    Window_AcmeCount.prototype.saveLastCount = function () {
      this._lastAcme = $gameVariables.value(Nore.ACME_VAR);
    };
    Window_AcmeCount.prototype.drawAcmeCount = function () {
      var yy = 10;
      this.drawText("イッた回数", 20, yy, 130, "left");
      var acmeCount = this._lastAcme;
      this.drawText("%1回".format(acmeCount), 110, yy, 110, "right");
    };
    return Window_AcmeCount;
  })(Window_Base);
  Nore.Window_AcmeCount = Window_AcmeCount;
})(Nore || (Nore = {}));
