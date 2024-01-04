/*:ja
 * @target MZ
 * @author ル
 */
var Nore;
(function (Nore) {
  var colorCache = {};
  ColorManager.textColor = function (n) {
    if (colorCache[n]) {
      return colorCache[n];
    }
    var px = 96 + (n % 8) * 12 + 6;
    var py = 144 + Math.floor(n / 8) * 12 + 6;
    var r = this._windowskin.getPixel(px, py);
    colorCache[n] = r;
    return r;
  };
  var renderTexture;
  Bitmap.snap2 = Bitmap.snap;
  Bitmap.snap = function (stage) {
    var width = Graphics.width;
    var height = Graphics.height;
    // var bitmap = new Bitmap(width, height);
    if (!renderTexture) {
      renderTexture = PIXI.RenderTexture.create(width, height);
    }
    if (stage) {
      Graphics.app.renderer.render(stage, renderTexture);
      stage.worldTransform.identity();
      var sprite = new PIXI.Sprite(new PIXI.Texture(renderTexture));
      sprite.addLoadListener = function () {};
      var _sprite_destroy_1 = sprite.destroy;
      sprite.destroy = function () {
        this.texture.destroy();
        this.texture = null;
        _sprite_destroy_1.call(this);
        //this.
      };
      return sprite;
      // context.drawImage(canvas, 0, 0);
    } else {
      //TODO: Ivan: what if stage is not present?
    }
    return null;
  };
  /*SceneManager.snapForBackground = function() {
        this._backgroundBitmap = this.snap();
    };*/
  Scene_MenuBase.prototype.createBackground = function () {
    this._backgroundSprite = SceneManager.backgroundBitmap();
    this.addChild(this._backgroundSprite);
  };
  var _Scene_MenuBase_prototype_destroy = Scene_MenuBase.prototype.destroy;
  Scene_MenuBase.prototype.destroy = function () {
    if (this._backgroundSprite) {
      this.removeChild(this._backgroundSprite);
      this._backgroundSprite = null;
    }
    _Scene_MenuBase_prototype_destroy.call(this);
  };
  PIXI.Container.prototype.destroyAndRemoveChildren = function () {
    for (var i = this.children.length; i >= 0; i--) {
      if (this.children[i]) {
        this.children[i].emit("removed");
        if (this.children[i]._windowFrameSprite) {
          this.children[i]._windowFrameSprite.destroyAndRemoveChildren();
        }
        if (this.children[i]._windowContentsSprite) {
          this.children[i]._windowContentsSprite.destroyAndRemoveChildren();
        }
        if (this.children[i].destroyAndRemoveChildren) {
          this.children[i].destroyAndRemoveChildren();
        }
        this.children[i].destroy({
          children: true,
          texture: true,
        });
      }
    }
    this.removeChildren();
  };
})(Nore || (Nore = {}));
