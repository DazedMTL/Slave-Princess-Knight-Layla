var ATK_MINI_ICON = 386;
var DEF_MINI_ICON = 506;
var MAT_MINI_ICON = 413;
var MDF_MINI_ICON = 510;
Sprite_Clickable.prototype.drawIcon = function (iconIndex, x, y) {
  var bitmap = ImageManager.loadSystem("IconSet");
  var pw = ImageManager.iconWidth;
  var ph = ImageManager.iconHeight;
  var sx = (iconIndex % 16) * pw;
  var sy = Math.floor(iconIndex / 16) * ph;
  this.bitmap.blt(bitmap, sx, sy, pw, ph, x, y);
};
Sprite_Clickable.prototype.drawIconMini = function (iconIndex, x, y) {
  var bitmap = ImageManager.loadSystem("IconSetMini");
  var pw = 24;
  var ph = 24;
  var sx = (iconIndex % 16) * pw;
  var sy = Math.floor(iconIndex / 16) * ph;
  this.bitmap.blt(bitmap, sx, sy, pw, ph, x, y);
};
Window_Base.prototype.drawIconMini = function (iconIndex, x, y) {
  var bitmap = ImageManager.loadSystem("IconSetMini");
  var pw = 24;
  var ph = 24;
  var sx = (iconIndex % 16) * pw;
  var sy = Math.floor(iconIndex / 16) * ph;
  this.contents.blt(bitmap, sx, sy, pw, ph, x, y);
};
Window_Base.prototype.drawMiniNum = function (equip, x, y) {
  var minuNum = equip.getMiniNum();
  if (!minuNum) {
    return;
  }
  var iconIndex1 = this.iconNumOfType(minuNum.type());
  var iconIndex2 = this.numOfType(minuNum.value());
  this.drawIcon(iconIndex1, x, y);
  var offset = 32;
  if (minuNum.percent()) {
    offset += 16;
  }
  this.drawIcon(iconIndex2 + offset, x, y);
  //this.drawIcon(this.numOfType(minuNum.value(), x, y));
  //this.drawText(minuNum.type() + 10, x, y + 6, 20, 'right')
  //const sx = (iconIndex % 16) * pw;
  //const sy = Math.floor(iconIndex / 16) * ph;
  //this.contents.blt(bitmap, sx, sy, pw, ph, x, y);
};
Window_Base.prototype.iconNumOfType = function (type) {
  switch (type) {
    case MinuNumType.HP:
      return 2800;
    case MinuNumType.MP:
      return 2801;
    case MinuNumType.ATK:
      return 2802;
    case MinuNumType.DEF:
      return 2803;
    case MinuNumType.MAT:
      return 2804;
    case MinuNumType.MDF:
      return 2805;
    case MinuNumType.SH:
      return 2806;
    case MinuNumType.SD:
      return 2807;
    case MinuNumType.EXP:
      return 2808;
    case MinuNumType.GOLD:
      return 2809;
    case MinuNumType.FB:
      return 2810;
    case MinuNumType.CRY:
      return 2811;
  }
  console.error("不正なタイプです:" + type);
};
Window_Base.prototype.numOfType = function (num) {
  switch (num) {
    case 1:
      return 2784;
    case 2:
      return 2785;
    case 3:
      return 2786;
    case 4:
      return 2787;
    case 5:
      return 2788;
    case 6:
      return 2789;
    case 7:
      return 2790;
    case 8:
      return 2791;
    case 9:
      return 2792;
    case 10:
      return 2794;
  }
  console.error("不正な数値です:" + num);
};
