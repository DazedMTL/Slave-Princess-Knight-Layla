/*:ja
 * @target MZ
 * @author ル
 *
 * @command ShowAnimation
 */
var Nore;
(function (Nore) {
  var pluginName = "Nore_Layout";
  PluginManager.registerCommand(pluginName, "ShowAnimation", function (args) {
    SceneManager._scene._spriteset.addEffectCountainer();
  });
  Window_ChoiceList.prototype.windowX = function () {
    var offset = 728;
    switch ($gameVariables.value(18)) {
      case 0:
        return 180 + offset - this.windowWidth();
      case 1:
        return 330 + offset - this.windowWidth();
      case 2:
        return 630 + offset - this.windowWidth();
      case 4:
        return 530 + offset - this.windowWidth();
      case 3:
      case 7:
        return 0 + offset - this.windowWidth() - 200;
    }
    var positionType = $gameMessage.choicePositionType();
    if (positionType === 1) {
      return (Graphics.boxWidth - this.windowWidth()) / 2;
    } else if (positionType === 2) {
      return Graphics.boxWidth - this.windowWidth() - 300;
    } else {
      return 0;
    }
  };
  Game_Screen.prototype.maxPictures = function () {
    return 30;
  };
  Window_StatusBase.prototype.drawActorSimpleStatus = function (actor, x, y) {
    var lineHeight = this.lineHeight();
    var x2 = x + 180;
    var x3 = x2 + 180;
    this.drawActorName(actor, x, y);
    this.drawActorLevel(actor, x, y + lineHeight * 1);
    this.drawActorIcons(actor, x, y + lineHeight * 2);
    this.drawActorNickname(actor, x, y - lineHeight, 270);
    this.drawActorClass(actor, x2, y);
    this.placeBasicGauges(actor, x2, y + lineHeight);
  };
  Scene_Message.prototype.messageWindowRect = function () {
    var ww = Graphics.boxWidth - 300;
    var wh = 140;
    var wx = 200;
    var wy = 0;
    return new Rectangle(wx, wy, ww, wh);
  };
  Window_ChoiceList.prototype.windowY = function () {
    var messageY = this._messageWindow.y;
    if (messageY >= Graphics.boxHeight / 2) {
      return messageY - this.windowHeight() - 14;
    } else {
      return messageY + this._messageWindow.height - 14;
    }
  };
  /*
    Spriteset_Map.prototype.createUpperLayer = function() {
        Spriteset_Base.prototype.createUpperLayer.call(this);
        this.addChild(this._effectsContainer);
    };*/
  Spriteset_Map.prototype.addEffectCountainer = function () {
    this.addChild(this._effectsContainer);
  };
  Game_Screen.prototype.updateFadeOut = function () {
    if (this._fadeOutDuration > 0) {
      if (isSkipKey()) {
        this._brightness = 0;
        this._fadeOutDuration = 0;
      } else {
        var d = this._fadeOutDuration;
        this._brightness = (this._brightness * (d - 1)) / d;
        this._fadeOutDuration--;
      }
    }
  };
  Game_Screen.prototype.updateFadeIn = function () {
    if (this._fadeInDuration > 0) {
      if (isSkipKey()) {
        this._brightness = 255;
        this._fadeInDuration = 0;
      } else {
        var d = this._fadeInDuration;
        this._brightness = (this._brightness * (d - 1) + 255) / d;
        this._fadeInDuration--;
      }
    }
  };
  var _Game_Interpreter_prototype_wait = Game_Interpreter.prototype.wait;
  Game_Interpreter.prototype.wait = function (duration) {
    if (isSkipKey()) {
      this._waitCount = 2;
    } else {
      _Game_Interpreter_prototype_wait.call(this, duration);
    }
  };
  var _Game_Picture_prototype_updateMove = Game_Picture.prototype.updateMove;
  Game_Picture.prototype.updateMove = function () {
    if (this._duration > 0) {
      if (isSkipKey()) {
        this._duration = 1;
        this._x = this.applyEasing(this._x, this._targetX);
        this._y = this.applyEasing(this._y, this._targetY);
        this._scaleX = this.applyEasing(this._scaleX, this._targetScaleX);
        this._scaleY = this.applyEasing(this._scaleY, this._targetScaleY);
        this._opacity = this.applyEasing(this._opacity, this._targetOpacity);
        this._duration--;
      } else {
        _Game_Picture_prototype_updateMove.call(this);
      }
    }
  };
})(Nore || (Nore = {}));
