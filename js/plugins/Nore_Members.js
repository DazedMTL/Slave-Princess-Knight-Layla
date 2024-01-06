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
  var Scene_Members = /** @class */ (function (_super) {
    __extends(Scene_Members, _super);
    function Scene_Members() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Scene_Members.prototype.create = function () {
      Scene_MenuBase.prototype.create.call(this);
      this.createmembersWindow();
    };
    Scene_Members.prototype.createmembersWindow = function () {
      var rect = new Rectangle(
        0,
        0,
        Graphics.boxWidth + 10,
        Graphics.boxHeight + 10
      );
      this._membersWindow = new Window_Members(rect);
      //this._membersWindow.setHandler('ok', this.onOk.bind(this));
      //this._membersWindow.setHandler('change', this.onChange.bind(this));
      //this._membersWindow.setHandler('cancel', this.onCancel.bind(this));
      this._membersWindow.refresh();
      this.addChild(this._membersWindow);
    };
    Scene_Members.prototype.onOk = function () {};
    Scene_Members.prototype.onChange = function () {};
    Scene_Members.prototype.onCancel = function () {};
    Scene_Members.prototype.update = function () {
      _super.prototype.update.call(this);
      if (Input.isTriggered("ok")) {
        this.popScene();
      }
    };
    Scene_Members.prototype.popScene = function () {
      _super.prototype.popScene.call(this);
    };
    return Scene_Members;
  })(Scene_MenuBase);
  Nore.Scene_Members = Scene_Members;
  var MEM_W = 115;
  var Window_MembersBase = /** @class */ (function (_super) {
    __extends(Window_MembersBase, _super);
    function Window_MembersBase() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Window_MembersBase.prototype.getActorIdList = function () {
      return $gameParty.getActorIdList();
    };
    Window_MembersBase.prototype.actor = function (index) {
      var actorId = this.getActorIdList()[index];
      return $gameActors.actor(actorId);
    };
    Window_MembersBase.prototype.selectLast = function () {
      var actorId = -1;
      if ($gameParty.menuActor()) {
        actorId = $gameParty.menuActor().actorId();
      }
      var index = this.getActorIdList().indexOf(actorId);
      if (index < 0) {
        this.smoothSelect(0);
        return;
      }
      this.smoothSelect(index || 0);
    };
    Window_MembersBase.prototype.processOk = function () {
      var actor = this.actor(this.index());
      $gameParty.setMenuActor(actor);
      Window_StatusBase.prototype.processOk.call(this);
    };
    Window_MembersBase.prototype.drawActorName = function (actor, x, y) {
      this.changeTextColor(ColorManager.normalColor());
      this.drawText(actor.name(), x, y, 120);
    };
    Window_MembersBase.prototype.drawLine = function (y) {
      var padding = this.itemPadding();
      var x = padding;
      var width = this.innerWidth - padding * 2;
      this.drawRect(x, y, width, 3);
    };
    Window_MembersBase.prototype.xPosByActor = function (actorId) {
      return $gameActors.actor(actorId).posByActor();
    };
    Window_MembersBase.prototype.actorFaceId = function (actor) {
      if (actor.hasCursedAcce()) {
        return this.eroActorFaceId(actor);
      }
      if (actor.actorId() == $gameSystem.chokyoActorId()) {
        return this.eroActorFaceId(actor);
      }
      switch (actor.actorId()) {
        case 1:
          return 1;
        case 2:
          return 3;
        case 3:
          return 1;
      }
      return 1;
    };
    Window_MembersBase.prototype.eroActorFaceId = function (actor) {
      switch (actor.actorId()) {
        case 1:
          return 13;
        case 2:
          return 13;
        case 3:
          return 13;
        case 7:
          return 9;
      }
      return 4;
    };
    Window_MembersBase.prototype.hoppeId = function (actor) {
      if (actor.hasCursedAcce()) {
        return 1;
      }
      return 0;
    };
    return Window_MembersBase;
  })(Window_Selectable);
  Nore.Window_MembersBase = Window_MembersBase;
  var Window_Members = /** @class */ (function (_super) {
    __extends(Window_Members, _super);
    function Window_Members() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Window_Members.prototype.initialize = function (rect) {
      _super.prototype.initialize.call(this, rect);
      this._additionalSprites = {};
    };
    Window_Members.prototype.makeItems = function () {
      this._dataList = [];
      var list = this.getActorIdList();
      for (var i = 0; i < list.length; i++) {
        var actor = $gameActors.actor(list[i]);
        if (!this.isVisible(actor)) {
          continue;
        }
        this._dataList.push(actor);
      }
    };
    Window_Members.prototype.refresh = function () {
      this.makeItems();
      this.contents.clear();
      this._windowContentsBackSprite2.removeChildren();
      this._windowContentsSprite.removeChildren();
      _super.prototype.refresh.call(this);
      for (var i = 0; i < this._dataList.length; i++) {
        var actor = this._dataList[i];
        var yy = 50;
        var rect = this.itemRect(i);
        this.drawActorBg(actor, rect);
        this.drawActor(actor, rect.x, yy);
      }
      this.drawLine(486);
    };
    Window_Members.prototype.isVisible = function (actor) {
      if (actor.isCaptive()) {
        return true;
      }
      var actorList = $gameParty.members();
      if (actorList.contains(actor)) {
        return true;
      }
      return false;
    };
    Window_Members.prototype.drawActorBg = function (actor, rect) {
      var sprite = null;
      if (actor.isSlave()) {
        sprite = this.getBgSprite(2, rect);
      } else if (actor.isCaptive()) {
        sprite = this.getBgSprite(1, rect);
      }
      if (!sprite) {
        return;
      }
      sprite.x = rect.x;
      this._windowContentsBackSprite2.addChild(sprite);
    };
    Window_Members.prototype.drawActor = function (a, x, y) {
      var actor = JsonEx.makeDeepCopy(a);
      var tachieX = x + this.xPosByActor(actor.actorId()) - 90;
      var faceId = this.actorFaceId(actor);
      if (actor.getDefaultFaceId() > 1) {
        faceId = actor.getDefaultFaceId();
      }
      actor.setHoppeId(this.hoppeId(actor));
      var rect = new Rectangle(x + 10, 45, 136, 410);
      this.drawTachieActor(
        actor,
        this._windowContentsSprite,
        tachieX,
        y + 45,
        rect,
        faceId,
        0.5,
        false
      );
      var yy = y + 400;
      var xx = x + 10;
      this.drawStatus(actor, xx, yy);
      yy += 10;
      this.contents.fontSize = 22;
      this.drawSkillPoint(actor, x, y - 50);
      this.drawMedal(actor, x, y - 24);
      this.drawActorName(actor, xx, yy + this.lineHeight() * 1);
      this.contents.fontSize = 20;
      this.drawSortieCount(actor, xx, yy + this.lineHeight() * 2);
      this.drawNikubenkiCount(actor, xx, yy + this.lineHeight() * 3);
      this.drawNakadashiCount(actor, xx, yy + this.lineHeight() * 4);
      this.drawSyusanCount(actor, xx, yy + this.lineHeight() * 5);
      //this.drawHp(actor, xx, yy + this.lineHeight() * 2);
      //this.drawMp(actor, xx, yy + this.lineHeight() * 3);
    };
    Window_Members.prototype.lineHeight = function () {
      return 30;
    };
    Window_Members.prototype.drawBackgroundRect = function (rect) {
      _super.prototype.drawBackgroundRect.call(this, rect);
      return;
      var sprite = this.getBgSprite(1, rect);
      p(sprite);
      sprite.x = rect.x;
      this._windowContentsBackSprite2.addChild(sprite);
    };
    Window_Members.prototype.drawMedal = function (actor, x, y) {
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
    Window_Members.prototype.drawSkillPoint = function (actor, x, y) {
      this.changeTextColor(ColorManager.normalColor());
      this.drawText(actor.skillPoint() + " pt", x, y, 120, "right");
    };
    Window_Members.prototype.drawSortieCount = function (actor, x, y) {
      this.changeTextColor(ColorManager.normalColor());
      var n = actor.getActorHistory().countBattle($gameSystem.day());
      this.drawText(TextManager.sortieCount, x, y, 110);
      this.drawText(TextManager.count.format(n), x, y, MEM_W, "right");
    };
    Window_Members.prototype.drawNikubenkiCount = function (actor, x, y) {
      this.changeTextColor(ColorManager.normalColor());
      var n = actor.getActorHistory().countNikubenki($gameSystem.day());
      this.drawText(TextManager.captiveDay, x, y, 80);
      this.drawText(TextManager.count.format(n), x, y, MEM_W, "right");
    };
    Window_Members.prototype.drawNakadashiCount = function (actor, x, y) {
      this.changeTextColor(ColorManager.normalColor());
      var n = actor.getActorHistory().countNakadashi($gameSystem.day());
      this.drawText(TextManager.nakadashi, x, y, 80);
      this.drawText(TextManager.count.format(n), x, y, MEM_W, "right");
    };
    Window_Members.prototype.drawSyusanCount = function (actor, x, y) {
      this.changeTextColor(ColorManager.normalColor());
      var n = actor.getActorHistory().countSyusan($gameSystem.day());
      this.drawText(TextManager.syusan, x, y, 80);
      this.drawText(TextManager.count.format(n), x, y, MEM_W, "right");
    };
    Window_Members.prototype.drawStatus = function (actor, x, y) {
      this.contents.fontSize = 14;
      var info = $gameParty.prisonInfo();
      var text = info.nikubenkiName(actor.actorId());
      if (text) {
        this.changeTextColor(ColorManager.textColor(10));
        this.drawText(text, x, y - 14, 100);
      }
      this.contents.fontSize = 22;
      if (this.containsBattleMember(actor)) {
        this.changeTextColor(ColorManager.textColor(6));
        this.drawText(TextManager.sortie, x, y + 6, 110, "left");
      } else {
        this.changeTextColor(ColorManager.normalColor());
        this.drawText(TextManager.canSortie, x, y + 6, 110, "left");
      }
    };
    Window_Members.prototype.containsBattleMember = function (actor) {
      for (var _i = 0, _a = $gameParty.battleMembers(); _i < _a.length; _i++) {
        var a = _a[_i];
        if (a.actorId() == actor.actorId()) {
          return true;
        }
      }
      return false;
    };
    Window_Members.prototype.placeBasicGauges = function (actor, x, y) {
      this.placeGauge(actor, "hp", x, y);
      this.placeGauge(actor, "mp", x, y + this.gaugeLineHeight());
    };
    Window_Members.prototype.placeGauge = function (actor, type, x, y) {
      var key = "actor%1-gauge-%2".format(actor.actorId(), type);
      var sprite = this.createInnerSprite(key, Sprite_Gauge);
      sprite.setup(actor, type);
      sprite.move(x, y);
      sprite.show();
    };
    Window_Members.prototype.createInnerSprite = function (key, spriteClass) {
      var dict = this._additionalSprites;
      if (dict[key]) {
        return dict[key];
      } else {
        var sprite = new spriteClass();
        dict[key] = sprite;
        this.addInnerChild(sprite);
        return sprite;
      }
    };
    Window_Members.prototype.gaugeLineHeight = function () {
      return 24;
    };
    Window_Members.prototype.drawLabel = function (label, x, y) {
      var baseTexture2 = Nore.getSystemBaseTexture("Battle");
      var rect = new Rectangle(0, 0, 48, 24);
      if (label == "HP") {
        rect.y = 24;
      }
      if (label == "MP") {
        rect.y = 48;
      }
      var texture = new PIXI.Texture(baseTexture2, rect);
      var sprite = new PIXI.Sprite(texture);
      sprite.x = x;
      sprite.y = y + 22;
      this._windowContentsSprite.addChild(sprite);
    };
    Window_Members.prototype.getBgSprite = function (index, rect) {
      var baseTexture2 = Nore.getSystemBaseTexture("back" + index);
      var texture = new PIXI.Texture(
        baseTexture2,
        new Rectangle(0, 0, rect.width, 480)
      );
      var sprite = new PIXI.Sprite(texture);
      return sprite;
    };
    Window_Members.prototype.setFormationMode = function () {};
    Window_Members.prototype.maxItems = function () {
      if (!this._dataList) {
        return 0;
      }
      return this._dataList.length;
    };
    Window_Members.prototype.maxCols = function () {
      return this.getActorIdList().length;
    };
    Window_Members.prototype.itemHeight = function () {
      return this.height - 30;
    };
    return Window_Members;
  })(Window_MembersBase);
  Nore.Window_Members = Window_Members;
  var Window_MembersBattle = /** @class */ (function (_super) {
    __extends(Window_MembersBattle, _super);
    function Window_MembersBattle() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Window_MembersBattle.prototype.initialize = function (rect) {
      _super.prototype.initialize.call(this, rect);
      this._additionalSprites = {};
    };
    Window_MembersBattle.prototype.refresh = function () {
      _super.prototype.refresh.call(this);
      this.contents.clear();
      this._windowContentsSprite.removeChildren();
      var actorList = $gameParty.battleMembers();
      var length = actorList.length;
      var ww = 134;
      for (var i = 0; i < length; i++) {
        var actor = actorList.shift();
        if (!actor) {
          break;
        }
        var xx = ww * i;
        var yy = 50;
        var rect = this.itemRect(i);
        this.drawActor(actor, rect.x, yy);
        //this.drawTachie(actor.actorId(), this._windowContentsSprite, xx, yy, rect, 0, 0.5);
      }
      this.drawLine(486 + 25);
    };
    Window_MembersBattle.prototype.drawActor = function (a, x, y) {
      var offset = 40;
      var tachieX = x + this.xPosByActor(a.actorId()) - offset;
      var actor = JsonEx.makeDeepCopy(a);
      var faceId = this.actorFaceId(actor);
      if (actor.getDefaultFaceId() > 1) {
        faceId = actor.getDefaultFaceId();
      }
      //p(actor.actorId() + ' ' + faceId);
      actor.setHoppeId(this.hoppeId(actor));
      var rect;
      if (this.maxCols() == 5) {
        rect = new Rectangle(x + 10, 0, 240, 490);
      } else {
        rect = new Rectangle(x + 10, 0, 200, 490);
        tachieX -= 20;
      }
      var yy = y + 432;
      var xx = x + 10;
      //this.drawStatus(actor, xx, yy);
      this.drawExp(actor, xx + 0, 4);
      //this.drawLevelUp(actor, xx + 0, 4 + 30);
      this.drawLevel(actor, xx + 0, yy);
      yy += 8;
      this.contents.fontSize = 22;
      this.drawActorName(actor, xx, yy + this.lineHeight() * 1);
      this.contents.fontSize = 20;
      //this.drawSortieCount(actor, xx, yy + this.lineHeight() * 2);
      //this.drawCaptiveCount(actor, xx, yy + this.lineHeight() * 3);
      //this.drawNakadashiCount(actor, xx, yy + this.lineHeight() * 4);
      this.placeBasicGauges(actor, xx, yy + this.lineHeight() * 2);
      //this.drawHp(actor, xx, yy + this.lineHeight() * 2);
      this.drawEquip(actor, xx, yy + this.lineHeight() * 3 + 28);
      this.drawTachieActor(
        actor,
        this._windowContentsSprite,
        tachieX,
        y + 40,
        rect,
        faceId,
        0.51
      );
    };
    Window_MembersBattle.prototype.drawExp = function (actor, x, y) {
      this.contents.fontSize = 20;
      var expNext = TextManager._expNext.format(TextManager._level);
      this.drawText(expNext, x + 5, y, 120, "left");
      this.drawText(this.expNextValue(actor), x, y, 190, "right");
    };
    Window_MembersBattle.prototype.drawLevelUp = function (actor, x, y) {
      this.drawText("LV " + actor.level, x, y, 120, "left");
      if (!actor.canLevelUp($gameParty.partyExp())) {
        return;
      }
      this.contents.fontSize = 20;
      this.changeTextColor(ColorManager.crisisColor());
      this.drawText("LV UP POSSIBLE", x + 65, y, 150, "left");
    };
    Window_MembersBattle.prototype.expNextValue = function (actor) {
      if (actor.isMaxLevel()) {
        return "-----";
      } else {
        return actor.nextRequiredExp();
      }
    };
    Window_MembersBattle.prototype.drawLevel = function (actor, x, y) {
      this.changeTextColor(ColorManager.normalColor());
      this.drawText("LV " + actor.level, x, y, 100, "left");
    };
    Window_MembersBattle.prototype.lineHeight = function () {
      return 30;
    };
    Window_MembersBattle.prototype.drawStatus = function (actor, x, y) {
      this.contents.fontSize = 22;
      if (actor.isFront()) {
        this.drawText(TextManager.front, x, y, 100, "left");
      } else {
        this.drawText(TextManager.back, x, y, 100, "left");
      }
    };
    Window_MembersBattle.prototype.placeBasicGauges = function (actor, x, y) {
      this.placeGauge(actor, Nore.SHIELD, x, y);
      this.placeGauge(actor, "hp", x, y + this.gaugeLineHeight() - 2);
    };
    Window_MembersBattle.prototype.placeGauge = function (actor, type, x, y) {
      var key = "actor%1-gauge-%2".format(actor.actorId(), type);
      var sprite = this.createInnerSprite(key, Sprite_Gauge);
      sprite.setup(actor, type);
      sprite.move(x, y);
      sprite.show();
    };
    Window_MembersBattle.prototype.createInnerSprite = function (
      key,
      spriteClass
    ) {
      var dict = this._additionalSprites;
      if (dict[key]) {
        return dict[key];
      } else {
        var sprite = new spriteClass();
        dict[key] = sprite;
        this.addInnerChild(sprite);
        return sprite;
      }
    };
    Window_MembersBattle.prototype.gaugeLineHeight = function () {
      return 24;
    };
    Window_MembersBattle.prototype.drawEquip = function (actor, x, y) {
      var i = -1;
      var interval = 52;
      var offset = 10;
      for (var _i = 0, _a = actor.battleEquips(); _i < _a.length; _i++) {
        var eq = _a[_i];
        var e = eq;
        i++;
        if (i == 3) {
          break;
        }
        if (!e) {
          continue;
        }
        if (e.lv() == 0) {
          continue;
        }
        var iconIndex = e.iconIndex();
        this.drawIcon(iconIndex, x + i * interval + offset, y);
        this.drawEquipLv(e, x + i * interval + offset, y);
        //this.drawText('LV ' + e.lv(), x + i * interval + offset, y + 28, 35, 'right');
        /*
                let label = '';
                let param = 0;
                if (e.hp() > 0) {
                    label = 'HP';
                    param = e.hp();
                }
                if (e.atk() > 0) {
                    label = 'ATK';
                    param = e.atk();
                }
                if (e.def() > 0) {
                    label = 'DEF';
                    param = e.def();
                }
                if (e.shield() > 0) {
                    label = 'SH';
                    param = e.shield();
                }
                this.drawText(label + '+' + param, x + i * interval + offset, y + 28, 35, 'right');
                */
      }
    };
    Window_MembersBattle.prototype.drawLabel = function (label, x, y) {
      var baseTexture2 = Nore.getSystemBaseTexture("Battle");
      var rect = new Rectangle(0, 0, 48, 24);
      if (label == "HP") {
        rect.y = 24;
      }
      if (label == "MP") {
        rect.y = 48;
      }
      var texture = new PIXI.Texture(baseTexture2, rect);
      var sprite = new PIXI.Sprite(texture);
      sprite.x = x;
      sprite.y = y + 22;
      this._windowContentsSprite.addChild(sprite);
    };
    Window_MembersBattle.prototype.setFormationMode = function () {};
    Window_MembersBattle.prototype.maxItems = function () {
      return $gameParty.battleMembers().length;
    };
    Window_MembersBattle.prototype.maxCols = function () {
      if ($gameParty.battleMembers().length == 6) {
        return 6;
      } else {
        return 5;
      }
    };
    Window_MembersBattle.prototype.itemHeight = function () {
      return this.height - 30;
    };
    Window_MembersBattle.prototype.getActorIdList = function () {
      var list = [];
      for (var _i = 0, _a = $gameParty.battleMembers(); _i < _a.length; _i++) {
        var a = _a[_i];
        list.push(a.actorId());
      }
      return list;
    };
    Window_MembersBattle.prototype.selectForItem = function (item) {
      var actor = $gameParty.menuActor();
      var action = new Game_Action(actor);
      action.setItemObject(item);
      this.setCursorFixed(false);
      this.setCursorAll(false);
      if (action.isForUser()) {
        if (DataManager.isSkill(item)) {
          this.setCursorFixed(true);
          this.forceSelect(actor.index());
        } else {
          this.selectLast();
        }
      } else if (action.isForAll()) {
        this.setCursorAll(true);
        this.forceSelect(0);
      } else {
        this.selectLast();
      }
    };
    return Window_MembersBattle;
  })(Window_MembersBase);
  Nore.Window_MembersBattle = Window_MembersBattle;
})(Nore || (Nore = {}));
