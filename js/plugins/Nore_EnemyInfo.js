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
  var Window_InfoBase = /** @class */ (function (_super) {
    __extends(Window_InfoBase, _super);
    function Window_InfoBase() {
      var _this = _super.call(this, new Rectangle(0, 0, 500, 600)) || this;
      _this.y = 160;
      _this._labelX = 40;
      _this._descX = 176;
      _this._descW = 250;
      _this._lineH = 74;
      _this._descLine = 22;
      _this.frameVisible = false;
      _this.backOpacity = 0;
      return _this;
    }
    Window_InfoBase.prototype.resetFontSettings = function () {
      this.contents.fontFace = $gameSystem.mainFontFace();
      this.contents.fontSize = 14;
      this.resetTextColor();
    };
    Window_InfoBase.prototype.showInfo = function () {
      this.contents.clear();
      var states = this.getBattler().states();
      var drawCount = states.length + this.countBuffDebuff();
      this.contents.fillRect(
        0,
        0,
        460,
        drawCount * 68 + 20 + this.getTopMargin(),
        "#000000E5"
      );
      this.drawName();
      this.drawParams();
      var index = this.drawStateList(states);
      this.drawBuffList(index);
    };
    Window_InfoBase.prototype.drawStateList = function (states) {
      var index = 0;
      for (var _i = 0, states_1 = states; _i < states_1.length; _i++) {
        var s = states_1[_i];
        if (s.meta["noDisplay"]) {
          continue;
        }
        var battler = this.getBattler();
        this.drawState(s, index, battler._stateTurns[s.id]);
        index++;
      }
      return index;
    };
    Window_InfoBase.prototype.drawBuffList = function (index) {
      var buffs = this.getBattler().buffs();
      for (var i = 0; i < buffs.length; i++) {
        var buff = buffs[i];
        if (buff != 0) {
          if (this.drawBuff(i, buff, index)) {
            index++;
          }
        }
      }
    };
    Window_InfoBase.prototype.drawName = function () {
      this.contents.fontSize = 22;
      this.contents.drawText(this.getBattler().name(), 5, 6, 460, 32, "left");
    };
    Window_InfoBase.prototype.drawParams = function () {
      var yy = 10;
      var xx = 230;
      var interval = 80;
      this.drawIconMini(ATK_MINI_ICON, xx + interval * 0, yy);
      this.drawIconMini(MAT_MINI_ICON, xx + interval * 1, yy);
      var textY = 5;
      var atk = this.getBattler().atk2();
      var mat = this.getBattler().mat2();
      var offset = 27;
      this.drawText(atk, xx + interval * 0 + offset, textY, 100);
      this.drawText(mat, xx + interval * 1 + offset, textY, 100);
    };
    /*drawParams() {
            const yy = 10;
            const xx = 180;
            const interval = 70;
            this.drawIconMini(ATK_MINI_ICON, xx + interval * 0, yy);
            this.drawIconMini(DEF_MINI_ICON, xx + interval * 1, yy);
            this.drawIconMini(MAT_MINI_ICON, xx + interval * 2, yy);
            this.drawIconMini(MDF_MINI_ICON, xx + interval * 3, yy);

            const textY = 5;

            const atk = this.getBattler().atk2();
            const def = this.getBattler().def2();
            const mat = this.getBattler().mat2();
            const mdf = this.getBattler().mdf2();

            const offset = 27;
            this.drawText(atk, xx + interval * 0 + offset, textY, 100);
            this.drawText(def, xx + interval * 1 + offset, textY, 100);
            this.drawText(mat, xx + interval * 2 + offset, textY, 100);
            this.drawText(mdf, xx + interval * 3 + offset, textY, 100);
        }*/
    Window_InfoBase.prototype.countBuffDebuff = function () {
      var n = 0;
      var buffs = this.getBattler().buffs();
      for (var i = 0; i < buffs.length; i++) {
        var buff = buffs[i];
        if (buff != 0) {
          n++;
        }
      }
      return n;
    };
    Window_InfoBase.prototype.getTopMargin = function () {
      return 42;
    };
    Window_InfoBase.prototype.getPreStateText = function (state) {
      var text = "";
      if (state.meta["passive"]) {
        text += "\\C[6]" + TextManager.passive + "\\C[0]";
      }
      /*if (state.restriction >= 4) {
                text += TextManager.cantMove;
            }*/
      return text;
    };
    Window_InfoBase.prototype.getPostStateText = function (state) {
      var text = "";
      var halfText = Nore.$stateManager.makeHalfText(state);
      if (halfText) {
        text += halfText;
      }
      return text;
    };
    Window_InfoBase.prototype.drawState = function (state, index, stateTurns) {
      this.contents.fontSize = 16;
      var yy = index * this._lineH + 10 + this.getTopMargin();
      this.drawIconMini(state.iconIndex, 10, yy + 13);
      var name = Nore.$stateManager.getStateName(state);
      this.contents.drawText(name, this._labelX, yy + 10, 100, 32, "left");
      this.contents.fontSize = 14;
      yy -= 4;
      var text = Nore.$stateManager.makeStateText(
        state,
        stateTurns,
        this.getBattler()
      );
      // let preText = this.getPreStateText(state);
      // let postText = this.getPostStateText(state);
      /*if (state.meta['passive']) {
                this.contents.drawText(TextManager.passive, this._descX, yy, this._descW, 32, 'left');
                yy += this._descLine;
            }*/
      /*if (state.restriction >= 4) {
                this.drawCantMove(t, yy);
                yy += this._descLine;
            }*/
      /*for (const t of state.traits) {
                this.drawTrait(t, yy);
                yy += this._descLine;
            }*/
      this.drawStateOne("", "", text, state.meta["stateValue"], yy);
      return;
      if (state.meta["damageCut"]) {
        yy += this.drawDamageCut(state, yy);
      }
      if (state.meta["counter"]) {
        this.drawCounter(yy);
      }
      if (state.meta["maxShiledPlus"]) {
        this.drawMaxShiledPlus(state, yy);
      }
    };
    Window_InfoBase.prototype.drawBuff = function (buff, value, index) {
      this.contents.fontSize = 16;
      var yy = index * this._lineH + 10 + this.getTopMargin();
      this.drawIconMini(
        Nore.$stateManager.getBuffIcon(buff, value),
        10,
        yy + 13
      );
      var name = Nore.$stateManager.getBuffName(buff, value);
      this.contents.drawText(name, this._labelX, yy + 10, 100, 32, "left");
      this.contents.fontSize = 14;
      yy -= 4;
      this.drawVerCenterText(Nore.$stateManager.getBuffText(buff, value), yy);
      return true;
    };
    Window_InfoBase.prototype.drawVerCenterText = function (text, y) {
      var lineCount = text.split("\n").length;
      var offset = 0;
      switch (lineCount) {
        case 0:
          offset = this.lineHeight();
          break;
        case 1:
          offset = this.lineHeight() / 2;
          break;
        default:
          0;
          break;
      }
      this.drawTextEx(text, this._descX, y + offset, this._descW);
    };
    Window_InfoBase.prototype.drawTrait = function (trait, yy) {
      if (trait.code == 22 && trait.dataId == 7) {
        this.drawRegene(trait.value, yy);
      }
      if (trait.code == 22 && trait.dataId == 1) {
        this.drawMaxDamage(trait.value, yy);
      }
    };
    Window_InfoBase.prototype.drawStateOne = function (
      preText,
      postText,
      stateText,
      stateValue,
      yy
    ) {
      var text = stateText.format(stateValue);
      /*if (postText.length > 0) {
                text += '\n' + postText;
            }*/
      this.drawVerCenterText(text, yy);
    };
    Window_InfoBase.prototype.drawMaxDamage = function (value, yy) {
      var text = TextManager.maxDamage;
      this.drawTextEx(text, this._descX, yy, this._descW, 32, "left");
    };
    Window_InfoBase.prototype.drawDefUp = function (value, yy) {
      var text = TextManager.defUpState.format(value);
      this.drawTextEx(text, this._descX, yy, this._descW, 32, "left");
    };
    Window_InfoBase.prototype.drawRegene = function (value, yy) {
      var num = Math.round(value * 100);
      var text;
      if (num > 0) {
        text = TextManager.regene.format(num);
      } else {
        if (num == -1) {
          text = TextManager.slipDamage.format();
        } else {
          text = TextManager.slipDamageFixed.format(Math.abs(num));
        }
      }
      this.drawTextEx(text, this._descX, yy, this._descW, 32, "left");
      if (num > 0) {
        this.drawTextEx(
          TextManager.notRegene,
          this._descX,
          yy + this._descLine,
          this._descW,
          32,
          "left"
        );
      }
    };
    Window_InfoBase.prototype.drawBless = function (yy) {
      this.drawTextEx(TextManager.blessText1, this._descX, yy, this._descW);
      this.drawTextEx(
        TextManager.blessText2,
        this._descX,
        yy + this._descLine,
        this._descW
      );
      this.drawTextEx(
        TextManager.blessText3,
        this._descX,
        yy + this._descLine * 2,
        this._descW
      );
    };
    Window_InfoBase.prototype.drawDamageCut = function (state, yy) {
      this.drawTextEx(
        TextManager.damageCut.format(state.meta["damageCut"]),
        this._descX,
        yy,
        this._descW,
        32,
        "left"
      );
      return this._descLine;
    };
    Window_InfoBase.prototype.drawMaxShiledPlus = function (state, yy) {
      this.drawTextEx(
        TextManager.holyBlessing2.format(state.meta["maxShiledPlus"]),
        this._descX,
        yy,
        this._descW,
        32,
        "left"
      );
    };
    Window_InfoBase.prototype.drawCounter = function (yy) {
      this.drawTextEx(
        TextManager.counter1,
        this._descX,
        yy,
        this._descW,
        32,
        "left"
      );
      this.drawTextEx(
        TextManager.counter2,
        this._descX,
        yy + this._descLine,
        this._descW,
        32,
        "left"
      );
    };
    return Window_InfoBase;
  })(Window_Base);
  var Window_EnemyInfo = /** @class */ (function (_super) {
    __extends(Window_EnemyInfo, _super);
    function Window_EnemyInfo(enemy) {
      var _this = _super.call(this) || this;
      _this._enemy = enemy;
      _this.y = 160;
      var x = enemy.screenX() - 200;
      var minX = 0;
      var maxX = Graphics.width - 480;
      _this.x = Math.min(Math.max(x, minX), maxX);
      return _this;
    }
    Window_EnemyInfo.prototype.getBattler = function () {
      return this._enemy;
    };
    Window_EnemyInfo.prototype.update = function () {
      _super.prototype.update.call(this);
      if (!this._enemy) {
        return;
      }
      if (!$gameTemp.inInfo) {
        this.visible = false;
        return;
      }
      var lastVisible = this.visible;
      this.visible = this._enemy.isSelected();
      if (!lastVisible && this.visible) {
        this.showInfo();
      }
    };
    return Window_EnemyInfo;
  })(Window_InfoBase);
  Nore.Window_EnemyInfo = Window_EnemyInfo;
  var Sprite_ActorInfo = /** @class */ (function (_super) {
    __extends(Sprite_ActorInfo, _super);
    function Sprite_ActorInfo(actor) {
      var _this = _super.call(this) || this;
      _this._actor = actor;
      _this.y = -60;
      _this.x = 0;
      return _this;
    }
    Sprite_ActorInfo.prototype.getBattler = function () {
      return this._actor;
    };
    Sprite_ActorInfo.prototype.update = function () {
      _super.prototype.update.call(this);
      if (!this._actor) {
        return;
      }
      if (!$gameTemp.inInfo) {
        this.visible = false;
        return;
      }
      var lastVisible = this.visible;
      this.visible = this._actor.isSelected();
      if (!lastVisible && this.visible) {
        this.showInfo();
      }
    };
    return Sprite_ActorInfo;
  })(Window_InfoBase);
  Nore.Sprite_ActorInfo = Sprite_ActorInfo;
  var Window_Turn = /** @class */ (function (_super) {
    __extends(Window_Turn, _super);
    function Window_Turn() {
      var _this = _super.call(this, new Rectangle(0, 0, 122, 80)) || this;
      _this.refresh();
      return _this;
    }
    Window_Turn.prototype.refresh = function () {
      this.contents.clear();
      this.drawText(
        TextManager.turn.format($gameTroop.turnCount() + 1),
        4,
        10,
        80,
        "right"
      );
    };
    Window_Turn.prototype.update = function () {
      _super.prototype.update.call(this);
      var last = this.visible;
      this.visible = $gameTemp.inInfo;
      if (last != this.visible) {
        this.refresh();
      }
    };
    return Window_Turn;
  })(Window_Base);
  Nore.Window_Turn = Window_Turn;
})(Nore || (Nore = {}));
