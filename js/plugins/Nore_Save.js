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
var Nore;
(function (Nore) {
  var Window_SavefileList2 = /** @class */ (function (_super) {
    __extends(Window_SavefileList2, _super);
    function Window_SavefileList2() {
      var _this = (_super !== null && _super.apply(this, arguments)) || this;
      _this._latestList = [];
      return _this;
    }
    Window_SavefileList2.prototype.setMode = function (mode, autosave) {
      this.makeLatestFileList();
      _super.prototype.setMode.call(this, mode, autosave);
    };
    Window_SavefileList2.prototype.makeLatestFileList = function () {
      this._latestList = [];
      var globalInfo = DataManager._globalInfo;
      if (!globalInfo) {
        return;
      }
      for (var i = 1; i < 100; i++) {
        var saveInfo = globalInfo[i];
        if (saveInfo) {
          this._latestList.push(saveInfo);
        }
      }
      this._latestList = this._latestList.sort(function (a, b) {
        return b.timestamp - a.timestamp;
      });
      //p(this._latestList)
    };
    Window_SavefileList2.prototype.maxCols = function () {
      return 4;
    };
    Window_SavefileList2.prototype.drawItem = function (index) {
      var savefileId = this.indexToSavefileId(index);
      var info = DataManager.savefileInfo(savefileId);
      var rect = this.itemRectWithPadding(index);
      this.resetTextColor();
      this.changePaintOpacity(this.isEnabled(savefileId));
      this.contents.fontSize = 20;
      var yy = rect.y;
      this.drawTitle(savefileId, rect.x, yy);
      this.changeTextColor(ColorManager.normalColor());
      if (info) {
        var lineHeight = this.lineHeight();
        this.drawNew(info, rect.x + 80, yy);
        this.drawStage(info, rect.x + 2, yy + lineHeight);
        this.drawDays(info, rect.x + 202, yy);
        this.drawMapName(info, rect.x + 112, yy + lineHeight);
        this.drawSp(info, rect.x + 102, yy + lineHeight * 2);
        this.drawTime(info, rect.x + 102, yy + lineHeight * 3);
        //this.drawContents(info, rect);
        this.drawPlaytime(info, rect.x + 4, yy + lineHeight * 2, rect.width);
      }
    };
    Window_SavefileList2.prototype.paint = function () {
      this._windowContentsSprite.removeChildren();
      _super.prototype.paint.call(this);
    };
    Window_SavefileList2.prototype.lineHeight = function () {
      return 28;
    };
    Window_SavefileList2.prototype.indexToSavefileId = function (index) {
      return index;
    };
    Window_SavefileList2.prototype.drawContents = function (info, rect) {
      var bottom = rect.y + rect.height;
      this.drawPartyCharacters(info, rect.x + 20, bottom - 8);
      var lineHeight = this.lineHeight();
      var y2 = bottom - lineHeight - 4;
      if (y2 >= lineHeight) {
      }
    };
    Window_SavefileList2.prototype.drawPartyCharacters = function (info, x, y) {
      /*if (info.fileList) {
                let characterX = x + 5;
                for (const data of info.fileList) {
                    //let pp = new Sprite_Player($gamePlayer)
                    this.drawCharacter(data, 0, characterX, y);
                }
            }*/
    };
    Window_SavefileList2.prototype.drawTitle = function (savefileId, x, y) {
      this.changeTextColor(ColorManager.systemColor());
      if (savefileId === 0) {
        this.drawText(TextManager._autosave, x, y, 180);
      } else {
        this.drawText(TextManager._file, x, y, 180);
        this.changeTextColor(ColorManager.crisisColor());
        this.drawText(
          savefileId,
          x,
          y,
          ConfigManager.language == "jp" ? 112 : 70,
          "right"
        );
      }
    };
    Window_SavefileList2.prototype.drawNew = function (info, x, y) {
      var index = this._latestList.indexOf(info);
      if (index < 0) {
        return;
      }
      if (index > 4) {
        return;
      }
      this.changeTextColor(ColorManager.textColor(17));
      this.drawText(
        TextManager.saveLatest.format(index + 1),
        x,
        y,
        130,
        "right"
      );
      this.changeTextColor(ColorManager.textColor(0));
    };
    Window_SavefileList2.prototype.drawStage = function (info, x, y) {
      var stageStr =
        ConfigManager.language == "jp"
          ? hankaku2Zenkaku(info.stage)
          : info.stage;
      var stage = TextManager.chapter.format(stageStr);
      if (info.stage == 0) {
        stage = TextManager.prologue;
      }
      this.drawStageImage(info, x, y);
      this.changeTextColor(ColorManager.textColor(14));
      this.drawText(stage, x, y, 100, "left");
      this.changeTextColor(ColorManager.normalColor());
      var xx = x + 100;
      var w = 90;
      /*if (info.night) {
                //this.changeTextColor(ColorManager.textColor(12));
    
                this.drawText(TextManager.night, xx, y, w, 'left');
            } else if (info.inDungeon) {
                //this.changeTextColor(ColorManager.textColor(3));
                this.drawText(TextManager.afternoon, xx, y, w, 'left');
            } else {
                this.drawText(TextManager.morning, xx, y, w, 'left');
            }
            */
      this.changeTextColor(ColorManager.normalColor());
    };
    Window_SavefileList2.prototype.drawStageImage = function (info, x, y) {
      var bitmap = ImageManager.loadSystem("stage");
      var xx = x + 0;
      var yy = y + 30;
      if (info.inChokyo) {
        this.contents.blt(bitmap, 108 * 2 + 10, 80, 92, 62, xx, yy);
        if (info.chokyoActorCos) {
          var c = new Nore.Game_DungeonCharacter(
            info.chokyoActorCos,
            xx + 60,
            yy + 80
          );
          var sprite = new Sprite_ActorCharacter(c, info.chokyoActorCos);
          this._windowContentsSprite.addChild(sprite);
          c.update();
          sprite.update();
        }
      } else if (this.isAgito(info.mapId)) {
        var index = info.night ? 1 : 0;
        this.contents.blt(bitmap, 108 * index + 1, 80, 92, 62, xx, yy);
      } else {
        this.contents.blt(bitmap, 108 * info.stage + 1, 0, 92, 62, xx, yy);
      }
    };
    Window_SavefileList2.prototype.isAgito = function (mapId) {
      switch (mapId) {
        case 8:
        case 36:
        case 210:
        case 248:
          return true;
      }
      return false;
    };
    Window_SavefileList2.prototype.getBaseTexture = function () {
      var baseTexture = PIXI.utils.BaseTextureCache["system/stage"];
      if (!baseTexture) {
        var bitmap = ImageManager.loadSystem("stage");
        if (!bitmap.isReady()) {
          return;
        }
        baseTexture = new PIXI.BaseTexture(bitmap._image);
        baseTexture.resource.url = "system/stage";
        PIXI.utils.BaseTextureCache["system/stage"] = baseTexture;
      }
      return baseTexture;
    };
    Window_SavefileList2.prototype.drawDays = function (info, x, y) {
      if (info.days > 0) {
        this.drawText(TextManager.day.format(info.days), x + 0, y, 84, "right");
      }
    };
    Window_SavefileList2.prototype.drawTime = function (info, x, y) {
      //this.drawText('LV ' + info.level, x - 70, y, 190, 'right');
      var time = new Date(info.timestamp);
      var mm = (time.getMonth() + 1).padZero(2);
      var d = time.getDate().padZero(2);
      var h = time.getHours().padZero(2);
      var m = time.getMinutes().padZero(2);
      var s = time.getSeconds().padZero(2);
      var str = "%1/%2/%3 %4:%5:%6".format(time.getFullYear(), mm, d, h, m, s);
      this.drawText(str, x - 152, y, 340, "right");
    };
    Window_SavefileList2.prototype.drawSp = function (info, x, y) {
      if (info.skillPoint) {
        var text = TextManager.spSave.format(info.skillPoint);
        this.drawText(text, x, y, 180, "left");
      }
    };
    Window_SavefileList2.prototype.drawMapName = function (info, x, y) {
      var mapInfo = $dataMapInfos[info.mapId];
      if (mapInfo) {
        var name_1;
        if (info.inDungeon) {
          name_1 = getDungeonName(info.stage);
        } else if (info.inChokyo) {
          name_1 = getChokyoName(info.chokyoActorId || 0);
        } else {
          name_1 = getMapName(mapInfo);
        }
        if (name_1.indexOf("<") > 0) {
          name_1 = name_1.substr(0, name_1.indexOf("<"));
        }
        this.drawText(name_1, x + 34, y, 145, "right");
      }
    };
    Window_SavefileList2.prototype.selectSavefile = function (savefileId) {
      var index = Math.max(0, this.savefileIdToIndex(savefileId));
      this.select(index);
      this.setTopRow(Math.floor(index / 4) - 2);
    };
    Window_SavefileList2.prototype.savefileIdToIndex = function (savefileId) {
      return savefileId;
    };
    return Window_SavefileList2;
  })(Window_SavefileList);
  Nore.Window_SavefileList2 = Window_SavefileList2;
  DataManager.maxSavefiles = function () {
    return 96;
  };
  Scene_File.prototype.createListWindow = function () {
    var rect = this.listWindowRect();
    this._listWindow = new Window_SavefileList2(rect);
    this._listWindow.setHandler("ok", this.onSavefileOk.bind(this));
    this._listWindow.setHandler("cancel", this.onCancel.bind(this));
    //this._listWindow.setHandler("change", this.onChange.bind(this));
    this._listWindow.setMode(this.mode(), this.needsAutosave());
    this._listWindow.selectSavefile(this.firstSavefileId());
    //this._listWindow.refresh();
    this.addWindow(this._listWindow);
  };
  Scene_File.prototype.onCancel = function () {
    this.popScene();
  };
  var _DataManager_makeSavefileInfo = DataManager.makeSavefileInfo;
  DataManager.makeSavefileInfo = function () {
    var info = _DataManager_makeSavefileInfo.call(this);
    info.days = $gameSystem.day();
    info.stage = $gameSystem.stageId();
    if (info.days == 1) {
      info.stage = 0;
    }
    info.mapId = $gameMap.mapId();
    info.night = $gameSystem.isNight();
    info.inDungeon = $gameParty.inDungeon();
    info.skillPoint = $gameParty.totalSkillPoint();
    info.inChokyo = $gameSystem.inChokyo();
    info.chokyoActorId = $gameSystem.chokyoActorId();
    if ($gameSystem.inChokyo() && $gameSystem.chokyoActorId() > 0) {
      info.chokyoActorCos = new CostumeSaver($gameSystem.chokyoActorId());
    }
    //info.level = $gameActors.mainActor()._level;
    return info;
  };
  DataManager.removeInvalidGlobalInfo = function () {
    var globalInfo = this._globalInfo;
    for (
      var _i = 0, globalInfo_1 = globalInfo;
      _i < globalInfo_1.length;
      _i++
    ) {
      var info = globalInfo_1[_i];
      var savefileId = globalInfo.indexOf(info);
      if (savefileId >= 90) {
        return;
      }
      if (!this.savefileExists(savefileId)) {
        delete globalInfo[savefileId];
      }
    }
  };
  DataManager.latestSavefileId = function () {
    var globalInfo = this._globalInfo;
    var validInfo = globalInfo.slice(1).filter(function (x) {
      return x;
    });
    var list = [];
    for (var _i = 0, validInfo_1 = validInfo; _i < validInfo_1.length; _i++) {
      var x = validInfo_1[_i];
      if (isNaN(x.timestamp)) {
        continue;
      }
      list.push(x);
    }
    var latest = Math.max.apply(
      Math,
      list.map(function (x) {
        return x.timestamp;
      })
    );
    var index = globalInfo.findIndex(function (x) {
      return x && x.timestamp === latest;
    });
    return index > 0 ? index : 0;
  };
  Scene_Save.prototype.helpWindowText = function () {
    return TextManager._saveMessage;
  };
  Scene_Load.prototype.helpWindowText = function () {
    return TextManager._loadMessage;
  };
  var GAME_CLEAR_FLAG = 214;
  function isGameClearFlag() {
    var globalInfo = DataManager._globalInfo;
    if (!globalInfo) {
      return false;
    }
    var vals = globalInfo[99];
    if (!vals) {
      return false;
    }
    return vals[GAME_CLEAR_FLAG];
  }
  Nore.isGameClearFlag = isGameClearFlag;
})(Nore || (Nore = {}));
