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

 */
var Nore;
(function (Nore) {
  var pluginName = "Nore_SyusanSprite";
  PluginManager.registerCommand(pluginName, "showFile", function (args) {
    var scene = SceneManager._scene;
    var sprite = scene._sprite;
    sprite.showFile(args.file);
  });
  PluginManager.registerCommand(pluginName, "hideFile", function (args) {
    var scene = SceneManager._scene;
    var sprite = scene._sprite;
    sprite.hideFile(args.file);
  });
  var temanYList = [0, 10, 18, 24, 18, 10, 0, -10, -18, -24, -18, -10];
  var Sprite_Syusan = /** @class */ (function (_super) {
    __extends(Sprite_Syusan, _super);
    function Sprite_Syusan(param) {
      var _this = _super.call(this) || this;
      _this._temanIndex = 0;
      _this._params = param;
      _this._actorId = param.actorId();
      _this._flashSprite = new ScreenSprite();
      _this._fadeSprite = new ScreenSprite();
      _this._frameBase = new Sprite_Clickable();
      _this.initImages();
      _this.refresh();
      return _this;
    }
    Sprite_Syusan.prototype.update = function () {
      _super.prototype.update.call(this);
      if (this.isChanged()) {
        this.refresh();
      }
      var color = $gameScreen.flashColor();
      this._flashSprite.setColor(color[0], color[1], color[2]);
      this._flashSprite.opacity = color[3];
      this._fadeSprite.opacity = 255 - $gameScreen.brightness();
    };
    Sprite_Syusan.prototype.initImages = function () {
      if (this._params.actorId() == 3) {
        Nore.allImageList = actor3EroList.concat();
        for (
          var _i = 0, allImageList_1 = Nore.allImageList;
          _i < allImageList_1.length;
          _i++
        ) {
          var i = allImageList_1[_i];
          if (!ero3First.includes(i)) {
            $gameTemp.ignoreFiles[i] = true;
          }
        }
        /*if (actor.hasAcce(208)) {
                    $gameTemp.ignoreFiles['01_50_淫紋'] = false;
                }
                if (actor.hasAcce(210)) {
                    $gameTemp.ignoreFiles['01_50_乳首ピアス'] = false;
                }
                if (actor.hasAcce(224)) {
                    $gameTemp.ignoreFiles['01_50_黒乳首'] = false;
                }
                if (actor.hasAcce(214)) {
                    $gameTemp.ignoreFiles['01_50_焼印1'] = false;
                }
                if (actor.hasAcce(215)) {
                    $gameTemp.ignoreFiles['01_50_焼印2'] = false;
                }*/
      }
      this.initManko();
      this.initAnal();
      this.initAcce();
      this.initKurochikubi();
    };
    Sprite_Syusan.prototype.getImageId = function () {
      switch (this._params.actorId()) {
        case 3:
          return "03_07_p_";
      }
    };
    Sprite_Syusan.prototype.initKurochikubi = function () {
      var actor = this._params.actor();
      if (actor.isKuroChikubi()) {
        var boteId = "";
        $gameTemp.ignoreFiles[this.getImageId() + "黒乳首"] = false;
      }
    };
    Sprite_Syusan.prototype.initManko = function () {
      var actor = this._params.actor();
      var mankoId = actor.getLastHistory().mankoImageId();
      $gameTemp.ignoreFiles[this.getImageId() + "manko" + mankoId] = false;
      if (actor.hasAcce(1014)) {
        $gameTemp.ignoreFiles[
          this.getImageId() + "ラビアピアス" + mankoId
        ] = false;
      }
    };
    Sprite_Syusan.prototype.initAnal = function () {
      var analId = this._params.actor().getLastHistory().analImageId();
      $gameTemp.ignoreFiles[this.getImageId() + "anal" + analId] = false;
    };
    Sprite_Syusan.prototype.initAcce = function () {
      var actor = this._params.actor();
      if (actor.hasAcce(1004)) {
        $gameTemp.ignoreFiles[this.getImageId() + "へそピアス"] = false;
      }
    };
    Sprite_Syusan.prototype.showFile = function (file) {
      $gameTemp.ignoreFiles[this.getImageId() + file] = false;
      this.refresh();
    };
    Sprite_Syusan.prototype.hideFile = function (file) {
      $gameTemp.ignoreFiles[this.getImageId() + file] = true;
      this.refresh();
    };
    /*moveSprite() {
            if (! this._denmaSprite) {
                return;
            }
            this._temanIndex++;
            if (temanYList.length <= this._temanIndex) {
                this._temanIndex = 0;
            }
            const y = temanYList[this._temanIndex] / 2;
    
            this._denmaSprite.y = y;
        }*/
    Sprite_Syusan.prototype.isChanged = function () {
      if (this._lastFaceId != this._params.faceId()) {
        return true;
      }
      if (this._lastHoppeId != this._params.hoppeId()) {
        return true;
      }
      var param = this._params;
      if (this._lastBukkake != param.bukkake) {
        return true;
      }
      if (this._lastSeieki != param.syusanSeieki) {
        return true;
      }
      if (this._lastKupaa != param.kupaa) {
        return true;
      }
      if (!this._lastIgnoreImages) {
        return true;
      }
      for (var i in this._lastIgnoreImages) {
        if ($gameTemp.ignoreFiles[i] != this._lastIgnoreImages[i]) {
          return true;
        }
      }
    };
    Sprite_Syusan.prototype.savelastCondition = function () {
      this._lastFaceId = this._params.faceId();
      this._lastHoppeId = this._params.hoppeId();
      var param = this._params;
      this._lastIgnoreImages = {};
      this._lastBukkake = param.bukkake;
      this._lastSeieki = param.syusanSeieki;
      this._lastKupaa = param.kupaa;
      for (var i in $gameTemp.ignoreFiles) {
        this._lastIgnoreImages[i] = $gameTemp.ignoreFiles[i];
      }
    };
    Sprite_Syusan.prototype.refresh = function () {
      this.savelastCondition();
      this.removeChildren();
      var list = Nore.allImageList;
      var param = this._params;
      for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
        var file = list_1[_i];
        this.drawEro(file, param);
      }
      this.drawFace();
      this.addChild(this._flashSprite);
      this.addChild(this._fadeSprite);
      this.addChild(this._frameBase);
    };
    Sprite_Syusan.prototype.drawFace = function () {
      var face = this._params.faceId();
      var id = this.getImageId();
      var file = id + "face_" + face.padZero(2);
      if (!PIXI.utils.TextureCache[file + ".png"]) {
        console.error(file + "のファイルが見つかりません");
        return;
      }
      var sprite = new PIXI.Sprite(PIXI.utils.TextureCache[file + ".png"]);
      this.addChild(sprite);
    };
    Sprite_Syusan.prototype.drawEro = function (file, param) {
      if ($gameTemp.ignoreFiles[file]) {
        return;
      }
      p(file);
      var faceId = parseInt(file.substr(file.length - 2, 2));
      if (faceId > 0) {
        if (faceId != this._lastFaceId) {
          return;
        }
      }
      var texture = this.getBoteTexture(file);
      if (!texture) {
        return;
      }
      var sprite = new PIXI.Sprite(texture);
      this.addChild(sprite);
    };
    Sprite_Syusan.prototype.getBoteTexture = function (file) {
      if (this._params.boteId() == 0) {
        return PIXI.utils.TextureCache[file + ".png"];
      }
      var boteFile = file + "_bote" + this._params.boteId() + ".png";
      if (PIXI.utils.TextureCache[boteFile]) {
        return PIXI.utils.TextureCache[boteFile];
      }
      return PIXI.utils.TextureCache[file + ".png"];
    };
    Sprite_Syusan.prototype.destroy = function () {
      this.removeChildren();
      _super.prototype.destroy.call(this);
    };
    return Sprite_Syusan;
  })(Sprite_Clickable);
  Nore.Sprite_Syusan = Sprite_Syusan;
})(Nore || (Nore = {}));
