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
  var Scene_Formation = /** @class */ (function (_super) {
    __extends(Scene_Formation, _super);
    function Scene_Formation() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Scene_Formation.prototype.create = function () {
      Scene_MenuBase.prototype.create.call(this);
      //this.createGoldWindow();
      this.createHelpWindow();
      this.createUpgradeWindow();
      this.createConfirmWindow();
      this.createMsgWindow();
      this.createTutoArrow();
      this.createLabel();
      //this.createButton();
    };
    Scene_Formation.prototype.createLabel = function () {
      this._labelWindow = new Nore.Window_Label2(
        TextManager.formationHelp,
        200,
        110,
        920
      );
      this.addChild(this._labelWindow);
    };
    Scene_Formation.prototype.createButton = function () {
      this._backButton = new Sprite_BackButton();
      this._backButton.x = 1140;
      this._backButton.y = 14;
      this.addChild(this._backButton);
      this._backButton.setClickHandler(this.onCancel.bind(this));
    };
    Scene_Formation.prototype.isTuto = function () {
      return !$gameSwitches.value(23);
    };
    Scene_Formation.prototype.createTutoArrow = function () {
      if (!this.isTuto()) {
        return;
      }
      this._arrow = new Nore.TutoArrow(70, 50);
      this._formationWindow.addInnerChild(this._arrow);
    };
    Scene_Formation.prototype.createHelpWindow = function () {
      _super.prototype.createHelpWindow.call(this);
      this._helpWindow.x = 40;
      this._helpWindow.y = -4;
      this._helpWindow.width = Graphics.boxWidth - 100;
      this._helpWindow.visible = false;
    };
    Scene_Formation.prototype.createUpgradeWindow = function () {
      this._formationWindow = new Window_Formation();
      this._formationWindow.setHandler("ok", this.onOk.bind(this));
      this._formationWindow.setHandler("change", this.onChange.bind(this));
      this._formationWindow.setHandler("cancel", this.onCancel.bind(this));
      this._formationWindow.activate();
      this.addChild(this._formationWindow);
    };
    Scene_Formation.prototype.createConfirmWindow = function () {
      this._confirmWindow = new Nore.Window_Confirm();
      this._confirmWindow.setText("決定しますか？");
      this._confirmWindow.setHandler("ok", this.onConfirmOk.bind(this));
      this._confirmWindow.setHandler("cancel", this.onConfirmCancel.bind(this));
      this._confirmWindow.deactivate();
      this.addChild(this._confirmWindow);
      this._confirmWindow.hide();
    };
    Scene_Formation.prototype.createMsgWindow = function () {
      this._msgWindow = new Nore.Window_Msg(136);
      this._msgWindow.setHandler("ok", this.onConfirmCancel.bind(this));
      this._msgWindow.setHandler("cancel", this.onConfirmCancel.bind(this));
      this._msgWindow.deactivate();
      this.addChild(this._msgWindow);
      this._msgWindow.hide();
    };
    Scene_Formation.prototype.onConfirmCancel = function () {
      this._confirmWindow.hide();
      this._confirmWindow.deactivate();
      this._msgWindow.hide();
      this._msgWindow.deactivate();
      this._formationWindow.activate();
    };
    Scene_Formation.prototype.onConfirmOk = function () {
      if (!this._formationWindow.canBuy()) {
        this._confirmWindow.hide();
        var text = void 0;
        var armor = this._formationWindow.selectedItem();
        if (this._formationWindow.lessPan(armor)) {
          text = TextManager.notEnoughPan;
        } else {
          text = TextManager.notEnoughWine;
        }
        this._msgWindow.setText(text);
        this._msgWindow.setInfo(true);
        this._msgWindow.show();
        this._msgWindow.activate();
        return;
      }
      this._formationWindow.decide();
      this._formationWindow.refresh();
      this._formationWindow.activate();
      $gameSwitches.setValue(23, true);
      if (this._arrow) {
        this._arrow.visible = false;
      }
      SoundManager.playShop();
      this._confirmWindow.hide();
      this._confirmWindow.deactivate();
      this.onChange();
    };
    Scene_Formation.prototype.onCancel = function () {
      if (this._formationWindow.lockedIndex() < 0) {
        this.popScene();
      } else {
        this._formationWindow.clearLock();
        this._formationWindow.activate();
      }
    };
    Scene_Formation.prototype.onOk = function () {
      SoundManager.playOk();
      if (this._formationWindow.lockedIndex() < 0) {
        this._formationWindow.lock();
        this._formationWindow.activate();
      } else {
        if (
          this._formationWindow.lockedIndex() == this._formationWindow.index()
        ) {
          this._formationWindow.changeFormation();
        } else {
          this._formationWindow.swap();
        }
      }
    };
    Scene_Formation.prototype.onChange = function () {};
    return Scene_Formation;
  })(Scene_MenuBase);
  Nore.Scene_Formation = Scene_Formation;
  var Window_Formation = /** @class */ (function (_super) {
    __extends(Window_Formation, _super);
    function Window_Formation() {
      var _this = _super.call(this, new Rectangle(200, 200, 920, 450)) || this;
      _this._data = [];
      _this._lockedIndex = -1;
      _this.makeItems();
      _this.refresh();
      _this.select(0);
      return _this;
    }
    Window_Formation.prototype.lockedIndex = function () {
      return this._lockedIndex;
    };
    Window_Formation.prototype.lock = function () {
      this._lockedIndex = this.index();
      this.refresh();
    };
    Window_Formation.prototype.clearLock = function () {
      this._lockedIndex = -1;
      this.refresh();
      this.activate();
    };
    Window_Formation.prototype.changeFormation = function () {
      var actor = this._data[this._lockedIndex];
      var isFront = actor.isFront();
      if (isFront) {
        $gameParty.toBack(actor);
      } else {
        $gameParty.toFront(actor);
      }
      this.clearLock();
    };
    Window_Formation.prototype.makeItems = function () {
      this._data = [];
      for (var _i = 0, _a = $gameParty.members(); _i < _a.length; _i++) {
        var actor = _a[_i];
        this._data.push(actor);
      }
    };
    Window_Formation.prototype.maxItems = function () {
      return this._data.length;
    };
    Window_Formation.prototype.swap = function () {
      var actor1 = this._data[this.lockedIndex()];
      var actor2 = this._data[this.index()];
      $gameParty.swap(actor1, actor2);
      this.makeItems();
      this.clearLock();
    };
    Window_Formation.prototype.drawItemBackground = function (index) {
      if (index >= $gameParty.maxBattleMembers()) {
        return;
      }
      _super.prototype.drawItemBackground.call(this, index);
    };
    Window_Formation.prototype.refresh = function () {
      this._windowContentsSprite.removeChildren();
      _super.prototype.refresh.call(this);
    };
    Window_Formation.prototype.drawItem = function (index) {
      var rect = this.itemRect(index);
      if (this.lockedIndex() == index) {
        this.contents.fillRect(
          rect.x,
          rect.y,
          rect.width,
          rect.height,
          "#FFFF0099"
        );
      }
      var actor = this._data[index];
      this.contents.fontSize = 24;
      var yy = rect.y + 4;
      this.changeTextColor(ColorManager.crisisColor());
      if (index < $gameParty.maxBattleMembers()) {
        this.drawText(TextManager.sortie, 20, yy, 120, "left");
      }
      this.changeTextColor(ColorManager.normalColor());
      //this.drawText((index + 1), 20, yy, 200, 'left');
      var isFront = actor.isFront();
      this.drawCharacterImage(actor.actorId(), 178 + (isFront ? 0 : 20), yy);
      var xx = 160 + 50;
      this.drawText(actor.name(), xx, yy, 200, "left");
      var xxx = 308;
      if (isFront) {
        this.drawText(TextManager.front, xxx + 30, yy, 200, "left");
      } else {
        this.drawText(TextManager.back, xxx + 100, yy, 200, "left");
      }
      this.drawTotalSkillPoint(actor, xx, yy);
      this.drawMedal(actor, xx + 300, yy);
    };
    Window_Formation.prototype.drawTotalSkillPoint = function (actor, x, y) {
      this.contents.fontSize = 21;
      var n = actor.totalSkillPoint();
      this.drawText(TextManager.formationSkill, x + 440, y, 120, "left");
      this.drawText(n + " pt", x + 470, y, 200, "right");
    };
    Window_Formation.prototype.drawCharacterImage = function (actorId, x, y) {
      var cos = new CostumeSaver(actorId);
      var c = new Nore.Game_DungeonCharacter(cos, x, y + 48);
      var sprite = new Sprite_Prisoner(c, cos);
      this._windowContentsSprite.addChild(sprite);
    };
    Window_Formation.prototype.drawMedal = function (actor, x, y) {
      var medalCount = actor.numMedalSlot();
      var equips = actor.equips();
      for (var i = 0; i < medalCount; i++) {
        var medal = equips[i + 3];
        this.drawIcon(16, x + i * 32, y);
        if (medal) {
          this.changePaintOpacity(false);
          this.drawIcon(medal.iconIndex(), x + i * 32, y);
          this.changePaintOpacity(true);
          this.drawMiniNum(medal, x + i * 32, y);
        }
      }
    };
    Window_Formation.prototype.selectedItem = function () {};
    Window_Formation.prototype.itemHeight = function () {
      return 46;
    };
    return Window_Formation;
  })(Window_Selectable);
})(Nore || (Nore = {}));
