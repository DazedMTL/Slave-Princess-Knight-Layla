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
Scene_Battle.prototype.skillWindowRect = function () {
  var ww = 300;
  var wh = 340 + 40;
  var wx = 604;
  var wy = 132;
  return new Rectangle(wx, wy, ww, wh);
};
Scene_Battle.prototype.helpAreaHeight = function () {
  return this.calcWindowHeight(3, false);
};
Scene_Battle.prototype.helpWindowRect = function () {
  var wx = 120;
  var wy = this.helpAreaTop();
  var ww = Graphics.boxWidth - wx * 2;
  var wh = this.helpAreaHeight();
  return new Rectangle(wx, wy, ww, wh);
};
Window_BattleSkill.prototype.maxCols = function () {
  return 1;
};
var Window_BattleItem2 = /** @class */ (function (_super) {
  __extends(Window_BattleItem2, _super);
  function Window_BattleItem2() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  Window_BattleItem2.prototype.maxCols = function () {
    return 1;
  };
  Window_BattleItem2.prototype.makeItemList = function () {
    this._data = $gameParty.battleItems();
    if ($gameParty.hasItem($dataItems[17])) {
      this._data.push($dataItems[17]);
    }
  };
  Window_BattleItem2.prototype.isEnabled = function (item) {
    return true;
  };
  Window_BattleItem2.prototype.drawItem = function (index) {
    var item = this.itemAt(index);
    if (item) {
      var numberWidth = this.numberWidth();
      var rect = this.itemLineRect(index);
      this.changePaintOpacity(this.isEnabled(item));
      this.drawItemName(item, rect.x, rect.y, rect.width - numberWidth);
      //this.drawItemNumber(item, rect.x, rect.y, rect.width);
      this.changePaintOpacity(1);
    }
  };
  return Window_BattleItem2;
})(Window_BattleItem);
var IconId;
(function (IconId) {
  IconId[(IconId["double"] = 2896)] = "double";
  IconId[(IconId["line"] = 2897)] = "line";
  IconId[(IconId["all"] = 2898)] = "all";
})(IconId || (IconId = {}));
Window_Base.prototype.drawItemName = function (item, x, y, width) {
  if (!item) {
    return;
  }
  var equip = null;
  if (item instanceof Equip) {
    equip = item;
  }
  var iconY = y + (this.lineHeight() - ImageManager.iconHeight) / 2;
  var textMargin = ImageManager.iconWidth + 4;
  var itemWidth = Math.max(0, width - textMargin);
  this.resetTextColor();
  var iconIndex;
  var name;
  if (equip) {
    var lv = equip.lv();
    if (lv == 2) {
      this.drawIcon(2245, x, iconY);
    }
    if (lv == 3) {
      this.drawIcon(2246, x, iconY);
    }
    iconIndex = equip.iconIndex();
    name = equip.name();
  } else {
    iconIndex = item.iconIndex;
    name = getItemName(item);
  }
  var lastOpacity = this.contents.paintOpacity;
  if (equip) {
    this.changePaintOpacity(false);
  }
  this.drawIcon(iconIndex, x, iconY);
  var iconXOffset = 2;
  var iconYOffset = -5;
  if (item.meta["line"]) {
    this.drawIcon(IconId.line, x + iconXOffset, iconY + iconYOffset);
  } else if (item.scope == 8 || item.scope == 2) {
    this.drawIcon(IconId.all, x + iconXOffset, iconY + iconYOffset);
  } else if (item.repeats == 2) {
    this.drawIcon(IconId.double, x + iconXOffset, iconY + iconYOffset);
  }
  this.contents.paintOpacity = lastOpacity;
  if (!equip) {
    if ($skillManager.isPassive(item)) {
      this.changeTextColor(ColorManager.passiveColor());
      //this.drawText('☆', x + textMargin, y, itemWidth);
      //x += 28;
      //name = name.substring(1);
    } else if ($skillManager.isOugi(item)) {
      this.changeTextColor(ColorManager.ougiColor());
      //this.drawText('★', x + textMargin, y, itemWidth);
      //x += 28;
      //name = name.substring(1);
    } else {
      this.resetTextColor();
    }
  }
  if (equip) {
    this.drawEquipLv(equip, x, y);
  }
  this.drawText(name, x + textMargin, y, itemWidth);
};
Window_Base.prototype.drawEquipLv = function (equip, x, y) {
  if (equip.lv() == 0) {
    this.drawMiniNum(equip, x, y);
  } else {
    var level = equip.lv();
    this.drawIcon(2880 + level - 1, x, y);
  }
};
