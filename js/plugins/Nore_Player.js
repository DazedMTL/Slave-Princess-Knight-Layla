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
Game_CharacterBase.prototype.rotation = function () {
  return 0;
};
Game_Event.prototype.rotation = function () {
  if (!this.page()) {
    return 0;
  }
  var list = this.page().list;
  if (list.length == 0) {
    return 0;
  }
  var firstEvent = list[0];
  if (firstEvent.code != 108) {
    return 0;
  }
  if (firstEvent.parameters[0] == "rotation") {
    return 90 * (Math.PI / 180);
  }
  return 0;
};
var _Game_Event_screenX = Game_Event.prototype.screenX;
Game_Event.prototype.screenX = function () {
  if (this.rotation() > 0) {
    return _Game_Event_screenX.call(this) - 20;
  }
  return _Game_Event_screenX.call(this);
};
var _Game_Event_screenY = Game_Event.prototype.screenY;
Game_Event.prototype.screenY = function () {
  if (this.rotation() > 0) {
    return _Game_Event_screenY.call(this) - 20;
  }
  return _Game_Event_screenY.call(this);
};
var Game_Player2 = /** @class */ (function (_super) {
  __extends(Game_Player2, _super);
  function Game_Player2() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  Game_Player2.prototype.mainActorId = function () {
    if ($gameSystem.sarachiActorId() > 0) {
      // 蛮族
      return 30;
    }
    if ($gameSystem.chokyoActorId() > 0) {
      var actorId = $gameSystem.chokyoActorId();
      return actorId;
    }
    return 1;
  };
  Game_Player2.prototype.mainActor = function () {
    return $gameActors.actor(this.mainActorId());
  };
  Game_Player2.prototype.canMove = function () {
    if ($gameSwitches.value(13)) {
      // タイムライン表示中
      return false;
    }
    return _super.prototype.canMove.call(this);
  };
  Game_Player2.prototype.centerY = function () {
    if ($gameSwitches.value(1)) {
      return (Graphics.height / $gameMap.tileHeight() - 1) / 2.0 + 1;
    } else {
      return (Graphics.height / $gameMap.tileHeight() - 1) / 2.0;
    }
  };
  Game_Player2.prototype.screenX = function () {
    var offset = 0;
    if ($gameSystem.isEroBackSexAnime()) {
      offset = -24;
    } else if ($gameSystem.isEroSexAnime()) {
      offset = -24;
    } else if ($gameSystem.isEroFelaAnime()) {
      offset = 24;
    } else if ($gameSystem.isInPersonSexAnime()) {
      offset = -24;
    }
    return _super.prototype.screenX.call(this) + offset;
  };
  Game_Player2.prototype.rotation = function () {
    if ($gameSystem.isInPersonSexAnime()) {
      return 0;
    }
    if ($gameSystem.isEroSexAnime()) {
      return 90 * (Math.PI / 180);
    }
    return 0;
  };
  return Game_Player2;
})(Game_Player);
Game_Followers.prototype.reverseData = function () {
  return this._data.clone().reverse();
};
var BARBARIAN_ID2 = 31;
Game_Followers.prototype.setup = function () {
  this._data = [];
  if ($gameSystem.sarachiActorId() > 0) {
    var actor = $gameActors.actor($gameSystem.sarachiActorId());
    this._data.push(new Game_Follower(this.findIndex(actor)));
    this._data.push(new Game_Follower(BARBARIAN_ID2));
    this._data.push(new Game_Follower(-1));
    return;
  }
  for (var i = 1; i < $gameParty.battleMembers().length; i++) {
    this._data.push(new Game_Follower(i));
  }
  if ($gameSystem.day() > 1) {
    this._data.push(new Game_Follower(-1));
  }
};
Game_Follower.prototype.isVisible = function () {
  if ($gameSwitches.value(118) && this.actor()) {
    if (this.actor().actorId() == 2) {
      return false;
    }
    if (this.actor().actorId() == 20) {
      return false;
    }
  }
  return this.actor() && $gamePlayer.followers().isVisible();
};
Game_Followers.prototype.findIndex = function (actor) {
  return $gameParty.members().indexOf(actor);
};
Game_Follower.prototype.actor = function () {
  if (this._memberIndex < 0) {
    return $gameActors.actor(20);
  }
  if (this._memberIndex == BARBARIAN_ID2) {
    return $gameActors.actor(BARBARIAN_ID2);
  }
  if ($gameSwitches.value(101)) {
    return $gameParty.members()[this._memberIndex];
  } else {
    return $gameParty.battleMembers()[this._memberIndex];
  }
};
