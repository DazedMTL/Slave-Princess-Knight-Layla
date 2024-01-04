var _SceneManager_onKeyDown = SceneManager.onKeyDown;
SceneManager.onKeyDown = function (event) {
  _SceneManager_onKeyDown.call(this, event);
  if (!event.ctrlKey && !event.altKey) {
    if (!$gameTemp || !$gameTemp.isPlaytest()) {
      return;
    }
    if (SceneManager._scene instanceof Scene_Battle) {
      // F9
      if (event.keyCode == 120) {
        for (var _i = 0, _a = $gameTroop.aliveMembers(); _i < _a.length; _i++) {
          var e = _a[_i];
          var action = new Game_Action2($gameActors.actor(1));
          action.setSkill(1123);
          e.gainHp(-9999, 0, action);
          if (e.isAlive()) {
            e.gainHp(-9999, 0, action);
          }
          BattleManager.checkBattleEnd();
        }
      }
      // F10
      if (event.keyCode == 121) {
        for (var _b = 0, _c = $gameParty.aliveMembers(); _b < _c.length; _b++) {
          var e = _c[_b];
          e.gainHp(-9999, 0, new Game_Action2($gameActors.actor(1)));
          BattleManager.checkBattleEnd();
        }
      }
    }
  }
};
