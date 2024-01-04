/*:ja
 * @target MZ
 * @author ル
 *
 */
var Nore;
(function (Nore) {
  var pluginName = "Nore_Ero";
})(Nore || (Nore = {}));
var Erostatus = /** @class */ (function () {
  function Erostatus(actorId) {
    this.keikenPeople = 0;
    this.keikenMonster = 0;
    this.bote = 0;
    this.mob = {};
    this.taneoya = 0;
    this.ninshinRate = 0;
    this.chitsuStatus = 0;
    this.chitsuTightening = 100;
    this.analStatus = 0;
    this.analTightening = 100;
    this.kuchiStatus = 0;
    this.chikubiStatus = 0;
    this._baby = [];
    this.seiekiNakadashi = 0;
    this.keikenMachi = 0;
    this.keikenSakaba = 0;
    this.actorId = actorId;
  }
  Erostatus.prototype.upKeikenPerson = function (value) {
    if (value === void 0) {
      value = 1;
    }
    this.keikenPeople += value;
  };
  Erostatus.prototype.upKeiken = function (key, value) {
    if (value === void 0) {
      value = 1;
    }
    this._keiken[key] = this._keiken[key] || 0;
    this._keiken[key] += value;
  };
  Erostatus.prototype.upNakadashi = function (key, value) {
    if (value === void 0) {
      value = 1;
    }
    this.upKeiken(key);
    this._nakadashi[key] = this._nakadashi[key] || 0;
    this._nakadashi[key] += value;
  };
  Erostatus.prototype.isShojo = function () {
    return !$gameSwitches.value(2);
  };
  Erostatus.prototype.onSyusan = function () {
    this.bote = 0;
    this.taneoya = 0;
    this.ninshinRate = 0;
  };
  Object.defineProperty(Erostatus.prototype, "syusan", {
    get: function () {
      return this._baby.length;
    },
    enumerable: true,
    configurable: true,
  });
  Erostatus.prototype.pushBaby = function (baby) {
    this._baby.push(baby);
  };
  Erostatus.prototype.baby = function () {
    return this._baby;
  };
  Erostatus.prototype.faceId = function () {
    if (this._faceId) {
      return this._faceId;
    }
    return $gameActors.actor(5).getDefaultFaceId();
  };
  Erostatus.prototype.hoppeId = function () {
    if (this._hoppeId) {
      return this._hoppeId;
    }
    return $gameActors.actor(5).hoppeId;
  };
  return Erostatus;
})();
(function (Nore) {
  var _Game_System_prototype_initialize = Game_System.prototype.initialize;
  Game_System.prototype.initialize = function () {
    _Game_System_prototype_initialize.call(this);
    this.eroStatus = {};
    for (var i = 1; i <= 12; i++) {
      this.eroStatus[i] = this.newEro(i);
    }
    this.timestamp = new Date().getTime();
  };
  var pluginName = "Nore_Ero";
  PluginManager.registerCommand(pluginName, "PlusKeiken", function (args) {
    var ero = $gameSystem.getEro(1);
    ero["keiken" + args.type] += args.value;
  });
  PluginManager.registerCommand(pluginName, "PlusNakadashi", function (args) {
    $gameSystem.info().plusNakadashi(args.value);
  });
  PluginManager.registerCommand(pluginName, "PlusZasetsu", function (args) {
    $gameActors.mainActor().plusZasetsu(args.value);
    if (!$gameSwitches.value(203)) {
      $gameTemp.reserveCommonEvent(203);
    }
  });
  var UpEroInfo = /** @class */ (function () {
    function UpEroInfo() {
      this.nakadashi = 0;
      this.nakadashiMap = {};
      this.bukkake = 0;
      this.kiss = 0;
      this.iku = 0;
      this.ninshinRate = 0;
      this.gokkun = 0;
      this.kounaiSeieki = 0;
      this.fella = 0;
      this.oshikko = 0;
    }
    UpEroInfo.prototype.isChanged = function (info) {
      if (this.nakadashi != info.nakadashi) {
        return true;
      }
      if (this.bukkake != info.bukkake) {
        return true;
      }
      if (this.kiss != info.kiss) {
        return true;
      }
      if (this.iku != info.iku) {
        return true;
      }
      if (this.kounaiSeieki != info.kounaiSeieki) {
        return true;
      }
      return false;
    };
    UpEroInfo.prototype.upNakadashi = function (enemyId) {
      this.nakadashi++;
      this.nakadashiMap[enemyId] = this.nakadashiMap[enemyId] || 0;
      this.nakadashiMap[enemyId]++;
      this.ninshinRate += 6;
    };
    UpEroInfo.prototype.upKounai = function (n) {
      this.kounaiSeieki += n;
    };
    return UpEroInfo;
  })();
  Nore.UpEroInfo = UpEroInfo;
  function calcSakabaGold() {
    return 40 * $gameVariables.value(33);
  }
  Nore.calcSakabaGold = calcSakabaGold;
})(Nore || (Nore = {}));
