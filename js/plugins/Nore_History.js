/*:ja
 * @target MZ
 * @author ル
 *
 * @command StartDay
 * @text 履歴記録(一日開始)
 * @des 履歴記録(一日開始)
 *
 * @command EndDay
 * @text 次の日へ
 * @des 次の日へ
 *
 * @command StartDungeon
 * @text 履歴記録(ダンジョン開始)
 * @des 履歴記録(ダンジョン開始)
 *
 * @command EndDungeon
 * @text 履歴記録(ダンジョン終了)
 * @des 履歴記録(ダンジョン終了)
 * @arg defeatActorId
 * @type number
 * @arg defeatCount
 * @type number
 *
 * @command Rape
 * @text 敗北レイプ
 * @des 敗北レイプ
 * @arg actorId
 * @arg nakadashiCount
 *
 * @command ReleaseAll
 * @text 囚えられた仲間全員解放
 * @des 囚えられた仲間全員解放
 *
 * @command Release
 * @text 囚えられた仲間解放
 * @des 囚えられた仲間解放
 * @arg actorId
 *
 * @command ShowHistory
 * @text 履歴表示
 * @des 履歴表示
 *
 * @command NewActor
 * @text 新規キャラ追加
 * @des 新規キャラ追加
 * @arg actorId
 *
 * @command Nakadashi
 * @text 中出し
 * @des 中出し
 * @arg actorId
 * @type number
 * @arg value
 * @type number
 *
 * @command EndChokyo
 * @text 調教終了
 * @des 調教終了
 * @arg actorId
 * @type number
 *
 * @command AutoChokyo
 * @text 自動調教
 * @des 自動調教
 * @arg actorId
 * @type number
 *
 * @command SaveCostune
 * @text コスチューム保存
 * @des コスチューム保存
 * @arg actorId
 * @type number
 * @arg faceId
 * @type string
 * @arg hoppeId
 * @type number
 *
 * @command RegisterEvent
 * @text イベント登録
 * @des イベント登録
 * @arg actorId
 * @type number
 * @arg commonId
 * @type number
 * @arg imageId
 * @type string
 *
 * @command RegisterSchedule
 * @text スケジュール登録
 * @des スケジュール登録
 * @arg actorId
 * @type number
 * @arg scheduleId
 * @type string
 * @arg value
 * @type number
 * @arg variance
 * @type number
 *
 * @command MankoHenkei
 * @text おまんこ変形
 * @des おまんこ変形
 * @arg mankoId
 * @type number
 *
 * @command AnalHenkei
 * @text アナル変形
 * @des アナル変形
 * @arg analId
 * @type number
 *
 * @command LastAcme
 * @text 最終スケジュールのアクメ設定
 * @des 最終スケジュールのアクメ設定
 * @arg actorId
 * @type number
 * @arg value
 * @type number
 *
 * @command Tanetsuke
 * @text 種付け。中出し回数プラス、妊娠可能性あり
 * @des 種付け。中出し回数プラス、妊娠可能性あり
 * @arg actorId
 * @type number
 * @arg manId
 * @type number
 * @arg value
 * @type number
 * @arg variance
 * @type number
 *
 *
 * @command Obedience
 * @text 服従度プラス
 * @des 服従度プラス
 * @arg actorId
 * @type number
 * @arg value
 * @type number
 *
 * @command Nasty
 * @text 淫乱度プラス
 * @des 淫乱度プラス
 * @arg actorId
 * @type number
 * @arg value
 * @type number
 *
 * @command SkillPoint
 * @text スキルポイントプラス
 * @des スキルポイントプラス
 * @arg actorId
 * @type number
 * @arg value
 * @type number
 *
 * @command Syusan
 * @text 出産
 * @des 出産
 * @arg actorId
 * @type number
 *
 * @command Ninshin
 * @text 妊娠
 * @des 妊娠
 * @arg actorId
 * @type number
 * @arg taneoyaId
 * @type number
 *
 * @command NinshinDamage
 * @text 妊娠ダメージ
 * @des 妊娠ダメージ
 * @arg actorId
 * @type number
 * @arg value
 * @type number
 *
 * @command Acme
 * @text 変数１３のアクメを履歴に加算
 * @des アクメ
 *
 * @command StartDayByCharles
 * @text 次の日へ(シャルルH用)
 * @des 次の日へ(シャルルH用)
 *
 * @command NextDayByEroEvent
 * @text 次の日へ(エロイベント用)
 * @des 次の日へ(エロイベント用)
 *
 * @command AddCrystalSchedule
 * @text 蒼結晶獲得イベント
 * @des 蒼結晶獲得イベント
 * @arg actorId
 * @type number
 */
var Nore;
(function (Nore) {
  var pluginName = "Nore_History";
  Nore.CHIMPO_1 = 5;
  Nore.CHIMPO_2 = 15;
  PluginManager.registerCommand(
    pluginName,
    "AddCrystalSchedule",
    function (args) {
      var actorId = Math.trunc(args.actorId);
      var actorHistory = $gameSystem.historyManager().getActorHistory(actorId);
      var history = actorHistory.lastHistory();
      var value = Math.round(
        Nore.PRISON_CRYSTAL_RATE * $gameParty.crystalPriceRate()
      );
      registerSchedule(history, ScheduleType.CRYSTAL, value);
      $gameParty.gainCrystalValue(value);
    }
  );
  PluginManager.registerCommand(
    pluginName,
    "NextDayByEroEvent",
    function (args) {
      $gameSystem.plusAdditionalDay();
      $gameSystem.historyManager().onDayEnd();
      $gameSystem.nextDay();
      $gameSystem.historyManager().onDayStart();
    }
  );
  PluginManager.registerCommand(
    pluginName,
    "StartDayByCharles",
    function (args) {
      // 無効
      return;
      /*
        $gameSystem.plusAdditionalDay()

        $gameSystem.historyManager().onDayEnd();
        $gameSystem.nextDay();
        $gameSystem.historyManager().onDayStart();
*/
    }
  );
  PluginManager.registerCommand(pluginName, "StartDay", function (args) {
    $gameSystem.historyManager().onDayStart();
    $gameSystem.timelineManager().refreshTimeline();
  });
  PluginManager.registerCommand(pluginName, "EndDay", function (args) {
    $gameSystem.historyManager().onDayEnd();
    $gameSystem.nextDay();
  });
  PluginManager.registerCommand(pluginName, "MoveDungeon", function (args) {
    p("履歴記録: MoveDungeon");
    $gameSystem.historyManager().onMoveToDungeon();
  });
  PluginManager.registerCommand(pluginName, "StartDungeon", function (args) {
    p("履歴記録: StartDungeon");
    $gameSystem.historyManager().onDungeonStart();
  });
  PluginManager.registerCommand(pluginName, "EndDungeon", function (args) {
    p("履歴記録: EndDungeon");
    p(args);
    var defeatActorId = Math.trunc(args.defeatActorId);
    var defeatCount = Math.trunc(args.defeatCount);
    $gameSystem.historyManager().onDungeonEnd(defeatActorId, defeatCount);
  });
  PluginManager.registerCommand(pluginName, "EndChokyo", function (args) {
    var actorId = Math.trunc(args.actorId);
    var actor = $gameActors.actor(actorId);
    var history = actor.getLastHistory();
    history.endChokyo();
  });
  PluginManager.registerCommand(pluginName, "AutoChokyo", function (args) {
    var actorId = Math.trunc(args.actorId);
    var actor = $gameActors.actor(actorId);
    var history = actor.getLastHistory();
    history.autoChokyo();
  });
  PluginManager.registerCommand(pluginName, "Rape", function (args) {
    var actorId = Math.trunc(args.actorId);
    var nakadashiCount = Math.trunc(args.nakadashiCount);
    p("履歴記録: Rape " + actorId + " " + nakadashiCount);
    var actor = $gameActors.actor(actorId);
    var history = actor.getLastHistory();
    history.setRape(nakadashiCount);
  });
  PluginManager.registerCommand(pluginName, "ReleaseAll", function (args) {
    for (var i = 1; i <= 10; i++) {
      var actor = $gameActors.actor(i);
      var history_1 = actor.getLastHistory();
      if (history_1 && history_1.isCaptive()) {
        history_1.release();
        actor.onRelease();
        $gameParty.addActor(actor.actorId());
      }
    }
  });
  PluginManager.registerCommand(pluginName, "Release", function (args) {
    var actorId = Math.trunc(args.actorId);
    var actor = $gameActors.actor(actorId);
    var history = actor.getLastHistory();
    if (history && history.isCaptive()) {
      history.release();
      history.addSchedule(ScheduleType.RELEASE, 0);
      //$gameParty.addActor(actor.actorId());
    }
  });
  PluginManager.registerCommand(pluginName, "ShowHistory", function (args) {
    SceneManager.push(Scene_History);
  });
  PluginManager.registerCommand(pluginName, "NewActor", function (args) {
    /*const actorId = Math.trunc(args.actorId);
        const history: ActorHistory = $gameSystem.historyManager().getActorHistory(actorId);
        history.onDayStart($gameSystem.day());*/
  });
  PluginManager.registerCommand(pluginName, "Nakadashi", function (args) {
    if ($gameSystem.isRecollection()) {
      return;
    }
    var actorId = Math.trunc(args.actorId);
    var value = Math.trunc(args.value);
    var history = $gameSystem.historyManager().getActorHistory(actorId);
    var s = history.lastHistory().lastSexSchedule();
    if (!s) {
      console.error("中出し回数を増やすことができません");
      console.error(history.lastHistory());
      return;
    }
    s.setNakadashi(value);
  });
  PluginManager.registerCommand(pluginName, "SaveCostune", function (args) {
    if ($gameSystem.isRecollection()) {
      return;
    }
    var actorId = Math.trunc(args.actorId);
    var faceIds = (args.faceId + "").split(",");
    var faceId;
    //if (faceIds.length > 0) {
    var dice = Math.randomInt(faceIds.length);
    faceId = parseInt(faceIds[dice]);
    var actor = $gameActors.actor(actorId);
    if (actor.getDefaultFaceId() > 1) {
      faceId = actor.getDefaultFaceId();
    }
    /*}
        else {
            faceId = Math.trunc(args.faceId);
        }*/
    var hoppeId = Math.trunc(args.hoppeId);
    if (actor.getDefaultHoppeId() > hoppeId) {
      hoppeId = actor.getDefaultHoppeId();
    }
    var history = $gameSystem.historyManager().getActorHistory(actorId);
    //p('saveCostume:' + actorId + ' outer:' + actor.outerId)
    history.lastHistory().saveCostume(faceId, hoppeId);
  });
  PluginManager.registerCommand(pluginName, "MankoHenkei", function (args) {
    var mankoId = Math.trunc(args.mankoId);
    p("おまんこ変形:" + mankoId);
    for (var actorId = 1; actorId <= 12; actorId++) {
      var h = $gameActors.actor(actorId).getLastHistory();
      if (!h) {
        continue;
      }
      var n = henkeiOfNakadashi(mankoId);
      var current = h.mankoImageCount();
      p(actorId + ":" + (n - current));
      h.addSchedule(ScheduleType.NAKADASHI, n - current);
    }
  });
  PluginManager.registerCommand(pluginName, "AnalHenkei", function (args) {
    var analId = Math.trunc(args.analId);
    p("アナル変形:" + analId);
    for (var actorId = 1; actorId <= 12; actorId++) {
      var h = $gameActors.actor(actorId).getLastHistory();
      if (!h) {
        continue;
      }
      var n = henkeiOfAnal(analId);
      h.addSchedule(ScheduleType.ANAL, n);
    }
  });
  function henkeiOfNakadashi(henkei) {
    if (henkei <= 1) {
      return 0;
    }
    return MANKO_ID_LIST[henkei - 1];
  }
  function henkeiOfAnal(henkei) {
    if (henkei == 0) {
      return 0;
    }
    return ANAL_ID_LIST[henkei];
  }
  PluginManager.registerCommand(pluginName, "Acme", function (args) {
    var value = $gameVariables.value(Nore.ACME_VAR);
    var actorId = $gameSystem.chokyoActorId();
    p("actor" + actorId + " に絶頂回数" + value + "加算");
    $gameActors
      .actor(actorId)
      .getLastHistory()
      .addSchedule(ScheduleType.ACME, value);
  });
  PluginManager.registerCommand(pluginName, "LastAcme", function (args) {
    if ($gameSystem.isRecollection()) {
      //return;
    }
    var actorId = Math.trunc(args.actorId);
    var value = Math.trunc(args.value);
    var history = $gameSystem.historyManager().getActorHistory(actorId);
    var s = history.lastHistory().lastSexSchedule();
    p("acme:" + value);
    if (!s) {
      console.error("アクメ回数を増やすことができません");
      console.error(history.lastHistory());
      return;
    }
    s.setAcme(value);
  });
  PluginManager.registerCommand(pluginName, "RegisterEvent", function (args) {
    if ($gameSystem.isRecollection()) {
      return;
    }
    var actorId = Math.trunc(args.actorId);
    var commonId = Math.trunc(args.commonId);
    var history = $gameSystem.historyManager().getActorHistory(actorId);
    var imageId = choiceEroImage(args.imageId, history);
    history.lastHistory().registerEvent(commonId, imageId);
  });
  PluginManager.registerCommand(pluginName, "Ninshin", function (args) {
    var actorId = Math.trunc(args.actorId);
    var taneoyaId = Math.trunc(args.taneoyaId);
    var h = $gameActors.actor(actorId).getLastHistory();
    h.addSchedule(ScheduleType.NINSHIN, taneoyaId);
  });
  PluginManager.registerCommand(pluginName, "Syusan", function (args) {
    var actorId = Math.trunc(args.actorId);
    var actor = $gameActors.actor(actorId);
    var h = actor.getLastHistory();
    var taneoyaType = actor.getActorHistory().lastNinshinTaneoyaType();
    p("出産:" + actorId + " taneoya:" + taneoyaType);
    h.addSchedule(ScheduleType.SYUSAN, taneoyaType);
    //h.onDayEnd();
    //$gameActors.actor(actorId).getActorHistory().onDayStart($gameSystem.day());
    $gameSystem.plusAdditionalDay();
    $gameSystem.historyManager().onDayEnd();
    $gameSystem.nextDay();
    $gameSystem.historyManager().onDayStart();
  });
  PluginManager.registerCommand(
    pluginName,
    "RegisterSchedule",
    function (args) {
      /*if ($gameSystem.isRecollection()) {
            return;
        }*/
      //p('RegisterSchedule');
      //p(args)
      var actorId = Math.trunc(args.actorId);
      var value = Math.trunc(args.value);
      var scheduleId = args.scheduleId;
      if (!isValidSchedule(scheduleId)) {
        console.error("scheduleId が不正です:" + scheduleId);
        return;
      }
      var actorHistory = $gameSystem.historyManager().getActorHistory(actorId);
      var history = actorHistory.lastHistory();
      var variance = Math.trunc(args.variance);
      if (isNaN(variance)) {
        variance = 0;
      }
      if (variance > 0) {
        value += Math.randomInt(variance);
      }
      var isEroUp = true;
      if (actorId == 6 && !$gameSwitches.value(962)) {
        isEroUp = false;
      }
      if (scheduleId == ScheduleType.SYUSAN) {
        //value = actorHistory.countSyusan($gameSystem.day()) + 1;
        history.onSyusan();
      }
      //p('registerCommand:' + scheduleId + ' ' + value)
      switch (scheduleId) {
        case "tanetsuke":
          registerSchedule(history, scheduleId, value);
          if (isEroUp) {
            registerSchedule(
              history,
              ScheduleType.MANKO_ERO,
              Math.trunc(value / 2)
            );
          }
          break;
        case "toilet_anal":
          for (var i = 0; i < value; i++) {
            var value1 = Math.randomInt(3) + 4;
            registerSchedule(history, scheduleId, value1);
            if (isEroUp) {
              registerSchedule(
                history,
                ScheduleType.ANAL_ERO,
                Math.trunc(value1 / 4)
              );
            }
          }
          break;
        case "fela_gokkun":
          for (var i = 0; i < value; i++) {
            var value1 = Math.randomInt(6) + 5;
            registerSchedule(history, scheduleId, value1);
          }
          break;
        case "ninshin":
          var ninshinCount = actorHistory.countNinshin() + 1;
          registerSchedule(history, scheduleId, ninshinCount);
          break;
        default:
          registerSchedule(history, scheduleId, value);
      }
    }
  );
  PluginManager.registerCommand(pluginName, "Tanetsuke", function (args) {
    /*if ($gameSystem.isRecollection()) {
            return;
        }*/
    var actorId = Math.trunc(args.actorId);
    var manId = Math.trunc(args.manId);
    var value = Math.trunc(args.value);
    var variance = Math.trunc(args.variance);
    if (isNaN(variance)) {
      variance = 0;
    }
    if (variance > 0) {
      value += Math.randomInt(variance);
    }
    var actorHistory = $gameSystem.historyManager().getActorHistory(actorId);
    var history = actorHistory.lastHistory();
    var before = actorHistory.countNinshinRate($gameSystem.day());
    p("before:" + before);
    p("種付け:" + value);
    registerSchedule(history, ScheduleType.TANETSUKE, value);
    registerSchedule(history, ScheduleType.MANKO_ERO, Math.trunc(value / 2));
    var after = actorHistory.countNinshinRate($gameSystem.day());
    p("after:" + after);
    if (before < 100 && after >= 100) {
      p("妊娠: 種親" + manId);
      registerSchedule(history, ScheduleType.NINSHIN, manId);
      $gameSystem
        .timelineManager()
        .push(new TimelineItem(TimelineType.NINSHIN, 0, actorId));
    }
  });
  PluginManager.registerCommand(pluginName, "Obedience", function (args) {
    var actorId = Math.trunc(args.actorId);
    var value = Math.trunc(args.value);
    if (value == 0) {
      value = 5;
    }
    var actorHistory = $gameSystem.historyManager().getActorHistory(actorId);
    var history = actorHistory.lastHistory();
    registerSchedule(history, ScheduleType.OBEDIENCE, value);
  });
  PluginManager.registerCommand(pluginName, "Nasty", function (args) {
    var actorId = Math.trunc(args.actorId);
    var value = Math.trunc(args.value);
    if (value == 0) {
      value = 5;
    }
    var actorHistory = $gameSystem.historyManager().getActorHistory(actorId);
    var history = actorHistory.lastHistory();
    registerSchedule(history, ScheduleType.NASTY, value);
  });
  PluginManager.registerCommand(pluginName, "SkillPoint", function (args) {
    var actorId = Math.trunc(args.actorId);
    var value = Math.trunc(args.value);
    if (value == 0) {
      value = $gameActors.actor(actorId).calcNikubenkiMinSkillPoint();
    }
    var actorHistory = $gameSystem.historyManager().getActorHistory(actorId);
    var history = actorHistory.lastHistory();
    registerSchedule(history, ScheduleType.SKILL_POINT, value);
  });
  PluginManager.registerCommand(pluginName, "NinshinDamage", function (args) {
    var actorId = Math.trunc(args.actorId);
    var value = Math.trunc(args.value);
    var actorHistory = $gameSystem.historyManager().getActorHistory(actorId);
    var history = actorHistory.lastHistory();
    registerSchedule(history, ScheduleType.NINSHIN_DAMAGE, value);
  });
})(Nore || (Nore = {}));
var SYUSAN_BOBNUS = 50;
var EroStatusId;
(function (EroStatusId) {
  EroStatusId["NIKUBENKI"] = "nikubenki";
  EroStatusId["RAPE"] = "rape";
  EroStatusId["NAKADASHI"] = "nakadashi";
  EroStatusId["ANAL"] = "anal";
  EroStatusId["ACME"] = "acme";
  EroStatusId["ACME_MANKO"] = "acme_manko";
  EroStatusId["ACME_ANAL"] = "acme_anal";
  EroStatusId["FELA"] = "fela";
  EroStatusId["MANKO_ERO"] = "manko_ero";
  EroStatusId["ANAL_ERO"] = "anal_ero";
  EroStatusId["FELA_GOKKUN"] = "fela_gokkun";
  EroStatusId["NINSHIN"] = "ninshin";
  EroStatusId["NINSHIN_BANZOKU"] = "ninshin_banzoku";
  EroStatusId["SYUSAN"] = "syusan";
  EroStatusId["SYUSAN_BANZOKU"] = "syusan_banzoku";
  EroStatusId["SYUSAN_GOBLIN"] = "syusan_goblin";
  EroStatusId["SYUSAN_VAGRANT"] = "syusan_vagrant";
  EroStatusId["SYUSAN_GRAY"] = "syusan_gray";
  EroStatusId["SYUSAN_CHARLES"] = "syusan_charles";
  EroStatusId["SYUSAN_MINISTER"] = "syusan_minister";
  EroStatusId["SYUSAN_LOLI"] = "syusan_loli";
  EroStatusId["SYUSAN_BAR"] = "syusan_bar";
  EroStatusId["ANAL_ACME"] = "anal_acme";
  EroStatusId["SLAVE_END"] = "slave_end";
  EroStatusId["BATTLE"] = "battle";
  EroStatusId["BAISYUN"] = "baisyun";
  EroStatusId["BAISYUN_PERSON"] = "baisyun_person";
  EroStatusId["SKILL_POINT"] = "skill_point";
  EroStatusId["NINSHIN_DAMAGE"] = "ninshin_damage";
  EroStatusId["OBEDIENCE"] = "obedience";
  EroStatusId["NASTY"] = "nasty";
  EroStatusId["DAIJIN"] = "daijin";
  EroStatusId["CHIMPO_ERO"] = "chimpo_ero";
  EroStatusId["CHICHI"] = "chichi";
  EroStatusId["CRYSTAL"] = "crystal";
  EroStatusId["TOILET"] = "toilet";
})(EroStatusId || (EroStatusId = {}));
function isValidSchedule(id) {
  for (var i in ScheduleType) {
    if (ScheduleType[i] == id) {
      return true;
    }
  }
  return false;
}
var HistoryText = /** @class */ (function () {
  function HistoryText(text, type) {
    this._text = text;
    this._type = type;
  }
  HistoryText.prototype.text = function () {
    return this._text;
  };
  HistoryText.prototype.priority = function () {
    switch (this._type) {
      case ScheduleType.NINSHIN:
        return 100;
      case ScheduleType.KYOSEI_NINSHIN:
        return 100;
    }
    return 1;
  };
  return HistoryText;
})();
var DayEvent = /** @class */ (function () {
  function DayEvent(actorId) {
    this._scheduleList = [];
    this._actorId = actorId;
  }
  DayEvent.prototype.actorId = function () {
    return this._actorId;
  };
  DayEvent.prototype.addSchedule = function (schedule) {
    this._scheduleList.push(schedule);
  };
  DayEvent.prototype.getScheduleList = function () {
    return this._scheduleList;
  };
  DayEvent.prototype.isVisible = function () {
    for (var _i = 0, _a = this._scheduleList; _i < _a.length; _i++) {
      var s = _a[_i];
      if (s.isVisible()) {
        return true;
      }
    }
    return false;
  };
  DayEvent.prototype.findSchedule = function (scheduleId) {
    for (var _i = 0, _a = this._scheduleList; _i < _a.length; _i++) {
      var s = _a[_i];
      if (s.type() == scheduleId) {
        return s;
      }
    }
    return null;
  };
  DayEvent.prototype.countSchedule = function (type) {
    var n = 0;
    for (var _i = 0, _a = this._scheduleList; _i < _a.length; _i++) {
      var s = _a[_i];
      if (s.type() == type) {
        n++;
      }
    }
    return n;
  };
  DayEvent.prototype.countTotal = function (id) {
    var n = 0;
    for (var _i = 0, _a = this._scheduleList; _i < _a.length; _i++) {
      var s = _a[_i];
      n += s.countTotal(id);
    }
    return n;
  };
  DayEvent.prototype.hasType = function (type) {
    for (var _i = 0, _a = this._scheduleList; _i < _a.length; _i++) {
      var s = _a[_i];
      if (s.type() == type) {
        return true;
      }
    }
    return false;
  };
  DayEvent.prototype.lastSchedule = function () {
    for (var i = this._scheduleList.length - 1; i >= 0; i--) {
      var s = this._scheduleList[i];
      if (s.countNakadashi() > 0 || s.countAnal() > 0) {
        return s;
      }
    }
    return null;
  };
  DayEvent.prototype.lastSexSchedule = function () {
    for (var i = this._scheduleList.length - 1; i >= 0; i--) {
      var schedule = this._scheduleList[i];
      if (schedule.isSexType()) {
        return schedule;
      }
    }
    return null;
  };
  DayEvent.prototype.getDungeonType = function () {
    for (var _i = 0, _a = this._scheduleList; _i < _a.length; _i++) {
      var s = _a[_i];
      if (s.type() == ScheduleType.BATTLE) {
        return s.value();
      }
    }
    return -1;
  };
  DayEvent.prototype.textList = function (isShort) {
    var list = [];
    for (var _i = 0, _a = this._scheduleList; _i < _a.length; _i++) {
      var s = _a[_i];
      var text = this.getTextByType(s.type(), s, isShort);
      if (text) {
        var textList = text.split("\n");
        if (textList.length > 1) {
          list.push(new HistoryText(textList[0], s.type()));
          list.push(new HistoryText(textList[1], s.type()));
        } else {
          list.push(new HistoryText(text, s.type()));
        }
      }
    }
    return list;
  };
  DayEvent.prototype.isLostVirgin = function () {
    for (var _i = 0, _a = this._scheduleList; _i < _a.length; _i++) {
      var s = _a[_i];
      if (s.isLostVirgin()) {
        return true;
      }
    }
    return false;
  };
  DayEvent.prototype.getTextByType = function (type, s, isShort) {
    if (isShort === void 0) {
      isShort = false;
    }
    switch (type) {
      //case ScheduleType.DEFEAT: return TextManager.historyDefeat;
      //case ScheduleType.RETURN: return TextManager.historyReturn;
      case ScheduleType.LOST_VIRGIN:
        return TextManager.historyLostVirgin;
      case ScheduleType.OPENING:
        return TextManager.historyOpening;
      //case ScheduleType.NINSHIN: return TextManager.historyNinshin;
      case ScheduleType.NINSHIN_DETECTION:
        return TextManager.historyNinshin;
      case ScheduleType.CAPTURED:
      case ScheduleType.CAPTIVE:
      case ScheduleType.KYOSEI_NINSHIN:
      case ScheduleType.ACCE_ON:
      case ScheduleType.MANKO_CHECK:
      case ScheduleType.SYUSAN:
      case ScheduleType.BAISYUN:
      case ScheduleType.SEX_TO1:
      case ScheduleType.SEX_TO3:
      case ScheduleType.SEX_TO7:
      case ScheduleType.SEX_TO1_AND_3:
      case ScheduleType.FELA_BY1:
      case ScheduleType.FELA_TO7:
      case ScheduleType.TANETSUKE:
      case ScheduleType.TOILET_ANAL:
      case ScheduleType.TANETSUKE_DAIJIN:
      case ScheduleType.CHICHI:
        return s.text(isShort);
      case ScheduleType.ANAL:
        //if (this._actorId == 7) {
        return s.text(isShort);
        //}
        break;
    }
    return null;
  };
  DayEvent.prototype.detailText = function () {
    var actor = $gameActors.actor(this.actorId());
    var result = "";
    var crystal = this.countTotal(EroStatusId.CRYSTAL);
    if (crystal > 0) {
      result += TextManager.timelineGetCrystal + "+%1 ".format(crystal) + " ";
    }
    if (this.countChichi() > 0) {
      result += TextManager.timelineGetChichi + " ";
    }
    if (this.isNinshin()) {
      result += TextManager.timelineNinshin + " ";
    }
    if (this.isSyusan()) {
      result += TextManager.timelineSyusan;
    }
    var nakadashi = this.countNakadashi();
    if (nakadashi > 0) {
      result += getEroParamTitle("nakadashi") + "+%1 ".format(nakadashi);
    }
    var anal = this.countTotal(EroStatusId.ANAL);
    if (anal > 0) {
      result += getEroParamTitle("anal") + "+%1 ".format(anal);
    }
    var skillPoint = this.countSkillPoint();
    if (skillPoint > 0) {
      result += "SP+%1 ".format(skillPoint);
    }
    /*const ob = this.countTotal(EroStatusId.OBEDIENCE);
        if (ob > 0) {
            result += '服従度上昇 '.format(ob);
        }*/
    var nasty = this.countTotal(EroStatusId.NASTY);
    if (nasty > 0) {
      result += "%1 UP ".format(actor.nastyText());
    }
    return result;
  };
  DayEvent.prototype.isNinshin = function () {
    return this.hasSchedule(ScheduleType.NINSHIN);
  };
  DayEvent.prototype.countNakadashi = function () {
    return this.countTotal(EroStatusId.NAKADASHI);
  };
  DayEvent.prototype.countChichi = function () {
    return this.countTotal(EroStatusId.CHICHI);
  };
  DayEvent.prototype.countAnal = function () {
    return this.countTotal(EroStatusId.ANAL);
  };
  DayEvent.prototype.countFela = function () {
    return this.countTotal(EroStatusId.FELA);
  };
  DayEvent.prototype.countSkillPoint = function () {
    return this.countTotal(EroStatusId.SKILL_POINT);
  };
  DayEvent.prototype.isSyusan = function () {
    return this.hasSchedule(ScheduleType.SYUSAN);
  };
  DayEvent.prototype.isSlave = function () {
    if (this.hasSchedule(ScheduleType.SLAVE_END)) {
      return false;
    }
    if (this.hasSchedule(ScheduleType.SLAVE)) {
      return true;
    }
    return this._slave;
  };
  DayEvent.prototype.isSlaveEnd = function () {
    if (this.hasSchedule(ScheduleType.SLAVE_END)) {
      return true;
    }
    return false;
  };
  DayEvent.prototype.hasSchedule = function (scheduleId) {
    return this.findSchedule(scheduleId) != null;
  };
  DayEvent.prototype.countAcme = function () {
    return this.countTotal(EroStatusId.ACME);
  };
  DayEvent.prototype.gainMilk = function () {
    var result = [];
    for (var _i = 0, _a = this._scheduleList; _i < _a.length; _i++) {
      var s = _a[_i];
      result = result.concat(s.gainMilk());
    }
    return result;
  };
  DayEvent.prototype.milk = function () {
    var result = [];
    for (var _i = 0, _a = this._scheduleList; _i < _a.length; _i++) {
      var s = _a[_i];
      result = result.concat(s.milk());
    }
    return result;
  };
  DayEvent.prototype.lastNakadashiType = function () {
    for (var _i = 0, _a = this._scheduleList; _i < _a.length; _i++) {
      var s = _a[_i];
      if (s.lastNakadashiType() > 0) {
        var actorId = s.lastNakadashiType();
        var actor = $gameActors.actor(actorId);
        return parseInt(actor.actor().meta["taneoyaType"]);
      }
    }
    return 0;
  };
  return DayEvent;
})();
var DayHistory = /** @class */ (function () {
  function DayHistory(day, actorId, before) {
    this._imageId = "";
    this._commonEventId = 0;
    this._release = false;
    this._endChokyo = false;
    this._seiekiImageId = -1;
    this._nikubenki = false;
    this._day = day;
    this._actorId = actorId;
    //this._totalTrainingDay = 0;
    this._eventList = [new DayEvent(actorId)];
    this.saveBote();
    this.saveBeforeHistory(before);
    this.saveCostumeAuto();
    this.incrementTrainingDay();
  }
  DayHistory.prototype.nextEvent = function () {
    this._eventList.push(new DayEvent(this._actorId));
  };
  DayHistory.prototype.getEventList = function () {
    return this._eventList;
  };
  DayHistory.prototype.getDayEvent = function (index) {
    return this._eventList[index];
  };
  DayHistory.prototype.getCurrentEventIndex = function () {
    return this._eventList.length - 1;
  };
  DayHistory.prototype.getCurrentEvent = function () {
    return this._eventList[this._eventList.length - 1];
  };
  DayHistory.prototype.saveBeforeHistory = function (before) {
    if (!before) {
      return;
    }
    if (before && before.day() == this._day) {
      console.error("日付がすすんでいません");
      console.trace();
    }
    this._releaseChance = 0;
    this._boteGrowupValue = 0;
    if (this._boteId >= 1) {
      this._boteGrowupValue =
        before.boteGrowupValue() + this.upBoteGrowupValue();
    } else {
      if (before) {
        this._boteGrowupValue = before.boteGrowupValue();
      }
    }
  };
  DayHistory.prototype.isVisible = function () {
    if (this.getMainText()) {
      return true;
    }
    for (var _i = 0, _a = this._eventList; _i < _a.length; _i++) {
      var s = _a[_i];
      if (s.isVisible()) {
        return true;
      }
    }
    return false;
  };
  DayHistory.prototype.getBefore = function () {
    return this.actor()
      .getActorHistory()
      .getHistory(this._day - 1);
  };
  DayHistory.prototype.saveBote = function () {
    this._boteId = this.actor().boteId;
  };
  DayHistory.prototype.boteGrowupValue = function () {
    return this._boteGrowupValue || 0;
  };
  DayHistory.prototype.upBoteGrowupValue = function () {
    return 50;
  };
  DayHistory.prototype.upReleaseChance = function () {
    return 30;
  };
  DayHistory.prototype.releaseChance = function () {
    return this._releaseChance;
  };
  DayHistory.prototype.incrementTrainingDay = function () {
    if (!this.isCaptive()) {
      return;
    }
    var actor = $gameActors.actor(this._actorId);
    p("incrementChokyoCount:" + actor.actorId());
    var vId = 200 + actor.actorId();
    var n = $gameVariables.value(vId);
    $gameVariables.setValue(vId, n + 1);
    /*
        if (this._captiveDay >= 2) {
            this._totalTrainingDay++;
        }*/
  };
  DayHistory.prototype.saveCostumeAuto = function () {
    this._costume = new CostumeSaver(this._actorId);
    if (this._nikubenki) {
      this._costume.saveFace(4, 1);
    } else {
      this._costume.saveFace(1, 0);
    }
  };
  DayHistory.prototype.setNikubenki = function () {
    this._nikubenki = true;
  };
  DayHistory.prototype.setRoomNikubenki = function () {};
  DayHistory.prototype.isSyusan = function () {
    for (var _i = 0, _a = this._eventList; _i < _a.length; _i++) {
      var s = _a[_i];
      if (s.isSyusan()) {
        return true;
      }
    }
    return false;
  };
  DayHistory.prototype.isSlave = function () {
    for (var _i = 0, _a = this._eventList; _i < _a.length; _i++) {
      var s = _a[_i];
      if (s.isSlave()) {
        return true;
      }
    }
    return false;
  };
  DayHistory.prototype.isMankoChanged = function () {
    var actorHistory = $gameSystem
      .historyManager()
      .getActorHistory(this._actorId);
    var before = actorHistory.getHistory(this._day - 1);
    if (!before) {
      return true;
    }
    if (this.countTotal(EroStatusId.NAKADASHI) == 0) {
      return false;
    }
    return true;
  };
  DayHistory.prototype.day = function () {
    return this._day;
  };
  DayHistory.prototype.totalTrainingDay = function () {
    return $gameVariables.value(200 + this._actorId);
    //return this._totalTrainingDay;
  };
  DayHistory.prototype.addSchedule = function (id, value, eroUpKey) {
    var s = new Schedule(this._actorId, this._day, id, value, null, eroUpKey);
    this.getLastEvent().addSchedule(s);
    return s;
  };
  DayHistory.prototype.getLastEvent = function () {
    return this._eventList[this._eventList.length - 1];
  };
  DayHistory.prototype.findSchedule = function (scheduleId) {
    for (var _i = 0, _a = this._eventList; _i < _a.length; _i++) {
      var e = _a[_i];
      var s = e.findSchedule(scheduleId);
      if (s) {
        return s;
      }
    }
    return null;
  };
  DayHistory.prototype.isCaptive = function () {
    return this._nikubenki;
  };
  DayHistory.prototype.isNikubenki = function () {
    return this._nikubenki;
  };
  DayHistory.prototype.release = function () {
    this._release = true;
  };
  DayHistory.prototype.isRelease = function () {
    if (this.isSlaveEnd()) {
      return true;
    }
    return this._release;
  };
  DayHistory.prototype.actorId = function () {
    return this._actorId;
  };
  DayHistory.prototype.babyList = function () {
    var babyList = [];
    var list = this.getActorHistory().getHistoryList();
    for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
      var history_2 = list_1[_i];
      if (this._day >= 0 && history_2.day() > this._day) {
        break;
      }
      for (var _a = 0, _b = history_2.getEventList(); _a < _b.length; _a++) {
        var event_1 = _b[_a];
        for (var _c = 0, _d = event_1.getScheduleList(); _c < _d.length; _c++) {
          var s = _d[_c];
          if (s.countSyusan() > 0) {
            var syusan = new Nore.SyusanInfo(s);
            babyList.push(syusan);
          }
        }
      }
    }
    var index = 0;
    for (var _e = 0, list_2 = list; _e < list_2.length; _e++) {
      var history_3 = list_2[_e];
      for (var _f = 0, _g = history_3.getEventList(); _f < _g.length; _f++) {
        var event_2 = _g[_f];
        for (var _h = 0, _j = event_2.getScheduleList(); _h < _j.length; _h++) {
          var s = _j[_h];
          if (s.countNinshin() > 0) {
            var syusan = babyList[index];
            if (!syusan) {
              break;
            }
            syusan.ninshin = history_3;
            syusan.ninshinSchedule = s;
            index++;
          }
        }
      }
    }
    return babyList;
  };
  DayHistory.prototype.countNakadashi = function () {
    return this.countTotal(EroStatusId.NAKADASHI);
  };
  DayHistory.prototype.countAnal = function () {
    return this.countTotal(EroStatusId.ANAL);
  };
  DayHistory.prototype.countTotal = function (id) {
    var n = 0;
    for (var _i = 0, _a = this._eventList; _i < _a.length; _i++) {
      var s = _a[_i];
      n += s.countTotal(id);
    }
    return n;
  };
  DayHistory.prototype.countSchedule = function (type) {
    var n = 0;
    for (var _i = 0, _a = this._eventList; _i < _a.length; _i++) {
      var e = _a[_i];
      n += e.countSchedule(type);
    }
    return n;
  };
  DayHistory.prototype.textList = function (isShort) {
    if (isShort === void 0) {
      isShort = false;
    }
    var list = [];
    var mainText = this.getMainText();
    if (mainText) {
      list.push(mainText);
    }
    for (var _i = 0, _a = this._eventList; _i < _a.length; _i++) {
      var e = _a[_i];
      list = list.concat(e.textList(isShort));
    }
    return list;
  };
  DayHistory.prototype.getMainText = function () {
    var key = this._actorId + "_" + this._commonEventId;
    var params = ERO_PARAMS[key];
    if (!params) {
      return null;
    }
    if (!TextManager[params.text]) {
      return null;
    }
    return new HistoryText(TextManager[params.text], ScheduleType.TEXT);
  };
  DayHistory.prototype.getChimpo = function () {
    var key = this._actorId + "_" + this._commonEventId;
    var params = ERO_PARAMS[key];
    if (!params) {
      return null;
    }
    switch (params.man) {
      case "蛮族":
        return TaneoyaId.banzoku;
      case "ゴブリン":
        return TaneoyaId.goblin;
      case "浮浪者":
        return TaneoyaId.vagrant;
      case "大臣":
        return TaneoyaId.minister;
      case "シャルル":
        return TaneoyaId.charles;
      case "グレイ":
        return TaneoyaId.gray;
      case "酒場の客":
        return TaneoyaId.bar;
    }
    return null;
  };
  DayHistory.prototype.getDungeonType = function () {
    for (var _i = 0, _a = this._eventList; _i < _a.length; _i++) {
      var e = _a[_i];
      var type = e.getDungeonType();
      if (type > 0) {
        return type;
      }
    }
    return -1;
  };
  DayHistory.prototype.hasType = function (type) {
    for (var _i = 0, _a = this._eventList; _i < _a.length; _i++) {
      var e = _a[_i];
      if (e.hasType(type)) {
        return true;
      }
    }
    return false;
  };
  DayHistory.prototype.onDayStart = function () {};
  DayHistory.prototype.isRaped = function () {
    return this.hasType(ScheduleType.RAPE);
  };
  DayHistory.prototype.onDungeonStart = function () {
    var s = new Schedule(
      this._actorId,
      this._day,
      ScheduleType.BATTLE,
      $gameSystem.stageId()
    );
    this.getLastEvent().addSchedule(s);
  };
  DayHistory.prototype.onMoveToDungeon = function () {
    var s = new Schedule(
      this._actorId,
      this._day,
      ScheduleType.MOVE_DUNGEON,
      $gameSystem.stageId()
    );
    this.getLastEvent().addSchedule(s);
  };
  DayHistory.prototype.onDungeonEnd = function (defeat, isCaptured) {
    var s;
    if (defeat) {
      if (isCaptured) {
        s = new Schedule(
          this._actorId,
          this._day,
          ScheduleType.CAPTURED,
          $gameSystem.stageId()
        );
      } else {
        s = new Schedule(
          this._actorId,
          this._day,
          ScheduleType.DEFEAT,
          $gameSystem.stageId()
        );
      }
    } else {
      s = new Schedule(
        this._actorId,
        this._day,
        ScheduleType.RETURN,
        $gameSystem.stageId()
      );
    }
    this.getLastEvent().addSchedule(s);
  };
  DayHistory.prototype.calcChitsuDamage = function () {
    return this._chitsuDamage;
  };
  DayHistory.prototype.calcAnalDamage = function () {
    return this._analDamage;
  };
  DayHistory.prototype.lastSchedule = function () {
    return this.getLastEvent().lastSchedule();
  };
  DayHistory.prototype.lastSexSchedule = function () {
    return this.getLastEvent().lastSexSchedule();
  };
  DayHistory.prototype.costume = function () {
    return this._costume;
  };
  DayHistory.prototype.saveCostume = function (faceId, hoppeId) {
    if (faceId === void 0) {
      faceId = -1;
    }
    if (hoppeId === void 0) {
      hoppeId = 0;
    }
    this._costume.saveCostume(this._actorId);
    if (faceId > 0) {
      this._costume.saveFace(faceId, hoppeId);
    }
  };
  DayHistory.prototype.isBote = function () {
    var boteId = this._costume.boteId();
    return boteId > 0;
  };
  DayHistory.prototype.boteId = function () {
    var boteId = this._costume.boteId();
    return boteId;
  };
  DayHistory.prototype.registerEvent = function (commonEventId, imageId) {
    this._commonEventId = commonEventId;
    this._imageId = imageId;
  };
  DayHistory.prototype.imageId = function () {
    return this._imageId;
  };
  DayHistory.prototype.endChokyo = function () {
    this._endChokyo = true;
  };
  DayHistory.prototype.isEndChokyo = function () {
    return this._endChokyo;
  };
  DayHistory.prototype.actor = function () {
    return $gameActors.actor(this.actorId());
  };
  DayHistory.prototype.baseImageId = function () {
    var boteId = this._costume.boteId();
    return boteId;
  };
  DayHistory.prototype.seiekiImageId = function () {
    if (this._day == 0) {
      return 0;
    }
    if (this._seiekiImageId > 0) {
      return this._seiekiImageId;
    }
    if (this._actorId == 7) {
      if (this.countAnal() == 0) {
        this._seiekiImageId = 0;
      } else {
        this._seiekiImageId = Math.randomInt(5) + 1;
      }
    } else {
      if (this.countNakadashi() == 0) {
        this._seiekiImageId = 0;
      } else {
        this._seiekiImageId = Math.randomInt(5) + 1;
      }
    }
    return this._seiekiImageId;
  };
  DayHistory.prototype.mankoImageId = function () {
    if (this._actorId == 7) {
      var chimpo = this.getActorHistory().countChimpoEro(this.day());
      //p('chimpo' + chimpo);
      if (chimpo < Nore.CHIMPO_1) {
        return 1;
      }
      if (chimpo < Nore.CHIMPO_2) {
        return 2;
      }
      return 3;
    }
    var mankoEro = this.mankoImageCount();
    if (mankoEro == 0) {
      return 1;
    }
    if (mankoEro <= MANKO_ID_LIST[0]) {
      return 2;
    }
    if (mankoEro <= MANKO_ID_LIST[1]) {
      return 3;
    }
    if (mankoEro <= MANKO_ID_LIST[2]) {
      return 4;
    }
    if (mankoEro <= MANKO_ID_LIST[3]) {
      return 5;
    }
    if (mankoEro <= MANKO_ID_LIST[4]) {
      return 6;
    }
    if (mankoEro <= MANKO_ID_LIST[5]) {
      return 7;
    }
    return 7;
  };
  DayHistory.prototype.mankoImageCount = function () {
    return this.getActorHistory().countMankoEro(this.day());
  };
  DayHistory.prototype.getActorHistory = function () {
    return this.actor().getActorHistory();
  };
  DayHistory.prototype.syusanBonus = function () {
    var actorHistory = this.getActorHistory();
    return actorHistory.countSyusan(this._day) * SYUSAN_BOBNUS;
  };
  DayHistory.prototype.analImageId = function () {
    var analTotal = this.getActorHistory().countAnalEro(this._day);
    if (analTotal == 0) {
      return 1;
    }
    if (analTotal <= ANAL_ID_LIST[1]) {
      return 2;
    }
    if (analTotal <= MANKO_ID_LIST[2]) {
      return 3;
    }
    if (analTotal <= MANKO_ID_LIST[3]) {
      return 4;
    }
    return 5;
  };
  DayHistory.prototype.hasChokyoEvent = function () {
    if (!this.isCaptive()) {
      return false;
    }
    if (this.isRaped()) {
      // 敗北してすぐ
      return false;
    }
    /*if (this.totalTrainingDay() == 1) {
            return true;
        }
        if (this.isNinshinGrowup()) {
            p('isNinshinGrowup')
            return true;
        }
        if (this.isNinshin()) {
            p('isNinshin')
            p(this)
            return true;
        }*/
    return this.getChokyoEventId() > 0;
  };
  DayHistory.prototype.getSlaveEventId = function () {
    switch (this._actorId) {
      case 1:
        return -1;
      case 2:
        return -1;
      case 3:
        return 654;
    }
    return 0;
  };
  DayHistory.prototype.getChokyoEventId = function () {
    if (!this.isCaptive()) {
      return 0;
    }
    if (this.isRaped()) {
      // 敗北してすぐ
      return 0;
    }
    switch (this._actorId) {
      case 1:
        return this.getChokyoEvent1();
      case 2:
        return this.getChokyoEvent2();
      case 3:
        return this.getChokyoEvent3();
      case 4:
        return this.getChokyoEvent4();
      case 5:
        return this.getChokyoEvent5();
      case 6:
        return this.getChokyoEvent6();
      case 7:
        return this.getChokyoEvent7();
      case 10:
        return this.getChokyoEvent10();
      case 12:
        return this.getChokyoEvent12();
      /*case 3: return this.getChokyoEvent3();
            case 5: return this.getChokyoEvent5();
            case 6: return this.getChokyoEvent6();*/
    }
    return 0;
  };
  DayHistory.prototype.getVagrantRoomChokyoId = function () {
    switch (this._actorId) {
      case 1:
        return 625;
      case 2:
        return 692;
      case 4:
        return 733;
      case 5:
        return 1788;
      case 6:
        return 775;
      case 10:
        return 1717;
      case 12:
        return 1755;
    }
    console.error("getVagrantRoomChokyoId: " + this._actorId);
    return 0;
  };
  DayHistory.prototype.getGoblinRoomChokyoId = function () {
    switch (this._actorId) {
      case 1:
        return 632;
      case 2:
        return 694;
      case 4:
        return 738;
      case 5:
        return 1792;
      case 6:
        return 779;
      case 10:
        return 1713;
      case 12:
        return 1758;
    }
    console.error("getGoblinRoomChokyoId: " + this._actorId);
    return 0;
  };
  DayHistory.prototype.getCharlesRoomChokyoId = function () {
    switch (this._actorId) {
      case 1:
        return 271;
      case 3:
        return 273;
    }
    console.error("getCharlesRoomChokyoId: " + this._actorId);
    return 0;
  };
  DayHistory.prototype.getChichiRoomChokyoId = function () {
    switch (this._actorId) {
      case 1:
        return 1046;
      case 2:
        return 1312;
      case 3:
        return 1354;
      case 4:
        return 1058;
      case 5:
        return 1801;
      case 6:
        return 1076;
      case 7:
        return 982;
      case 10:
        return 1017;
      case 12:
        return 1035;
    }
    console.error("getChichiRoomChokyoId: " + this._actorId);
    return 0;
  };
  DayHistory.prototype.getMinisterRoomChokyoId = function () {
    switch (this._actorId) {
      case 1:
        return 629;
      case 3:
        return 650;
    }
    console.error("getMinisterRoomChokyoId: " + this._actorId);
    return 0;
  };
  DayHistory.prototype.getGrayRoomChokyoId = function () {
    switch (this._actorId) {
      case 2:
        return 699;
      case 5:
        return 1770;
    }
    console.error("getGrayRoomChokyoId: " + this._actorId);
    return 0;
  };
  DayHistory.prototype.getBanzokuRoomChokyoId = function () {
    switch (this._actorId) {
      case 1:
        return 620;
      case 2:
        return 690;
      case 4:
        return 727;
      case 5:
        return 1796;
      case 6:
        return 769;
      case 7:
        return 597;
      case 10:
        return 1707;
      case 12:
        return 1748;
    }
    return 0;
  };
  DayHistory.prototype.getBanzokuRoomChokyoEvent3 = function () {
    console.error("ミオリは蛮族の部屋に設定できません");
    return 0;
    //return 660;
  };
  DayHistory.prototype.getBaisyunEventId = function () {
    switch (this._actorId) {
      case 3:
        return this.getBaisyunEvent3();
      /*case 3: return this.getChokyoEvent3();
            case 5: return this.getChokyoEvent5();
            case 6: return this.getChokyoEvent6();*/
    }
    return 0;
  };
  DayHistory.prototype.getBaisyunEvent3 = function () {
    if (!$gameSwitches.value(932)) {
      // 初回
      return 655;
    }
    var n = this.getActorHistory().countBaisyun();
    if (n >= 5) {
      if (!$gameSwitches.value(657)) {
        // 初回
        return 657;
      }
    }
    return 0;
  };
  DayHistory.prototype.canBaisyun = function () {
    return this.getActorHistory().countSlaveEnd(this._day) >= 1;
  };
  DayHistory.prototype.getChokyoEvent1 = function () {
    var chokyoCount = $gameVariables.value(201);
    if (chokyoCount == 1) {
      // 初日
      return 600;
    }
    if (chokyoCount == 2) {
      return 606;
    }
    return 610;
    return -1;
  };
  DayHistory.prototype.getChokyoEvent2 = function () {
    if ($gameSystem.isTaikenban()) {
      $gameVariables.setValue(202, 0);
      return 800;
    }
    var chokyoCount = $gameVariables.value(202);
    if (chokyoCount == 1) {
      // 強制妊娠後
      return 681;
    }
    return 683;
    if (this.isNinshinGrowup()) {
      return 685;
    }
    if (this.canSyusan()) {
      return 686;
    }
    if (this.mankoImageId() >= 5) {
      if (!$gameSwitches.value(927)) {
        // ラビアピアス
        return 684;
      }
    }
    return -1;
  };
  DayHistory.prototype.getChokyoEvent3 = function () {
    var history = this.actor().getActorHistory();
    var chokyoCount = $gameVariables.value(203);
    if (chokyoCount == 1) {
      // 初日
      return 931;
    }
    if (this.actor().boteId > 0) {
      // ボテ腹
      return 938;
    }
    if (chokyoCount == 2) {
      if ($gameSystem.isTaikenban()) {
        $gameVariables.setValue(203, 1);
        return 800;
      }
      // 2回目
      return 935;
    }
    if (chokyoCount == 3) {
      // 3回目
      return 939;
    }
    if (chokyoCount == 4) {
      // 4回目
      return 936;
    }
    if (chokyoCount == 5) {
      // 5回目
      return 933;
    }
    if (chokyoCount == 6) {
      // 6回目
      return 932;
    }
    // 汎用H
    return 1343;
  };
  DayHistory.prototype.getChokyoEvent4 = function () {
    var chokyoCount = $gameVariables.value(204);
    if (chokyoCount == 1) {
      // 初日
      return 721;
    }
    if (chokyoCount == 2) {
      return 722;
    }
    if (chokyoCount == 3) {
      return 723;
    }
    return 725;
  };
  DayHistory.prototype.getChokyoEvent5 = function () {
    var chokyoCount = $gameVariables.value(205);
    if (chokyoCount == 1) {
      // 初日
      return 1781;
    }
    if (chokyoCount == 2) {
      return 1782;
    }
    if (chokyoCount == 3) {
      return 1783;
    }
    return 1785;
  };
  DayHistory.prototype.getChokyoEvent6 = function () {
    var chokyoCount = $gameVariables.value(206);
    if (chokyoCount == 1) {
      // 初日
      return 761;
    }
    if (chokyoCount == 2) {
      return 762;
    }
    if (chokyoCount == 3) {
      return 763;
    }
    if (chokyoCount == 4) {
      return 764;
    }
    return 765;
  };
  DayHistory.prototype.getChokyoEvent7 = function () {
    var chokyoCount = $gameVariables.value(207);
    if (chokyoCount == 1) {
      // 初日
      return 972;
    }
    if (chokyoCount == 2) {
      if ($gameSystem.isFreeTaikenban()) {
        $gameVariables.setValue(207, 1);
        return 800;
      }
      return 980;
    }
    if (!$gameSwitches.value(978)) {
      if ($gameSystem.isTaikenban()) {
        $gameVariables.setValue(207, 2);
        return 800;
      }
      return 978;
    }
    if (!$gameSwitches.value(1086)) {
      return 1086;
    }
    return 596;
  };
  /**
   * リン
   */
  DayHistory.prototype.getChokyoEvent10 = function () {
    var chokyoCount = $gameVariables.value(210);
    if (chokyoCount == 1) {
      // 初日
      return 1702;
    }
    if (chokyoCount == 2) {
      return 1703;
    }
    if (chokyoCount == 3) {
      return 1704;
    }
    return 1704;
  };
  DayHistory.prototype.getChokyoEvent12 = function () {
    var chokyoCount = $gameVariables.value(212);
    if (chokyoCount == 1) {
      // 初日
      return 1741;
    }
    if (chokyoCount == 2) {
      return 1742;
    }
    if (chokyoCount == 3) {
      return 1743;
    }
    return 1745;
  };
  DayHistory.prototype.hasChokyoEvent1 = function () {
    return false;
    //return this.totalTrainingDay() == 5;
  };
  DayHistory.prototype.hasChokyoEvent2 = function () {
    if (this.totalTrainingDay() == 2) {
      // 強制妊娠後
      return true;
    }
    if (this.totalTrainingDay() == 3) {
      // これが初日みたいなもの
      return true;
    }
    if (this.mankoImageId() >= 5) {
      if (!$gameSwitches.value(927)) {
        // ラビアピアス
        return true;
      }
    }
    return false;
  };
  DayHistory.prototype.hasChokyoEvent5 = function () {
    return this.totalTrainingDay() == 3;
  };
  DayHistory.prototype.hasChokyoEvent6 = function () {
    return this.totalTrainingDay() == 3;
  };
  DayHistory.prototype.isNinshinGrowup = function () {
    if (this._boteId >= 2) {
      // すでに妊娠成長
      return false;
    }
    if (this._boteGrowupValue >= 100) {
      return true;
    }
    return false;
  };
  DayHistory.prototype.canSyusan = function () {
    if (this._boteId < 2) {
      return false;
    }
    if (this._boteGrowupValue >= 150) {
      return true;
    }
    return false;
  };
  DayHistory.prototype.isNinshin = function () {
    return this.countTotal(EroStatusId.NINSHIN);
  };
  DayHistory.prototype.isNinshinBanzoku = function () {
    return this.countTotal(EroStatusId.NINSHIN_BANZOKU);
  };
  DayHistory.prototype.isMankoChange = function () {
    if (this.day() == 0) {
      return true;
    }
    if (this.beforeMankoImageId() < this.mankoImageId()) {
      return true;
    }
    return false;
    /*const before = this.getBefore();
        if (before) {
            if (before.isLostVirgin()) {
                return true;
            }
        }
        return false;*/
  };
  DayHistory.prototype.beforeMankoImageId = function () {
    var actorHistory = this.actor().getActorHistory();
    for (var day = this.day() - 1; day >= 1; day--) {
      var h = actorHistory.getHistory(day);
      if (h) {
        return h.mankoImageId();
      }
    }
    return 1;
  };
  DayHistory.prototype.beforeNormalMankoImageId = function () {};
  DayHistory.prototype.isLostVirgin = function () {
    for (var _i = 0, _a = this._eventList; _i < _a.length; _i++) {
      var e = _a[_i];
      if (e.isLostVirgin()) {
        return true;
      }
    }
    return false;
  };
  DayHistory.prototype.countToilet = function () {
    return this.getActorHistory().countToilet(this._day);
  };
  DayHistory.prototype.countSyusan = function () {
    return this.getActorHistory().countSyusan(this._day);
  };
  DayHistory.prototype.hasHesoEarrings = function () {
    return this._costume.hasAcce(1004);
  };
  DayHistory.prototype.hasKubiwa = function () {
    return (
      this._costume.hasAcce(1002) ||
      this._costume.hasAcce(1003) ||
      this._costume.hasAcce(1016)
    );
  };
  DayHistory.prototype.isReleaseChance = function () {
    if (this.isNinshin()) {
      return false;
    }
    if (this.releaseChance() < 100) {
      return false;
    }
    return true;
  };
  DayHistory.prototype.resetReleaseChance = function () {
    this._releaseChance = 0;
  };
  DayHistory.prototype.onDayEnd = function () {};
  DayHistory.prototype.countSkillPoint = function () {
    return this.countTotal(EroStatusId.SKILL_POINT);
  };
  DayHistory.prototype.hasAcce = function (armor) {
    if (armor.id == 1008) {
      // 黒乳首
      return this.costume().isKuroChikubi();
    }
    if (armor.id == 1021) {
      // 出産のタトゥー
      return this.getActorHistory().countSyusan(this._day) >= 1;
    }
    return this._costume.hasAcce(armor.id);
  };
  DayHistory.prototype.onSyusan = function () {
    this._boteGrowupValue = 0;
  };
  DayHistory.prototype.gainMilk = function () {
    var result = [];
    for (var _i = 0, _a = this._eventList; _i < _a.length; _i++) {
      var event_3 = _a[_i];
      result = result.concat(event_3.gainMilk());
    }
    return result;
  };
  DayHistory.prototype.milk = function () {
    var result = [];
    for (var _i = 0, _a = this._eventList; _i < _a.length; _i++) {
      var event_4 = _a[_i];
      result = result.concat(event_4.milk());
    }
    return result;
  };
  DayHistory.prototype.lastNakadashiType = function () {
    for (var _i = 0, _a = this._eventList; _i < _a.length; _i++) {
      var event_5 = _a[_i];
      if (event_5.lastNakadashiType() > 0) {
        return event_5.lastNakadashiType();
      }
    }
    return 0;
  };
  DayHistory.prototype.getSexEvent = function () {
    if (this._commonEventId == 0) {
      return null;
    }
    var key = this._actorId + "_" + this._commonEventId;
    var param = ERO_PARAMS[key];
    if (!param) {
      console.error(key + "の ERO_PARAM が見つかりません");
      return null;
    }
    var taii;
    p(key + " " + param.position);
    switch (param.position) {
      case Taii.back:
        taii = Taii.back;
        break;
      case Taii.seijoui:
        taii = Taii.seijoui;
        break;
      case Taii.kijoui:
        taii = Taii.kijoui;
        break;
      case Taii.hutaana:
        taii = Taii.hutaana;
        break;
      case Taii.tanetsuke:
        taii = Taii.tanetsuke;
        break;
      default:
        return null;
    }
    var nakadashi = this.countNakadashi();
    var manId;
    switch (param.man) {
      case "蛮族":
        manId = TaneoyaId.banzoku;
        break;
      case "大臣":
        manId = TaneoyaId.minister;
        break;
      case "浮浪者":
        manId = TaneoyaId.vagrant;
        break;
      case "ゴブリン":
        manId = TaneoyaId.goblin;
        break;
      case "グレイ":
        manId = TaneoyaId.gray;
        break;
      case "シャルル":
        manId = TaneoyaId.charles;
        break;
      case "酒場の客":
        manId = TaneoyaId.bar;
        break;
      case "ロリコン":
        manId = TaneoyaId.loli;
        break;
      default:
        console.error("種親IDが不正です");
        console.error(param);
        return null;
    }
    return new SexEvent(taii, manId, nakadashi);
  };
  return DayHistory;
})();
var ActorHistory = /** @class */ (function () {
  function ActorHistory(actorId) {
    this._historyList = [];
    this._actorId = actorId;
  }
  ActorHistory.prototype.onDayStart = function (day) {
    var history = this.lastHistory();
    this.addNewHistory(day, history);
  };
  ActorHistory.prototype.addNewHistory = function (day, before) {
    var history = new DayHistory(day, this._actorId, before);
    history.onDayStart();
    this._historyList.push(history);
  };
  ActorHistory.prototype.onDungeonStart = function () {
    var history = this.lastHistory();
    history.onDungeonStart();
  };
  ActorHistory.prototype.onMoveToDungeon = function () {
    var history = this.lastHistory();
    history.onMoveToDungeon();
  };
  ActorHistory.prototype.onDungeonEnd = function (defeat, isCaptured) {
    var history = this.lastHistory();
    history.onDungeonEnd(defeat, isCaptured);
  };
  ActorHistory.prototype.lastHistory = function () {
    return this._historyList[this._historyList.length - 1];
  };
  ActorHistory.prototype.yesterdayHistory = function () {
    return this._historyList[this._historyList.length - 2];
  };
  ActorHistory.prototype.countSyusanBanzoku = function (day) {
    return this.getHistoryTotal(EroStatusId.SYUSAN_BANZOKU, day);
  };
  ActorHistory.prototype.countSyusanGoblin = function (day) {
    return this.getHistoryTotal(EroStatusId.SYUSAN_GOBLIN, day);
  };
  ActorHistory.prototype.countSyusanVagrant = function (day) {
    return this.getHistoryTotal(EroStatusId.SYUSAN_VAGRANT, day);
  };
  ActorHistory.prototype.countSyusanGray = function (day) {
    return this.getHistoryTotal(EroStatusId.SYUSAN_GRAY, day);
  };
  ActorHistory.prototype.countSyusanCharles = function (day) {
    return this.getHistoryTotal(EroStatusId.SYUSAN_CHARLES, day);
  };
  ActorHistory.prototype.countSyusanMinister = function (day) {
    return this.getHistoryTotal(EroStatusId.SYUSAN_MINISTER, day);
  };
  ActorHistory.prototype.countSyusanLoli = function (day) {
    return this.getHistoryTotal(EroStatusId.SYUSAN_LOLI, day);
  };
  ActorHistory.prototype.countSyusanBar = function (day) {
    return this.getHistoryTotal(EroStatusId.SYUSAN_BAR, day);
  };
  ActorHistory.prototype.countFela = function () {
    return this.getHistoryTotal("fela");
  };
  ActorHistory.prototype.countAnal = function (day) {
    return this.getHistoryTotal(EroStatusId.ANAL, day);
  };
  ActorHistory.prototype.countAcme = function (day) {
    return this.getHistoryTotal(EroStatusId.ACME, day);
  };
  ActorHistory.prototype.countMankoAcme = function (day) {
    return this.getHistoryTotal(EroStatusId.ACME_MANKO, day);
  };
  ActorHistory.prototype.countBaisyun = function (day) {
    return this.getHistoryTotal(EroStatusId.BAISYUN, day);
  };
  ActorHistory.prototype.countBaisyunPerson = function (day) {
    return this.getHistoryTotal(EroStatusId.BAISYUN_PERSON, day);
  };
  ActorHistory.prototype.countSkillPoint = function () {
    return this.getHistoryTotal(EroStatusId.SKILL_POINT);
  };
  ActorHistory.prototype.countBukkake = function () {
    return this.getHistoryTotal("bukkake");
  };
  ActorHistory.prototype.countSeiekiNomu = function () {
    return this.getHistoryTotal("seiekiNomu");
  };
  ActorHistory.prototype.countKounai = function () {
    return this.getHistoryTotal("kounai");
  };
  ActorHistory.prototype.countNakadashi = function (day) {
    return this.getHistoryTotal(EroStatusId.NAKADASHI, day);
  };
  ActorHistory.prototype.countOshikoNomu = function () {
    return this.getHistoryTotal("oshikko");
  };
  ActorHistory.prototype.countNinshin = function (day) {
    return this.getHistoryTotal(EroStatusId.NINSHIN, day);
  };
  ActorHistory.prototype.countNinshinBanzoku = function (day) {
    return this.getHistoryTotal(EroStatusId.NINSHIN_BANZOKU, day);
  };
  ActorHistory.prototype.countRape = function (day) {
    return this.getHistoryTotal(EroStatusId.RAPE, day);
  };
  ActorHistory.prototype.countObedience = function (day) {
    return this.getHistoryTotal(EroStatusId.OBEDIENCE, day);
  };
  ActorHistory.prototype.countNasty = function (day) {
    return this.getHistoryTotal(EroStatusId.NASTY, day);
  };
  ActorHistory.prototype.countNikubenki = function (day) {
    return this.getHistoryTotal(EroStatusId.NIKUBENKI, day);
  };
  ActorHistory.prototype.countBattle = function (day) {
    return this.getHistoryTotal(EroStatusId.BATTLE, day);
  };
  ActorHistory.prototype.countChimpo = function (day) {
    return this.getHistoryTotal(EroStatusId.CHIMPO_ERO, day);
  };
  ActorHistory.prototype.countMankoEro = function (day) {
    return this.getHistoryTotal(EroStatusId.MANKO_ERO, day);
  };
  ActorHistory.prototype.countChimpoEro = function (day) {
    return this.getHistoryTotal(EroStatusId.CHIMPO_ERO, day);
  };
  ActorHistory.prototype.countAnalEro = function (day) {
    return this.getHistoryTotal(EroStatusId.ANAL_ERO, day);
  };
  ActorHistory.prototype.countSyusan = function (day) {
    return this.getHistoryTotal(EroStatusId.SYUSAN, day);
  };
  ActorHistory.prototype.countToilet = function (day) {
    return this.getHistoryTotal(EroStatusId.TOILET, day);
  };
  ActorHistory.prototype.countAnalAcme = function (day) {
    return this.getHistoryTotal(EroStatusId.ANAL_ACME, day);
  };
  ActorHistory.prototype.countSlaveEnd = function (day) {
    return this.getHistoryTotal(EroStatusId.SLAVE_END, day);
  };
  ActorHistory.prototype.countDaijin = function (day) {
    return this.getHistoryTotal(EroStatusId.DAIJIN, day);
  };
  ActorHistory.prototype.countNinshinRate = function (day) {
    var n = 0;
    //let isNinshin = false;
    for (var i = this._historyList.length - 1; i >= 0; i--) {
      var h = this._historyList[i];
      if (h.day() > day) {
        continue;
      }
      if (h.isNinshin()) {
        return 100;
      }
      if (h.isSyusan()) {
        if (n >= 100) {
          var history_4 = this.findHistoryByDay(day);
          if (this.lastHistory().boteId() == 0) {
            if (
              this.lastHistory().countTotal(EroStatusId.NINSHIN_DAMAGE) == 0
            ) {
              n = 99;
            }
          }
        }
        return n;
      }
      /*if (isNinshin) {
                continue;
            }*/
      n += h.countTotal(EroStatusId.NINSHIN_DAMAGE);
    }
    return n;
  };
  ActorHistory.prototype.countSchedule = function (scheduleType) {
    var n = 0;
    for (var _i = 0, _a = this._historyList; _i < _a.length; _i++) {
      var h = _a[_i];
      n += h.countSchedule(scheduleType);
    }
    return n;
  };
  ActorHistory.prototype.getHistoryTotal = function (id, day) {
    if (day === void 0) {
      day = 9999;
    }
    var n = 0;
    for (var _i = 0, _a = this._historyList; _i < _a.length; _i++) {
      var h = _a[_i];
      if (h.day() > day) {
        continue;
      }
      n += h.countTotal(id);
    }
    return n;
  };
  ActorHistory.prototype.getHistory = function (day) {
    for (var _i = 0, _a = this._historyList; _i < _a.length; _i++) {
      var h = _a[_i];
      if (h.day() == day) {
        return h;
      }
    }
    return null;
  };
  ActorHistory.prototype.firstDay = function () {
    if (this._historyList.length == 0) {
      return -1;
    }
    return this._historyList[0].day();
  };
  ActorHistory.prototype.lastDay = function () {
    if (this._historyList.length == 0) {
      return -1;
    }
    return this._historyList[this._historyList.length - 1].day();
  };
  ActorHistory.prototype.findHistoryByDay = function (day) {
    for (var _i = 0, _a = this._historyList; _i < _a.length; _i++) {
      var h = _a[_i];
      if (h.day() == day) {
        return h;
      }
    }
    return null;
  };
  ActorHistory.prototype.calcTightening = function (type, day) {
    if (day === void 0) {
      day = 9999;
    }
    var n = 100;
    for (var _i = 0, _a = this._historyList; _i < _a.length; _i++) {
      var h = _a[_i];
      if (h.day() > day) {
        continue;
      }
      if (type == "chitsu") {
        n -= h.calcChitsuDamage();
      } else {
        n -= h.calcAnalDamage();
      }
    }
    if (n < -100) {
      return -100;
    }
    return n;
  };
  ActorHistory.prototype.getHistoryList = function () {
    return this._historyList;
  };
  ActorHistory.prototype.lastSyusanTaneoyaType = function () {
    for (
      var _i = 0, _a = this._historyList.concat().reverse();
      _i < _a.length;
      _i++
    ) {
      var history_5 = _a[_i];
      for (var _b = 0, _c = history_5.getEventList(); _b < _c.length; _b++) {
        var e = _c[_b];
        for (var _d = 0, _e = e.getScheduleList(); _d < _e.length; _d++) {
          var s = _e[_d];
          if (s.type() == ScheduleType.SYUSAN) {
            var type = s.value();
            if (isNaN(type)) {
              console.error(type + "の種親IDが設定されていません");
            }
            p(" type:" + type + " " + getTaneoyaName(type));
            $gameVariables.setValue(25, getTaneoyaName(type));
            return type;
          }
        }
      }
    }
    console.error("種親タイプがみつかりません");
    $gameVariables.setValue(25, getTaneoyaName(null));
    return -1;
  };
  ActorHistory.prototype.lastNinshinTaneoyaType = function () {
    for (
      var _i = 0, _a = this._historyList.concat().reverse();
      _i < _a.length;
      _i++
    ) {
      var history_6 = _a[_i];
      for (var _b = 0, _c = history_6.getEventList(); _b < _c.length; _b++) {
        var e = _c[_b];
        for (var _d = 0, _e = e.getScheduleList(); _d < _e.length; _d++) {
          var s = _e[_d];
          if (
            s.type() == ScheduleType.NINSHIN ||
            s.type() == ScheduleType.KYOSEI_NINSHIN
          ) {
            var actorId = Math.trunc(s.value());
            var actor = $gameActors.actor(actorId);
            var type = Math.trunc(actor.actor().meta["taneoyaType"]);
            p(
              "妊娠種親:" +
                actorId +
                " type:" +
                type +
                " " +
                getTaneoyaName(type)
            );
            $gameVariables.setValue(25, getTaneoyaName(type));
            return type;
          }
        }
      }
    }
    console.error("種親タイプがみつかりません");
    return -1;
  };
  ActorHistory.prototype.lastNinshinTaneoyaId = function () {
    for (
      var _i = 0, _a = this._historyList.concat().reverse();
      _i < _a.length;
      _i++
    ) {
      var history_7 = _a[_i];
      for (var _b = 0, _c = history_7.getEventList(); _b < _c.length; _b++) {
        var e = _c[_b];
        for (var _d = 0, _e = e.getScheduleList(); _d < _e.length; _d++) {
          var s = _e[_d];
          if (
            s.type() == ScheduleType.NINSHIN ||
            s.type() == ScheduleType.KYOSEI_NINSHIN
          ) {
            var actorId = Math.trunc(s.value());
            return actorId;
          }
        }
      }
    }
    console.error("種親IDがみつかりません");
    return -1;
  };
  ActorHistory.prototype.lastNinshinTaneoyaName = function () {
    for (
      var _i = 0, _a = this._historyList.concat().reverse();
      _i < _a.length;
      _i++
    ) {
      var history_8 = _a[_i];
      for (var _b = 0, _c = history_8.getEventList(); _b < _c.length; _b++) {
        var e = _c[_b];
        for (var _d = 0, _e = e.getScheduleList(); _d < _e.length; _d++) {
          var s = _e[_d];
          if (
            s.type() == ScheduleType.NINSHIN ||
            s.type() == ScheduleType.KYOSEI_NINSHIN
          ) {
            var actorId = Math.trunc(s.value());
            var actor = $gameActors.actor(actorId);
            var type = Math.trunc(actor.actor().meta["taneoyaType"]);
            p("妊娠種親:" + actorId + " type:" + type);
            return getTaneoyaName(type);
          }
        }
      }
    }
    console.error("種親タイプがみつかりません");
    return "";
  };
  ActorHistory.prototype.ninshinTaneoyaCount = function (type) {
    var n = 0;
    for (var _i = 0, _a = this._historyList; _i < _a.length; _i++) {
      var h = _a[_i];
      for (var _b = 0, _c = h.getEventList(); _b < _c.length; _b++) {
        var e = _c[_b];
        for (var _d = 0, _e = e.getScheduleList(); _d < _e.length; _d++) {
          var s = _e[_d];
          if (
            s.type() == ScheduleType.NINSHIN ||
            s.type() == ScheduleType.KYOSEI_NINSHIN
          ) {
            var actorId = Math.trunc(s.value());
            var actor = $gameActors.actor(actorId);
            var taneoyaType = Math.trunc(actor.actor().meta["taneoyaType"]);
            if (taneoyaType == type) {
              n++;
            }
          }
        }
      }
    }
    return n;
  };
  ActorHistory.prototype.getAllNinshinImageList = function () {
    var result = [];
    for (var _i = 0, _a = this._historyList; _i < _a.length; _i++) {
      var h = _a[_i];
      if (!h.isNinshin()) {
        continue;
      }
      if (h.imageId() && h.imageId().length > 0) {
        result.push(h.imageId());
      }
    }
    return result;
  };
  ActorHistory.prototype.addEroExperience = function (actorId) {
    this._eroExperience = this._eroExperience || {};
    if (actorId > 0) {
      var actor = $gameActors.actor(actorId);
      if (actor.actor().meta["taneoyaType"]) {
        var taneoyaType = Math.trunc(actor.actor().meta["taneoyaType"]);
        this._eroExperience[taneoyaType] = true;
      }
    }
  };
  ActorHistory.prototype.hasEroHistory = function (taneoyaId) {
    this._eroExperience = this._eroExperience || {};
    return this._eroExperience[taneoyaId] == true;
  };
  ActorHistory.prototype.lastSexEvent = function () {
    for (var i = this._historyList.length - 1; i >= 0; i--) {
      var history_9 = this._historyList[i];
      var event_6 = history_9.getSexEvent();
      if (event_6) {
        return event_6;
      }
    }
    return null;
  };
  ActorHistory.prototype.favoriteTaii = function () {
    var collector = new TaiiCollector();
    for (var i = this._historyList.length - 1; i >= 0; i--) {
      var history_10 = this._historyList[i];
      var event_7 = history_10.getSexEvent();
      if (event_7) {
        collector.pushEvent(event_7);
        if (collector.count() >= 5) {
          break;
        }
      }
    }
    return collector.favotireTaii();
  };
  ActorHistory.prototype.bestChimpo7 = function () {
    for (
      var _i = 0, _a = this._historyList.concat().reverse();
      _i < _a.length;
      _i++
    ) {
      var history_11 = _a[_i];
      for (var _b = 0, _c = history_11.getEventList(); _b < _c.length; _b++) {
        var e = _c[_b];
        for (var _d = 0, _e = e.getScheduleList(); _d < _e.length; _d++) {
          var s = _e[_d];
          if (s.countAnal() > 0) {
            var chimpo = history_11.getChimpo();
            if (chimpo) {
              return chimpo;
            }
          }
        }
      }
    }
    return -1;
  };
  ActorHistory.prototype.bestChimpo = function () {
    var type = this.countMostSyusanType();
    if (type > 0) {
      return type;
    }
    return this.lastChimpoType();
  };
  ActorHistory.prototype.lastChimpoType = function () {
    for (
      var _i = 0, _a = this._historyList.concat().reverse();
      _i < _a.length;
      _i++
    ) {
      var history_12 = _a[_i];
      for (var _b = 0, _c = history_12.getEventList(); _b < _c.length; _b++) {
        var e = _c[_b];
        for (var _d = 0, _e = e.getScheduleList(); _d < _e.length; _d++) {
          var s = _e[_d];
          if (s.countNakadashi() > 0) {
            var chimpo = history_12.getChimpo();
            if (chimpo) {
              return chimpo;
            }
          }
        }
      }
    }
    return -1;
  };
  ActorHistory.prototype.countMostSyusanType = function () {
    var map = {};
    for (
      var _i = 0, _a = this._historyList.concat().reverse();
      _i < _a.length;
      _i++
    ) {
      var history_13 = _a[_i];
      for (var _b = 0, _c = history_13.getEventList(); _b < _c.length; _b++) {
        var e = _c[_b];
        for (var _d = 0, _e = e.getScheduleList(); _d < _e.length; _d++) {
          var s = _e[_d];
          if (s.type() == ScheduleType.SYUSAN) {
            var type = s.value();
            if (map[type] == null) {
              map[type] = 1;
            } else {
              map[type]++;
            }
          }
        }
      }
    }
    var max = 0;
    for (var key in map) {
      if (max < map[key]) {
        max = map[key];
      }
    }
    if (max == 0) {
      return -1;
    }
    for (var key in map) {
      if (map[key] == max) {
        return parseInt(key);
      }
    }
    console.error("taneoyaミス");
  };
  return ActorHistory;
})();
var TaiiCount = /** @class */ (function () {
  function TaiiCount(t, priority) {
    this._count = 0;
    this.taii = t;
    this.priority = priority;
  }
  TaiiCount.prototype.plus = function () {
    this._count += 10;
  };
  TaiiCount.prototype.count = function () {
    return this._count + this.priority;
  };
  return TaiiCount;
})();
var TaiiCollector = /** @class */ (function () {
  function TaiiCollector() {
    this._seijoui = new TaiiCount(Taii.seijoui, 0);
    this._back = new TaiiCount(Taii.back, 1);
    this._kijoui = new TaiiCount(Taii.kijoui, 2);
    this._hutaana = new TaiiCount(Taii.hutaana, 3);
    this._tanetsuke = new TaiiCount(Taii.tanetsuke, 4);
    this._count = 0;
  }
  TaiiCollector.prototype.pushEvent = function (event) {
    this._count++;
    switch (event.taii) {
      case Taii.seijoui:
        this._seijoui.plus();
        break;
      case Taii.back:
        this._back.plus();
        break;
      case Taii.kijoui:
        this._kijoui.plus();
        this._kijoui.plus();
        break;
      case Taii.hutaana:
        this._hutaana.plus();
        this._hutaana.plus();
        break;
      case Taii.tanetsuke:
        this._tanetsuke.plus();
        this._tanetsuke.plus();
        break;
    }
  };
  TaiiCollector.prototype.count = function () {
    return this._count;
  };
  TaiiCollector.prototype.favotireTaii = function () {
    if (this._count == 0) {
      return Taii.none;
    }
    var list = [
      this._seijoui,
      this._back,
      this._kijoui,
      this._hutaana,
      this._tanetsuke,
    ];
    p(list);
    list = list.sort(function (a, b) {
      return b.count() - a.count();
    });
    return list[0].taii;
  };
  return TaiiCollector;
})();
var SexEvent = /** @class */ (function () {
  function SexEvent(t, m, n) {
    this.taii = Taii.none;
    this.nakadashi = 0;
    this.taii = t;
    this.manId = m;
    this.nakadashi = n;
  }
  return SexEvent;
})();
var Taii;
(function (Taii) {
  Taii["none"] = "";
  Taii["seijoui"] = "\u6B63\u5E38\u4F4D";
  Taii["back"] = "\u30D0\u30C3\u30AF";
  Taii["kijoui"] = "\u9A0E\u4E57\u4F4D";
  Taii["hutaana"] = "\uFF12\u7A74";
  Taii["tanetsuke"] = "\u7A2E\u4ED8\u3051\u30D7\u30EC\u30B9";
  Taii["zai"] = "\u5EA7\u4F4D";
})(Taii || (Taii = {}));
var HistoryManager = /** @class */ (function () {
  function HistoryManager() {
    this._historyMap = {};
  }
  HistoryManager.prototype.onDayStart = function () {
    var day = $gameSystem.day();
    for (var _i = 0, _a = $gameParty.allEroMembers(); _i < _a.length; _i++) {
      var actor = _a[_i];
      var list = this.getActorHistory(actor.actorId());
      list.onDayStart(day);
    }
  };
  HistoryManager.prototype.onDayEnd = function () {
    for (var _i = 0, _a = $gameParty.allEroMembers(); _i < _a.length; _i++) {
      var actor = _a[_i];
      var list = this.getActorHistory(actor.actorId());
      var history_14 = list.lastHistory();
      history_14.onDayEnd();
    }
  };
  HistoryManager.prototype.onDungeonStart = function () {
    for (var _i = 0, _a = $gameParty.battleMembers(); _i < _a.length; _i++) {
      var a = _a[_i];
      var history_15 = this.getActorHistory(a.actorId());
      history_15.onDungeonStart();
    }
  };
  HistoryManager.prototype.onDungeonEnd = function (
    defeatActorId,
    defeatCount
  ) {
    var defeatActors = $gameParty.randomDedeatActor(defeatActorId, defeatCount);
    for (var _i = 0, _a = $gameParty.battleMembers(); _i < _a.length; _i++) {
      var a = _a[_i];
      var history_16 = this.getActorHistory(a.actorId());
      if (defeatActors.contains(a.actorId())) {
        history_16.onDungeonEnd(defeatCount > 0, true);
      } else {
        history_16.onDungeonEnd(defeatCount > 0, false);
      }
    }
    if (defeatActors.length > 0) {
      var names = "";
      for (
        var _b = 0, defeatActors_1 = defeatActors;
        _b < defeatActors_1.length;
        _b++
      ) {
        var a = defeatActors_1[_b];
        var actor = $gameActors.actor(a);
        if (names.length > 0) {
          names += "、";
        }
        names += actor.name();
      }
      $gameVariables.setValue(27, names);
    }
  };
  HistoryManager.prototype.onMoveToDungeon = function () {
    for (var _i = 0, _a = $gameParty.battleMembers(); _i < _a.length; _i++) {
      var a = _a[_i];
      var history_17 = this.getActorHistory(a.actorId());
      history_17.onMoveToDungeon();
    }
  };
  HistoryManager.prototype.getActorHistory = function (actorId) {
    this._historyMap[actorId] =
      this._historyMap[actorId] || new ActorHistory(actorId);
    return this._historyMap[actorId];
  };
  HistoryManager.prototype.getCurrentHistory = function (actorId) {
    var actorHistory = this.getActorHistory(actorId);
    return actorHistory.lastHistory();
  };
  return HistoryManager;
})();
(function (Nore) {
  var top = 4;
})(Nore || (Nore = {}));
