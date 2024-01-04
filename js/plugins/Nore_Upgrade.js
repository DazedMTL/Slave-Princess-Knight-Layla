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
 * @command SkillTree
 * @text スキルツリー画面へ
 * @des スキルツリー画面へ
 */
var Nore;
(function (Nore) {
  var PAN_ID = 25;
  var WINE_ID = 24;
  var YAKUSOU_ID = 31;
  var pluginName = "Nore_Upgrade";
  PluginManager.registerCommand(pluginName, "SkillTree", function (args) {
    SceneManager.push(Scene_Upgrade);
  });
  var Window_Pan = /** @class */ (function (_super) {
    __extends(Window_Pan, _super);
    function Window_Pan() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Window_Pan.prototype.initialize = function (r) {
      _super.prototype.initialize.call(this, r);
    };
    Window_Pan.prototype.value = function () {
      return $gameParty.numItems($dataItems[PAN_ID]);
    };
    Window_Pan.prototype.drawCurrencyValue = function (
      value,
      unit,
      x,
      y,
      width
    ) {};
    Window_Pan.prototype.setItem = function (item) {
      this.contents.clear();
      this.contents.outlineColor = "rgba(0, 0, 0, 1)";
      if (!item) {
        return;
      }
      var text = Nore.getSkillDescription(item);
      if (ConfigManager.en && item.meta["enDesc"]) {
        text = item.meta["enDesc"];
      }
      text = text.replace("\\n", "\n");
      this.drawTextEx(text, 30, 30, 400);
    };
    Window_Pan.prototype.resetTextColor = function () {
      this.changeTextColor(ColorManager.normalColor());
      //this.changeOutlineColor(ColorManager.outlineColor());
    };
    return Window_Pan;
  })(Window_Gold);
  Nore.Window_Pan = Window_Pan;
  Window_Help.prototype.setItem = function (item) {
    if (!item) {
      this.setText("");
      return;
    }
    var text = item.description;
    if (ConfigManager.en && item.meta["enDesc"]) {
      text = item.meta["enDesc"];
    }
    this.setText(text);
  };
  var Scene_Upgrade = /** @class */ (function (_super) {
    __extends(Scene_Upgrade, _super);
    function Scene_Upgrade() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Scene_Upgrade.prototype.create = function () {
      Scene_MenuBase.prototype.create.call(this);
      this.refreshBg();
      this.createGoldWindow();
      this.createHelpWindow();
      this.createUpgradeWindow();
      this.createConfirmWindow();
      this.createMsgWindow();
      this.createTutoArrow();
      this.createButton();
    };
    Scene_Upgrade.prototype.createButton = function () {
      this._backButton = new Sprite_BackButton();
      this._backButton.x = 1140;
      this._backButton.y = 14;
      this.addChild(this._backButton);
      this._backButton.setClickHandler(this.onCancel.bind(this));
    };
    Scene_Upgrade.prototype.refreshBg = function () {
      var baseTexture = Nore.getSystemBaseTexture("bg");
      var texture = new PIXI.Texture(baseTexture);
      var sprite = new PIXI.Sprite(texture);
      sprite.x = -4;
      sprite.y = -4;
      this.addWindow(sprite);
    };
    Scene_Upgrade.prototype.isTuto = function () {
      return !$gameSwitches.value(23);
    };
    Scene_Upgrade.prototype.createTutoArrow = function () {
      if (!this.isTuto()) {
        return;
      }
      this._arrow = new Nore.TutoArrow(70, 50);
      this._upgradeWindow.addInnerChild(this._arrow);
    };
    Scene_Upgrade.prototype.createHelpWindow = function () {
      _super.prototype.createHelpWindow.call(this);
      this._helpWindow.x = this._goldWindow.width - 4;
      this._helpWindow.y = -4;
      this._helpWindow.width = Graphics.boxWidth - this._goldWindow.width + 8;
      this._helpWindow.visible = false;
    };
    Scene_Upgrade.prototype.createUpgradeWindow = function () {
      this._upgradeWindow = new Window_Upgrade();
      this._upgradeWindow.setHandler("ok", this.onOk.bind(this));
      this._upgradeWindow.setHandler("change", this.onChange.bind(this));
      this._upgradeWindow.setHandler("cancel", this.onCancel.bind(this));
      this._upgradeWindow.activate();
      this.addChild(this._upgradeWindow);
    };
    Scene_Upgrade.prototype.createGoldWindow = function () {
      this._goldWindow = new Window_Pan(new Rectangle(119, 8, 1096, 180));
      this.addChild(this._goldWindow);
    };
    Scene_Upgrade.prototype.createConfirmWindow = function () {
      this._confirmWindow = new Nore.Window_Confirm();
      this._confirmWindow.setText("決定しますか？");
      this._confirmWindow.setHandler("ok", this.onConfirmOk.bind(this));
      this._confirmWindow.setHandler("cancel", this.onConfirmCancel.bind(this));
      this._confirmWindow.deactivate();
      this.addChild(this._confirmWindow);
      this._confirmWindow.hide();
    };
    Scene_Upgrade.prototype.createMsgWindow = function () {
      this._msgWindow = new Nore.Window_Msg(136);
      this._msgWindow.setHandler("ok", this.onConfirmCancel.bind(this));
      this._msgWindow.setHandler("cancel", this.onConfirmCancel.bind(this));
      this._msgWindow.deactivate();
      this.addChild(this._msgWindow);
      this._msgWindow.hide();
    };
    Scene_Upgrade.prototype.onConfirmCancel = function () {
      this._confirmWindow.hide();
      this._confirmWindow.deactivate();
      this._msgWindow.hide();
      this._msgWindow.deactivate();
      this._upgradeWindow.activate();
    };
    Scene_Upgrade.prototype.onConfirmOk = function () {
      if (!this._upgradeWindow.canBuy()) {
        this._confirmWindow.hide();
        var text = void 0;
        var armor = this._upgradeWindow.selectedItem();
        if (this._upgradeWindow.lessPan(armor)) {
          text = TextManager.notEnoughPan;
        } else {
          text = TextManager.notEnoughWine;
        }
        this._msgWindow.setText(text);
        this._msgWindow.setInfo(true);
        this._msgWindow.show();
        this._msgWindow.activate();
        return;
      }
      this._upgradeWindow.decide();
      this._upgradeWindow.refresh();
      this._upgradeWindow.activate();
      $gameSwitches.setValue(23, true);
      if (this._arrow) {
        this._arrow.visible = false;
      }
      SoundManager.playShop();
      this._goldWindow.refresh();
      this._confirmWindow.hide();
      this._confirmWindow.deactivate();
      this.onChange();
    };
    Scene_Upgrade.prototype.onCancel = function () {
      if (!$gameSwitches.value(23)) {
        this._upgradeWindow.activate();
        return;
      }
      this.popScene();
    };
    Scene_Upgrade.prototype.onOk = function () {
      if (!this._upgradeWindow.canSelect()) {
        SoundManager.playBuzzer();
        this._upgradeWindow.activate();
        return;
      }
      SoundManager.playOk();
      this._upgradeWindow.deactivate();
      var item = this._upgradeWindow.selectedItem();
      var text = item.name + "を選択しますか？";
      this._confirmWindow.setText(text);
      this._confirmWindow.setInfo(true);
      this._confirmWindow.show();
      this._confirmWindow.activate();
    };
    Scene_Upgrade.prototype.onChange = function () {
      this._goldWindow.setItem(this._upgradeWindow.selectedItem());
    };
    return Scene_Upgrade;
  })(Scene_MenuBase);
  Nore.Scene_Upgrade = Scene_Upgrade;
  var LINE_WIDTH = 8;
  var MARGIN_TOP = 80;
  var MARGIN_LEFT = 48;
  var BLOCK_WIDTH = 165;
  var BLOCK_HEIGHT = 60;
  var INTERVAL_X = 202;
  var INTERVAL_Y = 118;
  var Window_Upgrade = /** @class */ (function (_super) {
    __extends(Window_Upgrade, _super);
    function Window_Upgrade() {
      var _this = this;
      var y = 92;
      var rect = new Rectangle(-4, y, Graphics.boxWidth + 8, 790 - y + 4);
      _this = _super.call(this, rect) || this;
      _this.choiceData();
      _this.drawCursor();
      _this.refresh();
      _this.activate();
      _this.select(0);
      _this.frameVisible = false;
      _this.backOpacity = 0;
      return _this;
    }
    Window_Upgrade.prototype.initialize = function (rect) {
      _super.prototype.initialize.call(this, rect);
      this.contents.outlineColor = "rgba(0, 0, 0, 1)";
      this.contents.outlineWidth = 4;
    };
    Window_Upgrade.prototype.getSprite = function (rect) {
      var baseTexture = Nore.getSystemBaseTexture("skill_item");
      var texture = new PIXI.Texture(baseTexture, rect);
      return new PIXI.Sprite(texture);
    };
    Window_Upgrade.prototype.choiceData = function () {
      this._lines = LINES1;
      this._trees = SKILL_TREE1;
    };
    Window_Upgrade.prototype.selectedItem = function () {
      var skill = this._trees[this.index()];
      if (!skill) {
        return null;
      }
      var armor = $dataArmors[skill.armor];
      return armor;
    };
    Window_Upgrade.prototype.decide = function () {
      var armor = this.selectedItem();
      if (armor.meta["reset"]) {
        this.doReset();
        return;
      }
      $gameParty.gainItem(armor, 1, false);
      var pan = parseInt(armor.meta["pan"]);
      var wine = parseInt(armor.meta["wine"]);
      if (!isNaN(pan)) {
        $gameParty.loseItem($dataItems[PAN_ID], pan);
      }
      if (!isNaN(wine)) {
        $gameParty.loseItem($dataItems[WINE_ID], wine);
      }
      $gameSwitches.setValue(244, true);
      //$gameParty.loseItem(armor.price);
    };
    Window_Upgrade.prototype.doReset = function () {
      for (var _i = 0, _a = this._trees; _i < _a.length; _i++) {
        var tree = _a[_i];
        var armor = $dataArmors[tree.armor];
        if ($gameParty.hasItem(armor)) {
          $gameParty.loseItem(armor, 1);
        }
      }
    };
    Window_Upgrade.prototype.canSelect = function () {
      var armor = this.selectedItem();
      return !$gameParty.hasItem(armor, false) && this.isOpenSkill(armor);
    };
    Window_Upgrade.prototype.canBuy = function () {
      if (!this.canSelect()) {
        return false;
      }
      var armor = this.selectedItem();
      return this.canBuyItem(armor);
    };
    Window_Upgrade.prototype.lessPan = function (armor) {
      var pan = parseInt(armor.meta["pan"]);
      if ($gameParty.numItems($dataItems[PAN_ID]) < pan) {
        return true;
      }
      return false;
    };
    Window_Upgrade.prototype.refresh = function () {
      this.redrawItem();
    };
    Window_Upgrade.prototype.drawAllItems = function () {
      this.redrawItem();
    };
    Window_Upgrade.prototype.redrawItem = function () {
      if (!this._lines) {
        return;
      }
      this.contents.clear();
      for (var _i = 0, _a = this._lines; _i < _a.length; _i++) {
        var line = _a[_i];
        this.drawLine(line);
      }
      for (var _b = 0, _c = this._trees; _b < _c.length; _b++) {
        var skill = _c[_b];
        this.drawItem(skill);
      }
    };
    Window_Upgrade.prototype.drawLine4 = function (line) {};
    Window_Upgrade.prototype.disableColor = function () {
      return "#765e3d";
    };
    Window_Upgrade.prototype.drawLine2 = function (line) {
      var armor = $dataArmors[line.from];
      if (!armor) {
        return;
      }
      var color;
      if (this.isGetSkill(armor)) {
        color = "rgba(250, 250, 250, 1)";
      } else {
        color = this.disableColor();
      }
      if (line.type == "right") {
        var x = MARGIN_LEFT + line.x * INTERVAL_X + BLOCK_WIDTH;
        var y =
          MARGIN_TOP +
          line.y * INTERVAL_Y +
          BLOCK_HEIGHT / 2 -
          LINE_WIDTH / 2 -
          this.scrollBaseY();
        this.contents.fillRect(
          x,
          y,
          INTERVAL_X - BLOCK_WIDTH,
          LINE_WIDTH,
          color
        );
      }
      if (line.type == "horizontal") {
        var x = MARGIN_LEFT + line.x * INTERVAL_X;
        var y =
          MARGIN_TOP +
          line.y * INTERVAL_Y +
          BLOCK_HEIGHT / 2 -
          LINE_WIDTH / 2 -
          this.scrollBaseY();
        this.contents.fillRect(x, y, INTERVAL_X, LINE_WIDTH, color);
      }
      if (line.type == "rightAndBottom") {
        this.drawLine4(line);
        var x = MARGIN_LEFT + line.x * INTERVAL_X + BLOCK_WIDTH;
        var y =
          MARGIN_TOP +
          line.y * INTERVAL_Y +
          BLOCK_HEIGHT / 2 -
          LINE_WIDTH / 2 -
          this.scrollBaseY();
        this.contents.fillRect(x, y, INTERVAL_X + 20, LINE_WIDTH, color);
        this.contents.fillRect(
          x + INTERVAL_X / 2 + 4,
          y,
          LINE_WIDTH,
          INTERVAL_Y - 20,
          color
        );
      }
      if (line.type == "rightBottom") {
        var x = MARGIN_LEFT + line.x * INTERVAL_X + BLOCK_WIDTH;
        var y =
          MARGIN_TOP +
          line.y * INTERVAL_Y +
          BLOCK_HEIGHT / 2 -
          LINE_WIDTH / 2 -
          this.scrollBaseY();
        this.contents.fillRect(x, y, INTERVAL_X / 2 + 5, LINE_WIDTH, color);
        this.contents.fillRect(
          x + INTERVAL_X / 2 + 4,
          y,
          LINE_WIDTH,
          INTERVAL_Y - 20,
          color
        );
      }
      if (line.type == "bottom") {
        var x =
          MARGIN_LEFT + line.x * INTERVAL_X + BLOCK_WIDTH / 2 - LINE_WIDTH / 2;
        var y =
          MARGIN_TOP + line.y * INTERVAL_Y + BLOCK_HEIGHT - this.scrollBaseY();
        this.contents.fillRect(
          x,
          y + 8,
          LINE_WIDTH,
          INTERVAL_Y - BLOCK_HEIGHT - 15,
          color
        );
      }
    };
    Window_Upgrade.prototype.drawLine = function (line) {
      var armor = $dataArmors[line.from];
      if (!armor) {
        return;
      }
      var color;
      if (this.isGetSkill(armor)) {
        color = 0xffffff; //'rgba(250, 250, 250, 1)';
      } else {
        color = 0x765e3d;
      }
      if (line.type == "right") {
        var x = MARGIN_LEFT + line.x * INTERVAL_X + BLOCK_WIDTH;
        var y =
          MARGIN_TOP +
          line.y * INTERVAL_Y +
          BLOCK_HEIGHT / 2 -
          LINE_WIDTH / 2 -
          this.scrollBaseY();
        //this.contents.fillRect(x, y, INTERVAL_X - BLOCK_WIDTH, LINE_WIDTH, color);
        var g = new PIXI.Graphics();
        g.beginFill(color, 1);
        g.drawRect(0, 0, INTERVAL_X - BLOCK_WIDTH, LINE_WIDTH);
        g.endFill();
        g.x = x;
        g.y = y - 1;
        this._contentsBackSprite.addChild(g);
      }
      if (line.type == "horizontal") {
        var x = MARGIN_LEFT + line.x * INTERVAL_X;
        var y =
          MARGIN_TOP +
          line.y * INTERVAL_Y +
          BLOCK_HEIGHT / 2 -
          LINE_WIDTH / 2 -
          this.scrollBaseY();
        this.contents.fillRect(x, y, INTERVAL_X, LINE_WIDTH, color);
      }
      if (line.type == "rightAndBottom") {
        this.drawLine4(line);
        var x = MARGIN_LEFT + line.x * INTERVAL_X + BLOCK_WIDTH;
        var y =
          MARGIN_TOP +
          line.y * INTERVAL_Y +
          BLOCK_HEIGHT / 2 -
          LINE_WIDTH / 2 -
          this.scrollBaseY();
        this.contents.fillRect(x, y, INTERVAL_X + 20, LINE_WIDTH, color);
        this.contents.fillRect(
          x + INTERVAL_X / 2 + 4,
          y,
          LINE_WIDTH,
          INTERVAL_Y - 20,
          color
        );
      }
      if (line.type == "rightBottom") {
        var x = MARGIN_LEFT + line.x * INTERVAL_X + BLOCK_WIDTH;
        var y =
          MARGIN_TOP +
          line.y * INTERVAL_Y +
          BLOCK_HEIGHT / 2 -
          LINE_WIDTH / 2 -
          this.scrollBaseY();
        this.contents.fillRect(x, y, INTERVAL_X / 2 + 5, LINE_WIDTH, color);
        this.contents.fillRect(
          x + INTERVAL_X / 2 + 4,
          y,
          LINE_WIDTH,
          INTERVAL_Y - 20,
          color
        );
      }
      if (line.type == "bottom") {
        var x =
          MARGIN_LEFT + line.x * INTERVAL_X + BLOCK_WIDTH / 2 - LINE_WIDTH / 2;
        var y =
          MARGIN_TOP + line.y * INTERVAL_Y + BLOCK_HEIGHT - this.scrollBaseY();
        var g = new PIXI.Graphics();
        g.beginFill(color, 1);
        g.drawRect(0, 0, LINE_WIDTH, INTERVAL_Y - BLOCK_HEIGHT - 15);
        g.endFill();
        g.x = x;
        g.y = y + 8;
        this._contentsBackSprite.addChild(g);
      }
    };
    Window_Upgrade.prototype.findSkill = function (x, y) {
      for (var _i = 0, _a = this._trees; _i < _a.length; _i++) {
        var s = _a[_i];
        if (s.x == x && s.y == y) {
          return s;
        }
      }
    };
    Window_Upgrade.prototype.drawEquip = function (x, y) {
      var baseTexture = this.getBaseTexture();
      var texture = new PIXI.Texture(
        baseTexture,
        new PIXI.Rectangle(0, 72, 40, 36)
      );
      var sprite = new PIXI.Sprite(texture);
      sprite.x = x;
      sprite.y = y;
      this._windowContentsSprite.addChild(sprite);
    };
    Window_Upgrade.prototype.getBaseTexture = function () {
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
    Window_Upgrade.prototype.drawItem = function (skill) {
      var x = MARGIN_LEFT + skill.x * INTERVAL_X;
      var y = MARGIN_TOP + skill.y * INTERVAL_Y - this.scrollBaseY();
      var armor = $dataArmors[skill.armor];
      if (!armor) {
        return;
      }
      var isLock = false;
      if ($gameParty.hasItem(armor, false)) {
        var sprite = this.getSprite(new Rectangle(0, 480, 220, 90));
        sprite.x = x - 10;
        sprite.y = y - 10;
        this.drawEquip(x + 6, y + 43);
        this._windowContentsBackSprite2.addChild(sprite);
        /*
                const lw = 5;
                this.contents.fillRect(x - lw, y - lw, BLOCK_WIDTH + lw*2, BLOCK_HEIGHT + lw*2, 'rgba(150, 50, 50, 1)');
                this.contents.fillRect(x, y, BLOCK_WIDTH, BLOCK_HEIGHT, 'rgba(50, 50, 120, 1)');
                this.changeTextColor(ColorManager.textColor(8));
                */
      } else if (this.isOpenSkill(armor)) {
        if (this.canBuyItem(armor)) {
          var sprite = this.getSprite(new Rectangle(0, 640, 220, 90));
          sprite.x = x - 10;
          sprite.y = y - 10;
          this._windowContentsBackSprite2.addChild(sprite);
          /*
                    this.contents.fillRect(x - 2, y - 2, BLOCK_WIDTH + 4, BLOCK_HEIGHT + 4, 'rgba(10, 10, 13, 1)');

                    this.contents.fillRect(x, y, BLOCK_WIDTH, BLOCK_HEIGHT, 'rgba(100, 100, 200, 0.8)');
                    this.changeTextColor(ColorManager.normalColor());
                    */
        } else {
          /*this.contents.fillRect(x - 2, y - 2, BLOCK_WIDTH + 4, BLOCK_HEIGHT + 4, 'rgba(10, 10, 13, 1)');
                    this.contents.fillRect(x, y, BLOCK_WIDTH, BLOCK_HEIGHT, 'rgba(100, 100, 230, 0.4)');
                    this.changeTextColor(ColorManager.textColor(8));
                    */
          var sprite = this.getSprite(new Rectangle(0, 640, 220, 90));
          sprite.x = x - 10;
          sprite.y = y - 10;
          this._windowContentsBackSprite2.addChild(sprite);
        }
      } else {
        /*
                const color = this.disableColor();

                this.contents.fillRect(x - 2, y - 2, BLOCK_WIDTH + 4, BLOCK_HEIGHT + 4, 'rgba(10, 10, 13, 1)');
                this.contents.fillRect(x, y, BLOCK_WIDTH, BLOCK_HEIGHT, color);
                this.changeTextColor(ColorManager.textColor(8));*/
        var sprite = this.getSprite(new Rectangle(240, 480, 220, 90));
        sprite.x = x - 10;
        sprite.y = y - 10;
        this._windowContentsBackSprite2.addChild(sprite);
        isLock = true;
      }
      this.contents.fontSize = 18;
      this.contents.textColor = ColorManager.normalColor();
      if (!this.isOpenSkill(armor)) {
        this.contents.textColor = "#888888";
        this.contents.paintOpacity = 100;
      } else {
        this.contents.paintOpacity = 255;
      }
      this.drawIcon(armor.iconIndex, x - 3, y - 2);
      this.contents.paintOpacity = 255;
      var name = armor.name;
      if (ConfigManager.en && armor.meta["en"]) {
        name = armor.meta["en"];
      }
      this.contents.drawText(name, x + 32, y - 2, 132, 32, "left");
      var pan = parseInt(armor.meta["pan"]);
      var wine = parseInt(armor.meta["wine"]);
      this.contents.fontSize = 18;
      //this.contents.drawText((armor.price) + ' Pt', x, y + 30, 150, 32, 'right');
      if (!this.isOpenSkill(armor)) {
        this.contents.paintOpacity = 100;
      } else {
        this.contents.paintOpacity = 255;
      }
      var xx = x + 130;
      var interval = 15;
      for (var i = 0; i < pan; i++) {
        this.drawIcon(174, xx, y + 31);
        xx -= interval;
      }
      xx -= 8;
      interval = 18;
      for (var i = 0; i < wine; i++) {
        this.drawIcon(173, xx, y + 31);
        xx -= interval;
      }
      /*if (isLock) {
                this.drawIcon(1922, x - 14, y - 14);
            }*/
    };
    Window_Upgrade.prototype.canBuyItem = function (armor) {
      if (this.lessPan(armor)) {
        return false;
      }
      var wine = parseInt(armor.meta["wine"]);
      if ($gameParty.numItems($dataItems[WINE_ID]) < wine) {
        return false;
      }
      return true;
    };
    Window_Upgrade.prototype.isGetSkill = function (armor) {
      if (!armor) {
        return false;
      }
      return $gameParty.hasItem(armor);
    };
    Window_Upgrade.prototype.isOpenSkill = function (armor) {
      if (!armor) {
        return false;
      }
      if (armor.meta["before"]) {
        var before = parseInt(armor.meta["before"]);
        var beforeArmor = $dataArmors[before];
        if (!$gameParty.hasItem(beforeArmor, false)) {
          return false;
        }
      }
      return true;
    };
    Window_Upgrade.prototype.itemRect = function (index) {
      var skill = this._trees[index];
      if (!skill) {
        return new Rectangle(0, 0, 0, 0);
      }
      var offset = 10;
      var x = MARGIN_LEFT + skill.x * INTERVAL_X - offset;
      var y = MARGIN_TOP + skill.y * INTERVAL_Y - offset - this.scrollBaseY();
      return new Rectangle(
        x,
        y,
        BLOCK_WIDTH + offset * 2,
        BLOCK_HEIGHT + offset * 2
      );
    };
    Window_Upgrade.prototype.maxItems = function () {
      return 27;
    };
    Window_Upgrade.prototype.maxCols = function () {
      return 6;
    };
    Window_Upgrade.prototype.maxPageRows = function () {
      return 9;
    };
    Window_Upgrade.prototype.itemHeight = function () {
      return INTERVAL_Y;
    };
    Window_Upgrade.prototype.playOkSound = function () {};
    Window_Upgrade.prototype.row = function () {
      if (!this._trees) {
        return 0;
      }
      var skill = this._trees[this.index()];
      if (skill) {
        return skill.y;
      }
      return 0;
    };
    Window_Upgrade.prototype.ensureCursorVisible = function (smooth) {
      if (this._cursorAll) {
        this.scrollTo(0, 0);
      } else if (this.innerHeight > 0 && this.row() >= 0) {
        var scrollY_1 = this.scrollY();
        var itemTop = this.row() * this.itemHeight();
        var itemBottom = itemTop + this.itemHeight();
        var scrollMin = itemBottom - this.innerHeight;
        if (scrollY_1 > itemTop) {
          if (smooth) {
            this.smoothScrollTo(0, itemTop);
          } else {
            this.scrollTo(0, itemTop);
          }
        } else if (scrollY_1 < scrollMin) {
          if (smooth) {
            this.smoothScrollTo(0, scrollMin);
          } else {
            this.scrollTo(0, scrollMin);
          }
        }
      }
    };
    Window_Upgrade.prototype.cursorDown = function (wrap) {
      var index = this.index();
      var skill = this._trees[this.index()];
      var next = this.findSkill(skill.x, skill.y + 1);
      if (!next) {
        var next = this.findSkill(skill.x, skill.y + 2);
        if (!next) {
          var next = this.findSkill(skill.x, skill.y + 4);
          if (!next) {
            return;
          }
        }
      }
      this.select(this._trees.indexOf(next));
    };
    Window_Upgrade.prototype.contentsHeight = function () {
      return this.innerHeight + this.itemHeight();
    };
    Window_Upgrade.prototype.cursorUp = function (wrap) {
      var index = this.index();
      var skill = this._trees[this.index()];
      var next = this.findSkill(skill.x, skill.y - 1);
      if (!next) {
        next = this.findSkill(skill.x, skill.y - 2);
        if (!next) {
          if (index != 8 && index != 14) {
            return;
          }
          next = this.findSkill(4, 0);
        }
      }
      this.select(this._trees.indexOf(next));
    };
    Window_Upgrade.prototype.cursorRight = function (wrap) {
      var skill = this._trees[this.index()];
      for (var i = 1; i < 6; i++) {
        var next = this.findSkill(skill.x + i, skill.y);
        if (next) {
          this.select(this._trees.indexOf(next));
          return;
        }
      }
    };
    Window_Upgrade.prototype.cursorLeft = function (wrap) {
      var skill = this._trees[this.index()];
      for (var i = 1; i < 6; i++) {
        var next = this.findSkill(skill.x - i, skill.y);
        if (next) {
          this.select(this._trees.indexOf(next));
          return;
        }
      }
    };
    Window_Upgrade.prototype.select = function (index) {
      /*const last = this.index();
            if (last < index && index >= 3) {
                this.scrollTo(0, INTERVAL_Y * (index - 2));
            }*/
      _super.prototype.select.call(this, index);
      this.ensureCursorVisible(true);
    };
    Window_Upgrade.prototype.drawCursor = function () {
      this._windowContentsBackSprite.removeChildren();
      var rect = this.itemRect(0);
      var baseTexture = Nore.getSystemBaseTexture("skill_item");
      //var texture = new PIXI.Texture(baseTexture, new PIXI.Rectangle(0, 50, 200, 320));
      var texture = new PIXI.Texture(
        baseTexture,
        new PIXI.Rectangle(238, 639, 240, 96)
      );
      var sprite = new PIXI.Sprite(texture);
      sprite.x = -5;
      sprite.y = -0;
      //sprite.x = rect.x + 0;
      //sprite.y = rect.y + 0;
      this._windowContentsBackSprite.addChild(sprite);
    };
    Window_Upgrade.prototype._updateCursor = function () {
      this._windowContentsBackSprite.x = this._cursorRect.x;
      this._windowContentsBackSprite.y = this._cursorRect.y;
    };
    return Window_Upgrade;
  })(Window_Selectable);
})(Nore || (Nore = {}));
