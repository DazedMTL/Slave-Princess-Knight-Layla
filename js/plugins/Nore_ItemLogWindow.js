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
 *
 *
 * @command Show
 * @arg id
 * @text 表示
 * @des 表示
 */
var Nore;
(function (Nore) {
  var ItemLogWindow;
  (function (ItemLogWindow) {
    var Window_prototype__createContentsSprite =
      Window.prototype._createContentsSprite;
    Window.prototype._createContentsSprite = function () {
      Window_prototype__createContentsSprite.call(this);
      this._windowContentsSprite = new Sprite();
      this.addChild(this._windowContentsSprite);
    };
    var pluginName = "Nore_ItemLogWindow";
    PluginManager.registerCommand(pluginName, "Show", function (args) {
      var id = args.id;
      $gameTemp.addItemLog($dataArmors[id]);
    });
    Window_Base.prototype.addIcon = function (iconIndex, x, y) {
      var baseTexture = PIXI.utils.BaseTextureCache["system/IconSet"];
      if (!baseTexture) {
        var bitmap = ImageManager.loadSystem("IconSet");
        baseTexture = new PIXI.BaseTexture(
          bitmap._image,
          PIXI.settings.SCALE_MODE
        );
        baseTexture.resource.url = "system/IconSet";
        PIXI.utils.BaseTextureCache["system/IconSet"] = baseTexture;
      }
      var pw = ImageManager.iconWidth;
      var ph = ImageManager.iconHeight;
      var sx = (iconIndex % 16) * pw;
      var sy = Math.floor(iconIndex / 16) * ph;
      var texture = new PIXI.Texture(baseTexture);
      texture.frame = new PIXI.Rectangle(sx, sy, pw, ph);
      var sprite = new PIXI.Sprite(texture);
      sprite.position.x = x;
      sprite.position.y = y;
      this._windowContentsSprite.addChild(sprite);
    };
    var Window_ItemLog = /** @class */ (function (_super) {
      __extends(Window_ItemLog, _super);
      function Window_ItemLog(item, yIndex, callback, yPlus) {
        if (yPlus === void 0) {
          yPlus = 0;
        }
        var _this =
          _super.call(
            this,
            new Rectangle(
              0,
              yIndex * 118 + 4 + yPlus,
              Graphics.boxWidth - 180,
              122
            )
          ) || this;
        _this.padding = 3;
        _this._updateContents();
        _this._item = item;
        _this.yIndex = yIndex;
        _this.callback = callback;
        //this._contentsBackSprite.setFrame(0, 30, Graphics.boxWidth, 90 - 53)
        //this._contentsBackSprite.y = 28;
        _this.backOpacity = 255;
        _this.opacity = 0;
        _this.contentsOpacity = 0;
        _this.refresh();
        _this.appearFrame = 12;
        _this.waitFrame = 150;
        _this.eraseFrame = 30;
        _this.frameVisible = false;
        var self = _this;
        return _this;
        /*self.off('removed');
        
                this.on('removed', function () {
                    Saba.putContentsCache(self.contents, self.contents.width, self.contents.height);
                    self.destroyAndRemoveChildren();
                    self.off('removed');
                });*/
      }
      Window_ItemLog.prototype.loadWindowskin = function () {
        this.windowskin = ImageManager.loadSystem("Window");
      };
      /*_refreshBack() {
                var m = this.margin;
                if (this._windowskin.height > 192) {
                    m += 2;
                }
                var w = this.width - m * 2;
                var h = this.height - m * 2 - 53;
                this._contentsBackSprite.setFrame(0, 30, w, 90 - 53);
                this._contentsBackSprite.move(m, m);
        
                //this._contentsBackSprite._toneFilter = new ToneFilter();
        
                if (w > 0 && h > 0 && this._windowskin) {
                    this._contentsBackSprite.destroyAndRemoveChildren();
                    var baseTexture = this.getBaseTexture();
        
                    if (this._windowskin.height <= 192) {
        
                        var p = 96;
                        var texture = new PIXI.Texture(baseTexture);
                        texture.frame = new PIXI.Rectangle(0, 0, p, p);
                        var backSprite = new PIXI.Sprite(texture);
                        backSprite.y = 30;
                        backSprite.width = w;
                        backSprite.height = h;
                        this._contentsBackSprite.addChild(backSprite);
                        // bitmap.blt(this._windowskin, 0, 0, p, p, 0, 0, w, h);
        
                        var tileTexture = new PIXI.Texture(baseTexture, new PIXI.Rectangle(0, p, p, p));
                        var tilingSprite = new PIXI.extras.TilingSprite(tileTexture, w, h);
                        tilingSprite.y = 30;
                        this._contentsBackSprite.addChild(tilingSprite);
        
                        var tone = this._colorTone;
                        this._contentsBackSprite._toneFilter.reset();
                        this._contentsBackSprite._toneFilter.adjustTone(tone[0], tone[1], tone[2]);
                    }
                }
            }*/
      Window_ItemLog.prototype.refresh = function () {
        var item = this._item;
        if ($gameMedals.isMedal(item)) {
          this.refreshMedal(item);
          return;
        }
        this.contents.clear();
        var xx = 40;
        var yy = 30;
        this.contents.textColor = "#ff88aa";
        this.contents.fontSize = 24;
        var name = item.name;
        if (item.atypeId > 0) {
        } else {
          if (item.id == 11 || item.id == 19) {
            name = $gameVariables.value(20) + " Ｇ";
            this.contents.drawText("お金ゲット‼︎", xx - 20, 0, 300, 30, "left");
          } else {
            this.contents.drawText(
              "アイテムゲット‼︎",
              xx - 20,
              5,
              300,
              30,
              "left"
            );
          }
        }
        this.contents.textColor = "#ffffff";
        this.contents.fontSize = 30;
        this.drawIcon(item.iconIndex, 2 + xx, 1 + yy);
        this.drawTextEx(name, 43 + xx, 1 + yy, 280);
      };
      Window_ItemLog.prototype.refreshMedal = function (medal) {
        this.contents.clear();
        var xx = 40;
        var yy = 30;
        this.contents.textColor = "#ff88aa";
        this.contents.fontSize = 24;
        AudioManager.playSe({ name: "Chime2", volume: 80, pitch: 100, pan: 0 });
        this.contents.drawText(
          TextManager.obtainMedal,
          xx - 20,
          0,
          300,
          30,
          "left"
        );
        this.contents.textColor = "#ffffff";
        this.contents.fontSize = 30;
        this.drawIcon(medal.iconIndex, 2 + xx, 1 + yy);
        this.drawText(medal.name, 43 + xx, 1 + yy, 320);
        this.drawTextEx(getMedalDescription(medal), 373 + xx, 1 + yy, 600);
      };
      Window_ItemLog.prototype.update = function () {
        _super.prototype.update.call(this);
        this.appearFrame--;
        if (this.appearFrame > 0) {
          this.opacity += 25;
          this.contentsOpacity += 25;
          return;
        }
        this.waitFrame--;
        if (this.waitFrame > 0) {
          return;
        }
        this.eraseFrame--;
        this.opacity -= 25;
        this.contentsOpacity -= 25;
        this.y -= 3;
        if (this.eraseFrame === 0) {
          this.callback();
        }
      };
      return Window_ItemLog;
    })(Window_Base);
    Game_Temp.prototype.addEroLog = function (item) {
      this._eroLog = this._eroLog || [];
      this._eroLog.push(item);
    };
    Game_Temp.prototype.nextEroLog = function () {
      this._eroLog = this._eroLog || [];
      if (this._eroLog.length === 0) {
        return null;
      }
      return this._eroLog.shift();
    };
    Game_Temp.prototype.addItemLog = function (item) {
      this._itemLog = this._itemLog || [];
      this._itemLog.push(item);
    };
    Game_Temp.prototype.nextItemLog = function () {
      this._itemLog = this._itemLog || [];
      if (this._itemLog.length === 0) {
        return null;
      }
      return this._itemLog.shift();
    };
    var _Scene_Map_updateMain = Scene_Map.prototype.updateMain;
    Scene_Map.prototype.updateMain = function () {
      _Scene_Map_updateMain.call(this);
      if (this._waitLog > 0) {
        this._waitLog--;
        return;
      }
      var window;
      var logItem = $gameTemp.nextItemLog();
      if (logItem) {
        this._logWindowList = this._logWindowList || [];
        var yIndex = this.getLogWindowY();
        var yPlus = 0;
        if (SceneManager._scene._spriteset) {
          if (SceneManager._scene._spriteset._medalUpdateSprite) {
            yPlus =
              SceneManager._scene._spriteset._medalUpdateSprite.getBottom();
          }
        }
        var onFinish = function () {
          //window.returnCanvas();
          self._windowLayer.removeChild(window);
          self._logWindowList.splice(self._logWindowList.indexOf(window), 1);
          window.destroy({ texture: true, children: true });
        };
        window = new Window_ItemLog(logItem, yIndex, onFinish, yPlus);
        this._logWindowList.push(window);
        this.addWindow(window);
        var self = this;
      } else {
        /* var logItem = $gameTemp.nextEroLog();
                 if (logItem) {
                     this._logWindowList = this._logWindowList || [];
                     var yIndex = this.getLogWindowY();
                     window = new Window_EroLog(logItem[0], logItem[1], logItem[2], logItem[3], yIndex, onFinish2);
                     this._logWindowList.push(window);
                     this.addWindow(window);
                     var self = this;
                     function onFinish2() {
                         //window.returnCanvas();
                         self._windowLayer.removeChild(window);
                         self._logWindowList.splice(self._logWindowList.indexOf(window), 1);
                         window.destroy({texture: true, children: true});
                     };
                     this._waitLog = 40;
                 }*/
      }
    };
    Scene_Map.prototype.getLogWindowY = function () {
      for (var i = 0; i < 6; i++) {
        var found = false;
        for (var _i = 0, _a = this._logWindowList; _i < _a.length; _i++) {
          var log = _a[_i];
          if (log.yIndex === i) {
            found = true;
            break;
          }
        }
        if (!found) {
          return i;
        }
      }
      return 0;
    };
  })(ItemLogWindow || (ItemLogWindow = {}));
})(Nore || (Nore = {}));
