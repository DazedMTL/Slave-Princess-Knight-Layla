var Nore;
(function (Nore) {
  Game_Interpreter.prototype.command301 = function (params) {
    var _this = this;
    if (!$gameParty.inBattle()) {
      var troopId = void 0;
      if (params[0] === 0) {
        // Direct designation
        troopId = params[1];
      } else if (params[0] === 1) {
        // Designation with a variable
        troopId = $gameVariables.value(params[1]);
      } else {
        // Same as Random Encounters
        troopId = $gamePlayer.makeEncounterTroopId();
      }
      if ($dataTroops[troopId]) {
        BattleManager.setup(troopId, params[2], params[3]);
        BattleManager.setEventCallback(function (n) {
          _this._branch[_this._indent] = n;
        });
        $gamePlayer.makeEncounterCount();
        if ($gameSwitches.value(981)) {
          AudioManager.playSe({
            name: "Slash2",
            volume: 80,
            pitch: 100,
            pan: 0,
          });
          $gameParty.gainExp(100);
          $gameScreen.startFlash([255, 255, 255, 255], 10);
          return true;
        }
        SceneManager.push(Nore.Scene_Battle2);
      }
    }
    return true;
  };
})(Nore || (Nore = {}));
