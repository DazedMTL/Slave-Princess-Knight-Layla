var Nore;
(function (Nore) {
  Sprite_Animation.prototype.setup = function (
    targets,
    animation,
    mirror,
    delay,
    previous
  ) {
    this._targets = targets;
    this._animation = animation;
    this._mirror = mirror;
    this._delay = delay;
    this._previous = previous;
    this._effect = EffectManager.load(animation.effectName);
    this._playing = true;
    this._battleDuration = -1;
    var timings = animation.soundTimings.concat(animation.flashTimings);
    for (var _i = 0, timings_1 = timings; _i < timings_1.length; _i++) {
      var timing = timings_1[_i];
      if (timing.se && timing.se.name == "Absorb1") {
        this._battleDuration = timing.frame;
        continue;
      }
      if (timing.frame > this._maxTimingFrames) {
        this._maxTimingFrames = timing.frame;
      }
    }
    if ($gameTemp.isAutoBattle() && this._battleDuration > 0) {
      this._battleDuration = Math.ceil(this._battleDuration / 2);
    }
  };
  Sprite_Enemy.prototype.startCollapse = function () {
    this._effectDuration = 32;
    if ($gameTemp.isAutoBattle()) {
      this._effectDuration = 16;
    }
    this._appeared = false;
  };
  Sprite_Animation.prototype.updateEffectGeometry = function () {
    var scale = this._animation.scale / 100;
    var r = Math.PI / 180;
    var rx = this._animation.rotation.x * r;
    var ry = this._animation.rotation.y * r;
    var rz = this._animation.rotation.z * r;
    if (this._handle) {
      this._handle.setLocation(0, 0, 0);
      this._handle.setRotation(rx, ry, rz);
      this._handle.setScale(scale, scale, scale);
      if ($gameTemp.isAutoBattle()) {
        this._handle.setSpeed(this._animation.speed / 50);
      } else {
        this._handle.setSpeed(this._animation.speed / 100);
      }
    }
  };
  Sprite_AnimationMV.prototype.update = function () {
    Sprite.prototype.update.call(this);
    this.updateMain();
    this.updateFlash();
    this.updateScreenFlash();
    this.updateHiding();
    if ($gameTemp.isAutoBattle()) {
      this.updateMain();
      this.updateFlash();
      this.updateScreenFlash();
      this.updateHiding();
    }
  };
})(Nore || (Nore = {}));
