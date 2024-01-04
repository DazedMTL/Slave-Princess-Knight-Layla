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
var MANKO_ID_LIST = [100, 300, 440, 700, 1000, 1500, 2000, 2500];
var ANAL_ID_LIST = [100, 200, 400, 600, 1000, 1500, 2000, 2500];
var Nore;
(function (Nore) {
  var MankoSprite = /** @class */ (function (_super) {
    __extends(MankoSprite, _super);
    function MankoSprite(history) {
      var _this = _super.call(this) || this;
      _this._history = history;
      _this.createBackImage();
      _this.createBaseImage();
      _this.createInmonImage();
      _this.createChikubiImage();
      _this.createMankoImage();
      _this.createAnalImage();
      _this.createSeiekiImage();
      _this.createAcceSeiekiImage();
      _this.createMankoRingImage();
      _this.createKuriRingImage();
      _this.createNippleRingImage();
      _this.createYakiinImage();
      _this.createHesoImage();
      _this.createSyusanImage();
      _this.createKubiwaImage();
      _this.createFaceImage();
      _this.createNakadashiRakugakiImage();
      return _this;
    }
    MankoSprite.prototype.createBackImage = function () {
      this._backSprite = new PIXI.Sprite(this.getBackImage());
      this.addChild(this._backSprite);
    };
    MankoSprite.prototype.createBaseImage = function () {
      this._baseSprite = new PIXI.Sprite(this.getBaseImage());
      this.addChild(this._baseSprite);
    };
    MankoSprite.prototype.createInmonImage = function () {
      this._inmonSprite = new PIXI.Sprite(this.getInmonImage());
      this.addChild(this._inmonSprite);
    };
    MankoSprite.prototype.createChikubiImage = function () {
      this._analSprite = new PIXI.Sprite(this.getChikubiImage());
      this.addChild(this._analSprite);
    };
    MankoSprite.prototype.createAnalImage = function () {
      this._analSprite = new PIXI.Sprite(this.getAnalImage());
      this.addChild(this._analSprite);
    };
    MankoSprite.prototype.createMankoImage = function () {
      this._mankoSprite = new PIXI.Sprite(this.getMankoImage());
      this.addChild(this._mankoSprite);
    };
    MankoSprite.prototype.createMankoRingImage = function () {
      this._labiaSprite = new PIXI.Sprite(this.getLabiaImage());
      this.addChild(this._labiaSprite);
    };
    MankoSprite.prototype.createYakiinImage = function () {
      this._yakiinSprite = new PIXI.Sprite(this.getYakiinImage());
      this.addChild(this._yakiinSprite);
    };
    MankoSprite.prototype.createNippleRingImage = function () {
      this._nippleSprite = new PIXI.Sprite(this.getNippleImage());
      this.addChild(this._nippleSprite);
    };
    MankoSprite.prototype.createKuriRingImage = function () {
      this._kuriSprite = new PIXI.Sprite(this.getKuriRingImage());
      this.addChild(this._kuriSprite);
    };
    /*createMankoRingImage() {
            this._mankoSprite = new PIXI.Sprite(this.getMankoRingImage());
            this.addChild(this._mankoSprite);
        }*/
    MankoSprite.prototype.createSeiekiImage = function () {
      this._seiekiSprite = new PIXI.Sprite(this.getSeiekiImage());
      this.addChild(this._seiekiSprite);
    };
    MankoSprite.prototype.createAcceSeiekiImage = function () {
      var cos = this._history.costume();
      if (this._history.day() == $gameSystem.day()) {
        cos = new CostumeSaver(this._history.actorId());
      }
      for (var i = 0; i < Nore.NAKADASHI_SEIEKI_ACCE_LIST.length; i++) {
        var acceId = Nore.NAKADASHI_SEIEKI_ACCE_LIST[i];
        if (cos._acceMap[acceId]) {
          this._seiekiSprite = new PIXI.Sprite(
            this.getSeiekiAcceImage(acceId - 1000)
          );
          this.addChild(this._seiekiSprite);
        }
      }
    };
    MankoSprite.prototype.createSyusanImage = function () {
      this._syusanSprite = this.getSyusanSprite();
      if (this._syusanSprite) {
        this.addChild(this._syusanSprite);
      }
    };
    MankoSprite.prototype.createHesoImage = function () {
      this._hesoSprite = new PIXI.Sprite(this.getHesoImage());
      this.addChild(this._hesoSprite);
    };
    MankoSprite.prototype.createKubiwaImage = function () {
      this._kubiwaSprite = new PIXI.Sprite(this.getKubiwaImage());
      this.addChild(this._kubiwaSprite);
    };
    MankoSprite.prototype.createFaceImage = function () {
      this._faceSprite = new PIXI.Sprite(this.getFaceImage());
      this.addChild(this._faceSprite);
    };
    MankoSprite.prototype.createNakadashiRakugakiImage = function () {
      this._faceSprite = new PIXI.Sprite(this.getNakadashiRakugakiImage());
      this.addChild(this._faceSprite);
    };
    MankoSprite.prototype.getBackImage = function () {
      var actorId = this._history.actorId();
      var eroId = this.getEroImageId();
      var backId = 1;
      if (this._history.isCaptive()) {
        backId = 2;
      }
      var text = "%1_%2_back_%3.png".format(
        this.getEroActorId(actorId),
        eroId.padZero(2),
        backId.padZero(2)
      );
      return PIXI.utils.TextureCache[text];
    };
    MankoSprite.prototype.getBaseImage = function () {
      var actorId = this._history.actorId();
      var eroId = this.getEroImageId();
      var baseId = this._history.baseImageId();
      var text = "%1_%2_base_%3.png".format(
        this.getEroActorId(actorId),
        eroId.padZero(2),
        baseId.padZero(2)
      );
      return PIXI.utils.TextureCache[text];
    };
    MankoSprite.prototype.getChikubiImage = function () {
      if (!this._history.costume().isKuroChikubi()) {
        return null;
      }
      var actorId = this._history.actorId();
      var eroId = this.getEroImageId();
      var chikubiId = 1;
      var text = "%1_%2_kuro_%3.png".format(
        this.getEroActorId(actorId),
        eroId.padZero(2),
        chikubiId.padZero(2)
      );
      return PIXI.utils.TextureCache[text];
    };
    MankoSprite.prototype.getInmonImage = function () {
      if (!this._history.costume().hasAcce(1013)) {
        return null;
      }
      var actorId = this._history.actorId();
      var eroId = this.getEroImageId();
      var boteId = this._history.costume().boteId();
      var text = "%1_%2_inmon_%3.png".format(
        this.getEroActorId(actorId),
        eroId.padZero(2),
        boteId.padZero(2)
      );
      return PIXI.utils.TextureCache[text];
    };
    MankoSprite.prototype.getAnalImage = function () {
      var actorId = this._history.actorId();
      var eroId = this.getEroImageId();
      var analId = this._history.analImageId();
      var text = "%1_%2_anal_%3.png".format(
        this.getEroActorId(actorId),
        eroId.padZero(2),
        analId.padZero(2)
      );
      return PIXI.utils.TextureCache[text];
    };
    MankoSprite.prototype.getEroActorId = function (actorId) {
      return "0" + actorId;
    };
    MankoSprite.prototype.getMankoImage = function () {
      var actorId = this._history.actorId();
      var eroId = this.getEroImageId();
      var mankoId = this._history.mankoImageId();
      /*if (this._history.day() == $gameSystem.day()) {
                mankoId = this._history.beforeMankoImageId(this._history.isCaptive());
            }*/
      var text = "%1_%2_manko_%3.png".format(
        this.getEroActorId(actorId),
        eroId.padZero(2),
        mankoId.padZero(2)
      );
      if (actorId == 7 && this._history.countAnal() > 0) {
        text = "%1_%2_bokki_%3.png".format(
          this.getEroActorId(actorId),
          eroId.padZero(2),
          mankoId.padZero(2)
        );
      }
      //p(text)
      return PIXI.utils.TextureCache[text];
    };
    MankoSprite.prototype.getLabiaImage = function () {
      if (!this._history.hasAcce($dataArmors[1014])) {
        return null;
      }
      var actorId = this._history.actorId();
      var eroId = this.getEroImageId();
      var mankoId = this._history.mankoImageId();
      var text = "%1_%2_labia_%3.png".format(
        this.getEroActorId(actorId),
        eroId.padZero(2),
        mankoId.padZero(2)
      );
      return PIXI.utils.TextureCache[text];
    };
    MankoSprite.prototype.getYakiinImage = function () {
      if (
        !this._history.hasAcce($dataArmors[1000]) &&
        !this._history.hasAcce($dataArmors[1001])
      ) {
        return null;
      }
      var actorId = this._history.actorId();
      var eroId = this.getEroImageId();
      var boteId = this._history.costume().boteId();
      var text = "%1_%2_yakiin_%3.png".format(
        this.getEroActorId(actorId),
        eroId.padZero(2),
        boteId.padZero(2)
      );
      return PIXI.utils.TextureCache[text];
    };
    MankoSprite.prototype.getNippleImage = function () {
      if (
        !this._history.hasAcce($dataArmors[1006]) &&
        !this._history.hasAcce($dataArmors[1030])
      ) {
        return null;
      }
      var actorId = this._history.actorId();
      var eroId = this.getEroImageId();
      var mankoId = 1;
      if (this._history.hasAcce($dataArmors[1030])) {
        mankoId = this._history.mankoImageId();
      }
      var text = "%1_%2_nipple_%3.png".format(
        this.getEroActorId(actorId),
        eroId.padZero(2),
        mankoId.padZero(2)
      );
      return PIXI.utils.TextureCache[text];
    };
    MankoSprite.prototype.getKuriRingImage = function () {
      if (!this._history.costume().hasAcce(1009)) {
        return null;
      }
      var actorId = this._history.actorId();
      var eroId = this.getEroImageId();
      var mankoId = 1;
      /*if (this._history.day() == $gameSystem.day()) {
                mankoId = this._history.beforeMankoImageId();
            }*/
      var text = "%1_%2_kuri_%3.png".format(
        this.getEroActorId(actorId),
        eroId.padZero(2),
        mankoId.padZero(2)
      );
      return PIXI.utils.TextureCache[text];
    };
    MankoSprite.prototype.getSeiekiImage = function () {
      var actorId = this._history.actorId();
      var eroId = this.getEroImageId();
      var num = this._history.seiekiImageId();
      if (num <= 0) {
        return;
      }
      var text = "%1_%2_seieki_%3.png".format(
        this.getEroActorId(actorId),
        eroId.padZero(2),
        num.padZero(2)
      );
      return PIXI.utils.TextureCache[text];
    };
    MankoSprite.prototype.getSeiekiAcceImage = function (acceId) {
      //p('acceId' + acceId)
      var actorId = this._history.actorId();
      var eroId = this.getEroImageId();
      var text = "%1_%2_seieki_%3.png".format(
        this.getEroActorId(actorId),
        eroId.padZero(2),
        acceId.padZero(2)
      );
      return PIXI.utils.TextureCache[text];
    };
    MankoSprite.prototype.getSyusanSprite = function () {
      if (!this._history.costume().hasAcce(1021)) {
        return null;
      }
      var s = new PIXI.Sprite();
      var actorId = this._history.actorId();
      var actor = $gameActors.actor(actorId);
      var babyList = this._history.babyList();
      for (var i = 0; i < babyList.length; i++) {
        var baby = babyList[i];
        var index = i + 1;
        var file = this.getSyusanAcceFile(
          index,
          baby.isMale(),
          baby.getTaneoyaType()
        );
        if (PIXI.utils.TextureCache[file + ".png"]) {
          s.addChild(new PIXI.Sprite(PIXI.utils.TextureCache[file + ".png"]));
        }
      }
      return s;
    };
    MankoSprite.prototype.getSyusanAcceFile = function (
      syusanCount,
      male,
      taneoyaId
    ) {
      var actorId = this._history.actorId();
      var eroId = this.getEroImageId();
      var boteId = this._history.costume().boteId();
      var actor = $gameActors.actor(actorId);
      if (taneoyaId != TaneoyaId.goblin) {
        if (boteId == 0) {
          return "%1_%2_syusan_%3_m".format(
            this.getEroActorId(actorId),
            eroId.padZero(2),
            syusanCount.padZero(2)
          );
        } else {
          return "%1_%2_syusan_%3_m_b%4".format(
            this.getEroActorId(actorId),
            eroId.padZero(2),
            syusanCount.padZero(2),
            boteId
          );
        }
      } else {
        if (boteId == 0) {
          return "%1_%2_syusan_%3_f".format(
            this.getEroActorId(actorId),
            eroId.padZero(2),
            syusanCount.padZero(2)
          );
        } else {
          return "%1_%2_syusan_%3_f_b%4".format(
            this.getEroActorId(actorId),
            eroId.padZero(2),
            syusanCount.padZero(2),
            boteId
          );
        }
      }
    };
    MankoSprite.prototype.getHesoImage = function () {
      if (!this._history.hasHesoEarrings()) {
        return null;
      }
      var actorId = this._history.actorId();
      var eroId = this.getEroImageId();
      var boteId = this._history.costume().boteId();
      var text = "%1_%2_heso_%3.png".format(
        this.getEroActorId(actorId),
        eroId.padZero(2),
        boteId.padZero(2)
      );
      return PIXI.utils.TextureCache[text];
    };
    MankoSprite.prototype.getKubiwaImage = function () {
      if (!this._history.hasKubiwa()) {
        return null;
      }
      var actorId = this._history.actorId();
      var eroId = this.getEroImageId();
      var text = "%1_%2_kubiwa_%3.png".format(
        this.getEroActorId(actorId),
        eroId.padZero(2),
        "1".padZero(2)
      );
      return PIXI.utils.TextureCache[text];
    };
    MankoSprite.prototype.getFaceImage = function () {
      var actorId = this._history.actorId();
      var eroId = this.getEroImageId();
      var faceId = 1;
      var text = "%1_%2_face_%3.png".format(
        this.getEroActorId(actorId),
        eroId.padZero(2),
        faceId.padZero(2)
      );
      return PIXI.utils.TextureCache[text];
    };
    MankoSprite.prototype.getNakadashiRakugakiImage = function () {
      var actorId = this._history.actorId();
      var eroId = this.getEroImageId();
      var cos = this._history.costume();
      if (this._history.day() == $gameSystem.day()) {
        cos = new CostumeSaver(actorId);
      }
      var nakadashi = this.getNakadashiRakugakiImageId(cos);
      var text = "%1_%2_naka_%3.png".format(
        this.getEroActorId(actorId),
        eroId.padZero(2),
        nakadashi.padZero(2)
      );
      return PIXI.utils.TextureCache[text];
    };
    MankoSprite.prototype.getNakadashiRakugakiImageId = function (cos) {
      var count = 0;
      for (var i = 0; i < Nore.NAKADASHI_COUNT_ACCE_LIST.length; i++) {
        var acce = Nore.NAKADASHI_COUNT_ACCE_LIST[i];
        if (cos._acceMap[acce]) {
          count++;
        } else {
          return count;
        }
      }
      return count;
    };
    MankoSprite.prototype.getEroImageId = function () {
      switch (this._history.actorId()) {
        case 1:
          return 8;
        case 2:
          return 15;
        case 3:
          return 7;
        case 4:
          return 14;
        case 5:
          return 2;
        case 6:
          return 4;
        case 7:
          return 13;
        case 10:
          return 15;
        case 12:
          return 13;
      }
      return 0;
    };
    MankoSprite.prototype.destroy = function () {
      this.removeChildren();
      _super.prototype.destroy.call(this);
    };
    return MankoSprite;
  })(Sprite);
  Nore.MankoSprite = MankoSprite;
})(Nore || (Nore = {}));
