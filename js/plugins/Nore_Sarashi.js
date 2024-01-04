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
 * @command Open
 * @text ウィンドウオープン
 * @des ウィンドウオープン
 *
 * @command RunIntro
 * @text 紹介分表示
 * @des 紹介分表示
 * @arg actorId
 * @type number
 * @arg index
 * @type number
 *
 * @command RunBote
 * @text ボテ表示
 * @des ボテ表示
 * @arg actorId
 * @type number
 * @arg isTaneoya
 * @type boolean
 * @arg index
 * @type number
 *
 * @command RunOuter
 * @text 服装表示
 * @des 服装表示
 * @arg actorId
 * @type number
 * @arg  outerId
 * @type string
 *
 * @command RunNakadashi
 * @text 中出し表示
 * @des 中出し表示
 * @arg actorId
 * @type number
 *
 * @command RunAnal
 * @text アナル表示
 * @des アナル表示
 * @arg actorId
 * @type number
 *
 * @command RunSyusan
 * @text 出産回数表示
 * @des 出産回数表示
 * @arg actorId
 * @type number
 *
 * @command RunManko
 * @text おまんこ表示
 * @des おまんこ表示
 * @arg actorId
 * @type number
 *
 * @command SyusanText
 * @text 出産テキスト作成
 * @des 出産テキスト作成
 * @arg actorId
 * @type number
 *
 * @command TaiiText
 * @text 体位テキスト作成
 * @des 体位テキスト作成
 * @arg actorId
 * @type number
 *
 * @command SexText
 * @text セックステキスト作成
 * @des セックステキスト作成
 * @arg actorId
 * @type number
 */
var Nore;
(function (Nore) {
  var VAR_SARASHI = 127;
  var VAR_SARASHI_PLACE = 129;
  var VAR_SARASHI_NAKADASHI = 881;
  var VAR_SARASHI_ANAL = 882;
  var VAR_SARASHI_TAII = 883;
  var VAR_SARASHI_SEX_TAII = 884;
  var VAR_SARASHI_SEX_MAN = 885;
  var pluginName = "Nore_Sarashi";
  PluginManager.registerCommand(pluginName, "Open", function (args) {
    $gameSwitches.setValue(20, false);
    SceneManager.push(Scene_SarashiSelect);
  });
  var SarachiPlace;
  (function (SarachiPlace) {
    SarachiPlace[(SarachiPlace["MURA"] = 0)] = "MURA";
    SarachiPlace[(SarachiPlace["KINGDOM"] = 1)] = "KINGDOM";
    SarachiPlace[(SarachiPlace["EMPIRE"] = 2)] = "EMPIRE";
  })(SarachiPlace || (SarachiPlace = {}));
  var intro = "紹介";
  var bote = "ボテ腹";
  var common = "共通";
  var seed = "種";
  var other = "その他";
  var outer = "服装";
  var naka = "中出し";
  var syusan = "出産回数";
  var omanko = "おまんこ";
  PluginManager.registerCommand(pluginName, "TaiiText", function (args) {
    var actorId = parseInt(args.actorId);
    var actor = $gameActors.actor(actorId);
    var position = actor.getActorHistory().favoriteTaii();
    var value = 0;
    switch (position) {
      case Taii.none:
        value = -1;
        break;
      case Taii.seijoui:
        value = 0;
        break;
      case Taii.back:
        value = 1;
        break;
      case Taii.hutaana:
        value = 2;
        break;
      case Taii.tanetsuke:
        value = 3;
        break;
      case Taii.kijoui:
        value = 4;
        break;
      case Taii.zai:
        value = 4;
        break;
    }
    if (value == -1 && $gameSwitches.value(999)) {
      // 回想中
      value = 0;
    }
    $gameVariables.setValue(VAR_SARASHI_TAII, value);
  });
  PluginManager.registerCommand(pluginName, "SexText", function (args) {
    var actorId = parseInt(args.actorId);
    var actor = $gameActors.actor(actorId);
    var sexEvent = actor.getActorHistory().lastSexEvent();
    var value = 0;
    switch (sexEvent.taii) {
      case Taii.none:
        value = -1;
        break;
      case Taii.seijoui:
        value = 0;
        break;
      case Taii.back:
        value = 1;
        break;
      case Taii.hutaana:
        value = 2;
        break;
      case Taii.tanetsuke:
        value = 3;
        break;
    }
    if (value == -1 && $gameSwitches.value(999)) {
      // 回想中
      value = 0;
    }
    $gameVariables.setValue(VAR_SARASHI_SEX, value);
  });
  PluginManager.registerCommand(pluginName, "SyusanText", function (args) {
    var actorId = parseInt(args.actorId);
    var text = "";
    if ($gameVariables.value(970) > 0) {
      if (text.length > 0) {
        text += "\n";
      }
      var banzokuName = $gameActors.actor(15).name();
      text += TextManager.syusanName.format(
        banzokuName,
        $gameVariables.value(970)
      );
    }
    if ($gameVariables.value(971) > 0) {
      if (text.length > 0) {
        text += "\n";
      }
      var goblinName = $gameActors.actor(85).name();
      text += TextManager.syusanNameGoblin.format(
        goblinName,
        $gameVariables.value(971)
      );
    }
    if ($gameVariables.value(972) > 0) {
      if (text.length > 0) {
        text += "\n";
      }
      var vagrantName = $gameActors.actor(93).name();
      text += TextManager.syusanName.format(
        vagrantName,
        $gameVariables.value(972)
      );
    }
    if ($gameVariables.value(973) > 0) {
      if (text.length > 0) {
        text += "\n";
      }
      var ministerName = $gameActors.actor(13).name();
      text += TextManager.syusanName.format(
        ministerName,
        $gameVariables.value(973)
      );
    }
    if ($gameVariables.value(974) > 0) {
      if (text.length > 0) {
        text += "\n";
      }
      var charlesName = $gameActors.actor(7).name();
      text += TextManager.syusanName.format(
        charlesName,
        $gameVariables.value(974)
      );
    }
    if ($gameVariables.value(975) > 0) {
      if (text.length > 0) {
        text += "\n";
      }
      var charlesName = $gameActors.actor(16).name();
      text += TextManager.syusanName.format(
        charlesName,
        $gameVariables.value(975)
      );
    }
    if ($gameVariables.value(968) > 0) {
      if (text.length > 0) {
        text += "\n";
      }
      var charlesName = $gameActors.actor(133).name();
      text += TextManager.syusanName.format(
        charlesName,
        $gameVariables.value(968)
      );
    }
    if ($gameVariables.value(967) > 0) {
      if (text.length > 0) {
        text += "\n";
      }
      var charlesName = $gameActors.actor(113).name();
      text += TextManager.syusanName.format(
        charlesName,
        $gameVariables.value(967)
      );
    }
    $gameVariables.setValue(969, text);
  });
  PluginManager.registerCommand(pluginName, "RunIntro", function (args) {
    var s = getScenario(intro, args.actorId, null, args.index);
    if (!s) {
      console.error(args);
    }
    var list = $dataScenario[s.id];
    if (!list) {
      throw new Error("id:" + s.id + " のデータが見つかりません");
    }
    console.log("Scenario \u30B3\u30DE\u30F3\u30C9\u5B9F\u884C: " + s.id);
    this.setupChild(list, this._eventId);
  });
  PluginManager.registerCommand(pluginName, "RunBote", function (args) {
    p("RunBote");
    var s;
    if (args.isTaneoya == "true") {
      var taneoyaId = $gameVariables.value(70);
      var taneoya = getTaneoyaNameJa(taneoyaId);
      s = getScenario(bote, args.actorId, taneoya, args.index);
      if (!s) {
        s = getScenario(bote, args.actorId, other, args.index);
      } else {
        $gameSwitches.setValue(160 + taneoyaId, true);
        p(160 + taneoyaId + "をON");
      }
    } else {
      s = getScenario(bote, args.actorId, null, args.index);
    }
    var list = $dataScenario[s.id];
    if (!list) {
      throw new Error("id:" + s.id + " のデータが見つかりません");
    }
    console.log("Scenario \u30B3\u30DE\u30F3\u30C9\u5B9F\u884C: " + s.id);
    this.setupChild(list, this._eventId);
  });
  PluginManager.registerCommand(pluginName, "RunOuter", function (args) {
    var s = getOuterScenario(outer, args.actorId, args.outerId);
    var list = $dataScenario[s.id];
    if (!list) {
      throw new Error("id:" + s.id + " のデータが見つかりません");
    }
    console.log("Scenario \u30B3\u30DE\u30F3\u30C9\u5B9F\u884C: " + s.id);
    this.setupChild(list, this._eventId);
  });
  PluginManager.registerCommand(pluginName, "RunNakadashi", function (args) {
    var s = getNakadashiScenario(naka, args.actorId);
    if (!s) {
      console.error(args);
      throw new Error("id: RunNakadashi のデータが見つかりません");
    }
    var list = $dataScenario[s.id];
    if (!list) {
      throw new Error("id:" + s.id + " のデータが見つかりません");
    }
    console.log("Scenario \u30B3\u30DE\u30F3\u30C9\u5B9F\u884C: " + s.id);
    this.setupChild(list, this._eventId);
  });
  PluginManager.registerCommand(pluginName, "RunAnal", function (args) {
    var s = getAnalScenario(args.actorId);
    if (!s) {
      console.error(args);
      throw new Error("id: RunAnal のデータが見つかりません");
    }
    var list = $dataScenario[s.id];
    if (!list) {
      throw new Error("id:" + s.id + " のデータが見つかりません");
    }
    console.log("Scenario \u30B3\u30DE\u30F3\u30C9\u5B9F\u884C: " + s.id);
    this.setupChild(list, this._eventId);
  });
  PluginManager.registerCommand(pluginName, "RunSyusan", function (args) {
    var s = getSyusanScenario(syusan, args.actorId);
    var list = $dataScenario[s.id];
    if (!list) {
      throw new Error("id:" + s.id + " のデータが見つかりません");
    }
    console.log("Scenario \u30B3\u30DE\u30F3\u30C9\u5B9F\u884C: " + s.id);
    this.setupChild(list, this._eventId);
  });
  PluginManager.registerCommand(pluginName, "RunManko", function (args) {
    var s = getOmankoScenario(omanko, args.actorId);
    var list = $dataScenario[s.id];
    if (!list) {
      throw new Error("id:" + s.id + " のデータが見つかりません");
    }
    console.log("Scenario \u30B3\u30DE\u30F3\u30C9\u5B9F\u884C: " + s.id);
    this.setupChild(list, this._eventId);
  });
  PluginManager.registerCommand(pluginName, "RunAcce", function (args) {
    var s = getAcceScenario(args.actorId, args.type);
    if (!s) {
      return;
    }
    var list = $dataScenario[s.id];
    if (!list) {
      console.error("id:" + s.id + " のデータが見つかりません");
      return;
    }
    console.log("Scenario \u30B3\u30DE\u30F3\u30C9\u5B9F\u884C: " + s.id);
    this.setupChild(list, this._eventId);
  });
  function getScenario(type, actorId, taneoya, index) {
    var actorName = getActorName(actorId);
    var base1;
    if (taneoya) {
      base1 = "%1_%2_%3_%4".format(
        type,
        actorName,
        index.padZero(2),
        seed + taneoya
      );
    } else {
      base1 = "%1_%2_%3".format(type, actorName, index.padZero(2));
    }
    var base2;
    if (taneoya) {
      base2 = "%1_%2_%3_%4".format(
        type,
        actorName,
        index.padZero(2),
        seed + taneoya
      );
    } else {
      base2 = "%1_%2_%3".format(type, actorName, index.padZero(2));
    }
    p(base1);
    p(base2);
    var candidates = getCandidates(base1, base2);
    if (candidates.length == 0) {
      console.error(base1);
      return null;
    }
    var obj = {};
    var dice = Math.randomInt(candidates.length);
    obj.id = candidates[dice];
    return obj;
  }
  function getOuterName(outerId) {
    switch (outerId) {
      case "a":
        return "裸";
      case "b":
        return "通常";
      case "c":
        return "売春婦";
      case "g":
        return "下脱ぎ";
    }
  }
  function getOuterScenario(type, actorId, outer) {
    var actorName = getActorName(actorId);
    var outerName = getOuterName(outer);
    var base1 = "%1_%2_%3".format(type, actorName, outerName);
    var base2 = "%1_%2_%3".format(type, actorName, outerName);
    var candidates = getCandidates(base1, base2);
    if (candidates.length == 0) {
      p(base1);
      p(base2);
      return null;
    }
    var obj = {};
    var dice = Math.randomInt(candidates.length);
    obj.id = candidates[dice];
    return obj;
  }
  function getSyusanScenario(type, actorId) {
    var actorName = getActorName(actorId);
    var base1 = "%1_%2".format(type, actorName);
    var base2 = "%1_%2".format(type, actorName);
    p(base1);
    p(base2);
    var candidates = getCandidates(base1, base2);
    if (candidates.length == 0) {
      return null;
    }
    var obj = {};
    var dice = Math.randomInt(candidates.length);
    obj.id = candidates[dice];
    return obj;
  }
  function getOmankoScenario(type, actorId) {
    var actorName = getActorName(actorId);
    var lv;
    if (actorId == 7) {
      lv = $gameVariables.value(976);
      if (lv > 5) {
        lv = 5;
      }
    } else {
      lv = $gameVariables.value(979);
      if (lv > 6) {
        lv = 6;
      }
    }
    var lvStr = "LV" + lv;
    var base1 = "%1_%2_%3".format(type, actorName, lvStr);
    var base2 = "%1_%2_%3".format(type, actorName, lvStr);
    var candidates = getCandidates(base1, base2);
    if (candidates.length == 0) {
      return null;
    }
    var obj = {};
    var dice = Math.randomInt(candidates.length);
    obj.id = candidates[dice];
    return obj;
  }
  function getAcceScenario(actorId, type) {
    var actorName = getActorName(actorId);
    var actor = $gameActors.actor(actorId);
    if (type == "精液") {
      var nakadashiType = actor.getLastHistory().lastNakadashiType();
      if (nakadashiType == 0) {
        return null;
      }
      var name_1 = getTaneoyaNameJa(nakadashiType);
      var base1_1 = "%1_%2_%3_01".format(type, actorName, name_1);
      var obj_1 = {};
      obj_1.id = base1_1;
      return obj_1;
    }
    if (!actor.hasAcce(1014)) {
      return null;
    }
    var base1 = "%1_%2_01".format(type, actorName);
    var obj = {};
    obj.id = base1;
    return obj;
  }
  function getNakadashiScenario(type, actorId) {
    var actorName = getActorName(actorId);
    var count = $gameVariables.value(VAR_SARASHI_NAKADASHI);
    var nakaType = count == 0 ? "処女" : "非処女";
    var base1 = "%1_%2_%3".format(type, actorName, nakaType);
    var base2 = "%1_%2_%3".format(type, actorName, nakaType);
    var candidates = getCandidates(base1, base2);
    if (candidates.length == 0) {
      p(nakaType);
      p(base1);
      return null;
    }
    var obj = {};
    var dice = Math.randomInt(candidates.length);
    obj.id = candidates[dice];
    return obj;
  }
  function getAnalScenario(actorId) {
    var actorName = getActorName(actorId);
    var base1 = "アナル_%1_01".format(actorName);
    var obj = {};
    obj.id = base1;
    return obj;
  }
  function getCandidates(base1, base2) {
    var result = [];
    for (var i = 1; i <= 10; i++) {
      var id = base1 + "_" + i.padZero(2);
      var normalized = id.normalize("NFC");
      if ($dataScenario[normalized]) {
        result.push(normalized);
      } else {
        break;
      }
    }
    for (var i = 1; i <= 10; i++) {
      var id = base2 + "_" + i.padZero(2);
      var normalized = id.normalize("NFC");
      if ($dataScenario[normalized]) {
        result.push(normalized);
      } else {
        break;
      }
    }
    return result;
  }
  function getActorName(actorId) {
    switch (parseInt(actorId)) {
      case 1:
        return "レイラ";
      case 2:
        return "ターニャ";
      case 3:
        return "ミオリ";
      case 4:
        return "サラ";
      case 5:
        return "ディーナ";
      case 6:
        return "ネル";
      case 7:
        return "シャルル";
      case 10:
        return "リン";
      case 12:
        return "アイリス";
    }
    return $gameActors.actor(actorId).nameJp();
  }
  var Scene_SarashiSelect = /** @class */ (function (_super) {
    __extends(Scene_SarashiSelect, _super);
    function Scene_SarashiSelect() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Scene_SarashiSelect.prototype.create = function () {
      _super.prototype.create.call(this);
      this.createWarpWindow();
    };
    Scene_SarashiSelect.prototype.createWarpWindow = function () {
      var rect = new Rectangle(420, 210, 500, 144);
      this._syusanSelectWindow = new Window_SarashiSelect(rect);
      this.addChild(this._syusanSelectWindow);
      this._syusanSelectWindow.refresh();
      this._syusanSelectWindow.setHandler("ok", this.onOk.bind(this));
      this._syusanSelectWindow.setHandler("cancel", this.onCancel.bind(this));
    };
    Scene_SarashiSelect.prototype.onOk = function () {
      var item = this._syusanSelectWindow.selectedItem();
      if (item) {
        var actorId = item.actorId();
        $gameVariables.setValue(VAR_SARASHI, actorId);
        var actor = $gameActors.actor(actorId);
        $gameVariables.setValue(20, actor.name());
      } else {
        $gameVariables.setValue(VAR_SARASHI, 0);
      }
      SceneManager.pop();
    };
    Scene_SarashiSelect.prototype.onCancel = function () {
      SceneManager.pop();
    };
    return Scene_SarashiSelect;
  })(Scene_MenuBase);
  var Window_SarashiSelect = /** @class */ (function (_super) {
    __extends(Window_SarashiSelect, _super);
    function Window_SarashiSelect() {
      var _this = (_super !== null && _super.apply(this, arguments)) || this;
      _this._list = [];
      return _this;
    }
    Window_SarashiSelect.prototype.makeItemList = function () {
      this._list = [];
      for (var _i = 0, _a = $gameParty.allMembers(); _i < _a.length; _i++) {
        var a = _a[_i];
        this._list.push(a);
      }
      this._list.push(null);
      this.height = Math.ceil(this._list.length / 2) * this.itemHeight() + 24;
      this.createContents();
    };
    Window_SarashiSelect.prototype.maxCols = function () {
      return 2;
    };
    Window_SarashiSelect.prototype.isCurrentItemEnabled = function () {
      return this.isEnabled(this.selectedItem());
    };
    Window_SarashiSelect.prototype.isEnabled = function (item) {
      if (!$gameSystem.isTaikenban()) {
        return true;
      }
      if (item && item.actorId() != 1) {
        return false;
      }
      return true;
    };
    Window_SarashiSelect.prototype.refresh = function () {
      this.makeItemList();
      _super.prototype.refresh.call(this);
      this.select(0);
      this.activate();
    };
    Window_SarashiSelect.prototype.maxItems = function () {
      return this._list.length;
    };
    Window_SarashiSelect.prototype.drawItem = function (index) {
      var rect = this.itemRect(index);
      var item = this._list[index];
      var offset = 50;
      if (!item) {
        this.changePaintOpacity(true);
        this.drawText(
          TextManager.syusanCancel,
          rect.x + offset,
          rect.y + 10,
          rect.width
        );
        return;
      }
      var name = item.name();
      if (this.isEnabled(item)) {
        this.changePaintOpacity(true);
      } else {
        this.changePaintOpacity(false);
        name = TextManager.prisonLockedTaikenban;
      }
      this.drawCharacterImage(item.actorId(), rect.x, rect.y);
      this.drawText(
        name,
        rect.x + offset,
        rect.y + 10,
        rect.width - offset - 10
      );
    };
    Window_SarashiSelect.prototype.drawCharacterImage = function (
      actorId,
      x,
      y
    ) {
      var cos = new CostumeSaver(actorId);
      var c = new Nore.Game_DungeonCharacter(cos, x + 36, y + 76);
      var sprite = new Sprite_ActorCharacter(c, cos);
      this._windowContentsSprite.addChild(sprite);
    };
    Window_SarashiSelect.prototype.selectedItem = function () {
      return this._list[this.index()];
    };
    Window_SarashiSelect.prototype.itemHeight = function () {
      return 70;
    };
    return Window_SarashiSelect;
  })(Window_Selectable);
})(Nore || (Nore = {}));
function getTaneoyaNameJa(taneoyaId) {
  switch (taneoyaId) {
    case TaneoyaId.banzoku:
      return $gameActors.actor(30).nameJp();
    case TaneoyaId.chosyuhei:
      return $gameActors.actor(61).nameJp();
    case TaneoyaId.charles:
      return $gameActors.actor(7).nameJp();
    case TaneoyaId.goblin:
      return $gameActors.actor(85).nameJp();
    case TaneoyaId.minister:
      return $gameActors.actor(13).nameJp();
    case TaneoyaId.vagrant:
      return $gameActors.actor(93).nameJp();
    case TaneoyaId.bar:
      return $gameActors.actor(113).nameJp();
    case TaneoyaId.gray:
      return $gameActors.actor(16).nameJp();
    case TaneoyaId.loli:
      return $gameActors.actor(140).nameJp();
  }
  return "名称未設定";
}
