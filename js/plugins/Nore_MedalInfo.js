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
var MEDAL_IFNO = {
  198: ["departure", 5],
  199: ["departure", 10],
  200: ["departure", 1],
  201: ["victory", 1],
  202: ["victory", 10],
  203: ["victory", 30],
  204: ["victory", 50],
  205: ["victory", 75],
  206: ["victory", 100],
  208: ["firstTurnSkill", 50],
  211: ["gold", 53],
  212: ["gold", 600],
  213: ["gold", 2500],
  214: ["gold", 5000],
  215: ["gold", 7500],
  216: ["gold", 10000],
  //217: ['defeat', 1],
  //218: ['defeat', 5],
  //219: ['defeat', 10],
  217: ["death", 1],
  218: ["death", 5],
  219: ["death", 10],
  220: ["death", 20],
  221: ["exp", 200],
  222: ["exp", 1000],
  223: ["exp", 2000],
  224: ["exp", 4000],
  225: ["exp", 6000],
  231: ["nodamage", 1],
  232: ["nodamage", 5],
  233: ["nodamage", 15],
  234: ["nodamage", 30],
  235: ["nodamage", 50],
  237: ["overkill", 10],
  238: ["overkill", 30],
  239: ["overkill", 50],
  247: ["disposeItem", 1],
  243: ["damage", 500],
  244: ["damage", 1500],
  245: ["damage", 5000],
  246: ["damage", 10000],
  251: ["rape", 1],
  252: ["rape", 2],
  254: ["autoBattle", 1],
  261: ["normalAttack", 100],
  262: ["normalAttack", 200],
  263: ["normalAttack", 500],
  264: ["normalAttack", 1000],
  266: ["shieldZero", 10],
  271: ["finishBlow", 10],
  272: ["finishBlow", 50],
  273: ["finishBlow", 100],
  275: ["mikiri", 1],
  276: ["mikiri", 5],
  277: ["mikiri", 8],
  286: ["treasure", 10],
  287: ["treasure", 30],
  289: ["guard", 10],
  291: ["break", 3],
  292: ["break", 100],
  294: ["magic", 10],
  295: ["magic", 50],
  296: ["magic", 100],
  297: ["magic", 200],
  298: ["magicDamage", 150],
  539: ["item1", 1],
  545: ["hScene", 10],
  400: ["maxDamage", 50],
  401: ["maxDamage", 80],
  402: ["maxDamage", 120],
  410: ["medal", 30],
  411: ["medal", 50],
  415: ["crystal", 200],
  419: ["gratia", 1],
  565: ["critical", 5],
  566: ["critical", 10],
  567: ["critical", 20],
  568: ["critical", 40],
  581: ["weaponPowerUp", 1],
  582: ["weaponPowerUp", 10],
  583: ["weaponPowerUp", 50],
  584: ["weaponPowerUp", 100],
  585: ["weaponPowerUp", 150],
  593: ["rare", 5],
  594: ["rare", 15],
  595: ["rare", 50],
  //598: ['damage', 1000],
  600: ["notRare", 50],
  606: ["fireDeath", 1],
  607: ["fireDeath", 5],
  625: ["step", 1000],
  626: ["step", 2500],
  627: ["step", 5000],
  628: ["criticalGun", 1],
  629: ["criticalGun", 10],
  635: ["item", 50],
  301: ["skill1", 10],
  302: ["skill1", 30],
  303: ["skill1", 50],
  304: ["skill1", 100],
  305: ["skill1", 150],
  306: ["skill1", 200],
  311: ["skill2", 10],
  312: ["skill2", 30],
  313: ["skill2", 50],
  314: ["skill2", 70],
  315: ["skill2", 120],
  316: ["skill2", 150],
  321: ["skill7", 10],
  322: ["skill7", 30],
  323: ["skill7", 50],
  324: ["skill7", 70],
  325: ["skill7", 120],
  326: ["skill7", 150],
  331: ["skill3", 10],
  332: ["skill3", 30],
  333: ["skill3", 50],
  334: ["skill3", 70],
  335: ["skill3", 120],
  336: ["skill3", 150],
  341: ["skill4", 10],
  342: ["skill4", 30],
  343: ["skill4", 50],
  344: ["skill4", 70],
  345: ["skill4", 120],
  346: ["skill4", 150],
  351: ["skill5", 10],
  352: ["skill5", 30],
  353: ["skill5", 50],
  354: ["skill5", 70],
  355: ["skill5", 120],
  356: ["skill5", 140],
  361: ["skill6", 10],
  362: ["skill6", 30],
  363: ["skill6", 50],
  364: ["skill6", 70],
  365: ["skill6", 120],
  366: ["skill6", 140],
  371: ["skill10", 10],
  372: ["skill10", 30],
  373: ["skill10", 50],
  374: ["skill10", 65],
  375: ["skill10", 80],
  376: ["skill10", 100],
  381: ["skill12", 10],
  382: ["skill12", 30],
  383: ["skill12", 50],
  384: ["skill12", 65],
  385: ["skill12", 80],
  386: ["skill12", 100],
  405: ["kubihane", 10],
  423: ["elite", 8],
  682: ["gun", 50],
  683: ["gun", 100],
  684: ["gun", 200],
  685: ["gun", 300],
  691: ["lethal", 1],
  692: ["lethal", 10],
  693: ["lethal", 30],
  694: ["lethal", 50],
  701: ["tsuigeki", 1],
  702: ["tsuigeki", 10],
  703: ["tsuigeki", 30],
  704: ["tsuigeki", 50],
  705: ["tsuigeki", 100],
  706: ["tsuigeki", 150],
  707: ["tsuigeki", 200],
  709: ["attack", 50],
  710: ["attack", 200],
  711: ["attack", 500],
  713: ["level", 20],
  714: ["level", 50],
  721: ["enemy1", 20],
  722: ["enemy2", 30],
  723: ["enemy3", 30],
  724: ["enemy4", 30],
  725: ["enemy5", 30],
  726: ["enemy6", 30],
  727: ["enemy7", 30],
  728: ["enemy8", 30],
  741: ["floorDown1", 4],
  742: ["floorDown2", 6],
  743: ["floorDown3", 7],
  744: ["floorDown4", 7],
  745: ["floorDown5", 7],
  746: ["floorDown6", 8],
  747: ["floorDown7", 8],
  748: ["floorDown8", 10],
};
var MedalUpdateInfo = /** @class */ (function () {
  function MedalUpdateInfo() {
    this.updateMap = {};
  }
  MedalUpdateInfo.prototype.onUpdate = function (
    medalId,
    name,
    before,
    plus,
    base
  ) {
    if (name == "step") {
      return false;
    }
    if (!$gameParty.inDungeon()) {
      return false;
    }
    //var realName = NAME_MAP[name];
    var next = this.findMedalNext(name, before);
    if (!next) {
      return false;
    }
    this.updateMap[name] = this.updateMap[name] || {
      medalId: medalId,
      name: name,
      before: 0,
      plus: 0,
      next: next,
      base: 0,
    };
    var info = this.updateMap[name];
    info.plus += plus;
    if (info.before === 0) {
      info.before = before;
      info.base = base;
    }
    return true;
  };
  MedalUpdateInfo.prototype.nextInfo = function () {
    var min;
    for (var key in this.updateMap) {
      var info = this.updateMap[key];
      if (!min || min.medalId > info.medalId) {
        min = info;
      }
      break;
    }
    if (!min) {
      return null;
    }
    delete this.updateMap[min.name];
    return min;
  };
  MedalUpdateInfo.prototype.findMedalNext = function (name, before) {
    var min = 999999;
    var found = false;
    for (var id in MEDAL_IFNO) {
      var info = MEDAL_IFNO[id];
      if (info[0] != name) {
        continue;
      }
      var value = info[1];
      if (value <= before) {
        continue;
      }
      if (min > value) {
        min = value;
        found = true;
      }
    }
    if (found) {
      return min;
    }
  };
  return MedalUpdateInfo;
})();
var Sprite_MedalUpdateLine = /** @class */ (function (_super) {
  __extends(Sprite_MedalUpdateLine, _super);
  function Sprite_MedalUpdateLine() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  Sprite_MedalUpdateLine.prototype.initialize = function (info) {
    _super.prototype.initialize.call(this);
    this.createBitmap();
    this._info = info;
    this._drawIndex = 0;
    this.draw();
    var self = this;
    self.off("removed");
    this.on("removed", function () {
      Saba.putContentsCache(self.bitmap, self.bitmap.width, self.bitmap.height);
    });
  };
  Sprite_MedalUpdateLine.prototype.createBitmap = function () {
    var b = Saba.getContentsCache(340, 78);
    if (b) {
      this.bitmap = b;
      this.bitmap.clear();
    } else {
      this.bitmap = new Bitmap(340, 78);
    }
    this.bitmap.fontSize = 22;
  };
  Sprite_MedalUpdateLine.prototype.update = function () {
    _super.prototype.update.call(this);
    this._drawIndex++;
    this.draw();
  };
  Sprite_MedalUpdateLine.prototype.draw = function () {
    var info = this._info;
    var total = info.next;
    var base = info.base;
    var per = this.getPer();
    var value = info.plus * per + info.before;
    var rate;
    if (total == base) {
      rate = 0;
    } else {
      rate = Math.min(1, (value - base) / (total - base));
    }
    if (rate < 0) {
      rate = 0;
    }
    this.updateAlpha();
    if (this._lastRate == rate) {
      return;
    }
    this._lastRate = rate;
    this.bitmap.clear();
    this.bitmap.fillRect(0, 0, 340, 34, "rgba(0, 0, 0, 0.3)");
    var neme = NAME_MAP[info.name];
    if (!neme) {
      p(info.name);
    }
    var xx = 5;
    var color1 = this.hpGaugeColor1();
    var color2 = this.hpGaugeColor2();
    if (rate === 1) {
      //color1 = this.hpGaugeColor2();
      //color2 = this.hpGaugeColor2();
      color1 = this.textColor(24);
      color2 = this.textColor(24);
      AudioManager.playSe({ name: "Chime2", volume: 90, pitch: 100, pan: 0 });
      this.bitmap.textColor = this.textColor(24);
      this.showItemLog();
    } else {
      this.bitmap.textColor = this.normalColor();
    }
    this.bitmap.drawText(neme, xx, 0, 160, 32, "right");
    try {
      this.drawGauge(168 + xx, 0, 140, rate, color1, color2);
    } catch (_a) {
      console.error("error");
      p(info);
    }
  };
  Sprite_MedalUpdateLine.prototype.showItemLog = function () {
    var info = this._info;
    var medalId = parseInt(info.medalId);
    if (medalId > 0 && $gameMedals.hasMedal(medalId)) {
      info.medalId = 0;
      var newMedal = $dataArmors[medalId];
      var isShowLog = $gameSwitches.value(1);
      $gameSwitches.setValue(1, true);
      $gameTemp.addItemLog(newMedal);
      $gameSwitches.setValue(1, isShowLog);
      var gold = parseInt(newMedal.meta["gold"]);
      if (gold > 0) {
        $gameVariables.setValue(20, gold);
        $gameTemp.addItemLog($dataItems[19]);
      }
    }
  };
  Sprite_MedalUpdateLine.prototype.getPer = function () {
    var start = 45;
    if (this._drawIndex <= start) {
      return 0;
    }
    if (this._drawIndex >= start + 30) {
      return 1;
    }
    return (this._drawIndex - start) / 30;
  };
  Sprite_MedalUpdateLine.prototype.updateAlpha = function () {
    if (this._drawIndex <= 330) {
      return;
    }
    this.alpha -= 0.03;
  };
  return Sprite_MedalUpdateLine;
})(Sprite);
var $medalUpdate = new MedalUpdateInfo();
function getMedalDescription(armor) {
  var text = armor.description;
  if (armor.meta["hint"]) {
    var value = findMedalValue(armor);
    var name_1 = "";
    if (armor.meta["actor"]) {
      var actorId = parseInt(armor.meta["actor"]);
      var actor = $gameActors.actor(actorId);
      name_1 = actor.name();
    }
    if (armor.meta["before"]) {
      var before = Math.trunc(armor.meta["before"]);
      if (!$gameMedals.hasMedal(before)) {
        return "？？？";
      }
    }
    var hintText = armor.meta["hint"];
    if (ConfigManager.language == "en" && armor.meta["hintEn"]) {
      hintText = armor.meta["hintEn"];
    }
    text =
      "\\C[16]" +
      TextManager.medalCondition +
      ":\\C[0] " +
      hintText.format(value, name_1) +
      "\n";
  }
  var plusText = getPlusText(armor);
  if (plusText.length > 1) {
    text += "\\C[16]" + TextManager.medalEffect + ":\\C[0] " + plusText;
  }
  if (armor.meta["gold"]) {
    text +=
      "\\C[16]" +
      TextManager.medalEffect2 +
      ":\\C[0] " +
      TextManager.medalGold.format(armor.meta["gold"]);
  }
  if (armor.meta["skillPoint"]) {
    text +=
      "\\C[16]" +
      TextManager.medalEffect2 +
      ":\\C[14] " +
      armor.meta["skillPoint"] +
      " SP Obtained\\C[0]";
  }
  return text;
}
function findMedalValue(armor) {
  var list = MEDAL_IFNO[armor.id];
  if (!list) {
    return 0;
  }
  return list[1];
}
function getPlusText(armor) {
  var textFormat = "\\C[2]%1\\C[0] +%2　 ";
  var text = "";
  if (armor.params[0] > 0) {
    text += textFormat.format("ＨＰ", armor.params[0]);
  }
  if (armor.params[2] > 0) {
    text += textFormat.format("ＡＴＫ", armor.params[2]);
  }
  if (armor.params[3] > 0) {
    text += "\\C[2]ＤＥＦ\\C[0] +" + armor.params[3] + "　 ";
  }
  if (armor.params[4] > 0) {
    text += "\\C[2]ＭＡＴ\\C[0] +" + armor.params[4] + "　 ";
  }
  if (armor.params[5] > 0) {
    text += "\\C[2]ＭＤＦ\\C[0] +" + armor.params[5] + " ";
  }
  if (armor.params[7] > 0) {
    text += "\\C[2]ＳＨ\\C[0] +" + armor.params[7] + " ";
  }
  if (armor.meta["str"]) {
    text += "\\C[2]" + TextManager.str + "\\C[0] +" + armor.meta["str"] + " ";
  }
  if (armor.meta["dex"]) {
    text += "\\C[2]" + TextManager.dex + "\\C[0] +" + armor.meta["dex"] + " ";
  }
  if (armor.meta["mgc"]) {
    text += "\\C[2]" + TextManager.mgc + "\\C[0] +" + armor.meta["mgc"] + " ";
  }
  if (armor.meta["vit"]) {
    text += "\\C[2]" + TextManager.vit + "\\C[0] +" + armor.meta["vit"] + " ";
  }
  if (armor.meta["agi"]) {
    text += "\\C[2]" + TextManager.agi + "\\C[0] +" + armor.meta["agi"] + " ";
  }
  if (armor.meta["luk"]) {
    text += "\\C[2]" + TextManager.luk + "\\C[0] +" + armor.meta["luk"] + " ";
  }
  if (armor.meta["goldUp"]) {
    text +=
      "\\C[2]" + TextManager.goldUp + "\\C[0] +" + armor.meta["goldUp"] + "％ ";
  }
  if (armor.meta["crystalUp"]) {
    text +=
      "\\C[2]" +
      TextManager.crystalUp +
      "\\C[0] +" +
      armor.meta["crystalUp"] +
      "％ ";
  }
  if (armor.meta["criStun"]) {
    text += "\\C[2]" + TextManager.criStun + "\\C[0] ";
  }
  if (armor.meta["gunDamagePlus"]) {
    text +=
      "\\C[2]" +
      TextManager.gunDamagePlus +
      "\\C[0] +" +
      armor.meta["gunDamagePlus"] +
      " ";
  }
  if (armor.meta["tsuigeki"]) {
    text +=
      "\\C[2]" +
      TextManager.tsuigeki +
      "\\C[0] +" +
      armor.meta["tsuigeki"] +
      "％ ";
  }
  if (armor.meta["startItem"]) {
    var item = $dataItems[armor.meta["startItem"]];
    if (armor.meta["startItem2"]) {
      var item2 = $dataItems[armor.meta["startItem2"]];
      var item3 = $dataItems[armor.meta["startItem3"]];
      if (item3) {
        text +=
          "\\C[2]Can start an adventure with " +
          item.name +
          "," +
          item2.name +
          "," +
          item3.name +
          " in possession";
      } else {
        text +=
          "\\C[2]\\C[2]Can start an adventure with " +
          item.name +
          "," +
          item2.name +
          " in possession";
      }
    } else {
      text += "\\C[2]Can start an adventure with " + item.name + " in possession";
    }
  }
  if (armor.meta["expUp"]) {
    text +=
      "\\C[2]" + TextManager.expUp + "\\C[0] +" + armor.meta["expUp"] + "% ";
  }
  if (armor.meta["drop"]) {
    text +=
      "\\C[2]" + TextManager.drop + "\\C[0] +" + armor.meta["drop"] + "% ";
  }
  if (armor.meta["rare"] && parseInt(armor.meta["rare"]) > 0) {
    text +=
      "\\C[2]" + TextManager.rare + "\\C[0] +" + armor.meta["rare"] + "% ";
  }
  if (armor.meta["damage"]) {
    text +=
      "\\C[2]" + TextManager.damage + "\\C[0] +" + armor.meta["damage"] + "% ";
  }
  if (armor.meta["skillDamage"]) {
    text +=
      "\\C[2]" +
      TextManager.skillDamage +
      "\\C[0] +" +
      armor.meta["skillDamage"] +
      "% ";
  }
  if (armor.meta["weaponBonus"]) {
    text +=
      "\\C[2]" +
      TextManager.weaponBonus +
      "\\C[0] +" +
      armor.meta["weaponBonus"] +
      "% ";
  }
  if (armor.meta["lethal"]) {
    text +=
      "\\C[2]" + TextManager.lethal + "\\C[0] +" + armor.meta["lethal"] + " ";
  }
  if (armor.meta["stage"]) {
    text += "\\C[2]" + "Chapter" + armor.meta["stage"] + " is valid\\C[0]  ";
  }
  if (armor.etypeId != 1) {
    for (var _i = 0, _a = armor.traits; _i < _a.length; _i++) {
      var trail = _a[_i];
      if (trail.code == 22 && trail.dataId == 0) {
        text +=
          "\\C[2]" + TextManager.hit + "\\C[0] +" + trail.value * 100 + "% ";
      }
      if (trail.code == 22 && trail.dataId == 2) {
        text +=
          "\\C[2]" + TextManager.cri + "\\C[0] +" + trail.value * 100 + "% ";
      }
    }
  }
  if (armor.meta["skillDamagePlus"]) {
    text += textFormat.format(
      TextManager.medalSkillDamagePlus,
      armor.meta["skillDamagePlus"]
    );
  }
  if (armor.meta["skillRecoveryPlus"]) {
    text += textFormat.format(
      TextManager.medalSkillRecoveryPlus,
      armor.meta["skillRecoveryPlus"]
    );
  }
  if (armor.meta["finishBlow"]) {
    text += textFormat.format(
      TextManager.medalFinishBlow,
      armor.meta["finishBlow"]
    );
  }
  if (armor.meta["guardRate"]) {
    text += textFormat.format(
      TextManager.medalGuardRate,
      armor.meta["guardRate"]
    );
  }
  if (armor.atypeId >= 9) {
    text += $dataSystem.armorTypes[armor.atypeId] + "　";
  }
  return text;
}
function getMedalHintDescription(armor) {
  var value = findMedalValue(armor);
  if (armor.meta["before"]) {
    var before = Math.trunc(armor.meta["before"]);
    if (!$gameMedals.hasMedal(before)) {
      return "？？？";
    }
  }
  var text =
    "\\C[16]Condtions: \\C[0]" + armor.meta["hint"].format(value) + "\n";
  var plusText = getPlusText(armor);
  if (plusText.length > 1) {
    text += "\\C[16]" + TextManager.medalEffect + ":\\C[0]" + plusText;
  }
  return text;
}
