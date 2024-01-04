Sprite_AnimationMV.prototype.setupRate = function () {
  if (this._animation.name.contains("60")) {
    this._rate = 1;
  } else if (this._animation.name.contains("30")) {
    this._rate = 2;
  } else {
    this._rate = 4;
  }
};
