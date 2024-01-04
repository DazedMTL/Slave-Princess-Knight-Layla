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
  var Sprite_StateIcons = /** @class */ (function (_super) {
    __extends(Sprite_StateIcons, _super);
    function Sprite_StateIcons() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    return Sprite_StateIcons;
  })(Sprite);
  Nore.Sprite_StateIcons = Sprite_StateIcons;
})(Nore || (Nore = {}));
