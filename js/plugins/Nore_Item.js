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
  var Scene_Item2 = /** @class */ (function (_super) {
    __extends(Scene_Item2, _super);
    function Scene_Item2() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Scene_Item2.prototype.create = function () {
      _super.prototype.create.call(this);
      this.createCommandWindow();
      this.createConfirmWindow();
      this._categoryWindow.hide();
      this.addWindow(this._actorWindow);
    };
    Scene_Item2.prototype.createActorWindow = function () {
      var rect = this.actorWindowRect();
      this._actorWindow = new Nore.Window_MembersBattle(rect);
      this._actorWindow.setHandler("ok", this.onActorOk.bind(this));
      this._actorWindow.setHandler("cancel", this.onActorCancel.bind(this));
      this._actorWindow.hide();
      this.addWindow(this._actorWindow);
    };
    Scene_Item2.prototype.showActorWindow = function () {
      _super.prototype.showActorWindow.call(this);
      this._actorWindow.refresh();
    };
    Scene_Item2.prototype.actorWindowRect = function () {
      var ww = Graphics.boxWidth;
      var wy = 114;
      var wh = Graphics.boxHeight - wy;
      var wx = 0;
      return new Rectangle(wx, wy, ww, wh);
    };
    Scene_Item2.prototype.helpWindowRect = function () {
      var wx = 250;
      var wy = 600;
      var ww = Graphics.boxWidth - wx * 2;
      var wh = this.calcWindowHeight(2, false);
      return new Rectangle(wx, wy, ww, wh);
    };
    Scene_Item2.prototype.createConfirmWindow = function () {
      this._confirmWindow = new Nore.Window_Confirm();
      this._confirmWindow.setText("アイテムを捨てますか？");
      this._confirmWindow.setHandler("ok", this.onConfirmOk.bind(this));
      this._confirmWindow.setHandler("cancel", this.onConfirmCancel.bind(this));
      this._confirmWindow.deactivate();
      this.addChild(this._confirmWindow);
      this._confirmWindow.hide();
    };
    Scene_Item2.prototype.createItemWindow = function () {
      var rect = new Rectangle(200, 200, 300, 200);
      this._itemWindow = new Window_MenuItemList(rect);
      this._itemWindow.setHelpWindow(this._helpWindow);
      this._itemWindow.setHandler("ok", this.onItemOk.bind(this));
      this._itemWindow.setHandler("cancel", this.popScene.bind(this));
      this.addWindow(this._itemWindow);
      this._categoryWindow.setItemWindow(this._itemWindow);
      this._itemWindow.activate();
    };
    Scene_Item2.prototype.createCommandWindow = function () {
      var rect = new Rectangle(560, 200, 200, 140);
      this._commandWindow = new Window_ItemCommand(rect);
      this._commandWindow.setHandler("use", this.onCommandUse.bind(this));
      this._commandWindow.setHandler(
        "dispose",
        this.onCommandDispose.bind(this)
      );
      this._commandWindow.setHandler("cancel", this.onCommandCancel.bind(this));
      this._commandWindow.hide();
      this.addWindow(this._commandWindow);
    };
    Scene_Item2.prototype.onCommandUse = function () {
      this.determineItem();
    };
    Scene_Item2.prototype.onCommandDispose = function () {
      this._confirmWindow.activate();
      this._confirmWindow.show();
    };
    Scene_Item2.prototype.onCommandCancel = function () {
      this._commandWindow.hide();
      this._itemWindow.activate();
    };
    Scene_Item2.prototype.onItemOk = function () {
      var item = this._itemWindow.item();
      this._commandWindow.setItem(item);
      this._commandWindow.show();
      this._commandWindow.select(0);
      this._commandWindow.activate();
    };
    Scene_Item2.prototype.onConfirmOk = function () {
      var itemIndex = this._itemWindow.index() - 1;
      $gameParty.disposeBattleItem(itemIndex);
      this._commandWindow.hide();
      this._confirmWindow.hide();
      this._itemWindow.refresh();
      this._itemWindow.activate();
    };
    Scene_Item2.prototype.onActorOk = function () {
      _super.prototype.onActorOk.call(this);
      this._actorWindow.activate();
    };
    Scene_Item2.prototype.onActorCancel = function () {
      _super.prototype.onActorCancel.call(this);
      this._commandWindow.hide();
    };
    Scene_Item2.prototype.onConfirmCancel = function () {
      this._confirmWindow.hide();
      this._confirmWindow.deactivate();
      this._commandWindow.activate();
    };
    return Scene_Item2;
  })(Scene_Item);
  Nore.Scene_Item2 = Scene_Item2;
  var Window_MenuItemList = /** @class */ (function (_super) {
    __extends(Window_MenuItemList, _super);
    function Window_MenuItemList() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Window_MenuItemList.prototype.maxCols = function () {
      return 1;
    };
    Window_MenuItemList.prototype.refresh = function () {
      _super.prototype.refresh.call(this);
      this.select(0);
      this.callUpdateHelp();
    };
    Window_MenuItemList.prototype.makeItemList = function () {
      var _this = this;
      this._data = $gameParty.allItems().filter(function (item) {
        return _this.includes(item);
      });
      for (var _i = 0, _a = $gameParty.battleItems(); _i < _a.length; _i++) {
        var item = _a[_i];
        this._data.push(item);
      }
      if (this.includes(null)) {
        this._data.push(null);
      }
    };
    Window_MenuItemList.prototype.isEnabled = function (item) {
      return true;
    };
    Window_MenuItemList.prototype.drawItem = function (index) {
      var item = this.itemAt(index);
      if (item) {
        var numberWidth = this.numberWidth();
        var rect = this.itemLineRect(index);
        this.changePaintOpacity(this.isEnabled(item));
        this.drawItemName(item, rect.x, rect.y, rect.width - numberWidth);
        //this.drawItemNumber(item, rect.x, rect.y, rect.width);
        this.changePaintOpacity(1);
      }
    };
    return Window_MenuItemList;
  })(Window_ItemList);
  var Window_ItemCommand = /** @class */ (function (_super) {
    __extends(Window_ItemCommand, _super);
    function Window_ItemCommand() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Window_ItemCommand.prototype.setItem = function (item) {
      this._item = item;
      this.refresh();
    };
    Window_ItemCommand.prototype.makeCommandList = function () {
      if (!this._item) {
        return;
      }
      var actor = $gameActors.actor(1);
      this.addCommand(TextManager.use, "use", actor.isOccasionOk(this._item));
      //this.addCommand('捨てる', 'dispose', this.canDispose());
    };
    Window_ItemCommand.prototype.canDispose = function () {
      return this._item.consumable;
    };
    return Window_ItemCommand;
  })(Window_Command);
})(Nore || (Nore = {}));
