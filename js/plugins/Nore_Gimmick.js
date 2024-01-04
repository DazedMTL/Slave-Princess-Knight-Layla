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
  var Window_Stage5 = /** @class */ (function (_super) {
    __extends(Window_Stage5, _super);
    function Window_Stage5() {
      var _this = _super.call(this, new Rectangle(1155, 0, 130, 100)) || this;
      _this._lastCount = 0;
      _this.frameVisible = false;
      _this.refresh();
      return _this;
    }
    Window_Stage5.prototype.refresh = function () {
      this._lastCount = $gameParty.getStage5Gimmick().count();
      this.contents.clear();
      var n = STAGE_5_ATTACK - this._lastCount;
      this.drawText("光発動まで", 0, 0, 100);
      this.drawText("あと%1回".format(n), 0, 40, 100);
    };
    Window_Stage5.prototype.update = function () {
      _super.prototype.update.call(this);
      if (this.isChanged()) {
        this.refresh();
      }
    };
    Window_Stage5.prototype.isChanged = function () {
      return this._lastCount != $gameParty.getStage5Gimmick().count();
    };
    return Window_Stage5;
  })(Window_Base);
  Nore.Window_Stage5 = Window_Stage5;
  BattleManager.invokeStage5 = function (subject, target) {
    //p('invokeStage5')
    var action = new Game_Action2(subject);
    action.setSkill(20);
    this._logWindow.reserveAction(action, subject, target);
  };
  Window_BattleLog.prototype.resetGimmick5 = function (action, target) {
    if (action.item().id == 20) {
      $gameParty.getStage5Gimmick().reset();
    }
  };
})(Nore || (Nore = {}));
var STAGE_5_ATTACK = 5;
var Stage5Gimmick = /** @class */ (function () {
  function Stage5Gimmick() {
    this._count = 0;
  }
  Stage5Gimmick.prototype.count = function () {
    return this._count;
  };
  Stage5Gimmick.prototype.onAttack = function (target) {
    this._count++;
    this._lastTarget = target;
    if (this._count >= STAGE_5_ATTACK) {
      return true;
    }
    return false;
  };
  Stage5Gimmick.prototype.reset = function () {
    this._count = 0;
  };
  return Stage5Gimmick;
})();
