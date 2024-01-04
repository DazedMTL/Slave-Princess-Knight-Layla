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
 * @command ResetBabyImage
 *
 * @command ShowBaby
 * @arg actorId
 * @type number
 * @arg index
 * @type number
 *
 *
 */
var Nore;
(function (Nore) {
  var imageCache = {};
  var directionCache = {};
  var selectedBaby = null;
  var selectedHistory = null;
  var selectedBabyName = null;
  var motherCharacter = null;
  var JUNU_ACTOR1_SW = 411;
  var BABY_DIRECTION_SW = 412;
  var CHARLES_FATHER_SW = 413;
  var CHARLES_CONFIRM_SW = 414;
  var JUNU_OTHER_ACTOR_SW = 415;
  var pluginName = "Nore_BabyEvent";
  PluginManager.registerCommand(pluginName, "ResetBabyImage", function (args) {
    p("ResetBabyImage");
    imageCache = {};
    directionCache = {};
    selectedBaby = null;
    selectedHistory = null;
    motherCharacter = null;
    var idBase = 820;
    for (var _i = 0, _a = $gameParty.members(); _i < _a.length; _i++) {
      var a = _a[_i];
      var id = a.actorId() + idBase;
      var count = a.getActorHistory().countSyusan($gameSystem.day());
      $gameVariables.setValue(id, count);
    }
    $gameSwitches.setValue(CHARLES_CONFIRM_SW, false);
  });
  PluginManager.registerCommand(pluginName, "ShowBaby", function (args) {
    var actorId = parseInt(args.actorId);
    var index = parseInt(args.index);
    var actor = $gameActors.actor(actorId);
    var syusanBaby = actor.syusanBaby(index);
    if (!syusanBaby) {
      selectedBaby = null;
      return;
    }
    selectedBaby = syusanBaby.syusanInfo;
    selectedHistory = syusanBaby.history;
    selectedBabyName = "baby%1_%2".format(actorId.padZero(2), index.padZero(2));
    if (selectedBaby.getTaneoyaType() == TaneoyaId.charles) {
      $gameSwitches.setValue(CHARLES_FATHER_SW, true);
    } else {
      $gameSwitches.setValue(CHARLES_FATHER_SW, false);
    }
    var motherActorId = selectedHistory.actorId();
    motherCharacter = findMotherCharacter(motherActorId);
    p("motherCharacter");
    p(motherCharacter);
    p("selectedBabyName:" + selectedBabyName);
    SceneManager.push(Scene_Baby);
  });
  function findMotherCharacter(actorId) {
    var events = $gameMap.events();
    for (var key in events) {
      var event_1 = events[key];
      if (event_1.event().name == "actor" + actorId) {
        return event_1;
      }
    }
    return null;
  }
  var _Game_Event_prototype_characterName = Game_Event.prototype.characterName;
  Game_Event.prototype.characterName = function () {
    if (!$gameMap) {
      return _Game_Event_prototype_characterName.call(this);
    }
    if ($gameMap.mapId() != 248) {
      return _Game_Event_prototype_characterName.call(this);
    }
    if (!this.event()) {
      return _Game_Event_prototype_characterName.call(this);
    }
    var list = this.event().name.split("_");
    if (list.length != 2) {
      return _Game_Event_prototype_characterName.call(this);
    }
    var name = list[0] + "";
    var index = parseInt(list[1]);
    switch (name) {
      case "baby01":
        return getBaby(1, index, this);
      case "baby02":
        return getBaby(2, index, this);
      case "baby03":
        return getBaby(3, index, this);
      case "baby04":
        return getBaby(4, index, this);
      case "baby05":
        return getBaby(5, index, this);
      case "baby06":
        return getBaby(6, index, this);
      case "baby10":
        return getBaby(10, index, this);
      case "baby12":
        return getBaby(12, index, this);
    }
    return _Game_Event_prototype_characterName.call(this);
  };
  var _Game_Event_prototype_direction = Game_Event.prototype.direction;
  Game_Event.prototype.direction = function () {
    if (!$gameMap) {
      return _Game_Event_prototype_direction.call(this);
    }
    if ($gameMap.mapId() != 248) {
      return _Game_Event_prototype_direction.call(this);
    }
    if (!this.event()) {
      return _Game_Event_prototype_direction.call(this);
    }
    var list = this.event().name.split("_");
    if (list.length != 2) {
      return _Game_Event_prototype_direction.call(this);
    }
    var name = list[0] + "";
    var index = parseInt(list[1]);
    switch (name) {
      case "baby01":
        return getDirection(1, index);
      case "baby02":
        return getDirection(2, index);
      case "baby03":
        return getDirection(3, index);
      case "baby04":
        return getDirection(4, index);
      case "baby05":
        return getDirection(5, index);
      case "baby06":
        return getDirection(6, index);
      case "baby10":
        return getDirection(10, index);
      case "baby12":
        return getDirection(12, index);
    }
    return _Game_Event_prototype_direction.call(this);
  };
  var _Game_Event_screenX = Game_Event.prototype.screenX;
  Game_Event.prototype.screenX = function () {
    if ($gameSwitches.value(JUNU_ACTOR1_SW)) {
      if (selectedBabyName) {
        var e = this.event();
        if (e.name == selectedBabyName) {
          return $gamePlayer.screenX() + 12;
        }
      }
    }
    if ($gameSwitches.value(JUNU_OTHER_ACTOR_SW)) {
      if (selectedBabyName) {
        var e = this.event();
        if (e.name == selectedBabyName) {
          if (motherCharacter) {
            return motherCharacter.screenX() + 12;
          }
        }
      }
    }
    return _Game_Event_screenX.call(this);
  };
  var _Game_Event_screenY = Game_Event.prototype.screenY;
  Game_Event.prototype.screenY = function () {
    if ($gameSwitches.value(JUNU_ACTOR1_SW)) {
      if (selectedBabyName) {
        var e = this.event();
        if (e.name == selectedBabyName) {
          return $gamePlayer.screenY() - 4;
        }
      }
    }
    if ($gameSwitches.value(JUNU_OTHER_ACTOR_SW)) {
      if (selectedBabyName) {
        var e = this.event();
        if (e.name == selectedBabyName) {
          if (motherCharacter) {
            return motherCharacter.screenY() - 4;
          }
        }
      }
    }
    return _Game_Event_screenY.call(this);
  };
  var _Game_Event_screenZ = Game_Event.prototype.screenZ;
  Game_Event.prototype.screenZ = function () {
    if (
      $gameSwitches.value(JUNU_ACTOR1_SW) ||
      $gameSwitches.value(JUNU_OTHER_ACTOR_SW)
    ) {
      if (selectedBabyName) {
        var e = this.event();
        if (e.name == selectedBabyName) {
          return 5;
        }
      }
    }
    return _Game_Event_screenZ.call(this);
  };
  var _Game_Event_direction = Game_Event.prototype.direction;
  Game_Event.prototype.direction = function () {
    if ($gameSwitches.value(BABY_DIRECTION_SW)) {
      if (selectedBabyName) {
        var e = this.event();
        if (e.name == selectedBabyName) {
          return 4;
        }
      }
    }
    return _Game_Event_direction.call(this);
  };
  function getBaby(actorId, index, event) {
    var key = getKey(actorId, index);
    if (imageCache[key] != null) {
      return imageCache[key];
    }
    imageCache[key] = calcBabyImage(actorId, index, event);
    return imageCache[key];
  }
  function getKey(actorId, index) {
    return actorId + "_" + index;
  }
  function getDirection(actorId, index) {
    var key = getKey(actorId, index);
    if (directionCache[key] != null) {
      return directionCache[key];
    }
    directionCache[key] = calcBabyDirection(actorId, index);
    return directionCache[key];
  }
  function calcBabyImage(actorId, index, event) {
    var actor = $gameActors.actor(actorId);
    var syusanSet = actor.syusanBaby(index);
    if (!syusanSet) {
      return "";
    }
    var syusanBaby = syusanSet.syusanInfo;
    if (!syusanBaby.ninshinSchedule) {
      console.error(actorId + "の赤ん坊が不正です");
      return "";
    }
    event.setDirection(
      syusanBaby.ninshinSchedule
        .child()
        .getDirection($gameSystem.realDay() - syusanBaby.day())
    );
    return syusanBaby.ninshinSchedule.child().getCharacterImage();
  }
  function calcBabyDirection(actorId, index) {
    var actor = $gameActors.actor(actorId);
    var syusanSet = actor.syusanBaby(index);
    if (!syusanSet) {
      return "";
    }
    var syusanBaby = syusanSet.syusanInfo;
    return syusanBaby.ninshinSchedule
      .child()
      .getDirection($gameSystem.realDay() - syusanBaby.day());
  }
  var _Scene_Load_onLoadSuccess = Scene_Load.prototype.onLoadSuccess;
  Scene_Load.prototype.onLoadSuccess = function () {
    imageCache = {};
    _Scene_Load_onLoadSuccess.call(this);
  };
  var Scene_Baby = /** @class */ (function (_super) {
    __extends(Scene_Baby, _super);
    function Scene_Baby() {
      var _this = (_super !== null && _super.apply(this, arguments)) || this;
      _this._wait = -1;
      return _this;
    }
    Scene_Baby.prototype.start = function () {
      _super.prototype.start.call(this);
      this._babyWindow.refresh();
    };
    Scene_Baby.prototype.create = function () {
      _super.prototype.create.call(this);
      this.createBg();
      ImageManager.loadEro(selectedBaby.imageId());
      this.createBabyWindow();
      this.createMotherWindow();
      this.createLabels();
      this.createPageButtons();
    };
    Scene_Baby.prototype.createPageButtons = function () {
      this._pageupButton = new Sprite_Button("pageup");
      this._pageupButton.x = 94;
      this._pageupButton.y = this.buttonY();
      var pageupRight = this._pageupButton.x + this._pageupButton.width;
      this._pagedownButton = new Sprite_Button("pagedown");
      this._pagedownButton.x = pageupRight + 4;
      this._pagedownButton.y = this.buttonY();
      this.addChild(this._pageupButton);
      this.addChild(this._pagedownButton);
      this._pageupButton.setClickHandler(this.onPageUp.bind(this));
      this._pagedownButton.setClickHandler(this.onPageDown.bind(this));
    };
    Scene_Baby.prototype.buttonY = function () {
      return 100;
    };
    Scene_Baby.prototype.createBg = function () {
      var g = new PIXI.Graphics();
      g.beginFill(0x000, 0.5);
      g.drawRect(0, 0, Graphics.width, Graphics.height);
      g.endFill();
      this.addChild(g);
    };
    Scene_Baby.prototype.createLabels = function () {
      this._label2 = new Nore.Window_Label(TextManager.babyMilk, 600, 20, 550);
      this.addChild(this._label2);
      this._label1 = new Nore.Window_Label3(
        TextManager.outerAlpha,
        100,
        20,
        450
      );
      this.addChild(this._label1);
      this.updateLabel();
    };
    Scene_Baby.prototype.updateLabel = function () {
      var alpha = Math.round($gameSystem.outerAlpha() * 100);
      var text = TextManager.outerAlpha.format(alpha);
      this._label1.setText(text);
    };
    Scene_Baby.prototype.createBabyWindow = function () {
      this._babyWindow = new Window_Baby();
    };
    Scene_Baby.prototype.createMotherWindow = function () {
      this._motherWindow = new Window_Mother();
      if (this._babyWindow.x < 500) {
        this._motherWindow.x = this._babyWindow.x + 250;
      } else {
        this._motherWindow.x = this._babyWindow.x - 550;
      }
      this._motherWindow.x = 50;
      this._motherWindow.drawActorImage();
      this.addChild(this._motherWindow);
      this.addChild(this._babyWindow);
    };
    Scene_Baby.prototype.update = function () {
      _super.prototype.update.call(this);
      if (TouchInput.isTriggered()) {
        if (TouchInput._y > 200) {
          this.popScene();
        }
      }
      if (Input.isTriggered("ok")) {
        $gameSwitches.setValue(410, true);
        this.popScene();
      }
      if (Input.isTriggered("cancel")) {
        $gameSwitches.setValue(410, false);
        this.popScene();
      }
      if (Input.isTriggered("right") || Input.isTriggered("left")) {
        this._wait = 0;
      }
      if (Input.isPressed("right")) {
        if (this._wait < 0) {
          return;
        }
        if (this._wait > 0) {
          this._wait--;
          return;
        }
        this.onUp();
        this._wait = 1;
      }
      if (Input.isPressed("left")) {
        if (this._wait < 0) {
          return;
        }
        if (this._wait > 0) {
          this._wait--;
          return;
        }
        this.onDown();
        this._wait = 1;
      }
      if (Input.isTriggered("pagedown")) {
        this.onPageDown();
      }
      if (Input.isTriggered("pageup")) {
        this.onPageUp();
      }
    };
    Scene_Baby.prototype.onUp = function () {
      $gameSystem.upOuterAlpha();
      this.updateLabel();
      this._motherWindow.drawActorImage();
    };
    Scene_Baby.prototype.onDown = function () {
      $gameSystem.downOuterAlpha();
      this.updateLabel();
      this._motherWindow.drawActorImage();
    };
    Scene_Baby.prototype.onPageUp = function () {
      var previous = selectedHistory
        .actor()
        .previousSyusanBaby(selectedHistory);
      if (!previous) {
        return;
      }
      if (previous.history.day() != selectedHistory.day()) {
        SoundManager.playCursor();
        selectedHistory = previous.history;
        selectedBaby = previous.syusanInfo;
        this._motherWindow.drawActorImage();
        this._babyWindow.waitLoad();
      }
    };
    Scene_Baby.prototype.onPageDown = function () {
      var next = selectedHistory.actor().nextSyusanBaby(selectedHistory);
      if (!next) {
        return;
      }
      if (next.history.day() != selectedHistory.day()) {
        SoundManager.playCursor();
        selectedHistory = next.history;
        selectedBaby = next.syusanInfo;
        this._motherWindow.drawActorImage();
        this._babyWindow.waitLoad();
      }
    };
    return Scene_Baby;
  })(Scene_MenuBase);
  Nore.Scene_Baby = Scene_Baby;
  var WINDOW_W = 442;
  var Window_Baby = /** @class */ (function (_super) {
    __extends(Window_Baby, _super);
    function Window_Baby() {
      var _this = this;
      var w = WINDOW_W;
      var h = 200;
      var x = $gamePlayer.screenX() - 50;
      var y = $gamePlayer.screenY();
      switch ($gamePlayer.direction()) {
        case 2:
          y += 54;
          break;
        case 8:
          y -= 40;
          break;
        case 4:
          y += 8;
          x -= 40;
          break;
        case 6:
          y += 8;
          x += 40;
          break;
      }
      x = 550;
      var r = new Rectangle(x, y, w, h);
      _this = _super.call(this, r) || this;
      return _this;
    }
    Window_Baby.prototype.update = function () {
      _super.prototype.update.call(this);
      if (this._waiting) {
        if (ImageManager.isReady()) {
          this._waiting = false;
          this.refresh();
        }
      }
    };
    Window_Baby.prototype.refresh = function () {
      _super.prototype.refresh.call(this);
      this._windowContentsSprite.removeChildren();
      var rect = new Rectangle(0, 0, WINDOW_W, this.itemHeight());
      this.drawBaby(selectedBaby, rect);
    };
    Window_Baby.prototype.waitLoad = function () {
      this._waiting = true;
      var imageId = selectedBaby.imageId();
      if (imageId) {
        var bitmap = ImageManager.loadEro(imageId);
      }
    };
    return Window_Baby;
  })(Nore.Window_BabyBase);
  var Window_Mother = /** @class */ (function (_super) {
    __extends(Window_Mother, _super);
    function Window_Mother() {
      var _this = this;
      var r = new Rectangle(0, 0, 500, 800);
      _this = _super.call(this, r) || this;
      _this.backOpacity = 0;
      _this.frameVisible = false;
      return _this;
    }
    Window_Mother.prototype.drawActorImage = function () {
      if (!selectedHistory._costume) {
        console.error("コスチュームが見つかりません");
        return;
      }
      var a = $gameActors.actor(selectedHistory._actorId);
      var actor = JsonEx.makeDeepCopy(a);
      actor.removeAllBattleEquips();
      var syusanCount = a.getActorHistory().countSyusan(selectedHistory.day());
      actor.setSyusanCount(syusanCount);
      actor._cacheChanged = false;
      selectedHistory._costume.restoreCostume(actor, true);
      actor._boteId = selectedHistory.costume().boteId();
      actor._day = selectedHistory.day();
      actor.setHoppeId(selectedHistory.costume().hoppeId());
      actor.setDefaultHoppeId(selectedHistory.costume().hoppeId());
      actor.setAcceHoppeId(selectedHistory.costume().hoppeId());
      actor.setCacheChanged();
      this.drawTachieActor(
        actor,
        this,
        0,
        0,
        null,
        selectedHistory._costume.faceId()
      );
      actor.setCacheChanged();
    };
    return Window_Mother;
  })(Window_Base);
})(Nore || (Nore = {}));
