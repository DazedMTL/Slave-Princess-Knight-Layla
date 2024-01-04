//=============================================================================
// Nore_EventPosition.js
//=============================================================================
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//=============================================================================
/*:ja
 * @target MZ
 * @plugindesc イベントの座標を1ピクセル単位で調整します。
 * 張り紙の座標とか、テーブルの上のアイテム座標を調整したいときにどうぞ。
 * @author ル
 * @url https://ci-en.dlsite.com/creator/276
 *
 * @help
 * Ver 1.0.0
 *
 * イベントのメモ欄に、
 * <position_x:10>
 * と書くと、イベントの位置が10ピクセル右にずれます。
 *
 * <position_y:10>
 * と書くと、イベントの位置が10ピクセル下にずれます。
 *
 * プラグインコマンドはありません。
 *
 * ・利用規約
 * 作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 * についても制限はありません。
 * このプラグインはもうあなたのものです。
 */
var Nore;
(function (Nore) {
  var _Game_Event_screenX = Game_Event.prototype.screenX;
  Game_Event.prototype.screenX = function () {
    var x = _Game_Event_screenX.call(this);
    if (this._norePositionX === undefined) {
      var e = this.event();
      if (e && e.meta["position_x"]) {
        this._norePositionX = parseInt(e.meta["position_x"]);
        if (isNaN(this._norePositionX)) {
          console.error("position_x の値が不正です: " + e.meta["position_x"]);
          this._norePositionX = 0;
        }
      } else {
        this._norePositionX = 0;
      }
    }
    x += this._norePositionX;
    return x;
  };
  var _Game_Event_screenY = Game_Event.prototype.screenY;
  Game_Event.prototype.screenY = function () {
    var y = _Game_Event_screenY.call(this);
    if (this._norePositionY === undefined) {
      var e = this.event();
      if (e && e.meta["position_y"]) {
        this._norePositionY = parseInt(e.meta["position_y"]);
        if (isNaN(this._norePositionY)) {
          console.error("position_y の値が不正です: " + e.meta["position_y"]);
          this._norePositionY = 0;
        }
      } else {
        this._norePositionY = 0;
      }
    }
    y += this._norePositionY;
    return y;
  };
})(Nore || (Nore = {}));
