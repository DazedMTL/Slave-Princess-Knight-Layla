ColorManager.passiveColor = function () {
  return ColorManager.textColor(17);
};
ColorManager.ougiColor = function () {
  return ColorManager.textColor(10);
};
ColorManager.stunBackColor = function () {
  return "#999";
};
ColorManager.disableColor = function () {
  return "#BBB";
};
ColorManager.stunGaugeColor = function () {
  return "#18EBF9";
};
ColorManager.stunGaugeForecastColor = function () {
  return "#0E8A93";
};
ColorManager.rareColor = function () {
  return ColorManager.textColor(22);
};
ColorManager.epicColor = function () {
  return ColorManager.textColor(30);
};
ColorManager.baseColor = function () {
  return ColorManager.textColor(20);
};
var _ColorManager_textColor = ColorManager.textColor;
ColorManager.textColor = function (colorIndex) {
  switch (colorIndex) {
    case 61:
      return "#FF4444"; //物理攻撃
    case 62:
      return "#8888FF"; //物理防御
  }
  return _ColorManager_textColor.call(this, colorIndex);
};
ColorManager.damageColor = function (colorType) {
  switch (colorType) {
    case 0: // HP damage
      return "#ffffff";
    case 1: // HP recover
      return "#b9ffb5";
    case 2: // MP damage
      return "#ffff90";
    case 3: // MP recover
      return "#80b0ff";
    case 4: // ActorDamage
      return "#ff0000";
    case 5: // ShieldDamage
      return "#990000";
    default:
      return "#808080";
  }
};
ColorManager.maleColor1 = function () {
  return "rgba(32, 32, 72, 0.5)";
};
ColorManager.maleColor2 = function () {
  return "rgba(0, 0, 32, 0.5)";
};
ColorManager.maleColor3 = function () {
  return "rgba(32, 32, 132, 1)";
};
ColorManager.femaleColor1 = function () {
  return "rgba(72, 32, 32, 0.5)";
};
ColorManager.femaleColor2 = function () {
  return "rgba(32, 0, 0, 0.5)";
};
ColorManager.femaleColor3 = function () {
  return "rgba(132, 32, 32, 1)";
};
