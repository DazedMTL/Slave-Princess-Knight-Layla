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
  var appearX = 520;
  var hiddenX = 1270;
  var speed = 150;
  var _Scene_Battle2_createActorCommandWindow =
    Nore.Scene_Battle2.prototype.createActorCommandWindow;
  Nore.Scene_Battle2.prototype.createActorCommandWindow = function () {
    this._tachieSprite = new Sprite_BattleTachie();
    this._spriteset.addChild(this._tachieSprite);
    _Scene_Battle2_createActorCommandWindow.call(this);
    this._tachieSprite.setActorCommandWindow(this._actorCommandWindow);
  };
  var _Scene_Battle2_prototype_createItemWindow =
    Nore.Scene_Battle2.prototype.createItemWindow;
  Nore.Scene_Battle2.prototype.createItemWindow = function () {
    _Scene_Battle2_prototype_createItemWindow.call(this);
    this._tachieSprite.setSkillWindow(this._skillWindow);
    this._tachieSprite.setItemWindow(this._itemWindow);
  };
  var Sprite_BattleTachie = /** @class */ (function (_super) {
    __extends(Sprite_BattleTachie, _super);
    function Sprite_BattleTachie() {
      var _this = _super.call(this) || this;
      _this.hiddenX = hiddenX;
      _this.appearedX = appearX;
      _this.speed = speed;
      _this.hidden = true;
      _this.x = _this.hiddenX;
      _this.y = 0;
      _this._tachieMap = {
        1: [1, 50],
        2: [2, 550],
        3: [3, 550],
        4: [4, 550],
        5: [5, 550],
        6: [6, 550],
        7: [7, 550],
        10: [7, 550],
        12: [7, 550],
      };
      _this.initBattleTachie();
      _this.preDrawTachie();
      return _this;
    }
    Sprite_BattleTachie.prototype.initBattleTachie = function () {
      this.initBattleTachieOne(1, 121, 650, -30);
      this.initBattleTachieOne(2, 122, 800, 0);
      this.initBattleTachieOne(3, 123, 740, -40);
      this.initBattleTachieOne(4, 124, 750, 0);
      this.initBattleTachieOne(5, 125, 720, -40);
      this.initBattleTachieOne(6, 126, 710, 12);
      this.initBattleTachieOne(7, 127, 730, 0);
      this.initBattleTachieOne(10, 130, 720, 30);
      this.initBattleTachieOne(12, 132, 680, -0);
    };
    Sprite_BattleTachie.prototype.initBattleTachieOne = function (
      id,
      id2,
      xx,
      yy
    ) {
      var actor = $gameActors.actor(id);
      var ero = $gameSystem.getEro(id);
      var actorB = $gameActors.actor(id2);
      var eroB = $gameSystem.getEro(id2);
      //actorB.copyCostume(actor, eroB, ero);
      actorB.setPoseId(this.getPoseId(actorB));
      actorB.setInnerBottomId(actor.innerBottomId);
      actorB.setInnerTopId(actor.innerTopId);
      actorB.setHoppeId(actor.hoppeId);
      actorB.setOuterId(actor.outerId);
      actorB.setAcceMap(actor.acceMap);
      actorB.setLegId(actor.legId);
      actorB.changeEquip(2, actor.equip(2));
      actorB._boteId = actor.boteId;
      this._tachieMap[id] = [id2, xx, yy];
    };
    Sprite_BattleTachie.prototype.getInnerBottomId = function (actorB) {
      if (
        actorB.actorId() == 21 ||
        actorB.actorId() == 22 ||
        actorB.actorId() == 23
      ) {
        if (actorB.poseId == 2) {
          if (actorB.innerBottomId == "b") {
            return "g";
          }
        }
      }
      return actorB.innerBottomId;
    };
    Sprite_BattleTachie.prototype.getPoseId = function (actorB) {
      var outerId = actorB.outerId;
      if (actorB.actorId() == 21) {
        switch (outerId) {
          case "bb":
          case "cc":
          case "dd":
          case "ff":
          case "g":
          case "gg":
          case "h":
          case "hh":
          case "i":
          case "ii":
            return 2;
        }
      }
      return 1;
    };
    Sprite_BattleTachie.prototype.setActorCommandWindow = function (
      commandWindow
    ) {
      this._commandWindow = commandWindow;
    };
    Sprite_BattleTachie.prototype.setSkillWindow = function (skillWindow) {
      this._skillWindow = skillWindow;
    };
    Sprite_BattleTachie.prototype.setItemWindow = function (itemWindow) {
      this._itemWindow = itemWindow;
    };
    Sprite_BattleTachie.prototype.update = function () {
      this.moveToTargetPosition();
      _super.prototype.update.call(this);
      this.updateTachie();
    };
    Sprite_BattleTachie.prototype.updateTachie = function () {
      if (!this._commandWindow || !this._commandWindow._actor) {
        return;
      }
      var id = this._commandWindow._actor.actorId();
      if (id != this.actorId) {
        if (this.x == this.hiddenX) {
          if (id > 0) {
            var array = this._tachieMap[id];
            //var actor = $gameActors.actor(121);
            var actor = $gameActors.actor(array[0]);
            this.appearedX = array[1];
            var success = this.drawTachieActor(
              actor,
              null,
              0,
              array[2],
              null,
              actor.defaultFaceId,
              1,
              true
            );
            if (success) {
              this.actorId = id;
            }
          }
        } else if (this.x == this.appearedX) {
          this.hidden = true;
        }
      } else {
        if ($gameTemp.analyze) {
          this.hidden = true;
        } else if ($gameTroop.isEventRunning()) {
          this.hidden = true;
        } else if (this._skillWindow.active || this._itemWindow.active) {
          this.hidden = false;
        } else if (!this._commandWindow || !this._commandWindow.active) {
          this.hidden = true;
        } else {
          this.hidden = false;
        }
      }
    };
    Sprite_BattleTachie.prototype.preDrawTachie = function () {
      this.x = this.hiddenX;
      var realActor = $gameParty.battleMembers()[0];
      var actorId = realActor.actorId();
      var array = this._tachieMap[actorId];
      var actor = $gameActors.actor(array[0]);
      var success = this.drawTachieActor(
        actor,
        null,
        0,
        array[2],
        null,
        actor.defaultFaceId,
        1,
        true
      );
    };
    /*
        moveToTargetPosition(): void {
            if (this.hidden) {
                if (Math.abs(this.hiddenX - this.x) < this.speed) {
                    this.x = this.hiddenX;
                } else if (this.hiddenX < this.x) {
                    this.x -= this.speed;
                } else {
                    this.x += this.speed;
                }
            } else {
                if (Math.abs(this.appearedX - this.x) < this.speed) {
                    this.x = this.appearedX;
                } else if (this.appearedX > this.x) {
                    this.x += this.speed;
                } else {
                    this.x -= this.speed;
                }
            }
        }*/
    Sprite_BattleTachie.prototype.moveToTargetPosition = function () {
      if (this.hidden) {
        if (Math.abs(this.hiddenX - this.x) < this.speed) {
          this.x = this.hiddenX;
        } else if (this.hiddenX > this.x) {
          this.x += this.speed;
        } else {
          this.x -= this.speed;
        }
      } else {
        if ($gameTemp.isAutoBattle()) {
          return;
        }
        if (Math.abs(this.appearedX - this.x) < this.speed) {
          this.x = this.appearedX;
        } else if (this.appearedX > this.x) {
          this.x += this.speed;
        } else {
          this.x -= this.speed;
        }
      }
    };
    return Sprite_BattleTachie;
  })(Sprite);
})(Nore || (Nore = {}));
