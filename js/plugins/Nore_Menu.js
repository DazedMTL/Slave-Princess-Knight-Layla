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
var KIGAE_OPEN_SWITCH = 65;
var Nore;
(function (Nore) {
  Scene_Map.prototype.callMenu = function () {
    SoundManager.playOk();
    SceneManager.push(Scene_Menu2);
    Window_MenuCommand.initCommandPosition();
    $gameTemp.clearDestination();
    this._mapNameWindow.hide();
    this._waitCount = 2;
  };
  var _Scene_Map_prototype_isMenuCalled = Scene_Map.prototype.isMenuCalled;
  Scene_Map.prototype.isMenuCalled = function () {
    if ($gameSwitches.value(171)) {
      return false;
    }
    if (this._windowBackLog) {
      return false;
    }
    return _Scene_Map_prototype_isMenuCalled.call(this);
    return (
      Input.isTriggered("menu") ||
      Input.isTriggered("cancel") ||
      TouchInput.isCancelled()
    );
  };
  var Scene_Menu2 = /** @class */ (function (_super) {
    __extends(Scene_Menu2, _super);
    function Scene_Menu2() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Scene_Menu2.prototype.create = function () {
      $gameParty.recoverMp();
      Scene_Base.prototype.create.call(this);
      this.createBackground();
      this.updateActor();
      this.createWindowLayer();
      this.createCommandWindow();
      if ($gameParty.inDungeon()) {
        this.createGoldWindow();
      } else {
        this.createCrystalWindow();
      }
      this.createStatusWindow();
      this.createDayWindow();
      this.createMsgWindow();
    };
    Scene_Menu2.prototype.start = function () {
      _super.prototype.start.call(this);
      this.startSelection();
      this.selectLevelUp();
    };
    Scene_Menu2.prototype.startSelection = function () {
      if ($gameSwitches.value(254)) {
        // 装備ショートカット
        $gameSwitches.setValue(254, false);
        this.startEquipSelection();
        return;
      }
      /*if ($gameSwitches.value(255)) {
                // パワーアップショートカット
                $gameSwitches.setValue(255, false);
                this.startPowerupSelection();
                return;
            }*/
      if (!$gameTemp.isCancelMenu) {
        return;
      }
      $gameTemp.isCancelMenu = false;
      this.commandPersonal();
      this._commandWindow.deactivate();
    };
    Scene_Menu2.prototype.startEquipSelection = function () {
      this._commandWindow.selectSymbol("equip");
      Window_MenuCommand._lastCommandSymbol = "equip";
      this.commandPersonal();
      this._commandWindow.deactivate();
    };
    Scene_Menu2.prototype.startPowerupSelection = function () {
      this._commandWindow.selectSymbol("powerUp");
      Window_MenuCommand._lastCommandSymbol = "powerUp";
      this.commandPersonal();
      this._commandWindow.deactivate();
      $gameParty.setMenuActor($gameActors.actor(1));
      this.onPersonalOk();
    };
    Scene_Menu2.prototype.selectLevelUp = function () {
      // 全員LVアップできるからのLVアップ選択
      if ($gameSwitches.value(67)) {
        this._commandWindow.select(1);
        this._commandWindow.deactivate();
        this.commandPersonal();
      }
    };
    Scene_Menu2.prototype.createMsgWindow = function () {
      this._msgWindow = new Nore.Window_Msg(176);
      this._msgWindow.setHandler("ok", this.onMsgOk.bind(this));
      this._msgWindow.deactivate();
      this._msgWindow.setText(TextManager.cantKigae);
      this.addChild(this._msgWindow);
      this._msgWindow.hide();
    };
    Scene_Menu2.prototype.createCrystalWindow = function () {
      var rect = this.goldWindowRect();
      this._crystalWindow = new Window_Crystal(rect);
      this.addWindow(this._crystalWindow);
    };
    Scene_Menu2.prototype.createDayWindow = function () {
      var text;
      if ($gameSystem.isEndlessHMode()) {
        text = TextManager.endlessHMode;
      } else {
      /* else if ($gameParty.inDungeon()) {
                text = TextManager.partyExp + ': ' + $gameParty.partyExp();
            }*/
        if ($gameSystem.realDay() > 0) {
          text = TextManager.date.format($gameSystem.realDay()) + " ";
        } else {
          text = "";
        }
        if ($gameSystem.isMorning()) {
          text += $gameSystem.getDifficultyText();
        } else {
          text += TextManager.night;
        }
      }
      var labelWindow = new Nore.Window_Label2(text, 0, 0, 210);
      this.addChild(labelWindow);
    };
    Scene_Menu2.prototype.createBackground = function () {
      _super.prototype.createBackground.call(this);
      this.createDark();
    };
    Scene_Menu2.prototype.createStatusWindow = function () {
      var rect = this.statusWindowRect();
      if ($gameParty.inDungeon()) {
        this._statusWindow = new Nore.Window_MembersBattle(rect);
      } else {
        this._statusWindow = new Nore.Window_Members(rect);
      }
      this.addWindow(this._statusWindow);
    };
    Scene_Menu2.prototype.statusWindowRect = function () {
      var ww = Graphics.boxWidth;
      var wy = 114;
      var wh = Graphics.boxHeight - wy;
      var wx = 0;
      return new Rectangle(wx, wy, ww, wh);
    };
    Scene_Menu2.prototype.createDark = function () {
      var dark = new PIXI.Graphics();
      dark.beginFill(0, 0.4);
      dark.drawRect(0, 0, Graphics.boxWidth + 10, Graphics.boxHeight + 10);
      dark.endFill();
      this.addChild(dark);
    };
    Scene_Menu2.prototype.goldWindowRect = function () {
      var rect = _super.prototype.goldWindowRect.call(this);
      rect.x = 0;
      rect.y = 45;
      rect.width = 200;
      return rect;
    };
    Scene_Menu2.prototype.createCommandWindow = function () {
      var rect = this.commandWindowRect();
      var commandWindow = new Window_MenuCommand2(rect);
      commandWindow.setHandler("item", this.commandItem.bind(this));
      commandWindow.setHandler("skill", this.commandPersonal.bind(this));
      commandWindow.setHandler("equip", this.commandPersonal.bind(this));
      commandWindow.setHandler("status", this.commandPersonal.bind(this));
      commandWindow.setHandler("medal", this.commandMedal.bind(this));
      commandWindow.setHandler("eroStatus", this.commandPersonal.bind(this));
      commandWindow.setHandler("formation", this.commandFormation.bind(this));
      commandWindow.setHandler("options", this.commandOptions.bind(this));
      commandWindow.setHandler("save", this.commandSave.bind(this));
      commandWindow.setHandler("load", this.commandLoad.bind(this));
      commandWindow.setHandler("gameEnd", this.commandGameEnd.bind(this));
      commandWindow.setHandler("cancel", this.popScene.bind(this));
      commandWindow.setHandler("kigae", this.commandPersonal.bind(this));
      commandWindow.setHandler("record", this.commandRecord.bind(this));
      commandWindow.setHandler("mainMenu", this.commandMainMenu.bind(this));
      commandWindow.setHandler("history", this.commandPersonal.bind(this));
      commandWindow.setHandler("members", this.commandMembers.bind(this));
      commandWindow.setHandler(
        "encyclopedia",
        this.commandEncyclopedia.bind(this)
      );
      commandWindow.setHandler("levelUp", this.commandPersonal.bind(this));
      commandWindow.setHandler("collection", this.commandCollection.bind(this));
      commandWindow.setHandler("babyList", this.commandBabyList.bind(this));
      commandWindow.setHandler("powerUp", this.commandPersonal.bind(this));
      commandWindow.setHandler("powerUp2", this.commandPowerup.bind(this));
      this.addWindow(commandWindow);
      this._commandWindow = commandWindow;
    };
    Scene_Menu2.prototype.commandWindowRect = function () {
      var wx = 208;
      var ww = Graphics.boxWidth - wx;
      var wh = 114;
      var wy = 0;
      return new Rectangle(wx, wy, ww, wh);
    };
    Scene_Menu2.prototype.commandEncyclopedia = function () {
      this.popScene();
    };
    Scene_Menu2.prototype.commandStatus = function () {
      SceneManager.push(Nore.Scene_Status2);
    };
    Scene_Menu2.prototype.commandCollection = function () {
      SceneManager.push(Nore.Scene_Collection);
    };
    Scene_Menu2.prototype.commandBabyList = function () {
      SceneManager.push(Nore.Scene_BabyListAll);
    };
    Scene_Menu2.prototype.commandMainMenu = function () {
      $gameSwitches.setValue(62, false);
      $gameSwitches.setValue(84, true);
      this.popScene();
    };
    Scene_Menu2.prototype.commandMedal = function () {
      SceneManager.push(Nore.Scene_Medal);
    };
    Scene_Menu2.prototype.commandKigae = function () {
      SceneManager.push(Nore.Scene_Kigae);
    };
    Scene_Menu2.prototype.commandLoad = function () {
      SceneManager.push(Scene_Load);
    };
    Scene_Menu2.prototype.commandOffering = function () {
      SceneManager.push(Nore.Scene_Upgrade);
    };
    Scene_Menu2.prototype.commandMembers = function () {
      SceneManager.push(Nore.Scene_Members);
    };
    Scene_Menu2.prototype.commandFormation = function () {
      SceneManager.push(Nore.Scene_Formation);
    };
    Scene_Menu2.prototype.commandPowerup = function () {
      SceneManager.push(Nore.Scene_PowerUp);
    };
    Scene_Menu2.prototype.commandItem = function () {
      if ($gameParty.battleItems().length == 0 && !$gameSwitches.value(218)) {
        SoundManager.playBuzzer();
        this._msgWindow.setText(TextManager.hasNoItems);
        this._msgWindow.show();
        this._msgWindow.activate();
        return;
      }
      SceneManager.push(Nore.Scene_Item2);
    };
    Scene_Menu2.prototype.commandRecord = function () {
      SceneManager.push(Nore.Scene_Record);
    };
    Scene_Menu2.prototype.onPersonalOk = function () {
      switch (this._commandWindow.currentSymbol()) {
        case "skill":
          SceneManager.push(Nore.Scene_Skill2);
          break;
        case "equip":
          SceneManager.push(Nore.Scene_Equip2);
          break;
        case "status":
          SceneManager.push(Nore.Scene_Status2);
          break;
        case "eroStatus":
          var actorId = $gameParty.menuActor().actorId();
          var actorHistory = $gameSystem
            .historyManager()
            .getActorHistory(actorId);
          $gameTemp.history = actorHistory.lastHistory();
          SceneManager.push(Nore.Scene_EroStatus);
          break;
        case "kigae":
          {
            var actor = $gameParty.menuActor();
            /*if (! actor.canKigae()) {
                            SoundManager.playBuzzer();
                            this._msgWindow.show();
                            this._msgWindow.activate();
                            return;
                        }*/
            SceneManager.push(Nore.Scene_Kigae);
          }
          break;
        case "history":
          $gameTemp.lastHistoryIndex = null;
          SceneManager.push(Nore.Scene_HistoryList);
          break;
        case "powerUp":
          SceneManager.push(Nore.Scene_PowerUp2);
          break;
        case "levelUp":
          {
            var actor = $gameParty.menuActor();
            /*if (! actor.canLevelUp($gameParty.partyExp())) {
                            SoundManager.playBuzzer();
                            this._statusWindow.activate();
                            return;
                        }*/
            SceneManager.push(Nore.Scene_LevelUp);
          }
          break;
      }
    };
    Scene_Menu2.prototype.onMsgOk = function () {
      this._commandWindow.activate();
      this._msgWindow.hide();
      this._msgWindow.deactivate();
    };
    return Scene_Menu2;
  })(Scene_Menu);
  Nore.Scene_Menu2 = Scene_Menu2;
  var Window_MenuCommand2 = /** @class */ (function (_super) {
    __extends(Window_MenuCommand2, _super);
    function Window_MenuCommand2() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Window_MenuCommand2.prototype.maxCols = function () {
      return 6;
    };
    Window_MenuCommand2.prototype.addMainCommands = function () {
      var enabled = this.areMainCommandsEnabled();
      if (this.needsCommand("item")) {
        this.addCommand(TextManager._item, "item", $gameSwitches.value(1));
      }
      //this.addCommand(TextManager.menuLevel, "levelUp", $gameSwitches.value(1));
      if (this.needsCommand("skill")) {
        //this.addCommand(TextManager._skill, "skill", enabled);
        this.addCommand(TextManager.powerUp, "powerUp", enabled);
      }
      //this.addCommand(TextManager.powerUp2, "powerUp2", $gameSystem.day() >= 6 && ! $gameSwitches.value(1));
      this.addCommand(TextManager.record, "record", true);
      if (this.needsCommand("equip")) {
        this.addCommand(TextManager._equip, "equip", enabled);
      }
      if (this.needsCommand("status")) {
        //this.addCommand(TextManager._status, "status", enabled);
      }
      //this.addCommand(TextManager.eroStatus, "eroStatus", enabled);
      this.addCommand(TextManager.medal, "medal", enabled);
      this.addCommand(
        TextManager.kigae,
        "kigae",
        $gameSwitches.value(KIGAE_OPEN_SWITCH)
      );
      //this.addCommand(TextManager.encyclopedia, "encyclopedia", true);
      this.addCommand(
        TextManager.goToPrepare,
        "mainMenu",
        this.isMainMenuEnabled()
      );
      this.addCommand(TextManager.history, "history", true);
      //this.addCommand(TextManager.collection, "collection", true);
      this.addCommand(TextManager.babyList, "babyList", true);
    };
    Window_MenuCommand2.prototype.isMainMenuEnabled = function () {
      if (!$gameSwitches.value(361)) {
        return false;
      }
      var mapId = $gameMap.mapId();
      switch (mapId) {
        case 8:
        case 210:
          return true;
      }
      return false;
    };
    Window_MenuCommand2.prototype.addOptionsCommand = function () {
      if (this.needsCommand("options")) {
        var enabled = this.isOptionsEnabled();
        this.addCommand(TextManager._options, "options", enabled);
      }
    };
    Window_MenuCommand2.prototype.addSaveCommand = function () {
      if (this.needsCommand("save")) {
        var enabled = this.isSaveEnabled();
        this.addCommand(TextManager._save, "save", enabled);
        //this.addCommand(TextManager.load, "load", true);
      }
    };
    Window_MenuCommand2.prototype.addGameEndCommand = function () {
      var enabled = this.isGameEndEnabled();
      this.addCommand(TextManager._gameEnd, "gameEnd", enabled);
    };
    return Window_MenuCommand2;
  })(Window_MenuCommand);
  var Window_MenuStatus2 = /** @class */ (function (_super) {
    __extends(Window_MenuStatus2, _super);
    function Window_MenuStatus2() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Window_MenuStatus2.prototype.maxCols = function () {
      return 2;
    };
    Window_MenuStatus2.prototype.drawItemStatus = function (index) {
      var actor = this.actor(index);
      var rect = this.itemRect(index);
      var x = rect.x + 170;
      var y = rect.y + Math.floor(rect.height / 2 - this.lineHeight() * 1.5);
      this.drawActorSimpleStatus(actor, x, y);
    };
    Window_MenuStatus2.prototype.drawActorSimpleStatus = function (
      actor,
      x,
      y
    ) {
      var lineHeight = this.lineHeight();
      var x2 = x + 100;
      var yy = y - 5;
      this.drawActorName(actor, x, yy);
      this.drawActorEroState(actor, x + 110, yy);
      this.drawActorLevel(actor, x, y + lineHeight * 1);
      this.drawActorIcons(actor, x, y + lineHeight * 2);
      this.placeBasicGauges(actor, x2, y + lineHeight);
    };
    Window_MenuStatus2.prototype.drawActorLevel = function (actor, x, y) {
      this.changeTextColor(ColorManager.systemColor());
      this.drawText(TextManager.levelA, x, y, 48);
      this.resetTextColor();
      this.drawText(actor.level, x + 44, y, 36, "right");
    };
    Window_MenuStatus2.prototype.drawActorEroState = function (actor, x, y) {
      if (actor.isCaptive()) {
        this.drawText(TextManager.captive, x, y, 100, "left");
      } else {
        if ($gameParty.battleMembers().contains(actor)) {
          if ($gameSwitches.value(1)) {
            this.drawText(TextManager.inSortie, x, y, 100, "left");
          } else {
            this.drawText(TextManager.sortie, x, y, 100, "left");
          }
        } else {
          this.drawText(TextManager.canSortie, x, y, 100, "left");
        }
      }
    };
    Window_MenuStatus2.prototype.maxItems = function () {
      return $gameParty.totalMembers().length;
    };
    Window_MenuStatus2.prototype.actor = function (index) {
      return $gameParty.totalMembers()[index];
    };
    Window_MenuStatus2.prototype.selectLast = function () {
      var index = $gameParty.totalMembers().indexOf($gameParty.menuActor());
      if (index < 0) {
        index = 0;
      }
      this.smoothSelect(index);
    };
    Window_MenuStatus2.prototype.processOk = function () {
      var actor = this.actor(this.index());
      $gameParty.setMenuActor(actor);
      Window_StatusBase.prototype.processOk.call(this);
    };
    return Window_MenuStatus2;
  })(Window_MenuStatus);
})(Nore || (Nore = {}));
// Open Menu Screen
Game_Interpreter.prototype.command351 = function () {
  if (!$gameParty.inBattle()) {
    SceneManager.push(Nore.Scene_Menu2);
    Window_MenuCommand.initCommandPosition();
  }
  return true;
};
var Window_Crystal = /** @class */ (function (_super) {
  __extends(Window_Crystal, _super);
  function Window_Crystal(r) {
    var _this = _super.call(this, r) || this;
    _this.refresh();
    return _this;
  }
  Window_Crystal.prototype.colSpacing = function () {
    return 0;
  };
  Window_Crystal.prototype.refresh = function () {
    var rect = this.itemLineRect(0);
    var x = rect.x;
    var y = rect.y;
    var width = rect.width;
    this.contents.clear();
    this.drawIcon(873, 10, 4);
    this.drawCurrencyValue(this.value(), TextManager.crystalCount, x, y, width);
  };
  Window_Crystal.prototype.value = function () {
    return $gameParty.crystal();
  };
  return Window_Crystal;
})(Window_Selectable);
