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
 * @command Ranhi1Open
 * @text 卵子１ウィンドウオープン
 * @des 卵子１ウィンドウオープン
 */
var Nore;
(function (Nore) {
  var SW_RANSHI1 = 81;
  var pluginName = "Nore_SyusanSelect";
  PluginManager.registerCommand(pluginName, "Open", function (args) {
    $gameSwitches.setValue(20, false);
    $gameSwitches.setValue(SW_RANSHI1, false);
    SceneManager.push(Scene_SyusanSelect);
  });
  PluginManager.registerCommand(pluginName, "Ranhi1Open", function (args) {
    $gameSwitches.setValue(20, false);
    $gameSwitches.setValue(SW_RANSHI1, true);
    SceneManager.push(Scene_SyusanSelect);
  });
  var Scene_SyusanSelect = /** @class */ (function (_super) {
    __extends(Scene_SyusanSelect, _super);
    function Scene_SyusanSelect() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Scene_SyusanSelect.prototype.create = function () {
      _super.prototype.create.call(this);
      this.createWarpWindow();
    };
    Scene_SyusanSelect.prototype.createWarpWindow = function () {
      var rect;
      if (this.isRanshi1()) {
        rect = new Rectangle(420, 210, 500, 144);
      } else {
        rect = new Rectangle(420, 210, 500, 144);
      }
      this._syusanSelectWindow = new Window_SyusanSelect(rect);
      this.addChild(this._syusanSelectWindow);
      this._syusanSelectWindow.refresh();
      this._syusanSelectWindow.setHandler("ok", this.onOk.bind(this));
      this._syusanSelectWindow.setHandler("cancel", this.onCancel.bind(this));
    };
    Scene_SyusanSelect.prototype.isRanshi1 = function () {
      return $gameSwitches.value(SW_RANSHI1);
    };
    Scene_SyusanSelect.prototype.onOk = function () {
      var item = this._syusanSelectWindow.selectedItem();
      if (item) {
        var actorId = item.actorId();
        $gameVariables.setValue(121, actorId);
        var actor = $gameActors.actor(actorId);
        $gameVariables.setValue(20, actor.name());
      } else {
        $gameVariables.setValue(121, 0);
      }
      SceneManager.pop();
    };
    Scene_SyusanSelect.prototype.onCancel = function () {
      SceneManager.pop();
    };
    return Scene_SyusanSelect;
  })(Scene_MenuBase);
  var Window_SyusanSelect = /** @class */ (function (_super) {
    __extends(Window_SyusanSelect, _super);
    function Window_SyusanSelect() {
      var _this = (_super !== null && _super.apply(this, arguments)) || this;
      _this._list = [];
      return _this;
    }
    Window_SyusanSelect.prototype.isRanshi1 = function () {
      return $gameSwitches.value(SW_RANSHI1);
    };
    Window_SyusanSelect.prototype.makeItemList = function () {
      this._list = [];
      for (var _i = 0, _a = $gameParty.allMembers(); _i < _a.length; _i++) {
        var a = _a[_i];
        if (this.isRanshi1()) {
          if (a.canRanshi1()) {
            this._list.push(a);
          }
        } else {
          if (a.canSyusan()) {
            this._list.push(a);
          }
        }
      }
      this._list.push(null);
      this.height = Math.ceil(this._list.length / 2) * this.itemHeight() + 24;
      this.createContents();
    };
    Window_SyusanSelect.prototype.maxCols = function () {
      return 2;
    };
    Window_SyusanSelect.prototype.refresh = function () {
      this.makeItemList();
      _super.prototype.refresh.call(this);
      this.select(0);
      this.activate();
    };
    Window_SyusanSelect.prototype.maxItems = function () {
      return this._list.length;
    };
    Window_SyusanSelect.prototype.drawItem = function (index) {
      var rect = this.itemRect(index);
      var item = this._list[index];
      var offset = 50;
      if (item) {
        this.drawCharacterImage(item.actorId(), rect.x, rect.y);
        this.drawText(item.name(), rect.x + offset, rect.y + 10, rect.width);
      } else {
        this.drawText(
          TextManager.syusanCancel,
          rect.x + offset,
          rect.y + 10,
          rect.width
        );
      }
    };
    Window_SyusanSelect.prototype.drawCharacterImage = function (
      actorId,
      x,
      y
    ) {
      var cos = new CostumeSaver(actorId);
      var c = new Nore.Game_DungeonCharacter(cos, x + 36, y + 76);
      var sprite = new Sprite_ActorCharacter(c, cos);
      this._windowContentsSprite.addChild(sprite);
    };
    Window_SyusanSelect.prototype.selectedItem = function () {
      return this._list[this.index()];
    };
    Window_SyusanSelect.prototype.itemHeight = function () {
      return 70;
    };
    return Window_SyusanSelect;
  })(Window_Selectable);
})(Nore || (Nore = {}));
