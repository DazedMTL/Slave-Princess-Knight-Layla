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
 * @command Open
 * @text 宝箱獲得
 * @des 宝箱獲得
 *
 * @command OpenEro
 * @text エロい宝箱獲得
 * @des エロい宝箱獲得
 *
 */
var Nore;
(function (Nore) {
  Nore.ELITE_TREASURE_SW_ID = 43;
  var pluginName = "Nore_Treasure";
  PluginManager.registerCommand(pluginName, "Open", function (args) {
    SceneManager.push(Scene_Treasure);
  });
  PluginManager.registerCommand(pluginName, "OpenEro", function (args) {
    SceneManager.push(Scene_Treasure);
  });
  function selectTreasureItems() {
    var items = [];
    for (var i = 0; i < 4; i++) {
      var level = $gameParty.calcTreasureLevel();
      if (i < 2) {
        var weapon = selectRandomWeapon(level, items);
        if (!weapon) {
          console.error(level);
          console.error(items);
          continue;
        }
        items.push(new Weapon(weapon));
      } else {
        var armor = selectRandomArmor(level, items);
        items.push(new Armor(armor));
      }
    }
    return items;
  }
  Nore.selectTreasureItems = selectTreasureItems;
  function selectTreasureEroItems() {
    var items = [];
    for (var i = 0; i < 4; i++) {
      var level = 1;
      var armor = selectRandomEroArmor(level, items);
      if (armor) {
        items.push(new Armor(armor));
      }
    }
    return items;
  }
  Nore.selectTreasureEroItems = selectTreasureEroItems;
  function selectRandomWeapon(level, items) {
    var candidates = [];
    for (var i = 1; i < $dataWeapons.length; i++) {
      var weapon = $dataWeapons[i];
      if (!weapon) {
        continue;
      }
      /*if (items.contains(weapon)) {
                continue;
            }*/
      if (!$gameParty.canEquip(weapon)) {
        continue;
      }
      if (Math.trunc(weapon.meta["lv"]) == level) {
        candidates.push(weapon);
      }
    }
    var dice = Math.randomInt(candidates.length);
    return candidates[dice];
  }
  Nore.selectRandomWeapon = selectRandomWeapon;
  function selectRandomArmor(level, items) {
    var candidates = [];
    for (var i = 1; i < $dataArmors.length; i++) {
      var armor = $dataArmors[i];
      if (!armor) {
        continue;
      }
      /*if (items.contains(armor)) {
                continue;
            }*/
      if (armor.meta["ero"]) {
        continue;
      }
      if (Math.trunc(armor.meta["lv"]) == level) {
        candidates.push(armor);
      }
    }
    var dice = Math.randomInt(candidates.length);
    return candidates[dice];
  }
  function selectRandomEroArmor(level, items) {
    var candidates = [];
    for (var i = 1; i < $dataArmors.length; i++) {
      var armor = $dataArmors[i];
      if (!armor) {
        continue;
      }
      /*if (items.contains(armor)) {
                continue;
            }*/
      if (!armor.meta["ero"]) {
        continue;
      }
      var equip = new Armor(armor, true);
      if (!$gameParty.canEquipCursed(equip)) {
        continue;
      }
      if (Math.trunc(armor.meta["lv"]) == level) {
        candidates.push(armor);
      }
    }
    var dice = Math.randomInt(candidates.length);
    return candidates[dice];
  }
  var Scene_Treasure = /** @class */ (function (_super) {
    __extends(Scene_Treasure, _super);
    function Scene_Treasure() {
      var _this = (_super !== null && _super.apply(this, arguments)) || this;
      _this._selectedIndex = 0;
      _this._equipList = [];
      return _this;
    }
    Scene_Treasure.prototype.create = function () {
      Nore.Scene_Talk.prototype.create.call(this);
      this.refreshBg();
      this.selectTreasure();
      this.createLabel();
      this.createCharacterWindow();
      this.createTreasureWindows();
      //this.createToday();
      this.updateSelection();
      this.updateCurrentEquip();
      this.updateCharacter();
      this.createHelpWindow();
      this.createConfirmWindow();
      this.createConfirmWindow2();
      this.updateCurrentEquip();
      this.createWindowLayer();
      this.createAllWindows();
      this.initVisibility();
      this.initSwitch();
      this.startTutorial();
      this._backlogDisabled = true;
    };
    Scene_Treasure.prototype.initSwitch = function () {
      $gameSwitches.setValue(60, false);
    };
    Scene_Treasure.prototype.startTutorial = function () {
      if ($gameSwitches.value(240)) {
        return;
      }
      $gameSwitches.setValue(240, true);
      this.playScenario("装備箱チュートリアル_01");
    };
    Scene_Treasure.prototype.getTreasureWindow = function (index) {
      return this["_treasureWindow" + (index + 1)];
    };
    Scene_Treasure.prototype.selectTreasure = function () {
      this._equipList = $gameTemp.tempTreasure();
    };
    Scene_Treasure.prototype.createLabel = function () {
      this._labelWindow = new Nore.Window_Label2(
        TextManager.obtainTreasure,
        150,
        58,
        900
      );
      this.addChild(this._labelWindow);
      this._labelWindow2 = new Nore.Window_Label2(
        TextManager.obtainTreasure2,
        150,
        114,
        900
      );
      this.addChild(this._labelWindow2);
    };
    Scene_Treasure.prototype.createHelpWindow = function () {
      var rect = new Rectangle(740, 520, 520, 120);
      this._helpWindow = new Nore.Window_BattleHelp(rect);
      //this._helpWindow.hide();
      this._helpWindow.show();
      this.addChild(this._helpWindow);
    };
    Scene_Treasure.prototype.initVisibility = function () {
      if (this._equipList.length > 0) {
        var equip = this._equipList[0];
        if (!equip.isArmor() && !equip.isWeapon()) {
          this._characterWindow.hide();
        }
      }
    };
    Scene_Treasure.prototype.createCharacterWindow = function () {
      this._characterWindow = new Window_CharacterSelect(330, 520);
      this._characterWindow.setHandler(this.onCharaChange.bind(this));
      this.addChild(this._characterWindow);
      this._equipWindow = new Window_CurrentEquip(20, 520);
      this.addChild(this._equipWindow);
    };
    Scene_Treasure.prototype.refreshBg = function () {
      var baseTexture = Nore.getSystemBaseTexture("bg");
      var texture = new PIXI.Texture(baseTexture);
      var sprite = new PIXI.Sprite(texture);
      sprite.x = 0;
      sprite.y = 0;
      this.addChild(sprite);
    };
    Scene_Treasure.prototype.createTreasureWindows = function () {
      //this._equipList = [$dataWeapons[2], $dataWeapons[3], $dataWeapons[32], $dataWeapons[32]];
      this._treasureWindow1 = new Window_Treasure(50);
      this.addChild(this._treasureWindow1);
      this._treasureWindow1.setEquip(this._equipList[0]);
      this._treasureWindow2 = new Window_Treasure(350);
      this.addChild(this._treasureWindow2);
      this._treasureWindow2.setEquip(this._equipList[1]);
      this._treasureWindow3 = new Window_Treasure(650);
      this.addChild(this._treasureWindow3);
      this._treasureWindow3.setEquip(this._equipList[2]);
      this._treasureWindow4 = new Window_Treasure(950);
      this.addChild(this._treasureWindow4);
      this._treasureWindow4.setEquip(this._equipList[3]);
    };
    Scene_Treasure.prototype.update = function () {
      _super.prototype.update.call(this);
      if (!this._confirmWindow.active) {
        this.updateCursor();
        this.updateCancel();
        this.updateOk();
        this.processTouch();
      }
      TouchInput.update();
    };
    Scene_Treasure.prototype.processTouch = function () {
      if (this.isInterpreterRunning()) {
        return;
      }
      if (!this._equipWindow.active) {
        return;
      }
      this.processTouchTreasureWindow();
      if (TouchInput.isClicked()) {
        TouchInput.clear();
        this.onOk();
      }
    };
    Scene_Treasure.prototype.processTouchTreasureWindow = function () {
      if (this.isInterpreterRunning()) {
        return;
      }
      if (!TouchInput.isHovered()) {
        return;
      }
      for (var i = 1; i <= 4; i++) {
        var window_1 = this["_treasureWindow" + i];
        if (window_1.isHit()) {
          if (this._selectedIndex != i - 1) {
            this._selectedIndex = i - 1;
            SoundManager.playCursor();
            this.updateSelection();
            this.updateCharacter();
            this.updateCurrentEquip();
            break;
          } else {
          }
        }
      }
    };
    Scene_Treasure.prototype.updateCursor = function () {
      if (this.isInterpreterRunning()) {
        return;
      }
      if (this._confirmWindow.active || this._confirmWindow2.active) {
        return;
      }
      if (this._msgWindow && this._msgWindow.active) {
        return;
      }
      if (Input.isTriggered("right")) {
        SoundManager.playCursor();
        this._selectedIndex++;
        if (this._selectedIndex >= this._equipList.length) {
          this._selectedIndex = 0;
        }
        this.updateSelection();
        this.updateCharacter();
        this.updateCurrentEquip();
      }
      if (Input.isTriggered("left")) {
        SoundManager.playCursor();
        this._selectedIndex--;
        if (this._selectedIndex < 0) {
          this._selectedIndex = this._equipList.length - 1;
        }
        this.updateSelection();
        this.updateCharacter();
        this.updateCurrentEquip();
      }
      if (Input.isTriggered("pagedown") || TouchInput.wheelY > 0) {
        SoundManager.playCursor();
        this._characterWindow.nextCharacter();
        this.updateCurrentEquip();
      }
      if (Input.isTriggered("pageup") || TouchInput.wheelY < 0) {
        SoundManager.playCursor();
        this._characterWindow.previousCharacter();
        this.updateCurrentEquip();
      }
    };
    Scene_Treasure.prototype.onCharaChange = function () {
      this.updateCurrentEquip();
    };
    Scene_Treasure.prototype.updateCancel = function () {
      if (Input.isTriggered("cancel") || TouchInput.rightButton) {
        $gameSwitches.setValue(60, true);
        SoundManager.playCancel();
        this.popScene();
      }
    };
    Scene_Treasure.prototype.updateOk = function () {
      if (this.isInterpreterRunning()) {
        return;
      }
      if (this._confirmWindow.active || this._confirmWindow2.active) {
        return;
      }
      if (Input.isTriggered("ok")) {
        this.onOk();
      }
    };
    Scene_Treasure.prototype.onOk = function () {
      SoundManager.playOk();
      var actor = this._characterWindow.currentActor();
      var current = this._equipList[this._selectedIndex];
      var equip = current;
      if (actor.canEquip(equip.item())) {
        if (equip.isCursed()) {
          this._confirmWindow.setText(TextManager.confirmGetAndEquip);
        } else {
          this._confirmWindow.setText(TextManager.confirmGet);
        }
      } else if (!actor.canEquipLv(equip.item())) {
        this._confirmWindow.setText(TextManager.confirmCantEquipLv);
      } else {
        this._confirmWindow.setText(TextManager.confirmCantEquip);
      }
      this._confirmWindow.show();
      this._confirmWindow.activate();
    };
    Scene_Treasure.prototype.updateCharacter = function () {
      var current = this._equipList[this._selectedIndex];
      this._characterWindow.refresh(current);
    };
    Scene_Treasure.prototype.updateSelection = function () {
      this._treasureWindow1.setSelection(this._selectedIndex == 0);
      this._treasureWindow2.setSelection(this._selectedIndex == 1);
      this._treasureWindow3.setSelection(this._selectedIndex == 2);
      this._treasureWindow4.setSelection(this._selectedIndex == 3);
    };
    Scene_Treasure.prototype.updateCurrentEquip = function () {
      var window = this["_treasureWindow" + (this._selectedIndex + 1)];
      if (window.isSoldOut()) {
        this._equipWindow.hide();
        if (this._helpWindow) {
          this._helpWindow.hide();
        }
        return;
      }
      var current = this._equipList[this._selectedIndex];
      var actor = this._characterWindow.currentActor();
      if (current.isArmor()) {
        var slot = actor.equipSlots().indexOf(current.etypeId());
        var armor = actor.equips()[slot];
        this._equipWindow.setEquip(actor, armor, current);
        //actor.equi
      } else {
        var weapon = actor.equips()[0];
        this._equipWindow.setEquip(actor, weapon, current);
      }
      if (this._helpWindow) {
        this._helpWindow.setItem(current);
        this._helpWindow.show();
      }
    };
    Scene_Treasure.prototype.createConfirmWindow = function () {
      this._confirmWindow = new Nore.Window_Confirm(700);
      this._confirmWindow.setHandler("ok", this.onConfirmOk.bind(this));
      this._confirmWindow.setHandler("cancel", this.onConfirmCancel.bind(this));
      this._confirmWindow.deactivate();
      this.addChild(this._confirmWindow);
      this._confirmWindow.hide();
    };
    Scene_Treasure.prototype.createConfirmWindow2 = function () {
      this._confirmWindow2 = new Nore.Window_Confirm(700);
      this._confirmWindow2.setText(TextManager.confirmEquip);
      this._confirmWindow2.setHandler("ok", this.onConfirmOk2.bind(this));
      this._confirmWindow2.setHandler(
        "cancel",
        this.onConfirmCancel2.bind(this)
      );
      this._confirmWindow2.deactivate();
      this.addChild(this._confirmWindow2);
      this._confirmWindow2.hide();
    };
    Scene_Treasure.prototype.onConfirmOk2 = function () {
      var actor = this._characterWindow.currentActor();
      var current = this._equipList[this._selectedIndex];
      SoundManager.playEquip();
      var equip = current;
      $gameParty.gainItem(equip, 1, false);
      if (current.isWeapon()) {
        actor.changeEquip(0, equip);
      } else {
        var slot = actor.equipSlots().indexOf(equip.etypeId());
        actor.changeEquip(slot, equip);
        actor.updateEroAcce();
        $gameActors.actor(actor.actorId()).setCacheChanged();
      }
      $gameTemp.clearTreasure();
      $gameMedals.onTreasure();
      this.popScene();
    };
    Scene_Treasure.prototype.onConfirmCancel2 = function () {
      var current = this._equipList[this._selectedIndex];
      $gameParty.gainItem(current, 1, false);
      this.popScene();
    };
    Scene_Treasure.prototype.onConfirmOk = function () {
      this._confirmWindow.hide();
      this._confirmWindow.deactivate();
      var actor = this._characterWindow.currentActor();
      var current = this._equipList[this._selectedIndex];
      var equip = current;
      if (actor.canEquip(equip.item())) {
        if (equip.isCursed()) {
          actor.gainExp(equip.exp());
          actor.decideCursedEroEventSteps();
          actor.clearCacheChanged();
          actor.setCacheChanged();
          this.onConfirmOk2();
          return;
        }
        this._confirmWindow2.show();
        this._confirmWindow2.activate();
      } else {
        $gameParty.gainItem(equip, 1, false);
        this.afterOk();
      }
    };
    Scene_Treasure.prototype.afterOk = function () {
      this.popScene();
    };
    Scene_Treasure.prototype.onConfirmCancel = function () {
      this._confirmWindow.hide();
      this._confirmWindow.deactivate();
    };
    return Scene_Treasure;
  })(Nore.Scene_Talk);
  Nore.Scene_Treasure = Scene_Treasure;
  Sprite_Character.prototype.isHit = function () {
    var touchPos = new Point(TouchInput.x, TouchInput.y);
    return this.containsPoint(touchPos);
  };
  var CHARACTER_INTERVAL = 50;
  var LEFT = 80;
  var Window_CharacterSelect = /** @class */ (function (_super) {
    __extends(Window_CharacterSelect, _super);
    function Window_CharacterSelect(x, y) {
      var _this = _super.call(this, new Rectangle(x, y, 400, 156)) || this;
      _this._selectedIndex = 0;
      _this.createSprites();
      _this.createSelectSign();
      return _this;
    }
    Window_CharacterSelect.prototype.setHandler = function (method) {
      this._handler = method;
    };
    Window_CharacterSelect.prototype.createSprites = function () {
      var i = 0;
      var interval = CHARACTER_INTERVAL;
      this._characters = [];
      for (var _i = 0, _a = $gameParty.battleMembers(); _i < _a.length; _i++) {
        var actor = _a[_i];
        var cos = new CostumeSaver(actor.actorId());
        var c = new Nore.Game_DungeonCharacter(cos, LEFT + interval * i, 110);
        //const c = new Game_TreasureCharacter(actor, LEFT + interval * i, 110);
        this._characters.push(c);
        var sprite = new Sprite_ActorCharacter(c, cos);
        this["_sprite" + i] = sprite;
        this.addChild(sprite);
        i++;
      }
      this.contents.fontSize = 22;
      this.contents.drawText("L", 10, 30, 100, 40, "left");
      this.contents.drawText(
        "R",
        LEFT + interval * i - 12,
        30,
        100,
        40,
        "left"
      );
    };
    Window_CharacterSelect.prototype.refresh = function (equip) {
      this.contents.clearRect(10, 100, 500, 50);
      this._equip = equip;
      var i = 0;
      var interval = CHARACTER_INTERVAL;
      this.contents.fontSize = 16;
      for (var _i = 0, _a = this._characters; _i < _a.length; _i++) {
        var c = _a[_i];
        c.setEquip(equip);
        this.contents.clearRect(LEFT + interval * i - 25, 0, 40, 40);
        var actor = c.actor();
        this.contents.textColor = ColorManager.normalColor();
        if (
          actor.canEquipType(this._equip.item()) &&
          actor.canEquipCurced(this._equip)
        ) {
          this.changePaintOpacity(true);
          if (actor.canEquipLv(this._equip.item())) {
            this.contents.textColor = ColorManager.normalColor();
          } else {
            this.contents.textColor = ColorManager.deathColor();
          }
        } else {
          if (
            actor.canEquipType(this._equip.item()) &&
            !actor.canEquipCurced(this._equip)
          ) {
            this.drawIcon(Nore.CURSE_ICON_INDEX, LEFT + interval * i - 25, 0);
          }
          this.changePaintOpacity(false);
        }
        //this.contents.drawText('LV' + actor.level, LEFT + interval * i - 25, 90, 100, 40, 'left');
        i++;
      }
      var list = $gameParty.battleMembers().concat($gameParty.battleMembers());
      for (var i_1 = this._selectedIndex; i_1 < list.length; i_1++) {
        var a = list[i_1];
        if (a.canEquipType(equip.item()) && a.canEquipCurced(this._equip)) {
          this._selectedIndex = i_1 % $gameParty.battleMembers().length;
          this._handler.call(this);
          break;
        }
      }
      this.updateSelectionSign();
    };
    Window_CharacterSelect.prototype.update = function () {
      _super.prototype.update.call(this);
      this.updateSelectionSign();
      //this.updateTouch();
    };
    Window_CharacterSelect.prototype.updateTouch = function () {
      for (var i = 0; i < 5; i++) {
        var window_2 = this["_sprite" + i];
        if (!window_2) {
          break;
        }
        if (window_2.isHit()) {
          if (this._selectedIndex != i) {
            this._selectedIndex = i;
            SoundManager.playCursor();
            this._handler.call(this);
            break;
          } else {
          }
        }
      }
    };
    Window_CharacterSelect.prototype.updateSelectionSign = function () {
      this._pauseSignSprite.move(
        this._selectedIndex * CHARACTER_INTERVAL + LEFT,
        46
      );
    };
    Window_CharacterSelect.prototype.createSelectSign = function () {
      this._pauseSignSprite = new Sprite();
      this.addChild(this._pauseSignSprite);
      this._pauseSignSprite.bitmap = ImageManager.loadSystem("name_window");
      this._pauseSignSprite.anchor.x = 0.5;
      this._pauseSignSprite.anchor.y = 1;
      this._pauseSignSprite.setFrame(350, 0, 40, 40);
      this._pauseSignSprite.alpha = 255;
    };
    Window_CharacterSelect.prototype._updatePauseSign = function () {};
    Window_CharacterSelect.prototype.currentActor = function () {
      return $gameParty.battleMembers()[this._selectedIndex];
    };
    Window_CharacterSelect.prototype.nextCharacter = function () {
      var length = $gameParty.battleMembers().length + 1;
      for (var i = 0; i < length; i++) {
        this._selectedIndex++;
        if (this._selectedIndex >= $gameParty.battleMembers().length) {
          this._selectedIndex = 0;
        }
        if (
          this.currentActor().canEquipType(this._equip.item()) &&
          this.currentActor().canEquipCurced(this._equip)
        ) {
          break;
        }
      }
    };
    Window_CharacterSelect.prototype.previousCharacter = function () {
      var length = $gameParty.battleMembers().length + 1;
      for (var i = 0; i < length; i++) {
        this._selectedIndex--;
        if (this._selectedIndex < 0) {
          this._selectedIndex = $gameParty.battleMembers().length - 1;
        }
        if (
          this.currentActor().canEquipType(this._equip.item()) &&
          this.currentActor().canEquipCurced(this._equip)
        ) {
          break;
        }
      }
    };
    return Window_CharacterSelect;
  })(Window_Base);
  var Game_TreasureCharacter = /** @class */ (function (_super) {
    __extends(Game_TreasureCharacter, _super);
    function Game_TreasureCharacter(actor, x, y) {
      var _this = _super.call(this) || this;
      _this._actor = actor;
      _this._x = x;
      _this._y = y;
      _this.refresh();
      return _this;
    }
    Game_TreasureCharacter.prototype.refresh = function () {
      var characterName = this.actor().characterName();
      var characterIndex = this.actor().characterIndex();
      this.setImage(characterName, characterIndex);
    };
    Game_TreasureCharacter.prototype.actor = function () {
      return this._actor;
    };
    Game_TreasureCharacter.prototype.screenX = function () {
      return this._x;
    };
    Game_TreasureCharacter.prototype.screenY = function () {
      return this._y;
    };
    Game_TreasureCharacter.prototype.setEquip = function (e) {
      if (this._actor.canEquipType(e.item()) && this._actor.canEquipCurced(e)) {
        this.setOpacity(255);
      } else {
        this.setOpacity(100);
      }
    };
    return Game_TreasureCharacter;
  })(Game_Character);
  var PARAM_INTERVAL = 28;
  var Window_CurrentEquip = /** @class */ (function (_super) {
    __extends(Window_CurrentEquip, _super);
    function Window_CurrentEquip(x, y) {
      return _super.call(this, new Rectangle(x, y, 300, 250)) || this;
    }
    Window_CurrentEquip.prototype.setEquip = function (actor, equip, newEquip) {
      this._actor = actor;
      this._weapon = null;
      this._armor = null;
      this._newWeapon = null;
      this._newArmor = null;
      if (!this._actor.canEquipType(newEquip.item())) {
        this.refresh();
        this.hide();
        return;
      }
      /*if (equip && equip.lv() == 0) {
                this.hide();
                return;
            } else {*/
      if (newEquip.isArmor()) {
        this._armor = equip;
        this._newArmor = newEquip;
        if (!equip) {
          this._armor = new EmptyArmor();
        }
      } else {
        this._weapon = equip;
        this._newWeapon = newEquip;
        if (!equip) {
          this._weapon = new EmptyWeapon();
        }
      }
      //}
      this.show();
      this.refresh();
    };
    Window_CurrentEquip.prototype.refresh = function () {
      this.contents.clear();
      this.contents.fontSize = 20;
      this.visible = true;
      this.resetTextColor();
      this.drawText(TextManager.currentEquip, 10, 0, 200);
      if (this._newWeapon) {
        this.refreshWeapon();
      } else if (this._newArmor) {
        this.refreshArmor();
      } else {
        this.visible = false;
      }
    };
    Window_CurrentEquip.prototype.refreshWeapon = function () {
      this.drawText(this._weapon.name(), 30, 35, 200);
      this.drawText(TextManager.changeEquip, 10, 72, 200);
      var y = -12;
      for (var i = 0; i < 12; i++) {
        if (this.drawParam(i, y, this._newWeapon, this._weapon)) {
          y += PARAM_INTERVAL;
        }
      }
    };
    Window_CurrentEquip.prototype.refreshArmor = function () {
      this.drawText(this._armor.name(), 30, 35, 200);
      this.drawText(TextManager.changeEquip, 10, 72, 200);
      var y = -12;
      for (var i = 0; i < 13; i++) {
        if (this.drawParam(i, y, this._newArmor, this._armor)) {
          y += PARAM_INTERVAL;
        }
      }
    };
    Window_CurrentEquip.prototype.drawParam = function (
      paramId,
      y,
      newEquip,
      current
    ) {
      this.resetTextColor();
      var param1 = newEquip.param(paramId);
      var param2 = current.param(paramId);
      if (param1 == 0 && param2 == 0) {
        return false;
      }
      var diff2 = param1 - param2;
      var diffText = diff2 + "";
      if (diff2 > 0) {
        diffText = "+" + diff2;
      }
      this.drawText(this.getParamLabel(paramId), 30, 120 + y, 200);
      this.changeTextColor(ColorManager.paramchangeTextColor(diff2));
      this.drawText(diffText, 50, 120 + y, 100, "right");
      return true;
    };
    Window_CurrentEquip.prototype.getParamLabel = function (paramId) {
      switch (paramId) {
        case 0:
          return "HP";
        case 2:
          return TextManager.atk;
        case 3:
          return TextManager.def;
        case 4:
          return TextManager.mat;
        case 5:
          return TextManager.mdf;
        case 7:
          return TextManager.shield;
        case 10:
          return TextManager.CriUp;
        case 11:
          return TextManager.flame;
        case 12:
          return TextManager.spPlusLabel;
      }
      p(paramId);
      return "AA";
    };
    return Window_CurrentEquip;
  })(Window_Base);
  var Window_Treasure = /** @class */ (function (_super) {
    __extends(Window_Treasure, _super);
    function Window_Treasure(x, y) {
      if (y === void 0) {
        y = 180;
      }
      var _this = _super.call(this, new Rectangle(x, y, 298, 340)) || this;
      _this.visible = true;
      _this.frameVisible = false;
      _this.backOpacity = 0;
      return _this;
    }
    Window_Treasure.prototype.setSoldOut = function () {
      this._soldOut = true;
      this.refresh();
    };
    Window_Treasure.prototype.isSoldOut = function () {
      return this._soldOut;
    };
    Window_Treasure.prototype.setDrawPrice = function () {
      this._drawPrice = true;
      this.refresh();
    };
    Window_Treasure.prototype.isHit = function () {
      var touchPos = new Point(TouchInput.x, TouchInput.y);
      var localPos = this.worldTransform.applyInverse(touchPos);
      if (this.innerRect.contains(localPos.x, localPos.y)) {
        return true;
      }
      return false;
    };
    Window_Treasure.prototype.onTouchSelect = function (trigger) {
      if (!this.active) {
        return;
      }
      var lastIndex = this.index();
      var hitIndex = this.hitIndex();
      if (hitIndex >= 0) {
        if (hitIndex === this.index()) {
          this._doubleTouch = true;
        }
        this.select(hitIndex);
      }
      if (trigger && this.index() !== lastIndex) {
        this.playCursorSound();
      }
    };
    Window_Treasure.prototype.setEquip = function (e) {
      if (!e) {
        return;
      }
      if (e.isArmor()) {
        this.setArmor(e);
      } else if (e.isWeapon()) {
        this.setWeapon(e);
      } else {
        this.setItem(e);
      }
    };
    Window_Treasure.prototype.setArmor = function (armor) {
      this._armor = armor;
      this.refresh();
    };
    Window_Treasure.prototype.setWeapon = function (weapon) {
      this._weapon = weapon;
      this.refresh();
    };
    Window_Treasure.prototype.setItem = function (item) {
      this._item = item;
      this.refresh();
    };
    Window_Treasure.prototype.refresh = function () {
      this.contents.clear();
      this._windowContentsSprite.removeChildren();
      this.refreshBg();
      if (this._soldOut) {
        this.refreshSoldOut();
        return;
      }
      if (this._armor) {
        this.refreshArmor();
      }
      if (this._weapon) {
        this.refreshWeapon();
      }
      if (this._item) {
        this.refreshItem();
      }
      this.drawPrice();
      this.resetFontSettings();
    };
    Window_Treasure.prototype.refreshSoldOut = function () {
      this.drawText("SOLD OUT", 98, 112, 200, "left");
    };
    Window_Treasure.prototype.drawRank = function () {
      var equip = this._weapon || this._armor;
      if (!equip) {
        return;
      }
      this.drawNumber(equip.rank(), 98, 18, 200, "left", 12);
    };
    Window_Treasure.prototype.drawPrice = function () {
      if (!this._drawPrice) {
        return;
      }
      var price = this.getPrice();
      var color = price < $gameParty.gold() ? 14 : 15;
      this.drawNumber(price, 28, 258, 170, "right", color);
      this.changeTextColor(ColorManager.systemColor());
      this.drawText("Ｇ", 190, 255, 200, "left");
    };
    Window_Treasure.prototype.getPrice = function () {
      var item = this._armor || this._weapon || this._item;
      return calcPrice(item);
    };
    Window_Treasure.prototype.drawNew = function () {
      //this.contents.fontSize = 22;
      //this.drawText('NEW', 125, 14, 200, 'left');
      var baseTexture = Nore.getSystemBaseTexture("menu2");
      var texture = new PIXI.Texture(
        baseTexture,
        new PIXI.Rectangle(0, 1350, 150, 46)
      );
      var sprite = new PIXI.Sprite(texture);
      sprite.x = 90;
      sprite.y = -14;
      this.addChild(sprite);
      var texture2 = new PIXI.Texture(
        baseTexture,
        new PIXI.Rectangle(180, 1350, 200, 46)
      );
      var sprite2 = new PIXI.Sprite(texture2);
      sprite2.x = -33;
      sprite2.y = 138;
      this.addChild(sprite2);
    };
    Window_Treasure.prototype.refreshWeapon = function () {
      this.drawIcon(this._weapon.iconIndex(), 46, 76);
      this.contents.fontSize = 22;
      this.contents.outlineWidth = 2;
      this.drawText(this._weapon.name(), 90, 77, 160, "left");
      this.drawLevel(this._weapon.lv());
      var yy = 133;
      this.contents.outlineWidth = 0;
      var index = 1;
      if (this.drawHp(this._weapon, yy + this.lineHeight() * index)) {
        index++;
      }
      if (this.drawAtk(this._weapon, yy + this.lineHeight() * index)) {
        index++;
      }
      if (this.drawDef(this._weapon, yy + this.lineHeight() * index)) {
        index++;
      }
      if (this.drawMat(this._weapon, yy + this.lineHeight() * index)) {
        index++;
      }
      if (this.drawShield(this._weapon, yy + this.lineHeight() * index)) {
        index++;
      }
    };
    Window_Treasure.prototype.lineHeight = function () {
      return 31;
    };
    Window_Treasure.prototype.refreshArmor = function () {
      if (!this._armor) {
        return;
      }
      this.drawIcon(this._armor.iconIndex(), 46, 76);
      this.contents.fontSize = 22;
      this.drawText(this._armor.name(), 90, 77, 160, "left");
      this.drawLevel(this._armor.lv());
      var yy = 133;
      this.contents.outlineWidth = 0;
      var index = 1;
      if (this.drawHp(this._armor, yy + this.lineHeight() * index)) {
        index++;
      }
      if (this.drawAtk(this._armor, yy + this.lineHeight() * index)) {
        index++;
      }
      if (this.drawDef(this._armor, yy + this.lineHeight() * index)) {
        index++;
      }
      if (this.drawMat(this._armor, yy + this.lineHeight() * index)) {
        index++;
      }
      if (this.drawMdf(this._armor, yy + this.lineHeight() * index)) {
        index++;
      }
      if (this.drawShield(this._armor, yy + this.lineHeight() * index)) {
        index++;
      }
      if (this.drawExp(this._armor, yy + this.lineHeight() * index)) {
        index++;
      }
    };
    Window_Treasure.prototype.refreshItem = function () {
      this.drawIcon(this._item.iconIndex(), 46, 76);
      this.contents.fontSize = 22;
      this.contents.outlineWidth = 2;
      this.drawText(this._item.name(), 90, 77, 160, "left");
    };
    Window_Treasure.prototype.drawHp = function (equip, y) {
      if (equip.hp() == 0) {
        return false;
      }
      this.contents.outlineWidth = 0;
      var left = this.textLeft();
      var width = this.statusWidth();
      this.drawText(TextManager.param(0), left, y, 200, "left");
      this.drawText(equip.hp(), left, y, width, "right");
      return true;
    };
    Window_Treasure.prototype.drawAtk = function (equip, y) {
      if (equip.atk() == 0) {
        return false;
      }
      this.contents.outlineWidth = 0;
      this.changeTextColor(ColorManager.normalColor());
      var left = this.textLeft();
      var width = this.statusWidth();
      this.drawText(TextManager.atk, left, y, 200, "left");
      this.drawText(equip.atk(), left, y, width, "right");
      return true;
    };
    Window_Treasure.prototype.drawDef = function (equip, y) {
      if (equip.def() == 0) {
        return false;
      }
      this.contents.outlineWidth = 0;
      this.changeTextColor(ColorManager.normalColor());
      var left = this.textLeft();
      var width = this.statusWidth();
      this.drawText(TextManager.def, left, y, 200, "left");
      this.drawText(equip.def(), left, y, width, "right");
      return true;
    };
    Window_Treasure.prototype.drawMat = function (equip, y) {
      if (equip.mat() == 0) {
        return false;
      }
      this.contents.outlineWidth = 0;
      this.changeTextColor(ColorManager.normalColor());
      var left = this.textLeft();
      var width = this.statusWidth();
      this.drawText(TextManager.mat, left, y, 200, "left");
      this.drawText(equip.mat(), left, y, width, "right");
      return true;
    };
    Window_Treasure.prototype.drawMdf = function (equip, y) {
      if (equip.mdf() == 0) {
        return false;
      }
      this.contents.outlineWidth = 0;
      this.changeTextColor(ColorManager.normalColor());
      var left = this.textLeft();
      var width = this.statusWidth();
      this.drawText(TextManager.mdf, left, y, 200, "left");
      this.drawText(equip.mdf(), left, y, width, "right");
      return true;
    };
    Window_Treasure.prototype.drawShield = function (equip, y) {
      if (equip.shield() == 0) {
        return false;
      }
      this.contents.outlineWidth = 0;
      this.changeTextColor(ColorManager.normalColor());
      var left = this.textLeft();
      var width = this.statusWidth();
      this.drawText(TextManager.shield, left, y, 200, "left");
      this.drawText(equip.shield(), left, y, width, "right");
      return true;
    };
    Window_Treasure.prototype.drawExp = function (equip, y) {
      if (equip.exp() == 0) {
        return false;
      }
      this.contents.outlineWidth = 0;
      this.changeTextColor(ColorManager.normalColor());
      var left = this.textLeft();
      var width = this.statusWidth();
      this.drawText("EXP", left, y, 200, "left");
      this.drawText(equip.exp(), left, y, width, "right");
      return true;
    };
    Window_Treasure.prototype.plusColor = function () {
      return ColorManager.textColor(3);
    };
    Window_Treasure.prototype.minusColor = function () {
      return ColorManager.textColor(2);
    };
    Window_Treasure.prototype.textLeft = function () {
      return 58;
    };
    Window_Treasure.prototype.statusWidth = function () {
      return 138;
    };
    Window_Treasure.prototype.drawLevel = function (rank) {
      /*const max = 7;
            const interval = 26;
            let xx = 38;
            let yy = 120;
            for (let i = 0; i < max; i++) {
                let icon = 407;
                if (i >= rank) {
                    icon = 408;
                }
                this.drawIcon(icon, xx, yy);
                xx += interval;
            }*/
      var baseTexture = Nore.getSystemBaseTexture("menu2");
      var rect = new Rectangle(0, 300, 300, 100);
      var texture = new PIXI.Texture(baseTexture, rect);
      var sprite = new PIXI.Sprite(texture);
      sprite.x = 15;
      sprite.y = 22;
      this._windowContentsSprite.addChild(sprite);
      this.drawText(rank, 90, 15, 100);
    };
    Window_Treasure.prototype.refreshBg = function () {
      this._contentsBackSprite.removeChildren();
      var baseTexture = Nore.getSystemBaseTexture("menu2");
      var rect;
      var equip = this._selected;
      if (equip) {
        if (this._item) {
          rect = new Rectangle(0, 0, 300, 300);
        } else {
          rect = new Rectangle(0, 610, 300, 300);
        }
      } else {
        rect = new Rectangle(0, 1048, 300, 300);
        //this.setEmpty();
      }
      var texture = new PIXI.Texture(baseTexture, rect);
      var sprite = new PIXI.Sprite(texture);
      sprite.x = -0;
      sprite.y = -0;
      this._contentsBackSprite.addChild(sprite);
    };
    Window_Treasure.prototype.setEmpty = function () {
      var baseTexture = Nore.getSystemBaseTexture("menu2");
      var texture;
      if (!ConfigManager.en) {
        texture = new PIXI.Texture(
          baseTexture,
          new PIXI.Rectangle(315, 1113, 350, 46)
        );
      } else {
        texture = new PIXI.Texture(
          baseTexture,
          new PIXI.Rectangle(305, 1165, 350, 46)
        );
      }
      var sprite = new PIXI.Sprite(texture);
      sprite.x = 80;
      if (ConfigManager.en) {
        sprite.x = 70;
      }
      sprite.y = 130;
      this.addChild(sprite);
    };
    Window_Treasure.prototype.setSelection = function (b) {
      this._selected = b;
      this.refreshBg();
    };
    return Window_Treasure;
  })(Window_Base);
  Nore.Window_Treasure = Window_Treasure;
  var Window_Label = /** @class */ (function (_super) {
    __extends(Window_Label, _super);
    function Window_Label(text, x, y, width) {
      if (width === void 0) {
        width = 300;
      }
      var _this = _super.call(this, new Rectangle(x, y, width, 60)) || this;
      _this.drawText(text, 0, 0, width, "left");
      _this.backOpacity = 0;
      return _this;
    }
    Window_Label.prototype._createFrameSprite = function () {
      this._frameSprite = new Sprite();
    };
    Window_Label.prototype._refreshFrame = function () {};
    return Window_Label;
  })(Window_Base);
  Nore.Window_Label = Window_Label;
  function calcPrice(item) {
    if (!item) {
      return 0;
    }
    var base = calcPriceBase(item);
    var rate = 100 - $gameParty.countSkill(SkillMeta.priceDown);
    return Math.trunc((base * rate) / 100);
  }
  Nore.calcPrice = calcPrice;
  function calcPriceBase(item) {
    if (item instanceof UsableItem) {
      if (item.meta()["expBox"]) {
        return calcExpBoxPrice(item);
      }
      return item.price();
    }
    var equip = item;
    var lv = equip.lv();
    switch (lv) {
      case 2:
        return 50;
      case 3:
        return 100;
      case 4:
        return 150;
      case 5:
        return 250;
      case 6:
        return 400;
    }
    return item.price;
  }
  Nore.calcPriceBase = calcPriceBase;
  function calcExpBoxPrice(item) {
    var plus = Math.trunc(item.meta()["pricePlus"]);
    return item.price() + plus * $gameSystem.expBoxCount();
  }
})(Nore || (Nore = {}));
