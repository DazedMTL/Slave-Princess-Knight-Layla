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
  var _Scene_Map_updateMain = Scene_Map.prototype.updateMain;
  Scene_Map.prototype.updateMain = function () {
    _Scene_Map_updateMain.call(this);
    if (this.isShowTimeline()) {
      this.showTimelineWindow();
    } else {
      this.hideTimelineWindow();
    }
  };
  Scene_Map.prototype.isShowTimeline = function () {
    if ($gameMap.mapId() == 8) {
      //return false;
    }
    return $gameSwitches.value(13);
  };
  Scene_Map.prototype.showTimelineWindow = function () {
    if (!this._timelineWindow) {
      this._timelineWindow = new Window_Timeline(
        new Rectangle(200, 50, 880, 500)
      );
      this._spriteset.addChild(this._timelineWindow);
      this._timelineWindow.refresh();
    }
    this._timelineWindow.show();
  };
  Scene_Map.prototype.hideTimelineWindow = function () {
    if (this._timelineWindow) {
      this._timelineWindow.hide();
    }
  };
  Nore.BANZOKU_ACTOR_VAR = 941;
  Nore.VAGRANT_ACTOR_VAR = 942;
  Nore.GOBLIN_ACTOR_VAR = 943;
  var TIMELINE_TOP = 72;
  var TIMELINE_INTERVAL = 45;
  var Sprite_Arrow = /** @class */ (function (_super) {
    __extends(Sprite_Arrow, _super);
    function Sprite_Arrow() {
      var _this = _super.call(this) || this;
      _this.bitmap = ImageManager.loadSystem("arrow");
      _this.x = 14;
      _this.y = _this.yPos(0);
      _this._targetY = _this.y;
      return _this;
    }
    Sprite_Arrow.prototype.move = function (index) {
      this._started = true;
      this._finished = false;
      this._targetY = this.yPos(index);
    };
    Sprite_Arrow.prototype.setIndex = function (index) {
      this.y = this.yPos(index);
    };
    Sprite_Arrow.prototype.yPos = function (index) {
      return TIMELINE_TOP + index * TIMELINE_INTERVAL;
    };
    Sprite_Arrow.prototype.setY = function (time) {
      this.y = this.yPos(time);
      this._targetY = this.y;
    };
    Sprite_Arrow.prototype.update = function () {
      _super.prototype.update.call(this);
      this.updateCursor();
    };
    Sprite_Arrow.prototype.updateCursor = function () {
      if (this.y != this._targetY) {
        if (this._targetY > this.y) {
          this.y += 1;
          this._moving = true;
          if (this.y == this._targetY) {
            this._moving = false;
            this._finished = true;
          }
        }
      }
    };
    Sprite_Arrow.prototype.isFinished = function () {
      return this._finished;
    };
    Sprite_Arrow.prototype.isStarted = function () {
      return this._started;
    };
    Sprite_Arrow.prototype.finish = function () {
      for (var i = 0; i < 999; i++) {
        if (this._finished) {
          return;
        }
        this.updateCursor();
      }
    };
    return Sprite_Arrow;
  })(Sprite);
  var WAIT = 20;
  var Window_Timeline = /** @class */ (function (_super) {
    __extends(Window_Timeline, _super);
    function Window_Timeline(r) {
      var _this = _super.call(this, r) || this;
      _this._wait = 0;
      _this._timelineManager = $gameSystem.timelineManager();
      _this.createArrow();
      _this.update();
      return _this;
    }
    Window_Timeline.prototype.createArrow = function () {
      this._arrow = new Sprite_Arrow();
      this.addChild(this._arrow);
      this._arrow.setIndex(this._timelineManager.timelineIndex());
    };
    Window_Timeline.prototype.refresh = function () {
      _super.prototype.refresh.call(this);
      this.drawTitle();
    };
    Window_Timeline.prototype.drawTitle = function () {
      this.changePaintOpacity(true);
      this.contents.fontSize = 26;
      if ($gameSystem.day() == 0) {
        this.drawText(TextManager.schedule2, 20, 20, 300);
      } else {
        this.drawText(
          TextManager.schedule1.format($gameSystem.day()),
          20,
          20,
          300
        );
      }
    };
    Window_Timeline.prototype.itemRect = function (index) {
      var rect = _super.prototype.itemRect.call(this, index);
      //rect.x += 20;
      rect.y += 60;
      return rect;
    };
    Window_Timeline.prototype.update = function () {
      _super.prototype.update.call(this);
      if (!$gameSwitches.value(13)) {
        return;
      }
      this.updateInput();
      this.updateSkip();
      this.updateRefresh();
      this.updateStartArrow();
      this.updateEvent();
      this.updateFinish();
      this.updateInterpreter();
    };
    Window_Timeline.prototype.updateSkip = function () {
      if (this.isFinished()) {
        return;
      }
      if (this._waitInput) {
        return;
      }
      if (Input.isPressed("shift") || TouchInput.rightButton) {
        if (!this._dataList) {
          return;
        }
        //p('skip');
        this._wait += 999;
        this.updateStartArrow();
        for (var i = 0; i < 10; i++) {
          this._arrow.finish();
          this._wait = 999;
          this.updateEvent();
          if (this._waitInput) {
            this.refresh();
            break;
          }
          if (this.isFinished()) {
            this._wait = WAIT - 15;
            this.refresh();
            return;
          }
        }
      }
    };
    Window_Timeline.prototype.isFinished = function () {
      if (!this._dataList) {
        return false;
      }
      var item = this._dataList[this._timelineManager.timelineIndex()];
      if (item == null) {
        return true;
      }
      return false;
    };
    Window_Timeline.prototype.updateEvent = function () {
      if (!this._arrow.isFinished()) {
        return;
      }
      if (this._waitInput) {
        return;
      }
      var item = this._dataList[this._timelineManager.timelineIndex()];
      if (!item) {
        return;
      }
      if (!item.isEvent()) {
        //item.run();
        this.runInterpreter(item);
        this._wait++;
        if (this._wait < WAIT) {
          return;
        }
        this.nextIndex();
        return;
      }
      this._waitInput = true;
      this.select(this._timelineManager.timelineIndex());
    };
    Window_Timeline.prototype.runInterpreter = function (item) {
      this._interpreter = new Game_Interpreter();
      var commonEventId = item.autoCommonId();
      item.clearCommonEvent();
      if (commonEventId > 0) {
        p("commonEventId:" + commonEventId);
        this._interpreter.setup($dataCommonEvents[commonEventId].list);
        this._interpreter.update();
      }
    };
    Window_Timeline.prototype.updateInterpreter = function () {
      if (this._interpreter) {
        this._interpreter.update();
      }
    };
    Window_Timeline.prototype.updateInput = function () {
      if (!this._waitInput) {
        return;
      }
      if (
        Input.isTriggered("ok") ||
        Input.isTriggered("cancel") ||
        Input.isPressed("shift") ||
        TouchInput.isPressed()
      ) {
        this.runCommonEvent();
      }
    };
    Window_Timeline.prototype.runCommonEvent = function () {
      p("runCommonEvent");
      var item = this._dataList[this._timelineManager.timelineIndex()];
      $gameSwitches.setValue(13, false);
      if ($gameVariables.value(11) > 0) {
        p("11: " + $gameVariables.value(11));
        $gameTemp.reserveCommonEvent($gameVariables.value(11));
      } else if (item.isCommonEvent()) {
        $gameTemp.reserveCommonEvent(item.commonId());
      } else {
        $gameTemp.reserveCommonEvent(99);
      }
    };
    Window_Timeline.prototype.updateStartArrow = function () {
      if (this._arrow.isStarted() || this._arrow.isFinished()) {
        return;
      }
      /*if (this.maxItems() <= $gameSystem.timelineIndex()) {
                return;
            }*/
      this._wait++;
      if (this._wait >= WAIT) {
        this.nextIndex();
      }
    };
    Window_Timeline.prototype.nextIndex = function () {
      this._wait = 0;
      this._timelineManager.nextTimelineIndex();
      this.refresh();
      if (!this._timelineManager.currentTimeline()) {
        this.refresh();
        this._finished = true;
      } else {
        this._arrow.move(this._timelineManager.timelineIndex());
      }
    };
    Window_Timeline.prototype.updateFinish = function () {
      if (!this._finished) {
        return;
      }
      this._wait++;
      if (this._wait >= WAIT) {
        $gameSwitches.setValue(13, false);
        if ($gameSystem.isNight() || !$gameSystem.isOpenNight()) {
          $gameTemp.reserveCommonEvent(55);
        } else {
          $gameTemp.reserveCommonEvent(57);
        }
      }
    };
    Window_Timeline.prototype.updateRefresh = function () {
      if ($gameSwitches.value(12)) {
        $gameSwitches.setValue(12, false);
        this.makeItems();
        this.refresh();
      }
    };
    Window_Timeline.prototype.makeItems = function () {
      this._dataList = this._timelineManager.timelineItems().concat();
      this.height = this._dataList.length * this.itemHeight() + 94;
      this.createContents();
    };
    Window_Timeline.prototype.maxItems = function () {
      if (this._dataList) {
        return this._dataList.length;
      }
      return 0;
    };
    Window_Timeline.prototype.drawItem = function (index) {
      var enabled = index >= this._timelineManager.timelineIndex();
      this.changePaintOpacity(enabled);
      var rect = this.itemRect(index);
      var item = this._dataList[index];
      var text = this.getText(item);
      var isEvent = this.drawEventMark(item, rect);
      this.contents.fontSize = 22;
      this.drawText(text, rect.x + 40, rect.y + (isEvent ? 7 : 0), 220, "left");
      this.drawDetail(item, rect.x + 300, rect.y);
      //this.drawText(item.detailText(), rect.x + 240, rect.y, rect.width, 'left');
    };
    Window_Timeline.prototype.drawEventMark = function (item, rect) {
      if (!item.isCommonEvent()) {
        return false;
      }
      if (item.type() != TimelineType.CHOKYO) {
        return false;
      }
      this.contents.fontSize = 10;
      this.drawText(
        TextManager.timelineEvent,
        rect.x + 40,
        rect.y - 12,
        170,
        "left"
      );
      return true;
    };
    Window_Timeline.prototype.drawDetail = function (item, x, y) {
      this.contents.fontSize = 16;
      var xx = x;
      var isSingle = item.getResultList().length == 1;
      for (var _i = 0, _a = item.getResultList(); _i < _a.length; _i++) {
        var event_1 = _a[_i];
        if (event_1.detailText().length == 0) {
          continue;
        }
        this.drawMember(xx, y, $gameActors.actor(event_1.actorId()));
        this.drawText(event_1.detailText(), xx + 20, y, isSingle ? 500 : 250);
        xx += 250;
      }
    };
    Window_Timeline.prototype.drawMember = function (x, y, actor) {
      this.drawCharacterImage(actor.actorId(), x, y);
    };
    Window_Timeline.prototype.drawCharacterImage = function (actorId, x, y) {
      var actor = $gameActors.actor(actorId);
      var cos = new CostumeSaver(actorId);
      var c = new Nore.Game_DungeonCharacter(cos, x + 12, y + 45);
      var sprite = new Sprite_Prisoner(c, cos);
      this._windowContentsSprite.addChild(sprite);
    };
    Window_Timeline.prototype.getText = function (item) {
      switch (item.type()) {
        case TimelineType.START:
          return TextManager.timelineStart;
        case TimelineType.END:
          return TextManager.timelineEnd;
        case TimelineType.DUNGEON:
          return TextManager.timelineDungeon;
        case TimelineType.RAPE:
          return "敗北レイプ";
        case TimelineType.EVENT:
          return TextManager.timelineEvent;
        case TimelineType.ERO_EVENT:
          return TextManager.timelineEroEvent;
        case TimelineType.REST:
          return TextManager.timelineRest;
        case TimelineType.RESQUE_EVENT:
          return "帰還時のイベント";
        case TimelineType.SLAVE:
          return TextManager.timelineSlave;
        case TimelineType.TO_NIGHT:
          return TextManager.timelineNight;
        case TimelineType.NINSHIN:
          return TextManager.timelineNinshin;
        case TimelineType.NINSHIN_REACT:
          return "その夜";
        case TimelineType.NINSHIN_GROWUP:
          return TextManager.timelineBoteGlowup;
      }
      if (item.type() == TimelineType.CHOKYO) {
        var actor = $gameActors.actor(item.value());
        var text = TextManager.prisonSche.format(actor.name());
        if (item.isEvent()) {
          return text; //'　(イベントあり)';
        }
        return text;
      }
      if (item.type() == TimelineType.ROOM_BANZOKU) {
        var actor = $gameActors.actor(item.value());
        var text = void 0;
        if (actor.actor().meta["civilian"]) {
          text = TextManager.timelineCivilian;
        } else {
          text = TextManager.timelineNikubenki.format(actor.name());
        }
        if (item.isEvent()) {
          return text; //'　(イベントあり)';
        }
        return text;
      }
      if (item.type() == TimelineType.ROOM_VAGRANT) {
        var actor = $gameActors.actor(item.value());
        var text = TextManager.timelineVagrant.format(actor.name());
        return text;
      }
      if (item.type() == TimelineType.ROOM_GOBLIN) {
        var actor = $gameActors.actor(item.value());
        var text = TextManager.timelineGoblin.format(actor.name());
        return text;
      }
      if (item.type() == TimelineType.ROOM_MINISTER) {
        var actor = $gameActors.actor(item.value());
        var text = TextManager.timelineMinister.format(actor.name());
        return text;
      }
      if (item.type() == TimelineType.ROOM_GRAY) {
        var actor = $gameActors.actor(item.value());
        var text = TextManager.timelineGray.format(actor.name());
        return text;
      }
      if (item.type() == TimelineType.ROOM_CHARLES) {
        var actor = $gameActors.actor(item.value());
        var text = TextManager.timelineCharles.format(actor.name());
        return text;
      }
      if (item.type() == TimelineType.ROOM_CHICHI) {
        var actor = $gameActors.actor(item.value());
        var text = TextManager.timelineChichi.format(actor.name());
        return text;
      }
      if (item.type() == TimelineType.BAISYUN) {
        p(item);
        return "Error";
        var actor = $gameActors.actor(item.value());
        var text = "%1による売春".format(actor.name());
        if (item.isEvent()) {
          return text; //'　(イベントあり)';
        }
        return text;
      }
      if (item.type() == TimelineType.RESQUE) {
        var actor = $gameActors.actor($gameVariables.value(24));
        var text = void 0;
        if (actor) {
          text = "%1の救出作戦　残り%2日".format(actor.name(), item.value());
        } else {
          text = "救出作戦成功".format();
        }
        return text;
      }
      p(item.type());
      return "333";
    };
    return Window_Timeline;
  })(Window_Selectable);
})(Nore || (Nore = {}));
var TimelineType;
(function (TimelineType) {
  TimelineType["START"] = "START";
  TimelineType["END"] = "END";
  TimelineType["MOVE_DUNGEON"] = "MOVE_DUNGEON";
  TimelineType["DUNGEON"] = "DUNGEON";
  TimelineType["RESQUE"] = "RESQUE";
  TimelineType["RESQUE_EVENT"] = "RESQUE_EVENT";
  TimelineType["CHOKYO"] = "CHOKYO";
  TimelineType["ROOM_BANZOKU"] = "ROOM_BANZOKU";
  TimelineType["ROOM_VAGRANT"] = "ROOM_VAGRANT";
  TimelineType["ROOM_GOBLIN"] = "ROOM_GOBLIN";
  TimelineType["ROOM_MINISTER"] = "ROOM_MINISTER";
  TimelineType["ROOM_CHARLES"] = "ROOM_CHARLES";
  TimelineType["ROOM_GRAY"] = "ROOM_GRAY";
  TimelineType["ROOM_CHICHI"] = "ROOM_CHICHI";
  TimelineType["REPORT"] = "REPORT";
  TimelineType["RAPE"] = "RAPE";
  TimelineType["EVENT"] = "EVENT";
  TimelineType["ERO_EVENT"] = "ERO_EVENT";
  TimelineType["REST"] = "REST";
  TimelineType["DEFEAT"] = "DEFEAT";
  TimelineType["WITHDRAWAL"] = "WITHDRAWAL";
  TimelineType["SLAVE"] = "SLAVE";
  TimelineType["BAISYUN"] = "BAISYUN";
  TimelineType["TO_NIGHT"] = "TO_NIGHT";
  TimelineType["NINSHIN"] = "NINSHIN";
  TimelineType["NINSHIN_REACT"] = "NINSHIN_REACT";
  TimelineType["NINSHIN_GROWUP"] = "NINSHIN_GROWUP";
})(TimelineType || (TimelineType = {}));
var TimelineActorEvent = /** @class */ (function () {
  function TimelineActorEvent(actorId, eventIndex) {
    this.actorId = actorId;
    this.eventIndex = eventIndex;
  }
  return TimelineActorEvent;
})();
var TimelineItem = /** @class */ (function () {
  function TimelineItem(type, commonId, value) {
    if (commonId === void 0) {
      commonId = 0;
    }
    if (value === void 0) {
      value = 0;
    }
    this._resultList = [];
    this._type = type;
    this._value = value;
    this._commonId = commonId;
    if (this._type == TimelineType.CHOKYO) {
      //this.incrementChokyoCount();
    }
  }
  TimelineItem.prototype.type = function () {
    return this._type;
  };
  TimelineItem.prototype.value = function () {
    return this._value;
  };
  TimelineItem.prototype.isEvent = function () {
    if ($gameVariables.value(11) > 0) {
      return true;
    }
    switch (this._type) {
      case TimelineType.DUNGEON:
        return true;
      case TimelineType.REPORT:
        return true;
      case TimelineType.RAPE:
        return true;
      case TimelineType.EVENT:
        return true;
      case TimelineType.RESQUE_EVENT:
        return true;
      case TimelineType.DEFEAT:
        return true;
      case TimelineType.ERO_EVENT:
        return true;
      case TimelineType.SLAVE:
        return true;
      case TimelineType.NINSHIN:
        return true;
      case TimelineType.NINSHIN_REACT:
        return true;
      case TimelineType.NINSHIN_GROWUP:
        return true;
      case TimelineType.BAISYUN:
      case TimelineType.CHOKYO:
      case TimelineType.MOVE_DUNGEON:
        return this._commonId > 0;
      case TimelineType.ROOM_BANZOKU:
      case TimelineType.ROOM_VAGRANT:
      case TimelineType.ROOM_GOBLIN:
      case TimelineType.ROOM_MINISTER:
      case TimelineType.ROOM_GRAY:
      case TimelineType.ROOM_CHARLES:
      case TimelineType.ROOM_CHICHI:
        return true;
      case TimelineType.REST:
        return !$gameSwitches.value(482);
    }
    if (this._type == TimelineType.RESQUE) {
      return this.value() == 1;
    }
    return false;
  };
  TimelineItem.prototype.getActorNinshinId = function () {
    switch (this.value()) {
      case 1:
        return 604;
      case 2:
        return 686;
      case 3:
        return 647;
      case 4:
        return 724;
      case 5:
        return 1784;
      case 6:
        return 766;
      case 10:
        return 1701;
      case 12:
        return 1744;
    }
    console.error(this.value() + "の妊娠発覚コモンイベントIDがありません");
  };
  TimelineItem.prototype.getActorNinshinReactId = function () {
    switch (this.value()) {
      case 1:
        return 608;
    }
    console.error(this.value() + "の妊娠反応コモンイベントIDがありません");
  };
  TimelineItem.prototype.getActorNinshinGrowupId = function () {
    switch (this.value()) {
      case 1:
        return 605;
      case 2:
        return 685;
      case 3:
        return 645;
      case 4:
        return 726;
      case 5:
        return 1786;
      case 6:
        return 767;
      case 10:
        return 1705;
      case 12:
        return 1746;
    }
    console.error(this.value() + "の妊娠成長コモンイベントIDがありません");
  };
  TimelineItem.prototype.autoCommonId = function () {
    if (this._cleared) {
      return -1;
    }
    if (this._type == TimelineType.CHOKYO) {
      var actor = $gameActors.actor(this.value());
      if (actor.getLastHistory().hasChokyoEvent()) {
        return;
      }
      var commonId = 70 + actor.actorId();
      p("run:" + commonId);
      return commonId;
    }
    if (this._type == TimelineType.BAISYUN) {
      return this.baisyunCommonId(this._value);
    }
    if (this._type == TimelineType.ROOM_BANZOKU) {
      return this._commonId;
    }
    return 0;
  };
  TimelineItem.prototype.clearCommonEvent = function () {
    this._cleared = true;
  };
  TimelineItem.prototype.baisyunCommonId = function (actorId) {
    switch (actorId) {
      case 3:
        return 656;
    }
    console.error("売春commonidがみつかりません" + actorId);
  };
  TimelineItem.prototype.nextDayItem = function () {
    if (this._type == TimelineType.MOVE_DUNGEON) {
      return new TimelineItem(TimelineType.DUNGEON);
    }
    if (this._type == TimelineType.RESQUE) {
      return new TimelineItem(TimelineType.RESQUE, 0, this._value - 1);
    }
    return null;
  };
  TimelineItem.prototype.isCommonEvent = function () {
    switch (this._type) {
      case TimelineType.REPORT:
        return true;
      case TimelineType.RAPE:
        return true;
      case TimelineType.EVENT:
        return true;
      case TimelineType.RESQUE_EVENT:
        return true;
      case TimelineType.DEFEAT:
        return true;
      case TimelineType.SLAVE:
        return true;
      case TimelineType.ERO_EVENT:
        return true;
      case TimelineType.TO_NIGHT:
        return true;
      case TimelineType.NINSHIN:
        return true;
      case TimelineType.NINSHIN_REACT:
        return true;
      case TimelineType.NINSHIN_GROWUP:
        return true;
      case TimelineType.CHOKYO:
      case TimelineType.ROOM_BANZOKU:
      case TimelineType.ROOM_VAGRANT:
      case TimelineType.ROOM_GOBLIN:
      case TimelineType.ROOM_MINISTER:
      case TimelineType.ROOM_GRAY:
      case TimelineType.ROOM_CHARLES:
      case TimelineType.ROOM_CHICHI:
      case TimelineType.BAISYUN:
      case TimelineType.MOVE_DUNGEON:
        return this._commonId > 0;
      case TimelineType.REST:
        return true;
    }
    return false;
  };
  TimelineItem.prototype.getResultList = function () {
    var result = [];
    for (var _i = 0, _a = this._resultList; _i < _a.length; _i++) {
      var e = _a[_i];
      var history_1 = $gameActors.actor(e.actorId).getLastHistory();
      var event_2 = history_1.getDayEvent(e.eventIndex);
      if (event_2) {
        result.push(event_2);
      }
    }
    return result;
  };
  TimelineItem.prototype.addResult = function (history) {
    var e = new TimelineActorEvent(
      history.actorId(),
      history.getCurrentEventIndex()
    );
    this._resultList.push(e);
  };
  TimelineItem.prototype.commonId = function () {
    if (this._type == TimelineType.NINSHIN) {
      return this.getActorNinshinId();
    }
    if (this._type == TimelineType.NINSHIN_REACT) {
      return this.getActorNinshinReactId();
    }
    if (this._type == TimelineType.NINSHIN_GROWUP) {
      return this.getActorNinshinGrowupId();
    }
    return this._commonId;
  };
  return TimelineItem;
})();
var TimelineManager = /** @class */ (function () {
  function TimelineManager() {
    this._timelineItemList = [];
    this._timelineIndex = 0;
  }
  TimelineManager.prototype.makeTimelineItem = function (mainItem) {
    this._timelineItemList = [];
    this._timelineItemList.push(new TimelineItem(TimelineType.START));
    this._timelineItemList.push(mainItem);
    if ($gameSystem.isOpenNight()) {
      this._timelineItemList.push(new TimelineItem(TimelineType.TO_NIGHT, 57));
    } else {
      this._timelineItemList.push(new TimelineItem(TimelineType.END));
    }
    this._timelineIndex = 0;
  };
  TimelineManager.prototype.setupEndlessHMode = function () {
    this._timelineItemList = [];
    this._timelineItemList.push(new TimelineItem(TimelineType.START));
    this._timelineIndex = 1;
  };
  TimelineManager.prototype.setupNightPart = function () {
    this._timelineIndex--;
    this.pushChokyoItemAll();
    this._timelineItemList.push(new TimelineItem(TimelineType.END));
  };
  TimelineManager.prototype.pushChokyoItemAll = function () {
    $gameVariables.setValue(Nore.BANZOKU_ACTOR_VAR, 99);
    var info = $gameParty.prisonInfo();
    for (var _i = 0, _a = $gameParty.allEroMembers(); _i < _a.length; _i++) {
      var actor = _a[_i];
      if (info.isNikubenki(actor.actorId())) {
        continue;
      } else if (info.isBaisyun(actor.actorId())) {
      } else if (info.isBanzoku(actor.actorId())) {
        $gameVariables.setValue(Nore.BANZOKU_ACTOR_VAR, actor.actorId());
        this.pushNikubenkiRoomItem(actor.actorId());
      } else if (info.isVagrant(actor.actorId())) {
        $gameVariables.setValue(Nore.VAGRANT_ACTOR_VAR, actor.actorId());
        this.pushVagrantRoomItem(actor.actorId());
      } else if (info.isGoblin(actor.actorId())) {
        $gameVariables.setValue(Nore.GOBLIN_ACTOR_VAR, actor.actorId());
        this.pushGoblinRoomItem(actor.actorId());
      } else if (info.isMinister(actor.actorId())) {
        this.pushMinisterRoomItem(actor.actorId());
      } else if (info.isGray(actor.actorId())) {
        this.pushGrayRoomItem(actor.actorId());
      } else if (info.isCharles(actor.actorId())) {
        this.pushCharlesRoomItem(actor.actorId());
      } else if (info.isChichi(actor.actorId())) {
        this.pushChichiRoomItem(actor.actorId());
      }
    }
    for (var _b = 0, _c = $gameParty.allEroMembers(); _b < _c.length; _b++) {
      var actor = _c[_b];
      if (info.isNikubenki(actor.actorId())) {
        this.pushChokyoItem(actor.actorId());
      }
    }
    if (info.isNikubenki(21)) {
      var item = new TimelineItem(TimelineType.ROOM_BANZOKU, 985, 21);
      this._timelineItemList.push(item);
    }
    if (info.isNikubenki(22)) {
      var item = new TimelineItem(TimelineType.ROOM_BANZOKU, 984, 22);
      this._timelineItemList.push(item);
    }
    if (info.isNikubenki(23)) {
      var item = new TimelineItem(TimelineType.ROOM_BANZOKU, 986, 23);
      this._timelineItemList.push(item);
    }
  };
  TimelineManager.prototype.pushChokyoItem = function (actorId) {
    p("pushChokyoItem:" + actorId);
    var actor = $gameActors.actor(actorId);
    var h = actor.getLastHistory();
    h.setNikubenki();
    var varId = 200 + actor.actorId();
    var n = $gameVariables.value(varId);
    $gameVariables.setValue(varId, n + 1);
    var item = new TimelineItem(
      TimelineType.CHOKYO,
      h.getChokyoEventId(),
      h.actorId()
    );
    h.nextEvent();
    item.addResult(h);
    if ($gameSystem.isOpenNight()) {
      this._timelineItemList.push(item);
    } else {
      this.push(item);
    }
  };
  TimelineManager.prototype.pushNikubenkiRoomItem = function (actorId) {
    p("pushNikubenkiRoomItem:" + actorId);
    var actor = $gameActors.actor(actorId);
    var h = actor.getLastHistory();
    var varId = 220 + actor.actorId();
    var n = $gameVariables.value(varId);
    $gameVariables.setValue(varId, n + 1);
    var item = new TimelineItem(
      TimelineType.ROOM_BANZOKU,
      h.getBanzokuRoomChokyoId(),
      h.actorId()
    );
    h.nextEvent();
    item.addResult(h);
    if ($gameSystem.isOpenNight()) {
      this._timelineItemList.push(item);
    } else {
      this.push(item);
    }
  };
  TimelineManager.prototype.pushVagrantRoomItem = function (actorId) {
    // p('pushVagrantRoomItem:' + actorId);
    var actor = $gameActors.actor(actorId);
    var h = actor.getLastHistory();
    var varId = 220 + actor.actorId();
    var n = $gameVariables.value(varId);
    $gameVariables.setValue(varId, n + 1);
    var item = new TimelineItem(
      TimelineType.ROOM_VAGRANT,
      h.getVagrantRoomChokyoId(),
      h.actorId()
    );
    h.nextEvent();
    item.addResult(h);
    if ($gameSystem.isOpenNight()) {
      this._timelineItemList.push(item);
    } else {
      this.push(item);
    }
  };
  TimelineManager.prototype.pushGoblinRoomItem = function (actorId) {
    //p('pushGoblinRoomItem:' + actorId);
    var actor = $gameActors.actor(actorId);
    var h = actor.getLastHistory();
    var varId = 220 + actor.actorId();
    var n = $gameVariables.value(varId);
    $gameVariables.setValue(varId, n + 1);
    var item = new TimelineItem(
      TimelineType.ROOM_GOBLIN,
      h.getGoblinRoomChokyoId(),
      h.actorId()
    );
    h.nextEvent();
    item.addResult(h);
    if ($gameSystem.isOpenNight()) {
      this._timelineItemList.push(item);
    } else {
      this.push(item);
    }
  };
  TimelineManager.prototype.pushMinisterRoomItem = function (actorId) {
    //p('pushMinisterRoomItem:' + actorId);
    var actor = $gameActors.actor(actorId);
    var h = actor.getLastHistory();
    var varId = 220 + actor.actorId();
    var n = $gameVariables.value(varId);
    $gameVariables.setValue(varId, n + 1);
    var item = new TimelineItem(
      TimelineType.ROOM_MINISTER,
      h.getMinisterRoomChokyoId(),
      h.actorId()
    );
    h.nextEvent();
    item.addResult(h);
    if ($gameSystem.isOpenNight()) {
      this._timelineItemList.push(item);
    } else {
      this.push(item);
    }
  };
  TimelineManager.prototype.pushGrayRoomItem = function (actorId) {
    //p('pushGrayRoomItem:' + actorId);
    var actor = $gameActors.actor(actorId);
    var h = actor.getLastHistory();
    var varId = 220 + actor.actorId();
    var n = $gameVariables.value(varId);
    $gameVariables.setValue(varId, n + 1);
    var item = new TimelineItem(
      TimelineType.ROOM_GRAY,
      h.getGrayRoomChokyoId(),
      h.actorId()
    );
    h.nextEvent();
    item.addResult(h);
    if ($gameSystem.isOpenNight()) {
      this._timelineItemList.push(item);
    } else {
      this.push(item);
    }
  };
  TimelineManager.prototype.pushCharlesRoomItem = function (actorId) {
    p("pushCharlesRoomItem:" + actorId);
    var actor = $gameActors.actor(actorId);
    var h = actor.getLastHistory();
    var varId = 220 + actor.actorId();
    var n = $gameVariables.value(varId);
    $gameVariables.setValue(varId, n + 1);
    var item = new TimelineItem(
      TimelineType.ROOM_CHARLES,
      h.getCharlesRoomChokyoId(),
      h.actorId()
    );
    h.nextEvent();
    item.addResult(h);
    if ($gameSystem.isOpenNight()) {
      this._timelineItemList.push(item);
    } else {
      this.push(item);
    }
  };
  TimelineManager.prototype.pushChichiRoomItem = function (actorId) {
    p("pushChichiRoomItem:" + actorId);
    var actor = $gameActors.actor(actorId);
    var h = actor.getLastHistory();
    var varId = 220 + actor.actorId();
    var n = $gameVariables.value(varId);
    $gameVariables.setValue(varId, n + 1);
    var item = new TimelineItem(
      TimelineType.ROOM_CHICHI,
      h.getChichiRoomChokyoId(),
      h.actorId()
    );
    h.nextEvent();
    item.addResult(h);
    if ($gameSystem.isOpenNight()) {
      this._timelineItemList.push(item);
    } else {
      this.push(item);
    }
  };
  TimelineManager.prototype.onStageClear = function () {
    var item = new TimelineItem(TimelineType.EVENT, 320);
    this.insert(item);
  };
  TimelineManager.prototype.isReleaseToday = function (history, mainItem) {
    if (mainItem.type() != TimelineType.RESQUE) {
      return false;
    }
    if (mainItem.value() != 1) {
      return false;
    }
    var actorId = $gameVariables.value(24);
    if (history.actorId() != actorId) {
      return false;
    }
    return true;
  };
  TimelineManager.prototype.isDungeonToday = function (history, mainItem) {
    if (
      mainItem.type() != TimelineType.MOVE_DUNGEON &&
      mainItem.type() != TimelineType.MOVE_DUNGEON
    ) {
      return false;
    }
    if (!$gameParty.battleMembers().contains(history.actor())) {
      return false;
    }
    return true;
  };
  TimelineManager.prototype.chokyoCommonId = function (actorId) {
    switch (actorId) {
      case 1:
        return 102;
      case 2:
        return 103;
      case 3:
        return 104;
      case 5:
        return 106;
      case 6:
        return 107;
    }
  };
  TimelineManager.prototype.timelineItems = function () {
    return this._timelineItemList;
  };
  TimelineManager.prototype.timelineIndex = function () {
    return this._timelineIndex;
  };
  TimelineManager.prototype.nextTimelineIndex = function () {
    this._timelineIndex++;
  };
  TimelineManager.prototype.currentTimeline = function () {
    return this._timelineItemList[this._timelineIndex];
  };
  TimelineManager.prototype.refreshTimeline = function () {
    var nextDayItem = this.nextDayItem();
    if (nextDayItem) {
      this.makeTimelineItem(nextDayItem);
    } else {
      this._timelineItemList = [];
      this._timelineIndex = 0;
    }
  };
  TimelineManager.prototype.nextDayItem = function () {
    for (var _i = 0, _a = this._timelineItemList; _i < _a.length; _i++) {
      var item = _a[_i];
      var nextDayItem = item.nextDayItem();
      if (nextDayItem) {
        return nextDayItem;
      }
    }
    return null;
  };
  TimelineManager.prototype.insert = function (item) {
    this._timelineItemList.splice(this._timelineIndex + 1, 0, item);
  };
  TimelineManager.prototype.push = function (item) {
    if (this._timelineItemList.length <= this._timelineIndex) {
      var lastItem = this._timelineItemList[this._timelineItemList.length - 1];
      if (lastItem.type() == TimelineType.TO_NIGHT) {
        // 夜の妊娠発覚
        this._timelineItemList.push(item);
        return;
      }
    }
    this._timelineItemList.splice(this._timelineItemList.length - 1, 0, item);
  };
  TimelineManager.prototype.isContinue = function () {
    for (var _i = 0, _a = this._timelineItemList; _i < _a.length; _i++) {
      var item = _a[_i];
      if (item.type() == TimelineType.MOVE_DUNGEON) {
        return true;
      }
      if (item.type() == TimelineType.RESQUE) {
        if (item.value() > 1) {
          return true;
        }
      }
    }
    return false;
  };
  return TimelineManager;
})();
