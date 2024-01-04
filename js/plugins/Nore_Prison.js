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
 * @command AddPrisonSlot
 * @text スロット追加
 * @des スロット追加
 * @arg type
 * @text type
 *
 * @command DecideBanzokuRoomActorVar
 * @text 蛮族の部屋のキャラID設定
 * @des 蛮族の部屋のキャラID設定
 */
var Nore;
(function (Nore) {
  Nore.PRISON_CRYSTAL_RATE = 10;
  PluginManager.registerCommand(
    "Nore_Prison",
    "AddPrisonSlot",
    function (args) {
      var type = args.type;
      var info = $gameParty.prisonInfo();
      info.addPrisonSlot(type);
    }
  );
  PluginManager.registerCommand(
    "Nore_Prison",
    "DecideBanzokuRoomActorVar",
    function (args) {
      var info = $gameParty.prisonInfo();
      info.decideBanzokuRoomActorVar();
    }
  );
  var Scene_Prison = /** @class */ (function (_super) {
    __extends(Scene_Prison, _super);
    function Scene_Prison() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Scene_Prison.prototype.create = function () {
      this._prisonInfo = $gameParty.prisonInfo();
      _super.prototype.create.call(this);
      this.createWindowLayer();
      this.createPrisonWindow();
      this.createPrisonerWindow();
      this.createMsgWindow();
      this.createConfirmWindow();
      this.createAllWindows();
      this.createMsgWindow();
      this.onPrisonChange();
    };
    Scene_Prison.prototype.start = function () {
      _super.prototype.start.call(this);
      this.startInitialScenario();
    };
    Scene_Prison.prototype.startInitialScenario = function () {
      if ($gameSwitches.value(384)) {
        return;
      }
      this._prisonWindow.deactivate();
      $gameSwitches.setValue(384, true);
      this.playScenario("民の肉便器イベント_説明_01");
    };
    Scene_Prison.prototype.finishScenario = function () {
      this._prisonWindow.activate();
    };
    Scene_Prison.prototype.createMsgWindow = function () {
      this._msgWindow = new Nore.Window_Msg(156);
      this._msgWindow.setHandler("ok", this.onMsgOk.bind(this));
      this._msgWindow.deactivate();
      this.addChild(this._msgWindow);
      this._msgWindow.hide();
    };
    Scene_Prison.prototype.createConfirmWindow = function () {
      this._confirmWindow = new Nore.Window_Confirm();
      this._confirmWindow.setHandler("ok", this.onConfirmOk.bind(this));
      this._confirmWindow.setHandler("cancel", this.onConfirmCancel.bind(this));
      this._confirmWindow.deactivate();
      this.addChild(this._confirmWindow);
      this._confirmWindow.hide();
    };
    Scene_Prison.prototype.createPrisonWindow = function () {
      var ww = 832;
      var x = 5;
      var r = new Rectangle(x, 50, ww, 700);
      this._prisonWindow = new Window_Prison(r);
      this._prisonWindow.setHandler("ok", this.onPrisonOk.bind(this));
      this._prisonWindow.setHandler("cancel", this.onPrisonCancel.bind(this));
      this._prisonWindow.setHandler("change", this.onPrisonChange.bind(this));
      this.addWindow(this._prisonWindow);
      this._prisonWindow.activate();
      this._prisonWindow.select(0);
      this._prisonWindow.refresh();
    };
    Scene_Prison.prototype.onPrisonChange = function () {
      if (!this._prisonerWindow) {
        return;
      }
      var slot = this._prisonWindow.slot();
      this._prisonerWindow.setPrisonSlot(slot);
    };
    Scene_Prison.prototype.createPrisonerWindow = function () {
      var ww = 420;
      var x = 846;
      var r = new Rectangle(x, 50, ww, 700);
      this._prisonerWindow = new Window_Prisoner(r);
      this._prisonerWindow.setHandler("ok", this.onPrisonerOk.bind(this));
      this._prisonerWindow.setHandler(
        "cancel",
        this.onPrisonerCancel.bind(this)
      );
      this.addWindow(this._prisonerWindow);
      //this._prisonerWindow.refresh();
      this._prisonerWindow.select(0);
    };
    Scene_Prison.prototype.onMsgOk = function () {
      this._prisonWindow.activate();
      this._msgWindow.hide();
      this._msgWindow.deactivate();
    };
    Scene_Prison.prototype.onPrisonOk = function () {
      if (this.isLocked()) {
        SoundManager.playBuzzer();
        this._prisonWindow.activate();
        return;
      }
      this._prisonerWindow.activate();
    };
    Scene_Prison.prototype.isLocked = function () {
      return this._prisonWindow.isLocked(this._prisonWindow.index());
    };
    Scene_Prison.prototype.onConfirmOk = function () {
      this.popScene();
    };
    Scene_Prison.prototype.onConfirmCancel = function () {
      this._prisonWindow.activate();
      this._confirmWindow.hide();
      this._confirmWindow.deactivate();
    };
    Scene_Prison.prototype.onPrisonCancel = function () {
      if (this.isFullPrisoners()) {
        this._confirmWindow.setText(TextManager.prisonConfirm);
        this._confirmWindow.show();
        this._confirmWindow.activate();
        return;
      }
      this._msgWindow.setText(TextManager.prisonMsg);
      this._msgWindow.show();
      this._msgWindow.activate();
    };
    Scene_Prison.prototype.isFullPrisoners = function () {
      if ($gameSystem.isEroAcceAllOpened()) {
        // 制限なし
        return true;
      }
      for (var _i = 0, _a = this._prisonInfo.slotList(); _i < _a.length; _i++) {
        var slot = _a[_i];
        if (slot.type() != PrisonType.NIKUBENKI) {
          continue;
        }
        if (slot.isEmpty()) {
          return false;
        }
      }
      return true;
    };
    Scene_Prison.prototype.onPrisonerOk = function () {
      var index = this._prisonWindow.index();
      var actor = this._prisonerWindow.currentItem();
      if (this._prisonerWindow.getLockType(actor) != LockType.OK) {
        SoundManager.playBuzzer();
        this._prisonerWindow.activate();
        return;
      }
      this._prisonInfo.setPrisoner(index, actor);
      this._prisonWindow.activate();
      this._prisonWindow.refresh();
      this._prisonerWindow.refresh();
    };
    Scene_Prison.prototype.onPrisonerCancel = function () {
      this._prisonWindow.activate();
    };
    return Scene_Prison;
  })(Nore.Scene_Talk);
  Nore.Scene_Prison = Scene_Prison;
  Nore.MEM_W = 95;
  var Window_PrisonBase = /** @class */ (function (_super) {
    __extends(Window_PrisonBase, _super);
    function Window_PrisonBase() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Window_PrisonBase.prototype.drawCount = function (
      actor,
      x,
      y,
      isNeedNikubenkiExperience
    ) {
      if (isNeedNikubenkiExperience === void 0) {
        isNeedNikubenkiExperience = false;
      }
      if (actor.actorId() > 20) {
        this.drawNumOfPerson(actor, x, y);
        return;
      }
      if (isNeedNikubenkiExperience) {
        this.changeTextColor(ColorManager.deathColor());
      }
      if (actor.actorId() == 3) {
        var n = actor.getActorHistory().countDaijin($gameSystem.day());
        this.drawText(TextManager.ministerCount, x - 30, y, 80);
        this.drawText(
          TextManager.count.format(n),
          x + 5,
          y,
          Nore.MEM_W,
          "right"
        );
      } else {
        var n = actor.getActorHistory().countNikubenki($gameSystem.day());
        this.drawText(TextManager.nikubenkiDay, x - 30, y, 80);
        this.drawText(
          TextManager.count.format(n),
          x + 5,
          y,
          Nore.MEM_W,
          "right"
        );
      }
    };
    Window_PrisonBase.prototype.drawNumOfPerson = function (actor, x, y) {
      var info = $gameParty.prisonerInfo();
      var num = info.getNum(actor.actorId());
      //this.drawText(TextManager.nikubenkiWoman, x, y, 80);
      var total = info.getTotal(actor.actorId());
      this.drawText("%1 / %2".format(num, total), x, y, Nore.MEM_W, "right");
      //this.drawText(TextManager.nikubenkiNum.format(num), x, y, MEM_W, 'right');
    };
    Window_PrisonBase.prototype.drawCharacterImage = function (
      actor,
      x,
      y,
      enabled,
      isSet
    ) {
      var cos = new CostumeSaver(actor.actorId());
      var offset = isSet ? 0 : 40;
      var c = new Nore.Game_DungeonCharacter(cos, x + 32 + offset, y + 48);
      c.setMonoTone(!enabled);
      var sprite = new Sprite_Prisoner(c, cos);
      this._windowContentsSprite.addChild(sprite);
      c.update();
      sprite.update();
      if (actor.actorId() == 7 || actor.actorId() >= 20) {
        return;
      }
      var ninshinRate = actor
        .getActorHistory()
        .countNinshinRate($gameSystem.day());
      var xx = x + 44 + 40;
      var yy = y + 34;
      this.contents.fillRect(xx, yy, 100, 4, "#000000");
      this.contents.fillRect(xx, yy, 100 - ninshinRate, 4, "#FF0000");
    };
    return Window_PrisonBase;
  })(Window_Selectable);
  Nore.Window_PrisonBase = Window_PrisonBase;
  var Window_Prison = /** @class */ (function (_super) {
    __extends(Window_Prison, _super);
    function Window_Prison(r) {
      var _this = _super.call(this, r) || this;
      _this._prisonInfo = $gameParty.prisonInfo();
      return _this;
    }
    Window_Prison.prototype.maxItems = function () {
      return this._prisonInfo.slotList().length;
    };
    Window_Prison.prototype.maxCols = function () {
      return 2;
    };
    Window_Prison.prototype.itemHeight = function () {
      return 104;
    };
    Window_Prison.prototype.itemRect = function (index) {
      var maxCols = this.maxCols();
      var itemWidth = this.itemWidth();
      var itemHeight = this.itemHeight();
      var colSpacing = this.colSpacing();
      var rowSpacing = this.rowSpacing();
      if (index >= 1) {
        if (this._prisonInfo.has2Nikubenki()) {
        } else {
          index++;
        }
      }
      var col = index % maxCols;
      var row = Math.floor(index / maxCols);
      var x = col * itemWidth + colSpacing / 2 - this.scrollBaseX();
      var y = row * itemHeight + rowSpacing / 2 - this.scrollBaseY() + 122;
      if (index >= 1) {
        if (this._prisonInfo.has2Nikubenki() && index == 1) {
        } else {
          y += 30;
        }
      }
      var width = itemWidth - colSpacing;
      var height = itemHeight - rowSpacing;
      return new Rectangle(x, y, width, height);
    };
    Window_Prison.prototype.refresh = function () {
      this._windowContentsSprite.removeChildren();
      _super.prototype.refresh.call(this);
      this.drawTitle();
    };
    Window_Prison.prototype.drawTitle = function () {
      this.contents.fontSize = 30;
      this.drawText(TextManager.selectNikubenki, 130, 20, 500, "center");
      this.contents.fontSize = 22;
      var lh = 40;
      this.drawText(TextManager.prisonMsg2, 130, 62, 500, "center");
    };
    Window_Prison.prototype.isLocked = function (index) {
      var slot = this._prisonInfo.slot(index);
      switch (slot.actorId()) {
        case 0:
          return false;
        case 1:
          return false;
        case 3:
          return false;
        case 7:
          return false;
        case 21:
          return false;
        case 22:
          return false;
        case 23:
          return false;
      }
      return false;
      /*
            const actor = $gameActors.actor(slot.actorId());
            const n = actor.getActorHistory().countNikubenki($gameSystem.day());
            return n == 0;
            */
    };
    Window_Prison.prototype.drawItem = function (index) {
      var rect = this.itemRect(index);
      this.contents.fontSize = 14;
      var slot = this._prisonInfo.slot(index);
      var text = this._prisonInfo.nikubenkiNameByType(slot.type());
      var xx = rect.x + 164;
      xx += 50;
      var xxx = rect.x + 40;
      this.changeTextColor(ColorManager.systemColor());
      this.drawText(text, xxx + 10, rect.y - 5, 140, "left");
      this.changeTextColor(ColorManager.normalColor());
      var actorId = this._prisonInfo.slot(index).actorId();
      this.drawRoomIcon(rect.x, rect.y, slot);
      var textIndex = 0;
      if (slot.needNikubenkiExperience()) {
        textIndex++;
        this.drawText(
          TextManager.prisonNeedExperience,
          xx,
          rect.y - 5,
          170,
          "left"
        );
      } else if (slot.needVagrantExperience()) {
        textIndex++;
        this.drawText(
          TextManager.prisonNeedVagrantExperience,
          xx,
          rect.y - 5,
          170,
          "left"
        );
      } else if (slot.needGoblinExperience()) {
        textIndex++;
        this.drawText(
          TextManager.prisonNeedGoblinExperience,
          xx,
          rect.y - 5,
          170,
          "left"
        );
      } else if (slot.needSyusanExperience()) {
        textIndex++;
        this.drawText(
          TextManager.prisonNeedSyusanExperience,
          xx,
          rect.y - 5,
          170,
          "left"
        );
      } else if (slot.type() == PrisonType.NIKUBENKI) {
        textIndex++;
        if (actorId == 0) {
          this.changeTextColor(ColorManager.deathColor());
        } else {
          this.changeTextColor(ColorManager.normalColor());
        }
        if (this.isLocked(index)) {
          this.changeTextColor(ColorManager.deathColor());
          this.drawText(TextManager.prisonForce, xx, rect.y - 5, 170, "left");
        } else {
          if ($gameSystem.isEroAcceAllOpened()) {
          } else {
            this.drawText(
              TextManager.prisonGirlRequired,
              xx,
              rect.y - 5,
              170,
              "left"
            );
          }
        }
      }
      this.changeTextColor(ColorManager.normalColor());
      if (slot.isBoteDisabled()) {
        this.drawText(
          TextManager.boteDisabled,
          xx,
          rect.y - 5 + 20 * textIndex,
          170,
          "left"
        );
      }
      if (actorId > 0) {
        this.contents.fontSize = 22;
        var yy = rect.y + 54;
        var actor = $gameActors.actor(actorId);
        this.drawCharacterImage(actor, rect.x + 2, yy, true, false);
        this.drawText(actor.name(), rect.x + 84, yy, 170, "left");
        this.contents.fontSize = 16;
        this.drawCount(actor, rect.x + 230, yy);
      }
      this.drawCrystal(slot, xxx + 10, rect.y + 16);
      this.drawSkillPoint(slot, xxx + 10, rect.y + 16);
      this.drawChichi(slot, xxx + 10, rect.y + 16);
    };
    Window_Prison.prototype.drawRoomIcon = function (x, y, slot) {
      this.drawIcon(slot.iconIndex(), x + 4, y + 4);
    };
    Window_Prison.prototype.drawCrystal = function (slot, x, y) {
      var n = slot.crystal();
      if (n == 0) {
        return;
      }
      this.contents.fontSize = 14;
      this.changeTextColor(ColorManager.systemColor());
      this.drawText(TextManager.prisonCrystal, x, y, 100, "left");
      this.changeTextColor(ColorManager.normalColor());
      this.drawText(slot.crystal(), x, y, 130, "right");
      this.drawIconMini(366, x + 90, y + 6);
    };
    Window_Prison.prototype.drawSkillPoint = function (slot, x, y) {
      var n = slot.skillPoint();
      if (n == 0) {
        return;
      }
      this.contents.fontSize = 14;
      this.changeTextColor(ColorManager.systemColor());
      this.drawText(TextManager.prisonSp, x, y, 150, "left");
      this.changeTextColor(ColorManager.normalColor());
    };
    Window_Prison.prototype.drawChichi = function (slot, x, y) {
      if (slot.type() != PrisonType.CHICHI) {
        return;
      }
      this.contents.fontSize = 14;
      this.changeTextColor(ColorManager.systemColor());
      this.drawText(TextManager.prisonChichi, x, y, 150, "left");
      this.changeTextColor(ColorManager.normalColor());
    };
    Window_Prison.prototype.slot = function () {
      return this._prisonInfo.slotList()[this.index()];
    };
    Window_Prison.prototype.cursorDown = function (wrap) {
      if (this._prisonInfo.size() == 1) {
        return;
      }
      var index = this.index();
      if (index == 0 && !this._prisonInfo.has2Nikubenki()) {
        this.smoothSelect(1);
        return;
      }
      var maxItems = this.maxItems();
      var maxCols = this.maxCols();
      if (index < maxItems - maxCols || (wrap && maxCols === 1)) {
        this.smoothSelect((index + maxCols) % maxItems);
      }
    };
    Window_Prison.prototype.cursorUp = function (wrap) {
      if (this._prisonInfo.size() == 1) {
        return;
      }
      var index = Math.max(0, this.index());
      if (index == 1 && !this._prisonInfo.has2Nikubenki()) {
        this.smoothSelect(0);
        return;
      }
      var maxItems = this.maxItems();
      var maxCols = this.maxCols();
      if (index >= maxCols || (wrap && maxCols === 1)) {
        this.smoothSelect((index - maxCols + maxItems) % maxItems);
      }
    };
    Window_Prison.prototype.cursorRight = function (wrap) {
      var index = this.index();
      var maxItems = this.maxItems();
      var maxCols = this.maxCols();
      var horizontal = this.isHorizontal();
      if (maxCols >= 2 && (index < maxItems - 1 || (wrap && horizontal))) {
        this.smoothSelect((index + 1) % maxItems);
      }
    };
    Window_Prison.prototype.cursorLeft = function (wrap) {
      var index = Math.max(0, this.index());
      var maxItems = this.maxItems();
      var maxCols = this.maxCols();
      var horizontal = this.isHorizontal();
      if (maxCols >= 2 && (index > 0 || (wrap && horizontal))) {
        this.smoothSelect((index - 1 + maxItems) % maxItems);
      }
    };
    return Window_Prison;
  })(Window_PrisonBase);
  var LABEL_X = 205;
  var LABEL_WIDTH = 175;
  var LockType;
  (function (LockType) {
    LockType[(LockType["OK"] = 0)] = "OK";
    LockType[(LockType["LOST_VIRGIN"] = 1)] = "LOST_VIRGIN";
    LockType[(LockType["MINISTER_ONLY"] = 2)] = "MINISTER_ONLY";
    LockType[(LockType["GOBLIN"] = 3)] = "GOBLIN";
    LockType[(LockType["VAGRANT"] = 4)] = "VAGRANT";
    LockType[(LockType["DISABLE"] = 5)] = "DISABLE";
    LockType[(LockType["TAIKENBAN"] = 6)] = "TAIKENBAN";
    LockType[(LockType["CHARLES"] = 7)] = "CHARLES";
    LockType[(LockType["NIKUBENKI"] = 8)] = "NIKUBENKI";
    LockType[(LockType["NOT_YET"] = 9)] = "NOT_YET";
    LockType[(LockType["BOTE"] = 10)] = "BOTE";
    LockType[(LockType["NOT_SYUSAN"] = 11)] = "NOT_SYUSAN";
    LockType[(LockType["DISABLE_MOB"] = 12)] = "DISABLE_MOB";
  })(LockType || (LockType = {}));
  var Window_Prisoner = /** @class */ (function (_super) {
    __extends(Window_Prisoner, _super);
    function Window_Prisoner(r) {
      var _this = _super.call(this, r) || this;
      _this._prisonInfo = $gameParty.prisonInfo();
      return _this;
    }
    Window_Prisoner.prototype.setPrisonSlot = function (slot) {
      this._slot = slot;
      this.refresh();
    };
    Window_Prisoner.prototype.refresh = function () {
      this._windowContentsSprite.removeChildren();
      this.makeItems();
      _super.prototype.refresh.call(this);
    };
    Window_Prisoner.prototype.makeItems = function () {
      this._data = [];
      var list = $gameParty.getActorIdList();
      var members = $gameParty.members();
      for (var i = 0; i < list.length; i++) {
        var actor = $gameActors.actor(list[i]);
        if (!members.contains(actor)) {
          continue;
        }
        this._data.push(actor);
      }
      this._data.push($gameActors.actor(21));
      if ($gameSystem.nikubenkiRoomCount() >= 2) {
        this._data.push($gameActors.actor(22));
        this._data.push($gameActors.actor(23));
      }
      this._data.push(null);
    };
    Window_Prisoner.prototype.currentItem = function () {
      return this.item(this.index());
    };
    Window_Prisoner.prototype.item = function (index) {
      return this._data[index];
    };
    Window_Prisoner.prototype.drawItem = function (index) {
      var actor = this.item(index);
      if (!actor) {
        return;
      }
      this.resetTextColor();
      var rect = this.itemRect(index);
      this.changePaintOpacity(this.isEnabled(actor));
      var lockType = this.getLockType(actor);
      var isSet = $gameParty.prisonInfo().includes(actor.actorId());
      this.drawCharacterImage(
        actor,
        rect.x,
        rect.y,
        lockType != LockType.DISABLE,
        isSet
      );
      this.contents.fontSize = 22;
      this.drawText(actor.name(), rect.x + 84, rect.y, 170, "left");
      this.contents.fontSize = 16;
      if (lockType != LockType.OK) {
        this.drawLock(rect.y, actor, true, lockType);
      } else if (this.isNeedNikubenkiExperience(actor)) {
        this.drawNeedExperience(rect.y, actor, true);
      } else if (this.isNeedVagrantExperience(actor)) {
        this.drawNeedVagrantExperience(rect.y, actor, true);
      } else if (this.isNeedGoblinExperience(actor)) {
        this.drawNeedGoblinExperience(rect.y, actor, true);
      } else if (this.isNeedSyusanExperience(actor)) {
        this.drawNeedSyusanExperience(rect.y, actor, true);
      } else {
        this.drawCount(actor, rect.x + 230, rect.y + 0, false);
      }
    };
    Window_Prisoner.prototype.getLockType = function (actor) {
      if (actor == null) {
        return LockType.OK;
      }
      if (actor.actorId() >= 20) {
        if (this._slot.type() == PrisonType.NIKUBENKI) {
          if ($gameParty.prisonerInfo().isMax(actor.actorId())) {
            return LockType.DISABLE_MOB;
          } else {
            return LockType.OK;
          }
        } else {
          return LockType.DISABLE;
        }
      }
      if (this._slot.type() == PrisonType.CHICHI) {
        if (actor.actorId() == 7) {
          return LockType.OK;
        }
        if (actor.getActorHistory().countSyusan($gameSystem.day()) == 0) {
          return LockType.NOT_SYUSAN;
        } else {
          return LockType.OK;
        }
      }
      if (actor.actorId() == 3) {
        if (this._slot.type() == PrisonType.MINISTER) {
          return LockType.OK;
        }
      }
      if (this._slot.type() == PrisonType.CHARLES) {
        if (actor.actorId() != 1 && actor.actorId() != 3) {
          return LockType.DISABLE;
        }
        /*if (actor.boteId > 0) {
                    return LockType.BOTE;
                }*/
      }
      if (this._slot.type() == PrisonType.MINISTER) {
        if (actor.actorId() != 1) {
          return LockType.DISABLE;
        }
        if (actor.boteId > 0) {
          if (!$gameSwitches.value(921)) {
            return LockType.BOTE;
          }
        }
      }
      if (this._slot.type() == PrisonType.GRAY) {
        if (actor.actorId() != 2 && actor.actorId() != 5) {
          return LockType.DISABLE;
        } else {
          if (actor.boteId > 0) {
            return LockType.BOTE;
          }
          if (actor.getActorHistory().countNikubenki($gameSystem.day()) == 0) {
            return LockType.NIKUBENKI;
          }
        }
      }
      switch (actor.actorId()) {
        case 1:
          if (this._slot.type() == PrisonType.MINISTER) {
            if ($gameSystem.isFreeTaikenban() || $gameSystem.isTaikenban()) {
              return LockType.TAIKENBAN;
            }
            if ($gameSwitches.value(470)) {
              return LockType.OK;
            } else {
              return LockType.NOT_YET;
            }
          }
          break;
        case 2:
          if (actor.getLastHistory().isLostVirgin()) {
            //return LockType.LOST_VIRGIN;
          }
          if ($gameSystem.isFreeTaikenban()) {
            return LockType.TAIKENBAN;
          }
          break;
        case 3:
          if (this._slot.type() == PrisonType.CHARLES) {
            if ($gameSwitches.value(478)) {
              return LockType.OK;
            } else {
              return LockType.NOT_YET;
            }
          }
          return LockType.DISABLE;
        case 4:
          if (actor.getLastHistory().isLostVirgin()) {
            //return LockType.LOST_VIRGIN;
          }
          if ($gameSystem.isTaikenban()) {
            return LockType.TAIKENBAN;
          }
          break;
        case 5:
          if (actor.getLastHistory().isLostVirgin()) {
            //return LockType.LOST_VIRGIN;
          }
          break;
        case 6:
          if (actor.getLastHistory().isLostVirgin()) {
            //return LockType.LOST_VIRGIN;
          }
          break;
        case 7:
          if (this._slot.type() == PrisonType.NIKUBENKI) {
            if ($gameSwitches.value(453)) {
              return LockType.OK;
            } else {
              return LockType.CHARLES;
            }
          }
          if (this._slot.type() == PrisonType.VAGRANT) {
            return LockType.DISABLE;
          }
          if (this._slot.type() == PrisonType.GOBLIN) {
            return LockType.DISABLE;
          }
          break;
        //case 5: return false;
        //case 6: return false;
      }
      if (this._slot.type() == PrisonType.VAGRANT) {
        if (!actor.getActorHistory().hasEroHistory(TaneoyaId.vagrant)) {
          return LockType.VAGRANT;
        }
      }
      if (this._slot.type() == PrisonType.GOBLIN) {
        if (!actor.getActorHistory().hasEroHistory(TaneoyaId.goblin)) {
          return LockType.GOBLIN;
        }
      }
      if (this._slot.type() == PrisonType.BANZOKU) {
        if (actor.getActorHistory().countNikubenki($gameSystem.day()) == 0) {
          return LockType.NIKUBENKI;
        }
      }
      return LockType.OK;
    };
    Window_Prisoner.prototype.isEnabled = function (actor) {
      if (!actor) {
        return true;
      }
      if (this.getLockType(actor) != LockType.OK) {
        return false;
      }
      return this._slot.actorId() != actor.actorId();
      //return ! this._prisonInfo.includes(actor.actorId());
    };
    Window_Prisoner.prototype.isNeedNikubenkiExperience = function (actor) {
      switch (this._slot.type()) {
        case PrisonType.BANZOKU:
          if (actor.actorId() < 20) {
            var n = actor.getActorHistory().countNikubenki($gameSystem.day());
            if (n == 0) {
              return true;
            }
          }
          break;
      }
      return false;
    };
    Window_Prisoner.prototype.isNeedVagrantExperience = function (actor) {
      switch (this._slot.type()) {
        case PrisonType.VAGRANT:
          if (actor.actorId() < 20) {
            var n = actor.getActorHistory().countNikubenki($gameSystem.day());
            if (n == 0) {
              return true;
            }
          }
          break;
      }
      return false;
    };
    Window_Prisoner.prototype.isNeedGoblinExperience = function (actor) {
      switch (this._slot.type()) {
        case PrisonType.GOBLIN:
          if (actor.actorId() < 20) {
            var n = actor.getActorHistory().countNikubenki($gameSystem.day());
            if (n == 0) {
              return true;
            }
          }
          break;
      }
      return false;
    };
    Window_Prisoner.prototype.isNeedSyusanExperience = function (actor) {
      switch (this._slot.type()) {
        case PrisonType.CHICHI:
          if (actor.actorId() == 7) {
            return false;
          }
          if (actor.actorId() < 20) {
            var n = actor.getActorHistory().countSyusan($gameSystem.day());
            if (n == 0) {
              return true;
            }
          }
          break;
      }
      return false;
    };
    Window_Prisoner.prototype.maxItems = function () {
      if (this._data) {
        return this._data.length;
      }
      return 0;
    };
    Window_Prisoner.prototype.maxCols = function () {
      return 1;
    };
    Window_Prisoner.prototype.itemHeight = function () {
      return 48;
    };
    Window_Prisoner.prototype.getBaseTexture = function () {
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
    Window_Prisoner.prototype.drawLock = function (
      y,
      actor,
      isEnabled,
      lockType
    ) {
      this.drawLockIcon(y, actor, isEnabled, lockType);
      switch (lockType) {
        case LockType.DISABLE_MOB:
          this.drawText(TextManager.prisonLockedMob, LABEL_X, y, LABEL_WIDTH);
          return;
        case LockType.DISABLE:
          this.drawText(
            TextManager.prisonLockedVagrant,
            LABEL_X,
            y,
            LABEL_WIDTH
          );
          return;
        case LockType.NIKUBENKI:
          this.drawText(
            TextManager.prisonNeedExperience,
            LABEL_X,
            y,
            LABEL_WIDTH
          );
          return;
        case LockType.MINISTER_ONLY:
          this.drawText(TextManager.prisonLocked2, LABEL_X, y, LABEL_WIDTH);
          return;
        case LockType.NOT_YET:
        case LockType.CHARLES:
          this.drawText(
            TextManager.prisonLocked3,
            LABEL_X + 36,
            y,
            LABEL_WIDTH
          );
          return;
        case LockType.LOST_VIRGIN:
          //this.drawText(TextManager.prisonLocked, LABEL_X, y, LABEL_WIDTH)
          return;
        case LockType.TAIKENBAN:
          this.drawText(
            TextManager.prisonLockedTaikenban,
            LABEL_X,
            y,
            LABEL_WIDTH
          );
          return;
        case LockType.VAGRANT:
          this.drawText(
            TextManager.prisonNeedVagrantExperience,
            LABEL_X,
            y,
            LABEL_WIDTH
          );
          return;
        case LockType.GOBLIN:
          this.drawText(
            TextManager.prisonNeedGoblinExperience,
            LABEL_X,
            y,
            LABEL_WIDTH
          );
          return;
        case LockType.BOTE:
          this.drawText(TextManager.boteDisabled, LABEL_X, y, LABEL_WIDTH);
          return;
        case LockType.NOT_SYUSAN:
          this.drawText(TextManager.syusanDisabled, LABEL_X, y, LABEL_WIDTH);
          return;
      }
    };
    Window_Prisoner.prototype.drawLockIcon = function (
      y,
      actor,
      isEnabled,
      lockType
    ) {
      if (lockType != LockType.NOT_YET) {
        return;
      }
      var baseTexture = this.getBaseTexture();
      var texture = new PIXI.Texture(
        baseTexture,
        new PIXI.Rectangle(0, 103, 40, 36)
      );
      var sprite = new PIXI.Sprite(texture);
      sprite.x = 22 + 194;
      sprite.y = y + 12;
      if (!isEnabled) {
        sprite.alpha = 0.4;
      }
      this._windowContentsSprite.addChild(sprite);
    };
    Window_Prisoner.prototype.drawNeedGoblinExperience = function (
      y,
      actor,
      isEnabled
    ) {
      var baseTexture = this.getBaseTexture();
      var texture = new PIXI.Texture(
        baseTexture,
        new PIXI.Rectangle(0, 103, 40, 36)
      );
      var sprite = new PIXI.Sprite(texture);
      sprite.x = 22;
      sprite.y = y + 12;
      if (!isEnabled) {
        sprite.alpha = 0.4;
      }
      this.drawText(
        TextManager.prisonNeedGoblinExperience,
        LABEL_X,
        y,
        LABEL_WIDTH
      );
      this._windowContentsSprite.addChild(sprite);
    };
    Window_Prisoner.prototype.drawNeedSyusanExperience = function (
      y,
      actor,
      isEnabled
    ) {
      var baseTexture = this.getBaseTexture();
      var texture = new PIXI.Texture(
        baseTexture,
        new PIXI.Rectangle(0, 103, 40, 36)
      );
      var sprite = new PIXI.Sprite(texture);
      sprite.x = 22;
      sprite.y = y + 12;
      if (!isEnabled) {
        sprite.alpha = 0.4;
      }
      this.drawText(
        TextManager.prisonNeedSyusanExperience,
        LABEL_X,
        y,
        LABEL_WIDTH
      );
      this._windowContentsSprite.addChild(sprite);
    };
    Window_Prisoner.prototype.drawNeedVagrantExperience = function (
      y,
      actor,
      isEnabled
    ) {
      var baseTexture = this.getBaseTexture();
      var texture = new PIXI.Texture(
        baseTexture,
        new PIXI.Rectangle(0, 103, 40, 36)
      );
      var sprite = new PIXI.Sprite(texture);
      sprite.x = 22;
      sprite.y = y + 12;
      if (!isEnabled) {
        sprite.alpha = 0.4;
      }
      this.drawText(
        TextManager.prisonNeedVagrantExperience,
        LABEL_X,
        y,
        LABEL_WIDTH
      );
      this._windowContentsSprite.addChild(sprite);
    };
    Window_Prisoner.prototype.drawNeedExperience = function (
      y,
      actor,
      isEnabled
    ) {
      var baseTexture = this.getBaseTexture();
      var texture = new PIXI.Texture(
        baseTexture,
        new PIXI.Rectangle(0, 103, 40, 36)
      );
      var sprite = new PIXI.Sprite(texture);
      sprite.x = 22;
      sprite.y = y + 12;
      if (!isEnabled) {
        sprite.alpha = 0.4;
      }
      this.drawText(TextManager.prisonNeedExperience, LABEL_X, y, LABEL_WIDTH);
      this._windowContentsSprite.addChild(sprite);
    };
    Window_Prisoner.prototype.isCurrentItemEnabled = function () {
      var actor = this.item(this.index());
      return this.isEnabled(actor);
    };
    return Window_Prisoner;
  })(Window_PrisonBase);
})(Nore || (Nore = {}));
var PrisonType;
(function (PrisonType) {
  PrisonType["NIKUBENKI"] = "nikubenki";
  PrisonType["MINISTER"] = "minister";
  PrisonType["BAISYUN"] = "baisyun";
  PrisonType["SETTAI"] = "settai";
  PrisonType["NGARO"] = "ngaro";
  PrisonType["TOILET"] = "toilet";
  PrisonType["BANZOKU"] = "banzoku";
  PrisonType["VAGRANT"] = "vagrant";
  PrisonType["GOBLIN"] = "goblin";
  PrisonType["GRAY"] = "gray";
  PrisonType["CHARLES"] = "charles";
  PrisonType["CHICHI"] = "chichi";
})(PrisonType || (PrisonType = {}));
var PrisonSlot = /** @class */ (function () {
  function PrisonSlot(type) {
    this._actorId = 0;
    switch (type) {
      case PrisonType.NIKUBENKI:
      case PrisonType.BAISYUN:
      case PrisonType.SETTAI:
      case PrisonType.NGARO:
      case PrisonType.TOILET:
      case PrisonType.BANZOKU:
      case PrisonType.VAGRANT:
      case PrisonType.MINISTER:
      case PrisonType.GRAY:
      case PrisonType.CHARLES:
      case PrisonType.GOBLIN:
      case PrisonType.CHICHI:
        break;
      default:
        console.error("不正な PrisonType です" + type);
    }
    this._type = type;
  }
  PrisonSlot.prototype.getOrder = function () {
    switch (this._type) {
      case PrisonType.NIKUBENKI:
        return 0;
      case PrisonType.BANZOKU:
        return 1;
      case PrisonType.CHARLES:
        return 2;
      case PrisonType.MINISTER:
        return 3;
      case PrisonType.VAGRANT:
        return 3;
      case PrisonType.GRAY:
        return 4;
      case PrisonType.GOBLIN:
        return 5;
      case PrisonType.CHICHI:
        return 6;
      case PrisonType.BAISYUN:
        return 10;
      case PrisonType.SETTAI:
        return 12;
      case PrisonType.NGARO:
        return 13;
      case PrisonType.TOILET:
        return 14;
    }
    return 0;
  };
  PrisonSlot.prototype.iconIndex = function () {
    switch (this._type) {
      case PrisonType.NIKUBENKI:
        return 2085;
      case PrisonType.BANZOKU:
        return 2258;
      case PrisonType.CHARLES:
        return 2256;
      case PrisonType.MINISTER:
        return 2260;
      case PrisonType.VAGRANT:
        return 2259;
      case PrisonType.GRAY:
        return 2261;
      case PrisonType.GOBLIN:
        return 2257;
      case PrisonType.CHICHI:
        return 1993;
      case PrisonType.BAISYUN:
        return 10;
      case PrisonType.SETTAI:
        return 12;
      case PrisonType.NGARO:
        return 13;
      case PrisonType.TOILET:
        return 14;
    }
    return 0;
  };
  PrisonSlot.prototype.refresh = function () {
    if (this.isBoteDisabled() && this._actorId > 0) {
      var actor = $gameActors.actor(this._actorId);
      if (actor.boteId > 0) {
        this._actorId = 0;
      }
    }
    if (this.isMax()) {
      this._actorId = 0;
    }
  };
  PrisonSlot.prototype.isMax = function () {
    if (this._actorId <= 20) {
      return false;
    }
    return $gameParty.prisonerInfo().isMax(this._actorId);
  };
  PrisonSlot.prototype.type = function () {
    return this._type;
  };
  PrisonSlot.prototype.needNikubenkiExperience = function () {
    switch (this.type()) {
      case PrisonType.BANZOKU:
        return true;
      case PrisonType.GRAY:
        return true;
    }
    return false;
  };
  PrisonSlot.prototype.isBoteDisabled = function () {
    switch (this.type()) {
      case PrisonType.GRAY:
        // case PrisonType.CHARLES:
        return true;
      case PrisonType.MINISTER:
        if (!$gameSwitches.value(921)) {
          return this._actorId == 1;
        }
    }
    return false;
  };
  PrisonSlot.prototype.needVagrantExperience = function () {
    switch (this.type()) {
      case PrisonType.VAGRANT:
        return true;
    }
    return false;
  };
  PrisonSlot.prototype.needGoblinExperience = function () {
    switch (this.type()) {
      case PrisonType.GOBLIN:
        return true;
    }
    return false;
  };
  PrisonSlot.prototype.needSyusanExperience = function () {
    switch (this.type()) {
      case PrisonType.CHICHI:
        return true;
    }
    return false;
  };
  PrisonSlot.prototype.setActorId = function (actorId) {
    this._actorId = actorId;
  };
  PrisonSlot.prototype.actorId = function () {
    return this._actorId;
  };
  PrisonSlot.prototype.clearActor = function () {
    this._actorId = 0;
  };
  PrisonSlot.prototype.isEmpty = function () {
    return this._actorId == 0;
  };
  PrisonSlot.prototype.crystal = function () {
    switch (this._type) {
      case PrisonType.BANZOKU:
      case PrisonType.VAGRANT:
      case PrisonType.GRAY:
      case PrisonType.GOBLIN:
        return Math.round(
          Nore.PRISON_CRYSTAL_RATE * $gameParty.crystalPriceRate()
        );
    }
    return 0;
  };
  PrisonSlot.prototype.skillPoint = function () {
    switch (this._type) {
      case PrisonType.NIKUBENKI:
      case PrisonType.MINISTER:
      case PrisonType.CHARLES:
        return 1;
    }
    return 0;
  };
  return PrisonSlot;
})();
var PrisonInfo = /** @class */ (function () {
  function PrisonInfo() {
    this._slotList = [new PrisonSlot(PrisonType.NIKUBENKI)];
  }
  PrisonInfo.prototype.removeIllegalSlot = function () {
    for (var _i = 0, _a = this._slotList; _i < _a.length; _i++) {
      var slot = _a[_i];
      slot.refresh();
    }
  };
  PrisonInfo.prototype.slotList = function () {
    this.sort();
    return this._slotList;
  };
  PrisonInfo.prototype.has2Nikubenki = function () {
    var n = 0;
    for (var _i = 0, _a = this._slotList; _i < _a.length; _i++) {
      var s = _a[_i];
      if (s.type() == PrisonType.NIKUBENKI) {
        n++;
      }
    }
    return n >= 2;
  };
  PrisonInfo.prototype.sort = function () {
    this._slotList = this._slotList.sort(function (a, b) {
      return a.getOrder() - b.getOrder();
    });
  };
  PrisonInfo.prototype.addPrisonSlot = function (type, actorId) {
    if (actorId === void 0) {
      actorId = 0;
    }
    var slot = new PrisonSlot(type);
    if (actorId > 0) {
      slot.setActorId(actorId);
    }
    this._slotList.push(slot);
  };
  PrisonInfo.prototype.setPrisoner = function (index, actor) {
    //if (actor.actorId() < 20) {
    this.removePrisoner(actor);
    //}
    if (actor) {
      this._slotList[index].setActorId(actor.actorId());
    } else {
      this._slotList[index].setActorId(0);
    }
  };
  PrisonInfo.prototype.removePrisoner = function (actor) {
    if (!actor) {
      return;
    }
    for (var i = 0; i < this._slotList.length; i++) {
      if (this._slotList[i]) {
        if (this._slotList[i].actorId() == actor.actorId()) {
          this._slotList[i].clearActor();
        }
      }
    }
  };
  PrisonInfo.prototype.isVagrantDisabled = function (actorId) {
    switch (actorId) {
      case 3:
      case 7:
        return true;
    }
    return false;
  };
  PrisonInfo.prototype.decideBanzokuRoomActorVar = function () {
    $gameVariables.setValue(941, 100);
    for (var _i = 0, _a = this._slotList; _i < _a.length; _i++) {
      var slot = _a[_i];
      if (slot.type() == PrisonType.BANZOKU) {
        if (slot.actorId() > 0) {
          var actor = $gameActors.actor(slot.actorId());
          actor.restoreCostume(Nore.ERO_COS_SLOT_ID, true);
          $gameVariables.setValue(941, slot.actorId());
          break;
        }
      }
    }
  };
  PrisonInfo.prototype.includes = function (actorId) {
    for (var _i = 0, _a = this._slotList; _i < _a.length; _i++) {
      var slot = _a[_i];
      if (slot.actorId() == actorId) {
        return true;
      }
    }
    return false;
  };
  PrisonInfo.prototype.slot = function (index) {
    return this._slotList[index];
  };
  PrisonInfo.prototype.nikubenkiName = function (actorId) {
    for (var _i = 0, _a = this._slotList; _i < _a.length; _i++) {
      var slot = _a[_i];
      if (slot.actorId() == actorId) {
        return this.nikubenkiNameByType(slot.type());
      }
    }
  };
  PrisonInfo.prototype.nikubenkiNameByType = function (type) {
    switch (type) {
      case PrisonType.NIKUBENKI:
        return TextManager.nikubenkiPerson;
      case PrisonType.BAISYUN:
        return TextManager.baisyunPerson;
      case PrisonType.BANZOKU:
        return TextManager.banzokuPerson;
      case PrisonType.VAGRANT:
        return TextManager.vagrantPerson;
      case PrisonType.GOBLIN:
        return TextManager.goblinPerson;
      case PrisonType.MINISTER:
        return TextManager.ministerPerson;
      case PrisonType.GRAY:
        return TextManager.grayPerson;
      case PrisonType.CHARLES:
        return TextManager.charlesPerson;
      case PrisonType.CHICHI:
        return TextManager.chichiPerson;
    }
    return null;
  };
  PrisonInfo.prototype.isNikubenki = function (actorId) {
    for (var _i = 0, _a = this._slotList; _i < _a.length; _i++) {
      var slot = _a[_i];
      if (slot.actorId() == actorId) {
        return slot.type() == PrisonType.NIKUBENKI;
      }
    }
    return false;
  };
  PrisonInfo.prototype.isBaisyun = function (actorId) {
    for (var _i = 0, _a = this._slotList; _i < _a.length; _i++) {
      var slot = _a[_i];
      if (slot.actorId() == actorId) {
        return slot.type() == PrisonType.BAISYUN;
      }
    }
    return false;
  };
  PrisonInfo.prototype.isBanzoku = function (actorId) {
    for (var _i = 0, _a = this._slotList; _i < _a.length; _i++) {
      var slot = _a[_i];
      if (slot.actorId() == actorId) {
        return slot.type() == PrisonType.BANZOKU;
      }
    }
    return false;
  };
  PrisonInfo.prototype.isVagrant = function (actorId) {
    for (var _i = 0, _a = this._slotList; _i < _a.length; _i++) {
      var slot = _a[_i];
      if (slot.actorId() == actorId) {
        return slot.type() == PrisonType.VAGRANT;
      }
    }
    return false;
  };
  PrisonInfo.prototype.isGoblin = function (actorId) {
    for (var _i = 0, _a = this._slotList; _i < _a.length; _i++) {
      var slot = _a[_i];
      if (slot.actorId() == actorId) {
        return slot.type() == PrisonType.GOBLIN;
      }
    }
    return false;
  };
  PrisonInfo.prototype.isMinister = function (actorId) {
    for (var _i = 0, _a = this._slotList; _i < _a.length; _i++) {
      var slot = _a[_i];
      if (slot.actorId() == actorId) {
        return slot.type() == PrisonType.MINISTER;
      }
    }
    return false;
  };
  PrisonInfo.prototype.isGray = function (actorId) {
    for (var _i = 0, _a = this._slotList; _i < _a.length; _i++) {
      var slot = _a[_i];
      if (slot.actorId() == actorId) {
        return slot.type() == PrisonType.GRAY;
      }
    }
    return false;
  };
  PrisonInfo.prototype.isCharles = function (actorId) {
    for (var _i = 0, _a = this._slotList; _i < _a.length; _i++) {
      var slot = _a[_i];
      if (slot.actorId() == actorId) {
        return slot.type() == PrisonType.CHARLES;
      }
    }
    return false;
  };
  PrisonInfo.prototype.isChichi = function (actorId) {
    for (var _i = 0, _a = this._slotList; _i < _a.length; _i++) {
      var slot = _a[_i];
      if (slot.actorId() == actorId) {
        return slot.type() == PrisonType.CHICHI;
      }
    }
    return false;
  };
  PrisonInfo.prototype.isEmpty = function () {
    if ($gameSystem.isEroAcceAllOpened()) {
      return false;
    }
    for (var _i = 0, _a = this._slotList; _i < _a.length; _i++) {
      var slot = _a[_i];
      if (slot.actorId() != 0) {
        return false;
      }
    }
    return true;
  };
  PrisonInfo.prototype.size = function () {
    return this._slotList.length;
  };
  return PrisonInfo;
})();
var RECOVER_NUM = 20;
var PrisonerInfo = /** @class */ (function () {
  function PrisonerInfo() {
    this._numMap = {};
    this._totalNumMap = {};
    this._numMap[21] = 0;
    this._numMap[22] = 0;
    this._numMap[23] = 0;
    this._totalNumMap[21] = 130;
    this._totalNumMap[22] = 104;
    this._totalNumMap[23] = 91;
  }
  PrisonerInfo.prototype.hasCapturesCivilian = function () {
    return this.civilianCandidates().length > 0;
  };
  PrisonerInfo.prototype.isCivilianZero = function () {
    for (var i = 21; i <= 23; i++) {
      if (this._numMap[i] < this._totalNumMap[i]) {
        return false;
      }
    }
    return true;
  };
  PrisonerInfo.prototype.recoverCivilian = function () {
    var candidates = this.civilianCandidates();
    if (candidates.length == 0) {
      return false;
    }
    var dice = Math.randomInt(candidates.length);
    var actorId = candidates[dice];
    p("recoverCivilian:" + actorId);
    if (this._numMap[actorId] < RECOVER_NUM) {
      this._numMap[actorId] = 0;
    } else {
      this._numMap[actorId] -= RECOVER_NUM;
    }
  };
  PrisonerInfo.prototype.civilianCandidates = function () {
    var ret = [];
    for (var i = 21; i <= 23; i++) {
      if (this._numMap[i] > 0) {
        ret.push(i);
      }
    }
    return ret;
  };
  PrisonerInfo.prototype.getNum = function (actorId) {
    var n = this._numMap[actorId] || 0;
    var total = this.getTotal(actorId);
    return Math.min(n, total);
  };
  PrisonerInfo.prototype.getTotal = function (actorId) {
    return this._totalNumMap[actorId] || 0;
  };
  PrisonerInfo.prototype.plusNum = function (actorId, num) {
    p("plusNum" + num);
    this._numMap[actorId] = this._numMap[actorId] || 0;
    this._numMap[actorId] = this._numMap[actorId] + num;
  };
  PrisonerInfo.prototype.nikubenkiNum = function () {
    var n = 0;
    for (var i in this._numMap) {
      n += this._numMap[i];
    }
    return n;
  };
  PrisonerInfo.prototype.totalNum = function () {
    var n = 0;
    for (var i in this._totalNumMap) {
      n += this._totalNumMap[i];
    }
    return n;
  };
  PrisonerInfo.prototype.nextDay = function () {
    for (
      var _i = 0, _a = $gameParty.prisonInfo()._slotList;
      _i < _a.length;
      _i++
    ) {
      var slot = _a[_i];
      var actorId = slot.actorId();
      if (this._numMap[actorId] !== undefined) {
        this.plusNum(actorId, this.calcNumPerson());
      }
    }
  };
  PrisonerInfo.prototype.calcNumPerson = function () {
    return $gameVariables.value(90);
  };
  PrisonerInfo.prototype.isMax = function (actorId) {
    return this._totalNumMap[actorId] <= this._numMap[actorId];
  };
  PrisonerInfo.prototype.calcPlusNum = function (actorId) {
    var n = 20 + Math.randomInt(15);
    p(this._totalNumMap[actorId] + " " + this._numMap[actorId]);
    if (this._totalNumMap[actorId] < this._numMap[actorId] + n) {
      n = this._totalNumMap[actorId] - this._numMap[actorId];
    }
    return n;
  };
  return PrisonerInfo;
})();
