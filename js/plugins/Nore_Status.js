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
  Nore.LEVELUP_PARAMS = {
    //                             10                           20
    1: [
      0, 1, 2, 4, 5, 6, 1, 2, 3, 5, 4, 1, 2, 4, 2, 1, 5, 5, 3, 1, 5, 2, 4, 5, 6,
      1, 2, 3, 5, 4, 1, 2, 4, 2, 1, 6, 5, 3, 1, 5, 2, 4, 5, 6, 1, 2, 3, 5, 4, 1,
      2, 4, 2, 1, 6, 5, 3, 1, 5, 2, 4, 5, 6, 1, 2, 3, 5, 4, 1, 2, 4, 2, 1, 6, 5,
      3, 1, 1, 2, 4, 5, 6, 1, 2, 3, 5, 4, 1, 2, 4, 2, 1, 6, 5, 3,
    ],
    2: [
      0, 5, 1, 2, 1, 5, 6, 3, 2, 6, 4, 1, 5, 2, 4, 6, 5, 1, 3, 4, 5, 1, 2, 1, 5,
      6, 3, 2, 6, 4, 1, 5, 2, 4, 6, 5, 1, 3, 4, 5, 1, 4, 1, 5, 6, 3, 2, 6, 4, 1,
      5, 2, 4, 6, 5, 1, 3, 4, 5, 1, 4, 1, 5, 6, 3, 2, 6, 4, 1, 5, 2, 4, 6, 5, 1,
      3, 4, 5, 1, 2, 1, 5, 6, 3, 2, 6, 4, 1, 5, 2, 4, 6, 5, 1, 3, 4,
    ],
    3: [
      0, 2, 1, 3, 5, 6, 5, 3, 3, 4, 5, 6, 2, 1, 2, 3, 4, 5, 6, 2, 2, 1, 3, 5, 6,
      5, 3, 3, 4, 5, 6, 2, 1, 2, 3, 4, 5, 6, 2, 2, 1, 3, 5, 6, 5, 3, 3, 4, 5, 6,
      2, 1, 2, 3, 4, 5, 6, 2, 2, 1, 3, 5, 6, 5, 3, 3, 4, 5, 6, 2, 1, 2, 3, 4, 5,
      6, 2, 2, 1, 3, 5, 6, 5, 3, 3, 4, 5, 6, 2, 1, 2, 3, 4, 5, 6, 2,
    ],
    4: [
      0, 3, 2, 5, 6, 4, 3, 5, 1, 5, 6, 4, 3, 2, 3, 2, 6, 4, 5, 3, 3, 2, 5, 6, 4,
      3, 5, 1, 5, 6, 4, 3, 2, 3, 2, 6, 4, 5, 3, 3, 2, 5, 6, 4, 3, 5, 1, 5, 6, 4,
      3, 2, 3, 2, 6, 4, 5, 3, 3, 2, 5, 6, 4, 3, 5, 1, 5, 6, 4, 3, 2, 3, 2, 6, 4,
      5, 3, 3, 2, 5, 6, 4, 3, 5, 1, 5, 6, 4, 3, 2, 3, 2, 6, 4, 5, 3,
    ],
    5: [0, 3, 2, 5, 6, 4, 3, 5, 6],
    6: [0, 3, 2, 5, 6, 4, 3, 5, 6],
    10: [
      0, 3, 2, 5, 6, 4, 3, 5, 1, 5, 6, 4, 3, 2, 3, 2, 6, 4, 5, 3, 3, 2, 5, 6, 4,
      3, 5, 1, 5, 6, 4, 3, 2, 3, 2, 6, 4, 5, 3, 3, 2, 5, 6, 4, 3, 5, 1, 5, 6, 4,
      3, 2, 3, 2, 6, 4, 5, 3, 3, 2, 5, 6, 4, 3, 5, 1, 5, 6, 4, 3, 2, 3, 2, 6, 4,
      5, 3, 3, 2, 5, 6, 4, 3, 5, 1, 5, 6, 4, 3, 2, 3, 2, 6, 4, 5, 3,
    ],
  };
  var _Game_Actor_prototype_setup = Game_Actor.prototype.setup;
  Game_Actor.prototype.setup = function (actorId) {
    this.skillParams = {
      hp: 0,
      sp: 0,
      str: 0,
      dex: 0,
      mgc: 0,
      vit: 0,
      agi: 0,
      luk: 0,
    };
    this.ninshinParams = {
      hp: 0,
      sp: 0,
      str: 0,
      dex: 0,
      mgc: 0,
      vit: 0,
      agi: 0,
      luk: 0,
    };
    var params = {
      hp: 0,
      sp: 0,
      str: 1,
      dex: 1,
      mgc: 1,
      vit: 1,
      agi: 1,
      luk: 1,
    };
    this.params = params;
    switch (actorId) {
      case 1:
        params.str = 11;
        params.dex = 12;
        params.mgc = 11;
        params.vit = 11;
        params.agi = 10;
        params.luk = 8;
        break;
      case 2:
        params.str = 14;
        params.dex = 10;
        params.mgc = 3;
        params.vit = 15;
        params.agi = 11;
        params.luk = 4;
        break;
      case 3:
        params.str = 8;
        params.dex = 13;
        params.mgc = 7;
        params.vit = 7;
        params.agi = 8;
        params.luk = 8;
        break;
      case 4:
        params.str = 7;
        params.dex = 9;
        params.mgc = 15;
        params.vit = 6;
        params.agi = 6;
        params.luk = 12;
        break;
      case 5:
        params.str = 2;
        params.dex = 9;
        params.mgc = 3;
        params.vit = 4;
        params.agi = 4;
        params.luk = 12;
        break;
    }
    this.eroPoint = 0;
    this._plusOugi = 0;
    _Game_Actor_prototype_setup.call(this, actorId);
  };
  var _Game_Actor_prototype_levelUp = Game_Actor.prototype.levelUp;
  Game_Actor.prototype.levelUp = function () {
    var param = Nore.LEVELUP_PARAMS[this.actorId()][this._level];
    if (!param) {
      console.error("LVアップエラー" + this._level);
    }
    switch (param) {
      case 1:
        this.params["str"]++;
        break;
      case 2:
        this.params["dex"]++;
        break;
      case 3:
        this.params["mgc"]++;
        break;
      case 4:
        this.params["vit"]++;
        break;
      case 5:
        this.params["agi"]++;
        break;
      case 6:
        this.params["luk"]++;
        break;
    }
    _Game_Actor_prototype_levelUp.call(this);
  };
  Game_Actor.prototype.calcSkillUpParams = function () {
    var params = {
      hp: 0,
      sp: 0,
      str: 0,
      dex: 0,
      mgc: 0,
      vit: 0,
      agi: 0,
      luk: 0,
    };
    this._plusOugi = 0;
    for (var _i = 0, _a = this._skills; _i < _a.length; _i++) {
      var s = _a[_i];
      var skill = $dataSkills[s];
      for (var key in params) {
        if (skill.meta[key]) {
          params[key] += Math.floor(skill.meta[key]);
        }
      }
      if (skill.meta.ougiPlus) {
        this._plusOugi += Math.floor(skill.meta.ougiPlus);
      }
    }
    this.skillParams = params;
  };
  Game_Actor.prototype.equipParams = function () {
    var params = {
      hp: 0,
      sp: 0,
      str: 0,
      dex: 0,
      mgc: 0,
      vit: 0,
      agi: 0,
      luk: 0,
    };
    var armors = this.armors();
    var weapons = [this.weapon1(), this.weapon2(), this.weapon3()];
    for (var key in params) {
      for (var _i = 0, weapons_1 = weapons; _i < weapons_1.length; _i++) {
        var weapon = weapons_1[_i];
        if (weapon && weapon.obj().meta[key]) {
          params[key] += Math.floor(weapon.obj().meta[key]);
        }
      }
    }
    for (var key in params) {
      for (var _a = 0, armors_1 = armors; _a < armors_1.length; _a++) {
        var armor = armors_1[_a];
        if (armor.meta[key]) {
          params[key] += Math.floor(armor.meta[key]);
        }
      }
    }
    return params;
  };
  Game_Actor.prototype.getParam = function (name) {
    var params = this.params;
    if (!params) {
      return 0;
    }
    var skillParams = this.skillParams;
    var equipParams = this.equipParams();
    return params[name] + skillParams[name] + equipParams[name];
  };
  var Scene_Status2 = /** @class */ (function (_super) {
    __extends(Scene_Status2, _super);
    function Scene_Status2() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Scene_Status2.prototype.create = function () {
      this._right = 350;
      _super.prototype.create.call(this);
    };
    Scene_Status2.prototype.createWindowLayer = function () {
      this.createRightTachie();
      _super.prototype.createWindowLayer.call(this);
    };
    Scene_Status2.prototype.createRightTachie = function () {
      $gameVariables.setValue(5, 1);
      this._rightTachie = new Nore.Sprite_RightTachie2();
      this.addChild(this._rightTachie);
    };
    Scene_Status2.prototype.createStatusWindow = function () {
      var rect = this.statusWindowRect();
      this._statusWindow = new Window_Status2(rect);
      this._statusWindow.setHandler("cancel", this.popScene.bind(this));
      this._statusWindow.setHandler("pagedown", this.nextActor.bind(this));
      this._statusWindow.setHandler("pageup", this.previousActor.bind(this));
      this.addWindow(this._statusWindow);
    };
    Scene_Status2.prototype.lineHeight = function () {
      return 36;
    };
    Scene_Status2.prototype.statusWindowRect = function () {
      var r = _super.prototype.statusWindowRect.call(this);
      //r.height -= this.lineHeight() * 4;
      r.width -= this._right;
      return r;
    };
    Scene_Status2.prototype.statusParamsWindowRect = function () {
      var r = _super.prototype.statusParamsWindowRect.call(this);
      r.y -= this.lineHeight() * 4;
      r.height += this.lineHeight() * 4;
      return r;
    };
    Scene_Status2.prototype.profileWindowRect = function () {
      var r = _super.prototype.profileWindowRect.call(this);
      r.width -= this._right;
      return r;
    };
    Scene_Status2.prototype.statusEquipWindowRect = function () {
      var r = _super.prototype.statusEquipWindowRect.call(this);
      //r.height -= this.lineHeight();
      r.y -= this.lineHeight() * 4;
      r.height += this.lineHeight() * 4;
      r.width -= this._right;
      return r;
    };
    Scene_Status2.prototype.createStatusEquipWindow = function () {
      var rect = this.statusEquipWindowRect();
      this._statusEquipWindow = new Window_StatusEquip2(rect);
      this.addWindow(this._statusEquipWindow);
    };
    Scene_Status2.prototype.createStatusParamsWindow = function () {
      var rect = this.statusParamsWindowRect();
      this._statusParamsWindow = new Window_StatusParams2(rect);
      this.addWindow(this._statusParamsWindow);
    };
    return Scene_Status2;
  })(Scene_Status);
  Nore.Scene_Status2 = Scene_Status2;
  var Window_Status2 = /** @class */ (function (_super) {
    __extends(Window_Status2, _super);
    function Window_Status2() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Window_Status2.prototype.refresh = function () {
      this.contents.clear();
      if (this._actor) {
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
      this.drawBasicInfo(34, y);
      this.drawExpInfo(286, y);
    };
    return Window_Status2;
  })(Window_Status);
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
      var Y = 147;
      var y = Y;
      var x = 24;
      var i = 0;
      this.changeTextColor(ColorManager.normalColor());
      for (var _i = 0, _a = this._actor.acceList(); _i < _a.length; _i++) {
        var a = _a[_i];
        this.changeTextColor(ColorManager.normalColor());
        this.drawText(a.name, x, y, 130);
        this.drawParam(a, x, y);
        y += 36;
        i++;
        if (i == 5) {
          y = Y;
          x += 300;
        }
      }
    };
    Window_StatusEquip2.prototype.maxItems = function () {
      return this._actor ? 4 : 0;
    };
    Window_StatusEquip2.prototype.drawItem = function (index) {
      var rect = this.itemLineRect(index);
      var equips = this._actor.equips();
      var item = equips[index];
      var slotName = this.actorSlotName(this._actor, index);
      var sw = 138;
      this.changeTextColor(ColorManager.systemColor());
      this.drawText(slotName, rect.x, rect.y, sw, rect.height);
      if (!item) {
        return;
      }
      if (item.meta["lv"] == 0) {
        return;
      }
      this.drawItemName(item, rect.x + sw, rect.y, rect.width - sw);
      this.drawParam(item, rect.x + 220, rect.y);
    };
    Window_StatusEquip2.prototype.drawParam = function (item, x, y) {
      if (!item) {
        return;
      }
      this.changeTextColor(ColorManager.systemColor());
      var xx = x + 170;
      var plus = 0;
      if (item.params[0]) {
        this.drawText("HP", xx, y, 100);
        plus = item.params[0];
      }
      if (item.params[2]) {
        this.drawText("ATK", xx, y, 100);
        plus = item.params[2];
      }
      if (item.params[3]) {
        this.drawText("DEF", xx, y, 100);
        plus = item.params[3];
      }
      if (item.params[7]) {
        this.drawText("SH", xx, y, 100);
        plus = item.params[7];
      }
      if (plus) {
        this.changeTextColor(ColorManager.powerUpColor());
        this.drawText("+" + plus, xx + 48, y, 100);
      }
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
      var value = this._actor.paramBase(paramId);
      var valuePlus = this._actor.paramPlus(paramId);
      this.changeTextColor(ColorManager.systemColor());
      this.drawText(name, rect.x, rect.y, 160);
      this.resetTextColor();
      this.drawText(value, rect.x + 130, rect.y, 60, "right");
      if (valuePlus > 0) {
        this.changeTextColor(ColorManager.powerUpColor());
        this.drawText("+" + valuePlus, rect.x + 180, rect.y, 60, "right");
      }
    };
    return Window_StatusParams2;
  })(Window_StatusParams);
})(Nore || (Nore = {}));
