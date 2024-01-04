//=============================================================================
// Nore_p.js
//=============================================================================
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//=============================================================================
/*:ja
 * @target MZ
 * @plugindesc console.log の別名として p を定義します
 * @author ル
 * @url https://ci-en.dlsite.com/creator/276
 *
 * @help
 * Ver 1.0.0
 *
 * console.log の別名として p を定義します
 *
 * プラグインコマンドはありません。
 *
 * ・利用規約
 * 作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 * についても制限はありません。
 * このプラグインはもうあなたのものです。
 */
(function () {
  function p(arg) {
    if ($gameSwitches && $gameSwitches.value(27)) {
      return;
    }
    console.log(arg);
  }
  window.p = p;
})();
