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
  var Scene_ItemDispose = /** @class */ (function (_super) {
    __extends(Scene_ItemDispose, _super);
    function Scene_ItemDispose() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Scene_ItemDispose.prototype.create = function () {
      _super.prototype.create.call(this);
      this.createHelpWindow();
      this.createDisposeWindow();
      this.createConfirmWindow();
      this.onChange();
    };
    Scene_ItemDispose.prototype.createHelpWindow = function () {
      var wx = 120;
      var wy = 0;
      var ww = Graphics.boxWidth - wx * 2;
      var wh = Window_Selectable.prototype.fittingHeight(3);
      var r = new Rectangle(wx, wy, ww, wh);
      this._helpWindow = new Window_Help(r);
      this.addWindow(this._helpWindow);
    };
    Scene_ItemDispose.prototype.createDisposeWindow = function () {
      this._disposeWindow = new Window_ItemDispose();
      this.addWindow(this._disposeWindow);
      this._disposeWindow.select(0);
      this._disposeWindow.activate();
      this._disposeWindow.setHandler("ok", this.onOk.bind(this));
      this._disposeWindow.setHandler("change", this.onChange.bind(this));
    };
    Scene_ItemDispose.prototype.createConfirmWindow = function () {
      this._confirmWindow = new Nore.Window_Confirm();
      this._confirmWindow.setText("このアイテムを捨てますか？");
      this._confirmWindow.setHandler("ok", this.onConfirmOk.bind(this));
      this._confirmWindow.setHandler("cancel", this.onConfirmCancel.bind(this));
      this._confirmWindow.deactivate();
      this.addChild(this._confirmWindow);
      this._confirmWindow.hide();
    };
    Scene_ItemDispose.prototype.onChange = function () {
      this._helpWindow.setItem(this._disposeWindow.selectedItem());
    };
    Scene_ItemDispose.prototype.onOk = function () {
      this._confirmWindow.show();
      this._confirmWindow.activate();
    };
    Scene_ItemDispose.prototype.onConfirmOk = function () {
      var index = this._disposeWindow.index();
      $gameParty.disposeBattleItem(index);
      $gameMedals.onDisposeItem();
      this.popScene();
    };
    Scene_ItemDispose.prototype.onConfirmCancel = function () {
      this._confirmWindow.hide();
      this._confirmWindow.deactivate();
      this._disposeWindow.activate();
    };
    return Scene_ItemDispose;
  })(Scene_MenuBase);
  Nore.Scene_ItemDispose = Scene_ItemDispose;
  var Window_ItemDispose = /** @class */ (function (_super) {
    __extends(Window_ItemDispose, _super);
    function Window_ItemDispose() {
      var _this = this;
      var ww = 500;
      var xx = (Graphics.width - ww) / 2;
      _this = _super.call(this, new Rectangle(xx, 200, ww, 500)) || this;
      _this.refresh();
      return _this;
    }
    Window_ItemDispose.prototype.refresh = function () {
      this.makeItems();
      _super.prototype.refresh.call(this);
      this.drawTitle();
    };
    Window_ItemDispose.prototype.makeItems = function () {
      this._data = $gameParty.battleItems();
    };
    Window_ItemDispose.prototype.drawTitle = function () {
      this.drawText("これ以上アイテムを持つことができません。", 10, 10, 400);
      this.drawText("捨てるアイテムを選択してください", 10, 50, 400);
    };
    Window_ItemDispose.prototype.itemHeight = function () {
      if ($gameParty.battleItemMax() == 4) {
        return 75;
      }
      return 95;
    };
    Window_ItemDispose.prototype.itemRect = function (index) {
      var rect = _super.prototype.itemRect.call(this, index);
      rect.y += 100;
      return rect;
    };
    Window_ItemDispose.prototype.maxItems = function () {
      if (!this._data) {
        return 0;
      }
      return this._data.length;
    };
    Window_ItemDispose.prototype.selectedItem = function () {
      return this._data[this.index()];
    };
    Window_ItemDispose.prototype.drawItem = function (index) {
      var item = this._data[index];
      var rect = this.itemRect(index);
      this.drawIcon(item.iconIndex, rect.x, rect.y);
      this.drawText(item.name, rect.x + 35, rect.y, rect.width);
    };
    return Window_ItemDispose;
  })(Window_Selectable);
})(Nore || (Nore = {}));
