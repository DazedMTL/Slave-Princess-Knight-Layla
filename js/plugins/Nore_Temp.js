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
var Game_Temp2 = /** @class */ (function (_super) {
  __extends(Game_Temp2, _super);
  function Game_Temp2() {
    var _this = (_super !== null && _super.apply(this, arguments)) || this;
    _this.ninshinDamage = 0;
    _this.taneoya = 0;
    _this._ninshinTotal = 100;
    _this._messageVisible = true;
    _this.eroStatus = null;
    _this.costume = null;
    _this.lastCostume = null;
    _this.history = null;
    _this.lastHistoryIndex = 0;
    _this.bufferedInput = false;
    _this.historyFaceId = 1;
    _this._damageCount = 0;
    _this._eroBaseId = 0;
    _this.isCancelMenu = false;
    _this.hideStateInfo = false;
    _this._aegiIds = [];
    _this._autoBattle = false;
    _this._yariheyaEventList = [];
    _this._yariheyaEventIndex = -1;
    return _this;
  }
  Game_Temp2.prototype.initialize = function () {
    _super.prototype.initialize.call(this);
    this.ignoreFiles = {};
  };
  Game_Temp2.prototype.setEroId = function (id) {
    this._eroId = id;
  };
  Game_Temp2.prototype.eroId = function () {
    return this._eroId;
  };
  Game_Temp2.prototype.tempTreasure = function () {
    if (this._tempTreasure) {
      return this._tempTreasure;
    }
    if ($gameSwitches.value(75)) {
      this._tempTreasure = Nore.selectTreasureEroItems();
    } else {
      this._tempTreasure = Nore.selectTreasureItems();
    }
    return this._tempTreasure;
  };
  Game_Temp2.prototype.isTreasureEmpty = function () {
    return this._tempTreasure.length == 0;
  };
  Game_Temp2.prototype.clearTreasure = function () {
    this._tempTreasure = null;
  };
  Game_Temp2.prototype.updateBattleCommand = function (b) {
    this._showBattleCommand = b;
  };
  Game_Temp2.prototype.isBattleCommand = function () {
    return this._showBattleCommand && !$gameMessage.isBusy();
  };
  Game_Temp2.prototype.changeMessageVisible = function () {
    this._messageVisible = !this._messageVisible;
  };
  Game_Temp2.prototype.isMessageVisible = function () {
    return this._messageVisible;
  };
  Game_Temp2.prototype.upEroInfo = function () {
    this._upEroInfo = this._upEroInfo || new Nore.UpEroInfo();
    return this._upEroInfo;
  };
  Game_Temp2.prototype.clearUpEroInfo = function () {
    this._upEroInfo = null;
  };
  Object.defineProperty(Game_Temp2.prototype, "ninshinTotal", {
    get: function () {
      return this._ninshinTotal;
    },
    set: function (n) {
      this._ninshinTotal = Math.trunc(n);
    },
    enumerable: true,
    configurable: true,
  });
  Game_Temp2.prototype.removeIgnoreFileSet = function (base, index) {
    // p(base )
    for (var i = 1; i < 1100; i++) {
      var id = i;
      var idString = id.padZero(2);
      delete this.ignoreFiles[base + "_" + idString + "_" + index.padZero(2)];
    }
  };
  Game_Temp2.prototype.addIgnoreFileSet = function (base, index) {
    for (var i = 1; i < 1100; i++) {
      var id = i;
      var idString = id.padZero(2);
      this.ignoreFiles[base + "_" + idString + "_" + index.padZero(2)] = true;
    }
  };
  Game_Temp2.prototype.addIgnoreFiles = function (list) {
    if (!list) {
      return;
    }
    for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
      var file = list_1[_i];
      this.ignoreFiles[file] = true;
    }
  };
  Game_Temp2.prototype.clearIgnoreFiles = function () {
    this.ignoreFiles = {};
  };
  Game_Temp2.prototype.setNextScenario = function (id) {
    this._nextScenario = id;
  };
  Game_Temp2.prototype.nextScenario = function () {
    return this._nextScenario;
  };
  Game_Temp2.prototype.clearNextScenario = function () {
    this._nextScenario = null;
  };
  Game_Temp2.prototype.hasNextScenario = function () {
    return this._nextScenario != null;
  };
  Game_Temp2.prototype.showGion = function (id) {
    this.hideGion();
    this.gionId = id;
    var xx = $gameVariables.value(41);
    var yy = $gameVariables.value(42);
    var scale = $gameVariables.value(43) || 100;
    var picId = Nore.GION_PIC_ID;
    if ($gameScreen.picture(picId) && $gameScreen.picture(picId)._name != "") {
      picId++;
    }
    $gameScreen.showPicture(
      picId,
      Nore.gionPrefix + this.gionId,
      0,
      xx,
      yy,
      scale,
      scale,
      255,
      PIXI.BLEND_MODES.NORMAL
    );
  };
  Game_Temp2.prototype.hideGion = function () {
    this.gionId = null;
    $gameScreen.erasePicture(Nore.GION_PIC_ID);
    $gameScreen.erasePicture(Nore.GION_PIC_ID + 1);
  };
  Game_Temp2.prototype.showAegi = function (id) {
    this.hideAegi();
    this.aegiId = id;
    var xx = $gameVariables.value(54);
    var yy = $gameVariables.value(55);
    var scale = $gameVariables.value(56) || 100;
    var picId = Nore.AEGI_PIC_ID;
    if ($gameScreen.picture(picId) && $gameScreen.picture(picId)._name != "") {
      picId++;
    }
    $gameScreen.showPicture(
      picId,
      Nore.aegiPrefix + this.aegiId,
      0,
      xx,
      yy,
      scale,
      scale,
      255,
      PIXI.BLEND_MODES.NORMAL
    );
  };
  Game_Temp2.prototype.hideAegi = function () {
    this.aegiId = null;
    $gameScreen.erasePicture(Nore.AEGI_PIC_ID);
    $gameScreen.erasePicture(Nore.AEGI_PIC_ID + 1);
  };
  Game_Temp2.prototype.onBattleStart = function () {
    this._damageCount = 0;
  };
  Game_Temp2.prototype.onDamage = function () {
    this._damageCount++;
  };
  Game_Temp2.prototype.isNoDamage = function () {
    return this._damageCount == 0;
  };
  Game_Temp2.prototype.is1Damage = function () {
    return this._damageCount == 1;
  };
  Game_Temp2.prototype.is2Damage = function () {
    return this._damageCount == 2;
  };
  Game_Temp2.prototype.setEroBaseId = function (baseId) {
    this._eroBaseId = baseId;
  };
  Game_Temp2.prototype.eroBaseId = function () {
    return this._eroBaseId;
  };
  Game_Temp2.prototype.punishScenario = function () {
    return this._punishScenario;
  };
  Game_Temp2.prototype.setPunishScenario = function (s) {
    this._punishScenario = s;
  };
  Game_Temp2.prototype.nikubenkiForecast = function () {
    this._nikubenkiForecast =
      this._nikubenkiForecast ||
      new Nore.NikubenkiForecast(Nore.NIKUBENKI_FORECAST_EMPTY, 0);
    return this._nikubenkiForecast;
  };
  Game_Temp2.prototype.setNikubenkiForecast = function (n) {
    this._lastNikubenkiForecast = this._nikubenkiForecast;
    this._nikubenkiForecast = n;
  };
  Game_Temp2.prototype.lastNikubenkiForecast = function () {
    this._lastNikubenkiForecast =
      this._lastNikubenkiForecast ||
      new Nore.NikubenkiForecast(Nore.NIKUBENKI_FORECAST_EMPTY, 0);
    return this._lastNikubenkiForecast;
  };
  Game_Temp2.prototype.isTimeOver = function () {
    return false;
    //return this.nikubenkiForecast().time() > 120 - $gameSystem.chokyoTime();
  };
  Game_Temp2.prototype.setAegiIds = function (ids) {
    this._aegiIds = ids;
  };
  Game_Temp2.prototype.randomAegi = function () {
    return Nore.shuffle(this._aegiIds)[0];
  };
  Game_Temp2.prototype.maxNakadashiRakuagki = function () {
    var max = $gameVariables.value(58);
    if (max === 0) {
      //console.error('中出し落書き最大数が設定されていません');
    }
    return max;
  };
  Game_Temp2.prototype.startAutoBattle = function () {
    this._autoBattle = true;
  };
  Game_Temp2.prototype.isAutoBattle = function () {
    return this._autoBattle;
  };
  Game_Temp2.prototype.cancelAutoBattle = function () {
    this._autoBattle = false;
  };
  Game_Temp2.prototype.requestAnimation = function (
    targets,
    animationId,
    mirror
  ) {
    if (mirror === void 0) {
      mirror = false;
    }
    if ($dataAnimations[animationId]) {
      var request = {
        targets: targets,
        animationId: animationId,
        mirror: mirror,
      };
      this._animationQueue.push(request);
      for (var _i = 0, targets_1 = targets; _i < targets_1.length; _i++) {
        var target = targets_1[_i];
        if (target && target.startAnimation) {
          target.startAnimation();
        }
      }
    }
  };
  Game_Temp2.prototype.setBathroomActors = function (actor1, actor2) {
    this._bathroomActor1 = actor1;
    this._bathroomActor2 = actor2;
  };
  Game_Temp2.prototype.resetYariheyaEvent = function () {
    this._yariheyaEventList = [];
    this._yariheyaEventIndex = -1;
  };
  Game_Temp2.prototype.pushYariheyaEvent = function (type) {
    this._yariheyaEventList.push(type);
  };
  Game_Temp2.prototype.yariheyaEvent = function () {
    if (this._yariheyaEventIndex >= 0) {
      return this._yariheyaEventList[this._yariheyaEventIndex];
    }
    var dice = Math.randomInt(this._yariheyaEventList.length);
    this._yariheyaEventIndex = dice;
    return this._yariheyaEventList[this._yariheyaEventIndex];
  };
  return Game_Temp2;
})(Game_Temp);
