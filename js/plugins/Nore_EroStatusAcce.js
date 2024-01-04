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
  var Scene_EroStatusAcce = /** @class */ (function (_super) {
    __extends(Scene_EroStatusAcce, _super);
    function Scene_EroStatusAcce() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Scene_EroStatusAcce.prototype.create = function () {
      Scene_MenuBase.prototype.create.call(this);
      this.initDay();
      this.createWindowLayer();
      this.createStatusWindow();
      this.createHelpWindow();
      this.createAllWindows();
      this.onChange();
    };
    Scene_EroStatusAcce.prototype.createBackground = function () {};
    Scene_EroStatusAcce.prototype.createButtons = function () {};
    Scene_EroStatusAcce.prototype.initDay = function () {
      this._day = $gameTemp.history.day();
    };
    Scene_EroStatusAcce.prototype.updateActor = function () {
      this._actor = $gameParty.menuActor();
    };
    Scene_EroStatusAcce.prototype.createStatusWindow = function () {
      this._window = new Window_EroStatusAcce($gameTemp.history);
      this._window.setHandler("change", this.onChange.bind(this));
      this._window.setHandler("pageup", this.onPageup.bind(this));
      this._window.setHandler("pagedown", this.onPagedown.bind(this));
      this.addWindow(this._window);
    };
    Scene_EroStatusAcce.prototype.onChange = function () {
      var item = this._window.item();
      this._helpWindow.setItem(item);
      this._window.updateEroItem();
    };
    Scene_EroStatusAcce.prototype.update = function () {
      _super.prototype.update.call(this);
      this.updateOk();
      this.updateCancel();
    };
    Scene_EroStatusAcce.prototype.updateOk = function () {
      if (!$gameTemp.history) {
        return;
      }
      if (!this._window.active) {
        return;
      }
      if (Input.isTriggered("ok")) {
        SoundManager.playCursor();
        SoundManager.playCursor();
        SceneManager.goto(Nore.Scene_EroStatus);
      }
    };
    Scene_EroStatusAcce.prototype.updateCancel = function () {
      if (Input.isTriggered("cancel") || TouchInput.isCancelled()) {
        SoundManager.playCancel();
        $gameActors.actor(5).setCacheChanged();
        SceneManager.pop();
      }
    };
    Scene_EroStatusAcce.prototype.createHelpWindow = function () {
      var rect = this.helpWindowRect();
      this._helpWindow = new Sprite_HelpBig(rect);
      this.addWindow(this._helpWindow);
    };
    Scene_EroStatusAcce.prototype.helpWindowRect = function () {
      var rect = new Rectangle(0, 0, 0, 0);
      rect.x = 320;
      rect.y = 102;
      rect.width = 670;
      rect.height = 112;
      return rect;
    };
    Scene_EroStatusAcce.prototype.onPageup = function () {
      var nextDay;
      if (this._day == 1) {
        nextDay = $gameSystem.day();
      } else {
        nextDay = this._day - 1;
      }
      this.gotoNextStatus(nextDay);
    };
    Scene_EroStatusAcce.prototype.onPagedown = function () {
      var nextDay;
      if (this._day == $gameSystem.day()) {
        nextDay = 1;
      } else {
        nextDay = this._day + 1;
      }
      this.gotoNextStatus(nextDay);
    };
    Scene_EroStatusAcce.prototype.gotoNextStatus = function (nextDay) {
      SoundManager.playCursor();
      var actorId = this._actor.actorId();
      var actorHistory = $gameSystem.historyManager().getActorHistory(actorId);
      var history = actorHistory.findHistoryByDay(nextDay);
      if (!history) {
        this._window.activate();
        return;
      }
      $gameTemp.history = history;
      $gameTemp.costume = history.costume();
      SceneManager.goto(Scene_EroStatusAcce);
    };
    return Scene_EroStatusAcce;
  })(Nore.Scene_Talk);
  Nore.Scene_EroStatusAcce = Scene_EroStatusAcce;
  var Window_EroStatusAcce = /** @class */ (function (_super) {
    __extends(Window_EroStatusAcce, _super);
    function Window_EroStatusAcce(history, rect) {
      return _super.call(this, history, rect) || this;
    }
    Window_EroStatusAcce.prototype.refresh = function () {
      if (!this._history) {
        return;
      }
      _super.prototype.refresh.call(this);
      this.setupEroMarker();
      this._ninshinBar.visible = false;
    };
    Window_EroStatusAcce.prototype.drawLabels = function () {
      this.drawLabelImage(6, 314, 500);
      this.drawLabelImage(7, 314, 715);
    };
    Window_EroStatusAcce.prototype.updateEroItem = function () {
      if (!this._eroMarker) {
        return;
      }
      this._eroMarker.visible = false;
      var armor = this.item();
      if (!armor) {
        return;
      }
      var meta = this.getEroPosText(armor);
      if (!meta) {
        return;
      }
      var list = meta.split(",");
      var x = parseInt(list[0]);
      var y = parseInt(list[1]);
      this._eroMarker.x = x + 200;
      this._eroMarker.y = y + 200;
      this._eroMarker.visible = true;
    };
    Window_EroStatusAcce.prototype.getEroPosText = function (armor) {
      var boteId = this._history.costume().boteId();
      if (boteId > 0) {
        var meta_1 =
          armor.meta["actor" + this._history.actorId() + "_b" + boteId];
        if (meta_1) {
          p(meta_1);
          return meta_1;
        }
      }
      var meta = armor.meta["actor" + this._history.actorId()];
      if (!meta) {
        console.error(
          "actor" +
            this._history.actorId() +
            "の" +
            armor.id +
            "の座標が見つかりません"
        );
        return;
      }
      return meta;
    };
    Window_EroStatusAcce.prototype.setupEroMarker = function () {
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
    Window_EroStatusAcce.prototype.getMarkerBaseTexture = function () {
      var baseTexture = PIXI.utils.BaseTextureCache["system/eroMarker"];
      if (!baseTexture) {
        var bitmap = ImageManager.loadSystem("eroMarker");
        if (!bitmap.isReady()) {
          return;
        }
        baseTexture = new PIXI.BaseTexture(bitmap._image);
        baseTexture.resource.url = "system/eroMarker";
        PIXI.utils.BaseTextureCache["system/eroMarker"] = baseTexture;
      }
      return baseTexture;
    };
    Window_EroStatusAcce.prototype.drawActor = function () {
      this._tachieLayer.destroyAndRemoveChildren();
      var a = $gameActors.actor(this._actorId);
      var actor = JsonEx.makeDeepCopy(a);
      if (this._costume) {
        this._costume.restoreCostume(actor);
      }
      actor.setOuterBottomId("a");
      actor.setOuterTopId("a");
      actor.setOuterId("a");
      actor.setInnerTopId("a");
      actor.setInnerBottomId("a");
      actor.setArmId("a");
      actor.setLegId("a");
      actor._cacheChanged = false;
      actor._boteId = this._history.costume().boteId();
      actor.setHoppeId(this._history.costume().hoppeId());
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
    Window_EroStatusAcce.prototype.makeItems = function () {
      this._data = [];
      for (var id = 1000; id <= 1099; id++) {
        var armor = $dataArmors[id];
        if (!armor) {
          continue;
        }
        if (armor.etypeId == 4) {
          if (this.isOpened(armor)) {
            this._data.push(armor);
          }
        }
      }
      this._data = this._data.sort(function (a, b) {
        var orderA = a.id;
        var orderB = b.id;
        if (a.meta["order"]) {
          orderA = parseInt(a.meta["order"]);
        }
        if (b.meta["order"]) {
          orderB = parseInt(b.meta["order"]);
        }
        return orderA - orderB;
      });
    };
    Window_EroStatusAcce.prototype.maxCols = function () {
      return 3;
    };
    Window_EroStatusAcce.prototype.drawItem = function (index) {
      var rect = this.itemRect(index);
      this.resetNormalFont();
      var item = this.itemAt(index);
      if (item) {
        this.drawText(item.name, rect.x + 0, rect.y + 3, 106, "left");
      }
    };
    Window_EroStatusAcce.prototype.isEnabled = function (item) {
      if (item.meta["sw"]) {
        var sw = parseInt(item.meta["sw"]);
        return $gameSwitches.value(sw);
      }
      return true;
    };
    Window_EroStatusAcce.prototype.isOpened = function (item) {
      return this._history.hasAcce(item);
    };
    Window_EroStatusAcce.prototype.item = function () {
      return this.itemAt(this.index());
    };
    Window_EroStatusAcce.prototype.itemAt = function (index) {
      return this._data[index];
    };
    Window_EroStatusAcce.prototype.itemWidth = function () {
      return 145;
    };
    Window_EroStatusAcce.prototype.itemHeight = function () {
      return 34;
    };
    Window_EroStatusAcce.prototype.spacing = function () {
      return 4;
    };
    Window_EroStatusAcce.prototype.itemRect = function (index) {
      var rect = new Rectangle(0, 0, 0, 0);
      var maxCols = this.maxCols();
      rect.width = this.itemWidth();
      rect.height = this.itemHeight();
      rect.x =
        (index % maxCols) * (rect.width + this.spacing()) - this._scrollX + 310;
      rect.y = Math.floor(index / maxCols) * rect.height - this._scrollY + 200;
      return rect;
    };
    Window_EroStatusAcce.prototype.maxItems = function () {
      return this._data ? this._data.length : 1;
    };
    return Window_EroStatusAcce;
  })(Nore.Window_EroStatusBase);
  Nore.Window_EroStatusAcce = Window_EroStatusAcce;
})(Nore || (Nore = {}));
var Sprite_HelpBig = /** @class */ (function (_super) {
  __extends(Sprite_HelpBig, _super);
  function Sprite_HelpBig() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  Sprite_HelpBig.prototype.initialize = function (r) {
    _super.prototype.initialize.call(this);
    this.x = r.x;
    this.y = r.y - 10;
    this.bitmap = new Bitmap(r.width, r.height);
  };
  Sprite_HelpBig.prototype.setNotOpenedItem = function (item) {
    if (!item) {
      this.setText("");
      return;
    }
    this.bitmap.clear();
    this.bitmap.fontSize = 30;
    this.bitmap.textColor = "#deaa3d"; //ColorManager.systemColor();
    this.bitmap.drawText(TextManager.condition, 20, 0, 600, 40, "left");
    this.bitmap.textColor = ColorManager.normalColor();
    var hintText = item.meta["hint"];
    if (ConfigManager.language == "en" && item.meta["hintEn"]) {
      hintText = item.meta["hintEn"];
    }
    this.bitmap.drawText(hintText, 170, 0, 600, 40, "left");
    this._text = null;
  };
  Sprite_HelpBig.prototype.setItem = function (item) {
    if (!item) {
      this.setText("");
      return;
    }
    var text = item.description;
    p(text);
    this.setText(text);
  };
  Sprite_HelpBig.prototype.setActor = function (actor) {
    if (!actor) {
      this.setText("");
      return;
    }
    var text = "今までにしたプレイ:";
    this.setText(text);
  };
  Sprite_HelpBig.prototype.setText = function (text) {
    if (this._text !== text) {
      this._text = text;
      this.refresh();
    }
  };
  Sprite_HelpBig.prototype.refresh = function () {
    this.bitmap.clear();
    this.bitmap.fontSize = 26;
    if (this._text.contains("\\n")) {
      var texts = this._text.split("\\n");
      this.bitmap.drawText(texts[0], 0, -0, 600, 40, "left");
      this.bitmap.drawText(texts[1], 0, 35, 600, 40, "left");
    } else {
      this.bitmap.drawText(this._text, 0, 10, 600, 40, "left");
    }
  };
  return Sprite_HelpBig;
})(Sprite);
