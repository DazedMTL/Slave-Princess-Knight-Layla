/*:ja
 * @target MZ
 * @author ル
 *
 * @command ResetChokyoTime
 *
 * @command Forecast
 * @text 結果予測
 * @des 結果予測
 * @arg id
 * @type string
 * @text エロID
 * @desc エロID
 *
 * @arg manId
 * @type number
 * @text 男ID
 * @desc 男ID
 *
 * @command ResetForecast
 * @text 結果クリア
 *
 *
 * @command Run
 * @text 実行
 * @des 実行
 *
 *
 * @command AddMouseSeieki
 * @text 口周りの精液追加
 * @des 口周りの精液追加
 *
 * @arg actorId
 * @type number
 * @text actorId
 * @desc actorId
 *
 *
 * @command AddNakadashiSeieki
 * @text 中出し精液追加
 * @des 中出し精液追加
 *
 * @arg actorId
 * @type number
 * @text actorId
 * @desc actorId
 *
 * @command ClearNakadashiSeieki
 * @text 中出し精液クリア
 * @des 中出し精液クリア
 * @arg actorId
 * @type number
 * @text actorId
 * @desc actorId
 *
 * @command AddNakadashiCountRakugaki
 * @text 中出し落書き追加
 * @des 中出し落書き追加
 *
 * @arg actorId
 * @type number
 * @text actorId
 * @desc actorId
 *
 *
 * @command AddAnalCountRakugaki
 * @text アナル落書き追加
 * @des アナル落書き追加
 *
 * @arg actorId
 * @type number
 * @text actorId
 * @desc actorId
 *
 *
 * @command AddNikubenkiRakugaki
 * @text 肉便器落書き追加
 * @des 肉便器落書き追加
 * @arg actorId
 * @type number
 * @text actorId
 * @desc actorId
 * @arg count
 * @type number
 * @text count
 * @desc count
 *
 * @command AddFellaRakugaki
 * @text フェラ落書き追加
 * @des フェラ落書き追加
 *
 * @arg actorId
 * @type number
 * @text actorId
 * @desc actorId
 *
 *
 * @command AddYogore
 * @text 汚れ追加
 * @des 汚れ追加
 *
 * @arg actorId
 * @type number
 * @text actorId
 * @desc actorId
 *
 *
 * @command MinusTime
 * @text 時間減少
 *
 * @command ClearAllRakugaki
 * @text 落書き全削除
 * @des 落書き全削除
 *
 * @arg actorId
 * @type number
 * @text actorId
 * @desc actorId
 *
 *
 * @command InitCos
 * @text 奉仕部屋担当の衣装
 * @des 奉仕部屋担当の衣装
 *
 * @command SetRank
 * @text エロ条件ランク設定
 *
 * @arg actorId
 * @type number
 * @text actorId
 * @desc actorId
 *
 * @command Ranshi1
 * @text 卵子耐久度を１に
 *
 * @command Ranshi1Actor_121
 * @text 卵子耐久度を１に(var 121)
 *
 * @command ResetYariheyaEvent
 * @text ヤリ部屋イベントリセット
 *
 * @command AddYariheyaEvent
 * @text ヤリ部屋イベント登録
 * @arg type
 * @type number
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
var Nore;
(function (Nore) {
  var FIRST_EVENT_SPEND_TIME = 100;
  var EVENT_SPEND_TIME = 80;
  var MOB_SPEND_TIME = 20;
  var MOUSE_SEIEKI_ACCE_LIST = [1041, 1042, 1043];
  Nore.YOGORE_ACCE_LIST = [1151, 1152, 1153, 1154, 1155, 1156, 1157];
  Nore.NAKADASHI_SEIEKI_ACCE_LIST = [1046, 1047, 1048];
  Nore.NAKADASHI_COUNT_ACCE_LIST = [
    1101, 1102, 1103, 1104, 1105, 1106, 1107, 1108, 1109, 1110, 1111, 1112,
    1113, 1114, 1115, 1116, 1117, 1118, 1119, 1120, 1121, 1122, 1123, 1124,
    1125, 1126, 1127, 1128, 1129, 1130, 1131, 1132, 1133, 1134, 1135, 1136,
    1137, 1138, 1139, 1140,
  ];
  Nore.NAKADASHI_RAKUGAKI_ACCE_LIST = [
    1051, 1052, 1053, 1054, 1055, 1056, 1057, 1058, 1059, 1071, 1072,
  ];
  Nore.ANAL_RAKUGAKI_ACCE_LIST = [1081];
  Nore.FELA_RAKUGAKI_ACCE_LIST = [1076, 1077];
  Nore.AZA_ACCE_LIST = [1037];
  Nore.OSHIKKO_ACCE_LIST = [1035, 1036];
  var pluginName = "Nore_Nikubenki";
  PluginManager.registerCommand(pluginName, "ResetChokyoTime", function (args) {
    p("ResetChokyoTime");
    $gameTemp.setNikubenkiForecast(
      new NikubenkiForecast(Nore.NIKUBENKI_FORECAST_EMPTY, 0)
    );
    $gameSystem.clearChokyoTime();
  });
  PluginManager.registerCommand(pluginName, "ResetForecast", function (args) {
    $gameTemp.setNikubenkiForecast(
      new NikubenkiForecast(Nore.NIKUBENKI_FORECAST_EMPTY, 0)
    );
  });
  PluginManager.registerCommand(pluginName, "Forecast", function (args) {
    var id = args.id;
    var manId = args.manId;
    var param = ERO_PARAMS[id];
    if (!param) {
      console.error(id + "の ERO_PARAM がみつかりません");
      return;
    }
    p(param);
    $gameTemp.setNikubenkiForecast(new NikubenkiForecast(id, manId));
  });
  PluginManager.registerCommand(pluginName, "MinusTime", function (args) {
    var forecast = $gameTemp.nikubenkiForecast();
    var actorHistory = $gameSystem
      .historyManager()
      .getActorHistory(forecast.actorId());
    var lastNinshinRate = actorHistory.countNinshinRate($gameSystem.day());
    upEroParam(forecast.actorId(), forecast.commonId(), forecast.taneoyaId());
    forecast.registerSchedule(lastNinshinRate);
    $gameTemp.setNikubenkiForecast(
      new NikubenkiForecast(Nore.NIKUBENKI_FORECAST_EMPTY, 0)
    );
  });
  PluginManager.registerCommand(pluginName, "Ranshi1", function (args) {
    var actorId = $gameSystem.chokyoActorId();
    var ninshinRate = $gameActors
      .actor(actorId)
      .getActorHistory()
      .countNinshinRate($gameSystem.day());
    var history = $gameActors.actor(actorId).getActorHistory().lastHistory();
    $gameVariables.setValue(100, 0);
    registerSchedule(history, ScheduleType.NINSHIN_DAMAGE, 99 - ninshinRate);
  });
  PluginManager.registerCommand(
    pluginName,
    "Ranshi1Actor_121",
    function (args) {
      var actorId = $gameVariables.value(121);
      if (!actorId) {
        console.error("var 121 に actorId が設定されていません");
        return;
      }
      p(actorId + "の卵子耐久度を１に");
      var ninshinRate = $gameActors
        .actor(actorId)
        .getActorHistory()
        .countNinshinRate($gameSystem.day());
      var history = $gameActors.actor(actorId).getActorHistory().lastHistory();
      registerSchedule(history, ScheduleType.NINSHIN_DAMAGE, 99 - ninshinRate);
    }
  );
  PluginManager.registerCommand(pluginName, "Run", function (args) {
    var forecast = $gameTemp.nikubenkiForecast();
    var commonId = forecast.commonId();
    $gameTemp.reserveCommonEvent(commonId);
    forecast.registerSchedule();
    $gameTemp.setNikubenkiForecast(
      new NikubenkiForecast(Nore.NIKUBENKI_FORECAST_EMPTY, 0)
    );
  });
  PluginManager.registerCommand(pluginName, "AddMouseSeieki", function (args) {
    var actorId = parseInt(args.actorId);
    if (actorId == 0) {
      actorId = $gameSystem.chokyoActorId();
    }
    var actor = $gameActors.actor(actorId);
    if (actor.isRakugakiEdited()) {
      return;
    }
    var candidates = Nore.shuffle(MOUSE_SEIEKI_ACCE_LIST);
    for (
      var _i = 0, candidates_1 = candidates;
      _i < candidates_1.length;
      _i++
    ) {
      var acce = candidates_1[_i];
      if (!actor.hasAcce(acce)) {
        actor.addAcce(acce);
        break;
      }
    }
  });
  PluginManager.registerCommand(
    pluginName,
    "AddNakadashiSeieki",
    function (args) {
      var actorId = parseInt(args.actorId);
      if (actorId == 0) {
        actorId = $gameSystem.chokyoActorId();
      }
      var actor = $gameActors.actor(actorId);
      if (actor.isRakugakiEdited()) {
        return;
      }
      var candidates = Nore.shuffle(Nore.NAKADASHI_SEIEKI_ACCE_LIST);
      for (
        var _i = 0, candidates_2 = candidates;
        _i < candidates_2.length;
        _i++
      ) {
        var acce = candidates_2[_i];
        if (!actor.hasAcce(acce)) {
          actor.addAcce(acce);
          p("AddNakadashiSeieki");
          break;
        }
      }
    }
  );
  PluginManager.registerCommand(pluginName, "AddYogore", function (args) {
    var actorId = parseInt(args.actorId);
    if (actorId == 0) {
      actorId = $gameSystem.chokyoActorId();
    }
    var actor = $gameActors.actor(actorId);
    if (actor.isRakugakiEdited()) {
      return;
    }
    var candidates = Nore.shuffle(Nore.YOGORE_ACCE_LIST);
    for (
      var _i = 0, candidates_3 = candidates;
      _i < candidates_3.length;
      _i++
    ) {
      var acce = candidates_3[_i];
      if (!actor.hasAcce(acce)) {
        actor.addAcce(acce);
        p("AddYogore");
        break;
      }
    }
  });
  PluginManager.registerCommand(
    pluginName,
    "ClearNakadashiSeieki",
    function (args) {
      var actorId = parseInt(args.actorId);
      if (actorId == 0) {
        actorId = $gameSystem.chokyoActorId();
      }
      var actor = $gameActors.actor(actorId);
      if (actor.isRakugakiEdited()) {
        return;
      }
      for (
        var _i = 0,
          NAKADASHI_SEIEKI_ACCE_LIST_1 = Nore.NAKADASHI_SEIEKI_ACCE_LIST;
        _i < NAKADASHI_SEIEKI_ACCE_LIST_1.length;
        _i++
      ) {
        var acce = NAKADASHI_SEIEKI_ACCE_LIST_1[_i];
        actor.removeAcce(acce);
      }
      for (
        var _a = 0, OSHIKKO_ACCE_LIST_1 = Nore.OSHIKKO_ACCE_LIST;
        _a < OSHIKKO_ACCE_LIST_1.length;
        _a++
      ) {
        var acce = OSHIKKO_ACCE_LIST_1[_a];
        actor.removeAcce(acce);
      }
      for (
        var _b = 0, YOGORE_ACCE_LIST_1 = Nore.YOGORE_ACCE_LIST;
        _b < YOGORE_ACCE_LIST_1.length;
        _b++
      ) {
        var acce = YOGORE_ACCE_LIST_1[_b];
        actor.removeAcce(acce);
      }
    }
  );
  /**
   * 中出し回数(正の字)のアクセ追加
   */
  PluginManager.registerCommand(
    pluginName,
    "AddNakadashiCountRakugaki",
    function (args) {
      var actorId = parseInt(args.actorId);
      if (actorId == 0) {
        actorId = $gameSystem.chokyoActorId();
      }
      addNakadashiCountRakugaki(actorId);
    }
  );
  function addNakadashiCountRakugaki(actorId) {
    var actor = $gameActors.actor(actorId);
    var event = actor.getLastHistory().getLastEvent();
    var nakadashi = event.countNakadashi();
    p("正の字追加" + actorId + " " + nakadashi);
    for (var i = 0; i < nakadashi; i++) {
      var acceId = Nore.NAKADASHI_COUNT_ACCE_LIST[i];
      if (!acceId) {
        break;
      }
      if (!actor.hasAcce(acceId)) {
        actor.addAcce(acceId);
      }
    }
  }
  /**
   * 中出し回数(正の字)のアクセ追加
   */
  PluginManager.registerCommand(
    pluginName,
    "AddAnalCountRakugaki",
    function (args) {
      var actorId = parseInt(args.actorId);
      if (actorId == 0) {
        actorId = $gameSystem.chokyoActorId();
      }
      addAnalCountRakugaki(actorId);
    }
  );
  function addAnalCountRakugaki(actorId) {
    var actor = $gameActors.actor(actorId);
    var event = actor.getLastHistory().getLastEvent();
    var nakadashi = event.countAnal();
    p("正の字追加" + actorId + " " + nakadashi);
    for (var i = 0; i < nakadashi; i++) {
      var acceId = Nore.NAKADASHI_COUNT_ACCE_LIST[i];
      if (!acceId) {
        break;
      }
      if (!actor.hasAcce(acceId)) {
        actor.addAcce(acceId);
      }
    }
  }
  /**
   * 落書き追加
   */
  PluginManager.registerCommand(
    pluginName,
    "AddNikubenkiRakugaki",
    function (args) {
      var actorId = parseInt(args.actorId);
      if (actorId == 0) {
        actorId = $gameSystem.chokyoActorId();
      }
      var count = parseInt(args.count);
      if (isNaN(count)) {
        count = 1;
      }
      var actor = $gameActors.actor(actorId);
      if (actor.isRakugakiEdited()) {
        return;
      }
      for (var i = 0; i < count; i++) {
        var candidates = Nore.shuffle(Nore.NAKADASHI_RAKUGAKI_ACCE_LIST);
        for (
          var _i = 0, candidates_4 = candidates;
          _i < candidates_4.length;
          _i++
        ) {
          var acce = candidates_4[_i];
          if (!actor.hasAcce(acce)) {
            actor.addAcce(acce);
            break;
          }
        }
      }
    }
  );
  /**
   * フェラ落書き追加
   */
  PluginManager.registerCommand(
    pluginName,
    "AddFellaRakugaki",
    function (args) {
      var actorId = parseInt(args.actorId);
      if (actorId == 0) {
        actorId = $gameSystem.chokyoActorId();
      }
      var actor = $gameActors.actor(actorId);
      if (actor.isRakugakiEdited()) {
        return;
      }
      var candidates = Nore.shuffle(Nore.FELA_RAKUGAKI_ACCE_LIST);
      for (
        var _i = 0, candidates_5 = candidates;
        _i < candidates_5.length;
        _i++
      ) {
        var acce = candidates_5[_i];
        if (!actor.hasAcce(acce)) {
          actor.addAcce(acce);
          break;
        }
      }
    }
  );
  /**
   * 落書き全削除
   */
  PluginManager.registerCommand(
    pluginName,
    "ClearAllRakugaki",
    function (args) {
      var actorId = parseInt(args.actorId);
      var actor = $gameActors.actor(actorId);
      if (actor.isRakugakiEdited()) {
        return;
      }
      clearAllRakugaki(actorId);
    }
  );
  /**
   * ヤリ部屋イベントリセット
   */
  PluginManager.registerCommand(
    pluginName,
    "ResetYariheyaEvent",
    function (args) {
      $gameTemp.resetYariheyaEvent();
    }
  );
  /**
   * ヤリ部屋イベント登録
   */
  PluginManager.registerCommand(
    pluginName,
    "AddYariheyaEvent",
    function (args) {
      var type = parseInt(args.type);
      $gameTemp.pushYariheyaEvent(type);
    }
  );
  PluginManager.registerCommand(pluginName, "SetRank", function (args) {
    var actorId = parseInt(args.actorId);
    var nasty = $gameActors
      .actor(actorId)
      .getActorHistory()
      .countNasty($gameSystem.day());
    var rank = $gameSystem.paramRank(nasty, true);
    $gameVariables.setValue(978, rank);
  });
  function clearAllRakugaki(actorId) {
    var actor = $gameActors.actor(actorId);
    p("落書き全削除:" + actorId);
    for (
      var _i = 0, NAKADASHI_COUNT_ACCE_LIST_1 = Nore.NAKADASHI_COUNT_ACCE_LIST;
      _i < NAKADASHI_COUNT_ACCE_LIST_1.length;
      _i++
    ) {
      var acce = NAKADASHI_COUNT_ACCE_LIST_1[_i];
      actor.removeAcce(acce);
    }
    for (
      var _a = 0, FELA_RAKUGAKI_ACCE_LIST_1 = Nore.FELA_RAKUGAKI_ACCE_LIST;
      _a < FELA_RAKUGAKI_ACCE_LIST_1.length;
      _a++
    ) {
      var acce = FELA_RAKUGAKI_ACCE_LIST_1[_a];
      actor.removeAcce(acce);
    }
    for (
      var _b = 0,
        NAKADASHI_RAKUGAKI_ACCE_LIST_1 = Nore.NAKADASHI_RAKUGAKI_ACCE_LIST;
      _b < NAKADASHI_RAKUGAKI_ACCE_LIST_1.length;
      _b++
    ) {
      var acce = NAKADASHI_RAKUGAKI_ACCE_LIST_1[_b];
      actor.removeAcce(acce);
    }
    for (
      var _c = 0, AZA_ACCE_LIST_1 = Nore.AZA_ACCE_LIST;
      _c < AZA_ACCE_LIST_1.length;
      _c++
    ) {
      var acce = AZA_ACCE_LIST_1[_c];
      actor.removeAcce(acce);
    }
  }
  /**
   * コスチューム初期化
   */
  PluginManager.registerCommand(pluginName, "InitCos", function (args) {
    var banzokuActorId = $gameVariables.value(Nore.BANZOKU_ACTOR_SW);
    if (banzokuActorId >= 1 && banzokuActorId <= 12) {
      var actor = $gameActors.actor(banzokuActorId);
      actor.restoreCostume(Nore.ERO_COS_SLOT_ID, false);
      clearAllRakugaki(actor.actorId());
      addNakadashiCountRakugaki(actor.actorId());
    }
  });
  Nore.NIKUBENKI_FORECAST_EMPTY = "empty";
  var NikubenkiForecast = /** @class */ (function () {
    function NikubenkiForecast(id, manId) {
      this._nakadashi = 0;
      this._anal = 0;
      this._fela = 0;
      this._ninshinDamage = 0;
      this._id = id;
      this._taneoyaId = manId;
      this._param = ERO_PARAMS[id];
      if (!this._param) {
        console.error(id + "の ERO_PARAM がみつかりません");
        return;
      }
      this.initTime();
      this.initNakadashi();
      this.initFela();
      this.initAnal();
      this.initNinshinDamage();
      this.initOthers();
    }
    NikubenkiForecast.prototype.isTanetsukeType = function () {
      switch (this.scheduleId()) {
        case ScheduleType.TANETSUKE:
        case ScheduleType.TANETSUKE_BACK:
        case ScheduleType.TANETSUKE_IN_PERSON:
          return true;
      }
      return false;
    };
    NikubenkiForecast.prototype.initTime = function () {
      if (this._param.skillPoint > 0) {
        this._time = FIRST_EVENT_SPEND_TIME;
      } else {
        if (this._id == Nore.NIKUBENKI_FORECAST_EMPTY) {
          this._time = 0;
        } else {
          this._time = MOB_SPEND_TIME;
        }
      }
      this._time += this._param.time;
    };
    NikubenkiForecast.prototype.variance = function () {
      var variance = this._param.variance;
      if (variance > 0) {
        return Math.randomInt(variance);
      }
      return 0;
    };
    NikubenkiForecast.prototype.initNakadashi = function () {
      this._nakadashi = this._param.nakadashi + this.variance();
    };
    NikubenkiForecast.prototype.initFela = function () {
      if (this._param.fela == 0) {
        this._fela = 0;
        return;
      }
      this._fela = this._param.fela + this.variance();
    };
    NikubenkiForecast.prototype.initAnal = function () {
      if (this._param.anal == 0) {
        this._anal = 0;
        return;
      }
      this._anal = this._param.anal + this.variance();
    };
    NikubenkiForecast.prototype.initOthers = function () {
      this._nasty = this._param.nasty;
      this._obedience = this._param.obedience;
    };
    NikubenkiForecast.prototype.initNinshinDamage = function () {
      if (isNaN(this.actorId())) {
        return;
      }
      var s = new Schedule(
        this.actorId(),
        $gameSystem.day(),
        ScheduleType.NAKADASHI,
        this.nakadashi()
      );
      this._ninshinDamage =
        s.countNinshinDamage() +
        this.calcBonusNinshinDamage() * $gameSystem.ninshinRate();
    };
    NikubenkiForecast.prototype.calcBonusNinshinDamage = function () {
      var params = ERO_PARAMS[this._id];
      return params.ninshinPlus;
    };
    NikubenkiForecast.prototype.id = function () {
      return this._id;
    };
    NikubenkiForecast.prototype.time = function () {
      return this._time;
    };
    NikubenkiForecast.prototype.anal = function () {
      return this._anal;
    };
    NikubenkiForecast.prototype.fela = function () {
      return this._fela;
    };
    NikubenkiForecast.prototype.nasty = function () {
      return this._nasty;
    };
    NikubenkiForecast.prototype.obedience = function () {
      return this._obedience;
    };
    NikubenkiForecast.prototype.nakadashi = function () {
      return this._nakadashi;
    };
    NikubenkiForecast.prototype.ninshinDamage = function () {
      if (this._param.ninshin) {
        // 強制妊娠
        return 100;
      }
      return this._ninshinDamage;
    };
    NikubenkiForecast.prototype.commonId = function () {
      var list = this._id.split("_");
      return parseInt(list[1]);
    };
    NikubenkiForecast.prototype.actorId = function () {
      var list = this._id.split("_");
      return parseInt(list[0]);
    };
    NikubenkiForecast.prototype.registerSchedule = function (lastNinshinRate) {
      if (!$gameSwitches.value(34)) {
        $gameSystem.addChokyoTime(this._time);
      }
      /*const actorId = this.actorId();
            const scheduleId = this.scheduleId();

            const actorHistory: ActorHistory = $gameSystem.historyManager().getActorHistory(actorId);
            const history: DayHistory = actorHistory.lastHistory();

            //registerSchedule(history, scheduleId, this.value(), true);
            if (! $gameSwitches.value(34)) {
                $gameSystem.addChokyoTime(this._time);
            }

            if (history.boteId() == 1) {
    
            } else {
                let currentNinshinRate = actorHistory.countNinshinRate($gameSystem.day());
                if (lastNinshinRate < 100 && currentNinshinRate >= 100) {

                    registerSchedule(history, ScheduleType.NINSHIN, this._taneoyaId, false);
                    $gameSystem.timelineManager().push(new TimelineItem(TimelineType.NINSHIN, 0, actorId))
                }
            }*/
    };
    NikubenkiForecast.prototype.value = function () {
      switch (this.scheduleId()) {
        case ScheduleType.TANETSUKE:
          return this.nakadashi();
        case ScheduleType.TANETSUKE_BACK:
          return this.nakadashi();
        case ScheduleType.TANETSUKE_IN_PERSON:
          return this.nakadashi();
        case ScheduleType.TANETSUKE_DAIJIN:
          return this.nakadashi();
        case ScheduleType.ANAL:
          return this.anal();
        case ScheduleType.ANAL_IN_PERSON:
          return this.anal();
        case ScheduleType.FELA:
          return this.fela();
      }
      return 0;
    };
    NikubenkiForecast.prototype.scheduleId = function () {
      var type = this._param.type;
      for (
        var _i = 0, SCHEDULE_TYPE_LIST_1 = SCHEDULE_TYPE_LIST;
        _i < SCHEDULE_TYPE_LIST_1.length;
        _i++
      ) {
        var s = SCHEDULE_TYPE_LIST_1[_i];
        if (s == type) {
          return s;
        }
      }
      return null;
    };
    NikubenkiForecast.prototype.isEvent = function () {
      return this._param.skillPoint > 0;
    };
    NikubenkiForecast.prototype.canRakugaki = function () {
      if (this._taneoyaId <= 0) {
        return true;
      }
      var actor = $gameActors.actor(this._taneoyaId);
      if (actor.actor().meta["goblin"]) {
        return false;
      }
      return true;
    };
    NikubenkiForecast.prototype.taneoyaId = function () {
      return this._taneoyaId;
    };
    return NikubenkiForecast;
  })();
  Nore.NikubenkiForecast = NikubenkiForecast;
  var _hideMenuButton = Scene_Map.prototype.hideMenuButton;
  Scene_Map.prototype.hideMenuButton = function () {
    _hideMenuButton.call(this);
    this.hideNikubenkiInfo();
  };
  var _Scene_Map_updateMain = Scene_Map.prototype.updateMain;
  Scene_Map.prototype.updateMain = function () {
    if (this.isShowNikubenkiInfo()) {
      this.showNikubenkiInfo();
    } else {
      this.hideNikubenkiInfo();
    }
    _Scene_Map_updateMain.call(this);
  };
  var _Scene_Map_createDisplayObjects =
    Scene_Map.prototype.createDisplayObjects;
  Scene_Map.prototype.createDisplayObjects = function () {
    _Scene_Map_createDisplayObjects.call(this);
    if (this.isShowNikubenkiInfo()) {
      this.showNikubenkiInfo();
    } else {
      this.hideNikubenkiInfo();
    }
  };
  Scene_Map.prototype.isShowNikubenkiInfo = function () {
    if (!$gameSystem.inChokyo()) {
      // 調教中でない
      return false;
    }
    if ($gameSystem.isEroEvent()) {
      // エロ中
      return false;
    }
    if ($gameSystem.isToiletEroEvent()) {
      // トイレエロ中
      return false;
    }
    return true;
  };
  Scene_Map.prototype.showNikubenkiInfo = function () {
    if (!this._nikubenkiWindow) {
      this._nikubenkiWindow = new Window_Nikubenki();
      this._spriteset.addChild(this._nikubenkiWindow);
    }
    this._nikubenkiWindow.show();
  };
  Scene_Map.prototype.hideNikubenkiInfo = function () {
    if (this._nikubenkiWindow) {
      this._nikubenkiWindow.hide();
    }
  };
  var Window_Nikubenki = /** @class */ (function (_super) {
    __extends(Window_Nikubenki, _super);
    function Window_Nikubenki() {
      var _this = _super.call(this, new Rectangle(0, 0, 580, 210)) || this;
      _this.createTimeGauge();
      _this.createNinshinGauge();
      _this.update();
      return _this;
    }
    Window_Nikubenki.prototype.createTimeGauge = function () {
      this._timeGauge = new Sprite_TimeGauge();
      this._timeGauge.x = 150;
      this._timeGauge.y = 25;
      this.addChild(this._timeGauge);
    };
    Window_Nikubenki.prototype.createNinshinGauge = function () {
      this._ninshinGauge = new Sprite_NinshinGauge();
      this._ninshinGauge.x = 90;
      this._ninshinGauge.y = 55;
      this.addChild(this._ninshinGauge);
    };
    Window_Nikubenki.prototype.update = function () {
      _super.prototype.update.call(this);
      if (this.isChanged()) {
        this.updateDayEvent();
        this.refresh();
      }
    };
    Window_Nikubenki.prototype.updateDayEvent = function () {
      this._lastActorId = $gameSystem.chokyoActorId();
      var actor = $gameActors.actor(this._lastActorId);
      if (!actor) {
        return;
      }
      var event = actor.getLastHistory().getLastEvent();
      this._dayEvent = event;
      this._history = actor.getActorHistory();
    };
    Window_Nikubenki.prototype.refresh = function () {
      this.contents.clear();
      var actor = $gameActors.actor(this._lastActorId);
      if (!actor) {
        return;
      }
      this.contents.textColor = ColorManager.normalColor();
      this.contents.fontSize = 22;
      this.drawLabel();
      this.drawNakadashi();
      this.drawStatus();
      this._ninshinGauge.visible = this._lastActorId != 7;
    };
    Window_Nikubenki.prototype.drawLabel = function () {
      this._lastTime = $gameSystem.chokyoTime();
      this.drawText(TextManager.remainTime, 10, 10, 150);
      if (ConfigManager.laguage == "jp") {
        this.drawText(TextManager.nikubenkiResultRanshi, 10, 50, 100);
      } else {
        var y = 40;
        var texts = TextManager.nikubenkiResultRanshi.split(" ");
        for (var _i = 0, texts_1 = texts; _i < texts_1.length; _i++) {
          var t = texts_1[_i];
          this.drawText(t, 10, y, 100);
          y += 25;
        }
      }
    };
    Window_Nikubenki.prototype.isTimeOver = function () {
      return $gameTemp.isTimeOver();
    };
    Window_Nikubenki.prototype.drawNakadashi = function () {
      if (!this._dayEvent) {
        return;
      }
      this._lastForecast = $gameTemp.nikubenkiForecast();
      var y = 100;
      var x = 10;
      var interval = 180;
      this.drawText(getEroParamTitle("nakadashi"), x, y, 80);
      var nakadashi = this._history.countNakadashi($gameSystem.day());
      //this._dayEvent.countNakadashi()
      this.drawText(nakadashi, x, y, 130, "right");
      /*if (this._lastForecast.nakadashi() > 0) {
                this.contents.textColor = ColorManager.powerUpColor();
                this.drawText('+' + this._lastForecast.nakadashi(), x + 130, y, 100);
            }*/
      x += interval;
      this.contents.textColor = ColorManager.normalColor();
      this.drawText(getEroParamTitle("anal"), x, y, 80);
      var anal = this._history.countAnal($gameSystem.day());
      this.drawText(anal, x, y, 130, "right");
      /*if (this._lastForecast.anal() > 0) {
                this.contents.textColor = ColorManager.powerUpColor();
                this.drawText('+' + this._lastForecast.anal(), x + 130, y, 100);
            }*/
      x += interval;
      this.contents.textColor = ColorManager.normalColor();
      this.drawText(getEroParamTitle("fela"), x, y, 80);
      var fela = this._history.countFela();
      this.drawText(fela, x, y, 130, "right");
      /*if (this._lastForecast.fela() > 0) {
                this.contents.textColor = ColorManager.powerUpColor();
                this.drawText('+' + this._lastForecast.fela(), x + 130, y, 100);
            }*/
    };
    Window_Nikubenki.prototype.isChanged = function () {
      if (this._lastTime != $gameSystem.chokyoTime()) {
        return true;
      }
      if (this._lastActorId != $gameSystem.chokyoActorId()) {
        return true;
      }
      var forecast = $gameTemp.nikubenkiForecast();
      if (this._lastForecast != forecast) {
        return true;
      }
      var actor = $gameActors.actor(this._lastActorId);
      if (!actor) {
        return false;
      }
      var nasty = actor.getActorHistory().countNasty(undefined);
      if (this._lastNasty != nasty) {
        return true;
      }
      return false;
    };
    Window_Nikubenki.prototype.drawStatus = function () {
      var x = 10;
      var y = 136;
      var actor = $gameActors.actor(this._lastActorId);
      this.contents.textColor = ColorManager.normalColor();
      this.drawText(actor.nastyText(), x, y, 80);
      var nasty = actor.getActorHistory().countNasty(undefined);
      this._lastNasty = nasty;
      x += 20;
      var rank = $gameSystem.paramRank(nasty, true);
      if (rank != Rank.MAX) {
        this.drawText(nasty, x + 0, y, 126, "right");
      }
      this.drawRank(rank, x + 66, y + 6);
      /*if (this._lastForecast.nasty() > 0) {
                this.contents.textColor = ColorManager.powerUpColor();
                this.drawText('+' + this._lastForecast.nasty(), x + 126, y, 100);
            }*/
      this.contents.textColor = ColorManager.normalColor();
      var statusText = Nore.getStatusText(
        actor.getActorHistory(),
        actor.getLastHistory()
      );
      if (statusText.length > 1) {
        this.contents.fontSize = 20;
        y -= 10;
        this.drawText(statusText[0], x + 164, y, 320);
        this.drawText(statusText[1], x + 164, y + 24, 320);
      } else {
        this.drawText(statusText[0], x + 164, y, 320);
      }
    };
    return Window_Nikubenki;
  })(Window_Base);
  var Sprite_TimeGauge = /** @class */ (function (_super) {
    __extends(Sprite_TimeGauge, _super);
    function Sprite_TimeGauge() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Sprite_TimeGauge.prototype.currentValue = function () {
      return $gameSystem.chokyoTime();
    };
    Sprite_TimeGauge.prototype.currentMaxValue = function () {
      return 100;
    };
    Sprite_TimeGauge.prototype.updateBitmap = function () {
      var value = this.currentValue();
      var maxValue = this.currentMaxValue();
      if (value !== this._targetValue || maxValue !== this._targetMaxValue) {
        this.updateTargetValue(value, maxValue);
      }
      if (this._lastForecast != this.gaugeForecastRate()) {
        this._lastForecast = this.gaugeForecastRate();
        this.redraw();
      }
      this.updateGaugeAnimation();
      this.updateFlashing();
    };
    Sprite_TimeGauge.prototype.drawGaugeRect = function (x, y, width, height) {
      x -= 60;
      width = Math.max(0, width);
      var rate = this.gaugeRate();
      var fillW = Math.max(Math.floor((width - 2) * rate), 0);
      var fillH = height - 2;
      var color0 = this.gaugeBackColor();
      var color1 = this.gaugeColor1();
      var color2 = this.gaugeColor2();
      this.bitmap.fillRect(x, y, width, height, color0);
      if (this.isForecast()) {
        var forecast = this.gaugeForecastRate();
        var fillorecastW = Math.max(
          Math.floor((width - 2) * (1 - forecast)),
          0
        );
        var color = "#FF4444";
        ColorManager.deathColor();
        this.bitmap.gradientFillRect(x + 1, y + 1, fillW, fillH, color, color);
        this.bitmap.gradientFillRect(
          x + 1,
          y + 1,
          fillorecastW,
          fillH,
          color1,
          color2
        );
        return;
      }
      this.bitmap.gradientFillRect(x + 1, y + 1, fillW, fillH, color1, color2);
    };
    Sprite_TimeGauge.prototype.isForecast = function () {
      return this.gaugeForecastRate() > 0;
    };
    Sprite_TimeGauge.prototype.gaugeForecastRate = function () {
      return (this.currentValue() + $gameTemp.nikubenkiForecast().time()) / 100;
    };
    Sprite_TimeGauge.prototype.gaugeRate = function () {
      return 1 - this.currentValue() / this.currentMaxValue();
    };
    Sprite_TimeGauge.prototype.drawLabel = function () {};
    Sprite_TimeGauge.prototype.gaugeColor1 = function () {
      return ColorManager.mpGaugeColor1();
    };
    Sprite_TimeGauge.prototype.gaugeColor2 = function () {
      return ColorManager.mpGaugeColor2();
    };
    Sprite_TimeGauge.prototype.bitmapWidth = function () {
      return 390;
    };
    Sprite_TimeGauge.prototype.gaugeHeight = function () {
      return 20;
    };
    return Sprite_TimeGauge;
  })(Sprite_Gauge);
  var Sprite_NinshinGauge = /** @class */ (function (_super) {
    __extends(Sprite_NinshinGauge, _super);
    function Sprite_NinshinGauge() {
      var _this = (_super !== null && _super.apply(this, arguments)) || this;
      _this._wait = 0;
      _this._currentValue = -1;
      return _this;
    }
    Sprite_NinshinGauge.prototype.update = function () {
      this.updateActor();
      _super.prototype.update.call(this);
    };
    Sprite_NinshinGauge.prototype.updateActor = function () {
      if (this._lastActorId != $gameSystem.chokyoActorId()) {
        this._lastActorId = $gameSystem.chokyoActorId();
        if (this._lastActorId > 0) {
          this._actor = $gameActors.actor(this._lastActorId);
        }
      }
    };
    Sprite_NinshinGauge.prototype.currentValue = function () {
      if (this._currentValue >= 0) {
        return this._currentValue;
      }
      if (this._actor) {
        if (this._actor.actorId() == 7) {
          return 0;
        }
        this._currentValue = Math.min(
          this._actor.getActorHistory().countNinshinRate($gameSystem.day()),
          100
        );
      } else {
        this._currentValue = 0;
      }
      return this._currentValue;
    };
    Sprite_NinshinGauge.prototype.currentMaxValue = function () {
      return 100;
    };
    Sprite_NinshinGauge.prototype.updateBitmap = function () {
      if (this._wait > 0) {
        this._wait--;
        return;
      }
      this._currentValue = -1;
      var value = this.currentValue();
      var maxValue = this.currentMaxValue();
      if (value !== this._targetValue || maxValue !== this._targetMaxValue) {
        this.updateTargetValue(value, maxValue);
      }
      if (this._lastForecast != this.gaugeForecastRate()) {
        this._lastForecast = this.gaugeForecastRate();
        this.redraw();
      }
      this.updateGaugeAnimation();
      this.updateFlashing();
      this._wait = 5;
    };
    Sprite_NinshinGauge.prototype.drawGauge = function () {
      _super.prototype.drawGauge.call(this);
      this.drawNinshinMark();
    };
    Sprite_NinshinGauge.prototype.drawNinshinMark = function () {
      var xx = 40;
      var yy = 0;
      var ninshin = ImageManager.loadSystem("ninshin");
      if (
        this._targetValue + $gameTemp.nikubenkiForecast().ninshinDamage() >=
        100
      ) {
        this.bitmap.blt(ninshin, 0, 110, 70, 50, xx, yy);
      } else {
        this.bitmap.blt(ninshin, 0, 60, 70, 50, xx, yy);
      }
    };
    Sprite_NinshinGauge.prototype.drawGaugeRect = function (
      x,
      y,
      width,
      height
    ) {
      //x -= 60;
      y += 10;
      var rate = this.gaugeRate();
      var fillW = Math.floor((width - 2) * rate);
      var fillH = height - 2;
      var color0 = this.gaugeBackColor();
      var color1 = this.gaugeColor1();
      var color2 = this.gaugeColor2();
      this.bitmap.fillRect(x, y, width, height, color0);
      if (this.isForecast() && !$gameTemp.isTimeOver()) {
        var forecast = this.gaugeForecastRate();
        var fillorecastW = Math.floor((width - 2) * (1 - forecast));
        var color = "#FF4444";
        ColorManager.deathColor();
        this.bitmap.gradientFillRect(x + 1, y + 1, fillW, fillH, color, color);
        this.bitmap.gradientFillRect(
          x + 1,
          y + 1,
          fillorecastW,
          fillH,
          color1,
          color2
        );
        return;
      }
      this.bitmap.gradientFillRect(x + 1, y + 1, fillW, fillH, color1, color2);
    };
    Sprite_NinshinGauge.prototype.isForecast = function () {
      return this.gaugeForecastRate() > 0;
    };
    Sprite_NinshinGauge.prototype.gaugeForecastRate = function () {
      var rate =
        (this.currentValue() + $gameTemp.nikubenkiForecast().ninshinDamage()) /
        100;
      return Math.min(1, rate);
    };
    Sprite_NinshinGauge.prototype.gaugeRate = function () {
      return 1 - this.currentValue() / this.currentMaxValue();
    };
    Sprite_NinshinGauge.prototype.drawLabel = function () {};
    Sprite_NinshinGauge.prototype.gaugeColor1 = function () {
      return ColorManager.hpGaugeColor1();
    };
    Sprite_NinshinGauge.prototype.gaugeColor2 = function () {
      return ColorManager.hpGaugeColor2();
    };
    Sprite_NinshinGauge.prototype.bitmapWidth = function () {
      return 390;
    };
    Sprite_NinshinGauge.prototype.gaugeHeight = function () {
      return 20;
    };
    Sprite_NinshinGauge.prototype.bitmapHeight = function () {
      return 60;
    };
    return Sprite_NinshinGauge;
  })(Sprite_Gauge);
})(Nore || (Nore = {}));
