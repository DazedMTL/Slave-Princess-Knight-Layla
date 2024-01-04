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
var STUN_DAMAGE_BONUS = 150;
var VARIANCE = 6;
var TargetInfo = /** @class */ (function () {
  function TargetInfo() {
    this._lastTargets = [];
  }
  TargetInfo.prototype.setYowaimono = function () {
    this._yowaimono = true;
  };
  TargetInfo.prototype.isYowaimono = function () {
    if (this._utsurigi) {
      return false;
    }
    return this._yowaimono;
  };
  TargetInfo.prototype.setSyuchu = function () {
    this._syuchu = true;
  };
  TargetInfo.prototype.isSyuchu = function () {
    if (this._utsurigi) {
      return false;
    }
    return this._syuchu;
  };
  TargetInfo.prototype.setUtsurigi = function () {
    this._utsurigi = true;
  };
  TargetInfo.prototype.priorityTarget = function () {
    return this._priorityTarget;
  };
  TargetInfo.prototype.setPriorityTarget = function (priorityTarget) {
    this._priorityTarget = priorityTarget;
  };
  TargetInfo.prototype.setStunBonus = function () {
    this._stunBonus = true;
  };
  TargetInfo.prototype.isStunBonus = function () {
    if (this._priorityTarget) {
      return;
    }
    if (this._utsurigi) {
      return false;
    }
    return this._stunBonus;
  };
  return TargetInfo;
})();
var Game_Action2 = /** @class */ (function (_super) {
  __extends(Game_Action2, _super);
  function Game_Action2() {
    var _this = (_super !== null && _super.apply(this, arguments)) || this;
    _this._remainTurn = 1;
    _this._waiting = false;
    return _this;
  }
  Game_Action2.prototype.remakeTargets = function () {
    this._targets = null;
    this.makeTargets();
  };
  Game_Action2.prototype.makeTargets = function () {
    if (this._targets) {
      if (!this.isInstantTarget()) {
        return this._targets;
      }
    }
    if (this.isForAll()) {
      this._targets = _super.prototype.makeTargets.call(this);
      return this._targets;
    }
    if (this.isForLine()) {
      this._targets = this.makeLineTargets();
      return this._targets;
    }
    this._targets = _super.prototype.makeTargets.call(this);
    return this._targets;
  };
  Game_Action2.prototype.isInstantTarget = function () {
    if (this.item() && this.item().meta["instantTarget"]) {
      return true;
    }
    return false;
  };
  Game_Action2.prototype.randomTargets = function (unit) {
    var targets = [];
    var info = this.makeTargetInfo();
    if (info.isStunBonus()) {
      var target = unit.randomStunTarget();
      if (target) {
        return [target];
      }
    }
    for (var i = 0; i < this.numTargets(); i++) {
      if (this.isForFront()) {
        targets.push(unit.randomFrontTarget(info));
      } else if (this.isForBack()) {
        targets.push(unit.randomBackTarget(info));
      } else {
        targets.push(unit.randomTarget(info));
      }
    }
    return targets;
  };
  Game_Action2.prototype.makeTargetInfo = function () {
    var info = new TargetInfo();
    var subject = this.subject();
    if (subject.hasStateMeta(StateMeta.YOWAIMONO)) {
      info.setYowaimono();
    }
    if (subject.hasStateMeta(StateMeta.SYUCHU)) {
      info.setSyuchu();
    }
    if (subject.hasStateMeta(StateMeta.UTURIGI)) {
      info.setUtsurigi();
    }
    if (subject.countStateMeta(StateMeta.GEKKOU) > 0) {
      var actorId = subject.countStateMeta(StateMeta.GEKKOU);
      info.setPriorityTarget($gameActors.actor(actorId));
    }
    if (this.stunBonusRate() > 1) {
      info.setStunBonus();
    }
    return info;
  };
  Game_Action2.prototype.stunBonusRate = function () {
    if (this.item().meta["stunBonus"]) {
      return parseInt(this.item().meta["stunBonus"]);
    }
    return 1;
  };
  Game_Action2.prototype.makeLineTargets = function () {
    if (this.isShortRange() || this.isForFront()) {
      if (this.isForOpponent()) {
        return this.opponentsUnit().frontMembers();
      } else {
        return this.friendsUnit().frontMembers();
      }
    }
    if (this.isForBack()) {
      var backs = void 0;
      if (this.isForOpponent()) {
        backs = this.opponentsUnit().backMembers();
      } else {
        backs = this.friendsUnit().backMembers();
      }
      return backs;
    }
    var info = this.makeTargetInfo();
    if (this.isForOpponent()) {
      return this.opponentsUnit().randomLineTargets(info);
    } else {
      return this.friendsUnit().randomLineTargets(info);
    }
  };
  Game_Action2.prototype.itemEffectSpecial = function (target, effect) {
    if (effect.dataId === Game_Action.SPECIAL_EFFECT_ESCAPE) {
      this.subject().escape();
      this.makeSuccess(this.subject());
    }
  };
  Game_Action2.prototype.setSkill = function (skillId) {
    _super.prototype.setSkill.call(this, skillId);
    this._remainTurn = parseInt(this.item().meta["turn"]);
    if (this.subject().hasStateMeta(StateMeta.haste)) {
      this._remainTurn -= 1;
    }
    if (
      this.item().id == 1 ||
      isNaN(this._remainTurn) ||
      this._remainTurn <= 0
    ) {
      this._remainTurn = 1;
    }
  };
  Game_Action2.prototype.remainTurn = function () {
    return this._remainTurn;
  };
  Game_Action2.prototype.renkan = function (num) {
    this._remainTurn += num;
  };
  Game_Action2.prototype.minusRemainTurn = function () {
    this._remainTurn--;
    this._waiting = true;
  };
  Game_Action2.prototype.isWaiting = function () {
    return this._waiting;
  };
  Game_Action2.prototype.preAttack = function () {
    this._waiting = false;
  };
  Game_Action2.prototype.isShortRange = function () {
    if (this.hasSyukuchi()) {
      return false;
    }
    return this.item().meta["shortRange"] !== undefined;
  };
  Game_Action2.prototype.hasSyukuchi = function () {
    if (this.subject().isActor()) {
      var actor = this.subject();
      if (actor.hasSkillMeta(SkillMeta.syukuchi)) {
        return true;
      }
      if (actor.hasEquipMeta(EquipMeta.syukuchi)) {
        return true;
      }
    }
    return false;
  };
  Game_Action2.prototype.isMiddleRange = function () {
    return this.item().meta["middleRange"] !== undefined;
  };
  Game_Action2.prototype.isLongRange = function () {
    return this.item().meta["longRange"] !== undefined;
  };
  Game_Action2.prototype.isPenetrate = function () {
    return this.item().meta["penetrate"] !== undefined;
  };
  Game_Action2.prototype.needsSelection = function () {
    return true;
  };
  Game_Action2.prototype.isHpRecover = function () {
    if (this.shieldHeal() > 0) {
      return true;
    }
    return _super.prototype.isHpRecover.call(this);
  };
  Game_Action2.prototype.isForFront = function () {
    if (this.hasSyukuchi()) {
      return false;
    }
    if (this.isShortRange()) {
      return true;
    }
    if (this.isMiddleRange() && this.subject().isBack()) {
      return true;
    }
    if (this.item().meta["front"]) {
      return true;
    }
    return false;
  };
  Game_Action2.prototype.isForBack = function () {
    if (this.isLongRange()) {
      return true;
    }
    if (this.isMiddleRange() && this.subject().isBack()) {
      return false;
    }
    return false;
  };
  Game_Action2.prototype.targetsForAlive = function (unit) {
    if (this.isForOne()) {
      var info = this.makeTargetInfo();
      if (info.isStunBonus()) {
        var target = unit.randomStunTarget();
        if (target) {
          return [target];
        }
      }
      if (this.isForFront()) {
        return [unit.randomFrontTarget(info)];
      } else if (this.isForBack()) {
        return [unit.randomBackTarget(info)];
      } else {
        return [unit.randomTarget(info)];
      }
    } else {
      if (this.isForFront()) {
        return unit.aliveFrontMembers();
      } else if (this.isForBack()) {
        return unit.aliveBackMembers();
      } else {
        return unit.aliveMembers();
      }
    }
  };
  Game_Action2.prototype.initialSelection = function () {
    if (!this.isValid()) {
      return 0;
    }
    if (this.isForUser()) {
      return Nore.SELF_SELECTION;
    }
    if (this.isForAll()) {
      return Nore.ALL_SELECTION;
    }
    if (this.isForLine()) {
      if (this.isShortRange()) {
        return Nore.FRONT_LINE_SELECTION;
      } else if (this.isLongRange()) {
        return Nore.BACK_LINE_SELECTION;
      } else {
        return Nore.FRONT_LINE_SELECTION_CHANGABLE;
      }
    }
    if ($gameTroop.isProvoked()) {
      return this.selectProvoledTarget();
    }
    if (this.isForRandom()) {
      if ($gameTroop.isAimed()) {
        return Nore.AIMED_SELECTION;
      }
      return Nore.RANDOM_SELECTION;
    }
    return 0;
  };
  Game_Action2.prototype.selectProvoledTarget = function () {
    var index = 0;
    for (var _i = 0, _a = $gameTroop.aliveMembers(); _i < _a.length; _i++) {
      var e = _a[_i];
      if (e.hasStateMeta(StateMeta.PROVOKE)) {
        return index;
      }
      index++;
    }
    return 0;
  };
  Game_Action2.prototype.selectAimedTarget = function () {
    var index = 0;
    for (var _i = 0, _a = $gameTroop.aliveMembers(); _i < _a.length; _i++) {
      var e = _a[_i];
      if (e.hasStateMeta(StateMeta.aiming)) {
        return index;
      }
      index++;
    }
    return 0;
  };
  Game_Action2.prototype.isForLine = function () {
    return this.item().meta["line"] !== undefined;
  };
  Game_Action2.prototype.setTargetBattlers = function (targets) {
    this._targets = [];
    for (var _i = 0, targets_1 = targets; _i < targets_1.length; _i++) {
      var b = targets_1[_i];
      for (var i = 0; i < this.numRepeats(); i++) {
        this._targets.push(b);
      }
    }
  };
  Game_Action2.prototype.apply = function (target) {
    var result = target.result();
    this.subject().clearResult();
    result.clear();
    result.used = this.testApply(target);
    if (this.isAlwaysMiss()) {
      result.missed = true;
    } else if (
      this.isPhysical() &&
      target.hasStateMeta(StateMeta.MIKIRI) &&
      this.isDamage()
    ) {
      // 刹那の見切り
      result.missed = true;
      target.minusStateTurnsByMeta(StateMeta.MIKIRI, 1);
      if (target.isActor()) {
        $gameMedals.onMikiri();
      }
    } else if (
      target.hasStateMeta(StateMeta.barrier) &&
      this.subject().isEnemy() &&
      this.isDamage()
    ) {
      result.missed = true;
      result.barrier = true;
      target.minusStateTurnsByMeta(StateMeta.barrier, 1);
    } else if (this.isAlwaysHit()) {
      result.missed = false;
    } else {
      //result.missed = result.used && Math.random() >= (this.itemHit(target) - this.itemEva(target));
      result.missed = false;
    }
    result.physical = this.isPhysical();
    result.drain = this.isDrain();
    if (result.isHit()) {
      if (this.item().damage.type > 0) {
        if (this.isCriticalAvailable()) {
          var actor = this.subject();
          result.critical = Math.random() < actor.criRate();
        }
        var max = this.makeDamageValue(target, result.critical);
        var value = max + this.calcVariance(target, max);
        this.executeDamage(target, value, max);
        this.addFearDebuff(target);
        this.applyWeaponSkill(target);
        this.applyMpCharge(value);
        this.applyFireEffects(target, value);
        this.applySkillDebuff(target, value);
        this.applyMinusStates(target, value);
        this.applyMadan(target, value);
        this.applyTogeDownMagic(target);
      }
      this.applyEffects(target);
      this.applyShieldHeal(target);
      this.applyItemUserEffect(target);
      this.applyTogeEffect(target);
      this.applyCancel(target);
      this.applyReact(target);
      this.applyOugiReact(target);
      this.applyAtemReact(target);
      this.applyMedal(target);
      this.applyRemakeTarget(target);
      this.applySkillOugiPlus(target);
      this.applyJizai(target);
      this.applyMagnet(target);
      this.applyKubihaneMedal();
    }
    this.react();
    this.updateLastTarget(target);
  };
  Game_Action2.prototype.isNormalAttack = function () {
    if (!this.isDamage()) {
      return false;
    }
    if (!this.isSkill()) {
      return false;
    }
    if (this.item().id < 10) {
      return true;
    }
    return false;
  };
  Game_Action2.prototype.isCriticalAvailable = function () {
    if (this.subject().isEnemy()) {
      return false;
    }
    var actor = this.subject();
    if (actor.hasSkillMeta(SkillMeta.skillCrit)) {
      return true;
    }
    return this.isNormalAttack();
  };
  Game_Action2.prototype.applyEffects = function (target) {
    for (var _i = 0, _a = this.item().effects; _i < _a.length; _i++) {
      var effect = _a[_i];
      this.applyItemEffect(target, effect);
    }
  };
  Game_Action2.prototype.applyFireEffects = function (target, damage) {
    if (!target.isEnemy()) {
      return;
    }
    var enemy = target;
    if (!enemy.hasStateMeta(StateMeta.fireBenefit)) {
      return;
    }
    enemy.addFireBenefit(damage);
  };
  Game_Action2.prototype.applyMinusStates = function (target, damage) {
    if (!target.isEnemy()) {
      return;
    }
    if (!this.subject().isActor()) {
      return;
    }
    var enemy = target;
    var minusStates = Math.trunc(enemy.enemy().meta["minusStates"]);
    var minusStateValue = enemy.enemy().meta["minusStateValue"];
    if (minusStates <= 0 || minusStateValue <= 0) {
      return;
    }
    for (var _i = 0, _a = $gameParty.battleMembers(); _i < _a.length; _i++) {
      var actor = _a[_i];
      if (actor.hasState(minusStates)) {
        actor.minusStateTurns(minusStates, minusStateValue);
      }
    }
  };
  Game_Action2.prototype.applyKubihaneMedal = function () {
    if (this.item().meta["kubihaneSkill"]) {
      $gameMedals.onKubihane();
    }
  };
  Game_Action2.prototype.applyMadan = function (target, damage) {
    if (!target.isEnemy()) {
      return;
    }
    if (!this.item().meta["madan"]) {
      return;
    }
    var enemy = target;
    if (!enemy.isStun()) {
      return;
    }
    if (enemy.hasStateMeta(StateMeta.antiMadan)) {
      return;
    }
    var current = enemy.getStateTurn(StateId.STUN);
    enemy.addStateTurns(StateId.STUN, 1);
  };
  Game_Action2.prototype.applySkillDebuff = function (target, damage) {
    if (!target.isEnemy()) {
      return;
    }
    if (!this.subject().isActor()) {
      return;
    }
    var actor = this.subject();
    if (!actor.hasSkillMeta(StateMeta.skillDebuff)) {
      return;
    }
    if (this.isNormalAttack()) {
      return;
    }
    target.addDebuff(2, 1);
  };
  Game_Action2.prototype.applyMpCharge = function (damage) {
    if (!this.subject().isActor()) {
      return;
    }
    if (this.item().hitType != 2) {
      return;
    }
    var actor = this.subject();
    var success = actor.addMpCharge(damage);
    /*if (success) {
            $gameTemp.requestAnimation([actor], 40, false);
            actor.react();
        }*/
  };
  Game_Action2.prototype.applyWeaponSkill = function (target) {
    if (!this.subject().isActor()) {
      return;
    }
    if (target.isActor()) {
      return;
    }
    var actor = this.subject();
    for (var _i = 0, _a = actor.equipSkills(); _i < _a.length; _i++) {
      var s = _a[_i];
      //p(s)
      var action = new Game_Action2($gameActors.actor(100));
      action.setSkill(s.id);
      //action.setTargetBattlers([target]);
      action.applyEffects(target);
    }
  };
  Game_Action2.prototype.applyMedal = function (target) {
    if (!this.subject().isActor()) {
      return;
    }
    if (!this.isSkill()) {
      return;
    }
    $gameMedals.onSkill($dataSkills[this.item().id], this.subject());
  };
  Game_Action2.prototype.addFearDebuff = function (target) {
    for (var _i = 0, _a = target.states(); _i < _a.length; _i++) {
      var state = _a[_i];
      if (state.meta["fear"]) {
        var value = parseInt(state.meta["stateValue"]);
        if (isNaN(value)) {
          console.error(value);
          console.error(state);
        }
        target.addDebuff(2, value);
        target.addDebuff(4, value);
      }
    }
  };
  Game_Action2.prototype.applyCancel = function (target) {
    if (!target.isEnemy()) {
      return;
    }
    var enemy = target;
    if (this.item().meta["cancel"]) {
      if (enemy.currentAction() && enemy.currentAction().isValid()) {
        enemy.result().cancel = true;
        enemy.clearActions();
      }
    }
  };
  Game_Action2.prototype.applyReact = function (target) {
    if (target.isEnemy()) {
      return;
    }
    if (this.item().meta["giveReact"]) {
      var actor = target;
      actor.react();
    }
  };
  Game_Action2.prototype.applyOugiReact = function (target) {
    if (!this.subject().isActor()) {
      return;
    }
    var skill = this.item();
    if (!$skillManager.isOugi(skill)) {
      return;
    }
    if ($gameParty.hasSkillMeta(SkillMeta.ougiReact)) {
      var actor = this.subject();
      if (!actor.isReactedOnAction()) {
        actor.react();
      }
    }
  };
  Game_Action2.prototype.applyAtemReact = function (target) {
    if (!this.subject().isActor()) {
      return;
    }
    if (this.item().meta["itemReact"]) {
      var actor = this.subject();
      actor.itemReact();
    }
  };
  Game_Action2.prototype.applyMagnet = function (target) {
    if (!target.isEnemy()) {
      return;
    }
    var enemy = target;
    if (this.item().meta["magnet"] && enemy.isBack()) {
      if (enemy.hasStateMeta(StateMeta.magicBarrier)) {
        return;
      }
      enemy.toFront();
      enemy.result().magnet = true;
    }
  };
  Game_Action2.prototype.applyJizai = function (target) {
    if (!target.isActor()) {
      return;
    }
    if (!this.item().meta["jizai"]) {
      return;
    }
    var actor = target;
    var forecast = $gameTroop.getDamageForecast(actor.actorId());
    var jizai = Math.trunc(this.item().meta["jizai"]);
    if (forecast.getHpDamage() == 0 && forecast.getShieldDamage() == 0) {
      actor.addBuff(BuffId.atk, jizai);
      actor.addBuff(BuffId.mat, jizai);
    } else {
      actor.addBuff(BuffId.def, jizai);
      actor.addBuff(BuffId.mdf, jizai);
    }
  };
  Game_Action2.prototype.applyRemakeTarget = function (target) {
    if (!target.isEnemy()) {
      return;
    }
    if (this.item().meta["remakeTarget"]) {
      var action = target.currentAction();
      if (action && action.isValid()) {
        action.remakeTargets();
      }
    }
  };
  Game_Action2.prototype.applySkillOugiPlus = function (target) {
    if (!this.isSkill()) {
      return;
    }
    if (!this.isMagical()) {
      return;
    }
    var subject = this.subject();
    if (!subject.isActor()) {
      return;
    }
    var actor = subject;
    var ougiPlus = actor.countSkill(SkillMeta.skillOugiPlus);
    if (ougiPlus == 0) {
      return;
    }
    p("skillOugiPlus" + ougiPlus);
    $gameParty.gainOugi(ougiPlus);
  };
  Game_Action2.prototype.applyShieldHeal = function (target) {
    if (target.isEnemy()) {
      return;
    }
    var actor = target;
    var n = this.shieldHeal();
    if (n == 0) {
      return;
    }
    var subject = this.subject();
    var skillRecoveryPlus = subject.countEquipMeta(EquipMeta.skillRecoveryPlus);
    n += skillRecoveryPlus;
    actor.gainShield(n);
    var result = target.result();
    result.addShieldDamage(-n);
  };
  Game_Action2.prototype.shieldHeal = function () {
    if (this.item().meta["shieldHeal"]) {
      return parseInt(this.item().meta["shieldHeal"]);
    }
    if (this.item().meta["shieldHeal2"]) {
      return parseInt(this.item().meta["shieldHeal2"]);
    }
    return 0;
  };
  Game_Action2.prototype.react = function () {
    if (this.subject().isEnemy()) {
      return;
    }
    var actor = this.subject();
    if (this.item().meta["react"]) {
      if (!actor.isReactedOnAction()) {
        actor.react();
      }
    }
  };
  Game_Action2.prototype.calcHit = function (target) {
    return Math.round((this.itemHit(target) - this.itemEva(target)) * 100);
  };
  Game_Action2.prototype.isAlwaysHit = function () {
    if (this.item().stypeId == 1 || this.item().stypeId == 2) {
      return true;
    }
    return false;
  };
  Game_Action2.prototype.isAlwaysMiss = function (battler) {
    if (battler && battler.hasStateMeta(StateMeta.MIKIRI)) {
      if (this.isPhysical()) {
        return true;
      }
    }
    if (!this.isNormalAttack()) {
      return false;
    }
    if (!this.subject().hasState(Nore.DARK_STATE_ID)) {
      return false;
    }
    return true;
  };
  Game_Action2.prototype.executeDamage = function (target, value, max) {
    var result = target.result();
    if (value === 0) {
      result.critical = false;
    }
    if (this.isHpEffect()) {
      var lastHp = target.hp;
      this.executeHpDamage(target, value, max);
      if (target.isEnemy() && value > 0) {
        $gameMedals.onDamage(value, this.item());
        var overkill = value - lastHp;
        if (overkill > 0) {
          $gameMedals.onOverkill(overkill);
        }
      }
      if (target.isActor()) {
        var actor = target;
        if (actor.result().shieldDamage() > 0 && actor.shield() == 0) {
          $gameMedals.onShieldBreak();
        }
        if (this.isDamage() && value == 0) {
          actor.result().setNoDamage();
        }
      }
    }
    if (this.isMpEffect()) {
      this.executeMpDamage(target, value);
    }
  };
  Game_Action2.prototype.executeMpDamage = function (target, value) {
    if (!this.isMpRecover()) {
      value = Math.min(target.mp, value);
    } else if (this.isMpRecover()) {
      if (value > 0) {
        value = -value;
      }
    }
    if (value !== 0) {
      this.makeSuccess(target);
    }
    target.gainMp(-value);
  };
  Game_Action2.prototype.executeHpDamage = function (target, value, maxDamage) {
    if (this.isDrain()) {
      value = Math.min(target.hp, value);
    }
    this.makeSuccess(target);
    var realDamage = 0;
    if (this.isPenetrate()) {
      realDamage = target.gainHp(0, -value, this);
    } else {
      realDamage = target.gainHp(-value, 0, this);
    }
    target.addStun(this.calcStun(target, maxDamage));
    if (realDamage > 0) {
      target.onDamage(realDamage);
    }
    this.gainDrainedHp(value);
  };
  Game_Action2.prototype.calcStun = function (target, value) {
    if (this.isRecover()) {
      return 0;
    }
    var base = 1;
    if (this.stunRate() > 1) {
      base = Math.ceil(this.stunRate());
    } else if (this.stunRate() < 1) {
      base = 0;
    }
    base += this.calcMagicStunBonus(target);
    base += this.calcCriStunUp(target);
    return base;
    //return value * this.stunRate();
  };
  Game_Action2.prototype.calcCriStunUp = function (target) {
    if (!target.result().critical) {
      return 0;
    }
    var subject = this.subject();
    if (!subject.isActor()) {
      return 0;
    }
    var actor = subject;
    if (actor.hasEquipMeta(EquipMeta.criStun)) {
      return 1;
    }
    return 0;
  };
  Game_Action2.prototype.calcMagicStunBonus = function (target) {
    if (!this.isSkill()) {
      return 0;
    }
    if (!target.hasStateMeta(StateMeta.magicWeakness)) {
      return 0;
    }
    if (!this.isMagical()) {
      return 0;
    }
    return 1;
  };
  Game_Action2.prototype.stunRate = function () {
    if (this.item().meta["stunDown"]) {
      var stunDown = Math.trunc(this.item().meta["stunDown"]);
      return (100 - stunDown) / 100;
    }
    if (this.item().meta["stunUp"]) {
      var stunUp = Math.trunc(this.item().meta["stunUp"]);
      return (100 + stunUp) / 100;
    }
    return 1;
  };
  Game_Action2.prototype.makeDamageValue = function (target, critical) {
    var baseValue = this.evalDamageFormula(target);
    var value = baseValue * this.calcElementRate(target);
    if (this.item().meta["fixedDamage"]) {
      return baseValue;
    }
    if (baseValue < 0) {
      value *= target.rec;
    }
    if (critical) {
      value = this.applyCritical(value);
    }
    value = this.applyGuard(value, target);
    if (this.isSkill() && !this.item().meta["cure"]) {
      value = this.applyFirstStrike(value, target);
      value = this.applyDamageLevel(value, target);
      value = this.applyDamageCut(value, target);
      value = this.applyDamageUp(value, target);
      value = this.applyBreakBonus(value, target);
      value += this.applySkillUp(target);
      value += this.applyWrash(value, target);
      value *= this.applyStunBonus(value, target);
      value *= this.applyHellFire(value, target);
      value *= this.applyDamageRateUp(target);
    }
    if (this.isPhysical()) {
      value += this.applyPhysical(target);
    } else if (this.isMagical()) {
      value += this.applyMagical(target);
    }
    //value *= this.applyDamageDown();
    if (this.isDamage()) {
      if (target.isEnemy()) {
        value *= this.applyDifficulty();
      }
      value = Math.max(value, 0);
    }
    value = Math.round(value);
    return value;
  };
  Game_Action2.prototype.applyDamageDown = function () {
    var damageDown = this.subject().countStateMeta(StateMeta.damageDown);
    return (100 - damageDown) / 100;
  };
  Game_Action2.prototype.applyDifficulty = function () {
    switch ($gameSystem.difficulty()) {
      case Difficulty.DUNGEON_SKIP:
        return 3;
      case Difficulty.VERY_EASY:
        return 3;
      case Difficulty.EASY:
        return 1.3;
    }
    return 1;
  };
  Game_Action2.prototype.applyPhysical = function (target) {
    var n = this.subject().calcAtkBuff();
    n -= target.calcDefBuff();
    return n;
  };
  Game_Action2.prototype.applyMagical = function (target) {
    var n = this.subject().calcMatBuff();
    n -= target.calcMdfBuff();
    return n;
  };
  Game_Action2.prototype.applyWrash = function (value, target) {
    if (!this.subject().isActor()) {
      return 0;
    }
    var actor = this.subject();
    return actor.wrash() * 3;
  };
  Game_Action2.prototype.applyDamageRateUp = function (value, target) {
    if (!this.subject().isActor()) {
      return 1;
    }
    var actor = this.subject();
    var n = actor.countStateMeta(StateMeta.damageRateUp);
    var turns = actor.getStateTurn(StateId.DAMAGE_RATE_UP);
    if (turns <= 0 || !turns) {
      return 1;
    }
    return Math.pow((100 + n) / 100, turns);
  };
  Game_Action2.prototype.applyHellFire = function (value, target) {
    if (!this.subject().isActor()) {
      return 1;
    }
    var actor = this.subject();
    var n = this.item().meta[SkillMeta.hellFire];
    if (!n) {
      return 1;
    }
    var rate = Math.trunc(n);
    return (100 + target.countHellFire() * rate) / 100;
  };
  Game_Action2.prototype.applyStunBonus = function (value, target) {
    if (!target.hasState(Nore.STUN_STATE_ID)) {
      return 1;
    }
    if (!this.item().meta["stunBonus"]) {
      return 1;
    }
    var rate = parseInt(this.item().meta["stunBonus"]);
    return rate;
  };
  Game_Action2.prototype.applyBreakBonus = function (value, target) {
    if (!this.isDamage()) {
      return value;
    }
    if (target.isStun()) {
      if (target.isEnemy()) {
        var enemy = target;
        return (value * enemy.breakDamageBonusRate()) / 100;
      }
    }
    return value;
  };
  Game_Action2.prototype.applyDamageCut = function (value, target) {
    var damageCut = target.countState(Nore.STATE_TYPE.damageCut);
    if (target.isActor()) {
      var actor = target;
      damageCut += actor.countEquipMeta(EquipMeta.guardRate);
    }
    return (value * (100 - damageCut)) / 100;
  };
  Game_Action2.prototype.applyFirstStrike = function (value, target) {
    var fs = this.getFirstStrike();
    if (fs <= 0) {
      return value;
    }
    if (target.hpRate() != 1) {
      return value;
    }
    return (value * (100 + fs)) / 100;
  };
  Game_Action2.prototype.applyDamageUp = function (value, target) {
    var n = this.subject().countState(Nore.STATE_TYPE.damageUp);
    if (n > 0) {
      //p('damageUp:' + n);
    } else {
      return value;
    }
    return (value * (100 + n)) / 100;
  };
  Game_Action2.prototype.applyDamageLevel = function (value, target) {
    var n = this.subject().countArmor(Nore.ARMOR_TYPE.damageUpLevel);
    if (n > 0) {
      //p('damageUpLvel:' + n);
    } else {
      return value;
    }
    return (value * (100 + n)) / 100;
  };
  Game_Action2.prototype.applySkillUp = function (target) {
    if (this.item().id < 1100) {
      return 0;
    }
    if (this.subject().isEnemy()) {
      return 0;
    }
    var actor = this.subject();
    var skillDamagePlus = actor.countEquipMeta(EquipMeta.skillDamagePlus);
    return skillDamagePlus;
  };
  Game_Action2.prototype.getFirstStrike = function () {
    var subject = this.subject();
    return subject.countSkill(SkillMeta.firstStrike);
  };
  Game_Action2.prototype.calcVariance = function (target, damage) {
    return -Math.randomInt(this.variance(target, damage));
  };
  Game_Action2.prototype.variance = function (target, damage) {
    var battler = this.subject();
    if (battler.isEnemy()) {
      return 0;
    }
    if (this.item().damage.variance == 0) {
      return 0;
    }
    if (target.isMaxDamage()) {
      return 0;
    }
    var actor = battler;
    var limit = actor.lowerLimit();
    if (damage < VARIANCE - limit) {
      return damage - 1 - limit;
    }
    if (this.item().id <= 10) {
      return VARIANCE - limit;
    }
    var n = this.item().damage.variance;
    if (n <= limit) {
      return 0;
    }
    return n - limit;
  };
  Game_Action2.prototype.applyCritical = function (damage) {
    return damage * 1.5;
  };
  Game_Action2.prototype.applyTogeEffect = function (target) {
    if (this.item().meta["toge"]) {
      this.subject().minusStateTurns(StateId.TOGE, 1);
    }
  };
  Game_Action2.prototype.applyTogeDownMagic = function (target) {
    if (!this.isSkill()) {
      return;
    }
    if (target.countStateMeta(StateMeta.toge) == 0) {
      return;
    }
    if (!target.hasStateMeta(StateMeta.togeDownMagic)) {
      return;
    }
    if (!this.isMagical()) {
      return;
    }
    target.minusStateTurns(StateId.TOGE, 1);
  };
  Game_Action2.prototype.applyItemUserEffect = function (target) {
    if (this.subject().isEnemy()) {
      return;
    }
    var actor = this.subject();
    if (this.item().damage.type > 0) {
      actor.onAttack(this.item());
      if (target.isDead() || target.hasState(StateId.INVOKE_DEATH_AGONY)) {
        actor.onTodome(this.item());
      }
    }
    var value = Math.floor(this.item().tpGain * actor.tcr);
    actor.gainSilentTp(value);
    if (this.item().meta["addDef"]) {
      var value_1 = Math.trunc(this.item().meta["addDef"]);
      actor.addBuff(BUFF_DEF, value_1);
      actor.gainShield(value_1);
    }
  };
  Game_Action2.prototype.itemEffectAddNormalState = function (target, effect) {
    var chance = effect.value1;
    if (!this.isCertainHit()) {
      chance *= target.stateRate(effect.dataId);
      //chance *= this.lukEffectRate(target);
    }
    if (Math.random() < chance) {
      var turns = this.calcStateTurns(effect.dataId);
      if (target.result().isNoDamage()) {
        target.result().setNoEffect();
        if (!$gameSwitches.value(251)) {
          $gameSwitches.setValue(250, true); // ステートチュート
        }
        return;
      }
      target.addState(effect.dataId, turns);
      this.makeSuccess(target);
    }
  };
  Game_Action2.prototype.calcStateTurns = function (stateId) {
    var stateValue = this.stateValue();
    var state = $dataStates[stateId];
    if (stateValue > 0) {
      if (state.autoRemovalTiming == 2 && this.subject().isActor()) {
        return stateValue - 1;
      }
      return stateValue;
    }
    return state.minTurns;
  };
  Game_Action2.prototype.stateValue = function () {
    return parseInt(this.item().meta["stateValue"]);
  };
  Game_Action2.prototype.isBuff = function () {
    var item = this.item();
    if (!item) {
      return false;
    }
    return item.meta["buff"] != null;
  };
  Game_Action2.prototype.isDebuff = function () {
    var item = this.item();
    if (!item) {
      return false;
    }
    return item.meta["debuff"] != null;
  };
  Game_Action2.prototype.isHolyElement = function () {
    if (this.item() && this.item().damage) {
      return this.item().damage.elementId == 8;
    }
    return false;
  };
  return Game_Action2;
})(Game_Action);
Game_Battler.prototype.isStun = function () {
  return false;
};
Game_Battler.prototype.makeActions = function () {
  this.clearActions();
  if (this.canMove()) {
    var actionTimes = this.makeActionTimes();
    this._actions = [];
    for (var i = 0; i < actionTimes; i++) {
      this._actions.push(new Game_Action2(this));
    }
  }
};
Game_Battler.prototype.forceAction = function (skillId, targetIndex) {
  this.clearActions();
  var action = new Game_Action2(this, true);
  action.setSkill(skillId);
  if (targetIndex === -2) {
    action.setTarget(this._lastTargetIndex);
  } else if (targetIndex === -1) {
    action.decideRandomTarget();
  } else {
    action.setTarget(targetIndex);
  }
  this._actions.push(action);
};
