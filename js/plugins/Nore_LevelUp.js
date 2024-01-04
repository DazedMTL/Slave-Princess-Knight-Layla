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
/*:ja
 * @target MZ
 * @author ル
 *
 */
var Nore;
(function (Nore) {
  var BASE_LEFT = 400;
  BattleManager.gainExp = function () {
    var exp = this._rewards.exp;
    $gameParty.gainExp(exp);
  };
  var Scene_LevelUp = /** @class */ (function (_super) {
    __extends(Scene_LevelUp, _super);
    function Scene_LevelUp() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Scene_LevelUp.prototype.create = function () {
      _super.prototype.create.call(this);
      this.createRightTachie();
      this.createLevelUpWindow();
      this.createLevelUpSkillWindow();
      this.createExpWindow();
      this.createMsgWindow();
      this.createButtons();
      this.refresh();
    };
    Scene_LevelUp.prototype.createButtons = function () {
      this._leftButton = new Sprite_Button("pageup");
      this._leftButton.x = 330;
      this._leftButton.y = this.buttonY();
      this.addChild(this._leftButton);
      this._rightButton = new Sprite_Button("pagedown");
      this._rightButton.x = 840;
      this._rightButton.y = this.buttonY();
      this.addChild(this._rightButton);
    };
    Scene_LevelUp.prototype.buttonY = function () {
      return 70;
    };
    Scene_LevelUp.prototype.createExpWindow = function () {
      this._expWindow = new Window_Exp();
      this.addWindow(this._expWindow);
    };
    Scene_LevelUp.prototype.createRightTachie = function () {
      this._rightTachie = new Nore.Sprite_RightTachie2();
      this.addWindow(this._rightTachie);
    };
    Scene_LevelUp.prototype.createLevelUpWindow = function () {
      this._levelUpWindow = new Window_LevelUp();
      this._levelUpWindow.setHandler("ok", this.onOk.bind(this));
      this._levelUpWindow.setHandler("cancel", this.onCancel.bind(this));
      this._levelUpWindow.setHandler("pagedown", this.nextActor.bind(this));
      this._levelUpWindow.setHandler("pageup", this.previousActor.bind(this));
      this._levelUpWindow.activate();
      this.addWindow(this._levelUpWindow);
    };
    Scene_LevelUp.prototype.createLevelUpSkillWindow = function () {
      var r = new Rectangle(40, 210, 330, 430);
      this._levelUpSkillWindow = new Window_LevelUpSkill(r);
      this.addWindow(this._levelUpSkillWindow);
    };
    Scene_LevelUp.prototype.createMsgWindow = function () {
      this._msgWindow = new Nore.Window_Msg(206);
      this._msgWindow.setHandler("ok", this.onMsgOk.bind(this));
      this._msgWindow.deactivate();
      this.addChild(this._msgWindow);
      this._msgWindow.hide();
    };
    Scene_LevelUp.prototype.onCancel = function () {
      if (!$gameSwitches.value(67)) {
        $gameTemp.isCancelMenu = true;
      }
      this.popScene();
    };
    Scene_LevelUp.prototype.onMsgOk = function () {
      //this.popScene();
      this._msgWindow.deactivate();
      this._msgWindow.hide();
      this.refresh();
    };
    Scene_LevelUp.prototype.onOk = function () {
      if (this._levelUpWindow.index() == 1) {
        this.popScene();
        return;
      }
      if (!this._levelUpWindow.canLevelUp()) {
        SoundManager.playBuzzer();
        this._levelUpWindow.activate();
        return;
      }
      var skill = this._levelUpWindow.item();
      var actor = $gameParty.menuActor();
      $gameParty.levelUpActor(actor);
      SoundManager.playShop();
      if (skill) {
        this._msgWindow.setTexts([
          actor.name() + "のレベルが上がりました！",
          "新たなスキル" + skill.name,
          "を習得しました！",
        ]);
      } else {
        this._msgWindow.setText(actor.name() + "のレベルが上がりました！");
      }
      $gameTemp.isCancelMenu = true;
      this._msgWindow.show();
      this._msgWindow.activate();
      //this.popScene();
    };
    Scene_LevelUp.prototype.onActorChange = function () {
      _super.prototype.onActorChange.call(this);
      this.refresh();
    };
    Scene_LevelUp.prototype.refresh = function () {
      var actor = this.actor();
      this._rightTachie.setActorId(actor.actorId());
      this._levelUpWindow.setActor($gameParty.menuActor());
      this._levelUpSkillWindow.setActor($gameParty.menuActor());
      this._expWindow.setActor($gameParty.menuActor());
    };
    return Scene_LevelUp;
  })(Scene_MenuBase);
  Nore.Scene_LevelUp = Scene_LevelUp;
  var Window_Exp = /** @class */ (function (_super) {
    __extends(Window_Exp, _super);
    function Window_Exp() {
      return _super.call(this, new Rectangle(BASE_LEFT, 40, 430, 140)) || this;
    }
    Window_Exp.prototype.setActor = function (actor) {
      this._actor = actor;
      this.refresh();
    };
    Window_Exp.prototype.refresh = function () {
      this.contents.clear();
      this._windowContentsSprite.removeChildren();
      this.drawText(this._actor.name(), 10, 10, 200);
      this.drawText("LV " + this._actor.level, 150, 10, 200);
      var yy = 50;
      var exp = $gameParty.partyExp();
      var after = exp - this._actor.nextRequiredExp();
      this.drawText(
        TextManager.partyExp + " %1 → %2".format(exp, after),
        10,
        yy,
        300
      );
    };
    return Window_Exp;
  })(Window_Base);
  var Window_LevelUp = /** @class */ (function (_super) {
    __extends(Window_LevelUp, _super);
    function Window_LevelUp() {
      return _super.call(this, new Rectangle(BASE_LEFT, 210, 570, 490)) || this;
    }
    Window_LevelUp.prototype.makeItems = function () {
      this._data = this._actor.nextLevelSkills();
    };
    Window_LevelUp.prototype.item = function () {
      var skill = this._data[0];
      return skill;
    };
    Window_LevelUp.prototype.setActor = function (actor) {
      this._actor = actor;
      this.makeItems();
      this.refresh();
      this.select(0);
      this.activate();
    };
    Window_LevelUp.prototype.refresh = function () {
      this.contents.clear();
      this._windowContentsSprite.removeChildren();
      _super.prototype.refresh.call(this);
      this.resetFontSettings();
      this.contents.fontSize = 26;
      var xx = 10;
      if (this.canLevelUp()) {
        this.drawText("レベルアップ可能です。", xx, 0, 400);
      } else {
        this.drawText("レベルアップできません。", xx, 0, 400);
      }
      //this.drawText('習得するスキルを選択してください。', xx, 38, 400);
      this.contents.fontSize = 22;
      this.changeTextColor(ColorManager.systemColor());
      this.drawText("レベルアップによるボーナス", xx, 38 * 2, 400);
      this.changeTextColor(ColorManager.powerUpColor());
      var bonusArmorList = this._actor.levelUpBonusArmorList();
      var offsetY = 0;
      for (
        var _i = 0, bonusArmorList_1 = bonusArmorList;
        _i < bonusArmorList_1.length;
        _i++
      ) {
        var bonusArmor = bonusArmorList_1[_i];
        this.drawText(bonusArmor.name, xx + 30, 38 * 3 + offsetY, 400);
        offsetY += 30;
      }
      this.drawCurrenBonus();
      this.changeTextColor(ColorManager.systemColor());
      this.drawText("レベルアップで習得するスキル", xx, 38 * 4 + 40, 400);
      this.drawSkill();
      //this.drawText($dataArmors[98].name, 120, 38 * 3, 400);
    };
    Window_LevelUp.prototype.canLevelUp = function () {
      return $gameParty.partyExp() >= this._actor.nextRequiredExp();
    };
    Window_LevelUp.prototype.drawCurrenBonus = function () {};
    Window_LevelUp.prototype.bonusArmor = function (label) {
      switch (label) {
        case "hp":
          return $dataArmors[91];
        case "sh":
          return $dataArmors[92];
        case "atk":
          return $dataArmors[93];
        case "def":
          return $dataArmors[94];
        case "mgc":
          return $dataArmors[95];
      }
    };
    Window_LevelUp.prototype.maxItems = function () {
      return 2;
    };
    Window_LevelUp.prototype.maxCols = function () {
      return 1;
    };
    Window_LevelUp.prototype.itemHeight = function () {
      return 44;
    };
    Window_LevelUp.prototype.drawSkill = function () {
      var skill = this._data[0];
      p(skill);
      if (!skill) {
        return;
      }
      var rect = new Rectangle(20, 220, 400, 130);
      this.contents.fontSize = 22;
      var item = new Nore.SkillItem(this._actor, skill, 0);
      this.drawBg(skill, rect);
      this.drawIcon(skill.iconIndex, rect.x + 5, rect.y + 5);
      if (item.isPassive()) {
        this.changeTextColor(ColorManager.passiveColor());
      } else if (item.isOugi()) {
        this.changeTextColor(ColorManager.ougiColor());
      } else {
        this.changeTextColor(ColorManager.normalColor());
      }
      this.contents.fontSize = 26;
      this.drawText(skill.name, rect.x + 38, rect.y + 5, rect.width);
      this.changeTextColor(ColorManager.normalColor());
      var desc = Nore.getSkillDescription(skill);
      this.drawTextEx(
        desc,
        rect.x + 38,
        rect.y + 5 + this.lineHeight(),
        rect.width
      );
    };
    Window_LevelUp.prototype.drawBg = function (skill, rect) {
      var lv = parseInt(skill.meta["lv"]);
      if (lv == 1) {
        return;
      }
      this.drawIcon(2243 + lv, rect.x + 5, rect.y + 5);
      this.contents.fontSize = 30;
      if (lv == 2) {
        this.changeTextColor(ColorManager.rareColor());
        this.contents.fillRect(
          rect.x,
          rect.y,
          rect.width,
          rect.height,
          "#4080c055"
        );
        this.drawText("RARE", rect.x + 378, rect.y + 5, rect.width);
      } else if (lv == 3) {
        this.changeTextColor(ColorManager.epicColor());
        this.contents.fillRect(
          rect.x,
          rect.y,
          rect.width,
          rect.height,
          "#a060e055"
        );
        this.drawText("EPIC", rect.x + 378, rect.y + 5, rect.width);
      }
    };
    Window_LevelUp.prototype.resetFontSettings = function () {
      _super.prototype.resetFontSettings.call(this);
      this.contents.fontSize = 18;
    };
    Window_LevelUp.prototype.drawItem = function (index) {
      var rect = this.itemRect(index);
      if (index == 0 && !this.canLevelUp()) {
        this.changePaintOpacity(false);
      } else {
        this.changePaintOpacity(true);
      }
      this.changeTextColor(ColorManager.normalColor());
      this.contents.fontSize = 22;
      var text = index == 0 ? "レベルアップする" : "まだしない";
      this.drawText(text, rect.x + 20, rect.y, rect.width, "left");
    };
    Window_LevelUp.prototype.itemRect = function (index) {
      var r = _super.prototype.itemRect.call(this, index);
      r.y += 340;
      return r;
    };
    return Window_LevelUp;
  })(Window_Selectable);
  var levelBonusMap = {
    1: ["atk", "hp", "sh", "atk", "def", "sh", "atk", "atk", "hp", "sh", "atk"],
    2: ["atk", "hp", "sh", "atk", "hp", "sh", "atk", "atk", "hp", "sh", "atk"],
    3: ["atk", "hp", "sh", "atk", "hp", "def", "atk", "atk", "hp", "sh", "atk"],
    4: ["atk", "hp", "sh", "atk", "hp", "sh", "atk", "atk", "hp", "sh", "atk"],
    5: ["atk", "hp", "sh", "atk", "hp", "sh", "atk", "atk", "hp", "sh", "atk"],
    6: ["atk", "hp", "sh", "atk", "hp", "sh", "atk", "atk", "hp", "sh", "atk"],
    7: ["atk", "hp", "sh", "atk", "hp", "sh", "atk", "atk", "hp", "sh", "atk"],
    8: ["atk", "hp", "sh", "atk", "hp", "sh", "atk", "atk", "hp", "sh", "atk"],
    9: ["atk", "hp", "sh", "atk", "hp", "sh", "atk", "atk", "hp", "sh", "atk"],
  };
  var Window_LevelUpSkill = /** @class */ (function (_super) {
    __extends(Window_LevelUpSkill, _super);
    function Window_LevelUpSkill() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Window_LevelUpSkill.prototype.setActor = function (actor) {
      this._actor = actor;
      this.refresh();
    };
    Window_LevelUpSkill.prototype.refresh = function () {
      this.makeSkills();
      this.contents.clear();
      this._windowContentsSprite.removeChildren();
      _super.prototype.refresh.call(this);
      this.selectNext();
      this.drawTitle();
    };
    Window_LevelUpSkill.prototype.selectNext = function () {
      this.select(this._actor.level);
    };
    Window_LevelUpSkill.prototype.drawTitle = function () {
      this.resetTextColor();
      this.drawText("習得スキルリスト", 0, 0, 260, "center");
    };
    Window_LevelUpSkill.prototype.makeSkills = function () {
      this._data = [];
      if (!this._actor) {
        return;
      }
      var skills = this._actor.allLevelSkills();
      for (var i = 0; i < skills.length; i++) {
        var skill = skills[i];
        var learnLv = parseInt(skill.meta["learnLv"]);
        this._data[learnLv] = skill;
      }
    };
    Window_LevelUpSkill.prototype.maxItems = function () {
      return 8;
    };
    Window_LevelUpSkill.prototype.maxCols = function () {
      return 1;
    };
    Window_LevelUpSkill.prototype.drawItem = function (index) {
      this.contents.textColor = ColorManager.systemColor();
      this.changePaintOpacity(this._actor.level <= index);
      var rect = this.itemRect(index);
      this.drawText("Lv " + (index + 1), rect.x, rect.y, 40, "left");
      var skill = this._data[index + 1];
      if (!skill) {
        return;
      }
      if ($skillManager.isPassive(skill)) {
        this.changeTextColor(ColorManager.passiveColor());
      } else if ($skillManager.isOugi(skill)) {
        this.changeTextColor(ColorManager.ougiColor());
      } else {
        this.resetTextColor();
      }
      this.drawIcon(skill.iconIndex, rect.x + 57, rect.y + 1);
      this.drawText(skill.name, rect.x + 90, rect.y, 180, "left");
    };
    Window_LevelUpSkill.prototype.itemRect = function (index) {
      var rect = _super.prototype.itemRect.call(this, index);
      rect.y += 40;
      return rect;
    };
    return Window_LevelUpSkill;
  })(Window_Selectable);
})(Nore || (Nore = {}));
