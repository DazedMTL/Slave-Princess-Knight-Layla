var Nore;
(function (Nore) {
  Scene_Title.prototype.commandWindowRect = function () {
    var offsetX = $dataSystem.titleCommandWindow.offsetX;
    var offsetY = $dataSystem.titleCommandWindow.offsetY;
    var ww = this.mainCommandWidth();
    var wh = this.calcWindowHeight(5, true);
    var wx = (Graphics.boxWidth - ww) / 2 + offsetX;
    var wy = Graphics.boxHeight - wh - 96 + offsetY;
    return new Rectangle(wx, wy, ww, wh);
  };
})(Nore || (Nore = {}));
