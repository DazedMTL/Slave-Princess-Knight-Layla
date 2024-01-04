/*:ja
 * @target MZ
 * @author ル
 *
 * @command SetUpDefeatCharacter
 * @text 撤退キャラ名セットアップ
 * @des 撤退キャラ名セットアップ
 *
 */
var Nore;
(function (Nore) {
  var pluginName = "Nore_Defeat";
  PluginManager.registerCommand(
    pluginName,
    "SetUpDefeatCharacter",
    function (args) {
      setupDefeatCharacter();
    }
  );
  function setupDefeatCharacter() {
    var varId = 61;
    for (var _i = 0, _a = $gameParty.battleMembers(); _i < _a.length; _i++) {
      var a = _a[_i];
      $gameVariables.setValue(varId, a.name());
      $gameVariables.setValue(varId + 10, a.actorId());
      varId++;
    }
  }
  Nore.setupDefeatCharacter = setupDefeatCharacter;
})(Nore || (Nore = {}));
