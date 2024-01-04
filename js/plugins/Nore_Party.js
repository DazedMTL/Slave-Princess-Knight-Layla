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
 * @command ResetCrystal
 * @text 蒼結晶リセット
 * @des 蒼結晶リセット
 *
 * @command GainSkillPoint
 * @text スキルポイント獲得
 * @des スキルポイント獲得
 * @arg value
 * @type number
 *
 * @command AutoArrange
 * @text AutoArrange
 * @des AutoArrange
 *
 * @command LoseCrystal
 * @text 蒼結晶を失う
 * @des 蒼結晶を失う
 *
 * @command GainMidpointItem
 * @text 中間地点のアイテムを獲得する
 * @des 中間地点のアイテムを獲得する
 *
 * @command GainEndpointItem
 * @text ボス前のアイテムを獲得する
 * @des ボス前のアイテムを獲得する
 *
 * @command GainBattleItem
 * @text バトルアイテムを獲得する
 * @des バトルアイテムを獲得する
 * @arg itemId
 * @type number
 * @text itemId
 * @desc itemId
 *
 * @command GainMilkCrystal
 * @text 母乳を蒼結晶と交換する
 * @des 母乳を蒼結晶と交換する
 *
 * @command RecoverShield
 * @text シールド回復
 * @des シールド回復
 * @arg value
 * @type number
 *
 */
var RECOVER_CIV_CRYSTAL = 50;
var NO_ITEM_VAR = 133;
var Nore;
(function (Nore) {
  var pluginName = "Nore_Party";
  PluginManager.registerCommand(pluginName, "ResetCrystal", function (args) {
    $gameParty.resetCrystal();
  });
  PluginManager.registerCommand(pluginName, "GainSkillPoint", function (args) {
    var value = Math.trunc(args.value);
    $gameParty.gainSkillPoint(value);
  });
  PluginManager.registerCommand(pluginName, "AutoArrange", function (args) {
    $gameParty.autoArrange();
    $gameParty.recoverShield();
  });
  PluginManager.registerCommand(pluginName, "LoseCrystal", function (args) {
    var value = $gameVariables.value(CRYSTAL_VAR);
    var n = Math.trunc(value / 3);
    $gameVariables.setValue(20, n);
    $gameParty.loseCrystal(n);
  });
  PluginManager.registerCommand(
    pluginName,
    "GainMidpointItem",
    function (args) {
      $gameParty.gainMidpointItem();
    }
  );
  PluginManager.registerCommand(
    pluginName,
    "GainEndpointItem",
    function (args) {
      $gameParty.gainEndpointItem();
    }
  );
  PluginManager.registerCommand(pluginName, "GainBattleItem", function (args) {
    var itemId = Math.trunc(args.itemId);
    $gameParty.gainBattleItem($dataItems[itemId]);
  });
  PluginManager.registerCommand(pluginName, "GainMilkCrystal", function (args) {
    $gameParty.gainMilkCrystal();
  });
  PluginManager.registerCommand(pluginName, "RecoverShield", function (args) {
    var value = Math.trunc(args.value);
    $gameParty.recoverShieldValue(value);
  });
})(Nore || (Nore = {}));
var SKILL_POINT;
(function (SKILL_POINT) {
  SKILL_POINT[(SKILL_POINT["DUNGEON_START"] = 20)] = "DUNGEON_START";
  SKILL_POINT[(SKILL_POINT["WIN_BATTLE"] = 5)] = "WIN_BATTLE";
})(SKILL_POINT || (SKILL_POINT = {}));
var SIROHATA_ID = 17;
var BAKUDAN_ID = 19;
var SUISIDE_ID = 21;
var BATTLE_COS_ID = 1;
var CAPTIVE_COS_ID = 2;
var TEMP_COS_ID = 3;
var CRYSTAL_VAR = 68;
var Game_NoreParty = /** @class */ (function (_super) {
  __extends(Game_NoreParty, _super);
  function Game_NoreParty() {
    var _this = (_super !== null && _super.apply(this, arguments)) || this;
    _this._frontMembers = [];
    _this._backMembers = [];
    _this._skills = [];
    _this._skillPoint = 0;
    _this._partyExp = 0;
    _this._ougi = 0;
    _this._battleItems = [];
    _this._battleItemMax = 3;
    _this._crystal = 0;
    _this._criRate = 0;
    _this._prisonInfo = new PrisonInfo();
    _this._prisonerInfo = new PrisonerInfo();
    _this._weaponList = [];
    _this._armorList = [];
    _this._kubihaneExecuted = false;
    return _this;
  }
  Game_NoreParty.prototype.swap = function (actor1, actor2) {
    var id1 = Math.trunc(actor1.actorId());
    var id2 = Math.trunc(actor2.actorId());
    var x = this._actors.indexOf(id1);
    var y = this._actors.indexOf(id2);
    if (x < 0) {
      console.error(id1 + " not found.");
      return;
    }
    if (y < 0) {
      console.error(id2 + " not found.");
      return;
    }
    var id = id2;
    this._actors[y] = id1;
    this._actors[x] = id;
  };
  Game_NoreParty.prototype.menuActor = function () {
    var actor = $gameActors.actor(this._menuActorId);
    return actor;
  };
  Game_NoreParty.prototype.setMenuActor = function (actor) {
    this._menuActorId = actor.actorId();
  };
  Game_NoreParty.prototype.battleMembers = function (stage) {
    if (stage === void 0) {
      stage = null;
    }
    return this.allBattleMembers(stage).filter(function (actor) {
      return actor.isAppeared();
    });
  };
  Game_NoreParty.prototype.allBattleMembers = function (stage) {
    if (stage === void 0) {
      stage = null;
    }
    return this.allMembers().slice(0, this.maxBattleMembers(stage));
  };
  Game_NoreParty.prototype.maxBattleMembers = function (stage) {
    if (stage === void 0) {
      stage = null;
    }
    if (!stage) {
      stage = $gameVariables.value(2);
    }
    switch (stage) {
      case 0:
        return 3;
      case 1:
        return 3;
      case 2:
        return 4;
      case 3:
        return 5;
      case 8:
        return 6;
      default:
        return 5;
    }
    return $gameVariables.value(4) || 3;
  };
  Game_NoreParty.prototype.frontMembers = function () {
    var result = [];
    for (var _i = 0, _a = this._frontMembers; _i < _a.length; _i++) {
      var actorId = _a[_i];
      result.push($gameActors.actor(actorId));
    }
    return result;
  };
  Game_NoreParty.prototype.backMembers = function () {
    var result = [];
    for (var _i = 0, _a = this._backMembers; _i < _a.length; _i++) {
      var actorId = _a[_i];
      result.push($gameActors.actor(actorId));
    }
    return result;
  };
  Game_NoreParty.prototype.toFront = function (actor) {
    var index = this._backMembers.indexOf(actor.actorId());
    if (index < 0) {
      return;
    }
    this._backMembers.splice(index, 1);
    this._frontMembers.push(actor.actorId());
  };
  Game_NoreParty.prototype.toBack = function (actor) {
    var index = this._frontMembers.indexOf(actor.actorId());
    if (index < 0) {
      return;
    }
    this._frontMembers.splice(index, 1);
    this._backMembers.push(actor.actorId());
  };
  Game_NoreParty.prototype.autoArrange = function () {
    this._frontMembers = [];
    this._backMembers = [];
    for (var _i = 0, _a = this.battleMembers(); _i < _a.length; _i++) {
      var m = _a[_i];
      if (m.actor().meta["front"]) {
        this._frontMembers.push(m.actorId());
      } else if (m.actor().meta["back"]) {
        this._backMembers.push(m.actorId());
      }
    }
    for (var _b = 0, _c = this.battleMembers(); _b < _c.length; _b++) {
      var m = _c[_b];
      if (m.actor().meta["center"]) {
        if (this._frontMembers.length <= this._backMembers.length) {
          this._frontMembers.push(m.actorId());
        } else {
          this._backMembers.push(m.actorId());
        }
      }
    }
  };
  Game_NoreParty.prototype.clearForecast = function () {
    for (var _i = 0, _a = this.battleMembers(); _i < _a.length; _i++) {
      var m = _a[_i];
      m.clearForecast();
    }
  };
  Game_NoreParty.prototype.randomTarget = function (targetInfo) {
    if (targetInfo.priorityTarget()) {
      if (this.aliveMembers().contains(targetInfo.priorityTarget())) {
        return targetInfo.priorityTarget();
      }
    }
    if (targetInfo.isYowaimono()) {
      return this.yowaimonoTarget(this.aliveMembers());
    }
    return _super.prototype.randomTarget.call(this, targetInfo);
  };
  Game_NoreParty.prototype.randomFrontTarget = function (targetInfo) {
    if (this.aliveFrontMembers().length == 0) {
      if (this.aliveBackMembers().length == 0) {
        return null;
      }
      return this.randomBackTarget(targetInfo);
    }
    var candidates = this.aliveFrontMembers();
    if (targetInfo.priorityTarget()) {
      if (candidates.contains(targetInfo.priorityTarget())) {
        return targetInfo.priorityTarget();
      }
    }
    if (targetInfo.isYowaimono()) {
      return this.yowaimonoTarget(candidates);
    }
    var tgrRand = Math.random() * this.tgrFrontSum();
    var target = null;
    for (
      var _i = 0, candidates_1 = candidates;
      _i < candidates_1.length;
      _i++
    ) {
      var member = candidates_1[_i];
      tgrRand -= member.tgr;
      if (tgrRand <= 0 && !target) {
        target = member;
      }
    }
    return target;
  };
  Game_NoreParty.prototype.randomBackTarget = function (targetInfo) {
    if (this.aliveBackMembers().length == 0) {
      return this.randomFrontTarget(targetInfo);
    }
    if (targetInfo.priorityTarget()) {
      if (this.aliveMembers().contains(targetInfo.priorityTarget())) {
        return targetInfo.priorityTarget();
      }
    }
    var candidates = this.aliveBackMembers();
    if (targetInfo.isYowaimono()) {
      return this.yowaimonoTarget(candidates);
    }
    var tgrRand = Math.random() * this.tgrBackSum();
    var target = null;
    for (
      var _i = 0, candidates_2 = candidates;
      _i < candidates_2.length;
      _i++
    ) {
      var member = candidates_2[_i];
      tgrRand -= member.tgr;
      if (tgrRand <= 0 && !target) {
        target = member;
      }
    }
    return target;
  };
  Game_NoreParty.prototype.randomLineTargets = function (info) {
    var priorityTarget = info.priorityTarget();
    if (priorityTarget) {
      if (this.frontMembers().contains(priorityTarget)) {
        return this.frontMembers();
      } else if (this.backMembers().contains(priorityTarget)) {
        return this.backMembers();
      }
    }
    var isBack = Math.randomInt(2) == 0;
    if (isBack) {
      var members = this.backMembers();
      if (members.length > 0) {
        return members;
      }
    }
    return this.frontMembers();
  };
  Game_NoreParty.prototype.tgrFrontSum = function () {
    return this.aliveFrontMembers().reduce(function (r, member) {
      return r + member.tgr;
    }, 0);
  };
  Game_NoreParty.prototype.tgrBackSum = function () {
    return this.aliveBackMembers().reduce(function (r, member) {
      return r + member.tgr;
    }, 0);
  };
  Game_NoreParty.prototype.aliveFrontMembers = function () {
    return this.frontMembers().filter(function (member) {
      return member.isAlive();
    });
  };
  Game_NoreParty.prototype.aliveBackMembers = function () {
    return this.backMembers().filter(function (member) {
      return member.isAlive();
    });
  };
  Game_NoreParty.prototype.updateFormation = function () {
    var index = 0;
    var fronts = this.frontMembers();
    for (var i = 0; i < fronts.length; i++) {
      var front = fronts[i];
      if (front.isAlive()) {
        return;
      }
    }
    for (var _i = 0, fronts_1 = fronts; _i < fronts_1.length; _i++) {
      var front = fronts_1[_i];
      front.toBack();
    }
    for (var _a = 0, _b = this.backMembers(); _a < _b.length; _a++) {
      var back = _b[_a];
      back.toFront();
    }
    var tmp = this._frontMembers;
    this._frontMembers = this._backMembers;
    this._backMembers = tmp;
  };
  Game_NoreParty.prototype.isDropItem = function () {
    if ($gameSwitches.value(44)) {
      // エリート戦闘
      return true;
    }
    if ($gameVariables.value(NO_ITEM_VAR) >= 2) {
      // 前回アイテムなし
      $gameVariables.setValue(NO_ITEM_VAR, 0);
      return true;
    }
    var rate = 50;
    switch (this.battleItems().length) {
      case 0:
        rate += 20;
        break;
      case 1:
        rate += 10;
        break;
    }
    rate += $gameParty.countSkill(SkillMeta.itemGet);
    var isGet = Math.randomInt(100) <= rate;
    if (isGet) {
      $gameVariables.setValue(NO_ITEM_VAR, 0);
    } else {
      $gameVariables.setValue(
        NO_ITEM_VAR,
        $gameVariables.value(NO_ITEM_VAR) + 1
      );
    }
    return isGet;
  };
  Game_NoreParty.prototype.saveCostumeAuto = function () {
    for (var _i = 0, _a = this.allEroMembers(); _i < _a.length; _i++) {
      var a = _a[_i];
      var slotId = 3;
      if (a.isCaptive()) {
        slotId = 4;
      }
      a.saveCostume(slotId);
    }
  };
  Game_NoreParty.prototype.restoreCostumeAuto = function () {
    for (var _i = 0, _a = this.allEroMembers(); _i < _a.length; _i++) {
      var a = _a[_i];
      var slotId = 3;
      if (a.isCaptive()) {
        slotId = 4;
      }
      if (!a.restoreCostume(slotId, false)) {
        console.error("actorId:" + a.actorId());
      }
    }
  };
  Game_NoreParty.prototype.saveCostume = function (slotId) {
    for (var _i = 0, _a = this.allEroMembers(); _i < _a.length; _i++) {
      var a = _a[_i];
      a.saveCostume(slotId);
    }
  };
  Game_NoreParty.prototype.restoreCostume = function (slotId) {
    for (var _i = 0, _a = this.allEroMembers(); _i < _a.length; _i++) {
      var a = _a[_i];
      a.restoreCostume(slotId, true);
    }
  };
  Game_NoreParty.prototype.restoreCostumeDungeon = function () {
    for (var _i = 0, _a = this.battleMembers(); _i < _a.length; _i++) {
      var a = _a[_i];
      a.restoreCostume(BATTLE_COS_ID, false);
    }
  };
  Game_NoreParty.prototype.onPhaseChange = function () {
    for (var _i = 0, _a = this.members(); _i < _a.length; _i++) {
      var a = _a[_i];
      a.onPhaseChange();
    }
  };
  Game_NoreParty.prototype.size = function () {
    var n = _super.prototype.size.call(this);
    for (var i = 1; i <= 12; i++) {
      var actor = $gameActors.actor(i);
    }
    return n;
  };
  Game_NoreParty.prototype.totalMembers = function () {
    var members = this.members();
    for (var i = 1; i <= 12; i++) {
      var actor = $gameActors.actor(i);
      if (actor.isCaptive()) {
        members.push(actor);
      }
    }
    return members;
  };
  Game_NoreParty.prototype.allEroMembers = function () {
    var actorId = [1, 2, 3, 4, 5, 6, 7, 8, 10, 12];
    var result = [];
    for (var _i = 0, actorId_1 = actorId; _i < actorId_1.length; _i++) {
      var n = actorId_1[_i];
      result.push($gameActors.actor(n));
    }
    return result;
  };
  Game_NoreParty.prototype.calcTroopLevel = function () {
    var floor = $gameVariables.value(3);
    switch (floor) {
      case 0:
      case 1:
        return 1;
      case 2:
      case 3:
        return 2;
      case 4:
        return 3;
      case 5:
      case 6:
        if ($gameSystem.stageId() == 1) {
          // return 4;
        }
        return 3;
      case 7:
      case 8:
        if ($gameSystem.stageId() == 8) {
          return 3;
        }
        return 4;
      default:
        return 4;
    }
  };
  Game_NoreParty.prototype.calcTreasureLevel = function () {
    var floor = $gameVariables.value(3);
    if ($gameSwitches.value(Nore.ELITE_TREASURE_SW_ID)) {
      // エリート宝箱
      floor++;
    }
    var candidates = [];
    switch (floor) {
      case 1:
        candidates = [1, 1, 2];
      case 2:
        candidates = [1, 2, 3];
        break;
      case 3:
        candidates = [1, 2, 3, 3];
        break;
      case 4:
        candidates = [2, 3, 3, 3];
        break;
      case 5:
        candidates = [2, 3, 4, 4];
        break;
      case 6:
        candidates = [3, 3, 4, 5];
        break;
      case 7:
        candidates = [3, 4, 5];
        break;
      case 8:
        candidates = [4, 5];
        break;
      case 9:
        candidates = [4, 5];
        break;
      case 10:
        candidates = [4, 5];
        break;
      default:
        return 1;
    }
    var dice = Math.randomInt(candidates.length);
    return candidates[dice];
  };
  /*hasCaptiveActor() {
        const list = this.getCaptiveActorList();
        for (const a of list) {
            if (a.isSlave()) {
                continue;
            }
            return true;
        }
        return false;
    }*/
  Game_NoreParty.prototype.hasResqueActor = function () {
    var list = this.getCaptiveActorList();
    for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
      var a = list_1[_i];
      if (a.isSlave()) {
        continue;
      }
      if (a.isFound()) {
        return true;
      }
    }
    return false;
  };
  Game_NoreParty.prototype.getCaptiveActorList = function () {
    var result = [];
    var members = this.members();
    for (var i = 1; i <= 10; i++) {
      var actor = $gameActors.actor(i);
      if (actor.isCaptive()) {
        result.push(actor);
      }
    }
    return result;
  };
  Game_NoreParty.prototype.getPrisonerList = function () {
    var result = [];
    var members = this.members();
    for (var i = 1; i <= 10; i++) {
      var actor = $gameActors.actor(i);
      if (actor.isFound()) {
        continue;
      }
      if (actor.isCaptive()) {
        result.push(actor);
      }
    }
    return result;
  };
  Game_NoreParty.prototype.makeDefeatedScenario = function () {
    var battleList = this.battleMembers();
    if (battleList.length < 2) {
      return "敗北いべんとなし";
    }
    var shuffledList = Nore.shuffle(battleList);
    var list = [];
    list.push(shuffledList.pop().actorId());
    list.push(shuffledList.pop().actorId());
    var result = list.sort();
    var actor1 = $gameActors.actor(result[0]).actor().meta["jpName"];
    var actor2 = $gameActors.actor(result[1]).actor().meta["jpName"];
    return "撤退後_" + actor1 + "_" + actor2;
  };
  Game_NoreParty.prototype.gainSkillPoint = function (n) {
    this._skillPoint += n;
  };
  Game_NoreParty.prototype.totalSkillPoint = function () {
    return this._skillPoint;
  };
  Game_NoreParty.prototype.isBattleMember = function (actorId) {
    return this.battleMembers().contains($gameActors.actor(actorId));
  };
  Game_NoreParty.prototype.isDefeatMember = function (actorId) {
    var actor = $gameActors.actor(actorId);
    return actor.getLastHistory().hasSchedule(ScheduleType.DEFEAT);
  };
  Game_NoreParty.prototype.randomDedeatActor = function (
    defeatActorId,
    defeatCount
  ) {
    if (defeatCount == 0) {
      return [];
    }
    var candidates = [];
    for (var _i = 0, _a = this.battleMembers(); _i < _a.length; _i++) {
      var a = _a[_i];
      if (a.actorId() != defeatActorId) {
        candidates.push(a.actorId());
      }
    }
    var shuffle = Nore.shuffle(candidates);
    var result = [];
    for (var i = 0; i < defeatCount - 1; i++) {
      result.push(shuffle[i]);
    }
    result.push(defeatActorId);
    return result;
  };
  Game_NoreParty.prototype.isShortBattleMember = function () {
    return this.battleMembers().length < $gameVariables.value(4);
  };
  Game_NoreParty.prototype.selectRandomBattlerIndex = function () {
    var dice = Math.randomInt(this.battleMembers().length);
    return dice + 1;
  };
  Game_NoreParty.prototype.getActorIdList = function () {
    return [1, 3, 7, 2, 4, 5, 6, 10, 12];
  };
  Game_NoreParty.prototype.inDungeon = function () {
    return $gameSwitches.value(1);
  };
  Game_NoreParty.prototype.makeMenuActorNext = function () {
    if (this.inDungeon()) {
      this.makeBattleActorNext();
    } else {
      this.makeMenuActorNextAgito();
    }
  };
  Game_NoreParty.prototype.makeBattleActorNext = function () {
    var index = this.battleMembers().indexOf(this.menuActor());
    if (index >= 0) {
      index = (index + 1) % this.battleMembers().length;
      this.setMenuActor(this.battleMembers()[index]);
    } else {
      this.setMenuActor(this.battleMembers()[0]);
    }
  };
  Game_NoreParty.prototype.makeMenuActorNextAgito = function () {
    var actorId = this.menuActor().actorId();
    var index = this.getActorIdList().indexOf(actorId);
    index++;
    for (var i = 0; i < this.getActorIdList().length; i++) {
      var ii = i + index;
      if (this.getActorIdList().length <= ii) {
        ii -= this.getActorIdList().length;
      }
      var nextActorId = this.getActorIdList()[ii];
      var actor = $gameActors.actor(nextActorId);
      if (this.members().contains(actor)) {
        this.setMenuActor(actor);
        return;
      }
    }
  };
  Game_NoreParty.prototype.makeMenuActorPrevious = function () {
    if (this.inDungeon()) {
      this.makeBattleActorPrevious();
    } else {
      this.makeMenuActorPreviousAgito();
    }
  };
  Game_NoreParty.prototype.makeBattleActorPrevious = function () {
    var index = this.battleMembers().indexOf(this.menuActor());
    if (index >= 0) {
      index =
        (index + this.battleMembers().length - 1) % this.battleMembers().length;
      this.setMenuActor(this.battleMembers()[index]);
    } else {
      this.setMenuActor(this.battleMembers()[0]);
    }
  };
  Game_NoreParty.prototype.makeMenuActorPreviousAgito = function () {
    var actorId = this.menuActor().actorId();
    var index = this.getActorIdList().indexOf(actorId);
    index--;
    for (var i = 0; i < this.getActorIdList().length; i++) {
      var ii = index - i;
      if (ii < 0) {
        ii += this.getActorIdList().length;
      }
      var nextActorId = this.getActorIdList()[ii];
      var actor = $gameActors.actor(nextActorId);
      if (this.members().contains(actor)) {
        this.setMenuActor(actor);
        return;
      }
    }
  };
  Game_NoreParty.prototype.sortedMembets = function () {
    var result = [];
    var members = this.totalMembers();
    var list = this.getActorIdList();
    for (var _i = 0, list_2 = list; _i < list_2.length; _i++) {
      var actorId = list_2[_i];
      var actor = $gameActors.actor(actorId);
      if (members.contains(actor)) {
        result.push(actor);
      }
    }
    return result;
  };
  Game_NoreParty.prototype.previousActor = function (id) {
    var actor = $gameActors.actor(id);
    var list = this.sortedMembets();
    var index = list.indexOf(actor);
    if (index > 0) {
      return list[index - 1];
    } else {
      return list[list.length - 1];
    }
  };
  Game_NoreParty.prototype.nextActor = function (id) {
    var actor = $gameActors.actor(id);
    var list = this.sortedMembets();
    var index = list.indexOf(actor);
    if (index < list.length - 1) {
      return list[index + 1];
    } else {
      return list[0];
    }
  };
  Game_NoreParty.prototype.recoverMp = function () {
    for (var _i = 0, _a = this.battleMembers(); _i < _a.length; _i++) {
      var a = _a[_i];
      a.recoverMp();
    }
  };
  Game_NoreParty.prototype.onDungeonStart = function () {
    this._partyExp = 0;
    this._ougi = 0;
    this._stage5Gimmick = new Stage5Gimmick();
    this.recoverMp();
    //this.restoreCostumeDungeon();
    this._battleItemMax = 3;
    this.gainSkillPoint(SKILL_POINT.DUNGEON_START);
    this.setupInitialLevel();
    this.gainInitialGold();
    this.gainInitialExp();
    this.gainInitialItems();
    this.setupInitialWeaponSw();
    this.selectMidpointItemId();
    this.clearCursedEvent();
    for (var _i = 0, _a = this.battleMembers(); _i < _a.length; _i++) {
      var a = _a[_i];
      a.onDungeonStart();
    }
    //this.gainInitialWeapons();
  };
  Game_NoreParty.prototype.selectMidpointItemId = function () {
    var candidates = [];
    for (var i = 10; i < 200; i++) {
      var item = $dataItems[i];
      if (item && item.meta["rate"]) {
        var count = Math.trunc(item.meta["rate"]);
        for (var k = 0; k < count; k++) {
          candidates.push(item);
        }
      }
    }
    this._midpointItemId = candidates[Math.randomInt(candidates.length)].id;
    this._endpointItemId = candidates[Math.randomInt(candidates.length)].id;
  };
  Game_NoreParty.prototype.gainMidpointItem = function () {
    var item = $dataItems[this._midpointItemId];
    this.gainBattleItem(item);
    $gameVariables.setValue(20, item.name);
  };
  Game_NoreParty.prototype.gainEndpointItem = function () {
    var item = $dataItems[this._endpointItemId];
    this.gainBattleItem(item);
    $gameVariables.setValue(20, item.name);
  };
  Game_NoreParty.prototype.gainInitialGold = function () {
    var n = 0;
    for (var _i = 0, _a = this.battleMembers(); _i < _a.length; _i++) {
      var a = _a[_i];
      n += a.countEquip(EquipMeta.gold);
    }
    n += this.countSkillMetaMax(SkillMeta.laboMoney);
    this.gainGold(n);
  };
  Game_NoreParty.prototype.gainInitialExp = function () {
    var n = 0;
    n += this.countSkillMetaMax(SkillMeta.laboExp);
    this.gainExp(n, true);
  };
  Game_NoreParty.prototype.countSkillMetaMax = function (meta) {
    var max = 0;
    for (var _i = 0, _a = this.skills(); _i < _a.length; _i++) {
      var s = _a[_i];
      if (s.meta[meta]) {
        var n = Math.trunc(s.meta[meta]);
        if (max < n) {
          max = n;
        }
      }
    }
    return max;
  };
  Game_NoreParty.prototype.setupInitialLevel = function () {
    var initialLevel = this.calcInitialLevel();
    for (var _i = 0, _a = this.battleMembers(); _i < _a.length; _i++) {
      var actor = _a[_i];
      for (var i = 2; i <= initialLevel; i++) {
        actor.levelUp();
        actor.recoverAll();
      }
    }
  };
  Game_NoreParty.prototype.gainInitialItems = function () {
    for (var _i = 0, _a = this.skills(); _i < _a.length; _i++) {
      var s = _a[_i];
      if (s.meta["laboInitialItem"]) {
        var itemId = parseInt(s.meta["laboInitialItem"]);
        this.gainBattleItem($dataItems[itemId]);
      }
      if (s.meta["laboItem"]) {
        var itemId = this.selectAttackItem();
        this.gainBattleItem($dataItems[itemId]);
      }
    }
  };
  Game_NoreParty.prototype.selectAttackItem = function () {
    var candidates = [];
    for (var i = 10; i < 200; i++) {
      var item = $dataItems[i];
      if (item && item.meta["rate"]) {
        if (item.meta["shieldHeal"]) {
          continue;
        }
        if (item.damage.type == 4) {
          // MP回復
          continue;
        }
        var count = Math.trunc(item.meta["rate"]);
        for (var k = 0; k < count; k++) {
          candidates.push(item);
        }
      }
    }
    return candidates[Math.randomInt(candidates.length)].id;
  };
  Game_NoreParty.prototype.setupInitialWeaponSw = function () {
    $gameSwitches.setValue(52, false);
    $gameSwitches.setValue(56, false);
    for (var _i = 0, _a = this.skills(); _i < _a.length; _i++) {
      var s = _a[_i];
      if (s.meta["laboWeapon"] == 1) {
        $gameSwitches.setValue(52, true);
      }
      if (s.meta["laboWeapon"] == 2) {
        $gameSwitches.setValue(56, true);
      }
    }
  };
  Game_NoreParty.prototype.hasPartySkill = function (meta) {
    for (var _i = 0, _a = this.skills(); _i < _a.length; _i++) {
      var s = _a[_i];
      if (s.meta[meta]) {
        return true;
      }
    }
    return false;
  };
  Game_NoreParty.prototype.gainInitialWeapons = function () {
    var i = 0;
    for (var _i = 0, _a = this.skills(); _i < _a.length; _i++) {
      var s = _a[_i];
      if (s.meta["laboWeapon"]) {
        var weaponLv = parseInt(s.meta["laboWeapon"]);
        var w = Nore.selectRandomWeapon(weaponLv, []);
        var weapon = new Weapon(w);
        this.gainItem(weapon, 1, false);
        i++;
        $gameVariables.setValue(50 + i, weapon.name());
      }
    }
  };
  Game_NoreParty.prototype.isMaxBattleItem = function () {
    return this.battleItems().length >= this.battleItemMax();
  };
  Game_NoreParty.prototype.calcInitialLevel = function () {
    var n = 1;
    for (var _i = 0, _a = this.skills(); _i < _a.length; _i++) {
      var s = _a[_i];
      if (s.meta["laboInitialLevel"]) {
        var level = parseInt(s.meta["laboInitialLevel"]);
        if (level > n) {
          n = level;
        }
      }
    }
    return n;
  };
  Game_NoreParty.prototype.onDungeonEnd = function () {
    this.forgetSkills();
    for (var _i = 0, _a = this.battleMembers(); _i < _a.length; _i++) {
      var a = _a[_i];
      a.onDungeonEnd();
    }
    this.disposeEquips();
    this._battleItems = [];
  };
  Game_NoreParty.prototype.disposeEquips = function () {
    this._weaponList = [];
    var armors = [];
    for (var _i = 0, _a = this._armorList; _i < _a.length; _i++) {
      var armor = _a[_i];
      if (armor.isMedal()) {
        armors.push(armor);
      } else {
      }
    }
    this._armorList = armors;
  };
  Game_NoreParty.prototype.gainExp = function (exp, skipPartyExp) {
    if (skipPartyExp === void 0) {
      skipPartyExp = false;
    }
    //p('gainExp:' + exp)
    if (!skipPartyExp) {
      $gameMedals.onExp(exp);
      this._partyExp += Math.floor(exp * this.partyExpRate());
    }
    for (var _i = 0, _a = this.battleMembers(); _i < _a.length; _i++) {
      var m = _a[_i];
      m.gainExp(Math.round(exp * this.partyExpRate()));
    }
  };
  Game_NoreParty.prototype.partyExpRate = function () {
    return 1 + this.countSkill(SkillMeta.partyExpPlus) / 100;
  };
  Game_NoreParty.prototype.loseExp = function (exp) {
    this._partyExp -= exp;
  };
  Game_NoreParty.prototype.partyExp = function () {
    return this._partyExp;
  };
  Game_NoreParty.prototype.canLevelUp = function () {
    var exp = this.partyExp();
    for (var _i = 0, _a = this.battleMembers(); _i < _a.length; _i++) {
      var a = _a[_i];
      if (a.canLevelUp(exp)) {
        return true;
      }
    }
    return false;
  };
  Game_NoreParty.prototype.gainGold = function (amount) {
    if (amount > 0) {
      $gameMedals.onGold(amount);
    }
    _super.prototype.gainGold.call(this, amount);
  };
  Game_NoreParty.prototype.isAllLevel1 = function () {
    for (var _i = 0, _a = this.battleMembers(); _i < _a.length; _i++) {
      var a = _a[_i];
      if (a.level > 1) {
        return false;
      }
    }
    return true;
  };
  Game_NoreParty.prototype.ougiTotal = function () {
    if (!$gameSwitches.value(17)) {
      return -1;
    }
    return this._ougi;
  };
  Game_NoreParty.prototype.gainOugi = function (n) {
    if (!this.hasOugiSkill()) {
      return;
    }
    //p('gainOugi:' + n);
    if ($gameSystem.stageId() == 6) {
      n *= 1.5;
    }
    this._ougi += Math.round(n * 0.7);
    this._ougi = Math.min(this._ougi, this.maxOugi());
  };
  Game_NoreParty.prototype.isOugiMax = function () {
    return this.ougiTotal() == this.maxOugi();
  };
  Game_NoreParty.prototype.consumeOugiPoint = function (n) {
    this._ougi -= n * 100;
  };
  Game_NoreParty.prototype.maxOugi = function () {
    var plus = 0;
    if (this._maxOugiPlus > 0) {
      plus = this._maxOugiPlus;
    }
    return (3 + plus) * 100;
  };
  Game_NoreParty.prototype.ougiPoint = function () {
    return Math.floor(this._ougi / 100);
  };
  Game_NoreParty.prototype.ougiRate = function () {
    return this._ougi % 100;
  };
  Game_NoreParty.prototype.isOugiEnabled = function () {
    return $gameSwitches.value(17) && this.hasOugiSkill();
  };
  Game_NoreParty.prototype.forgetSkills = function () {
    for (var _i = 0, _a = this.allEroMembers(); _i < _a.length; _i++) {
      var a = _a[_i];
      a.forgetSkills();
    }
  };
  Game_NoreParty.prototype.hasOugiSkill = function () {
    for (var _i = 0, _a = this.battleMembers(); _i < _a.length; _i++) {
      var actor = _a[_i];
      if (actor.hasOugiSkill()) {
        return true;
      }
    }
    return false;
  };
  Game_NoreParty.prototype.skills = function () {
    var result = [];
    for (var _i = 0, _a = this._skills; _i < _a.length; _i++) {
      var id = _a[_i];
      result.push($dataSkills[id]);
    }
    return result;
  };
  Game_NoreParty.prototype.countSkill = function (type) {
    var n = 0;
    for (var _i = 0, _a = this.skills(); _i < _a.length; _i++) {
      var skill = _a[_i];
      if (skill.meta[type]) {
        n += Math.trunc(skill.meta[type]);
      }
    }
    for (var _b = 0, _c = this.battleMembers(); _b < _c.length; _b++) {
      var m = _c[_b];
      if (m.isDead()) {
        continue;
      }
      n += m.countSkill(type);
    }
    return n;
  };
  Game_NoreParty.prototype.partySkill = function (type) {
    var n = 0;
    for (var _i = 0, _a = this.skills(); _i < _a.length; _i++) {
      var skill = _a[_i];
      if (skill.meta[type]) {
        n += parseInt(skill.meta[type]);
      }
    }
    return n;
  };
  Game_NoreParty.prototype.learnSkill = function (id) {
    this._skills.push(id);
  };
  Game_NoreParty.prototype.isLearnedSkill = function (id) {
    return this._skills.contains(id);
  };
  Game_NoreParty.prototype.battleItems = function () {
    var result = [];
    this._battleItems = this._battleItems || [];
    if (this.inBattle()) {
      if (
        $gameSystem.difficulty() == Difficulty.VERY_EASY ||
        $gameSystem.difficulty() == Difficulty.DUNGEON_SKIP
      ) {
        if ($gameSwitches.value(89)) {
          result.push($dataItems[SUISIDE_ID]);
        } else {
          result.push($dataItems[BAKUDAN_ID]);
        }
      }
    }
    for (var i = 0; i < this.battleItemMax() + 1; i++) {
      var id = this._battleItems[i];
      if (id) {
        var item = $dataItems[id];
        result.push(item);
      } else {
      }
    }
    if (this.inBattle()) {
      if ($gameSwitches.value(27)) {
        result.push($dataItems[SIROHATA_ID]);
      }
    }
    return result;
  };
  Game_NoreParty.prototype.isBattleItemOver = function () {
    return this._battleItems.length > this.battleItemMax();
  };
  Game_NoreParty.prototype.gainBattleItem = function (item) {
    this._battleItems.push(item.id);
  };
  Game_NoreParty.prototype.disposeBattleItem = function (index) {
    this._battleItems.splice(index, 1);
  };
  Game_NoreParty.prototype.battleItemMax = function () {
    var plus = 0;
    for (var _i = 0, _a = this.battleMembers(); _i < _a.length; _i++) {
      var a = _a[_i];
      plus += a.countSkill(SkillMeta.inventory);
    }
    return this._battleItemMax + plus;
  };
  Game_NoreParty.prototype.consumeItem = function (item) {
    if (!this.inDungeon()) {
      _super.prototype.consumeItem.call(this, item);
      return;
    }
    var index = this._battleItems.indexOf(item.id);
    if (index >= 0) {
      this._battleItems.splice(index, 1);
    }
  };
  Game_NoreParty.prototype.crystal = function () {
    return Math.round(this._crystal);
  };
  Game_NoreParty.prototype.gainCrystalValue = function (n) {
    this._crystal += n;
  };
  Game_NoreParty.prototype.gainCrystal = function (isElite) {
    var n = this.calcCrystal(isElite);
    this._crystal += n;
    var value = $gameVariables.value(CRYSTAL_VAR);
    $gameVariables.setValue(CRYSTAL_VAR, value + n);
    $gameSystem.getDungeonInfo().onCrystal(n);
    return n;
  };
  Game_NoreParty.prototype.calcCrystal = function (isElite) {
    var base = isElite ? 20 : 10;
    base *= this.crystalPriceRate();
    base *= this.crystalUpBonus();
    return Math.trunc(base);
    /*
        let random = (Math.random() / 5 - 0.1)
        p('random:' + random + ' base:' + base);
        return Math.round(base * (1 + random));
        */
  };
  Game_NoreParty.prototype.crystalPriceRate = function () {
    var rate = 1;
    return rate;
    /*for (let i =1 ; i < $gameSystem.stageId(); i++) {
            rate *= 2.2;
        }
        return rate;*/
  };
  Game_NoreParty.prototype.crystalUpBonus = function () {
    var n = this.countEquipMeta(EquipMeta.crystalUp);
    return (100 + n) / 100;
  };
  Game_NoreParty.prototype.countEquipMeta = function (meta) {
    var n = 0;
    for (var _i = 0, _a = this.battleMembers(); _i < _a.length; _i++) {
      var m = _a[_i];
      n += m.countEquipMeta(meta);
    }
    return n;
  };
  Game_NoreParty.prototype.canEquip = function (equip) {
    for (var _i = 0, _a = this.battleMembers(); _i < _a.length; _i++) {
      var actor = _a[_i];
      if (actor.canEquipType(equip)) {
        return true;
      }
    }
    return false;
  };
  Game_NoreParty.prototype.canEquipCursed = function (equip) {
    for (var _i = 0, _a = this.battleMembers(); _i < _a.length; _i++) {
      var actor = _a[_i];
      if (actor.canEquipCurced(equip)) {
        if (actor.canEquipType(equip.item())) {
          return true;
        }
      }
    }
    return false;
  };
  Game_NoreParty.prototype.loseCrystal = function (n) {
    this._crystal -= n;
  };
  Game_NoreParty.prototype.recoverAll = function () {
    for (var _i = 0, _a = this.members(); _i < _a.length; _i++) {
      var actor = _a[_i];
      actor.recoverAll();
    }
  };
  Game_NoreParty.prototype.regenerateShield = function () {
    var n = 0;
    for (var _i = 0, _a = this.aliveMembers(); _i < _a.length; _i++) {
      var m = _a[_i];
      var actor = m;
      n += actor.regenerateShield();
    }
    return n;
  };
  Game_NoreParty.prototype.prisonInfo = function () {
    this._prisonInfo.removeIllegalSlot();
    return this._prisonInfo;
  };
  Game_NoreParty.prototype.prisonerInfo = function () {
    return this._prisonerInfo;
  };
  Game_NoreParty.prototype.resetHoppe = function () {
    for (var _i = 0, _a = this.members(); _i < _a.length; _i++) {
      var actor = _a[_i];
      actor.setDefaultHoppeId(0);
    }
  };
  Game_NoreParty.prototype.gainItem = function (item, amount, includeEquip) {
    if (item instanceof Weapon) {
      if (amount > 0) {
        this._weaponList.push(item);
      } else {
        var index = this.equipIndex(item, this._weaponList);
        if (index >= 0) {
          this._weaponList.splice(index, 1);
        }
      }
      return;
    }
    if (item instanceof Armor) {
      if (amount > 0) {
        this._armorList.push(item);
      } else {
        var index = this.equipIndex(item, this._armorList);
        if (index >= 0) {
          this._armorList.splice(index, 1);
        }
      }
      return;
    }
    _super.prototype.gainItem.call(this, item, amount, includeEquip);
  };
  Game_NoreParty.prototype.equipIndex = function (e, list) {
    var index = -1;
    for (var i = 0; i < list.length; i++) {
      if (list[i].id() == e.id()) {
        return i;
      }
    }
    return -1;
  };
  Game_NoreParty.prototype.allItems = function () {
    var items = _super.prototype.allItems.call(this);
    for (var _i = 0, _a = this._weaponList; _i < _a.length; _i++) {
      var e = _a[_i];
      items.push(e);
    }
    for (var _b = 0, _c = this._armorList; _b < _c.length; _b++) {
      var e = _c[_b];
      items.push(e);
    }
    return items;
  };
  Game_NoreParty.prototype.hasItem = function (item) {
    if (item instanceof Equip) {
      if (item.isWeapon()) {
        return this.equipIndex(item, this._weaponList) >= 0;
      } else {
        return this.equipIndex(item, this._armorList) >= 0;
      }
    }
    return _super.prototype.hasItem.call(this, item);
  };
  Game_NoreParty.prototype.resetCrystal = function () {
    var price = 0;
    var laboManager = new Nore.LaboManager();
    var items = laboManager.createItems();
    for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
      var item = items_1[_i];
      price += item.cellPrice() / 10;
    }
    //this._crystal += price;
    this._crystal = 0;
    this._skills = [];
  };
  Game_NoreParty.prototype.onEnemyTurnStart = function () {
    for (var _i = 0, _a = this.battleMembers(); _i < _a.length; _i++) {
      var a = _a[_i];
      a.updateDebuffTurns();
      a.removeBuffsAuto();
      a.updateStateTurns();
      a.removeStatesAuto(1);
    }
  };
  Game_NoreParty.prototype.onPlayerTurnStart = function () {
    this._kubihaneExecuted = false;
    for (var _i = 0, _a = this.battleMembers(); _i < _a.length; _i++) {
      var a = _a[_i];
      a.updateBuffTurns();
      a.removeBuffsAuto();
      a.addBuffsAuto();
      a.removeStatesAuto(2);
      a.onPlayerTurnStart();
    }
    this.gainOugi(this.calcOugiAutoPlus());
  };
  Game_NoreParty.prototype.calcOugiAutoPlus = function () {
    var n = 0;
    for (var _i = 0, _a = this.battleMembers(); _i < _a.length; _i++) {
      var a = _a[_i];
      n += a.countSkill(SkillMeta.ougiAutoPlus);
    }
    return n;
  };
  Game_NoreParty.prototype.isNoMedalActorExists = function () {
    if ($gameSystem.difficulty() == Difficulty.DUNGEON_SKIP) {
      return false;
    }
    return this.findNoMedalActor() != null;
  };
  Game_NoreParty.prototype.findNoMedalActor = function () {
    for (var _i = 0, _a = this.battleMembers(); _i < _a.length; _i++) {
      var a = _a[_i];
      if (!a.isAllMedalEquiped()) {
        return a;
      }
    }
    return null;
  };
  Game_NoreParty.prototype.selectNoMedalActor = function () {
    var actor = this.findNoMedalActor();
    if (actor) {
      this.setMenuActor(actor);
    }
  };
  Game_NoreParty.prototype.isKubihaneExecuted = function () {
    return this._kubihaneExecuted;
  };
  Game_NoreParty.prototype.executeKubihane = function () {
    this._kubihaneExecuted = true;
  };
  Game_NoreParty.prototype.findMovableActor = function (actorId) {
    for (var _i = 0, _a = $gameParty.aliveMembers(); _i < _a.length; _i++) {
      var b = _a[_i];
      var a = b;
      if (!a.canMove()) {
        continue;
      }
      if (a.actorId() == actorId) {
        return a;
      }
    }
    return null;
  };
  Game_NoreParty.prototype.calcCriRate = function () {
    var n = 0;
    for (var _i = 0, _a = $gameParty.aliveMembers(); _i < _a.length; _i++) {
      var b = _a[_i];
      var a = b;
      n += a.countSkill(SkillMeta.critUpAll);
    }
    this._criRate = n / 100;
  };
  Game_NoreParty.prototype.onBattleStart = function (b) {
    this._inBattle = true;
    _super.prototype.onBattleStart.call(this, b);
    this.calcCriRate();
  };
  Game_NoreParty.prototype.criRate = function () {
    return this._criRate;
  };
  Game_NoreParty.prototype.countNikubenkiTotal = function () {
    var n = 0;
    for (var _i = 0, _a = $gameParty.members(); _i < _a.length; _i++) {
      var b = _a[_i];
      var a = b;
      n += a.getActorHistory().countNikubenki($gameSystem.day());
    }
    return n;
  };
  Game_NoreParty.prototype.canSkip = function () {
    var n = 0;
    for (var _i = 0, _a = $gameParty.battleMembers(); _i < _a.length; _i++) {
      var actor = _a[_i];
      if (!actor.isActionFinished()) {
        n++;
      }
    }
    return n >= 2;
  };
  Game_NoreParty.prototype.needLvUpConfirmBeforeBoss = function () {
    var exp = this.partyExp();
    for (var _i = 0, _a = $gameParty.battleMembers(); _i < _a.length; _i++) {
      var actor = _a[_i];
      if (actor.canLevelUp(exp)) {
        return true;
      }
    }
    return false;
  };
  Game_NoreParty.prototype.needLvUpConfirm = function () {
    var exp = this.partyExp();
    for (var _i = 0, _a = $gameParty.battleMembers(); _i < _a.length; _i++) {
      var actor = _a[_i];
      if (!actor.canLevelUp(exp)) {
        return false;
      }
    }
    return true;
  };
  Game_NoreParty.prototype.needCrystalConfirm = function () {
    if ($gameSystem.difficulty() == Difficulty.DUNGEON_SKIP) {
      return false;
    }
    if (this.isMaxCrystal()) {
      return false;
    }
    var n = this._crystal;
    var laboManager = new Nore.LaboManager();
    var set = laboManager.createItems();
    var canBuyCount = 0;
    for (var _i = 0, set_1 = set; _i < set_1.length; _i++) {
      var items = set_1[_i];
      items.reserve(items.learnedLv());
      if (items.price() == 0) {
        continue;
      }
      if (items.price() / 10 <= this._crystal) {
        canBuyCount++;
      }
    }
    return canBuyCount >= 2;
  };
  Game_NoreParty.prototype.needPowerupConfirm = function () {
    if ($gameSystem.difficulty() == Difficulty.DUNGEON_SKIP) {
      return false;
    }
    for (var _i = 0, _a = this.battleMembers(); _i < _a.length; _i++) {
      var actor = _a[_i];
      if (actor.needPowerupConfirm()) {
        return true;
      }
    }
    return false;
  };
  Game_NoreParty.prototype.isMaxCrystal = function () {
    var laboManager = new Nore.LaboManager();
    var set = laboManager.createItems();
    for (var _i = 0, set_2 = set; _i < set_2.length; _i++) {
      var items = set_2[_i];
      for (var _a = 0, _b = items._items; _a < _b.length; _a++) {
        var item = _b[_a];
        if (!item.isLearned()) {
          return false;
        }
      }
    }
    return true;
  };
  Game_NoreParty.prototype.autoLevelUp = function () {
    return;
    if (!$gameSystem.isAutoLevelUp()) {
      return;
    }
    for (var i = 0; i < 10; i++) {
      var actor = this.findMinExpActor();
      if (!actor) {
        return;
      }
      var exp = this.partyExp();
      if (!actor.canLevelUp(exp)) {
        return;
      }
      this.levelUpActor(actor);
    }
  };
  Game_NoreParty.prototype.findMinExpActor = function () {
    var min = 9999;
    var result = null;
    for (var _i = 0, _a = $gameParty.battleMembers(); _i < _a.length; _i++) {
      var actor = _a[_i];
      if (actor.nextRequiredExp() < min) {
        result = actor;
        min = actor.nextRequiredExp();
      }
    }
    return result;
  };
  Game_NoreParty.prototype.levelUpActor = function (actor) {
    var skills = actor.nextLevelSkills();
    for (var _i = 0, skills_1 = skills; _i < skills_1.length; _i++) {
      var skill = skills_1[_i];
      actor.learnSkill(skill.id);
    }
    //actor.addLevelUpBonusArmorList(actor.levelUpBonusArmorList());
    $gameParty.loseExp(actor.nextRequiredExp());
    actor.gainExp(actor.nextRequiredExp());
    actor.recoverShield();
  };
  Game_NoreParty.prototype.recoverShield = function () {
    for (var _i = 0, _a = this.battleMembers(); _i < _a.length; _i++) {
      var a = _a[_i];
      a.recoverShield();
    }
  };
  Game_NoreParty.prototype.recoverShieldValue = function (value) {
    for (var _i = 0, _a = this.battleMembers(); _i < _a.length; _i++) {
      var a = _a[_i];
      a.gainShield(value);
    }
  };
  Game_NoreParty.prototype.getStage5Gimmick = function () {
    return this._stage5Gimmick;
  };
  Game_NoreParty.prototype.deadMemberExists = function () {
    return this.deadMembers().length > 0;
  };
  Game_NoreParty.prototype.increaseSteps = function () {
    _super.prototype.increaseSteps.call(this);
    for (var _i = 0, _a = this.battleMembers(); _i < _a.length; _i++) {
      var a = _a[_i];
      a.increaseSteps();
    }
  };
  Game_NoreParty.prototype.clearCursedEvent = function () {
    for (var _i = 0, _a = this.battleMembers(); _i < _a.length; _i++) {
      var a = _a[_i];
      a.clearCursedEvent();
    }
  };
  Game_NoreParty.prototype.isLayeredCharacterEnabledMap = function () {
    var mapId = $gameMap.mapId();
    switch (mapId) {
      //case 8: // 拠点
      //case 70: // １面
      //case 210: // 拠点の部屋
      //case 71: // 滝壺の魔洞
      //case 75: // ピラミッド
      //case 5: // クリスタルケイブ
      //case 96: // 失われた聖堂
      case 109: // 還らずの森
      case 123: // 火山
      case 138: // 魔界
      case 238: // ミオリ出産
      //case 239: // サラ出産
      case 246: // ターニャ出産
      //case 248: // 託児所
      //case 249: // サラ出産
      case 264: // ネル出産
      case 265: // ネル出産
      case 267: // リン出産
        return true;
    }
    if ($dataMap.meta["costumeEnabledMap"]) {
      return true;
    }
    return false;
  };
  Game_NoreParty.prototype.hasEroAcce = function () {
    for (var _i = 0, _a = this.members(); _i < _a.length; _i++) {
      var a = _a[_i];
      if (a.hasEroAcce()) {
        return true;
      }
    }
    return false;
  };
  Game_NoreParty.prototype.hasCursedAcce = function () {
    for (var _i = 0, _a = this.members(); _i < _a.length; _i++) {
      var a = _a[_i];
      if (a.hasCursedAcce()) {
        return true;
      }
    }
    return false;
  };
  Game_NoreParty.prototype.hasSkillMeta = function (meta) {
    for (var _i = 0, _a = this.battleMembers(); _i < _a.length; _i++) {
      var a = _a[_i];
      if (a.isDead()) {
        continue;
      }
      if (a.hasSkillMeta(meta)) {
        return true;
      }
    }
    return false;
  };
  Game_NoreParty.prototype.autoPowerUp = function () {
    for (var _i = 0, _a = this.battleMembers(); _i < _a.length; _i++) {
      var actor = _a[_i];
      actor.autoPowerUp();
    }
    SoundManager.playShop();
  };
  Game_NoreParty.prototype.canSyusanActor = function () {
    for (var _i = 0, _a = this.members(); _i < _a.length; _i++) {
      var a = _a[_i];
      if (a.canSyusan()) {
        return true;
      }
    }
    return false;
  };
  Game_NoreParty.prototype.canRanshi1Actor = function () {
    for (var _i = 0, _a = this.members(); _i < _a.length; _i++) {
      var a = _a[_i];
      if (a.canRanshi1()) {
        return true;
      }
    }
    return false;
  };
  Game_NoreParty.prototype.gainMilkCrystal = function () {
    var charlesOnly = true;
    var itemList = [];
    for (var _i = 0, _a = this.allMembers(); _i < _a.length; _i++) {
      var a = _a[_i];
      for (
        var _b = 0, _c = a.getActorHistory().getHistoryList();
        _b < _c.length;
        _b++
      ) {
        var history_1 = _c[_b];
        var milkList = history_1.gainMilk();
        itemList = itemList.concat(milkList);
        if (milkList.length > 0 && a.actorId() != 7) {
          charlesOnly = false;
        }
      }
    }
    var n = this.crystalPriceRate() * itemList.length * 10;
    $gameVariables.setValue(20, n);
    $gameSwitches.setValue(20, charlesOnly);
    this._crystal += n;
  };
  Game_NoreParty.prototype.milkItems = function () {
    var itemList = [];
    for (var _i = 0, _a = this.allMembers(); _i < _a.length; _i++) {
      var a = _a[_i];
      for (
        var _b = 0, _c = a.getActorHistory().getHistoryList();
        _b < _c.length;
        _b++
      ) {
        var history_2 = _c[_b];
        itemList = itemList.concat(history_2.milk());
      }
    }
    var set = new MilkSet();
    for (var _d = 0, itemList_1 = itemList; _d < itemList_1.length; _d++) {
      var item = itemList_1[_d];
      set.push(item);
    }
    return set.makeList();
  };
  Game_NoreParty.prototype.hasCapturesCivilian = function () {
    return this._prisonerInfo.hasCapturesCivilian();
  };
  Game_NoreParty.prototype.recoverCivilian = function () {
    if (this._crystal < RECOVER_CIV_CRYSTAL) {
      return false;
    }
    this._crystal -= RECOVER_CIV_CRYSTAL;
    this._prisonerInfo.recoverCivilian();
    return true;
  };
  Game_NoreParty.prototype.allMemberCantMove = function () {
    for (var _i = 0, _a = this.battleMembers(); _i < _a.length; _i++) {
      var m = _a[_i];
      if (m.canMove()) {
        return false;
      }
    }
    return true;
  };
  Game_NoreParty.prototype.ougiBuff = function (buff) {
    for (var _i = 0, _a = this.battleMembers(); _i < _a.length; _i++) {
      var m = _a[_i];
      m.addBuff(BuffId.atk, buff, false);
      m.addBuff(BuffId.def, buff, false);
      m.addBuff(BuffId.mat, buff, false);
      m.addBuff(BuffId.mdf, buff, false);
    }
  };
  Game_NoreParty.prototype.onAfterLoad = function () {
    for (var _i = 0, _a = this.members(); _i < _a.length; _i++) {
      var m = _a[_i];
      if (!m.hasCursedAcce() || m.hasChimpo()) {
        switch (m.innerBottomId) {
          case "f":
          case "g":
          case "h":
            m._innerBottomId = "b";
            console.log("呪いアイテム復帰:" + m.actorId());
            break;
        }
      }
    }
  };
  return Game_NoreParty;
})(Game_Party);
var MilkSet = /** @class */ (function () {
  function MilkSet() {
    this._map = {};
  }
  MilkSet.prototype.push = function (milk) {
    if (this._map[milk.id]) {
      this._map[milk.id].num++;
    } else {
      this._map[milk.id] = new Milk(milk);
    }
  };
  MilkSet.prototype.makeList = function () {
    var array = [];
    for (var key in this._map) {
      var milk = this._map[key];
      array.push(milk);
    }
    array = array.sort(function (a, b) {
      return a.id() - b.id();
    });
    return array;
  };
  return MilkSet;
})();
var Milk = /** @class */ (function () {
  function Milk(item) {
    this._item = item;
    this.num = 1;
  }
  Milk.prototype.id = function () {
    return this._item.id;
  };
  Milk.prototype.item = function () {
    return this._item;
  };
  return Milk;
})();
