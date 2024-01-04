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
 * @command addMedal
 * @text 勲章獲得
 * @des 勲章獲得
 * @arg medalId
 * @type number
 * @text medalId
 * @desc medalId
 */
var $gameMedals = null;
var MEDAL_ETYPE_ID = 5;
var Game_Medals = /** @class */ (function () {
  function Game_Medals() {
    this._medalMap = {};
    this._medalParamMap = {};
  }
  Game_Medals.prototype.isMedal = function (item) {
    if (!DataManager.isArmor(item)) {
      return false;
    }
    var armor = item;
    return armor.etypeId == MEDAL_ETYPE_ID;
  };
  Game_Medals.prototype.armorList = function () {
    var ret = [];
    //for (var id in this._medalMap) {
    for (var i = 150; i < 450; i++) {
      var item = $dataArmors[i];
      if (item.etypeId == 5 && !item.meta["noDisplay"]) {
        ret.push(item);
      }
    }
    ret = ret.sort(function (a, b) {
      var orderA = a.id;
      var orderB = b.id;
      if (a.meta["order"]) {
        orderA = parseInt(a.meta["order"]);
      }
      if (b.meta["order"]) {
        orderB = parseInt(b.meta["order"]);
      }
      if (orderA == orderB) {
        return b.id - b.id;
      }
      return orderA - orderB;
    });
    return ret;
  };
  Game_Medals.prototype.addMedal = function (medalId) {
    if (this._medalMap[medalId]) {
      return;
    }
    if ($gameSwitches.value(999)) {
      return;
    }
    console.log("addMedal:" + medalId);
    this._medalMap[medalId] = true;
    var newMedal = $dataArmors[medalId];
    var isShowLog = $gameSwitches.value(1);
    $gameParty.gainItem(new Armor(newMedal, false, []), 1, false);
    $gameTemp.addItemLog(newMedal);
    var skillPoint = parseInt(newMedal.meta["skillPoint"]);
    if (skillPoint > 0) {
      $gameParty.gainSkillPoint(skillPoint);
    }
    this.onMedal();
    return true;
  };
  Game_Medals.prototype.hasMedal = function (id) {
    return this._medalMap[id] == true;
  };
  Game_Medals.prototype.getProgress = function (medalId) {
    if (this._medalMap[medalId]) {
      return 100;
    }
    var info = MEDAL_IFNO[medalId];
    if (!info) {
      return 0;
    }
    //var beforeValue = this.findBefore(info[0], info[1]);
    var beforeValue = 0;
    return this.calcProgress(info[0], info[1], beforeValue);
  };
  Game_Medals.prototype.findBefore = function (name, value) {
    var max = 0;
    for (var i in MEDAL_IFNO) {
      var info = MEDAL_IFNO[i];
      if (info[0] != name) {
        continue;
      }
      var v = info[1];
      if (v < value) {
        if (max < v) {
          max = v;
        }
      }
    }
    return max;
  };
  Game_Medals.prototype.calcProgress = function (type, max, beforeValue) {
    var n = this._updateParam(type, 0);
    var per = Math.floor(((n - beforeValue) * 100) / (max - beforeValue));
    if (per > 100) {
      per = 100;
    }
    if (per < 0) {
      per = 0;
    }
    return per;
  };
  Game_Medals.prototype.checkGet = function (type, notDisplay) {
    for (var key in MEDAL_IFNO) {
      var info = MEDAL_IFNO[key];
      if (info[0] != type) {
        continue;
      }
      var n = parseInt(key);
      if (this.getProgress(n) >= 100) {
        this.addMedal(n, notDisplay);
      }
    }
  };
  Game_Medals.prototype.onSkillActor = function (actor, skill) {
    this._updateParam("skill" + actor.actorId(), 1);
    if (skill.id >= 1151 && skill.id <= 1153) {
      this._updateParam("guard", 1);
    }
  };
  Game_Medals.prototype.onEnemy = function (actor) {
    this._updateParam("enemy" + Math.max($gameVariables.value(1), 1), 1);
  };
  Game_Medals.prototype.onMikiri = function () {
    this._updateParam("mikiri", 1);
  };
  Game_Medals.prototype.onGun = function (actor) {
    this._updateParam("gun", 1);
  };
  Game_Medals.prototype.onMedal = function () {
    this._updateParam("medal", 1);
  };
  Game_Medals.prototype.onLevel = function () {
    this._updateParam("level", 1);
  };
  Game_Medals.prototype.onTreasure = function () {
    this._updateParam("treasure", 1);
  };
  Game_Medals.prototype.onBreak = function () {
    this._updateParam("break", 1);
  };
  Game_Medals.prototype.onCritical = function (id) {
    if (id > 1300) {
      this._updateParam("criticalGun", 1);
    } else {
      this._updateParam("critical", 1);
    }
  };
  Game_Medals.prototype.onDisposeItem = function () {
    this._updateParam("disposeItem", 1);
  };
  Game_Medals.prototype.onAutoBattle = function () {
    this._updateParam("autoBattle", 1);
  };
  Game_Medals.prototype.onSkill = function (skill, actor) {
    switch (skill.id) {
      case 1:
      case 3:
      case 4:
      case 5:
        this._updateParam("normalAttack", 1);
        return;
    }
    if ($gameTroop.turnCount() == 0) {
      this._updateParam("firstTurnSkill", 1);
    }
    if (skill.hitType === Game_Action.HITTYPE_MAGICAL) {
      this._updateParam("magic", 1);
    }
    //this.onSkillActor(actor);
    switch (skill.id) {
      case 1266:
        this._updateParam("finishBlow", 1);
        break;
    }
  };
  Game_Medals.prototype.onFloorDown = function () {
    if ($gameSwitches.value(524)) {
      // 学園長敗北後
      this._updateParam("floorDown" + Math.max($gameVariables.value(1), 1), 1);
    }
  };
  Game_Medals.prototype.onDungeon = function () {
    this._updateParam("departure", 1);
  };
  Game_Medals.prototype.onRape = function () {
    this._updateParam("rape", 1);
  };
  Game_Medals.prototype.onVictory = function () {
    this._updateParam("victory", 1);
  };
  Game_Medals.prototype.onDefeat = function () {
    this._updateParam("defeat", 1);
  };
  Game_Medals.prototype.onNoDamage = function () {
    this._updateParam("nodamage", 1);
  };
  Game_Medals.prototype.onWeaponPowerUp = function () {
    this._updateParam("weaponPowerUp", 1);
  };
  Game_Medals.prototype.onElite = function () {
    this._updateParam("elite", 1);
  };
  Game_Medals.prototype.onKubihane = function () {
    this._updateParam("kubihane", 1);
  };
  Game_Medals.prototype.onStep = function () {
    this._updateParam("step", 1);
  };
  Game_Medals.prototype.onExp = function (n) {
    if (n <= 0) {
      return;
    }
    this._updateParam("exp", n);
  };
  Game_Medals.prototype.onGold = function (n) {
    if (n <= 0) {
      return;
    }
    this._updateParam("gold", n);
  };
  Game_Medals.prototype.onUseItem = function (itemId) {
    if (itemId <= 0) {
      return;
    }
    if (itemId == 21) {
      // 魔法のロープ
      return;
    }
    if (itemId >= 23 && itemId <= 27) {
      // 巻物
      return;
    }
    this._updateParam("item" + itemId, 1);
    this._updateParam("item", 1);
  };
  Game_Medals.prototype.onCrystal = function (n) {
    this._updateParam("crystal", n);
  };
  Game_Medals.prototype.onCounterAttack = function () {};
  Game_Medals.prototype.onLethalAttack = function (n) {
    if (n <= 0) {
      return;
    }
    this._updateParam("lethal", n);
    if (n >= 2) {
      this.addMedal(696);
    }
    if (n >= 3) {
      this.addMedal(697);
    }
    if (n >= 4) {
      this.addMedal(698);
    }
  };
  Game_Medals.prototype.onTsuigeki = function () {
    this._updateParam("tsuigeki", 1);
  };
  Game_Medals.prototype.onDeath = function () {
    this._updateParam("death", 1);
  };
  Game_Medals.prototype.onGratia = function () {
    this._updateParam("gratia", 1);
  };
  Game_Medals.prototype.onDamage = function (value, skill) {
    this._updateParam("damage", value);
    this._updateMaxParam("maxDamage", value);
    if (skill.hitType === Game_Action.HITTYPE_MAGICAL) {
      this._updateMaxParam("magicDamage", value);
    }
    /*if (value >= 50) {
            this.addMedal(560);
        }
        if (value >= 80) {
            this.addMedal(561);
        }
        if (value >= 120) {
            this.addMedal(562);
        }*/
  };
  Game_Medals.prototype.onShieldBreak = function () {
    this._updateParam("shieldZero", 1);
  };
  Game_Medals.prototype.onFloorDamage = function () {
    this._updateParam("floorDamage", 1);
  };
  Game_Medals.prototype.onFireDeath = function () {
    this._updateParam("fireDeath", 1);
  };
  Game_Medals.prototype.onFood = function () {
    this._updateParam("food", 1);
  };
  Game_Medals.prototype.onRare = function () {
    this._updateParam("rare", 1);
  };
  Game_Medals.prototype.onNotRare = function () {
    this._updateParam("notRare", 1);
  };
  Game_Medals.prototype.onAttack = function () {
    this._updateParam("attack", 1);
  };
  Game_Medals.prototype.onH = function () {
    this._updateParam("hScene", 1);
  };
  Game_Medals.prototype.onRevive = function () {
    this._updateParam("revive", 1);
  };
  Game_Medals.prototype.onOverkill = function (overkill) {
    this._updateMaxParam("overkill", overkill);
  };
  Game_Medals.prototype._updateParam = function (name, plus) {
    var map = this._medalParamMap;
    map[name] = map[name] || 0;
    var before = map[name];
    map[name] += plus;
    if (plus > 0) {
      var medalId = this.findNext(name, before);
      var notDisplay = $medalUpdate.onUpdate(
        medalId,
        name,
        before,
        plus,
        this.findBefore(name, before + plus)
      );
      this.checkGet(name, notDisplay);
    }
    return map[name];
  };
  Game_Medals.prototype._updateMaxParam = function (name, newValue) {
    var map = this._medalParamMap;
    map[name] = map[name] || 0;
    var before = map[name];
    if (map[name] > newValue) {
      return map[name];
    }
    var lastValue = map[name];
    map[name] = newValue;
    var medalId = this.findNext(name, before);
    var notDisplay = $medalUpdate.onUpdate(
      medalId,
      name,
      before,
      newValue - lastValue,
      0
    );
    this.checkGet(name, notDisplay);
    return map[name];
  };
  Game_Medals.prototype.findNext = function (name, value) {
    var min = 99999;
    var medalId;
    for (var i in MEDAL_IFNO) {
      var info = MEDAL_IFNO[i];
      if (info[0] != name) {
        continue;
      }
      var v = info[1];
      if (v > value) {
        if (min > v) {
          min = v;
          medalId = i;
        }
      }
    }
    return medalId;
  };
  return Game_Medals;
})();
var Nore;
(function (Nore) {
  var pluginName = "Nore_Medals";
  PluginManager.registerCommand(pluginName, "addMedal", function (args) {
    var medalId = args.medalId;
    $gameMedals.addMedal(medalId);
  });
  var DataManager_createGameObjects = DataManager.createGameObjects;
  DataManager.createGameObjects = function () {
    DataManager_createGameObjects.call(this);
    $gameMedals = new Game_Medals();
  };
  var _DataManager_extractSaveContents = DataManager.extractSaveContents;
  DataManager.extractSaveContents = function (contents) {
    _DataManager_extractSaveContents.call(this, contents);
    $gameMedals = contents.medals;
  };
  var _DataManager_makeSaveContents = DataManager.makeSaveContents;
  DataManager.makeSaveContents = function () {
    var contents = _DataManager_makeSaveContents.call(this);
    contents.medals = $gameMedals;
    return contents;
  };
  var Scene_Medal = /** @class */ (function (_super) {
    __extends(Scene_Medal, _super);
    function Scene_Medal() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Scene_Medal.prototype.create = function () {
      _super.prototype.create.call(this);
      this.createHelpWindow();
      this.createMedalWindow();
    };
    Scene_Medal.prototype.createHelpWindow = function () {
      var rect = this.helpWindowRect();
      rect.y = 0;
      this._helpWindow = new Window_Help(rect);
      this.addWindow(this._helpWindow);
    };
    Scene_Medal.prototype.createMedalWindow = function () {
      var y = this._helpWindow.height;
      var r = new Rectangle(0, y, Graphics.boxWidth, Graphics.boxHeight - y);
      this._medalWindow = new Window_Medal(r);
      this.addWindow(this._medalWindow);
      this._medalWindow.activate();
      this._medalWindow.refresh();
      this._medalWindow.setHandler("change", this.onChange.bind(this));
      this._medalWindow.setHandler("cancel", this.popScene.bind(this));
      this._medalWindow.select(0);
    };
    Scene_Medal.prototype.onChange = function () {
      var item = this._medalWindow.item();
      var hint = item.meta["hintId"];
      if ($gameMedals.hasMedal(item.id)) {
        this._helpWindow.setText(getMedalDescription(item));
        /*} else if (hint && $gameMedals.hasMedal(hint)) {
                    if (item.meta['hidden'] && ! $gameSwitches.value(123)) {
                        this._helpWindow.setText('？？？');
                    } else {
                        this._helpWindow.setText(getMedalHintDescription(item));
                    }*/
      } else {
        this._helpWindow.setText(getMedalDescription(item));
        //            this._helpWindow.setText('？？？');
      }
    };
    return Scene_Medal;
  })(Scene_MenuBase);
  Nore.Scene_Medal = Scene_Medal;
  var Window_Medal = /** @class */ (function (_super) {
    __extends(Window_Medal, _super);
    function Window_Medal() {
      var _this = (_super !== null && _super.apply(this, arguments)) || this;
      _this._armorList = [];
      return _this;
    }
    Window_Medal.prototype.refresh = function () {
      this.makeItems();
      _super.prototype.refresh.call(this);
    };
    Window_Medal.prototype.makeItems = function () {
      this._armorList = $gameMedals.armorList();
      this._armorList = this._armorList.sort(function (a, b) {
        var orderA = a.meta["order"] ? a.meta["order"] : a.id;
        var orderB = b.meta["order"] ? b.meta["order"] : b.id;
        return orderA - orderB;
      });
    };
    Window_Medal.prototype.maxItems = function () {
      return this._armorList.length;
    };
    Window_Medal.prototype.maxCols = function () {
      return 2;
    };
    Window_Medal.prototype.lineHeight = function () {
      return 48;
    };
    Window_Medal.prototype.drawItem = function (index) {
      var item = this._armorList[index];
      if (item) {
        var rect = this.itemRect(index);
        rect.width -= 20;
        var enabled = this.isEnabled(item);
        this.changePaintOpacity(enabled);
        this.contents.fontSize = 28;
        if (enabled) {
          this.drawItemName(item, rect.x + 4, rect.y, rect.width);
        } else {
          this.drawItemName2(item, rect.x, rect.y);
          this.drawProgress(item, rect.x + rect.width - 70, rect.y + 12);
        }
        this.changePaintOpacity(true);
      }
    };
    /*itemRect(index) {
            var rect = new Rectangle();
            var maxCols = this.maxCols();
            rect.width = this.itemWidth();
            rect.height = this.itemHeight();
            rect.x = index % maxCols * (rect.width + this.padding()) - this._scrollX + 20;
            rect.y = Math.floor(index / maxCols) * rect.height - this._scrollY;
            return rect;
        }*/
    Window_Medal.prototype.isEnabled = function (item) {
      return $gameMedals.hasMedal(item.id);
    };
    Window_Medal.prototype.item = function () {
      return this._armorList[this._index];
    };
    Window_Medal.prototype.drawItemName2 = function (item, x, y) {
      var width = 382;
      if (item) {
        var iconBoxWidth = this.lineHeight();
        var padding = (iconBoxWidth - Window_Base._iconWidth) / 2;
        this.resetTextColor();
        this.drawIcon(item.iconIndex, x + 4, y + 4);
        //this.drawIcon2(item, x, y, width)
        var name = "";
        for (var i = 0; i < item.name.length; i++) {
          name += "？";
        }
        this.drawText(name, x + iconBoxWidth - 8, y, width - iconBoxWidth);
      }
    };
    Window_Medal.prototype.drawProgress = function (item, x, y) {
      var progress = $gameMedals.getProgress(item.id);
      var color1 = ColorManager.hpGaugeColor1();
      var color2 = ColorManager.hpGaugeColor2();
      if (progress >= 100) {
        color1 = color2 = ColorManager.textColor(24);
      }
      var xx = 52;
      //this.drawGauge(x + xx, y - 10, 370, progress / 100, color1, color2);
      this.contents.fontSize = 20;
      this.drawText("" + progress + "%", x, y, 50, "right");
    };
    return Window_Medal;
  })(Window_Selectable);
})(Nore || (Nore = {}));
