/*:ja
 * @target MZ
 * @author ル
 *
 * @command AddEvent
 * @text イベントの追加
 * @des イベントの追加
 * @arg actorId
 * @type number
 * @text actorId
 * @desc actorId
 *
 * @arg event
 * @type string
 * @text イベント
 * @desc イベント
 *
 * @arg ero
 * @type boolean
 * @text エロ？
 * @desc エロ？
 *
 *
 * @command RunActor
 * @text イベントの実行
 * @des イベントの実行
 * @arg actorId
 * @type number
 * @text actorId
 * @desc actorId
 *
 * @command RestoreEvent
 * @text イベントの復帰
 * @des イベントの復帰
 *
 * @arg event
 * @type string
 * @text イベント
 * @desc イベント
 *
 */
var Nore;
(function (Nore) {
  var pluginName = "Nore_Event";
  var _Sprite_Balloon_update = Sprite_Balloon.prototype.update;
  Sprite_Balloon.prototype.update = function () {
    _Sprite_Balloon_update.call(this);
    if (!$gameSwitches.value(63)) {
      return;
    }
    if (this._duration === 4) {
      this._duration++;
    }
  };
  Sprite_Balloon.prototype.updatePosition = function () {
    this.x = this._target.x;
    this.y = this._target.y - this._target.height + 10;
  };
  PluginManager.registerCommand(pluginName, "AddEvent", function (args) {
    var actorId = parseInt(args.actorId);
    var event = args.event;
    var ero = args.ero.toLowerCase() === "true";
    $gameSystem.reserveActorEvent(actorId, event, ero, ero);
    if ($gameSystem.isNight()) {
      switch (actorId) {
        case 3:
        case 7:
        case 17:
        case 26:
          $gameSystem.reserveActorEvent(19, event, ero, ero);
      }
    }
  });
  PluginManager.registerCommand(pluginName, "RunActor", function (args) {
    var actorId = parseInt(args.actorId);
    this.runActor(actorId);
  });
  PluginManager.registerCommand(pluginName, "RestoreEvent", function (args) {
    var event = args.event;
    $gameSystem.restoreEvent(event);
  });
  Game_Interpreter.prototype.runActor = function (actorId) {
    this.beforeRun();
    p("run");
    $gameSwitches.setValue(80, false);
    var file = $gameSystem.getReservedActorEvent(actorId);
    if (!file) {
      return false;
    }
    $gameSystem.endEvent(file);
    var list = $dataScenario[file.normalize("NFC")];
    if (!list) {
      throw new Error("file:" + file + " のデータが見つかりません");
    }
    $gameTemp.clearNextScenario();
    console.log("Scenario \u30B3\u30DE\u30F3\u30C9\u5B9F\u884C: " + file);
    this.setupChild(list, this._eventId);
    $gameSwitches.setValue(80, true);
    return true;
  };
  Game_Interpreter.prototype.showEventMarks = function (targetId) {
    if (!$gameSystem.isEventReserved(targetId)) {
      return false;
    }
    var events = $gameMap.events();
    for (var _i = 0, events_1 = events; _i < events_1.length; _i++) {
      var event_1 = events_1[_i];
      var name = event_1.characterName();
      if (event_1.event().name.indexOf("水晶") >= 0) {
        if (targetId === 4) {
          $gameTemp.requestBalloon(event_1, 1);
          return true;
        }
        return false;
      }
      if (name.indexOf("sleep") >= 0) {
        continue;
      }
      var n = /actor(\d+)/.exec(name);
      if (!n) {
        continue;
      }
      var actorId = parseInt(n[1]);
      if (actorId === targetId) {
        $gameTemp.requestBalloon(event_1, 1);
        return true;
      }
    }
    return false;
  };
  Game_Interpreter.prototype.showEroEventMarks = function (targetId) {
    if (!$gameSystem.isEroEventReserved(targetId)) {
      return false;
    }
    var events = $gameMap.events();
    for (var _i = 0, events_2 = events; _i < events_2.length; _i++) {
      var event_2 = events_2[_i];
      if (event_2.page() == null) {
        continue;
      }
      var eventName = event_2.event().name;
      var n = /mob(\d+)/.exec(eventName);
      if (n) {
        var mobId = parseInt(n[1]);
        if (mobId === targetId) {
          $gameTemp.requestBalloon(event_2, 4);
          return true;
        }
      }
      var name = event_2.characterName();
      var n = /actor(\d+)/.exec(name);
      if (!n) {
        continue;
      }
      var actorId = parseInt(n[1]);
      if (actorId === targetId) {
        $gameTemp.requestBalloon(event_2, 4);
        return true;
      }
    }
    return false;
  };
  Game_Interpreter.prototype.showEroEventMarkByComment = function () {
    var heart = "♥";
    var ex = "!";
    var events = $gameMap.events();
    for (var _i = 0, events_3 = events; _i < events_3.length; _i++) {
      var event_3 = events_3[_i];
      if (event_3.page() == null) {
        continue;
      }
      var list = event_3.page().list;
      if (list.length == 0) {
        continue;
      }
      var firstEvent = list[0];
      if (firstEvent.code != 108) {
        continue;
      }
      if (firstEvent.parameters[0] == ex) {
        $gameTemp.requestBalloon(event_3, 1);
      }
      if (firstEvent.parameters[0] == heart) {
        $gameTemp.requestBalloon(event_3, 4);
      }
    }
    return false;
  };
  Game_Interpreter.prototype.runActor1 = function () {
    return this.runActor(1);
  };
  Game_Interpreter.prototype.beforeRun = function () {
    $gameSwitches.setValue(62, false);
    $gameSwitches.setValue(63, false);
  };
  Game_System.prototype.getReservedEvent = function (id) {
    this._reservedEvent = this._reservedEvent || {};
    this._reservedEvent[id] = this._reservedEvent[id] || [];
    if (this._reservedEvent[id].length > 0) {
      return this._reservedEvent[id].shift();
    }
    return null;
  };
  var _Scene_Menu_initialize = Scene_MenuBase.prototype.initialize;
  Scene_MenuBase.prototype.initialize = function () {
    _Scene_Menu_initialize.call(this);
    $gameSwitches.setValue(62, false);
    $gameSwitches.setValue(64, true);
  };
})(Nore || (Nore = {}));
