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
var EquipParamType;
(function (EquipParamType) {
  EquipParamType[(EquipParamType["hp"] = 0)] = "hp";
  EquipParamType[(EquipParamType["mp"] = 1)] = "mp";
  EquipParamType[(EquipParamType["shield"] = 2)] = "shield";
  EquipParamType[(EquipParamType["atk"] = 3)] = "atk";
  EquipParamType[(EquipParamType["def"] = 4)] = "def";
  EquipParamType[(EquipParamType["mat"] = 5)] = "mat";
  EquipParamType[(EquipParamType["mdf"] = 6)] = "mdf";
  EquipParamType[(EquipParamType["skillDamage"] = 7)] = "skillDamage";
  EquipParamType[(EquipParamType["skillRecoveryPlus"] = 8)] =
    "skillRecoveryPlus";
  EquipParamType[(EquipParamType["exp"] = 9)] = "exp";
  EquipParamType[(EquipParamType["gold"] = 10)] = "gold";
  EquipParamType[(EquipParamType["finishBlow"] = 11)] = "finishBlow";
})(EquipParamType || (EquipParamType = {}));
function getAllEquipParamTypes() {
  return [
    EquipParamType.hp,
    EquipParamType.mp,
    EquipParamType.shield,
    EquipParamType.atk,
    EquipParamType.def,
    EquipParamType.mat,
    EquipParamType.mdf,
    EquipParamType.skillDamage,
    EquipParamType.skillRecoveryPlus,
    EquipParamType.exp,
    EquipParamType.gold,
    EquipParamType.finishBlow,
  ];
}
var Item = /** @class */ (function () {
  function Item(temp) {
    if (temp === void 0) {
      temp = false;
    }
    this._temp = temp;
    if (!temp) {
      this._id = $gameSystem.nextEquipId();
    } else {
      this._id = 0;
    }
  }
  Item.prototype.isArmor = function () {
    return DataManager.isArmor(this.item());
  };
  Item.prototype.isWeapon = function () {
    return DataManager.isWeapon(this.item());
  };
  Item.prototype.lv = function () {
    return 0;
  };
  Item.prototype.meta = function () {
    return this.item().meta;
  };
  Item.prototype.isCursed = function () {
    return false;
  };
  return Item;
})();
var UsableItem = /** @class */ (function (_super) {
  __extends(UsableItem, _super);
  function UsableItem(item) {
    var _this = _super.call(this, true) || this;
    _this._itemId = item.id;
    return _this;
  }
  UsableItem.prototype.item = function () {
    return $dataItems[this._itemId];
  };
  UsableItem.prototype.description = function () {
    return this.item().description;
  };
  UsableItem.prototype.name = function () {
    return getItemName(this.item());
  };
  UsableItem.prototype.iconIndex = function () {
    return this.item().iconIndex;
  };
  UsableItem.prototype.price = function () {
    return this.item().price;
  };
  return UsableItem;
})(Item);
var Equip = /** @class */ (function (_super) {
  __extends(Equip, _super);
  function Equip(temp, enchantList) {
    if (temp === void 0) {
      temp = false;
    }
    if (enchantList === void 0) {
      enchantList = null;
    }
    var _this = _super.call(this, temp) || this;
    _this._enchantList = [];
    if (enchantList) {
      _this._enchantList = enchantList;
    } else {
      _this.selectEnchant();
    }
    return _this;
  }
  Equip.prototype.getMiniNum = function () {
    if (this.hp() > 0) {
      return new MiniNum(MinuNumType.HP, this.hp());
    }
    if (this.mp() > 0) {
      return new MiniNum(MinuNumType.MP, this.mp());
    }
    if (this.atk() > 0) {
      return new MiniNum(MinuNumType.ATK, this.atk());
    }
    if (this.def() > 0) {
      return new MiniNum(MinuNumType.DEF, this.def());
    }
    if (this.mat() > 0) {
      return new MiniNum(MinuNumType.MAT, this.mat());
    }
    if (this.mdf() > 0) {
      return new MiniNum(MinuNumType.MDF, this.mdf());
    }
    if (this.shield() > 0) {
      return new MiniNum(MinuNumType.SH, this.shield());
    }
    if (this.skillDamagePlus() > 0) {
      return new MiniNum(MinuNumType.SD, this.skillDamagePlus());
    }
    if (this.skillRecoveryPlus() > 0) {
      return new MiniNum(MinuNumType.SD, this.skillRecoveryPlus());
    }
    if (this.expUp() > 0) {
      return new MiniNum(MinuNumType.EXP, this.expUp(), true);
    }
    if (this.goldUp() > 0) {
      return new MiniNum(MinuNumType.GOLD, this.goldUp(), true);
    }
    if (this.finishBlow() > 0) {
      return new MiniNum(MinuNumType.FB, this.finishBlow());
    }
    if (this.crystalUp() > 0) {
      return new MiniNum(MinuNumType.CRY, this.crystalUp(), true);
    }
    return null;
  };
  Equip.prototype.sortValue = function () {
    return this.item().id;
  };
  Equip.prototype.isMedal = function () {
    return this.etypeId() == MEDAL_ETYPE_ID;
  };
  Equip.prototype.selectEnchant = function () {
    if (this._temp) {
      return;
    }
    var dice = Math.random();
    if ($gameSwitches.value(Nore.ELITE_TREASURE_SW_ID)) {
      //エリート宝箱はエンチャント率100%
    } else {
      if (dice < 0.5) {
        return;
      }
    }
    var candidates = [
      EnchantType.ATK_DOWN,
      EnchantType.CRITICAL,
      EnchantType.SHIELD_UP,
      EnchantType.FLAME,
    ];
    //const candidates = [EnchantType.CRITICAL];
    var list = Nore.shuffle(candidates);
    var enchant = list.pop();
    this._enchantList.push(enchant);
  };
  Equip.prototype.enchantList = function () {
    if (!this.hasSkill()) {
      return [];
    }
    return this._enchantList;
  };
  Equip.prototype.skill = function () {
    if (this.skills().length > 0) {
      return this.skills()[0];
    }
    return null;
  };
  Equip.prototype.skills = function () {
    var result = [];
    if (!this.hasSkill()) {
      return result;
    }
    if (!this._enchantList) {
      return result;
    }
    for (var _i = 0, _a = this.enchantList(); _i < _a.length; _i++) {
      var e = _a[_i];
      var enchant = $enchantManager.makeEnchant(e);
      if (enchant.skill()) {
        result.push(enchant.skill());
      }
    }
    return result;
  };
  Equip.prototype.armor = function () {
    if (this.armors().length > 0) {
      return this.armors()[0];
    }
    return null;
  };
  Equip.prototype.armors = function () {
    var result = [];
    if (!this.hasSkill()) {
      return result;
    }
    if (!this._enchantList) {
      return result;
    }
    for (var _i = 0, _a = this.enchantList(); _i < _a.length; _i++) {
      var e = _a[_i];
      var enchant = $enchantManager.makeEnchant(e);
      if (enchant.armor()) {
        result.push(enchant.armor());
      }
    }
    return result;
  };
  Equip.prototype.id = function () {
    return this._id;
  };
  Equip.prototype.hp = function () {
    return this.item().params[0];
  };
  Equip.prototype.mp = function () {
    return this.item().params[1];
  };
  Equip.prototype.atk = function () {
    return this.item().params[2];
  };
  Equip.prototype.def = function () {
    return this.item().params[3];
  };
  Equip.prototype.mat = function () {
    return this.item().params[4];
  };
  Equip.prototype.mdf = function () {
    return this.item().params[5];
  };
  Equip.prototype.shield = function () {
    var n = this.item().params[7];
    if (this.hasEnchant(EnchantType.SHIELD_UP)) {
      n++;
    }
    return n;
  };
  Equip.prototype.exp = function () {
    var exp = this.item().meta["exp"];
    if (!exp) {
      return 0;
    }
    return $gameSystem.calcCursedArmorExp();
  };
  Equip.prototype.iconIndex = function () {
    return this.item().iconIndex;
  };
  Equip.prototype.name = function () {
    return this.preText() + getItemName(this.item());
  };
  Equip.prototype.hasEnchant = function (e) {
    if (!this._enchantList) {
      return false;
    }
    return this._enchantList.contains(e);
  };
  Equip.prototype.meta = function (equipMeta) {
    var meta = this.item().meta;
    if (meta[equipMeta]) {
      var num = parseInt(meta[equipMeta]);
      if (isNaN(num)) {
        return 1;
      }
      return num;
    }
    return 0;
  };
  Equip.prototype.param = function (paramId) {
    if (paramId == 8 || paramId == 9) {
      return 0;
    }
    if (paramId == 10) {
      return this.critUp() * 100;
    }
    if (paramId == 11) {
      if (this.hasEnchant(EnchantType.FLAME)) {
        return 1;
      }
      return 0;
    }
    if (paramId == 12) {
      return this.spPlus();
    }
    var n = this.item().params[paramId];
    for (var _i = 0, _a = this.armors(); _i < _a.length; _i++) {
      var a = _a[_i];
      n += a.params[paramId];
    }
    return n;
  };
  Equip.prototype.lv = function () {
    var n = parseInt(this.item().meta["lv"]);
    if (isNaN(n)) {
      return 0;
    }
    return n;
  };
  Equip.prototype.etypeId = function () {
    return this.item().etypeId;
  };
  Object.defineProperty(Equip.prototype, "traits", {
    get: function () {
      return this.item().traits;
    },
    enumerable: true,
    configurable: true,
  });
  Equip.prototype.preText = function () {
    for (var _i = 0, _a = this.skills(); _i < _a.length; _i++) {
      var s = _a[_i];
      return this.elementName(s);
    }
    for (var _b = 0, _c = this.armors(); _b < _c.length; _b++) {
      var a = _c[_b];
      return this.elementName(a);
    }
    return "";
  };
  Equip.prototype.elementName = function (a) {
    switch (ConfigManager.language) {
      case "en":
        if (a.meta["nameEn"]) {
          return a.meta["nameEn"];
        }
        break;
      case "ch":
      case "jp":
        break;
    }
    return a.name;
  };
  Equip.prototype.description = function () {
    var text = "";
    text += this.paramUpTexts();
    if (text.length > 0) {
      text += "\n";
    }
    text += this.enchantTexts();
    text += this.exclusiveTexts();
    return text;
  };
  /**
   * 専用装備のテキスト
   */
  Equip.prototype.exclusiveTexts = function () {
    return "";
  };
  Equip.prototype.paramUpTexts = function () {
    var text = "";
    var textFormat = "\\C[2]%1\\C[0] +%2　 ";
    var textFormat2 = "\\C[2]%1\\C[0]　 ";
    if (this.hp() > 0) {
      text += textFormat.format("HP", this.hp());
    }
    if (this.atk() > 0) {
      text += textFormat.format("ATK", this.atk());
    }
    if (this.def() > 0) {
      text += textFormat.format("DEF", this.def());
    }
    if (this.mat() > 0) {
      text += textFormat.format("MAT", this.mat());
    }
    if (this.mdf() > 0) {
      text += textFormat.format("MDF", this.mdf());
    }
    if (this.shield() > 0) {
      text += textFormat.format("SHIELD", this.shield());
    }
    if (this.critUp() > 0) {
      text += textFormat.format("CRIT", this.critUp() * 100);
    }
    if (this.skillDamagePlus() > 0) {
      text += textFormat.format(
        TextManager.medalSkillDamagePlus,
        this.skillDamagePlus()
      );
    }
    if (this.skillRecoveryPlus() > 0) {
      text += textFormat.format(
        TextManager.medalSkillRecoveryPlus,
        this.skillRecoveryPlus()
      );
    }
    if (this.finishBlow() > 0) {
      text += textFormat.format(TextManager.medalFinishBlow, this.finishBlow());
    }
    if (this.guardRate() > 0) {
      text += textFormat.format(TextManager.medalGuardRate, this.guardRate());
    }
    if (this.goldUp() > 0) {
      text += textFormat.format(TextManager.goldUp, this.goldUp() + "%");
    }
    if (this.crystalUp() > 0) {
      text += textFormat.format(TextManager.crystalUp, this.crystalUp() + "%");
    }
    if (this.criStun()) {
      text += textFormat2.format(TextManager.criStun);
    }
    if (this.expUp() > 0) {
      text += textFormat.format(TextManager.expUp, this.expUp() + "%");
    }
    if (this.spPlus() > 0) {
      text += TextManager.spPlus.format(hankaku2Zenkaku(this.spPlus()));
    }
    if (this.gold() > 0) {
      text += TextManager.medalGold.format(this.gold());
    }
    if (this.kubihane() > 0) {
      text += TextManager.kubihaneMedal.format(this.kubihane());
    }
    if (this.syukuchi()) {
      text += TextManager.syukuchi;
    }
    return text;
  };
  Equip.prototype.spPlus = function () {
    if (this.item().meta["spPlus"]) {
      return Math.trunc(this.item().meta["spPlus"]);
    }
    return 0;
  };
  Equip.prototype.skillRecoveryPlus = function () {
    return this.meta(EquipMeta.skillRecoveryPlus);
  };
  Equip.prototype.skillDamagePlus = function () {
    return this.meta(EquipMeta.skillDamagePlus);
  };
  Equip.prototype.guardRate = function () {
    return this.meta(EquipMeta.guardRate);
  };
  Equip.prototype.finishBlow = function () {
    return this.meta(EquipMeta.finishBlow);
  };
  Equip.prototype.kubihane = function () {
    return this.meta(EquipMeta.kubihane);
  };
  Equip.prototype.syukuchi = function () {
    return this.meta(EquipMeta.syukuchi);
  };
  Equip.prototype.expUp = function () {
    return this.meta(EquipMeta.expUp);
  };
  Equip.prototype.goldUp = function () {
    return this.meta(EquipMeta.goldUp);
  };
  Equip.prototype.crystalUp = function () {
    return this.meta(EquipMeta.crystalUp);
  };
  Equip.prototype.criStun = function () {
    return this.meta(EquipMeta.criStun) > 0;
  };
  Equip.prototype.gold = function () {
    return this.meta(EquipMeta.gold);
  };
  Equip.prototype.critUp = function () {
    return this.xparam(2);
  };
  Equip.prototype.xparam = function (xparamId) {
    return this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);
  };
  Equip.prototype.traitsSum = function (code, id) {
    return this.traitsWithId(code, id).reduce(function (r, trait) {
      return r + trait.value;
    }, 0);
  };
  Equip.prototype.traitsWithId = function (code, id) {
    return this.allTraits().filter(function (trait) {
      return trait.code === code && trait.dataId === id;
    });
  };
  Equip.prototype.allTraits = function () {
    return this.traitObjects().reduce(function (r, obj) {
      return r.concat(obj.traits);
    }, []);
  };
  Equip.prototype.traitObjects = function () {
    var objects = this.armors();
    return objects;
  };
  Equip.prototype.enchantTexts = function () {
    var text = "";
    if (!this.enchantList()) {
      return text;
    }
    for (var _i = 0, _a = this.enchantList(); _i < _a.length; _i++) {
      var e = _a[_i];
      text += this.enchantText(e);
    }
    return text;
  };
  Equip.prototype.enchantText = function (e) {
    var enchant = $enchantManager.makeEnchant(e);
    return enchant.text();
  };
  Equip.prototype.hasSkill = function () {
    return true;
  };
  Equip.prototype.getParam = function (type) {
    switch (type) {
      case EquipParamType.hp:
        return this.hp();
      case EquipParamType.mp:
        return this.mp();
      case EquipParamType.shield:
        return this.shield();
      case EquipParamType.atk:
        return this.atk();
      case EquipParamType.def:
        return this.def();
      case EquipParamType.mat:
        return this.mat();
      case EquipParamType.mdf:
        return this.mdf();
      case EquipParamType.skillDamage:
        return this.skillDamagePlus();
      case EquipParamType.skillRecoveryPlus:
        return this.skillRecoveryPlus();
      case EquipParamType.exp:
        return this.expUp();
      case EquipParamType.gold:
        return this.goldUp();
      case EquipParamType.finishBlow:
        return this.finishBlow();
    }
    throw new Error();
  };
  Equip.prototype.isCursed = function () {
    return this.item().meta["shitaNugi"];
  };
  return Equip;
})(Item);
var MinuNumType;
(function (MinuNumType) {
  MinuNumType["HP"] = "hp";
  MinuNumType["MP"] = "mp";
  MinuNumType["ATK"] = "atk";
  MinuNumType["DEF"] = "def";
  MinuNumType["MAT"] = "mat";
  MinuNumType["MDF"] = "mdf";
  MinuNumType["SH"] = "sh";
  MinuNumType["SD"] = "sd";
  MinuNumType["EXP"] = "exp";
  MinuNumType["GOLD"] = "gold";
  MinuNumType["FB"] = "fb";
  MinuNumType["CRY"] = "cry";
})(MinuNumType || (MinuNumType = {}));
var MiniNum = /** @class */ (function () {
  function MiniNum(type, value, percent) {
    if (percent === void 0) {
      percent = false;
    }
    this._type = type;
    this._value = value;
    this._percent = percent;
  }
  MiniNum.prototype.type = function () {
    return this._type;
  };
  MiniNum.prototype.value = function () {
    return this._value;
  };
  MiniNum.prototype.percent = function () {
    return this._percent;
  };
  return MiniNum;
})();
var Weapon = /** @class */ (function (_super) {
  __extends(Weapon, _super);
  function Weapon(weapon, temp, enchantList) {
    if (temp === void 0) {
      temp = false;
    }
    if (enchantList === void 0) {
      enchantList = null;
    }
    var _this = _super.call(this, temp, enchantList) || this;
    _this._itemId = weapon.id;
    return _this;
  }
  Weapon.prototype.itemId = function () {
    return this._itemId;
  };
  Weapon.prototype.item = function () {
    return $dataWeapons[this.itemId()];
  };
  return Weapon;
})(Equip);
var EmptyWeapon = /** @class */ (function (_super) {
  __extends(EmptyWeapon, _super);
  function EmptyWeapon() {
    var _this = this;
    var weapon = $dataWeapons[10];
    _this = _super.call(this, weapon, true, null) || this;
    _this._itemId = weapon.id;
    return _this;
  }
  return EmptyWeapon;
})(Weapon);
var Armor = /** @class */ (function (_super) {
  __extends(Armor, _super);
  function Armor(armor, temp, enchantList) {
    if (temp === void 0) {
      temp = false;
    }
    if (enchantList === void 0) {
      enchantList = null;
    }
    var _this = _super.call(this, temp, enchantList) || this;
    _this._itemId = armor.id;
    return _this;
  }
  Armor.prototype.id = function () {
    return this._id;
  };
  Armor.prototype.itemId = function () {
    return this._itemId;
  };
  Armor.prototype.item = function () {
    return $dataArmors[this.itemId()];
  };
  Armor.prototype.hasSkill = function () {
    switch (this.item().etypeId) {
      case 4:
      case 5:
      case 6:
        return false;
    }
    return true;
  };
  Armor.prototype.isNoUp = function () {
    if (this.hp() > 0) {
      return false;
    }
    if (this.atk() > 0) {
      return false;
    }
    if (this.shield() > 0) {
      return false;
    }
    return true;
  };
  Armor.prototype.exclusiveTexts = function () {
    var format = TextManager.exclusive;
    switch (this.item().atypeId) {
      case 9:
        return format.format($gameActors.actor(1).name());
      case 10:
        return format.format($gameActors.actor(2).name());
      case 11:
        return format.format($gameActors.actor(3).name());
      case 12:
        return format.format($gameActors.actor(4).name());
      case 13:
        return format.format($gameActors.actor(5).name());
      case 14:
        return format.format($gameActors.actor(6).name());
      case 15:
        return format.format($gameActors.actor(7).name());
    }
    return "";
  };
  return Armor;
})(Equip);
var EmptyArmor = /** @class */ (function (_super) {
  __extends(EmptyArmor, _super);
  function EmptyArmor() {
    var _this = this;
    var armor = $dataArmors[10];
    _this = _super.call(this, armor, true, null) || this;
    _this._itemId = armor.id;
    return _this;
  }
  return EmptyArmor;
})(Armor);
var EnchantType;
(function (EnchantType) {
  EnchantType["NONE"] = "none";
  EnchantType["ATK_DOWN"] = "atk_down";
  EnchantType["SHIELD_UP"] = "shield_up";
  EnchantType["FLAME"] = "flame";
  EnchantType["CRITICAL"] = "critical";
  EnchantType["SP_UP_HALF"] = "sp_up_half";
})(EnchantType || (EnchantType = {}));
var Enchant = /** @class */ (function () {
  function Enchant(type, skillId, armorId) {
    this._type = type;
    this._skillId = skillId;
    this._armorId = armorId;
  }
  Enchant.prototype.type = function () {
    return this._type;
  };
  Enchant.prototype.text = function () {
    var skill = this.skill();
    if (skill) {
      return this.skillText(skill);
    }
    return "";
  };
  Enchant.prototype.skillText = function (skill) {
    for (var _i = 0, _a = skill.effects; _i < _a.length; _i++) {
      var effect = _a[_i];
      switch (effect.code) {
        case 31:
        case 32:
          return TextManager.hitEnchant.format(
            Nore.getParamChangeName(effect).format(effect.value1) + "\\C[0]"
          );
      }
    }
    return Nore.getStateInfo1(skill);
  };
  Enchant.prototype.skill = function () {
    if (this._skillId == 0) {
      return null;
    }
    return $dataSkills[this._skillId];
  };
  Enchant.prototype.armor = function () {
    if (this._armorId == 0) {
      return null;
    }
    return $dataArmors[this._armorId];
  };
  return Enchant;
})();
var BattleEffect = /** @class */ (function () {
  function BattleEffect(effect, item) {
    this._effect = effect;
    this._stateValue = parseInt(item.meta["stateValue"]);
  }
  BattleEffect.prototype.effect = function () {
    return this._effect;
  };
  BattleEffect.prototype.stateValue = function () {
    return this._stateValue;
  };
  BattleEffect.prototype.code = function () {
    return this._effect.code;
  };
  BattleEffect.prototype.dataId = function () {
    return this._effect.dataId;
  };
  BattleEffect.prototype.value1 = function () {
    return this._effect.value1;
  };
  return BattleEffect;
})();
var $enchantManager;
var DataManager_createGameObjects = DataManager.createGameObjects;
DataManager.createGameObjects = function () {
  DataManager_createGameObjects.call(this);
  $enchantManager = new EnchantManager();
};
var EnchantManager = /** @class */ (function () {
  function EnchantManager() {
    this._cache = {};
  }
  EnchantManager.prototype.makeEnchant = function (type) {
    switch (type) {
      case EnchantType.ATK_DOWN:
        if (this._cache[type]) {
          return this._cache[type];
        }
        this._cache[type] = new Enchant(type, 31, 0);
        return this._cache[type];
      case EnchantType.FLAME:
        if (this._cache[type]) {
          return this._cache[type];
        }
        this._cache[type] = new Enchant(type, 32, 0);
        return this._cache[type];
      case EnchantType.SHIELD_UP:
        if (this._cache[type]) {
          return this._cache[type];
        }
        this._cache[type] = new Enchant(type, 0, 121);
        return this._cache[type];
      case EnchantType.CRITICAL:
        if (this._cache[type]) {
          return this._cache[type];
        }
        this._cache[type] = new Enchant(type, 0, 122);
        return this._cache[type];
    }
    console.error("不正なEnchantです");
  };
  return EnchantManager;
})();
