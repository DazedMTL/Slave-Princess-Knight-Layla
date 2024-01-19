/*:ja
 * @target MZ
 * @author ル
 *
 * @command InitExposer
 * @text 晒し者イベントの初期化
 * @des 晒し者イベントの初期化
 *
 */
var Nore;
(function (Nore) {
  var pluginName = "Nore_Switch";
  var EXPOSER_SW = 1500;
  PluginManager.registerCommand(pluginName, "InitExposer", function (args) {
    return;

    for (var i = EXPOSER_SW + 1; i <= EXPOSER_SW + 100; i++) {
      $gameSwitches.setValue(i, false);
    }
    for (var _i = 0, _a = $gameParty.members(); _i < _a.length; _i++) {
      var actor = _a[_i];
      var swId = getSwitchId(actor.actorId(), actor.outerId);
      $gameSwitches.setValue(swId, true);
    }
  });
  function getSwitchId(actorId, outerId) {
    var base = (actorId - 1) * 10 + EXPOSER_SW;
    if (actorId == 10) {
      // アイリスとリンが２桁のactorIdのため
      base = 8 * 10 + EXPOSER_SW;
    }
    if (actorId == 12) {
      base = 9 * 10 + EXPOSER_SW;
    }
    var cosId = 0;
    switch (outerId) {
      case "a":
        cosId = 1;
        break;
      case "b":
        cosId = 2;
        break;
      case "c":
        cosId = 3;
        break;
      case "d":
        cosId = 4;
        break;
      case "e":
        cosId = 5;
        break;
      case "f":
        cosId = 6;
        break;
      case "g":
        cosId = 7;
        break;
      case "h":
        cosId = 8;
        break;
      case "i":
        cosId = 9;
        break;
      case "j":
        cosId = 10;
        break;
    }
    return base + cosId;
  }
  Nore.getSwitchId = getSwitchId;
})(Nore || (Nore = {}));
