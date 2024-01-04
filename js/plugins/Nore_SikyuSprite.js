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
 * @command Show
 * @text 子宮表示
 * @des 子宮表示
 * @arg x
 * @text x
 * @desc x
 * @type number
 * @arg y
 * @text y
 * @desc y
 * @type number
 * @arg scale
 * @text 拡大率%
 * @desc 拡大率%
 * @type number
 *
 * @arg angle
 * @text angle
 * @desc angle
 * @type number
 *
 * @arg type
 * @text type
 * @desc type
 * @type number
 * @arg reverse
 * @text 反転
 * @desc 反転
 * @type boolean
 *
 * @command StartChinpo
 * @text ちんぽ開始
 * @des ちんぽ開始
 *
 * @arg chinpoType
 * @text chinpoType
 * @desc chinpoType
 * @type string
 * @arg chinpoSize
 * @text chinpoSize
 * @desc chinpoSize
 * @type number
 *
 * @command EndChinpo
 * @text ちんぽ終了
 * @des ちんぽ終了
 *
 * @arg chinpoIn
 * @text chinpoIn
 * @desc chinpoIn
 * @type number
 *
 * @arg chinpoOut
 * @text chinpoOut
 * @desc chinpoOut
 * @type number
 *
 * @arg outStart
 * @text outStart
 * @desc outStart
 * @type boolean
 *
 * @command UpSeieki
 * @text 精液追加
 * @des 精液追加
 * @arg value
 * @text value
 * @desc value
 * @type number
 *
 * @command Syasei
 * @text 射精
 * @des 射精
 * @arg value
 * @text value
 * @desc value
 * @type number
 *
 * @command Hide
 * @text Hide
 * @des Hide
 */
var Nore;
(function (Nore) {
  var pluginName = "Nore_SikyuSprite";
  PluginManager.registerCommand(pluginName, "Show", function (args) {
    var x = parseInt(args.x);
    var y = parseInt(args.y);
    var scale = parseInt(args.scale);
    var type = parseInt(args.type);
    var angle = parseInt(args.angle);
    var reverse = args.reverse;
    SceneManager._scene.showSikyuSprite(x, y, scale, angle, type, reverse);
  });
  PluginManager.registerCommand(pluginName, "StartChinpo", function (args) {
    var chinpoType = args.chinpoType;
    var chinpoSize = args.chinpoSize;
    var chinpoIn = parseInt(args.chinpoIn);
    var chinpoOut = parseInt(args.chinpoOut);
    var outStart = args.outStart;
    SceneManager._scene.startChinpo(
      chinpoType,
      chinpoSize,
      chinpoIn,
      chinpoOut,
      outStart
    );
  });
  PluginManager.registerCommand(pluginName, "UpSeieki", function (args) {
    var value = parseInt(args.value);
    SceneManager._scene.upSeieki(value);
  });
  PluginManager.registerCommand(pluginName, "Syasei", function (args) {
    var value = parseInt(args.value);
    SceneManager._scene.syasei(value);
  });
  PluginManager.registerCommand(pluginName, "EndSyasei", function (args) {
    SceneManager._scene.endSyasei();
  });
  PluginManager.registerCommand(pluginName, "SeiekiAuto", function (args) {
    var actorId = parseInt(args.actorId);
    var actor = $gameActors.actor(actorId);
    var list = Nore.NAKADASHI_SEIEKI_ACCE_LIST;
    var value = 0;
    for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
      var acce = list_1[_i];
      if (actor.hasAcce(acce)) {
        value++;
      }
    }
    SceneManager._scene.upSeieki(value);
  });
  PluginManager.registerCommand(pluginName, "Seieki", function (args) {
    var value = parseInt(args.value);
    SceneManager._scene.upSeieki(value);
  });
  PluginManager.registerCommand(pluginName, "Hide", function (args) {
    var value = parseInt(args.value);
    SceneManager._scene.hideSikyuSprite(value);
  });
  PluginManager.registerCommand(pluginName, "EndChinpo", function (args) {
    SceneManager._scene.endSikyuSprite();
  });
  Scene_Map.prototype.showSikyuSprite = function (
    x,
    y,
    scale,
    angle,
    type,
    reverse
  ) {
    if (!this._sikyuSprite) {
      this._sikyuSprite = new Sprite_Sikyu();
      this.addChild(this._sikyuSprite);
    }
    this._sikyuSprite.show(x, y, scale, angle, type, reverse);
  };
  Scene_Map.prototype.startChinpo = function (
    chinpoType,
    chinpoSize,
    chinpoIn,
    chinpoOut,
    outStart
  ) {
    if (this._sikyuSprite) {
      this._sikyuSprite.startChinpo(
        chinpoType,
        chinpoSize,
        chinpoIn,
        chinpoOut,
        outStart
      );
    }
  };
  Scene_Map.prototype.upSeieki = function (value) {
    if (this._sikyuSprite) {
      this._sikyuSprite.upSeieki(value);
    }
  };
  Scene_Map.prototype.syasei = function (value) {
    if (this._sikyuSprite) {
      this._sikyuSprite.syasei(value);
    }
  };
  Scene_Map.prototype.endSyasei = function () {
    if (this._sikyuSprite) {
      this._sikyuSprite.endSyasei();
    }
  };
  Scene_Map.prototype.hideSikyuSprite = function (value) {
    if (this._sikyuSprite) {
      this.removeChild(this._sikyuSprite);
      this._sikyuSprite = null;
    }
  };
  Scene_Map.prototype.endSikyuSprite = function (value) {
    if (this._sikyuSprite) {
      this._sikyuSprite.endChinpo();
    }
  };
  var Sprite_Sikyu = /** @class */ (function (_super) {
    __extends(Sprite_Sikyu, _super);
    //_fadeSprite: ScreenSprite;
    function Sprite_Sikyu() {
      var _this = _super.call(this) || this;
      _this._seieki = 0;
      _this._syasei = 0;
      _this._animeIndex = 0;
      _this._contentSprite = new PIXI.Sprite();
      _this.addChild(_this._contentSprite);
      _this.createFadeSprite();
      return _this;
    }
    Sprite_Sikyu.prototype.createFadeSprite = function () {
      //this._fadeSprite = new ScreenSprite();
      //this.addChild(this._fadeSprite);
    };
    Sprite_Sikyu.prototype.show = function (x, y, scale, angle, type, reverse) {
      this.x = x;
      this.y = y;
      this.scale.x = this.scale.y = scale / 100;
      this._chinpoType = null;
      this._type = type;
      if (reverse) {
        this.scale.x = -this.scale.x;
        angle += 180;
      }
      this.rotation = (angle * Math.PI) / 180;
      this._animeIndex = 0;
      this.refresh();
      if ($gameVariables.value(980) >= 1 || !ConfigManager.showSikyu) {
        // ボテ腹
        this.visible = false;
      } else {
        this.visible = true;
      }
    };
    Sprite_Sikyu.prototype.hide = function () {
      this.visible = false;
    };
    Sprite_Sikyu.prototype.upSeieki = function (value) {
      this._seieki += value;
      //p('_seieki:' + value)
      this.refresh();
    };
    Sprite_Sikyu.prototype.syasei = function (type) {
      this._syasei = type;
      this.refresh();
    };
    Sprite_Sikyu.prototype.endSyasei = function () {
      this._syasei = null;
      this.refresh();
    };
    Sprite_Sikyu.prototype.startChinpo = function (
      chinpoType,
      chinpoSize,
      chinpoIn,
      chinpoOut,
      outStart
    ) {
      if (chinpoType) {
        this._chinpoType = chinpoType;
      } else if (!this._chinpoType) {
        this._chinpoType = "human";
      }
      this._chinpoSize = chinpoSize;
      this._chinpoIn = chinpoIn;
      this._chinpoOut = chinpoOut;
      this._pose = false;
      this._syasei = 0;
      this._animeIndex = 0;
      this._frameList = [];
      if (outStart) {
        this.pushOutFrame(chinpoOut);
        this.pushInFrame(chinpoIn);
      } else {
        this.pushInFrame(chinpoIn);
        this.pushOutFrame(chinpoOut);
      }
      //p(this._frameList)
      this.update();
    };
    Sprite_Sikyu.prototype.endChinpo = function () {
      this._chinpoType = null;
      this._frameList = [];
      this.refresh();
    };
    Sprite_Sikyu.prototype.pushInFrame = function (inFrame) {
      if (inFrame == 0) {
        this._pose = true;
        return;
      }
      for (var i = 0; i < inFrame - 1; i++) {
        var index = Math.round((i * 15) / inFrame);
        this._frameList.push(index);
      }
      this._frameList.push(15);
    };
    Sprite_Sikyu.prototype.pushOutFrame = function (outFrame) {
      if (outFrame == 0) {
        this._pose = true;
        return;
      }
      for (var i = 0; i < outFrame - 1; i++) {
        var index = 15 - Math.round((i * 15) / outFrame);
        this._frameList.push(index);
      }
      this._frameList.push(0);
    };
    Sprite_Sikyu.prototype.refresh = function () {
      this._contentSprite.removeChildren();
      this.drawSikyu();
      this.drawSeieki();
      this.drawTop();
    };
    Sprite_Sikyu.prototype.drawSikyu = function () {
      if (this._chinpoType && this._chinpoType.length > 0) {
        if (this._syasei > 0) {
          this.addSprite("子宮_" + this._chinpoType + "_" + 15);
          this.addSprite("子宮_射精" + this._syasei);
        } else {
          var index = this._frameList[this._animeIndex];
          this.addSprite("子宮_" + this._chinpoType + "_" + index);
        }
      } else {
        this.addSprite("子宮");
      }
    };
    Sprite_Sikyu.prototype.drawSeieki = function () {
      if (this._seieki == 0) {
        return;
      }
      this.addSprite("子宮_精液" + Math.min(this._seieki, 4));
    };
    Sprite_Sikyu.prototype.drawTop = function () {
      this.addSprite("子宮_上");
      this.addSprite("子宮" + this._type);
    };
    Sprite_Sikyu.prototype.addSprite = function (fileName) {
      var file = "actor0子宮_" + fileName;
      var texture = PIXI.utils.TextureCache[file + ".png"];
      if (!texture) {
        console.error("ファイルが見つかりません" + file);
      }
      var sprite = new PIXI.Sprite(texture);
      this._contentSprite.addChild(sprite);
    };
    Sprite_Sikyu.prototype.update = function () {
      _super.prototype.update.call(this);
      if (!this.visible) {
        return;
      }
      this.opacity = $gameScreen.brightness();
      this.updateAnime();
    };
    Sprite_Sikyu.prototype.updateAnime = function () {
      if (!this._frameList) {
        return;
      }
      this._animeIndex++;
      if (this._frameList.length <= this._animeIndex) {
        if (this._pose) {
          this._animeIndex--;
          return;
        }
        this._animeIndex = 0;
      }
      this.refresh();
    };
    Sprite_Sikyu.prototype.destroy = function () {
      p("des");
      p(this._contentSprite.children.length);
      this._contentSprite.removeChildren();
      _super.prototype.destroy.call(this);
    };
    return Sprite_Sikyu;
  })(Sprite_Clickable);
  Nore.Sprite_Sikyu = Sprite_Sikyu;
})(Nore || (Nore = {}));
