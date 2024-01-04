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
 * @text 開く
 * @des 開く
 * @arg actorId
 * @type number
 *
 */
var Nore;
(function (Nore) {
  var pluginName = "Nore_NikubenkiResult";
  var actorId;
  PluginManager.registerCommand(pluginName, "Open", function (args) {
    actorId = Math.trunc(args.actorId);
    SceneManager.push(Scene_NikubenkiResult);
  });
  var Scene_NikubenkiResult = /** @class */ (function (_super) {
    __extends(Scene_NikubenkiResult, _super);
    function Scene_NikubenkiResult() {
      var _this = (_super !== null && _super.apply(this, arguments)) || this;
      _this._wait = 10;
      return _this;
    }
    Scene_NikubenkiResult.prototype.create = function () {
      _super.prototype.create.call(this);
      this.createResultWindow();
      this.createMankoWindow();
    };
    Scene_NikubenkiResult.prototype.createResultWindow = function () {
      var ww = 450;
      var rect = new Rectangle((Graphics.width - ww) / 2 + 50, 200, ww, 370);
      this._resultWindow = new Window_NikubenkiResult(rect);
      this._resultWindow.setActorId(actorId);
      this.addChild(this._resultWindow);
      this._resultWindow.refresh();
    };
    Scene_NikubenkiResult.prototype.createMankoWindow = function () {
      var rect = new Rectangle(50, 200, 320, 370);
      this._mankoWindow = new Window_NikubenkiOmanko(rect);
      this._mankoWindow.setActorId(actorId);
      this.addChild(this._mankoWindow);
      this._mankoWindow.refresh();
    };
    Scene_NikubenkiResult.prototype.update = function () {
      _super.prototype.update.call(this);
      if (this._wait > 0) {
        this._wait--;
        return;
      }
      if (
        Input.isPressed("ok") ||
        Input.isPressed("cancel") ||
        TouchInput.isTriggered()
      ) {
        this.popScene();
      }
    };
    return Scene_NikubenkiResult;
  })(Scene_MenuBase);
  Nore.Scene_NikubenkiResult = Scene_NikubenkiResult;
  var Window_NikubenkiResult = /** @class */ (function (_super) {
    __extends(Window_NikubenkiResult, _super);
    function Window_NikubenkiResult() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Window_NikubenkiResult.prototype.setActorId = function (actorId) {
      this._actorId = actorId;
    };
    Window_NikubenkiResult.prototype.refresh = function () {
      this.contents.clear();
      var actor = $gameActors.actor(this._actorId);
      var event = actor.getLastHistory().getLastEvent();
      var count = actor.getActorHistory().countNikubenki($gameSystem.day());
      var nakadashi = event.countNakadashi();
      p("nakadashi:" + nakadashi);
      var anal = event.countAnal();
      var fela = event.countFela();
      var ranshi = actor.getActorHistory().countNinshinRate($gameSystem.day());
      this.contents.fontSize = 32;
      this.drawText(TextManager.nikubenkiResult, 50, 20, 330, "center");
      var lh = 36;
      var yy = 80;
      var xx = 40;
      this.contents.fontSize = 26;
      var right = 120;
      this.drawText(TextManager.nikubenkiResultCount, xx, yy, 250, "left");
      this.drawText(TextManager.count.format(count), right, yy, 250, "right");
      yy += lh;
      yy += lh;
      this.drawText(TextManager.nikubenkiResultNakadashi, xx, yy, 250, "left");
      this.drawText(
        TextManager.count.format(nakadashi),
        right,
        yy,
        250,
        "right"
      );
      yy += lh;
      this.drawText(TextManager.nikubenkiResultAnal, xx, yy, 250, "left");
      this.drawText(TextManager.count.format(anal), right, yy, 250, "right");
      yy += lh;
      this.drawText(TextManager.nikubenkiResultFela, xx, yy, 250, "left");
      this.drawText(TextManager.count.format(fela), right, yy, 250, "right");
      yy += lh;
      this.drawText(TextManager.nikubenkiResultRanshi, xx, yy, 250, "left");
      this.drawText(
        Math.max(0, Math.floor(100 - ranshi)) + "％",
        right,
        yy,
        250,
        "right"
      );
    };
    return Window_NikubenkiResult;
  })(Window_Base);
  var Window_NikubenkiOmanko = /** @class */ (function (_super) {
    __extends(Window_NikubenkiOmanko, _super);
    function Window_NikubenkiOmanko() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Window_NikubenkiOmanko.prototype.setActorId = function (actorId) {
      this._actorId = actorId;
    };
    Window_NikubenkiOmanko.prototype.refresh = function () {
      var actor = $gameActors.actor(this._actorId);
      this._mankoSprite = new Nore.MankoSprite(actor.getLastHistory());
      this._mankoSprite.x = 10;
      this._mankoSprite.y = 10;
      this.addChild(this._mankoSprite);
    };
    return Window_NikubenkiOmanko;
  })(Window_Base);
})(Nore || (Nore = {}));
