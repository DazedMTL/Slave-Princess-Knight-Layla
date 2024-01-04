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
 *
 * @command AddKeikenMachi
 * @text 経験人数追加(街)
 * @des 経験人数追加(街)
 * @arg num
 * @text 人数
 *
 * @command AddKeikenSakaba
 * @text 経験人数追加(酒場)
 * @des 経験人数追加(酒場)
 * @arg num
 * @text 人数
 *
 */
var Nore;
(function (Nore) {
  Nore.MANKO_GABA1 = 300;
  Nore.MANKO_GABA2 = 600;
  Nore.ANAL_GABA1 = 300;
  Nore.ANAL_GABA2 = 600;
  var MANKO_TEXT_WIDTH = 160;
  var MANKO_IMAGE_Y = 360;
  var pluginName = "Nore_EroStatus";
  PluginManager.registerCommand(pluginName, "AddKeikenMachi", function (args) {
    $gameSystem.getMainEro().keikenMachi += parseInt(args.num);
  });
  PluginManager.registerCommand(pluginName, "AddKeikenSakaba", function (args) {
    $gameSystem.getMainEro().keikenSakaba += parseInt(args.num);
  });
  PluginManager.registerCommand(pluginName, "onEroStatus", function (args) {
    var id = args.id;
    $gameSystem.getMainEro().keikenSakaba += parseInt(args.iod);
  });
  Nore.NINSHIN_SW = 837;
  Nore.NOT_NINSHIN_SW = 838;
  var Scene_EroStatus = /** @class */ (function (_super) {
    __extends(Scene_EroStatus, _super);
    function Scene_EroStatus() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Scene_EroStatus.prototype.create = function () {
      Scene_MenuBase.prototype.create.call(this);
      this.initDay();
      this.initCostume();
      this.createWindowLayer();
      this.createStatusWindow();
      this.createHelpWindow();
      this.createAllWindows();
      this.onChange();
    };
    Scene_EroStatus.prototype.createBackground = function () {};
    Scene_EroStatus.prototype.createButtons = function () {};
    Scene_EroStatus.prototype.initDay = function () {
      this._day = $gameTemp.history.day();
    };
    Scene_EroStatus.prototype.updateActor = function () {
      this._actor = $gameParty.menuActor();
    };
    Scene_EroStatus.prototype.initCostume = function () {
      if ($gameTemp.history.day() == $gameSystem.day()) {
        $gameTemp.history.saveCostume();
      }
    };
    Scene_EroStatus.prototype.createStatusWindow = function () {
      this._window = new Window_EroStatus($gameTemp.history);
      this._window.setHandler("change", this.onChange.bind(this));
      this._window.setHandler("pageup", this.onPageup.bind(this));
      this._window.setHandler("pagedown", this.onPagedown.bind(this));
      this.addWindow(this._window);
    };
    Scene_EroStatus.prototype.onChange = function () {};
    Scene_EroStatus.prototype.update = function () {
      _super.prototype.update.call(this);
      this.updateOk();
      this.updateCancel();
    };
    Scene_EroStatus.prototype.updateOk = function () {
      if (!$gameTemp.history) {
        return;
      }
      if (!this._window.active) {
        return;
      }
      if (Input.isTriggered("ok")) {
        SoundManager.playCursor();
        SceneManager.goto(Nore.Scene_EroStatusAcce);
      }
    };
    Scene_EroStatus.prototype.updateCancel = function () {
      if (Input.isTriggered("cancel") || TouchInput.isCancelled()) {
        SoundManager.playCancel();
        SceneManager.pop();
      }
    };
    Scene_EroStatus.prototype.createHelpWindow = function () {
      var rect = this.helpWindowRect();
      this._helpWindow = new Sprite_HelpBig(rect);
      this.addWindow(this._helpWindow);
    };
    Scene_EroStatus.prototype.helpWindowRect = function () {
      var rect = new Rectangle(0, 0, 0, 0);
      rect.x = 300;
      rect.y = 102;
      rect.width = 670;
      rect.height = 112;
      return rect;
    };
    Scene_EroStatus.prototype.onPageup = function () {
      var nextDay;
      if (this._day == 1) {
        nextDay = $gameSystem.day();
      } else {
        nextDay = this._day - 1;
      }
      this.gotoNextStatus(nextDay);
    };
    Scene_EroStatus.prototype.onPagedown = function () {
      var nextDay;
      if (this._day == $gameSystem.day()) {
        nextDay = 1;
      } else {
        nextDay = this._day + 1;
      }
      this.gotoNextStatus(nextDay);
    };
    Scene_EroStatus.prototype.gotoNextStatus = function (nextDay) {
      SoundManager.playCursor();
      var actorId = this._actor.actorId();
      var actorHistory = $gameSystem.historyManager().getActorHistory(actorId);
      var history = actorHistory.findHistoryByDay(nextDay);
      if (!history) {
        return;
      }
      $gameTemp.history = history;
      $gameTemp.costume = history.costume();
      SceneManager.goto(Scene_EroStatus);
    };
    return Scene_EroStatus;
  })(Nore.Scene_Talk);
  Nore.Scene_EroStatus = Scene_EroStatus;
  var Window_EroStatusBase = /** @class */ (function (_super) {
    __extends(Window_EroStatusBase, _super);
    function Window_EroStatusBase(history, rect) {
      var _this =
        _super.call(
          this,
          rect || new Rectangle(-4, -4, Graphics.width, Graphics.height)
        ) || this;
      _this._padding = 0;
      _this.createEroSprite();
      _this.addNinshinBar();
      _this.setup(history, true);
      _this.refreshBg();
      _this.makeItems();
      return _this;
    }
    Window_EroStatusBase.prototype.setup = function (history, isLatest) {
      if (!history) {
        return;
      }
      this._history = history;
      this.isLatest = isLatest;
      this._day = history.day();
      this._actorId = history.actorId();
      this._actorHistory = $gameSystem
        .historyManager()
        .getActorHistory(this._actorId);
      this._costume = history.costume();
      this.refresh();
      this.select(0);
      this.activate();
    };
    Window_EroStatusBase.prototype.addNinshinBar = function () {
      this._ninshinBar = new Nore.Sprite_NinshinBar();
      this._ninshinBar.setActorId(this._actorId);
      this._ninshinBar.x = 160;
      this._ninshinBar.y = 0;
      this.addChild(this._ninshinBar);
    };
    Window_EroStatusBase.prototype.actor = function () {
      return $gameActors.actor(this._actorId);
    };
    Window_EroStatusBase.prototype.refreshBg = function () {
      this.frameVisible = false;
      this.backOpacity = 0;
      var baseTexture = Nore.getSystemBaseTexture("bg2");
      var texture = new PIXI.Texture(baseTexture);
      var sprite = new PIXI.Sprite(texture);
      sprite.x = -0;
      sprite.y = -0;
      this._contentsBackSprite.addChild(sprite);
    };
    Window_EroStatusBase.prototype.drawLabelImage = function (index, x, y) {
      var baseTexture = Nore.getSystemBaseTexture("status_item");
      var xx = 0;
      if (ConfigManager.en && index > 0) {
        xx = 300;
      }
      var texture = new PIXI.Texture(
        baseTexture,
        new PIXI.Rectangle(xx, index * 50, 300, 50)
      );
      var sprite = new PIXI.Sprite(texture);
      sprite.x = x;
      sprite.y = y;
      this._contentsBackSprite.addChild(sprite);
    };
    Window_EroStatusBase.prototype.createEroSprite = function () {
      this._actorLayer = new Sprite();
      this._actorLayer.x = 770;
      this.addChild(this._actorLayer);
      this._tachieBackLayer = new Sprite();
      this._actorLayer.addChild(this._tachieBackLayer);
      this._tachieLayer = new Sprite();
      this._tachieLayer.y = 20;
      // var filter3 = new PIXI.filters.OutlineFilter(3, 0xdeaa3d);
      // this._tachieLayer.filters = [filter3];
      this._actorLayer.addChild(this._tachieLayer);
    };
    Window_EroStatusBase.prototype.resetNormalFont = function () {
      this.changeTextColor(ColorManager.normalColor());
      this.contents.fontSize = 18;
      this.changePaintOpacity(true);
    };
    Window_EroStatusBase.prototype.refresh = function () {
      if (!this._history) {
        return;
      }
      p(this._history);
      this._windowContentsSprite.removeChildren();
      this._windowContentsSprite.x = 0;
      this._windowContentsSprite.y = 0;
      this.makeItems();
      _super.prototype.refresh.call(this);
      var x = 46;
      this.drawActorPrams(x);
      this.drawActorImage();
      this._valueWidth = 208;
      var yy = 70;
      this.drawObedience(x, yy);
      this.drawKeiken(x, yy + 90); // 肉便器日数
      this.drawParams(x, yy + 142);
      this.drawCount(x, yy + 254);
      this.drawAptitude(x, yy + 484);
      this.drawManko();
      this.drawAnal();
      var ninshinRate = this._actorHistory.countNinshinRate(
        this._history.day()
      );
      if (this.isLatest) {
        ninshinRate = this._actorHistory.countNinshinRate();
      }
      this._ninshinBar.setNinshinRate(ninshinRate);
      this.drawHarami(x + 290, yy - 96);
      return;
    };
    Window_EroStatusBase.prototype.drawActorPrams = function (x) {
      this.contents.fontSize = 30;
      this.drawText(this.actor().name(), x, 70, 320);
      this.contents.fontSize = 22;
    };
    Window_EroStatusBase.prototype.drawAptitude = function (x, y) {
      this.contents.fontSize = 22;
      this.drawText(TextManager.aptitude, x, y, 320);
      y += 10;
      this.contents.fontSize = 18;
      var actor = this.actor();
      for (var i = 1; i <= 5; i++) {
        y += 27;
        this.drawText(TextManager["aptitude" + i], x, y, 320);
        var rank = actor.aptitude(i);
        this.drawRank(rank, x + 150, y);
      }
    };
    Window_EroStatusBase.prototype.drawLabels = function () {
      //this.drawLabelImage(4, 315, 210);
      //this.drawLabelImage(5, 315, 310);
      this.drawLabelImage(6, 314, 500);
      this.drawLabelImage(7, 314, 715);
    };
    Window_EroStatusBase.prototype.drawKeiken = function (x, y) {
      this.resetNormalFont();
      var xx = x;
      var yy = y;
      yy += this.lineHeight();
    };
    Window_EroStatusBase.prototype.drawObedience = function (x, y) {
      this.resetNormalFont();
      var xx = x;
      var yy = y;
      //yy += this.lineHeight();
      //this.drawKeikenParam(TextManager.defeatCount, this._actorHistory.countCaptured(this._day), xx, yy);
      var ob = this._actorHistory.countObedience(this._day);
      var nasty = this._actorHistory.countNasty(this._day);
      // this.drawKeikenParam(TextManager.obedience, this.getLevelText(ob), xx, yy + this.lineHeight());
      this.drawKeikenParam(
        this.actor().nastyText(),
        this.getLevelText(nasty),
        xx,
        yy + this.lineHeight() * 2
      );
      this.drawRank(
        $gameSystem.paramRank(nasty, true),
        x + 122,
        yy + this.lineHeight() * 2
      );
      var actor = this.actor();
      var statusText = Nore.getStatusText(
        actor.getActorHistory(),
        this._history
      );
      if (statusText.length > 1) {
        this.contents.fontSize = 16;
        y -= 10;
        this.drawText(statusText[0], x, y + 90, 320);
        this.drawText(statusText[1], x, y + 90 + 22, 320);
      } else {
        this.drawText(statusText[0], x, y + 90, 200);
      }
    };
    Window_EroStatusBase.prototype.getLevelText = function (value) {
      return value;
      var rank = $gameSystem.obedienceRank(value);
      switch (rank) {
        case 0:
          return (TextManager.low + " (%1)").format(value);
        case 1:
          return (TextManager.middle + " (%1)").format(value);
        case 2:
          return (TextManager.high + " (%1)").format(value);
      }
      return TextManager.max.format(value);
    };
    Window_EroStatusBase.prototype.drawParams = function (x, y) {
      this.resetNormalFont();
      var xx = x;
      var yy = y;
      yy += this.lineHeight();
      if (this._history.actorId() == 7) {
        this.drawKeikenParam(
          TextManager.chimpoParam,
          this.getChimpoText(),
          xx,
          yy
        );
      } else {
        this.drawKeikenParam(
          TextManager.omankoParam,
          this._actorHistory.countMankoEro(this._day) + "",
          xx,
          yy
        );
      }
      this.drawKeikenParam(
        TextManager.analParam,
        this._actorHistory.countAnalEro(this._day) + "",
        xx,
        yy + this.lineHeight()
      );
    };
    Window_EroStatusBase.prototype.getChimpoText = function () {
      var chimpo = this._actorHistory.countChimpo(this._day);
      var level = this._actorHistory.lastHistory().mankoImageId();
      if (level == 3) {
        return "MAX";
      }
      if (level == 1) {
        return chimpo + "/" + Nore.CHIMPO_1;
      }
      return chimpo + "/" + Nore.CHIMPO_2;
    };
    Window_EroStatusBase.prototype.destroy = function () {
      this.removeChild(this._mankoSprite);
      _super.prototype.destroy.call(this);
    };
    Window_EroStatusBase.prototype.drawManko = function () {
      this.drawEventText();
      if (this._history.actorId() == 7) {
        // シャルル
        this._ninshinBar.visible = false;
      } else {
        this._ninshinBar.visible = true;
      }
      this.drawMankoImage();
      this.drawMankoText();
    };
    Window_EroStatusBase.prototype.drawAnal = function () {
      this.drawAnalText();
    };
    Window_EroStatusBase.prototype.drawMankoImage = function () {
      var x = 300;
      var y = MANKO_IMAGE_Y;
      if (this._mankoSprite) {
        this.removeChild(this._mankoSprite);
      }
      var h = this._history;
      if (h == this._actorHistory.lastHistory()) {
        h = new DayHistory($gameSystem.day(), h.actorId(), null);
      }
      var sprite = new Nore.MankoSprite(h);
      this.addChild(sprite);
      sprite.x = x;
      sprite.y = y;
      this._mankoSprite = sprite;
    };
    Window_EroStatusBase.prototype.drawEventText = function () {
      var x = 310;
      var y = MANKO_IMAGE_Y - 100;
      var lh = this.lineHeight();
      var texts = this.getEventText();
      for (var i = 0; i < texts.length; i++) {
        var t = texts[i].format(this._history.totalTrainingDay());
        this.drawText(t, x, y + lh * i, 320, "left");
      }
    };
    Window_EroStatusBase.prototype.analTypeText = function () {
      var level = this._history.analImageId();
      return TextManager.analGaba.format(level, 5);
    };
    Window_EroStatusBase.prototype.omankoTypeText = function () {
      var level = this._history.mankoImageId();
      if (this._actorId == 7) {
        return TextManager.miniChinpo.format(level, 3);
      } else {
        return TextManager.omankoGaba.format(level, 7);
      }
    };
    Window_EroStatusBase.prototype.drawMankoText = function () {
      var x = 280;
      var y = MANKO_IMAGE_Y + 360;
      var lh = this.lineHeight();
      var texts = this.getMankoText();
      this.drawText(this.omankoTypeText(), x, y, MANKO_TEXT_WIDTH, "left");
      y += lh;
      for (var i = 0; i < texts.length; i++) {
        var t = texts[i].format(this._history.totalTrainingDay());
        this.drawText(t, x, y + lh * i, 320, "left");
      }
    };
    Window_EroStatusBase.prototype.drawAnalText = function () {
      var x = 280;
      var y = MANKO_IMAGE_Y + 360;
      this.drawText(
        this.analTypeText(),
        x + MANKO_TEXT_WIDTH + 20,
        y,
        MANKO_TEXT_WIDTH,
        "left"
      );
    };
    Window_EroStatusBase.prototype.drawKeikenParam = function (
      label,
      count,
      x,
      y
    ) {
      this.drawText(label, x, y, this._valueWidth, "left");
      this.drawText(count + "", x, y, this._valueWidth, "right");
    };
    Window_EroStatusBase.prototype.getMankoText = function () {
      return Nore.getMankoText(this._actorHistory, this._history);
    };
    Window_EroStatusBase.prototype.getEventText = function () {
      return Nore.getEventText(this._actorHistory, this._history);
    };
    Window_EroStatusBase.prototype.drawCount = function (x, y) {
      this.drawLabelImage(3, x - 5, y - 15);
      var list = ["nakadashi", "anal", "acme", "fela", "chichi", "syusan"];
      if (this._actorId == 7) {
        list = ["anal", "anal_acme", "fela", "chichi"];
      }
      var xx = x;
      var yy = y;
      this.resetNormalFont();
      for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
        var type = list_1[_i];
        yy += this.lineHeight();
        var name_1 = getEroParamTitle(type);
        this.drawText(name_1, xx, yy, 120, "left");
        var value = $gameSystem.countEro(this._actorId, type, this._day);
        if (type == "syusan") {
          this.drawText(
            TextManager.peopleUnit.format(value),
            xx,
            yy,
            this._valueWidth,
            "right"
          );
        } else {
          this.drawText(
            TextManager.countUnit.format(value),
            xx,
            yy,
            this._valueWidth,
            "right"
          );
        }
      }
    };
    Window_EroStatusBase.prototype.lineHeight = function () {
      return 24;
    };
    Window_EroStatusBase.prototype.resetFontSettings = function () {
      this.contents.fontFace = $gameSystem.mainFontFace();
      this.contents.fontSize = 20;
      this.resetTextColor();
    };
    Window_EroStatusBase.prototype.drawActorImage = function () {
      this._tachieLayer.destroyAndRemoveChildren();
      var a = $gameActors.actor(this._actorId);
      var actor = JsonEx.makeDeepCopy(a);
      actor.removeAllBattleEquips();
      var syusanCount = a.getActorHistory().countSyusan(this._day);
      actor.setSyusanCount(syusanCount);
      if (this._history == this._actorHistory.lastHistory()) {
        var rect = new Rectangle(150, 0, 360, 800);
        actor.setCacheChanged();
        var faceId = actor.getDefaultFaceId();
        if ($gameSystem.chokyoActorId() === actor.actorId()) {
          faceId = actor.faceId;
        }
        this.drawTachieActor(actor, this._tachieLayer, 0, 0, rect, faceId);
      } else {
        if (this._costume) {
          this._costume.restoreCostume(actor, true);
        }
        actor._cacheChanged = false;
        actor._boteId = this._history.costume().boteId();
        actor._day = this._history.day();
        actor.setHoppeId(this._history.costume().hoppeId());
        actor.setDefaultHoppeId(this._history.costume().hoppeId());
        actor.setAcceHoppeId(this._history.costume().hoppeId());
        actor.setCacheChanged();
        var rect = new Rectangle(150, 0, 360, 800);
        this.drawTachieActor(
          actor,
          this._tachieLayer,
          0,
          0,
          rect,
          this._costume.faceId()
        );
      }
    };
    Window_EroStatusBase.prototype.getBaseTexture = function () {
      var baseTexture = PIXI.utils.BaseTextureCache["system/eroStatus"];
      if (!baseTexture) {
        var bitmap = ImageManager.loadSystem("eroStatus");
        if (!bitmap.isReady()) {
          return;
        }
        baseTexture = new PIXI.BaseTexture(bitmap._image);
        baseTexture.resource.url = "system/eroStatus";
        PIXI.utils.BaseTextureCache["system/eroStatus"] = baseTexture;
      }
      return baseTexture;
    };
    Window_EroStatusBase.prototype.drawLabel = function (
      text,
      x,
      y,
      iconIndex
    ) {
      this.contents.fontSize = 22;
      this.changeTextColor(ColorManager.systemColor());
      this.drawText(text, x + 34, y, 300, "left");
      if (iconIndex > 0) {
        this.drawIcon(iconIndex, x, y - 4);
      }
    };
    Window_EroStatusBase.prototype.itemWidth = function () {
      return 340;
    };
    Window_EroStatusBase.prototype.itemHeight = function () {
      return 24;
    };
    Window_EroStatusBase.prototype.spacing = function () {
      return 4;
    };
    /*_refreshCursor() {
            return;
        }*/
    Window_EroStatusBase.prototype.drawHarami = function (x, y) {};
    return Window_EroStatusBase;
  })(Window_Selectable);
  Nore.Window_EroStatusBase = Window_EroStatusBase;
  var Window_EroStatus = /** @class */ (function (_super) {
    __extends(Window_EroStatus, _super);
    function Window_EroStatus() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Window_EroStatus.prototype.item = function () {
      return this.itemAt(this.index());
    };
    Window_EroStatus.prototype.itemAt = function (index) {
      return this._data[index];
    };
    Window_EroStatus.prototype.maxItems = function () {
      return this._data ? this._data.length : 1;
    };
    Window_EroStatus.prototype.makeItems = function () {
      this._data = [];
      for (var _i = 0, _a = this._history._scheduleList; _i < _a.length; _i++) {
        var s = _a[_i];
        if (s.text().length > 0) {
          this._data.push(s);
        }
      }
    };
    Window_EroStatus.prototype.itemRect = function (index) {
      var rect = new Rectangle(0, 0, 0, 0);
      var maxCols = this.maxCols();
      rect.width = this.itemWidth();
      rect.height = this.itemHeight();
      rect.x = 310;
      rect.y = Math.floor(index / maxCols) * rect.height - this._scrollY + 200;
      return rect;
    };
    Window_EroStatus.prototype.maxCols = function () {
      return 1;
    };
    Window_EroStatus.prototype.drawItem = function (index) {
      var rect = this.itemRect(index);
      this.resetNormalFont();
      var item = this.itemAt(index);
      if (item) {
        this.drawText(item.text(), rect.x + 0, rect.y + 3, 596, "left");
      }
    };
    Window_EroStatus.prototype.drawHarami = function (x, y) {
      this.resetNormalFont();
      var yy = y;
      var xx = x;
      var text = TextManager.normal;
      if (this._history.isBote()) {
        text = TextManager.pregnant;
      }
      this.contents.fontSize = 32;
      this.drawText(text, xx + 50, yy, 100, "left");
      if (!this._history.isBote()) {
        return;
      }
      this.contents.fontSize = 26;
      this.drawText(
        "ボテ腹成長" + this._history._boteGrowupValue,
        x + 50,
        y - 50
      );
    };
    return Window_EroStatus;
  })(Window_EroStatusBase);
  Nore.Window_EroStatus = Window_EroStatus;
})(Nore || (Nore = {}));
var Sprite_MiniCharacter = /** @class */ (function (_super) {
  __extends(Sprite_MiniCharacter, _super);
  function Sprite_MiniCharacter() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  Sprite_MiniCharacter.prototype.updateCharacterFrame = function () {
    var pw = this.patternWidth();
    var ph = this.patternHeight();
    var sx = (this.characterBlockX() + this.characterPatternX()) * pw;
    var sy = (this.characterBlockY() + this.characterPatternY()) * ph;
    this.updateHalfBodySprites();
    var offset = this.imageOffsetY();
    this.setFrame(sx, sy, pw, ph - offset);
  };
  Sprite_MiniCharacter.prototype.imageOffsetY = function () {
    if (
      this._characterName.includes("actor") ||
      this._characterName.includes("mob")
    ) {
      return 30;
    } else {
      return 0;
    }
  };
  Sprite_MiniCharacter.prototype.updatePosition = function () {
    this.x = this._character.screenX();
    this.y = this._character.screenY();
    this.z = this._character.screenZ();
  };
  return Sprite_MiniCharacter;
})(Sprite_Character);
function calcKaihatsuRank(value) {
  if (value <= 200) {
    return "G";
  }
  if (value <= 500) {
    return "F";
  }
  if (value <= 1000) {
    return "E";
  }
  if (value <= 2000) {
    return "D";
  }
  if (value <= 3500) {
    return "C";
  }
  if (value <= 5000) {
    return "B";
  }
  return "A";
}
