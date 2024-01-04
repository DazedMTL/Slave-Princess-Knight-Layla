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
  var Scene_Difficulty = /** @class */ (function (_super) {
    __extends(Scene_Difficulty, _super);
    function Scene_Difficulty() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Scene_Difficulty.prototype.create = function () {
      Nore.Scene_Talk.prototype.create.call(this);
      this.createWindowLayer();
      this.createAllWindows();
      this.createInfoWindow();
      this.createCommandWindow();
      this.createConfirmWindow();
      this.createLabel();
      this.showBackground();
      this.startInitialScenario();
      this.initSw();
    };
    Scene_Difficulty.prototype.initSw = function () {
      $gameSwitches.setValue(85, false);
      this._lastDifficulty = $gameSystem.difficulty();
    };
    Scene_Difficulty.prototype.createLabel = function () {
      this._label1 = new Nore.Window_Label2(
        TextManager.difficultyText,
        116,
        20,
        520
      );
      this.addWindow(this._label1);
    };
    Scene_Difficulty.prototype.updateBackLog = function () {};
    Scene_Difficulty.prototype.startInitialScenario = function () {
      if ($gameSwitches.value(253)) {
        return;
      }
      this._difficultyCommandWindow.deactivate();
      $gameSwitches.setValue(253, true);
      this.playScenario("難易度選択画面_01");
    };
    Scene_Difficulty.prototype.finishScenario = function () {
      this._difficultyCommandWindow.activate();
      //this._kigaeSlotWindow.activate();
    };
    Scene_Difficulty.prototype.createWindowLayer = function () {
      this.createPictures();
      _super.prototype.createWindowLayer.call(this);
    };
    Scene_Difficulty.prototype.showBackground = function () {
      //$gameScreen.showPicture(1, 'esfan_004_1920_1080', 0, 0, 0, 100, 100, 155, PIXI.BLEND_MODES.NORMAL, 0);
    };
    Scene_Difficulty.prototype.createPictures = function () {};
    Scene_Difficulty.prototype.createCommandWindow = function () {
      var r = new Rectangle(120, 100, 230, 246);
      this._difficultyCommandWindow = new Window_DifficultyCommand(r);
      this._difficultyCommandWindow.setHandler(
        "change",
        this.onChange.bind(this)
      );
      this._difficultyCommandWindow.setHandler("ok", this.onOk.bind(this));
      this._difficultyCommandWindow.setHandler(
        "cancel",
        this.onCancel.bind(this)
      );
      this.addChild(this._difficultyCommandWindow);
      var index = 0;
      switch ($gameSystem.difficulty()) {
        case Difficulty.DUNGEON_SKIP:
          index = 0;
          break;
        case Difficulty.VERY_EASY:
          index = 1;
          break;
        case Difficulty.EASY:
          index = 2;
          break;
        case Difficulty.NORMAL:
          index = 3;
          break;
        case Difficulty.HARD:
          index = 4;
          break;
      }
      this._difficultyCommandWindow.select(index);
      this.onChange();
    };
    Scene_Difficulty.prototype.createConfirmWindow = function () {
      this._confirmWindow = new Nore.Window_Confirm();
      this._confirmWindow.setText(TextManager.cancelText);
      this._confirmWindow.setHandler("ok", this.onConfirmOk.bind(this));
      this._confirmWindow.setHandler("cancel", this.onConfirmCancel.bind(this));
      this._confirmWindow.deactivate();
      this.addChild(this._confirmWindow);
      this._confirmWindow.hide();
    };
    Scene_Difficulty.prototype.createInfoWindow = function () {
      var r = new Rectangle(360, 100, 700, 350);
      this._difficultyWindow = new Window_Difficulty(r);
      this.addChild(this._difficultyWindow);
    };
    Scene_Difficulty.prototype.onConfirmOk = function () {
      //this._actor.resetFace();
      this._actor.setNaked(0);
      this._actor.putOnOuter();
      this._lastCos.restoreCostume();
      this._actor.setCacheChanged();
      $gamePlayer.refresh();
      this.popScene();
    };
    Scene_Difficulty.prototype.onConfirmCancel = function () {
      this._confirmWindow.hide();
      this._confirmWindow.deactivate();
      this._difficultyCommandWindow.activate();
    };
    Scene_Difficulty.prototype.createBackground = function () {
      /*this._backgroundSprite = new Sprite();
            this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
            this.addChild(this._backgroundSprite);*/
    };
    Scene_Difficulty.prototype.createKigaeSlotWindow = function () {};
    Scene_Difficulty.prototype.onTouchSelect = function () {
      if (this.isInterpreterRunning()) {
        return;
      }
      this.onCancelSlot();
    };
    Scene_Difficulty.prototype.onDecide = function () {
      $gameScreen.erasePicture(1);
      //this._actor.resetFace();
      $gamePlayer.refresh();
      this.popScene();
    };
    Scene_Difficulty.prototype.onCancel = function () {
      if ($gameSwitches.value(86)) {
        this._difficultyCommandWindow.activate();
        return;
      }
      $gameSystem.setDifficulty(this._lastDifficulty);
      this.onDecide();
    };
    Scene_Difficulty.prototype.onOk = function () {
      $gameSystem.setDifficulty(this.getSelectedDifficulty());
      if (this._lastDifficulty != $gameSystem.difficulty()) {
        $gameSwitches.setValue(85, true);
        $gameVariables.setValue(20, $gameSystem.getDifficultyText());
      } else {
        $gameVariables.setValue(20, $gameSystem.getDifficultyText());
      }
      this.popScene();
    };
    Scene_Difficulty.prototype.onChange = function () {
      var d = this.getSelectedDifficulty();
      this._difficultyWindow.setDifficulty(d);
    };
    Scene_Difficulty.prototype.getSelectedDifficulty = function () {
      var symbol = this._difficultyCommandWindow.currentSymbol();
      switch (symbol) {
        case "dungeonSkip":
          return Difficulty.DUNGEON_SKIP;
        case "veryEasy":
          return Difficulty.VERY_EASY;
        case "easy":
          return Difficulty.EASY;
        case "normal":
          return Difficulty.NORMAL;
        case "hard":
          return Difficulty.HARD;
      }
      console.error("invalid difficulty");
    };
    return Scene_Difficulty;
  })(Nore.Scene_Talk);
  Nore.Scene_Difficulty = Scene_Difficulty;
  var Window_DifficultyCommand = /** @class */ (function (_super) {
    __extends(Window_DifficultyCommand, _super);
    function Window_DifficultyCommand() {
      var _this = (_super !== null && _super.apply(this, arguments)) || this;
      _this._canOk = true;
      return _this;
    }
    Window_DifficultyCommand.prototype.setCanOk = function (b) {
      if (this._canOk == b) {
        return;
      }
      this._canOk = b;
      this.refresh();
    };
    Window_DifficultyCommand.prototype.makeCommandList = function () {
      this.addCommand(TextManager.dungeonSkip, "dungeonSkip", true, null);
      this.addCommand(TextManager.veryEasy, "veryEasy", true, null);
      this.addCommand(TextManager.easy, "easy", true, null);
      this.addCommand(TextManager.normal, "normal", true, null);
      this.addCommand(TextManager.hard, "hard", true, null);
    };
    return Window_DifficultyCommand;
  })(Window_Command);
  var Window_Difficulty = /** @class */ (function (_super) {
    __extends(Window_Difficulty, _super);
    function Window_Difficulty() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Window_Difficulty.prototype.setDifficulty = function (d) {
      var text = this.getText(d);
      this.showText(text);
    };
    Window_Difficulty.prototype.showText = function (texts) {
      this.contents.clear();
      var xx = 10;
      var yy = 10;
      for (var i = 0; i < texts.length; i++) {
        var text = texts[i];
        var lh = this.lineHeight();
        this.drawTextEx(text, xx, lh * i + yy, 550);
      }
    };
    Window_Difficulty.prototype.getText = function (d) {
      switch (d) {
        case Difficulty.DUNGEON_SKIP:
          return TextManager.dungeonSkipInfo;
        case Difficulty.VERY_EASY:
          return TextManager.veryEasyInfo;
        case Difficulty.EASY:
          return TextManager.easyInfo;
        case Difficulty.NORMAL:
          return TextManager.normalInfo;
        case Difficulty.HARD:
          return TextManager.hardInfo;
      }
      return [];
    };
    return Window_Difficulty;
  })(Window_Base);
})(Nore || (Nore = {}));
