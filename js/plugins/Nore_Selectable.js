/*:ja
 * @target MZ
 * @author ル
 */
var Nore;
(function (Nore) {
  var _Window_Selectable_prototype_select = Window_Selectable.prototype.select;
  Window_Selectable.prototype.select = function (index) {
    var last = this._index;
    _Window_Selectable_prototype_select.call(this, index);
    if (this._index != last) {
      this.callHandler("change");
    }
  };
  var _Window_Selectable_prototype_activate =
    Window_Selectable.prototype.activate;
  Window_Selectable.prototype.activate = function () {
    _Window_Selectable_prototype_activate.call(this);
    this.callHandler("change");
  };
})(Nore || (Nore = {}));
