/*:ja
 * @target MZ
 * @author ル
 */
var Nore;
(function (Nore) {
  Game_Battler.prototype.countStateMeta = function (meta) {
    var n = 0;
    for (var _i = 0, _a = this.states(); _i < _a.length; _i++) {
      var s = _a[_i];
      if (s.meta[meta]) {
        var value = parseInt(s.meta[meta]);
        if (!isNaN(value)) {
          n += value;
        } else {
          n += this._stateTurns[s.id];
        }
      }
    }
    return n;
  };
  Game_Battler.prototype.hasStateMeta = function (meta) {
    for (var _i = 0, _a = this.states(); _i < _a.length; _i++) {
      var s = _a[_i];
      if (s.meta[meta]) {
        return true;
      }
    }
    return false;
  };
  Game_Battler.prototype.processArmor = function (damage) {
    if (damage <= 0) {
      return damage;
    }
    if (this._armor > 0) {
      damage -= this._armor;
      var armorDamage = 1;
      this._armor -= armorDamage;
      this._result.addArmorDamage(armorDamage);
    }
    return damage;
  };
  Game_Battler.prototype.toge = function () {
    return this.countStateMeta(StateMeta.toge);
  };
  Game_Battler.prototype.bleeding = function () {
    return this.countStateMeta(StateMeta.bleeding);
  };
})(Nore || (Nore = {}));
