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
var Nore;
(function (Nore) {
  /*
    Spriteset_Map.prototype.createRightTachie = function() {
        this._rightTachie = new Sprite_RightTachie();
        this.addChild(this._rightTachie);
    };
    const _Spriteset_Map_prototype_createUpperLayer = Spriteset_Map.prototype.createUpperLayer;
    Spriteset_Map.prototype.createUpperLayer = function() {
        _Spriteset_Map_prototype_createUpperLayer.call(this);
        this.createRightTachie();
    }
    */
  Spriteset_Base.prototype.createPictures = function () {
    var rect = this.pictureContainerRect();
    this._pictureContainer = new Sprite();
    this._pictureContainer.setFrame(rect.x, rect.y, rect.width, rect.height);
    for (var i = 1; i <= $gameScreen.maxPictures(); i++) {
      this._pictureContainer.addChild(new Sprite_Picture(i));
      if (i == 10) {
        this._rightTachie = new Sprite_RightTachie();
        this._pictureContainer.addChild(this._rightTachie);
      }
    }
    this.addChild(this._pictureContainer);
  };
  var Sprite_RightTachie = /** @class */ (function (_super) {
    __extends(Sprite_RightTachie, _super);
    function Sprite_RightTachie() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Sprite_RightTachie.prototype.initialize = function () {
      var x = 780;
      _super.prototype.initialize.call(
        this,
        new Rectangle(x, 0, this.contentsWidth(), this.contentsHeight())
      );
      this._actorId = $gameSystem.chokyoActorId();
      this.frameVisible = false;
      this.backOpacity = 0;
      this.margin = 0;
      this.padding = 0;
      var g = new PIXI.Graphics();
      g.beginFill(0x000);
      g.drawRect(0, 0, 500, 500);
      g.endFill();
      this._back = g;
      this.addChild(this._back);
      this._actorLayer = new Sprite();
      this.addChild(this._actorLayer);
      this.redraw();
    };
    Sprite_RightTachie.prototype.update = function () {
      this._actorId = $gameSystem.chokyoActorId();
      _super.prototype.update.call(this);
      this.updateVisible();
      this.updatePosition();
      if ($gameSwitches.value(4)) {
        this.redraw();
      }
      if (this.actor() && this.actor().isDirty()) {
        this.redraw();
      }
    };
    Sprite_RightTachie.prototype.updatePosition = function () {
      if ($gameSwitches.value(6)) {
        // トイレイベント中
        this.x = $gameVariables.value(8);
        this.y = $gameVariables.value(9);
        this.scale.x = 1.5;
        this.scale.y = 1.5;
        this._back.visible = true;
      } else {
        this.x = 780;
        this.y = 0;
        this.scale.x = 1;
        this.scale.y = 1;
        this._back.visible = false;
      }
    };
    Sprite_RightTachie.prototype.updateVisible = function () {
      var lastVisible = this.visible;
      if ($gameSwitches.value(1)) {
        this.visible = false;
        //return;
      }
      if ($gameSystem.isEroEvent()) {
        this.visible = false;
        return;
      }
      if (!$gameSystem.isRightTachieVisible()) {
        if (!$gameSwitches.value(14)) {
          this.visible = false;
        }
        return;
      }
      if (SceneManager._scene) this.visible = true;
      if (this.visible && !lastVisible) {
        this.redraw();
      }
    };
    Sprite_RightTachie.prototype.actor = function () {
      return $gameActors.actor(this._actorId);
    };
    Sprite_RightTachie.prototype.redraw = function () {
      if (!this.visible) {
        return;
      }
      $gameSwitches.setValue(4, false);
      this.contents.clear();
      this.contentsBack.clear();
      if (!this._actorLayer) {
        return;
      }
      this.drawActor();
    };
    Sprite_RightTachie.prototype.drawActor = function () {
      var hMinus = 0;
      if ($gameSwitches.value(4)) {
        hMinus = 0;
      }
      var rect = new Rectangle(120, -100, 600, 1000);
      var x = 10;
      var y = 10;
      var actor = this.actor();
      if (!actor) {
        return;
      }
      this._actorLayer.removeChildren();
      //p('drawFace:' + actor.faceId)
      this.drawTachieActor(actor, this._actorLayer, x, y, actor.faceId);
    };
    Sprite_RightTachie.prototype.contentsWidth = function () {
      return 378;
    };
    Sprite_RightTachie.prototype.contentsHeight = function () {
      return Graphics.height;
    };
    return Sprite_RightTachie;
  })(Window_Base);
  Nore.Sprite_RightTachie = Sprite_RightTachie;
})(Nore || (Nore = {}));
