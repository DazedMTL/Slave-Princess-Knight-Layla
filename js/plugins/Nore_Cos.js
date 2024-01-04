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
 * @desc コス変更
 *
 * @command change
 * @text コス変更
 * @des コス変更
 * @arg actorId
 * @type number
 * @text actorId
 * @desc actorId
 *
 * @arg outerId
 * @type string
 * @text outerId
 * @desc outerId
 *
 * @arg legId
 * @type string
 * @text legId
 * @desc legId
 *
 * @arg innerTopId
 * @type string
 * @text innerTopId
 * @desc innerTopId
 *
 * @arg innerBottomId
 * @type string
 * @text innerBottomId
 * @desc innerBottomId
 *
 *
 * @command acceOn
 * @text アクセONとオープン
 * @des アクセONとオープン
 * @arg actorId
 * @type number
 * @text actorId
 * @desc actorId
 * @arg acceId
 * @type number
 * @text acceId
 * @desc acceId
 *
 * @command acceOpen
 * @text アクセオープン
 * @des アクセオープン
 * @arg actorId
 * @type number
 * @text actorId
 * @desc actorId
 *
 * @arg acceId
 * @type number
 * @text acceId
 * @desc acceId
 *
 *
 * @command acceOff
 * @text アクセOFF
 * @des アクセOFF
 * @arg actorId
 * @type number
 * @text actorId
 * @desc actorId
 *
 * @arg acceId
 * @type number
 * @text acceId
 * @desc acceId
 *
 * @command pose
 * @text ポーズ変更
 * @des ポーズ変更
 * @arg actorId
 * @type number
 * @text actorId
 * @desc actorId
 *
 * @arg poseId
 * @type number
 * @text poseId
 * @desc poseId
 *
 *
 * @command hightlight
 * @text ハイライト変更 1→なし 2→あり 3→下
 * @des ハイライト変更
 * @arg actorId
 * @type number
 * @text actorId
 * @desc actorId
 *
 * @arg hightlightId
 * @type number
 * @text hightlightId
 * @desc hightlightId
 *
 *
 *
 * @command breasts
 * @text 胸変更
 * @des 胸変更
 * @arg actorId
 * @type number
 * @text actorId
 * @desc actorId
 *
 * @arg breastsId
 * @type number
 * @text breastsId
 * @desc breastsId
 *
 * @command bote
 * @text ボテ
 * @des ボテ
 * @arg actorId
 * @type number
 * @text actorId
 * @desc actorId
 *
 * @arg boteId
 * @type number
 * @text boteId
 * @desc boteId
 *
 * @command hoppe
 * @text ほっぺ
 * @des ほっぺ
 * @arg actorId
 * @type number
 * @text actorId
 * @desc actorId
 *
 * @arg hoppeId
 * @type number
 * @text hoppeId
 * @desc hoppeId
 *
 * @command saveEroCos
 * @text エロコス保存
 * @des エロコス保存
 * @arg actorId
 * @type number
 *
 * @command loadEroCos
 * @text エロコスロード
 * @des エロコスロード
 * @arg actorId
 * @type number
 *
 * @command saveNormalCos
 * @text 通常コス保存
 * @des 通常コス保存
 * @arg actorId
 * @type number
 *
 * @command loadNormalCos
 * @text 通常コスロード
 * @des 通常コスロード
 * @arg actorId
 * @type number
 *
 * @command saveNormalCosAll
 * @text 通常コス保存全て
 * @des 通常コス保存全て
 *
 * @command loadNormalCosAll
 * @text 通常コスロード全て
 * @des 通常コスロード全て
 *
 * @command copyCos
 * @text コスコピー
 * @des コスコピー
 *
 * @command setHightlight
 * @text ハイライト変更
 * @des ハイライト変更
 * @arg actorId
 * @type number
 * @arg type
 * @type string
 *
 * @command updateCharlesEroItem
 */
var POSE_BY_COS = { "2_a": 2, "2_b": 1 };
var Hightlight;
(function (Hightlight) {
  Hightlight[(Hightlight["none"] = 1)] = "none";
  Hightlight[(Hightlight["normal"] = 2)] = "normal";
  Hightlight[(Hightlight["bottom"] = 3)] = "bottom";
})(Hightlight || (Hightlight = {}));
var Nore;
(function (Nore) {
  var pluginName = "Nore_Cos";
  var NORMAL_COS_SLOT_ID = 1;
  Nore.ERO_COS_SLOT_ID = 2;
  PluginManager.registerCommand(pluginName, "saveNormalCos", function (args) {
    var actorId = args.actorId;
    var actor = $gameActors.actor(actorId);
    actor.saveCostume(NORMAL_COS_SLOT_ID);
  });
  PluginManager.registerCommand(pluginName, "loadNormalCos", function (args) {
    var actorId = args.actorId;
    var actor = $gameActors.actor(actorId);
    actor.restoreCostume(NORMAL_COS_SLOT_ID, false);
  });
  PluginManager.registerCommand(pluginName, "saveEroCos", function (args) {
    var actorId = args.actorId;
    var actor = $gameActors.actor(actorId);
    actor.saveCostume(Nore.ERO_COS_SLOT_ID);
  });
  PluginManager.registerCommand(pluginName, "loadEroCos", function (args) {
    var actorId = args.actorId;
    var actor = $gameActors.actor(actorId);
    actor.restoreCostume(Nore.ERO_COS_SLOT_ID, false);
  });
  PluginManager.registerCommand(
    pluginName,
    "saveNormalCosAll",
    function (args) {
      p("saveNormalCosAll");
      for (var _i = 0, _a = $gameParty.allEroMembers(); _i < _a.length; _i++) {
        var actor = _a[_i];
        actor.saveCostume(NORMAL_COS_SLOT_ID);
      }
    }
  );
  PluginManager.registerCommand(
    pluginName,
    "loadNormalCosAll",
    function (args) {
      for (var _i = 0, _a = $gameParty.allEroMembers(); _i < _a.length; _i++) {
        var actor = _a[_i];
        actor.restoreCostume(NORMAL_COS_SLOT_ID, false);
      }
    }
  );
  PluginManager.registerCommand(pluginName, "copyCos", function (args) {
    copyCos($gameActors.actor(1), $gameActors.actor(131));
  });
  function copyCos(from, to) {
    to.setOuterId(from.outerId);
    to.setInnerTopId(from.innerTopId);
    to.setInnerBottomId(from.innerBottomId);
    to.setLegId(from.legId);
    to.changeEquip(2, from.equip(2));
    to._boteId = from.boteId;
    to.setCacheChanged();
  }
  PluginManager.registerCommand(pluginName, "change", function (args) {
    var actorId = args.actorId;
    var actor = $gameActors.actor(actorId);
    var outerId = args.outerId;
    if (outerId && outerId.length > 0) {
      actor.setOuterId(outerId);
    }
    var outerTopId = args.outerTopId;
    if (outerTopId && outerTopId.length > 0) {
      actor.setOuterTopId(outerTopId);
    }
    var outerBottomId = args.outerBottomId;
    if (outerBottomId && outerBottomId.length > 0) {
      actor.setOuterBottomId(outerBottomId);
    }
    var armId = args.armId;
    if (armId && armId.length > 0) {
      actor.setArmId(armId);
    }
    var legId = args.legId;
    if (legId && legId.length > 0) {
      actor.setLegId(legId);
    }
    var innerTopId = args.innerTopId;
    if (innerTopId && innerTopId.length > 0) {
      actor.setInnerTopId(innerTopId);
    }
    var innerBottomId = args.innerBottomId;
    if (innerBottomId && innerBottomId.length > 0) {
      actor.setInnerBottomId(innerBottomId);
    }
  });
  PluginManager.registerCommand(pluginName, "acceOn", function (args) {
    var actorId = args.actorId;
    var actor = $gameActors.actor(actorId);
    var acceId = parseInt(args.acceId);
    var armor = $dataArmors[acceId];
    var group = parseInt(armor.meta["group"]);
    if (group > 0) {
      p("removeGroup:" + group);
      actor.removeGroup(group, armor);
    }
    actor.addAcce(args.acceId);
    actor.setCacheChanged();
    actor.openAcce(args.acceId);
  });
  PluginManager.registerCommand(pluginName, "acceOpen", function (args) {
    var actorId = args.actorId;
    var actor = $gameActors.actor(actorId);
    actor.openAcce(args.acceId);
  });
  PluginManager.registerCommand(pluginName, "acceOff", function (args) {
    var actorId = args.actorId;
    var actor = $gameActors.actor(actorId);
    actor.removeAcce(args.acceId);
    actor.setCacheChanged();
  });
  PluginManager.registerCommand(pluginName, "pose", function (args) {
    var actorId = args.actorId;
    var actor = $gameActors.actor(actorId);
    actor.setPoseId(args.poseId);
  });
  PluginManager.registerCommand(pluginName, "hightlight", function (args) {
    var actorId = args.actorId;
    var actor = $gameActors.actor(actorId);
    actor.setHightlight(args.hightlightId);
  });
  PluginManager.registerCommand(pluginName, "breasts", function (args) {
    var actorId = args.actorId;
    var actor = $gameActors.actor(actorId);
    actor.setBreastsId(args.breastsId);
  });
  PluginManager.registerCommand(pluginName, "bote", function (args) {
    var actorId = Math.trunc(args.actorId);
    var boteId = Math.trunc(args.boteId);
    var actor = $gameActors.actor(actorId);
    actor._boteId = boteId;
    p("bote:" + actorId + " " + boteId);
    $gameActors.actor(actorId).setCacheChanged();
  });
  PluginManager.registerCommand(pluginName, "setHightlight", function (args) {
    var actorId = Math.trunc(args.actorId);
    var type = args.type;
    var actor = $gameActors.actor(actorId);
    switch (type) {
      case "top":
        actor.setHightlight(Hightlight.normal);
        break;
      case "bottom":
        actor.setHightlight(Hightlight.bottom);
        break;
      case "none":
        actor.setHightlight(Hightlight.none);
        break;
    }
  });
  PluginManager.registerCommand(pluginName, "hoppe", function (args) {
    var actorId = Math.trunc(args.actorId);
    var hoppeId = Math.trunc(args.hoppeId);
    var actor = $gameActors.actor(actorId);
    actor.setDefaultHoppeId(hoppeId);
  });
  PluginManager.registerCommand(
    pluginName,
    "updateCharlesEroItem",
    function (args) {
      var actor = $gameActors.actor(7);
      actor.updateEroItem();
    }
  );
  Game_Item.prototype.isOuter = function () {
    return this.outerId() != null;
  };
  Game_Item.prototype.isInnerTop = function () {
    return this.innerTopId() != null;
  };
  Game_Item.prototype.isInnerBottom = function () {
    return this.innerBottomId() != null;
  };
  Game_Item.prototype.outerId = function () {
    return this.object().meta["outer"];
  };
  Game_Item.prototype.innerTopId = function () {
    return this.object().meta["innerTop"];
  };
  Game_Item.prototype.innerBottomId = function () {
    return this.object().meta["innerBottom"];
  };
})(Nore || (Nore = {}));
var Game_CostumeActor = /** @class */ (function (_super) {
  __extends(Game_CostumeActor, _super);
  function Game_CostumeActor() {
    var _this = (_super !== null && _super.apply(this, arguments)) || this;
    _this._eroEquipCount = 0;
    _this._hightlight = Hightlight.normal;
    _this._defaultFaceId = 1;
    _this._defaultHoppeId = 0;
    _this._acceHoppeId = 0;
    _this._acceOpenMap = {};
    _this._boteId = 0;
    return _this;
  }
  Game_CostumeActor.prototype.initMembers = function () {
    _super.prototype.initMembers.call(this);
    this._outerId = "a";
    this._outerTopId = "a";
    this._outerBottomId = "a";
    this._outerItemId = 0;
    this._armItemId = 0;
    this._legItemId = 0;
    this._innerTopItemId = 0;
    this._innerBottomItemId = 0;
    this._castOffInnerTop = false;
    this._castOffInnerBottom = false;
    this._castOffOuter = false;
    this.acceMap = {};
    this._acceZ = [];
    this._faceId = 1;
    this._poseId = 1;
    this._hoppeId = 0;
    this._namidaId = 0;
    this._cacheChanged = true;
    this._breastsId = 1;
    this._breakId = 0;
    this.setDirty();
  };
  Game_CostumeActor.prototype.exportCosInfo = function () {
    var info = new Game_CosInfo();
    info.outerId = this._outerId;
    info.outerTopId = this._outerTopId;
    info.outerBottomId = this._outerBottomId;
    info.innerTopId = this._innerTopId;
    info.innerBottomId = this.innerBottomId;
    info.legId = this.legId;
    info.boteId = this.boteId;
    info.hoppeId = this.hoppeId;
    info.faceId = this.getDefaultFaceId();
    info.acceMap = JsonEx.makeDeepCopy(this.acceMap);
    return info;
  };
  Game_CostumeActor.prototype.setAcceMap = function (map) {
    this.acceMap = {};
    for (var key in map) {
      this.acceMap[key] = map[key];
    }
  };
  Object.defineProperty(Game_CostumeActor.prototype, "baseId", {
    get: function () {
      return "actor0" + this.actorId() + "_";
    },
    enumerable: true,
    configurable: true,
  });
  Object.defineProperty(Game_CostumeActor.prototype, "breakId", {
    get: function () {
      return this._breakId;
    },
    enumerable: true,
    configurable: true,
  });
  Object.defineProperty(Game_CostumeActor.prototype, "poseId", {
    get: function () {
      return this._poseId;
    },
    enumerable: true,
    configurable: true,
  });
  Object.defineProperty(Game_CostumeActor.prototype, "boteId", {
    get: function () {
      return this._boteId;
    },
    enumerable: true,
    configurable: true,
  });
  Object.defineProperty(Game_CostumeActor.prototype, "faceId", {
    get: function () {
      if (!this._faceId) {
        return 0;
      }
      return this._faceId;
    },
    enumerable: true,
    configurable: true,
  });
  Object.defineProperty(Game_CostumeActor.prototype, "hoppeId", {
    get: function () {
      return Math.max(
        Math.max(this.getDefaultHoppeId(), this._hoppeId),
        this.getAcceHoppeId()
      );
    },
    enumerable: true,
    configurable: true,
  });
  Object.defineProperty(Game_CostumeActor.prototype, "namidaId", {
    get: function () {
      if (this._namidaAcce > 0) {
        return this._namidaAcce;
      }
      return this._namidaId;
    },
    enumerable: true,
    configurable: true,
  });
  Game_CostumeActor.prototype.getNamidaAcceId = function () {
    return this._namidaAcce;
  };
  Object.defineProperty(Game_CostumeActor.prototype, "outerId", {
    get: function () {
      if ($gameSwitches.value(99)) {
        return "a";
      }
      if (this._castOffOuter) {
        return "a";
      }
      if (this._outerId != null) {
        if (this.hasShitanugiAcce()) {
          switch (this._outerId) {
            case "b":
              return "g";
          }
        }
        return this._outerId;
      }
      if (this._outerItemId === 0) {
        return "a";
      }
      var outerId = $dataArmors[this._outerItemId].meta["outer"];
      return outerId;
    },
    enumerable: true,
    configurable: true,
  });
  Object.defineProperty(Game_CostumeActor.prototype, "outerTopId", {
    get: function () {
      if (this._castOffOuter) {
        return "a";
      }
      if (this.outerId != "a") {
        return "a";
      }
      if (this._outerTopId != null) {
        return this._outerTopId;
      }
      if (this._outerItemId === 0) {
        return "a";
      }
      return $dataArmors[this._outerItemId].meta["outerTop"];
    },
    enumerable: true,
    configurable: true,
  });
  Object.defineProperty(Game_CostumeActor.prototype, "outerBottomId", {
    get: function () {
      if (this._castOffOuter) {
        return "a";
      }
      if (this.outerId != "a") {
        return "a";
      }
      if (this._outerBottomId != null) {
        return this._outerBottomId;
      }
      if (this._outerItemId === 0) {
        return "a";
      }
      return $dataArmors[this._outerItemId].meta["outerBottom"];
    },
    enumerable: true,
    configurable: true,
  });
  Object.defineProperty(Game_CostumeActor.prototype, "legId", {
    get: function () {
      if ($gameSwitches.value(99)) {
        return "a";
      }
      if (this._castOffOuter) {
        return "a";
      }
      if (this._legId != null) {
        return this._legId;
      }
      if (this._legItemId === 0) {
        return "a";
      }
      return $dataArmors[this._armItemId].meta["leg"];
    },
    enumerable: true,
    configurable: true,
  });
  Object.defineProperty(Game_CostumeActor.prototype, "armId", {
    get: function () {
      if (this._castOffOuter) {
        return "a";
      }
      if (this._armId != null) {
        return this._armId;
      }
      if (this._armItemId === 0) {
        return "a";
      }
      return $dataArmors[this._armItemId].meta["arm"];
    },
    enumerable: true,
    configurable: true,
  });
  Object.defineProperty(Game_CostumeActor.prototype, "headId", {
    get: function () {
      if (this.hasAcce(212)) {
        return "g";
      }
      if (this.hasAcce(210)) {
        return "h";
      }
      if (this.hasAcce(209)) {
        return "b";
      }
      if (this.hasAcce(211)) {
        return "c";
      }
      if (this.hasAcce(205)) {
        return "d";
      }
      return "a";
    },
    enumerable: true,
    configurable: true,
  });
  Object.defineProperty(Game_CostumeActor.prototype, "breastsId", {
    get: function () {
      if (this.outerId != "a" && !this.getNaked()) {
        return 1;
      }
      if (this.hasAcce(1095)) {
        return 2;
      }
      return this._breastsId;
    },
    enumerable: true,
    configurable: true,
  });
  Object.defineProperty(Game_CostumeActor.prototype, "innerBottomId", {
    get: function () {
      var id = this.findInnerBottomCurseArmor();
      if (id) {
        return id;
      }
      if ($gameSwitches.value(99)) {
        return "a";
      }
      if (this._castOffOuter) {
        return "a";
      }
      if (this._legId == "c" || this._legId == "d") {
        //  return 'z';
      }
      if (this._actorId == 2 && this.outerId == "b") {
        if (this.boteId != 2 && this.getNaked() == 0) {
          return "a";
        }
      }
      if (this._innerBottomId != null) {
        if (this.isInnerBottomNg(this._innerBottomId)) {
          return "a";
        }
        return this._innerBottomId;
      }
      if (this._innerBottomItemId === 0) {
        return "a";
      }
      if (this._castOffInnerBottom) {
        return "a";
      }
      return $dataArmors[this._innerBottomItemId].meta["innerBottom"];
    },
    enumerable: true,
    configurable: true,
  });
  Object.defineProperty(Game_CostumeActor.prototype, "innerTopId", {
    get: function () {
      if ($gameSwitches.value(99)) {
        return "a";
      }
      if (this._castOffOuter) {
        return "a";
      }
      if (this._innerTopId != null) {
        return this._innerTopId;
      }
      if (this._innerTopItemId === 0) {
        return "a";
      }
      if (this._castOffInnerTop) {
        return "a";
      }
      return $dataArmors[this._innerTopItemId].meta["innerTop"];
    },
    enumerable: true,
    configurable: true,
  });
  Object.defineProperty(Game_CostumeActor.prototype, "outerArmor", {
    get: function () {
      if (this._outerItemId === 0) {
        return null;
      }
      return $dataArmors[this._outerItemId];
    },
    enumerable: true,
    configurable: true,
  });
  Object.defineProperty(Game_CostumeActor.prototype, "innerBottomArmor", {
    get: function () {
      if (this._innerBottomItemId === 0) {
        return null;
      }
      return $dataArmors[this._innerBottomItemId];
    },
    enumerable: true,
    configurable: true,
  });
  Object.defineProperty(Game_CostumeActor.prototype, "innerTopArmor", {
    get: function () {
      if (this._innerTopItemId === 0) {
        return null;
      }
      return $dataArmors[this._innerTopItemId];
    },
    enumerable: true,
    configurable: true,
  });
  Game_CostumeActor.prototype.hasCursedAcce = function () {
    return this.hasShitanugiAcce();
  };
  Game_CostumeActor.prototype.getCursedAcce = function () {
    for (var _i = 0, _a = this.battleEquips(); _i < _a.length; _i++) {
      var e = _a[_i];
      if (!e) {
        continue;
      }
      var acceItem = e.item();
      if (acceItem.meta["shitaNugi"] != null) {
        return e;
      }
    }
    return null;
  };
  Game_CostumeActor.prototype.hasChimpo = function () {
    for (var _i = 0, _a = this.battleEquips(); _i < _a.length; _i++) {
      var e = _a[_i];
      if (!e) {
        continue;
      }
      var acceItem = e.item();
      if (Math.trunc(acceItem.meta["frontAcce"]) == 63) {
        return true;
      }
    }
    return false;
  };
  Game_CostumeActor.prototype.hasRotor = function () {
    return this.innerBottomId == "f";
  };
  Game_CostumeActor.prototype.hasShitanugiAcce = function () {
    for (var _i = 0, _a = this.battleEquips(); _i < _a.length; _i++) {
      var e = _a[_i];
      if (!e) {
        continue;
      }
      var acceItem = e.item();
      if (acceItem.meta["shitaNugi"] != null) {
        return true;
      }
    }
    return false;
  };
  Game_CostumeActor.prototype.findInnerBottomCurseArmor = function () {
    for (var _i = 0, _a = this.battleEquips(); _i < _a.length; _i++) {
      var e = _a[_i];
      if (!e) {
        continue;
      }
      var acceItem = e.item();
      if (acceItem.meta["innerBottom"] != null) {
        return acceItem.meta["innerBottom"];
      }
    }
    return null;
  };
  Game_CostumeActor.prototype.findFrontCurseArmor = function () {
    for (var _i = 0, _a = this.battleEquips(); _i < _a.length; _i++) {
      var e = _a[_i];
      if (!e) {
        continue;
      }
      var acceItem = e.item();
      if (acceItem.meta["frontAcce"] != null) {
        return Math.trunc(acceItem.meta["frontAcce"]);
      }
    }
    return null;
  };
  Game_CostumeActor.prototype.isInnerBottomNg = function (id) {
    for (var _i = 0, _a = this.battleEquips(); _i < _a.length; _i++) {
      var e = _a[_i];
      if (!e) {
        continue;
      }
      var acceItem = e.item();
      if (acceItem.meta["innerBottomNg"] != null) {
        if (acceItem.meta["innerBottomNg"] == id) {
          return true;
        }
      }
    }
    return false;
  };
  Game_CostumeActor.prototype.setDefaultFaceId = function (id) {
    this._defaultFaceId = id;
  };
  Game_CostumeActor.prototype.getDefaultFaceId = function () {
    return this._defaultFaceId;
  };
  Game_CostumeActor.prototype.setDefaultHoppeId = function (id) {
    this._defaultHoppeId = id;
  };
  Game_CostumeActor.prototype.getDefaultHoppeId = function () {
    return this._defaultHoppeId;
  };
  Game_CostumeActor.prototype.setAcceHoppeId = function (id) {
    this._acceHoppeId = id;
  };
  Game_CostumeActor.prototype.getAcceHoppeId = function () {
    return this._acceHoppeId;
  };
  Game_CostumeActor.prototype.isNormalHightlight = function () {
    return this._hightlight == Hightlight.normal;
  };
  Game_CostumeActor.prototype.isNoHightlight = function () {
    return this._hightlight == Hightlight.none;
  };
  Game_CostumeActor.prototype.isBottomHightlight = function () {
    return this._hightlight == Hightlight.bottom;
  };
  Game_CostumeActor.prototype.hightlight = function () {
    return this._hightlight;
  };
  Game_CostumeActor.prototype.setHightlight = function (type) {
    this._hightlight = type;
  };
  Game_CostumeActor.prototype.hoppeAcceId = function () {
    var ret = [];
    for (var i in this.acceMap) {
      if (!this.acceMap[i]) {
        continue;
      }
      var acceItem = $dataArmors[i];
      if (acceItem.meta["hoppe"] != null) {
        return parseInt(acceItem.meta["hoppe"]);
      }
    }
    return 0;
  };
  Game_CostumeActor.prototype.recoverBreakId = function () {
    this._breakId = 0;
    this.setDirty();
    this.setCacheChanged();
  };
  Game_CostumeActor.prototype.castOffOuter = function () {
    if (this._castOffOuter) {
      return;
    }
    this._castOffOuter = true;
    this.setDirty();
  };
  Game_CostumeActor.prototype.putOnOuter = function () {
    if (!this._castOffOuter) {
      return;
    }
    this._castOffOuter = false;
    this.setDirty();
  };
  Game_CostumeActor.prototype.isDirty = function () {
    return this._dirty;
  };
  Game_CostumeActor.prototype.setDirty = function () {
    this._dirty = true;
  };
  Game_CostumeActor.prototype.clearDirty = function () {
    this._dirty = false;
  };
  Game_CostumeActor.prototype.isCacheChanged = function () {
    return this._cacheChanged;
  };
  Game_CostumeActor.prototype.setCacheChanged = function () {
    if (this._cacheChanged) {
      //return;
    }
    this._cacheChanged = true;
    this.setDirty();
    $gamePlayer.refresh();
    Nore.Tachie.actorCashedSprites[this.actorId()] = false;
  };
  Game_CostumeActor.prototype.clearCacheChanged = function () {
    this._cacheChanged = false;
  };
  Game_CostumeActor.prototype.castOffInnerBottom = function () {
    if (this._castOffInnerBottom) {
      return;
    }
    this._castOffInnerBottom = true;
    this.setCacheChanged();
  };
  Game_CostumeActor.prototype.castOffInnerTop = function () {
    if (this._castOffInnerTop) {
      return;
    }
    this._castOffInnerTop = true;
    this.setCacheChanged();
  };
  Game_CostumeActor.prototype.isCastOffOuter = function () {
    return this._castOffOuter;
  };
  Game_CostumeActor.prototype.isCastOffInnerTop = function () {
    return this._castOffInnerTop;
  };
  Game_CostumeActor.prototype.isCastOffInnerBottom = function () {
    return this._castOffInnerBottom;
  };
  Game_CostumeActor.prototype.tachieArrayString = function () {
    return [
      this.faceId,
      this.hoppeId,
      this.outerId,
      this.innerBottomId,
      this.innerTopId,
    ].toString();
  };
  Game_CostumeActor.prototype.hasOuter = function () {
    return true;
  };
  Game_CostumeActor.prototype.hasInnerBottom = function () {
    for (var key in this.acceMap) {
      if ($dataArmors[key].meta["noBottom"]) {
        return false;
      }
    }
    return true;
  };
  Game_CostumeActor.prototype.hasInnerTop = function () {
    for (var key in this.acceMap) {
      if ($dataArmors[key].meta["noTop"]) {
        return false;
      }
    }
    return true;
  };
  Game_CostumeActor.prototype.setFaceId = function (n) {
    if (this._faceId === n) {
      return;
    }
    this._faceId = n;
    this.setDirty();
  };
  Game_CostumeActor.prototype.setHoppeId = function (n) {
    if (this._hoppeId === n) {
      return;
    }
    this._hoppeId = n;
    this.setDirty();
  };
  Game_CostumeActor.prototype.setNamidaAcce = function (n) {
    this._namidaAcce = n;
  };
  Game_CostumeActor.prototype.setNamidaId = function (n) {
    if (this._namidaId === n) {
      return;
    }
    this._namidaId = n;
    this.setDirty();
  };
  Game_CostumeActor.prototype.setPoseId = function (n) {
    var nn = Math.trunc(n);
    if (this._poseId === nn) {
      return;
    }
    this._poseId = nn;
    this.setCacheChanged();
  };
  Game_CostumeActor.prototype.setOuterId = function (newId) {
    if (this._outerId === newId) {
      return;
    }
    this._outerId = newId;
    this.updatePose();
    this.setCacheChanged();
  };
  Game_CostumeActor.prototype.updatePose = function () {
    var poseId = POSE_BY_COS[this.actorId() + "_" + this.outerId];
    if (poseId !== undefined) {
      this.setPoseId(poseId);
    }
  };
  Game_CostumeActor.prototype.setOuterTopId = function (newId) {
    if (this._outerTopId === newId) {
      return;
    }
    this._outerTopId = newId;
    this.setCacheChanged();
  };
  Game_CostumeActor.prototype.setOuterBottomId = function (newId) {
    if (this._outerBottomId === newId) {
      return;
    }
    this._outerBottomId = newId;
    this.setCacheChanged();
  };
  Game_CostumeActor.prototype.setOuterItemId = function (newId) {
    if (this._outerItemId === newId) {
      return;
    }
    this._outerItemId = newId;
    this.setCacheChanged();
  };
  Game_CostumeActor.prototype.setBreastsId = function (newId) {
    if (this._breastsId === newId) {
      return;
    }
    this._breastsId = newId;
    this.setCacheChanged();
  };
  Game_CostumeActor.prototype.setBreakId = function (newId) {
    if (this._breakId === newId) {
      return;
    }
    this._breakId = newId;
    this.setCacheChanged();
  };
  Game_CostumeActor.prototype.setArmId = function (newId) {
    if (this._armId === newId) {
      return;
    }
    this._armId = newId;
    this.setCacheChanged();
  };
  Game_CostumeActor.prototype.setArmItemId = function (newId) {
    if (this._armItemId === newId) {
      return;
    }
    this._armItemId = newId;
    this.setCacheChanged();
  };
  Game_CostumeActor.prototype.setLegId = function (newId) {
    if (this._legId === newId) {
      return;
    }
    this._legId = newId;
    this.setCacheChanged();
  };
  Game_CostumeActor.prototype.setLegItemId = function (newId) {
    if (this._legItemId === newId) {
      return;
    }
    this._legItemId = newId;
    this.setCacheChanged();
  };
  Game_CostumeActor.prototype.setInnerBottomId = function (newId) {
    if (this._innerBottomId === newId) {
      return;
    }
    this._innerBottomId = newId;
    this.setCacheChanged();
  };
  Game_CostumeActor.prototype.setNaked = function (b) {
    if (this._naked === b) {
      return false;
    }
    this._naked = b;
    this.setCacheChanged();
    return true;
  };
  Game_CostumeActor.prototype.setInnerBottomItemId = function (newId) {
    if (this._innerBottomItemId === newId) {
      return;
    }
    this._innerBottomItemId = newId;
    this.setCacheChanged();
  };
  Game_CostumeActor.prototype.setInnerTopId = function (newId) {
    if (this._innerTopId === newId) {
      return;
    }
    this._innerTopId = newId;
    this.setCacheChanged();
  };
  Game_CostumeActor.prototype.setInnerTopItemId = function (newId) {
    if (this._innerTopItemId === newId) {
      return;
    }
    this._innerTopItemId = newId;
    this.setCacheChanged();
  };
  Game_CostumeActor.prototype.legMainFile = function () {
    var id = this.legId;
    var ero = $gameSystem.getEro(this.actorId());
    var bodyType = this.bodyType();
    if (bodyType != "d") {
      bodyType = "a";
    }
    if (id != "b") {
    }
    return this.baseId + "leg_" + id + "_main_" + bodyType;
  };
  Game_CostumeActor.prototype.legSkinFile = function () {
    var id = this.legId;
    var ero = $gameSystem.getEro(this.actorId());
    var bodyType = this.bodyType();
    if (bodyType != "d") {
      bodyType = "a";
    }
    if (id != "c") {
      id = "a";
    }
    return this.baseId + "leg_" + id + "_main_" + bodyType;
  };
  Game_CostumeActor.prototype.legShadowFile = function () {
    var id = this.legId;
    var ero = $gameSystem.getEro(this.actorId());
    var bodyType = this.bodyType();
    if (bodyType != "d") {
      bodyType = "a";
    }
    return this.baseId + "leg_" + id + "_shadow_" + bodyType;
  };
  Game_CostumeActor.prototype.armMainFile = function () {
    var id = this.armId;
    var ero = $gameSystem.getEro(this.actorId());
    return this.baseId + "arm_" + id + "_main_" + this.bodyType();
  };
  Game_CostumeActor.prototype.armFrontFile = function () {
    var id = this.armId;
    return this.baseId + "arm_" + id + "_front_" + this.bodyType();
  };
  Game_CostumeActor.prototype.breastsFile = function () {
    var id = this.breastsId;
    var boteId = "";
    if (this.boteId == 2) {
      boteId = "_bote";
    }
    return this.baseId + "breasts_" + id + boteId;
  };
  Game_CostumeActor.prototype.boteImageId = function () {
    return this.boteId + 1;
  };
  Game_CostumeActor.prototype.outerBackFile = function () {
    var id = this.outerId;
    if (this.getNaked()) {
      id = "a";
    }
    return (
      this.baseId +
      "out_" +
      id +
      "_back_" +
      this.boteImageId() +
      "_" +
      this.bodyType()
    );
  };
  Game_CostumeActor.prototype.outerShadowFile = function () {
    if (!this.hasOuter()) {
      return null;
    }
    var id = this.outerId;
    if (this.getNaked()) {
      id = "a";
    }
    var shadowType = "a";
    return (
      this.baseId +
      "out_" +
      id +
      "_shadow_" +
      this.boteImageId() +
      "_" +
      shadowType
    );
  };
  Game_CostumeActor.prototype.outerMainFile = function () {
    var id = this.outerId;
    if (this.getNaked()) {
      id = "a";
    }
    if (!this.hasOuter()) {
      return null;
    }
    if (this.isKuro()) {
      var file =
        this.baseId +
        "out_" +
        id +
        "_main_" +
        this.boteImageId() +
        "k_" +
        this.bodyType();
      if (this.isFileExists(file)) {
        return file;
      }
    }
    return (
      this.baseId +
      "out_" +
      id +
      "_main_" +
      this.boteImageId() +
      "_" +
      this.bodyType()
    );
  };
  Game_CostumeActor.prototype.outerMiddleFile = function () {
    var id = this.outerId;
    if (this.getNaked()) {
      id = "a";
    }
    if (!this.hasOuter()) {
      return null;
    }
    if (this.isKuro()) {
      var file =
        this.baseId +
        "out_" +
        id +
        "_middle_" +
        this.boteImageId() +
        "k_" +
        this.bodyType();
      if (this.isFileExists(file)) {
        return file;
      }
    }
    return (
      this.baseId +
      "out_" +
      id +
      "_middle_" +
      this.boteImageId() +
      "_" +
      this.bodyType()
    );
  };
  Game_CostumeActor.prototype.isFileExists = function (file) {
    return PIXI.utils.TextureCache[file + ".png"] != null;
  };
  Game_CostumeActor.prototype.outerTopMainFile = function () {
    var id = this.outerTopId;
    if (this.getNaked()) {
      id = "a";
    }
    if (this.innerTopId != "a" && this._breakId >= 2) {
      id = "a";
    }
    if (this.outerId != "a") {
      id = "a";
    }
    if (this.isKuro()) {
      var file =
        this.baseId +
        "out_" +
        id +
        "_top_main_" +
        this.boteImageId() +
        "k_" +
        this.bodyType();
      if (this.isFileExists(file)) {
        return file;
      }
    }
    return (
      this.baseId +
      "out_" +
      id +
      "_top_main_" +
      this.boteImageId() +
      "_" +
      this.bodyType()
    );
  };
  Game_CostumeActor.prototype.outerTopShadowFile = function () {
    var id = this.outerTopId;
    if (this.getNaked()) {
      id = "a";
    }
    if (this.innerTopId != "a" && this._breakId >= 2) {
      return "a";
    }
    if (this._breakId >= 3) {
      return "a";
    }
    if (this.outerId != "a") {
      return "a";
    }
    if (this.isKuro()) {
      var file =
        this.baseId +
        "out_" +
        id +
        "_top_shadow_" +
        this.boteImageId() +
        "k_" +
        this.bodyType();
      if (this.isFileExists(file)) {
        return file;
      }
    }
    return (
      this.baseId +
      "out_" +
      id +
      "_top_shadow_" +
      this.boteImageId() +
      "_" +
      this.bodyType()
    );
  };
  Game_CostumeActor.prototype.outerBottomMainFile = function () {
    var id = this.outerBottomId;
    if (this.getNaked()) {
      id = "a";
    }
    if (this.innerBottomId != "a" && this._breakId >= 1) {
      return "a";
    }
    if (this._breakId >= 2) {
      return "a";
    }
    if (this.outerId != "a") {
      return "a";
    }
    if (this.isKuro()) {
      var file =
        this.baseId +
        "out_" +
        id +
        "_bottom_main_" +
        this.boteImageId() +
        "k_" +
        this.bodyType();
      if (this.isFileExists(file)) {
        return file;
      }
    }
    return (
      this.baseId +
      "out_" +
      id +
      "_bottom_main_" +
      this.boteImageId() +
      "_" +
      this.bodyType()
    );
  };
  Game_CostumeActor.prototype.outerBottomShadowFile = function () {
    var id = this.outerBottomId;
    if (this.getNaked()) {
      id = "a";
    }
    if (this.innerBottomId != "a" && this._breakId >= 1) {
      return "a";
    }
    if (this._breakId >= 2) {
      return "a";
    }
    if (this.outerId != "a") {
      return "a";
    }
    if (this.isKuro()) {
      var file =
        this.baseId +
        "out_" +
        id +
        "_bottom_shadow_" +
        this.boteImageId() +
        "k_" +
        this.bodyType();
      if (this.isFileExists(file)) {
        return file;
      }
    }
    return (
      this.baseId +
      "out_" +
      id +
      "_bottom_shadow_" +
      this.boteImageId() +
      "_" +
      this.bodyType()
    );
  };
  Game_CostumeActor.prototype.outerFrontFile = function () {
    var id = this.outerId;
    if (this.getNaked()) {
      id = "a";
    }
    if (!this.hasOuter()) {
      return null;
    }
    return (
      this.baseId +
      "out_" +
      id +
      "_front_" +
      this.boteImageId() +
      "_" +
      this.bodyType()
    );
  };
  Game_CostumeActor.prototype.bodyBackFile = function () {
    var type = this.bodyType();
    var kuro = "";
    if (this.isKuro()) {
      kuro = "k";
    }
    return this.baseId + "body_" + this.boteImageId() + kuro + "_" + type;
  };
  Game_CostumeActor.prototype.bodyType = function () {
    var type = "a";
    switch (this.poseId) {
      case 1:
        break;
      case 2:
        type = "b";
        break;
      case 3:
        type = "c";
        break;
      case 4:
        type = "d";
        break;
      case 5:
        type = "e";
        break;
      case 6:
        type = "f";
        break;
      case 7:
        type = "g";
        break;
      case 8:
        type = "h";
        break;
      case 9:
        type = "i";
        break;
      case 10:
        type = "j";
        break;
      case 11:
        type = "k";
        break;
      case 12:
        type = "l";
        break;
      case 13:
        type = "n";
        break;
      case 14:
        type = "o";
        break;
    }
    return type;
  };
  Game_CostumeActor.prototype.bodyFrontFile = function () {
    /*if (this.actorId() > 100 && this,this.poseId >= 2) {
            return this.baseId + 'face_' + 2;
        }
        else {*/
    return this.baseId + "face_" + 1;
    //}
  };
  Game_CostumeActor.prototype.isKuro = function () {
    return this.hasAcce(299);
  };
  Game_CostumeActor.prototype.innerBottomFile = function () {
    if (!this.hasInnerBottom()) {
      return null;
    }
    var id = this.innerBottomId;
    if (this.getNaked() >= 2 && !this.hasCursedAcce()) {
      id = "a";
    }
    if (this.isNoInnerBottom()) {
      id = "a";
    }
    if (this.breakId >= 2) {
      id = "a";
    }
    return this.baseId + "in_%1_bottom_main_%2".format(id, this.boteImageId());
  };
  Game_CostumeActor.prototype.innerBottomShadowFile = function () {
    if (!this.hasInnerBottom()) {
      return null;
    }
    var id = this.innerBottomId;
    if (this._naked >= 2) {
      id = "a";
    }
    if (this.isNoInnerBottom()) {
      id = "a";
    }
    if (this.breakId >= 2) {
      id = "a";
    }
    var ero = $gameSystem.getEro(this.actorId());
    return (
      this.baseId + "in_%1_bottom_shadow_%2".format(id, this.boteImageId())
    );
  };
  Game_CostumeActor.prototype.innerTopFile = function () {
    if (!this.hasInnerTop()) {
      return null;
    }
    var id = this.innerTopId;
    if (this._naked >= 2) {
      id = "a";
    }
    if (this.isNoInner()) {
      id = "a";
    }
    if (this.breakId >= 3) {
      id = "a";
    }
    if (this.outerId == "b") {
      //id = 'a';
    }
    if (this.poseId > 1) {
      var file =
        this.baseId +
        "in_%1_top_main_%2_%3".format(id, this.boteImageId(), this.poseId);
      if (PIXI.utils.TextureCache[file + ".png"]) {
        return file;
      }
    }
    return this.baseId + "in_%1_top_main_%2".format(id, this.boteImageId());
  };
  Game_CostumeActor.prototype.isNoInner = function () {
    /*
        if (this._outerId) {
            const armor = this.findOuterArmor(this._outerId);
            if (armor && armor.meta['noInner']) {
                return true;
            }
        }
        if (this._outerTopId) {
            const armor = this.findOuterArmor(this._outerTopId);
            if (armor && armor.meta['noInner']) {
                return true;
            }
        }
        */
    return false;
  };
  Game_CostumeActor.prototype.isNoInnerBottom = function () {
    if (this._outerId) {
      var armor = this.findOuterArmor(this._outerId);
      if (armor && armor.meta["noInnerBottom"]) {
        return true;
      }
    }
    if (this._outerTopId) {
      var armor = this.findOuterArmor(this._outerTopId);
      if (armor && armor.meta["noInnerBottom"]) {
        return true;
      }
    }
    return false;
  };
  Game_CostumeActor.prototype.findOuterArmor = function (outerId) {
    for (
      var _i = 0, $dataArmors_1 = $dataArmors;
      _i < $dataArmors_1.length;
      _i++
    ) {
      var armor = $dataArmors_1[_i];
      if (armor) {
        if (armor.meta["outer"] == outerId) {
          return armor;
        }
        if (armor.meta["outerTop"] == outerId) {
          return armor;
        }
      }
    }
    return null;
  };
  Game_CostumeActor.prototype.innerTopShadowFile = function () {
    if (!this.hasInnerTop()) {
      return null;
    }
    var id = this.innerTopId;
    if (this._naked >= 2) {
      return null;
    }
    if (this.isNoInner()) {
      id = "a";
    }
    if (this.breakId >= 3) {
      id = "a";
    }
    return this.baseId + "in_%1_top_shadow_%2".format(id, this.boteImageId());
  };
  Game_CostumeActor.prototype.hairFile = function () {
    var kuro = "";
    if (this.isKuro()) {
      kuro = "k";
    }
    if (this.hasAcce(1091)) {
      return this.baseId + "hair_" + 2 + kuro;
    } else {
      return this.baseId + "hair_" + 1 + kuro;
    }
  };
  Game_CostumeActor.prototype.hoppeFile = function () {
    if (this.hoppeId === 0) {
      return null;
    }
    return this.baseId + "hoppe" + this.hoppeId;
  };
  Game_CostumeActor.prototype.namidaFile = function (faceId) {
    if (this.namidaId === 0) {
      return null;
    }
    var type = this.namidaType(faceId);
    if (type == 1) {
      return this.baseId + "namida" + this.namidaId;
    } else {
      return this.baseId + "namida" + this.namidaId + "_" + type;
    }
  };
  Game_CostumeActor.prototype.namidaType = function (faceId) {
    switch (this.actorId()) {
      case 3:
        return this.namidaType3(faceId);
    }
    return 1;
  };
  Game_CostumeActor.prototype.namidaType3 = function (faceId) {
    switch (faceId) {
      case 2:
      case 12:
      case 13:
      case 16:
      case 17:
      case 18:
      case 19:
      case 20:
      case 25:
        return 2;
    }
    return 1;
  };
  Game_CostumeActor.prototype.faceFile = function (faceId) {
    if (this.isKuroMakeup()) {
      var file_1 = this.baseId + faceId.padZero(2) + "k";
      if (this.isFileExists(file_1)) {
        return file_1;
      }
    }
    var file = this.baseId + faceId.padZero(2);
    if (this.isNoHightlight()) {
      return file + "_n";
    }
    if (this.isBottomHightlight()) {
      return file + "_l";
    }
    return file;
  };
  Game_CostumeActor.prototype.isKuroMakeup = function () {
    return this.hasAcce(298);
  };
  Game_CostumeActor.prototype.backOptionFile = function () {
    if (this.hasAcce(1093)) {
      var id = parseInt($dataArmors[1092].meta["acce"]);
      return this.acceFile(id);
    }
    return null;
  };
  Game_CostumeActor.prototype.getBackAcceList = function () {
    var ret = [];
    var list = [];
    for (var i in this.acceMap) {
      if (!this.acceMap[i]) {
        continue;
      }
      var acceItem = $dataArmors[i];
      if (acceItem.meta["backAcce"]) {
        list.push(acceItem);
      }
    }
    list = list.sort(function (a, b) {
      var orderA = 0;
      var orderB = 0;
      if (a.meta["order"]) {
        orderA = parseInt(a.meta["order"]);
      }
      if (b.meta["order"]) {
        orderB = parseInt(b.meta["order"]);
      }
      return orderA - orderB;
    });
    var append = this.getPersonalBackAcce();
    if (append) {
      list.push(append);
    }
    var bote = $gameSystem.getEro(this.actorId()).bote;
    for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
      var acceItem = list_1[_i];
      var id = parseInt(acceItem.meta["acce"]);
      if (acceItem.meta["alpha"]) {
        ret.push([id, parseInt(acceItem.meta["alpha"])]);
      } else {
        if (bote && acceItem.meta["bote"]) {
          ret.push(id + "_b" + bote);
        } else {
          ret.push(id);
        }
      }
    }
    if (this.hasAcce(209)) {
      ret.push("09_back");
    }
    return ret;
  };
  Game_CostumeActor.prototype.getPersonalBackAcce = function () {
    if (this.actorId() == 3) {
      if (this.outerId == "a" || this.outerId == "d" || this.outerId == "c") {
        return $dataArmors[1094];
      }
      if (this.getNaked()) {
        return $dataArmors[1094];
      }
    }
    return null;
  };
  Game_CostumeActor.prototype.getNaked = function () {
    return this._naked || 0;
  };
  Game_CostumeActor.prototype.syusanCount = function () {
    return this._syusanCount;
  };
  Game_CostumeActor.prototype.setSyusanCount = function (n) {
    this._syusanCount = n;
  };
  Game_CostumeActor.prototype.getSyusanAcceFile = function (
    syusanCount,
    male,
    taneoyaId
  ) {
    if (taneoyaId != TaneoyaId.goblin) {
      if (this.boteId == 0) {
        return this.baseId + "acce_syusan_%1_m".format(syusanCount.padZero(2));
      } else {
        return (
          this.baseId +
          "acce_syusan_%1_m_b%2".format(syusanCount.padZero(2), this.boteId)
        );
      }
    } else {
      if (this.boteId == 0) {
        return this.baseId + "acce_syusan_%1_f".format(syusanCount.padZero(2));
      } else {
        return (
          this.baseId +
          "acce_syusan_%1_f_b%2".format(syusanCount.padZero(2), this.boteId)
        );
      }
    }
  };
  Game_CostumeActor.prototype.isCaptive = function () {
    return false;
  };
  Game_CostumeActor.prototype.isSlave = function () {
    return false;
  };
  Game_CostumeActor.prototype.isTare = function () {
    return this.breastsId >= 2;
  };
  Game_CostumeActor.prototype.isHiddenByTop = function (item) {
    if (this.innerTopId == "a") {
      return false;
    }
    if (this.getNaked() >= 2) {
      return false;
    }
    return item.meta["hiddenByTop"];
  };
  Game_CostumeActor.prototype.hiddenByInnerBottom = function (item) {
    if (this.innerBottomId == "a" || this.getNaked() >= 2) {
      return false;
    }
    if (!item.meta["hiddenByBottom"]) {
      return false;
    }
    return true;
  };
  Game_CostumeActor.prototype.getChimpoSkinFile = function (id) {
    if (id != 62 && id != 63 && id != 68) {
      return null;
    }
    if (this._actorId != 7) {
      return null;
    }
    var actor = $gameActors.actor(7);
    var chimpoId = actor.getLastHistory().mankoImageId();
    if (chimpoId == 1) {
      return null;
    }
    return this.baseId + "acce_" + id.padZero(2) + "_" + chimpoId;
  };
  Game_CostumeActor.prototype.getSkinAcceList = function () {
    var ret = [];
    var list = [];
    var isCaptive = this.isCaptive();
    for (var i in this.acceMap) {
      if (!this.acceMap[i]) {
        continue;
      }
      var acceItem = $dataArmors[i];
      if (acceItem.meta["skinAcce"]) {
        if (this.hiddenByInnerBottom(acceItem)) {
          continue;
        }
        if (acceItem.meta["captive"] && isCaptive) {
          var altId = parseInt(acceItem.meta["captive"]);
          acceItem = $dataArmors[altId];
        }
        list.push(acceItem);
      }
    }
    this.updateNakadashiCountAcce(list);
    list = list.sort(function (a, b) {
      var orderA = a.id;
      var orderB = b.id;
      if (a.meta["order"]) {
        orderA = parseInt(a.meta["order"]);
      }
      if (b.meta["order"]) {
        orderB = parseInt(b.meta["order"]);
      }
      return orderA - orderB;
    });
    var bote = $gameSystem.getEro(this.actorId()).bote;
    for (var _i = 0, list_2 = list; _i < list_2.length; _i++) {
      var acceItem = list_2[_i];
      var id = parseInt(acceItem.meta["acce"]);
      if (acceItem.meta["alpha"]) {
        ret.push([id, parseInt(acceItem.meta["alpha"])]);
      } else {
        ret.push(id);
      }
    }
    if (this.isKuroChikubi()) {
      if (this.hasAcce(1171)) {
        ret.unshift(171);
      } else if (this.hasAcce(1172)) {
        ret.unshift([8, 50]);
        ret.unshift(171);
      } else {
        ret.unshift(8);
      }
    }
    return ret;
  };
  Game_CostumeActor.prototype.updateNakadashiCountAcce = function (list) {
    var count = this.getNakadashiCountAcce(list);
    if (count < 0) {
      return;
    }
    for (var i = 1; i <= 40; i++) {
      var target = $dataArmors[1100 + i];
      if (i <= count) {
        if (list.contains(target)) {
          continue;
        }
        list.push(target);
      } else {
        if (list.contains(target)) {
          list.splice(list.indexOf(target), 1);
        } else {
          break;
        }
      }
    }
  };
  Game_CostumeActor.prototype.getNakadashiCountAcce = function (list) {
    for (var _i = 0, list_3 = list; _i < list_3.length; _i++) {
      var armor = list_3[_i];
      if (armor.meta["nakadashiCount"]) {
        return parseInt(armor.meta["nakadashiCount"]);
      }
    }
    return -1;
  };
  Game_CostumeActor.prototype.isSetItemEquiped = function (baseAcce) {
    var acce1 = parseInt(baseAcce.meta["setAcce1"]);
    var acce2 = parseInt(baseAcce.meta["setAcce2"]);
    var acce3 = parseInt(baseAcce.meta["setAcce3"]);
    if (this.acceMap[acce1]) {
      return true;
    }
    if (this.acceMap[acce2]) {
      return true;
    }
    if (this.acceMap[acce3]) {
      return true;
    }
    return false;
  };
  Game_CostumeActor.prototype.getMiddleAcceList = function () {
    var list = [];
    for (var i in this.acceMap) {
      if (!this.acceMap[i]) {
        continue;
      }
      var acceItem = $dataArmors[i];
      if (acceItem.meta["middleAcce"]) {
        if (this.isHiddenByTop(acceItem)) {
          continue;
        }
        if (this._castOffOuter || this.getNaked()) {
          if (acceItem.meta["castOffOuter"]) {
            continue;
          }
        } else if (this._outerId != "a") {
          if (acceItem.meta["nakedOnly"]) {
            continue;
          }
        }
        list.push(acceItem);
      }
    }
    var baseAcce = $dataArmors[1010];
    if (this.isSetItemEquiped(baseAcce)) {
      list.push(baseAcce);
    }
    var ret = [];
    var bote = $gameSystem.getEro(this.actorId()).bote;
    for (var _i = 0, list_4 = list; _i < list_4.length; _i++) {
      var acceItem = list_4[_i];
      var id = parseInt(acceItem.meta["acce"]);
      if (bote && acceItem.meta["bote"]) {
        ret.push(id + "_b" + bote);
      } else {
        var estrus1 = parseInt(acceItem.meta["estrus1"]);
        var estrus2 = parseInt(acceItem.meta["estrus2"]);
        if (estrus2 <= this.estrus) {
          ret.push(id + "_e2");
        } else if (estrus1 <= this.estrus) {
          ret.push(id + "_e1");
        } else {
          ret.push(id);
        }
      }
    }
    /*ret = ret.sort(function (a, b) {
            return b - a;
        });*/
    return ret;
  };
  Game_CostumeActor.prototype.getSeiekiMiddleAcceList = function () {
    var list = [];
    for (var i in this.acceMap) {
      if (!this.acceMap[i]) {
        continue;
      }
      var acceItem = $dataArmors[i];
      if (acceItem.meta["seiekiMiddle"]) {
        list.push(acceItem);
      }
    }
    var zList = this._acceZ;
    list = list.sort(function (a, b) {
      var indexA = zList.indexOf(a.id);
      var indexB = zList.indexOf(b.id);
      return indexB - indexA;
    });
    return list;
  };
  Game_CostumeActor.prototype.getSeiekiFrontAcceList = function () {
    var list = [];
    for (var i in this.acceMap) {
      if (!this.acceMap[i]) {
        continue;
      }
      var acceItem = $dataArmors[i];
      if (acceItem.meta["seiekiFront"]) {
        list.push(acceItem);
      }
    }
    var zList = this._acceZ;
    list = list.sort(function (a, b) {
      var indexA = zList.indexOf(a.id);
      var indexB = zList.indexOf(b.id);
      return indexB - indexA;
    });
    return list;
  };
  Game_CostumeActor.prototype.getMiddleFrontAcceList = function () {
    var ret = [];
    var list = [];
    for (var i in this.acceMap) {
      if (!this.acceMap[i]) {
        continue;
      }
      var acceItem = $dataArmors[i];
      if (acceItem.meta["middleFrontAcce"]) {
        list.push(acceItem);
      }
    }
    list = list.sort(function (a, b) {
      var orderA = a.id;
      var orderB = b.id;
      if (a.meta["order"]) {
        orderA = parseInt(a.meta["order"]);
      }
      if (b.meta["order"]) {
        orderB = parseInt(b.meta["order"]);
      }
      return orderA - orderB;
    });
    for (var _i = 0, list_5 = list; _i < list_5.length; _i++) {
      var acceItem_1 = list_5[_i];
      var id = parseInt(acceItem_1.meta["acce"]);
      ret.push(id);
    }
    return ret;
  };
  Game_CostumeActor.prototype.isHiddenByTop10 = function (item) {
    if (this.actorId() != 10) {
      return false;
    }
    if (this.outerId != "b" && this.outerId != "g") {
      return false;
    }
    if (this.getNaked() > 0) {
      return false;
    }
    return item.meta["hiddenByTop"];
  };
  Game_CostumeActor.prototype.getFrontAcceList = function () {
    var ret = [];
    var list = [];
    for (var i in this.acceMap) {
      if (!this.acceMap[i]) {
        continue;
      }
      var acceItem = $dataArmors[i];
      if (this.isHiddenByTop10(acceItem)) {
        continue;
      }
      if (acceItem.meta["frontAcce"]) {
        list.push(acceItem);
      }
    }
    list = list.sort(function (a, b) {
      var orderA = a.id;
      var orderB = b.id;
      if (a.meta["order"]) {
        orderA = parseInt(a.meta["order"]);
      }
      if (b.meta["order"]) {
        orderB = parseInt(b.meta["order"]);
      }
      return orderA - orderB;
    });
    for (var _i = 0, list_6 = list; _i < list_6.length; _i++) {
      var acceItem_2 = list_6[_i];
      var id = parseInt(acceItem_2.meta["acce"]);
      ret.push(id);
    }
    var acceId = this.findFrontCurseArmor();
    if (acceId) {
      ret.push(acceId);
    }
    if (this.isCharles() && this.hasCursedAcce()) {
      ret.push(63);
    }
    if (this.isCharles() && this.innerBottomId == "f") {
      ret.push(66);
    }
    return ret;
  };
  Game_CostumeActor.prototype.getFrontRakugakiAcceList = function () {
    var ret = [];
    var list = [];
    for (var i in this.acceMap) {
      if (!this.acceMap[i]) {
        continue;
      }
      var acceItem = $dataArmors[i];
      if (acceItem.meta["frontRakugakiAcce"]) {
        list.push(acceItem);
      }
    }
    list = list.sort(function (a, b) {
      var orderA = a.id;
      var orderB = b.id;
      if (a.meta["order"]) {
        orderA = parseInt(a.meta["order"]);
      }
      if (b.meta["order"]) {
        orderB = parseInt(b.meta["order"]);
      }
      return orderA - orderB;
    });
    for (var _i = 0, list_7 = list; _i < list_7.length; _i++) {
      var acceItem_3 = list_7[_i];
      var id = parseInt(acceItem_3.meta["acce"]);
      ret.push(id);
    }
    return ret;
  };
  Game_CostumeActor.prototype.isCharles = function () {
    return this.actorId() == 7 || this.actorId() == 127;
  };
  Game_CostumeActor.prototype.acceFile = function (id) {
    if (Array.isArray(id)) {
      id = id[0];
    }
    if (this.isKuro()) {
      var file = this.baseId + "acce_" + id.padZero(2) + "k";
      if (this.isFileExists(file)) {
        return file;
      }
    }
    if (this.isTare()) {
      var file = this.baseId + "acce_" + id.padZero(2) + "t1";
      if (this._boteId == 2) {
        var file2 = file + "b2";
        if (this.isFileExists(file2)) {
          return file2;
        }
      }
      if (this.isFileExists(file)) {
        return file;
      }
    }
    var chimpoFile = this.getChimpoSkinFile(id);
    if (chimpoFile) {
      return chimpoFile;
    }
    var bote = this.boteId;
    if (bote) {
      var file = this.baseId + "acce_" + id.padZero(2) + "_b" + this.boteId;
      if (this.isFileExists(file)) {
        return file;
      }
    }
    return this.baseId + "acce_" + id.padZero(2);
  };
  Game_CostumeActor.prototype.acceBackFile = function (id) {
    if (Array.isArray(id)) {
      id = id[0];
    }
    return this.baseId + "acce_back_" + id.padZero(2);
  };
  Game_CostumeActor.prototype.acceFileAlpha = function (data) {
    if (Array.isArray(data)) {
      return data[1] / 100.0;
    }
    return 1;
  };
  Game_CostumeActor.prototype.removeGroup = function (groupId, newArmor) {
    var newId = newArmor.id;
    var isSet = this.hasAcce(newId);
    if (isSet && newArmor.meta["fixed"]) {
      return;
    }
    var removeList = [];
    for (var i in this.acceMap) {
      if (!this.acceMap[i]) {
        continue;
      }
      var acceItem = $dataArmors[i];
      if (acceItem.meta["group"]) {
        var group = parseInt(acceItem.meta["group"]);
        if (group == groupId) {
          removeList.push(i);
        }
      }
    }
    for (
      var _i = 0, removeList_1 = removeList;
      _i < removeList_1.length;
      _i++
    ) {
      var i = removeList_1[_i];
      delete this.acceMap[i];
    }
    if (!isSet) {
      this.addAcce(newId);
    }
  };
  Game_CostumeActor.prototype.addAcce = function (id) {
    if (this.hasAcce(id)) {
      var index = this._acceZ.indexOf(parseInt(id));
      if (index >= 0) {
        this._acceZ.splice(index, 1);
        this._acceZ.push(parseInt(id));
        this.setCacheChanged();
      }
      return;
    }
    this.acceMap[id] = true;
    this._acceZ.push(parseInt(id));
    this.setCacheChanged();
  };
  Game_CostumeActor.prototype.removeAcce = function (id) {
    delete this.acceMap[id];
    this.setCacheChanged();
  };
  Game_CostumeActor.prototype.hasAcce = function (id) {
    if (id == 1008) {
      return this.isKuroChikubi();
    }
    return this.acceMap[id] || false;
  };
  Game_CostumeActor.prototype.isHesoPiercing = function () {
    return this.hasAcce(1004);
  };
  Game_CostumeActor.prototype.isInmon = function () {
    return this.hasAcce(1013);
  };
  Game_CostumeActor.prototype.isKuroChikubi = function () {
    if (this.acceMap[1097]) {
      return true;
    }
    if (this.acceMap[1098]) {
      return false;
    }
    if (this.boteId == 2) {
      return true;
    }
    return false;
  };
  Game_CostumeActor.prototype.reduceDmg = function () {
    return this.calcParam("reduceDmg") + $gameVariables.value(57);
  };
  Game_CostumeActor.prototype.dmgBonus = function () {
    var bonus = 0;
    var info = this.dmgBonusInfo();
    for (var _i = 0, info_1 = info; _i < info_1.length; _i++) {
      var i = info_1[_i];
      bonus += i.value();
    }
    return bonus;
  };
  Game_CostumeActor.prototype.dmgBonusInfo = function () {
    var result = [];
    var item = this.calcParam("dmgBonus");
    if (item > 0) {
      result.push(new DamageBonus(DamageBonusEnum.item, item));
    }
    var syusan = $gameSystem.damageBonus();
    if (syusan > 0) {
      result.push(new DamageBonus(DamageBonusEnum.syusan, syusan));
    }
    return result;
  };
  Game_CostumeActor.prototype.leoDamageBonus = function () {
    var bonus = 0;
    if ($gameSwitches.value(261)) {
      bonus += 5;
    }
    if ($gameSwitches.value(262)) {
      bonus += 5;
    }
    if ($gameSwitches.value(263)) {
      bonus += 5;
    }
    if ($gameSwitches.value(264)) {
      bonus += 5;
    }
    if ($gameSwitches.value(265)) {
      bonus += 5;
    }
    if ($gameSwitches.value(266)) {
      bonus += 5;
    }
    if ($gameSwitches.value(267)) {
      bonus += 5;
    }
    if ($gameSwitches.value(268)) {
      bonus += 5;
    }
    if ($gameSwitches.value(269)) {
      bonus += 5;
    }
    if ($gameSwitches.value(270)) {
      bonus += 5;
    }
    if ($gameSwitches.value(283)) {
      bonus += 5;
    }
    if ($gameSwitches.value(284)) {
      bonus += 5;
    }
    return bonus;
  };
  Game_CostumeActor.prototype.expUp = function () {
    return this.calcParam("exp");
  };
  Game_CostumeActor.prototype.calcParam = function (str) {
    var n = 0;
    for (var _i = 0, _a = $gameParty.armors(); _i < _a.length; _i++) {
      var a = _a[_i];
      if (a.meta[str]) {
        n += parseInt(a.meta[str]);
      }
    }
    return n;
  };
  Game_CostumeActor.prototype.name = function () {
    if (ConfigManager.language == "en") {
      return this.nameEn();
    }
    return _super.prototype.name.call(this);
  };
  Game_CostumeActor.prototype.nameJp = function () {
    return _super.prototype.name.call(this);
  };
  Game_CostumeActor.prototype.nameEn = function () {
    return this.actor().meta["nameEn"] || _super.prototype.name.call(this);
  };
  Game_CostumeActor.prototype.displayLevelUp = function (newSkills) {
    var text2 = TextManager.levelUp;
    var text = text2.format(this._name, TextManager.level, this._level);
    $gameMessage.newPage();
    $gameMessage.add(text);
    for (var _i = 0, newSkills_1 = newSkills; _i < newSkills_1.length; _i++) {
      var skill = newSkills_1[_i];
      $gameMessage.add(TextManager.obtainSkill.format(skill.name));
    }
  };
  Game_CostumeActor.prototype.isOpened = function (item) {
    if ($gameSystem.isEroAcceAllOpened()) {
      return true;
    }
    if (item.meta["sw"]) {
      var sw = parseInt(item.meta["sw"]);
      return $gameSwitches.value(sw);
    }
    if (item.meta["kurochikubiAlpha"]) {
      return this.isOpened($dataArmors[1098]);
    }
    if (
      item.meta["face"] ||
      item.meta["hoppe"] ||
      item.meta["namida"] ||
      item.meta["highlight"]
    ) {
      return true;
    }
    if (item.meta["eventItem"]) {
      return false;
    }
    var openActorId = item.meta["openActor"];
    if (openActorId && parseInt(openActorId) == this.actorId()) {
      return true;
    }
    if (item.meta["open"]) {
      return true;
    }
    if (item.meta["sameCondition"]) {
      var armorId = Math.trunc(item.meta["sameCondition"]);
      var armor = $dataArmors[armorId];
      return this.isOpened(armor);
    }
    if (item.meta["boteCount"]) {
      var count = Math.trunc(item.meta["boteCount"]);
      var actorId = this.actorId();
      var ninshinCount = $gameActors
        .actor(actorId)
        .getActorHistory()
        .countNinshin($gameSystem.day());
      return count <= ninshinCount;
    }
    if (item.meta["syusanCount"]) {
      var count = Math.trunc(item.meta["syusanCount"]);
      var actorId = this.actorId();
      var syusanCount = $gameActors
        .actor(actorId)
        .getActorHistory()
        .countSyusan($gameSystem.day());
      return count <= syusanCount;
    }
    return this._acceOpenMap[item.id];
  };
  Game_CostumeActor.prototype.openAcce = function (id) {
    this._acceOpenMap[id] = true;
  };
  Game_CostumeActor.prototype.hasKubiwa = function () {
    if (this.hasAcce(1002)) {
      return true;
    }
    if (this.hasAcce(1003)) {
      return true;
    }
    return false;
  };
  Game_CostumeActor.prototype.updateEroItem = function () {
    if (this._actorId != 7) {
      return;
    }
    if (this.hasCursedAcce()) {
      var chimpo = $dataArmors[1063];
      var group = parseInt(chimpo.meta["group"]);
      this.removeGroup(group, chimpo);
    }
  };
  return Game_CostumeActor;
})(Game_Actor);
var DamageBonusEnum;
(function (DamageBonusEnum) {
  DamageBonusEnum[(DamageBonusEnum["yadoya"] = 0)] = "yadoya";
  DamageBonusEnum[(DamageBonusEnum["leoFela"] = 1)] = "leoFela";
  DamageBonusEnum[(DamageBonusEnum["item"] = 2)] = "item";
  DamageBonusEnum[(DamageBonusEnum["syusan"] = 3)] = "syusan";
})(DamageBonusEnum || (DamageBonusEnum = {}));
var DamageBonus = /** @class */ (function () {
  function DamageBonus(type, value) {
    this._type = type;
    this._value = value;
  }
  DamageBonus.prototype.value = function () {
    return this._value;
  };
  DamageBonus.prototype.type = function () {
    return this._type;
  };
  return DamageBonus;
})();
Game_Enemy.prototype.reduceDmg = function () {
  return 0;
};
Game_Enemy.prototype.dmgBonus = function () {
  return 0;
};
(function (Nore) {
  function checkBaisyun() {
    if (!$gameMedals.hasMedal(907)) {
      return false;
    }
    var actor = $gameActors.actor(5);
    if (actor.outerId == "a") {
      if (actor.outerTopId == "a" || actor.outerBottomId == "a") {
        return true;
      }
    }
    if (actor.outerTopId == "c") {
      return true;
    }
    if (actor.outerTopId == "f") {
      return true;
    }
    if (actor.outerTopId == "i") {
      return true;
    }
    if (actor.outerId == "h") {
      return true;
    }
    if (actor.outerId == "i") {
      return true;
    }
    if (actor.outerId == "k") {
      return true;
    }
    if (actor.outerTopId == "k") {
      return true;
    }
    return false;
  }
  Nore.checkBaisyun = checkBaisyun;
})(Nore || (Nore = {}));
