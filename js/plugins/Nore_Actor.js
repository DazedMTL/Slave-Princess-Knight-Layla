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
 * @command Recover0
 * @text HP0％回復
 * @des HP0％回復
 *
 * @command Recover30
 * @text HP30％回復
 * @des HP30％回復
 *
 * @command Recover50
 * @text HP50％回復
 * @des HP50％回復
 *
 * @command ClearCursedEroEvent
 * @text 呪われたエロイベントクリア
 * @des 呪われたエロイベントクリア
 * @arg actorId
 * @type number
 * @text actorId
 * @desc actorId
 *
 * @command DiscardCursedEquips
 * @text 呪われた装備削除
 * @des 呪われた装備削除
 * @arg actorId
 * @type number
 * @text actorId
 * @desc actorId
 *
 *
 * @command DebugEquipCursed
 * @text 呪われた装備装着（デバッグ）
 * @des 呪われた装備装着（デバッグ）
 * @arg actorId
 * @type number
 * @text actorId
 * @desc actorId
 */
var NAKADASHI_RAKUGAKI_MAX = 20;
var SkillMeta;
(function (SkillMeta) {
  SkillMeta["wrath"] = "wrath";
  SkillMeta["wrath2"] = "wrath2";
  SkillMeta["wrath3"] = "wrath3";
  SkillMeta["FIRST_STRIKE"] = "firstStrike";
  SkillMeta["FINISH_BLOW"] = "finishBlow";
  SkillMeta["MELTING"] = "melting";
  SkillMeta["mpPlusTurn"] = "mpPlusTurn";
  SkillMeta["kubihane"] = "kubihane";
  SkillMeta["syukuchi"] = "syukuchi";
  SkillMeta["suddenStrike"] = "suddenStrike";
  SkillMeta["magicShield"] = "magicShield";
  SkillMeta["counter"] = "counter";
  SkillMeta["firstStrike"] = "firstStrike";
  SkillMeta["initialBless"] = "initialBless";
  SkillMeta["hp"] = "hp";
  SkillMeta["atk"] = "atk";
  SkillMeta["def"] = "def";
  SkillMeta["sh"] = "sh";
  SkillMeta["lowerLimit"] = "lowerLimit";
  SkillMeta["defUpFront"] = "defUpFront";
  SkillMeta["shUpFront"] = "shUpFront";
  SkillMeta["spPlus"] = "spPlus";
  SkillMeta["shieldAutoPlusAll"] = "shieldAutoPlusAll";
  SkillMeta["mdfBuff"] = "mdfBuff";
  SkillMeta["defBuff"] = "defBuff";
  SkillMeta["mpCharge"] = "mpCharge";
  SkillMeta["stateMp"] = "stateMp";
  SkillMeta["mpPlusTurnOdd"] = "mpPlusTurnOdd";
  SkillMeta["mpPlusTurnEven"] = "mpPlusTurnEven";
  SkillMeta["critUp"] = "critUp";
  SkillMeta["critUpAll"] = "critUpAll";
  SkillMeta["skillCrit"] = "skillCrit";
  SkillMeta["inventory"] = "inventory";
  SkillMeta["itemGet"] = "itemGet";
  SkillMeta["laboWeapon"] = "laboWeapon";
  SkillMeta["laboMoney"] = "laboMoney";
  SkillMeta["laboExp"] = "laboExp";
  SkillMeta["bonusBlessBuff"] = "bonusBlessBuff";
  SkillMeta["todome"] = "todome";
  SkillMeta["ougiMpRecover"] = "ougiMpRecover";
  SkillMeta["ougiBuff"] = "ougiBuff";
  SkillMeta["breakDamage"] = "breakDamage";
  SkillMeta["skillOugiPlus"] = "skillOugiPlus";
  SkillMeta["matDebuff"] = "matDebuff";
  SkillMeta["busshi"] = "busshi";
  SkillMeta["itemMp"] = "itemMp";
  SkillMeta["priceDown"] = "priceDown";
  SkillMeta["ougiAutoPlus"] = "ougiAutoPlus";
  SkillMeta["ougiReact"] = "ougiReact";
  SkillMeta["obento"] = "obento";
  SkillMeta["obentoSave"] = "obentoSave";
  SkillMeta["bunshin"] = "bunshin";
  SkillMeta["hellFire"] = "hellFire";
  SkillMeta["powerBoost"] = "powerBoost";
  SkillMeta["partyExpPlus"] = "partyExpPlus";
  SkillMeta["stunMp"] = "stunMp";
  SkillMeta["clenching"] = "clenching";
  SkillMeta["barrier"] = "barrier";
  SkillMeta["kaihiBunsin"] = "kaihiBunsin";
})(SkillMeta || (SkillMeta = {}));
var EquipMeta;
(function (EquipMeta) {
  EquipMeta["skillDamagePlus"] = "skillDamagePlus";
  EquipMeta["skillRecoveryPlus"] = "skillRecoveryPlus";
  EquipMeta["expUp"] = "expUp";
  EquipMeta["goldUp"] = "goldUp";
  EquipMeta["spPlus"] = "spPlus";
  EquipMeta["finishBlow"] = "finishBlow";
  EquipMeta["gold"] = "gold";
  EquipMeta["crystalUp"] = "crystalUp";
  EquipMeta["criStun"] = "criStun";
  EquipMeta["syukuchi"] = "syukuchi";
  EquipMeta["shitaNugi"] = "shitaNugi";
  EquipMeta["guardRate"] = "guardRate";
  EquipMeta["kubihane"] = "kubihane";
})(EquipMeta || (EquipMeta = {}));
var NOT_STATE_MP_IDS = [165, 17, 18];
var Nore;
(function (Nore) {
  var pluginName = "Nore_Actor";
  PluginManager.registerCommand(pluginName, "Recover50", function (args) {
    for (var _i = 0, _a = $gameParty.battleMembers(); _i < _a.length; _i++) {
      var a = _a[_i];
      a.recoverHalf();
    }
  });
  PluginManager.registerCommand(pluginName, "Recover30", function (args) {
    var rate = 20;
    var obento = $gameParty.countSkill(SkillMeta.obento);
    if (obento > 0) {
      rate = obento;
    }
    for (var _i = 0, _a = $gameParty.battleMembers(); _i < _a.length; _i++) {
      var a = _a[_i];
      a.recoverRate(rate / 100);
    }
    $gameVariables.setValue(20, hankaku2Zenkaku(rate));
  });
  PluginManager.registerCommand(pluginName, "Recover0", function (args) {
    var obento = $gameParty.countSkill(SkillMeta.obentoSave);
    for (var _i = 0, _a = $gameParty.battleMembers(); _i < _a.length; _i++) {
      var a = _a[_i];
      a.recoverRate(obento / 100);
    }
    $gameVariables.setValue(20, hankaku2Zenkaku(obento));
  });
  PluginManager.registerCommand(
    pluginName,
    "ClearCursedEroEvent",
    function (args) {
      var actorId = args.actorId;
      var actor = $gameActors.actor(actorId);
      actor.clearCursedEvent();
    }
  );
  PluginManager.registerCommand(
    pluginName,
    "DebugEquipCursed",
    function (args) {
      var actorId = args.actorId;
      var actor = $gameActors.actor(actorId);
      var armorId = 19;
      if (actorId == 7) {
        armorId = 16;
      }
      var armor = new Armor($dataArmors[armorId]);
      actor.changeEquip(2, armor);
      actor.setCacheChanged();
    }
  );
  PluginManager.registerCommand(
    pluginName,
    "DiscardCursedEquips",
    function (args) {
      var actorId = args.actorId;
      var actor = $gameActors.actor(actorId);
      actor.discardCursedEquips();
    }
  );
})(Nore || (Nore = {}));
Game_Actors.prototype.mainActor = function () {
  if ($gameVariables.value(5) > 1) {
    return this.actor($gameVariables.value(5));
  }
  return this.actor(1);
};
Game_Actors.prototype.actor = function (actorId) {
  if ($dataActors[actorId]) {
    if (!this._data[actorId]) {
      this._data[actorId] = new Game_Actor2(actorId);
    }
    return this._data[actorId];
  }
  return null;
};
var Game_Actor2 = /** @class */ (function (_super) {
  __extends(Game_Actor2, _super);
  function Game_Actor2() {
    var _this = (_super !== null && _super.apply(this, arguments)) || this;
    _this._forecastDamage = 0;
    _this._forecastHpDamage = 0;
    _this._skipped = false;
    _this._reacted = false;
    _this._toBack = false;
    _this._toFront = false;
    _this._lastCostumeList = [];
    _this._skipCount = 0;
    _this._usedSkillPoint = 0;
    _this._wrath = 0;
    _this._bless = 0; // 加護
    _this._levelUpBonusList = [];
    _this._nextLevelSkills = [];
    _this._learnSkillList = [];
    _this._skillPointPlus = 0;
    _this._mpCharge = 0;
    _this._cursedEroSteps = 0;
    _this._cursedEroEventSteps = 0;
    _this._day = -1;
    _this._stateMpFinished = false;
    _this._reactOnAction = false;
    return _this;
  }
  Game_Actor2.prototype.states = function () {
    var result = _super.prototype.states.call(this);
    if (this.armorCount() > 0) {
      result.unshift($dataStates[17]);
    }
    if (this.mdfCount() > 0) {
      result.unshift($dataStates[18]);
    }
    return result;
  };
  Game_Actor2.prototype.armorCount = function () {
    var n = 0;
    for (var _i = 0, _a = this.equips(); _i < _a.length; _i++) {
      var e = _a[_i];
      if (e) {
        var equip = e;
        n += equip.def();
      }
    }
    return n;
  };
  Game_Actor2.prototype.mdfCount = function () {
    var n = 0;
    for (var _i = 0, _a = this.equips(); _i < _a.length; _i++) {
      var e = _a[_i];
      if (e) {
        var equip = e;
        n += equip.mdf();
      }
    }
    return n;
  };
  Game_Actor2.prototype.learnSkill = function (id) {
    _super.prototype.learnSkill.call(this, id);
    if (id < 1100) {
      return;
    }
    this._learnSkillList = this._learnSkillList || [];
    this._learnSkillList.push(id);
  };
  Game_Actor2.prototype.criRate = function () {
    var rate = this.xparam(2);
    for (var _i = 0, _a = this.battleEquips(); _i < _a.length; _i++) {
      var e = _a[_i];
      if (!e) {
        continue;
      }
      rate += e.critUp();
    }
    rate += $gameParty.criRate();
    rate += this.countSkill(SkillMeta.critUp) / 100;
    return rate;
  };
  Game_Actor2.prototype.saveCostume = function (slot) {
    this._lastCostumeList[slot] = new CostumeSaver(this.actorId());
  };
  Game_Actor2.prototype.restoreCostume = function (slot, includeAcce) {
    if (!this._lastCostumeList[slot]) {
      console.error("costume not found:" + slot);
      return false;
    }
    this._lastCostumeList[slot].restoreCostume(null, includeAcce);
    return true;
  };
  Game_Actor2.prototype.onTurnStart = function () {
    this.clearForecast();
    _super.prototype.onTurnStart.call(this);
    this._skipped = false;
    this._reacted = false;
    this._skipCount = 0;
    this._stateMpFinished = false;
    //this.removeBuffsAuto();
    //this.removeStatesAuto(1);
    this.removeTurnStartState();
  };
  Game_Actor2.prototype.addPassiveBuff = function () {
    /*const mdfBuff = $gameParty.countSkill(SkillMeta.mdfBuff);
        if (mdfBuff > 0) {
            this.addBuff(5, mdfBuff);
        }*/
    var defBuff = $gameParty.countSkill(SkillMeta.defBuff);
    if (defBuff > 0) {
      if (this.isFront()) {
        this.addBuff(3, defBuff, true);
      }
    }
    var equioDef = this.armorCount();
    if (equioDef > 0) {
      this.addBuff(3, equioDef, true);
    }
    var equioMdf = this.mdfCount();
    if (equioMdf > 0) {
      this.addBuff(5, equioMdf, true);
    }
  };
  Game_Actor2.prototype.removeTurnStartState = function () {
    var removeList = [];
    for (var _i = 0, _a = this.states(); _i < _a.length; _i++) {
      var s = _a[_i];
      if (s.meta["removeOnTurnStart"]) {
        removeList.push(s);
      }
    }
    for (
      var _b = 0, removeList_1 = removeList;
      _b < removeList_1.length;
      _b++
    ) {
      var s = removeList_1[_b];
      this.removeState(s.id);
    }
  };
  Game_Actor2.prototype.skip = function () {
    this.clearActions();
    this._skipCount++;
  };
  Game_Actor2.prototype.skipCount = function () {
    return this._skipCount;
  };
  Game_Actor2.prototype.isSkipped = function () {
    return this._skipped;
  };
  Game_Actor2.prototype.canSkip = function () {
    if (this._actionFinished) {
      return false;
    }
    return !this._skipped;
  };
  Game_Actor2.prototype.react = function () {
    var bonusState = this.findBonusBlessBuff();
    if (bonusState > 0) {
      this.addState(bonusState, 2);
    }
    this._actionFinished = false;
    this._reacted = true;
    this._reactOnAction = true;
    this.result().react();
    var powerBoost = $gameParty.countSkill(SkillMeta.powerBoost);
    if (powerBoost > 0) {
      this.addBuff(BuffId.atk, powerBoost, false);
      this.addBuff(BuffId.def, powerBoost, false);
      this.addBuff(BuffId.mat, powerBoost, false);
      this.addBuff(BuffId.mdf, powerBoost, false);
    }
  };
  Game_Actor2.prototype.itemReact = function () {
    this._actionFinished = false;
  };
  Game_Actor2.prototype.setup = function (actorId) {
    _super.prototype.setup.call(this, actorId);
    this.recoverAll();
  };
  Game_Actor2.prototype.recoverAll = function () {
    _super.prototype.recoverAll.call(this);
    this.recoverShield();
    this._mp = 0;
  };
  Game_Actor2.prototype.shield = function () {
    return this._shield;
  };
  Game_Actor2.prototype.forecastShield = function () {
    if (this._forecastDamage > 0) {
      return Math.max(this._shield - this._forecastDamage, 0);
    }
    return this._shield;
  };
  Game_Actor2.prototype.maxShield = function () {
    var n = this.luk;
    var base = n; //Math.trunc(n * (100 + (this._level - 1) * 10) / 100);
    var difficultyBonus = this.shieldDifficultyBonus();
    return (
      base +
      this.skillShieldPlus() +
      this.maxShieldPlusState() +
      difficultyBonus
    );
  };
  Game_Actor2.prototype.shieldDifficultyBonus = function () {
    switch ($gameSystem.difficulty()) {
      case Difficulty.DUNGEON_SKIP:
        return 20;
      case Difficulty.VERY_EASY:
        return 20;
      case Difficulty.EASY:
        return 10;
    }
    return 0;
  };
  Game_Actor2.prototype.maxShieldPlusState = function () {
    return this.countState("maxShiledPlus");
  };
  Game_Actor2.prototype.skillShieldPlus = function () {
    if (!this.isFront()) {
      return 0;
    }
    if (!$gameParty.inDungeon()) {
      return 0;
    }
    var n = 0;
    for (var _i = 0, _a = $gameParty.battleMembers(); _i < _a.length; _i++) {
      var actor = _a[_i];
      n += actor.countSkill(SkillMeta.shUpFront, true);
    }
    return n;
  };
  Game_Actor2.prototype.recoverShield = function () {
    if (this.isDead()) {
      this._shield = 0;
    } else {
      this._shield = this.maxShield();
      if ($gameSystem.stageId() == 7) {
        this._shield = Math.min(10, this._shield);
      }
    }
  };
  Game_Actor2.prototype.gainShield = function (n) {
    this._shield += n;
    this._shield = Math.min(this._shield, this.maxShield());
  };
  Game_Actor2.prototype.gainHp = function (allDamage, hpDamage, action) {
    if (hpDamage === void 0) {
      hpDamage = 0;
    }
    if (allDamage > 0) {
      // 回復
      _super.prototype.gainHp.call(this, allDamage, hpDamage, action);
      return;
    }
    this.updateWrash();
    var damage = -allDamage;
    damage = this.processShield(damage);
    damage = this.processArmor(damage);
    damage -= hpDamage;
    if (damage <= 0) {
      return;
    }
    //p(damage)
    $gameTemp.onDamage();
    if (damage > 0) {
      this.playDamageVoice();
    }
    var clenchingResult = this.checkClenching(damage, action);
    if (clenchingResult > 0) {
      return clenchingResult;
    }
    _super.prototype.gainHp.call(this, -damage, hpDamage, action);
    return damage;
  };
  Game_Actor2.prototype.checkClenching = function (damage, action) {
    if (damage < 0) {
      return 0;
    }
    if (damage < this.hp) {
      return 0;
    }
    if (this.hp == 1) {
      return 0;
    }
    if (!this.hasSkillMeta(SkillMeta.clenching)) {
      return 0;
    }
    /*
        if (! this.countStateMeta(StateMeta.UNDEAD)) {
            return 0;
        }
        */
    var realDamage = this.hp - 1;
    if (realDamage > 0) {
      _super.prototype.gainHp.call(this, -realDamage, 0, action);
    }
    this._result.hpDamage = damage;
    this._result.hpAffected = true;
    this._result.clenching = true;
    this.setDirty();
    return realDamage || 1;
  };
  Game_Actor2.prototype.playDamageVoice = function () {
    var actorId = this.actorId();
    var randomId = Math.randomInt(4) + 1;
    var fileId = "damebo_%1_%2".format(actorId.padZero(2), randomId.padZero(2));
    AudioManager.playVoice({ name: fileId, volume: 100, pitch: 100, pan: 0 });
  };
  Game_Actor2.prototype.processShield = function (damage) {
    if (damage <= 0) {
      return damage;
    }
    var lastShield = this._shield;
    if (this._shield > 0) {
      if (this._shield < damage) {
        damage -= this._shield;
        this._result.addShieldDamage(this._shield);
        this._shield = 0;
      } else {
        this._result.addShieldDamage(damage);
        this._shield -= damage;
        damage -= lastShield;
      }
    }
    return damage;
  };
  Game_Actor2.prototype.addStun = function (n) {
    // do nothing
    return false;
  };
  Game_Actor2.prototype.makeActionList = function () {
    var list = [];
    var attackAction = new Game_Action2(this);
    attackAction.setAttack();
    list.push(attackAction);
    for (var _i = 0, _a = this.usableSkills(); _i < _a.length; _i++) {
      var skill = _a[_i];
      var skillAction = new Game_Action2(this);
      skillAction.setSkill(skill.id);
      list.push(skillAction);
    }
    return list;
  };
  Game_Actor2.prototype.forecast = function (action, damage) {
    if (action.isPenetrate()) {
      this._forecastHpDamage += damage;
    } else {
      this._forecastDamage += damage;
    }
  };
  Game_Actor2.prototype.forecastDamage = function () {
    return this._forecastDamage;
  };
  Game_Actor2.prototype.isForecast = function () {
    return this._forecastDamage != 0 || this._forecastHpDamage != 0;
  };
  Game_Actor2.prototype.forecastHp = function () {
    if (!this.isForecast()) {
      return 0;
    }
    var hp = this.hp;
    if (this._shield >= this._forecastDamage) {
      return Math.max(this.hp - this._forecastHpDamage, 0);
    }
    var damage = this._forecastDamage + this._forecastHpDamage - this._shield;
    /*if (damage <= this.armor()) {
            return this.hp;
        }*/
    //damage -= this.armor();
    return Math.max(hp - damage, 0);
  };
  Game_Actor2.prototype.clearForecast = function () {
    this._forecastDamage = 0;
    this._forecastHpDamage = 0;
  };
  Game_Actor2.prototype.speed = function () {
    var speed = parseInt($dataActors[this.actorId()].meta["speed"]);
    if (isNaN(speed)) {
      return 1;
    }
    return speed;
  };
  Game_Actor2.prototype.attackSkillId = function () {
    switch (this.actorId()) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        return 4;
    }
    return 4;
  };
  Game_Actor2.prototype.actorId = function () {
    return Math.trunc(this._actorId);
  };
  Game_Actor2.prototype.isBack = function () {
    return this.actor().meta["back"] != null;
    //return $gameParty.backMembers().includes(this);
  };
  Game_Actor2.prototype.isFront = function () {
    return this.actor().meta["front"] != null;
    //return $gameParty.frontMembers().includes(this);
  };
  Game_Actor2.prototype.toBack = function () {
    this._toBack = true;
  };
  Game_Actor2.prototype.toFront = function () {
    this._toFront = true;
  };
  Game_Actor2.prototype.isToBack = function () {
    return this._toBack;
  };
  Game_Actor2.prototype.isToFront = function () {
    return this._toFront;
  };
  Game_Actor2.prototype.onBattleStart = function () {
    this._toBack = false;
    this._toFront = false;
    this.result().clear();
    _super.prototype.onBattleStart.call(this);
    this.updateTurnWrash();
    if ($gameTroop.turnCount() == 0) {
      this._wrath = 0;
      this.recoverShield();
      this.regenerateShieldPlus();
      this._mp = this.initialMp();
      this.initBless();
      this.initBunshin();
      this.initKaihiBunshin();
      this.initBarrier();
      this.initMpCharge();
      this.result().clear();
    }
  };
  Game_Actor2.prototype.initMpCharge = function () {
    this._mpCharge = 0;
    if (this.hasSkillMeta(SkillMeta.mpCharge, true)) {
      this.addMpChargeState();
    }
  };
  Game_Actor2.prototype.addMpChargeState = function () {
    this.addState(StateId.MP_CHARGE, 1);
  };
  Game_Actor2.prototype.mpChargeValue = function () {
    var max = this.countSkill(SkillMeta.mpCharge, true);
    return max - this._mpCharge;
  };
  Game_Actor2.prototype.addMpCharge = function (n) {
    var max = this.countSkill(SkillMeta.mpCharge, true);
    if (max == 0) {
      return false;
    }
    this._mpCharge += n;
    var isChanged = false;
    for (var i = 0; i < 10; i++) {
      if (this._mpCharge >= max) {
        this._mpCharge -= max;
        this.gainMp(1);
        this.gainShield(2);
        isChanged = true;
      }
    }
    return isChanged;
  };
  Game_Actor2.prototype.initBless = function () {
    this._bless = this.countSkill(SkillMeta.initialBless, true);
    if (this._bless > 0) {
      this.addBlessState();
    }
  };
  Game_Actor2.prototype.initBunshin = function () {
    var bunshin = this.countSkill(SkillMeta.bunshin, true);
    if (bunshin > 0) {
      this.addState(StateId.MIKIRI, 1);
    }
  };
  Game_Actor2.prototype.initKaihiBunshin = function () {
    var kaihiBunsin = this.countSkill(SkillMeta.kaihiBunsin, true);
    if (kaihiBunsin > 0) {
      this.addState(StateId.KAIHI_BUNSIN, kaihiBunsin);
    }
  };
  Game_Actor2.prototype.initBarrier = function () {
    var barrier = this.countSkill(SkillMeta.barrier, true);
    if (barrier > 0) {
      this.addState(StateId.BARRIER, 1);
    }
  };
  Game_Actor2.prototype.initialMp = function () {
    if (!$gameParty.inBattle()) {
      return 0;
    }
    var n1 = this.countSkill(SkillMeta.spPlus, true);
    var n2 = this.countEquipMeta(EquipMeta.spPlus);
    var initialMp = Math.randomInt(2) + 1;
    /*if (initialMp == 0) {
            // 0なら再抽選
            initialMp = Math.randomInt(3);
        }*/
    return initialMp + n1 + n2;
  };
  Game_Actor2.prototype.onBattleEnd = function () {
    _super.prototype.onBattleEnd.call(this);
    this.recoverShield();
    this._actionFinished = false;
  };
  Game_Actor2.prototype.countSkill = function (meta, includeNotLearnedSkill) {
    if (includeNotLearnedSkill === void 0) {
      includeNotLearnedSkill = false;
    }
    var n = 0;
    for (
      var _i = 0, _a = this.skills(includeNotLearnedSkill);
      _i < _a.length;
      _i++
    ) {
      var skill = _a[_i];
      if (skill.meta[meta]) {
        n += Math.trunc(skill.meta[meta]);
      }
    }
    return n;
  };
  Game_Actor2.prototype.countArmor = function (type) {
    var n = 0;
    for (var _i = 0, _a = this.equips(); _i < _a.length; _i++) {
      var e = _a[_i];
      if (!e) {
        continue;
      }
      if (e.item().meta[type]) {
        n += Math.trunc(e.item().meta[type]);
      }
    }
    return n;
  };
  Game_Actor2.prototype.performDamage = function () {
    Game_Battler.prototype.performDamage.call(this);
    if (this.isSpriteVisible()) {
      this.requestMotion("damage");
    } else {
      $gameScreen.startShake(5, 5, 10);
    }
    var shieldDamage = false;
    if (this.result().shieldDamage() > 0 && this.result().hpDamage == 0) {
      shieldDamage = true;
    }
    if (shieldDamage) {
      AudioManager.playSe({ name: "Hammer", volume: 80, pitch: 100, pan: 0 });
    } else {
      SoundManager.playActorDamage();
    }
  };
  Game_Actor2.prototype.calcExpRate = function (gainExp) {
    var value1 = this.currentExp();
    if (this._level > 1) {
      value1 -= this.expForLevel(this._level);
    }
    var value2 = this.nextLevelExp() - this.currentLevelExp();
    //p(value1 + gainExp + ' ' + value2)
    return (value1 + gainExp) / value2;
  };
  Game_Actor2.prototype.calcRealExp = function (rate) {
    var value1 = this.currentExp();
    if (this._level > 1) {
      value1 -= this.expForLevel(this._level);
    }
    var value2 = this.nextLevelExp() - this.currentLevelExp();
    return value2 * rate - value1;
  };
  Game_Actor2.prototype.isCaptive = function () {
    var history = this.getLastHistory();
    if (!history) {
      return false;
    }
    return history.isCaptive();
  };
  Game_Actor2.prototype.isSlave = function () {
    var history = this.getLastHistory();
    if (!history) {
      return false;
    }
    return history.isSlave();
  };
  Game_Actor2.prototype.getActorHistory = function () {
    return $gameSystem.historyManager().getActorHistory(this.actorId());
  };
  Game_Actor2.prototype.getLastHistory = function () {
    var history = this.getActorHistory();
    return history.lastHistory();
  };
  Game_Actor2.prototype.getLastFaceId = function () {
    var history = this.getActorHistory();
    var list = history.getHistoryList();
    if (list.length <= 1) {
      return 0;
    }
    return list[list.length - 2].costume().faceId();
  };
  Object.defineProperty(Game_Actor2.prototype, "mhp", {
    get: function () {
      var n = _super.prototype.param.call(this, 0);
      //n += $gameParty.countSkill(SkillMeta.hp);
      return n + this.countSkill(SkillMeta.hp);
    },
    enumerable: true,
    configurable: true,
  });
  Object.defineProperty(Game_Actor2.prototype, "atk", {
    get: function () {
      var n = _super.prototype.param.call(this, 2);
      return n;
    },
    enumerable: true,
    configurable: true,
  });
  Object.defineProperty(Game_Actor2.prototype, "mmp", {
    get: function () {
      return 5;
    },
    enumerable: true,
    configurable: true,
  });
  Game_Actor2.prototype.onPhaseChange = function () {
    // this.regenerateShieldPlus();
    //this.regenerateHp();
  };
  /*regenerateHp() {
        super.regenerateHp();
  
    }*/
  Game_Actor2.prototype.regenerateShieldPlus = function () {
    var shieldPlus = $gameParty.regenerateShield();
    if (this.isAlive()) {
      this.gainShield(shieldPlus);
      var result = this.result();
      result.addShieldDamage(-shieldPlus);
      this.startDamagePopup();
    }
  };
  Game_Actor2.prototype.regenerateShield = function () {
    return this.countSkill(SkillMeta.shieldAutoPlusAll);
  };
  Game_Actor2.prototype.regenerateMp = function () {
    var value = Math.floor(this.mmp * this.mrg) + 1;
    if (this.hasSkillMeta(SkillMeta.mpPlusTurn, true)) {
      if ($gameTroop.turnCount() % 2 == 0) {
        value++;
      }
    }
    if (this.hasSkillMeta(SkillMeta.mpPlusTurnOdd)) {
      if (($gameTroop.turnCount() + 1) % 2 == 1) {
        value++;
      }
    }
    if (this.hasSkillMeta(SkillMeta.mpPlusTurnEven)) {
      if (($gameTroop.turnCount() + 1) % 2 == 0) {
        value++;
      }
    }
    if (value !== 0) {
      this.gainMp(value);
    }
  };
  Game_Actor2.prototype.shouldDisplayLevelUp = function () {
    return false;
  };
  Game_Actor2.prototype.battleDef = function () {
    return this.def2() + this.defUp() + this.skillDefPlus();
  };
  Game_Actor2.prototype.skillDefPlus = function () {
    if (!this.isFront()) {
      return 0;
    }
    var n = 0;
    for (var _i = 0, _a = $gameParty.battleMembers(); _i < _a.length; _i++) {
      var actor = _a[_i];
      n += actor.countSkill(SkillMeta.defUpFront);
    }
    return n;
  };
  Game_Actor2.prototype.recoverHalf = function () {
    this.gainHp(Math.floor(this.mhp / 2));
  };
  Game_Actor2.prototype.recover30 = function () {
    var rate = 0.3;
    this.gainHp(Math.round(this.mhp * rate));
  };
  Game_Actor2.prototype.recoverRate = function (rate) {
    this.gainHp(Math.round(this.mhp * rate));
  };
  Game_Actor2.prototype.skillPoint = function () {
    return (
      $gameParty.totalSkillPoint() -
      this._usedSkillPoint +
      this.skillPointPlus()
    );
  };
  Game_Actor2.prototype.totalSkillPoint = function () {
    return $gameParty.totalSkillPoint() + this.skillPointPlus();
  };
  Game_Actor2.prototype.useSkillPoint = function (n) {
    this._usedSkillPoint += n;
  };
  Game_Actor2.prototype.onAttack = function (skill) {
    if (this.actorId() == 1) {
      if (skill.itypeId >= 1) {
        return;
      }
      if (skill.id == 20) {
        // stage5
        return;
      }
      if (this.hasState(StateId.GRATIA)) {
        this.removeState(StateId.GRATIA);
        return;
      }
      if (skill.meta["condition"] == "react") {
        return;
      }
      if (skill.meta["react"]) {
        return;
      }
      this._bless++;
      if (skill.meta["bless"]) {
        this._bless += Math.trunc(skill.meta["bless"]);
      }
      if (this._bless >= 5) {
        $gameMedals.onGratia();
        this.addGratiaState();
      } else {
        this.addBlessState();
      }
    }
    this._wrath = 0;
    this.removeState(StateId.WRASH);
    if (this.hasSkillMeta(SkillMeta.wrath2)) {
      this._wrath += 1;
      this.addState(StateId.WRASH, 1);
    }
  };
  Game_Actor2.prototype.onTodome = function (skill) {
    if (!skill.meta[SkillMeta.todome]) {
      return;
    }
    if (skill.meta[SkillMeta.todome] == "react") {
      if (!this._actionFinished) {
        return;
      }
      $gameTemp.requestAnimation([this], 40, false);
      this.react();
    }
  };
  Game_Actor2.prototype.addBlessState = function () {
    this.addState(StateId.BLESS, 1);
  };
  Game_Actor2.prototype.addGratiaState = function () {
    this.addState(StateId.GRATIA, 1);
    this.removeState(StateId.BLESS);
    this._bless = 0;
    $gameTemp.requestAnimation([this], 40, false);
    this.react();
  };
  Game_Actor2.prototype.findBonusBlessBuff = function () {
    for (var _i = 0, _a = this.skills(); _i < _a.length; _i++) {
      var s = _a[_i];
      if (s.meta[SkillMeta.bonusBlessBuff]) {
        return Math.trunc(s.meta[SkillMeta.bonusBlessBuff]);
      }
    }
    return 0;
  };
  Game_Actor2.prototype.bless = function () {
    return this._bless;
  };
  Game_Actor2.prototype.skillMpCost = function (skill) {
    if (this.hasState(StateId.GRATIA)) {
      return 0;
    }
    return _super.prototype.skillMpCost.call(this, skill);
  };
  Game_Actor2.prototype.resetStateCounts = function (stateId) {
    Game_Battler.prototype.resetStateCounts.call(this, stateId);
    this._stateSteps[stateId] = $dataStates[stateId].stepsToRemove;
  };
  Game_Actor2.prototype.countNakadashi = function () {
    var n = this.getActorHistory().countNakadashi($gameSystem.day());
    if (n < 10) {
      return n;
    }
    if (n < 100) {
      return Math.round(n / 10) * 10;
    }
    if (n < 1000) {
      return Math.round(n / 100) * 100;
    }
    if (n < 10000) {
      return Math.round(n / 1000) * 1000;
    }
    if (n < 100000) {
      return Math.round(n / 10000) * 10000;
    }
    if (n < 1000000) {
      return Math.round(n / 100000) * 100000;
    }
    return n;
  };
  Game_Actor2.prototype.isFound = function () {
    return false;
  };
  Game_Actor2.prototype.posByActor = function () {
    switch (this.actorId()) {
      case 1:
        return -15;
      case 3:
        return 15;
      case 4:
        return -10;
      case 6:
        return -9;
      case 7:
        return -20;
      case 10:
        return -10;
      case 12:
        return -15;
    }
    return 0;
  };
  Game_Actor2.prototype.acceList = function () {
    var r = [];
    for (var i in this.acceMap) {
      if (this.acceMap[i]) {
        var armor = $dataArmors[i];
        if (armor.meta["ignore"]) {
          continue;
        }
        r.push(new Armor(armor, true));
      }
    }
    return r;
  };
  Game_Actor2.prototype.removeAllBattleEquips = function () {
    this._weapon = null;
    this._armor1 = null;
    this._armor2 = null;
  };
  Game_Actor2.prototype.battleEquips = function () {
    var result = [];
    result.push(this._weapon);
    result.push(this._armor1);
    result.push(this._armor2);
    result.push(this._medal1);
    result.push(this._medal2);
    result.push(this._medal3);
    result.push(this._medal4);
    result.push(this._medal5);
    return result;
  };
  Game_Actor2.prototype.equipSlots = function () {
    var slots = [1, 2, 3, 5, 5, 5, 5, 5];
    return slots;
  };
  Game_Actor2.prototype.equipSkills = function () {
    var result = [];
    for (var _i = 0, _a = this.equips(); _i < _a.length; _i++) {
      var e = _a[_i];
      if (!e) {
        continue;
      }
      for (var _b = 0, _c = e.skills(); _b < _c.length; _b++) {
        var s = _c[_b];
        result.push(s);
      }
    }
    return result;
  };
  Game_Actor2.prototype.equipEffects = function () {
    var result = [];
    for (var _i = 0, _a = this.equipSkills(); _i < _a.length; _i++) {
      var s = _a[_i];
      for (var _b = 0, _c = s.effects; _b < _c.length; _b++) {
        var e = _c[_b];
        result.push(new BattleEffect(e, s));
      }
    }
    return result;
  };
  Game_Actor2.prototype.equips = function () {
    var result = this.battleEquips();
    for (var _i = 0, _a = this.acceList(); _i < _a.length; _i++) {
      var armor = _a[_i];
      result.push(armor);
    }
    if (this._levelUpBonusList) {
      for (var _b = 0, _c = this._levelUpBonusList; _b < _c.length; _b++) {
        var id = _c[_b];
        result.push(new Armor($dataArmors[id], true));
      }
    }
    return result;
  };
  Game_Actor2.prototype.paramBase = function (paramId) {
    if (paramId == 1) {
      return 5;
    }
    var n = _super.prototype.paramBase.call(this, paramId);
    if (paramId == 2) {
      n += this.countSkill(SkillMeta.atk);
      n += $gameParty.partySkill(SkillMeta.atk);
    }
    if (paramId == 3) {
      n += $gameParty.partySkill(SkillMeta.def);
    }
    if (paramId == 7) {
      n += $gameParty.partySkill(SkillMeta.sh);
    }
    return n;
  };
  Game_Actor2.prototype.releaseUnequippableItems = function (forcing) {
    for (;;) {
      var slots = this.equipSlots();
      var equips = _super.prototype.equips.call(this);
      var changed = false;
      for (var i = 0; i < equips.length; i++) {
        var item = equips[i];
        if (item && (!this.canEquip(item) || item.etypeId !== slots[i])) {
          if (!forcing) {
            this.tradeItemWithParty(null, item);
          }
          this._equips[i].setObject(null);
          changed = true;
        }
      }
      if (!changed) {
        break;
      }
    }
  };
  Game_Actor2.prototype.recoverMp = function () {
    this._mp = this.initialMp();
  };
  Game_Actor2.prototype.nextLevelSkills = function () {
    var result = [];
    for (var _i = 0, _a = this.allSkills(); _i < _a.length; _i++) {
      var skill = _a[_i];
      var learnLv = parseInt(skill.meta["learnLv"]);
      if (!isNaN(learnLv)) {
        if (learnLv == this.level + 1) {
          result.push(skill);
        }
      }
    }
    return result;
  };
  Game_Actor2.prototype.allLevelSkills = function () {
    var result = [];
    for (var _i = 0, _a = this.allSkills(); _i < _a.length; _i++) {
      var skill = _a[_i];
      var learnLv = parseInt(skill.meta["learnLv"]);
      if (!isNaN(learnLv)) {
        result.push(skill);
      }
    }
    return result;
  };
  Game_Actor2.prototype.isLearnedLvOk = function (skill) {
    // スキル習得LV関係なしフラグ
    if ($gameSwitches.value(22)) {
      return true;
    }
    if ($gameSystem.isLevelNoLimit()) {
      return true;
    }
    var learnLv = parseInt(this.findLv1Skill(skill).meta["learnLv"]);
    if (!isNaN(learnLv)) {
      if (learnLv > this.level) {
        return false;
      }
    }
    return true;
  };
  Game_Actor2.prototype.findBaseSkill = function (skill) {
    return this.findLv1Skill(skill);
  };
  Game_Actor2.prototype.findLv1Skill = function (skill) {
    var min = skill;
    for (var i = 1; i < 10; i++) {
      var skillId = skill.id - i;
      var skill2 = $dataSkills[skillId];
      if (!skill2) {
        break;
      }
      if (skill2.name == skill.name) {
        min = skill2;
      }
    }
    return min;
  };
  Game_Actor2.prototype.skills = function (includeNotLearnedSkill) {
    if (includeNotLearnedSkill === void 0) {
      includeNotLearnedSkill = false;
    }
    var map = {};
    var baseSkills = [];
    for (
      var _i = 0, _a = this._skills.concat(this.addedSkills());
      _i < _a.length;
      _i++
    ) {
      var id = _a[_i];
      var skill = $dataSkills[id];
      if (!this.isLearnedLvOk(skill)) {
        // スキル習得LV関係なしフラグ
        if (!includeNotLearnedSkill) {
          continue;
        }
      }
      var isBaseSkill = skill.meta["baseSkill"] != null;
      if (isBaseSkill) {
        baseSkills.push(skill);
        continue;
      }
      var lv = parseInt(skill.meta["lv"]);
      if (map[skill.name]) {
        var currentLv = parseInt(map[skill.name].meta["lv"]);
        if (lv < currentLv) {
          // 下位スキル削除
          continue;
        }
      }
      map[skill.name] = skill;
      //list.push(skill);
    }
    var list = [];
    for (var key in map) {
      list.push(map[key]);
    }
    for (
      var _b = 0, baseSkills_1 = baseSkills;
      _b < baseSkills_1.length;
      _b++
    ) {
      var s = baseSkills_1[_b];
      list.push(s);
    }
    list = list.sort(function (a, b) {
      var orderA = a.id;
      var orderB = b.id;
      if (a.meta["order"]) {
        orderA = parseInt(a.meta["order"]);
      }
      if (b.meta["order"]) {
        orderB = parseInt(b.meta["order"]);
      }
      return orderA - orderB;
    });
    return list;
  };
  Game_Actor2.prototype.allSkills = function () {
    var list = [];
    for (
      var _i = 0, _a = this._skills.concat(this.addedSkills());
      _i < _a.length;
      _i++
    ) {
      var id = _a[_i];
      if (!list.includes($dataSkills[id])) {
        list.push($dataSkills[id]);
      }
    }
    return list;
  };
  Game_Actor2.prototype.makeNextLevelSkills = function () {
    var lerningSkill = new Nore.LerningSkill(this._actorId);
    this._nextLevelSkills = lerningSkill.ramdomThreeSkills();
  };
  Game_Actor2.prototype.levelUp = function () {
    //this._exp[this._classId] += this.nextRequiredExp();
    this._level++;
    this.addLevelUpBonusArmorList(this.levelUpBonusArmorList());
    var newSkill = this.newSkillByLevel(this._level);
  };
  Game_Actor2.prototype.canLevelUp = function (exp) {
    return this.nextRequiredExp() <= exp;
  };
  Game_Actor2.prototype.addLevelUpBonusArmorList = function (armorList) {
    for (var _i = 0, armorList_1 = armorList; _i < armorList_1.length; _i++) {
      var armor = armorList_1[_i];
      this._levelUpBonusList.push(armor.id);
    }
  };
  Game_Actor2.prototype.meetsSkillConditions = function (skill) {
    var s = _super.prototype.meetsSkillConditions.call(this, skill);
    if (!s) {
      return false;
    }
    if (skill.meta["condition"] == "react") {
      if (!this._reacted) {
        return false;
      }
    }
    if (skill.meta["condition"] == "atkUp") {
      if (this._buffs[2] > 0) {
      } else {
        return false;
      }
    }
    return s;
  };
  Game_Actor2.prototype.bareHandsAnimationId = function () {
    switch (this.actorId()) {
      case 1:
        return 6;
      case 2:
        return 16;
      case 3:
        return 1;
      case 5:
        return 6;
      case 10:
        return 16;
    }
    return 1;
  };
  Game_Actor2.prototype.gainTp = function (value) {
    $gameParty.gainOugi(value * 1.5);
  };
  Game_Actor2.prototype.gainSilentTp = function (value) {
    this.gainTp(value);
  };
  Game_Actor2.prototype.forgetSkills = function () {
    this._levelUpBonusList = [];
  };
  Game_Actor2.prototype.numMedalSlot = function () {
    var n = 1;
    for (var _i = 0, _a = this.skills(); _i < _a.length; _i++) {
      var skill = _a[_i];
      if (skill.meta["slot"]) {
        n += parseInt(skill.meta["slot"]);
      }
    }
    return n;
  };
  Game_Actor2.prototype.hasOugiSkill = function () {
    for (var _i = 0, _a = this.skills(); _i < _a.length; _i++) {
      var skill = _a[_i];
      if (skill.meta["ougi"]) {
        return true;
      }
    }
    return false;
  };
  Game_Actor2.prototype.expForLevel = function (level) {
    return Math.floor(
      (_super.prototype.expForLevel.call(this, level) *
        (100 - this.requiredExpDownRate())) /
        100
    );
  };
  Game_Actor2.prototype.requiredExpDownRate = function () {
    var n = this.countArmor(Nore.ARMOR_TYPE.requiredExpDown);
    /*switch (n) {
            case 1: return 3;
            case 2: return 6;
            case 3: return 9;
            case 4: return 12;
            case 5: return 15;
        }*/
    return n * this.requredExpDownRateAtSkill();
  };
  Game_Actor2.prototype.requredExpDownRateAtSkill = function () {
    return 3;
  };
  Game_Actor2.prototype.lowerLimit = function () {
    return this.countSkill(SkillMeta.lowerLimit);
  };
  Game_Actor2.prototype.onDungeonEnd = function () {
    this.changeEquip(0, null);
    this.changeEquip(1, null);
    if (this._armor2 && this._armor2.isCursed()) {
    } else {
      this.changeEquip(2, null);
    }
  };
  Game_Actor2.prototype.onDungeonStart = function () {
    if (this.hasCursedAcce()) {
      this.decideCursedEroEventSteps();
    }
  };
  Game_Actor2.prototype.onNukubenkiStart = function () {
    // 呪われたアイテム削除
    this.discardCursedEquips();
  };
  Game_Actor2.prototype.discardCursedEquips = function () {
    /*for (const acceId in this.acceMap) {
            const acce = $dataArmors[acceId];
            if (acce.meta['rakugaki']) {
                this.acceMap[acceId] = false;
            }
        }*/
    if (this._armor2 && this._armor2.isCursed()) {
      this.changeEquip(2, null);
      this.setCacheChanged();
      this._innerBottomId = "b";
    }
    this.acceMap[1067] = false;
  };
  Game_Actor2.prototype.changeEquip = function (slot, equip) {
    if (equip) {
      this.tradeItemWithParty(equip, this.equip(slot));
    } else {
      var before = this.equip(slot);
      if (before && !before.meta(EquipMeta.shitaNugi)) {
        $gameParty.gainItem(before, 1, false);
      }
    }
    switch (slot) {
      case 0:
        this._weapon = equip;
        break;
      case 1:
        this._armor1 = equip;
        break;
      case 2:
        this._armor2 = equip;
        break;
      case 3:
        this._medal1 = equip;
        break;
      case 4:
        this._medal2 = equip;
        break;
      case 5:
        this._medal3 = equip;
        break;
      case 6:
        this._medal4 = equip;
        break;
      case 7:
        this._medal5 = equip;
        break;
    }
  };
  Game_Actor2.prototype.equip = function (slot) {
    switch (slot) {
      case 0:
        return this._weapon;
      case 1:
        return this._armor1;
      case 2:
        return this._armor2;
      case 3:
        return this._medal1;
      case 4:
        return this._medal2;
      case 5:
        return this._medal3;
      case 6:
        return this._medal4;
      case 7:
        return this._medal5;
      default:
        console.error("不正なスロットです:" + slot);
    }
  };
  Game_Actor2.prototype.startDamagePopup = function () {
    //p('startDamagePopup')
    this._damagePopup = true;
  };
  Game_Actor2.prototype.isSpriteVisible = function () {
    return true;
  };
  Game_Actor2.prototype.meetsItemConditions = function (item) {
    return this.meetsUsableItemConditions(item);
  };
  Game_Actor2.prototype.canPaySkillCost = function (skill) {
    return (
      $gameParty.ougiPoint() >= this.skillTpCost(skill) &&
      this._mp >= this.skillMpCost(skill)
    );
  };
  Game_Actor2.prototype.paySkillCost = function (skill) {
    this._mp -= this.skillMpCost(skill);
    $gameParty.consumeOugiPoint(this.skillTpCost(skill));
  };
  Game_Actor2.prototype.onRelease = function () {};
  Game_Actor2.prototype.onSlipDamage = function (n) {
    this._result.hpDamage = n;
    this._result.slipDamage = n;
    this._result.hpAffected = true;
  };
  Game_Actor2.prototype.updateWrash = function () {
    if (
      this.hasSkillMeta(SkillMeta.wrath) ||
      this.hasSkillMeta(SkillMeta.wrath2) ||
      this.hasSkillMeta(SkillMeta.wrath3)
    ) {
      this._wrath += 1;
      this.addState(StateId.WRASH, 1);
    }
  };
  Game_Actor2.prototype.updateTurnWrash = function () {
    if ($gameTroop.turnCount() == 0) {
      return;
    }
    if (this.hasSkillMeta(SkillMeta.wrath3)) {
      this._wrath += 1;
      this.addState(StateId.WRASH, 1);
    }
  };
  Game_Actor2.prototype.hasSkillMeta = function (meta, includeNotLearnedSkill) {
    if (includeNotLearnedSkill === void 0) {
      includeNotLearnedSkill = false;
    }
    for (
      var _i = 0, _a = this.skills(includeNotLearnedSkill);
      _i < _a.length;
      _i++
    ) {
      var s = _a[_i];
      if (s.meta[meta]) {
        return true;
      }
    }
    return false;
  };
  Game_Actor2.prototype.countSkillMeta = function (meta) {
    var n = 0;
    for (var _i = 0, _a = this.skills(false); _i < _a.length; _i++) {
      var s = _a[_i];
      if (s.meta[meta]) {
        var value = parseInt(s.meta[meta]);
        if (!isNaN(value)) {
          n += value;
        } else {
          n += 1;
        }
      }
    }
    return n;
  };
  Game_Actor2.prototype.hasEquipMeta = function (meta) {
    return this.countEquipMeta(meta) > 0;
  };
  Game_Actor2.prototype.countEquipMeta = function (meta) {
    var n = 0;
    for (var _i = 0, _a = this.equips(); _i < _a.length; _i++) {
      var e = _a[_i];
      if (!e) {
        continue;
      }
      n += e.meta(meta);
    }
    return n;
  };
  Game_Actor2.prototype.wrash = function () {
    return this._wrath || 0;
  };
  Game_Actor2.prototype.skillPointPlus = function () {
    return this._skillPointPlus + this.getActorHistory().countSkillPoint();
  };
  Game_Actor2.prototype.plusSkillPoint = function (n) {
    this._skillPointPlus += n;
  };
  Game_Actor2.prototype.paramPlus = function (paramId) {
    var value = Game_Battler.prototype.paramPlus.call(this, paramId);
    for (var _i = 0, _a = this.equips(); _i < _a.length; _i++) {
      var item = _a[_i];
      if (item) {
        value += item.param(paramId);
      }
    }
    return value;
  };
  Game_Actor2.prototype.levelUpBonusArmorList = function () {
    return [$dataArmors[100 + this.level - 1], $dataArmors[111]];
  };
  Game_Actor2.prototype.canEquip = function (equip) {
    if (!this.canEquipLv(equip)) {
      return false;
    }
    return this.canEquipType(equip);
  };
  Game_Actor2.prototype.canEquipCurced = function (e) {
    if (e.isCursed()) {
      if (this.hasCursedAcce()) {
        // すでに装着中
        return false;
      }
    }
    if (e.etypeId() == 3) {
      if (this.hasCursedAcce()) {
        // すでに装着中
        return false;
      }
    }
    return true;
  };
  Game_Actor2.prototype.canEquipType = function (equip) {
    return _super.prototype.canEquip.call(this, equip);
  };
  Game_Actor2.prototype.canEquipLv = function (equip) {
    if ($gameSystem.isLevelNoLimit()) {
      return true;
    }
    var lv = Math.trunc(equip.meta["lv"]);
    if (isNaN(lv)) {
      return true;
    }
    return lv <= this.level;
  };
  Game_Actor2.prototype.hpSortValue = function () {
    return this._shield * 100 + this.hp;
  };
  Game_Actor2.prototype.menuFaceId = function () {
    switch (this.actorId()) {
      case 1:
        return 6;
      case 2:
        return 3;
      case 3:
        return 1;
      case 6:
        return 2;
      case 7:
        return 6;
    }
    return 3;
  };
  Game_Actor2.prototype.shouldPopupDamage = function () {
    var result = this._result;
    if (result.shieldDamage() != 0) {
      return true;
    }
    return _super.prototype.shouldPopupDamage.call(this);
  };
  Game_Actor2.prototype.isAllMedalEquiped = function () {
    var slot = this.numMedalSlot();
    if (slot >= 1) {
      if (!this._medal1) {
        return false;
      }
    }
    if (slot >= 2) {
      if (!this._medal2) {
        return false;
      }
    }
    if (slot >= 3) {
      if (!this._medal3) {
        return false;
      }
    }
    if (slot >= 4) {
      if (!this._medal4) {
        return false;
      }
    }
    if (slot >= 5) {
      if (!this._medal5) {
        return false;
      }
    }
    return true;
  };
  Game_Actor2.prototype.findSkillByMeta = function (meta) {
    for (var _i = 0, _a = this.skills(); _i < _a.length; _i++) {
      var s = _a[_i];
      if (s.meta[meta]) {
        return s.id;
      }
    }
    return 0;
  };
  Game_Actor2.prototype.addState = function (stateId, turns) {
    if (stateId == this.deathStateId()) {
      if (!this.isDead()) {
        $gameMedals.onDeath();
      }
    }
    if (stateId == StateId.DAMAGE_RATE_UP) {
      turns = 1;
    }
    _super.prototype.addState.call(this, stateId, turns);
  };
  Game_Actor2.prototype.onAddState = function (stateId) {
    if (!this.hasSkillMeta(SkillMeta.stateMp)) {
      return;
    }
    /*if (stateId == this.deathStateId()) {
            return;
        }
        if (NOT_STATE_MP_IDS.contains(stateId)) {
            return;
        }
        if (this._stateMpFinished) {
            return;
        }
        this._stateMpFinished = true;
        this.gainMp(1);*/
  };
  Game_Actor2.prototype.onAddBuff = function (buffId) {
    if (!this.hasSkillMeta(SkillMeta.stateMp)) {
      return;
    }
    if (this._stateMpFinished) {
      return;
    }
    this._stateMpFinished = true;
    this.gainMp(1);
  };
  Game_Actor2.prototype.onPlayerTurnStart = function () {
    /*
        if (this.hasSkillMeta(SkillMeta.mpPlusTurnOdd)) {
            if (($gameTroop.turnCount() + 1) % 2 == 1) {
                this.gainMp(1);
                this.startDamagePopup();
            }
        }
        if (this.hasSkillMeta(SkillMeta.mpPlusTurnEven)) {
            if (($gameTroop.turnCount() + 1) % 2 == 0) {
                this.gainMp(1);
                this.startDamagePopup();
            }
        }
        */
    if (this.hasSkillMeta(SkillMeta.mpPlusTurnOdd)) {
      if (($gameTroop.turnCount() + 1) % 2 == 1) {
        this.addState(168, 1);
      }
    }
    if (this.hasSkillMeta(SkillMeta.mpPlusTurnEven)) {
      if (($gameTroop.turnCount() + 1) % 2 == 0) {
        this.addState(168, 1);
      }
    }
    this.addPassiveBuff();
    this.regenerateShieldPlus();
  };
  Game_Actor2.prototype.countEquip = function (meta) {
    var n = 0;
    for (var _i = 0, _a = this.battleEquips(); _i < _a.length; _i++) {
      var e = _a[_i];
      if (e) {
        n += e.meta(meta);
      }
    }
    return n;
  };
  Game_Actor2.prototype.gainMp = function (n) {
    _super.prototype.gainMp.call(this, n);
  };
  Game_Actor2.prototype.canKigae = function () {
    return this.getActorHistory().countNikubenki($gameSystem.day()) > 0;
  };
  Game_Actor2.prototype.nakadashiRakugakiCount = function () {
    var count = 0;
    for (var i = 0; i < Nore.NAKADASHI_COUNT_ACCE_LIST.length; i++) {
      var acce = Nore.NAKADASHI_COUNT_ACCE_LIST[i];
      if (this.acceMap[acce]) {
        count++;
      } else {
        return count;
      }
    }
    return Math.min(count, NAKADASHI_RAKUGAKI_MAX);
  };
  Game_Actor2.prototype.hasNakadashiSeieki = function () {
    var list = Nore.NAKADASHI_SEIEKI_ACCE_LIST;
    var value = 0;
    for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
      var acce = list_1[_i];
      if (this.hasAcce(acce)) {
        value++;
      }
    }
    return value > 0;
  };
  Game_Actor2.prototype.isObedienceOk = function (armor) {
    var n = Math.trunc(armor.meta["obedience"]);
    if (isNaN(n) || n <= 0) {
      return true;
    }
    if ($gameSystem.isTaikenban()) {
      return true;
    }
    var obedience = this.getActorHistory().countObedience($gameSystem.day());
    var rank = $gameSystem.obedienceRank(obedience);
    //p(rank + ' ' + n)
    return rank >= n;
  };
  Game_Actor2.prototype.isNastyOk = function (armor) {
    var n = Math.trunc(armor.meta["nasty"]);
    if (isNaN(n) || n <= 0) {
      return true;
    }
    if ($gameSystem.isTaikenban()) {
      return true;
    }
    var nasty = this.getActorHistory().countNasty($gameSystem.day());
    var rank = $gameSystem.obedienceRank(nasty);
    return rank >= n;
  };
  Game_Actor2.prototype.nastyText = function () {
    switch (this.actorId()) {
      case 1:
        return TextManager.obedience;
      case 2:
        return TextManager.maternal;
      case 3:
        return TextManager.nasty3;
      case 4:
        return TextManager.frightened;
      case 5:
        return TextManager.shame;
      case 6:
        return TextManager.sensitivity;
      case 7:
        return TextManager.mesuSyota;
      case 12:
        return TextManager.mazo;
    }
    return TextManager.nasty;
  };
  Game_Actor2.prototype.autoEquipMedals = function () {
    var medalList = this.allMedals();
    for (var i = 1; i <= 5; i++) {
      this.autoEquipMedal(i, medalList);
    }
  };
  Game_Actor2.prototype.autoEquipMedal = function (slot, medalList) {
    var armor = this["_medal" + slot];
    if (!armor) {
      return;
    }
    var newArmor = this.findUpperMedal(armor, medalList);
    if (newArmor) {
      this.changeEquip(slot + 2, newArmor);
      var index = medalList.indexOf(newArmor);
      if (index > 0) {
        medalList.splice(index, 1);
      }
      medalList.push(armor);
    }
  };
  Game_Actor2.prototype.findUpperMedal = function (medal, medalList) {
    for (var _i = 0, _a = getAllEquipParamTypes(); _i < _a.length; _i++) {
      var type = _a[_i];
      if (medal.getParam(type) > 0) {
        return this.findUpperMedalParam(medal, type, medalList);
      }
    }
  };
  Game_Actor2.prototype.findUpperMedalParam = function (
    medal,
    paramType,
    medalList
  ) {
    var max = null;
    var maxValue = medal.getParam(paramType);
    for (var _i = 0, medalList_1 = medalList; _i < medalList_1.length; _i++) {
      var armor = medalList_1[_i];
      if (armor.getParam(paramType) > maxValue) {
        maxValue = armor.getParam(paramType);
        max = armor;
      }
    }
    return max;
  };
  Game_Actor2.prototype.allMedals = function () {
    var list = [];
    var items = $gameParty.allItems();
    for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
      var item = items_1[_i];
      if (this.isMedal(item)) {
        list.push(item);
      }
    }
    return list;
  };
  Game_Actor2.prototype.isMedal = function (item) {
    if (!(item instanceof Equip)) {
      return false;
    }
    var equip = item;
    if (!equip.isMedal() && equip.lv() == 0) {
      return false;
    }
    return this.canEquipType(equip.item()) && equip.etypeId() === 5;
  };
  Game_Actor2.prototype.calcNikubenkiMinSkillPoint = function () {
    return 100;
  };
  Game_Actor2.prototype.onAction = function () {
    this.applyMpRecover();
    this.applyOugiBuff();
    this.applyItemMpRecover();
  };
  Game_Actor2.prototype.applyItemMpRecover = function () {
    if (!this.currentAction().isItem()) {
      return;
    }
    if ($gameParty.countSkill(SkillMeta.itemMp) > 0) {
      this.gainMp(1);
    }
  };
  Game_Actor2.prototype.applyMpRecover = function () {
    /*if (this.isBack()) {
            return;
        }*/
    if (!this.currentAction().isSkill()) {
      return;
    }
    var skill = this.currentAction().item();
    if (!$skillManager.isOugi(skill)) {
      return;
    }
    var ougiMpRecover = $gameParty.countSkill(SkillMeta.ougiMpRecover);
    if (ougiMpRecover == 0) {
      return;
    }
    this.gainMp(1);
    if (ougiMpRecover >= 2) {
      this.gainShield(5);
    }
  };
  Game_Actor2.prototype.applyOugiBuff = function () {
    if (this.isBack()) {
      return;
    }
    if (!this.currentAction().isSkill()) {
      return;
    }
    var skill = this.currentAction().item();
    if (!$skillManager.isOugi(skill)) {
      return;
    }
    var ougiBuff = $gameParty.countSkill(SkillMeta.ougiBuff);
    if (ougiBuff == 0) {
      return;
    }
    $gameParty.ougiBuff(ougiBuff);
  };
  Game_Actor2.prototype.isLearnNewSkill = function (level) {
    return this.newSkillByLevel(level) != null;
  };
  Game_Actor2.prototype.newSkillByLevel = function (level) {
    var skills = this.allLevelSkills();
    for (var i = 0; i < skills.length; i++) {
      var skill = skills[i];
      var learnLv = parseInt(skill.meta["learnLv"]);
      if (learnLv == level) {
        return skill;
      }
    }
    return null;
  };
  Game_Actor2.prototype.increaseSteps = function () {
    if (!this.hasCursedAcce()) {
      return;
    }
    if (!$gameParty.inDungeon()) {
      return;
    }
    if (this._cursedEroEventSteps <= 0) {
      return false;
    }
    this._cursedEroSteps = this._cursedEroSteps || 0;
    this._cursedEroSteps++;
    if (this._cursedEroSteps >= this._cursedEroEventSteps) {
      this.runCursedEroEvent();
    }
  };
  Game_Actor2.prototype.decideCursedEroEventSteps = function () {
    this._cursedEroEventSteps = Math.randomInt(500) + 40;
    this._cursedEroSteps = 0;
  };
  Game_Actor2.prototype.isCursedEroEvent = function () {
    if (!this.hasCursedAcce()) {
      return false;
    }
    if (this._cursedEroEventSteps <= 0) {
      return false;
    }
    return this._cursedEroSteps >= this._cursedEroEventSteps;
  };
  Game_Actor2.prototype.runCursedEroEvent = function () {
    $gameTemp.reserveCommonEvent(503);
  };
  Game_Actor2.prototype.clearCursedEvent = function () {
    this._cursedEroEventSteps = 0;
  };
  Game_Actor2.prototype.isNewCursedActor = function () {
    if (!this.hasCursedAcce()) {
      return false;
    }
    return this._cursedEroSteps == 0;
  };
  Game_Actor2.prototype.hasEroAcce = function () {
    for (var _i = 0, _a = this.acceList(); _i < _a.length; _i++) {
      var a = _a[_i];
      if (!a.isNoUp()) {
        return true;
      }
    }
    return false;
  };
  Game_Actor2.prototype.countHellFire = function () {
    return 0;
  };
  Game_Actor2.prototype.calcSkillLearnCount = function () {
    return this.allSkills().length;
  };
  Game_Actor2.prototype.needPowerupConfirm = function () {
    var actorSkillSet = new Nore.ActorSkillSet(this);
    var sp = this.skillPoint() * 10;
    var total = 0;
    var learnSkillCount = this.calcSkillLearnCount();
    for (var i = 0; i < 30; i++) {
      var candidates = actorSkillSet.candidates();
      var list = candidates.sort(function (a, b) {
        return a.price(true) - b.price(true);
      });
      var min = list[0];
      if (!min) {
        break;
      }
      //p(min.price(true) + total)
      var plus = learnSkillCount * Nore.SKILL_PRICE_UP * 10;
      if (min.price(true) + total + plus > sp) {
        break;
      }
      min.setReserve(true);
      total += min.price(true) + plus;
      learnSkillCount++;
    }
    return learnSkillCount - this.calcSkillLearnCount() > 0;
  };
  Game_Actor2.prototype.autoPowerUp = function () {
    var actorSkillSet = new Nore.ActorSkillSet(this);
    var sp = this.skillPoint() * 10;
    var total = 0;
    var learnSkillCount = this.calcSkillLearnCount();
    for (var i = 0; i < 30; i++) {
      var candidates = actorSkillSet.candidates();
      var list = candidates.sort(function (a, b) {
        return a.price(true) - b.price(true);
      });
      var min = list[0];
      if (!min) {
        break;
      }
      var plus = learnSkillCount * Nore.SKILL_PRICE_UP * 10;
      if (min.price(true) + total + plus > sp) {
        break;
      }
      min.setReserve(true);
      total += min.price(true) + plus;
      learnSkillCount++;
    }
    this.useSkillPoint(total / 10);
    for (var _i = 0, _a = actorSkillSet._items; _i < _a.length; _i++) {
      var set = _a[_i];
      set.learn();
    }
  };
  Game_Actor2.prototype.canSyusan = function () {
    return this.boteId >= 1;
  };
  Game_Actor2.prototype.canRanshi1 = function () {
    if (this.canSyusan()) {
      return false;
    }
    if (this.actorId() == 7) {
      // シャルル
      return false;
    }
    if (this.getActorHistory().countNinshinRate($gameSystem.day()) >= 99) {
      return false;
    }
    return true;
  };
  Game_Actor2.prototype.canFinalChokyo = function () {
    var nasty = this.getActorHistory().countNasty($gameSystem.day());
    if (nasty > 500) {
      return true;
    }
    return false;
  };
  Game_Actor2.prototype.aptitude = function (index) {
    var aptitude = this.actor().meta["aptitude" + index];
    switch (aptitude) {
      case "S":
        return Rank.S;
      case "A":
        return Rank.A;
      case "B":
        return Rank.B;
      case "C":
        return Rank.C;
      case "D":
        return Rank.D;
      case "E":
        return Rank.E;
      case "F":
        return Rank.F;
      case "G":
        return Rank.G;
      case "H":
        return Rank.H;
    }
    console.error("aptitudeが設定されていません:" + this.actorId());
    return Rank.H;
  };
  Game_Actor2.prototype.name = function () {
    switch (ConfigManager.language) {
      case "en":
        if (this.actor().meta["nameEn"]) {
          return this.actor().meta["nameEn"];
        }
        break;
      case "ch":
      case "jp":
        break;
    }
    return _super.prototype.name.call(this);
  };
  Game_Actor2.prototype.showAddedStates = function () {
    for (
      var _i = 0, _a = this.result().addedStateObjects();
      _i < _a.length;
      _i++
    ) {
      var state = _a[_i];
      if (state.message1) {
        $gameMessage.add(getMessage1(state).format(this.name()));
      }
    }
  };
  Game_Actor2.prototype.showRemovedStates = function () {
    for (
      var _i = 0, _a = this.result().removedStateObjects();
      _i < _a.length;
      _i++
    ) {
      var state = _a[_i];
      if (state.message4) {
        $gameMessage.add(getMessage4(state).format(this.name()));
      }
    }
  };
  Game_Actor2.prototype.babyList = function () {
    if (this.actorId() > 120 && this.actorId() <= 132) {
      return $gameActors.actor(this.actorId() - 120).babyList();
    }
    var babyList = [];
    var list = this.getActorHistory().getHistoryList();
    for (var _i = 0, list_2 = list; _i < list_2.length; _i++) {
      var history_1 = list_2[_i];
      if (this._day >= 0 && history_1.day() > this._day) {
        break;
      }
      for (var _a = 0, _b = history_1.getEventList(); _a < _b.length; _a++) {
        var event_1 = _b[_a];
        for (var _c = 0, _d = event_1.getScheduleList(); _c < _d.length; _c++) {
          var s = _d[_c];
          if (s.countSyusan() > 0) {
            var syusan = new Nore.SyusanInfo(s);
            babyList.push(syusan);
          }
        }
      }
    }
    var index = 0;
    for (var _e = 0, list_3 = list; _e < list_3.length; _e++) {
      var history_2 = list_3[_e];
      for (var _f = 0, _g = history_2.getEventList(); _f < _g.length; _f++) {
        var event_2 = _g[_f];
        for (var _h = 0, _j = event_2.getScheduleList(); _h < _j.length; _h++) {
          var s = _j[_h];
          if (s.countNinshin() > 0) {
            var syusan = babyList[index];
            if (!syusan) {
              break;
            }
            syusan.ninshin = history_2;
            syusan.ninshinSchedule = s;
            index++;
          }
        }
      }
    }
    var okList = [];
    for (var _k = 0, babyList_1 = babyList; _k < babyList_1.length; _k++) {
      var a = babyList_1[_k];
      if (a.syusan && a.ninshin) {
        okList.push(a);
      } else {
        console.error(this.actorId() + "の出産が不正です: babyList");
      }
    }
    return okList;
  };
  Game_Actor2.prototype.milkItem = function () {
    return $dataItems[40 + this._actorId];
  };
  /**
   * 母乳の数
   */
  Game_Actor2.prototype.milkNum = function () {
    switch (this._actorId) {
      case 3:
      case 5:
        return 3;
      case 1:
      case 2:
        return 2;
      default:
        return 1;
    }
  };
  Game_Actor2.prototype.isRakugakiEdited = function () {
    if (this.hasAcce(1050)) {
      return true;
    }
    return false;
  };
  Game_Actor2.prototype.notNikubenkiOuter = function () {
    switch (this.outerId) {
      case "b":
      case "g":
        return true;
    }
    return false;
  };
  Game_Actor2.prototype.updateEroAcce = function () {
    if (this.actorId() != 7) {
      return;
    }
    if (!this.hasCursedAcce()) {
      return;
    }
    this.removeGroup(62, $dataArmors[1063]);
    if (this.outerId == "h") {
      this.setOuterId("b");
      this.setCacheChanged();
    }
  };
  Game_Actor2.prototype.beforeInput = function () {
    this._reactOnAction = false;
  };
  Game_Actor2.prototype.isReactedOnAction = function () {
    return this._reactOnAction;
  };
  Game_Actor2.prototype.getBathPriority = function () {
    switch (this.actorId()) {
      case 1:
        return 100;
      case 3:
        return 99;
      case 7:
        return 98;
      case 2:
        return 97;
      case 4:
        return 96;
      case 5:
        return 95;
      case 6:
        return 94;
      case 10:
        return 93;
      case 12:
        return 92;
    }
    return 0;
  };
  Game_Actor2.prototype.lastSyusanBaby = function () {
    var babyList = [];
    var index = 0;
    var list = this.getActorHistory().getHistoryList();
    for (var _i = 0, list_4 = list; _i < list_4.length; _i++) {
      var history_3 = list_4[_i];
      for (var _a = 0, _b = history_3.getEventList(); _a < _b.length; _a++) {
        var event_3 = _b[_a];
        for (var _c = 0, _d = event_3.getScheduleList(); _c < _d.length; _c++) {
          var s = _d[_c];
          if (s.countSyusan() > 0) {
            var syusan = new Nore.SyusanInfo(s);
            babyList.push(syusan);
          }
        }
      }
    }
    for (var _e = 0, list_5 = list; _e < list_5.length; _e++) {
      var history_4 = list_5[_e];
      for (var _f = 0, _g = history_4.getEventList(); _f < _g.length; _f++) {
        var event_4 = _g[_f];
        for (var _h = 0, _j = event_4.getScheduleList(); _h < _j.length; _h++) {
          var s = _j[_h];
          if (s.countNinshin() > 0) {
            var syusan = babyList[index];
            if (!syusan) {
              break;
            }
            syusan.ninshin = history_4;
            syusan.ninshinSchedule = s;
            index++;
          }
        }
      }
    }
    if (babyList.length == 0) {
      return null;
    }
    return babyList[babyList.length - 1];
  };
  Game_Actor2.prototype.syusanBaby = function (argIndex) {
    var babyList = this.allSyusanBaby();
    if (babyList.length == 0) {
      return null;
    }
    return babyList[babyList.length - argIndex];
  };
  Game_Actor2.prototype.allSyusanBaby = function () {
    var babyList = [];
    var index = 0;
    var list = this.getActorHistory().getHistoryList();
    for (var _i = 0, list_6 = list; _i < list_6.length; _i++) {
      var history_5 = list_6[_i];
      for (var _a = 0, _b = history_5.getEventList(); _a < _b.length; _a++) {
        var event_5 = _b[_a];
        for (var _c = 0, _d = event_5.getScheduleList(); _c < _d.length; _c++) {
          var s = _d[_c];
          if (s.countSyusan() > 0) {
            var syusan = new Nore.SyusanInfo(s);
            babyList.push(new SyusanSet(history_5, syusan));
          }
        }
      }
    }
    for (var _e = 0, list_7 = list; _e < list_7.length; _e++) {
      var history_6 = list_7[_e];
      for (var _f = 0, _g = history_6.getEventList(); _f < _g.length; _f++) {
        var event_6 = _g[_f];
        for (var _h = 0, _j = event_6.getScheduleList(); _h < _j.length; _h++) {
          var s = _j[_h];
          if (s.countNinshin() > 0) {
            var syusanSet = babyList[index];
            if (!syusanSet) {
              break;
            }
            var syusan = syusanSet.syusanInfo;
            syusan.ninshin = history_6;
            syusan.ninshinSchedule = s;
            index++;
          }
        }
      }
    }
    var okList = [];
    for (var _k = 0, babyList_2 = babyList; _k < babyList_2.length; _k++) {
      var a = babyList_2[_k];
      if (a.syusanInfo.ninshinSchedule) {
        okList.push(a);
      } else {
        console.error(this.actorId() + "の出産が不正です");
      }
    }
    return okList;
  };
  Game_Actor2.prototype.previousSyusanBaby = function (selectedHistory) {
    var babyList = this.allSyusanBaby();
    if (babyList.length == 0) {
      return null;
    }
    var previous = babyList[0];
    for (var i = 1; i < babyList.length; i++) {
      var current = babyList[i];
      if (current.history.day() == selectedHistory.day()) {
        return previous;
      }
      previous = current;
    }
    return null;
  };
  Game_Actor2.prototype.nextSyusanBaby = function (selectedHistory) {
    var babyList = this.allSyusanBaby();
    if (babyList.length == 0) {
      return null;
    }
    var previous = babyList[0];
    for (var i = 1; i < babyList.length; i++) {
      var current = babyList[i];
      if (previous.history.day() == selectedHistory.day()) {
        return current;
      }
      previous = current;
    }
    return null;
  };
  return Game_Actor2;
})(Game_CostumeActor);
var SyusanSet = /** @class */ (function () {
  function SyusanSet(history, syusanInfo) {
    this.history = history;
    this.syusanInfo = syusanInfo;
  }
  return SyusanSet;
})();
Sprite_Actor.prototype.setupDamagePopup = function () {
  if (this._battler.isDamagePopupRequested()) {
    if (this._battler.isSpriteVisible()) {
      this.createDamageSprite();
    }
    this._battler.clearDamagePopup();
    this._battler.clearResult();
  }
};
Sprite_Actor.prototype.updateBitmap = function () {
  Sprite_Battler.prototype.updateBitmap.call(this);
  var name = this._actor.battlerName();
  if (this._battlerName !== name) {
    this._battlerName = name;
  }
};
Sprite_Actor.prototype.createShadowSprite = function () {
  this._shadowSprite = new Sprite();
  this.addChild(this._shadowSprite);
};
Sprite_Actor.prototype.stepForward = function () {};
Sprite_Actor.prototype.stepBack = function () {};
