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
 */
var Nore;
(function (Nore) {
  var Scene_Battle2 = /** @class */ (function (_super) {
    __extends(Scene_Battle2, _super);
    function Scene_Battle2() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Scene_Battle2.prototype.createAllWindows = function () {
      _super.prototype.createAllWindows.call(this);
      this.createAutoBattleSprite();
      this.createGimmickWindow();
      $gameTemp.cancelAutoBattle();
    };
    Scene_Battle2.prototype.createGimmickWindow = function () {
      if ($gameSystem.stageId() == 5) {
        this._stage5Window = new Nore.Window_Stage5();
        this.addChild(this._stage5Window);
      }
    };
    Scene_Battle2.prototype.createAutoBattleSprite = function () {
      this._autoBattleSprite = new Sprite_AutoBattle();
      this.addChild(this._autoBattleSprite);
    };
    Scene_Battle2.prototype.updateInputWindowVisibility = function () {
      if ($gameMessage.isBusy()) {
        this.closeCommandWindows();
        this.hideSubInputWindows();
      } else if (this.needsInputWindowChange()) {
        this.changeInputWindow();
      } else if (this.isAllFriendCantMove()) {
        BattleManager.startInput();
        BattleManager.toPlayerTurn();
        this.toPlayerTurnInAllMemberCantMove();
      }
    };
    Scene_Battle2.prototype.toPlayerTurnInAllMemberCantMove = function () {
      if ($gameParty.allMemberCantMove()) {
        BattleManager.toEnemyTurn();
        BattleManager.startEnemyTurn();
      } else {
        this.changeInputWindow();
      }
    };
    Scene_Battle2.prototype.isAllFriendCantMove = function () {
      if (BattleManager.isPlayerTurn()) {
        return false;
      }
      if (BattleManager._phase != "turnEnd") {
        return false;
      }
      var windowActive = this.isAnyInputWindowActive();
      var inputting = BattleManager.isInputting();
      if (windowActive && inputting) {
        return this._actorCommandWindow.actor() !== BattleManager.actor();
      }
      if (windowActive === inputting) {
        if ($gameParty.allMemberCantMove()) {
          return true;
        }
      }
      return false;
    };
    Scene_Battle2.prototype.changeInputWindow = function () {
      if (!BattleManager.isPlayerTurn()) {
        BattleManager.toPlayerTurn();
      }
      BattleManager.changeCurrentActor();
      this.hideSubInputWindows();
      if (BattleManager.isInputting()) {
        if (BattleManager.actor()) {
          this.startActorCommandSelection();
        } else {
          if (this.executeKubihane()) {
            return;
          }
          if (BattleManager.isPlayerTurn()) {
            // $gameTroop.makeActions();
            BattleManager.toEnemyTurn();
          }
          BattleManager.startEnemyTurn();
        }
      } else {
        this.endCommandSelection();
      }
    };
    Scene_Battle2.prototype.createCancelButton = function () {};
    Scene_Battle2.prototype.update = function () {
      _super.prototype.update.call(this);
      this.checkEndAutoBattle();
    };
    Scene_Battle2.prototype.checkEndAutoBattle = function () {
      if (!$gameTemp.isAutoBattle()) {
        return;
      }
      if (Input.isPressed("cancel")) {
        SoundManager.playCancel();
        $gameTemp.cancelAutoBattle();
      }
    };
    Scene_Battle2.prototype.autoBattle = function () {
      this.hideSubInputWindows();
      var action = BattleManager.inputtingAction();
      if (!action) {
        return;
      }
      action.setAttack();
      action.setTargetBattlers([$gameTroop.frontMembers()[0]]);
      //p('autoBattle')
      this._statusWindow.show();
      this.doAction();
    };
    Scene_Battle2.prototype.executeKubihane = function () {
      if ($gameParty.isKubihaneExecuted()) {
        return false;
      }
      $gameParty.executeKubihane();
      BattleManager.executeKubihane();
      return true;
    };
    Scene_Battle2.prototype.createHelpWindow = function () {
      var rect = this.helpWindowRect();
      this._helpWindow = new Nore.Window_BattleHelp(rect);
      this._helpWindow.hide();
      this.addWindow(this._helpWindow);
    };
    Scene_Battle2.prototype.createActorCommandWindow = function () {
      var rect = this.actorCommandWindowRect();
      var commandWindow = new Nore.Window_ActorCommand2(rect);
      commandWindow.y = Graphics.boxHeight - commandWindow.height;
      commandWindow.setHandler("attack", this.commandAttack.bind(this));
      commandWindow.setHandler("skill", this.commandSkill.bind(this));
      commandWindow.setHandler("guard", this.commandGuard.bind(this));
      commandWindow.setHandler("item", this.commandItem.bind(this));
      commandWindow.setHandler("cancel", this.commandCancel.bind(this));
      this.addWindow(commandWindow);
      this._actorCommandWindow = commandWindow;
      this._actorCommandWindow.setHandler("info", this.commandInfo.bind(this));
      this._actorCommandWindow.setHandler("skip", this.commandSkip.bind(this));
      this._actorCommandWindow.setHandler("auto", this.commandAuto.bind(this));
      this._actorCommandWindow.setHandler(
        "pageup",
        this.commandAuto.bind(this)
      );
      this.createOugiSprite();
      this.createTurnWindow();
    };
    Scene_Battle2.prototype.createOugiSprite = function () {
      this._ougiSprite = new Sprite_Ougi();
      this.addChild(this._ougiSprite);
    };
    Scene_Battle2.prototype.createTurnWindow = function () {
      this._turnWindow = new Nore.Window_Turn();
      this.addChild(this._turnWindow);
    };
    Scene_Battle2.prototype.commandCancel = function () {
      this.commandSkip();
    };
    Scene_Battle2.prototype.commandAttack = function () {
      _super.prototype.commandAttack.call(this);
      this._actorCommandWindow.hide();
    };
    Scene_Battle2.prototype.commandSkip = function () {
      if (!$gameParty.canSkip()) {
        return;
      }
      var actor = BattleManager.actor();
      actor.skip();
      BattleManager.startTurn();
    };
    Scene_Battle2.prototype.commandAuto = function () {
      SoundManager.playOk();
      $gameTemp.startAutoBattle();
      this._actorCommandWindow.hide();
      this.autoBattle();
      $gameMedals.onAutoBattle();
    };
    Scene_Battle2.prototype.commandInfo = function () {
      $gameTemp.inInfo = true;
      this._actorCommandWindow.hide();
      this._statusWindow.infoSelect();
      this.startEnemySelection();
      this.forecastAll();
    };
    Scene_Battle2.prototype.commandSkill = function () {
      this._skillWindow.setActor(BattleManager.actor());
      this._skillWindow.setStypeId(this._actorCommandWindow.currentExt());
      this._skillWindow.refresh();
      this._skillWindow.show();
      this._skillWindow.activate();
      this._actorCommandWindow.hideImmediate();
      this._actorCommandWindow.deactivate();
    };
    Scene_Battle2.prototype.commandItem = function () {
      this._itemWindow.refresh();
      this._itemWindow.show();
      this._itemWindow.activate();
      this._actorCommandWindow.hideImmediate();
      this._actorCommandWindow.deactivate();
    };
    Scene_Battle2.prototype.forecastAll = function () {
      for (var _i = 0, _a = $gameTroop.aliveMembers(); _i < _a.length; _i++) {
        var enemy = _a[_i];
        var action = enemy.currentAction();
        if (!action) {
          continue;
        }
        var damage = action.makeDamageValue($gameActors.actor(100), false);
        for (var _b = 0, _c = action.makeTargets(); _b < _c.length; _b++) {
          var target = _c[_b];
          if (target.isActor()) {
            var actor = target;
            actor.forecast(action, damage);
          }
        }
      }
    };
    Scene_Battle2.prototype.endCommandSelection = function () {
      _super.prototype.endCommandSelection.call(this);
      this._statusWindow.endSelection();
    };
    Scene_Battle2.prototype.isAnyInputWindowActive = function () {
      return (
        this._partyCommandWindow.active ||
        this._actorCommandWindow.active ||
        this._skillWindow.active ||
        this._itemWindow.active ||
        this._actorWindow.active ||
        this._statusWindow.active ||
        this._enemyWindow.active
      );
    };
    Scene_Battle2.prototype.startActorCommandSelection = function () {
      BattleManager.actor().beforeInput();
      this._statusWindow.selectActor(BattleManager.actor());
      this._partyCommandWindow.close();
      this._actorCommandWindow.show();
      this._actorCommandWindow.setup(BattleManager.actor());
      if ($gameTemp.isAutoBattle()) {
        this.autoBattle();
        this._actorCommandWindow.deactivate();
        this._actorCommandWindow.hide();
      }
      //this._actorWindow.show();
      //this._actorWindow.selectActor(BattleManager.actor());
    };
    Scene_Battle2.prototype.startActorSelection = function () {
      //p('startActorSelection')
      this._statusWindow.refresh();
      this._statusWindow.show();
      this._statusWindow.activate();
      var index = this._statusWindow.activeIndex();
      this._skillWindow.deactivate();
      this._itemWindow.deactivate();
      this._actorCommandWindow.deactivate();
      this._statusWindow.startSelection(BattleManager.inputtingAction(), index);
      return;
      this._statusWindow.hide();
      this._actorWindow.refresh();
      this._actorWindow.show();
      this._actorWindow.activate();
      this._actorWindow.startSelection(BattleManager.inputtingAction());
    };
    Scene_Battle2.prototype.startEnemySelection = function () {
      this._actorCommandWindow.hide();
      this._itemWindow.hide();
      this._skillWindow.hide();
      this._statusWindow.show();
      this._enemyWindow.refresh();
      this._enemyWindow.show();
      var action = BattleManager.inputtingAction();
      this._enemyWindow.select(action.initialSelection());
      this._enemyWindow.activate();
    };
    Scene_Battle2.prototype.createEnemyWindow = function () {
      var rect = this.enemyWindowRect();
      this._enemyWindow = new Nore.Window_BattleEnemy2(rect, this._spriteset);
      this._enemyWindow.setHandler("ok", this.onEnemyOk.bind(this));
      this._enemyWindow.setHandler("change", this.onEnemyChange.bind(this));
      this._enemyWindow.setHandler("cancel", this.onEnemyCancel.bind(this));
      this._enemyWindow.setHandler("onUpDown", this.onEnemyUpDown.bind(this));
      this._enemyWindow.setHelpWindow(this._helpWindow);
      this.addWindow(this._enemyWindow);
    };
    Scene_Battle2.prototype.createItemWindow = function () {
      var rect = this.itemWindowRect();
      //rect.x += 100;
      //rect.width -= 100;
      this._itemWindow = new Window_BattleItem2(rect);
      this._itemWindow.setHelpWindow(this._helpWindow);
      this._itemWindow.setHandler("ok", this.onItemOk.bind(this));
      this._itemWindow.setHandler("cancel", this.onItemCancel.bind(this));
      this.addWindow(this._itemWindow);
    };
    Scene_Battle2.prototype.onEnemyUpDown = function () {
      SoundManager.playCursor();
      this._enemyWindow.deactivate();
      this._statusWindow.activate();
      this._statusWindow.select(0);
      Input.clear();
      this.onActorChange();
    };
    Scene_Battle2.prototype.onActorUpDown = function () {
      SoundManager.playCursor();
      this._enemyWindow.activate();
      this._enemyWindow.select(0);
      this._statusWindow.deactivate();
      this._statusWindow.infoSelect();
      Input.clear();
    };
    Scene_Battle2.prototype.createStatusWindow = function () {
      var rect = this.statusWindowRect();
      var statusWindow = new Nore.Window_BattleStatus2(rect);
      statusWindow.setHandler("ok", this.onActorOk.bind(this));
      statusWindow.setHandler("cancel", this.onActorCancel.bind(this));
      statusWindow.setHandler("change", this.onActorChange.bind(this));
      statusWindow.setHandler("onUpDown", this.onActorUpDown.bind(this));
      this.addChild(statusWindow);
      this._statusWindow = statusWindow;
      this.addChild(this._spriteset._effectsContainer);
      for (
        var _i = 0, _a = statusWindow.getInfoSpriteList();
        _i < _a.length;
        _i++
      ) {
        var infoSprite = _a[_i];
        this.addChild(infoSprite);
      }
    };
    Scene_Battle2.prototype.onActorChange = function () {
      var actor = this._statusWindow.selectedActorInInfo();
      if (actor) {
        actor.select();
      }
    };
    Scene_Battle2.prototype.createActorWindow = function () {
      var rect = this.statusWindowRect();
      var statusWindow = new Nore.Window_BattleActor2(rect);
      this.addWindow(statusWindow);
      this._actorWindow = statusWindow;
      return;
      this._actorWindow = new Nore.Window_BattleStatus2(rect);
      this._actorWindow.setHandler("ok", this.onActorOk.bind(this));
      this._actorWindow.setHandler("cancel", this.onActorCancel.bind(this));
      //this._actorWindow.x += this._windowLayer.x;
      //this._actorWindow.y += this._windowLayer.y;
      this.addChild(this._actorWindow);
      this.addWindow(this._spriteset._effectsContainer);
    };
    Scene_Battle2.prototype.statusWindowRect = function () {
      var extra = 26;
      var ww = Graphics.width + 50;
      var wh = 240;
      var wx = 0;
      var wy = Graphics.boxHeight - wh + extra + 4;
      return new Rectangle(wx, wy, ww, wh);
    };
    Scene_Battle2.prototype.enemyWindowRect = function () {
      return new Rectangle(0, -200, Graphics.boxWidth, 200);
    };
    Scene_Battle2.prototype.onSelectAction = function () {
      var action = BattleManager.inputtingAction();
      if (!action.needsSelection()) {
        this.doAction();
      } else if (action.isForOpponent()) {
        this.startEnemySelection();
      } else {
        this.startActorSelection();
      }
    };
    Scene_Battle2.prototype.onItemOk = function () {
      var item = this._itemWindow.item();
      var action = BattleManager.inputtingAction();
      this._itemWindow.hide();
      action.setItem(item.id);
      $gameParty.setLastItem(item);
      this.onSelectAction();
    };
    Scene_Battle2.prototype.onSkillCancel = function () {
      this._skillWindow.hide();
      this._statusWindow.show();
      this._actorCommandWindow.showImmediate();
      this._actorCommandWindow.activate();
    };
    Scene_Battle2.prototype.onItemCancel = function () {
      this._itemWindow.hide();
      this._statusWindow.show();
      this._actorCommandWindow.showImmediate();
      this._actorCommandWindow.activate();
    };
    Scene_Battle2.prototype.onEnemyOk = function () {
      if ($gameTemp.inInfo) {
        $gameTemp.inInfo = false;
        this._statusWindow.infoDeselect();
      }
      $gameParty.clearForecast();
      $gameTroop.clearForecast();
      switch (this._actorCommandWindow.currentSymbol()) {
        case "info":
          this._helpWindow.hide();
          this._enemyWindow.hide();
          this._statusWindow.show();
          this._actorCommandWindow.activate();
          return;
      }
      var action = BattleManager.inputtingAction();
      var selectedList = this._enemyWindow.decideEnemyList(action);
      for (
        var _i = 0, selectedList_1 = selectedList;
        _i < selectedList_1.length;
        _i++
      ) {
        var enemy = selectedList_1[_i];
        if (!enemy.canTarget(BattleManager.actor(), action)) {
          SoundManager.playBuzzer();
          this._enemyWindow.activate();
          return;
        }
      }
      action.setTargetBattlers(selectedList);
      this.hideSubInputWindows();
      this.doAction();
    };
    Scene_Battle2.prototype.onEnemyChange = function () {
      var enemy = this._enemyWindow.enemy();
      //p(enemy)
    };
    Scene_Battle2.prototype.onEnemyCancel = function () {
      $gameParty.clearForecast();
      $gameTroop.clearForecast();
      this._helpWindow.hide();
      this._enemyWindow.hide();
      switch (this._actorCommandWindow.currentSymbol()) {
        case "attack":
          this._statusWindow.show();
          this._actorCommandWindow.activate();
          break;
        case "skill":
          this._statusWindow.show();
          this._actorCommandWindow.hide();
          this._skillWindow.show();
          this._skillWindow.activate();
          break;
        case "item":
          this._itemWindow.show();
          this._itemWindow.activate();
          break;
        case "info":
          this._statusWindow.show();
          this._actorCommandWindow.activate();
          break;
      }
      if ($gameTemp.inInfo) {
        $gameTemp.inInfo = false;
        this._statusWindow.infoDeselect();
      }
    };
    Scene_Battle2.prototype.onActorOk = function () {
      if ($gameTemp.inInfo) {
        $gameTemp.inInfo = false;
        this._statusWindow.infoDeselect();
        return;
      }
      this._statusWindow.endSelection();
      $gameParty.clearForecast();
      $gameTroop.clearForecast();
      var action = BattleManager.inputtingAction();
      action.setTargetBattlers(this._statusWindow.selectedActorList());
      this.hideSubInputWindows();
      this._statusWindow.show();
      this.doAction();
    };
    Scene_Battle2.prototype.onActorCancel = function () {
      this._statusWindow.endSelection();
      $gameParty.clearForecast();
      $gameTroop.clearForecast();
      this._helpWindow.hide();
      this._enemyWindow.hide();
      switch (this._actorCommandWindow.currentSymbol()) {
        case "attack":
          this._statusWindow.show();
          this._actorCommandWindow.activate();
          break;
        case "skill":
          this._statusWindow.show();
          this._skillWindow.show();
          this._skillWindow.activate();
          break;
        case "item":
          this._itemWindow.show();
          this._itemWindow.activate();
          break;
        case "info":
          this._statusWindow.show();
          this._actorCommandWindow.activate();
          break;
      }
      $gameTemp.inInfo = false;
    };
    Scene_Battle2.prototype.doAction = function () {
      $gameParty.clearForecast();
      if (BattleManager.actor()) {
        BattleManager.actor().finishAction();
        BattleManager.actor().onAction();
      }
      BattleManager.startTurn();
    };
    Scene_Battle2.prototype.statusWindowX = function () {
      return 0;
    };
    return Scene_Battle2;
  })(Scene_Battle);
  Nore.Scene_Battle2 = Scene_Battle2;
  var Sprite_Ougi = /** @class */ (function (_super) {
    __extends(Sprite_Ougi, _super);
    function Sprite_Ougi() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Sprite_Ougi.prototype.initialize = function () {
      _super.prototype.initialize.call(this);
      this.x = 1190;
      this.y = 210;
      this.bitmap = new Bitmap(100, 400);
      this.refresh();
      this.update();
      this.visible = $gameParty.isOugiEnabled();
    };
    Sprite_Ougi.prototype.update = function () {
      _super.prototype.update.call(this);
      if (this.isChanged()) {
        this.visible = $gameParty.isOugiEnabled();
        this.refresh();
      }
    };
    Sprite_Ougi.prototype.isChanged = function () {
      if (this._lastOugi != $gameParty.ougiTotal()) {
        return true;
      }
      return false;
    };
    Sprite_Ougi.prototype.refresh = function () {
      this.bitmap.clear();
      this.removeChildren();
      this._lastOugi = $gameParty.ougiTotal();
      var xx = 60;
      var yy = 20;
      var hh = 330;
      var ww = 18;
      this.bitmap.fillRect(xx - 1, yy - 1, ww + 2, hh + 2, "#FFFFFF");
      this.bitmap.fillRect(xx, yy, ww, hh, "#000000CD");
      var ougi = $gameParty.ougiPoint();
      if ($gameParty.isOugiMax()) {
        var barH = hh;
        this.bitmap.fillRect(xx, yy + hh - barH, ww, barH, "#FF3300");
        this.drawNumber(ougi, 57, 330, 100, "left", 4);
      } else {
        var rate = $gameParty.ougiRate();
        var barH = Math.round((hh * rate) / 100);
        this.bitmap.fillRect(xx, yy + hh - barH, ww, barH, "#FFCC00");
        this.drawNumber(ougi, 57, 330, 100, "left", 4);
      }
      this.bitmap.drawText("OP", 58, 8, 100, 4);
    };
    return Sprite_Ougi;
  })(Sprite);
  Nore.Sprite_Ougi = Sprite_Ougi;
  Spriteset_Battle.prototype.createActors = function () {
    this._actorSprites = [];
    for (var i = 0; i < $gameParty.maxBattleMembers(); i++) {
      var sprite = new Sprite_Actor();
      this._actorSprites.push(sprite);
      this._battleField.addChild(sprite);
    }
  };
  Spriteset_Battle.prototype.createBattleField = function () {
    var width = Graphics.boxWidth;
    var height = Graphics.boxHeight;
    var x = (Graphics.width - width) / 2;
    var y = (Graphics.height - height) / 2;
    this._battleField = new Sprite();
    this._battleField.setFrame(0, 0, width, height);
    this._battleField.x = x;
    this._battleField.y = y - this.battleFieldOffsetY();
    this._baseSprite.addChild(this._battleField);
    this._effectsContainer = this._battleField;
    this._uiContainer = new Sprite();
    this._uiContainer.setFrame(0, 0, width, height);
    this._uiContainer.x = x;
    this._uiContainer.y = y - this.battleFieldOffsetY();
    this._baseSprite.addChild(this._uiContainer);
  };
  BattleManager.isPlayerTurn = function () {
    return this._playerTurn;
  };
  BattleManager.toPlayerTurn = function () {
    //p('toPlayerTurn')
    //this.endAllBattlersTurn();
    this.endEnemiesTurn();
    this.updateFormation();
    $gameTroop.checkResurection();
    $gameParty.onBattleStart(false);
    $gameTroop.onBattleStart(false);
    $gameParty.onPlayerTurnStart();
    $gameTroop.onPlayerTurnStart();
    $gameParty.makeActions();
    this._playerTurn = true;
    var last = this._phase;
    this._phase = "turn";
    $gameTroop.setupBattleEvent();
    this.updateEventMain();
    this._phase = last;
    $gameTroop.makeActions();
    $gameTroop.updateForecast();
  };
  BattleManager.endEnemiesTurn = function () {
    for (var _i = 0, _a = $gameTroop.members(); _i < _a.length; _i++) {
      var battler = _a[_i];
      battler.onTurnEnd();
      this.displayBattlerStatus(battler, false);
    }
  };
  BattleManager.endPlayersTurn = function () {
    for (var _i = 0, _a = $gameParty.battleMembers(); _i < _a.length; _i++) {
      var battler = _a[_i];
      battler.onTurnEnd();
      this.displayBattlerStatus(battler, false);
    }
  };
  BattleManager.updateFormation = function () {
    $gameTroop.updateFormation();
    $gameParty.updateFormation();
  };
  BattleManager.toEnemyTurn = function () {
    this.endPlayersTurn();
    $gameParty.onEnemyTurnStart();
    $gameTroop.onEnemyTurnStart();
    $gameParty.onPhaseChange();
    $gameTroop.onPhaseChange();
    $gameTroop.updateForecast();
    this._playerTurn = false;
  };
  BattleManager.startBattle = function () {
    //p('startBattle')
    $gameTemp.onBattleStart();
    this._playerTurn = true;
    this._phase = "start";
    $gameSystem.onBattleStart();
    //$gameParty.onBattleStart(this._preemptive);
    //$gameTroop.onBattleStart(this._surprise);
    this.displayStartMessages();
    this.toPlayerTurn();
  };
  BattleManager.startAction = function () {
    //p('startAction')
    var subject = this._subject;
    if (subject.isEnemy()) {
      if (subject.isDead()) {
        // 死亡した
        this._logWindow.displayRegeneDead(subject);
        return;
      }
    }
    var action = subject.currentAction();
    if (!action) {
      return;
    }
    if (action.remainTurn() > 1) {
      this.endBattlerActions(this._subject);
      this._subject = null;
      action.minusRemainTurn();
      return;
    }
    if (!action.isValid()) {
      this._subject = null;
      return;
    }
    action.preAttack();
    this.addSkillMedalAction(subject, action);
    var targets = action.makeTargets();
    this._phase = "action";
    this._action = action;
    this._targets = targets;
    subject.cancelMotionRefresh();
    subject.useItem(action.item());
    this._action.applyGlobal();
    this._logWindow.startAction(subject, action, targets);
  };
  BattleManager.addSkillMedalAction = function (subject, action) {
    if (subject.isActor()) {
      if (action.isSkill()) {
        if (action.item().id >= 100) {
          $gameMedals.onSkillActor(subject, action.item());
        }
      }
    }
  };
  BattleManager.changeCurrentActor = function (forward) {
    var members = $gameParty.battleMembers();
    members = members.sort(function (a, b) {
      if (a.skipCount() != b.skipCount()) {
        return a.skipCount() - b.skipCount();
      }
      return 1;
    });
    var actor = null;
    for (var _i = 0, members_1 = members; _i < members_1.length; _i++) {
      var b = members_1[_i];
      if (!b.canMove()) {
        continue;
      }
      if (b.isActionFinished()) {
        continue;
      }
      actor = b;
      break;
    }
    this._currentActor = actor;
    this.startActorInput();
  };
  BattleManager.startTurn = function () {
    //p('startTurn')
    this._phase = "turn";
    //$gameTroop.increaseTurn();
    $gameParty.requestMotionRefresh();
    if (!this.isTpb()) {
      this.makeActionOrders();
      this._logWindow.startTurn();
      this._inputting = false;
    }
  };
  BattleManager.processTurn = function () {
    var subject = this._subject;
    var action = subject.currentAction();
    if (action) {
      action.prepare();
      if (action.isValid()) {
        this.startAction();
      }
      subject.removeCurrentAction();
    } else {
      /*if (subject.hasState(StateId.STUN) && subject.isEnemy()) {
                subject.regenerateHpDown();
            }*/
      this.endAction();
      this._subject = null;
    }
  };
  BattleManager.endAction = function () {
    if (this._subject.isActor()) {
      //p('regenerateHpDown')
      var actor = this._subject;
      if (actor.isActionFinished()) {
        actor.regenerateHpDown();
      }
      //this._subject.result()
      //this._subject.startDamagePopup();
    }
    this._logWindow.endAction(this._subject);
    this._phase = "turn";
    if (this._subject.numActions() === 0) {
      this.endBattlerActions(this._subject);
      this._subject = null;
    }
  };
  BattleManager.startEnemyTurn = function () {
    //p('startEnemyTurn')
    this._phase = "turn";
    $gameTroop.increaseTurn();
    $gameParty.requestMotionRefresh();
    if (!this.isTpb()) {
      this.makeEnemyActionOrders();
      this._logWindow.startTurn();
      this._inputting = false;
    }
  };
  BattleManager.makeActionOrders = function () {
    var battlers = [];
    battlers.push(BattleManager.actor());
    this._actionBattlers = battlers;
  };
  BattleManager.makeEnemyActionOrders = function () {
    var battlers = [];
    battlers.push.apply(battlers, $gameTroop.members());
    battlers.sort(function (a, b) {
      return b.agi - a.agi;
    });
    this._actionBattlers = battlers;
  };
  BattleManager.setup = function (troopId, canEscape, canLose) {
    var troop = $dataTroops[troopId];
    if (troop.name.includes("<fix>")) {
    } else {
      if ((troopId - 1) % 50 == 0) {
        var level = $gameParty.calcTroopLevel();
        troopId = $gameTroop.selectTroopId(level);
      }
    }
    p("troopId:" + troopId);
    if ($gameSystem.getDungeonInfo()) {
      $gameSystem.getDungeonInfo().onBattle(troopId);
    }
    this.initMembers();
    this._canEscape = canEscape;
    this._canLose = canLose;
    $gameTroop.setup(troopId);
    $gameScreen.onBattleStart();
    this.makeEscapeRatio();
  };
  BattleManager.selectTroop = function () {
    var level = $gameParty.calcTroopLevel();
    return $gameTroop.selectTroopId(level);
  };
  BattleManager.startInput = function () {
    //p('startInput')
    $gameTroop.updateFormation();
    $gameTroop.updateForecast();
    this._phase = "input";
    this._inputting = true;
    $gameParty.makeActions();
    /*if (this._lastTurn != $gameTroop.turnCount()) {
            this._lastTurn = $gameTroop.turnCount();
            $gameTroop.makeActions();
        }*/
    this._currentActor = null;
    if (this._surprise || !$gameParty.canInput()) {
      this.startTurn();
    }
  };
  BattleManager.endTurn = function () {
    this._phase = "turnEnd";
    this._preemptive = false;
    this._surprise = false;
  };
  BattleManager.updateTurnEnd = function () {
    if (this.isTpb()) {
    } else {
      this.startInput();
    }
  };
  BattleManager.executeKubihane = function () {
    this._subject = $gameParty.findMovableActor(10);
    if (!this._subject) {
      return false;
    }
    var actor = this._subject;
    actor.makeActions();
    actor.currentAction().setSkill(2060);
    var damage =
      actor.countSkill(SkillMeta.kubihane) +
      actor.countEquipMeta(EquipMeta.kubihane);
    var enemyList = $gameTroop.getKubihaneEnemies(damage);
    if (enemyList.length == 0) {
      this._subject = null;
      return false;
    }
    this._subject.currentAction().setTargetBattlers(enemyList);
    this.startTurn();
    return true;
  };
  Game_Battler.prototype.hasState = function (stateId) {
    for (var _i = 0, _a = this.states(); _i < _a.length; _i++) {
      var s = _a[_i];
      if (s.id == stateId) {
        return true;
      }
    }
    return false;
  };
  Game_Battler.prototype.isActionFinished = function () {
    return this._actionFinished;
  };
  Game_Battler.prototype.onBattleStart = function () {
    this.onTurnStart();
  };
  Game_Battler.prototype.onTurnStart = function () {
    this._actionFinished = false;
  };
  Game_Battler.prototype.finishAction = function () {
    this._actionFinished = true;
  };
  Game_Troop.prototype.battleMembers = Game_Troop.prototype.members;
  Window_BattleLog.prototype.startTurn = function () {};
  Window_BattleLog.prototype.messageSpeed = function () {
    return 16;
  };
  Window_BattleLog.prototype.waitForNewLine = function () {
    var baseLine = 0;
    if (this._baseLineStack.length > 0) {
      baseLine = this._baseLineStack[this._baseLineStack.length - 1];
    }
    if (this._lines.length > baseLine) {
      this.wait();
    }
  };
  Sprite_Actor.prototype.setActorHome = function (index) {
    var actor = this._actor;
    var x, y;
    /*if (actor.isBack()) {
            y = 700;
            const index = $gameParty.backMembers().indexOf(actor);
            x = 250 + index * 300;
        } else {
            y = 600;
            const index = $gameParty.frontMembers().indexOf(actor);
            x = 250 + index * 300;
        }*/
    var i = $gameParty.battleMembers().indexOf(actor);
    if ($gameParty.battleMembers().length == 6) {
      this.setHome(
        i * Nore.ACTOR_WINDOW_WIDTH_6 + Nore.ACTOR_WINDOW_WIDTH_6 / 2,
        700
      );
      return;
    }
    this.setHome(
      i * Nore.ACTOR_WINDOW_WIDTH +
        this.positionOffset() +
        Nore.ACTOR_WINDOW_WIDTH / 2,
      700
    );
  };
  Sprite_Actor.prototype.positionOffset = function () {
    switch ($gameParty.battleMembers().length) {
      case 1:
      case 2:
      case 3:
        return 250;
      case 4:
        return 100;
      default:
        break;
    }
    return 0;
  };
  var Sprite_AutoBattle = /** @class */ (function (_super) {
    __extends(Sprite_AutoBattle, _super);
    function Sprite_AutoBattle() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Sprite_AutoBattle.prototype.initialize = function () {
      _super.prototype.initialize.call(this);
      this.x = 1040;
      this.y = 30;
      this.bitmap = new Bitmap(400, 300);
      var day = $gameSystem.day();
      this.bitmap.fontSize = 36;
      this.bitmap.drawText("Auto Battle", 0, 0, 260, 50);
    };
    Sprite_AutoBattle.prototype.update = function () {
      _super.prototype.update.call(this);
      this.visible = $gameTemp.isAutoBattle();
    };
    return Sprite_AutoBattle;
  })(Sprite);
})(Nore || (Nore = {}));
