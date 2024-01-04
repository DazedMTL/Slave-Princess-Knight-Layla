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
 * @command MakeShopItem
 * @text ショップアイテムを更新します
 *
 * @command GoToShop
 * @text ショップ画面を表示します
 * @arg shopType
 * @type number
 * @text 0装備 1アクセ 2アイテム
 */
var Nore;
(function (Nore) {
  var pluginName = "Nore_Shop";
  var NUM_ITEMS = 4;
  var shopType = 0;
  var ShopType;
  (function (ShopType) {
    ShopType[(ShopType["equip"] = 0)] = "equip";
    ShopType[(ShopType["acce"] = 1)] = "acce";
    ShopType[(ShopType["item"] = 2)] = "item";
  })(ShopType || (ShopType = {}));
  PluginManager.registerCommand(pluginName, "MakeShopItem", function (args) {
    var shopItemsEquip = [];
    var shopItemsItem = [];
    var candidates = makeCandidatesItem();
    candidates = Nore.shuffle(candidates);
    for (var i = 0; i < NUM_ITEMS - 1; i++) {
      shopItemsItem.push(candidates.pop());
    }
    shopItemsItem.push(new ShopItem(ITEM_TYPE.item, 15, null));
    var candidatesEquip = makeCandidatesEquip();
    candidatesEquip = Nore.shuffle(candidatesEquip);
    for (var i = 0; i < NUM_ITEMS; i++) {
      for (var k = 0; k < 20; k++) {
        var equip = candidatesEquip.pop();
        if (!equip) {
          break;
        }
        if ($gameParty.canEquip(equip.item())) {
          shopItemsEquip.push(equip);
          break;
        }
      }
    }
    $gameSystem.setShopItemsEquip(shopItemsEquip);
    $gameSystem.setShopItemsItem(shopItemsItem);
  });
  PluginManager.registerCommand(pluginName, "GoToShop", function (args) {
    shopType = args.shopType;
    SceneManager.push(Scene_Shop2);
  });
  function makeCandidatesItem() {
    var result = [];
    for (var i = 7; i <= 16; i++) {
      var item = $dataItems[i];
      if (item && item.name.length > 0 && item.meta["rate"]) {
        result.push(new ShopItem(ITEM_TYPE.item, i, null));
      }
    }
    return result;
  }
  Nore.makeCandidatesItem = makeCandidatesItem;
  function makeCandidatesEquip() {
    var result = [];
    var maxLv = maxShopItemLv();
    for (var i = 1; i <= 100; i++) {
      var item = $dataWeapons[i];
      if (item && parseInt(item.meta["lv"]) >= 2) {
        var lv = Math.trunc(item.meta["lv"]);
        if (lv > maxLv) {
          continue;
        }
        var weapon = new Weapon(item);
        result.push(new ShopItem(ITEM_TYPE.weapon, i, weapon.enchantList()));
      }
    }
    for (var i = 1; i <= 100; i++) {
      var item = $dataArmors[i];
      if (item && parseInt(item.meta["lv"]) >= 2) {
        var lv = Math.trunc(item.meta["lv"]);
        if (lv > maxLv) {
          continue;
        }
        var armor = new Armor(item);
        result.push(new ShopItem(ITEM_TYPE.armor, i, armor.enchantList()));
      }
    }
    return result;
  }
  Nore.makeCandidatesEquip = makeCandidatesEquip;
  function maxShopItemLv() {
    switch ($gameVariables.value(3)) {
      case 0:
      case 1:
        return 2;
      case 2:
      case 3:
        return 3;
      case 4:
      case 5:
        return 4;
      default:
        return 5;
    }
  }
  function makeShopItem() {}
  var Scene_Shop2 = /** @class */ (function (_super) {
    __extends(Scene_Shop2, _super);
    function Scene_Shop2() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Scene_Shop2.prototype.create = function () {
      _super.prototype.create.call(this);
      this.createMsgWindow();
    };
    Scene_Shop2.prototype.createGoldWindow = function () {
      var rect = this.goldWindowRect();
      this._goldWindow = new Window_Gold(rect);
      this.addChild(this._goldWindow);
    };
    Scene_Shop2.prototype.createMsgWindow = function () {
      this._msgWindow = new Nore.Window_Msg(176);
      this._msgWindow.setHandler("ok", this.onMsgOk.bind(this));
      this._msgWindow.deactivate();
      this.addChild(this._msgWindow);
      this._msgWindow.hide();
    };
    Scene_Shop2.prototype.onMsgOk = function () {
      this._equipWindow.activate();
      this._msgWindow.hide();
      this._msgWindow.deactivate();
    };
    Scene_Shop2.prototype.updateCancel = function () {
      if (this._confirmWindow.active || this._confirmWindow2.active) {
        return;
      }
      if (this._msgWindow.active) {
        return;
      }
      if (Input.isTriggered("cancel") || TouchInput.rightButton) {
        SoundManager.playCancel();
        this.popScene();
      }
    };
    Scene_Shop2.prototype.goldWindowRect = function () {
      var ww = this.mainCommandWidth();
      var wh = this.calcWindowHeight(1, true);
      var wx = 20;
      var wy = 60;
      return new Rectangle(wx, wy, ww, wh);
    };
    Scene_Shop2.prototype.createTreasureWindows = function () {
      _super.prototype.createTreasureWindows.call(this);
      this._treasureWindow1.setDrawPrice();
      this._treasureWindow2.setDrawPrice();
      this._treasureWindow3.setDrawPrice();
      this._treasureWindow4.setDrawPrice();
      if (shopType == ShopType.item) {
        for (var i = 0; i < 4; i++) {
          var item = $gameSystem.shopItemsItem()[i];
          if (!item || item.isSoldOut()) {
            var window_1 = this.getTreasureWindow(i);
            window_1.setSoldOut();
          }
        }
      } else {
        for (var i = 0; i < 4; i++) {
          var item = $gameSystem.shopItemsEquip()[i];
          if (!item || item.isSoldOut()) {
            var window_2 = this.getTreasureWindow(i);
            window_2.setSoldOut();
          }
        }
      }
    };
    Scene_Shop2.prototype.createLabel = function () {
      this._labelWindow = new Nore.Window_Label2(
        TextManager.shopText,
        280,
        60,
        900
      );
      this.addChild(this._labelWindow);
      if (shopType == ShopType.equip) {
        this._labelWindow2 = new Nore.Window_Label2(
          TextManager.obtainTreasure2,
          280,
          114 + 10,
          900
        );
        this.addChild(this._labelWindow2);
      }
    };
    Scene_Shop2.prototype.selectTreasure = function () {
      this._equipList = [];
      if (shopType == ShopType.item) {
        for (
          var _i = 0, _a = $gameSystem.shopItemsItem();
          _i < _a.length;
          _i++
        ) {
          var shopItem = _a[_i];
          var item = shopItem.item();
          var equip = null;
          if (DataManager.isArmor(item)) {
            equip = new Armor(item);
          } else if (DataManager.isWeapon(item)) {
            equip = new Weapon(item);
          } else {
            equip = new UsableItem(item);
          }
          this._equipList.push(equip);
        }
      } else {
        for (
          var _b = 0, _c = $gameSystem.shopItemsEquip();
          _b < _c.length;
          _b++
        ) {
          var shopItem = _c[_b];
          var item = shopItem.item();
          var equip = null;
          if (DataManager.isArmor(item)) {
            equip = new Armor(item, false, shopItem.enchantList());
          } else if (DataManager.isWeapon(item)) {
            equip = new Weapon(item, false, shopItem.enchantList());
          } else {
            equip = new UsableItem(item);
          }
          this._equipList.push(equip);
        }
      }
    };
    Scene_Shop2.prototype.onOk = function () {
      var window = this.getTreasureWindow(this._selectedIndex);
      if (window.isSoldOut()) {
        SoundManager.playBuzzer();
        this._equipWindow.activate();
        return;
      }
      if (shopType == ShopType.item) {
        this.onOkItem();
      } else {
        this.onOkEquip();
      }
    };
    Scene_Shop2.prototype.onOkItem = function () {
      SoundManager.playOk();
      var current = this._equipList[this._selectedIndex];
      if (!this.canBuy(current)) {
        this._msgWindow.setText(TextManager.shopCantGet);
        this._msgWindow.activate();
        this._msgWindow.show();
        this._equipWindow.deactivate();
        return;
      }
      if ($gameParty.isMaxBattleItem() && !current.meta()["expBox"]) {
        this._confirmWindow.setText(TextManager.shopMaxItems);
        /*
                this._msgWindow.activate();
                this._msgWindow.show();
                this._equipWindow.deactivate();
    */
        //return;
      } else {
        this._confirmWindow.setText(TextManager.confirmBuy);
      }
      this._confirmWindow.show();
      this._confirmWindow.activate();
    };
    Scene_Shop2.prototype.onOkEquip = function () {
      var actor = this._characterWindow.currentActor();
      var current = this._equipList[this._selectedIndex];
      SoundManager.playOk();
      //if (actor.canEquip(current.item())) {
      if (!this.canBuy(current)) {
        this._msgWindow.setText(TextManager.shopCantGet);
        this._msgWindow.activate();
        this._msgWindow.show();
        return;
      }
      if (actor.canEquipLv(current.item())) {
        this._confirmWindow.setText(TextManager.confirmBuy);
      } else {
        this._confirmWindow.setText(TextManager.confirmBuyCantEquipLv);
      }
      /*} else {
                SoundManager.playBuzzer();
                this._equipWindow.activate();
    
      
                return;
            }*/
      this._confirmWindow.show();
      this._confirmWindow.activate();
    };
    Scene_Shop2.prototype.canBuy = function (current) {
      return Nore.calcPrice(current) <= $gameParty.gold();
    };
    Scene_Shop2.prototype.onConfirmOk = function () {
      SoundManager.playShop();
      var current = this._equipList[this._selectedIndex];
      _super.prototype.onConfirmOk.call(this);
      $gameParty.loseGold(Nore.calcPrice(current));
      this.onBuy();
      this._goldWindow.refresh();
      if ($gameParty.isBattleItemOver()) {
        this.popScene();
      }
    };
    Scene_Shop2.prototype.afterOk = function () {
      // なにもしない
    };
    Scene_Shop2.prototype.onConfirmOk2 = function () {
      var actor = this._characterWindow.currentActor();
      var current = this._equipList[this._selectedIndex];
      SoundManager.playEquip();
      if (shopType == ShopType.item) {
      } else {
        var equip = current;
        $gameParty.gainItem(equip, 1, false);
        if (current.isWeapon()) {
          actor.changeEquip(0, equip);
        } else {
          var slot = actor.equipSlots().indexOf(equip.etypeId());
          actor.changeEquip(slot, equip);
        }
      }
      this._confirmWindow2.hide();
      this._confirmWindow2.deactivate();
    };
    Scene_Shop2.prototype.onConfirmCancel2 = function () {
      var current = this._equipList[this._selectedIndex];
      var equip = current;
      $gameParty.gainItem(equip, 1, false);
      this._confirmWindow2.hide();
      this._confirmWindow2.deactivate();
    };
    Scene_Shop2.prototype.onBuy = function () {
      var window = this.getTreasureWindow(this._selectedIndex);
      if (shopType == ShopType.item) {
        var current = this._equipList[this._selectedIndex];
        var item = current;
        if (item.meta()["expBox"]) {
          var exp = $gameSystem.calcCursedArmorExp();
          //const exp = Math.trunc(item.meta()['expBox']);
          $gameParty.gainExp(exp);
          $gameSystem.plusExpBox();
          window.refresh();
        } else {
          window.setSoldOut();
          $gameParty.gainBattleItem(item.item());
          $gameSystem.shopItemsItem()[this._selectedIndex].soldOut();
        }
      } else {
        window.setSoldOut();
        $gameSystem.shopItemsEquip()[this._selectedIndex].soldOut();
      }
      if (this._treasureWindow1 != window) {
        this._treasureWindow1.refresh();
      }
      if (this._treasureWindow2 != window) {
        this._treasureWindow2.refresh();
      }
      if (this._treasureWindow3 != window) {
        this._treasureWindow3.refresh();
      }
      if (this._treasureWindow4 != window) {
        this._treasureWindow4.refresh();
      }
    };
    return Scene_Shop2;
  })(Nore.Scene_Treasure);
  Nore.Scene_Shop2 = Scene_Shop2;
})(Nore || (Nore = {}));
var ITEM_TYPE;
(function (ITEM_TYPE) {
  ITEM_TYPE[(ITEM_TYPE["item"] = 1)] = "item";
  ITEM_TYPE[(ITEM_TYPE["armor"] = 2)] = "armor";
  ITEM_TYPE[(ITEM_TYPE["weapon"] = 3)] = "weapon";
})(ITEM_TYPE || (ITEM_TYPE = {}));
var ShopItem = /** @class */ (function () {
  function ShopItem(type, id, enchantList) {
    this._type = type;
    this._id = id;
    this._enchantList = enchantList;
  }
  ShopItem.prototype.item = function () {
    switch (this._type) {
      case ITEM_TYPE.item:
        return $dataItems[this._id];
      case ITEM_TYPE.armor:
        return $dataArmors[this._id];
      case ITEM_TYPE.weapon:
        return $dataWeapons[this._id];
    }
  };
  ShopItem.prototype.price = function () {
    return 40;
  };
  ShopItem.prototype.soldOut = function () {
    this._soldOut = true;
  };
  ShopItem.prototype.isSoldOut = function () {
    return this._soldOut;
  };
  ShopItem.prototype.enchantList = function () {
    return this._enchantList;
  };
  return ShopItem;
})();
