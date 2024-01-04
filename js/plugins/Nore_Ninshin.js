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
 * @command NinshinGrowup
 * @text 妊娠成長チェック
 * @des 妊娠成長チェック
 *
 * @command SetTaneoyaDebug
 * @text 種親設定デバッグ用
 * @des 妊娠成長チェック
 */
var Nore;
(function (Nore) {
  var pluginName = "Nore_Ninshin";
  PluginManager.registerCommand(pluginName, "NinshinGrowup", function (args) {
    for (var _i = 0, _a = $gameParty.allEroMembers(); _i < _a.length; _i++) {
      var actor = _a[_i];
      checkNinshinGrowupEvent(actor.actorId());
    }
  });
  PluginManager.registerCommand(pluginName, "SetTaneoyaDebug", function (args) {
    var taneoyaId = parseInt(args.taneoyaId);
    var actorId = parseInt(args.actorId);
    var taneoyaActorId = findTaneoyaDebugActorId(taneoyaId);
    var actor = $gameActors.actor(actorId);
    p("SetTaneoyaDebug actor:" + actorId + " taneoya:" + taneoyaActorId);
    registerSchedule(
      actor.getLastHistory(),
      ScheduleType.KYOSEI_NINSHIN,
      taneoyaActorId,
      true,
      ""
    );
  });
  function checkNinshinGrowupEvent(actorId) {
    var actorHistory = $gameSystem.historyManager().getActorHistory(actorId);
    var history = actorHistory.lastHistory();
    if (history.boteId() == 1) {
      p("history._boteGrowupValue:" + history._boteGrowupValue);
      if (history._boteGrowupValue >= 100) {
        history._boteGrowupValue = 0;
        registerSchedule(history, ScheduleType.NINSHIN_GROWUP, 0, false);
        $gameSystem
          .timelineManager()
          .push(new TimelineItem(TimelineType.NINSHIN_GROWUP, 0, actorId));
      }
    }
  }
  function findTaneoyaDebugActorId(taneoyaId) {
    for (var i = 1; i <= 120; i++) {
      var actor = $gameActors.actor(i);
      if (!actor) {
        continue;
      }
      if (actor.actor().meta["taneoyaType"]) {
        var t = Math.trunc(actor.actor().meta["taneoyaType"]);
        if (t == taneoyaId) {
          return i;
        }
      }
    }
    console.error("taneoyaId " + taneoyaId + " のアクターが見つかりません");
    return 7;
  }
  var Sprite_NinshinBar = /** @class */ (function (_super) {
    __extends(Sprite_NinshinBar, _super);
    function Sprite_NinshinBar() {
      var _this = (_super !== null && _super.apply(this, arguments)) || this;
      _this._ninshinRate = -1;
      return _this;
    }
    Sprite_NinshinBar.prototype.initialize = function (actorId) {
      _super.prototype.initialize.call(this);
      this.x = 10;
      this.y = -18;
      var ero = $gameSystem.getEro(this._actorId);
      this._lastActorNinshin = ero.ninshinRate;
      this.createBitmap();
    };
    Sprite_NinshinBar.prototype.setActorId = function (actorId) {
      this._actorId = actorId;
      this.redraw();
    };
    Sprite_NinshinBar.prototype.setNinshinRate = function (n) {
      this._ninshinRate = n;
      this._lastActorNinshin = this._ninshinRate;
      this.redraw();
    };
    Sprite_NinshinBar.prototype.createBitmap = function () {
      this.bitmap = new Bitmap(1006, 78);
      this.bitmap.fontSize = 24;
    };
    Sprite_NinshinBar.prototype.update = function () {
      _super.prototype.update.call(this);
      var ero = $gameSystem.getEro(this._actorId);
      if (this._lastActorNinshin != ero.ninshinRate) {
        this.redraw();
      }
    };
    Sprite_NinshinBar.prototype.getNinshinRate = function () {
      if (this._ninshinRate >= 0) {
        return this._ninshinRate;
      }
      var ero = $gameSystem.getEro(this._actorId);
      return ero.ninshinRate;
    };
    Sprite_NinshinBar.prototype.redraw = function () {
      var lastNinshin = this._lastActorNinshin >= 100;
      this.destroyAndRemoveChildren();
      this.bitmap.clear();
      var ninshinRate = this.getNinshinRate();
      if (Math.abs(ninshinRate - this._lastActorNinshin) < 1) {
        this._lastActorNinshin = ninshinRate;
      } else {
        this._lastActorNinshin += 0.5;
      }
      var x = 258;
      var y = 33;
      var width = 459;
      var height = 21;
      var hpGaugeColor1 = ColorManager.textColor(20);
      var hpGaugeColor2 = ColorManager.textColor(21);
      if (this._lastActorNinshin >= 100) {
        var hpGaugeColor1 = ColorManager.textColor(27);
        var hpGaugeColor2 = ColorManager.textColor(27);
      }
      var gaugeBackColor = ColorManager.textColor(19);
      this.bitmap.fillRect(x, y, width, height, gaugeBackColor);
      var fillW = Math.floor(((100 - this._lastActorNinshin) * width) / 100);
      var ninshin = ImageManager.loadSystem("ninshin");
      if (ConfigManager.en) {
        this.bitmap.blt(ninshin, 0, 164, 760, 50, 116, 20);
      } else {
        this.bitmap.blt(ninshin, 0, 0, 660, 50, 116, 20);
      }
      if (fillW > 0) {
        var offset = 0;
        if (ConfigManager.en) {
          offset = 92;
        }
        this.bitmap.gradientFillRect(
          x + 1 + offset,
          y + 1,
          fillW - 2,
          height - 2,
          hpGaugeColor1,
          hpGaugeColor2
        );
      }
      var xx = 60;
      var yy = 18;
      if (this._lastActorNinshin >= 100) {
        this.bitmap.blt(ninshin, 0, 110, 70, 50, xx, yy);
      } else {
        this.bitmap.blt(ninshin, 0, 60, 70, 50, xx, yy);
      }
      var num =
        Math.max(0, Math.floor(100 - this._lastActorNinshin)) + "/" + 100;
      this.drawNumber(num, ConfigManager.en ? 707 : 618, 18, 100, "right", 8);
      if (!lastNinshin && this._lastActorNinshin >= 100) {
        $gameSwitches.setValue(46, true);
      }
    };
    return Sprite_NinshinBar;
  })(Sprite);
  Nore.Sprite_NinshinBar = Sprite_NinshinBar;
})(Nore || (Nore = {}));
