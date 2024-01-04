var Nore;
(function (Nore) {
  var _Spriteset_Base_prototype_createPictures =
    Spriteset_Base.prototype.createPictures;
  Spriteset_Base.prototype.createPictures = function () {
    _Spriteset_Base_prototype_createPictures.call(this);
    this._pictureContainer.filters = [];
    this._baseColorFilter2 = new ColorFilter();
    this._pictureContainer.filters.push(this._baseColorFilter2);
  };
  var _Spriteset_Base_prototype_updateBaseFilters =
    Spriteset_Base.prototype.updateBaseFilters;
  Spriteset_Base.prototype.updateBaseFilters = function () {
    _Spriteset_Base_prototype_updateBaseFilters.call(this);
    if ($gameSwitches.value(54)) {
      var filter = this._baseColorFilter2;
      filter.setColorTone($gameScreen.tone());
    }
  };
})(Nore || (Nore = {}));
