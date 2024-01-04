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
  var STATE_TYPE;
  (function (STATE_TYPE) {
    STATE_TYPE["damageCut"] = "damageCut";
    STATE_TYPE["damageUp"] = "damageUp";
    STATE_TYPE["counter"] = "counter";
  })((STATE_TYPE = Nore.STATE_TYPE || (Nore.STATE_TYPE = {})));
  var ARMOR_TYPE;
  (function (ARMOR_TYPE) {
    ARMOR_TYPE["damageUpLevel"] = "damageUpLevel";
    ARMOR_TYPE["requiredExpDown"] = "requiredExpDown";
  })((ARMOR_TYPE = Nore.ARMOR_TYPE || (Nore.ARMOR_TYPE = {})));
  Game_Battler.prototype.countSkill = function (type) {
    return 0;
  };
  var _Game_Action2_prototype_applyItemUserEffect =
    Game_Action2.prototype.applyItemUserEffect;
  Game_Action2.prototype.applyItemUserEffect = function (target) {
    _Game_Action2_prototype_applyItemUserEffect.call(this, target);
    if (this.item().meta["addState"]) {
      var stateId = Math.trunc(this.item().meta["addState"]);
      var subject = this.subject();
      subject.addState(stateId, 1);
    }
    if (
      this.item().meta[StateMeta.renkan] &&
      target.currentAction() &&
      target.currentAction().remainTurn() > 1
    ) {
      target.currentAction().renkan(1);
      target.result().renkan = true;
      target.result().success = true;
    }
  };
  /*const _Game_BattlerBase_prototype_addNewState = Game_BattlerBase.prototype.addNewState;
    Game_BattlerBase.prototype.addNewState = function(stateId, turns) {
        _Game_BattlerBase_prototype_addNewState.call(this, stateId);
        const state = $dataStates[stateId];
        if (state.meta['provoke']) {
            for (const e of $gameTroop.aliveMembers()) {
                const action = e.currentAction();
                if (action._targets.length == 0) {
                    action._targets[0] = this;
                }
            }
        }
    }*/
  Window_BattleLog.prototype.displaySpecialEffect = function (
    action,
    subject,
    target
  ) {
    if (target.result().provoke) {
    }
  };
  // FinishBlow
  BattleManager.invokeFinishBlow = function (subject, target) {
    //p('invokeFinishBlow')
    var skillId = 1266;
    var action = new Game_Action2(subject);
    action.setSkill(skillId);
    //this._logWindow.startAction(subject, action, [target]);
    this._logWindow.reserveAction(action, subject, target);
    //action.apply(target);
    //this._logWindow.displayActionResults(action, subject, target);
  };
  // Melting
  BattleManager.invokeMelting = function (subject, target) {
    //p('invokeMelting')
    var skillId = 18;
    var action = new Game_Action2(subject);
    action.setSkill(skillId);
    this._logWindow.reserveAction(action, subject, target);
    //        action.apply(target);
    //this._logWindow.displayActionResults(action, subject, target);
  };
  // Bleeding
  BattleManager.invokeBleeding = function (subject, target) {
    //p('invokeBleeding')
    var skillId = 21;
    var action = new Game_Action2(target);
    action.setSkill(skillId);
    this._logWindow.reserveAction(action, subject, target);
  };
  // Toge
  BattleManager.invokeToge = function (subject, target) {
    //p('invokeToge')
    var skillId = 164;
    var action = new Game_Action2(subject);
    action.setSkill(skillId);
    this._logWindow.reserveAction(action, subject, target);
  };
  // SuddenStrike
  BattleManager.checkInvokeSuddenStrike = function (subject, target, isDamage) {
    if (subject.isActor() == target.isActor()) {
      return;
    }
    if (!isDamage) {
      return;
    }
    if (!target.isActor()) {
      return;
    }
    if (!target.result().missed) {
      return;
    }
    if (target.result().barrier) {
      // 聖なる障壁は無効
      return;
    }
    if (!$gameParty.hasSkillMeta(SkillMeta.suddenStrike)) {
      return;
    }
    var actor = $gameActors.actor(10);
    var skillId = 23;
    var action = new Game_Action2(actor);
    action.setSkill(skillId);
    this._logWindow.reserveAction(action, actor, subject);
    if (actor.hasStateMeta(StateMeta.kaihiBunsin)) {
      actor.minusStateTurns(StateId.KAIHI_BUNSIN, 1);
      if (!actor.hasStateMeta(StateMeta.kaihiBunsin)) {
        actor.addState(StateId.MIKIRI, 1);
        actor.initKaihiBunshin();
      }
    }
  };
  // DeathAgony
  BattleManager.invokeDeathAgony = function (subject) {
    p("invokeDeathAgony");
    if (subject.stun() >= subject.maxStun()) {
      p("stun");
      var action2_1 = new Game_Action2(subject);
      action2_1.setSkill(22);
      this._logWindow.reserveAction(action2_1, subject, subject);
      return;
    }
    if (!subject.currentAction()) {
      var action2_2 = new Game_Action2(subject);
      action2_2.setSkill(22);
      this._logWindow.reserveAction(action2_2, subject, subject);
      return;
    }
    //target.removeState(target.deathStateId());
    //target.gainHp(1)
    var action = new Game_Action2(subject);
    action.setSkill(19);
    this._logWindow.reserveAction(action, subject, subject);
    var targets = subject.currentAction()._targets;
    for (var _i = 0, targets_1 = targets; _i < targets_1.length; _i++) {
      var target = targets_1[_i];
      this._logWindow.reserveAction(subject.currentAction(), subject, target);
    }
    var action2 = new Game_Action2(subject);
    action2.setSkill(22);
    this._logWindow.reserveAction(action2, subject, subject);
  };
  // 戦闘終了時SP回復
  var _Game_Actor2_prototype_onBattleEnd = Game_Actor2.prototype.onBattleEnd;
  Game_Actor2.prototype.onBattleEnd = function () {
    _Game_Actor2_prototype_onBattleEnd.call(this);
  };
  var RARE_TYPE;
  (function (RARE_TYPE) {
    RARE_TYPE[(RARE_TYPE["NORMAL"] = 0)] = "NORMAL";
    RARE_TYPE[(RARE_TYPE["RARE"] = 1)] = "RARE";
    RARE_TYPE[(RARE_TYPE["EPIC"] = 2)] = "EPIC";
  })(RARE_TYPE || (RARE_TYPE = {}));
  var LerningSkill = /** @class */ (function () {
    function LerningSkill(actorId) {
      this._allSkillIds = [];
      this._actorId = actorId;
      this.choiceData();
    }
    LerningSkill.prototype.actor = function () {
      return $gameActors.actor(this._actorId);
    };
    LerningSkill.prototype.choiceData = function () {
      this._allSkillIds = [];
      var start = this._actorId * 100 + 1001;
      var end = start + 100;
      for (var i = start; i < end; i++) {
        var skill = $dataSkills[i];
        if (!skill) {
          continue;
        }
        if (skill.name.includes("没")) {
          continue;
        }
        if (this.isMatch(skill)) {
          this.addSkill(skill);
        }
      }
    };
    LerningSkill.prototype.isMatch = function (skill) {
      var actor = this.actor();
      if (skill.meta["priceType"] == "F") {
        return false;
      }
      if (skill.meta["lv"] == null) {
        return false;
      }
      if (skill.meta["baseSkill"]) {
        return false;
      }
      var lv = Math.trunc(skill.meta["lv"]);
      if (actor.isLearnedSkill(skill.id)) {
        return false;
      }
      if (lv == 1) {
        return true;
      }
      return false; //actor.isLearnedSkill(skill.id - 1);
    };
    LerningSkill.prototype.addSkill = function (skill) {
      this._allSkillIds.push(skill.id);
    };
    LerningSkill.prototype.ramdomThreeSkills = function () {
      var list = Nore.shuffle(this._allSkillIds);
      var result = [];
      for (var i = 0; i < 3; i++) {
        if (list.length == 0) {
          break;
        }
        var id = list.pop();
        result.push(this.changeRare(id));
      }
      return result;
    };
    LerningSkill.prototype.changeRare = function (id) {
      switch (this.choiseRate()) {
        case RARE_TYPE.NORMAL:
          return id;
        case RARE_TYPE.RARE:
          return id + 1;
        case RARE_TYPE.EPIC:
          return id + 2;
      }
    };
    LerningSkill.prototype.choiseRate = function () {
      var dice = Math.randomInt(100);
      if (dice >= 90) {
        return RARE_TYPE.EPIC;
      }
      if (dice >= 60) {
        return RARE_TYPE.RARE;
      }
      return RARE_TYPE.NORMAL;
    };
    return LerningSkill;
  })();
  Nore.LerningSkill = LerningSkill;
  var Scene_Skill2 = /** @class */ (function (_super) {
    __extends(Scene_Skill2, _super);
    function Scene_Skill2() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Scene_Skill2.prototype.create = function () {
      Scene_ItemBase.prototype.create.call(this);
      this.createHelpWindow();
      //this.createSkillTypeWindow();
      this.createStatusWindow();
      this.createItemWindow();
      this.createActorWindow();
    };
    Scene_Skill2.prototype.statusWindowRect = function () {
      var ww = Graphics.boxWidth - this.mainCommandWidth();
      var wh = 160;
      var wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;
      var wy = this.mainAreaTop();
      return new Rectangle(wx, wy, ww, wh);
    };
    Scene_Skill2.prototype.createItemWindow = function () {
      var rect = this.itemWindowRect();
      this._itemWindow = new Window_SkillList2(rect);
      this._itemWindow.setHelpWindow(this._helpWindow);
      this._itemWindow.setHandler("ok", this.onItemOk.bind(this));
      this._itemWindow.setHandler("cancel", this.onItemCancel.bind(this));
      this._itemWindow.activate();
      this._itemWindow.select(0);
      this._itemWindow.setHandler("pagedown", this.nextActor.bind(this));
      this._itemWindow.setHandler("pageup", this.previousActor.bind(this));
      this.addWindow(this._itemWindow);
    };
    Scene_Skill2.prototype.refreshActor = function () {
      var actor = this.actor();
      this._statusWindow.setActor(actor);
      this._itemWindow.setActor(actor);
      this._itemWindow.updateHelp();
    };
    Scene_Skill2.prototype.onItemCancel = function () {
      this.popScene();
    };
    Scene_Skill2.prototype.onActorChange = function () {
      Scene_MenuBase.prototype.onActorChange.call(this);
      this.refreshActor();
      this._itemWindow.activate();
    };
    return Scene_Skill2;
  })(Scene_Skill);
  Nore.Scene_Skill2 = Scene_Skill2;
  var Window_SkillList2 = /** @class */ (function (_super) {
    __extends(Window_SkillList2, _super);
    function Window_SkillList2() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Window_SkillList2.prototype.drawItem = function (index) {
      var skill = this.itemAt(index);
      if (skill) {
        var costWidth = this.costWidth();
        var rect = this.itemLineRect(index);
        this.drawItemName(skill, rect.x, rect.y, rect.width - costWidth);
        this.drawSkillCost(skill, rect.x, rect.y, rect.width);
        this.changePaintOpacity(1);
      }
    };
    Window_SkillList2.prototype.includes = function (item) {
      if (item && item.meta["baseSkill"]) {
        return false;
      }
      return _super.prototype.includes.call(this, item);
    };
    return Window_SkillList2;
  })(Window_SkillList);
  var _Window_BattleSkill_prototype_includes =
    Window_BattleSkill.prototype.includes;
  Window_BattleSkill.prototype.includes = function (item) {
    if (item && item.meta["baseSkill"]) {
      return false;
    }
    return _Window_BattleSkill_prototype_includes.call(this, item);
  };
  Window_BattleSkill.prototype.makeItemList = function () {
    var _this = this;
    if (this._actor) {
      this._data = this._actor.skills(true).filter(function (item) {
        return _this.includes(item);
      });
    } else {
      this._data = [];
    }
  };
  Window_BattleSkill.prototype.drawItem = function (index) {
    var skill = this.itemAt(index);
    if (skill) {
      var costWidth = this.costWidth();
      var rect = this.itemLineRect(index);
      this.changePaintOpacity(this.isEnabled(skill));
      if (this._actor.isLearnedLvOk(skill)) {
        this.drawItemName(skill, rect.x, rect.y, rect.width - costWidth);
      } else {
        this.drawShortLvItemName(
          this._actor.findLv1Skill(skill),
          rect.x,
          rect.y,
          rect.width - costWidth
        );
      }
      this.drawSkillCost(skill, rect.x, rect.y, rect.width);
      this.changePaintOpacity(1);
    }
  };
  var _Window_BattleSkill_prototype_makeItemList =
    Window_BattleSkill.prototype.makeItemList;
  Window_BattleSkill.prototype.makeItemList = function () {
    _Window_BattleSkill_prototype_makeItemList.call(this);
    var self = this;
    this._data = this._data.sort(function (a, b) {
      var orderA = self.calcSkillOrder(a);
      var orderB = self.calcSkillOrder(b);
      return orderA - orderB;
    });
  };
  Window_BattleSkill.prototype.calcSkillOrder = function (skill) {
    var lv = Math.trunc(skill.meta["lv"]);
    var lv1Skill = skill;
    if (lv > 1) {
      lv1Skill = $dataSkills[skill.id - (lv - 1)];
    }
    if (lv1Skill.meta["order"]) {
      return parseInt(lv1Skill.meta["order"]);
    }
    return skill.id;
  };
  Window_BattleSkill.prototype.drawShortLvItemName = function (
    item,
    x,
    y,
    width
  ) {
    if (!item) {
      return;
    }
    var equip = null;
    if (item instanceof Equip) {
      equip = item;
    }
    var iconY = y + (this.lineHeight() - ImageManager.iconHeight) / 2;
    var textMargin = ImageManager.iconWidth + 4;
    var itemWidth = Math.max(0, width - textMargin);
    this.resetTextColor();
    var iconIndex;
    var name;
    if (equip) {
      var lv = equip.lv();
      if (lv == 2) {
        this.drawIcon(2245, x, iconY);
      }
      if (lv == 3) {
        this.drawIcon(2246, x, iconY);
      }
      iconIndex = equip.iconIndex();
      name = equip.name();
    } else {
      iconIndex = item.iconIndex;
      name = item.name;
    }
    var lastOpacity = this.contents.paintOpacity;
    if (equip) {
      this.changePaintOpacity(false);
    }
    this.contents.fontSize = 14;
    var learnLv = parseInt(item.meta["learnLv"]);
    this.drawText(TextManager.learnLv.format(learnLv), x, y);
    this.contents.fontSize = 24;
    //this.drawIcon(iconIndex, x, iconY);
    this.contents.paintOpacity = lastOpacity;
    if (!equip) {
      this.changeTextColor(ColorManager.disableColor());
    }
    if (equip) {
      this.drawEquipLv(equip, x, y);
    }
    this.drawText(name, x + textMargin + 22, y, itemWidth);
  };
  var _Window_BattleSkill_prototype_isEnabled =
    Window_BattleSkill.prototype.isEnabled;
  Window_BattleSkill.prototype.isEnabled = function (skill) {
    if (!this._actor.isLearnedLvOk(skill)) {
      return false;
    }
    return _Window_BattleSkill_prototype_isEnabled.call(this, skill);
  };
})(Nore || (Nore = {}));
var SkillManager = /** @class */ (function () {
  function SkillManager() {}
  SkillManager.prototype.isPassive = function (skill) {
    return skill.meta["passive"];
  };
  SkillManager.prototype.isOugi = function (skill) {
    return skill.meta["ougi"];
  };
  SkillManager.prototype.isBase = function (skill) {
    return skill.meta["baseSkill"];
  };
  return SkillManager;
})();
var $skillManager = new SkillManager();
