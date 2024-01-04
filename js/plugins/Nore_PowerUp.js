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
 *
 * ラボ
 */
var Nore;
(function (Nore) {
  var pluginName = "Nore_PowerUp";
  PluginManager.registerCommand(pluginName, "SkillTree", function (args) {
    SceneManager.push(Scene_PowerUp);
  });
  var Scene_PowerUp = /** @class */ (function (_super) {
    __extends(Scene_PowerUp, _super);
    function Scene_PowerUp() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Scene_PowerUp.prototype.create = function () {
      Nore.Scene_Talk.prototype.create.call(this);
      this.refreshBg();
      this.createWindowLayer();
      this.createAllWindows();
      this.createGoldWindow();
      this.createHelpWindow();
      this.createUpgradeWindow();
      this.createConfirmWindow();
      this.createMsgWindow();
      this.createTutoArrow();
      this.createButton();
    };
    Scene_PowerUp.prototype.start = function () {
      _super.prototype.start.call(this);
      this.startInitialScenario();
    };
    Scene_PowerUp.prototype.startInitialScenario = function () {};
    Scene_PowerUp.prototype.finishScenario = function () {
      _super.prototype.finishScenario.call(this);
      this._upgradeWindow.activate();
    };
    Scene_PowerUp.prototype.createButton = function () {
      this._backButton = new Sprite_BackButton();
      this._backButton.x = 1140;
      this._backButton.y = 14;
      this.addChild(this._backButton);
      this._backButton.setClickHandler(this.onCancel.bind(this));
    };
    Scene_PowerUp.prototype.refreshBg = function () {
      var baseTexture = Nore.getSystemBaseTexture("bg");
      var texture = new PIXI.Texture(baseTexture);
      var sprite = new PIXI.Sprite(texture);
      sprite.x = 0;
      sprite.y = 0;
      this.addChild(sprite);
    };
    Scene_PowerUp.prototype.isTuto = function () {
      return !$gameSwitches.value(23);
    };
    Scene_PowerUp.prototype.createTutoArrow = function () {
      if (!this.isTuto()) {
        return;
      }
      this._arrow = new Nore.TutoArrow(70, 50);
      this._upgradeWindow.addInnerChild(this._arrow);
    };
    Scene_PowerUp.prototype.createHelpWindow = function () {
      var rect = this.helpWindowRect();
      this._helpWindow = new Window_Help(rect);
      this.addWindow(this._helpWindow);
      this._helpWindow.visible = false;
    };
    Scene_PowerUp.prototype.helpWindowRect = function () {
      var wx = 250;
      var wy = 100;
      var ww = Graphics.boxWidth - wx * 2;
      var wh = 240;
      return new Rectangle(wx, wy, ww, wh);
    };
    Scene_PowerUp.prototype.createUpgradeWindow = function () {
      this._upgradeWindow = new Window_PowerUpLabo();
      this._upgradeWindow.setHandler("ok", this.onOk.bind(this));
      this._upgradeWindow.setHandler("change", this.onChange.bind(this));
      this._upgradeWindow.setHandler("cancel", this.onCancel.bind(this));
      this._upgradeWindow.setHandler("pageup", this.onPageUp.bind(this));
      this._upgradeWindow.setHandler("pagedown", this.onPageDown.bind(this));
      this._upgradeWindow.setActor($gameParty.menuActor());
      this.addChild(this._upgradeWindow);
    };
    Scene_PowerUp.prototype.onPageDown = function () {
      SoundManager.playCursor();
      $gameParty.makeMenuActorNext();
      this._upgradeWindow.setActor($gameParty.menuActor());
    };
    Scene_PowerUp.prototype.onPageUp = function () {
      SoundManager.playCursor();
      $gameParty.makeMenuActorPrevious();
      this._upgradeWindow.setActor($gameParty.menuActor());
    };
    Scene_PowerUp.prototype.createGoldWindow = function () {
      var rect = this.helpWindowRect();
      this._goldWindow = new Nore.Window_Pan(rect);
      this.addChild(this._goldWindow);
    };
    Scene_PowerUp.prototype.createConfirmWindow = function () {
      this._confirmWindow = new Nore.Window_Confirm();
      this._confirmWindow.setText("決定しますか？");
      this._confirmWindow.setHandler("ok", this.onConfirmOk.bind(this));
      this._confirmWindow.setHandler("cancel", this.onConfirmCancel.bind(this));
      this._confirmWindow.deactivate();
      this.addChild(this._confirmWindow);
      this._confirmWindow.hide();
    };
    Scene_PowerUp.prototype.createMsgWindow = function () {
      this._msgWindow = new Nore.Window_Msg(136);
      this._msgWindow.setHandler("ok", this.onConfirmCancel.bind(this));
      this._msgWindow.setHandler("cancel", this.onConfirmCancel.bind(this));
      this._msgWindow.deactivate();
      this.addChild(this._msgWindow);
      this._msgWindow.hide();
    };
    Scene_PowerUp.prototype.onConfirmCancel = function () {
      this._confirmWindow.hide();
      this._confirmWindow.deactivate();
      this._msgWindow.hide();
      this._msgWindow.deactivate();
      this._upgradeWindow.activate();
    };
    Scene_PowerUp.prototype.onConfirmOk = function () {
      if (!this._upgradeWindow.canBuy()) {
        this._confirmWindow.hide();
        var text = TextManager.notEnoughCrystal;
        this._msgWindow.setText(text);
        this._msgWindow.setInfo(true);
        this._msgWindow.show();
        this._msgWindow.activate();
        return;
      }
      this._upgradeWindow.refresh();
      this._upgradeWindow.activate();
      $gameSwitches.setValue(23, true);
      if (this._arrow) {
        this._arrow.visible = false;
      }
      SoundManager.playShop();
      this._upgradeWindow.decide();
      this._goldWindow.refresh();
      this._confirmWindow.hide();
      this._confirmWindow.deactivate();
      this.onChange();
    };
    Scene_PowerUp.prototype.onCancel = function () {
      this.popScene();
    };
    Scene_PowerUp.prototype.onOk = function () {
      if ($gameParty.inDungeon()) {
        this.showCantPowerUpDialog();
        return;
      }
      var price = this._upgradeWindow.calcPrice();
      if (price <= 0) {
        this._upgradeWindow.activate();
        return;
      }
      SoundManager.playOk();
      this._confirmWindow.setTexts([
        TextManager.confirmCrystal1.format(price),
        TextManager.confirmCrystal2,
      ]);
      this._confirmWindow.show();
      this._confirmWindow.activate();
    };
    Scene_PowerUp.prototype.showCantPowerUpDialog = function () {
      SoundManager.playBuzzer();
      var text = TextManager.cantPowerUp;
      this._msgWindow.setText(text);
      this._msgWindow.setInfo(true);
      this._msgWindow.show();
      this._msgWindow.activate();
    };
    Scene_PowerUp.prototype.onChange = function () {
      var item = this._upgradeWindow.selectedItem();
      if (item) {
        this._goldWindow.setItem(item.skill());
      }
    };
    return Scene_PowerUp;
  })(Nore.Scene_Talk);
  Nore.Scene_PowerUp = Scene_PowerUp;
  var TITLE_LEFT = 108;
  var MARGIN_TOP = 270;
  var MARGIN_LEFT = 628;
  var BLOCK_WIDTH = 36;
  var BLOCK_HEIGHT = 36;
  var INTERVAL_X = 42;
  var INTERVAL_Y = 44;
  var SkillItem2 = /** @class */ (function () {
    function SkillItem2(actor, skill, y) {
      this._reserved = false;
      this._actor = actor;
      this._skill = skill;
      this._y = y;
    }
    SkillItem2.prototype.isMatch = function (skill) {
      return this._skill.name == skill.name;
    };
    Object.defineProperty(SkillItem2.prototype, "description", {
      get: function () {
        return this._skill.description;
      },
      enumerable: true,
      configurable: true,
    });
    Object.defineProperty(SkillItem2.prototype, "name", {
      get: function () {
        return this._skill.name;
      },
      enumerable: true,
      configurable: true,
    });
    SkillItem2.prototype.id = function () {
      return this._skill.id;
    };
    SkillItem2.prototype.y = function () {
      return this._y;
    };
    SkillItem2.prototype.lv = function () {
      return Math.trunc(this._skill.meta["lv"]);
    };
    SkillItem2.prototype.isLearned = function () {
      return $gameParty.isLearnedSkill(this.id());
    };
    SkillItem2.prototype.learn = function () {
      $gameParty.learnSkill(this.id());
    };
    SkillItem2.prototype.setReserve = function (b) {
      this._reserved = b;
    };
    SkillItem2.prototype.isReserved = function () {
      return this._reserved;
    };
    SkillItem2.prototype.textType = function () {
      if (this._skill.meta["text"] == TextType.DAMAGE) {
        return TextType.DAMAGE;
      }
      return TextType.NONE;
    };
    SkillItem2.prototype.damageText = function () {
      return Nore.getDamageRate(this._skill) + "%";
    };
    SkillItem2.prototype.skill = function () {
      return this._skill;
    };
    SkillItem2.prototype.isPassive = function () {
      return $skillManager.isPassive(this._skill);
    };
    SkillItem2.prototype.isOugi = function () {
      return $skillManager.isOugi(this._skill);
    };
    SkillItem2.prototype.isBase = function () {
      return $skillManager.isBase(this._skill);
    };
    return SkillItem2;
  })();
  Nore.SkillItem2 = SkillItem2;
  var SkillSet2 = /** @class */ (function () {
    function SkillSet2(skill, y) {
      this._items = [];
      this._reserveIndex = -1;
      this._y = y;
      this.push(skill);
    }
    SkillSet2.prototype.isMatch = function (skill) {
      return this.baseSkill().isMatch(skill);
    };
    SkillSet2.prototype.baseSkill = function () {
      return this._items[0];
    };
    SkillSet2.prototype.push = function (skill) {
      this._items.push(new SkillItem2(this._actor, skill, this._y));
    };
    SkillSet2.prototype.setY = function (y) {
      this._y = y;
      for (var _i = 0, _a = this._items; _i < _a.length; _i++) {
        var item = _a[_i];
        item._y = y;
      }
    };
    SkillSet2.prototype.learn = function () {
      for (var i = 0; i < this._items.length; i++) {
        var item = this._items[i];
        if (item.isLearned()) {
          continue;
        }
        if (i > this._reserveIndex) {
          continue;
        }
        item.learn();
      }
    };
    SkillSet2.prototype.learnedSkill = function () {
      for (var i = this._items.length - 1; i >= 0; i--) {
        if (this._items[i].isLearned()) {
          return this._items[i];
        }
      }
      return null;
    };
    SkillSet2.prototype.itemAt = function (index) {
      return this._items[index];
    };
    SkillSet2.prototype.name = function () {
      return this.baseSkill().name;
    };
    SkillSet2.prototype.reserve = function (index) {
      for (var i = 0; i < this._items.length; i++) {
        var item = this._items[i];
        if (item.isLearned()) {
          continue;
        }
        item.setReserve(index >= i);
      }
      this._reserveIndex = index;
    };
    SkillSet2.prototype.maxItems = function () {
      return this._items.length;
    };
    SkillSet2.prototype.y = function () {
      return this._y;
    };
    SkillSet2.prototype.learnedLv = function () {
      var skill = this.learnedSkill();
      if (!skill) {
        return 0;
      }
      return skill.lv();
    };
    SkillSet2.prototype.textType = function () {
      var skill = this._items[0];
      return skill.textType();
    };
    SkillSet2.prototype.skillText = function (lv) {
      var item = this._items[lv - 1];
      if (!item) {
        return "";
      }
      switch (this.textType()) {
        case TextType.DAMAGE:
          return item.damageText();
      }
      return "";
    };
    SkillSet2.prototype.reserveIndex = function () {
      return this._reserveIndex;
    };
    SkillSet2.prototype.price = function () {
      var priceType = this.priceType();
      var total = 0;
      for (var i = 0; i < this._items.length; i++) {
        var item = this._items[i];
        if (item.isLearned()) {
          continue;
        }
        if (i > this._reserveIndex) {
          continue;
        }
        total += priceType[i];
      }
      return Math.round((total * $gameParty.crystalPriceRate()) / 10) * 10;
    };
    SkillSet2.prototype.cellPrice = function () {
      var priceType = this.priceType();
      var total = 0;
      for (var i = 0; i < this._items.length; i++) {
        var item = this._items[i];
        if (item.isLearned()) {
          p(item);
          total += priceType[i];
        }
      }
      return Math.round((total * $gameParty.crystalPriceRate()) / 10) * 10;
    };
    SkillSet2.prototype.priceRate = function () {};
    SkillSet2.prototype.priceType = function () {
      var skill = this._items[0];
      var list = [];
      switch (skill.skill().meta["priceType"]) {
        case "S":
          list = TYPE_S_COST.concat();
          break;
        case "A":
          list = TYPE_A_COST.concat();
          break;
        case "B":
          list = TYPE_B_COST.concat();
          break;
        case "C":
          list = TYPE_C_COST.concat();
          break;
        case "D":
          list = TYPE_D_COST.concat();
          break;
        case "E":
          list = TYPE_E_COST.concat();
          break;
        case "F":
          list = TYPE_F_COST.concat();
          break;
        default:
          list = TYPE_B_COST.concat();
          break;
      }
      for (var i = 0; i < this._items.length; i++) {
        var skill2 = this._items[i];
        var price = parseInt(skill2.skill().meta["price"]);
        if (price > 0) {
          list.splice(i, 1, price);
        }
      }
      return list;
    };
    SkillSet2.prototype.iconIndex = function () {
      return this.baseSkill().skill().iconIndex;
    };
    SkillSet2.prototype.isPassive = function () {
      return this.baseSkill().isPassive();
    };
    SkillSet2.prototype.isBase = function () {
      return this.baseSkill().isBase();
    };
    SkillSet2.prototype.isOugi = function () {
      return this.baseSkill().isOugi();
    };
    SkillSet2.prototype.sortValue = function () {
      if (this.baseSkill().skill().meta["order"]) {
        return parseInt(this.baseSkill().skill().meta["order"]);
      }
      return this.baseSkill().skill().id;
    };
    return SkillSet2;
  })();
  Nore.SkillSet2 = SkillSet2;
  var TextType;
  (function (TextType) {
    TextType["DAMAGE"] = "damage";
    TextType["NONE"] = "none";
  })(TextType || (TextType = {}));
  var LaboManager = /** @class */ (function () {
    function LaboManager() {}
    LaboManager.prototype.createItems = function () {
      var items = [];
      var start = 900;
      var end = start + 100;
      for (var i = start; i < end; i++) {
        var skill = $dataSkills[i];
        if (!skill) {
          continue;
        }
        if (!skill.meta["powerUp"]) {
          continue;
        }
        if (skill.name.includes("没")) {
          continue;
        }
        var lv = Math.trunc(skill.meta["lv"]);
        if (!lv) {
          continue;
        }
        this.addSkill(skill, items);
      }
      items = items.sort(function (a, b) {
        return a.sortValue() - b.sortValue();
      });
      for (var i = 0; i < items.length; i++) {
        items[i].setY(i);
      }
      return items;
    };
    LaboManager.prototype.addSkill = function (skill, items) {
      for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
        var set = items_1[_i];
        if (set.isMatch(skill)) {
          set.push(skill);
          return;
        }
      }
      var newSet = new SkillSet2(skill, items.length);
      items.push(newSet);
    };
    return LaboManager;
  })();
  Nore.LaboManager = LaboManager;
  var Window_PowerUpLabo = /** @class */ (function (_super) {
    __extends(Window_PowerUpLabo, _super);
    function Window_PowerUpLabo() {
      var _this = this;
      _this._items = [];
      var y = 92;
      var rect = new Rectangle(-4, y, Graphics.boxWidth + 8, 790 - y + 4);
      _this = _super.call(this, rect) || this;
      //this.drawCursor();
      _this.frameVisible = false;
      _this.backOpacity = 0;
      _this._windowContentsSprite.x = 0;
      _this._windowContentsSprite.y = 0;
      return _this;
    }
    Window_PowerUpLabo.prototype.setActor = function (actor) {
      this._laboManager = new LaboManager();
      this._actor = actor;
      this.choiceData();
      this.refresh();
      this.activate();
      this.select(0);
    };
    Window_PowerUpLabo.prototype.drawLine = function (y) {
      var padding = this.itemPadding();
      var x = 50;
      var width = 850;
      this.drawRect(x, y, width, 3);
    };
    Window_PowerUpLabo.prototype.initialize = function (rect) {
      _super.prototype.initialize.call(this, rect);
      this.contents.outlineColor = "rgba(0, 0, 0, 1)";
      this.contents.outlineWidth = 4;
    };
    Window_PowerUpLabo.prototype.getSprite = function (rect) {
      var baseTexture = Nore.getSystemBaseTexture("skill_item");
      var texture = new PIXI.Texture(baseTexture, rect);
      return new PIXI.Sprite(texture);
    };
    Window_PowerUpLabo.prototype.choiceData = function () {
      this._items = this._laboManager.createItems();
    };
    Window_PowerUpLabo.prototype.lineHeight = function () {
      return _super.prototype.lineHeight.call(this) + 4;
    };
    Window_PowerUpLabo.prototype.selectedItem = function () {
      return this.getSkill(this.index());
    };
    Window_PowerUpLabo.prototype.select = function (index) {
      _super.prototype.select.call(this, index);
      this.reserve();
    };
    Window_PowerUpLabo.prototype.decide = function () {
      $gameParty.loseCrystal(this.calcPrice());
      for (var _i = 0, _a = this._items; _i < _a.length; _i++) {
        var set = _a[_i];
        set.learn();
      }
      $gameParty.recoverAll();
      this.refresh();
    };
    Window_PowerUpLabo.prototype.calcPrice = function () {
      var total = 0;
      for (var _i = 0, _a = this._items; _i < _a.length; _i++) {
        var set = _a[_i];
        total += set.price() / 10;
      }
      return total;
    };
    Window_PowerUpLabo.prototype.reserve = function () {
      for (var _i = 0, _a = this._items; _i < _a.length; _i++) {
        var set = _a[_i];
        set.reserve(-1);
      }
      var skillSet = this.getSkillSet(this.index());
      if (!skillSet) {
        return;
      }
      var itemIndex = this.index() % this.maxCols();
      if (skillSet.maxItems() <= itemIndex) {
        _super.prototype.select.call(
          this,
          skillSet.maxItems() - 1 + this.maxCols() * skillSet.y()
        );
      }
      skillSet.reserve(itemIndex);
      this.refresh();
    };
    Window_PowerUpLabo.prototype.canSelect = function () {
      var armor = this.selectedItem();
      return (
        !$gameParty.hasItem(armor.skill(), false) &&
        this.isOpenSkill(armor.skill())
      );
    };
    Window_PowerUpLabo.prototype.canBuy = function () {
      if (!this.canSelect()) {
        return false;
      }
      var armor = this.selectedItem();
      return this.canBuyItem(armor);
    };
    Window_PowerUpLabo.prototype.refresh = function () {
      this.contents.clear();
      this._windowContentsSprite.destroyAndRemoveChildren();
      this.drawPrice();
      this.drawTitles();
      this.redrawItem();
      //this.drawLine(266);
    };
    Window_PowerUpLabo.prototype.drawPrice = function () {
      var xx = 250;
      var yy = 120;
      var interval = 34;
      this.changeTextColor(ColorManager.systemColor());
      this.drawText(TextManager.currengCrystal, xx + 200, yy, 200, "left");
      this.drawText(
        TextManager.needCrystal,
        xx + 200,
        yy + interval,
        200,
        "left"
      );
      this.changeTextColor(ColorManager.normalColor());
      var ww = 330;
      this.drawText(
        $gameParty.crystal() + " " + TextManager.crystalCount,
        xx + 200,
        yy,
        ww,
        "right"
      );
      //if (this.calcPrice() > 9990) {
      //    this.drawText('出力アップはロックされています', xx + 450, yy + interval, ww, 'left');
      //} else {
      this.drawText(
        this.calcPrice() + " " + TextManager.crystalCount,
        xx + 200,
        yy + interval,
        ww,
        "right"
      );
      //}
    };
    Window_PowerUpLabo.prototype.drawAllItems = function () {
      this.contents.clear();
      this.drawTitles();
      this.redrawItem();
    };
    Window_PowerUpLabo.prototype.redrawItem = function () {
      for (var i = 0; i < this.maxItems(); i++) {
        this.drawItem(i);
      }
    };
    Window_PowerUpLabo.prototype.disableColor = function () {
      return "#765e3d";
    };
    Window_PowerUpLabo.prototype.getBaseTexture = function () {
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
    Window_PowerUpLabo.prototype.drawTitles = function () {
      for (var i = 0; i < this._items.length; i++) {
        this.drawTitle(i, this._items[i]);
        this.drawLevel(i, this._items[i]);
        //this.drawSkillText(i, this._items[i]);
      }
    };
    Window_PowerUpLabo.prototype.drawTitle = function (setIndex, skillSet) {
      var rect = this.itemRect(setIndex * this.maxCols());
      if (skillSet.isBase()) {
        this.changeTextColor(ColorManager.baseColor());
      } else if (skillSet.isPassive()) {
        this.changeTextColor(ColorManager.passiveColor());
      } else if (skillSet.isOugi()) {
        this.changeTextColor(ColorManager.ougiColor());
      } else {
        this.changeTextColor(ColorManager.normalColor());
      }
      this.drawText(skillSet.name(), TITLE_LEFT + 40, rect.y, 200, "left");
      this.drawIcon(skillSet.iconIndex(), TITLE_LEFT, rect.y + 2);
    };
    Window_PowerUpLabo.prototype.drawLevel = function (setIndex, skillSet) {
      var rect = this.itemRect(setIndex * this.maxCols());
      var lv = skillSet.learnedLv();
      var text = "Lv" + lv;
      if (lv === 0) {
        this.changeTextColor(ColorManager.textColor(8));
        text = TextManager.unlearned;
      } else {
        this.changeTextColor(ColorManager.normalColor());
      }
      this.drawText(text, TITLE_LEFT + 290, rect.y, 200, "left");
    };
    Window_PowerUpLabo.prototype.drawSkillText = function (setIndex, skillSet) {
      this.changeTextColor(ColorManager.normalColor());
      var rect = this.itemRect(setIndex * this.maxCols());
      var text = skillSet.skillText(skillSet.learnedLv());
      this.drawText(text, TITLE_LEFT + 390, rect.y, 200, "left");
      if (skillSet.reserveIndex() >= skillSet.learnedLv()) {
        var text_1 = skillSet.skillText(skillSet.reserveIndex() + 1);
        if (skillSet.reserveIndex() == 0) {
          text_1 = TextManager.learn;
        }
        if (text_1.length == 0) {
          text_1 = "Lv" + (skillSet.reserveIndex() + 1);
        }
        this.drawText("→ " + text_1, TITLE_LEFT + 450, rect.y, 120, "left");
      }
    };
    Window_PowerUpLabo.prototype.drawItem = function (index) {
      var skill = this.getSkill(index);
      if (!skill) {
        return;
      }
      var rect = this.itemRect(index);
      var baseTexture = this.getBaseTexture();
      var textureRect = new PIXI.Rectangle(0, 0, BLOCK_WIDTH, BLOCK_HEIGHT);
      if (skill.isLearned()) {
        textureRect.x = BLOCK_WIDTH;
      } else if (skill.isReserved()) {
        textureRect.x = BLOCK_WIDTH * 2;
      }
      var texture = new PIXI.Texture(baseTexture, textureRect);
      var sprite = new PIXI.Sprite(texture);
      sprite.x = rect.x + 5;
      sprite.y = rect.y + 5;
      //this.drawInitialSkill(skill, rect);
      this._windowContentsSprite.addChild(sprite);
    };
    Window_PowerUpLabo.prototype.drawInitialSkill = function (skill, rect) {
      var baseTexture = this.getBaseTexture();
      var textureRect = new PIXI.Rectangle(
        0,
        BLOCK_HEIGHT * 4,
        120,
        BLOCK_HEIGHT
      );
      var texture = new PIXI.Texture(baseTexture, textureRect);
      var sprite = new PIXI.Sprite(texture);
      sprite.x = 10;
      sprite.y = rect.y + 5;
      this._windowContentsSprite.addChild(sprite);
    };
    Window_PowerUpLabo.prototype.getSkill = function (index) {
      var itemIndex = index % 10;
      var skillSet = this.getSkillSet(index);
      if (!skillSet) {
        return null;
      }
      return skillSet.itemAt(itemIndex);
    };
    Window_PowerUpLabo.prototype.getSkillSet = function (index) {
      var setIndex = Math.floor(index / 10);
      return this._items[setIndex];
    };
    Window_PowerUpLabo.prototype.canBuyItem = function (armor) {
      if ($gameParty.crystal() < this.calcPrice()) {
        return false;
      }
      return true;
    };
    Window_PowerUpLabo.prototype.isGetSkill = function (armor) {
      if (!armor) {
        return false;
      }
      return $gameParty.hasItem(armor);
    };
    Window_PowerUpLabo.prototype.isOpenSkill = function (armor) {
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
    Window_PowerUpLabo.prototype.itemRect = function (index) {
      var skill = this.getSkill(index);
      if (!skill) {
        return new Rectangle(0, 0, 0, 0);
      }
      var offset = 10;
      var x = MARGIN_LEFT + skill.lv() * INTERVAL_X - offset;
      var y = MARGIN_TOP + skill.y() * INTERVAL_Y - offset - this.scrollBaseY();
      return new Rectangle(
        x,
        y,
        BLOCK_WIDTH + offset * 2,
        BLOCK_HEIGHT + offset * 2
      );
    };
    Window_PowerUpLabo.prototype.maxItems = function () {
      return 45;
    };
    Window_PowerUpLabo.prototype.maxCols = function () {
      return 10;
    };
    Window_PowerUpLabo.prototype.maxPageRows = function () {
      return 9;
    };
    Window_PowerUpLabo.prototype.itemHeight = function () {
      return INTERVAL_Y;
    };
    Window_PowerUpLabo.prototype.playOkSound = function () {};
    Window_PowerUpLabo.prototype.ensureCursorVisible = function (smooth) {
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
    Window_PowerUpLabo.prototype.contentsHeight = function () {
      return this.innerHeight + this.itemHeight();
    };
    Window_PowerUpLabo.prototype.cursorRight = function (wrap) {
      var current = this.getSkill(this.index());
      if (current.lv() == 10) {
        return;
      }
      var skill = this.getSkill(this.index() + 1);
      if (!skill) {
        return;
      }
      this.select(this.index() + 1);
      //const skillSet: SkillSet = this.getSkillSet(this.index());
    };
    Window_PowerUpLabo.prototype.cursorLeft = function (wrap) {
      var current = this.getSkill(this.index());
      if (current.lv() == 1) {
        return;
      }
      var skill = this.getSkill(this.index() - 1);
      if (!skill) {
        return;
      }
      this.select(this.index() - 1);
    };
    Window_PowerUpLabo.prototype.refreshCursor = function () {
      if (this._cursorAll) {
        this.refreshCursorForAll();
      } else if (this.index() >= 0) {
        var rect = this.itemRect(this.index());
        this.setCursorRect(
          rect.x - 1,
          rect.y - 1,
          rect.width - 9,
          rect.height - 9
        );
      } else {
        this.setCursorRect(0, 0, 0, 0);
      }
    };
    return Window_PowerUpLabo;
  })(Window_Selectable);
})(Nore || (Nore = {}));
