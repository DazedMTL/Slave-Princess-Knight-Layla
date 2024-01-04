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
  BattleManager.displayRewards = function () {
    SceneManager._scene.showBattleResult(this._rewards);
  };
  /*
    Scene_Battle.prototype.showBattleResult = function(rewards) {
        $gameTemp.cancelAutoBattle();
        this.isShowResult = true;
        this._partyCommandWindow.deactivate();
        this._actorCommandWindow.deactivate();
        this._skillWindow.deactivate();
        this._itemWindow.deactivate();
        this._actorWindow.deactivate();
        this._enemyWindow.deactivate();
        this._resultWindow = new Window_BattleResult(rewards);
        this._resultWindow.refresh();
        var self = this;
        this._resultWindow.setHandler('onFinish', function() {
            self.isShowResult = false;
            BattleManager.gainRewards();
        });
        this.addChild(this._resultWindow);
    };
    */
  var Window_BattleResult = /** @class */ (function (_super) {
    __extends(Window_BattleResult, _super);
    function Window_BattleResult() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Window_BattleResult.prototype.initialize = function (rewards) {
      this._rewards = rewards;
      this._seWait = 0;
      var exp = rewards.exp;
      var ww = 1100;
      var xx = (Graphics.width - ww) / 2;
      _super.prototype.initialize.call(
        this,
        new Rectangle(xx, 0, ww, Graphics.boxHeight - 180)
      );
      this._resultList = [];
      var i = 0;
      var maxMembers = $gameParty.battleMembers();
      for (
        var _i = 0, maxMembers_1 = maxMembers;
        _i < maxMembers_1.length;
        _i++
      ) {
        var actor = maxMembers_1[_i];
        var rect = this.itemRect(i);
        var result = new ActorResult(actor, exp, rect);
        this.addChild(result);
        this._resultList.push(result);
        i++;
      }
      /*if ($gameVariables.value(1) >= 6) {
                var rect = this.itemRect(i);
                var result = new ActorResult($gameActors.actor(6), 0, rect);
                this.addChild(result);
                this._resultList.push(result);
                i++;
            }
            if ($gameVariables.value(1) >= 8 && !$gameSwitches.value(641)) {
                var rect = this.itemRect(i);
                var result = new ActorResult($gameActors.actor(16), 0, rect);
                this.addChild(result);
                this._resultList.push(result);
                i++;
            }*/
      if (this._resultList.length >= 6) {
        for (var _a = 0, _b = this._resultList; _a < _b.length; _a++) {
          var result = _b[_a];
          result.y -= 20;
        }
      }
      this.start();
    };
    Window_BattleResult.prototype.drawItemBackground = function () {};
    Window_BattleResult.prototype.refresh = function () {
      _super.prototype.refresh.call(this);
      var base = Nore.getSystemBaseTexture("result");
      var texture = new PIXI.Texture(base, new PIXI.Rectangle(0, 0, 240, 60));
      var s = new PIXI.Sprite(texture);
      s.x = 30;
      s.y = 30;
      if (this._resultList.length >= 6) {
        s.y = 20;
      }
      this.addChild(s);
      var baseY = 140;
      if (this._resultList.length >= 7) {
        return;
      }
      var xx = 180;
      baseY += 280;
      var h = 32;
      // EXP
      var texture3 = new PIXI.Texture(
        base,
        new PIXI.Rectangle(0, h * 3, 80, h)
      );
      var s3 = new PIXI.Sprite(texture3);
      s3.x = 80;
      s3.y = baseY + 46;
      this.addChild(s3);
      this.drawNumber(this._rewards.exp, xx, baseY + 26, 100, "right", 4);
      // GOLD
      var texture4 = new PIXI.Texture(
        base,
        new PIXI.Rectangle(0, h * 4, 80, h)
      );
      var s4 = new PIXI.Sprite(texture4);
      s4.x = 80;
      s4.y = baseY + 88;
      this.addChild(s4);
      this.drawNumber(this._rewards.gold, xx, baseY + 66, 100, "right", 4);
      // SKILL POINT
      var texture4 = new PIXI.Texture(
        base,
        new PIXI.Rectangle(0, h * 6, 155, h)
      );
      var s5 = new PIXI.Sprite(texture4);
      s5.x = 80;
      s5.y = baseY + 130;
      this.addChild(s5);
      this.drawNumber(
        this._rewards.skillPoint,
        xx,
        baseY + 106,
        100,
        "right",
        4
      );
      var nodamageX = 250;
      var nodamageY = 48;
      var nodamageEnOffset = ConfigManager.language == "jp" ? 0 : 3;
      if ($gameTemp.isNoDamage()) {
        $gameMedals.onNoDamage();
        var texture6 = new PIXI.Texture(
          base,
          new PIXI.Rectangle(6 * h, (2 + nodamageEnOffset) * h, 300, h)
        );
        var s6 = new PIXI.Sprite(texture6);
        s6.x = nodamageX;
        s6.y = nodamageY;
        this.addChild(s6);
        var texture7 = new PIXI.Texture(
          base,
          new PIXI.Rectangle(0, 7 * h, 40, h)
        );
        var s7 = new PIXI.Sprite(texture7);
        s7.x = 330;
        s7.y = s3.y;
        this.addChild(s7);
        var s8 = new PIXI.Sprite(texture7);
        s8.x = s7.x;
        s8.y = s4.y;
        this.addChild(s8);
        var s9 = new PIXI.Sprite(texture7);
        s9.x = s7.x;
        s9.y = s5.y;
        this.addChild(s9);
      } else if ($gameTemp.is1Damage()) {
        var texture6 = new PIXI.Texture(
          base,
          new PIXI.Rectangle(6 * h, (3 + nodamageEnOffset) * h, 300, h)
        );
        var s6 = new PIXI.Sprite(texture6);
        s6.x = nodamageX;
        s6.y = nodamageY;
        this.addChild(s6);
        var texture7 = new PIXI.Texture(
          base,
          new PIXI.Rectangle(0, 8 * h, 80, h)
        );
        var s7 = new PIXI.Sprite(texture7);
        s7.x = 330;
        s7.y = s3.y;
        this.addChild(s7);
        var s8 = new PIXI.Sprite(texture7);
        s8.x = s7.x;
        s8.y = s4.y;
        this.addChild(s8);
        var s9 = new PIXI.Sprite(texture7);
        s9.x = s7.x;
        s9.y = s5.y;
        this.addChild(s9);
      } else if ($gameTemp.is2Damage()) {
        var texture6 = new PIXI.Texture(
          base,
          new PIXI.Rectangle(6 * h, (4 + nodamageEnOffset) * h, 300, h)
        );
        var s6 = new PIXI.Sprite(texture6);
        s6.x = nodamageX;
        s6.y = nodamageY;
        this.addChild(s6);
        var texture7 = new PIXI.Texture(
          base,
          new PIXI.Rectangle(0, 9 * h, 80, h)
        );
        var s7 = new PIXI.Sprite(texture7);
        s7.x = 330;
        s7.y = s3.y;
        this.addChild(s7);
        var s8 = new PIXI.Sprite(texture7);
        s8.x = s7.x;
        s8.y = s4.y;
        this.addChild(s8);
        var s9 = new PIXI.Sprite(texture7);
        s9.x = s7.x;
        s9.y = s5.y;
        this.addChild(s9);
      }
      var itemX = 450;
      /*var texture5 = new PIXI.Texture(base, new PIXI.Rectangle(240, 60, 80, 50));
            var s15 = new PIXI.Sprite(texture5);
            s15.x = 580;
            s15.y = s3.y + 440;
            this.addChild(s15);*/
      if (this._rewards.items.length > 0) {
        var texture2 = new PIXI.Texture(
          base,
          new PIXI.Rectangle(0, h * 5, 160, h)
        );
        var s2 = new PIXI.Sprite(texture2);
        s2.x = 430;
        s2.y = baseY + 48;
        if (this._resultList.length < 6) {
          this.addChild(s2);
        }
        var item = this._rewards.items[0];
        this.drawIcon(item.iconIndex, itemX, baseY + 66);
        this.drawText(getItemName(item), itemX + 50, baseY + 66, 200);
      }
    };
    Window_BattleResult.prototype.maxItems = function () {
      return $gameParty.battleMembers().length;
    };
    Window_BattleResult.prototype.itemHeight = function () {
      if ($gameParty.battleMembers().length == 6) {
        return 63;
      }
      return 70;
    };
    Window_BattleResult.prototype.itemRect = function (index) {
      var rect = _super.prototype.itemRect.call(this, index);
      rect.y += 100;
      return rect;
    };
    Window_BattleResult.prototype.start = function () {
      for (var _i = 0, _a = this._resultList; _i < _a.length; _i++) {
        var result = _a[_i];
        result.start();
      }
    };
    Window_BattleResult.prototype.update = function () {
      _super.prototype.update.call(this);
      var isOk = true;
      if (!this._updateFinished) {
        for (var _i = 0, _a = this._resultList; _i < _a.length; _i++) {
          var result = _a[_i];
          if (!result.update()) {
            isOk = false;
          }
        }
        if (isOk) {
          this._updateFinished = true;
        }
      }
      if (
        Input.isTriggered("ok") ||
        Input.isPressed("shift") ||
        TouchInput.isTriggered()
      ) {
        for (var _b = 0, _c = this._resultList; _b < _c.length; _b++) {
          var result = _c[_b];
          if (!result.finish()) {
            isOk = false;
          }
        }
        if ((this._updateFinished || isOk) && !this._finished) {
          this._finished = true;
          this.callHandler("onFinish");
        } else {
          this._updateFinished = true;
        }
      }
      if (this._seWait > 0) {
        this._seWait--;
      } else {
        if (!this._updateFinished) {
          AudioManager.playStaticSe({
            name: "button57",
            volume: 40,
            pitch: 100,
            pan: 0,
          });
        }
        this._seWait = 5;
      }
    };
    return Window_BattleResult;
  })(Window_Selectable);
  var MAX_FRAME_NUM = 150;
  var ActorResult = /** @class */ (function (_super) {
    __extends(ActorResult, _super);
    function ActorResult() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    ActorResult.prototype.initialize = function (actor, gainExp, rect) {
      _super.prototype.initialize.call(this);
      this.bitmap = new Bitmap(1000, 200);
      var self = this;
      this._actor = JsonEx.makeDeepCopy(actor);
      this._gainExp = gainExp;
      this._frameNum = 0;
      this._currentExp = 0;
      this._levelUpFrame = 0;
      this._lastExp = 0;
      this._rect = rect;
      this._isStart = true;
      this._initialRate = this._actor.calcExpRate(0);
      this._rate = this._initialRate;
      this.x = rect.x;
      this.y = rect.y;
      this._levelUpParam = 0;
    };
    ActorResult.prototype.update = function () {
      if (this._isEnd) {
        return true;
      }
      if (!this._isStart) {
        return false;
      }
      if (this._levelUpFrame > 0) {
        this._levelUpFrame--;
        if (this._levelUpFrame == 0) {
        } else {
          return false;
        }
      }
      this._rate += 0.001;
      var rate = this._rate;
      if (
        this._actor.calcRealExp(this._rate) + this._lastExp >=
        this._gainExp
      ) {
        this._isEnd = true;
        this._rate = this._actor.calcExpRate(this._gainExp - this._lastExp);
      }
      if (this._rate >= 1) {
        this._lastExp = this._actor.calcRealExp(1);
        this._actor.changeExp(this._actor.nextLevelExp(), false);
        this.playLevelUp();
        this._levelUpFrame = 22;
        this._rate = 0;
        rate = 1;
      }
      this.draw(rate);
      return false;
    };
    ActorResult.prototype.playLevelUp = function () {
      AudioManager.playSe({ name: "Item2", volume: 90, pitch: 100, pan: 0 });
      this._levelUpParam = 1;
      this._afterLevelUp = true;
    };
    ActorResult.prototype.start = function () {
      this._isStart = true;
    };
    ActorResult.prototype.finish = function () {
      if (this._isEnd) {
        return true;
      }
      var lastLevel = this._actor.level;
      var exp = this._actor.currentExp();
      this._actor.changeExp(exp + this._gainExp - this._lastExp, false);
      var rate = this._actor.calcExpRate(0);
      if (lastLevel < this._actor.level) {
        this.playLevelUp();
      }
      if (rate >= 1) {
        rate = 1;
      }
      this._isEnd = true;
      this.draw(rate);
    };
    ActorResult.prototype.drawTextImage = function (x, y, actorId) {};
    ActorResult.prototype.draw = function (rate) {
      this.bitmap.clear();
      this.removeChildren();
      var actorId = this._actor.actorId();
      var base2 = Nore.getSystemBaseTexture("result_face" + actorId);
      if (this._afterLevelUp) {
        /*if ($gameSwitches.value(524)) {
                    base2 = getSystemBaseTexture('result_face2');
                    if (! this._resetSprite3) {
                        this._resetSprite3 = true;
                        if (this._sprite3) {
                            this._sprite3.destroy();
                        }
                        this._sprite3 = null;
                    }
                }*/
      }
      if (!this._sprite3) {
        var texture2 = new PIXI.Texture(base2);
        var s3 = new PIXI.Sprite(texture2);
        s3.x = 30;
        s3.y = 0;
        this._sprite3 = s3;
      }
      this.addChild(this._sprite3);
      this.drawTextImage(320, 10, actorId);
      this.bitmap.fillRect(26, 0, 972, 60, "rgba(0, 0, 0, 0.5)");
      var base = Nore.getSystemBaseTexture("result");
      if (!this._sprite1) {
        var texture = new PIXI.Texture(base, new PIXI.Rectangle(0, 60, 80, 30));
        var s = new PIXI.Sprite(texture);
        s.x = 530;
        s.y = 14;
        this._sprite1 = s;
      }
      this.addChild(this._sprite1);
      if (!this._sprite2) {
        var texture2 = new PIXI.Texture(
          base,
          new PIXI.Rectangle(80, 60, 80, 30)
        );
        var s2 = new PIXI.Sprite(texture2);
        s2.x = 630;
        s2.y = 14;
        this._sprite2 = s2;
      }
      this.addChild(this._sprite2);
      if (rate == 1) {
        this.drawGauge(
          694,
          18,
          280,
          rate,
          ColorManager.crisisColor(),
          ColorManager.crisisColor()
        );
      } else {
        this.drawGauge(
          694,
          18,
          280,
          rate,
          ColorManager.textColor(28),
          ColorManager.textColor(29)
        );
      }
      this.drawNumber(this._actor.level, 550, -8, 60, "right", 4);
      if (this._levelUpParam && !this._sprite5) {
        var texture = new PIXI.Texture(
          base,
          new PIXI.Rectangle(0, 32 * 10, 150, 32)
        );
        var s2 = new PIXI.Sprite(texture);
        s2.x = 560;
        s2.y = -16;
        p("levelUp");
        this._sprite5 = s2;
      }
      if (this._sprite5) {
        this.addChild(this._sprite5);
      }
    };
    ActorResult.prototype.drawGauge = function (
      x,
      y,
      width,
      rate,
      color1,
      color2
    ) {
      if (isNaN(rate)) {
        p("Error: rate is NaN");
        return;
      }
      var fillW = Math.floor(width * rate);
      var gaugeY = y + this.lineHeight() - 8;
      this.bitmap.fillRect(x, gaugeY, width, 6, this.gaugeBackColor());
      this.bitmap.gradientFillRect(x, gaugeY, fillW, 6, color1, color2);
    };
    ActorResult.prototype.gaugeBackColor = function () {
      return "#000000";
    };
    ActorResult.prototype.lineHeight = function () {
      return 16;
    };
    return ActorResult;
  })(Sprite);
  Scene_Battle.prototype.showBattleResult = function (rewards) {
    $gameTemp.cancelAutoBattle();
    this.isShowResult = true;
    this._partyCommandWindow.deactivate();
    this._actorCommandWindow.deactivate();
    this._skillWindow.deactivate();
    this._itemWindow.deactivate();
    this._actorWindow.deactivate();
    this._enemyWindow.deactivate();
    this._resultWindow = new Window_BattleResult(rewards);
    this._resultWindow.refresh();
    var self = this;
    this._resultWindow.setHandler("onFinish", function () {
      self.isShowResult = false;
      //BattleManager.gainRewards();
    });
    this.addChild(this._resultWindow);
  };
  BattleManager.processVictory = function () {
    $gameParty.removeBattleStates();
    $gameParty.performVictory();
    $gameMedals.onVictory();
    this.playVictoryMe();
    this.replayBgmAndBgs();
    this.makeRewards();
    //this.displayVictoryMessage();
    this.displayRewards();
    this.gainRewards();
    this.endBattle(0);
  };
  BattleManager.processDefeat = function () {
    this.displayDefeatMessage();
    this.playDefeatMe();
    $gameMedals.onDefeat();
    if (this._canLose) {
      this.replayBgmAndBgs();
    } else {
      AudioManager.stopBgm();
    }
    this.endBattle(2);
  };
  BattleManager.isBusy = function () {
    return (
      $gameMessage.isBusy() ||
      this._spriteset.isBusy() ||
      this._logWindow.isBusy() ||
      SceneManager._scene.isShowResult
    );
  };
  BattleManager.updateBattleEnd = function () {
    if (this.isBattleTest()) {
      AudioManager.stopBgm();
      SceneManager.exit();
    } else if (!this._escaped && $gameParty.isAllDead()) {
      if (this._canLose) {
        $gameParty.reviveBattleMembers();
        SceneManager.pop();
      } else {
        if ($gameSwitches.value(2)) {
          // チュートリアル終了
          $gameTemp.reserveCommonEvent(60);
        }
        $gameParty.reviveBattleMembers();
        SceneManager.pop();
      }
    } else {
      SceneManager.pop();
    }
    this._phase = null;
  };
})(Nore || (Nore = {}));
