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
var STUN_ACTOR_EXIST_SW = 53;
var DRAGON_EGG_TRANSFORM_SW = 433;
/*:ja
 * @target MZ
 * @author ル
 *
 * @command ChangeEnemy
 * @text エネミー変更
 * @des エネミー変更
 * @arg number
 * @type number
 *
 * @command GoToBack
 * @text ラスボス用エネミーを後ろに
 * @des ラスボス用エネミーを後ろに
 *
 */
var Nore;
(function (Nore) {
  var pluginName = "Nore_Troop";
  var STAGE5_ENEMIES = [
    201, 207, 215, 214, 215, 204, 205, 206, 201, 204, 205, 206,
  ];
  PluginManager.registerCommand(pluginName, "ChangeEnemy", function (args) {
    //p('ChangeEnemy')
    var index = Math.trunc(args.number) - 1;
    var enemy = $gameTroop._enemies[index];
    var enemyId = STAGE5_ENEMIES[index];
    enemy.setup(enemyId, enemy.screenX(), enemy.screenY());
    enemy.initStates();
    //enemy.setup(2, enemy.screenX(), enemy.screenY());
    enemy.requestEffect("appear");
  });
  PluginManager.registerCommand(pluginName, "GoToBack", function (args) {
    if ($gameTroop._enemies[0]) {
      $gameTroop._enemies[0].toBack();
    }
    if ($gameTroop._enemies[2]) {
      $gameTroop._enemies[2].toBack();
    }
  });
})(Nore || (Nore = {}));
var DamageState = /** @class */ (function () {
  function DamageState(state, value) {
    this._state = state;
    this._value = value;
  }
  DamageState.prototype.state = function () {
    return this._state;
  };
  DamageState.prototype.value = function () {
    if (this._state.id == StateId.STUN) {
      return 1;
    }
    return this._value;
  };
  DamageState.prototype.iconIndex = function () {
    return this._state.iconIndex;
  };
  DamageState.prototype.unite = function (state, value) {
    if (this._state != state) {
      return false;
    }
    this._value += value;
    return true;
  };
  return DamageState;
})();
var DamageForecast = /** @class */ (function () {
  function DamageForecast(actor) {
    this._shieldDamage = 0;
    this._hpDamage = 0;
    this._stateList = [];
    this._actor = actor;
  }
  DamageForecast.prototype.reset = function () {
    this._normalDamage = 0;
    this._penetrateDamage = 0;
    this._shieldDamage = 0;
    this._hpDamage = 0;
    this._stateList = [];
  };
  DamageForecast.prototype.plusNormalDamage = function (n) {
    this._normalDamage += n;
  };
  DamageForecast.prototype.plusPenetrateDamage = function (n) {
    this._penetrateDamage += n;
  };
  DamageForecast.prototype.addDamage = function (action, damage) {
    if (action.remainTurn() > 1) {
      return;
    }
    if (action.isAlwaysMiss()) {
      return;
    }
    if (action.isPenetrate()) {
      this.plusPenetrateDamage(damage);
    } else {
      this.plusNormalDamage(damage);
    }
    if (!action.isDamage() || damage > 0) {
      this.addStateList(action);
    }
    this.refresh();
  };
  DamageForecast.prototype.addStateList = function (action) {
    if (this._actor.hasStateMeta(StateMeta.invalidateDebuff)) {
      return;
    }
    if (this._actor.hasStateMeta(StateMeta.damageCut)) {
      return;
    }
    for (var _i = 0, _a = action.item().effects; _i < _a.length; _i++) {
      var effect = _a[_i];
      //p(effect)
      switch (effect.code) {
        case Game_Action.EFFECT_ADD_STATE:
          this.applyItemEffect(effect, action);
      }
    }
  };
  DamageForecast.prototype.applyItemEffect = function (effect, action) {
    var state = $dataStates[effect.dataId];
    var value = action.stateValue();
    if (this.uniteStete(state, value)) {
    } else {
      this._stateList.push(new DamageState(state, value));
    }
  };
  DamageForecast.prototype.uniteStete = function (state, value) {
    for (var _i = 0, _a = this._stateList; _i < _a.length; _i++) {
      var damageState = _a[_i];
      if (damageState.unite(state, value)) {
        return true;
      }
    }
  };
  DamageForecast.prototype.getShieldDamage = function () {
    return this._shieldDamage;
  };
  DamageForecast.prototype.getHpDamage = function () {
    return this._hpDamage + this._penetrateDamage;
  };
  DamageForecast.prototype.refresh = function () {
    this._shieldDamage = this.calcShieldDamage();
    this._hpDamage = this.calcHpDamage();
  };
  DamageForecast.prototype.calcShieldDamage = function () {
    var shield = this._actor.shield();
    if (this._normalDamage >= shield) {
      return shield;
    } else {
      return this._normalDamage;
    }
  };
  DamageForecast.prototype.calcHpDamage = function () {
    var shield = this._actor.shield();
    if (this._normalDamage <= shield) {
      return 0;
    }
    var d = this._normalDamage - shield;
    //if (d >= this._actor.hp) {
    //  return this._actor.hp;
    //}
    return d;
  };
  DamageForecast.prototype.getStateList = function () {
    return this._stateList;
  };
  return DamageForecast;
})();
var Game_Troop2 = /** @class */ (function (_super) {
  __extends(Game_Troop2, _super);
  function Game_Troop2() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  Game_Troop2.prototype.setup = function (troopId) {
    this.clear();
    this._troopId = troopId;
    this._enemies = [];
    var members = this.troop().members;
    members = members.sort(function (a, b) {
      return a.x - b.x;
    });
    var num = members.length;
    var screenWidth = this.screenWidth(num);
    var left = (Graphics.width - screenWidth) / 2;
    var interval = screenWidth / num;
    var fixed = this.troop().name.contains("fixed");
    var margin = 0;
    var marginPlus = 0;
    if (this.troop().name.contains("margin")) {
      margin = -50;
      marginPlus = 50;
    }
    for (var _i = 0, members_1 = members; _i < members_1.length; _i++) {
      var member = members_1[_i];
      if ($dataEnemies[member.enemyId]) {
        var enemyId = this.getRealEnemyId(member.enemyId);
        //const x = member.x;
        var x = left + 100;
        if (fixed) {
          x = member.x;
        }
        var y = 500;
        var dataEnemy = $dataEnemies[enemyId];
        if (dataEnemy.meta["y"]) {
          y = parseInt(dataEnemy.meta["y"]);
        }
        var enemy = new Nore.Game_Enemy2(enemyId, x, y, member.y);
        if (member.hidden) {
          enemy.hide();
        }
        this._enemies.push(enemy);
        left += interval;
      }
    }
    this._forecastMap = {};
    for (var _a = 0, _b = $gameParty.battleMembers(); _a < _b.length; _a++) {
      var a = _b[_a];
      this._forecastMap[a.actorId()] = new DamageForecast(a);
    }
    this.makeUniqueNames();
    this.initSwitches();
  };
  Game_Troop2.prototype.getRealEnemyId = function (enemyId) {
    if (!$gameSystem.isHard()) {
      return enemyId;
    }
    var dataEnemy = $dataEnemies[enemyId];
    if (!dataEnemy.meta["hard"]) {
      return enemyId;
    }
    // ハード用のエネミー
    var hardEnemyId = parseInt(dataEnemy.meta["hard"]);
    return hardEnemyId;
  };
  Game_Troop2.prototype.initSwitches = function () {
    // ドラゴンエッグ変身
    $gameSwitches.setValue(DRAGON_EGG_TRANSFORM_SW, false);
  };
  Game_Troop2.prototype.screenWidth = function (num) {
    switch (num) {
      case 1:
        return Graphics.width - 1000;
      case 2:
        return Graphics.width - 580;
      case 3:
        return Graphics.width - 400;
      case 4:
        return Graphics.width - 300;
      default:
        return Graphics.width - 100;
    }
  };
  Game_Troop2.prototype.clearSelection = function () {
    for (var _i = 0, _a = this.members(); _i < _a.length; _i++) {
      var member = _a[_i];
      member.deselect();
    }
  };
  Game_Troop2.prototype.clearForecast = function () {
    for (var _i = 0, _a = this.members(); _i < _a.length; _i++) {
      var member = _a[_i];
      member.clearForecast();
    }
  };
  Game_Troop2.prototype.updateForecast = function () {
    for (var key in this._forecastMap) {
      var forcast = this._forecastMap[key];
      forcast.reset();
    }
    for (var _i = 0, _a = this.aliveMembers(); _i < _a.length; _i++) {
      var enemy = _a[_i];
      var action = enemy.currentAction();
      if (!action || !action.isValid()) {
        continue;
      }
      if (action.isNormalAttack() && enemy.hasState(5)) {
        // 暗闇
        continue;
      }
      for (var _b = 0, _c = action.makeTargets(); _b < _c.length; _b++) {
        var battler = _c[_b];
        if (battler.isEnemy()) {
          continue;
        }
        if (!action.isDamage()) {
          //continue;
        }
        var actor = battler;
        var damage2 = action.makeDamageValue(actor, false);
        this._forecastMap[actor.actorId()].addDamage(action, damage2);
      }
    }
  };
  Game_Troop2.prototype.getDamageForecast = function (actorId) {
    return this._forecastMap[actorId];
  };
  Game_Troop2.prototype.backMembers = function () {
    var result = [];
    for (var _i = 0, _a = this.members(); _i < _a.length; _i++) {
      var member = _a[_i];
      if (member.isDead()) {
        continue;
      }
      if (member.isBack()) {
        result.push(member);
      }
    }
    return result;
  };
  Game_Troop2.prototype.clearActions = function () {
    p("clear");
  };
  Game_Troop2.prototype.makeActions = function () {
    this.setupConditionSwitches();
    for (var _i = 0, _a = this.members(); _i < _a.length; _i++) {
      var member = _a[_i];
      var currentAction = member.currentAction();
      if (
        currentAction &&
        currentAction.isValid() &&
        currentAction.isWaiting()
      ) {
        continue;
      }
      member.makeActions();
    }
    this.updateForecast();
  };
  Game_Troop2.prototype.setupConditionSwitches = function () {
    $gameSwitches.setValue(STUN_ACTOR_EXIST_SW, false);
    for (var _i = 0, _a = $gameParty.aliveMembers(); _i < _a.length; _i++) {
      var actor = _a[_i];
      if (actor.hasState(Nore.STUN_STATE_ID)) {
        $gameSwitches.setValue(STUN_ACTOR_EXIST_SW, true);
        return;
      }
    }
  };
  Game_Troop2.prototype.frontMembers = function () {
    var result = [];
    for (var _i = 0, _a = this.members(); _i < _a.length; _i++) {
      var member = _a[_i];
      if (member.isDead()) {
        continue;
      }
      if (member.isFront()) {
        result.push(member);
      }
    }
    return result;
  };
  Game_Troop2.prototype.updateFormation = function () {
    for (var _i = 0, _a = this.backMembers(); _i < _a.length; _i++) {
      var back = _a[_i];
      var fronts = this.searchFrontList(back);
      for (var _b = 0, fronts_1 = fronts; _b < fronts_1.length; _b++) {
        var e = fronts_1[_b];
        var front = e;
        if (front.isDead() || front.isHidden()) {
          if ($gameTemp.isAutoBattle()) {
            back.setFront();
          } else {
            back.toFront();
          }
          break;
        }
      }
    }
  };
  Game_Troop2.prototype.searchFrontList = function (back) {
    var members = this.members();
    var index = members.indexOf(back);
    var before = members[index - 1];
    var after = members[index + 1];
    var result = [];
    if (before) {
      result.push(before);
    }
    if (after) {
      result.push(after);
    }
    return result;
  };
  Game_Troop2.prototype.onPhaseChange = function () {
    for (var _i = 0, _a = this.aliveMembers(); _i < _a.length; _i++) {
      var e = _a[_i];
      var enemy = e;
      enemy.onPhaseChange();
    }
  };
  Game_Troop2.prototype.selectTroopId = function (level) {
    p(
      "troopLevel:" +
        level +
        " " +
        $gameSystem.floorCount() +
        " " +
        $gameSystem.stageId()
    );
    this._level = level;
    var candidates = this.selectCandidates(level);
    if (candidates.length == 0) {
      console.error("level:" + level);
      return 4;
    }
    var dice = Math.randomInt(candidates.length);
    if ($gameVariables.value(72) > 0) {
      // デバッグ用
      dice = $gameVariables.value(72) - 1;
      p("debug troop:" + dice);
    }
    return candidates[dice];
  };
  Game_Troop2.prototype.selectCandidates = function (level) {
    var result = [];
    var start = this.selectStart();
    var end = start + 50;
    for (var i = start; i < end; i++) {
      var troop = $dataTroops[i];
      if (!troop) {
        continue;
      }
      var name_1 = troop.name;
      var regExp = /<([^<>:]+)(:?)([^>]*)>/g;
      var meta = {};
      for (;;) {
        var match = regExp.exec(name_1);
        if (match) {
          if (match[2] === ":") {
            meta[match[1]] = match[3];
          } else {
            meta[match[1]] = true;
          }
        } else {
          break;
        }
      }
      if (Math.trunc(meta["level"]) == level) {
        if ($gameSystem.getDungeonInfo().isEnabledTroop(i)) {
          result.push(i);
        }
      }
    }
    return result;
  };
  Game_Troop2.prototype.selectStart = function () {
    var isElite = $gameSwitches.value(44);
    var offset = isElite ? 50 : 0;
    switch ($gameSystem.stageId()) {
      case 1:
        return 1 + offset;
      case 2:
        return 101 + offset;
      case 3:
        return 201 + offset;
      case 4:
        return 301 + offset;
      case 5:
        return 401 + offset;
      case 6:
        return 501 + offset;
      case 7:
        return 601 + offset;
      case 8:
        return 701 + offset;
      case 9:
        return 801 + offset;
      case 10:
        return 901 + offset;
    }
    return 1;
  };
  Game_Troop2.prototype.expTotal = function () {
    var n = (this.baseExp() * this.expNumRate() * this.stageExpBonus()) / 1.5;
    //p(this.baseExp() + ' ' + this.expNumRate())
    //let n = this.deadMembers().reduce((r, enemy) => r + calcRealExp(enemy.exp()), 0);
    if ($gameTemp.isNoDamage()) {
      return Math.round(n * 2);
    }
    if ($gameTemp.is1Damage()) {
      return Math.round(n * 1.5);
    }
    if ($gameTemp.is2Damage()) {
      return Math.round(n * 1.2);
    }
    return Math.round(n);
  };
  Game_Troop2.prototype.stageExpBonus = function () {
    switch ($gameSystem.stageId()) {
      case 1:
        return 1;
      case 2:
        return 1.1;
      case 3:
        return 1.1;
      case 4:
        return 1.1;
      case 5:
        return 1.1;
      case 6:
        return 1.1;
      case 7:
        return 1.1;
      case 8:
        return 1.1;
      default:
        return 2;
    }
  };
  Game_Troop2.prototype.baseExp = function () {
    switch (this._level) {
      case 1:
        return 12;
      case 2:
        return 20;
      case 3:
        return 36;
      case 4:
        return 55;
      case 5:
        return 100;
      case 6:
        return 120;
      default:
        return 12;
    }
  };
  Game_Troop2.prototype.goldTotal = function () {
    var n = $gameSystem.getDungeonInfo().calcTreasureGold() / 4;
    if ($gameTemp.isNoDamage()) {
      return Math.round(n * 2);
    }
    if ($gameTemp.is1Damage()) {
      return Math.round(n * 1.5);
    }
    if ($gameTemp.is2Damage()) {
      return Math.round(n * 1.2);
    }
    return Math.round(n);
  };
  Game_Troop2.prototype.crystalTotal = function () {
    return this.goldTotal();
  };
  Game_Troop2.prototype.expNumRate = function () {
    var num = this.deadMembers().length;
    switch (num) {
      case 1:
      case 2:
        return 1;
      case 3:
        return 1.1;
      case 4:
        return 1.2;
      case 5:
        return 1.3;
      default:
        return 1.4;
    }
  };
  Game_Troop2.prototype.skillPointTotal = function () {
    var n = SKILL_POINT.WIN_BATTLE * this.expSkillPointRate();
    if ($gameTemp.isNoDamage()) {
      return Math.round(n * 2);
    }
    if ($gameTemp.is1Damage()) {
      return Math.round(n * 1.5);
    }
    if ($gameTemp.is2Damage()) {
      return Math.round(n * 1.2);
    }
    return Math.round(n);
  };
  Game_Troop2.prototype.expSkillPointRate = function () {
    switch ($gameSystem.stageId()) {
      case 1:
        return 1;
      case 2:
        return 1.2;
      case 3:
        return 1.4;
      case 4:
        return 1.6;
      case 5:
        return 1.8;
      case 6:
        return 2;
      case 7:
        return 2;
      case 8:
        return 2;
      default:
        return 2;
    }
  };
  Game_Troop2.prototype.isProvoked = function () {
    return this.hasStateMeta(StateMeta.PROVOKE);
  };
  Game_Troop2.prototype.hasStateMeta = function (stateMeta) {
    for (var _i = 0, _a = this.aliveMembers(); _i < _a.length; _i++) {
      var e = _a[_i];
      if (e.hasStateMeta(stateMeta)) {
        return true;
      }
    }
    return false;
  };
  Game_Troop2.prototype.isAimed = function () {
    return this.hasStateMeta(StateMeta.aiming);
  };
  Game_Troop2.prototype.randomLineTargets = function (info) {
    var isBack = Math.randomInt(2) == 0;
    if (isBack) {
      var members = this.backMembers();
      if (members.length > 0) {
        return members;
      }
    }
    return this.frontMembers();
  };
  Game_Troop2.prototype.onEnemyTurnStart = function () {
    for (var _i = 0, _a = this.members(); _i < _a.length; _i++) {
      var a = _a[_i];
      a.updateBuffTurns();
      //a.removeBuffsAuto();
      a.removeStatesAuto(2);
      var enemy = a;
      enemy.runPhotosynthesize();
      enemy.runEarthBenefit();
      enemy.runDarkBenefit();
    }
  };
  Game_Troop2.prototype.onPlayerTurnStart = function () {
    for (var _i = 0, _a = this.members(); _i < _a.length; _i++) {
      var a = _a[_i];
      //a.clearActions();
      a.updateDebuffTurns();
      a.onPlayerTurnStart();
      a.updateStateTurns();
      a.removeStatesAuto(1);
      a.addBuffsAuto();
    }
  };
  Game_Troop2.prototype.getKubihaneEnemies = function (minHp) {
    var result = [];
    for (var _i = 0, _a = this.aliveMembers(); _i < _a.length; _i++) {
      var e = _a[_i];
      if (!e.isStun()) {
        continue;
      }
      if (e.hp <= minHp) {
        result.push(e);
      }
    }
    return result;
  };
  Game_Troop2.prototype.shareHp = function () {
    var min = 9999;
    var isDead = false;
    for (var _i = 0, _a = this.members(); _i < _a.length; _i++) {
      var e = _a[_i];
      if (e.isDead()) {
        isDead = true;
      }
      if (min > e.hp) {
        min = e.hp;
      }
    }
    for (var _b = 0, _c = this.members(); _b < _c.length; _b++) {
      var e = _c[_b];
      if (isDead) {
        if (e.isAlive()) {
          e.addState(e.deathStateId(), 1);
          e.performCollapse();
          continue;
        }
      }
      e._hp = min;
      e.setDirty();
    }
  };
  Game_Troop2.prototype.setDirty = function () {
    for (var _i = 0, _a = this.members(); _i < _a.length; _i++) {
      var e = _a[_i];
      e.setDirty();
    }
  };
  Game_Troop2.prototype.checkResurection = function () {
    for (var _i = 0, _a = this.deadMembers(); _i < _a.length; _i++) {
      var e = _a[_i];
      if (e.hasStateMeta(StateMeta.resurection)) {
        var rate = e.countStateMeta(StateMeta.resurection);
        if (Math.randomInt(100) > rate) {
          continue;
        }
        e.recoverAll();
        var enemy = e;
        enemy.initStates();
        $gameTemp.requestAnimation([e], 50, false);
      }
    }
  };
  return Game_Troop2;
})(Game_Troop);
