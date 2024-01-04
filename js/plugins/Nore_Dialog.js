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
  var Window_Confirm = /** @class */ (function (_super) {
    __extends(Window_Confirm, _super);
    function Window_Confirm(w) {
      if (w === void 0) {
        w = 580;
      }
      var _this = this;
      var h = 150;
      var y = (Graphics.boxHeight - h) / 2;
      var rect = new Rectangle((Graphics.boxWidth - w) / 2, y, w, h);
      _this = _super.call(this, rect) || this;
      return _this;
    }
    Window_Confirm.prototype.setInfo = function (ok) {
      this._ok = ok;
      this.refresh();
    };
    Window_Confirm.prototype.setText = function (text) {
      this._text = text;
      this._texts = null;
      this.height = 140;
      this.refresh();
    };
    Window_Confirm.prototype.setTexts = function (texts) {
      this._texts = texts;
      this.height = 180;
      this.refresh();
    };
    Window_Confirm.prototype.makeCommandList = function () {
      this.addCommand("OK", "ok", this._ok);
      this.addCommand(TextManager._cancel, "cancel", true);
    };
    Window_Confirm.prototype.windowWidth = function () {
      return this.width - 20;
    };
    Window_Confirm.prototype.windowHeight = function () {
      return 140;
    };
    Window_Confirm.prototype.maxCols = function () {
      return 2;
    };
    Window_Confirm.prototype.refresh = function () {
      _super.prototype.refresh.call(this);
      if (this._texts) {
        var yy = 4;
        for (var _i = 0, _a = this._texts; _i < _a.length; _i++) {
          var t = _a[_i];
          this.drawText(t, 10, yy, this.windowWidth() - 30, "center");
          yy += 35;
        }
      } else {
        this.drawText(this._text, 10, 4, this.windowWidth() - 30, "center");
      }
    };
    Window_Confirm.prototype.activate = function () {
      _super.prototype.activate.call(this);
      $gameTemp.confirmWindowActive = true;
    };
    Window_Confirm.prototype.hide = function () {
      _super.prototype.hide.call(this);
      $gameTemp.confirmWindowActive = false;
    };
    Window_Confirm.prototype.itemRect = function (index) {
      var rect = new Rectangle(0, 0, 0, 0);
      var maxCols = this.maxCols();
      rect.width = this.itemWidth();
      rect.height = this.itemHeight();
      rect.x =
        (index % maxCols) * (rect.width + this.spacing()) - this._scrollX;
      rect.y = Math.floor(index / maxCols) * rect.height - this._scrollY + 64;
      if (this._texts) {
        rect.y += 40;
      }
      return rect;
    };
    Window_Confirm.prototype.processTouch = function () {
      if (this.isOpenAndActive()) {
        if (this.isHoverEnabled() && TouchInput.isHovered()) {
          this.onTouchSelect(false);
        } else if (TouchInput.isTriggered()) {
          this.onTouchSelect(true);
        }
        if (TouchInput.rightButton) {
          this.processCancel();
          TouchInput.clear();
          return;
        }
        if (TouchInput.isClicked() && this.isTouchedInsideFrame()) {
          this._pressed = true;
          SoundManager.playOk();
          TouchInput.clear();
          this.callOkHandler();
        } else {
          TouchInput.clear();
        }
      } else {
        this._pressed = false;
      }
    };
    Window_Confirm.prototype.spacing = function () {
      return 8;
    };
    return Window_Confirm;
  })(Window_HorzCommand);
  Nore.Window_Confirm = Window_Confirm;
  var Window_Msg = /** @class */ (function (_super) {
    __extends(Window_Msg, _super);
    function Window_Msg(hh) {
      if (hh === void 0) {
        hh = 0;
      }
      var _this = this;
      var w = 580;
      var h = hh || 190;
      var y = (Graphics.boxHeight - h) / 2;
      var rect = new Rectangle((Graphics.boxWidth - w) / 2, y, w, h);
      _this = _super.call(this, rect) || this;
      return _this;
    }
    Window_Msg.prototype.setInfo = function (ok) {
      this._ok = ok;
      this.refresh();
    };
    Window_Msg.prototype.setText = function (text, text2) {
      if (text2 === void 0) {
        text2 = "";
      }
      this._text = text;
      this._text2 = text2;
      this.refresh();
    };
    Window_Msg.prototype.setTexts = function (texts) {
      this._text = texts[0];
      this._text2 = texts[1];
      this._text3 = texts[2];
      this.refresh();
    };
    Window_Msg.prototype.makeCommandList = function () {
      this.addCommand("OK", "ok", this._ok);
    };
    Window_Msg.prototype.windowWidth = function () {
      return 600;
    };
    Window_Msg.prototype.maxCols = function () {
      return 1;
    };
    Window_Msg.prototype.refresh = function () {
      _super.prototype.refresh.call(this);
      this.drawText(this._text, 10, 4, 540, "center");
      this.drawText(this._text2, 10, 40, 540, "center");
      if (this._text3) {
        this.drawText(this._text3, 10, 40 + 36, 540, "center");
      }
    };
    Window_Msg.prototype.activate = function () {
      _super.prototype.activate.call(this);
      $gameTemp.confirmWindowActive = true;
    };
    Window_Msg.prototype.hide = function () {
      _super.prototype.hide.call(this);
      $gameTemp.confirmWindowActive = false;
    };
    Window_Msg.prototype.itemRect = function (index) {
      var rect = new Rectangle(0, 0, 0, 0);
      var maxCols = this.maxCols();
      rect.width = this.itemWidth();
      rect.height = this.itemHeight();
      rect.x =
        (index % maxCols) * (rect.width + this.spacing()) - this._scrollX;
      rect.y =
        Math.floor(index / maxCols) * rect.height -
        this._scrollY +
        this.height -
        84;
      return rect;
    };
    Window_Msg.prototype.spacing = function () {
      return 8;
    };
    return Window_Msg;
  })(Window_HorzCommand);
  Nore.Window_Msg = Window_Msg;
})(Nore || (Nore = {}));
