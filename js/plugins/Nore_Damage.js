var Nore;
(function (Nore) {
  Game_Battler.prototype.maxSlipDamage = function () {
    return 99;
  };
  Game_BattlerBase.prototype.param = function (paramId) {
    var value = this.paramBasePlus(paramId) * this.paramRate(paramId);
    var maxValue = this.paramMax(paramId);
    var minValue = this.paramMin(paramId);
    return Math.round(value.clamp(minValue, maxValue));
  };
  var rateMap = {};
  Game_Battler.prototype.defRate = function () {
    var d = this.def;
    var n = 1;
    for (var i = 0; i < d; i++) {
      n *= 31 / 32;
    }
    return n;
  };
  Game_Battler.prototype.mdfRate = function () {
    var d = this.mdf;
    var n = 1;
    for (var i = 0; i < d; i++) {
      n *= 31 / 32;
    }
    return n;
  };
  Game_Battler.prototype.mdf2 = function () {
    var d = this.mdfUp();
    return Math.max(d, 0);
  };
  Game_Battler.prototype.atk2 = function () {
    var d = this.atk + this.atkUp();
    return Math.max(d, 0);
  };
  Game_Battler.prototype.def2 = function () {
    var d = this.defUp();
    return Math.max(d, 0);
  };
  Game_Battler.prototype.mat2 = function () {
    var d = this.mat + this.matUp();
    return Math.max(d, 0);
  };
  Game_Battler.prototype.isMaxDamage = function () {
    for (var _i = 0, _a = this.states(); _i < _a.length; _i++) {
      var state = _a[_i];
      for (var _b = 0, _c = state.traits; _b < _c.length; _b++) {
        var trait = _c[_b];
        if (trait.code == 22 && trait.dataId == 1) {
          return true;
        }
      }
    }
    return false;
  };
  Game_Battler.prototype.regenerateHp = function () {
    var minRecover = -this.maxSlipDamage();
    var value = Math.max(Math.floor(this.slipDamage()), minRecover);
    if (value !== 0) {
      p("rege:" + value);
      this.gainHp(value);
      this.startDamagePopup();
      if (this.isDead()) {
        this.performCollapse();
      } else {
      }
    }
  };
  Game_Battler.prototype.requestEffect = function (effectType) {
    if (this.isDead()) {
      if (
        effectType != "shake" &&
        effectType != "collapse" &&
        effectType != "bossCollapse"
      ) {
        return;
      }
    }
    this._effectType = effectType;
  };
  Game_Battler.prototype.slipDamage = function () {
    var total = 0;
    var noSlipTotal = 0;
    for (var _i = 0, _a = this.states(); _i < _a.length; _i++) {
      var s = _a[_i];
      for (var _b = 0, _c = s.traits; _b < _c.length; _b++) {
        var t = _c[_b];
        if (t.code == 22 && t.dataId == 7) {
          if (s.meta["noEffectBySlipDamage"]) {
            noSlipTotal += t.value * 100;
          } else {
            total += t.value * 100 * this._stateTurns[s.id];
          }
        }
      }
    }
    if (total >= 0) {
      total += noSlipTotal;
    }
    return total;
  };
  Game_Battler.prototype.atkUp = function () {
    return this.countState("atkUp") - this.countState("atkDown");
  };
  Game_Battler.prototype.defUp = function () {
    return this.countState("defUp") - this.countState("defDown");
  };
  Game_Battler.prototype.matUp = function () {
    return this.countState("matUp") - this.countState("matDown");
  };
  Game_Battler.prototype.mdfUp = function () {
    return this.countState("mdfUp") - this.countState("mdfDown");
  };
  Sprite_Damage.prototype.setup = function (target) {
    var result = target.result();
    if (result.missed || result.evaded) {
      this._colorType = 0;
      this.createMiss();
    } else if (result.hpAffected) {
      this._colorType = result.hpDamage >= 0 ? 0 : 1;
      if (target.isActor()) {
        this._colorType = 4;
      }
      this.createDigits(result.hpDamage);
    } else if (target.isAlive() && result.mpDamage !== 0) {
      this._colorType = result.mpDamage >= 0 ? 4 : 3;
      this.createDigits(result.mpDamage);
    } else if (result.shieldDamage() != 0) {
      this._colorType = result.shieldDamage() >= 0 ? 5 : 1;
      this.createDigits(result.shieldDamage());
    }
    if (result.critical) {
      this.setupCriticalEffect();
    }
  };
})(Nore || (Nore = {}));
