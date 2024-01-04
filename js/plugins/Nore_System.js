/*:ja
 * @target MZ
 * @author ル
 *
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
var TaneoyaId;
(function (TaneoyaId) {
  TaneoyaId[(TaneoyaId["none"] = 0)] = "none";
  TaneoyaId[(TaneoyaId["banzoku"] = 1)] = "banzoku";
  TaneoyaId[(TaneoyaId["chosyuhei"] = 2)] = "chosyuhei";
  TaneoyaId[(TaneoyaId["goblin"] = 3)] = "goblin";
  TaneoyaId[(TaneoyaId["vagrant"] = 4)] = "vagrant";
  TaneoyaId[(TaneoyaId["minister"] = 5)] = "minister";
  TaneoyaId[(TaneoyaId["bar"] = 6)] = "bar";
  TaneoyaId[(TaneoyaId["charles"] = 7)] = "charles";
  TaneoyaId[(TaneoyaId["gray"] = 8)] = "gray";
  TaneoyaId[(TaneoyaId["loli"] = 9)] = "loli";
})(TaneoyaId || (TaneoyaId = {}));
var PARAM_RANK = [50, 100, 200, 320, 500];
var CostumeSaver = /** @class */ (function () {
  function CostumeSaver(actorId) {
    this._faceId = -1;
    this._hoppeId = 0;
    this._namidaId = 0;
    this._namidaAcce = 0;
    this._boteId = 0;
    this._hightlight = Hightlight.normal;
    this.saveCostume(actorId);
  }
  CostumeSaver.prototype.saveCostume = function (actorId) {
    this._actorId = actorId;
    var actor = $gameActors.actor(actorId);
    this._outerId = actor.outerId;
    this._outerTopId = actor.outerTopId;
    this._outerBottomId = actor.outerBottomId;
    this._armId = actor.armId;
    this._legId = actor.legId;
    this._innerTopId = actor.innerTopId;
    this._innerBottomId = actor.innerBottomId;
    this._poseId = actor.poseId;
    this._boteId = actor.boteId;
    this._hoppeId = actor.hoppeId;
    this._namidaId = actor.namidaId;
    this._namidaAcce = actor.getNamidaAcceId();
    this._hightlight = actor.hightlight();
    this._acceMap = JsonEx.makeDeepCopy(actor.acceMap);
  };
  CostumeSaver.prototype.restoreCostume = function (argActor, includeAcce) {
    if (includeAcce === void 0) {
      includeAcce = true;
    }
    var actor = argActor || $gameActors.actor(this._actorId);
    actor.setOuterId(this._outerId);
    actor.setOuterTopId(this._outerTopId);
    actor.setOuterBottomId(this._outerBottomId);
    actor.setArmId(this._armId);
    actor._legId = this._legId;
    actor._innerTopId = this._innerTopId;
    actor._innerBottomId = this._innerBottomId;
    actor.setHoppeId(this._hoppeId);
    actor.setDefaultHoppeId(this._hoppeId);
    actor.setPoseId(this._poseId);
    actor.setNamidaId(this._namidaId);
    actor.setHightlight(this._hightlight);
    actor.setNamidaAcce(this._namidaAcce);
    if (includeAcce) {
      var list = this.fixedAcceList(actor.acceMap);
      actor.acceMap = JsonEx.makeDeepCopy(this._acceMap);
      for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
        var armorId = list_1[_i];
        actor.acceMap[armorId] = true;
      }
    }
    actor.setCacheChanged();
  };
  CostumeSaver.prototype.fixedAcceList = function (acceMap) {
    var result = [];
    for (var key in acceMap) {
      if (acceMap[key]) {
        var armor = $dataArmors[key];
        if (armor.meta["lock"]) {
          result.push(key);
        }
      }
    }
    return result;
  };
  CostumeSaver.prototype.saveFace = function (faceId, hoppeId) {
    this._faceId = faceId;
    this._hoppeId = hoppeId;
  };
  CostumeSaver.prototype.boteId = function () {
    return this._boteId || 0;
  };
  CostumeSaver.prototype.faceId = function () {
    return this._faceId || 1;
  };
  CostumeSaver.prototype.hoppeId = function () {
    return this._hoppeId || 0;
  };
  CostumeSaver.prototype.outerId = function () {
    return this._outerId;
  };
  CostumeSaver.prototype.innerBottomId = function () {
    return this._innerBottomId;
  };
  CostumeSaver.prototype.innerTopId = function () {
    return this._innerTopId;
  };
  CostumeSaver.prototype.legId = function () {
    return this._legId;
  };
  CostumeSaver.prototype.hasAcce = function (acceId) {
    return this._acceMap[acceId];
  };
  CostumeSaver.prototype.isKuroChikubi = function () {
    if (this._acceMap[1097]) {
      return true;
    }
    if (this._acceMap[1098]) {
      return false;
    }
    if (this._boteId == 2) {
      return true;
    }
    return false;
  };
  CostumeSaver.prototype.actorId = function () {
    return this._actorId;
  };
  return CostumeSaver;
})();
var CharacterCostume = /** @class */ (function (_super) {
  __extends(CharacterCostume, _super);
  function CharacterCostume() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  CharacterCostume.prototype.outerId = function () {
    return $gameActors.actor(this._actorId).outerId;
  };
  CharacterCostume.prototype.innerBottomId = function () {
    return $gameActors.actor(this._actorId).innerBottomId;
  };
  CharacterCostume.prototype.innerTopId = function () {
    return $gameActors.actor(this._actorId).innerTopId;
  };
  CharacterCostume.prototype.legId = function () {
    return $gameActors.actor(this._actorId).legId;
  };
  return CharacterCostume;
})(CostumeSaver);
var ScenarioEvent = /** @class */ (function () {
  function ScenarioEvent(file, ero, forEro) {
    this.file = file;
    this.ero = ero;
    this.forEro = forEro;
  }
  return ScenarioEvent;
})();
var ALPHA_INTERVAL = 0.04;
var ALPHA_INTERVAL2 = 0.1;
DataManager.setupNewGame = function () {
  this.createGameObjects();
  this.selectSavefileForNewGame();
  $gameParty.setupStartingMembers();
  $gamePlayer.setupForNewGame();
  $gameSystem.setupForNewGame();
  Graphics.frameCount = 0;
};
var Game_System2 = /** @class */ (function (_super) {
  __extends(Game_System2, _super);
  function Game_System2() {
    var _this = (_super !== null && _super.apply(this, arguments)) || this;
    _this._historyManager = new HistoryManager();
    _this._tryCount = 0;
    _this._timelineManager = new TimelineManager();
    _this._shopItemsEquip = [];
    _this._shopItemsItem = [];
    _this._equipId = 0;
    _this._recordList = [];
    _this._chokyoTime = 0;
    _this._manAlpha = 1;
    _this._outerAlpha = 1;
    _this._manAlphaOff = false;
    _this._warpHistory = [];
    _this._expBoxCount = 0;
    _this._additionalDay = 0;
    _this._hildaNinshin = false;
    return _this;
  }
  Game_System2.prototype.initialize = function () {
    _super.prototype.initialize.call(this);
    this._nextId = 0;
    this._gameId = this.initGameId();
  };
  Game_System2.prototype.setupForNewGame = function () {
    $gameSwitches.setValue(40, Nore.isTaikenban());
    $gameSwitches.setValue(39, Nore.isFreeTaikenban());
  };
  Game_System2.prototype.nextStage = function () {
    var lastRecord = this.lastRecord();
    if (lastRecord) {
      lastRecord.setEndDay(this.realDay());
      lastRecord.setEndTime(this.playtime());
      lastRecord.setClearMembers($gameParty.battleMembers(lastRecord.stage()));
    }
    this._recordList.push(
      new Game_Record(
        this.stageId(),
        this.realDay(),
        this.playtime(),
        this.difficulty()
      )
    );
  };
  Game_System2.prototype.setDifficulty = function (d) {
    $gameVariables.setValue(40, d);
  };
  Game_System2.prototype.difficulty = function () {
    return $gameVariables.value(40);
  };
  Game_System2.prototype.isHard = function () {
    return this.difficulty() == Difficulty.HARD;
  };
  Game_System2.prototype.lastRecord = function () {
    return this._recordList[this._recordList.length - 1];
  };
  Game_System2.prototype.recordList = function () {
    return this._recordList;
  };
  Game_System2.prototype.isAutosaveEnabled = function () {
    if ($gameSwitches.value(59)) {
      // 最下層
      return true;
    }
    if ($gameSwitches.value(1)) {
      // ダンジョン
      return false;
    }
    if ($gameSwitches.value(999)) {
      // 回想中
      return false;
    }
    if ($gameSwitches.value(992)) {
      // オートセーブ禁止
      return false;
    }
    return _super.prototype.isAutosaveEnabled.call(this);
  };
  Game_System2.prototype.initGameId = function () {
    var d = new Date();
    var yy = d.getFullYear();
    var m = d.getMonth() + 1;
    var dd = d.getDay();
    var hh = d.getHours();
    var mm = d.getMinutes();
    var ss = d.getSeconds();
    return yy + "-" + m + "-" + dd + "_" + hh + "_" + mm + "_" + ss;
  };
  Game_System2.prototype.nextEquipId = function () {
    this._equipId = this._equipId || 0;
    this._equipId++;
    return this._equipId;
  };
  Game_System2.prototype.stageId = function () {
    return $gameVariables.value(2);
  };
  Game_System2.prototype.floorCount = function () {
    return $gameVariables.value(3);
  };
  Game_System2.prototype.gameId = function () {
    return this._gameId;
  };
  Game_System2.prototype.getEro = function (actorId) {
    this.eroStatus[actorId] = this.eroStatus[actorId] || this.newEro(actorId);
    return this.eroStatus[actorId];
  };
  Game_System2.prototype.newEro = function (actorId) {
    var ero = new Erostatus(actorId);
    return ero;
  };
  Game_System2.prototype.isEventReserved = function (actorId) {
    this._eventReservation = this._eventReservation || {};
    this._eventReservation[actorId] = this._eventReservation[actorId] || [];
    return this._eventReservation[actorId].length > 0;
  };
  Game_System2.prototype.isEroEventReserved = function (actorId) {
    this._eventReservation = this._eventReservation || {};
    this._eventReservation[actorId] = this._eventReservation[actorId] || [];
    if (this._eventReservation[actorId].length === 0) {
      return false;
    }
    return this._eventReservation[actorId][0].ero;
  };
  Game_System2.prototype.endEvent = function (file) {
    this._finishedEvents = this._finishedEvents || {};
    this._finishedEvents[file] = true;
  };
  Game_System2.prototype.restoreEvent = function (file) {
    this._finishedEvents = this._finishedEvents || {};
    p("restore:" + file + " " + this._finishedEvents[file]);
    this._finishedEvents[file] = false;
  };
  Game_System2.prototype.isEndEvent = function (file) {
    this._finishedEvents = this._finishedEvents || {};
    return this._finishedEvents[file];
  };
  Game_System2.prototype.getReservedActorEvent = function (actorId) {
    this._eventReservation = this._eventReservation || {};
    this._eventReservation[actorId] = this._eventReservation[actorId] || [];
    if (this._eventReservation[actorId][0]) {
      return this._eventReservation[actorId][0].file;
    }
    return null;
  };
  Game_System2.prototype.reserveActorEvent = function (
    actorId,
    scenarioId,
    ero,
    forEro
  ) {
    if (this.isEndEvent(scenarioId)) {
      //p('end' + scenarioId)
      return;
    }
    this._eventReservation = this._eventReservation || {};
    this._eventReservation[actorId] = this._eventReservation[actorId] || [];
    this._eventReservation[actorId].push(
      new ScenarioEvent(scenarioId, ero, forEro)
    );
  };
  Game_System2.prototype.clearReservedEvent = function () {
    this._eventReservation = {};
  };
  /*get keikenVillager() {
        p('keikenVillager')
        let n = 0;
        const checkedId = {};
        const history = this.eroHistory();
        for (const h of history) {
            if (h.eroId == 'sex') {
                if (! $gameActors.actor(h.actorId).actor().meta['villager']){
                    continue;
                }
                if (checkedId[h.actorId]) {
                    continue;
                }
                n++;
                checkedId[h.actorId] = true;
            }
        }
        return n;
    }*/
  Game_System2.prototype.hasOtherSyusan = function (taneoyaId) {
    for (var _i = 0, _a = this._historyList; _i < _a.length; _i++) {
      var h = _a[_i];
      if (h.dayEroHistory().syusanTaneoya) {
        if (h.dayEroHistory().syusanTaneoya != taneoyaId) {
          return true;
        }
      }
      if (h.nightEroHistory().syusanTaneoya) {
        if (h.nightEroHistory().syusanTaneoya != taneoyaId) {
          return true;
        }
      }
    }
    return false;
  };
  Game_System2.prototype.getMainEro = function () {
    var ero = this.getEro(5);
    ero.day = this.day();
    return ero;
  };
  Game_System2.prototype.day = function () {
    return $gameVariables.value(1);
  };
  Game_System2.prototype.realDay = function () {
    return $gameVariables.value(1) - this.additionalDay();
  };
  Game_System2.prototype.nextDay = function () {
    $gameVariables.setValue(1, this.day() + 1);
  };
  Game_System2.prototype.countEro = function (actorId, label, day) {
    var history = this.historyManager().getActorHistory(actorId);
    return history.getHistoryTotal(label, day);
  };
  Game_System2.prototype.calcTightening = function (actorId, label, day) {
    var history = this.historyManager().getActorHistory(actorId);
    return history.calcTightening(label, day);
  };
  Game_System2.prototype.countPeople = function (type, day) {
    if (day === void 0) {
      day = 9999;
    }
    var n = 0;
    for (var _i = 0, _a = this._historyList; _i < _a.length; _i++) {
      var h = _a[_i];
      if (h.day() > day) {
        continue;
      }
      if (type == "keikenSakaba") {
        n += h.dayEroHistory().countSakaba();
        n += h.nightEroHistory().countSakaba();
      } else {
        n += h.dayEroHistory().countCity();
        n += h.nightEroHistory().countCity();
      }
    }
    return n;
  };
  Game_System2.prototype.hasItem = function (day, item) {
    if (day == this.day()) {
      return $gameParty.hasItem(item);
    }
    var history = this.findHistory(day);
    return history.hasItem(item);
  };
  Game_System2.prototype.historyManager = function () {
    return this._historyManager;
  };
  Game_System2.prototype.captivate = function (actorId) {
    this._historyManager.getActorHistory(actorId).captivate();
  };
  Game_System2.prototype.isRecollection = function () {
    return $gameSwitches.value(999);
  };
  Game_System2.prototype.setDungeonInfo = function (info) {
    this._dungeonInfo = info;
  };
  Game_System2.prototype.getDungeonInfo = function () {
    return this._dungeonInfo;
  };
  Game_System2.prototype.timelineManager = function () {
    return this._timelineManager;
  };
  Game_System2.prototype.isMenuEnabled = function () {
    if ($gameSwitches.value(13)) {
      return false;
    }
    return _super.prototype.isMenuEnabled.call(this);
  };
  Game_System2.prototype.setShopItemsEquip = function (list) {
    this._shopItemsEquip = list;
  };
  Game_System2.prototype.shopItemsEquip = function () {
    return this._shopItemsEquip;
  };
  Game_System2.prototype.setShopItemsItem = function (list) {
    this._shopItemsItem = list;
    this._expBoxCount = 0;
  };
  Game_System2.prototype.shopItemsItem = function () {
    return this._shopItemsItem;
  };
  Game_System2.prototype.nikubenkiRoomCount = function () {
    return $gameVariables.value(15);
  };
  Game_System2.prototype.isMorning = function () {
    return !$gameSwitches.value(24);
  };
  Game_System2.prototype.chokyoActorId = function () {
    return $gameVariables.value(5);
  };
  Game_System2.prototype.sarachiActorId = function () {
    return $gameVariables.value(128);
  };
  Game_System2.prototype.inChokyo = function () {
    return $gameSwitches.value(3);
  };
  Game_System2.prototype.isNight = function () {
    return !this.isMorning();
  };
  Game_System2.prototype.isOpenNight = function () {
    return true;
    //return this.day() > 1;
  };
  Game_System2.prototype.chokyoTime = function () {
    return this._chokyoTime;
  };
  Game_System2.prototype.addChokyoTime = function (n) {
    this._chokyoTime += n;
  };
  Game_System2.prototype.clearChokyoTime = function () {
    this._chokyoTime = 0;
  };
  Game_System2.prototype.setChokyoTimeNotOver = function () {
    if (this._chokyoTime >= 100) {
      this._chokyoTime = 99;
    }
  };
  Game_System2.prototype.currentPlace = function () {
    return $gameVariables.value(7);
  };
  Game_System2.prototype.setCurrentPlace = function (n) {
    $gameVariables.setValue(7, n);
  };
  Game_System2.prototype.isEroEvent = function () {
    return $gameSwitches.value(26);
  };
  Game_System2.prototype.isToiletEroEvent = function () {
    return $gameSwitches.value(6);
  };
  Game_System2.prototype.isEroBackSexAnime = function () {
    return $gameSwitches.value(32);
  };
  Game_System2.prototype.isEroFelaAnime = function () {
    return $gameSwitches.value(31);
  };
  Game_System2.prototype.isEroSexAnime = function () {
    return $gameSwitches.value(30);
  };
  Game_System2.prototype.isInPersonSexAnime = function () {
    return $gameSwitches.value(37);
  };
  Game_System2.prototype.obedienceRank = function (obedience) {
    if (obedience < 30) {
      return 0;
    }
    if (obedience < 60) {
      return 1;
    }
    if (obedience < 90) {
      return 2;
    }
    return 3;
  };
  Game_System2.prototype.paramRank = function (obedience, max) {
    if (obedience < PARAM_RANK[0]) {
      return Rank.F;
    }
    if (obedience < PARAM_RANK[1]) {
      return Rank.E;
    }
    if (obedience < PARAM_RANK[2]) {
      return Rank.D;
    }
    if (obedience < PARAM_RANK[3]) {
      return Rank.C;
    }
    if (obedience < PARAM_RANK[4]) {
      return Rank.B;
    }
    if (max) {
      return Rank.MAX;
    } else {
      return Rank.A;
    }
  };
  Game_System2.prototype.manAlpha = function () {
    return this._manAlpha;
  };
  Game_System2.prototype.upManAlpha = function () {
    if (this._manAlphaOff) {
      return;
    }
    this._manAlpha += ALPHA_INTERVAL;
    this._manAlpha = Math.min(1, this._manAlpha);
  };
  Game_System2.prototype.downManAlpha = function () {
    if (this._manAlphaOff) {
      return;
    }
    this._manAlpha -= ALPHA_INTERVAL;
    this._manAlpha = Math.max(0, this._manAlpha);
  };
  Game_System2.prototype.resetManAlpha = function () {
    this._manAlpha = 1;
  };
  Game_System2.prototype.offManAlpha = function () {
    this.resetManAlpha();
    this._manAlphaOff = true;
  };
  Game_System2.prototype.onManAlpha = function () {
    this._manAlphaOff = false;
  };
  Game_System2.prototype.outerAlpha = function () {
    if ($gameParty.inBattle()) {
      return 1;
    }
    if (SceneManager._scene instanceof Scene_Battle) {
      // プリ描画時
      return 1;
    }
    return this._outerAlpha;
  };
  Game_System2.prototype.upOuterAlpha = function () {
    this._outerAlpha += ALPHA_INTERVAL2;
    this._outerAlpha = Math.min(1, this._outerAlpha);
    this.onOuterAlphaChanged();
  };
  Game_System2.prototype.downOuterAlpha = function () {
    this._outerAlpha -= ALPHA_INTERVAL2;
    this._outerAlpha = Math.max(0, this._outerAlpha);
    this.onOuterAlphaChanged();
  };
  Game_System2.prototype.resetOuterAlpha = function () {
    this._outerAlpha = 1;
  };
  Game_System2.prototype.onOuterAlphaChanged = function () {
    for (var _i = 0, _a = $gameParty.allEroMembers(); _i < _a.length; _i++) {
      var actor = _a[_i];
      actor.setCacheChanged();
    }
    $gameActors.actor(9).setCacheChanged();
    $gameActors.actor(20).setCacheChanged();
  };
  Game_System2.prototype.getTaneoyaName = function (taneoyaId) {
    return getTaneoyaName(taneoyaId);
  };
  Game_System2.prototype.warpHistory = function (actorId) {
    this._warpHistory[actorId] =
      this._warpHistory[actorId] || new WarpHistory(actorId);
    return this._warpHistory[actorId];
  };
  Game_System2.prototype.isTaikenban = function () {
    return $gameSwitches.value(40);
  };
  Game_System2.prototype.isFreeTaikenban = function () {
    return $gameSwitches.value(39);
  };
  Game_System2.prototype.onAfterLoad = function () {
    _super.prototype.onAfterLoad.call(this);
    if (!$gameSwitches.value(996)) {
      this.resetOuterAlpha();
    }
    $gameSwitches.setValue(40, Nore.isTaikenban());
    $gameSwitches.setValue(39, Nore.isFreeTaikenban());
    $gameParty.onAfterLoad();
  };
  Game_System2.prototype.isAutoLevelUp = function () {
    if (this.isLevelNoLimit()) {
      return true;
    }
    return false;
  };
  Game_System2.prototype.isLevelNoLimit = function () {
    return true;
    /*
        switch (this.difficulty()) {
            case Difficulty.VERY_EASY:
            case Difficulty.EASY:
                return true;
        }
        return false;
        */
  };
  Game_System2.prototype.plusExpBox = function () {
    this._expBoxCount++;
  };
  Game_System2.prototype.expBoxCount = function () {
    return this._expBoxCount;
  };
  Game_System2.prototype.calcCursedArmorExp = function () {
    $gameTemp.onBattleStart();
    var troop = new Game_Troop2();
    troop.selectTroopId($gameParty.calcTroopLevel());
    return troop.expTotal();
  };
  Game_System2.prototype.isRightTachieVisible = function () {
    return $gameSwitches.value(5) || $gameSwitches.value(105);
  };
  Game_System2.prototype.isCJK = function () {
    if (ConfigManager.language == "en") {
      return false;
    }
    return _super.prototype.isCJK.call(this);
  };
  Game_System2.prototype.isEndlessHMode = function () {
    return $gameSwitches.value(83);
  };
  Game_System2.prototype.plusAdditionalDay = function () {
    this._additionalDay = this.additionalDay() + 1;
  };
  Game_System2.prototype.additionalDay = function () {
    return this._additionalDay || 0;
  };
  Game_System2.prototype.isSaveEnabled = function () {
    if (this.difficulty() != Difficulty.HARD) {
      return true;
    }
    if ($gameTemp.isPlaytest()) {
      return true;
    }
    return !$gameParty.inDungeon();
  };
  Game_System2.prototype.getDifficultyText = function (d) {
    if (d === void 0) {
      d = null;
    }
    if (d === null) {
      d = this.difficulty();
    }
    switch (d) {
      case Difficulty.DUNGEON_SKIP:
        return TextManager.dungeonSkip;
      case Difficulty.VERY_EASY:
        return TextManager.veryEasy;
      case Difficulty.EASY:
        return TextManager.easy;
      case Difficulty.NORMAL:
        return TextManager.normal;
      case Difficulty.HARD:
        return TextManager.hard;
    }
    return "";
  };
  Game_System2.prototype.ninshinRate = function () {
    switch ($gameVariables.value(100)) {
      case 1:
        return 2;
      case 2:
        return 0;
    }
    return 1;
  };
  Game_System2.prototype.calcHildaNinshinDay = function () {
    if (this._hildaNinshin) {
      return 0;
    }
    return this.stageId() * 4 - this.realDay() + 2;
  };
  Game_System2.prototype.ninshinHilda = function () {
    this._hildaNinshin = true;
  };
  Game_System2.prototype.isEroAcceAllOpened = function () {
    return $gameSwitches.value(997);
  };
  return Game_System2;
})(Game_System);
