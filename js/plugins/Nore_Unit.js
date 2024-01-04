Game_Unit.prototype.yowaimonoTarget = function (list) {
  p("yowaimonoTarget");
  list = list.sort(function (a, b) {
    return a.hpSortValue() - b.hpSortValue();
  });
  return list[0];
};
Game_Unit.prototype.randomStunTarget = function () {
  var candidates = [];
  for (var _i = 0, _a = this.aliveMembers(); _i < _a.length; _i++) {
    var a = _a[_i];
    if (a.hasState(Nore.STUN_STATE_ID)) {
      candidates.push(a);
    }
  }
  if (candidates.length == 0) {
    return null;
  }
  candidates = Nore.shuffle(candidates);
  return candidates[0];
};
