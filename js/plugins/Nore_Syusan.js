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
 * @command goEro
 * @text エロシーンへ
 * @des エロシーンへ
 * @arg actorId
 * @type number
 */
var Nore;
(function (Nore) {
  var ERO_ACTOR_VAR = 6;
  var ERO_SAVE_SW = 981;
  var pluginName = "Nore_Syusan";
  PluginManager.registerCommand(pluginName, "goEro", function (args) {
    var actorId = Math.trunc(args.actorId);
    $gameVariables.setValue(ERO_ACTOR_VAR, actorId);
    SceneManager.push(Scene_Punish);
  });
  PluginManager.registerCommand(pluginName, "showLayer", function (args) {
    var id = args.id;
    var file;
    switch (actorId) {
      case 1:
        file = "01_50_" + id;
        break;
    }
    $gameTemp.ignoreFiles[file] = false;
  });
  PluginManager.registerCommand(pluginName, "hideLayer", function (args) {
    var id = args.id;
    var file;
    switch (actorId) {
      case 1:
        file = "01_50_" + id;
        break;
    }
    $gameTemp.ignoreFiles[file] = true;
  });
  PluginManager.registerCommand(pluginName, "plusSanke", function (args) {
    var n = parseInt(args.value);
    syusanParams.plusSanke(n);
  });
  PluginManager.registerCommand(pluginName, "setTaneoya", function (args) {
    var n = parseInt(args.id);
    $gameActors.mainActor().sikyu().taneoyaId = n;
  });
  PluginManager.registerCommand(pluginName, "plusSeieki", function (args) {
    syusanParams.syusanSeieki = 1;
  });
  PluginManager.registerCommand(pluginName, "face", function (args) {
    var n = parseInt(args.face);
    var actor = $gameActors.mainActor();
    actor._faceId = n;
  });
  Nore.allImageList = [];
  var FILE_LIST;
  (function (FILE_LIST) {
    FILE_LIST["NAKADASHI"] = "\u4E2D\u51FA\u3057\u56DE\u6570";
    FILE_LIST["ACME"] = "\u7D76\u9802\u56DE\u6570";
    FILE_LIST["ANAL"] = "\u30A2\u30CA\u30EB\u56DE\u6570";
    FILE_LIST["SHOJO"] = "\u51E6\u5973\u55AA\u5931";
    FILE_LIST["END"] = "\u7D42\u3048\u308B";
  })(FILE_LIST || (FILE_LIST = {}));
  var syusanParams;
  var SyusanParams = /** @class */ (function () {
    function SyusanParams(aid) {
      this.criPoint = 0;
      this.syusanSeieki = 0;
      this.sanke = 0;
      this._actorId = aid;
    }
    SyusanParams.prototype.actorId = function () {
      return this._actorId;
    };
    SyusanParams.prototype.faceId = function () {
      var actor = this.actor();
      var id = actor.faceId;
      return id;
    };
    SyusanParams.prototype.plusSanke = function (n) {
      this.sanke += n;
      this.sanke = Math.min(this.sanke, 100);
    };
    SyusanParams.prototype.isMaxSanke = function () {
      return this.sanke >= 100;
    };
    SyusanParams.prototype.actor = function () {
      return $gameActors.actor(this.actorId());
    };
    SyusanParams.prototype.hoppeId = function () {
      var actor = this.actor();
      return actor.hoppeId;
    };
    SyusanParams.prototype.boteId = function () {
      return this.actor().boteId;
    };
    return SyusanParams;
  })();
  Nore.SyusanParams = SyusanParams;
  var Scene_Punish = /** @class */ (function (_super) {
    __extends(Scene_Punish, _super);
    function Scene_Punish() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Scene_Punish.prototype.update = function () {
      _super.prototype.update.call(this);
      $gameScreen.update();
    };
    Scene_Punish.prototype.create = function () {
      _super.prototype.create.call(this);
      var actorId = $gameVariables.value(ERO_ACTOR_VAR);
      this._params = new SyusanParams(actorId);
      this.createSprite();
      this.createWindowLayer();
      this.createMenuWindow();
      this.createAllWindows();
      if ($gameSwitches.value(998)) {
        this.playScenario("actor%1_晒し者_opening_01".format(actorId));
      } else {
        var scenarioId = $gameTemp.punishScenario();
        if (!scenarioId) {
          console.error("punishScenarioが設定されていません");
        }
        this._finished = true;
        $gameTemp.setPunishScenario(null);
        this.playScenario(scenarioId);
      }
    };
    Scene_Punish.prototype.createMenuWindow = function () {
      this._menuWindow = new Window_PunishMenu(this);
      this.addWindow(this._menuWindow);
      this._menuWindow.setHandler("ok", this.onOk.bind(this));
    };
    Scene_Punish.prototype.createSprite = function () {
      this._sprite = new Nore.Sprite_Syusan(this._params);
      this.addChild(this._sprite);
      this._sprite.refresh();
    };
    Scene_Punish.prototype.playScenario = function (id) {
      _super.prototype.playScenario.call(this, id);
      $gameSwitches.setValue(69, false);
      this._menuWindow.deactivate();
      this._menuWindow.hide();
    };
    Scene_Punish.prototype.finishScenario = function () {
      $gameSwitches.setValue(69, true);
      this._menuWindow.activate();
      if (this._finished) {
        SceneManager.pop();
        return;
      }
      p("finishScenario");
      this._menuWindow._itemList = null;
      this._menuWindow.makeItemList();
      this._menuWindow.refresh();
      this._menuWindow.show();
    };
    Scene_Punish.prototype.onOk = function () {
      var id = this._menuWindow.selectedId();
      var file = this._menuWindow.symbolToFile(id);
      this.playAction(file);
      /* switch (id) {
                 case PunishCommad.NAKADASHI: this.onNakadashi(); break;
                 
                 default:
                     this._menuWindow.activate();
                     this._menuWindow.select(0);
                     return;
     
             }*/
      this._menuWindow.makeItemList();
      this._menuWindow.refresh();
    };
    Scene_Punish.prototype.playAction = function (file) {
      if (file == FILE_LIST.END) {
        this._finished = true;
      }
      var level = "01";
      var scenarioId =
        "actor" + this._params.actorId() + "_晒し者_%1_%2".format(file, level);
      this.playScenario(scenarioId);
    };
    Scene_Punish.prototype.isCommandExists = function (type) {
      var level = "01";
      var scenarioId =
        "actor" + this._params.actorId() + "_晒し者_%1_%2".format(type, level);
      return $dataScenario[scenarioId] != null;
    };
    return Scene_Punish;
  })(Nore.Scene_Talk);
  Nore.Scene_Punish = Scene_Punish;
  var PunishCommad;
  (function (PunishCommad) {
    PunishCommad[(PunishCommad["NAKADASHI"] = 1)] = "NAKADASHI";
    PunishCommad[(PunishCommad["ACME"] = 2)] = "ACME";
    PunishCommad[(PunishCommad["ANAL"] = 3)] = "ANAL";
    PunishCommad[(PunishCommad["SHOJO"] = 4)] = "SHOJO";
    PunishCommad[(PunishCommad["PUNISH"] = 5)] = "PUNISH";
    PunishCommad[(PunishCommad["LABIA"] = 6)] = "LABIA";
    PunishCommad[(PunishCommad["SYUSAN"] = 7)] = "SYUSAN";
    PunishCommad[(PunishCommad["YAKIIN"] = 8)] = "YAKIIN";
    PunishCommad[(PunishCommad["END"] = 99)] = "END";
  })((PunishCommad = Nore.PunishCommad || (Nore.PunishCommad = {})));
  var Window_PunishMenu = /** @class */ (function (_super) {
    __extends(Window_PunishMenu, _super);
    function Window_PunishMenu() {
      var _this = (_super !== null && _super.apply(this, arguments)) || this;
      _this.isCurrentItemEnabled = function () {
        var id = this.selectedId();
        return this.isItemEnabled(id);
      };
      return _this;
    }
    Window_PunishMenu.prototype.initialize = function (scene) {
      _super.prototype.initialize.call(
        this,
        new Rectangle(0, 0, 390, this.windowHeight())
      );
      this._scene = scene;
      this.select(0);
      this.deactivate();
      this.makeItemList();
      this.refresh();
    };
    Window_PunishMenu.prototype.symbolToFile = function (command) {
      switch (command) {
        case PunishCommad.NAKADASHI:
          return FILE_LIST.NAKADASHI;
        case PunishCommad.ACME:
          return FILE_LIST.ACME;
        case PunishCommad.ANAL:
          return FILE_LIST.ANAL;
        case PunishCommad.SHOJO:
          return FILE_LIST.SHOJO;
        case PunishCommad.END:
          return FILE_LIST.END;
      }
      return null;
    };
    Window_PunishMenu.prototype.makeItemList = function () {
      if (this._itemList) {
        return;
      }
      this._itemList = [];
      var d = this._itemList;
      var symbols = [
        PunishCommad.NAKADASHI,
        PunishCommad.ACME,
        PunishCommad.ANAL,
        PunishCommad.SHOJO,
        PunishCommad.END,
      ];
      for (var _i = 0, symbols_1 = symbols; _i < symbols_1.length; _i++) {
        var s = symbols_1[_i];
        var file = this.symbolToFile(s);
        if (this.isCommandExists(file)) {
          d.push(s);
        }
      }
      this.height = this._itemList.length * (this.lineHeight() + 6) + 40;
      if (this._itemList.length >= this.index()) {
        this.select(this._itemList.length - 1);
      }
    };
    Window_PunishMenu.prototype.isCommandExists = function (type) {
      return this._scene.isCommandExists(type);
    };
    Window_PunishMenu.prototype.drawItem = function (index) {
      var rect = this.itemRect(index);
      var id = this._itemList[index];
      var enabled = this.isItemEnabled(id);
      this.changePaintOpacity(enabled);
      this.drawText(getPunishEroName(id), 12, rect.y, 300, "left");
    };
    Window_PunishMenu.prototype.isItemEnabled = function (id) {
      return true;
    };
    Window_PunishMenu.prototype.isConditionMatches = function (params, state) {
      var ero = $gameSystem.getEro(this._actorId);
      var level = Math.floor(ero[state + "Lv"] / 10);
      for (var i = 10; i >= 0; i--) {
        if (this.conditionMatch(params[level], i, ero)) {
          return true;
        }
      }
      return false;
    };
    Window_PunishMenu.prototype.conditionMatch = function (params, level, ero) {
      level = Math.floor(level / 10);
      if (!params) {
        return false;
      }
      if (!params[level]) {
        return false;
      }
      var condition = params[level][0];
      for (var con in condition) {
        if (ero[con] < condition[con]) {
          return false;
        }
      }
      return true;
    };
    Window_PunishMenu.prototype.windowHeight = function () {
      return 9 * (this.lineHeight() + 10) + 12 * 2;
    };
    Window_PunishMenu.prototype.selectedId = function () {
      return this._itemList[this.index()];
    };
    Window_PunishMenu.prototype.maxItems = function () {
      if (!this._itemList) {
        return 0;
      }
      return this._itemList.length;
    };
    Window_PunishMenu.prototype.maxCols = function () {
      return 1;
    };
    return Window_PunishMenu;
  })(Window_Selectable);
  var Scene_Syusan = /** @class */ (function (_super) {
    __extends(Scene_Syusan, _super);
    function Scene_Syusan() {
      var _this = (_super !== null && _super.apply(this, arguments)) || this;
      _this._levelMap = {};
      _this._runTaneoyaOpening = false;
      return _this;
    }
    Scene_Syusan.prototype.update = function () {
      _super.prototype.update.call(this);
      $gameScreen.update();
    };
    Scene_Syusan.prototype.create = function () {
      _super.prototype.create.call(this);
      actorId = $gameVariables.value(82);
      this._params = new SyusanParams(actorId);
      syusanParams = this._params;
      this.initTaneoyaName();
      this.initImages(actorId);
      this.createSprite();
      this.createWindowLayer();
      this.createStatusWindow();
      this.createMenuWindow();
      this.createAllWindows();
      this.playScenario("出産1_オープニング_01");
    };
    Scene_Syusan.prototype.initTaneoyaName = function () {
      this._taneoyaName = $gameVariables.value(20);
      switch (this._taneoyaName) {
        case $dataEnemies[305].name: // マーク
        case $dataEnemies[308].name: // 神父
        case $dataEnemies[307].name: // 浮浪者
        case "テオ":
        case "アンドレイ":
          break;
        case $dataEnemies[311].name: // ブタA:
        case $dataEnemies[312].name: //'ブタB':
        case $dataEnemies[313].name: //'ブタC':
        case $dataEnemies[314].name: //'ブタD':
        case $dataEnemies[315].name: //'ブタE':
        case $dataEnemies[316].name: //'ブタF':
          this._taneoyaName = $dataEnemies[304].name; //'メイヴィス';
          break;
        default:
          this._taneoyaName = "不明";
      }
    };
    Scene_Syusan.prototype.playScenario = function (id) {
      _super.prototype.playScenario.call(this, id);
      $gameSwitches.setValue(69, false);
      this._menuWindow.deactivate();
    };
    Scene_Syusan.prototype.finishScenario = function () {
      if (!this._runTaneoyaOpening) {
        this.runTaneoyaOpening();
        return;
      }
      $gameSwitches.setValue(69, true);
      this._menuWindow.activate();
      if (this._finished) {
        SceneManager.pop();
      } else if (this._params.isMaxSanke()) {
        this._menuWindow.hide();
        this._statusWindow.hide();
        this._finished = true;
        this.playScenario("出産1_出産_%1".format(this._taneoyaName));
      } else {
        p("finishScenario");
        this._menuWindow._itemList = null;
        this._menuWindow.makeItemList();
        this._menuWindow.refresh();
      }
    };
    Scene_Syusan.prototype.runTaneoyaOpening = function () {
      this._runTaneoyaOpening = true;
      var taneoyaId = $gameVariables.value(76);
      var count = $gameVariables.value(taneoyaId - 200);
      p("count" + count);
      switch (taneoyaId) {
        case 303:
          if (count >= 2) {
            this.playScenario("出産1_アンドレイ_オープニング_02");
          } else {
            this.playScenario("出産1_アンドレイ_オープニング_01");
          }
          break;
        case 305:
          if (count >= 2) {
            this.playScenario("出産1_マーク_オープニング_02");
          } else {
            this.playScenario("出産1_マーク_オープニング_01");
          }
          break;
        case 307:
          if (count >= 2) {
            this.playScenario("出産1_浮浪者_オープニング_02");
          } else {
            this.playScenario("出産1_浮浪者_オープニング_01");
          }
          break;
        case 308:
          if (count >= 2) {
            this.playScenario("出産1_神父_オープニング_02");
          } else {
            this.playScenario("出産1_神父_オープニング_01");
          }
          break;
        case 309:
          if (count >= 2) {
            this.playScenario("出産1_テオ_オープニング_02");
          } else {
            this.playScenario("出産1_テオ_オープニング_01");
          }
          break;
        case 311:
        case 312:
        case 313:
        case 314:
        case 315:
        case 316:
          if (count >= 2) {
            this.playScenario("出産1_メイヴィス_オープニング_02");
          } else {
            this.playScenario("出産1_メイヴィス_オープニング_01");
          }
          break;
        default:
          var c2 = $gameVariables.value(120);
          if (c2 >= 2) {
            this.playScenario("出産1_不明_オープニング_02");
          } else {
            this.playScenario("出産1_不明_オープニング_01");
          }
      }
    };
    Scene_Syusan.prototype.initImages = function (actorId) {
      var actor = $gameActors.actor(actorId);
      if (actorId == 1) {
        Nore.allImageList = actor1EroList.concat();
        for (
          var _i = 0, ero1First_1 = ero1First;
          _i < ero1First_1.length;
          _i++
        ) {
          var f = ero1First_1[_i];
          $gameTemp.ignoreFiles[f] = true;
        }
        if (actor.hasAcce(208)) {
          $gameTemp.ignoreFiles["01_50_淫紋"] = false;
        }
        if (actor.hasAcce(210)) {
          $gameTemp.ignoreFiles["01_50_乳首ピアス"] = false;
        }
        if (actor.hasAcce(224)) {
          $gameTemp.ignoreFiles["01_50_黒乳首"] = false;
        }
        if (actor.hasAcce(214)) {
          $gameTemp.ignoreFiles["01_50_焼印1"] = false;
        }
        if (actor.hasAcce(215)) {
          $gameTemp.ignoreFiles["01_50_焼印2"] = false;
        }
      }
    };
    Scene_Syusan.prototype.createMenuWindow = function () {
      this._menuWindow = new Window_ChokyoMenu(
        this._statusWindow.height,
        this._params,
        this
      );
      this.addWindow(this._menuWindow);
      this._menuWindow.setHandler("ok", this.onOk.bind(this));
    };
    Scene_Syusan.prototype.createStatusWindow = function () {
      this._statusWindow = new Window_EroStatus(this._params);
      this.addWindow(this._statusWindow);
    };
    Scene_Syusan.prototype.createSprite = function () {
      this._sprite = new Sprite_Chokyo(this._params);
      this.addChild(this._sprite);
    };
    Scene_Syusan.prototype.onOk = function () {
      var id = this._menuWindow.selectedId();
      switch (id) {
        case SyusanCommad.VIBE:
          this.doVibe();
          break;
        case SyusanCommad.CHIKUBI:
          this.doChikubi();
          break;
        case SyusanCommad.CHIKUBI2:
          this.doChikubi2();
          break;
        case SyusanCommad.KUPAA:
          this.doKupaa();
          break;
        case SyusanCommad.BUKKAKE:
          this.doBukkake();
          break;
        case SyusanCommad.SEX:
          this.doSex();
          break;
        case SyusanCommad.MUCHI:
          this.doMuchi();
          break;
        case SyusanCommad.ANAL:
          this.doAnal();
          break;
        case SyusanCommad.TEMAN:
          this.doTeman();
          break;
        default:
          this._menuWindow.activate();
          this._menuWindow.select(0);
          return;
      }
      this._menuWindow.makeItemList();
      this._menuWindow.refresh();
    };
    Scene_Syusan.prototype.doVibe = function () {
      this.playScenario("出産" + actorId + "_手マン_LV" + 1);
    };
    Scene_Syusan.prototype.doSex = function () {
      $gameSystem
        .info()
        .plusNakadashi(1, $gameActors.mainActor().sikyu().taneoyaId);
      this.playScenario(
        "出産" +
          actorId +
          "_セックス_%1_LV%2".format(
            this._taneoyaName,
            this.getLevel("セックス")
          )
      );
    };
    Scene_Syusan.prototype.getLevel = function (str) {
      this._levelMap[str] = this._levelMap[str] || 0;
      this._levelMap[str]++;
      var total = 0;
      for (var i in this._levelMap) {
        total += this._levelMap[i];
      }
      if (total >= 6) {
        return 6;
      } else {
        return this._levelMap[str];
      }
    };
    Scene_Syusan.prototype.isCommandExists = function (type) {
      this._levelMap[type] = this._levelMap[type] || 0;
      var nextLevel = this._levelMap[type] + 1;
      var total = 0;
      for (var i in this._levelMap) {
        total += this._levelMap[i];
      }
      if (total >= 5) {
        nextLevel = 6;
      }
      var scenarioId =
        "出産" +
        actorId +
        "_%3_%1_LV%2".format(this._taneoyaName, nextLevel, type);
      p(scenarioId);
      return $dataScenario[scenarioId] != null;
    };
    Scene_Syusan.prototype.doMuchi = function () {
      this.playScenario(
        "出産" +
          actorId +
          "_ムチ_%1_LV%2".format(this._taneoyaName, this.getLevel("ムチ"))
      );
    };
    Scene_Syusan.prototype.doKupaa = function () {
      this._params.kupaa = true;
      this.playScenario(
        "出産" + actorId + "_くぱぁ_%1_LV%2".format(this._taneoyaName, 1)
      );
    };
    Scene_Syusan.prototype.doBukkake = function () {
      $gameSystem.info().plusBukkake(1);
      this.playScenario(
        "出産" +
          actorId +
          "_ぶっかけ_%1_LV%2".format(
            this._taneoyaName,
            this.getLevel("ぶっかけ")
          )
      );
    };
    Scene_Syusan.prototype.doChikubi = function () {
      this.playScenario(
        "出産" +
          actorId +
          "_乳首つまみ_%1_LV%2".format(
            this._taneoyaName,
            this.getLevel("乳首つまみ")
          )
      );
    };
    Scene_Syusan.prototype.doChikubi2 = function () {
      this.playScenario(
        "出産" +
          actorId +
          "_乳首舐め_%1_LV%2".format(
            this._taneoyaName,
            this.getLevel("乳首舐め")
          )
      );
    };
    Scene_Syusan.prototype.doTeman = function () {
      this.playScenario(
        "出産" +
          actorId +
          "_手マン_%1_LV%2".format(this._taneoyaName, this.getLevel("手マン"))
      );
    };
    Scene_Syusan.prototype.doAnal = function () {
      this.playScenario("出産" + actorId + "_アナル_LV" + 1);
    };
    return Scene_Syusan;
  })(Nore.Scene_Talk);
  Nore.Scene_Syusan = Scene_Syusan;
  var SyusanCommad;
  (function (SyusanCommad) {
    SyusanCommad[(SyusanCommad["VIBE"] = 1)] = "VIBE";
    SyusanCommad[(SyusanCommad["MUCHI"] = 2)] = "MUCHI";
    SyusanCommad[(SyusanCommad["SEX"] = 3)] = "SEX";
    SyusanCommad[(SyusanCommad["KUPAA"] = 4)] = "KUPAA";
    SyusanCommad[(SyusanCommad["CHIKUBI"] = 5)] = "CHIKUBI";
    SyusanCommad[(SyusanCommad["CHIKUBI2"] = 6)] = "CHIKUBI2";
    SyusanCommad[(SyusanCommad["ANAL"] = 7)] = "ANAL";
    SyusanCommad[(SyusanCommad["BUKKAKE"] = 10)] = "BUKKAKE";
    SyusanCommad[(SyusanCommad["TEMAN"] = 11)] = "TEMAN";
  })((SyusanCommad = Nore.SyusanCommad || (Nore.SyusanCommad = {})));
  var Window_ChokyoMenu = /** @class */ (function (_super) {
    __extends(Window_ChokyoMenu, _super);
    function Window_ChokyoMenu() {
      var _this = (_super !== null && _super.apply(this, arguments)) || this;
      _this.isCurrentItemEnabled = function () {
        var id = this.selectedId();
        return this.isItemEnabled(id);
      };
      return _this;
    }
    Window_ChokyoMenu.prototype.initialize = function (y, params, scene) {
      this._params = params;
      this._actorId = params.actorId;
      this._scene = scene;
      _super.prototype.initialize.call(
        this,
        new Rectangle(0, y, 260, this.windowHeight())
      );
      this.select(0);
      this.deactivate();
      this.makeItemList();
      this.refresh();
    };
    Window_ChokyoMenu.prototype.makeItemList = function () {
      if (this._itemList) {
        return;
      }
      this._itemList = [];
      var d = this._itemList;
      if (this.isCommandExists("vive")) {
        d.push(SyusanCommad.VIBE);
      }
      if (this.isCommandExists("セックス")) {
        d.push(SyusanCommad.SEX);
      }
      if (this.isCommandExists("アナル")) {
        d.push(SyusanCommad.ANAL);
      }
      if (this.isCommandExists("乳首つまみ")) {
        d.push(SyusanCommad.CHIKUBI);
      }
      if (this.isCommandExists("乳首舐め")) {
        d.push(SyusanCommad.CHIKUBI2);
      }
      if (this.isCommandExists("ムチ")) {
        d.push(SyusanCommad.MUCHI);
      }
      if (this.isCommandExists("くぱぁ")) {
        d.push(SyusanCommad.KUPAA);
      }
      if (this.isCommandExists("ぶっかけ")) {
        d.push(SyusanCommad.BUKKAKE);
      }
      if (this.isCommandExists("手マン")) {
        d.push(SyusanCommad.TEMAN);
      }
      this.height = this._itemList.length * (this.lineHeight() + 6) + 40;
      if (this._itemList.length >= this.index()) {
        this.select(this._itemList.length - 1);
      }
    };
    Window_ChokyoMenu.prototype.isCommandExists = function (type) {
      return this._scene.isCommandExists(type);
    };
    Window_ChokyoMenu.prototype.drawItem = function (index) {
      var rect = this.itemRect(index);
      var id = this._itemList[index];
      var enabled = this.isItemEnabled(id);
      this.changePaintOpacity(enabled);
      this.drawText(getEroName(id), 12, rect.y, 170, "left");
    };
    Window_ChokyoMenu.prototype.isItemEnabled = function (id) {
      if (id == SyusanCommad.KUPAA) {
        return !this._params.kupaa;
      }
      if (id == SyusanCommad.BUKKAKE) {
        return !this._params.bukkake;
      }
      return true;
    };
    Window_ChokyoMenu.prototype.isConditionMatches = function (params, state) {
      var ero = $gameSystem.getEro(this._actorId);
      var level = Math.floor(ero[state + "Lv"] / 10);
      for (var i = 10; i >= 0; i--) {
        if (this.conditionMatch(params[level], i, ero)) {
          return true;
        }
      }
      return false;
    };
    Window_ChokyoMenu.prototype.conditionMatch = function (params, level, ero) {
      level = Math.floor(level / 10);
      if (!params) {
        return false;
      }
      if (!params[level]) {
        return false;
      }
      var condition = params[level][0];
      for (var con in condition) {
        if (ero[con] < condition[con]) {
          return false;
        }
      }
      return true;
    };
    Window_ChokyoMenu.prototype.windowHeight = function () {
      return 9 * (this.lineHeight() + 10) + 12 * 2;
    };
    Window_ChokyoMenu.prototype.selectedId = function () {
      return this._itemList[this.index()];
    };
    Window_ChokyoMenu.prototype.maxItems = function () {
      if (!this._itemList) {
        return 0;
      }
      return this._itemList.length;
    };
    Window_ChokyoMenu.prototype.maxCols = function () {
      return 1;
    };
    return Window_ChokyoMenu;
  })(Window_Selectable);
  var ERO_STATUS_SKILL_IDS = [16, 13, 20, 17];
  var Window_EroStatus = /** @class */ (function (_super) {
    __extends(Window_EroStatus, _super);
    function Window_EroStatus() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Window_EroStatus.prototype.initialize = function (param) {
      this._param = param;
      this._actorId = param.actorId;
      _super.prototype.initialize.call(this, new Rectangle(-4, -4, 280, 70));
      this.createGauge(param);
      this.refresh();
      this.margin = 0;
      this._interval = 5;
      this._frameSprite.opacity = 0;
    };
    Window_EroStatus.prototype.createGauge = function (param) {
      this._gauge = new Sprite_GaugeNinshin(param);
      this._gauge.x = 10;
      this._gauge.y = 10;
      this.addChild(this._gauge);
    };
    Window_EroStatus.prototype.update = function () {
      _super.prototype.update.call(this);
      if (this.isChanged()) {
        this.refresh();
      }
    };
    Window_EroStatus.prototype.isChanged = function () {
      if (this._lastSanke != this._param.sanke) {
        return true;
      }
      return false;
    };
    Window_EroStatus.prototype.saveParams = function () {
      this._lastSanke = this._param.sanke;
    };
    Window_EroStatus.prototype.refresh = function () {
      //this.saveParams();
      this.contents.clear();
      this.drawIcon(404, 0, 0);
      this.drawText("産気", 35, -2, 150, "left");
    };
    Window_EroStatus.prototype.standardPadding = function () {
      return 10;
    };
    return Window_EroStatus;
  })(Window_Base);
})(Nore || (Nore = {}));
