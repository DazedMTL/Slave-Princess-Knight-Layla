/*:ja
 * @target MZ
 */
var Nore;
(function (Nore) {
  Sprite_Clickable.prototype.changeTextColor = function (color) {
    this.bitmap.textColor = color;
  };
  Sprite_Gauge.prototype.bitmapWidth = function () {
    return 208;
  };
  var _Sprite_Gauge_prototype_currentValue =
    Sprite_Gauge.prototype.currentValue;
  Sprite_Gauge.prototype.currentValue = function () {
    if (this._battler) {
      switch (this._statusType) {
        case "fame":
          return $gameActors.mainActor().fame;
        case "frustration":
          return $gameActors.mainActor().zasetsu;
      }
    }
    return _Sprite_Gauge_prototype_currentValue.call(this);
  };
  var _Sprite_Gauge_prototype_currentMaxValue =
    Sprite_Gauge.prototype.currentMaxValue;
  Sprite_Gauge.prototype.currentMaxValue = function () {
    if (this._battler) {
      switch (this._statusType) {
        case "fame":
          return $gameActors.mainActor().maxFame;
        case "frustration":
          return $gameActors.mainActor().maxZasetsu;
      }
    }
    return _Sprite_Gauge_prototype_currentMaxValue.call(this);
  };
  var Sprite_Gauge_prototype_label = Sprite_Gauge.prototype.label;
  Sprite_Gauge.prototype.label = function () {
    switch (this._statusType) {
      case "fame":
        return TextManager.fame;
      case "frustration":
        return TextManager.frustration;
    }
    return Sprite_Gauge_prototype_label.call(this);
  };
  Sprite_Gauge.prototype.gaugeX = function () {
    return this._statusType === "time" ? 0 : 100;
  };
  function getSystemBaseTexture(name) {
    var baseTexture = PIXI.utils.BaseTextureCache["system/" + name];
    if (!baseTexture) {
      var bitmap = ImageManager.loadSystem(name);
      if (!bitmap.isReady()) {
        return;
      }
      baseTexture = new PIXI.BaseTexture(bitmap._image);
      baseTexture.resource.url = "system/" + name;
      PIXI.utils.BaseTextureCache["system/" + name] = baseTexture;
    }
    return baseTexture;
  }
  Nore.getSystemBaseTexture = getSystemBaseTexture;
  var Window_prototype__createContentsSprite =
    Window.prototype._createContentsSprite;
  Window.prototype._createContentsSprite = function () {
    this._windowContentsBackSprite = new Sprite();
    this._clientArea.addChild(this._windowContentsBackSprite);
    this._windowContentsBackSprite2 = new Sprite();
    this._clientArea.addChild(this._windowContentsBackSprite2);
    Window_prototype__createContentsSprite.call(this);
    this._windowContentsSprite = new Sprite();
    this._windowContentsSprite.x = -12;
    this._windowContentsSprite.y = -12;
    this._clientArea.addChild(this._windowContentsSprite);
  };
  Spriteset_Base.prototype.isAnimationPlaying = function () {
    if (this._animationSprites.length == 0) {
      return false;
    }
    for (var _i = 0, _a = this._animationSprites; _i < _a.length; _i++) {
      var anime = _a[_i];
      if (anime.isPlayingBattle()) {
        return true;
      } else {
      }
    }
    return false;
    return this._animationSprites.length > 0;
  };
  Sprite_AnimationMV.prototype.isPlayingBattle = function () {
    if (this._battleDuration > 0) {
      return this._battleDuration > this._frameIndex;
    }
    return this.isPlaying();
  };
  Sprite_Animation.prototype.isPlayingBattle = function () {
    if (this._battleDuration > 0) {
      return this._battleDuration > this._frameIndex;
    }
    return this._playing;
  };
  Window_Base.prototype.drawGoldImg = function (x, y) {
    var baseTexture = Nore.getSystemBaseTexture("gold");
    var texture = new PIXI.Texture(baseTexture);
    var sprite = new PIXI.Sprite(texture);
    sprite.x = x;
    sprite.y = y;
    this._windowContentsSprite.addChild(sprite);
  };
})(Nore || (Nore = {}));
var Rank;
(function (Rank) {
  Rank[(Rank["H"] = 0)] = "H";
  Rank[(Rank["G"] = 1)] = "G";
  Rank[(Rank["F"] = 2)] = "F";
  Rank[(Rank["E"] = 3)] = "E";
  Rank[(Rank["D"] = 4)] = "D";
  Rank[(Rank["C"] = 5)] = "C";
  Rank[(Rank["B"] = 6)] = "B";
  Rank[(Rank["A"] = 7)] = "A";
  Rank[(Rank["S"] = 8)] = "S";
  Rank[(Rank["MAX"] = 9)] = "MAX";
})(Rank || (Rank = {}));
Window_Base.prototype.drawRank = function (rank, x, y) {
  var iconIndex = 1923 + rank + 13;
  if (rank == Rank.MAX) {
    this.drawIcon(1923 + 6 + 16, x - 5, y);
    this.drawIcon(1923 + 6 + 17, x + 32 - 5, y);
    return;
  }
  this.drawIcon(iconIndex, x, y);
};
