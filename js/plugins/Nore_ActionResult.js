/*:ja
 * @target MZ
 * @author ル
 *
 */
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
var Game_ActionResult2 = /** @class */ (function (_super) {
  __extends(Game_ActionResult2, _super);
  function Game_ActionResult2() {
    var _this = (_super !== null && _super.apply(this, arguments)) || this;
    _this.provoke = false;
    _this.renkan = false;
    _this.undead = false;
    _this.magnet = false;
    _this.cancel = false;
    _this.clenching = false;
    _this.barrier = false;
    _this._noDamage = false;
    _this._noEffect = false;
    _this._reacted = false;
    _this.slipDamage = 0;
    return _this;
  }
  Game_ActionResult2.prototype.clear = function () {
    _super.prototype.clear.call(this);
    this._shieldDamage = 0;
    this._armorDamage = 0;
    this.slipDamage = 0;
    this.provoke = false;
    this.renkan = false;
    this.undead = false;
    this.magnet = false;
    this.cancel = false;
    this.barrier = false;
    this._noDamage = false;
    this._noEffect = false;
    this._reacted = false;
    this.clenching = false;
  };
  Game_ActionResult2.prototype.addShieldDamage = function (n) {
    this._shieldDamage += n;
  };
  Game_ActionResult2.prototype.shieldDamage = function () {
    return this._shieldDamage;
  };
  Game_ActionResult2.prototype.addArmorDamage = function (n) {
    this._armorDamage += n;
  };
  Game_ActionResult2.prototype.armorDamage = function () {
    return this._armorDamage;
  };
  Game_ActionResult2.prototype.setNoDamage = function () {
    this._noDamage = true;
  };
  Game_ActionResult2.prototype.isNoDamage = function () {
    return this._noDamage;
  };
  Game_ActionResult2.prototype.setNoEffect = function () {
    this._noEffect = true;
  };
  Game_ActionResult2.prototype.isNoEffect = function () {
    return this._noEffect;
  };
  Game_ActionResult2.prototype.onDisplayResults = function () {
    this.addedStates = [];
    /*this.removedStates = [];
        this.addedBuffs = [];
        this.addedDebuffs = [];
        this.removedBuffs = [];*/
  };
  Game_ActionResult2.prototype.react = function () {
    this._reacted = true;
  };
  Game_ActionResult2.prototype.isReacted = function () {
    return this._reacted;
  };
  return Game_ActionResult2;
})(Game_ActionResult);
