var __extends =
  (this && this.__extends) ||
  (function () {
    var extendStatics = function (d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (d, b) {
            d.__proto__ = b;
          }) ||
        function (d, b) {
          for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        };
      return extendStatics(d, b);
    };
    return function (d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype =
        b === null
          ? Object.create(b)
          : ((__.prototype = b.prototype), new __());
    };
  })();
/*:ja
 * @target MZ
 * @author ル
 *
 * @command Open
 * @text 開く
 * @des 開く
 * @arg actorId
 * @type number
 *
 *
 */
var ScheduleType;
(function (ScheduleType) {
  ScheduleType["CAPTURED"] = "captured";
  ScheduleType["CAPTIVE"] = "captive";
  ScheduleType["CHOKYO"] = "chokyo";
  ScheduleType["CHOKYO_PAST"] = "chokyo_past";
  ScheduleType["OPENING"] = "opening";
  ScheduleType["NONE"] = "none";
  ScheduleType["SLEEP"] = "sleep";
  ScheduleType["TOILET_ANAL"] = "toilet_anal";
  ScheduleType["SEX_PERSON"] = "sex_person";
  ScheduleType["TANETSUKE"] = "tanetsuke";
  ScheduleType["TANETSUKE_BACK"] = "tanetsukeBack";
  ScheduleType["TANETSUKE_IN_PERSON"] = "tanetsukeInPerson";
  ScheduleType["ANAL_IN_PERSON"] = "analInPerson";
  ScheduleType["TANETSUKE_DAIJIN"] = "tanetsukeDaijin";
  ScheduleType["TANETSUKE_GRAY"] = "tanetsukeGray";
  ScheduleType["KAIRAKU_CHOKYO"] = "kairaku_chokyo";
  ScheduleType["REST"] = "rest";
  ScheduleType["RAPE"] = "rape";
  ScheduleType["RAPE_PAST"] = "rape_past";
  ScheduleType["BATTLE"] = "battle";
  ScheduleType["MOVE_DUNGEON"] = "move_dungeon";
  ScheduleType["DEFEAT"] = "defeat";
  ScheduleType["SYUSAN"] = "syusan";
  ScheduleType["RETURN"] = "return";
  ScheduleType["NINSHIN"] = "ninshin";
  ScheduleType["NINSHIN_DETECTION"] = "ninshin_detection";
  ScheduleType["NINSHIN_GROWUP"] = "ninshin_growup";
  ScheduleType["MANKO_CHECK"] = "manko_check";
  ScheduleType["MANKO_ERO"] = "manko_ero";
  ScheduleType["ANAL_ERO"] = "anal_ero";
  ScheduleType["FELA_GOKKUN"] = "fela_gokkun";
  ScheduleType["FELA_GOKKUN_NO_DISP"] = "fela_gokkun_no_disp";
  ScheduleType["NIKUBENKI"] = "nikubenki";
  ScheduleType["NAKADASHI"] = "nakadashi";
  ScheduleType["KYOSEI_NINSHIN"] = "kyosei_ninshin";
  ScheduleType["NINSHIN_DAMAGE"] = "ninshin_damage";
  ScheduleType["LOST_VIRGIN"] = "lost_virgin";
  ScheduleType["ACCE_ON"] = "acce_on";
  ScheduleType["ACCE_OFF"] = "acce_off";
  ScheduleType["ACCE_ON2"] = "acce_on2";
  ScheduleType["ANAL"] = "anal";
  ScheduleType["ANAL_ACME"] = "anal_acme";
  ScheduleType["ACME"] = "acme";
  ScheduleType["RELEASE"] = "release";
  ScheduleType["FOUND"] = "found";
  ScheduleType["PUNISH"] = "punish";
  ScheduleType["SLAVE"] = "slave";
  ScheduleType["SLAVE_END"] = "slave_end";
  ScheduleType["BAISYUN"] = "baisyun";
  ScheduleType["FELA_TO7"] = "felaTo7";
  ScheduleType["FELA_BY1"] = "felaBy1";
  ScheduleType["SEX_TO7"] = "sexTo7";
  ScheduleType["SEX_TO1_AND_3"] = "sexTo1And3";
  ScheduleType["SEX_TO1"] = "sexTo1";
  ScheduleType["SEX_TO3"] = "sexTo3";
  ScheduleType["SKILL_POINT"] = "skill_point";
  ScheduleType["FELA"] = "fela";
  ScheduleType["OBEDIENCE"] = "obedience";
  ScheduleType["NASTY"] = "nasty";
  ScheduleType["MANKO_OSHIKKO"] = "manko_oshikko";
  ScheduleType["TEXT"] = "text";
  ScheduleType["CHICHI"] = "chichi";
  ScheduleType["CRYSTAL"] = "crystal";
  ScheduleType["CHIMPO_ERO"] = "chimpo_ero";
})(ScheduleType || (ScheduleType = {}));
var SCHEDULE_TYPE_LIST = [
  ScheduleType.CAPTIVE,
  ScheduleType.OPENING,
  ScheduleType.NONE,
  ScheduleType.SLEEP,
  ScheduleType.TANETSUKE,
  ScheduleType.TANETSUKE_BACK,
  ScheduleType.TANETSUKE_IN_PERSON,
  ScheduleType.TANETSUKE_DAIJIN,
  ScheduleType.TOILET_ANAL,
  ScheduleType.KAIRAKU_CHOKYO,
  ScheduleType.REST,
  ScheduleType.RAPE,
  ScheduleType.BATTLE,
  ScheduleType.DEFEAT,
  ScheduleType.SYUSAN,
  ScheduleType.RETURN,
  ScheduleType.NINSHIN,
  ScheduleType.MANKO_CHECK,
  ScheduleType.FELA,
  ScheduleType.ANAL,
  ScheduleType.ANAL_IN_PERSON,
];
var MIN_NINSHIN_DAMAGE = 10;
var SYUSAN_MANKO_UP = 120;
var EventResult = /** @class */ (function () {
  function EventResult(schedule) {
    this._nakadashi = 0;
    this._schedule = schedule;
    this._nakadashi = this.calcNakadashi();
  }
  EventResult.prototype.calcNakadashi = function () {
    if (this._schedule.type() !== ScheduleType.TANETSUKE) {
      return 0;
    }
    return (4 + Math.randomInt(14)) * this._schedule.time() + Math.randomInt(8);
  };
  EventResult.prototype.nakadashi = function () {
    return this._nakadashi;
  };
  return EventResult;
})();
var Schedule = /** @class */ (function () {
  function Schedule(actorId, day, event, value1, value2, eroUpKey) {
    if (value1 === void 0) {
      value1 = 0;
    }
    if (value2 === void 0) {
      value2 = null;
    }
    if (eroUpKey === void 0) {
      eroUpKey = null;
    }
    this._valueList = [];
    this._acme = -1;
    this._systemNinshinRate = -1;
    this._analAcme = 0;
    this._nakadashi = 0;
    this._gainMilk = false;
    this._actorId = actorId;
    this._day = day;
    this._type = event;
    this._valueList.push(value1);
    if (value2) {
      this._valueList.push(value2);
    }
    if (this.countNinshin() > 0) {
      this.createChild();
    }
    this._eroUpKey = eroUpKey;
  }
  Schedule.prototype.actorId = function () {
    return this._actorId;
  };
  Schedule.prototype.createChild = function () {
    this._child = new Child(this.value(), this._actorId);
  };
  Schedule.prototype.child = function () {
    return this._child;
  };
  Schedule.prototype.setNakadashi = function (n) {
    if (this._valueList.length > 0) {
      this._valueList.push(n);
    } else {
      this._nakadashi = n;
    }
  };
  Schedule.prototype.addValue = function (value) {
    this._valueList.push(value);
    this._acme = -1;
  };
  Schedule.prototype.setEroUpKey = function (eroUpKey) {
    this._eroUpKey = eroUpKey;
  };
  Schedule.prototype.getEroUpKey = function () {
    return this._eroUpKey;
  };
  Schedule.prototype.color = function () {
    switch (this._type) {
      case ScheduleType.SLEEP:
        return ColorManager.textColor(7);
      case ScheduleType.TANETSUKE:
        return ColorManager.textColor(2);
      case ScheduleType.KAIRAKU_CHOKYO:
        return ColorManager.textColor(13);
      case ScheduleType.REST:
        return ColorManager.textColor(7);
      case ScheduleType.NONE:
        return ColorManager.textColor(9);
      case ScheduleType.RAPE:
        return ColorManager.textColor(10);
      case ScheduleType.DEFEAT:
        return ColorManager.textColor(11);
      case ScheduleType.BATTLE:
        return ColorManager.textColor(12);
    }
  };
  Schedule.prototype.blinkColor = function () {
    return ColorManager.textColor(0);
  };
  Schedule.prototype.isLostVirgin = function () {
    if (this.countNakadashi() == 0) {
      return false;
    }
    var before = this.actorHistory().countNakadashi(this._day - 1);
    return before == 0;
  };
  Schedule.prototype.isBote = function () {
    return this.actorHistory().getHistory(this._day).isBote();
  };
  Schedule.prototype.text = function (isShort) {
    if (isShort === void 0) {
      isShort = false;
    }
    var acme = this.countAcme();
    if (this._day == 0) {
      if (this._type != ScheduleType.MANKO_CHECK) {
        return "";
      }
    }
    switch (this._type) {
      //case ScheduleType.SLEEP: return TextManager.singleSleep;
      case ScheduleType.TANETSUKE:
      case ScheduleType.TANETSUKE_BACK:
      case ScheduleType.TANETSUKE_IN_PERSON:
        if (this.isLostVirgin()) {
          return TextManager.eventTanetsukeLostVirgin.format(this.value());
        }
        if (this.isBote()) {
          return TextManager.eventTanetsukeBote.format(this.value());
        } else {
          return TextManager.eventTanetsuke.format(this.value());
        }
      case ScheduleType.TANETSUKE_DAIJIN:
        if (this.isLostVirgin()) {
          return TextManager.eventTanetsukeDaijinLostVirgin.format(
            this.value()
          );
        }
        if (this.actorHistory().countNinshin(this._day) > 0) {
          if (this.actorHistory().countNinshin(this._day - 1) == 0) {
            return TextManager.eventKyoseiNinshin2;
          }
        }
        return TextManager.eventTanetsukeDaijin.format(this.value());
      //case ScheduleType.TANETSUKE: return TextManager.tanetsuke;
      //case ScheduleType.KAIRAKU_CHOKYO: return TextManager.chokyo;
      case ScheduleType.FELA_GOKKUN:
        return TextManager.felaGokkun.format(this.value());
      //case ScheduleType.DEFEAT:return TextManager.eventDefeat.format(this.actorValue(1));
      //case ScheduleType.BATTLE: return TextManager.eventBattle.format(this.dungeonName());
      //case ScheduleType.MOVE_DUNGEON: return TextManager.eventMove.format(this.value());
      //case ScheduleType.RETURN: return TextManager.eventReturn.format(this.value());
      //case ScheduleType.CAPTURED: return TextManager.eventCaptured.format(this.value() - 1);
      case ScheduleType.CAPTIVE:
        return TextManager.eventCaptive.format(this.value());
      case ScheduleType.NINSHIN:
        if (this._day == $gameSystem.day()) {
          return "";
        }
        return "";
        var ninshinCount = this.actorHistory().countNinshin(this._day);
        return TextManager.ninshin.format(this.taneoyaName(), ninshinCount);
      case ScheduleType.MANKO_CHECK:
        if (this.actorId() == 7) {
          return TextManager.eventMankoCheck2;
        } else {
          return TextManager.eventMankoCheck;
        }
      case ScheduleType.KYOSEI_NINSHIN:
        if (this._day == $gameSystem.day()) {
          return "";
        }
        return "";
        var ninshinCount = this.actorHistory().countNinshin(this._day);
        return TextManager.ninshin.format(this.taneoyaName(), ninshinCount);
      case ScheduleType.NINSHIN_DETECTION:
        var ninshinCount = this.actorHistory().countNinshin(this._day);
        return TextManager.ninshin.format(this.taneoyaName(), ninshinCount);
      case ScheduleType.ACCE_ON:
        return TextManager.eventAcceOn.format(this.acceValue());
      case ScheduleType.KAIRAKU_CHOKYO:
        return TextManager.eventKairakuChokyo.format(this._acme);
      case ScheduleType.RELEASE:
        return TextManager.eventRelease.format();
      case ScheduleType.PUNISH:
        return TextManager.eventPunish.format();
      case ScheduleType.SYUSAN:
        var syusanCount = this.actorHistory().countSyusan(this._day);
        return TextManager.eventSyusan.format(syusanCount, this.taneoyaName());
      case ScheduleType.SLAVE:
        return TextManager.eventSlave.format(this.value());
      case ScheduleType.BAISYUN:
        return TextManager.eventBaisyun.format(this.value());
      case ScheduleType.SEX_TO1:
        return TextManager.eventSexTo1.format(this.value());
      case ScheduleType.SEX_TO3:
        return TextManager.eventSexTo3.format(this.value());
      case ScheduleType.SEX_TO1_AND_3:
        return TextManager.eventSexTo1And3.format(this.value());
      case ScheduleType.SEX_TO7:
        if (this.isLostVirgin()) {
          return TextManager.eventSexTo7LostVirgin.format(this.value());
        } else {
          return TextManager.eventSexTo7.format(this.value());
        }
      //case ScheduleType.FELA: return TextManager.eventFela.format(this.value());
      case ScheduleType.FELA_BY1:
        return TextManager.eventFelaBy1.format(this.value());
      case ScheduleType.FELA_TO7:
        return TextManager.eventFelaTo7.format(this.value());
      case ScheduleType.MANKO_OSHIKKO:
        return TextManager.eventMankoOshikko.format(this.value());
      case ScheduleType.ANAL:
        return TextManager.eventAnal.format(this.value());
      case ScheduleType.CHICHI:
        return TextManager.eventChichi.format(this.value());
    }
    return "";
  };
  Schedule.prototype.taneoyaName = function () {
    return $gameSystem.getTaneoyaName(this.value());
    /*
        const actorId = this.value();
        const taneoyaId = Math.trunc($gameActors.actor(actorId).actor().meta['taneoyaType']);
        return $gameSystem.getTaneoyaName(taneoyaId);
        */
  };
  Schedule.prototype.isVisible = function () {
    switch (this._type) {
      case ScheduleType.NINSHIN:
      case ScheduleType.NINSHIN_DETECTION:
      case ScheduleType.TANETSUKE:
      case ScheduleType.TANETSUKE_BACK:
      case ScheduleType.TANETSUKE_IN_PERSON:
      case ScheduleType.TANETSUKE_DAIJIN:
      case ScheduleType.TANETSUKE_GRAY:
      case ScheduleType.LOST_VIRGIN:
      case ScheduleType.KYOSEI_NINSHIN:
      case ScheduleType.ACCE_ON:
      case ScheduleType.MANKO_CHECK:
      case ScheduleType.KAIRAKU_CHOKYO:
      case ScheduleType.RELEASE:
      case ScheduleType.PUNISH:
      case ScheduleType.SLAVE:
      case ScheduleType.SLAVE_END:
      case ScheduleType.BAISYUN:
      case ScheduleType.SEX_TO1:
      case ScheduleType.SEX_TO3:
      case ScheduleType.SEX_TO7:
      case ScheduleType.SEX_TO1_AND_3:
      case ScheduleType.FELA_BY1:
      case ScheduleType.FELA_TO7:
      case ScheduleType.ANAL:
      case ScheduleType.SYUSAN:
      case ScheduleType.CHICHI:
      case ScheduleType.FELA:
        return true;
    }
    return false;
  };
  Schedule.prototype.actorValue = function (index) {
    var actorId = this._valueList[index];
    if (actorId > 0) {
      return $gameActors.actor(actorId).name();
    } else {
      return "";
    }
  };
  Schedule.prototype.valueCount = function () {
    return this._valueList.length;
  };
  Schedule.prototype.acceValue = function () {
    var acceId = this.value();
    var armor = $dataArmors[acceId];
    if (!armor) {
      console.error(acceId + "のアクセが見つかりません");
      return "";
    }
    return armor.name;
  };
  Schedule.prototype.dungeonName = function () {
    var stageId = this.value();
    return getDungeonName(stageId);
  };
  Schedule.prototype.value = function () {
    if (this._valueList.length == 1) {
      return this._valueList[0];
    }
    var n = 0;
    for (var _i = 0, _a = this._valueList; _i < _a.length; _i++) {
      var v = _a[_i];
      n += v;
    }
    return n;
  };
  Schedule.prototype.hasEvent = function () {
    if (this._finished) {
      return false;
    }
    if (this.commonEventId() > 0) {
      return true;
    }
    return false;
  };
  Schedule.prototype.finishEvent = function () {
    this._finished = true;
  };
  Schedule.prototype.eventResult = function () {
    switch (this._type) {
      case ScheduleType.TANETSUKE:
        return new EventResult(this);
    }
    return null;
  };
  Schedule.prototype.type = function () {
    return this._type;
  };
  Schedule.prototype.commonEventId = function () {
    switch (this._type) {
      case ScheduleType.RAPE:
        return 931;
      case ScheduleType.KAIRAKU_CHOKYO:
        return true;
    }
    return 0;
  };
  Schedule.prototype.countTotal = function (id) {
    switch (id) {
      case EroStatusId.RAPE:
        return this.countRape();
      case EroStatusId.NAKADASHI:
        return this.countNakadashi();
      case EroStatusId.ANAL:
        return this.countAnal();
      case EroStatusId.ACME:
        return this.countAcme();
      case EroStatusId.ACME_MANKO:
        return this.countAcmeManko();
      case EroStatusId.ACME_ANAL:
        return this.countAcmeAnal();
      case EroStatusId.MANKO_ERO:
        return this.countMankoEro();
      case EroStatusId.ANAL_ERO:
        return this.countAnalEro();
      case EroStatusId.FELA:
        return this.countFela();
      case EroStatusId.TOILET:
        return this.countToilet();
      case EroStatusId.SYUSAN:
        return this.countSyusan();
      case EroStatusId.SYUSAN_BANZOKU:
        return this.countSyusanType(TaneoyaId.banzoku);
      case EroStatusId.SYUSAN_GOBLIN:
        return this.countSyusanType(TaneoyaId.goblin);
      case EroStatusId.SYUSAN_VAGRANT:
        return this.countSyusanType(TaneoyaId.vagrant);
      case EroStatusId.SYUSAN_GRAY:
        return this.countSyusanType(TaneoyaId.gray);
      case EroStatusId.SYUSAN_CHARLES:
        return this.countSyusanType(TaneoyaId.charles);
      case EroStatusId.SYUSAN_MINISTER:
        return this.countSyusanType(TaneoyaId.minister);
      case EroStatusId.SYUSAN_LOLI:
        return this.countSyusanType(TaneoyaId.loli);
      case EroStatusId.SYUSAN_BAR:
        return this.countSyusanType(TaneoyaId.bar);
      case EroStatusId.NIKUBENKI:
        return this.countNikubenki();
      case EroStatusId.ANAL_ACME:
        return this.countAnalAcme();
      case EroStatusId.NINSHIN:
        return this.countNinshin();
      case EroStatusId.NINSHIN_BANZOKU:
        return this.countNinshinBanzoku();
      case EroStatusId.SLAVE_END:
        return this.countSlaveEnd();
      case EroStatusId.BAISYUN:
        return this.countBaisyun();
      case EroStatusId.BAISYUN_PERSON:
        return this.countBaisyunPerson();
      case EroStatusId.BATTLE:
        return this.countBattle();
      case EroStatusId.SKILL_POINT:
        return this.countSkillPoint();
      case EroStatusId.NINSHIN_DAMAGE:
        return this.countNinshinDamage();
      case EroStatusId.OBEDIENCE:
        return this.countObedience();
      case EroStatusId.NASTY:
        return this.countNasty();
      case EroStatusId.DAIJIN:
        return this.countDaijin();
      case EroStatusId.CHICHI:
        return this.countChichi();
      case EroStatusId.CRYSTAL:
        return this.countCrystal();
      case EroStatusId.CHIMPO_ERO:
        return this.countChimpoEro();
    }
    return 0;
  };
  Schedule.prototype.countToilet = function () {
    if (this._type == ScheduleType.TOILET_ANAL) {
      return 1;
    }
    return 0;
  };
  Schedule.prototype.countChimpoEro = function () {
    if (this._type == ScheduleType.CHIMPO_ERO) {
      return this.value();
    }
    return 0;
  };
  Schedule.prototype.countCrystal = function () {
    if (this._type == ScheduleType.CRYSTAL) {
      return this.value();
    }
    return 0;
  };
  Schedule.prototype.countChichi = function () {
    if (this._type == ScheduleType.CHICHI) {
      return 1;
    }
    return 0;
  };
  Schedule.prototype.countDaijin = function () {
    if (this._type == ScheduleType.TANETSUKE_DAIJIN) {
      return 1;
    }
    return 0;
  };
  Schedule.prototype.countNasty = function () {
    if (this._type == ScheduleType.NASTY) {
      return this.value();
    }
    return 0;
  };
  Schedule.prototype.countObedience = function () {
    if (this._type == ScheduleType.OBEDIENCE) {
      return this.value();
    }
    return 0;
  };
  Schedule.prototype.countSkillPoint = function () {
    if (this._type == ScheduleType.SKILL_POINT) {
      return this.value();
    }
    return 0;
  };
  Schedule.prototype.countBattle = function () {
    if (this._type == ScheduleType.BATTLE) {
      return 1;
    }
    return 0;
  };
  Schedule.prototype.countBaisyun = function () {
    if (this._type == ScheduleType.BAISYUN) {
      return 1;
    }
    return 0;
  };
  Schedule.prototype.countBaisyunPerson = function () {
    if (this._type == ScheduleType.BAISYUN) {
      return this.value();
    }
    return 0;
  };
  Schedule.prototype.countSlaveEnd = function () {
    if (this._type == ScheduleType.SLAVE_END) {
      return 1;
    }
    return 0;
  };
  Schedule.prototype.countNinshin = function () {
    if (this._type == ScheduleType.NINSHIN) {
      return 1;
    }
    if (this._type == ScheduleType.KYOSEI_NINSHIN) {
      return 1;
    }
    return 0;
  };
  Schedule.prototype.countNinshinBanzoku = function () {
    var n = this.countNinshin();
    if (n == 0) {
      return 0;
    }
    var actorId = this.value();
    if (!$gameActors.actor(actorId)) {
      console.error("種親がみつかりません:" + actorId);
      return;
    }
    var taneoyaId = Math.trunc(
      $gameActors.actor(actorId).actor().meta["taneoyaType"]
    );
    if (taneoyaId == TaneoyaId.banzoku) {
      return 1;
    }
    return 0;
  };
  Schedule.prototype.setAcme = function (acme) {
    this._acme = acme;
  };
  Schedule.prototype.countAnalAcme = function () {
    if (this._type == ScheduleType.ANAL_ACME) {
      return this.value();
    }
    return 0;
  };
  Schedule.prototype.countRape = function () {
    if (this._type == ScheduleType.RAPE) {
      return 1;
    }
    if (this._type == ScheduleType.RAPE_PAST) {
      return 1;
    }
    return 0;
  };
  Schedule.prototype.countNikubenki = function () {
    if (this._type == ScheduleType.NIKUBENKI) {
      return 1;
    }
    return 0;
  };
  Schedule.prototype.countFela = function () {
    if (this._type == ScheduleType.FELA_GOKKUN) {
      return this.value();
    }
    if (this._type == ScheduleType.FELA_GOKKUN_NO_DISP) {
      return this.value();
    }
    if (this._type == ScheduleType.FELA_TO7) {
      return this.value();
    }
    if (this._type == ScheduleType.FELA) {
      return this.value();
    }
    return 0;
  };
  Schedule.prototype.countMankoEro = function () {
    if (this._type == ScheduleType.SYUSAN) {
      return SYUSAN_MANKO_UP;
    }
    if (this._type == ScheduleType.MANKO_ERO) {
      return this.value();
    }
    /*if (this._type == ScheduleType.ACCE_ON || this._type == ScheduleType.ACCE_ON2) {
            const armor = $dataArmors[this.value()];
            if (armor.meta['manko_ero']) {
                return parseInt(armor.meta['manko_ero']);
            }
        }*/
    if (this._type == ScheduleType.ACCE_OFF) {
      var armor = $dataArmors[this.value()];
      if (armor.meta["manko_ero"]) {
        return -parseInt(armor.meta["manko_ero"]);
      }
    }
    return this.countNakadashi();
  };
  Schedule.prototype.countAnalEro = function () {
    if (this._type == ScheduleType.ANAL_ERO) {
      return this.value();
    }
    return 0;
  };
  Schedule.prototype.countNakadashi = function () {
    if (this.isNakadashiTyoe()) {
      return this.value();
    }
    return this._nakadashi;
  };
  Schedule.prototype.isNakadashiTyoe = function () {
    switch (this._type) {
      case ScheduleType.NAKADASHI:
      case ScheduleType.TANETSUKE:
      case ScheduleType.TANETSUKE_BACK:
      case ScheduleType.TANETSUKE_IN_PERSON:
      //case ScheduleType.TANETSUKE_DAIJIN:
      case ScheduleType.KAIRAKU_CHOKYO:
      case ScheduleType.LOST_VIRGIN:
      case ScheduleType.BAISYUN:
      case ScheduleType.SEX_TO7:
        return true;
    }
    return false;
  };
  Schedule.prototype.countNakadashiList = function () {
    if (this.isNakadashiTyoe()) {
      var list = this._valueList;
      if (list.length == 0) {
        return [this.countNakadashi()];
      }
      return this._valueList;
    }
    return [this._nakadashi];
  };
  Schedule.prototype.countAnal = function () {
    if (this._type == ScheduleType.ANAL) {
      return this.value();
    }
    return 0;
  };
  Schedule.prototype.countSyusan = function () {
    if (this._type == ScheduleType.SYUSAN) {
      return 1;
    }
    return 0;
  };
  Schedule.prototype.countSyusanType = function (taneoyaType) {
    if (this._type == ScheduleType.SYUSAN) {
      var taneoyaId = this.value();
      if (taneoyaId == taneoyaType) {
        return 1;
      }
    }
    return 0;
  };
  Schedule.prototype.countNinshinDamage = function () {
    if (this._type == ScheduleType.KYOSEI_NINSHIN) {
      return 100;
    }
    if (this._type == ScheduleType.NINSHIN_DAMAGE) {
      return Math.round(this.value() * this.systemNinshinRate());
    }
    if (this._day == 0) {
      return 0;
    }
    var list = this.countNakadashiList();
    var result = 0;
    for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
      var nakadashi = list_1[_i];
      var mankoEro = this.actorHistory().countMankoEro(this._day - 1);
      var n = Math.round(
        this.getNinshinNakadashiCount(nakadashi) * this.ninshinRate(mankoEro)
      );
      if (n == 0) {
        return 0;
      }
      result += Math.max(MIN_NINSHIN_DAMAGE, n);
    }
    return Math.round(result * this.systemNinshinRate());
  };
  Schedule.prototype.systemNinshinRate = function () {
    if (
      this._systemNinshinRate == -1 ||
      this._systemNinshinRate === undefined
    ) {
      this._systemNinshinRate = $gameSystem.ninshinRate();
    }
    return this._systemNinshinRate;
  };
  Schedule.prototype.getNinshinNakadashiCount = function (n) {
    if (n <= 10) {
      return n;
    }
    var result = 0;
    result += 10;
    n -= 10;
    return result + n / 2;
  };
  Schedule.prototype.ninshinRate = function (mankoEro) {
    return 1.6;
    if (mankoEro < 7) {
      return 0.6;
    }
    if (mankoEro < 30) {
      return 0.9;
    }
    if (mankoEro < 200) {
      return 1.1;
    }
    if (mankoEro < 500) {
      return 1.3;
    }
    if (mankoEro < 1000) {
      return 1.7;
    }
    if (mankoEro < 2000) {
      return 1.9;
    }
    return 2.1;
  };
  Schedule.prototype.countAcme = function () {
    if (this._type == ScheduleType.ACME) {
      return this.value();
    }
    if (this._acme < 0) {
      this._acme = this.initAcme();
    }
    return this._acme;
  };
  Schedule.prototype.countAcmeAnal = function () {
    if (this.countAnal() > 0) {
      return this.countAcme();
    }
    return 0;
  };
  Schedule.prototype.countAcmeManko = function () {
    if (this.countAnal() > 0) {
      return 0;
    }
    return this.countAcme();
  };
  Schedule.prototype.isNoAcme = function () {
    if (this._actorId == 2) {
      if (!$gameSwitches.value(922)) {
        return true;
      }
    }
    if (this._actorId == 6) {
      if (!$gameSwitches.value(962)) {
        return true;
      }
    }
    return false;
  };
  Schedule.prototype.initAcme = function () {
    if (this._type == ScheduleType.RAPE) {
      return 0;
    }
    if (this.isNoAcme()) {
      return 0;
    }
    var nakadashi = this.countNakadashi();
    var anal = this.countAnal();
    var n = 0;
    var mankoEro = this.actorHistory().countMankoEro(this._day);
    //p(mankoEro)
    //p(this.acmeRate(mankoEro))
    //p(nakadashi)
    n += Math.round(nakadashi * this.acmeRate(mankoEro));
    var analEro = this.actorHistory().countAnalEro(this._day);
    n += Math.round((anal * this.acmeRate(analEro)) / 5);
    return n;
  };
  Schedule.prototype.acmeRate = function (ero) {
    if (ero < 20) {
      return 0.0;
    }
    if (ero < 75) {
      return 0.2;
    }
    if (ero < 200) {
      return 0.24;
    }
    if (ero < 500) {
      return 0.2;
    }
    if (ero < 1000) {
      return 0.5;
    }
    if (ero < 2000) {
      return 0.6;
    }
    return 0.7;
  };
  Schedule.prototype.actor = function () {
    return $gameActors.actor(this._actorId);
  };
  Schedule.prototype.actorHistory = function () {
    return this.actor().getActorHistory();
  };
  Schedule.prototype.equals = function (id) {
    return this._type + "" == id + "";
  };
  Schedule.prototype.isSexType = function () {
    switch (this._type) {
      case ScheduleType.LOST_VIRGIN:
      case ScheduleType.TANETSUKE:
      case ScheduleType.TANETSUKE_BACK:
      case ScheduleType.TANETSUKE_IN_PERSON:
      case ScheduleType.TANETSUKE_DAIJIN:
      case ScheduleType.TANETSUKE_GRAY:
      case ScheduleType.KAIRAKU_CHOKYO:
      case ScheduleType.ANAL:
      case ScheduleType.ANAL_IN_PERSON:
        return true;
    }
    return false;
  };
  Schedule.prototype.gainMilk = function () {
    if (this._gainMilk) {
      return [];
    }
    if (this._type != ScheduleType.CHICHI) {
      return [];
    }
    this._gainMilk = true;
    var result = [];
    var actor = this.actor();
    var milk = actor.milkItem();
    for (var i = 0; i < actor.milkNum(); i++) {
      result.push(milk);
    }
    return result;
  };
  Schedule.prototype.milk = function () {
    if (this._type != ScheduleType.CHICHI) {
      return [];
    }
    this._gainMilk = true;
    var result = [];
    var actor = this.actor();
    var milk = actor.milkItem();
    for (var i = 0; i < actor.milkNum(); i++) {
      result.push(milk);
    }
    return result;
  };
  Schedule.prototype.lastNakadashiType = function () {
    if (this._type == ScheduleType.SEX_PERSON) {
      return this.value();
    }
    return 0;
  };
  return Schedule;
})();
var Nore;
(function (Nore) {
  var eroActorId = 0;
  var lastIndex = 0;
  var scheduleList;
  var pluginName = "Nore_EroSchedule";
  PluginManager.registerCommand(pluginName, "Open", function (args) {
    var actorId = Math.trunc(args.actorId);
    if (actorId > 0) {
      eroActorId = actorId;
      lastIndex = 0;
      scheduleList = null;
    }
    SceneManager.push(Scene_EroSchedule);
  });
  PluginManager.registerCommand(pluginName, "AddSchedule", function (args) {
    var actorId = Math.trunc(args.actorId);
    var hour = Math.trunc(args.hour);
    var type = findScheduleType(args.scheduleType);
    var actorHistory = $gameSystem.historyManager().getActorHistory(actorId);
    var history = actorHistory.lastHistory();
    history.addSchedule(type, hour);
  });
  function findScheduleType(type) {
    for (
      var _i = 0, SCHEDULE_TYPE_LIST_1 = SCHEDULE_TYPE_LIST;
      _i < SCHEDULE_TYPE_LIST_1.length;
      _i++
    ) {
      var t = SCHEDULE_TYPE_LIST_1[_i];
      if (t == type) {
        return t;
      }
    }
    return null;
  }
  var Scene_EroSchedule = /** @class */ (function (_super) {
    __extends(Scene_EroSchedule, _super);
    function Scene_EroSchedule() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Scene_EroSchedule.prototype.create = function () {
      Scene_MenuBase.prototype.create.call(this);
      this.createScheduleWindow();
    };
    Scene_EroSchedule.prototype.createScheduleWindow = function () {
      var rect = new Rectangle(0, 0, Graphics.boxWidth, Graphics.boxHeight);
      this._scheduleWindow = new Window_EroSchedule(rect, eroActorId);
      //this._scheduleWindow.setHandler('ok', this.onOk.bind(this));
      //this._scheduleWindow.setHandler('change', this.onChange.bind(this));
      //this._scheduleWindow.setHandler('cancel', this.onCancel.bind(this));
      this._scheduleWindow.activate();
      this.addChild(this._scheduleWindow);
      this._scheduleWindow.moveArrow();
    };
    Scene_EroSchedule.prototype.onOk = function () {};
    Scene_EroSchedule.prototype.onChange = function () {};
    Scene_EroSchedule.prototype.onCancel = function () {};
    Scene_EroSchedule.prototype.update = function () {
      _super.prototype.update.call(this);
      if (this._scheduleWindow.isFinished())
        if (Input.isTriggered("ok")) {
          this.popScene();
        }
    };
    Scene_EroSchedule.prototype.popScene = function () {
      eroActorId = 0;
      lastIndex = 0;
      scheduleList = null;
      $gameScreen._brightness = 255;
      _super.prototype.popScene.call(this);
    };
    return Scene_EroSchedule;
  })(Scene_MenuBase);
  Nore.Scene_EroSchedule = Scene_EroSchedule;
  var SCHEDULE_TOP = 100;
  var SCHEDULE_LEFT = 700;
  var SCHEDULE_WIDTH = 200;
  var SCHEDULE_HEIGHT = 24;
  var Sprite_Arrow = /** @class */ (function (_super) {
    __extends(Sprite_Arrow, _super);
    function Sprite_Arrow() {
      var _this = _super.call(this) || this;
      _this.bitmap = ImageManager.loadSystem("arrow");
      _this.x = SCHEDULE_LEFT + SCHEDULE_WIDTH + 40;
      _this.y = _this.yPos(0);
      _this._targetY = _this.y;
      return _this;
    }
    Sprite_Arrow.prototype.move = function (time) {
      this._finished = false;
      this._targetY = this.yPos(time);
    };
    Sprite_Arrow.prototype.yPos = function (time) {
      return SCHEDULE_TOP + time * SCHEDULE_HEIGHT;
    };
    Sprite_Arrow.prototype.setY = function (time) {
      this.y = this.yPos(time);
      this._targetY = this.y;
    };
    Sprite_Arrow.prototype.update = function () {
      _super.prototype.update.call(this);
      if (this.y != this._targetY) {
        if (this._targetY > this.y) {
          this.y += 3;
          this._moving = true;
          if (this.y == this._targetY) {
            this._moving = false;
            this._finished = true;
          }
        }
      }
    };
    Sprite_Arrow.prototype.isFinished = function () {
      return this._finished;
    };
    return Sprite_Arrow;
  })(Sprite);
  var Window_EroSchedule = /** @class */ (function (_super) {
    __extends(Window_EroSchedule, _super);
    function Window_EroSchedule(rect, actorId) {
      var _this = _super.call(this, rect) || this;
      _this._actorId = actorId;
      _this._index = lastIndex;
      _this.refresh();
      _this.createArrow();
      _this.makeCommandList();
      return _this;
    }
    Window_EroSchedule.prototype.createArrow = function () {
      this._arrow = new Sprite_Arrow();
      this.addChild(this._arrow);
      this._arrow.setY(this.indexToTime(this._index));
    };
    Window_EroSchedule.prototype.refresh = function () {
      this.drawAllSchedule();
      this.drawTitle();
      this.drawParameter();
    };
    Window_EroSchedule.prototype.drawParameter = function () {
      this.drawText("Humiliation", 100, 540, 200, "left");
      this.drawText("Pleasure", 100, 570, 200, "left");
      this.drawText("Endurance", 100, 600, 200, "left");
    };
    Window_EroSchedule.prototype.makeCommandList = function () {
      this._commandList = [];
      this._commandList.push(new MoveArrowCommand(this));
      this._commandList.push(new WaitCommand(20));
      this._commandList.push(new BlinkCommand(this));
      this._commandList.push(new CommonEventCommand(this));
      this._commandList.push(new ShowResultCommand(this));
      for (var i = 0; i < this._index; i++) {
        var s = this._schedules[i];
        var result = s.eventResult();
        if (result) {
          this.drawEventResult(s, result);
        }
      }
    };
    Window_EroSchedule.prototype.drawTitle = function () {
      this.drawText("Daily Schedule", 100, 40, 200, "left");
    };
    Window_EroSchedule.prototype.moveArrow = function () {
      var schedule = this.currentSchedule();
      if (!schedule) {
        return;
      }
      if (schedule.hasEvent()) {
        return;
      }
      var result = schedule.eventResult();
      if (result) {
        this.drawEventResult(schedule, result);
        this.playResultSe();
      }
      this._index++;
      this._arrow.move(this.indexToTime(this._index));
    };
    Window_EroSchedule.prototype.playResultSe = function () {
      AudioManager.playSe({ name: "Item2", volume: 90, pitch: 100, pan: 0 });
    };
    Window_EroSchedule.prototype.drawEventResult = function (schedule, result) {
      var yy = SCHEDULE_TOP + SCHEDULE_HEIGHT * this.calcY(schedule);
      var xx = SCHEDULE_LEFT + SCHEDULE_WIDTH + 64;
      var hh = SCHEDULE_HEIGHT * schedule.time();
      this.drawText(
        TextManager.nakadashiCount.format(result.nakadashi()),
        xx,
        yy,
        299,
        "left"
      );
    };
    Window_EroSchedule.prototype.indexToTime = function (index) {
      var n = 0;
      for (var i = 0; i < index; i++) {
        var s = this._schedules[i];
        n += s.time();
      }
      return n;
    };
    Window_EroSchedule.prototype.nextEventIndex = function () {
      for (var i = this._index; i < this._schedules.length; i++) {
        var s = this._schedules[i];
        if (s.hasEvent()) {
          return i;
        }
      }
      return -1;
    };
    Window_EroSchedule.prototype.isFinished = function () {
      return this._finished;
    };
    Window_EroSchedule.prototype.drawAllSchedule = function () {
      if (scheduleList) {
        this._schedules = scheduleList;
      } else {
        var h = $gameSystem.historyManager().getCurrentHistory(this._actorId);
        this._schedules = maker.makeSchedule();
        scheduleList = this._schedules;
      }
      for (var _i = 0, _a = this._schedules; _i < _a.length; _i++) {
        var s = _a[_i];
        this.drawSchedule(s, false);
      }
      for (var i = 0; i <= 24; i += 2) {
        this.drawTime(i);
      }
    };
    Window_EroSchedule.prototype.calcY = function (schedule) {
      var y = 0;
      for (var _i = 0, _a = this._schedules; _i < _a.length; _i++) {
        var s = _a[_i];
        if (s == schedule) {
          return y;
        }
        y += s.time();
      }
      return y;
    };
    Window_EroSchedule.prototype.drawSchedule = function (schedule, blink) {
      var yy = SCHEDULE_TOP + SCHEDULE_HEIGHT * this.calcY(schedule);
      var xx = SCHEDULE_LEFT + 15;
      var hh = SCHEDULE_HEIGHT * schedule.time();
      var color = schedule.color();
      this.contents.fillRect(xx, yy, SCHEDULE_WIDTH, hh, color);
      if (blink) {
        color = schedule.blinkColor();
        this.contents.fillRect(
          xx,
          yy,
          SCHEDULE_WIDTH,
          hh,
          "rgba(250, 150, 150, 0.3)"
        );
      }
      if (schedule.time() >= 2) {
        this.contents.fontSize = 20;
      } else {
        this.contents.fontSize = 14;
        yy -= 8;
      }
      this.drawText(schedule.text(), xx + 10, yy, SCHEDULE_WIDTH / 2, "left");
    };
    Window_EroSchedule.prototype.drawTime = function (time) {
      var yy = SCHEDULE_TOP + SCHEDULE_HEIGHT * time - 18;
      var xx = SCHEDULE_LEFT - 40;
      this.drawText(time, xx, yy, 30, "right");
    };
    Window_EroSchedule.prototype.update = function () {
      _super.prototype.update.call(this);
      if (this._arrow.isFinished()) {
        this.moveArrow();
        //SceneManager.pop();
      }
      this.updateCommand();
    };
    Window_EroSchedule.prototype.updateCommand = function () {
      if (!this._commandList || this._commandList.length == 0) {
        return;
      }
      var command = this._commandList[0];
      //p(command)
      command.update();
      if (command.isFinished()) {
        this._commandList.shift();
      }
    };
    Window_EroSchedule.prototype.currentSchedule = function () {
      var schedule = this._schedules[this._index];
      return schedule;
    };
    Window_EroSchedule.prototype.blink = function (blink) {
      var schedule = this._schedules[this._index];
      this.drawSchedule(schedule, blink);
    };
    Window_EroSchedule.prototype.index = function () {
      return this._index;
    };
    Window_EroSchedule.prototype.drawFinish = function () {
      this._finished = true;
      this.drawText("Day has ended.", 100, 70, 200, "left");
      AudioManager.playSe({ name: "Chime2", volume: 80, pitch: 100, pan: 0 });
    };
    return Window_EroSchedule;
  })(Window_Base);
  var Command = /** @class */ (function () {
    function Command() {}
    Command.prototype.update = function () {};
    Command.prototype.isFinished = function () {
      return this._finished;
    };
    Command.prototype.name = function () {
      return "Command";
    };
    return Command;
  })();
  var MoveArrowCommand = /** @class */ (function (_super) {
    __extends(MoveArrowCommand, _super);
    function MoveArrowCommand(window) {
      var _this = _super.call(this) || this;
      _this._window = window;
      return _this;
    }
    MoveArrowCommand.prototype.update = function () {
      _super.prototype.update.call(this);
      var shecule = this._window.currentSchedule();
      if (!shecule || shecule.hasEvent()) {
        this._finished = true;
      }
    };
    MoveArrowCommand.prototype.name = function () {
      return "MoveArrowCommand";
    };
    return MoveArrowCommand;
  })(Command);
  var WaitCommand = /** @class */ (function (_super) {
    __extends(WaitCommand, _super);
    function WaitCommand(frame) {
      var _this = _super.call(this) || this;
      _this._frame = frame;
      return _this;
    }
    WaitCommand.prototype.update = function () {
      _super.prototype.update.call(this);
      this._frame--;
      if (this._frame <= 0) {
        this._finished = true;
      }
    };
    WaitCommand.prototype.name = function () {
      return "WaitCommand";
    };
    return WaitCommand;
  })(Command);
  var BlinkCommand = /** @class */ (function (_super) {
    __extends(BlinkCommand, _super);
    function BlinkCommand(window) {
      var _this = _super.call(this) || this;
      _this._window = window;
      _this._initialFrame = _this._frame = 80;
      _this._duration = 8;
      _this._blink = false;
      return _this;
    }
    BlinkCommand.prototype.update = function () {
      _super.prototype.update.call(this);
      if (!this._window.currentSchedule()) {
        this._finished = true;
        return;
      }
      if (this._frame % this._duration == 0) {
        this._window.blink(this._blink);
        this._blink = !this._blink;
      }
      this._frame--;
      if (this._frame <= 0) {
        this._finished = true;
      }
    };
    BlinkCommand.prototype.name = function () {
      return "BlinkCommand";
    };
    return BlinkCommand;
  })(Command);
  var CommonEventCommand = /** @class */ (function (_super) {
    __extends(CommonEventCommand, _super);
    function CommonEventCommand(window) {
      var _this = _super.call(this) || this;
      _this._window = window;
      return _this;
    }
    CommonEventCommand.prototype.update = function () {
      _super.prototype.update.call(this);
      var schedule = this._window.currentSchedule();
      if (!schedule) {
        this._finished = true;
        return;
      }
      schedule.finishEvent();
      var commonEventId = schedule.commonEventId();
      if (commonEventId) {
        $gameSwitches.setValue(41, true);
        $gameTemp.reserveCommonEvent(commonEventId);
        lastIndex = this._window.index();
        SceneManager.pop();
      }
    };
    CommonEventCommand.prototype.name = function () {
      return "CommonEventCommand";
    };
    return CommonEventCommand;
  })(Command);
  var ShowResultCommand = /** @class */ (function (_super) {
    __extends(ShowResultCommand, _super);
    function ShowResultCommand(window) {
      var _this = _super.call(this) || this;
      _this._window = window;
      return _this;
    }
    ShowResultCommand.prototype.update = function () {
      _super.prototype.update.call(this);
      this._finished = true;
      this._window.drawFinish();
    };
    ShowResultCommand.prototype.name = function () {
      return "ShowResultCommand";
    };
    return ShowResultCommand;
  })(Command);
})(Nore || (Nore = {}));
