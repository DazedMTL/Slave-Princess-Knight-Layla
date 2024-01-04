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
 */
var Nore;
(function (Nore) {
  var RIGHT_X = 1440;
  var LEFT_X = 680;
  var SPEED = 180;
  var Window_ActorCommand2 = /** @class */ (function (_super) {
    __extends(Window_ActorCommand2, _super);
    function Window_ActorCommand2(r) {
      return _super.call(this, r) || this;
    }
    Window_ActorCommand2.prototype.makeCommandList = function () {
      if (this._actor) {
        this.addAttackCommand();
        this.addSkillCommands();
        this.addGuardCommand();
        this.addAutoCommand();
        this.addItemCommand();
      }
    };
    Window_ActorCommand2.prototype.addAttackCommand = function () {
      var skillId = this._actor.attackSkillId();
      var skill = $dataSkills[skillId];
      this.addCommand(
        getItemName(skill),
        "attack",
        this._actor.canAttack() && this.isNotDungeonSkip()
      );
    };
    Window_ActorCommand2.prototype.isNotDungeonSkip = function () {
      return $gameSystem.difficulty() != Difficulty.DUNGEON_SKIP;
    };
    Window_ActorCommand2.prototype.addGuardCommand = function () {
      this.addCommand(TextManager.info, "info", true, 1);
      //this.addCommand(TextManager.guard, "guard", this._actor.canGuard());
      this.addCommand(
        TextManager.skip,
        "skip",
        $gameParty.canSkip() && this.isNotDungeonSkip()
      );
    };
    Window_ActorCommand2.prototype.addAutoCommand = function () {
      this.addCommand(TextManager.auto, "auto", this.isNotDungeonSkip(), 1);
    };
    Window_ActorCommand2.prototype.update = function () {
      _super.prototype.update.call(this);
      this.y = 180;
      this.updateX();
    };
    Window_ActorCommand2.prototype.addSkillCommands = function () {
      this.addCommand(TextManager._skill, "skill", this.isNotDungeonSkip(), 1);
    };
    Window_ActorCommand2.prototype.toRight = function () {
      this._toRight = true;
    };
    Window_ActorCommand2.prototype.toLeft = function () {
      this._toLeft = true;
    };
    Window_ActorCommand2.prototype.updateX = function () {
      if (this._toLeft) {
        if ($gameTemp.isAutoBattle()) {
          this._toLeft = false;
          return;
        }
        if (this.x <= LEFT_X + SPEED) {
          this.x = LEFT_X;
          this._toLeft = false;
        } else {
          this.x -= SPEED;
        }
      } else if (this._toRight) {
        if (this.x >= RIGHT_X) {
          this.x = RIGHT_X;
          this._toRight = false;
        } else {
          this.x += SPEED;
        }
      }
    };
    Window_ActorCommand2.prototype.show = function () {
      _super.prototype.show.call(this);
      this.toLeft();
    };
    Window_ActorCommand2.prototype.hide = function () {
      this.toRight();
    };
    Window_ActorCommand2.prototype.activate = function () {
      _super.prototype.activate.call(this);
      this.toLeft();
    };
    Window_ActorCommand2.prototype.updateOpen = function () {
      if (this._opening) {
        this.openness += 255;
        if (this.isOpen()) {
          this._opening = false;
        }
      }
    };
    Window_ActorCommand2.prototype.hideImmediate = function () {
      this.x = RIGHT_X;
    };
    Window_ActorCommand2.prototype.showImmediate = function () {
      this.x = LEFT_X;
    };
    Window_ActorCommand2.prototype.isCancelEnabled = function () {
      return $gameParty.canSkip();
    };
    Window_ActorCommand2.prototype.refresh = function () {
      _super.prototype.refresh.call(this);
      this.drawBattleItems();
    };
    Window_ActorCommand2.prototype.addItemCommand = function () {
      this.addCommand(
        TextManager._item,
        "item",
        $gameParty.battleItems().length > 0
      );
    };
    Window_ActorCommand2.prototype.drawBattleItems = function () {
      var y = this.itemRect(6).y + 2;
      var x = 4;
      var index = 0;
      var interval = 38;
      var items = $gameParty.battleItems();
      for (var i = 0; i < $gameParty.battleItemMax(); i++) {
        this.contents.fillRect(x + interval * index, y, 32, 32, "#000000");
        if (items[i]) {
          this.drawIcon(items[i].iconIndex, x + interval * index, y);
        }
        index++;
      }
    };
    return Window_ActorCommand2;
  })(Window_ActorCommand);
  Nore.Window_ActorCommand2 = Window_ActorCommand2;
  Scene_Battle.prototype.actorCommandWindowRect = function () {
    var ww = 192;
    var wh = this.calcWindowHeight(7, true);
    var wx = RIGHT_X;
    var wy = 100;
    return new Rectangle(wx, wy, ww, wh);
  };
})(Nore || (Nore = {}));
