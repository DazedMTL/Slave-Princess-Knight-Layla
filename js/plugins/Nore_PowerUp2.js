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
  var pluginName = "Nore_PowerUp";
  PluginManager.registerCommand(pluginName, "SkillTree", function (args) {
    SceneManager.push(Nore.Scene_PowerUp);
  });
  Nore.SKILL_PRICE_UP = 5;
  var Scene_PowerUp2 = /** @class */ (function (_super) {
    __extends(Scene_PowerUp2, _super);
    function Scene_PowerUp2() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Scene_PowerUp2.prototype.create = function () {
      Nore.Scene_Talk.prototype.create.call(this);
      this.refreshBg();
      this.createWindowLayer();
      this.createAllWindows();
      this.createHelpWindow();
      this.createUpgradeWindow();
      this.createMsgWindow();
      this.createTutoArrow();
      this.createConfirmWindow();
      this.createButtons();
      this.createRightTachie();
      this.addChild(this._goldWindow);
      this.addChild(this._messageWindow);
    };
    Scene_PowerUp2.prototype.createRightTachie = function () {
      this._rightTachie = new Nore.Sprite_RightTachie2(890, 180, 0.7);
      this.addChild(this._rightTachie);
    };
    Scene_PowerUp2.prototype.start = function () {
      _super.prototype.start.call(this);
      this.refreshActor();
      this.startInitialScenario();
    };
    Scene_PowerUp2.prototype.startInitialScenario = function () {
      if ($gameSwitches.value(361)) {
        return;
      }
      $gameSwitches.setValue(361, true);
      this._upgradeWindow.deactivate();
      this.playScenario("パワーアップチュートリアル_01");
    };
    Scene_PowerUp2.prototype.finishScenario = function () {
      _super.prototype.finishScenario.call(this);
      this._goldWindow.open();
      this._goldWindow.show();
      this._upgradeWindow.activate();
    };
    Scene_PowerUp2.prototype.createButtons = function () {
      this._backButton = new Sprite_BackButton();
      this._backButton.x = 1140;
      this._backButton.y = 14;
      this.addChild(this._backButton);
      this._backButton.setClickHandler(this.onCancel.bind(this));
      if (ConfigManager.touchUI) {
        if (this.needsPageButtons()) {
          p("createPageButtons");
          this.createPageButtons();
        }
      }
    };
    Scene_PowerUp2.prototype.needsPageButtons = function () {
      return true;
    };
    Scene_PowerUp2.prototype.createPageButtons = function () {
      this._pageupButton = new Sprite_Button("pageup");
      this._pageupButton.x = 34;
      this._pageupButton.y = this.buttonY();
      var pageupRight = this._pageupButton.x + this._pageupButton.width;
      this._pagedownButton = new Sprite_Button("pagedown");
      this._pagedownButton.x = pageupRight + 4;
      this._pagedownButton.y = this.buttonY();
      this.addWindow(this._pageupButton);
      this.addWindow(this._pagedownButton);
      this._pageupButton.setClickHandler(this.onPageUp.bind(this));
      this._pagedownButton.setClickHandler(this.onPageDown.bind(this));
    };
    Scene_PowerUp2.prototype.buttonY = function () {
      return 50;
    };
    Scene_PowerUp2.prototype.refreshBg = function () {
      var baseTexture = Nore.getSystemBaseTexture("bg");
      var texture = new PIXI.Texture(baseTexture);
      var sprite = new PIXI.Sprite(texture);
      sprite.x = 0;
      sprite.y = 0;
      this.addChild(sprite);
    };
    Scene_PowerUp2.prototype.isTuto = function () {
      return !$gameSwitches.value(23);
    };
    Scene_PowerUp2.prototype.createTutoArrow = function () {
      if (!this.isTuto()) {
        return;
      }
      this._arrow = new Nore.TutoArrow(70, 50);
      this._upgradeWindow.addInnerChild(this._arrow);
    };
    Scene_PowerUp2.prototype.createHelpWindow = function () {
      var rect = this.helpWindowRect();
      this._helpWindow = new Window_Help(rect);
      this.addWindow(this._helpWindow);
      this._helpWindow.visible = false;
    };
    Scene_PowerUp2.prototype.helpWindowRect = function () {
      var wx = this._goldWindow.width - 14;
      var wy = 0;
      var ww = Graphics.boxWidth - this._goldWindow.width + 8;
      var wh = 120;
      return new Rectangle(wx, wy, ww, wh);
    };
    Scene_PowerUp2.prototype.createUpgradeWindow = function () {
      this._upgradeWindow = new Window_PowerUp();
      this._upgradeWindow.setHandler("ok", this.onOk.bind(this));
      this._upgradeWindow.setHandler("change", this.onChange.bind(this));
      this._upgradeWindow.setHandler("cancel", this.onCancel.bind(this));
      this._upgradeWindow.setHandler("pageup", this.onPageUp.bind(this));
      this._upgradeWindow.setHandler("pagedown", this.onPageDown.bind(this));
      this._upgradeWindow.setActor($gameParty.menuActor());
      this.addChild(this._upgradeWindow);
    };
    Scene_PowerUp2.prototype.onAuto = function () {
      this._upgradeWindow.selectAuto();
      this.decide();
    };
    Scene_PowerUp2.prototype.onPageDown = function () {
      SoundManager.playCursor();
      $gameParty.makeMenuActorNext();
      this.refreshActor();
    };
    Scene_PowerUp2.prototype.onPageUp = function () {
      SoundManager.playCursor();
      $gameParty.makeMenuActorPrevious();
      this.refreshActor();
    };
    Scene_PowerUp2.prototype.refreshActor = function () {
      this._upgradeWindow.setActor($gameParty.menuActor());
      this._rightTachie.setActorId($gameParty.menuActor().actorId());
    };
    Scene_PowerUp2.prototype.createGoldWindow = function () {
      this._goldWindow = new Nore.Window_BattleHelp(
        new Rectangle(259, 8, 816, 172)
      );
      this.addChild(this._goldWindow);
    };
    Scene_PowerUp2.prototype.createConfirmWindow = function () {
      this._confirmWindow = new Nore.Window_Confirm();
      this._confirmWindow.setText("決定しますか？");
      this._confirmWindow.setHandler("ok", this.onConfirmOk.bind(this));
      this._confirmWindow.setHandler("cancel", this.onConfirmCancel.bind(this));
      this._confirmWindow.deactivate();
      this.addChild(this._confirmWindow);
      this._confirmWindow.hide();
      this._confirmWindow.y = 100;
      this._confirmWindow.x -= 70;
    };
    Scene_PowerUp2.prototype.createMsgWindow = function () {
      this._msgWindow = new Nore.Window_Msg(162);
      this._msgWindow.setHandler("ok", this.onConfirmCancel.bind(this));
      this._msgWindow.setHandler("cancel", this.onConfirmCancel.bind(this));
      this._msgWindow.deactivate();
      this.addChild(this._msgWindow);
      this._msgWindow.hide();
    };
    Scene_PowerUp2.prototype.onConfirmCancel = function () {
      this._confirmWindow.hide();
      this._confirmWindow.deactivate();
      this._msgWindow.hide();
      this._msgWindow.deactivate();
      this._upgradeWindow.activate();
    };
    Scene_PowerUp2.prototype.onConfirmOk = function () {
      if (!this._upgradeWindow.canBuy()) {
        this._confirmWindow.hide();
        var text = TextManager.notEnoughPoint;
        this._msgWindow.setText(text);
        this._msgWindow.setInfo(true);
        this._msgWindow.show();
        this._msgWindow.activate();
        return;
      }
      TouchInput.clear();
      $gameSwitches.setValue(23, true);
      if (this._arrow) {
        this._arrow.visible = false;
      }
      SoundManager.playShop();
      this._upgradeWindow.decide();
      this._goldWindow.refresh();
      this._upgradeWindow.refresh();
      this._upgradeWindow.activate();
      this._confirmWindow.hide();
      this._confirmWindow.deactivate();
      this.onChange();
    };
    Scene_PowerUp2.prototype.onCancel = function () {
      $gameTemp.isCancelMenu = true;
      this.popScene();
    };
    Scene_PowerUp2.prototype.onOk = function () {
      if ($gameSwitches.value(1)) {
        this.showCantPowerUpDialog(TextManager.cantPowerUp);
        return;
      }
      var index = this._upgradeWindow.index();
      if (index < 0) {
        this.onAuto();
        return;
      }
      this.decide();
    };
    Scene_PowerUp2.prototype.decide = function () {
      var skillItem = this._upgradeWindow.selectedItem();
      if (
        this._upgradeWindow._actorSkillSet.isRequiredSkillNotLearned(skillItem)
      ) {
        this.showRequiredSkillNotLearnedDialog();
        return;
      }
      var price = this._upgradeWindow.calcPrice();
      if (price <= 0) {
        this._upgradeWindow.activate();
        return;
      }
      var sp = $gameParty.menuActor().skillPoint();
      if (price > sp) {
        this.showCantPowerUpDialog(TextManager.cantPowerUp2);
        return;
      }
      SoundManager.playOk();
      this.addChild(this._confirmWindow);
      TouchInput.clear();
      this._confirmWindow.setTexts([
        TextManager.confirmPrice1.format(price),
        TextManager.confirmPrice2,
      ]);
      this._confirmWindow.show();
      this._confirmWindow.activate();
    };
    Scene_PowerUp2.prototype.showRequiredSkillNotLearnedDialog = function () {
      SoundManager.playBuzzer();
      var item = this._upgradeWindow.getSelectedBaseItem();
      var skill = item.skill();
      var texts;
      if (skill.meta["requiredSkill2"]) {
        texts = Nore.getRequiredSkill2(item.skill());
      } else {
        texts = Nore.getRequiredSkill1(item.skill());
      }
      this._msgWindow.setTexts(texts.split("\n"));
      this._msgWindow.setInfo(true);
      this._msgWindow.show();
      this._msgWindow.activate();
    };
    Scene_PowerUp2.prototype.showCantPowerUpDialog = function (text) {
      SoundManager.playBuzzer();
      this._msgWindow.setText(text);
      this._msgWindow.setInfo(true);
      this._msgWindow.show();
      this._msgWindow.activate();
    };
    Scene_PowerUp2.prototype.onChange = function () {
      var item = this._upgradeWindow.selectedItem();
      if (item) {
        this._goldWindow.setItem(item.skill());
        this._goldWindow.show();
      }
      if (this.needRefresh(item)) {
        //this._upgradeWindow.setRequiredSkill()
        this._upgradeWindow.refresh();
      }
      this._lastSelectedItem = item;
    };
    Scene_PowerUp2.prototype.needRefresh = function (newItem) {
      if (this._lastSelectedItem) {
        if (this._lastSelectedItem.skill().meta["requiredSkill"]) {
          return true;
        }
      }
      if (newItem) {
        if (newItem.skill().meta["requiredSkill"]) {
          return true;
        }
      }
      return false;
    };
    return Scene_PowerUp2;
  })(Nore.Scene_Talk);
  Nore.Scene_PowerUp2 = Scene_PowerUp2;
  var TITLE_LEFT = 188;
  var MARGIN_TOP = 220;
  var MARGIN_LEFT = 628;
  var BLOCK_WIDTH = 36;
  var BLOCK_HEIGHT = 36;
  var INTERVAL_X = 42;
  var INTERVAL_Y = 44;
  var SkillItem = /** @class */ (function () {
    function SkillItem(actor, skill, y, skillSet) {
      this._reserved = false;
      this._actor = actor;
      this._skill = skill;
      this._y = y;
      this._skillSet = skillSet;
    }
    SkillItem.prototype.isMatch = function (skill) {
      return this._skill.name == skill.name;
    };
    Object.defineProperty(SkillItem.prototype, "description", {
      get: function () {
        return this._skill.description;
      },
      enumerable: true,
      configurable: true,
    });
    Object.defineProperty(SkillItem.prototype, "name", {
      get: function () {
        return getItemName(this._skill);
      },
      enumerable: true,
      configurable: true,
    });
    SkillItem.prototype.id = function () {
      return this._skill.id;
    };
    SkillItem.prototype.y = function () {
      return this._y;
    };
    SkillItem.prototype.lv = function () {
      return Math.trunc(this._skill.meta["lv"]);
    };
    SkillItem.prototype.isLearned = function () {
      return this._actor.isLearnedSkill(this.id());
    };
    SkillItem.prototype.learn = function () {
      this._actor.learnSkill(this.id());
    };
    SkillItem.prototype.setReserve = function (b) {
      this._reserved = b;
    };
    SkillItem.prototype.isReserved = function () {
      return this._reserved;
    };
    SkillItem.prototype.textType = function () {
      if (this._skill.meta["text"] == TextType.DAMAGE) {
        return TextType.DAMAGE;
      }
      return TextType.NONE;
    };
    SkillItem.prototype.damageText = function () {
      return Nore.getDamageRate(this._skill) + "%";
    };
    SkillItem.prototype.skill = function () {
      return this._skill;
    };
    SkillItem.prototype.isPassive = function () {
      return $skillManager.isPassive(this._skill);
    };
    SkillItem.prototype.isOugi = function () {
      return $skillManager.isOugi(this._skill);
    };
    SkillItem.prototype.mpCost = function () {
      return this.skill().mpCost;
    };
    SkillItem.prototype.opCost = function () {
      return this.skill().tpCost;
    };
    SkillItem.prototype.isBase = function () {
      return $skillManager.isBase(this._skill);
    };
    SkillItem.prototype.priceType = function () {
      var skill = this._skillSet.baseSkill();
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
      for (var i = 0; i < this._skillSet._items.length; i++) {
        var skill2 = this._skillSet._items[i];
        var price = parseInt(skill2.skill().meta["price"]);
        if (price > 0) {
          list.splice(i, 1, price);
        }
      }
      return list;
    };
    SkillItem.prototype.price = function (caintainsNotReserved) {
      if (this.isLearned()) {
        return 0;
      }
      if (!this.isReserved() && !caintainsNotReserved) {
        return 0;
      }
      var price = parseInt(this.skill().meta["price"]);
      if (price > 0) {
        return price;
      }
      var priceType = this.priceType();
      for (var i = 0; i < this._skillSet._items.length; i++) {
        var item = this._skillSet._items[i];
        if (item == this) {
          return priceType[i];
        }
      }
      console.error("error");
    };
    return SkillItem;
  })();
  Nore.SkillItem = SkillItem;
  var SkillSet = /** @class */ (function () {
    function SkillSet(actor, skill, y) {
      this._items = [];
      this._reserveIndex = -1;
      this._actor = actor;
      this._y = y;
      this.push(skill);
    }
    SkillSet.prototype.isMatch = function (skill) {
      return this.baseSkill().isMatch(skill);
    };
    SkillSet.prototype.baseSkill = function () {
      return this._items[0];
    };
    SkillSet.prototype.push = function (skill) {
      this._items.push(new SkillItem(this._actor, skill, this._y, this));
    };
    SkillSet.prototype.learnLv = function () {
      var lv = parseInt(this.baseSkill().skill().meta["learnLv"]);
      if (isNaN(lv)) {
        return 1;
      }
      return lv;
    };
    SkillSet.prototype.setY = function (y) {
      this._y = y;
      for (var _i = 0, _a = this._items; _i < _a.length; _i++) {
        var item = _a[_i];
        item._y = y;
      }
    };
    SkillSet.prototype.learn = function () {
      for (var i = 0; i < this._items.length; i++) {
        var item = this._items[i];
        if (item.isLearned()) {
          continue;
        }
        if (!item.isReserved()) {
          continue;
        }
        item.learn();
      }
    };
    SkillSet.prototype.learnedSkill = function () {
      for (var i = this._items.length - 1; i >= 0; i--) {
        if (this._items[i].isLearned()) {
          return this._items[i];
        }
      }
      return null;
    };
    SkillSet.prototype.itemAt = function (index) {
      return this._items[index];
    };
    SkillSet.prototype.name = function () {
      return this.baseSkill().name;
    };
    SkillSet.prototype.reserve = function (index) {
      for (var i = 0; i < this._items.length; i++) {
        var item = this._items[i];
        if (item.isLearned()) {
          continue;
        }
        item.setReserve(index >= i);
      }
      this._reserveIndex = index;
    };
    SkillSet.prototype.maxItems = function () {
      return this._items.length;
    };
    SkillSet.prototype.y = function () {
      return this._y;
    };
    SkillSet.prototype.learnedLv = function () {
      var skill = this.learnedSkill();
      if (!skill) {
        return 0;
      }
      return skill.lv();
    };
    SkillSet.prototype.textType = function () {
      var skill = this._items[0];
      return skill.textType();
    };
    SkillSet.prototype.skillText = function (lv) {
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
    SkillSet.prototype.reserveIndex = function () {
      return this._reserveIndex;
    };
    SkillSet.prototype.price = function () {
      var total = 0;
      for (var i = 0; i < this._items.length; i++) {
        var item = this._items[i];
        total += item.price(false);
      }
      return total;
    };
    SkillSet.prototype.learnSkillCount = function () {
      var total = 0;
      for (var i = 0; i < this._items.length; i++) {
        var item = this._items[i];
        if (item.price(false) > 0) {
          total++;
        }
      }
      return total;
    };
    SkillSet.prototype.iconIndex = function () {
      return this.baseSkill().skill().iconIndex;
    };
    SkillSet.prototype.isPassive = function () {
      return this.baseSkill().isPassive();
    };
    SkillSet.prototype.isBase = function () {
      return this.baseSkill().isBase();
    };
    SkillSet.prototype.isOugi = function () {
      return this.baseSkill().isOugi();
    };
    SkillSet.prototype.mpCost = function () {
      return this.baseSkill().mpCost();
    };
    SkillSet.prototype.opCost = function () {
      return this.baseSkill().opCost();
    };
    SkillSet.prototype.sortValue = function () {
      if (this.baseSkill().skill().meta["order"]) {
        return parseInt(this.baseSkill().skill().meta["order"]);
      }
      return this.baseSkill().skill().id;
    };
    SkillSet.prototype.isMpUp = function () {
      var skill = this.baseSkill();
      if (skill.skill().meta["mpPlusTurnOdd"]) {
        return true;
      }
      if (skill.skill().meta["mpPlusTurnEven"]) {
        return true;
      }
      return false;
    };
    return SkillSet;
  })();
  Nore.SkillSet = SkillSet;
  var TextType;
  (function (TextType) {
    TextType["DAMAGE"] = "damage";
    TextType["NONE"] = "none";
  })(TextType || (TextType = {}));
  var ActorSkillSet = /** @class */ (function () {
    function ActorSkillSet(actor) {
      this._actor = actor;
      this._items = [];
      this.refresh();
    }
    ActorSkillSet.prototype.getItems = function () {
      return this._items;
    };
    ActorSkillSet.prototype.refresh = function () {
      var start = this._actor.actorId() * 100 + 1001;
      var end = start + 100;
      //p(start + ' ' + end)
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
        this.addSkill(skill);
      }
      this._items = this._items.sort(function (a, b) {
        return a.sortValue() - b.sortValue();
      });
      for (var i = 0; i < this._items.length; i++) {
        this._items[i].setY(i);
      }
    };
    ActorSkillSet.prototype.addSkill = function (skill) {
      for (var _i = 0, _a = this._items; _i < _a.length; _i++) {
        var set = _a[_i];
        if (set.isMatch(skill)) {
          set.push(skill);
          return;
        }
      }
      var newSet = new SkillSet(this._actor, skill, this._items.length);
      this._items.push(newSet);
    };
    ActorSkillSet.prototype.isRequiredSkillNotLearned = function (item) {
      if (!item) {
        return false;
      }
      var base = this.findBaseSkill(item);
      if (!base) {
        return false;
      }
      if (!base.skill().meta["requiredSkill"]) {
        return false;
      }
      var skillId = parseInt(base.skill().meta["requiredSkill"]);
      var skill1 = this.findSkill(skillId);
      if (!skill1.isLearned() && !skill1.isReserved()) {
        //if (! $gameParty.menuActor().isLearnedSkill(skillId)) {
        return true;
      }
      if (!base.skill().meta["requiredSkill2"]) {
        return false;
      }
      var skillId2 = parseInt(base.skill().meta["requiredSkill2"]);
      var skill2 = this.findSkill(skillId2);
      if (!skill2.isLearned() && !skill2.isReserved()) {
        //if ($gameParty.menuActor().isLearnedSkill(skillId2)) {
        return true;
      }
      return false;
    };
    ActorSkillSet.prototype.findSkill = function (skillId) {
      for (var _i = 0, _a = this._items; _i < _a.length; _i++) {
        var item = _a[_i];
        var set = item;
        for (var _b = 0, _c = set._items; _b < _c.length; _b++) {
          var s = _c[_b];
          if (s.id() == skillId) {
            return s;
          }
        }
      }
      return null;
    };
    ActorSkillSet.prototype.findBaseSkill = function (item) {
      if (item.lv() == 1) {
        return item;
      }
      for (var _i = 0, _a = this._items; _i < _a.length; _i++) {
        var list = _a[_i];
        var set = list;
        if (set.baseSkill().skill().name == item.name) {
          return set.baseSkill();
        }
      }
      return null;
    };
    ActorSkillSet.prototype.isAutoBefoSkill = function (item) {
      var before = item.skill().meta["autoBefore"];
      if (!before) {
        return false;
      }
      var beforeId = Math.trunc(before);
      var skill = this.findSkill(beforeId);
      if (!skill.isLearned() && !skill.isReserved()) {
        return true;
      }
      return false;
    };
    ActorSkillSet.prototype.candidates = function () {
      var items = this.getItems();
      var candidates = [];
      for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
        var item = items_1[_i];
        var set = item;
        for (var _a = 0, _b = set._items; _a < _b.length; _a++) {
          var s = _b[_a];
          if (s.isLearned()) {
            continue;
          }
          if (s.isReserved()) {
            continue;
          }
          if (this.isAutoBefoSkill(s)) {
            break;
          }
          if (this.isRequiredSkillNotLearned(s)) {
            break;
          }
          candidates.push(s);
          break;
        }
      }
      return candidates;
    };
    return ActorSkillSet;
  })();
  Nore.ActorSkillSet = ActorSkillSet;
  var AUTO_SELECT_RECT = new Rectangle(490, 122, 120, 50);
  var POWERUP_NAME_X = 666;
  var Window_PowerUp = /** @class */ (function (_super) {
    __extends(Window_PowerUp, _super);
    function Window_PowerUp() {
      var _this = this;
      _this._items = [];
      var y = 92;
      var rect = new Rectangle(-4, y, Graphics.boxWidth + 8, 790 - y + 4);
      _this = _super.call(this, rect) || this;
      //this.drawCursor();
      _this.frameVisible = false;
      _this.backOpacity = 0;
      _this.select(0);
      _this._windowContentsSprite.x = 0;
      _this._windowContentsSprite.y = 0;
      return _this;
    }
    Window_PowerUp.prototype.setActor = function (actor) {
      this._actor = actor;
      this.choiceData();
      this.refresh();
      this.activate();
      if (this.index() != -1) {
        this.select(0);
      }
    };
    Window_PowerUp.prototype.drawLine = function (y) {
      var padding = this.itemPadding();
      var x = 50;
      var width = 850;
      this.drawRect(x, y, width, 3);
    };
    Window_PowerUp.prototype.initialize = function (rect) {
      _super.prototype.initialize.call(this, rect);
      this.contents.outlineColor = "rgba(0, 0, 0, 1)";
      this.contents.outlineWidth = 4;
    };
    Window_PowerUp.prototype.getSprite = function (rect) {
      var baseTexture = Nore.getSystemBaseTexture("skill_item");
      var texture = new PIXI.Texture(baseTexture, rect);
      return new PIXI.Sprite(texture);
    };
    Window_PowerUp.prototype.choiceData = function () {
      var set = new ActorSkillSet(this._actor);
      this._actorSkillSet = set;
      this._items = set.getItems();
    };
    Window_PowerUp.prototype.lineHeight = function () {
      return _super.prototype.lineHeight.call(this) + 4;
    };
    Window_PowerUp.prototype.selectedItems = function () {
      var result = [];
      for (var _i = 0, _a = this._items; _i < _a.length; _i++) {
        var set = _a[_i];
        for (var _b = 0, _c = set._items; _b < _c.length; _b++) {
          var skill = _c[_b];
          if (skill.isReserved()) {
            result.push(skill);
          }
        }
      }
      return result;
    };
    Window_PowerUp.prototype.selectedItem = function () {
      return this.getSkill(this.index());
    };
    Window_PowerUp.prototype.select = function (index) {
      _super.prototype.select.call(this, index);
      this.reserve();
    };
    Window_PowerUp.prototype.decide = function () {
      this._actor.useSkillPoint(this.calcPrice());
      for (var _i = 0, _a = this._items; _i < _a.length; _i++) {
        var set = _a[_i];
        set.learn();
      }
      this.refresh();
    };
    Window_PowerUp.prototype.calcPrice = function () {
      var total = 0;
      for (var _i = 0, _a = this._items; _i < _a.length; _i++) {
        var set = _a[_i];
        total += set.price() / 10;
      }
      var skillPriceBase = this._actor.calcSkillLearnCount();
      var plus = 0;
      for (var _b = 0, _c = this._items; _b < _c.length; _b++) {
        var set = _c[_b];
        for (var i = 0; i < set.learnSkillCount(); i++) {
          plus += skillPriceBase * Nore.SKILL_PRICE_UP;
          skillPriceBase++;
        }
      }
      return total + plus;
    };
    Window_PowerUp.prototype.getSelectedBaseItem = function () {
      return this.getSkillSet(this.index()).baseSkill();
    };
    Window_PowerUp.prototype.reserve = function () {
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
    Window_PowerUp.prototype.canSelect = function () {
      var armors = this.selectedItems();
      for (var _i = 0, armors_1 = armors; _i < armors_1.length; _i++) {
        var skill = armors_1[_i];
        if (!this._actorSkillSet.isRequiredSkillNotLearned(skill)) {
          return false;
        }
      }
      return true;
    };
    Window_PowerUp.prototype.canBuy = function () {
      var sp = this._actor.skillPoint() * 10;
      return this.calcPrice() <= sp;
      /*if (! this.canSelect()) {
                return false;
            }
            var armor = this.selectedItem();
            return this.canBuyItem(armor);*/
    };
    Window_PowerUp.prototype.refresh = function () {
      this.contents.clear();
      this._windowContentsSprite.destroyAndRemoveChildren();
      this.drawAuto();
      this.drawActor();
      this.drawPrice();
      this.drawTitles();
      this.redrawItem();
      //this.drawLine(266);
    };
    Window_PowerUp.prototype.drawAuto = function () {
      this.changePaintOpacity(true);
      this.changeTextColor(ColorManager.normalColor());
      this.drawText(TextManager.autoSelect, 500, 130, 200, "left");
    };
    Window_PowerUp.prototype.drawActor = function () {
      var xx = POWERUP_NAME_X;
      var yy = 86;
      this.changePaintOpacity(true);
      this.resetFontSettings();
      this.drawText(this._actor.name(), xx, yy, 200, "left");
    };
    Window_PowerUp.prototype.drawPrice = function () {
      var xx = POWERUP_NAME_X;
      var yy = 120;
      var interval = 34;
      this.changeTextColor(ColorManager.systemColor());
      this.drawText(TextManager.skillPoint, xx, yy, 200, "left");
      this.drawText(TextManager.needSkillPoint, xx, yy + interval, 200, "left");
      this.changeTextColor(ColorManager.normalColor());
      var ww = 330;
      this.drawText(this._actor.skillPoint() + " pt", xx - 40, yy, ww, "right");
      this.drawText(
        this.calcPrice() + " pt",
        xx - 40,
        yy + interval,
        ww,
        "right"
      );
    };
    Window_PowerUp.prototype.drawAllItems = function () {
      this.contents.clear();
      this.drawTitles();
      this.redrawItem();
    };
    Window_PowerUp.prototype.redrawItem = function () {
      for (var i = 0; i < this.maxItems(); i++) {
        this.drawItem(i);
      }
    };
    Window_PowerUp.prototype.disableColor = function () {
      return "#765e3d";
    };
    Window_PowerUp.prototype.getBaseTexture = function () {
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
    Window_PowerUp.prototype.drawTitles = function () {
      for (var i = 0; i < this._items.length; i++) {
        this.drawTitle(i, this._items[i]);
        this.drawLevel(i, this._items[i]);
      }
    };
    Window_PowerUp.prototype.drawTitle = function (setIndex, skillSet) {
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
      if (this._actorSkillSet.isRequiredSkillNotLearned(skillSet.baseSkill())) {
        this.changePaintOpacity(false);
        this.drawLock(TITLE_LEFT - 55, rect.y);
      } else {
        this.changePaintOpacity(true);
      }
      this.drawText(skillSet.name(), TITLE_LEFT + 20, rect.y, 220, "left");
      this.contents.fontSize = 20;
      var text;
      if ($gameSystem.isLevelNoLimit()) {
        text = "";
      } else if (skillSet.learnLv() == 1) {
        text = "";
      } else {
        text = TextManager.learnLv.format(skillSet.learnLv());
      }
      this.drawText(text, TITLE_LEFT - 140, rect.y, 200, "left");
      this.drawCostText(skillSet, TITLE_LEFT + 280, rect.y);
      this.resetFontSettings();
      this.drawIcon(skillSet.iconIndex(), TITLE_LEFT - 20, rect.y + 2);
      if (skillSet.isMpUp()) {
        this.drawIcon(2801, TITLE_LEFT - 20, rect.y + 2);
      }
    };
    Window_PowerUp.prototype.drawCostText = function (skillSet, x, y) {
      if (skillSet.isPassive()) {
        return;
      }
      if (skillSet.isOugi()) {
        this.changeTextColor(ColorManager.ougiColor());
        this.drawText("%1 OP".format(skillSet.opCost()), x, y, 100, "left");
      } else {
        this.changeTextColor(ColorManager.mpCostColor());
        this.drawText("%1 MP".format(skillSet.mpCost()), x, y, 100, "left");
      }
    };
    Window_PowerUp.prototype.drawLock = function (x, y) {
      var baseTexture = this.getBaseTexture();
      var texture = new PIXI.Texture(
        baseTexture,
        new PIXI.Rectangle(0, 103, 40, 36)
      );
      var sprite = new PIXI.Sprite(texture);
      sprite.x = x;
      sprite.y = y;
      this._windowContentsSprite.addChild(sprite);
    };
    Window_PowerUp.prototype.drawLevel = function (setIndex, skillSet) {
      var rect = this.itemRect(setIndex * this.maxCols());
      var lv = skillSet.learnedLv();
      var text = TextManager.learned; //'Lv' + lv;
      if (lv === 0) {
        this.changeTextColor("#999999");
        text = TextManager.unlearned;
      } else {
        this.changeTextColor(ColorManager.normalColor());
      }
      this.drawText(text, TITLE_LEFT + 350, rect.y, 200, "left");
    };
    Window_PowerUp.prototype.drawItem = function (index) {
      var skill = this.getSkill(index);
      if (!skill) {
        return;
      }
      var rect = this.itemRect(index);
      var baseTexture = this.getBaseTexture();
      var textureRect = new PIXI.Rectangle(0, 0, BLOCK_WIDTH, BLOCK_HEIGHT);
      if (
        this.selectedItem() &&
        this.selectedItem().skill().id == skill.skill().id
      ) {
        if (skill.isLearned()) {
          textureRect.x = BLOCK_WIDTH * 4;
        } else {
          textureRect.x = BLOCK_WIDTH * 5;
        }
      } else if (this.isRequiredSkillTarget(skill)) {
        textureRect.x = BLOCK_WIDTH * 3;
      } else if (skill.isLearned()) {
        textureRect.x = BLOCK_WIDTH;
      } else if (skill.isReserved()) {
        textureRect.x = BLOCK_WIDTH * 2;
      }
      var texture = new PIXI.Texture(baseTexture, textureRect);
      var sprite = new PIXI.Sprite(texture);
      sprite.x = rect.x + 5;
      sprite.y = rect.y + 5;
      this._windowContentsSprite.addChild(sprite);
    };
    Window_PowerUp.prototype.findSkill = function (skillId) {
      for (var _i = 0, _a = this._items; _i < _a.length; _i++) {
        var item = _a[_i];
        var set = item;
        for (var _b = 0, _c = set._items; _b < _c.length; _b++) {
          var s = _c[_b];
          if (s.id() == skillId) {
            return s;
          }
        }
      }
      return null;
    };
    Window_PowerUp.prototype.isRequiredSkillTarget = function (skill) {
      var item = this.selectedItem();
      if (!item) {
        return false;
      }
      if (item.skill().meta["requiredSkill"]) {
        var skillId = parseInt(item.skill().meta["requiredSkill"]);
        if (skill.id() == skillId) {
          return true;
        }
      }
      if (item.skill().meta["requiredSkill2"]) {
        var skillId2 = parseInt(item.skill().meta["requiredSkill2"]);
        if (skill.id() == skillId2) {
          return true;
        }
      }
      return false;
    };
    Window_PowerUp.prototype.drawInitialSkill = function (skill, rect) {
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
    Window_PowerUp.prototype.getSkill = function (index) {
      var itemIndex = index % 10;
      var skillSet = this.getSkillSet(index);
      if (!skillSet) {
        return null;
      }
      return skillSet.itemAt(itemIndex);
    };
    Window_PowerUp.prototype.getSkillSet = function (index) {
      var setIndex = Math.floor(index / 10);
      return this._items[setIndex];
    };
    Window_PowerUp.prototype.canBuyItem = function (armor) {
      if (this._actor.skillPoint() < this.calcPrice()) {
        return false;
      }
      return true;
    };
    Window_PowerUp.prototype.isGetSkill = function (armor) {
      if (!armor) {
        return false;
      }
      return $gameParty.hasItem(armor);
    };
    /*isOpenSkill(armor): Boolean {
            if (! armor) {
                return false;
            }
            if (armor.meta['before']) {
                var before = parseInt(armor.meta['before']);
                var beforeArmor = $dataArmors[before];
                if (! $gameParty.hasItem(beforeArmor, false)) {
                    return false;
                }
            }
    
            return true;
        }*/
    Window_PowerUp.prototype.onTouchSelect = function (trigger) {
      if ($gameTemp.confirmWindowActive) {
        return;
      }
      _super.prototype.onTouchSelect.call(this, trigger);
      this.hitTestAutoSelect();
    };
    Window_PowerUp.prototype.onTouchOk = function () {
      if ($gameTemp.confirmWindowActive) {
        return;
      }
      _super.prototype.onTouchOk.call(this);
      if (this.index() < 0) {
        p(TouchInput._y);
        if (TouchInput._y > 200) {
          this.callHandler("ok");
        }
      }
    };
    Window_PowerUp.prototype.hitTestAutoSelect = function () {
      var touchPos = new Point(TouchInput.x, TouchInput.y);
      var localPos = this.worldTransform.applyInverse(touchPos);
      //return this.hitTest(localPos.x, localPos.y);
      if (AUTO_SELECT_RECT.contains(localPos.x, localPos.y)) {
        this.select(-1);
        this.redrawItem();
      }
    };
    Window_PowerUp.prototype.itemRect = function (index) {
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
    Window_PowerUp.prototype.maxItems = function () {
      return 100;
    };
    Window_PowerUp.prototype.maxCols = function () {
      return 10;
    };
    Window_PowerUp.prototype.maxPageRows = function () {
      return 9;
    };
    Window_PowerUp.prototype.itemHeight = function () {
      return INTERVAL_Y;
    };
    Window_PowerUp.prototype.playOkSound = function () {};
    Window_PowerUp.prototype.ensureCursorVisible = function (smooth) {
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
    Window_PowerUp.prototype.contentsHeight = function () {
      return this.innerHeight + this.itemHeight();
    };
    Window_PowerUp.prototype.cursorUp = function (wrap) {
      if (this.index() < 10) {
        this.select(-1);
        this.redrawItem();
        return;
      }
      _super.prototype.cursorUp.call(this, wrap);
    };
    Window_PowerUp.prototype.cursorDown = function (wrap) {
      if (this.index() < 0) {
        this.select(0);
        this.redrawItem();
        return;
      }
      _super.prototype.cursorDown.call(this, wrap);
    };
    Window_PowerUp.prototype.selectAuto = function () {
      var sp = this._actor.skillPoint() * 10;
      var total = 0;
      var learnSkillCount = this._actor.calcSkillLearnCount();
      for (var i = 0; i < 30; i++) {
        var candidates = this._actorSkillSet.candidates();
        var list = candidates.sort(function (a, b) {
          return a.price(true) - b.price(true);
        });
        var min = list[0];
        if (!min) {
          break;
        }
        var plus = learnSkillCount * Nore.SKILL_PRICE_UP * 10;
        if (min.price(true) + total + plus > sp) {
          break;
        }
        min.setReserve(true);
        total += min.price(true) + plus;
        learnSkillCount++;
      }
      this.refresh();
    };
    Window_PowerUp.prototype.cursorRight = function (wrap) {
      if (this.index() < 0) {
        return;
      }
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
    Window_PowerUp.prototype.cursorLeft = function (wrap) {
      if (this.index() < 0) {
        return;
      }
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
    Window_PowerUp.prototype.refreshCursor = function () {
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
        var r = AUTO_SELECT_RECT;
        this.setCursorRect(r.x, r.y, r.width, r.height);
      }
    };
    return Window_PowerUp;
  })(Window_Selectable);
})(Nore || (Nore = {}));
