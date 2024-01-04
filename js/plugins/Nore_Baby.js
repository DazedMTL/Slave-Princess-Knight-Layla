var CharacterImageSet = /** @class */ (function () {
  function CharacterImageSet(image, index) {
    this.characterImage = image;
    this.characterIndex = index;
  }
  return CharacterImageSet;
})();
var Child = /** @class */ (function () {
  function Child(taneoyaId, actorId) {
    this._taneoyaId = taneoyaId;
    this._actorId = actorId;
    this.decideSex();
  }
  Child.prototype.getCharacterImage = function () {
    this.calcSize();
    var type = this.taneoyaType();
    if (type == TaneoyaId.banzoku) {
      return "$baby_02_0" + this._size;
    }
    if (type == TaneoyaId.goblin) {
      return "$baby_03_0" + this._size;
    }
    if (this._male) {
      return "$baby_01_ma_0" + this._size;
    } else {
      return "$baby_01_fe_0" + this._size;
    }
  };
  Child.prototype.getDirection = function (elapsedDay) {
    if (elapsedDay <= 3) {
      return 2;
    }
    if (elapsedDay <= 7) {
      return 4;
    }
    return 6;
  };
  Child.prototype.calcSize = function () {
    if (this._size > 0) {
      return;
    }
    this._size = Math.randomInt(2) + 1;
  };
  Child.prototype.isMale = function () {
    this.decideSex();
    return this._male;
  };
  Child.prototype.taneoyaType = function () {
    var actor = $gameActors.actor(this._taneoyaId);
    return parseInt(actor.actor().meta["taneoyaType"]);
  };
  Child.prototype.decideSex = function () {
    if (this._male !== undefined) {
      return;
    }
    if (this.taneoyaType() == TaneoyaId.goblin) {
      this._male = true;
      return;
    }
    this._male = Math.randomInt(2) === 0;
  };
  Child.prototype.calcAptitudes = function () {
    if (this.aptitude1 !== undefined) {
      // すでに設定済み
      return;
    }
    var mother = $gameActors.actor(this._actorId);
    var father = this.findTaneoyaActor();
    var bonus = 0;
    if (father.actor().meta["aptitudeMinus"]) {
      bonus = -1 * Math.trunc(father.actor().meta["aptitudeMinus"]);
    }
    //p('mother:' + this._actorId + ' father:' + this._taneoyaId);
    for (var aptitude = 1; aptitude <= 5; aptitude++) {
      var m = mother.aptitude(aptitude);
      var f = father.aptitude(aptitude);
      this["aptitude" + aptitude] = this.decideBabyAptitude(
        aptitude,
        m,
        f,
        bonus
      );
    }
  };
  Child.prototype.findTaneoyaActor = function () {
    var actor = $gameActors.actor(this._taneoyaId);
    if (actor.actor().meta["aptitude1"]) {
      return actor;
    }
    var taneoyaId = Math.trunc(actor.actor().meta["taneoyaType"]);
    for (var i = 13; i < 100; i++) {
      var actor_1 = $gameActors.actor(i);
      var t = Math.trunc(actor_1.actor().meta["taneoyaType"]);
      if (t == taneoyaId) {
        if (actor_1.actor().meta["aptitude1"]) {
          return actor_1;
        }
      }
    }
    console.error(
      "taneoyaType:" + taneoyaId + " で才能が定義されたActorが存在しません"
    );
    return actor;
  };
  Child.prototype.decideBabyAptitude = function (
    aptitude,
    mother,
    father,
    bonus
  ) {
    var max = Math.max(mother, father);
    var min = Math.min(mother, father);
    var ave = (max + min) / 2;
    var d = max - min + 0.5;
    var dice = rnorm() / 4;
    //p(dice)
    var rank = Math.round(ave + d * dice) + bonus;
    if (rank > Rank.S) {
      rank = Rank.S;
    }
    if (rank < Rank.H) {
      rank = Rank.H;
    }
    /*if (aptitude == 4 && this.taneoyaType() == TaneoyaId.goblin) {
            rank = Rank.H;
        }*/
    return rank;
  };
  Child.prototype.countRank = function (rank) {
    var n = 0;
    for (var aptitude = 1; aptitude <= 5; aptitude++) {
      if (this["aptitude" + aptitude] >= rank) {
        n++;
      }
    }
    //p(n)
    return n;
  };
  Child.prototype.future = function () {
    this.decideFuture();
    return this._future;
  };
  Child.prototype.decideFuture = function () {
    if (this._future !== undefined) {
      return;
    }
    switch (this.taneoyaType()) {
      case TaneoyaId.banzoku:
      case TaneoyaId.gray:
      case TaneoyaId.vagrant:
      case TaneoyaId.bar:
      case TaneoyaId.loli:
        if (this.isMale()) {
          this._future = this.decideBanzokuFuture();
        } else {
          this._future = this.decideFemaleBanzokuFuture();
        }
        break;
      case TaneoyaId.minister:
        this._future = this.decideMinisterFuture();
        break;
      case TaneoyaId.charles:
        this._future = this.decideCharlesFuture();
        break;
      case TaneoyaId.goblin:
        this._future = this.decideGoblinFuture();
        break;
    }
  };
  Child.prototype.decideCharlesFuture = function () {
    if (this.aptitude1 >= Rank.A) {
      if (this.aptitude3 >= Rank.A) {
        return Future.CHARLES_KING;
      }
    }
    if (this.aptitude3 >= Rank.A) {
      if (this.aptitude2 >= Rank.A) {
        return Future.CHARLES_MINISTER;
      } else {
        return Future.CHARLES_STRATEGIST;
      }
    }
    if (this.aptitude1 >= Rank.A) {
      return Future.CHARLES_FIGHTER;
    }
    if (this.aptitude2 >= Rank.A) {
      return Future.CHARLES_MAGE;
    }
    if (this.countRank(Rank.B) >= 3) {
      return Future.CHARLES_COMMANDER;
    }
    return this.decideAdventurerFuture();
  };
  Child.prototype.decideBanzokuFuture = function () {
    if (this.aptitude1 >= Rank.A) {
      if (this.aptitude3 >= Rank.B) {
        return Future.BANZOKU_KING;
      }
    }
    if (this.aptitude1 >= Rank.C) {
      return Future.BANZOKU_FIGHTER;
    }
    if (this.aptitude2 >= Rank.C) {
      return Future.BANZOKU_MAGE;
    }
    if (this.aptitude3 >= Rank.B) {
      return Future.BANZOKU_STRATEGIST;
    }
    if (this.aptitude5 >= Rank.C) {
      return Future.BANZOKU_THIEF;
    }
    if (this.countRank(Rank.D) >= 4) {
      return Future.COMMON_SOLDIER;
    }
    return Future.BANZOKU_DOREI;
  };
  Child.prototype.decideMinisterFuture = function () {
    if (this.aptitude2 >= Rank.B) {
      if (this.aptitude3 >= Rank.A) {
        return Future.MINISTER;
      }
    }
    if (this.aptitude1 >= Rank.B) {
      return this.decideAdventurerFuture();
    }
    if (this.aptitude1 >= Rank.B) {
      return Future.INSTRUCTER;
    }
    if (this.aptitude3 <= Rank.E) {
      return Future.CORRUPTION;
    }
    return Future.ORDINARY;
  };
  Child.prototype.decideAdventurerFuture = function () {
    if (this.aptitude1 >= Rank.B) {
      return Future.FIGHTER;
    }
    if (this.aptitude2 >= Rank.B) {
      return Future.MAGE;
    }
    if (this.aptitude3 >= Rank.B) {
      return Future.SAGE;
    }
    if (this.aptitude4 >= Rank.B) {
      return Future.CLELIC;
    }
    if (this.aptitude5 >= Rank.B) {
      return Future.THIEF;
    }
    if (this.countRank(Rank.C) >= 4) {
      return Future.ADVENTURER;
    }
    return Future.LESSER_ADVENTURER;
  };
  Child.prototype.decideGoblinFuture = function () {
    if (this.aptitude2 >= Rank.C) {
      return Future.GOBLIN_MAGE;
    }
    if (this.aptitude4 >= Rank.C) {
      return Future.GOBLIN_SHAMAN;
    }
    return Future.GOBLIN_FIGHTER;
  };
  Child.prototype.decideFemaleBanzokuFuture = function () {
    if (this.aptitude1 >= Rank.A) {
      if (this.aptitude3 >= Rank.B) {
        return Future.BANZOKU_KING;
      }
    }
    if (this.aptitude1 >= Rank.C) {
      return Future.NIKUBENKI_1;
    }
    if (this.aptitude2 >= Rank.C) {
      return Future.NIKUBENKI_2;
    }
    if (this.aptitude3 >= Rank.B) {
      return Future.NIKUBENKI_3;
    }
    if (this.aptitude5 >= Rank.A) {
      return Future.NIKUBENKI_4;
    }
    if (this.countRank(Rank.D) >= 4) {
      return Future.COMMON_SOLDIER;
    }
    return Future.BANZOKU_DOREI;
  };
  Child.prototype.decideFemaleAdventurerFuture = function () {
    if (this.aptitude1 >= Rank.B) {
      return Future.FIGHTER;
    }
    if (this.aptitude2 >= Rank.B) {
      return Future.MAGE;
    }
    if (this.aptitude3 >= Rank.B) {
      return Future.SAGE;
    }
    if (this.aptitude4 >= Rank.B) {
      return Future.CLELIC;
    }
    if (this.aptitude5 >= Rank.B) {
      return Future.THIEF;
    }
    if (this.countRank(Rank.C) >= 4) {
      return Future.ADVENTURER;
    }
    return Future.LESSER_ADVENTURER;
  };
  Child.prototype.gold = function () {
    this.calcAptitudes();
    var n = 0;
    n += this.aptitude1 * 10; // 武力
    n += this.aptitude2 * 5; // 魔法力
    n += this.aptitude3 * 10; // 知力
    n += this.aptitude4 * 4; // 信仰心
    n += this.aptitude5 * 10; // 敏捷性
    n = n * n;
    for (var _i = 0, _a = this.getSkillList(); _i < _a.length; _i++) {
      var skill = _a[_i];
      if (skill) {
        n *= skill.gold / 100;
      }
    }
    n *= getBabyGoldRate(this._male, this.taneoyaType());
    return Math.round(n / 10);
  };
  Child.prototype.getSkillList = function () {
    if (!this._skillIdList) {
      this.decideSkillList();
    }
    var result = [];
    for (var _i = 0, _a = this._skillIdList; _i < _a.length; _i++) {
      var id = _a[_i];
      result.push(CHILD_PARAMS[id]);
    }
    return result;
  };
  Child.prototype.decideSkillList = function () {
    p("decideSkillList");
    this._skillIdList = selectBabySkills(this._actorId, this._male);
    //p(this._skillIdList)
  };
  return Child;
})();
var Future;
(function (Future) {
  Future[(Future["BANZOKU_FIGHTER"] = 0)] = "BANZOKU_FIGHTER";
  Future[(Future["COMMON_SOLDIER"] = 1)] = "COMMON_SOLDIER";
  Future[(Future["BANZOKU_STRATEGIST"] = 2)] = "BANZOKU_STRATEGIST";
  Future[(Future["BANZOKU_MAGE"] = 3)] = "BANZOKU_MAGE";
  Future[(Future["BANZOKU_THIEF"] = 4)] = "BANZOKU_THIEF";
  Future[(Future["BANZOKU_KING"] = 5)] = "BANZOKU_KING";
  Future[(Future["BANZOKU_DOREI"] = 6)] = "BANZOKU_DOREI";
  Future[(Future["FIGHTER"] = 50)] = "FIGHTER";
  Future[(Future["CLELIC"] = 51)] = "CLELIC";
  Future[(Future["THIEF"] = 52)] = "THIEF";
  Future[(Future["MAGE"] = 53)] = "MAGE";
  Future[(Future["SAGE"] = 54)] = "SAGE";
  Future[(Future["ADVENTURER"] = 55)] = "ADVENTURER";
  Future[(Future["LESSER_ADVENTURER"] = 56)] = "LESSER_ADVENTURER";
  Future[(Future["MINISTER"] = 100)] = "MINISTER";
  Future[(Future["INSTRUCTER"] = 101)] = "INSTRUCTER";
  Future[(Future["CORRUPTION"] = 102)] = "CORRUPTION";
  Future[(Future["ORDINARY"] = 103)] = "ORDINARY";
  Future[(Future["CHARLES_KING"] = 200)] = "CHARLES_KING";
  Future[(Future["CHARLES_MINISTER"] = 201)] = "CHARLES_MINISTER";
  Future[(Future["CHARLES_FIGHTER"] = 202)] = "CHARLES_FIGHTER";
  Future[(Future["CHARLES_MAGE"] = 203)] = "CHARLES_MAGE";
  Future[(Future["CHARLES_STRATEGIST"] = 203)] = "CHARLES_STRATEGIST";
  Future[(Future["CHARLES_COMMANDER"] = 204)] = "CHARLES_COMMANDER";
  Future[(Future["GOBLIN_FIGHTER"] = 300)] = "GOBLIN_FIGHTER";
  Future[(Future["GOBLIN_MAGE"] = 301)] = "GOBLIN_MAGE";
  Future[(Future["GOBLIN_SHAMAN"] = 302)] = "GOBLIN_SHAMAN";
  Future[(Future["NIKUBENKI_1"] = 1001)] = "NIKUBENKI_1";
  Future[(Future["NIKUBENKI_2"] = 1002)] = "NIKUBENKI_2";
  Future[(Future["NIKUBENKI_3"] = 1003)] = "NIKUBENKI_3";
  Future[(Future["NIKUBENKI_4"] = 1004)] = "NIKUBENKI_4";
})(Future || (Future = {}));
function getBabyGoldRate(male, taneoyaType) {
  var rate = 1;
  if (!male) {
    rate += 0.2;
  }
  switch (taneoyaType) {
    case TaneoyaId.banzoku:
      rate -= 0.2;
      break;
    case TaneoyaId.goblin:
      rate -= 0.4;
      break;
    case TaneoyaId.vagrant:
      rate -= 0.1;
      break;
  }
  return rate;
}
