/*:ja
 * @target MZ
 * @author ル
 *
 */
var Nore;
(function (Nore) {
  Spriteset_Battle.prototype.createBattleback = function () {
    this._back1Sprite = new Sprite_Battleback(0);
    this._back2Sprite = new Sprite_Battleback(1);
    this._baseSprite.addChild(this._back1Sprite);
    this._baseSprite.addChild(this._back2Sprite);
    var g = new PIXI.Graphics();
    g.beginFill(0x000, 0.2);
    g.drawRect(0, 0, Graphics.width, Graphics.height);
    g.endFill();
    this._baseSprite.addChild(g);
    this._back1Sprite.filters = [];
    var baseColorFilter = new ColorFilter();
    this._back1Sprite.filters.push(baseColorFilter);
    this._back2Sprite.filters = [];
    var baseColorFilter2 = new ColorFilter();
    this._back2Sprite.filters.push(baseColorFilter2);
    baseColorFilter.setColorTone($gameScreen.tone());
    baseColorFilter2.setColorTone($gameScreen.tone());
  };
  Spriteset_Battle.prototype.updateBaseFilters = function () {
    var filter = this._baseColorFilter;
    //filter.setColorTone($gameScreen.tone());
  };
  Sprite_Battleback.prototype.adjustPosition = function () {
    this.width = Graphics.width; //Math.floor((1000 * Graphics.width) / 816);
    this.height = Graphics.height; //Math.floor((740 * Graphics.height) / 624);
    this.x = (Graphics.width - this.width) / 2;
    if ($gameSystem.isSideView()) {
      this.y = Graphics.height - this.height;
    } else {
      this.y = 0;
    }
    var ratioX = this.width / this.bitmap.width;
    var ratioY = this.height / this.bitmap.height;
    var scale = Math.max(ratioX, ratioY, 1.0);
    this.scale.x = scale;
    this.scale.y = scale;
  };
})(Nore || (Nore = {}));
