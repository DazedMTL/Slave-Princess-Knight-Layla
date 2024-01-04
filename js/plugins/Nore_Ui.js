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
  var Window_RogueUi = /** @class */ (function (_super) {
    __extends(Window_RogueUi, _super);
    function Window_RogueUi() {
      var _this = _super.call(this, new Rectangle(0, 0, 1280, 200)) || this;
      _this.backOpacity = 0;
      _this.y = -0;
      return _this;
    }
    Window_RogueUi.prototype._createClientArea = function () {
      this._clientArea = new Sprite();
      this._clientArea.filters = [new PIXI.filters.AlphaFilter()];
      this._clientArea.move(0, 0);
      this.addChild(this._clientArea);
    };
    Window_RogueUi.prototype._updateFilterArea = function () {};
    Window_RogueUi.prototype.update = function () {
      _super.prototype.update.call(this);
      if (this.isChanged()) {
        this.refresh();
      }
      if ($gameTemp.infoEnemy != this._enemy) {
        this.setEnemy($gameTemp.infoEnemy);
      }
      this.visible = this.isVisible();
    };
    Window_RogueUi.prototype.setEnemy = function (e) {
      this._enemy = e;
      this.refresh();
    };
    Window_RogueUi.prototype.isVisible = function () {
      if (!$gameSwitches.value(1)) {
        return false;
      }
      if ($gameSwitches.value(999) && !$gameSwitches.value(998)) {
        return false;
      }
      return true;
    };
    Window_RogueUi.prototype._createFrameSprite = function () {
      this._frameSprite = new Sprite();
    };
    Window_RogueUi.prototype._refreshFrame = function () {};
    Window_RogueUi.prototype.isChanged = function () {
      if (this._lastHp != this.actor().hp) {
        return true;
      }
      if (this._enemy) {
        if (this._lastEnemyHp != this._enemy.hp) {
          return true;
        }
      }
      /*  if (this._lastMp != this.actor().mp) {
                  return true;
              }*/
      if (this._lastLevel != this.actor()._level) {
        return true;
      }
      if (this._lastGold != $gameParty.gold()) {
        return true;
      }
      /*if (this._lastArrow != $gameParty.arrow()) {
                return true;
            }*/
      return false;
    };
    Window_RogueUi.prototype.actor = function () {
      return $gameActors.mainActor();
    };
    Window_RogueUi.prototype.refresh = function () {
      if (this._gradient) {
        this._windowContentsSprite.removeChild(this._gradient);
        this._windowContentsSprite.removeChild(this._gradientRight);
      }
      this._windowContentsSprite.destroyAndRemoveChildren();
      this.contents.clear();
      this.drawBg();
      this.drawGradient();
      this.drawGoldBg();
      this.drawBattleUi();
      //this.updateGoldUpEffect();
    };
    Window_RogueUi.prototype.updateGoldUpEffect = function () {
      var n = $gameTemp.clearGainGold();
      if (n == 0) {
        return;
      }
      if (this._goldEffect) {
        this.removeChild(this._goldEffect);
      }
      var effect = new GoldPlusEffect(n);
      effect.x = 1055;
      effect.y = 95;
      this._goldEffect = effect;
      this.addChild(effect);
    };
    Window_RogueUi.prototype.drawGoldBg = function () {
      var baseTexture = Nore.getSystemBaseTexture("gold");
      var texture = new PIXI.Texture(baseTexture);
      var sprite = new PIXI.Sprite(texture);
      sprite.x = 1084;
      sprite.y = 0;
      this._contentsBackSprite.addChild(sprite);
    };
    Window_RogueUi.prototype.drawGradient = function () {
      if (!this._gradient) {
        var baseTexture = Nore.getSystemBaseTexture("gradient");
        var texture = new PIXI.Texture(baseTexture);
        var sprite = new PIXI.Sprite(texture);
        sprite.x = 0;
        sprite.y = 0;
        this._gradient = sprite;
        var texture = new PIXI.Texture(baseTexture);
        var sprite = new PIXI.Sprite(texture);
        sprite.scale.x = -1;
        sprite.x = Graphics.width;
        sprite.y = 0;
        this._gradientRight = sprite;
      }
      this._windowContentsSprite.addChild(this._gradient);
      this._windowContentsSprite.addChild(this._gradientRight);
    };
    Window_RogueUi.prototype.drawBg = function () {
      var baseTexture = this.getBaseTexture();
      var xx = 126;
      var texture = new PIXI.Texture(
        baseTexture,
        new PIXI.Rectangle(0, 0, 460, 24)
      );
      var sprite = new PIXI.Sprite(texture);
      sprite.x = xx;
      sprite.y = 51;
      this._windowContentsSprite.addChild(sprite);
      var sprite2 = new PIXI.Sprite(texture);
      sprite2.x = xx + 494;
      sprite2.y = sprite.y;
      this._windowContentsSprite.addChild(sprite2);
      var rect;
      if (ConfigManager.en) {
        rect = new PIXI.Rectangle(300, 48, 300, 24);
      } else {
        rect = new PIXI.Rectangle(0, 48, 300, 24);
      }
      var texture2 = new PIXI.Texture(baseTexture, rect);
      var sprite3 = new PIXI.Sprite(texture2);
      sprite3.x = xx + 660;
      sprite3.y = sprite.y + 36;
      this._windowContentsSprite.addChild(sprite3);
    };
    Window_RogueUi.prototype.getBaseTexture = function () {
      var baseTexture = PIXI.utils.BaseTextureCache["system/ui2"];
      if (!baseTexture) {
        var bitmap = ImageManager.loadSystem("ui2");
        if (!bitmap.isReady()) {
          return;
        }
        baseTexture = new PIXI.BaseTexture(bitmap._image);
        baseTexture.resource.url = "system/ui2";
        PIXI.utils.BaseTextureCache["system/ui2"] = baseTexture;
      }
      return baseTexture;
    };
    Window_RogueUi.prototype.getEnemyBaseTexture = function () {
      var baseTexture = PIXI.utils.BaseTextureCache["system/enemy"];
      if (!baseTexture) {
        var bitmap = ImageManager.loadSystem("enemy");
        if (!bitmap.isReady()) {
          return;
        }
        baseTexture = new PIXI.BaseTexture(bitmap._image);
        baseTexture.resource.url = "system/enemy";
        PIXI.utils.BaseTextureCache["system/enemy"] = baseTexture;
      }
      return baseTexture;
    };
    Window_RogueUi.prototype.drawBattleUi = function () {
      var xxx = 180;
      this.drawEnemy(xxx);
      xxx = 560;
      this.drawHp(xxx);
      //this.drawMp(xxx + 10);
      xxx = 800;
      this.drawLevel(862);
      this.drawGold(1100);
      this.drawFloor();
    };
    Window_RogueUi.prototype.drawFloor = function () {
      var xx = 120;
      var width = 150;
      var max = 8;
      var rate = $gameVariables.value(16) / max;
      if ($gameSwitches.value(175)) {
        this.drawIcon(2113, xx, 80);
        return;
      }
      for (var i = 0; i < max; i++) {
        if (i < $gameVariables.value(16)) {
          continue;
        }
        var rate2 = i / max;
        this.drawIcon(2144, xx + width - width * rate2 - 25, 80);
      }
      this.drawIcon(2113, xx + width - width * rate, 80);
      //this.contents.fillRect(xx + 30, 120, 200, 3, ColorManager.normalColor());
    };
    Window_RogueUi.prototype.drawLevel = function (x) {
      this._lastLevel = this.actor()._level;
      var actor = this.actor();
      var yy = 70;
      this.drawNumber(actor.level, x + 180, yy, 60, "left", 1);
      var sprite2 = new Sprite_GaugeLevel();
      sprite2.setup(actor, "hp");
      sprite2.move(x, 92);
      sprite2.show();
      this._levelGauge = sprite2;
      this.addChild(this._levelGauge);
    };
    Window_RogueUi.prototype.drawEnemy = function (x) {
      if (!this._enemy) {
        return;
      }
      if (this._hpGauge2) {
        this.removeChild(this._hpGauge2);
        this._hpGauge2.destroy();
      }
      this._lastEnemyHp = this._enemy.hp;
      this.contents.fontSize = 23;
      var yy = 4;
      //this.drawText('HP', x, 20, 100, 'left');
      var xxx = x + 220;
      var index = parseInt(this._enemy.enemy().meta["name"]);
      if (isNaN(index)) {
        this.drawText(this._enemy.name(), 110, yy - 2, 260, "left");
      } else {
        var baseTexture = this.getEnemyBaseTexture();
        if (!baseTexture) {
          return;
        }
        var pw = 96 * 2;
        var xx = ConfigManager.en ? 192 : 0;
        var texture = new PIXI.Texture(
          baseTexture,
          new PIXI.Rectangle(xx, 48 * index, pw, 48)
        );
        var sprite_1 = new PIXI.Sprite(texture);
        sprite_1.x = 130;
        sprite_1.y = 5;
        this._windowContentsSprite.addChild(sprite_1);
      }
      /*
            this.drawNumber(Math.floor(this._enemy.hp), xxx, yy, 60, 'right', 1);
            this.drawText('/', xxx, yy - 4, 60, 'right');
            this.drawNumber(this._enemy.mhp, xxx + 80, yy, 60, 'right', 1);
            */
      this.contents.fontSize = 32;
      var sprite = new Sprite_GaugeEnemyHp2();
      sprite.setup(this._enemy, "hp");
      sprite.move(x - 107, 56);
      sprite.show();
      this._hpGauge2 = sprite;
      this.addChild(this._hpGauge2);
    };
    Window_RogueUi.prototype.drawHp = function (x) {
      if (this._hpGauge) {
        this.removeChild(this._hpGauge);
        this._hpGauge.destroy();
      }
      this._lastHp = this.actor().hp;
      var actor = this.actor();
      this.contents.fontSize = 32;
      var yy = 4;
      //this.drawText('HP', x, 20, 100, 'left');
      var xxx = x + 410;
      this.drawNumber(Math.floor(actor.hp), xxx, yy, 60, "right", 1);
      this.contents.fontSize = 22;
      //this.drawText('/', xxx + 50, yy - 0, 60, 'left');
      this.drawNumber("%" + actor.mhp, xxx + 60, yy - 4, 60, "left", 2);
      //this.drawNumber(actor.mhp, xxx + 80, yy, 60, 'right', 1);
      var sprite = new Sprite_GaugeActorHp();
      sprite.setup(actor, "hp");
      sprite.move(x + 7, 56);
      sprite.show();
      this._hpGauge = sprite;
      this.addChild(this._hpGauge);
    };
    Window_RogueUi.prototype.drawMp = function (x) {
      this._lastMp = this.actor().mp;
      var actor = this.actor();
      this.contents.fontSize = 32;
      var y = 70;
      this.drawNumber(Math.floor(actor.mp), x + 80, y, 60, "right", 2);
      this.drawText("/", x + 89, y - 1, 60, "right");
      this.drawNumber(actor.mmp, x + 134, y, 60, "right", 2);
      var sprite = new Sprite_GaugeMp();
      sprite.setup(actor, "mp");
      sprite.move(x + 108, y + 53);
      sprite.show();
      this._mpGauge = sprite;
      this.addChild(this._mpGauge);
    };
    Window_RogueUi.prototype.drawGold = function (x) {
      this._lastGold = $gameParty.gold();
      var y = 5;
      this.drawNumber(this._lastGold, x + 108, y, 60, "right", 1);
    };
    return Window_RogueUi;
  })(Window_Base);
  Nore.Window_RogueUi = Window_RogueUi;
  var GoldPlusEffect = /** @class */ (function (_super) {
    __extends(GoldPlusEffect, _super);
    function GoldPlusEffect(gold) {
      var _this = _super.call(this) || this;
      _this._wait = 0;
      _this._gold = gold;
      _this.bitmap = new Bitmap(120, 60);
      _this.refresh();
      return _this;
    }
    GoldPlusEffect.prototype.update = function () {
      _super.prototype.update.call(this);
      this._wait++;
      if (this._wait > 45) {
        this.visible = false;
      }
    };
    GoldPlusEffect.prototype.refresh = function () {
      AudioManager.playSe({ name: "Coin", volume: 80, pitch: 100, pan: 0 });
      this.bitmap.clear();
      this.bitmap.fontSize = 28;
      this.bitmap.drawText("+" + this._gold, 0, 0, 100, 40, "left");
    };
    return GoldPlusEffect;
  })(Sprite);
  Nore.GoldPlusEffect = GoldPlusEffect;
  var TutoArrow = /** @class */ (function (_super) {
    __extends(TutoArrow, _super);
    function TutoArrow(x, y) {
      var _this = _super.call(this) || this;
      _this.x = x;
      _this.y = y;
      _this._startX = x;
      _this._xDist = 20;
      _this._targetX = x + _this._xDist;
      _this._tutoSprite = _this.drawLabel(10, 160, 10);
      _this._duration = 28;
      _this._wholeDuration = _this._duration;
      return _this;
    }
    TutoArrow.prototype.drawLabel = function (type, x, y) {
      var baseTexture = Nore.getBaseTexture();
      if (!baseTexture) {
        return;
      }
      var pw = 96;
      var texture = new PIXI.Texture(baseTexture);
      texture.frame = new PIXI.Rectangle(96 * type, 0, pw, 48);
      var sprite = new PIXI.Sprite(texture);
      sprite.x = x;
      sprite.y = y;
      this.addChild(sprite);
      return sprite;
    };
    TutoArrow.prototype.update = function () {
      _super.prototype.update.call(this);
      this.updateMove();
    };
    TutoArrow.prototype.updateMove = function () {
      if (this._duration > 0) {
        this.x = this.applyEasing(this.x, this._targetX);
        this._duration--;
      }
      if (this._duration == 0) {
        if (this._toLeft) {
          this._toLeft = false;
          this._targetX = this._startX + this._xDist;
        } else {
          this._toLeft = true;
          this._targetX = this._startX;
        }
        this._duration = this._wholeDuration;
      }
    };
    TutoArrow.prototype.applyEasing = function (current, target) {
      var d = this._duration;
      var wd = this._wholeDuration;
      var lt = this.calcEasing((wd - d) / wd);
      var t = this.calcEasing((wd - d + 1) / wd);
      var start = (current - target * lt) / (1 - lt);
      return start + (target - start) * t;
    };
    TutoArrow.prototype.calcEasing = function (t) {
      var exponent = 2;
      switch (3) {
        case 1: // Slow start
          return this.easeIn(t, exponent);
        case 2: // Slow end
          return this.easeOut(t, exponent);
        case 3: // Slow start and end
          return this.easeInOut(t, exponent);
        default:
          return t;
      }
    };
    TutoArrow.prototype.easeIn = function (t, exponent) {
      return Math.pow(t, exponent);
    };
    TutoArrow.prototype.easeOut = function (t, exponent) {
      return 1 - Math.pow(1 - t, exponent);
    };
    TutoArrow.prototype.easeInOut = function (t, exponent) {
      if (t < 0.5) {
        return this.easeIn(t * 2, exponent) / 2;
      } else {
        return this.easeOut(t * 2 - 1, exponent) / 2 + 0.5;
      }
    };
    return TutoArrow;
  })(Sprite_Clickable);
  Nore.TutoArrow = TutoArrow;
  var _Scene_Message_update = Scene_Message.prototype.update;
  Scene_Message.prototype.update = function () {
    if (
      Input.isTriggered("cancel") ||
      Input.isTriggered("ok") ||
      TouchInput.isTriggered()
    ) {
      if (!$gameTemp.isMessageVisible()) {
        $gameTemp.changeMessageVisible();
        Input.clear();
        return;
      }
    }
    _Scene_Message_update.call(this);
    if (Input.isTriggered("pageup")) {
      $gameTemp.changeMessageVisible();
    }
  };
})(Nore || (Nore = {}));
