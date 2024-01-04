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
 * @command nextStage
 * @text 次のステージ
 * @des 次のステージ
 *
 * @command increaseTryCount
 * @text 挑戦回数増加
 * @des 挑戦回数増加
 */
var Difficulty;
(function (Difficulty) {
  Difficulty[(Difficulty["NORMAL"] = 0)] = "NORMAL";
  Difficulty[(Difficulty["VERY_EASY"] = 1)] = "VERY_EASY";
  Difficulty[(Difficulty["EASY"] = 2)] = "EASY";
  Difficulty[(Difficulty["HARD"] = 3)] = "HARD";
  Difficulty[(Difficulty["DUNGEON_SKIP"] = 4)] = "DUNGEON_SKIP";
})(Difficulty || (Difficulty = {}));
var Game_Record = /** @class */ (function () {
  function Game_Record(stage, day, time, difficulty) {
    this._tryCount = 0;
    this._clearMembers = [];
    this._endTime = 0;
    this._stage = stage;
    this._startDay = day;
    this._startTime = time;
    this._difficulty = difficulty;
  }
  Game_Record.prototype.stage = function () {
    return this._stage;
  };
  Game_Record.prototype.setEndDay = function (day) {
    this._endDay = day;
  };
  Game_Record.prototype.increaseTryCount = function () {
    this._tryCount++;
  };
  Game_Record.prototype.tryCount = function () {
    return this._tryCount;
  };
  Game_Record.prototype.day = function () {
    if (this._endDay) {
      return this._endDay - this._startDay;
    } else {
      return $gameSystem.realDay() - this._startDay;
    }
  };
  Game_Record.prototype.onClear = function () {
    for (var _i = 0, _a = $gameParty.battleMembers(); _i < _a.length; _i++) {
      var a = _a[_i];
      this._clearMembers.push(new CostumeSaver(a.actorId()));
    }
  };
  Game_Record.prototype.setClearMembers = function (members) {
    this._clearMembers = [];
    for (var _i = 0, members_1 = members; _i < members_1.length; _i++) {
      var a = members_1[_i];
      this._clearMembers.push(new CostumeSaver(a.actorId()));
    }
  };
  Game_Record.prototype.clearMembers = function () {
    return this._clearMembers;
  };
  Game_Record.prototype.setEndTime = function (time) {
    this._endTime = time;
  };
  Game_Record.prototype.playtimeText = function () {
    var hour = Math.floor(this.playtime() / 60 / 60);
    var min = Math.floor(this.playtime() / 60) % 60;
    var sec = this.playtime() % 60;
    return hour.padZero(2) + ":" + min.padZero(2) + ":" + sec.padZero(2);
  };
  Game_Record.prototype.playtime = function () {
    if (this._endTime > 0) {
      return this._endTime - this._startTime;
    } else {
      return $gameSystem.playtime() - this._startTime;
    }
  };
  Game_Record.prototype.difficulty = function () {
    return this._difficulty;
  };
  Game_Record.prototype.updateDifficulty = function () {
    if (this._tryCount == 0) {
      this._difficulty = $gameSystem.difficulty();
    } else {
      /*if ($gameSystem.difficulty() == Difficulty.HARD) {
                // 難しい設定は、出撃前まで
                return;
            }*/
      this._difficulty = $gameSystem.difficulty();
    }
  };
  return Game_Record;
})();
var Nore;
(function (Nore) {
  var pluginName = "Nore_Record";
  PluginManager.registerCommand(pluginName, "nextStage", function (args) {
    $gameSystem.nextStage();
  });
  PluginManager.registerCommand(
    pluginName,
    "increaseTryCount",
    function (args) {
      var record = $gameSystem.lastRecord();
      record.increaseTryCount();
    }
  );
  var Scene_Record = /** @class */ (function (_super) {
    __extends(Scene_Record, _super);
    function Scene_Record() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Scene_Record.prototype.create = function () {
      _super.prototype.create.call(this);
      this.createRecordWindow();
    };
    Scene_Record.prototype.createRecordWindow = function () {
      var x = 50;
      var r = new Rectangle(x, 50, Graphics.width - x * 2, 700);
      this._recordWindow = new Window_Record(r);
      this.addChild(this._recordWindow);
      this._recordWindow.refresh();
      this._recordWindow.activate();
      this._recordWindow.setHandler("cancel", this.popScene.bind(this));
    };
    return Scene_Record;
  })(Scene_MenuBase);
  Nore.Scene_Record = Scene_Record;
  var Window_Record = /** @class */ (function (_super) {
    __extends(Window_Record, _super);
    function Window_Record() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Window_Record.prototype.refresh = function () {
      this.initRecord();
      _super.prototype.refresh.call(this);
      this.drawTitle();
    };
    Window_Record.prototype.initRecord = function () {
      this._recordList = [];
      for (var _i = 0, _a = $gameSystem.recordList(); _i < _a.length; _i++) {
        var r = _a[_i];
        if (r.day() == 0) {
          continue;
        }
        this._recordList.push(r);
      }
    };
    Window_Record.prototype.maxCols = function () {
      return 1;
    };
    Window_Record.prototype.maxItems = function () {
      return this._recordList.length;
    };
    Window_Record.prototype.drawTitle = function () {
      var y = 10;
      this.drawText(TextManager.dungeonName, 20, y, 150);
      this.drawText(TextManager.clearMember, 290, y, 150);
      //this.drawText(TextManager.tryCount, 480, y, 100);
      this.drawText(TextManager.elapsedDays, 560, y, 160);
      this.drawText(TextManager.playTime, 745, y, 150);
      this.drawText(TextManager.difficulty, 956, y, 150);
    };
    Window_Record.prototype.itemHeight = function () {
      return 78;
    };
    Window_Record.prototype.itemRect = function (index) {
      var rect = _super.prototype.itemRect.call(this, index);
      rect.y += 50;
      return rect;
    };
    Window_Record.prototype.drawItem = function (index) {
      var r = this.itemRect(index);
      var y = r.y + 14;
      var record = this._recordList[index];
      this.drawDungeonName(record, y);
      this.drawBattleMembers(record, y);
      //this.drawTryCount(record, y);
      this.drawElapsedDays(record, y, index);
      this.drawPlaytime(record, y);
      this.drawDifficulty(record, y);
    };
    Window_Record.prototype.drawDungeonName = function (record, y) {
      var dungeonName = getDungeonName(record.stage());
      this.drawText(dungeonName, 20, y, 220);
    };
    Window_Record.prototype.drawBattleMembers = function (record, y) {
      var x = 330;
      for (var _i = 0, _a = record.clearMembers(); _i < _a.length; _i++) {
        var a = _a[_i];
        var cos = a;
        this.drawCharacterImage(cos, x, y + 56);
        x += 34;
      }
    };
    Window_Record.prototype.drawCharacterImage = function (cos, x, y) {
      var c = new Nore.Game_DungeonCharacter(cos, x - 13, y + 12);
      var sprite = new Sprite_ActorCharacter(c, cos);
      this._windowContentsSprite.addChild(sprite);
    };
    Window_Record.prototype.drawTryCount = function (record, y) {
      this.drawText(
        TextManager.count.format(record.tryCount()),
        300,
        y,
        200,
        "right"
      );
    };
    Window_Record.prototype.drawElapsedDays = function (record, y, index) {
      var x = 445;
      var text;
      if (!record._endDay) {
        text = TextManager.day2.format(record.day());
      } else {
        text = TextManager.day.format(record.day());
      }
      var plus = 0;
      if (ConfigManager.language == "en") {
        plus = 30;
      }
      this.drawText(text, x, y, 200 + plus, "right");
      if (record.clearMembers().length == 0) {
        return;
      }
      if (record.day() <= 2) {
        this.drawIcon(2201, x + 85, y);
      } else if (record.day() <= 4) {
        this.drawIcon(2202, x + 85, y);
      }
    };
    Window_Record.prototype.drawPlaytime = function (record, y) {
      this.drawText(record.playtimeText(), 670, y, 200, "right");
    };
    Window_Record.prototype.drawDifficulty = function (record, y) {
      var text = $gameSystem.getDifficultyText(record.difficulty());
      this.drawText(text, 960, y, 160, "left");
    };
    return Window_Record;
  })(Window_Selectable);
})(Nore || (Nore = {}));
