/*:ja
 * @target MZ
 * @author ル
 *
 * @command MakeDungeonInfo
 * @text ダンジョンの情報を作成します
 *
 * @command ShuffleNextFloor
 * @text 次の部屋を決定します
 * @des 次の部屋を決定します
 *
 * @command SetFloorType
 * @text 部屋のタイプを設定します
 * @arg floorType
 * @type number
 * @desc 0:お金 1:装備 2:回復 3:セーブ 4:エリート 5:牢獄 6:ボス 7:エロ
 *
 * @command ReleasePrisoner
 * @text 捕まった仲間を解放します
 * @des 捕まった仲間を解放します
 *
 * @command ReleaseAllPrisoner
 * @text 捕まった全ての仲間を解放します
 * @des 捕まった全ての仲間を解放します
 */
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
var FloorType;
(function (FloorType) {
  FloorType[(FloorType["BLANK"] = -1)] = "BLANK";
  FloorType[(FloorType["MONEY"] = 0)] = "MONEY";
  FloorType[(FloorType["EQUIP"] = 1)] = "EQUIP";
  FloorType[(FloorType["RECOVER"] = 2)] = "RECOVER";
  FloorType[(FloorType["SAVE_POINT"] = 3)] = "SAVE_POINT";
  FloorType[(FloorType["ELITE"] = 4)] = "ELITE";
  FloorType[(FloorType["PRISON"] = 5)] = "PRISON";
  FloorType[(FloorType["BOSS"] = 6)] = "BOSS";
  FloorType[(FloorType["ERO"] = 7)] = "ERO";
  FloorType[(FloorType["NONE"] = 9)] = "NONE";
})(FloorType || (FloorType = {}));
var Nore;
(function (Nore) {
  var DUNGEON_INFO_HEIGHT = 54;
  var pluginName = "Nore_Dungeon";
  var SWITCH_START = 301;
  PluginManager.registerCommand(
    pluginName,
    "ShuffleNextFloor",
    function (args) {
      setSwitchOff();
      var floorCount = $gameSystem.floorCount() + 1;
      var switchId = 301;
      var dungeonInfo = $gameSystem.getDungeonInfo();
      var prison = dungeonInfo.getPrison(floorCount);
      if (prison) {
        p("setPrison");
        $gameSwitches.setValue(switchId + FloorType.PRISON, true);
        return;
      }
      var floorTypeList = new Dungeon().shuffle();
      p(floorTypeList);
      $gameSwitches.setValue(switchId + 19, true);
      $gameSwitches.setValue(switchId + 29, true);
      for (var i = 0; i < floorTypeList.length; i++) {
        var floorType = floorTypeList[i];
        $gameSwitches.setValue(switchId + floorType, true);
        $gameSwitches.setValue(switchId + 9, false);
        switchId += 10;
      }
    }
  );
  function setSwitchOff() {
    var switchId = 301;
    for (var i = switchId; i <= 340; i++) {
      $gameSwitches.setValue(i, false);
    }
  }
  PluginManager.registerCommand(pluginName, "MakeDungeonInfo", function (args) {
    var info = new DungeonInfo();
    $gameSystem.setDungeonInfo(info);
  });
  PluginManager.registerCommand(pluginName, "SetFloorType", function (args) {
    var floorType = Math.trunc(args.floorType);
    var floorCount = $gameSystem.floorCount();
    $gameSystem.getDungeonInfo().setFloorType(floorCount, floorType);
  });
  PluginManager.registerCommand(pluginName, "ReleasePrisoner", function (args) {
    $gameSystem.getDungeonInfo().releasePrisoner();
  });
  var Dungeon = /** @class */ (function () {
    function Dungeon() {
      this._floorList = [];
    }
    Dungeon.prototype.getStage = function () {
      return $gameVariables.value(2);
    };
    Dungeon.prototype.getFloor = function () {
      return $gameVariables.value(3);
    };
    Dungeon.prototype.shuffle = function () {
      var dungeonInfo = $gameSystem.getDungeonInfo();
      //p('shuffle:' + this.getFloor())
      var nextFloor = this.getFloor() + 1;
      if (dungeonInfo.isBoss(nextFloor)) {
        this._floorList.push(FloorType.BOSS);
        //this._floorList.push(FloorType.NONE);
        return this._floorList;
      }
      if (dungeonInfo.isSavePoint(nextFloor)) {
        this._floorList.push(FloorType.SAVE_POINT);
        //this._floorList.push(FloorType.NONE);
        return this._floorList;
      }
      if (dungeonInfo.isElite(nextFloor)) {
        this._floorList.push(FloorType.ELITE);
        //this._floorList.push(FloorType.NONE);
        return this._floorList;
      }
      if (dungeonInfo.isPrison(nextFloor)) {
        this._floorList.push(FloorType.PRISON);
        //this._floorList.push(FloorType.NONE);
        return this._floorList;
      }
      var candidates = [
        FloorType.MONEY,
        FloorType.MONEY,
        FloorType.EQUIP,
        FloorType.EQUIP,
        FloorType.RECOVER,
      ];
      if (nextFloor % 2 == 0) {
        candidates.push(FloorType.ERO);
      }
      var list = Nore.shuffle(candidates);
      /*if (this.getFloor() == 6) {
                if ($gameParty.hasCaptiveActor()) {
                    candidates.push(FloorType.PRISON);
                }
            }*/
      for (var i = 0; i < 2; i++) {
        this._floorList.push(candidates.pop());
      }
      if (this._floorList.contains(FloorType.MONEY)) {
        if (!this._floorList.contains(FloorType.EQUIP)) {
          this._floorList.push(FloorType.EQUIP);
        }
      } else {
        this._floorList.push(FloorType.MONEY);
      }
      return this._floorList;
    };
    return Dungeon;
  })();
  var _Scene_Map_updateMain = Scene_Map.prototype.updateMain;
  Scene_Map.prototype.updateMain = function () {
    _Scene_Map_updateMain.call(this);
    if (this.isShowDungeonInfo()) {
      this.showDungeonInfo();
    } else {
      this.hideDungeonInfo();
    }
    if (this.isShowPlayerInfo()) {
      this.showPlayerInfo();
    } else {
      this.hidePlayerInfo();
    }
  };
  var _Scene_Map_createSpriteset = Scene_Map.prototype.createSpriteset;
  Scene_Map.prototype.createSpriteset = function () {
    _Scene_Map_createSpriteset.call(this);
    var black = new Sprite_Black();
    this._blackSprite = black;
    this._spriteset.addChild(black);
  };
  var Sprite_Black = /** @class */ (function (_super) {
    __extends(Sprite_Black, _super);
    function Sprite_Black() {
      var _this = _super.call(this) || this;
      _this.refresh();
      _this.update();
      return _this;
    }
    Sprite_Black.prototype.refresh = function () {
      var g = new PIXI.Graphics();
      g.beginFill(0x333333);
      g.drawRect(0, 0, Graphics.width, DUNGEON_INFO_HEIGHT);
      g.endFill();
      this.addChild(g);
    };
    Sprite_Black.prototype.update = function () {
      _super.prototype.update.call(this);
      this.visible = $gameParty.inDungeon() && $gameSystem.day() > 1;
    };
    return Sprite_Black;
  })(Sprite);
  Scene_Map.prototype.isShowDungeonInfo = function () {
    if (!$gameParty.inDungeon()) {
      // ダンジョン内でない
      return false;
    }
    if ($gameSystem.day() == 0) {
      return false;
    }
    if ($gameSwitches.value(460)) {
      // 最終決戦前
      return false;
    }
    if (!$gameSwitches.value(2)) {
      // チュートリアル終了してない
      return false;
    }
    if ($gameMap.isEventRunning()) {
      //return false;
    }
    if ($gameMap.mapId() == 8) {
      return false;
    }
    return true;
  };
  Scene_Map.prototype.isShowPlayerInfo = function () {
    if (!$gameParty.inDungeon()) {
      // ダンジョン内でない
      return false;
    }
    if ($gameMap.isEventRunning()) {
      // return false;
    }
    return true;
  };
  Scene_Map.prototype.terminate = function () {
    Scene_Message.prototype.terminate.call(this);
    if (!SceneManager.isNextScene(Nore.Scene_Battle2)) {
      this._spriteset.update();
      this._mapNameWindow.hide();
      if (this._dungeonWindow) {
        this._dungeonWindow.hide();
      }
      if (this._ougiInfo) {
        this._ougiInfo.hide();
      }
      if (this._blackSprite) {
        this._blackSprite.visible = false;
      }
      this.hideMenuButton();
      SceneManager.snapForBackground();
    }
    $gameScreen.clearZoom();
  };
  Scene_Map.prototype.showDungeonInfo = function () {
    if (!this._dungeonWindow) {
      this._dungeonWindow = new Window_Dungeon(
        new Rectangle(0, 0, Graphics.width, DUNGEON_INFO_HEIGHT)
      );
      this._spriteset.addChild(this._dungeonWindow);
    }
    this._dungeonWindow.show();
  };
  Scene_Map.prototype.hideDungeonInfo = function () {
    if (this._dungeonWindow) {
      this._dungeonWindow.hide();
    }
  };
  Scene_Map.prototype.showPlayerInfo = function () {
    if (!this._ougiInfo) {
      this._ougiInfo = new Nore.Sprite_Ougi();
      this._spriteset.addChild(this._ougiInfo);
      //this._playerInfo = new Window_Player(new Rectangle(510, 0, 490, 140));
      //this._spriteset.addChild(this._playerInfo);
    }
    //this._ougiInfo.show();
  };
  Scene_Map.prototype.hidePlayerInfo = function () {
    if (this._ougiInfo) {
      this._ougiInfo.hide();
    }
  };
  var FLOOR_WIDTH = 24;
  var FLOOR_INTERVAL = 26;
  var Window_Dungeon = /** @class */ (function (_super) {
    __extends(Window_Dungeon, _super);
    function Window_Dungeon(r) {
      var _this = _super.call(this, r) || this;
      _this.padding = 0;
      _this.margin = 0;
      _this.createContents();
      _this.frameVisible = false;
      return _this;
    }
    Window_Dungeon.prototype.update = function () {
      _super.prototype.update.call(this);
      if (this.isChanged()) {
        this.refresh();
      }
    };
    Window_Dungeon.prototype.isChanged = function () {
      if (this._info != $gameSystem.getDungeonInfo()) {
        this._info = $gameSystem.getDungeonInfo();
        return true;
      }
      if (this._lastFloor != $gameSystem.floorCount()) {
        return true;
      }
      if (this._info.isDirty()) {
        this._info.clearDirty();
        return true;
      }
      return false;
    };
    Window_Dungeon.prototype.refresh = function () {
      if (!this._info) {
        return;
      }
      this.contents.clear();
      this._windowContentsSprite.removeChildren();
      this.drawMembers(540, 10);
      this.drawItems(380, 10);
      //this.drawExp();
      this.drawDungeon();
      this.drawGold();
      this.drawCrystal();
      //this.drawLevelUp();
      this.drawFloors();
    };
    Window_Dungeon.prototype.drawDungeon = function () {
      this.contents.fontSize = 22;
      this.changeTextColor(ColorManager.normalColor());
      this.drawText(getDungeonName($gameSystem.stageId()), 12, 8, 150);
    };
    Window_Dungeon.prototype.drawExp = function () {
      this.contents.fontSize = 24;
      this.changeTextColor(ColorManager.systemColor());
      this.drawText(TextManager.partyExp, 16, 8, 80);
      this.changeTextColor(ColorManager.normalColor());
      this.drawText($gameParty.partyExp(), 104, 8, 110, "left");
    };
    Window_Dungeon.prototype.drawGold = function () {
      this.contents.fontSize = 24;
      var xx = 174;
      this.drawText($gameParty.gold(), xx + 36, 8, 110, "left");
      this.drawGoldImg(xx, 18);
    };
    Window_Dungeon.prototype.drawCrystal = function () {
      var xx = 264;
      this.contents.fontSize = 24;
      this.drawText($gameParty.crystal(), xx + 36, 8, 110, "left");
      this.drawIcon(873, xx, 8);
    };
    /*drawLevelUp() {
            if (! $gameParty.canLevelUp()) {
                return;
            }
            this.changeTextColor(ColorManager.crisisColor());
            this.contents.fontSize = 22;
            this.drawText('LVアップ可能なキャラがいます', 136, 8, 300);
    
        }*/
    Window_Dungeon.prototype.drawFloors = function () {
      this._lastFloor = $gameSystem.floorCount();
      var x = 840;
      if ($gameParty.battleMembers().length == 6) {
        x += 60;
      }
      var y = 36;
      for (var i = 0; i < this._info.maxFloor(); i++) {
        this.drawBlankFloor(i, x, y);
        this.drawCurrentFloor(i, x, y);
        //this.drawPastFloor(i, x, y);
        this.drawPrisonFloor(i, x, y);
        this.drawSaveFloor(i, x, y);
        this.drawEliteFloor(i, x, y);
        this.drawFloorItem(i, x, y);
      }
    };
    Window_Dungeon.prototype.drawPastFloor = function (floor, x, y) {
      if (floor < this._lastFloor) {
        var sprite = this.getSprite(
          FLOOR_WIDTH * 1,
          0,
          FLOOR_WIDTH,
          FLOOR_WIDTH
        );
        sprite.x = x + FLOOR_INTERVAL * floor;
        sprite.y = y;
        this._windowContentsSprite.addChild(sprite);
      }
    };
    Window_Dungeon.prototype.drawCurrentFloor = function (floor, x, y) {
      if (floor == this._lastFloor) {
        var sprite = this.getSprite(
          FLOOR_WIDTH * 2,
          0,
          FLOOR_WIDTH,
          FLOOR_WIDTH
        );
        sprite.x = x + FLOOR_INTERVAL * floor;
        sprite.y = y;
        this._windowContentsSprite.addChild(sprite);
      }
    };
    Window_Dungeon.prototype.drawBlankFloor = function (floor, x, y) {
      if (floor != this._lastFloor) {
        var sprite = this.getSprite(
          FLOOR_WIDTH * 0,
          0,
          FLOOR_WIDTH,
          FLOOR_WIDTH
        );
        sprite.x = x + FLOOR_INTERVAL * floor;
        sprite.y = y;
        this._windowContentsSprite.addChild(sprite);
      }
    };
    Window_Dungeon.prototype.drawPrisonFloor = function (floor, x, y) {
      if (!this._info.isPrison(floor)) {
        return;
      }
      var prison = this._info.getPrison(floor);
      if (!prison.isReleased()) {
        //this.drawCharacterImage(prison.actorId(), x + FLOOR_INTERVAL * floor, y);
      }
      var sprite = this.getSprite(FLOOR_WIDTH * 3, 0, FLOOR_WIDTH, FLOOR_WIDTH);
      sprite.x = x + FLOOR_INTERVAL * (floor - 1);
      sprite.y = y;
      this._windowContentsSprite.addChild(sprite);
    };
    Window_Dungeon.prototype.drawSaveFloor = function (floor, x, y) {
      if (!this._info.isSavePoint(floor)) {
        return;
      }
      var sprite = this.getSprite(
        0,
        FLOOR_WIDTH,
        FLOOR_WIDTH,
        FLOOR_WIDTH + 20
      );
      sprite.x = x + FLOOR_INTERVAL * floor;
      sprite.y = y - 20;
      this._windowContentsSprite.addChild(sprite);
    };
    Window_Dungeon.prototype.drawEliteFloor = function (floor, x, y) {
      if (!this._info.isElite(floor)) {
        return;
      }
      var sprite = this.getSprite(FLOOR_WIDTH * 5, 0, FLOOR_WIDTH, FLOOR_WIDTH);
      sprite.x = x + FLOOR_INTERVAL * floor;
      sprite.y = y;
      this._windowContentsSprite.addChild(sprite);
    };
    Window_Dungeon.prototype.drawFloorItem = function (floor, x, y) {
      var spriteIndex = -1;
      switch (this._info.getFloorType(floor)) {
        case FloorType.RECOVER:
          spriteIndex = 8;
          break;
        case FloorType.MONEY:
          spriteIndex = 4;
          break;
        case FloorType.EQUIP:
          spriteIndex = 7;
          break;
        case FloorType.BOSS:
          spriteIndex = 6;
          break;
        //case FloorType.ELITE: spriteIndex = 5; break;
        case FloorType.ERO:
          spriteIndex = 9;
          break;
      }
      if (spriteIndex < 0) {
        return;
      }
      var sprite = this.getSprite(
        FLOOR_WIDTH * spriteIndex,
        0,
        FLOOR_WIDTH,
        FLOOR_WIDTH
      );
      sprite.x = x + FLOOR_INTERVAL * floor;
      sprite.y = y;
      this._windowContentsSprite.addChild(sprite);
    };
    Window_Dungeon.prototype.getSprite = function (sx, sy, sw, sh) {
      var baseTexture = Nore.getSystemBaseTexture("michi");
      var rect = new Rectangle(sx, sy, sw, sh);
      var texture = new PIXI.Texture(baseTexture, rect);
      var sprite = new PIXI.Sprite(texture);
      return sprite;
    };
    Window_Dungeon.prototype.drawMembers = function (x, y) {
      var index = 0;
      var interval = 54;
      for (var _i = 0, _a = $gameParty.battleMembers(); _i < _a.length; _i++) {
        var m = _a[_i];
        this.drawMember(index * interval + x, y, m);
        index++;
      }
    };
    Window_Dungeon.prototype.drawMember = function (x, y, actor) {
      //this.drawLv(actor, x + 5, y - 10)
      this.drawCharacterImage(actor, x + 50, y + 40);
      this.drawHp(actor, x + 4, y + 34);
      //this.drawLvUp(actor, x + 4, y + 2)
    };
    Window_Dungeon.prototype.drawLvUp = function (actor, x, y) {
      if (!actor.canLevelUp($gameParty.partyExp())) {
        return;
      }
      var sprite = this.getSprite(36, 36, 72, 36);
      sprite.x = x;
      sprite.y = y;
      this._windowContentsSprite.addChild(sprite);
    };
    Window_Dungeon.prototype.drawLv = function (actor, x, y) {
      this.contents.fontSize = 18;
      this.drawText("LV " + actor.level, x, y, 70);
    };
    Window_Dungeon.prototype.drawCharacterImage = function (actor, x, y) {
      var cos = new CostumeSaver(actor.actorId());
      var c = new Nore.Game_DungeonCharacter(cos, x - 13, y);
      var sprite = new Sprite_Prisoner(c, cos);
      sprite.update();
      this._windowContentsSprite.addChild(sprite);
    };
    Window_Dungeon.prototype.drawHp = function (actor, x, y) {
      var ww = 40;
      var hh = 6;
      var w = ww * actor.hpRate();
      var color1 = ColorManager.hpGaugeColor1();
      var color2 = ColorManager.hpGaugeColor2();
      this.contents.fillRect(x - 1, y - 1, ww + 2, hh + 2, "#000000");
      this.contents.fillRect(x, y, ww, hh, "#777777");
      this.contents.gradientFillRect(x, y, w, hh, color1, color2);
    };
    Window_Dungeon.prototype.drawItems = function (x, y) {
      var index = 0;
      var interval = 38;
      var items = $gameParty.battleItems();
      for (var i = 0; i < $gameParty.battleItemMax(); i++) {
        this.contents.fillRect(x + interval * index, y, 32, 32, "#000000");
        if (items[i]) {
          this.drawIcon(items[i].iconIndex, x + interval * index, y);
        }
        index++;
      }
    };
    return Window_Dungeon;
  })(Window_Base);
  var Sprite_DungeonCharacter = /** @class */ (function (_super) {
    __extends(Sprite_DungeonCharacter, _super);
    function Sprite_DungeonCharacter() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Sprite_DungeonCharacter.prototype.updateCharacterFrame = function () {
      var pw = this.patternWidth();
      var ph = this.patternHeight();
      var sx = (this.characterBlockX() + this.characterPatternX()) * pw;
      var sy = (this.characterBlockY() + this.characterPatternY()) * ph;
      this.updateHalfBodySprites();
      if (this._bushDepth > 0) {
        var d = this._bushDepth;
        this._upperBody.setFrame(sx, sy, pw, ph - d);
        this._lowerBody.setFrame(sx, sy + ph - d, pw, d);
        this.setFrame(sx, sy, 0, ph - 30);
      } else {
        this.setFrame(sx, sy, pw, ph - 30);
      }
    };
    return Sprite_DungeonCharacter;
  })(Sprite_Character);
  Nore.Sprite_DungeonCharacter = Sprite_DungeonCharacter;
  var Game_DungeonCharacter = /** @class */ (function (_super) {
    __extends(Game_DungeonCharacter, _super);
    function Game_DungeonCharacter(cos, x, y) {
      var _this = _super.call(this) || this;
      _this._monotone = false;
      _this._stepAnime = false;
      _this._cos = cos;
      _this._x = x;
      _this._y = y;
      _this._baseY = y;
      _this.refresh();
      return _this;
    }
    Game_DungeonCharacter.prototype.refresh = function () {
      //const characterName = this.actor().characterName();
      //const characterIndex = this.actor().characterIndex();
      //this.setImage(characterName, characterIndex);
    };
    Game_DungeonCharacter.prototype.actor = function () {
      return $gameActors.actor(this._cos.actorId());
    };
    Game_DungeonCharacter.prototype.screenX = function () {
      return this._x;
    };
    Game_DungeonCharacter.prototype.screenY = function () {
      return this._y;
    };
    Game_DungeonCharacter.prototype.setMonoTone = function (b) {
      this._monotone = b;
    };
    Game_DungeonCharacter.prototype.isMonoTone = function () {
      return this._monotone;
    };
    Game_DungeonCharacter.prototype.setStepAnime = function (stepAnime) {
      //this._stepAnime = stepAnime;
      return;
      if (stepAnime) {
        this._y = this._baseY - 30;
      } else {
        this._y = this._baseY;
      }
    };
    Game_DungeonCharacter.prototype.hasStepAnime = function () {
      return false;
      //return this._stepAnime;
    };
    Game_DungeonCharacter.prototype.animationWait = function () {
      return 15;
    };
    Game_DungeonCharacter.prototype.hasWalkAnime = function () {
      return false;
    };
    Game_DungeonCharacter.prototype.setEquip = function (e) {
      var actor = $gameActors.actor(this._cos.actorId());
      if (actor.canEquipType(e.item()) && actor.canEquipCurced(e)) {
        //this.setOpacity(255);
        this.setMonoTone(false);
      } else {
        this.setMonoTone(true);
        //this.setOpacity(100);
      }
    };
    return Game_DungeonCharacter;
  })(Game_Character);
  Nore.Game_DungeonCharacter = Game_DungeonCharacter;
})(Nore || (Nore = {}));
var Prison = /** @class */ (function () {
  function Prison(actorId, floor) {
    this._actorId = actorId;
    this._floor = floor;
  }
  Prison.prototype.actorId = function () {
    return this._actorId;
  };
  Prison.prototype.floor = function () {
    return this._floor;
  };
  Prison.prototype.release = function () {
    this._release = true;
  };
  Prison.prototype.isReleased = function () {
    return this._release;
  };
  return Prison;
})();
var DungeonInfo = /** @class */ (function () {
  function DungeonInfo() {
    this._floorList = [];
    this._battleTroopMap = {};
    this._crystal = 0;
    this._skillPoint = 0;
    this._capturedActorList = [];
    this.makeFloorList();
    this.makeSavePoint();
    this.makeElite();
    this.makePrison();
  }
  DungeonInfo.prototype.makeSavePoint = function () {
    switch (this.stageId()) {
      case 1:
        this._savePoint1 = 3;
        break;
      case 2:
        this._savePoint1 = 4;
        break;
      default:
        this._savePoint1 = 4;
        break;
    }
  };
  DungeonInfo.prototype.makeElite = function () {
    switch (this.stageId()) {
      case 1:
        this._elite = 4;
        this._elite2 = 6;
        break;
      case 2:
        this._elite = 6;
        break;
      case 6:
        this._elite = 6;
        break;
      case 7:
        this._elite = 6;
        break;
      default:
        this._elite = 6;
        break;
    }
  };
  DungeonInfo.prototype.makeFloorList = function () {
    for (var i = 0; i < this.maxFloor(); i++) {
      this._floorList.push(FloorType.BLANK);
    }
    this._floorList[0] = this.randomFloor();
    this._floorList[this._floorList.length - 1] = FloorType.BOSS;
  };
  DungeonInfo.prototype.randomFloor = function () {
    switch (Math.randomInt(2)) {
      case 0:
        return FloorType.EQUIP;
      case 1:
        return FloorType.MONEY;
    }
  };
  DungeonInfo.prototype.onCrystal = function (n) {
    this._crystal += n;
    this._dirty = true;
  };
  DungeonInfo.prototype.onSkillPoint = function (n) {
    this._skillPoint += n;
  };
  DungeonInfo.prototype.crystal = function () {
    return this._crystal;
  };
  DungeonInfo.prototype.skillPoint = function () {
    return this._skillPoint;
  };
  DungeonInfo.prototype.capturedActorList = function () {
    var result = [];
    for (var _i = 0, _a = this._capturedActorList; _i < _a.length; _i++) {
      var actorId = _a[_i];
      var actor = $gameActors.actor(actorId);
      result.push(actor);
    }
    return result;
  };
  DungeonInfo.prototype.addCapturedActor = function (actorId) {
    this._capturedActorList.push(actorId);
  };
  DungeonInfo.prototype.maxFloor = function () {
    switch (this.stageId()) {
      case 1:
        return 8;
      case 2:
        return 9;
      case 3:
        return 9;
      case 6:
        return 9;
      case 7:
        return 9;
      case 8:
        return 9;
      default:
        return 9;
    }
  };
  DungeonInfo.prototype.getPrisonList = function () {
    return this._prisonList;
  };
  DungeonInfo.prototype.makePrison = function () {
    this._prisonList = [];
    return;
    if ($gameSystem.day() == 3) {
      // チュートリアル中
      return;
    }
    var list = Nore.shuffle($gameParty.getPrisonerList());
    var prisonFloorList = Nore.shuffle(this.getPrisonFloorList());
    for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
      var actor = list_1[_i];
      var floor = prisonFloorList.pop();
      var prison = new Prison(actor.actorId(), floor);
      this._prisonList.push(prison);
      break;
    }
  };
  DungeonInfo.prototype.getPrisonFloorList = function () {
    if (this.stageId() == 1) {
      return [3, 4];
    }
    return [3, 6, 9];
  };
  DungeonInfo.prototype.stageId = function () {
    return $gameSystem.stageId();
  };
  DungeonInfo.prototype.isSavePoint = function (floor) {
    if (this._savePoint1 == floor) {
      return true;
    }
    if (this._savePoint1 == floor) {
      return true;
    }
    return false;
  };
  DungeonInfo.prototype.isElite = function (floor) {
    if (this._elite == floor) {
      return true;
    }
    if (this._elite2 == floor) {
      return true;
    }
    return false;
  };
  DungeonInfo.prototype.isBoss = function (floor) {
    if (this._floorList[floor] == FloorType.BOSS) {
      return true;
    }
    return false;
  };
  DungeonInfo.prototype.getPrison = function (floor) {
    for (var _i = 0, _a = this._prisonList; _i < _a.length; _i++) {
      var prison = _a[_i];
      if (prison.floor() == floor) {
        return prison;
      }
    }
    return null;
  };
  DungeonInfo.prototype.isPrison = function (floor) {
    return this.getPrison(floor) != null;
  };
  DungeonInfo.prototype.getFloorType = function (floor) {
    return this._floorList[floor];
  };
  DungeonInfo.prototype.setFloorType = function (floor, type) {
    this._floorList[floor] = type;
  };
  DungeonInfo.prototype.releasePrisoner = function () {
    var prison = this.getPrison($gameSystem.floorCount());
    if (!prison) {
      console.error("仲間が捕まっていません");
      return;
    }
    prison.release();
    var actorId = prison.actorId();
    var name = $gameActors.actor(actorId).name();
    $gameVariables.setValue(20, name);
    this.setDirty();
  };
  DungeonInfo.prototype.isDirty = function () {
    return this._dirty;
  };
  DungeonInfo.prototype.setDirty = function () {
    this._dirty = true;
  };
  DungeonInfo.prototype.clearDirty = function () {
    this._dirty = false;
  };
  DungeonInfo.prototype.calcTreasureGold = function () {
    var base = this.baseGold();
    var random = Math.random() / 10;
    if (Math.randomInt(2) == 0) {
      random *= -1;
    }
    return Math.round(base * (1 + random));
  };
  DungeonInfo.prototype.baseGold = function () {
    switch ($gameSystem.floorCount()) {
      case 0:
        return 60;
      case 1:
        return 65;
      case 2:
        return 70;
      case 3:
        return 75;
      case 4:
        return 80;
      case 5:
        return 85;
      case 6:
        return 90;
      case 7:
        return 95;
      case 8:
        return 100;
      default:
        return 100;
    }
  };
  DungeonInfo.prototype.onBattle = function (troopId) {
    this._battleTroopMap[troopId] = true;
  };
  DungeonInfo.prototype.isEnabledTroop = function (troopId) {
    return this._battleTroopMap[troopId] != true;
  };
  return DungeonInfo;
})();
