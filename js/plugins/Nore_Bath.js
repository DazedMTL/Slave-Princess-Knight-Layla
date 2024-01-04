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
  var Scene_Bathroom = /** @class */ (function (_super) {
    __extends(Scene_Bathroom, _super);
    function Scene_Bathroom() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Scene_Bathroom.prototype.create = function () {
      Scene_MenuBase.prototype.create.call(this);
      this.refreshBg();
      //this.createGoldWindow();
      this.createHelpWindow();
      this.createUpgradeWindow();
      this.createConfirmWindow();
      this.createMsgWindow();
      this.createTutoArrow();
      this.createLabel();
      $gameVariables.setValue(74, 0);
      $gameVariables.setValue(75, 0);
      //this.createButton();
    };
    Scene_Bathroom.prototype.createLabel = function () {
      this._labelWindow = new Nore.Window_Label(
        TextManager.bathroomHelp,
        100,
        40,
        900
      );
      this.addChild(this._labelWindow);
      this._labelWindow2 = new Nore.Window_Label(
        TextManager.bathroomHelp2,
        100,
        40 + 40,
        900
      );
      this.addChild(this._labelWindow2);
    };
    Scene_Bathroom.prototype.createButton = function () {
      this._backButton = new Sprite_BackButton();
      this._backButton.x = 1140;
      this._backButton.y = 14;
      this.addChild(this._backButton);
      this._backButton.setClickHandler(this.onCancel.bind(this));
    };
    Scene_Bathroom.prototype.refreshBg = function () {};
    Scene_Bathroom.prototype.isTuto = function () {
      return !$gameSwitches.value(23);
    };
    Scene_Bathroom.prototype.createTutoArrow = function () {
      if (!this.isTuto()) {
        return;
      }
      this._arrow = new Nore.TutoArrow(70, 50);
      this._bathroomWindow.addInnerChild(this._arrow);
    };
    Scene_Bathroom.prototype.createHelpWindow = function () {
      _super.prototype.createHelpWindow.call(this);
      this._helpWindow.x = 40;
      this._helpWindow.y = -4;
      this._helpWindow.width = Graphics.boxWidth - 100;
      this._helpWindow.visible = false;
    };
    Scene_Bathroom.prototype.createUpgradeWindow = function () {
      this._bathroomWindow = new Window_Bathroom();
      this._bathroomWindow.setHandler("ok", this.onOk.bind(this));
      this._bathroomWindow.setHandler("change", this.onChange.bind(this));
      this._bathroomWindow.setHandler("cancel", this.onCancel.bind(this));
      this._bathroomWindow.activate();
      this.addChild(this._bathroomWindow);
    };
    Scene_Bathroom.prototype.createConfirmWindow = function () {
      this._confirmWindow = new Nore.Window_Confirm();
      this._confirmWindow.setText(TextManager.confirmBathroom);
      this._confirmWindow.setHandler("ok", this.onConfirmOk.bind(this));
      this._confirmWindow.setHandler("cancel", this.onConfirmCancel.bind(this));
      this._confirmWindow.deactivate();
      this.addChild(this._confirmWindow);
      this._confirmWindow.hide();
    };
    Scene_Bathroom.prototype.createMsgWindow = function () {
      this._msgWindow = new Nore.Window_Msg(136);
      this._msgWindow.setHandler("ok", this.onConfirmCancel.bind(this));
      this._msgWindow.setHandler("cancel", this.onConfirmCancel.bind(this));
      this._msgWindow.deactivate();
      this.addChild(this._msgWindow);
      this._msgWindow.hide();
    };
    Scene_Bathroom.prototype.onConfirmCancel = function () {
      this._bathroomWindow.clearLock2();
      this._confirmWindow.hide();
      this._confirmWindow.deactivate();
      this._msgWindow.hide();
      this._msgWindow.deactivate();
      this._bathroomWindow.activate();
    };
    Scene_Bathroom.prototype.onConfirmOk = function () {
      this._confirmWindow.hide();
      this._confirmWindow.deactivate();
      var actor1Temp = this._bathroomWindow.selectedActor1();
      var actor2Temp = this._bathroomWindow.selectedActor2();
      var list = this.sortActor(actor1Temp, actor2Temp);
      var actor1 = list[0];
      var actor2 = list[1];
      $gameVariables.setValue(74, actor1.actorId());
      $gameVariables.setValue(75, actor2.actorId());
      $gameTemp.setBathroomActors(actor1, actor2);
      this.popScene();
    };
    Scene_Bathroom.prototype.sortActor = function (actor1, actor2) {
      if (actor1.getBathPriority() < actor2.getBathPriority()) {
        return [actor2, actor1];
      } else {
        return [actor1, actor2];
      }
    };
    Scene_Bathroom.prototype.onCancel = function () {
      if (this._bathroomWindow.lockedIndex() < 0) {
        this.popScene();
      } else {
        this._bathroomWindow.clearLock();
        this._bathroomWindow.activate();
      }
    };
    Scene_Bathroom.prototype.onOk = function () {
      SoundManager.playOk();
      if (this._bathroomWindow.lockedIndex() < 0) {
        this._bathroomWindow.lock();
        this._bathroomWindow.activate();
      } else {
        if (
          this._bathroomWindow.lockedIndex() == this._bathroomWindow.index()
        ) {
          this._bathroomWindow.clearLock();
        } else {
          this._bathroomWindow.lock2();
          this._confirmWindow.show();
          this._confirmWindow.activate();
        }
      }
    };
    Scene_Bathroom.prototype.onChange = function () {};
    return Scene_Bathroom;
  })(Scene_MenuBase);
  Nore.Scene_Bathroom = Scene_Bathroom;
  var Window_Bathroom = /** @class */ (function (_super) {
    __extends(Window_Bathroom, _super);
    function Window_Bathroom() {
      var _this = _super.call(this, new Rectangle(100, 150, 620, 450)) || this;
      _this._data = [];
      _this._lockedIndex = -1;
      _this._lockedIndex2 = -1;
      _this.makeItems();
      _this.refresh();
      _this.select(0);
      return _this;
    }
    Window_Bathroom.prototype.lockedIndex = function () {
      return this._lockedIndex;
    };
    Window_Bathroom.prototype.lock = function () {
      this._lockedIndex = this.index();
      this.refresh();
    };
    Window_Bathroom.prototype.lock2 = function () {
      this._lockedIndex2 = this.index();
      this.refresh();
    };
    Window_Bathroom.prototype.clearLock = function () {
      this._lockedIndex = -1;
      this._lockedIndex2 = -1;
      this.refresh();
      this.activate();
    };
    Window_Bathroom.prototype.clearLock2 = function () {
      this._lockedIndex2 = -1;
      this.refresh();
      this.activate();
    };
    Window_Bathroom.prototype.makeItems = function () {
      this._data = [];
      for (var _i = 0, _a = $gameParty.members(); _i < _a.length; _i++) {
        var actor = _a[_i];
        this._data.push(actor);
      }
    };
    Window_Bathroom.prototype.maxItems = function () {
      return this._data.length;
    };
    Window_Bathroom.prototype.swap = function () {
      var actor1 = this._data[this.lockedIndex()];
      var actor2 = this._data[this.index()];
      $gameParty.swap(actor1, actor2);
      this.makeItems();
      this.clearLock();
    };
    Window_Bathroom.prototype.drawItemBackground = function (index) {
      var actor = this._data[index];
      if (!this.isEnabled(actor)) {
        return;
      }
      _super.prototype.drawItemBackground.call(this, index);
    };
    Window_Bathroom.prototype.refresh = function () {
      this._windowContentsSprite.removeChildren();
      _super.prototype.refresh.call(this);
    };
    Window_Bathroom.prototype.drawItem = function (index) {
      var rect = this.itemRect(index);
      if (this.isLocked(index)) {
        this.contents.fillRect(
          rect.x,
          rect.y,
          rect.width,
          rect.height,
          "#FFFF0099"
        );
      }
      var actor = this._data[index];
      if (this.isEnabled(actor)) {
        this.changePaintOpacity(true);
      } else {
        this.changePaintOpacity(false);
      }
      this.changeTextColor(ColorManager.normalColor());
      //this.drawText((index + 1), 20, rect.y, 200, 'left');
      this.drawCharacterImage(actor.actorId(), 58, rect.y);
      var xx = 50 + 40;
      this.drawText(actor.name(), xx, rect.y, 200, "left");
      var item = actor.getCursedAcce();
      if (item) {
        this.drawIcon(item.iconIndex(), xx + 120, rect.y);
        this.drawText(item.name(), xx + 162, rect.y, 240);
      }
      var xxx = 308;
    };
    Window_Bathroom.prototype.isLocked = function (index) {
      if (this._lockedIndex == index) {
        return true;
      }
      if (this._lockedIndex2 == index) {
        return true;
      }
      return false;
    };
    Window_Bathroom.prototype.drawCharacterImage = function (actorId, x, y) {
      var cos = new CostumeSaver(actorId);
      var c = new Nore.Game_DungeonCharacter(cos, x, y + 52);
      var sprite = new Sprite_Prisoner(c, cos);
      if (this.contents.paintOpacity < 255) {
        c.setMonoTone(true);
      }
      this._windowContentsSprite.addChild(sprite);
    };
    Window_Bathroom.prototype.isEnabled = function (actor) {
      return actor.hasCursedAcce();
    };
    Window_Bathroom.prototype.isCurrentItemEnabled = function () {
      var actor = this.item(this.index());
      return this.isEnabled(actor);
    };
    Window_Bathroom.prototype.item = function (index) {
      return this._data[index];
    };
    Window_Bathroom.prototype.selectedItem = function () {};
    Window_Bathroom.prototype.itemHeight = function () {
      return 46;
    };
    Window_Bathroom.prototype.selectedActor1 = function () {
      return this._data[this._lockedIndex];
    };
    Window_Bathroom.prototype.selectedActor2 = function () {
      return this._data[this._lockedIndex2];
    };
    return Window_Bathroom;
  })(Window_Selectable);
  var BATH_ID = {
    1: [1, 2],
  };
  function isBath() {
    var actorId1 = $gameVariables.value(74);
    var actorId2 = $gameVariables.value(75);
    for (var key in BATH_ID) {
      var list = BATH_ID[key];
      if (list.contains(actorId1) && list.contains(actorId2)) {
        var min = Math.min(actorId1, actorId2);
        var max = Math.max(actorId1, actorId2);
        $gameVariables.setValue(74, min);
        $gameVariables.setValue(75, max);
        return parseInt(key);
      }
    }
    return 0;
  }
  Nore.isBath = isBath;
})(Nore || (Nore = {}));
