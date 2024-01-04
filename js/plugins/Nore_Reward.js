/*:ja
 * @target MZ
 * @author ル
 *
 */
var Nore;
(function (Nore) {
  var EXP_MAP = {
    1: 3,
    2: 5,
    3: 8,
    4: 12,
    5: 17,
    6: 23,
  };
  function calcRealExp(exp) {
    if (EXP_MAP[exp]) {
      return EXP_MAP[exp];
    }
    p("realExp:" + exp);
    return exp;
  }
  function calcRealGold(gold) {
    if (EXP_MAP[gold]) {
      return EXP_MAP[gold];
    }
    return gold;
  }
  Game_Troop.prototype.goldTotal = function () {
    var members = this.deadMembers();
    var g =
      members.reduce(function (r, enemy) {
        return r + calcRealGold(enemy.gold());
      }, 0) * this.goldRate();
    var stage = $gameSystem.stageId();
    var floor = $gameSystem.floorCount();
    var rate = 1;
    switch (stage) {
      case 1:
        switch (floor) {
          case 1:
            rate = 1;
            break;
          case 2:
            rate = 1.2;
            break;
          case 3:
            rate = 1.4;
            break;
        }
    }
    var n = Math.floor(g * rate);
    if ($gameTemp.isNoDamage()) {
      return n * 2;
    }
    if ($gameTemp.is1Damage()) {
      return Math.round(n * 1.5);
    }
    if ($gameTemp.is2Damage()) {
      return Math.round(n * 1.2);
    }
    return n;
  };
  Game_Troop.prototype.makeDropItems = function () {
    if (!$gameParty.isDropItem()) {
      return [];
    }
    var candidates = [];
    for (var i = 10; i < 200; i++) {
      var item = $dataItems[i];
      if (item && item.meta["rate"]) {
        var count = Math.trunc(item.meta["rate"]);
        for (var k = 0; k < count; k++) {
          candidates.push(item);
        }
      }
    }
    if (candidates.length > 0) {
      return [candidates[Math.randomInt(candidates.length)]];
    }
    return [];
  };
  BattleManager.makeRewards = function () {
    this._rewards = {
      gold: $gameTroop.goldTotal(),
      exp: $gameTroop.expTotal(),
      items: $gameTroop.makeDropItems(),
      crystal: $gameTroop.crystalTotal(),
      skillPoint: $gameTroop.skillPointTotal(),
    };
    p("EXP:" + this._rewards.exp + " SkillPoint:" + this._rewards.skillPoint);
  };
  BattleManager.gainRewards = function () {
    this.gainExp();
    this.gainGold();
    this.gainDropItems();
    this.gainSkillPoint();
    $gameParty.autoLevelUp();
    //this.gainCrystal();
  };
  BattleManager.gainSkillPoint = function () {
    var n = this._rewards.skillPoint;
    $gameParty.gainSkillPoint(n);
    $gameSystem.getDungeonInfo().onSkillPoint(n);
  };
  BattleManager.gainCrystal = function () {
    var n = this._rewards.crystal;
    $gameParty.gainCrystal(n);
    $gameSystem.getDungeonInfo().onCrystal(n);
  };
  BattleManager.gainDropItems = function () {
    var items = this._rewards.items;
    for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
      var item = items_1[_i];
      $gameParty.gainBattleItem(item);
    }
  };
})(Nore || (Nore = {}));
