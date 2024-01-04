var Nore;
(function (Nore) {
  function toNumber(str, def) {
    return isNaN(str) ? def : +(str || def);
  }
  var parameters = PluginManager.parameters("Saba_DamageShake");
  var shakeDuration = toNumber(parameters["shakeDuration"], 12);
  var shakeSpeed = toNumber(parameters["shakeSpeed"], 10);
  /*
   * シェイクの強さです。
   * 最大HPに対する与えたダメージの割合（単位パーセント）と、
   * シェイクの強さのマップ
   */
  var shakePowerRates = {
    0: 2,
    10: 8,
    20: 12,
    30: 16,
    40: 20,
    50: 24, // 一度に 50 % ダメージですごくシェイク
  };
  var Game_Enemy_prototype_performDamage = Game_Enemy.prototype.performDamage;
  Game_Enemy.prototype.performDamage = function (skip, tip) {
    var damage = this.result().hpDamage;
    if (damage <= 0) {
      return;
    }
    if (this.mhp <= 0) {
      return;
    }
    var rate = (damage * 100) / this.mhp;
    if (this.result().critical) {
      rate = 1;
    }
    var power = 0;
    for (var per in shakePowerRates) {
      if (per > rate) {
        continue;
      }
      if (shakePowerRates[per] < power) {
        continue;
      }
      power = shakePowerRates[per];
    }
    this.shakePower = power;
    Game_Battler.prototype.performDamage.call(this);
    if (!skip) {
      if (tip) {
        SoundManager.playMiss();
      } else {
        SoundManager.playEnemyDamage();
      }
    } else {
    }
    this.requestEffect("shake");
  };
  Game_Enemy.prototype.requestShakeEvent = function () {
    this.shakePower = 24;
    this.requestEffect("shake");
  };
  var _Sprite_Battler_prototype_setupDamagePopup =
    Sprite_Battler.prototype.setupDamagePopup;
  Sprite_Battler.prototype.setupDamagePopup = function () {
    if (this._battler.isDamagePopupRequested()) {
      if (this._battler.isSpriteVisible()) {
        if (this._battler.isEnemy()) {
          this._battler.performDamage(false, this._battler.result().tipped);
        }
      }
    }
    _Sprite_Battler_prototype_setupDamagePopup.call(this);
  };
  var _Sprite_Enemy_prototype_startEffect = Sprite_Enemy.prototype.startEffect;
  Sprite_Enemy.prototype.startEffect = function (effectType) {
    this._effectType = effectType;
    switch (this._effectType) {
      case "shake":
        this.startShake();
        break;
    }
    _Sprite_Enemy_prototype_startEffect.call(this, effectType);
  };
  var _Sprite_Enemy_prototype_updateEffect =
    Sprite_Enemy.prototype.updateEffect;
  Sprite_Enemy.prototype.updateEffect = function () {
    var lastDuration = this._effectDuration;
    _Sprite_Enemy_prototype_updateEffect.call(this);
    if (lastDuration > 0) {
      switch (this._effectType) {
        case "shake":
          this.updateShake();
          break;
      }
    }
  };
  Sprite_Enemy.prototype.startShake = function () {
    this._effectDuration = shakeDuration;
    this._shakeSpeed = shakeSpeed;
    this._shake = 0;
    this._shakeDirection = 1;
  };
  Sprite_Enemy.prototype.update = function () {
    Sprite_Battler.prototype.update.call(this);
    if (this._enemy) {
      this.updateEffect();
      this.updateStateSprite();
      this.updateTone();
    }
  };
  Sprite_Enemy.prototype.updateWhiten = function () {
    if (!this._enemy.canMove()) {
      this.setBlendColor([255, 255, 255, 128]);
    } else {
      var alpha = 128 - (8 - this._effectDuration) * 20;
      this.setBlendColor([255, 255, 255, alpha]);
    }
  };
  Sprite_Enemy.prototype.startWhiten = function () {
    if (!this._enemy.canMove()) {
      this._effectDuration = 3;
    } else {
      this._effectDuration = 8;
    }
  };
  Sprite_Enemy.prototype.updateShake = function () {
    if (this._effectType == "bossCollapse") {
      return;
    }
    var delta =
      (this._enemy.shakePower * this._shakeSpeed * this._shakeDirection) / 10.0;
    if (
      this._effectDuration <= 1 /*&& this._shake * (this._shake + delta) < 0*/
    ) {
      this._shake = 0;
    } else {
      this._shake += delta;
    }
    if (this._shake > this._enemy.shakePower * 2) {
      this._shakeDirection = -1;
    }
    if (this._shake < -this._enemy.shakePower * 2) {
      this._shakeDirection = 1;
    }
    var x_value = Math.random() * this._shake * randomDirection();
    //var xx = this._enemy.screenX();
    this._shakeX = x_value;
    var y_value = Math.random() * this._shake * randomDirection();
    this._shakeY = y_value;
  };
  function randomDirection() {
    if (Math.random() < 0.5) {
      return 1;
    } else {
      return -1;
    }
  }
})(Nore || (Nore = {}));
