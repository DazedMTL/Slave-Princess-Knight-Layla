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
/*:ja
 * @target MZ
 * @author ル
 */
var Nore;
(function (Nore) {
  Nore.NO_SELECTION = -1;
  Nore.ALL_SELECTION = -19;
  Nore.LINE_SELECTION = -20;
  Nore.FRONT_LINE_SELECTION = -21;
  Nore.BACK_LINE_SELECTION = -22;
  Nore.FRONT_LINE_SELECTION_CHANGABLE = -25;
  Nore.BACK_LINE_SELECTION_CHANGABLE = -26;
  Nore.SELF_SELECTION = -27;
  Nore.RANDOM_SELECTION = -28;
  Nore.AIMED_SELECTION = -29;
  Nore.ACTOR_WINDOW_WIDTH = 256;
  Nore.ACTOR_WINDOW_WIDTH_6 = 213;
  function getActorWindowWidth() {
    if ($gameParty.battleMembers().length == 6) {
      return Nore.ACTOR_WINDOW_WIDTH_6;
    } else {
      return Nore.ACTOR_WINDOW_WIDTH;
    }
  }
  var Window_BattleStatus2 = /** @class */ (function (_super) {
    __extends(Window_BattleStatus2, _super);
    function Window_BattleStatus2(r) {
      var _this = _super.call(this, r) || this;
      _this._windowList = [];
      _this._lastPlayerTurn = true;
      _this.margin = 0;
      _this.padding = 0;
      _this.createWindows();
      _this.backOpacity = 0;
      _this.frameVisible = false;
      _this.contentsOpacity = 0;
      _this._isWindow = false;
      return _this;
    }
    Window_BattleStatus2.prototype.refresh = function () {};
    Window_BattleStatus2.prototype.isTouchScrollEnabled = function () {
      return false;
    };
    Window_BattleStatus2.prototype.processWheelScroll = function () {};
    Window_BattleStatus2.prototype.update = function () {
      _super.prototype.update.call(this);
      this.checkTurnChange();
    };
    Window_BattleStatus2.prototype.checkTurnChange = function () {
      if (this._lastPlayerTurn == BattleManager._playerTurn) {
        return;
      }
      this._lastPlayerTurn = BattleManager._playerTurn;
      this.refreshAllWindows();
    };
    Window_BattleStatus2.prototype.refreshAllWindows = function () {
      for (var _i = 0, _a = this.allWindows(); _i < _a.length; _i++) {
        var w = _a[_i];
        w.refresh();
      }
    };
    Window_BattleStatus2.prototype.createWindows = function () {
      this._windowList = [];
      var index = 0; //3 - $gameParty.frontMembers().length;
      for (var _i = 0, _a = $gameParty.battleMembers(); _i < _a.length; _i++) {
        var m = _a[_i];
        this._windowList.push(
          new Window_Battler(index, !m.isBack(), m, this.positionOffset())
        );
        index += 1;
      }
      this._windowContentsSprite.removeChildren();
      for (var _b = 0, _c = this.allWindows(); _b < _c.length; _b++) {
        var w = _c[_b];
        this._windowContentsSprite.addChild(w);
      }
    };
    Window_BattleStatus2.prototype.positionOffset = function () {
      switch ($gameParty.battleMembers().length) {
        case 1:
        case 2:
        case 3:
          return 250;
        case 4:
          return 130;
        default:
          break;
      }
      return 12;
    };
    Window_BattleStatus2.prototype.allWindows = function () {
      var ret = [];
      if (this._windowList) {
        ret = ret.concat(this._windowList);
      }
      return ret;
    };
    Window_BattleStatus2.prototype.drawItem = function (index) {};
    Window_BattleStatus2.prototype.isOpenAndActive = function () {
      return this.active;
    };
    Window_BattleStatus2.prototype.isCancelEnabled = function () {
      return true;
    };
    Window_BattleStatus2.prototype.processCancel = function () {
      SoundManager.playCancel();
      this.updateInputData();
      this.deactivate();
      this.callCancelHandler();
    };
    Window_BattleStatus2.prototype.reselect = function () {};
    Window_BattleStatus2.prototype.maxCols = function () {
      return 10;
    };
    Window_BattleStatus2.prototype.activate = function () {
      //this.deactivateAllWindow();
      _super.prototype.activate.call(this);
    };
    Window_BattleStatus2.prototype.startSelection = function (action, index) {
      this._action = action;
      var initialSelection = this._action.initialSelection();
      //p('initialSelection' + initialSelection)
      if (initialSelection == 0) {
        this.select(index);
      } else {
        this.select(initialSelection);
      }
    };
    Window_BattleStatus2.prototype.infoSelect = function () {
      this.deactivateAllWindow();
      for (var _i = 0, _a = this.allWindows(); _i < _a.length; _i++) {
        var w = _a[_i];
        w.startSelection();
      }
    };
    Window_BattleStatus2.prototype.infoDeselect = function () {
      this.deactivateAllWindow();
      for (var _i = 0, _a = this.allWindows(); _i < _a.length; _i++) {
        var w = _a[_i];
        w.endSelection();
      }
    };
    Window_BattleStatus2.prototype.deactivateAllWindow = function () {
      for (var _i = 0, _a = this.allWindows(); _i < _a.length; _i++) {
        var w = _a[_i];
        w.deactivate();
      }
    };
    Window_BattleStatus2.prototype.activeIndex = function () {
      var index = 0;
      for (var _i = 0, _a = this.allWindows(); _i < _a.length; _i++) {
        var w = _a[_i];
        if (w.active) {
          return index;
        }
        index++;
      }
      return -1;
    };
    Window_BattleStatus2.prototype.select = function (index) {
      //p('select:' + index)
      if (!this.active) {
        return;
      }
      this.deactivateAllWindow();
      for (var _i = 0, _a = this.allWindows(); _i < _a.length; _i++) {
        var w = _a[_i];
        w.startSelection();
      }
      if (index == Nore.SELF_SELECTION) {
        for (var _b = 0, _c = this.allWindows(); _b < _c.length; _b++) {
          var w = _c[_b];
          if (w.actor() == this._action.subject()) {
            w.activate();
          }
        }
        this._index = index;
        return;
      }
      if (index == Nore.ALL_SELECTION || index == Nore.RANDOM_SELECTION) {
        for (var _d = 0, _e = this.allWindows(); _d < _e.length; _d++) {
          var w = _e[_d];
          if (w.actor().isAlive()) {
            w.activate();
          }
        }
        this._index = index;
        return;
      }
      if (
        index == Nore.FRONT_LINE_SELECTION ||
        index == Nore.FRONT_LINE_SELECTION_CHANGABLE
      ) {
        for (var _f = 0, _g = this.allWindows(); _f < _g.length; _f++) {
          var w = _g[_f];
          if (w.isFront()) {
            w.activate();
          }
        }
        this._index = index;
        return;
      }
      if (
        index == Nore.BACK_LINE_SELECTION ||
        index == Nore.BACK_LINE_SELECTION_CHANGABLE
      ) {
        for (var _h = 0, _j = this.allWindows(); _h < _j.length; _h++) {
          var w = _j[_h];
          if (w.isBack()) {
            w.activate();
          }
        }
        this._index = index;
        return;
      }
      if (index < $gameParty.maxBattleMembers()) {
        if (!this._windowList[index]) {
          return;
        }
        this._windowList[index].activate();
      } else if (index < 10) {
        this._windowList[index - $gameParty.maxBattleMembers()].activate();
      }
      this._index = index;
      //p('select2:' + this._index)
    };
    Window_BattleStatus2.prototype.selectedActorInInfo = function () {
      for (var _i = 0, _a = this.allWindows(); _i < _a.length; _i++) {
        var w = _a[_i];
        if (w.active) {
          return w.actor();
        }
      }
      return null;
    };
    Window_BattleStatus2.prototype.selectedActorList = function () {
      var index = this._index;
      //p('index:' + index)
      if (index == Nore.SELF_SELECTION) {
        return [this._action.subject()];
      }
      if (index == Nore.ALL_SELECTION || index == Nore.RANDOM_SELECTION) {
        return $gameParty.aliveMembers();
      }
      if (
        index == Nore.FRONT_LINE_SELECTION ||
        index == Nore.FRONT_LINE_SELECTION_CHANGABLE
      ) {
        return $gameParty.frontMembers();
      }
      if (
        index == Nore.BACK_LINE_SELECTION ||
        index == Nore.BACK_LINE_SELECTION_CHANGABLE
      ) {
        return $gameParty.backMembers();
      }
      if (index < 0) {
        return [];
      }
      if (index < $gameParty.maxBattleMembers()) {
        return [this._windowList[index].actor()];
      }
    };
    Window_BattleStatus2.prototype.changeLine = function () {
      var index = this.index();
      if (
        index == Nore.FRONT_LINE_SELECTION ||
        index == Nore.BACK_LINE_SELECTION
      ) {
        return true;
      }
      if (index == Nore.FRONT_LINE_SELECTION_CHANGABLE) {
        this.select(Nore.BACK_LINE_SELECTION_CHANGABLE);
        return true;
      }
      if (index == Nore.BACK_LINE_SELECTION_CHANGABLE) {
        this.select(Nore.FRONT_LINE_SELECTION_CHANGABLE);
        return true;
      }
      return false;
    };
    Window_BattleStatus2.prototype.cursorRight = function (wrap) {
      if (this.changeLine()) {
        return;
      }
      var index = this.index();
      if (index == Nore.SELF_SELECTION) {
        return;
      }
      if (this._index < 10) {
        if (this._windowList[this._index + 1]) {
          this.select(this._index + 1);
        }
      }
      this.callHandler("change");
    };
    Window_BattleStatus2.prototype.cursorLeft = function (wrap) {
      if (this.changeLine()) {
        return;
      }
      var index = this.index();
      if (index == Nore.SELF_SELECTION) {
        return;
      }
      if (this._index < $gameParty.maxBattleMembers()) {
        if (this._windowList[this._index - 1]) {
          this.select(this._index - 1);
        }
      }
      this.callHandler("change");
    };
    Window_BattleStatus2.prototype.isCursorMovable = function () {
      return this.active;
    };
    Window_BattleStatus2.prototype.show = function () {
      _super.prototype.show.call(this);
      for (var _i = 0, _a = this.allWindows(); _i < _a.length; _i++) {
        var w = _a[_i];
        w.show();
      }
    };
    Window_BattleStatus2.prototype.hide = function () {
      if (!this.visible) {
        return;
      }
      _super.prototype.hide.call(this);
      for (var _i = 0, _a = this.allWindows(); _i < _a.length; _i++) {
        var w = _a[_i];
        w.hide();
      }
    };
    Window_BattleStatus2.prototype.endSelection = function () {
      p("endSelection");
      for (var _i = 0, _a = this.allWindows(); _i < _a.length; _i++) {
        var w = _a[_i];
        w.endSelection();
        if (w.isCurrentActor()) {
          w.activate();
        } else {
          w.deactivate();
        }
      }
    };
    Window_BattleStatus2.prototype.cursorUp = function (wrap) {
      if ($gameTemp.inInfo) {
        this.callHandler("onUpDown");
        return;
      }
      if (this.changeLine()) {
        return;
      }
      _super.prototype.cursorUp.call(this, wrap);
    };
    Window_BattleStatus2.prototype.cursorDown = function (wrap) {
      if ($gameTemp.inInfo) {
        this.callHandler("onUpDown");
        return;
      }
      if (this.changeLine()) {
        return;
      }
      _super.prototype.cursorDown.call(this, wrap);
    };
    Window_BattleStatus2.prototype.getInfoSpriteList = function () {
      var result = [];
      for (var _i = 0, _a = this.allWindows(); _i < _a.length; _i++) {
        var w = _a[_i];
        result.push(w.getInfoSprite());
      }
      return result;
    };
    Window_BattleStatus2.prototype.onTouchSelect = function (trigger) {
      this._doubleTouch = false;
      if (this.isCursorMovable()) {
        var lastIndex = this.index();
        var hitIndex = this.hitIndex();
        if (hitIndex >= 0 || hitIndex <= 19) {
          if (hitIndex === this.index()) {
            this._doubleTouch = true;
          }
          this.select(hitIndex);
        }
        if (trigger && this.index() !== lastIndex) {
          this.playCursorSound();
        }
      }
    };
    Window_BattleStatus2.prototype.onTouchOk = function () {
      if (this.isTouchOkEnabled()) {
        var hitIndex = this.hitIndex();
        if (this._cursorFixed) {
          if (hitIndex === this.index()) {
            this.processOk();
          }
        } else if (hitIndex >= 0 || hitIndex <= Nore.ALL_SELECTION) {
          this.processOk();
        }
      }
    };
    Window_BattleStatus2.prototype.hitIndex = function () {
      var hitIndex = _super.prototype.hitIndex.call(this);
      var index = this.index();
      if (hitIndex >= 0) {
        if (index == Nore.SELF_SELECTION) {
          return index;
        }
        var isFront = this.allWindows()[hitIndex].isFront();
        if (
          index == Nore.FRONT_LINE_SELECTION ||
          index == Nore.BACK_LINE_SELECTION
        ) {
          return index;
        }
        if (index == Nore.ALL_SELECTION) {
          return index;
        }
        if (
          index == Nore.FRONT_LINE_SELECTION_CHANGABLE ||
          index == Nore.BACK_LINE_SELECTION_CHANGABLE
        ) {
          if (isFront) {
            return Nore.FRONT_LINE_SELECTION_CHANGABLE;
          } else {
            return Nore.BACK_LINE_SELECTION_CHANGABLE;
          }
        }
      }
      if (index <= Nore.ALL_SELECTION) {
        return index;
      }
      return hitIndex;
    };
    Window_BattleStatus2.prototype.hitTest = function (x, y) {
      if (this.innerRect.contains(x, y)) {
        var cx = this.origin.x + x - this.padding;
        var cy = this.origin.y + y - this.padding;
        var topIndex = this.topIndex();
        var index = 0;
        for (var _i = 0, _a = this.allWindows(); _i < _a.length; _i++) {
          var w = _a[_i];
          if (w.isHit(cx, cy)) {
            return index;
          }
          index++;
        }
      }
      return -1;
    };
    return Window_BattleStatus2;
  })(Window_BattleStatus);
  Nore.Window_BattleStatus2 = Window_BattleStatus2;
  var Window_BattleActor2 = /** @class */ (function (_super) {
    __extends(Window_BattleActor2, _super);
    function Window_BattleActor2() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Window_BattleActor2.prototype.show = function () {
      _super.prototype.show.call(this);
      for (var _i = 0, _a = this.allWindows(); _i < _a.length; _i++) {
        var w = _a[_i];
        w.show();
      }
    };
    Window_BattleActor2.prototype.hide = function () {};
    return Window_BattleActor2;
  })(Window_BattleStatus2);
  Nore.Window_BattleActor2 = Window_BattleActor2;
  var Sprite_Heart = /** @class */ (function (_super) {
    __extends(Sprite_Heart, _super);
    function Sprite_Heart() {
      var _this = _super.call(this) || this;
      _this.createBitmap();
      return _this;
    }
    Sprite_Heart.prototype.createBitmap = function () {
      var width = this.bitmapWidth();
      var height = this.bitmapHeight();
      this.bitmap = new Bitmap(width, height);
    };
    Sprite_Heart.prototype.setup = function (battler) {
      this._battler = battler;
      this.updateBitmap();
    };
    Sprite_Heart.prototype.update = function () {
      _super.prototype.update.call(this);
      this.updateBitmap();
    };
    Sprite_Heart.prototype.updateBitmap = function () {
      var icon = this.icon();
      if (icon !== this._icon) {
        this._icon = icon;
        this.redraw();
      }
    };
    Sprite_Heart.prototype.icon = function () {
      if (!this._battler) {
        return 0;
      }
      if (!this._battler.canMove()) {
        return 0;
      }
      if (this._battler.isActionFinished()) {
        return 0;
      }
      if (this._battler.isSkipped()) {
        return 405;
      }
      return 404;
    };
    Sprite_Heart.prototype.textColor = function () {
      return ColorManager.textColor(0);
    };
    Sprite_Heart.prototype.redraw = function () {
      var icon = this.icon();
      var width = this.bitmapWidth();
      var height = this.bitmapHeight();
      this.setupFont();
      this.bitmap.clear();
      if (icon == 0) {
        return;
      }
      this.drawIcon(icon, 0, 0);
    };
    Sprite_Heart.prototype.setupFont = function () {
      this.bitmap.fontFace = this.fontFace();
      this.bitmap.fontSize = this.fontSize();
      this.bitmap.textColor = this.textColor();
      this.bitmap.outlineColor = this.outlineColor();
      this.bitmap.outlineWidth = this.outlineWidth();
    };
    Sprite_Heart.prototype.drawIcon = function (iconIndex, x, y) {
      var bitmap = ImageManager.loadSystem("IconSet");
      var pw = ImageManager.iconWidth;
      var ph = ImageManager.iconHeight;
      var sx = (iconIndex % 16) * pw;
      var sy = Math.floor(iconIndex / 16) * ph;
      this.bitmap.blt(bitmap, sx, sy, pw, ph, x, y);
    };
    Sprite_Heart.prototype.outlineColor = function () {
      return ColorManager.outlineColor();
    };
    Sprite_Heart.prototype.outlineWidth = function () {
      return 3;
    };
    Sprite_Heart.prototype.bitmapWidth = function () {
      return 58;
    };
    Sprite_Heart.prototype.bitmapHeight = function () {
      return 54;
    };
    Sprite_Heart.prototype.fontFace = function () {
      return $gameSystem.mainFontFace();
    };
    Sprite_Heart.prototype.fontSize = function () {
      return 16;
    };
    return Sprite_Heart;
  })(Sprite_Clickable);
  var Sprite_Status = /** @class */ (function (_super) {
    __extends(Sprite_Status, _super);
    function Sprite_Status() {
      var _this = _super.call(this) || this;
      _this._valueW = 45;
      _this._valueY = 5;
      _this.createBitmap();
      return _this;
    }
    Sprite_Status.prototype.createBitmap = function () {
      var width = this.bitmapWidth();
      var height = this.bitmapHeight();
      this.bitmap = new Bitmap(width, height);
    };
    Sprite_Status.prototype.setup = function (battler) {
      this._battler = battler;
      this.updateBitmap();
    };
    Sprite_Status.prototype.update = function () {
      _super.prototype.update.call(this);
      if (this.isChanged()) {
        this.updateBitmap();
      }
    };
    Sprite_Status.prototype.isChanged = function () {
      if (this._battler.atkUp() != this._atk) {
        return true;
      }
      if (this._battler.battleDef() != this._def) {
        return true;
      }
      return false;
    };
    Sprite_Status.prototype.updateBitmap = function () {
      this.redraw();
    };
    Sprite_Status.prototype.textColor = function () {
      return ColorManager.textColor(0);
    };
    Sprite_Status.prototype.redraw = function () {
      this.setupFont();
      this.bitmap.clear();
      this.drawAtk(0);
      this.drawDef(50);
    };
    Sprite_Status.prototype.setupFont = function () {
      this.bitmap.fontFace = this.fontFace();
      this.bitmap.fontSize = this.fontSize();
      this.bitmap.textColor = this.textColor();
      this.bitmap.outlineColor = this.outlineColor();
      this.bitmap.outlineWidth = this.outlineWidth();
    };
    Sprite_Status.prototype.drawAtk = function (x) {
      this._atk = this._battler.atkUp();
      if (this._atk == 0) {
        return;
      }
      this.drawIcon(2210, x, 3);
      this.drawValue(this._atk, x);
    };
    Sprite_Status.prototype.drawMat = function (x) {
      this._mat = this._battler.matUp();
      if (this._mat == 0) {
        return;
      }
      this.drawIcon(2210, x, 0);
      this.drawValue(this._mat, x);
    };
    Sprite_Status.prototype.drawDef = function (x) {
      this._def = this._battler.battleDef();
      if (this._def == 0) {
        return;
      }
      this.drawIcon(2208, x, 0);
      this.drawValue(this._def, x);
    };
    Sprite_Status.prototype.drawValue = function (value, x) {
      var text;
      if (value > 0) {
        text = value;
        //text = '+' + value;
      } else {
        text = value;
      }
      this.bitmap.drawText(
        text,
        x - 18,
        this._valueY + 12,
        this._valueW,
        this.lineHeight(),
        "right"
      );
    };
    Sprite_Status.prototype.outlineColor = function () {
      return ColorManager.outlineColor();
    };
    Sprite_Status.prototype.outlineWidth = function () {
      return 3;
    };
    Sprite_Status.prototype.bitmapWidth = function () {
      return 108;
    };
    Sprite_Status.prototype.bitmapHeight = function () {
      return 50;
    };
    Sprite_Status.prototype.fontFace = function () {
      return $gameSystem.mainFontFace();
    };
    Sprite_Status.prototype.fontSize = function () {
      return 16;
    };
    return Sprite_Status;
  })(Sprite_Clickable);
  var Sprite_BattlerDamage = /** @class */ (function (_super) {
    __extends(Sprite_BattlerDamage, _super);
    function Sprite_BattlerDamage(actor) {
      var _this = _super.call(this) || this;
      _this._lastShieldDamage = 0;
      _this._lastHpDamage = 0;
      _this._lastStates = [];
      _this._actor = actor;
      _this.bitmap = new Bitmap(225, 45);
      _this.x = 14;
      _this.y = -44;
      return _this;
    }
    Sprite_BattlerDamage.prototype.refresh = function () {
      this.bitmap.clear();
      var xx = 0;
      this.bitmap.textColor = ColorManager.normalColor();
      if (this._actor.isDead()) {
        return;
      }
      if (this._lastShieldDamage > 0) {
        this.drawIcon(2227, xx, 10);
        this.bitmap.drawText(
          this._lastShieldDamage + "",
          xx + 30,
          11,
          50,
          30,
          "left"
        );
      }
      if (this._lastHpDamage > 0) {
        xx += 58;
        this.drawIcon(2209, xx, 10);
        this.bitmap.textColor = ColorManager.deathColor();
        this.bitmap.drawText(
          this._lastHpDamage + "",
          xx + 30,
          11,
          50,
          30,
          "left"
        );
        if (this._lastHpDamage >= this._actor.hp) {
          xx += 58;
          this.drawIcon(2215, xx, 10);
          xx -= 20;
        }
      }
      if (this._lastStates.length > 0) {
        xx += 65;
        for (var _i = 0, _a = this._lastStates; _i < _a.length; _i++) {
          var state = _a[_i];
          this.drawIconMini(state.iconIndex(), xx, 13);
          if (state.value() > 0) {
            this.bitmap.textColor = ColorManager.normalColor();
            this.bitmap.drawText(
              state.value() + "",
              xx + 26,
              11,
              50,
              30,
              "left"
            );
          }
          xx += 60;
        }
      }
    };
    Sprite_BattlerDamage.prototype.update = function () {
      _super.prototype.update.call(this);
      var forecast = $gameTroop.getDamageForecast(this._actor.actorId());
      var changed = false;
      if (this._lastShieldDamage != forecast.getShieldDamage()) {
        this._lastShieldDamage = forecast.getShieldDamage();
        changed = true;
      }
      if (this._lastHpDamage != forecast.getHpDamage()) {
        this._lastHpDamage = forecast.getHpDamage();
        changed = true;
      }
      if (this._lastHp != this._actor.hp) {
        this._lastHp = this._actor.hp;
        changed = true;
      }
      var list = forecast.getStateList();
      if (list.length != this._lastStates.length) {
        changed = true;
      }
      this._lastStates = list;
      if (changed) {
        this.refresh();
      }
    };
    return Sprite_BattlerDamage;
  })(Sprite_Clickable);
  var FRONT_Y = 45;
  var BACK_Y = 70;
  var FORMATION_CHANGE_DURATION = 30;
  var Sprite_SelectionCursor = /** @class */ (function (_super) {
    __extends(Sprite_SelectionCursor, _super);
    function Sprite_SelectionCursor(y) {
      var _this = _super.call(this) || this;
      _this._index = 0;
      _this.bitmap = ImageManager.loadSystem("arrow");
      _this._initialY = y;
      return _this;
    }
    Sprite_SelectionCursor.prototype.update = function () {
      _super.prototype.update.call(this);
      var max = 10;
      this._index++;
      if (this._index >= max) {
        this._index = 0;
        this._reverse = !this._reverse;
      }
      if (this._reverse) {
        this.y = this._initialY + (max - this._index);
      } else {
        this.y = this._initialY + this._index;
      }
    };
    return Sprite_SelectionCursor;
  })(Sprite);
  var Window_Battler = /** @class */ (function (_super) {
    __extends(Window_Battler, _super);
    function Window_Battler(index, front, actor, offset) {
      var _this =
        _super.call(
          this,
          new Rectangle(
            index * getActorWindowWidth() + offset,
            front ? FRONT_Y : BACK_Y,
            getActorWindowWidth(),
            160
          )
        ) || this;
      _this._isCurrentActor = false;
      _this._index = index;
      _this._front = front;
      _this._actor = actor;
      _this._isWindow = false;
      _this.initDamage();
      _this.refresh();
      _this.initInfo();
      _this.initCharacter();
      _this.initSelectionCursor();
      return _this;
    }
    Window_Battler.prototype.initSelectionCursor = function () {
      this._cursor = new Sprite_SelectionCursor(-26);
      this._cursor.x = 100;
      var x = $gameParty.maxBattleMembers() == 6 ? 180 : 222;
      this._cursor.x = x - 22;
      this.addChild(this._cursor);
    };
    Window_Battler.prototype.initCharacter = function () {
      var cos = new CostumeSaver(this._actor.actorId());
      var x = $gameParty.maxBattleMembers() == 6 ? 180 : 222;
      var c = new Nore.Game_DungeonCharacter(cos, x, 75);
      this._dungeonCharacter = c;
      this._dungeonCharacter.setStepAnime(false);
      var sprite = new Sprite_ActorCharacter(c, cos);
      if ($gameParty.maxBattleMembers() == 6) {
        //return;
      }
      this.addChild(sprite);
    };
    Window_Battler.prototype.getInfoSprite = function () {
      return this._infoSprite;
    };
    Window_Battler.prototype.initInfo = function () {
      this._infoSprite = new Nore.Sprite_ActorInfo(this._actor);
      this._infoSprite.x = Math.max(this.x - getActorWindowWidth() / 2, 0);
      if (this._infoSprite.x + this._infoSprite.width > Graphics.width) {
        this._infoSprite.x = Graphics.width - this._infoSprite.width + 10;
      }
      this._infoSprite.y = 500;
    };
    Window_Battler.prototype.initDamage = function () {
      this._damageSprite = new Sprite_BattlerDamage(this._actor);
      this.addChild(this._damageSprite);
    };
    Window_Battler.prototype.actor = function () {
      return this._actor;
    };
    Window_Battler.prototype.update = function () {
      _super.prototype.update.call(this);
      this.updateActor();
      this.updateFormation();
      this.updateReact();
      this.updateCharacter();
      this.updateSelectionCursor();
    };
    Window_Battler.prototype.updateSelectionCursor = function () {
      this._cursor.visible = this._inSelection && this.active;
    };
    Window_Battler.prototype.updateCharacter = function () {
      if (!this._dungeonCharacter) {
        return;
      }
      this._dungeonCharacter.update();
    };
    /**
     *
     * 再行動後のウィンドウフレームチェック
     */
    Window_Battler.prototype.updateReact = function () {
      if (!this._cantMove) {
        return;
      }
      if (this._cantMove && !this.isActorCantMove()) {
        this.updateFrameWindow();
      }
    };
    Window_Battler.prototype.updateFormation = function () {
      if (this._toBackIndex > 0) {
        this._toBackIndex--;
        var rate =
          (FORMATION_CHANGE_DURATION - this._toBackIndex) /
          FORMATION_CHANGE_DURATION;
        this.y = (BACK_Y - FRONT_Y) * rate + FRONT_Y;
        if (this._toBackIndex == 0) {
          this._toBack = false;
        }
      }
      if (this._front && this._actor.isToBack()) {
        this._front = false;
        this._toBack = true;
        this._toBackIndex = FORMATION_CHANGE_DURATION;
      }
      if (this._toFrontIndex > 0) {
        this._toFrontIndex--;
        var rate =
          (FORMATION_CHANGE_DURATION - this._toFrontIndex) /
          FORMATION_CHANGE_DURATION;
        this.y = BACK_Y - (BACK_Y - FRONT_Y) * rate;
        if (this._toFrontIndex == 0) {
          this._toBack = false;
        }
      }
      if (!this._front && this._actor.isToFront()) {
        this._front = true;
        this._toFront = true;
        this._toFrontIndex = FORMATION_CHANGE_DURATION;
      }
    };
    Window_Battler.prototype.updateActor = function () {
      var actor = BattleManager.actor();
      if (actor) {
        this.setCurrentActor(this._actor.actorId() == actor.actorId());
      } else {
        this.setCurrentActor(false);
      }
    };
    Window_Battler.prototype.setCurrentActor = function (b) {
      if (this._isCurrentActor == b) {
        return;
      }
      this._isCurrentActor = b;
      this.refresh();
    };
    Window_Battler.prototype.isCurrentActor = function () {
      return this._isCurrentActor;
    };
    Window_Battler.prototype.refresh = function () {
      _super.prototype.refresh.call(this);
      this.placeActorName(this._actor, 6, 6);
      this.placeBasicGauges(this._actor, 0, 65);
      this.placeStateIcon(this._actor, 20, 38);
      this.placeBuffIcon(this._actor, 100, 0);
      //this.placeHeartIcon(this._actor, 122, 1);
      //this.placeStatusIcon(this._actor, 114, 1);
      if (this._isCurrentActor) {
        this.active = true;
        //this._refreshBack();
      } else {
        this.active = false;
      }
      this.updateFrameWindow();
      //this._damageSprite.refresh();
    };
    Window_Battler.prototype.placeBuffIcon = function (actor, x, y) {
      var key = "actor%1-buffIcon".format(actor.actorId());
      var sprite = this.createInnerSprite(key, Nore.Sprite_BuffIcon);
      sprite.setup(actor);
      sprite.move(x, y);
      sprite.show();
    };
    Window_Battler.prototype.placeHeartIcon = function (actor, x, y) {
      var key = "actor%1-heart".format(actor.actorId());
      var sprite = this.createInnerSprite(key, Sprite_Heart);
      sprite.setup(actor);
      sprite.move(x, y);
      sprite.hide();
    };
    Window_Battler.prototype.placeStatusIcon = function (actor, x, y) {
      var key = "actor%1-status".format(actor.actorId());
      var sprite = this.createInnerSprite(key, Sprite_Status);
      sprite.setup(actor);
      sprite.move(x, y);
      sprite.show();
    };
    Window_Battler.prototype.activate = function () {
      this.active = true;
      this.updateFrameWindow();
    };
    Window_Battler.prototype.deactivate = function () {
      this.active = false;
      this.updateFrameWindow();
    };
    Window_Battler.prototype.startSelection = function () {
      this._inSelection = true;
      this._actor.deselect();
      this.updateFrameWindow();
    };
    Window_Battler.prototype.endSelection = function () {
      this._inSelection = false;
      this.updateFrameWindow();
    };
    Window_Battler.prototype.updateFrameWindow = function () {
      this._cantMove = false;
      var stepAnime = false;
      if (this._inSelection) {
        if (this.active) {
          this._windowskin = ImageManager.loadSystem("Window2");
        } else {
          this._windowskin = ImageManager.loadSystem("Window");
        }
      } else {
        if (this.isCurrentActor()) {
          this._windowskin = ImageManager.loadSystem("Window5");
          stepAnime = true;
        } else if (this.isActorCantMove()) {
          this._windowskin = ImageManager.loadSystem("Window4");
          this._cantMove = true;
        } else {
          this._windowskin = ImageManager.loadSystem("Window");
        }
      }
      this._refreshFrame();
      if (this._dungeonCharacter) {
        this._dungeonCharacter.setMonoTone(this._cantMove);
        this._dungeonCharacter.setStepAnime(stepAnime);
      }
      if (this._actor) {
        var key = "actor%1-name".format(this._actor.actorId());
        if (this._additionalSprites[key]) {
          this._additionalSprites[key].setEnabled(!this._cantMove);
        }
      }
    };
    Window_Battler.prototype.isActorCantMove = function () {
      if (!this._actor) {
        return false;
      }
      if (this._actor.isActionFinished()) {
        return true;
      }
      if (!this._actor.canMove()) {
        return true;
      }
      return false;
    };
    Window_Battler.prototype.isFront = function () {
      return this._front;
    };
    Window_Battler.prototype.isBack = function () {
      return !this.isFront();
    };
    Window_Battler.prototype.isHit = function (x, y) {
      if (this.x <= x && this.x + this.width >= x) {
        return true;
      }
      return false;
    };
    return Window_Battler;
  })(Window_StatusBase);
  var Window_BattleEnemy2 = /** @class */ (function (_super) {
    __extends(Window_BattleEnemy2, _super);
    function Window_BattleEnemy2(r, spriteset) {
      var _this = _super.call(this, r) || this;
      _this.backOpacity = 0;
      _this.frameVisible = false;
      _this._spriteset = spriteset;
      return _this;
    }
    Window_BattleEnemy2.prototype.maxCols = function () {
      return 6;
    };
    Window_BattleEnemy2.prototype.select = function (index) {
      $gameTroop.clearForecast();
      Window_Selectable.prototype.select.call(this, index);
      this.updateHelp();
      if (index == Nore.NO_SELECTION) {
        return;
      }
      this.forecast();
    };
    Window_BattleEnemy2.prototype.forecast = function () {
      var actor = BattleManager.actor();
      var action = BattleManager.inputtingAction();
      if (!actor) {
        return;
      }
      $gameTroop.clearSelection();
      for (var _i = 0, _a = this.selectedEnemyList(); _i < _a.length; _i++) {
        var enemy = _a[_i];
        enemy.select();
        enemy.setDirty();
        if (!action || !action.item()) {
          continue;
        }
        var s = this._spriteset.findEnemySprite(enemy);
        s.targetSprite().showForcast(actor, action);
      }
    };
    Window_BattleEnemy2.prototype.updateHelp = function () {
      if (!this._helpWindow) {
        return;
      }
      /*if ($gameTemp.inInfo) {
                return;
            }*/
      this._helpWindow.setItem(this.enemy());
      this._helpWindow.show();
    };
    Window_BattleEnemy2.prototype.activate = function () {
      //p('activate')
      _super.prototype.activate.call(this);
    };
    Window_BattleEnemy2.prototype.deactivate = function () {
      //p('deactivate')
      Window_Scrollable.prototype.deactivate.call(this);
      //this.reselect();
      $gameTroop.clearSelection();
    };
    Window_BattleEnemy2.prototype.selectedEnemyList = function () {
      switch (this.index()) {
        case Nore.FRONT_LINE_SELECTION:
        case Nore.FRONT_LINE_SELECTION_CHANGABLE:
          return $gameTroop.frontMembers();
        case Nore.BACK_LINE_SELECTION:
        case Nore.BACK_LINE_SELECTION_CHANGABLE:
          return $gameTroop.backMembers();
        case Nore.LINE_SELECTION:
        case Nore.ALL_SELECTION:
        case Nore.RANDOM_SELECTION:
          return $gameTroop.aliveMembers();
        case Nore.AIMED_SELECTION:
          return this.selectAimedTarget(1);
      }
      return [this.enemy()];
    };
    Window_BattleEnemy2.prototype.decideEnemyList = function (action) {
      if (action.isForRandom()) {
        return this.selectRandomTarget(action);
      }
      return this.selectedEnemyList();
    };
    Window_BattleEnemy2.prototype.selectRandomTarget = function (action) {
      var count = action.numTargets();
      var candidates = $gameTroop.aliveMembers();
      var targets = [];
      if ($gameTroop.isProvoked()) {
        var target = null;
        for (var _i = 0, _a = $gameTroop.aliveMembers(); _i < _a.length; _i++) {
          var e = _a[_i];
          if (e.hasStateMeta(StateMeta.PROVOKE)) {
            target = e;
            break;
          }
        }
        for (var i = 0; i < count; i++) {
          targets.push(target);
        }
      } else if ($gameTroop.isAimed()) {
        return this.selectAimedTarget(count);
      } else {
        for (var i = 0; i < count; i++) {
          var dice = Math.randomInt(candidates.length);
          targets.push(candidates[dice]);
        }
      }
      return targets;
    };
    Window_BattleEnemy2.prototype.selectAimedTarget = function (count) {
      var targets = [];
      var target = null;
      for (var _i = 0, _a = $gameTroop.aliveMembers(); _i < _a.length; _i++) {
        var e = _a[_i];
        if (e.hasStateMeta(StateMeta.aiming)) {
          target = e;
          break;
        }
      }
      for (var i = 0; i < count; i++) {
        targets.push(target);
      }
      return targets;
    };
    Window_BattleEnemy2.prototype.isProvoked = function () {
      if ($gameTemp.inInfo) {
        return false;
      }
      return $gameTroop.isProvoked();
    };
    Window_BattleEnemy2.prototype.isAimed = function () {
      if ($gameTemp.inInfo) {
        return false;
      }
      if (this.index() != Nore.AIMED_SELECTION) {
        return false;
      }
      return $gameTroop.isAimed();
    };
    Window_BattleEnemy2.prototype.cursorDown = function (wrap) {
      if ($gameTemp.inInfo) {
        this.callHandler("onUpDown");
        return;
      }
      if (this.isProvoked()) {
        return;
      }
      if (this.isAimed()) {
        return;
      }
      if (this.changeLine()) {
        return;
      }
      _super.prototype.cursorDown.call(this, wrap);
    };
    Window_BattleEnemy2.prototype.changeLine = function () {
      if (
        this.index() == Nore.ALL_SELECTION ||
        this.index() == Nore.RANDOM_SELECTION
      ) {
        return true;
      }
      if (this.index() == Nore.LINE_SELECTION) {
        return true;
      }
      if (this.index() == Nore.FRONT_LINE_SELECTION) {
        return true;
      }
      if (this.index() == Nore.BACK_LINE_SELECTION) {
        return true;
      }
      if (this.index() == Nore.FRONT_LINE_SELECTION_CHANGABLE) {
        if ($gameTroop.backMembers().length > 0) {
          this.select(Nore.BACK_LINE_SELECTION_CHANGABLE);
          return true;
        }
        return true;
      }
      if (this.index() == Nore.BACK_LINE_SELECTION_CHANGABLE) {
        this.select(Nore.FRONT_LINE_SELECTION_CHANGABLE);
        return true;
      }
      return false;
    };
    Window_BattleEnemy2.prototype.cursorUp = function (wrap) {
      if ($gameTemp.inInfo) {
        this.callHandler("onUpDown");
        return;
      }
      if (this.isProvoked()) {
        return;
      }
      if (this.isAimed()) {
        return;
      }
      if (this.changeLine()) {
        return;
      }
      _super.prototype.cursorUp.call(this, wrap);
    };
    Window_BattleEnemy2.prototype.cursorRight = function (wrap) {
      if (this.isProvoked()) {
        return;
      }
      if (this.isAimed()) {
        return;
      }
      if (this.changeLine()) {
        return;
      }
      _super.prototype.cursorRight.call(this, wrap);
    };
    Window_BattleEnemy2.prototype.cursorLeft = function (wrap) {
      if (this.isProvoked()) {
        return;
      }
      if (this.isAimed()) {
        return;
      }
      if (this.changeLine()) {
        return;
      }
      _super.prototype.cursorLeft.call(this, wrap);
    };
    Window_BattleEnemy2.prototype.processTouch = function () {
      Window_Selectable.prototype.processTouch.call(this);
      if (this.isOpenAndActive()) {
        var target = $gameTemp.touchTarget();
        if (target) {
          var lastIndex = this.index();
          if (
            lastIndex == Nore.ALL_SELECTION ||
            lastIndex == Nore.RANDOM_SELECTION
          ) {
            if ($gameTemp.touchState() === "click") {
              this.processOk();
            }
            $gameTemp.clearTouchState();
            return;
          }
          if (this._enemies.includes(target)) {
            if (lastIndex == Nore.FRONT_LINE_SELECTION) {
              return;
            }
            if (lastIndex == Nore.FRONT_LINE_SELECTION_CHANGABLE) {
              if ($gameTroop.backMembers().includes(target)) {
                this.select(Nore.BACK_LINE_SELECTION_CHANGABLE);
              }
              return;
            }
            if (lastIndex == Nore.BACK_LINE_SELECTION_CHANGABLE) {
              if ($gameTroop.frontMembers().includes(target)) {
                this.select(Nore.FRONT_LINE_SELECTION_CHANGABLE);
              }
              return;
            }
            this.select(this._enemies.indexOf(target));
            if ($gameTemp.touchState() === "click") {
              this.processOk();
            }
          }
          $gameTemp.clearTouchState();
        }
      }
    };
    Window_BattleEnemy2.prototype.onTouchSelect = function (trigger) {
      this._doubleTouch = false;
      if (this.isCursorMovable()) {
        var lastIndex = this.index();
        var target = $gameTemp.touchTarget();
        if (target) {
          if (target === this._enemies[this.index()]) {
            this._doubleTouch = true;
          } else if (
            lastIndex == Nore.FRONT_LINE_SELECTION ||
            lastIndex == Nore.FRONT_LINE_SELECTION_CHANGABLE
          ) {
            if ($gameTroop.frontMembers().includes(target)) {
              this._doubleTouch = true;
              if (trigger) {
                this.processOk();
              }
            }
          } else if (
            lastIndex == Nore.BACK_LINE_SELECTION ||
            lastIndex == Nore.BACK_LINE_SELECTION_CHANGABLE
          ) {
            if ($gameTroop.backMembers().includes(target)) {
              this._doubleTouch = true;
              if (trigger) {
                this.processOk();
              }
            }
          }
        }
        //this.selectByTouch(target);
        if (trigger && this.index() !== lastIndex) {
          this.playCursorSound();
        }
      }
    };
    Window_BattleEnemy2.prototype.selectByTouch = function (target) {
      var lastIndex = this.index();
      if (
        lastIndex == Nore.ALL_SELECTION ||
        lastIndex == Nore.RANDOM_SELECTION
      ) {
        this._doubleTouch = true;
      }
      if (this.index() == Nore.FRONT_LINE_SELECTION) {
        this._doubleTouch = true;
      }
      if (this.index() == Nore.FRONT_LINE_SELECTION_CHANGABLE) {
        /*if ($gameTroop.backMembers().length > 0) {
                    this.select(BACK_LINE_SELECTION_CHANGABLE);
                    return true;
                }
                return true;*/
      }
    };
    return Window_BattleEnemy2;
  })(Window_BattleEnemy);
  Nore.Window_BattleEnemy2 = Window_BattleEnemy2;
  Sprite_Name.prototype.update = function () {
    Sprite.prototype.update.call(this);
    this._wait = this._wait || 10;
    this._wait--;
    if (this._wait <= 0) {
      this.updateBitmap();
      this._wait = 10;
    }
  };
  Sprite_Name.prototype.bitmapWidth = function () {
    return 92;
  };
  Sprite_Name.prototype.setEnabled = function (b) {
    if (this._enabled == b) {
      return;
    }
    this._enabled = b;
    this.redraw();
  };
  var _Sprite_Name_prototype_textColor = Sprite_Name.prototype.textColor;
  Sprite_Name.prototype.textColor = function () {
    if (!this._enabled) {
      return ColorManager.stunBackColor();
    }
    return _Sprite_Name_prototype_textColor.call(this);
  };
})(Nore || (Nore = {}));
