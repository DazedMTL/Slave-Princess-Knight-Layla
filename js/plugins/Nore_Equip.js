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
  var HEIGHT_RIGHT = 350;
  var Scene_Equip2 = /** @class */ (function (_super) {
    __extends(Scene_Equip2, _super);
    function Scene_Equip2() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Scene_Equip2.prototype.create = function () {
      this._left = 250;
      this._right = 320;
      _super.prototype.create.call(this);
      this.createItemWindow();
      this.createLabelWindow();
      this.createLabelWindow2();
    };
    Scene_Equip2.prototype.createBackground = function () {};
    Scene_Equip2.prototype.createProfileWindow = function () {
      var rect = this.profileWindowRect();
      this._helpWindow = new Window_Help(rect);
      this.addWindow(this._helpWindow);
    };
    Scene_Equip2.prototype.createLabelWindow = function () {
      this._labelWindow = new Nore.Window_Label3(
        TextManager.cantEquip,
        120,
        -4
      );
      this.addWindow(this._labelWindow);
      this._labelWindow.hide();
    };
    Scene_Equip2.prototype.createLabelWindow2 = function () {
      this._labelWindow2 = new Nore.Window_Label2(
        TextManager.autoEquip,
        120,
        -4,
        500
      );
      this.addWindow(this._labelWindow2);
      if ($gameParty.inDungeon()) {
        this._labelWindow2.hide();
      }
    };
    Scene_Equip2.prototype.refreshActor = function () {
      var actor = this.actor();
      this._statusWindow.setActor(actor);
      this._itemWindow.setActor(actor);
      this._statusParamsWindow.setActor(actor);
      this._statusEquipWindow.setActor(actor);
      this._rightTachie.setActorId(actor.actorId());
      this._itemWindow.deactivate();
      this._statusEquipWindow.activate();
      this.onEquipChange();
    };
    Scene_Equip2.prototype.createItemWindow = function () {
      var rect = this.itemWindowRect();
      this._itemWindow = new Window_EquipItem2(rect);
      this._itemWindow.setHelpWindow(this._helpWindow);
      this._itemWindow.setHandler("ok", this.onItemOk.bind(this));
      this._itemWindow.setHandler("cancel", this.onItemCancel.bind(this));
      this._itemWindow.setHandler("change", this.onItemChange.bind(this));
      this._itemWindow.setActor($gameParty.menuActor());
      //this._itemWindow.hide();
      this.addWindow(this._itemWindow);
      this.onEquipChange();
    };
    Scene_Equip2.prototype.itemWindowRect = function () {
      var r = _super.prototype.statusEquipWindowRect.call(this);
      r.y = HEIGHT_RIGHT + this.mainAreaTop();
      r.height =
        Graphics.boxHeight -
        HEIGHT_RIGHT -
        this.mainAreaTop() -
        this.profileWindowRect().height;
      r.width = Graphics.width - this._right - this._left;
      r.x = this._left;
      return r;
    };
    Scene_Equip2.prototype.onItemChange = function () {
      var item = this._itemWindow.item();
      this._helpWindow.setItem(item);
    };
    Scene_Equip2.prototype.onItemOk = function () {
      SoundManager.playEquip();
      this.executeEquipChange();
      this._itemWindow.refresh();
      this._statusParamsWindow.refresh();
    };
    Scene_Equip2.prototype.executeEquipChange = function () {
      var actor = $gameParty.menuActor();
      var slotId = changeIndex(this._statusEquipWindow.index());
      var item = this._itemWindow.item();
      actor.changeEquip(slotId, item);
      this._statusEquipWindow.refresh();
      this._statusEquipWindow.activate();
      actor.recoverShield();
      if (!$gameParty.inDungeon()) {
        actor.recoverAll();
      }
    };
    Scene_Equip2.prototype.onItemCancel = function () {
      this._statusEquipWindow.activate();
      this._itemWindow.deactivate();
    };
    Scene_Equip2.prototype.createWindowLayer = function () {
      this.createRightTachie();
      _super.prototype.createWindowLayer.call(this);
    };
    Scene_Equip2.prototype.createRightTachie = function () {
      this._rightTachie = new Sprite_RightTachie2();
      this.addChild(this._rightTachie);
    };
    Scene_Equip2.prototype.createStatusWindow = function () {
      var rect = this.statusWindowRect();
      this._statusWindow = new Window_Status2(rect);
      this._statusWindow.setHandler("pagedown", this.nextActor.bind(this));
      this._statusWindow.setHandler("pageup", this.previousActor.bind(this));
      this.addWindow(this._statusWindow);
    };
    Scene_Equip2.prototype.lineHeight = function () {
      return 36;
    };
    Scene_Equip2.prototype.statusWindowRect = function () {
      var wx = 0;
      var wy = this.mainAreaTop();
      var ww = Graphics.boxWidth;
      var wh = this.statusParamsWindowRect().y - wy;
      ww = this._left;
      return new Rectangle(wx, wy, ww, wh);
    };
    Scene_Equip2.prototype.statusParamsWindowRect = function () {
      var r = _super.prototype.statusParamsWindowRect.call(this);
      r.y -= this.lineHeight() * 4;
      r.height += this.lineHeight() * 4;
      r.width = this._left;
      return r;
    };
    Scene_Equip2.prototype.profileWindowRect = function () {
      var r = _super.prototype.profileWindowRect.call(this);
      r.width -= this._right;
      return r;
    };
    Scene_Equip2.prototype.statusEquipWindowRect = function () {
      // 装備画面
      var r = _super.prototype.statusEquipWindowRect.call(this);
      //r.height -= this.lineHeight();
      r.y -= this.lineHeight() * 4;
      r.height = HEIGHT_RIGHT;
      r.width = Graphics.width - this._right - this._left;
      r.x = this._left;
      return r;
    };
    Scene_Equip2.prototype.createStatusEquipWindow = function () {
      var rect = this.statusEquipWindowRect();
      rect.y = this.mainAreaTop();
      this._statusEquipWindow = new Window_StatusEquip2(rect);
      this._statusEquipWindow.setHandler("ok", this.onEquipOk.bind(this));
      this._statusEquipWindow.setHandler(
        "change",
        this.onEquipChange.bind(this)
      );
      this._statusEquipWindow.setHandler("cancel", this.onCancel.bind(this));
      this.addWindow(this._statusEquipWindow);
      this._statusEquipWindow.activate();
      this._statusEquipWindow.select(0);
    };
    Scene_Equip2.prototype.onCancel = function () {
      $gameTemp.isCancelMenu = true;
      this.popScene();
    };
    Scene_Equip2.prototype.onEquipChange = function () {
      if (!this._itemWindow) {
        return;
      }
      if (!this._itemWindow.active) {
        //return;
      }
      var index = this._statusEquipWindow.index();
      var item = this._statusEquipWindow.item(changeIndex(index));
      var slot;
      switch (changeIndex(index)) {
        case 0:
          slot = 1;
          break;
        case 1:
          slot = 2;
          break;
        case 2:
          slot = 3;
          break;
        default:
          slot = 5;
          break;
      }
      if (this._itemWindow) {
        this._itemWindow.setSlotId(slot);
      }
      if (this._helpWindow) {
        this._helpWindow.setItem(item);
      }
      this.updateLabelVisible();
    };
    Scene_Equip2.prototype.updateLabelVisible = function () {
      if (!$gameParty.inDungeon()) {
        return;
      }
      if (!this._labelWindow) {
        return;
      }
      var slotId = this._itemWindow.slotId();
      if (slotId == 5) {
        // 勲章
        this._labelWindow.show();
      } else {
        this._labelWindow.hide();
      }
    };
    Scene_Equip2.prototype.onEquipOk = function () {
      if (!this._statusEquipWindow.isCurrentItemEnabled()) {
        SoundManager.playBuzzer();
        this._statusEquipWindow.activate();
        return;
      }
      if (this._labelWindow.visible) {
        SoundManager.playBuzzer();
        this._statusEquipWindow.activate();
        return;
      }
      this._statusEquipWindow.deactivate();
      this._itemWindow.activate();
      this._itemWindow.select(0);
    };
    Scene_Equip2.prototype.createStatusParamsWindow = function () {
      var rect = this.statusParamsWindowRect();
      this._statusParamsWindow = new Window_StatusParams2(rect);
      this.addWindow(this._statusParamsWindow);
    };
    Scene_Equip2.prototype.update = function () {
      _super.prototype.update.call(this);
      this.updateAutoEquip();
    };
    Scene_Equip2.prototype.updateAutoEquip = function () {
      if ($gameParty.inDungeon()) {
        return;
      }
      if (!Input.isTriggered("shift")) {
        return;
      }
      SoundManager.playEquip();
      var actor = this.actor();
      actor.autoEquipMedals();
      this._statusWindow.refresh();
      this._itemWindow.refresh();
      this._statusEquipWindow.refresh();
      this._statusParamsWindow.refresh();
    };
    return Scene_Equip2;
  })(Scene_Status);
  Nore.Scene_Equip2 = Scene_Equip2;
  /**
   * 左上
   */
  var Window_Status2 = /** @class */ (function (_super) {
    __extends(Window_Status2, _super);
    function Window_Status2() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Window_Status2.prototype.refresh = function () {
      this.contents.clear();
      this._windowContentsSprite.removeChildren();
      this._additionalSprites = [];
      if (this._innerChildren) {
        var max = this._innerChildren.length - 1;
        for (var i = max; i >= 0; i--) {
          this._clientArea.removeChild(this._innerChildren[i]);
        }
        this._innerChildren = [];
      }
      if (this._actor) {
        //p('draw')
        var lineHeight = this.lineHeight();
        this.drawBlock1(lineHeight * 0);
        this.drawHorzLine(lineHeight * 1);
        this.drawBlock2(lineHeight * 2);
        // this.drawBlock3(lineHeight * 5 + 2);
        // this.drawHorzLine(lineHeight * 14);
        // this.drawBlock4(lineHeight * 15);
      }
    };
    Window_Status2.prototype.textWidth = function (text) {
      return Math.max(this.contents.measureTextWidth(text), 16);
    };
    Window_Status2.prototype.drawHorzLine = function (y) {
      var padding = this.itemPadding();
      var lineHeight = this.lineHeight();
      var x = padding;
      var width = this.innerWidth - padding * 2;
      this.drawRect(x, y, width, 5);
    };
    Window_Status2.prototype.drawBlock2 = function () {
      var y = this.block2Y();
      //this.drawActorFace(this._actor, 12, y);
      this.drawBasicInfo(4, y);
      this.drawExpInfo(286, y);
    };
    Window_Status2.prototype.drawBlock1 = function () {
      var y = this.block1Y();
      this.drawActorName(this._actor, 6, y, 168);
      //this.drawActorClass(this._actor, 162, y, 168);
      this.drawActorNickname(this._actor, 432, y, 270);
    };
    return Window_Status2;
  })(Window_Status);
  /**
   * アイテムリスト
   */
  var Window_EquipItem2 = /** @class */ (function (_super) {
    __extends(Window_EquipItem2, _super);
    function Window_EquipItem2() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Window_EquipItem2.prototype.includes = function (item) {
      if (item === null) {
        return true;
      }
      if (!(item instanceof Equip)) {
        return false;
      }
      var equip = item;
      if (!equip.isMedal() && equip.lv() == 0) {
        return false;
      }
      return (
        this._actor &&
        this._actor.canEquipType(equip.item()) &&
        equip.etypeId() === this._slotId
      );
    };
    Window_EquipItem2.prototype.makeItemList = function () {
      var _this = this;
      this._data = $gameParty.allItems().filter(function (item) {
        return _this.includes(item);
      });
      this._data = this._data.sort(function (a, b) {
        return a.sortValue() - b.sortValue();
      });
      if (this.includes(null)) {
        this._data.push(null);
      }
    };
    Window_EquipItem2.prototype.slotId = function () {
      return this._slotId;
    };
    Window_EquipItem2.prototype.maxCols = function () {
      return 2;
    };
    Window_EquipItem2.prototype.drawItem = function (index) {
      _super.prototype.drawItem.call(this, index);
      var rect = this.itemLineRect(index);
      var item = this.itemAt(index);
      //this.drawEquipParam(item, rect.x + 220, rect.y);
    };
    Window_EquipItem2.prototype.isEnabled = function (item) {
      if (!item) {
        return true;
      }
      return this._actor.canEquip(item.item());
    };
    return Window_EquipItem2;
  })(Window_EquipItem);
  var Sprite_RightTachie2 = /** @class */ (function (_super) {
    __extends(Sprite_RightTachie2, _super);
    function Sprite_RightTachie2(x, y, scale) {
      if (x === void 0) {
        x = 765;
      }
      if (y === void 0) {
        y = 0;
      }
      if (scale === void 0) {
        scale = 1;
      }
      var _this = _super.call(this, new Rectangle(0, 0, 0, 0)) || this;
      _this._x = x;
      _this._y = y;
      _this._scale = scale;
      return _this;
    }
    Sprite_RightTachie2.prototype.initialize = function () {
      var x = 550;
      _super.prototype.initialize.call(
        this,
        new Rectangle(x, 0, this.contentsWidth(), this.contentsHeight())
      );
      this.frameVisible = false;
      this.backOpacity = 0;
      this.margin = 0;
      this.padding = 0;
      var g = new PIXI.Graphics();
      g.beginFill(0x000);
      g.drawRect(0, 0, 500, 500);
      g.endFill();
      this._back = g;
      this.addChild(this._back);
      this._actorLayer = new Sprite();
      this.addChild(this._actorLayer);
    };
    Sprite_RightTachie2.prototype.setActorId = function (actorId) {
      this._actorId = actorId;
      this.redraw();
    };
    Sprite_RightTachie2.prototype.update = function () {
      this._actorId = $gameVariables.value(5);
      _super.prototype.update.call(this);
      this.updatePosition();
      if (this.actor() && this.actor().isDirty()) {
        this.redraw();
      }
    };
    Sprite_RightTachie2.prototype.updatePosition = function () {
      this.x = this._x;
      this.y = this._y;
      this.scale.x = this._scale;
      this.scale.y = this._scale;
      this._back.visible = false;
    };
    Sprite_RightTachie2.prototype.actor = function () {
      return $gameActors.actor(this._actorId);
    };
    Sprite_RightTachie2.prototype.redraw = function () {
      if (!this.visible) {
        return;
      }
      this.contents.clear();
      this.contentsBack.clear();
      if (!this._actorLayer) {
        return;
      }
      this.drawActor();
    };
    Sprite_RightTachie2.prototype.drawActor = function () {
      var hMinus = 0;
      if ($gameSwitches.value(4)) {
        hMinus = 0;
      }
      var rect = new Rectangle(120, -100, 600, 1000);
      var x = $gameActors.actor(this._actorId).posByActor();
      var y = 10;
      var actor = this.actor();
      if (!actor) {
        return;
      }
      this._actorLayer.removeChildren();
      var faceId = actor.getDefaultFaceId();
      if (faceId == 1) {
        faceId = actor.menuFaceId();
      }
      this.drawTachieActor(actor, this._actorLayer, x, y, null, faceId);
    };
    Sprite_RightTachie2.prototype.contentsWidth = function () {
      return 378;
    };
    Sprite_RightTachie2.prototype.contentsHeight = function () {
      return Graphics.height;
    };
    return Sprite_RightTachie2;
  })(Window_Base);
  Nore.Sprite_RightTachie2 = Sprite_RightTachie2;
  /**
   * 右上
   */
  var Window_StatusEquip2 = /** @class */ (function (_super) {
    __extends(Window_StatusEquip2, _super);
    function Window_StatusEquip2() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Window_StatusEquip2.prototype.refresh = function () {
      _super.prototype.refresh.call(this);
      this.drawEroAcce();
    };
    Window_StatusEquip2.prototype.drawEroAcce = function () {
      if (!this._actor) {
        return;
      }
      var Y = 187;
      var X = 24;
      var y = Y;
      var x = X;
      var i = 0;
      this.changePaintOpacity(true);
      this.changeTextColor(ColorManager.systemColor());
      this.contents.fontSize = 24;
      this.drawText(TextManager.equipEroAcce, 15, y - 32, 230);
      this.contents.fontSize = 26;
      this.changeTextColor(ColorManager.normalColor());
      for (var _i = 0, _a = this._actor.acceList(); _i < _a.length; _i++) {
        var a = _a[_i];
        if (a.isNoUp()) {
          continue;
        }
        this.changeTextColor(ColorManager.normalColor());
        this.drawText(a.name(), x, y, 130);
        this.drawEquipParam(a, x, y);
        x += 300;
        i++;
        if (i % 2 == 0) {
          x = X;
          y += 36;
        }
      }
    };
    Window_StatusEquip2.prototype.maxItems = function () {
      return this._actor ? 7 : 0;
    };
    Window_StatusEquip2.prototype.maxCols = function () {
      return 2;
    };
    Window_StatusEquip2.prototype.drawItem = function (index) {
      var rect = this.itemLineRect(index);
      var index2 = changeIndex(index);
      var item = this.item(index2);
      this.changePaintOpacity(this.isEnabled(index2));
      if (this.isEnabled(index2)) {
        this.drawBackgroundRect(rect);
      }
      var slotName = this.actorSlotName(this._actor, index2);
      var sw = 62;
      if (
        slotName == _super.prototype.actorSlotName.call(this, this._actor, 4)
      ) {
        this.changeTextColor(ColorManager.crisisColor());
      } else {
        this.changeTextColor(ColorManager.systemColor());
      }
      this.drawText(slotName, rect.x, rect.y, 55, rect.height);
      if (!item) {
        return;
      }
      this.drawItemName(item, rect.x + sw, rect.y, rect.width - sw);
      //this.drawEquipParam(item, rect.x + 220, rect.y);
    };
    Window_StatusEquip2.prototype.drawBackgroundRect = function (rect) {
      var c1 = ColorManager.itemBackColor1();
      var c2 = ColorManager.itemBackColor2();
      var x = rect.x - 5;
      var y = rect.y + 1;
      var w = rect.width + 10;
      var h = rect.height - 3;
      this.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);
      this.contentsBack.strokeRect(x, y, w, h, c1);
    };
    Window_StatusEquip2.prototype.item = function (index) {
      if (!this._actor) {
        return null;
      }
      var equips = this._actor.equips();
      return equips[index];
    };
    Window_StatusEquip2.prototype.isEnabled = function (index) {
      if (index <= 3) {
        if (index == 2) {
          if (this._actor.hasCursedAcce()) {
            // 呪いのアイテムを装備中
            return false;
          }
        }
        return true;
      }
      return index - 3 < this._actor.numMedalSlot();
    };
    Window_StatusEquip2.prototype.isCurrentItemEnabled = function () {
      return this.isEnabled(changeIndex(this.index()));
    };
    Window_StatusEquip2.prototype.actorSlotName = function (actor, index) {
      switch (index) {
        case 3:
          index = 4;
          break;
        case 4:
          index = 4;
          break;
        case 5:
          index = 4;
          break;
        case 6:
          index = 4;
          break;
        case 7:
          index = 4;
          break;
        case 8:
          index = 3;
          break;
      }
      switch (index) {
        case 0:
          return TextManager._weapon;
        case 1:
          return TextManager._armor;
        case 2:
          return TextManager.acce;
        case 4:
          return TextManager.medal;
      }
      return _super.prototype.actorSlotName.call(this, actor, index);
    };
    return Window_StatusEquip2;
  })(Window_StatusEquip);
  var Window_StatusParams2 = /** @class */ (function (_super) {
    __extends(Window_StatusParams2, _super);
    function Window_StatusParams2() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Window_StatusParams2.prototype.maxItems = function () {
      return this.paramIdList().length;
    };
    Window_StatusParams2.prototype.paramIdList = function () {
      return [0, 7, 1, 2, 3, 4, 5];
    };
    Window_StatusParams2.prototype.drawItem = function (index) {
      if (!this._actor) {
        return;
      }
      var rect = this.itemLineRect(index);
      var paramId = this.paramIdList()[index];
      var name = TextManager.param(paramId);
      var value = this.getValue(paramId);
      var valuePlus = this._actor.paramPlus(paramId);
      this.changeTextColor(ColorManager.systemColor());
      this.drawText(name, rect.x, rect.y, 160);
      this.resetTextColor();
      this.drawText(value, rect.x + 90, rect.y, 60, "right");
      if (valuePlus > 0) {
        this.changeTextColor(ColorManager.powerUpColor());
        this.drawText("+" + valuePlus, rect.x + 140, rect.y, 60, "right");
      }
    };
    Window_StatusParams2.prototype.getValue = function (paramId) {
      switch (paramId) {
        case 0:
          return this._actor.mhp;
      }
      return this._actor.param(paramId);
    };
    return Window_StatusParams2;
  })(Window_StatusParams);
  function changeIndex(index) {
    var index2 = index;
    switch (index) {
      case 0:
        index2 = 3;
        break;
      case 1:
        index2 = 0;
        break;
      case 3:
        index2 = 1;
        break;
      //case 4: index2 = 2; break;
      case 2:
        index2 = 4;
        break;
      case 5:
        index2 = 2;
        break;
      case 4:
        index2 = 5;
        break;
      //case 6: index2 = 5; break;
    }
    return index2;
  }
})(Nore || (Nore = {}));
Window_Base.prototype.drawEquipParam = function (item, x, y) {
  if (!item) {
    return;
  }
  this.changeTextColor("#FF6666");
  var xx = x + 170;
  var plus = 0;
  if (item.hp() > 0) {
    this.drawText("HP", xx, y, 100);
    plus = item.hp();
  }
  if (item.atk()) {
    this.drawText("ATK", xx, y, 100);
    plus = item.atk();
  }
  if (item.def()) {
    this.drawText("DEF", xx, y, 100);
    plus = item.def();
  }
  if (item.shield()) {
    this.drawText("SH", xx, y, 100);
    plus = item.shield();
  }
  if (plus) {
    this.changeTextColor(ColorManager.powerUpColor());
    this.drawText("+" + plus, xx + 48, y, 100);
  }
};
Window_ItemList.prototype.drawItem = function (index) {
  var item = this.itemAt(index);
  if (item) {
    var equip = null;
    var numberWidth = this.numberWidth();
    if (item instanceof Equip) {
      equip = item;
      numberWidth = 0;
    }
    var rect = this.itemLineRect(index);
    this.changePaintOpacity(this.isEnabled(item));
    this.drawItemName(item, rect.x, rect.y, rect.width - numberWidth);
    /*if (equip == null) {
            this.drawItemNumber(item, rect.x, rect.y, rect.width);
        } else {
            const level = equip.lv();
            this.drawIcon(2880 + level - 1, rect.x, rect.y)
        }*/
    this.changePaintOpacity(1);
  }
};
