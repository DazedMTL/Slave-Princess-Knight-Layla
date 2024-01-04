/*:ja
 * @target MZ
 * @author ル
 *
 * @command CallCollection
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
var Nore;
(function (Nore) {
  var pluginName = "Nore_Collection";
  PluginManager.registerCommand(pluginName, "CallCollection", function (args) {
    SceneManager.push(Scene_Collection);
  });
  var COLLECTION_Y = 120;
  var COLLECTION_X = 100;
  var Scene_Collection = /** @class */ (function (_super) {
    __extends(Scene_Collection, _super);
    function Scene_Collection() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Scene_Collection.prototype.create = function () {
      _super.prototype.create.call(this);
      this.createHelpWindow();
      this.createMedalWindow();
      this.createLabel();
    };
    Scene_Collection.prototype.createLabel = function () {
      this._labelWindow = new Nore.Window_Label2(
        TextManager.collectionHelp,
        COLLECTION_Y - 16,
        40,
        400
      );
      this.addChild(this._labelWindow);
    };
    Scene_Collection.prototype.createHelpWindow = function () {
      var rect = this.helpWindowRect();
      this._helpWindow = new Window_Help(rect);
      this.addWindow(this._helpWindow);
    };
    Scene_Collection.prototype.helpWindowRect = function () {
      var wx = COLLECTION_X;
      var wy = COLLECTION_Y;
      var ww = Graphics.boxWidth - COLLECTION_X * 2;
      var wh = this.helpAreaHeight();
      return new Rectangle(wx, wy, ww, wh);
    };
    Scene_Collection.prototype.helpAreaHeight = function () {
      return this.calcWindowHeight(5, false);
    };
    Scene_Collection.prototype.createMedalWindow = function () {
      var y = this._helpWindow.height + COLLECTION_Y;
      var r = new Rectangle(
        COLLECTION_X,
        y,
        Graphics.boxWidth - COLLECTION_X * 2,
        Graphics.boxHeight - y - 140
      );
      this._collectionWindow = new Window_Collection(r);
      this.addWindow(this._collectionWindow);
      this._collectionWindow.activate();
      this._collectionWindow.refresh();
      this._collectionWindow.setHandler("change", this.onChange.bind(this));
      this._collectionWindow.setHandler("cancel", this.popScene.bind(this));
      this._collectionWindow.select(0);
    };
    Scene_Collection.prototype.onChange = function () {
      var item = this._collectionWindow.item();
      if (!item) {
        return;
      }
      var actorId = Math.trunc(item.item().meta["actorId"]);
      this._helpWindow.setText(getMilkText(actorId));
    };
    return Scene_Collection;
  })(Scene_MenuBase);
  Nore.Scene_Collection = Scene_Collection;
  var Window_Collection = /** @class */ (function (_super) {
    __extends(Window_Collection, _super);
    function Window_Collection() {
      var _this = (_super !== null && _super.apply(this, arguments)) || this;
      _this._itemList = [];
      return _this;
    }
    Window_Collection.prototype.refresh = function () {
      this.makeItems();
      _super.prototype.refresh.call(this);
    };
    Window_Collection.prototype.makeItems = function () {
      this._itemList = $gameParty.milkItems();
    };
    Window_Collection.prototype.maxItems = function () {
      return this._itemList.length;
    };
    Window_Collection.prototype.maxCols = function () {
      return 2;
    };
    Window_Collection.prototype.lineHeight = function () {
      return 48;
    };
    Window_Collection.prototype.drawItem = function (index) {
      var item = this._itemList[index];
      if (item) {
        var rect = this.itemRect(index);
        rect.width -= 20;
        var enabled = this.isEnabled(item);
        this.changePaintOpacity(enabled);
        this.contents.fontSize = 28;
        var actorId = Math.trunc(item.item().meta["actorId"]);
        this.drawCharacterImage(actorId, rect.x + 4, rect.y);
        this.drawItemName(item.item(), rect.x + 44, rect.y, rect.width);
        this.drawItemNumber(item, rect.x, rect.y, rect.width);
        this.changePaintOpacity(true);
      }
    };
    Window_Collection.prototype.drawCharacterImage = function (actorId, x, y) {
      var cos = new CostumeSaver(actorId);
      var c = new Nore.Game_DungeonCharacter(cos, x + 33, y + 56);
      var sprite = new Sprite_Prisoner(c, cos);
      this._windowContentsSprite.addChild(sprite);
    };
    Window_Collection.prototype.drawItemNumber = function (item, x, y, width) {
      if (this.needsNumber()) {
        this.drawText(":", x, y, width - this.textWidth("00"), "right");
        this.drawText(item.num, x, y, width, "right");
      }
    };
    /*itemRect(index) {
            var rect = new Rectangle();
            var maxCols = this.maxCols();
            rect.width = this.itemWidth();
            rect.height = this.itemHeight();
            rect.x = index % maxCols * (rect.width + this.padding()) - this._scrollX + 20;
            rect.y = Math.floor(index / maxCols) * rect.height - this._scrollY;
            return rect;
        }*/
    Window_Collection.prototype.isEnabled = function (item) {
      return true;
      //return $gameMedals.hasMedal(item.id);
    };
    Window_Collection.prototype.item = function () {
      return this._itemList[this.index()];
    };
    Window_Collection.prototype.drawItemName2 = function (item, x, y) {
      var width = 382;
      if (item) {
        var iconBoxWidth = this.lineHeight();
        var padding = (iconBoxWidth - Window_Base._iconWidth) / 2;
        this.resetTextColor();
        this.drawIcon(item.iconIndex, x + 4, y + 4);
        //this.drawIcon2(item, x, y, width)
        var name = "";
        for (var i = 0; i < item.name.length; i++) {
          name += "？";
        }
        this.drawText(name, x + iconBoxWidth - 8, y, width - iconBoxWidth);
      }
    };
    Window_Collection.prototype.drawProgress = function (item, x, y) {
      var progress = $gameMedals.getProgress(item.id);
      var color1 = ColorManager.hpGaugeColor1();
      var color2 = ColorManager.hpGaugeColor2();
      if (progress >= 100) {
        color1 = color2 = ColorManager.textColor(24);
      }
      var xx = 52;
      //this.drawGauge(x + xx, y - 10, 370, progress / 100, color1, color2);
      this.contents.fontSize = 20;
      this.drawText("" + progress + "%", x, y, 50, "right");
    };
    return Window_Collection;
  })(Window_ItemList);
})(Nore || (Nore = {}));
