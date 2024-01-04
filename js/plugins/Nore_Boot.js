/*:ja
 * @target MZ
 * @author ル
 */
var Nore;
(function (Nore) {
  var _Scene_Boot_prototype_loadSystemImages =
    Scene_Boot.prototype.loadSystemImages;
  Scene_Boot.prototype.loadSystemImages = function () {
    _Scene_Boot_prototype_loadSystemImages.call(this);
    ImageManager.loadCharacter("actor02");
    ImageManager.loadCharacter("actor03");
    ImageManager.loadCharacter("actor03_base");
    ImageManager.loadCharacter("actor04");
    ImageManager.loadCharacter("actor05");
    ImageManager.loadCharacter("actor06");
    ImageManager.loadCharacter("actor07");
    ImageManager.loadCharacter("actor11");
    ImageManager.loadCharacter("actor12");
    ImageManager.loadSpriteSheet("img/tachie/actor01.json");
    ImageManager.loadSpriteSheet("img/tachie/actor02.json");
    ImageManager.loadSpriteSheet("img/tachie/actor03.json");
    ImageManager.loadSpriteSheet("img/tachie/actor04.json");
    ImageManager.loadSpriteSheet("img/tachie/actor05.json");
    ImageManager.loadSpriteSheet("img/tachie/actor06.json");
    ImageManager.loadSpriteSheet("img/tachie/actor07.json");
    ImageManager.loadSpriteSheet("img/tachie/actor08.json");
    ImageManager.loadSpriteSheet("img/tachie/actor09.json");
    ImageManager.loadSpriteSheet("img/tachie/actor10.json");
    ImageManager.loadSpriteSheet("img/tachie/actor11.json");
    ImageManager.loadSpriteSheet("img/tachie/actor12.json");
    ImageManager.loadSpriteSheet("img/tachie/actor13.json");
    ImageManager.loadSpriteSheet("img/tachie/actor14.json");
    ImageManager.loadSpriteSheet("img/tachie/actor15.json");
    ImageManager.loadSpriteSheet("img/tachie/actor16.json");
    ImageManager.loadSpriteSheet("img/tachie/actor18.json");
    ImageManager.loadSpriteSheet("img/tachie/actor19.json");
    ImageManager.loadSpriteSheet("img/tachie/actor20.json");
    ImageManager.loadSpriteSheet("img/tachie/sikyu.json");
    ImageManager.loadSpriteSheet("img/tachie/battle0.json");
    ImageManager.loadSpriteSheet("img/tachie/battle1.json");
    ImageManager.loadSpriteSheet("img/tachie/battle2.json");
    ImageManager.loadSpriteSheet("img/ero/manko_1.json");
    ImageManager.loadSpriteSheet("img/ero/child.json");
    ImageManager.loadSystem("World_B");
    ImageManager.loadSystem("michi");
    ImageManager.loadSystem("Window2");
    ImageManager.loadSystem("Window4");
    ImageManager.loadSystem("Window5");
    ImageManager.loadSystem("text_window");
    ImageManager.loadSystem("name_window");
    ImageManager.loadSystem("Battle");
    ImageManager.loadSystem("bar");
    ImageManager.loadSystem("bg");
    ImageManager.loadSystem("bg2");
    ImageManager.loadSystem("menu2");
    ImageManager.loadSystem("status_bg");
    ImageManager.loadSystem("eroStatus");
    ImageManager.loadSystem("skill_item");
    ImageManager.loadSystem("status_item");
    ImageManager.loadSystem("number");
    ImageManager.loadSystem("ButtonSet2");
    ImageManager.loadSystem("skill_tree");
    ImageManager.loadSystem("result");
    ImageManager.loadSystem("result_face1");
    ImageManager.loadSystem("result_face2");
    ImageManager.loadSystem("result_face3");
    ImageManager.loadSystem("result_face4");
    ImageManager.loadSystem("result_face5");
    ImageManager.loadSystem("result_face6");
    ImageManager.loadSystem("result_face7");
    ImageManager.loadSystem("result_face10");
    ImageManager.loadSystem("result_face12");
    ImageManager.loadSystem("arrow");
    ImageManager.loadSystem("calendar_item");
    ImageManager.loadSystem("ninshin");
    ImageManager.loadSystem("eroMarker");
    ImageManager.loadSystem("back1");
    ImageManager.loadSystem("back2");
    ImageManager.loadSystem("gold");
    ImageManager.loadSystem("IconSetMini");
    ImageManager.loadSystem("stage");
    ImageManager.loadSystem("text_fukidashi");
    ImageManager.loadSpriteSheet("img/ero/gion_1.json");
    ImageManager.loadSpriteSheet("img/ero/aegi_1.json");
  };
  var _DataManager_createGameObjects = DataManager.createGameObjects;
  DataManager.createGameObjects = function () {
    _DataManager_createGameObjects.call(this);
    Nore.Tachie.actorCashedSprites = {};
    switch (ConfigManager.language) {
      case "en":
        initVocabEn();
        break;
      case "ch":
      default:
        initVocabJp();
        break;
    }
  };
})(Nore || (Nore = {}));
