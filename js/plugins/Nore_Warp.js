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
 * @command Warp
 *
 * @command EnterRoom
 * @text 部屋入室
 * @des 部屋入室
 * @arg actorId
 * @type number
 * @text actorId
 * @desc actorId
 * @arg roomId
 * @type number
 * @text roomId
 * @desc roomId
 */
var Nore;
(function (Nore) {
  var pluginName = "Nore_Warp";
  PluginManager.registerCommand(pluginName, "Warp", function (args) {
    $gameSwitches.setValue(20, false);
    SceneManager.push(Scene_Warp);
  });
  PluginManager.registerCommand(pluginName, "EnterRoom", function (args) {
    var actorId = Math.trunc(args.actorId);
    var roomId = Math.trunc(args.roomId);
    var history = $gameSystem.warpHistory(actorId);
    history.enter(roomId);
  });
})(Nore || (Nore = {}));
var WarpDestination = /** @class */ (function () {
  function WarpDestination(type) {
    this._type = type;
  }
  WarpDestination.prototype.name = function () {
    return getDestinationName(this._type);
  };
  WarpDestination.prototype.isEnabled = function () {
    var actorId = $gameVariables.value(5);
    var count = $gameVariables.value(260 + actorId);
    switch (this._type) {
      case DestType.prison:
      case DestType.toilet:
        return true;
      case DestType.sexRoom:
      case DestType.sexRoom2:
      case DestType.conscript1:
      case DestType.conscript2:
      case DestType.monster:
      case DestType.vagrant:
      case DestType.merchant:
      case DestType.sm:
      case DestType.bar:
      case DestType.empire:
      case DestType.minister:
      case DestType.slave:
      case DestType.gray:
        return this.isOpenRoom(count, this._type, actorId);
    }
    if (this._type == DestType.return) {
      return $gameSystem.chokyoTime() >= 70;
    }
    return false;
  };
  WarpDestination.prototype.textColor = function () {
    if ($gameSystem.currentPlace() == this._type) {
      return ColorManager.crisisColor();
    } else {
      return ColorManager.normalColor();
    }
  };
  WarpDestination.prototype.type = function () {
    return this._type;
  };
  WarpDestination.prototype.isOpenRoom = function (count, type, actorId) {
    if (actorId == 1) {
      return this.isOpenRoom1(type);
    }
    if (actorId == 2) {
      return this.isOpenRoom2(type);
    }
    if (actorId == 4) {
      return this.isOpenRoom4(type);
    }
    if (actorId == 5) {
      return this.isOpenRoom5(type);
    }
    if (actorId == 6) {
      return this.isOpenRoom6(type);
    }
    if (actorId == 10) {
      return this.isOpenRoom10(type);
    }
    return true;
  };
  WarpDestination.prototype.isOpenRoom1 = function (type) {
    if (type == DestType.conscript1) {
      if ($gameSwitches.value(903)) {
        return true;
      }
    }
    if (type == DestType.minister) {
      if ($gameSystem.isTaikenban() || $gameSystem.isFreeTaikenban()) {
        return false;
      }
      return $gameSwitches.value(470);
    }
    if (type == DestType.vagrant) {
      return $gameSwitches.value(903);
    }
    if (type == DestType.sm) {
      return $gameSwitches.value(903);
    }
    if (type == DestType.monster) {
      return $gameSwitches.value(903);
    }
    if (type == DestType.sexRoom) {
      return true;
    }
    return false;
  };
  WarpDestination.prototype.isOpenRoom2 = function (type) {
    if (type == DestType.sexRoom) {
      return true;
    }
    return $gameSystem.warpHistory(2).isEnter(DestType.sexRoom);
  };
  WarpDestination.prototype.isOpenRoom4 = function (type) {
    if (type == DestType.sexRoom) {
      return true;
    }
    if (type == DestType.vagrant) {
      return true;
      //return $gameSwitches.value(945);
    }
    if (type == DestType.sm) {
      return true;
      //return $gameSwitches.value(945);
    }
    if (type == DestType.monster) {
      return true;
    }
    return false;
  };
  WarpDestination.prototype.isOpenRoom5 = function (type) {
    switch (type) {
      case DestType.vagrant:
      case DestType.monster:
      case DestType.sexRoom:
        return $gameSwitches.value(1061);
    }
    if (type == DestType.sm) {
      return true;
    }
    return false;
  };
  WarpDestination.prototype.isOpenRoom6 = function (type) {
    switch (type) {
      case DestType.bar:
        return $gameSwitches.value(1071);
    }
    if (type == DestType.sm) {
      return true;
    }
    return false;
  };
  WarpDestination.prototype.isOpenRoom10 = function (type) {
    switch (type) {
      case DestType.sexRoom:
        return $gameSwitches.value(1002);
    }
    if (type == DestType.sm) {
      return true;
    }
    return false;
  };
  return WarpDestination;
})();
var Scene_Warp = /** @class */ (function (_super) {
  __extends(Scene_Warp, _super);
  function Scene_Warp() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  Scene_Warp.prototype.create = function () {
    _super.prototype.create.call(this);
    this.createWarpWindow();
  };
  Scene_Warp.prototype.createWarpWindow = function () {
    this._warpWindow = new Window_Warp();
    this.addChild(this._warpWindow);
    this._warpWindow.refresh();
    this._warpWindow.setHandler("ok", this.onOk.bind(this));
    this._warpWindow.setHandler("cancel", this.onCancel.bind(this));
  };
  Scene_Warp.prototype.onOk = function () {
    var item = this._warpWindow.selectedItem();
    var nextPlaceId = item.type();
    if ($gameSystem.currentPlace() == nextPlaceId) {
      this.onCancel();
      return;
    }
    $gameVariables.setValue(30, nextPlaceId);
    $gameTemp.reserveCommonEvent(13);
    SceneManager.pop();
  };
  Scene_Warp.prototype.onCancel = function () {
    $gameSwitches.setValue(20, true);
    SceneManager.pop();
  };
  return Scene_Warp;
})(Scene_MenuBase);
var Window_Warp = /** @class */ (function (_super) {
  __extends(Window_Warp, _super);
  function Window_Warp() {
    var _this = _super.call(this, new Rectangle(320, 210, 600, 224)) || this;
    _this._list = [];
    return _this;
  }
  Window_Warp.prototype.makeItemList = function () {
    this._list = [];
    this._list.push(new WarpDestination(DestType.prison));
    var actorId = $gameVariables.value(5);
    switch (actorId) {
      case 1:
        this.initActor1();
        break;
      case 2:
        this.initActor2();
        break;
      case 4:
        this.initActor4();
        break;
      case 5:
        this.initActor5();
        break;
      case 6:
        this.initActor6();
        break;
      case 10:
        this.initActor10();
        break;
      case 12:
        this.initActor12();
        break;
    }
  };
  Window_Warp.prototype.initActor1 = function () {
    this._list.push(new WarpDestination(DestType.sexRoom));
    this._list.push(new WarpDestination(DestType.vagrant));
    this._list.push(new WarpDestination(DestType.sm));
    this._list.push(new WarpDestination(DestType.monster));
    this._list.push(new WarpDestination(DestType.toilet));
  };
  Window_Warp.prototype.initActor2 = function () {
    this._list.push(new WarpDestination(DestType.sexRoom));
    this._list.push(new WarpDestination(DestType.empire));
    this._list.push(new WarpDestination(DestType.toilet));
  };
  Window_Warp.prototype.initActor4 = function () {
    this._list.push(new WarpDestination(DestType.sexRoom));
    this._list.push(new WarpDestination(DestType.sm));
    this._list.push(new WarpDestination(DestType.vagrant));
    this._list.push(new WarpDestination(DestType.monster));
    this._list.push(new WarpDestination(DestType.toilet));
  };
  Window_Warp.prototype.initActor5 = function () {
    this._list.push(new WarpDestination(DestType.sm));
    this._list.push(new WarpDestination(DestType.sexRoom));
    this._list.push(new WarpDestination(DestType.vagrant));
    this._list.push(new WarpDestination(DestType.toilet));
  };
  Window_Warp.prototype.initActor6 = function () {
    this._list.push(new WarpDestination(DestType.sm));
    this._list.push(new WarpDestination(DestType.bar));
    this._list.push(new WarpDestination(DestType.toilet));
  };
  Window_Warp.prototype.initActor10 = function () {
    this._list.push(new WarpDestination(DestType.sm));
    this._list.push(new WarpDestination(DestType.sexRoom));
    this._list.push(new WarpDestination(DestType.toilet));
  };
  Window_Warp.prototype.initActor12 = function () {
    this._list.push(new WarpDestination(DestType.sm));
    this._list.push(new WarpDestination(DestType.toilet));
  };
  Window_Warp.prototype.maxCols = function () {
    return 2;
  };
  Window_Warp.prototype.refresh = function () {
    this.makeItemList();
    _super.prototype.refresh.call(this);
    this.select(0);
    this.activate();
  };
  Window_Warp.prototype.maxItems = function () {
    return this._list.length;
  };
  Window_Warp.prototype.lineHeight = function () {
    return 48;
  };
  Window_Warp.prototype.drawItem = function (index) {
    var rect = this.itemRect(index);
    var item = this._list[index];
    this.changePaintOpacity(item.isEnabled());
    this.contents.textColor = item.textColor();
    this.drawText(item.name(), rect.x + 84, rect.y, rect.width - 100);
    this.drawDestCharacter(item.type(), rect.x, rect.y);
    if (!item.isEnabled()) {
      this.drawLock(rect.x, rect.y);
    }
  };
  Window_Warp.prototype.drawDestCharacter = function (type, x, y) {
    var name = this.getDestName(type);
    if (!name) {
      return;
    }
    var c = new Game_WarpCharacter(name, x + 60, y + 54);
    var s = new Sprite_DestPerson(c);
    this._windowContentsSprite.addChild(s);
  };
  Window_Warp.prototype.getDestName = function (type) {
    switch (type) {
      case DestType.sexRoom:
        return "barbarian_22";
      case DestType.vagrant:
        return "mob01";
      case DestType.sm:
        return "mv_mob-muscle01";
      case DestType.monster:
        return "$o0096012812525865918";
    }
    return null;
  };
  Window_Warp.prototype.selectedId = function () {
    var item = this.selectedItem();
    return item.type();
  };
  Window_Warp.prototype.selectedItem = function () {
    return this._list[this.index()];
  };
  Window_Warp.prototype.isCurrentItemEnabled = function () {
    return this.selectedItem().isEnabled();
  };
  Window_Warp.prototype.drawLock = function (x, y, isEnabled) {
    if (isEnabled === void 0) {
      isEnabled = true;
    }
    var baseTexture = this.getBaseTexture();
    var texture = new PIXI.Texture(
      baseTexture,
      new PIXI.Rectangle(0, 103, 40, 36)
    );
    var sprite = new PIXI.Sprite(texture);
    sprite.x = x + 14;
    sprite.y = y + 14;
    if (!isEnabled) {
      sprite.alpha = 0.4;
    }
    this._windowContentsSprite.addChild(sprite);
  };
  Window_Warp.prototype.getBaseTexture = function () {
    var baseTexture = PIXI.utils.BaseTextureCache["system/skill_tree"];
    if (!baseTexture) {
      var bitmap = ImageManager.loadSystem("skill_tree");
      if (!bitmap.isReady()) {
        return;
      }
      baseTexture = new PIXI.BaseTexture(bitmap._image);
      baseTexture.resource.url = "system/skill_tree";
      PIXI.utils.BaseTextureCache["system/skill_tree"] = baseTexture;
    }
    return baseTexture;
  };
  return Window_Warp;
})(Window_Selectable);
var DestType;
(function (DestType) {
  DestType[(DestType["prison"] = 0)] = "prison";
  DestType[(DestType["sexRoom"] = 1)] = "sexRoom";
  DestType[(DestType["bossRoom"] = 2)] = "bossRoom";
  DestType[(DestType["bar"] = 3)] = "bar";
  DestType[(DestType["slave"] = 4)] = "slave";
  DestType[(DestType["empire"] = 5)] = "empire";
  DestType[(DestType["return"] = 6)] = "return";
  DestType[(DestType["sexRoom2"] = 7)] = "sexRoom2";
  DestType[(DestType["conscript1"] = 8)] = "conscript1";
  DestType[(DestType["conscript2"] = 9)] = "conscript2";
  DestType[(DestType["monster"] = 10)] = "monster";
  DestType[(DestType["vagrant"] = 11)] = "vagrant";
  DestType[(DestType["merchant"] = 12)] = "merchant";
  DestType[(DestType["sm"] = 13)] = "sm";
  DestType[(DestType["toilet"] = 14)] = "toilet";
  DestType[(DestType["minister"] = 15)] = "minister";
  DestType[(DestType["gray"] = 16)] = "gray";
})(DestType || (DestType = {}));
var WarpHistory = /** @class */ (function () {
  function WarpHistory(actorId) {
    this.history = [];
    this.actorId = actorId;
  }
  WarpHistory.prototype.enter = function (type) {
    if (!this.history.contains(type)) {
      this.history.push(type);
    }
  };
  WarpHistory.prototype.isEnter = function (type) {
    return this.history.contains(type);
  };
  return WarpHistory;
})();
var Sprite_DestPerson = /** @class */ (function (_super) {
  __extends(Sprite_DestPerson, _super);
  function Sprite_DestPerson() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  Sprite_DestPerson.prototype.updateCharacterFrame = function () {
    if (this._characterName && this._characterName.contains("$")) {
      return _super.prototype.updateCharacterFrame.call(this);
    }
    var pw = this.patternWidth();
    var ph = this.patternHeight();
    var sx = (this.characterBlockX() + this.characterPatternX()) * pw;
    var sy = (this.characterBlockY() + this.characterPatternY()) * ph;
    this.updateHalfBodySprites();
    var hh = ph - 28;
    this.setFrame(sx, sy, pw, hh);
  };
  return Sprite_DestPerson;
})(Sprite_Character);
var Game_WarpCharacter = /** @class */ (function (_super) {
  __extends(Game_WarpCharacter, _super);
  function Game_WarpCharacter(characterName, x, y) {
    var _this = _super.call(this) || this;
    _this._monotone = false;
    _this._stepAnime = false;
    _this._warpName = characterName;
    _this._x = x;
    _this._y = y;
    _this._baseY = y;
    _this.refresh();
    return _this;
  }
  Game_WarpCharacter.prototype.refresh = function () {
    //const characterName = this.actor().characterName();
    //const characterIndex = this.actor().characterIndex();
    this.setImage(this._warpName, 0);
  };
  Game_WarpCharacter.prototype.screenX = function () {
    return this._x;
  };
  Game_WarpCharacter.prototype.screenY = function () {
    return this._y;
  };
  Game_WarpCharacter.prototype.isMonoTone = function () {
    return this._monotone;
  };
  Game_WarpCharacter.prototype.setStepAnime = function (stepAnime) {
    //this._stepAnime = stepAnime;
    return;
    if (stepAnime) {
      this._y = this._baseY - 30;
    } else {
      this._y = this._baseY;
    }
  };
  Game_WarpCharacter.prototype.hasStepAnime = function () {
    return false;
    //return this._stepAnime;
  };
  Game_WarpCharacter.prototype.animationWait = function () {
    return 15;
  };
  Game_WarpCharacter.prototype.hasWalkAnime = function () {
    return false;
  };
  return Game_WarpCharacter;
})(Game_Character);
