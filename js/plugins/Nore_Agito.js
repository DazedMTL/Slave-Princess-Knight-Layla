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
  var PLACE_VAR = 9;
  var CHURCH_SW = 115;
  var SEIIKI_SW = 143;
  var WarpCommand;
  (function (WarpCommand) {
    WarpCommand["go"] = "go";
    WarpCommand["go2"] = "go2";
    WarpCommand["go3"] = "go3";
    WarpCommand["upgrade"] = "upgrade";
    WarpCommand["cancel"] = "cancel";
  })((WarpCommand = Nore.WarpCommand || (Nore.WarpCommand = {})));
  var Window_DestCommand = /** @class */ (function (_super) {
    __extends(Window_DestCommand, _super);
    function Window_DestCommand() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Window_DestCommand.prototype.setup = function (item) {
      this._item = item;
      this.refresh();
    };
    Window_DestCommand.prototype.makeCommandList = function () {
      var stage = $gameSystem.stageId();
      if (stage >= 8) {
        this.addCommand(getDungeonName(8), WarpCommand.go, stage == 8, 8);
      }
      if (stage >= 7) {
        this.addCommand(getDungeonName(7), WarpCommand.go, stage == 7, 7);
      }
      if (stage >= 6) {
        this.addCommand(getDungeonName(6), WarpCommand.go, stage == 6, 6);
      }
      if (stage >= 5) {
        this.addCommand(getDungeonName(5), WarpCommand.go, stage == 5, 5);
      }
      if (stage >= 4) {
        this.addCommand(getDungeonName(4), WarpCommand.go, stage == 4, 4);
      }
      if (stage >= 3) {
        this.addCommand(getDungeonName(3), WarpCommand.go, stage == 3, 3);
      }
      if (stage >= 2) {
        this.addCommand(getDungeonName(2), WarpCommand.go, stage == 2, 2);
      }
      this.addCommand(getDungeonName(1), WarpCommand.go, stage == 1, 1);
    };
    Window_DestCommand.prototype.drawItem = function (index) {
      //super.drawItem(index);
      var rect = this.itemLineRect(index);
      var align = this.itemTextAlign();
      this.resetTextColor();
      this.changePaintOpacity(this.isCommandEnabled(index));
      this.drawText(
        this.commandName(index),
        rect.x + 25,
        rect.y,
        rect.width - 10,
        align
      );
      var stage = this._list[index].ext;
      var pos = this.getIconPosBy(stage);
      this.drawIconImg(pos.x, pos.y, rect.x + 10, rect.y + 6);
    };
    Window_DestCommand.prototype.getIconPosBy = function (stage) {
      switch (stage) {
        case 1:
          return new PIXI.Point(1, 2);
        case 2:
          return new PIXI.Point(4, 0);
        case 3:
          return new PIXI.Point(2, 1);
        case 4:
          return new PIXI.Point(1, 1);
        case 5:
          return new PIXI.Point(6, 10);
        case 6:
          return new PIXI.Point(3, 1);
        case 7:
          return new PIXI.Point(9, 10);
        case 8:
          return new PIXI.Point(0, 4);
      }
      return new PIXI.Point(0, 0);
    };
    Window_DestCommand.prototype.drawIconImg = function (iconX, iconY, x, y) {
      var baseTexture = this.getBaseTexture();
      var texture = new PIXI.Texture(baseTexture);
      texture.frame = new PIXI.Rectangle(iconX * 48, iconY * 48, 48, 48);
      var sprite = new PIXI.Sprite(texture);
      sprite.x = x;
      sprite.y = y;
      this._windowContentsSprite.addChild(sprite);
    };
    Window_DestCommand.prototype.getBaseTexture = function () {
      var baseTexture = PIXI.utils.BaseTextureCache["system/World_B"];
      if (!baseTexture) {
        var bitmap = ImageManager.loadSystem("World_B");
        if (!bitmap.isReady()) {
          return;
        }
        baseTexture = new PIXI.BaseTexture(bitmap._image);
        baseTexture.resource.url = "system/World_B";
        PIXI.utils.BaseTextureCache["system/World_B"] = baseTexture;
      }
      return baseTexture;
    };
    return Window_DestCommand;
  })(Window_Command);
  var Sprite_Day = /** @class */ (function (_super) {
    __extends(Sprite_Day, _super);
    function Sprite_Day() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Sprite_Day.prototype.initialize = function () {
      _super.prototype.initialize.call(this);
      this.x = 40;
      this.y = 30;
      this.bitmap = new Bitmap(400, 300);
      var day = $gameSystem.realDay();
      this.bitmap.fontSize = 36;
      var text = "";
      if (day == 0) {
      } else {
        text = TextManager.date.format(day);
      }
      if ($gameSystem.isEndlessHMode()) {
        text = TextManager.endlessHMode;
      } else if ($gameSystem.isMorning()) {
        text += TextManager.morning;
      } else {
        text += TextManager.night;
      }
      this.bitmap.drawText(text, 0, 0, 260, 50);
    };
    return Sprite_Day;
  })(Sprite);
  var Scene_DestSelect = /** @class */ (function (_super) {
    __extends(Scene_DestSelect, _super);
    function Scene_DestSelect() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Scene_DestSelect.prototype.create = function () {
      _super.prototype.create.call(this);
      this.createPictures();
      this.createBackground();
      this.createDestWindow();
      this.createActorWindow();
      if ($gameSystem.isMorning()) {
        this.createDungeonWindow();
      } else {
        this.createNikubenkiWindow();
      }
      //this.createTalkWindow();
      //this.createRightTachie();
      //this.createPlayer();
      this.createWindowLayer();
      this.createAllWindows();
      this.createMsgWindow();
      this.createDaySprite();
      this.createFadeSprite();
    };
    Scene_DestSelect.prototype.createDaySprite = function () {
      this._daySprite = new Sprite_Day();
      this.addChild(this._daySprite);
    };
    Scene_DestSelect.prototype.finishScenario = function () {
      this.startInitialScenario();
    };
    Scene_DestSelect.prototype.createMsgWindow = function () {
      this._msgWindow = new Nore.Window_Msg(176);
      this._msgWindow.setHandler("ok", this.onMsgOk.bind(this));
      this._msgWindow.deactivate();
      this.addChild(this._msgWindow);
      this._msgWindow.hide();
    };
    Scene_DestSelect.prototype.startInitialScenario = function () {
      if (this.startMenuScenario()) {
        return;
      }
      if (this.startNotEnoughMemberScenario()) {
        return;
      }
    };
    Scene_DestSelect.prototype.startMenuScenario = function () {
      if (!$gameSystem.isNight()) {
        return false;
      }
      if ($gameSwitches.value(239)) {
        return false;
      }
      $gameSwitches.setValue(239, true);
      this.playScenario("夜パート説明_01");
      this._agitoCommandWindow.visible = false;
      this._agitoCommandWindow.deactivate();
      this._hideDest = true;
      return true;
    };
    Scene_DestSelect.prototype.startNotEnoughMemberScenario = function () {
      if ($gameSwitches.value(208)) {
        return false;
      }
      if (!$gameParty.isShortBattleMember()) {
        return false;
      }
      $gameSwitches.setValue(208, true);
      this._agitoCommandWindow.deactivate();
      this.playScenario("拠点メンバー不足_01");
      this._hideDest = true;
      return true;
    };
    Scene_DestSelect.prototype.createRightTachie = function () {
      this._rightTachie = new Nore.Sprite_RightTachie();
      this.addChild(this._rightTachie);
    };
    Scene_DestSelect.prototype.createFadeSprite = function () {
      this._fadeSprite = new ScreenSprite();
      this.addChild(this._fadeSprite);
    };
    Scene_DestSelect.prototype.update = function () {
      _super.prototype.update.call(this);
      $gameScreen.update();
      //this._player.update();
      this._goldWindow.openness = 255;
      this.updateGoldWindow();
      this._fadeSprite.opacity = 255 - $gameScreen.brightness();
    };
    Scene_DestSelect.prototype.updateGoldWindow = function () {
      this._goldWindow.y = -100;
      /*
            if ($gameVariables.value(4) == 1) {
            } else {
                this._goldWindow.y = 10;
            }*/
    };
    Scene_DestSelect.prototype.createBackground = function () {
      /*this._backgroundSprite = new Sprite();
            this._backgroundSprite.bitmap = ImageManager.loadPicture('map');
            this.addChild(this._backgroundSprite);*/
      var file = "esfan_004_1920_1080";
      if ($gameSystem.isNight()) {
        file = "esfan_004n_1920_1080";
      }
      $gameScreen.showPicture(
        1,
        file,
        0,
        0,
        0,
        100,
        100,
        255,
        PIXI.BLEND_MODES.NORMAL,
        0
      );
    };
    Scene_DestSelect.prototype.createPlayer = function () {
      this._player = new Game_PlayerDest();
      this._player.refresh();
      this._playerSprite = new Sprite_Player(this._player);
      this.addChild(this._playerSprite);
    };
    Scene_DestSelect.prototype.createPictures = function () {
      var width = Graphics.width;
      var height = Graphics.height;
      var x = (Graphics.width - width) / 2;
      var y = (Graphics.height - height) / 2;
      this._pictureContainer = new Sprite();
      this._pictureContainer.setFrame(x, y, width, height);
      for (var i = 0; i <= $gameScreen.maxPictures(); i++) {
        this._pictureContainer.addChild(new Sprite_Picture(i));
      }
      this.addChild(this._pictureContainer);
    };
    Scene_DestSelect.prototype.updateInterpreter = function () {
      if (!this._interpreter) {
        return;
      }
      this._interpreter.update();
      if (!this._interpreter.isRunning()) {
        this._agitoCommandWindow.show();
        this._interpreter = null;
        if ($gameSwitches.value(Nore.TEMP_SWITCH1)) {
          SceneManager.pop();
        } else {
          if ($gameSwitches.value(CHURCH_SW)) {
            this._agitoCommandWindow.activate();
            this._destWindow.hide();
            this.finishScenario();
            return;
          }
          if (this._hideDest) {
            this._hideDest = false;
            this._agitoCommandWindow.activate();
            return;
          }
          var item = this._agitoCommandWindow.item();
          if (item.id == 103) {
            this._actorWindow.activate();
            this.finishScenario();
            return;
          }
          this._destWindow.show();
          this._destWindow.activate();
          this._destWindow.select($gameTemp.selectedIndex);
          this._agitoCommandWindow.deactivate();
        }
      }
    };
    Scene_DestSelect.prototype.createDestWindow = function () {
      this._agitoCommandWindow = new Window_AgitoCommandSelect();
      this._agitoCommandWindow.setHandler("ok", this.onOk.bind(this));
      this._agitoCommandWindow.setHandler("change", this.onChange.bind(this));
      this._agitoCommandWindow.setHandler("cancel", this.onCancel.bind(this));
      this.addChild(this._agitoCommandWindow);
      var height = 32 + $gameSystem.stageId() * 44;
      this._destWindow = new Window_DestCommand(
        new Rectangle(400, 150, 330, height)
      );
      this._destWindow.setHandler(WarpCommand.go, this.onWarp.bind(this));
      this._destWindow.setHandler(WarpCommand.go2, this.onWarp2.bind(this));
      this._destWindow.setHandler(WarpCommand.go3, this.onWarp3.bind(this));
      this._destWindow.setHandler(
        WarpCommand.upgrade,
        this.onUpgrade.bind(this)
      );
      this._destWindow.setHandler(
        WarpCommand.cancel,
        this.onWarpCancel.bind(this)
      );
      this._destWindow.hide();
      this.addChild(this._destWindow);
    };
    Scene_DestSelect.prototype.createTalkWindow = function () {
      this._talkWindow = new Window_TalkWindow();
      this._talkWindow.setHandler("ok", this.onOk.bind(this));
      this._talkWindow.setHandler("change", this.onChange.bind(this));
      this._talkWindow.setHandler("cancel", this.onCancel.bind(this));
      this.addChild(this._talkWindow);
    };
    Scene_DestSelect.prototype.createActorWindow = function () {
      this._actorWindow = new Window_ActorSelect();
      this._actorWindow.setHandler("ok", this.onActorOk.bind(this));
      this._actorWindow.setHandler(
        WarpCommand.cancel,
        this.onWarpCancel.bind(this)
      );
      this._actorWindow.hide();
      this.addChild(this._actorWindow);
    };
    Scene_DestSelect.prototype.createDungeonWindow = function () {
      this._dungeonWindow = new Window_NextDungeon();
      this.addChild(this._dungeonWindow);
    };
    Scene_DestSelect.prototype.createNikubenkiWindow = function () {
      this._nikubenkiWindow = new Window_NikubenkiInfo();
      this.addChild(this._nikubenkiWindow);
    };
    Scene_DestSelect.prototype.onActorOk = function () {
      if (!this._actorWindow.isCurrentItemEnabled2()) {
        this._msgWindow.setTexts(TextManager.resqueMsg);
        this._msgWindow.show();
        this._msgWindow.activate();
        return;
      }
      var item = this._agitoCommandWindow.item();
      var actor = this._actorWindow.item();
      $gameVariables.setValue(24, actor.actorId());
      var file = item.meta["file"];
      this._file = file;
      this.playScenario(this._file + "確認");
    };
    Scene_DestSelect.prototype.onMsgOk = function () {
      this._actorWindow.activate();
      this._msgWindow.hide();
    };
    Scene_DestSelect.prototype.onWarpCancel = function () {
      this._destWindow.hide();
      this._destWindow.deactivate();
      this._actorWindow.hide();
      this._actorWindow.deactivate();
      this._agitoCommandWindow.activate();
    };
    Scene_DestSelect.prototype.checkFromUpgrade = function () {
      if (!$gameTemp.selectedPlace) {
        return;
      }
      this._destWindow.show();
      this._destWindow.activate();
      this._destWindow.setup($gameTemp.selectedPlace);
      this._destWindow.select($gameTemp.selectedIndex);
      this._agitoCommandWindow.deactivate();
      this._agitoCommandWindow.selectItem($gameTemp.selectedPlace);
    };
    Scene_DestSelect.prototype.onOk = function () {
      $gameTemp.selectedIndex = 0;
      var item = this._agitoCommandWindow.item();
      if (!this._agitoCommandWindow.isEnabled(item)) {
        SoundManager.playBuzzer();
        this._agitoCommandWindow.activate();
        return;
      }
      if (item.meta["resque"]) {
        /*const file = item.meta['file'];
                this._file = file;
                this.playScenario(this._file + '確認');*/
        this._actorWindow.show();
        this._actorWindow.activate();
        this._actorWindow.select(0);
        this._agitoCommandWindow.deactivate();
        return;
      }
      if (item.meta["rest"] || item.meta["nextDay"] || item.meta["nextNight"]) {
        $gameVariables.setValue(22, 98);
        SceneManager.pop();
        return;
      }
      if (item.meta["formation"]) {
        SceneManager.push(Nore.Scene_Formation);
        return;
      }
      if (item.meta["nikubenki"]) {
        SceneManager.push(Nore.Scene_Prison);
        return;
      }
      if (item.meta["talk"]) {
        this.onCancel();
        return;
      }
      if (item.meta["save"]) {
        $gameVariables.setValue(22, 96);
        this.onCancel();
        return;
      }
      if (item.meta["meeting"]) {
        $gameVariables.setValue(22, 97);
        $gameTemp.reserveCommonEvent(87);
        SceneManager.pop();
        return;
      }
      var type = 1;
      if (type > 0) {
        this._destWindow.show();
        this._destWindow.activate();
        this._destWindow.setup(item);
        this._destWindow.select($gameTemp.selectedIndex);
        this._agitoCommandWindow.deactivate();
      } else {
        this.onWarp();
      }
    };
    Scene_DestSelect.prototype.onUpgrade = function () {
      $gameTemp.selectedIndex = this._destWindow.maxItems() - 1;
      var item = this._agitoCommandWindow.item();
      $gameTemp.upgradeType = parseInt(item.meta["upgrade"]);
      $gameTemp.selectedPlace = item;
      SceneManager.push(Nore.Scene_Upgrade);
    };
    Scene_DestSelect.prototype.onWarp = function () {
      var item = this._agitoCommandWindow.item();
      $gameTemp.selectedIndex = 0;
      var id = item.id;
      this._agitoCommandWindow.deactivate();
      var file = item.meta["file"];
      if (file) {
        this._file = file;
        if ($gameParty.isNoMedalActorExists()) {
          this.playScenario(this._file + "確認勲章なし");
        } else {
          if ($gameParty.needCrystalConfirm()) {
            this.playScenario(this._file + "確認結晶購入可能");
          } else {
            if ($gameParty.needPowerupConfirm()) {
              this.playScenario(this._file + "確認パワーアップ可能");
            } else {
              this.playScenario(this._file + "確認");
            }
          }
        }
        return;
      }
      this.popScene();
    };
    Scene_DestSelect.prototype.onWarp2 = function () {
      var item = this._agitoCommandWindow.item();
      $gameTemp.selectedIndex = 1;
      var id = item.id;
      $gameVariables.setValue(20, id);
      this._agitoCommandWindow.deactivate();
      var file = item.meta["file"];
      if (file) {
        this._file = file;
        this.playScenario(this._file + "確認");
        return;
      }
      this.popScene();
    };
    Scene_DestSelect.prototype.onWarp3 = function () {
      var item = this._agitoCommandWindow.item();
      $gameTemp.selectedIndex = 2;
      var id = item.id;
      $gameVariables.setValue(20, id);
      this._agitoCommandWindow.deactivate();
      var file = item.meta["file"];
      if (file) {
        this._file = file;
        this.playScenario(this._file + "確認");
        return;
      }
      this.popScene();
    };
    Scene_DestSelect.prototype.onCancel = function () {
      $gameVariables.setValue(20, 0);
      this.popScene();
    };
    Scene_DestSelect.prototype.onChange = function () {
      /*
            var item = this._agitoCommandWindow.item();
            if (item) {
                this._player._x = parseInt(item.meta['x']);
                this._player._y = parseInt(item.meta['y']);
            }
            */
    };
    Scene_DestSelect.prototype.start = function () {
      _super.prototype.start.call(this);
      this._agitoCommandWindow.refresh();
      this._agitoCommandWindow.activate();
      this._agitoCommandWindow.select(0);
      this.checkFromUpgrade();
      this.startInitialScenario();
    };
    return Scene_DestSelect;
  })(Nore.Scene_Talk);
  Nore.Scene_DestSelect = Scene_DestSelect;
  var Game_PlayerDest = /** @class */ (function (_super) {
    __extends(Game_PlayerDest, _super);
    function Game_PlayerDest() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Game_PlayerDest.prototype.screenX = function () {
      return this._x;
    };
    Game_PlayerDest.prototype.screenY = function () {
      return this._y;
    };
    Game_PlayerDest.prototype.direction = function () {
      return 2;
    };
    Game_PlayerDest.prototype.isTransparent = function () {
      return false;
    };
    Game_PlayerDest.prototype.hasStepAnime = function () {
      return true;
    };
    Game_PlayerDest.prototype.characterName = function () {
      return $gamePlayer.characterName();
    };
    Game_PlayerDest.prototype.characterIndex = function () {
      return $gamePlayer.characterIndex();
    };
    Game_PlayerDest.prototype.update = function (sceneActive) {
      var lastScrolledX = this.scrolledX();
      var lastScrolledY = this.scrolledY();
      var wasMoving = this.isMoving();
      this.updateDashing();
      if (sceneActive) {
        this.moveByInput();
      }
      Game_Character.prototype.update.call(this);
      this._followers.update();
    };
    return Game_PlayerDest;
  })(Game_Player);
  var Window_AgitoCommandSelect = /** @class */ (function (_super) {
    __extends(Window_AgitoCommandSelect, _super);
    function Window_AgitoCommandSelect() {
      var _this = _super.call(this, new Rectangle(50, 90, 400, 490)) || this;
      _this.clearDestList();
      return _this;
    }
    Window_AgitoCommandSelect.prototype.clearDestList = function () {
      this._windowContentsSprite.removeChildren();
      this._destList = null;
      this.makeDestList();
      this.height = this.windowHeight();
    };
    Window_AgitoCommandSelect.prototype.makeDestList = function () {
      $gameSwitches.setValue(18, false);
      if (this._destList) {
        return;
      }
      this._destList = [];
      var d = this._destList;
      if ($gameSystem.isMorning()) {
        d.push($dataItems[101]);
        d.push($dataItems[102]);
        d.push($dataItems[108]);
        d.push($dataItems[104]);
      } else {
        d.push($dataItems[106]);
        if ($gameSystem.isEndlessHMode()) {
          d.push($dataItems[110]);
        } else {
          d.push($dataItems[107]);
        }
      }
      //d.push($dataItems[103]);
      //d.push($dataItems[104]);
      d.push($dataItems[109]);
      if ($gameSystem.realDay() === 1) {
        //d.push($dataItems[109]);
      } else {
        d.push($dataItems[105]);
      }
      //d.push(Destination.Forest);
      this.refresh();
    };
    Window_AgitoCommandSelect.prototype.canWandering = function () {
      return false;
    };
    Window_AgitoCommandSelect.prototype.isEroEventExists = function (area) {
      switch (area) {
        case Destination.Town:
          return (
            $gameSystem.isEroEventReserved(5) ||
            $gameSystem.isEroEventReserved(4)
          );
      }
    };
    Window_AgitoCommandSelect.prototype.windowHeight = function () {
      return this._destList.length * (this.lineHeight() + 8) + 14 * 2;
    };
    Window_AgitoCommandSelect.prototype.selectedId = function () {
      return this.item().id;
    };
    Window_AgitoCommandSelect.prototype.item = function () {
      return this._destList[this.index()];
    };
    Window_AgitoCommandSelect.prototype.selectItem = function (item) {
      this.select(this.itemAt(item));
    };
    Window_AgitoCommandSelect.prototype.lineHeight = function () {
      return 50;
    };
    Window_AgitoCommandSelect.prototype.itemAt = function (item) {
      for (var i = 0; i < this._destList.length; i++) {
        if (this._destList[i] == item) {
          return i;
        }
      }
      return -1;
    };
    Window_AgitoCommandSelect.prototype.drawItem = function (index) {
      var item = this._destList[index];
      var rect = this.itemRect(index);
      if (this.isEnabled(item)) {
        this.changePaintOpacity(true);
      } else {
        this.changePaintOpacity(false);
      }
      var offset = 24 + 28;
      var iconIndex = item.iconIndex;
      this.drawIcon(iconIndex, rect.x + 5, rect.y + 8);
      this.drawText(getItemName(item), rect.x + offset, rect.y, 340, "left");
      this.changePaintOpacity(true);
      var iconX = parseInt(item.meta["iconX"]);
      var iconY = parseInt(item.meta["iconY"]);
      /*if (this.isEroEventExists(destId)) {
                this.drawIcon(84, rect.x, rect.y + 2);
            }*/
      //  this.drawIcon(90, rect.x + 28, rect.y + 2);
    };
    Window_AgitoCommandSelect.prototype.isEnabled = function (item) {
      if (item.id == 101) {
        return !$gameParty.isShortBattleMember();
      }
      if (item.id == 102) {
        /*if ($gameSystem.stageId() < 3) {
                    return false;
                }
                return ! $gameParty.isShortBattleMember()*/
        return true;
      }
      if (item.id == 103) {
        if ($gameParty.hasResqueActor()) {
          return true;
        } else {
          return false;
        }
      }
      if (item.id == 104) {
        if ($gameSystem.realDay() >= 3) {
          return true;
        }
      }
      if (item.id == 105) {
        return !$gameActors.actor(1).isCaptive();
      }
      if (item.id == 106) {
        return true;
      }
      if (item.id == 107 || item.id == 110) {
        return true;
      }
      if (item.id == 108) {
        //if ($gameSwitches.value(379)) {
        return true;
        //}
      }
      if (item.id == 109) {
        return true;
      }
      return false;
    };
    Window_AgitoCommandSelect.prototype.isCurrentPlace = function (item) {
      return $gameVariables.value(PLACE_VAR) == item.id;
    };
    Window_AgitoCommandSelect.prototype.getDestName = function (destId) {
      return "aa";
    };
    Window_AgitoCommandSelect.prototype.maxItems = function () {
      if (!this._destList) {
        return 0;
      }
      return this._destList.length;
    };
    Window_AgitoCommandSelect.prototype.maxCols = function () {
      return 1;
    };
    Window_AgitoCommandSelect.prototype.isCancelEnabled = function () {
      return $gameSystem.realDay() > 1;
    };
    return Window_AgitoCommandSelect;
  })(Window_Selectable);
  Nore.Window_AgitoCommandSelect = Window_AgitoCommandSelect;
  var Window_ActorSelect = /** @class */ (function (_super) {
    __extends(Window_ActorSelect, _super);
    function Window_ActorSelect() {
      var _this = _super.call(this, new Rectangle(450, 190, 400, 490)) || this;
      _this.clearDestList();
      return _this;
    }
    Window_ActorSelect.prototype.clearDestList = function () {
      this._windowContentsSprite.removeChildren();
      this._actorList = null;
      this.makeDestList();
      this.height = this.windowHeight();
    };
    Window_ActorSelect.prototype.makeDestList = function () {
      if (this._actorList) {
        return;
      }
      this._actorList = [];
      var d = this._actorList;
      for (
        var _i = 0, _a = $gameParty.getCaptiveActorList();
        _i < _a.length;
        _i++
      ) {
        var a = _a[_i];
        d.push(a);
      }
      this.refresh();
    };
    Window_ActorSelect.prototype.windowHeight = function () {
      return this._actorList.length * (this.lineHeight() + 8) + 14 * 2;
    };
    Window_ActorSelect.prototype.item = function () {
      return this._actorList[this.index()];
    };
    Window_ActorSelect.prototype.lineHeight = function () {
      return 50;
    };
    Window_ActorSelect.prototype.itemAt = function (item) {
      for (var i = 0; i < this._actorList.length; i++) {
        if (this._actorList[i] == item) {
          return i;
        }
      }
      return -1;
    };
    Window_ActorSelect.prototype.drawItem = function (index) {
      /*
            var actor = this._actorList[index];
            var rect = this.itemRect(index);
            this.changePaintOpacity(this.isEnabled(actor));
    
            const day = actor.getLastHistory().captiveDay();
            const str = hankaku2Zenkaku(day);

            this.drawText(actor.name() + TextManager.captiveDate.format(str), rect.x + 54, rect.y, 310, 'left');
            this.changePaintOpacity(true);
            */
      /*if (this.isEroEventExists(destId)) {
                this.drawIcon(84, rect.x, rect.y + 2);
            }*/
      //  this.drawIcon(90, rect.x + 28, rect.y + 2);
    };
    Window_ActorSelect.prototype.isEnabled = function (actor) {
      return actor.isFound();
    };
    Window_ActorSelect.prototype.maxItems = function () {
      if (!this._actorList) {
        return 0;
      }
      return this._actorList.length;
    };
    Window_ActorSelect.prototype.maxCols = function () {
      return 1;
    };
    Window_ActorSelect.prototype.isCurrentItemEnabled2 = function () {
      return this.isEnabled(this.item());
    };
    return Window_ActorSelect;
  })(Window_Selectable);
  Nore.Window_ActorSelect = Window_ActorSelect;
  var Window_TalkWindow = /** @class */ (function (_super) {
    __extends(Window_TalkWindow, _super);
    function Window_TalkWindow() {
      var _this = _super.call(this, new Rectangle(450, 190, 400, 490)) || this;
      _this.clearTalkList();
      return _this;
    }
    Window_TalkWindow.prototype.clearTalkList = function () {
      this._windowContentsSprite.removeChildren();
      this._actorList = null;
      this.makeTalkList();
      this.height = this.windowHeight();
    };
    Window_TalkWindow.prototype.makeTalkList = function () {
      if (this._actorList) {
        return;
      }
      this._actorList = [];
      var d = this._actorList;
      for (
        var _i = 0, _a = $gameParty.getCaptiveActorList();
        _i < _a.length;
        _i++
      ) {
        var a = _a[_i];
        d.push(a);
      }
      this.refresh();
    };
    Window_TalkWindow.prototype.windowHeight = function () {
      return this._actorList.length * (this.lineHeight() + 8) + 14 * 2;
    };
    Window_TalkWindow.prototype.item = function () {
      return this._actorList[this.index()];
    };
    Window_TalkWindow.prototype.lineHeight = function () {
      return 50;
    };
    Window_TalkWindow.prototype.itemAt = function (item) {
      for (var i = 0; i < this._actorList.length; i++) {
        if (this._actorList[i] == item) {
          return i;
        }
      }
      return -1;
    };
    Window_TalkWindow.prototype.drawItem = function (index) {
      var actor = this._actorList[index];
      var rect = this.itemRect(index);
      this.changePaintOpacity(this.isEnabled(actor));
      var day = actor.getLastHistory().captiveDay();
      var str = hankaku2Zenkaku(day);
      this.drawText(
        actor.name() + TextManager.captiveDate.format(str),
        rect.x + 54,
        rect.y,
        310,
        "left"
      );
      this.changePaintOpacity(true);
      /*if (this.isEroEventExists(destId)) {
                this.drawIcon(84, rect.x, rect.y + 2);
            }*/
      //  this.drawIcon(90, rect.x + 28, rect.y + 2);
    };
    Window_TalkWindow.prototype.isEnabled = function (actor) {
      return actor.isFound();
    };
    Window_TalkWindow.prototype.maxItems = function () {
      if (!this._actorList) {
        return 0;
      }
      return this._actorList.length;
    };
    Window_TalkWindow.prototype.maxCols = function () {
      return 1;
    };
    Window_TalkWindow.prototype.isCurrentItemEnabled2 = function () {
      return this.isEnabled(this.item());
    };
    return Window_TalkWindow;
  })(Window_Selectable);
  Nore.Window_TalkWindow = Window_TalkWindow;
  var Window_NextDungeon = /** @class */ (function (_super) {
    __extends(Window_NextDungeon, _super);
    function Window_NextDungeon() {
      var _this = _super.call(this, new Rectangle(870, 350, 380, 280)) || this;
      _this.refresh();
      return _this;
    }
    Window_NextDungeon.prototype.refresh = function () {
      this.contents.clear();
      this.drawMembers(0);
      this.drawCrystal();
    };
    Window_NextDungeon.prototype.drawCrystal = function () {
      var xx = 20;
      var yy = 190;
      this.contents.fontSize = 24;
      this.drawText($gameParty.crystal(), xx + 46, yy, 110, "left");
      this.drawIcon(873, xx, yy);
    };
    Window_NextDungeon.prototype.drawMembers = function (y) {
      if ($gameParty.isShortBattleMember()) {
        this.drawShortMember(y);
        return;
      }
      this.drawText(TextManager.inSortie2, 10, y, 200);
      var index = 0;
      var interval = 54;
      for (var _i = 0, _a = $gameParty.battleMembers(); _i < _a.length; _i++) {
        var m = _a[_i];
        this.drawMember(index * interval + 65, y + 100, m);
        index++;
      }
    };
    Window_NextDungeon.prototype.drawShortMember = function (y) {
      this.drawText(TextManager.shortMember, 10, y + 40, 300);
    };
    Window_NextDungeon.prototype.drawMember = function (x, y, actor) {
      this.drawCharacterImage(actor.actorId(), x, y);
      if (actor.needPowerupConfirm()) {
        var xx = x - 36;
        var yy = y - 7;
        var baseTexture2 = Nore.getSystemBaseTexture("Battle");
        var rect2 = new Rectangle(32 * 3, 32 * 6, 78, 32);
        var texture2 = new PIXI.Texture(baseTexture2, rect2);
        var sprite2 = new PIXI.Sprite(texture2);
        sprite2.x = xx;
        sprite2.y = yy;
        this._windowContentsSprite.addChild(sprite2);
      }
      this.drawMedals(x, y, actor);
    };
    Window_NextDungeon.prototype.drawMedals = function (x, y, actor) {
      var xx = x - 42;
      var yy = y + 17;
      var medalCount = actor.numMedalSlot();
      for (var i = 0; i < medalCount; i++) {
        var medal = actor["_medal" + (i + 1)];
        var xxx = xx;
        var yyy = yy;
        if (i == 1 || i == 3) {
          xxx += 18;
        }
        if (i == 2 || i == 3) {
          yyy += 18;
        }
        this.drawMedal(xxx, yyy, medal);
      }
    };
    Window_NextDungeon.prototype.drawMedal = function (x, y, medal) {
      var xx = x;
      var yy = y;
      this.contents.fillRect(xx, yy, 16, 16, "#000000");
      if (!medal) {
        return;
      }
      this.drawIconHalf(medal.iconIndex(), xx, yy);
    };
    Window_NextDungeon.prototype.drawIconHalf = function (iconIndex, x, y) {
      var bitmap = ImageManager.loadSystem("IconSet");
      var pw = ImageManager.iconWidth;
      var ph = ImageManager.iconHeight;
      var sx = (iconIndex % 16) * pw;
      var sy = Math.floor(iconIndex / 16) * ph;
      //this.contents.blt(bitmap, sx, sy, pw, ph, x, y);
      this.contents.blt(bitmap, sx, sy, pw, ph, x, y, pw / 2, ph / 2);
    };
    Window_NextDungeon.prototype.drawCharacterImage = function (actorId, x, y) {
      var cos = new CostumeSaver(actorId);
      var c = new Nore.Game_DungeonCharacter(cos, x - 13, y + 12);
      var sprite = new Sprite_ActorCharacter(c, cos);
      this._windowContentsSprite.addChild(sprite);
    };
    return Window_NextDungeon;
  })(Window_Base);
  Nore.Window_NextDungeon = Window_NextDungeon;
  var Window_NikubenkiInfo = /** @class */ (function (_super) {
    __extends(Window_NikubenkiInfo, _super);
    function Window_NikubenkiInfo() {
      var _this = _super.call(this, new Rectangle(920, 200, 300, 450)) || this;
      _this.refresh();
      return _this;
    }
    Window_NikubenkiInfo.prototype.refresh = function () {
      this.contents.clear();
      this.drawMembers(20);
    };
    Window_NikubenkiInfo.prototype.drawMembers = function (y) {
      this.contents.fontSize = 22;
      this.drawText(TextManager.nikubenkiTitle, 0, 5, 280, "center");
      var index = 0;
      var interval = 94;
      for (
        var _i = 0, _a = $gameParty.prisonInfo().slotList();
        _i < _a.length;
        _i++
      ) {
        var slot = _a[_i];
        var actorId = slot.actorId();
        var actor = $gameActors.actor(actorId);
        var xx = 65;
        var yy = index * interval + y;
        if (actor) {
          this.drawMember(xx, yy + 100, actor);
          this.drawCount(actor, xx + 30, yy + 28);
          index++;
        } else {
        }
      }
    };
    Window_NikubenkiInfo.prototype.drawMember = function (x, y, actor) {
      this.drawCharacterImage(actor.actorId(), x, y);
    };
    Window_NikubenkiInfo.prototype.drawCharacterImage = function (
      actorId,
      x,
      y
    ) {
      var actor = $gameActors.actor(actorId);
      var cos = new CostumeSaver(actorId);
      var c = new Nore.Game_DungeonCharacter(cos, x - 13, y + 12);
      var sprite = new Sprite_ActorCharacter(c, cos);
      //const c = new Game_DungeonCharacter(actor, x - 13, y + 12);
      //const sprite = new Sprite_Character(c);
      this._windowContentsSprite.addChild(sprite);
    };
    Window_NikubenkiInfo.prototype.drawCount = function (actor, x, y) {
      this.contents.fontSize = 16;
      if (actor.actorId() > 20) {
        this.drawNumOfPerson(actor, x, y);
        return;
      }
      var info = $gameParty.prisonInfo();
      var text = info.nikubenkiName(actor.actorId());
      this.drawText(text, x, y, 180);
      y += 32;
      var n = actor.getActorHistory().countNikubenki($gameSystem.day());
      this.drawText(TextManager.nikubenkiDay, x, y, 80);
      this.drawText(
        TextManager.count.format(n),
        x + 30,
        y,
        Nore.MEM_W,
        "right"
      );
    };
    Window_NikubenkiInfo.prototype.drawNumOfPerson = function (actor, x, y) {
      var info = $gameParty.prisonerInfo();
      var num = info.getNum(actor.actorId());
      //this.drawText(TextManager.nikubenkiWoman, x, y, 80);
      var total = info.getTotal(actor.actorId());
      this.drawText(
        TextManager.nikubenkiMob.format(num, total),
        x,
        y,
        Nore.MEM_W,
        "right"
      );
      //this.drawText(TextManager.nikubenkiNum.format(num), x, y, MEM_W, 'right');
    };
    return Window_NikubenkiInfo;
  })(Window_Base);
  Nore.Window_NikubenkiInfo = Window_NikubenkiInfo;
})(Nore || (Nore = {}));
var Destination;
(function (Destination) {
  Destination[(Destination["Town"] = 0)] = "Town";
  Destination[(Destination["Forest"] = 1)] = "Forest";
  Destination[(Destination["Dungeon"] = 2)] = "Dungeon";
  Destination[(Destination["Goblin"] = 3)] = "Goblin";
  Destination[(Destination["Tower"] = 4)] = "Tower";
})(Destination || (Destination = {}));
