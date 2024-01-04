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
var Sprite_BackButton = /** @class */ (function (_super) {
  __extends(Sprite_BackButton, _super);
  function Sprite_BackButton() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  Sprite_BackButton.prototype.initialize = function () {
    _super.prototype.initialize.call(this);
    this._clickHandler = null;
    this._coldFrame = null;
    this._hotFrame = null;
    this.setupFrames();
  };
  Sprite_BackButton.prototype.setupFrames = function () {
    //const data = this.buttonData();
    var x = 0 * this.blockWidth();
    var width = this.blockWidth();
    var height = this.blockHeight();
    this.loadButtonImage();
    this.setColdFrame(x, 0, width, height);
    this.setHotFrame(width, 0, width, height);
    this.updateFrame();
    this.updateOpacity();
  };
  Sprite_BackButton.prototype.blockWidth = function () {
    return 167;
  };
  Sprite_BackButton.prototype.blockHeight = function () {
    return 128;
  };
  Sprite_BackButton.prototype.loadButtonImage = function () {
    this.bitmap = ImageManager.loadSystem("ButtonSet2");
  };
  Sprite_BackButton.prototype.update = function () {
    _super.prototype.update.call(this);
    //this.checkBitmap();
    this.updateFrame();
    this.updateOpacity();
    this.processTouch();
  };
  Sprite_BackButton.prototype.updateFrame = function () {
    var frame = this.isPressed() ? this._hotFrame : this._coldFrame;
    if (frame) {
      this.setFrame(frame.x, frame.y, frame.width, frame.height);
    }
  };
  Sprite_BackButton.prototype.updateOpacity = function () {
    this.opacity = this._pressed ? 255 : 192;
  };
  Sprite_BackButton.prototype.setColdFrame = function (x, y, width, height) {
    this._coldFrame = new Rectangle(x, y, width, height);
  };
  Sprite_BackButton.prototype.setHotFrame = function (x, y, width, height) {
    this._hotFrame = new Rectangle(x, y, width, height);
  };
  Sprite_BackButton.prototype.setClickHandler = function (method) {
    this._clickHandler = method;
  };
  Sprite_BackButton.prototype.onClick = function () {
    if (this._clickHandler) {
      SoundManager.playOk();
      this._clickHandler();
    } else {
      Input.virtualClick(this._buttonType);
    }
  };
  return Sprite_BackButton;
})(Sprite_Clickable);
