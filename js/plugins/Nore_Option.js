var LANGUAGE_LIST = ["jp", "en"];
Scene_Options.prototype.optionsWindowRect = function () {
  var n = Math.min(this.maxCommands(), this.maxVisibleCommands());
  var ww = 500;
  var wh = this.calcWindowHeight(n, true);
  var wx = (Graphics.boxWidth - ww) / 2;
  var wy = (Graphics.boxHeight - wh) / 2;
  return new Rectangle(wx, wy, ww, wh);
};
Window_Options.prototype.volumeOffset = function () {
  return 5;
};
ConfigManager.confirmEnter = true;
ConfigManager.showSikyu = true;
ConfigManager.windowAlpha = 85;
Window_Options.prototype.addGeneralOptions = function () {
  this.addCommand(TextManager._alwaysDash, "alwaysDash");
  this.addCommand(TextManager.showSikyu, "showSikyu");
  this.addCommand(TextManager.confirmEnter, "confirmEnter");
  //this.addCommand(TextManager.commandRemember, "commandRemember");
  this.addCommand(TextManager._touchUI, "touchUI");
  this.addCommand(TextManager.language, "language");
  this.addCommand(TextManager.windowAlpha, "windowAlpha");
};
Window_Options.prototype.addVolumeOptions = function () {
  this.addCommand(TextManager._bgmVolume, "bgmVolume");
  this.addCommand(TextManager._bgsVolume, "bgsVolume");
  this.addCommand(TextManager._meVolume, "meVolume");
  this.addCommand(TextManager._seVolume, "seVolume");
  this.addCommand(TextManager._voiceVolume, "voiceVolume");
};
Window_Options.prototype.isVolumeSymbol = function (symbol) {
  if (symbol.includes("Alpha")) {
    return true;
  }
  return symbol.includes("Volume");
};
var _ConfigManager_makeData = ConfigManager.makeData;
ConfigManager.makeData = function () {
  var config = _ConfigManager_makeData.call(this);
  config.voiceVolume = this.voiceVolume;
  config.language = this.language;
  config.showSikyu = this.showSikyu;
  config.confirmEnter = this.confirmEnter;
  config.windowAlpha = this.windowAlpha;
  return config;
};
var _ConfigManager_applyData = ConfigManager.applyData;
ConfigManager.applyData = function (config) {
  _ConfigManager_applyData.call(this, config);
  this.voiceVolume = this.readVolume(config, "voiceVolume");
  this.windowAlpha = this.readVolume(config, "windowAlpha");
  this.language = this.readLanguage(config, "language");
  this.showSikyu = this.readFlag(config, "showSikyu", true);
  this.confirmEnter = this.readFlag(config, "confirmEnter", true);
};
ConfigManager.readLanguage = function (config, name) {
  if (name in config) {
    return config[name];
  } else {
    return "jp";
  }
};
Object.defineProperty(ConfigManager, "voiceVolume", {
  get: function () {
    return AudioManager._voiceVolume;
  },
  set: function (value) {
    AudioManager._voiceVolume = value;
  },
  configurable: true,
});
Scene_Options.prototype.maxCommands = function () {
  // Increase this value when adding option items.
  return 11;
};
var _Scene_Options_prototype_createOptionsWindow =
  Scene_Options.prototype.createOptionsWindow;
Scene_Options.prototype.createOptionsWindow = function () {
  _Scene_Options_prototype_createOptionsWindow.call(this);
  this._optionsWindow.setHandler("language", this.onLanguage.bind(this));
};
Scene_Options.prototype.onLanguage = function () {
  switch (ConfigManager.language) {
    case "en":
      initVocabEn();
      break;
    case "jp":
      initVocabJp();
      break;
    case "ch":
      //initVocabCh();
      break;
  }
  this._optionsWindow.makeCommandList();
  this._optionsWindow.refresh();
};
Window_Options.prototype.changeValue = function (symbol, value) {
  var lastValue = this.getConfigValue(symbol);
  if (lastValue !== value) {
    this.setConfigValue(symbol, value);
    this.redrawItem(this.findSymbol(symbol));
    this.playCursorSound();
    if (symbol == "language") {
      ConfigManager.language = value;
      this.callHandler("language");
    }
  }
};
Window_Options.prototype.statusText = function (index) {
  var symbol = this.commandSymbol(index);
  var value = this.getConfigValue(symbol);
  if (this.isLanguageSymbol(symbol)) {
    return this.languageStatusText(value);
  } else if (this.isVolumeSymbol(symbol)) {
    return this.volumeStatusText(value);
  } else {
    return this.booleanStatusText(value);
  }
};
Window_Options.prototype.languageStatusText = function (value) {
  switch (value) {
    case "en":
      return "En(Partial)";
    case "jp":
      return "Japanese";
    case "ch":
      return "中国語";
  }
  return "";
};
Window_Options.prototype.isLanguageSymbol = function (symbol) {
  return symbol == "language";
};
Window_Options.prototype.cursorRight = function () {
  var index = this.index();
  var symbol = this.commandSymbol(index);
  if (this.isLanguageSymbol(symbol)) {
    this.changeLanguage(symbol, true);
  } else if (this.isVolumeSymbol(symbol)) {
    this.changeVolume(symbol, true, false);
  } else {
    this.changeValue(symbol, true);
  }
};
Window_Options.prototype.changeLanguage = function (symbol, forward) {
  var lastValue = this.getConfigValue(symbol);
  var index = LANGUAGE_LIST.indexOf(lastValue);
  if (forward) {
    index++;
  } else {
    index--;
  }
  if (index >= LANGUAGE_LIST.length) {
    this.changeValue(symbol, LANGUAGE_LIST[0]);
  } else if (index < 0) {
    this.changeValue(symbol, LANGUAGE_LIST[LANGUAGE_LIST.length - 1]);
  } else {
    this.changeValue(symbol, LANGUAGE_LIST[index]);
  }
};
Window_Options.prototype.processOk = function () {
  var index = this.index();
  var symbol = this.commandSymbol(index);
  if (this.isLanguageSymbol(symbol)) {
    this.changeLanguage(symbol, true);
  } else if (this.isVolumeSymbol(symbol)) {
    this.changeVolume(symbol, true, true);
  } else {
    this.changeValue(symbol, !this.getConfigValue(symbol));
  }
};
Window_Options.prototype.cursorLeft = function () {
  var index = this.index();
  var symbol = this.commandSymbol(index);
  if (this.isLanguageSymbol(symbol)) {
    this.changeLanguage(symbol, false);
  } else if (this.isVolumeSymbol(symbol)) {
    this.changeVolume(symbol, false, false);
  } else {
    this.changeValue(symbol, false);
  }
};
ConfigManager.language = "jp";
