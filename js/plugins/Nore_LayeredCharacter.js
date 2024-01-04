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
var Sprite_ActorCharacter = /** @class */ (function (_super) {
  __extends(Sprite_ActorCharacter, _super);
  function Sprite_ActorCharacter(character, cos) {
    var _this = this;
    if (!cos || !(cos instanceof CostumeSaver)) {
      throw new Error();
    }
    _this._cos = cos;
    _this = _super.call(this, character) || this;
    _this._meganeLayer = new Sprite_LayeredCharacter(
      character,
      EquipType.megane,
      cos
    );
    _this._hoppeLayer = new Sprite_LayeredCharacter(
      character,
      EquipType.hoppe,
      cos
    );
    _this._innerBottomLayer = new Sprite_LayeredCharacter(
      character,
      EquipType.innerBottom,
      cos
    );
    _this._innerTopLayer = new Sprite_LayeredCharacter(
      character,
      EquipType.innerTop,
      cos
    );
    _this._outerLayer = new Sprite_LayeredCharacter(
      character,
      EquipType.outer,
      cos
    );
    _this._legLayer = new Sprite_LayeredCharacter(
      character,
      EquipType.leg,
      cos
    );
    _this.addChild(_this._innerBottomLayer);
    _this.addChild(_this._innerTopLayer);
    _this.addChild(_this._outerLayer);
    _this.addChild(_this._legLayer);
    _this.addChild(_this._hoppeLayer);
    _this.addChild(_this._meganeLayer);
    _this._colorFilter = new ColorFilter();
    if (!_this.filters) {
      _this.filters = [];
    }
    _this._monoToneColor = [40, 40, 40, 190];
    _this.filters.push(_this._colorFilter);
    return _this;
  }
  Sprite_ActorCharacter.prototype.update = function () {
    _super.prototype.update.call(this);
    this.updateCostume();
  };
  Sprite_ActorCharacter.prototype.updateCostume = function () {
    var actorId = $gameVariables.value(135);
    if (actorId == 0) {
      return;
    }
    if (this._cos.actorId() == actorId) {
      this.refreshCostume();
      $gameVariables.setValue(135, 0);
    }
  };
  Sprite_ActorCharacter.prototype.refreshCostume = function () {
    this._cos = new CostumeSaver(this._cos.actorId());
    this._outerLayer.refreshCostume(this._cos);
  };
  Sprite_ActorCharacter.prototype.updateBitmap = function () {
    this.updateTone();
    if (this.isImageChanged()) {
      this._initialized = true;
      this._characterName = this.characterName();
      this._characterIndex = 0;
      this.setCharacterBitmap();
    }
  };
  Sprite_ActorCharacter.prototype.updateTone = function () {
    if (!this._character.isMonoTone) {
      return;
    }
    if (this._character.isMonoTone()) {
      this._colorFilter.setBlendColor(this._monoToneColor);
    } else {
      this._colorFilter.setBlendColor([0, 0, 0, 0]);
    }
  };
  Sprite_ActorCharacter.prototype.isImageChanged = function () {
    if (this._initialized) {
      return this._characterName != this.characterName();
    }
    return true;
  };
  Sprite_ActorCharacter.prototype.characterName = function () {
    var actorId = this._cos.actorId();
    var fileName = "actor" + actorId.padZero(2);
    if (this._cos.boteId() >= 1) {
      return fileName + "_base-bote";
    } else {
      if (this._cos.actorId() == 7) {
        if (this._cos.hasAcce(1091)) {
          return fileName + "_base2";
        }
        return fileName + "_base";
      }
      return fileName + "_base";
    }
  };
  Sprite_ActorCharacter.prototype.updateOther = function () {
    this.opacity = this._character.opacity();
    this.blendMode = this._character.blendMode();
    //this._bushDepth = this._character.bushDepth();
  };
  Sprite_ActorCharacter.prototype.listFiles = function () {
    var files = [];
    files.push(this._characterName);
    files.push(this._hoppeLayer.fileName());
    files.push(this._innerBottomLayer.fileName());
    files.push(this._innerTopLayer.fileName());
    files.push(this._legLayer.fileName());
    files.push(this._outerLayer.fileName());
    files.push(this._meganeLayer.fileName());
    return files;
  };
  Sprite_ActorCharacter.prototype.characterBlockX = function () {
    var index = this._characterIndex;
    return (index % 4) * 3;
  };
  Sprite_ActorCharacter.prototype.characterBlockY = function () {
    var index = this._characterIndex;
    return Math.floor(index / 4) * 4;
  };
  return Sprite_ActorCharacter;
})(Sprite_Character);
var Sprite_Follower = /** @class */ (function (_super) {
  __extends(Sprite_Follower, _super);
  function Sprite_Follower() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  Sprite_Follower.prototype.update = function () {
    _super.prototype.update.call(this);
    this.visible = this._character.isVisible();
  };
  return Sprite_Follower;
})(Sprite_ActorCharacter);
var Sprite_Player = /** @class */ (function (_super) {
  __extends(Sprite_Player, _super);
  function Sprite_Player() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  Sprite_Player.prototype.characterName = function () {
    var actor;
    if ($gameSystem.sarachiActorId() > 0) {
      actor = $gameActors.actor(30);
      this._meganeLayer.visible = false;
      this._hoppeLayer.visible = false;
      this._innerBottomLayer.visible = false;
      this._innerTopLayer.visible = false;
      this._outerLayer.visible = false;
      this._legLayer.visible = false;
    } else if ($gamePlayer.followers().isVisible()) {
      actor = $gameParty.battleMembers()[0];
    } else {
      actor = $gamePlayer.mainActor();
    }
    var fileName = "actor" + actor.actorId().padZero(2);
    if (actor.boteId >= 1) {
      return fileName + "_base-bote";
    } else {
      if (actor.actorId() == 7) {
        if (actor.hasAcce(1091)) {
          return fileName + "_base2";
        }
        return fileName + "_base";
      }
      return fileName + "_base";
    }
  };
  return Sprite_Player;
})(Sprite_ActorCharacter);
var Sprite_Prisoner = /** @class */ (function (_super) {
  __extends(Sprite_Prisoner, _super);
  function Sprite_Prisoner() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  Sprite_Prisoner.prototype.updateCharacterFrame = function () {
    var pw = this.patternWidth();
    var ph = this.patternHeight();
    var sx = (this.characterBlockX() + this.characterPatternX()) * pw;
    var sy = (this.characterBlockY() + this.characterPatternY()) * ph;
    this.updateHalfBodySprites();
    var hh = ph - 28;
    this.setFrame(sx, sy, pw, hh);
    this._outerLayer.setFrame(sx, sy, pw, hh);
    this._innerBottomLayer.setFrame(sx, sy, pw, hh);
    this._innerTopLayer.setFrame(sx, sy, pw, hh);
    this._legLayer.setFrame(sx, sy, pw, hh);
    this._hoppeLayer.setFrame(sx, sy, pw, hh);
    this._meganeLayer.setFrame(sx, sy, pw, hh);
  };
  return Sprite_Prisoner;
})(Sprite_ActorCharacter);
var EquipType;
(function (EquipType) {
  EquipType[(EquipType["megane"] = 0)] = "megane";
  EquipType[(EquipType["hoppe"] = 1)] = "hoppe";
  EquipType[(EquipType["outer"] = 2)] = "outer";
  EquipType[(EquipType["outerTop"] = 3)] = "outerTop";
  EquipType[(EquipType["outerBottom"] = 4)] = "outerBottom";
  EquipType[(EquipType["head"] = 5)] = "head";
  EquipType[(EquipType["head2"] = 6)] = "head2";
  EquipType[(EquipType["leg"] = 7)] = "leg";
  EquipType[(EquipType["arm"] = 8)] = "arm";
  EquipType[(EquipType["innerBottom"] = 9)] = "innerBottom";
  EquipType[(EquipType["innerTop"] = 10)] = "innerTop";
})(EquipType || (EquipType = {}));
var Sprite_LayeredCharacter = /** @class */ (function (_super) {
  __extends(Sprite_LayeredCharacter, _super);
  function Sprite_LayeredCharacter(character, _type, _cos) {
    var _this = _super.call(this, character) || this;
    _this._type = _type;
    _this._cos = _cos;
    return _this;
  }
  Sprite_LayeredCharacter.prototype.updateBitmap = function () {
    if (this.isImageChanged()) {
      this._fileName = this.fileName();
      this._characterName = this._fileName;
      this._characterIndex = 0;
      this.setCharacterBitmap();
    }
  };
  Sprite_LayeredCharacter.prototype.refreshCostume = function (cos) {
    this._cos = cos;
  };
  Sprite_LayeredCharacter.prototype.updatePosition = function () {
    this.x = 0;
    this.y = 0;
    this.z = 0;
  };
  Sprite_LayeredCharacter.prototype.isImageChanged = function () {
    return this._fileName != this.fileName();
  };
  Sprite_LayeredCharacter.prototype.fileNameActor7 = function () {
    return "";
  };
  Sprite_LayeredCharacter.prototype.fileName = function () {
    var cos = this._cos;
    if (!cos) {
      console.error("actornas");
      return "";
    }
    var bote = "";
    if (cos.boteId() >= 1) {
      bote = "-bote";
    }
    var actorStr = cos.actorId().padZero(2);
    switch (this._type) {
      case EquipType.hoppe:
        if (cos.hoppeId() <= 0) {
          return "";
        }
        if (this._cos.actorId() == 7) {
          if (this._cos.hasAcce(1091)) {
            return "actor0%1_hoppe2".format(cos.actorId());
          }
        }
        return "actor%1_hoppe".format(cos.actorId().padZero(2));
      //return 'actor0%1_hoppe'.format(1);
      case EquipType.outer:
        if (cos.outerId() == "a") {
          return "";
        }
        if (cos.outerId() == "b") {
          if (this._cos.actorId() == 7) {
            if (this._cos.hasAcce(1091)) {
              return (
                "actor%2_outer_%1_2".format(cos.outerId(), actorStr) + bote
              );
            }
          }
        }
        return "actor%2_outer_%1".format(cos.outerId(), actorStr) + bote;
      case EquipType.megane:
        if (!cos.hasAcce(1099)) {
          return "";
        }
        return "actor%1_megane".format(actorStr);
      case EquipType.leg:
        if (cos.legId() == "a") {
          return "";
        }
        return "actor%2_leg_%1".format(cos.legId(), actorStr);
      /*case EquipType.arm:
                if (actor.armId == 'a') {
                    return '';
                }
                return 'actor%2_arm_%1'.format(actor.armId, actorStr);*/
      case EquipType.innerBottom:
        switch (cos.innerBottomId()) {
          case "a":
          case "f":
          case "g":
          case "h":
            return "";
        }
        switch (cos.outerId()) {
          case "b":
            return "";
        }
        return (
          "actor%2_innerBottom_%1".format(cos.innerBottomId(), actorStr) + bote
        );
      case EquipType.innerTop:
        if (cos.innerTopId() == "a") {
          return "";
        }
        switch (cos.outerId()) {
          case "b":
          case "g":
            return "";
        }
        return "actor%2_innerTop_%1".format(cos.innerTopId(), actorStr) + bote;
    }
  };
  return Sprite_LayeredCharacter;
})(Sprite_Character);
Spriteset_Map.prototype.createCharacters = function () {
  this._characterSprites = [];
  for (var _i = 0, _a = $gameMap.events(); _i < _a.length; _i++) {
    var event_1 = _a[_i];
    //p(event.characterName())
    //p(event)
    if ($gameParty.isLayeredCharacterEnabledMap()) {
      var result = event_1.characterName().match(/actor([0-9/]+)/);
      if (result) {
        var actorId = Math.trunc(result[1]);
        if (isLayerdActor(actorId)) {
          //p('layertd' + actorId)
          var cos_1 = new CostumeSaver(actorId);
          this._characterSprites.push(
            new Sprite_ActorCharacter(event_1, cos_1)
          );
          continue;
        }
      }
    }
    this._characterSprites.push(new Sprite_Character(event_1));
  }
  for (var _b = 0, _c = $gameMap.vehicles(); _b < _c.length; _b++) {
    var vehicle = _c[_b];
    this._characterSprites.push(new Sprite_Character(vehicle));
  }
  for (
    var _d = 0, _e = $gamePlayer.followers().reverseData();
    _d < _e.length;
    _d++
  ) {
    var follower = _e[_d];
    var cos_2 = new CostumeSaver(follower.actor().actorId());
    this._characterSprites.push(new Sprite_Follower(follower, cos_2));
  }
  var cos;
  if ($gamePlayer.followers().isVisible()) {
    cos = new CharacterCostume($gameParty.battleMembers()[0].actorId());
  } else {
    cos = new CharacterCostume($gameActors.mainActor().actorId());
  }
  this._characterSprites.push(new Sprite_Player($gamePlayer, cos));
  for (var _f = 0, _g = this._characterSprites; _f < _g.length; _f++) {
    var sprite = _g[_f];
    this._tilemap.addChild(sprite);
  }
};
function isLayerdActor(actorId) {
  return [1, 2, 3, 4, 5, 6, 7, 10, 12].contains(actorId);
}
