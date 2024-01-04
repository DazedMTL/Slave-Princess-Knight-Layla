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
  var Scene_HistoryList = /** @class */ (function (_super) {
    __extends(Scene_HistoryList, _super);
    function Scene_HistoryList() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Scene_HistoryList.prototype.create = function () {
      Scene_MenuBase.prototype.create.call(this);
      this.createStatusWindow();
      this.createHistoryWindow();
      this.createHelpWindow();
      this.onChange();
      //this.createToday();
    };
    Scene_HistoryList.prototype.createHelpWindow = function () {
      var rect = this.helpWindowRect();
      this._helpWindow = new Sprite_HelpBig(rect);
      this.addWindow(this._helpWindow);
    };
    Scene_HistoryList.prototype.helpWindowRect = function () {
      var rect = new Rectangle(0, 0, 0, 0);
      rect.x = 590;
      rect.y = 82;
      rect.width = 670;
      rect.height = 112;
      return rect;
    };
    Scene_HistoryList.prototype.createToday = function () {
      this._sprite = new Sprite();
      this._sprite.bitmap = new Bitmap(200, 48);
      var day = $gameSystem.day();
      this._sprite.bitmap.drawText(
        TextManager.date.format(day),
        20,
        0,
        100,
        48
      );
      var text;
      this._sprite.bitmap.drawText(text, 90, 0, 100, 48);
      this.addChild(this._sprite);
    };
    Scene_HistoryList.prototype.createHistoryWindow = function () {
      var actorId = $gameParty.menuActor().actorId();
      this._historyWindow = new Window_HistoryList(actorId);
      this._historyWindow.setHandler("ok", this.onOk.bind(this));
      this._historyWindow.setHandler("cancel", this.onCancel.bind(this));
      this._historyWindow.setHandler("change", this.onChange.bind(this));
      this._historyWindow.setHandler("pageup", this.onPageup.bind(this));
      this._historyWindow.setHandler("pagedown", this.onPagedown.bind(this));
      //this._historyWindow.activate();
      this.addChild(this._historyWindow);
    };
    Scene_HistoryList.prototype.onPageup = function () {
      $gameParty.menuActor().setCacheChanged();
      var actorId = $gameParty.menuActor().actorId();
      var actor = $gameParty.previousActor(actorId);
      $gameParty.setMenuActor(actor);
      SoundManager.playCursor();
      this._historyWindow.setup(actor.actorId());
      this._historyWindow.activate();
      $gameActors.actor(actorId).setCacheChanged();
    };
    Scene_HistoryList.prototype.onPagedown = function () {
      $gameParty.menuActor().setCacheChanged();
      var actorId = $gameParty.menuActor().actorId();
      var actor = $gameParty.nextActor(actorId);
      $gameParty.setMenuActor(actor);
      SoundManager.playCursor();
      this._historyWindow.setup(actor.actorId());
      this._historyWindow.activate();
      $gameActors.actor(actorId).setCacheChanged();
    };
    Scene_HistoryList.prototype.createStatusWindow = function () {
      this._statusWindow = new Window_EroStatusMini(
        $gameParty.menuActor().getLastHistory()
      );
      //this._statusWindow.activate();
      this.addWindow(this._statusWindow);
      /*
                    this._acceWindow = new Window_EroStatusAcceMini($gameParty.menuActor().getLastHistory());
                    this._acceWindow.setHandler('cancel', this.onCancelAcce.bind(this));
                    this._acceWindow.setHandler('change', this.onChangeAcce.bind(this));
                    //this._acceWindow.activate();
                    this.addWindow(this._acceWindow);
                    this._acceWindow.hide();
            */
    };
    Scene_HistoryList.prototype.onChangeAcce = function () {
      var item = this._acceWindow.item();
      this._helpWindow.setItem(item);
      this._acceWindow.updateEroItem();
    };
    Scene_HistoryList.prototype.onChange = function () {
      var item = this._historyWindow.item();
      var isLatest = this._historyWindow.isLatest();
      this._statusWindow.setup(item, isLatest);
    };
    Scene_HistoryList.prototype.start = function () {
      _super.prototype.start.call(this);
      this._historyWindow.refresh();
    };
    Scene_HistoryList.prototype.onCancel = function () {
      $gameTemp.history = null;
      $gameTemp.eroStatus = null;
      $gameParty.menuActor().setCacheChanged();
      $gameTemp.costume = null;
      $gameTemp.isCancelMenu = true;
      this.popScene();
    };
    Scene_HistoryList.prototype.onCancelAcce = function () {
      this._statusWindow.show();
      this._acceWindow.hide();
      this._historyWindow.activate();
      this._helpWindow.visible = false;
    };
    Scene_HistoryList.prototype.onOk = function () {
      this._historyWindow.activate();
      return;
      var item = this._historyWindow.item();
      if (!item) {
        SoundManager.playBuzzer();
        this._historyWindow.activate();
        return;
      }
      if (!this._acceWindow.visible) {
        this._acceWindow.setup(item);
        this._acceWindow.show();
        this._acceWindow.activate();
        this._acceWindow.select(0);
        this._statusWindow.hide();
        this._helpWindow.visible = true;
      } else {
        this._statusWindow.setup(item);
        this._statusWindow.show();
        this._acceWindow.hide();
        this._helpWindow.visible = false;
        this._historyWindow.activate();
      }
    };
    return Scene_HistoryList;
  })(Scene_MenuBase);
  Nore.Scene_HistoryList = Scene_HistoryList;
  var Window_HistoryList = /** @class */ (function (_super) {
    __extends(Window_HistoryList, _super);
    function Window_HistoryList(actorId) {
      var _this =
        _super.call(this, new Rectangle(0, 0, 300, Graphics.height)) || this;
      _this.setup(actorId);
      return _this;
    }
    Window_HistoryList.prototype.setup = function (actorId) {
      $gameTemp.lastHistoryIndex = null;
      this._actorId = actorId;
      this.makeList();
      this.loadEroList();
      this.selectInitialItem();
      this.refresh();
      this._ready = ImageManager.isReady();
    };
    Window_HistoryList.prototype.contentsWidth = function () {
      return 300;
    };
    Window_HistoryList.prototype.initialize = function (rect) {
      _super.prototype.initialize.call(this, rect);
      this.updateOrigin();
      //this.frameVisible = false;
      //this.backOpacity = 0;
      this._padding = 8;
    };
    Window_HistoryList.prototype.makeList = function () {
      this._historyManager = $gameSystem.historyManager();
      this._actorHistory = this._historyManager.getActorHistory(this._actorId);
      //p(this._actorHistory)
      this._historyList = [];
      for (
        var _i = 0, _a = this._actorHistory.getHistoryList();
        _i < _a.length;
        _i++
      ) {
        var h = _a[_i];
        if (h.isVisible()) {
          this._historyList.push(h);
        }
      }
      // 今日を入れる
      if (
        this._historyList[this._historyList.length - 1] !=
        this._actorHistory.lastHistory()
      ) {
        this._historyList.push(this._actorHistory.lastHistory());
      }
    };
    Window_HistoryList.prototype.selectInitialItem = function () {
      if ($gameTemp.lastHistoryIndex == null) {
        $gameTemp.lastHistoryIndex = this._historyList.length - 1;
      }
      this.select($gameTemp.lastHistoryIndex);
      this.activate();
      this._scrollY = this._scrollTargetY;
    };
    Window_HistoryList.prototype.loadEroList = function () {
      for (
        var _i = 0, _a = this._actorHistory.getHistoryList();
        _i < _a.length;
        _i++
      ) {
        var history = _a[_i];
        if (history.imageId() && history.imageId().length > 0) {
          ImageManager.loadEro(history.imageId());
        }
      }
    };
    Window_HistoryList.prototype.isLatest = function () {
      return this.index() == this.maxItems() - 1;
    };
    Window_HistoryList.prototype.maxItems = function () {
      return this._historyList.length;
    };
    Window_HistoryList.prototype.item = function () {
      return this._historyList[this.index()];
    };
    Window_HistoryList.prototype.currentDay = function () {
      //p(this._actorHistory.firstDay() )
      return /*this._actorHistory.firstDay() +*/ this.index() + 1;
    };
    Window_HistoryList.prototype.update = function () {
      _super.prototype.update.call(this);
      this.updateLoading();
    };
    Window_HistoryList.prototype.updateLoading = function () {
      if (this._ready) {
        return;
      }
      if (ImageManager.isReady()) {
        this._ready = true;
        this.refresh();
      }
    };
    Window_HistoryList.prototype.itemHeight = function () {
      return 82;
    };
    Window_HistoryList.prototype.maxCols = function () {
      return 1;
    };
    Window_HistoryList.prototype.refresh = function () {
      _super.prototype.refresh.call(this);
    };
    Window_HistoryList.prototype.drawAllItems = function () {
      this._windowContentsSprite.destroyAndRemoveChildren();
      this.changeOutlineColor(ColorManager.outlineColor());
      this.resetFontSettings();
      _super.prototype.drawAllItems.call(this);
    };
    Window_HistoryList.prototype.drawTitles = function () {
      for (var i = 0; i < 7; i++) {
        this.drawTitle(i);
      }
      this.changeOutlineColor(ColorManager.normalColor());
      this.drawRect(0, 37, this.width, 2);
    };
    Window_HistoryList.prototype.drawTitle = function (index) {
      var rect = this.itemRect(index);
      var icon = 0;
      switch (index) {
        case 0:
          icon = 390;
          break;
        case 1:
          icon = 391;
          break;
        case 2:
          icon = 384;
          break;
        case 3:
          icon = 387;
          break;
        case 4:
          icon = 389;
          break;
        case 5:
          icon = 633;
          break;
        case 6:
          icon = 388;
          break;
      }
      this.drawIcon(icon, rect.x + rect.width / 2, rect.y - 40);
    };
    Window_HistoryList.prototype.drawItemBackground = function (index) {};
    Window_HistoryList.prototype.drawItem = function (index) {
      this.drawCurrent(index);
      var history = this._historyList[index];
      //const history = this._actorHistory.findHistoryByDay(index + 1);
      if (!history) {
        console.error(
          this._actorHistory.firstDay() + index + "のhistoryがみつかりません"
        );
        return;
      }
      var rect = this.itemRect(index);
      //this.drawDay(index, history.day());
      this.contents.fontSize = 13;
      if (history.isNikubenki()) {
        this.changeTextColor(ColorManager.deathColor());
        this.drawText(TextManager.nikubenki, rect.x + 90, rect.y + 10, 120);
      }
      if (history.day() == $gameSystem.day()) {
        if (this._historyList.length - 1 == index) {
          this.changeTextColor(ColorManager.crisisColor());
          this.drawText(TextManager.today, rect.x + 7, rect.y + 10, 120);
        }
      }
      this.changeTextColor(ColorManager.normalColor());
      var lineIndex = 0;
      //p(history)
      var textList = history.textList(true);
      textList = textList.sort(function (a, b) {
        return b.priority() - a.priority();
      });
      for (var _i = 0, textList_1 = textList; _i < textList_1.length; _i++) {
        var text = textList_1[_i];
        var t = text.text();
        var yy = rect.y + 38 + lineIndex * this.lineHeight();
        this.drawText(t, rect.x + 7, yy, 150, "left");
        lineIndex++;
        if (lineIndex >= 2) {
          break;
        }
      }
      var rate = 3.4;
      if (history.imageId() && history.imageId().length > 0) {
        var bitmap = ImageManager.loadEro(history.imageId());
        this.contents.blt(
          bitmap,
          0,
          0,
          bitmap.width,
          bitmap.height,
          rect.x + 170,
          rect.y + 6,
          bitmap.width / rate,
          bitmap.height / rate
        );
      }
      this.changeOutlineColor(ColorManager.outlineColor());
      this.contents.fontSize = 12;
      // this.drawDebug(index, history);
    };
    Window_HistoryList.prototype.lineHeight = function () {
      return 21;
    };
    Window_HistoryList.prototype.drawDay = function (index, day) {
      var rect = this.itemRect(index);
      var baseTexture = Nore.getSystemBaseTexture("calendar_item");
      var texture = new PIXI.Texture(
        baseTexture,
        new PIXI.Rectangle(ConfigManager.en ? 200 : 0, 0, 50, 50)
      );
      var sprite = new PIXI.Sprite(texture);
      sprite.x = rect.x + 26;
      sprite.y = rect.y + 18;
      this._windowContentsSprite.addChild(sprite);
      this.contents.fontSize = 22;
      this.drawNumber(
        day,
        rect.x + 26 + (ConfigManager.en ? 50 : 0),
        rect.y - 4,
        20,
        "right",
        7
      );
      /*if (day == $gameSystem.day()) {
                this.drawText('本日',  rect.x + 96 + (ConfigManager.en ? 50 : 0), rect.y + 11, 70, 'right', 7);
            }*/
    };
    Window_HistoryList.prototype.drawCurrent = function (index) {
      return;
      if (index != this.index()) {
        return;
      }
      this._windowContentsBackSprite.removeChildren();
      var rect = this.itemRect(index);
      var baseTexture = Nore.getSystemBaseTexture("calendar_item");
      //var texture = new PIXI.Texture(baseTexture, new PIXI.Rectangle(0, 50, 200, 320));
      var texture = new PIXI.Texture(
        baseTexture,
        new PIXI.Rectangle(0, 364, 190, 316)
      );
      var sprite = new PIXI.Sprite(texture);
      sprite.x = -5;
      sprite.y = -0;
      //sprite.x = rect.x + 0;
      //sprite.y = rect.y + 0;
      this._windowContentsBackSprite.addChild(sprite);
    };
    /*_updateCursor() {
            this._windowContentsBackSprite.x = this._cursorRect.x;
            this._windowContentsBackSprite.y = this._cursorRect.y;
        }*/
    Window_HistoryList.prototype.drawNinshin = function (rect, history) {};
    Window_HistoryList.prototype.drawDebug = function (index, history) {
      var rect = this.itemRect(index);
      var hh = 130;
      var yy = rect.y + 72;
      var icon = 2145;
      var interval = 7;
      /*if (history.dayEro()) {
                for (let i = 0; i < history.dayEroHistory().nakadashi; i++) {
                    this.drawIcon(icon, rect.x + 10 + i * interval, yy + 5);
                    break;
                }
                //this.drawText(history.dayEroHistory().nakadashi, rect.x + 5, yy, 155, 'left');
    
    
            }
            if (history.nightEro()) {
                for (let i = 0; i < history.nightEroHistory().nakadashi; i++) {
                    this.drawIcon(icon, rect.x + 10 + i * interval, yy + hh);
                    break;
                }
                //this.drawText(history.nightEroHistory().nakadashi, rect.x + 5, yy + hh, 155, 'left');
    
            }
    */
    };
    return Window_HistoryList;
  })(Window_Selectable);
  var Window_EroStatusMini = /** @class */ (function (_super) {
    __extends(Window_EroStatusMini, _super);
    function Window_EroStatusMini(history) {
      return (
        _super.call(
          this,
          history,
          new Rectangle(299, -4, Graphics.width - 296, Graphics.height)
        ) || this
      );
    }
    /*refreshBg() {
            this.frameVisible = true;
            this.backOpacity = 190;
        }*/
    Window_EroStatusMini.prototype.createEroSprite = function () {
      _super.prototype.createEroSprite.call(this);
      this._tachieLayer.x -= 300;
    };
    Window_EroStatusMini.prototype.item = function () {
      return this.itemAt(this.index());
    };
    Window_EroStatusMini.prototype.itemAt = function (index) {
      return this._data[index];
    };
    Window_EroStatusMini.prototype.maxItems = function () {
      return this._data ? this._data.length : 1;
    };
    Window_EroStatusMini.prototype.makeItems = function () {
      this._data = [];
      var text = this._history.getMainText();
      if (text) {
        this._data.push(text);
      }
      for (
        var _i = 0, _a = this._history.getEventList();
        _i < _a.length;
        _i++
      ) {
        var e = _a[_i];
        for (var _b = 0, _c = e.getScheduleList(); _b < _c.length; _b++) {
          var s = _c[_b];
          if (s.text().length > 0) {
            this._data.push(s);
          }
        }
      }
    };
    Window_EroStatusMini.prototype.itemRect = function (index) {
      var rect = new Rectangle(0, 0, 0, 0);
      var maxCols = this.maxCols();
      rect.width = this.itemWidth();
      rect.height = this.itemHeight();
      rect.x =
        (index % maxCols) * (rect.width + this.spacing()) - this._scrollX + 310;
      rect.y = Math.floor(index / maxCols) * rect.height - this._scrollY + 114;
      return rect;
    };
    Window_EroStatusMini.prototype.maxCols = function () {
      return 1;
    };
    Window_EroStatusMini.prototype.drawItem = function (index) {
      var rect = this.itemRect(index);
      this.resetNormalFont();
      var item = this.itemAt(index);
      if (item) {
        this.drawText(item.text(), rect.x + 0, rect.y + 3, 596, "left");
      }
    };
    Window_EroStatusMini.prototype.drawHarami = function (x, y) {
      this.resetNormalFont();
      var yy = y;
      var xx = x;
      var text = TextManager.normal;
      if (this._history.isBote()) {
        text = TextManager.pregnant;
      }
      this.contents.fontSize = 24;
      //this.drawText(text, xx, yy, 100, 'left');
      if (!this._history.isBote()) {
        return;
      }
      this.contents.fontSize = 26;
      this.drawText(
        "ボテ腹成長" + this._history._boteGrowupValue,
        x + 150,
        y - 130
      );
    };
    Window_EroStatusMini.prototype.setupEroMarker = function () {
      if (this._eroMarker) {
        this._tachieLayer.removeChild(this._eroMarker);
      }
      var baseTexture = this.getMarkerBaseTexture();
      var texture = new PIXI.Texture(baseTexture);
      var sprite = new PIXI.Sprite(texture);
      sprite.x = 400;
      sprite.y = 400;
      sprite.anchor.x = 0.5;
      sprite.anchor.y = 0.5;
      this._eroMarker = sprite;
      this._tachieLayer.addChild(sprite);
    };
    Window_EroStatusMini.prototype.drawActor = function () {
      this._tachieLayer.destroyAndRemoveChildren();
      var a = $gameActors.actor(this._actorId);
      var actor = JsonEx.makeDeepCopy(a);
      if (this._history.day() == $gameSystem.day() && false) {
      } else {
        if (this._costume) {
          this._costume.restoreCostume(actor);
        }
        /*
                actor.setOuterBottomId('a');
                actor.setOuterTopId('a');
                actor.setOuterId('a');
                actor.setInnerTopId('a');
                actor.setInnerBottomId('a');
                actor.setArmId('a');
                actor.setLegId('a');
                */
        actor._cacheChanged = false;
        actor._boteId = this._history.costume().boteId();
        actor.setHoppeId(this._history.costume().hoppeId());
        actor.setDefaultHoppeId(this._history.costume().hoppeId());
      }
      actor.setCacheChanged();
      this.drawTachieActor(
        actor,
        this._tachieLayer,
        0,
        0,
        null,
        this._costume.faceId()
      );
    };
    Window_EroStatusMini.prototype.playCursorSound = function () {};
    Window_EroStatusMini.prototype._refreshCursor = function () {};
    return Window_EroStatusMini;
  })(Nore.Window_EroStatusBase);
  Nore.Window_EroStatusMini = Window_EroStatusMini;
  var TACHIE_OFFSET = -250;
  var Window_EroStatusAcceMini = /** @class */ (function (_super) {
    __extends(Window_EroStatusAcceMini, _super);
    function Window_EroStatusAcceMini(history) {
      return (
        _super.call(
          this,
          history,
          new Rectangle(300, -4, Graphics.width - 300, Graphics.height)
        ) || this
      );
    }
    Window_EroStatusAcceMini.prototype.drawManko = function () {};
    Window_EroStatusAcceMini.prototype.createEroSprite = function () {
      _super.prototype.createEroSprite.call(this);
      this._tachieLayer.x += TACHIE_OFFSET;
    };
    return Window_EroStatusAcceMini;
  })(Nore.Window_EroStatusAcce);
  Nore.Window_EroStatusAcceMini = Window_EroStatusAcceMini;
})(Nore || (Nore = {}));
