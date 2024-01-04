/*:ja
 * @target MZ
 */
var Nore;
(function (Nore) {
  var _Game_CharacterBase_prototype_characterName =
    Game_CharacterBase.prototype.characterName;
  Game_CharacterBase.prototype.characterName = function () {
    if (this._characterName == "!event") {
      return "";
    }
    switch (this._characterName) {
      case "actor03":
        if ($gameActors.actor(3).boteId > 1) {
          return "actor03-bote";
        }
        break;
      case "actor05":
        if ($gameActors.actor(5).boteId > 1) {
          return "actor05-bote";
        }
        break;
    }
    return _Game_CharacterBase_prototype_characterName.call(this);
  };
})(Nore || (Nore = {}));
