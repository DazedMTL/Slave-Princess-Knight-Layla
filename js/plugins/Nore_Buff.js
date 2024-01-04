var BUFF_ATK = 2;
var BUFF_DEF = 3;
var BuffId;
(function (BuffId) {
  BuffId[(BuffId["atk"] = 2)] = "atk";
  BuffId[(BuffId["def"] = 3)] = "def";
  BuffId[(BuffId["mat"] = 4)] = "mat";
  BuffId[(BuffId["mdf"] = 5)] = "mdf";
})(BuffId || (BuffId = {}));
var Nore;
(function (Nore) {
  Game_BattlerBase.prototype.clearBuffs = function () {
    this._buffs = [0, 0, 0, 0, 0, 0, 0, 0];
    this._buffTurns = [0, 0, 0, 0, 0, 0, 0, 0];
  };
  Game_BattlerBase.prototype.isMaxBuffAffected = function (paramId) {
    return this._buffs[paramId] >= 100;
  };
  Game_BattlerBase.prototype.isMaxDebuffAffected = function (paramId) {
    return this._buffs[paramId] <= -100;
  };
  Game_Battler.prototype.addBuff = function (paramId, turns, isPassive) {
    if (isPassive === void 0) {
      isPassive = false;
    }
    if (this.isAlive()) {
      if (!isPassive) {
        this.onAddBuff(paramId);
      }
      for (var i = 0; i < turns; i++) {
        this.increaseBuff(paramId);
      }
      if (this.isBuffAffected(paramId)) {
        this.overwriteBuffTurns(paramId, turns);
      }
      this._result.pushAddedBuff(paramId);
      this.refresh();
    }
  };
  Game_Battler.prototype.onAddBuff = function (paramId) {};
  Game_Battler.prototype.addDebuff = function (paramId, turns) {
    if (this.isAlive()) {
      for (var i = 0; i < turns; i++) {
        this.decreaseBuff(paramId);
      }
      if (this.isDebuffAffected(paramId)) {
        this.overwriteBuffTurns(paramId, turns);
      }
      this._result.pushAddedDebuff(paramId);
      this.refresh();
    }
  };
  Game_BattlerBase.prototype.buffs = function () {
    return this._buffs;
  };
  Game_BattlerBase.prototype.overwriteBuffTurns = function (paramId, turns) {
    this._buffTurns[paramId] = 1;
  };
  Game_Battler.prototype.removeBuffsAuto = function () {
    for (var i = 0; i < this.buffLength(); i++) {
      if (this.isBuffExpired(i)) {
        this.removeBuff(i);
      }
    }
  };
  Game_Battler.prototype.addBuffsAuto = function () {
    for (var _i = 0, _a = this.states(); _i < _a.length; _i++) {
      var state = _a[_i];
      var stateValue = this.getStateTurn(state.id);
      if (state.meta["passive"]) {
        stateValue = parseInt(state.meta["buffValue"]);
      } else {
        stateValue = stateValue * parseInt(state.meta["buffValue"]);
      }
      if (state.meta["addBuff"] == "ATK") {
        this.addBuff(2, stateValue);
      }
      if (state.meta["addBuff"] == "DEF") {
        this.addBuff(3, stateValue);
      }
      if (state.meta["addBuff"] == "MAT") {
        this.addBuff(4, stateValue);
      }
      if (state.meta["addBuff"] == "MDF") {
        this.addBuff(5, stateValue);
      }
      if (state.meta["syunbin"]) {
        var turn = this.getStateTurn(StateId.MIKIRI) || 0;
        if (turn < 1) {
          this.addState(StateId.MIKIRI, 1 - turn);
        }
      }
    }
  };
  Game_Battler.prototype.getStateTurn = function (stateId) {
    var state = $dataStates[stateId];
    var turns = this._stateTurns[stateId];
    if (state.autoRemovalTiming == 2) {
      // ターン終了時にきれるステートは1ターン伸びる
      turns++;
    }
    return turns;
  };
  Game_Battler.prototype.onAllActionsEnd = function () {
    this.startDamagePopup();
    //this.clearResult();
    this.removeStatesAuto(1);
    //this.removeBuffsAuto();
  };
  Game_BattlerBase.prototype.updateBuffTurns = function () {
    for (var i = 0; i < this._buffTurns.length; i++) {
      if (this.isBuff(i)) {
        if (this._buffTurns[i] > 0) {
          this._buffTurns[i]--;
        }
      }
    }
  };
  Game_BattlerBase.prototype.isBuff = function (index) {
    return this._buffs[index] > 0;
  };
  Game_BattlerBase.prototype.updateDebuffTurns = function () {
    if (this.hasStateMeta(StateMeta.aiming)) {
      return;
    }
    for (var i = 0; i < this._buffTurns.length; i++) {
      if (!this.isBuff(i)) {
        if (this._buffTurns[i] > 0) {
          this._buffTurns[i]--;
        }
      }
    }
  };
  Game_Battler.prototype.calcAtkBuff = function () {
    return this._buffs[2];
  };
  Game_Battler.prototype.calcDefBuff = function () {
    return this._buffs[3];
  };
  Game_Battler.prototype.calcMatBuff = function () {
    return this._buffs[4];
  };
  Game_Battler.prototype.calcMdfBuff = function () {
    return this._buffs[5];
  };
})(Nore || (Nore = {}));
