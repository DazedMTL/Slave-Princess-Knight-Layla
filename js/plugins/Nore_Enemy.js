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
  Nore.STUN_STATE_ID = 15;
  Nore.LONG_STUN_STATE_ID = 16;
  Nore.DARK_STATE_ID = 5;
  var ENEMY_FRONT_STATE_ID = 38;
  var ENEMY_BACK_STATE_ID = 39;
  var Game_Enemy2 = /** @class */ (function (_super) {
    __extends(Game_Enemy2, _super);
    function Game_Enemy2(enemyId, x, y, screenY) {
      var _this = _super.call(this, enemyId, x, y) || this;
      _this._stun = 0;
      _this._stunForecast = 0;
      _this._toFront = false;
      _this._toBack = false;
      _this._flagileCount = 0;
      _this._nintaiCount = 0;
      _this._fireBenefit = 0;
      _this._front = screenY > 500;
      _this.initStates();
      return _this;
    }
    Game_Enemy2.prototype.clearActions = function () {
      if (this._actions && this._actions.length > 0) {
        this._lastAction = this._actions.concat()[0];
      } else {
        this._lastAction = null;
      }
      _super.prototype.clearActions.call(this);
    };
    Game_Enemy2.prototype.isSameSkillNg = function () {
      return this.enemy().meta["sameSkillNg"] != null;
    };
    Game_Enemy2.prototype.die = function () {
      _super.prototype.die.call(this);
      //this.initStates();
    };
    Game_Enemy2.prototype.initStates = function () {
      var enemy = this.enemy();
      if (!enemy) {
        return;
      }
      for (var i = 1; i <= 4; i++) {
        if (enemy.meta["initialState" + i]) {
          var stateId = Math.trunc(enemy.meta["initialState" + i]);
          var value = 1;
          if (enemy.meta["stateValue" + i]) {
            value = Math.trunc(enemy.meta["stateValue" + i]);
          } else if (enemy.meta["stateValue"]) {
            value = Math.trunc(enemy.meta["stateValue"]);
          }
          this.addState(stateId, value);
        }
      }
    };
    Game_Enemy2.prototype.onTurnEnd = function () {
      _super.prototype.onTurnEnd.call(this);
      this.setDirty();
    };
    Game_Enemy2.prototype.clearDirty = function () {
      this._dirty = false;
    };
    Game_Enemy2.prototype.setDirty = function () {
      this._dirty = true;
    };
    Game_Enemy2.prototype.isDirty = function () {
      return this._dirty;
    };
    Game_Enemy2.prototype.clearForecastDirty = function () {
      this._dirtyForecast = false;
    };
    Game_Enemy2.prototype.setForecastDirty = function () {
      this._dirtyForecast = true;
    };
    Game_Enemy2.prototype.isForecastDirty = function () {
      return this._dirtyForecast;
    };
    Game_Enemy2.prototype.startDamagePopup = function () {
      this._damagePopup = true;
      this.setDirty();
    };
    Game_Enemy2.prototype.maxStun = function () {
      var n = this.luk;
      if (this._flagileCount) {
        n -= this._flagileCount;
      }
      if (this._nintaiCount) {
        n += this._nintaiCount;
      }
      return n;
    };
    Game_Enemy2.prototype.stun = function () {
      return this._stun;
    };
    Game_Enemy2.prototype.stunRate = function () {
      return this.stun() / this.maxStun();
    };
    Game_Enemy2.prototype.isStun = function () {
      return (
        this.hasState(Nore.STUN_STATE_ID) ||
        this.hasState(Nore.LONG_STUN_STATE_ID)
      );
    };
    Game_Enemy2.prototype.clearForecast = function () {
      if (this._stunForecast == 0) {
        return;
      }
      this._stunForecast = 0;
      this.setForecastDirty();
    };
    Game_Enemy2.prototype.stunForecast = function () {
      return Math.min(this._stunForecast + this._stun, this.maxStun());
    };
    Game_Enemy2.prototype.setStunForecast = function (n) {
      if (this._stunForecast == n) {
        return;
      }
      this._stunForecast = n;
      this.setForecastDirty();
    };
    Game_Enemy2.prototype.addStun = function (n) {
      if (this.maxStun() == 0) {
        return false;
      }
      this._stun += n;
      if (this._stun < this.maxStun()) {
        return false;
      }
      if (this.hasStateMeta(StateMeta.BAKUSAI)) {
        this.addState(this.deathStateId(), 1);
        return;
      }
      if (this.hasState(Nore.STUN_STATE_ID)) {
        return;
      }
      if (this.hasState(Nore.LONG_STUN_STATE_ID)) {
        return;
      }
      if (this.isDead()) {
        return;
      }
      $gameSwitches.setValue(215, true); // スタンチュート
      $gameTemp.requestAnimation([this], 325, false);
      if (this.hasState(303)) {
        this.addState(Nore.STUN_STATE_ID, 1);
        this._fireBenefit = 0;
      }
      if (this.hasStateMeta(StateMeta.antiBreak)) {
        this.addState(Nore.STUN_STATE_ID, 1);
        this._stateTurns[Nore.STUN_STATE_ID] -= 1;
        this._fireBenefit = 0;
      } else {
        this.addState(Nore.STUN_STATE_ID, 0);
        this._fireBenefit = 0;
      }
      this.removeState(StateId.PROVOKE); // 挑発解除
      this.result().pushAddedState(Nore.STUN_STATE_ID);
      this.addFlagile();
      this.addNintai();
      this._stun = this.maxStun();
      $gameMedals.onBreak();
      return true;
    };
    Game_Enemy2.prototype.addFlagile = function () {
      if (this.countState("flagile") > 0) {
        this._flagileCount++;
      }
    };
    Game_Enemy2.prototype.addNintai = function () {
      if (this.countState("nintai") > 0) {
        this._nintaiCount++;
      }
    };
    Game_Enemy2.prototype.updateStage5Gimmick = function (stateId) {
      if (stateId == this.deathStateId()) {
        if (this.isDead()) {
          return;
        }
        //p('addDeathState')
        if ($gameVariables.value(57) > 0) {
          var n = $gameVariables.value(57) - 1;
          $gameVariables.setValue(57, n);
          for (
            var _i = 0, _a = $gameTroop.aliveMembers();
            _i < _a.length;
            _i++
          ) {
            var e = _a[_i];
            var enemy = e;
            enemy.setDirty();
          }
          if (n == 0) {
            $gameSwitches.setValue(425, true);
          }
        }
      }
    };
    Game_Enemy2.prototype.updateKogoroshiGimmick = function (stateId) {
      if (stateId != this.deathStateId()) {
        return;
      }
      if (this.isDead()) {
        return;
      }
      for (var _i = 0, _a = $gameTroop.aliveMembers(); _i < _a.length; _i++) {
        var enemy = _a[_i];
        if (enemy.hasStateMeta(StateMeta.kogoroshi)) {
          //p('kogo')
          enemy.addState(StateId.STRENGTH, 3);
        }
      }
    };
    Game_Enemy2.prototype.addState = function (stateId, turn) {
      this.updateStage5Gimmick(stateId);
      this.updateKogoroshiGimmick(stateId);
      _super.prototype.addState.call(this, stateId, turn);
      if (this.isStunId(stateId)) {
        this._stun = this.maxStun();
      }
      /*if (! this.canMove()) {
                this.clearActions();
            }*/
      this.setDirty();
    };
    Game_Enemy2.prototype.removeState = function (stateId) {
      if (stateId === this.deathStateId() && this.isDead()) {
        this._stun = 0;
      }
      _super.prototype.removeState.call(this, stateId);
      if (stateId == StateId.TRANSFORM) {
        $gameSwitches.setValue(DRAGON_EGG_TRANSFORM_SW, true);
      }
      if (this.isStunId(stateId)) {
        var initialStun = this.countStateMeta(StateMeta.maxShieldDown);
        this._stun = initialStun;
        if (this.maxStun() <= this._stun) {
          this._stun = this.maxStun() - 1;
        }
      }
      if (this.result().removedStates.length > 0) {
        this.setDirty();
      }
    };
    Game_Enemy2.prototype.isStunId = function (stateId) {
      if (stateId == Nore.STUN_STATE_ID) {
        return true;
      }
      if (stateId == Nore.LONG_STUN_STATE_ID) {
        return true;
      }
      return false;
    };
    Game_Enemy2.prototype.makeActions = function () {
      _super.prototype.makeActions.call(this);
      if (this.currentAction() && this.currentAction().isValid()) {
        this.currentAction().makeTargets();
      }
      this.setDirty();
      var action = this.currentAction();
      if (action && action.isValid() && action.isSkill()) {
        this._lastSkillId = action.item().id;
      } else {
        this._lastSkillId = null;
      }
    };
    Game_Enemy2.prototype.lastAction = function () {
      return this._lastAction;
    };
    Game_Enemy2.prototype.meetsCondition = function (action) {
      if (this.isSameSkillNg()) {
        if (this._lastSkillId == action.skillId) {
          return false;
        }
      }
      return _super.prototype.meetsCondition.call(this, action);
    };
    Game_Enemy2.prototype.isForecast = function () {
      return false;
    };
    Game_Enemy2.prototype.isFront = function () {
      return this._front;
    };
    Game_Enemy2.prototype.isBack = function () {
      return !this.isFront();
    };
    Game_Enemy2.prototype.isStateAffected = function (stateId) {
      if (this.isFront() && stateId == ENEMY_FRONT_STATE_ID) {
        return true;
      }
      if (this.isBack() && stateId == ENEMY_BACK_STATE_ID) {
        return true;
      }
      return _super.prototype.isStateAffected.call(this, stateId);
    };
    Game_Enemy2.prototype.canTarget = function (actor, action) {
      var skill = action.item();
      if (action.isShortRange()) {
        if (this.isBack()) {
          return false;
        }
      }
      return true;
    };
    Game_Enemy2.prototype.isActionValid = function (action) {
      if (!this.meetsRange(action)) {
        return false;
      }
      return _super.prototype.isActionValid.call(this, action);
    };
    Game_Enemy2.prototype.meetsRange = function (action) {
      var a = new Game_Action2(this);
      a.setSkill(action.skillId);
      if (a.isShortRange() && this.isBack()) {
        return false;
      }
      /*if (a.isLongRange() && this.isFront()) {
                return false;
            }*/
      return true;
    };
    Game_Enemy2.prototype.removeCurrentAction = function () {
      var currentAction = this.currentAction();
      if (
        currentAction &&
        currentAction.isValid() &&
        currentAction.isWaiting()
      ) {
        return;
      }
      _super.prototype.removeCurrentAction.call(this);
    };
    Game_Enemy2.prototype.toFront = function () {
      this._toFront = true;
    };
    Game_Enemy2.prototype.isToFront = function () {
      return this._toFront;
    };
    Game_Enemy2.prototype.toBack = function () {
      this._toBack = true;
    };
    Game_Enemy2.prototype.isToBack = function () {
      return this._toBack;
    };
    Game_Enemy2.prototype.setFront = function () {
      if (this._front) {
        return;
      }
      this._toFront = false;
      this._front = true;
      if (this.currentAction() && this.currentAction().remainTurn() > 0) {
        return;
      }
      this.makeActions();
      $gameTroop.updateForecast();
    };
    Game_Enemy2.prototype.setBack = function () {
      if (!this._front) {
        return;
      }
      this._toBack = false;
      this._front = false;
      if (this.currentAction() && this.currentAction().remainTurn() > 0) {
        return;
      }
      $gameTroop.updateForecast();
    };
    Game_Enemy2.prototype.onPhaseChange = function () {
      //p('onPhaseChange')
      this.result().clear();
      this.regenerateHpUp();
      this.regenerateHpDown();
    };
    Game_Enemy2.prototype.regenerateHpDown = function () {
      var minRecover = -this.maxSlipDamage();
      var value = Math.max(Math.floor(this.slipDamage()), minRecover);
      if (value < 0) {
        //p('slipDamage:' + value)
        this.gainHp(value);
        this.onSlipDamage(value);
        this.startDamagePopup();
        if (this.isDead()) {
          this._reserveCollapse = true;
        } else {
        }
      }
    };
    Game_Enemy2.prototype.isCollapseReserved = function () {
      return this._reserveCollapse;
    };
    Game_Enemy2.prototype.onSlipDamage = function () {
      //this.addStun(1);
    };
    Game_Enemy2.prototype.gainHp = function (n, notUse, action) {
      if (notUse === void 0) {
        notUse = 0;
      }
      if (action === void 0) {
        action = null;
      }
      var undeadResult = this.checkUndead(n, action);
      if (undeadResult > 0) {
        return undeadResult;
      }
      var deathAgonyResult = this.checkDeathAgony(n, action);
      if (deathAgonyResult > 0) {
        return deathAgonyResult;
      }
      var isShareHp = this.hasStateMeta(StateMeta.shareHp);
      _super.prototype.gainHp.call(this, n, notUse, action);
      if (isShareHp) {
        $gameTroop.shareHp();
      }
      return -n;
    };
    Game_Enemy2.prototype.checkDeathAgony = function (gainHp, action) {
      if (gainHp > 0) {
        return 0;
      }
      if (!action) {
        return 0;
      }
      var damage = -gainHp;
      if (damage < this.hp) {
        return 0;
      }
      if (!this.hasStateMeta(StateMeta.deathAgony)) {
        return 0;
      }
      var realDamage = this.hp - 1;
      if (realDamage > 0) {
        _super.prototype.gainHp.call(this, -realDamage);
      }
      this._result.hpDamage = damage;
      this._result.hpAffected = true;
      this._result.deathAgony = true;
      var stateId = this.findStateByMeta(StateMeta.deathAgony);
      this.setDirty();
      this.removeState(stateId);
      this.addState(StateId.INVOKE_DEATH_AGONY, 1);
      return realDamage || 1;
    };
    Game_Enemy2.prototype.checkUndead = function (gainHp, action) {
      if (gainHp > 0) {
        return 0;
      }
      if (!action) {
        return 0;
      }
      if (action.isHolyElement()) {
        return 0;
      }
      var damage = -gainHp;
      if (damage < this.hp) {
        return 0;
      }
      if (!this.countStateMeta(StateMeta.UNDEAD)) {
        return 0;
      }
      var realDamage = this.hp - 1;
      if (realDamage > 0) {
        _super.prototype.gainHp.call(this, -realDamage);
      }
      this._result.hpDamage = damage;
      this._result.hpAffected = true;
      this._result.undead = true;
      var stateId = this.findStateByMeta(StateMeta.UNDEAD);
      this.setDirty();
      this.minusStateTurns(stateId, 1);
      return realDamage || 1;
    };
    Game_Enemy2.prototype.canPaySkillCost = function (skill) {
      if (skill.meta["bullet"]) {
        var bulletId = Math.trunc(skill.meta["bullet"]);
        var state = $dataStates[bulletId];
        if (!this.hasState(state.id)) {
          return false;
        }
      }
      return _super.prototype.canPaySkillCost.call(this, skill);
    };
    Game_Enemy2.prototype.paySkillCost = function (skill) {
      _super.prototype.paySkillCost.call(this, skill);
      if (skill.meta["bullet"]) {
        var bulletId = Math.trunc(skill.meta["bullet"]);
        var state = $dataStates[bulletId];
        this.minusStateTurns(state.id, 1);
      }
    };
    Game_Enemy2.prototype.hpSortValue = function () {
      return this.hp;
    };
    Game_Enemy2.prototype.clearEffect = function () {
      //p('clearEffect')
      _super.prototype.clearEffect.call(this);
      if (this._reserveCollapse) {
        this.performCollapse();
        this._reserveCollapse = false;
      }
    };
    Game_Enemy2.prototype.onTurnStart = function () {
      if (this.isDead()) {
        return;
      }
      _super.prototype.onTurnStart.call(this);
      this.removeBuffsAuto();
      this.addPassiveDebuffs();
    };
    Game_Enemy2.prototype.onPlayerTurnStart = function () {
      this.removeBuffsAuto();
      this.addPassiveDebuffs();
    };
    Game_Enemy2.prototype.removeBuffsAuto = function () {
      _super.prototype.removeBuffsAuto.call(this);
    };
    Game_Enemy2.prototype.addPassiveDebuffs = function () {
      var matDebuff = $gameParty.countSkill(SkillMeta.matDebuff);
      if (matDebuff > 0) {
        this.addDebuff(4, matDebuff);
      }
    };
    Game_Enemy2.prototype.states = function () {
      var states = _super.prototype.states.call(this).sort(function (a, b) {
        var orderA = a.id;
        var orderB = b.id;
        if (a.meta["order"]) {
          orderA = parseInt(a.meta["order"]);
        }
        if (b.meta["order"]) {
          orderB = parseInt(b.meta["order"]);
        }
        if (a.meta["passive"]) {
          if (!b.meta["passive"]) {
            return -1;
          }
        } else {
          if (b.meta["passive"]) {
            return 1;
          }
        }
        return orderA - orderB;
      });
      return states;
    };
    /**
     * 光合成を実行
     */
    Game_Enemy2.prototype.runPhotosynthesize = function () {
      if (!this.hasStateMeta(StateMeta.photosynthesize)) {
        return;
      }
      if (this.hp == this.mhp) {
        return;
      }
      if (this.isStun()) {
        return;
      }
      this.addStun(1);
      if (this.hasState(StateId.FLAME)) {
        return;
      }
      var hp = this.photosynthesizeValue();
      this.gainHp(hp);
      this.startDamagePopup();
      this.setDirty();
      $gameTemp.requestAnimation([this], 241, false);
    };
    Game_Enemy2.prototype.photosynthesizeValue = function () {
      var max = 50;
      var hp = Math.min(max, Math.round(this.mhp / 5));
      return hp;
    };
    /**
     * 地の恩恵を実行
     */
    Game_Enemy2.prototype.runEarthBenefit = function () {
      if (this.isStun()) {
        return;
      }
      if (!this.hasStateMeta(StateMeta.earthBenefit)) {
        return;
      }
      this.addState(StateId.TOGE, 3);
      this.addState(StateId.STRENGTH, 3);
    };
    /**
     * 覇気を実行
     */
    Game_Enemy2.prototype.runDarkBenefit = function () {
      if (this.isStun()) {
        return;
      }
      if (!this.hasStateMeta(StateMeta.darkBenefit)) {
        return;
      }
      this.addState(StateId.STRENGTH, 3);
    };
    Game_Enemy2.prototype.onAddState = function (stateId) {
      if (stateId == StateId.STUN) {
        if (this.hasStateMeta(StateMeta.earthBenefit)) {
          this.removeBuff(2);
          this.removeState(StateId.STRENGTH);
          this.removeState(StateId.TOGE);
          return;
        }
      }
    };
    Game_Enemy2.prototype.addFireBenefit = function (damage) {
      this._fireBenefit += damage;
      while (this._fireBenefit >= 10) {
        this.addDebuff(2, 1);
        this.addDebuff(4, 1);
        this._fireBenefit -= 10;
      }
    };
    Game_Enemy2.prototype.fireBenefitRemain = function () {
      return 10 - this._fireBenefit;
    };
    Game_Enemy2.prototype.onDamage = function (damage) {
      //p('damage:' + damage)
      if (damage > 0) {
        if (this.hasStateMeta(StateMeta.hardening)) {
          var value = this.countStateMeta(StateMeta.hardening);
          this.addBuff(3, value);
        }
      }
      _super.prototype.onDamage.call(this, damage);
    };
    Game_Enemy2.prototype.name = function () {
      return this.originalName() + (this._plural ? this._letter : "");
    };
    Game_Enemy2.prototype.originalName = function () {
      var name = getItemName(this.enemy());
      name = name.replace("<hard>", "");
      return name;
    };
    Object.defineProperty(Game_Enemy2.prototype, "mhp", {
      get: function () {
        var n = _super.prototype.param.call(this, 0);
        if ($gameSwitches.value(74)) {
          // チュートリアル中
          return Math.trunc(n * 0.7);
        }
        return n;
      },
      enumerable: true,
      configurable: true,
    });
    Game_Enemy2.prototype.countHellFire = function () {
      var count = 0;
      for (var _i = 0, _a = this.states(); _i < _a.length; _i++) {
        var s = _a[_i];
        count++;
      }
      return count;
    };
    Game_Enemy2.prototype.breakDamageBonusRate = function () {
      var base = STUN_DAMAGE_BONUS;
      base += $gameParty.countSkill(SkillMeta.breakDamage);
      return base;
    };
    return Game_Enemy2;
  })(Game_Enemy);
  Nore.Game_Enemy2 = Game_Enemy2;
})(Nore || (Nore = {}));
