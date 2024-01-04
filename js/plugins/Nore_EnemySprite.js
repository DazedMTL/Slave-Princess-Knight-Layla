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
  // 敵
  var BACK_Y = 490;
  var FRONT_Y = 550;
  var HP_Y = 440;
  var BACK_SCALE = 0.75;
  var BACK_OPACITY = 150;
  var FORMATION_CHANGE_DURATION = 60;
  var REMAIN_TOP_MAX = 230;
  var Sprite_Enemy2 = /** @class */ (function (_super) {
    __extends(Sprite_Enemy2, _super);
    function Sprite_Enemy2(enemy, infoLayer) {
      var _this = _super.call(this, enemy) || this;
      _this._shakeX = 0;
      _this._shakeY = 0;
      _this._lastW = 0;
      _this._formationChangeIndex = 0;
      _this._infoLayer = infoLayer;
      _this._hp = new Sprite_Hp(enemy);
      _this._infoLayer.addChild(_this._hp);
      _this.createBuffIcons(enemy);
      _this._hp.refresh();
      _this._target = new Sprite_EnemyTarget(enemy);
      _this._info = new Nore.Window_EnemyInfo(enemy);
      _this._remain = new Sprite_Remain(enemy);
      _this._infoLayer.addChild(_this._remain);
      _this._infoLayer.addChild(_this._target);
      _this.createColorFilter();
      _this.updateTarget();
      _this.y = _this._targetY;
      var r = _this._targetY / (TMPlugin.BattlerEx.BaseY * 2) + 0.5;
      _this._baseScale = new Point(r, r);
      _this._breathMax = Math.randomInt(90) + 90;
      _this._breathCount = Math.randomInt(_this._breathMax);
      return _this;
    }
    Sprite_Enemy2.prototype.createBuffIcons = function (enemy) {
      this._buffIcons = new Nore.Sprite_BuffIcon();
      this._buffIcons.setup(enemy);
      this._buffIcons.x = enemy.screenX() - 105;
      this._buffIcons.y = 490;
      this._buffIcons.show();
      this._infoLayer.addChild(this._buffIcons);
    };
    Sprite_Enemy2.prototype.prepareZOrder = function () {
      this._infoLayer.addChild(this._info);
    };
    /*updateBossCollapse() {
            this._shake = (this._effectDuration % 2) * 4 - 2;
             this.opacity *= this._effectDuration / (this._effectDuration + 1);
        }*/
    Sprite_Enemy2.prototype.updateScaleEx = function () {
      if ($gameSwitches.value(55)) {
        return;
      }
      if (!this._enemy.canMove()) return;
      this._breathCount++;
      if (this._breathCount >= this._breathMax) {
        this._breathMax = Math.randomInt(90) + 90;
        this._breathCount = 0;
      }
      var scaleX = 1;
      var scaleY = 1;
      if (!this._enemy.isFront()) {
        scaleX = scaleY = BACK_SCALE;
      }
      var bh = +(
        this._enemy.enemy().meta.breathH || TMPlugin.BattlerEx.BreathH
      );
      scaleY +=
        Math.sin((Math.PI * this._breathCount) / (this._breathMax / 2)) * bh;
      this.scale.set(scaleX, scaleY);
    };
    Sprite_Enemy2.prototype.createColorFilter = function () {
      this._colorFilter = new ColorFilter();
      if (!this.filters) {
        this.filters = [];
      }
      this.filters.push(this._colorFilter);
    };
    Sprite_Enemy2.prototype.createStateIconSprite = function () {};
    Sprite_Enemy2.prototype.setBattler = function (battler) {
      Sprite_Battler.prototype.setBattler.call(this, battler);
      this._enemy = battler;
      this.setHome(battler.screenX(), battler.screenY() + 40);
    };
    Sprite_Enemy2.prototype.updateStateSprite = function () {};
    Sprite_Enemy2.prototype.update = function () {
      if (this._lastW == 0) {
        if (this.width > 0) {
          this._lastW = this.width;
          this._hp.setEnemyWidth(this.width);
          this._remain.setEnemyHeight(this.height);
        }
      }
      if (this._enemy.isDead()) {
        this._shakeX = 0;
        this._shakeY = 0;
      }
      this.updateScale();
      _super.prototype.update.call(this);
      this.updateTarget();
      this.updatePosition();
      this.updateFormation();
      //this.updateDebug();
    };
    Sprite_Enemy2.prototype.updateDebug = function () {
      if (this._g) {
        this.removeChild(this._g);
      }
      var g = new PIXI.Graphics();
      g.beginFill(0x000, 0.2);
      var r = this.hitRect();
      g.drawRect(r.x, r.y, r.width, r.height);
      g.endFill();
      this.addChild(g);
      // g.x -= this.bitmap.width / 2
      // g.y -= this.bitmap.height
      this._g = g;
    };
    Sprite_Enemy2.prototype.updateFormation = function () {
      if (this._formationChangeIndex > 0) {
        if (!this._toFront) {
          this._front = false;
          this._enemy.setBack();
          this._formationChangeIndex--;
          var rate =
            (FORMATION_CHANGE_DURATION - this._formationChangeIndex) /
            FORMATION_CHANGE_DURATION;
          this.y = this._targetY =
            (FRONT_Y - BACK_Y) * (1 - rate) + BACK_Y + this.yOffset();
          this._blendColor2 = [
            0,
            0,
            0,
            BACK_OPACITY - BACK_OPACITY * (1 - rate),
          ];
          this._colorFilter.setBlendColor(this._blendColor2);
          this.scale.x = this.scale.y =
            (1 - BACK_SCALE) * (1 - rate) + BACK_SCALE;
        } else {
          this._front = true;
          this._enemy.setFront();
          this._formationChangeIndex--;
          var rate =
            (FORMATION_CHANGE_DURATION - this._formationChangeIndex) /
            FORMATION_CHANGE_DURATION;
          this.y = this._targetY =
            (FRONT_Y - BACK_Y) * rate + BACK_Y + this.yOffset();
          this._blendColor2 = [0, 0, 0, BACK_OPACITY - BACK_OPACITY * rate];
          this._colorFilter.setBlendColor(this._blendColor2);
          this.scale.x = this.scale.y = (1 - BACK_SCALE) * rate + BACK_SCALE;
        }
        return;
      }
      if (this._enemy.isToFront() || this._enemy.isToBack()) {
        if (this._enemy.isToFront()) {
          this._toFront = true;
        } else {
          this._toFront = false;
        }
        this._formationChangeIndex = FORMATION_CHANGE_DURATION;
      }
    };
    Sprite_Enemy2.prototype.yOffset = function () {
      if (this._enemy.enemy().meta["y"]) {
        return Math.trunc(this._enemy.enemy().meta["y"]);
      }
      return 0;
    };
    Sprite_Enemy2.prototype.updateTarget = function () {
      if (this._formationChangeIndex > 0) {
        return;
      }
      if (this._front === this._enemy.isFront()) {
        return;
      }
      this._front = this._enemy.isFront();
      if (this._front) {
        this._targetY = FRONT_Y + this.yOffset();
        this._blendColor2 = [0, 0, 0, 0];
        this._colorFilter.setBlendColor(this._blendColor2);
      } else {
        this._targetY = BACK_Y + this.yOffset();
        this._blendColor2 = [0, 0, 0, BACK_OPACITY];
        this._colorFilter.setBlendColor(this._blendColor2);
      }
    };
    Sprite_Enemy2.prototype.updatePosition = function () {
      if (this._effectType == "bossCollapse") {
        _super.prototype.updatePosition.call(this);
        return;
      }
      if (this._formationChangeIndex > 0) {
        return;
      }
      this.x = this._homeX + this._offsetX + this._shakeX;
      if (this._shakeX === 0) {
        if (this._enemy.isToFront()) {
          if (this._targetY > this.y) {
            this.y++;
          }
        } else {
          this.y = this._targetY;
        }
      } else {
        this.y = this._targetY + this._shakeY;
      }
    };
    Sprite_Enemy2.prototype.updateTone = function () {
      if (this._effectDuration > 0) {
        if (this._effectType == "bossCollapse") {
          return;
        }
      }
      if (this._effectType != "whiten" || this._effectDuration == 0) {
        if (!this._enemy.canMove()) {
          this.setBlendColor([0, 0, 0, 128]);
        } else if (this._effectDuration == 0) {
          this.setBlendColor(this._blendColor2);
        }
      }
    };
    Sprite_Enemy2.prototype.updateScale = function () {
      if (this._formationChangeIndex > 0) {
        return;
      }
      if (!this._front) {
        this.scale.x = this.scale.y = BACK_SCALE;
        if (!this.isEffecting() && this._effectDuration == 0) {
          this.setBlendColor([0, 0, 0, BACK_OPACITY]);
        }
      } else {
      }
    };
    Sprite_Enemy2.prototype.enemy = function () {
      return this._enemy;
    };
    Sprite_Enemy2.prototype.targetSprite = function () {
      return this._target;
    };
    Sprite_Enemy2.prototype.deactivate = function () {
      Window_Scrollable.prototype.deactivate.call(this);
    };
    Sprite_Enemy2.prototype.updateSelectionEffect = function () {
      var target = this.mainSprite();
      if (this._battler.isSelected()) {
        this._selectionEffectCount++;
        if (this._selectionEffectCount % 30 < 15) {
          if (this._front) {
            target.setBlendColor([255, 255, 255, 64]);
          } else {
            target.setBlendColor([55, 55, 55, 64]);
          }
        } else {
          if (this._front) {
            target.setBlendColor([0, 0, 0, 0]);
          } else {
            target.setBlendColor([0, 0, 0, BACK_OPACITY]);
          }
        }
      } else if (this._selectionEffectCount > 0) {
        this._selectionEffectCount = 0;
        if (this._front) {
          target.setBlendColor([0, 0, 0, 0]);
        } else {
          target.setBlendColor([0, 0, 0, BACK_OPACITY]);
        }
      }
    };
    Sprite_Enemy2.prototype.hitTest = function (x, y) {
      var rect = new Rectangle(
        -this.anchor.x * this.width,
        -this.anchor.y * this.height,
        this.width,
        this.height
      );
      return this.hitRect().contains(x, y);
    };
    Sprite_Enemy2.prototype.hitRect = function () {
      var minW = 220;
      var maxW = 240;
      var minH = 500;
      var maxH = 600;
      var w = Math.max(Math.min(minW, this.width), maxW);
      var h = Math.max(Math.min(minH, this.height), maxH);
      var rect = new Rectangle(-this.anchor.x * w, -this.anchor.y * h, w, h);
      return rect;
    };
    return Sprite_Enemy2;
  })(Sprite_Enemy);
  Sprite_Clickable.prototype.lineHeight = function () {
    return 24;
  };
  var REMAIN_MARGIN_LEFT = 8;
  var REMAIN_MARGIN_TOP = 8;
  var Sprite_Remain = /** @class */ (function (_super) {
    __extends(Sprite_Remain, _super);
    function Sprite_Remain(enemy) {
      var _this = _super.call(this) || this;
      _this._lastStates = [];
      _this._lastTargetStates = [];
      _this._lastBuffs = [];
      _this.bitmap = new Bitmap(200, 240);
      _this._enemy = enemy;
      _this.update();
      _this._enemyHeight = 0;
      _this.updatePosition();
      return _this;
    }
    Sprite_Remain.prototype.update = function () {
      _super.prototype.update.call(this);
      this.updateRemainOne();
      if (this.isChanged()) {
        this.refresh();
      }
    };
    Sprite_Remain.prototype.updateRemainOne = function () {
      if (!this._remainOneSprite) {
        return;
      }
      if (this._reverseOpacity) {
        this._remainOneSprite.alpha += 0.05;
        if (this._remainOneSprite.alpha >= 1) {
          this._reverseOpacity = false;
        }
      } else {
        this._remainOneSprite.alpha -= 0.05;
        if (this._remainOneSprite.alpha <= 0) {
          this._reverseOpacity = true;
        }
      }
    };
    Sprite_Remain.prototype.saveParameters = function () {
      this._lastStates = this._enemy.states().concat();
      this._lastBuffs = this._enemy.buffs().concat();
      var action = this._enemy.currentAction();
      if (!action) {
        this._lastTargetStates = [];
        return;
      }
      var targets = action.makeTargets();
      if (targets && targets.length > 0) {
        this._lastTargetStates = targets[0].states().concat();
      } else {
        this._lastTargetStates = [];
      }
    };
    Sprite_Remain.prototype.isChanged = function () {
      var action = this._enemy.currentAction();
      if (this._lastAction != action) {
        return true;
      } else if (action && this._lastTurn != action.remainTurn()) {
        return true;
      }
      var states = this._enemy.states();
      if (states.length != this._lastStates.length) {
        return true;
      }
      for (var _i = 0, states_1 = states; _i < states_1.length; _i++) {
        var s = states_1[_i];
        if (!this._lastStates.contains(s)) {
          return true;
        }
      }
      var buffs = this._enemy.buffs();
      for (var i = 0; i < buffs.length; i++) {
        if (buffs[i] != this._lastBuffs[i]) {
          return true;
        }
      }
      if (action) {
        var targets = action.makeTargets();
        if (targets && targets.length > 0) {
          if (targets[0].states().length != this._lastTargetStates.length) {
            return true;
          }
        } else {
        }
      }
      return false;
    };
    Sprite_Remain.prototype.updatePosition = function () {
      this.x = this._enemy.screenX() - 100;
      //this.y = this._enemy.screenY() - this._enemyHeight - 50;
      this.y = 230;
      if (this._enemy.isBack()) {
        this.y = 200;
      }
      /*if (this.y < REMAIN_TOP_MAX) {
                this.y = REMAIN_TOP_MAX;
            }*/
    };
    Sprite_Remain.prototype.refresh = function () {
      this.saveParameters();
      this.removeChildren();
      this.bitmap.clear();
      var action = this._enemy.currentAction();
      this._lastAction = action;
      if (!this.isValid()) {
        return false;
      }
      this._lastTurn = action.remainTurn();
      this.drawBg();
      this.updatePaintOpacity();
      this.drawRemain(action);
      this.drawDamage(action);
    };
    Sprite_Remain.prototype.drawBg = function () {
      this.bitmap.paintOpacity = 255;
      this.bitmap.fillRect(0, 0, 218, 50, "#00000096");
    };
    Sprite_Remain.prototype.updatePaintOpacity = function () {
      var opacity = 256;
      if (this._lastTurn > 1) {
        opacity = 108;
      }
      this.bitmap.paintOpacity = opacity;
      this.paintOpacity = opacity;
    };
    Sprite_Remain.prototype.isValid = function () {
      if (!this._lastAction) {
        this._lastTurn = 0;
        return false;
      }
      var action = this._lastAction;
      if (!action.item()) {
        console.error(this._enemy.name());
      }
      if (action.item().meta["noDisplay"]) {
        return false;
      }
      return true;
    };
    Sprite_Remain.prototype.drawRemain = function (action) {
      var baseTexture2 = Nore.getSystemBaseTexture("Battle");
      var baseY = ConfigManager.language == "jp" ? 96 : 96 + 32 * 4;
      var rect = new Rectangle(0, baseY + (this._lastTurn - 1) * 32, 78, 32);
      var texture = new PIXI.Texture(baseTexture2, rect);
      var sprite = new PIXI.Sprite(texture);
      sprite.x = 100 + REMAIN_MARGIN_LEFT;
      sprite.y = REMAIN_MARGIN_TOP;
      this.addChild(sprite);
      this.drawRemainOne();
    };
    Sprite_Remain.prototype.drawRemainOne = function () {
      this._remainOneSprite = null;
      if (this._lastTurn != 1) {
        return;
      }
      var baseTexture2 = Nore.getSystemBaseTexture("Battle");
      var rect2 = new Rectangle(90, 96, 78, 32);
      var texture2 = new PIXI.Texture(baseTexture2, rect2);
      var sprite2 = new PIXI.Sprite(texture2);
      sprite2.x = 145 + REMAIN_MARGIN_LEFT;
      sprite2.y = REMAIN_MARGIN_TOP;
      this._remainOneSprite = sprite2;
      this.addChild(sprite2);
      this._reverseOpacity = false;
    };
    Sprite_Remain.prototype.drawDamage = function (action) {
      var iconIndex;
      if (action.isNormalAttack()) {
        iconIndex = 2608;
      } else if (action.isPhysical()) {
        iconIndex = 2210;
      } else if (action.isMagical()) {
        iconIndex = 2211;
        //iconIndex = 2225;
      } else {
        if (action.isRecover()) {
          iconIndex = 392;
        } else {
          iconIndex = 407;
        }
      }
      if (action.isBuff()) {
        iconIndex = 115;
      }
      if (action.isDebuff()) {
        iconIndex = 1151;
      }
      var xx = REMAIN_MARGIN_LEFT;
      this.drawIcon(iconIndex, xx, REMAIN_MARGIN_TOP);
      xx += 11;
      if (action.isDamage()) {
        this.bitmap.fontSize = 23;
        this.bitmap.textColor = ColorManager.deathColor();
        var damage = action.makeDamageValue($gameActors.actor(100), false);
        if (action.stunBonusRate() > 1) {
          var targets = action.makeTargets();
          if (targets[0] && targets[0].hasState(Nore.STUN_STATE_ID)) {
            damage *= action.stunBonusRate();
          }
        }
        if (action.isAlwaysMiss()) {
          damage = 0;
        }
        this.drawNumber(
          damage,
          xx + 17,
          -10 + REMAIN_MARGIN_TOP,
          50,
          "right",
          13
        );
        //this.bitmap.drawText(damage + '', xx + 2, 8, 50, 20, 'right');
        var repeat = this.calcRepeat(action);
        if (repeat > 1) {
          this.bitmap.fontSize = 18;
          this.bitmap.drawText(
            TextManager.repeats.format(repeat),
            xx + 64,
            9 + REMAIN_MARGIN_TOP,
            50,
            20,
            "left"
          );
        }
      }
    };
    Sprite_Remain.prototype.calcRepeat = function (action) {
      var nn = action.makeTargets().length;
      return 1 * nn;
    };
    Sprite_Remain.prototype.setEnemyHeight = function (h) {
      this._enemyHeight = h;
      this.updatePosition();
    };
    return Sprite_Remain;
  })(Sprite_Clickable);
  var Sprite_Hp = /** @class */ (function (_super) {
    __extends(Sprite_Hp, _super);
    function Sprite_Hp(enemy) {
      var _this = _super.call(this) || this;
      _this.y = HP_Y;
      _this.bitmap = new Bitmap(210, 160);
      _this._enemy = enemy;
      return _this;
      //this._attackSprite = new Sprite_Attack(enemy);
    }
    Sprite_Hp.prototype.update = function () {
      _super.prototype.update.call(this);
      if (!this._enemy) {
        return;
      }
      if (!this._initialized) {
        this._initialized = true;
        this.refresh();
        return;
      }
      if (this._enemy.isBack()) {
        this.y = HP_Y - 60;
      } else {
        this.y = HP_Y;
      }
      if (!this._enemy.isDirty() && !this._enemy.isForecastDirty()) {
        return;
      }
      this._enemy.clearDirty();
      this._enemy.clearForecastDirty();
      this.refresh();
    };
    Sprite_Hp.prototype.setEnemyWidth = function (w) {
      //p(this._enemy.screenX() + ' ' + w)
      this.x = this._enemy.screenX() - 105;
      if (this._enemy.isBack()) {
        this.y = 400;
      } else {
        this.y = 440;
      }
    };
    Sprite_Hp.prototype.refresh = function () {
      this.bitmap.clear();
      this.bitmap.fontSize = 22;
      //this.removeChild(this._attackSprite);
      this.destroyAndRemoveChildren();
      //this.addChild(this._attackSprite);
      if (this._enemy.isDead()) {
        return;
      }
      if (this._enemy.isHidden()) {
        return;
      }
      this._lastHp = this._enemy.hp;
      this.drawBg();
      this.drawHp();
      this.drawStun();
      this.drawAction();
      this.drawStateIcons();
    };
    Sprite_Hp.prototype.drawBg = function () {
      //if (this._enemy.maxStun() <= 0) {
      //    this.bitmap.fillRect(0, 90, 228, 34, '#00000096');
      //} else {
      this.bitmap.fillRect(0, 90, 228, 68, "#00000096");
      //}
    };
    Sprite_Hp.prototype.getLabel = function (index) {
      var baseTexture2 = Nore.getSystemBaseTexture("Battle");
      var rect = new Rectangle(48 * 2, 24 * index, 48, 24);
      var texture = new PIXI.Texture(baseTexture2, rect);
      var sprite = new PIXI.Sprite(texture);
      //sprite.x = -2;
      //sprite.y = 7;
      return sprite;
    };
    Sprite_Hp.prototype.drawHp = function () {
      var yy = 90;
      this.bitmap.textColor = ColorManager.systemColor();
      var label = this.getLabel(1);
      label.y = yy + 10;
      label.x = 3;
      this.addChild(label);
      //this.bitmap.drawText('HP', 0, yy, 100, 40, 'left');
      var h = 12;
      var w = 110;
      var xx = 45;
      this.bitmap.fillRect(xx, yy + 16, w, h, ColorManager.textColor(15));
      this.bitmap.fillRect(
        xx + 1,
        yy + 16,
        (w - 2) * this._enemy.hpRate(),
        h - 2,
        ColorManager.textColor(2)
      );
      this.drawNumber(this._enemy.hp, 110, yy - 13, 100, "right", 11);
    };
    Sprite_Hp.prototype.drawStun = function () {
      if (this._enemy.maxStun() <= 0) {
        return;
      }
      var yy = 113;
      //const label = this.getLabel(3);
      //label.y = yy + 10;
      //this.addChild(label);
      var xx = 2;
      if (this._enemy.maxStun() - this._enemy.stun() <= 0) {
        this.bitmap.textColor = ColorManager.crisisColor();
        this.bitmap.fontSize = 28;
        var baseTexture2 = Nore.getSystemBaseTexture("Battle");
        var rect = new Rectangle(90, 130, 130, 55);
        var texture = new PIXI.Texture(baseTexture2, rect);
        var sprite = new PIXI.Sprite(texture);
        this.addChild(sprite);
        sprite.x = xx + 40;
        sprite.y = -10;
        //this.bitmap.drawText('BREAK!', xx + 52, 7, 120, 40, 'left');
      } else {
        var iconIndex = 162;
        if (this._enemy.hasStateMeta(StateMeta.longBreak)) {
          iconIndex++;
        }
        this.drawIcon(iconIndex, xx, yy + 7);
        var num = this._enemy.maxStun() - this._enemy.stun();
        var offset = 0;
        if (num >= 10) {
          offset = -8;
        }
        this.drawNumber(num, xx + 7 + offset, yy - 9, 100, "left", 2);
      }
    };
    Sprite_Hp.prototype.drawAttack = function () {
      this.bitmap.fontSize = 12;
      var atk = this._enemy.atk;
      this.drawIcon(416, 120, 90);
      this.bitmap.drawText(atk + "", 120, 95, 50, 20, "right");
    };
    Sprite_Hp.prototype.drawAction = function () {
      this.bitmap.fontSize = 12;
      this.bitmap.textColor = ColorManager.normalColor();
      var action = this._enemy.currentAction();
      if (!action || !action.isValid()) {
        return;
      }
      return;
      var iconIndex;
      if (action.isPhysical()) {
        iconIndex = 2210;
        //iconIndex = 2224;
      } else if (action.isMagical()) {
        iconIndex = 2211;
        //iconIndex = 2225;
      } else {
        iconIndex = 407;
      }
      this.drawIcon(iconIndex, 120, 89);
      if (action.isDamage()) {
        var damage = action.makeDamageValue($gameActors.actor(100), false);
        this.bitmap.drawText(damage + "", 147, 95, 50, 20, "left");
      }
    };
    Sprite_Hp.prototype.stunRate = function () {
      if (this._enemy.maxStun() >= 200) {
        return 0.45;
      }
      return 2;
    };
    Sprite_Hp.prototype.drawStateIcons = function () {
      this.bitmap.fontSize = 12;
      var yy = 90;
      var iconY = 120;
      var xx = 50;
      var interval = 27;
      for (var _i = 0, _a = this._enemy.states(); _i < _a.length; _i++) {
        var s = _a[_i];
        this.drawStateIcon(s, xx, yy, iconY);
        xx += interval;
      }
      /*
            for (let i = 0; i < this._enemy._buffs.length; i++) {
               
                let b = this._enemy._buffs[i];
                if (b == 0) {
                    continue;
                }
                const icon = $stateManager.getBuffIcon(i, b);
                this.drawIconMini(icon, xx, iconY);

                this.drawNum(Math.abs(b) + '', xx, yy);

                xx += interval;
            }*/
    };
    Sprite_Hp.prototype.drawStateIcon = function (s, x, y, iconY) {
      if (s.meta["noDisplay"]) {
        return;
      }
      this.drawIconMini(s.iconIndex, x, iconY);
      //this.drawStateTurn(s, xx, yy)
      var turns = this._enemy.getStateTurn(s.id);
      if (s.meta["passive"]) {
        //text = 'P'
        turns = "";
        if (s.meta["stateValue"]) {
          turns = s.meta["stateValue"];
        } else if (s.meta[StateMeta.BAKUSAI]) {
          turns = this._enemy.maxStun() - this._enemy.stun();
        } else if (s.meta[StateMeta.COUNT_DOWN]) {
          turns = $gameVariables.value(57);
        } else if (s.meta[StateMeta.fireBenefit]) {
          turns = this._enemy.fireBenefitRemain();
        } else {
          if (this._enemy._stateTurns[s.id] > 0) {
            turns = this._enemy._stateTurns[s.id];
          }
        }
      } else if (turns == 0) {
        return;
      }
      this.drawNum(turns, x, y);
    };
    Sprite_Hp.prototype.drawNum = function (str, x, y) {
      this.bitmap.drawText(str, x - 20, y + 41, 40, 40, "right");
    };
    return Sprite_Hp;
  })(Sprite_Clickable);
  var Spriteset_Battle2 = /** @class */ (function (_super) {
    __extends(Spriteset_Battle2, _super);
    function Spriteset_Battle2() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Spriteset_Battle2.prototype.createEnemies = function () {
      this._arrowSprite = new Sprite_TargetArrow();
      this._uiContainer.addChild(this._arrowSprite);
      this._infoLayer = new Sprite();
      var enemies = $gameTroop.members();
      var sprites = [];
      for (var _i = 0, enemies_1 = enemies; _i < enemies_1.length; _i++) {
        var enemy = enemies_1[_i];
        sprites.push(new Sprite_Enemy2(enemy, this._infoLayer));
      }
      sprites.sort(this.compareEnemySprite.bind(this));
      for (var _a = 0, sprites_1 = sprites; _a < sprites_1.length; _a++) {
        var sprite = sprites_1[_a];
        sprite.prepareZOrder();
        this._uiContainer.addChild(sprite);
      }
      this._enemySprites = sprites;
      this._uiContainer.addChild(this._infoLayer);
      this._arrowSprite.setEnemySprites(this._enemySprites);
    };
    Spriteset_Battle2.prototype.findEnemySprite = function (enemy) {
      for (var _i = 0, _a = this._enemySprites; _i < _a.length; _i++) {
        var s = _a[_i];
        if (s.enemy() == enemy) {
          return s;
        }
      }
      console.error("enemy not found");
    };
    Spriteset_Battle2.prototype.createActors = function () {
      _super.prototype.createActors.call(this);
    };
    return Spriteset_Battle2;
  })(Spriteset_Battle);
  Nore.Spriteset_Battle2 = Spriteset_Battle2;
  Scene_Battle.prototype.createSpriteset = function () {
    this._spriteset = new Spriteset_Battle2();
    this.addChild(this._spriteset);
  };
  var ENEMY_TARGET_TOP = 50;
  var Sprite_EnemyTarget = /** @class */ (function (_super) {
    __extends(Sprite_EnemyTarget, _super);
    function Sprite_EnemyTarget(enemy) {
      var _this = _super.call(this) || this;
      _this._enemy = enemy;
      _this.y = 300 - ENEMY_TARGET_TOP;
      _this.x = enemy.screenX() - 100;
      _this.bitmap = new Bitmap(220, 400);
      _this._labelX = 10;
      _this._valueX = 50;
      _this._valueW = 120;
      _this._lineH = 34;
      return _this;
    }
    Sprite_EnemyTarget.prototype.update = function () {
      _super.prototype.update.call(this);
      if (!this._enemy) {
        return;
      }
      if ($gameTemp.inInfo) {
        this.visible = false;
        return;
      }
      this.visible = this._enemy.isSelected();
    };
    Sprite_EnemyTarget.prototype.showForcast = function (actor, action) {
      this.bitmap.textColor = ColorManager.normalColor();
      if (!this.canAttack(actor, action)) {
        this.drawCantAttack();
        return;
      }
      if (action.isAlwaysMiss(this._enemy)) {
        this.drawAlwaysMiss();
        return;
      }
      this.bitmap.clear();
      this.bitmap.fillRect(0, ENEMY_TARGET_TOP, 175, 500, "#000000D5");
      if (this.isStunDamageBonusActor3(actor, action)) {
        this.drawStunBonus3();
      }
      this.drawDamage(actor, action);
      var yy = 42 + ENEMY_TARGET_TOP;
      //this.drawHit(actor, action, yy);
      this.resetFontSize();
      if (this.drawDeath(actor, action, yy)) {
        yy += this._lineH;
      }
      if (this.drawStun(actor, action, yy)) {
        yy += this._lineH;
      }
      if (this.drawCritical(actor, action, yy)) {
        yy += this._lineH;
      }
      if (this.drawRenkan(actor, action, yy)) {
        yy += this._lineH;
      }
      if (this.drawCancel(actor, action, yy)) {
        yy += this._lineH;
      }
      if (this.drawFirstStrike(actor, action, yy)) {
        yy += this._lineH;
      }
      if (this.drawHellFire(actor, action, yy)) {
        yy += this._lineH;
      }
      if (this.drawMadan(actor, action, yy)) {
        yy += this._lineH;
      }
      var effects = [];
      for (var _i = 0, _a = action.item().effects; _i < _a.length; _i++) {
        var e = _a[_i];
        effects.push(new BattleEffect(e, action.item()));
      }
      effects = effects.concat(actor.equipEffects());
      for (var _b = 0, effects_1 = effects; _b < effects_1.length; _b++) {
        var e = effects_1[_b];
        switch (e.code()) {
          case 21:
            if (e.dataId() > 0) {
              this.drawState(actor, action, yy, e);
              yy += this._lineH;
            }
            break;
          case 32:
            this.drawParamChange(actor, action, yy, e.effect());
            yy += this._lineH;
            break;
        }
      }
      yy += 14;
      this.bitmap.clearRect(0, yy, 175, 500);
    };
    Sprite_EnemyTarget.prototype.drawAlwaysMiss = function () {
      this.bitmap.clear();
      this.bitmap.fillRect(0, ENEMY_TARGET_TOP, 175, 1 * 38 + 40, "#000000C5");
      this.bitmap.drawText(
        TextManager.alwaysMiss,
        0,
        4 + ENEMY_TARGET_TOP,
        100,
        40,
        "right"
      );
    };
    Sprite_EnemyTarget.prototype.drawCantAttack = function () {
      this.bitmap.clear();
      this.bitmap.fillRect(0, ENEMY_TARGET_TOP, 175, 1 * 38 + 40, "#000000C5");
      this.bitmap.drawText(
        TextManager.cantAttack,
        0,
        4 + ENEMY_TARGET_TOP,
        100,
        40,
        "right"
      );
    };
    Sprite_EnemyTarget.prototype.isStunDamageBonusActor3 = function (
      actor,
      action
    ) {
      if (!this._enemy.hasState(StateId.STUN)) {
        return false;
      }
      return $gameParty.hasSkillMeta(SkillMeta.breakDamage);
    };
    Sprite_EnemyTarget.prototype.drawStunBonus3 = function () {
      this.bitmap.textColor = ColorManager.passiveColor();
      this.bitmap.fillRect(0, 10, 110, 38 + 2, "#000000C5");
      this.bitmap.drawText(
        getItemName($dataSkills[1344]),
        0,
        10,
        100,
        40,
        "center"
      );
    };
    Sprite_EnemyTarget.prototype.canAttack = function (actor, action) {
      return this._enemy.canTarget(actor, action);
    };
    Sprite_EnemyTarget.prototype.lineCount = function (action) {
      var n = 2;
      for (var _i = 0, _a = action.item().effects; _i < _a.length; _i++) {
        var e = _a[_i];
        switch (e.code) {
          case 21:
            if (e.dataId > 0) {
              n++;
            }
            break;
          case 32:
            //n++
            break;
        }
      }
      return n;
    };
    Sprite_EnemyTarget.prototype.drawDamage = function (actor, action) {
      this.bitmap.fontSize = 30;
      this.changeNormalColor();
      var damage = 0;
      var min = 0;
      if (action.isDamage()) {
        damage = action.makeDamageValue(this._enemy, false);
        min = damage - action.variance(this._enemy, damage);
        damage *= action.numRepeats();
        min *= action.numRepeats();
      }
      var damageText = min + "-" + damage;
      if (damage == min) {
        damageText = damage + "";
      }
      this.bitmap.drawText(
        damageText,
        0,
        4 + ENEMY_TARGET_TOP,
        110,
        40,
        "right"
      );
      this.bitmap.fontSize = 11;
      this.bitmap.drawText(
        TextManager.damageText,
        113,
        10 + ENEMY_TARGET_TOP,
        100,
        40,
        "left"
      );
    };
    Sprite_EnemyTarget.prototype.changeNormalColor = function () {
      this.bitmap.textColor = ColorManager.normalColor();
    };
    Sprite_EnemyTarget.prototype.resetFontSize = function () {
      this.bitmap.fontSize = 20;
    };
    Sprite_EnemyTarget.prototype.drawRenkan = function (actor, action, yy) {
      if (!action.item().meta[StateMeta.renkan]) {
        return false;
      }
      var a = this._enemy.currentAction();
      if (!a) {
        return false;
      }
      if (a.remainTurn() <= 1) {
        this.bitmap.drawText(
          TextManager.noEffect,
          this._labelX,
          yy,
          this._valueW,
          40,
          "right"
        );
        return true;
      }
      this.bitmap.drawText(
        TextManager.damageRenkan,
        this._labelX,
        yy,
        this._valueW,
        40,
        "right"
      );
      return true;
    };
    Sprite_EnemyTarget.prototype.drawCancel = function (actor, action, yy) {
      if (!action.item().meta["cancel"]) {
        return false;
      }
      this.bitmap.drawText(
        TextManager.damageCancel,
        this._labelX,
        yy,
        this._valueW,
        40,
        "right"
      );
      return true;
    };
    Sprite_EnemyTarget.prototype.drawHellFire = function (actor, action, yy) {
      if (!action.item().meta[SkillMeta.hellFire]) {
        return false;
      }
      var n = Math.trunc(action.item().meta[SkillMeta.hellFire]);
      var rate = this._enemy.countHellFire() * n;
      this.bitmap.drawText(
        TextManager.damageHellFire.format(rate),
        this._labelX,
        yy,
        this._valueW,
        40,
        "left"
      );
      this.bitmap.drawText(
        "+" + rate + "%",
        this._valueX,
        yy,
        this._valueW,
        40,
        "right"
      );
      return true;
    };
    Sprite_EnemyTarget.prototype.drawFirstStrike = function (
      actor,
      action,
      yy
    ) {
      if (this._enemy.hpRate() != 1) {
        return false;
      }
      if (!actor.hasSkillMeta(SkillMeta.FIRST_STRIKE)) {
        return false;
      }
      this.bitmap.drawText(
        TextManager.firstStrike2,
        this._labelX,
        yy,
        this._valueW,
        40,
        "right"
      );
      return true;
    };
    Sprite_EnemyTarget.prototype.drawMadan = function (actor, action, yy) {
      if (!this._enemy.isStun()) {
        return false;
      }
      if (!action.item().meta["madan"]) {
        return false;
      }
      if (this._enemy.hasStateMeta(StateMeta.antiMadan)) {
        return false;
      }
      this.bitmap.drawText(
        TextManager.madanTarget,
        this._labelX,
        yy,
        this._valueW,
        40,
        "right"
      );
      return true;
    };
    Sprite_EnemyTarget.prototype.drawStun = function (actor, action, yy) {
      if (this._enemy.isStun()) {
        return false;
      }
      if (this._enemy.maxStun() == 0) {
        return false;
      }
      this.changeNormalColor();
      var damage = action.makeDamageValue(this._enemy, false);
      var stun = action.calcStun(this._enemy, damage);
      this._enemy.setStunForecast(stun);
      if (this._enemy.stunForecast() < this._enemy.maxStun()) {
        return false;
      }
      var name = "BREAK";
      //name = $dataStates[Nore.STUN_STATE_ID].name;
      this.bitmap.drawText(name, this._labelX, yy, this._valueW, 40, "left");
      var hitText = 100 + "%";
      if (this.isAlwaysHit(action)) {
        this.bitmap.textColor = ColorManager.crisisColor();
      }
      this.bitmap.drawText(
        hitText,
        this._valueX,
        yy,
        this._valueW,
        40,
        "right"
      );
      return true;
    };
    Sprite_EnemyTarget.prototype.drawCritical = function (actor, action, yy) {
      if (!action.isCriticalAvailable()) {
        return false;
      }
      this.bitmap.drawText("CRIT", this._labelX, yy, this._valueW, 40, "left");
      var rate = Math.round(actor.criRate() * 100);
      this.bitmap.drawText(
        rate + "%",
        this._valueX,
        yy,
        this._valueW,
        40,
        "right"
      );
      return true;
    };
    Sprite_EnemyTarget.prototype.drawDeath = function (actor, action, yy) {
      if (!action.isDamage()) {
        return false;
      }
      var damage = 0;
      var min = 0;
      if (action.isDamage()) {
        damage = action.makeDamageValue(this._enemy, false);
        min = damage - action.variance(this._enemy, damage);
        damage *= action.numRepeats();
        min *= action.numRepeats();
      }
      var hp = this._enemy.hp;
      if (damage < hp) {
        return false;
      }
      var isUndead = this.isUndeadInvoked(action);
      var text = getItemName($dataStates[1]);
      if (isUndead) {
        text = getItemName($dataStates[2]);
      }
      this.bitmap.textColor = ColorManager.deathColor();
      this.bitmap.drawText(text, this._labelX, yy, this._valueW, 40, "left");
      this.changeNormalColor();
      var hit = 0;
      if (min >= hp) {
        hit = 100;
      } else {
        var total = damage - min + 1;
        hit = Math.round(((total - (hp - min)) / total) * 100);
      }
      this.bitmap.drawText(
        hit + "%",
        this._valueX,
        yy,
        this._valueW,
        40,
        "right"
      );
      return true;
    };
    Sprite_EnemyTarget.prototype.isUndeadInvoked = function (action) {
      if (this._enemy.countStateMeta(StateMeta.UNDEAD) <= 0) {
        return false;
      }
      if (action.isHolyElement()) {
        return false;
      }
      return true;
    };
    Sprite_EnemyTarget.prototype.drawHit = function (actor, action, yy) {
      this.resetFontSize();
      this.changeNormalColor();
      this.bitmap.drawText(TextManager.hit, this._labelX, yy, 100, 40, "left");
      var hitText;
      if (this.isAlwaysHit(action)) {
        this.bitmap.textColor = ColorManager.crisisColor();
        hitText = TextManager.alwaysHit;
      } else {
        var hit = action.calcHit(this._enemy);
        hitText = hit + "%";
        if (hit >= 100) {
          this.bitmap.textColor = ColorManager.crisisColor();
        }
      }
      this.bitmap.drawText(
        hitText,
        this._valueX,
        yy,
        this._valueW,
        40,
        "right"
      );
    };
    Sprite_EnemyTarget.prototype.isAlwaysHit = function (action) {
      if (action.isAlwaysHit()) {
        return true;
      }
      var hit = action.calcHit(this._enemy);
      if (hit > 500) {
        return true;
      }
      return false;
    };
    Sprite_EnemyTarget.prototype.drawParamChange = function (
      actor,
      action,
      yy,
      e
    ) {
      this.resetFontSize();
      this.changeNormalColor();
      var hit = 100;
      var label = Nore.getParamChangeName(e, true);
      this.bitmap.drawText(
        label.format(e.value1),
        this._labelX,
        yy,
        100,
        40,
        "left"
      );
      if (this.isAlwaysHit(action) && hit >= 100) {
        this.bitmap.textColor = ColorManager.crisisColor();
      }
      this.bitmap.drawText(
        hit + "%",
        this._valueX,
        yy,
        this._valueW,
        40,
        "right"
      );
    };
    Sprite_EnemyTarget.prototype.drawState = function (actor, action, yy, e) {
      this.resetFontSize();
      this.changeNormalColor();
      var state = $dataStates[e.dataId()];
      if (Nore.$stateManager.isParamUpDownState(state)) {
        this.drawStateParamUpDownState(state, yy);
        return;
      }
      var label = Nore.$stateManager.getStateName(state);
      this.bitmap.drawText(label, this._labelX, yy, 100, 40, "left");
      if (this._enemy.isStateResist(state.id)) {
        this.bitmap.textColor = ColorManager.textColor(7);
        this.bitmap.drawText(
          TextManager.invalid,
          this._valueX,
          yy,
          this._valueW,
          40,
          "right"
        );
        return;
      }
      var hit = e.value1() * this._enemy.stateRate(e.dataId());
      if (e.stateValue() > 0) {
        label += e.stateValue();
      }
      this.bitmap.drawText(
        Math.floor(hit * 100) + "%",
        this._valueX,
        yy,
        this._valueW,
        40,
        "right"
      );
    };
    Sprite_EnemyTarget.prototype.drawStateParamUpDownState = function (
      state,
      yy
    ) {
      var label = Nore.$stateManager.getParamUpDownName(state);
      this.bitmap.drawText(label, this._labelX, yy, 140, 40, "left");
    };
    Sprite_EnemyTarget.prototype.refresh = function () {};
    return Sprite_EnemyTarget;
  })(Sprite);
  Nore.Sprite_EnemyTarget = Sprite_EnemyTarget;
  var Sprite_TargetArrow = /** @class */ (function (_super) {
    __extends(Sprite_TargetArrow, _super);
    function Sprite_TargetArrow() {
      var _this = _super.call(this) || this;
      _this._lastInfo = false;
      _this.y = 550;
      _this.bitmap = new Bitmap(Graphics.boxWidth, 400);
      return _this;
    }
    Sprite_TargetArrow.prototype.update = function () {
      _super.prototype.update.call(this);
      if (this.isChanged()) {
        this.refresh();
      }
    };
    Sprite_TargetArrow.prototype.isChanged = function () {
      if (this._lastInfo != $gameTemp.inInfo) {
        return true;
      }
      //if (this._lastInfo) {
      var enemy = this.findSelectedEnemy();
      if (this._lastEnemy != enemy) {
        return true;
      }
      //}
      return false;
    };
    Sprite_TargetArrow.prototype.refresh = function () {
      this.bitmap.clear();
      this._lastInfo = $gameTemp.inInfo;
      var enemy = this.findSelectedEnemy();
      this._lastEnemy = enemy;
      if (!enemy) {
        return;
      }
      if (!enemy.currentAction()) {
        return;
      }
      if (enemy.currentAction().remainTurn() > 1) {
        return;
      }
      if (
        enemy.currentAction().isForFriend() ||
        enemy.currentAction().isForDeadFriend()
      ) {
        return;
      }
      this.drawArrow(enemy, enemy.currentAction()._targets);
    };
    Sprite_TargetArrow.prototype.findSelectedEnemy = function () {
      for (var _i = 0, _a = $gameTroop.aliveMembers(); _i < _a.length; _i++) {
        var e = _a[_i];
        if (e.isSelected()) {
          return e;
        }
      }
      return null;
    };
    Sprite_TargetArrow.prototype.setEnemySprites = function (enemies) {
      this._enemies = enemies;
    };
    Sprite_TargetArrow.prototype.drawArrow = function (enemy, targets) {
      if (!targets) {
        return;
      }
      var s = this.findEnemySprite(enemy);
      var x = s.x;
      for (var _i = 0, targets_1 = targets; _i < targets_1.length; _i++) {
        var t = targets_1[_i];
        if (t.isEnemy()) {
          continue;
        }
        var arc = 4;
        var y = 20;
        var enemyY = enemy.isBack() ? 5 : 20;
        var targetX = this.calcActorX(t);
        var targetY = this.calcActorY(t) + y;
        var context = this.bitmap.context;
        context.strokeStyle = "red";
        context.lineWidth = 5;
        context.beginPath();
        context.moveTo(x, enemyY);
        //context.arc(x, 0, 5, 0, 2 * Math.PI, false);
        context.lineTo(targetX, targetY);
        context.closePath();
        context.stroke();
        context.beginPath();
        context.arc(x, enemyY, arc, 0, 2 * Math.PI, false);
        context.fillStyle = "red";
        context.fill();
        context.beginPath();
        context.arc(targetX, targetY, arc, 0, 2 * Math.PI, false);
        context.fillStyle = "red";
        context.fill();
      }
    };
    Sprite_TargetArrow.prototype.findEnemySprite = function (enemy) {
      for (var _i = 0, _a = this._enemies; _i < _a.length; _i++) {
        var s = _a[_i];
        if (s.enemy() == enemy) {
          return s;
        }
      }
      return null;
    };
    Sprite_TargetArrow.prototype.calcActorY = function (actor) {
      if (actor.isBack()) {
        return 82;
      } else {
        return 58;
      }
    };
    Sprite_TargetArrow.prototype.calcActorX = function (actor) {
      if ($gameParty.battleMembers().length == 3) {
        var index = $gameParty.battleMembers().indexOf(actor);
        return index * Nore.ACTOR_WINDOW_WIDTH + 370;
      }
      if ($gameParty.battleMembers().length == 4) {
        var index = $gameParty.battleMembers().indexOf(actor);
        return index * Nore.ACTOR_WINDOW_WIDTH + 230;
      }
      if ($gameParty.battleMembers().length == 5) {
        var index = $gameParty.battleMembers().indexOf(actor);
        return index * Nore.ACTOR_WINDOW_WIDTH + Nore.ACTOR_WINDOW_WIDTH / 2;
      }
      if ($gameParty.battleMembers().length == 6) {
        var index = $gameParty.battleMembers().indexOf(actor);
        return (index * Graphics.boxWidth) / 6 + 112;
      }
      return 0;
    };
    return Sprite_TargetArrow;
  })(Sprite);
  Nore.Sprite_TargetArrow = Sprite_TargetArrow;
})(Nore || (Nore = {}));
