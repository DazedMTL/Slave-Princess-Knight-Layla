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
 * @command Kigae
 * @text 着替え
 * @des 着替え
 */
var Nore;
(function (Nore) {
  var WINDOW_TOP_MARGIN = 60;
  var pluginName = "Nore_Kigae";
  var NAKED_ONLY = "nakedOnly";
  var CURSE = "curse";
  Nore.CURSE_ICON_INDEX = 618;
  PluginManager.registerCommand(pluginName, "Kigae", function (args) {
    SceneManager.push(Scene_Kigae);
  });
  var Scene_Kigae = /** @class */ (function (_super) {
    __extends(Scene_Kigae, _super);
    function Scene_Kigae() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Scene_Kigae.prototype.create = function () {
      Nore.Scene_Talk.prototype.create.call(this);
      this.createWindowLayer();
      this.createKigaeSlotWindow();
      this.createKigaeCommandWindow();
      this.createKigaeActorWindow();
      this.createKigaeLabel();
      this.createAllWindows();
      this.createConfirmWindow();
      this.createButtons();
      this.updateActor();
      this.saveLastCos();
      this.onCommandChange();
      this.showBackground();
      this.startInitialScenario();
    };
    Scene_Kigae.prototype.updateBackLog = function () {};
    Scene_Kigae.prototype.update = function () {
      _super.prototype.update.call(this);
    };
    Scene_Kigae.prototype.createButtons = function () {
      this._leftButton = new Sprite_Button("pageup");
      this._leftButton.x = 20;
      this._leftButton.y = this.buttonY();
      this.addChild(this._leftButton);
      this._rightButton = new Sprite_Button("pagedown");
      this._rightButton.x = 140;
      this._rightButton.y = this.buttonY();
      this.addChild(this._rightButton);
    };
    Scene_Kigae.prototype.buttonY = function () {
      return 5;
    };
    Scene_Kigae.prototype.startInitialScenario = function () {
      if ($gameSwitches.value(217)) {
        return;
      }
      this._kigaeSlotWindow.deactivate();
      this._kigaeCommandWindow.deactivate();
      $gameSwitches.setValue(217, true);
      this.playScenario("着替えチュートリアル");
    };
    Scene_Kigae.prototype.finishScenario = function () {
      this._kigaeCommandWindow.activate();
      //this._kigaeSlotWindow.activate();
    };
    Scene_Kigae.prototype.createWindowLayer = function () {
      this.createPictures();
      _super.prototype.createWindowLayer.call(this);
    };
    Scene_Kigae.prototype.showBackground = function () {
      if (this._actor.isCaptive()) {
        $gameScreen.showPicture(
          1,
          "kadofan_003n_1920.1080",
          0,
          0,
          0,
          100,
          100,
          155,
          PIXI.BLEND_MODES.NORMAL,
          0
        );
      } else {
        $gameScreen.showPicture(
          1,
          "esfan_004_1920_1080",
          0,
          0,
          0,
          100,
          100,
          155,
          PIXI.BLEND_MODES.NORMAL,
          0
        );
      }
    };
    Scene_Kigae.prototype.createPictures = function () {
      return;
      var width = Graphics.width;
      var height = Graphics.height;
      var x = (Graphics.width - width) / 2;
      var y = (Graphics.height - height) / 2;
      this._pictureContainer = new Sprite();
      this._pictureContainer.setFrame(x, y, width, height);
      for (var i = 0; i <= $gameScreen.maxPictures(); i++) {
        this._pictureContainer.addChild(new Sprite_Picture(i));
      }
      this.addChild(this._pictureContainer);
    };
    Scene_Kigae.prototype.createConfirmWindow = function () {
      this._confirmWindow = new Nore.Window_Confirm();
      this._confirmWindow.setText(TextManager.cancelText);
      this._confirmWindow.setHandler("ok", this.onConfirmOk.bind(this));
      this._confirmWindow.setHandler("cancel", this.onConfirmCancel.bind(this));
      this._confirmWindow.deactivate();
      this.addChild(this._confirmWindow);
      this._confirmWindow.hide();
    };
    Scene_Kigae.prototype.onConfirmOk = function () {
      //this._actor.resetFace();
      this._actor.setNaked(0);
      this._actor.putOnOuter();
      this._lastCos.restoreCostume();
      this._actor.setCacheChanged();
      $gamePlayer.refresh();
      $gameTemp.isCancelMenu = true;
      this.popScene();
    };
    Scene_Kigae.prototype.onConfirmCancel = function () {
      this._confirmWindow.hide();
      this._confirmWindow.deactivate();
      this._kigaeCommandWindow.activate();
    };
    Scene_Kigae.prototype.saveLastCos = function () {
      this._lastCos = new CostumeSaver(this._actor.actorId());
    };
    Scene_Kigae.prototype.createKigaeLabel = function () {
      this._label1 = new Window_Label3(TextManager.kigaeError1, 600, 20);
      this._label1.visible = false;
      this.addWindow(this._label1);
      this._label2 = new Window_Label3(TextManager.kigaeError2, 600, 20);
      this._label2.visible = false;
      this.addWindow(this._label2);
      this._label3 = new Window_Label3("", 200, 10);
      this._label3.hideFrame();
      //this._label3.visible = false;
      this.addWindow(this._label3);
    };
    Scene_Kigae.prototype.createBackground = function () {
      /*this._backgroundSprite = new Sprite();
            this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
            this.addChild(this._backgroundSprite);*/
    };
    Scene_Kigae.prototype.createKigaeSlotWindow = function () {
      this._kigaeSlotWindow = new Window_KigaeSlot("cos");
      this._kigaeSlotWindow.setHandler("ok", this.onOk.bind(this));
      this._kigaeSlotWindow.setHandler("change", this.onChange.bind(this));
      this._kigaeSlotWindow.setHandler("cancel", this.onCancelSlot.bind(this));
      this._kigaeSlotWindow.setHandler(
        "touchSelect",
        this.onTouchSelect.bind(this)
      );
      this._kigaeSlotWindow.setHandler("pageup", this.onPageup.bind(this));
      this._kigaeSlotWindow.setHandler("pagedown", this.onPagedown.bind(this));
      this._kigaeSlotWindow.deactivate();
      this.addWindow(this._kigaeSlotWindow);
      this._kigaeSlotWindow2 = new Window_KigaeSlot("acce");
      this._kigaeSlotWindow2.setHandler("ok", this.onOk2.bind(this));
      this._kigaeSlotWindow2.setHandler("change", this.onChange.bind(this));
      this._kigaeSlotWindow2.setHandler("cancel", this.onCancelSlot.bind(this));
      this._kigaeSlotWindow2.setHandler(
        "touchSelect",
        this.onTouchSelect.bind(this)
      );
      this._kigaeSlotWindow2.setHandler("pageup", this.onPageup.bind(this));
      this._kigaeSlotWindow2.setHandler("pagedown", this.onPagedown.bind(this));
      this.addWindow(this._kigaeSlotWindow2);
      this._kigaeSlotWindow3 = new Window_KigaeSlot("face");
      this._kigaeSlotWindow3.setHandler("ok", this.onOk3.bind(this));
      this._kigaeSlotWindow3.setHandler("change", this.onChange.bind(this));
      this._kigaeSlotWindow3.setHandler("cancel", this.onCancelSlot.bind(this));
      this._kigaeSlotWindow3.setHandler(
        "touchSelect",
        this.onTouchSelect.bind(this)
      );
      this._kigaeSlotWindow3.setHandler("pageup", this.onPageup.bind(this));
      this._kigaeSlotWindow3.setHandler("pagedown", this.onPagedown.bind(this));
      this.addWindow(this._kigaeSlotWindow3);
      this._kigaeSlotWindow4 = new Window_KigaeSlot("inner");
      this._kigaeSlotWindow4.setHandler("ok", this.onOk4.bind(this));
      this._kigaeSlotWindow4.setHandler("change", this.onChange.bind(this));
      this._kigaeSlotWindow4.setHandler("cancel", this.onCancelSlot.bind(this));
      this._kigaeSlotWindow4.setHandler(
        "touchSelect",
        this.onTouchSelect.bind(this)
      );
      this._kigaeSlotWindow4.setHandler("pageup", this.onPageup.bind(this));
      this._kigaeSlotWindow4.setHandler("pagedown", this.onPagedown.bind(this));
      this.addWindow(this._kigaeSlotWindow4);
      this._kigaeSlotWindow5 = new Window_KigaeSlot("rakugaki");
      this._kigaeSlotWindow5.setHandler("ok", this.onOk5.bind(this));
      this._kigaeSlotWindow5.setHandler("change", this.onChange.bind(this));
      this._kigaeSlotWindow5.setHandler("cancel", this.onCancelSlot.bind(this));
      this._kigaeSlotWindow5.setHandler(
        "touchSelect",
        this.onTouchSelect.bind(this)
      );
      this._kigaeSlotWindow5.setHandler("pageup", this.onPageup.bind(this));
      this._kigaeSlotWindow5.setHandler("pagedown", this.onPagedown.bind(this));
      this.addWindow(this._kigaeSlotWindow5);
    };
    Scene_Kigae.prototype.onPageup = function () {
      this.previousActor();
      this._kigaeCommandWindow.deactivate();
    };
    Scene_Kigae.prototype.onPagedown = function () {
      this.nextActor();
      this._kigaeCommandWindow.deactivate();
    };
    Scene_Kigae.prototype.onTouchSelect = function () {
      if (this.isInterpreterRunning()) {
        return;
      }
      this.onCancelSlot();
      if (this._kigaeSlotWindow.visible) {
        this._kigaeSlotWindow.activate();
      } else if (this._kigaeSlotWindow2.visible) {
        this._kigaeSlotWindow2.activate();
      } else if (this._kigaeSlotWindow3.visible) {
        this._kigaeSlotWindow3.activate();
      } else if (this._kigaeSlotWindow4.visible) {
        this._kigaeSlotWindow4.activate();
      } else if (this._kigaeSlotWindow5.visible) {
        this._kigaeSlotWindow5.activate();
      } else {
        return;
      }
      this._kigaeCommandWindow.deactivate();
    };
    Scene_Kigae.prototype.createKigaeCommandWindow = function () {
      this._kigaeCommandWindow = new Window_KigaeCommand(
        new Rectangle(6, WINDOW_TOP_MARGIN, 200, 38 * 6 + 60)
      );
      this._kigaeCommandWindow.setHandler(
        "change",
        this.onCommandChange.bind(this)
      );
      this._kigaeCommandWindow.setHandler("ok", this.onDecide.bind(this));
      this._kigaeCommandWindow.setHandler("cancel", this.onCancel.bind(this));
      this._kigaeCommandWindow.setHandler("cos", this.onCos.bind(this));
      this._kigaeCommandWindow.setHandler("acce", this.onAcce.bind(this));
      this._kigaeCommandWindow.setHandler("face", this.onFace.bind(this));
      this._kigaeCommandWindow.setHandler("inner", this.onInner.bind(this));
      this._kigaeCommandWindow.setHandler(
        "rakugaki",
        this.onRakugaki.bind(this)
      );
      this._kigaeCommandWindow.setHandler(
        "pagedown",
        this.nextActor.bind(this)
      );
      this._kigaeCommandWindow.setHandler(
        "pageup",
        this.previousActor.bind(this)
      );
      this.addWindow(this._kigaeCommandWindow);
    };
    Scene_Kigae.prototype.nextActor = function () {
      SoundManager.playCursor();
      this.decideActor();
      $gameParty.makeMenuActorNext();
      this.updateActor();
      this._kigaeCommandWindow.activate();
    };
    Scene_Kigae.prototype.previousActor = function () {
      SoundManager.playCursor();
      this.decideActor();
      $gameParty.makeMenuActorPrevious();
      this.updateActor();
      this._kigaeCommandWindow.activate();
    };
    Scene_Kigae.prototype.onCancelSlot = function () {
      this._kigaeSlotWindow.deactivate();
      this._kigaeSlotWindow2.deactivate();
      this._kigaeSlotWindow3.deactivate();
      this._kigaeSlotWindow4.deactivate();
      this._kigaeSlotWindow5.deactivate();
      this._kigaeCommandWindow.activate();
    };
    Scene_Kigae.prototype.onAcce = function () {
      this._kigaeSlotWindow2.activate();
    };
    Scene_Kigae.prototype.onCos = function () {
      this._kigaeSlotWindow.activate();
    };
    Scene_Kigae.prototype.onFace = function () {
      this._kigaeSlotWindow3.activate();
    };
    Scene_Kigae.prototype.onInner = function () {
      this._kigaeSlotWindow4.activate();
    };
    Scene_Kigae.prototype.onRakugaki = function () {
      this._kigaeSlotWindow5.activate();
    };
    Scene_Kigae.prototype.onCommandChange = function () {
      if (this._kigaeCommandWindow.currentSymbol() == "cos") {
        this._kigaeSlotWindow.show();
        this._kigaeSlotWindow2.hide();
        this._kigaeSlotWindow3.hide();
        this._kigaeSlotWindow4.hide();
        this._kigaeSlotWindow5.hide();
        this._kigaeActorWindow.setNaked(0);
      } else if (this._kigaeCommandWindow.currentSymbol() == "acce") {
        this._kigaeSlotWindow2.show();
        this._kigaeSlotWindow3.hide();
        this._kigaeSlotWindow4.hide();
        this._kigaeSlotWindow5.hide();
        this._kigaeSlotWindow.hide();
        this._kigaeActorWindow.setNaked(2);
      } else if (this._kigaeCommandWindow.currentSymbol() == "face") {
        this._kigaeSlotWindow3.show();
        this._kigaeSlotWindow2.hide();
        this._kigaeSlotWindow4.hide();
        this._kigaeSlotWindow5.hide();
        this._kigaeSlotWindow.hide();
        this._kigaeActorWindow.setNaked(2);
      } else if (this._kigaeCommandWindow.currentSymbol() == "inner") {
        this._kigaeSlotWindow4.show();
        this._kigaeSlotWindow2.hide();
        this._kigaeSlotWindow3.hide();
        this._kigaeSlotWindow5.hide();
        this._kigaeSlotWindow.hide();
        this._kigaeActorWindow.setNaked(1);
      } else if (this._kigaeCommandWindow.currentSymbol() == "rakugaki") {
        this._kigaeSlotWindow5.show();
        this._kigaeSlotWindow2.hide();
        this._kigaeSlotWindow3.hide();
        this._kigaeSlotWindow4.hide();
        this._kigaeSlotWindow.hide();
        this._kigaeActorWindow.setNaked(2);
      } else {
        this._kigaeSlotWindow.hide();
        this._kigaeSlotWindow2.hide();
        this._kigaeSlotWindow3.hide();
        this._kigaeActorWindow.setNaked(0);
      }
    };
    Scene_Kigae.prototype.decideActor = function () {
      this._actor.setNaked(0);
      this._actor.putOnOuter();
      this._actor.setCacheChanged();
      this._actor.getLastHistory().saveCostumeAuto();
    };
    Scene_Kigae.prototype.onDecide = function () {
      $gameScreen.erasePicture(1);
      //this._actor.resetFace();
      this.decideActor();
      $gamePlayer.refresh();
      $gameTemp.isCancelMenu = true;
      this.popScene();
    };
    Scene_Kigae.prototype.onCancel = function () {
      this.onDecide();
      return;
      this._confirmWindow.setInfo(true);
      this._confirmWindow.show();
      this._confirmWindow.activate();
    };
    Scene_Kigae.prototype.createKigaeActorWindow = function () {
      this._kigaeActorWindow = new Window_KigaeActor();
      this.addWindow(this._kigaeActorWindow);
    };
    Scene_Kigae.prototype.updateActor = function () {
      this._actor = $gameParty.menuActor();
      this._actor.putOnOuter();
      this._actor.setCacheChanged();
      if (this._kigaeActorWindow) {
        this._kigaeSlotWindow.setActor(this._actor);
        this._kigaeSlotWindow2.setActor(this._actor);
        this._kigaeSlotWindow3.setActor(this._actor);
        this._kigaeSlotWindow4.setActor(this._actor);
        this._kigaeSlotWindow5.setActor(this._actor);
        this._kigaeActorWindow.setActor(this._actor);
      }
      this.updateLabel3();
    };
    Scene_Kigae.prototype.updateLabel3 = function () {
      var text;
      if (
        $gameVariables.value(5) == this._actor.actorId() &&
        $gameSystem.inChokyo()
      ) {
        text = TextManager.kigaeChokyo;
      } else {
        text = TextManager.kigaeNormal;
      }
      this._label3.setText(text);
    };
    Scene_Kigae.prototype.onOk = function () {
      this._actor.setCacheChanged();
      this._kigaeSlotWindow.decide();
      this._kigaeSlotWindow.refresh();
      this._kigaeActorWindow.refresh();
      this._kigaeSlotWindow.activate();
    };
    Scene_Kigae.prototype.onOk2 = function () {
      this._actor.setCacheChanged();
      this._kigaeSlotWindow2.decide();
      this._kigaeSlotWindow2.refresh();
      this._kigaeActorWindow.refresh();
      this._kigaeSlotWindow2.activate();
    };
    Scene_Kigae.prototype.onOk3 = function () {
      this._actor.setCacheChanged();
      this._kigaeSlotWindow3.decide();
      this._kigaeSlotWindow3.refresh();
      this._kigaeActorWindow.refresh();
      this._kigaeSlotWindow3.activate();
    };
    Scene_Kigae.prototype.onOk4 = function () {
      this._actor.setCacheChanged();
      this._kigaeSlotWindow4.decide();
      this._kigaeSlotWindow4.refresh();
      this._kigaeActorWindow.refresh();
      this._kigaeSlotWindow4.activate();
    };
    Scene_Kigae.prototype.onOk5 = function () {
      this._actor.setCacheChanged();
      this._kigaeSlotWindow5.decide();
      this._kigaeSlotWindow5.refresh();
      this._kigaeActorWindow.refresh();
      this._kigaeSlotWindow5.activate();
    };
    Scene_Kigae.prototype.updateCanOk = function () {
      this._label1.visible = !this.isCanOk();
      this._kigaeCommandWindow.setCanOk(this.isCanOk());
    };
    Scene_Kigae.prototype.isCanOk = function () {
      return true;
    };
    Scene_Kigae.prototype.selectedArmor = function () {
      if (this._kigaeSlotWindow.active) {
        return this._kigaeSlotWindow.armor();
      }
      if (this._kigaeSlotWindow2.active) {
        return this._kigaeSlotWindow2.armor();
      }
      if (this._kigaeSlotWindow3.active) {
        return this._kigaeSlotWindow3.armor();
      }
      if (this._kigaeSlotWindow4.active) {
        return this._kigaeSlotWindow4.armor();
      }
      if (this._kigaeSlotWindow5.active) {
        return this._kigaeSlotWindow5.armor();
      }
      return null;
    };
    Scene_Kigae.prototype.selectedAcceId = function () {
      if (this._kigaeSlotWindow.active) {
        return this._kigaeSlotWindow.acceId();
      }
      if (this._kigaeSlotWindow2.active) {
        return this._kigaeSlotWindow2.acceId();
      }
      if (this._kigaeSlotWindow3.active) {
        return this._kigaeSlotWindow3.acceId();
      }
      if (this._kigaeSlotWindow4.active) {
        return this._kigaeSlotWindow4.acceId();
      }
      if (this._kigaeSlotWindow5.active) {
        return this._kigaeSlotWindow5.acceId();
      }
      return null;
    };
    Scene_Kigae.prototype.onChange = function () {
      this._kigaeActorWindow.drawTexts("");
      var acceId = this.selectedAcceId();
      var armor = this.selectedArmor();
      if (!armor) {
        return;
      }
      this._label1.visible = false;
      this._label2.visible = false;
      /*if (! this._actor.isObedienceOk(armor)) {
                this._label2.visible = true;
            }
            if (! this._actor.isNastyOk(armor)) {
                this._label1.visible = true;
            }*/
      if (acceId) {
        this._kigaeActorWindow.drawTexts([]);
        //this._kigaeActorWindow.setNaked(2);
        if (!this._kigaeSlotWindow.isEnabled(armor)) {
          var hint = armor.meta["hint"];
          if (hint) {
            this._kigaeActorWindow.drawTexts([TextManager.hint, hint]);
          }
        } else if (!armor.meta["open"]) {
          if (armor.meta[CURSE]) {
            this._kigaeActorWindow.drawTexts([TextManager.curse]);
          } else if (armor.meta[NAKED_ONLY]) {
            this._kigaeActorWindow.drawTexts([TextManager.nakedOnly]);
          } else {
            this._kigaeActorWindow.drawTexts([""]);
          }
        }
        var miniChimpo = armor.meta["miniChimpo"];
        if (miniChimpo) {
          p(miniChimpo);
          this._kigaeActorWindow.drawTexts([TextManager.miniChimpoEquip]);
        }
        return;
      }
      if (this.isNaked()) {
        //this._kigaeActorWindow.setNaked(1);
        return;
      } else {
      }
      //this._kigaeActorWindow.setNaked(0);
    };
    Scene_Kigae.prototype.isNaked = function () {
      var window = this._kigaeSlotWindow;
      if (window.outerId() || window.outerTopId() || window.outerBottomId()) {
        return false;
      }
      if (window.armId() || window.legId() || window.faceId()) {
        return false;
      }
      return true;
    };
    return Scene_Kigae;
  })(Nore.Scene_Talk);
  Nore.Scene_Kigae = Scene_Kigae;
  var Window_KigaeCommand = /** @class */ (function (_super) {
    __extends(Window_KigaeCommand, _super);
    function Window_KigaeCommand() {
      var _this = (_super !== null && _super.apply(this, arguments)) || this;
      _this._canOk = true;
      return _this;
    }
    Window_KigaeCommand.prototype.setCanOk = function (b) {
      if (this._canOk == b) {
        return;
      }
      this._canOk = b;
      this.refresh();
    };
    Window_KigaeCommand.prototype.makeCommandList = function () {
      this.addCommand(TextManager.cosLabel, "cos", true, null);
      this.addCommand(TextManager.innerLabel, "inner", true, null);
      this.addCommand(TextManager.acceLabel, "acce", true, null);
      this.addCommand(TextManager.rakugakiLabel, "rakugaki", true, null);
      this.addCommand(TextManager.faceLabel, "face", true, null);
      this.addCommand("確定", "ok", this._canOk, null);
    };
    return Window_KigaeCommand;
  })(Window_Command);
  var Window_KigaeSlot = /** @class */ (function (_super) {
    __extends(Window_KigaeSlot, _super);
    function Window_KigaeSlot(_type) {
      var _this =
        _super.call(this, new Rectangle(210, WINDOW_TOP_MARGIN, 360, 726)) ||
        this;
      _this._type = _type;
      return _this;
    }
    Window_KigaeSlot.prototype.initialize = function (rect) {
      _super.prototype.initialize.call(this, rect);
      this.initTexture();
      this.refresh();
      this.select(0);
      this.initMask();
    };
    Window_KigaeSlot.prototype.initMask = function () {
      var myMask = new PIXI.Graphics();
      myMask.beginFill(999, 1);
      var m = this.margin + 1;
      myMask.drawRect(0, this.y + this.margin + 6, 300, 706);
      myMask.endFill();
      this._windowContentsSprite.mask = myMask;
    };
    Window_KigaeSlot.prototype.update = function () {
      _super.prototype.update.call(this);
      if (!this.active && this.visible) {
        if (TouchInput.isTriggered()) {
          if (this.isTouchedInsideFrame()) {
            SoundManager.playOk();
            this.callHandler("touchSelect");
          }
        }
      }
      //this._windowContentsSprite.y = -this.scrollY() + this.scrollBaseY();
    };
    Window_KigaeSlot.prototype.initTexture = function () {};
    Window_KigaeSlot.prototype.processPagedown = function () {
      this.callHandler("pagedown");
    };
    Window_KigaeSlot.prototype.processPageup = function () {
      this.callHandler("pageup");
    };
    Window_KigaeSlot.prototype.refresh = function () {
      this._windowContentsSprite.destroyAndRemoveChildren();
      _super.prototype.refresh.call(this);
    };
    Window_KigaeSlot.prototype.drawAllItems = function () {
      this._windowContentsSprite.destroyAndRemoveChildren();
      _super.prototype.drawAllItems.call(this);
    };
    Window_KigaeSlot.prototype.setActor = function (actor) {
      this._actor = actor;
      this.makeItemList(actor);
      this.refresh();
      this.resetSelection();
    };
    Window_KigaeSlot.prototype.resetSelection = function () {
      if (this.index() >= this.maxItems()) {
        this.select(0);
      }
    };
    Window_KigaeSlot.prototype.makeItemList = function (actor) {
      this._itemList = [];
      if (!this._actor) {
        return;
      }
      //var armors = $gameParty.armors();
      //for (var armor of armors) {
      for (var i = 480; i <= 600; i++) {
        this.addArmor($dataArmors[i], this._itemList, true);
      }
      for (var i = 1000; i <= 1100; i++) {
        var armor = $dataArmors[i];
        if (actor.canEquip(armor)) {
          this.addArmor(armor, this._itemList, false);
        }
      }
      for (var i = 1150; i <= 1185; i++) {
        var armor = $dataArmors[i];
        if (armor.name.length > 0) {
          this.addArmor(armor, this._itemList, false);
        }
      }
      this._itemList = this._itemList.sort(function (a, b) {
        if (a.meta["acce"] && !b.meta["acce"]) {
          return 1;
        }
        if (!a.meta["acce"] && b.meta["acce"]) {
          return -1;
        }
        var orderA = a.id;
        var orderB = b.id;
        if (a.meta["order"]) {
          orderA = parseInt(a.meta["order"]);
        }
        if (b.meta["order"]) {
          orderB = parseInt(b.meta["order"]);
        }
        return orderA - orderB;
      });
    };
    Window_KigaeSlot.prototype.addArmor = function (armor, list, force) {
      if (!armor) {
        return;
      }
      if (!armor.meta["initial"] && !force) {
        return;
      }
      if (armor.meta["eventItem"]) {
        if (!this._actor.hasAcce(armor.id)) {
          return false;
        }
      }
      if (!this._actor.canEquip(armor)) {
        return;
      }
      if (this._type == "face") {
        if (armor.meta["face"]) {
          if (parseInt(armor.meta["face"]) >= 20) {
            if (parseInt(armor.meta["face"]) <= 30) {
              return;
            }
          }
          list.push(armor);
        }
        if (armor.meta["hoppe"] !== undefined) {
          list.push(armor);
        }
        if (armor.meta["highlight"] !== undefined) {
          list.push(armor);
        }
        if (armor.meta["namida"] !== undefined) {
          list.push(armor);
        }
        return;
      }
      if (this._type == "inner") {
        if (armor.meta["innerTop"]) {
          list.push(armor);
        }
        if (armor.meta["innerBottom"]) {
          list.push(armor);
        }
        return;
      }
      if (this._type == "acce" || this._type == "rakugaki") {
        if (parseInt(armor.meta["acce"]) > 0) {
          if (armor.meta["cos"]) {
            return;
          } else {
            if (this._type == "rakugaki") {
              if (armor.meta["rakugaki"] || armor.meta["editRakugaki"]) {
                list.push(armor);
              }
            } else {
              if (!armor.meta["rakugaki"] && !armor.meta["editRakugaki"]) {
                list.push(armor);
              }
            }
          }
        }
        return;
      }
      if (armor.meta["cos"]) {
        list.push(armor);
      }
      if (armor.meta["outer"]) {
        list.push(armor);
      }
      if (armor.meta["pose"]) {
        list.push(armor);
      }
      if (armor.meta["outerTop"]) {
        list.push(armor);
      }
      if (armor.meta["outerBottom"]) {
        list.push(armor);
      }
      if (armor.meta["arm"]) {
        list.push(armor);
      }
      if (armor.meta["leg"]) {
        list.push(armor);
      }
    };
    Window_KigaeSlot.prototype.maxItems = function () {
      if (!this._itemList) {
        return 0;
      }
      return this._itemList.length;
    };
    Window_KigaeSlot.prototype.drawItem = function (index) {
      var armor = this._itemList[index];
      var rect = this.itemRect(index);
      if (!this._actor) {
        return;
      }
      this.changePaintOpacity(this.isEnabled(armor));
      rect.x += 40 + 30;
      var acceIndex = parseInt(armor.meta["acce"]);
      if (acceIndex > 0) {
        this.drawTextEx("\\C[0]" + armor.name + "\\C[0]", rect.x, rect.y, 200);
        if (this._actor.acceMap[armor.id]) {
          this.drawEquip(rect.y, armor);
        }
      }
      var ero = $gameSystem.getEro(this._actor.actorId());
      var outerId = armor.meta["outer"];
      if (outerId) {
        this.drawTextEx("\\C[24]" + armor.name + "\\C[0]", rect.x, rect.y, 200);
        if (this._actor.outerId == outerId) {
          this.drawEquip(rect.y, armor);
        }
      }
      var outerTopId = armor.meta["outerTop"];
      if (outerTopId) {
        this.drawTextEx("\\C[23]" + armor.name + "\\C[0]", rect.x, rect.y, 200);
        if (this._actor.outerTopId == outerTopId) {
          this.drawEquip(rect.y, armor);
        }
      }
      var outerBottomId = armor.meta["outerBottom"];
      if (outerBottomId) {
        this.drawTextEx("\\C[24]" + armor.name + "\\C[0]", rect.x, rect.y, 200);
        if (this._actor.outerBottomId == outerBottomId) {
          this.drawEquip(rect.y, armor);
        }
      }
      var faceId = parseInt(armor.meta["face"]);
      if (faceId) {
        this.drawTextEx("\\C[6]" + armor.name + "\\C[0]", rect.x, rect.y, 200);
        if (this._actor.getDefaultFaceId() == faceId) {
          this.drawEquip(rect.y, armor);
        }
      }
      var armId = armor.meta["arm"];
      if (armId) {
        this.drawTextEx("\\C[6]" + armor.name + "\\C[0]", rect.x, rect.y, 200);
        if (this._actor.armId == armId) {
          this.drawEquip(rect.y, armor);
        }
      }
      var legId = armor.meta["leg"];
      if (legId) {
        this.drawTextEx("\\C[5]" + armor.name + "\\C[0]", rect.x, rect.y, 200);
        if (this._actor.legId == legId) {
          this.drawEquip(rect.y, armor);
        }
      }
      var poseId = parseInt(armor.meta["pose"]);
      if (poseId) {
        this.drawTextEx("\\C[12]" + armor.name + "\\C[0]", rect.x, rect.y, 200);
        if (this._actor.poseId == poseId) {
          this.drawEquip(rect.y, armor);
        }
      }
      var hoppeId = parseInt(armor.meta["hoppe"]);
      if (hoppeId >= 0) {
        this.drawTextEx("\\C[12]" + armor.name + "\\C[0]", rect.x, rect.y, 200);
        if (this._actor.getAcceHoppeId() == hoppeId) {
          this.drawEquip(rect.y, armor);
        }
      }
      var namidaId = parseInt(armor.meta["namida"]);
      if (namidaId >= 0) {
        this.drawTextEx("\\C[12]" + armor.name + "\\C[0]", rect.x, rect.y, 200);
        if (this._actor.getNamidaAcceId() == namidaId) {
          this.drawEquip(rect.y, armor);
        }
      }
      var highlight = Math.trunc(armor.meta["highlight"]);
      if (highlight > 0) {
        this.drawTextEx("\\C[12]" + armor.name + "\\C[0]", rect.x, rect.y, 200);
        if (highlight == Hightlight.none) {
          if (this._actor.isNoHightlight()) {
            this.drawEquip(rect.y, armor);
          }
        } else if (highlight == Hightlight.bottom) {
          if (this._actor.isBottomHightlight()) {
            this.drawEquip(rect.y, armor);
          }
        } else {
          if (this._actor.isNormalHightlight()) {
            this.drawEquip(rect.y, armor);
          }
        }
      }
      var innerTopId = armor.meta["innerTop"];
      if (ero.bote && armor.meta["innerTopBote"]) {
        innerTopId = armor.meta["innerTopBote"];
      }
      if (innerTopId) {
        this.drawTextEx("\\C[14]" + armor.name + "\\C[0]", rect.x, rect.y, 200);
        if (this._actor.innerTopId == innerTopId) {
          this.drawEquip(rect.y, armor);
        }
      }
      var innerBottomId = armor.meta["innerBottom"];
      if (ero.bote && armor.meta["innerBottomBote"]) {
        innerBottomId = armor.meta["innerBottomBote"];
      }
      if (innerBottomId) {
        this.drawTextEx("\\C[14]" + armor.name + "\\C[0]", rect.x, rect.y, 200);
        if (this._actor.innerBottomId == innerBottomId) {
          this.drawEquip(rect.y, armor);
        }
      }
      //if (armor.meta['lock']) {
      if (this.isLocked(armor)) {
        this.drawLock(rect.y, this.isEnabled(armor));
        return;
      } else if (armor.meta[CURSE]) {
        this.drawCurse(rect.y, this.isEnabled(armor));
      }
    };
    Window_KigaeSlot.prototype.drawEquip = function (y, armor) {
      //if (armor.meta['lock']) {
      //    this.drawLock(y);
      //}
      var baseTexture = this.getBaseTexture();
      var texture = new PIXI.Texture(
        baseTexture,
        new PIXI.Rectangle(0, 36, 40, 36)
      );
      var sprite = new PIXI.Sprite(texture);
      sprite.x = 18;
      sprite.y = y + 12;
      this._windowContentsSprite.addChild(sprite);
    };
    Window_KigaeSlot.prototype.drawLock = function (y, isEnabled) {
      var baseTexture = this.getBaseTexture();
      var texture = new PIXI.Texture(
        baseTexture,
        new PIXI.Rectangle(0, 103, 40, 36)
      );
      var sprite = new PIXI.Sprite(texture);
      sprite.x = 22 + 30;
      sprite.y = y + 12;
      if (!isEnabled) {
        sprite.alpha = 0.4;
      }
      this._windowContentsSprite.addChild(sprite);
    };
    Window_KigaeSlot.prototype.drawCurse = function (y, isEnabled) {
      /*var baseTexture = this.getBaseTexture();
            var texture = new PIXI.Texture(baseTexture, new PIXI.Rectangle(0,103, 40, 36));
            var sprite = new PIXI.Sprite(texture);
            sprite.x = 22 + 30;
            sprite.y = y + 12;
            if (! isEnabled) {
                sprite.alpha = 0.4;
            }
            this._windowContentsSprite.addChild(sprite);*/
      this.drawIcon(Nore.CURSE_ICON_INDEX, 40, y);
    };
    Window_KigaeSlot.prototype.getBaseTexture = function () {
      var baseTexture = PIXI.utils.BaseTextureCache["system/skill_tree"];
      if (!baseTexture) {
        var bitmap = ImageManager.loadSystem("skill_tree");
        if (!bitmap.isReady()) {
          return;
        }
        baseTexture = new PIXI.BaseTexture(bitmap._image);
        baseTexture.resource.url = "system/skill_tree";
        PIXI.utils.BaseTextureCache["system/skill_tree"] = baseTexture;
      }
      return baseTexture;
    };
    Window_KigaeSlot.prototype.isEnabled = function (armor) {
      if (armor.meta["rotorNg"] && this._actor.hasRotor()) {
        return false;
      }
      if (armor.meta["innerBottom"] && this._actor.hasCursedAcce()) {
        return false;
      }
      if (armor.meta[CURSE]) {
        if ($gameSystem.isEroAcceAllOpened()) {
          return true;
        }
        return false;
      }
      if (this._actor.hasCursedAcce()) {
        if (armor.meta["acce"]) {
          var acceId = parseInt(armor.meta["acce"]);
          switch (acceId) {
            case 62:
            case 68:
            case 69:
              return false;
          }
        }
        if (armor.meta["outer"]) {
          if (armor.meta["outer"] == "h") {
            // スカート戦闘服
            return false;
          }
        }
      }
      if (armor.meta["innerBottom"]) {
        var innerBottomId = this._actor.innerBottomId;
        if (innerBottomId == "i") {
          if ($gameSystem.isEroAcceAllOpened()) {
            return true;
          }
          return false;
        }
      }
      if (this.isLocked(armor)) {
        return false;
      }
      /*if (this.isChinpoError(armor)) {
                return false;
            }*/
      return true;
    };
    Window_KigaeSlot.prototype.isLocked = function (armor) {
      if (armor.meta["battleCos"]) {
        if ($gameSystem.inChokyo()) {
          if ($gameSystem.chokyoActorId() == this._actor.actorId()) {
            return true;
          }
        }
      }
      if (!this._actor.isOpened(armor)) {
        return true;
      }
      if (armor.meta["sw"]) {
        if ($gameSystem.isEroAcceAllOpened()) {
          return false;
        }
        var sw = parseInt(armor.meta["sw"]);
        return !$gameSwitches.value(sw);
      }
      /*if (! this._actor.isObedienceOk(armor)) {
                return true;
            }
            if (! this._actor.isNastyOk(armor)) {
                return true;
            }*/
      if (armor.meta["rakugaki"]) {
        if (this._actor.isRakugakiEdited()) {
          return false;
        }
        return true;
      }
      return false;
    };
    Window_KigaeSlot.prototype.isChinpoError = function (armor) {
      if (!armor.meta["chinpo"]) {
        return false;
      }
      return $gameActors.mainActor().hasAcce(221);
    };
    Window_KigaeSlot.prototype.decide = function () {
      var armor = this.armor();
      if (!this.isEnabled(armor)) {
        SoundManager.playBuzzer();
        return;
      }
      if (armor.meta["lock"]) {
        if (!$gameSystem.isEroAcceAllOpened()) {
          SoundManager.playBuzzer();
          return;
        }
      }
      var group = parseInt(armor.meta["group"]);
      var acceId = parseInt(armor.meta["acce"]);
      if (acceId > 0) {
        if (armor.meta["ninshin"]) {
          var ero = $gameSystem.getEro(this._actor.actorId());
          var ero = $gameSystem.getEro(this._actor.actorId());
          if (ero.ninshin < parseInt(armor.meta["ninshin"])) {
            return;
          }
        }
        if (armor.meta["syusan"]) {
          var ero = $gameSystem.getEro(this._actor.actorId());
          var ero = $gameSystem.getEro(this._actor.actorId());
          if (ero.syusan < parseInt(armor.meta["syusan"])) {
            return;
          }
        }
      }
      if (group > 0) {
        this._actor.removeGroup(group, armor);
        return;
      }
      if (acceId > 0) {
        this._actor.acceMap[armor.id] = !this._actor.acceMap[armor.id];
      }
      var outerId = armor.meta["outer"];
      var ero = $gameSystem.getEro(this._actor.actorId());
      if (outerId) {
        this._actor.setOuterId(outerId);
        if (outerId != "a" && outerId != "c") {
          if (this._actor.poseId > 1) {
            this._actor.setPoseId(1);
          }
        }
      }
      var outerTopId = armor.meta["outerTop"];
      if (outerTopId) {
        this._actor.setOuterId("a");
        this._actor.setOuterTopId(outerTopId);
      }
      var outerBottomId = armor.meta["outerBottom"];
      if (outerBottomId) {
        this._actor.setOuterId("a");
        this._actor.setOuterBottomId(outerBottomId);
      }
      var faceId = parseInt(armor.meta["face"]);
      if (faceId > 0) {
        this._actor.setDefaultFaceId(faceId);
      }
      var hoppeId = parseInt(armor.meta["hoppe"]);
      if (hoppeId >= 0) {
        this._actor.setAcceHoppeId(hoppeId);
        //this._actor.resetFace();
      }
      var highlight = Math.trunc(armor.meta["highlight"]);
      if (highlight > 0) {
        this._actor.setHightlight(highlight);
      }
      var namida = Math.trunc(armor.meta["namida"]);
      if (namida >= 0) {
        this._actor.setNamidaAcce(namida);
      }
      var poseId = parseInt(armor.meta["pose"]);
      if (poseId > 0) {
        this._actor._poseId = poseId;
        if (poseId > 1 && this._actor.outerId != "c") {
          this._actor.setOuterId("a");
        }
      }
      var innerTopId = armor.meta["innerTop"];
      if (ero.bote && armor.meta["innerTopBote"]) {
        innerTopId = armor.meta["innerTopBote"];
      }
      if (innerTopId) {
        this._actor.setInnerTopId(innerTopId);
      }
      var innerBottomId = armor.meta["innerBottom"];
      if (ero.bote && armor.meta["innerBottomBote"]) {
        innerBottomId = armor.meta["innerBottomBote"];
      }
      if (innerBottomId) {
        this._actor.setInnerBottomId(innerBottomId);
      }
      var armId = armor.meta["arm"];
      if (armId) {
        this._actor.setArmId(armId);
      }
      var legId = armor.meta["leg"];
      if (legId) {
        this._actor.setLegId(legId);
      }
    };
    Window_KigaeSlot.prototype.armor = function () {
      return this._itemList[this.index()];
    };
    Window_KigaeSlot.prototype.outerId = function () {
      var armor = this._itemList[this.index()];
      return armor.meta["outer"];
    };
    Window_KigaeSlot.prototype.outerTopId = function () {
      var armor = this._itemList[this.index()];
      return armor.meta["outerTop"];
    };
    Window_KigaeSlot.prototype.outerBottomId = function () {
      var armor = this._itemList[this.index()];
      return armor.meta["outerBottom"];
    };
    Window_KigaeSlot.prototype.armId = function () {
      var armor = this._itemList[this.index()];
      return armor.meta["arm"];
    };
    Window_KigaeSlot.prototype.legId = function () {
      var armor = this._itemList[this.index()];
      return armor.meta["leg"];
    };
    Window_KigaeSlot.prototype.acceId = function () {
      var armor = this._itemList[this.index()];
      return armor.meta["acce"];
    };
    Window_KigaeSlot.prototype.faceId = function () {
      var armor = this._itemList[this.index()];
      return armor.meta["face"];
    };
    Window_KigaeSlot.prototype.playOkSound = function () {
      var armor = this.armor();
      if (this.isEnabled(armor)) {
        SoundManager.playCursor();
      }
    };
    return Window_KigaeSlot;
  })(Window_Selectable);
  var Window_KigaeActor = /** @class */ (function (_super) {
    __extends(Window_KigaeActor, _super);
    function Window_KigaeActor() {
      var _this = _super.call(this, new Rectangle(570, 0, 800, 868)) || this;
      _this.opacity = 0;
      return _this;
    }
    Window_KigaeActor.prototype.setActor = function (actor) {
      this._actor = actor;
      this.refresh();
    };
    Window_KigaeActor.prototype.setNaked = function (b) {
      var changed = this._actor.setNaked(b);
      if (changed) {
        this.refresh();
      }
    };
    Window_KigaeActor.prototype.setNoInner = function (b) {
      if (this._noInner != b) {
        this._noInner = b;
        this._actor.setCacheChanged();
        this.refresh();
      }
    };
    Window_KigaeActor.prototype.refresh = function () {
      this.contents.clear();
      this._windowContentsSprite.destroyAndRemoveChildren();
      //var actor = JsonEx.makeDeepCopy(this._actor);
      var actor = this._actor;
      if (this._noInner) {
        actor.setInnerTopId("a");
        actor.setInnerBottomId("a");
      }
      this.drawTachieActor(
        actor,
        this._windowContentsSprite,
        40,
        00,
        null,
        actor.getDefaultFaceId(),
        1,
        false
      );
    };
    Window_KigaeActor.prototype.drawTexts = function (texts) {
      this.contents.clearRect(40, 10, 580, 70);
      this.changeTextColor(ColorManager.textColor(2));
      var yy = 10;
      for (var _i = 0, texts_1 = texts; _i < texts_1.length; _i++) {
        var t = texts_1[_i];
        this.drawText(t, 40, yy, 580, "left");
        yy += this.lineHeight();
      }
    };
    return Window_KigaeActor;
  })(Window_Base);
  var Window_Label2 = /** @class */ (function (_super) {
    __extends(Window_Label2, _super);
    function Window_Label2(text, x, y, w) {
      if (w === void 0) {
        w = 370;
      }
      var _this = _super.call(this, new Rectangle(x, y, w, 60)) || this;
      _this.drawText(text, 2, 0, w - 30, "left");
      return _this;
    }
    return Window_Label2;
  })(Window_Base);
  Nore.Window_Label2 = Window_Label2;
  var Window_Label3 = /** @class */ (function (_super) {
    __extends(Window_Label3, _super);
    function Window_Label3(text, x, y, w) {
      if (w === void 0) {
        w = 570;
      }
      var _this = _super.call(this, new Rectangle(x, y, w, 60)) || this;
      _this.changeTextColor(ColorManager.deathColor());
      _this.drawText(text, 2, 0, w, "left");
      return _this;
    }
    Window_Label3.prototype.setText = function (text) {
      this.contents.clear();
      this.changeTextColor(ColorManager.systemColor());
      this.drawText(text, 2, 0, this.width, "left");
    };
    Window_Label3.prototype.hideFrame = function () {
      this.frameVisible = false;
      this.backOpacity = 0;
    };
    return Window_Label3;
  })(Window_Base);
  Nore.Window_Label3 = Window_Label3;
})(Nore || (Nore = {}));
