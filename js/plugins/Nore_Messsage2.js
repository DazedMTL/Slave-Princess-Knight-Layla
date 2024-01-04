function Window_Message2() {
  this.initialize.apply(this, arguments);
}
Window_Message2.prototype = Object.create(Window_Scrollable.prototype);
Window_Message2.prototype.constructor = Window_Message2;
Window_Message2.prototype.initialize = function (rect) {
  Window_Base.prototype.initialize.call(this, rect);
  this.openness = 0;
  this.initMembers();
};
var Window_Message_prototype_startMessage =
  Window_Message.prototype.startMessage;
Window_Message.prototype.startMessage = function () {
  if (Nore.BackLog) {
    Nore.BackLog.$gameBackLog.addLog(
      $gameMessage.speakerName(),
      $gameMessage.allText()
    );
  }
  Window_Message_prototype_startMessage.call(this);
};
Window_Message2.prototype.initMembers = function () {
  this._background = 0;
  this._positionType = 2;
  this._waitCount = 0;
  this._faceBitmap = null;
  this._textState = null;
  this._goldWindow = null;
  this._nameBoxWindow = null;
  this._choiceListWindow = null;
  this._numberInputWindow = null;
  this._eventItemWindow = null;
  this.clearFlags();
};
Window_Message2.prototype.setGoldWindow = function (goldWindow) {
  this._goldWindow = goldWindow;
};
Window_Message2.prototype.setNameBoxWindow = function (nameBoxWindow) {
  this._nameBoxWindow = nameBoxWindow;
};
Window_Message2.prototype.setChoiceListWindow = function (choiceListWindow) {
  this._choiceListWindow = choiceListWindow;
};
Window_Message2.prototype.setNumberInputWindow = function (numberInputWindow) {
  this._numberInputWindow = numberInputWindow;
};
Window_Message2.prototype.setEventItemWindow = function (eventItemWindow) {
  this._eventItemWindow = eventItemWindow;
};
Window_Message2.prototype.clearFlags = function () {
  this._showFast = false;
  this._lineShowFast = false;
  this._pauseSkip = false;
};
Window_Message2.prototype.update = function () {
  this.checkToNotClose();
  Window_Scrollable.prototype.update.call(this);
  this.synchronizeNameBox();
  while (!this.isOpening() && !this.isClosing()) {
    if (this.updateWait()) {
      return;
    } else if (this.updateLoading()) {
      return;
    } else if (this.updateInput()) {
      return;
    } else if (this.updateMessage()) {
      return;
    } else if (this.canStart()) {
      this.startMessage();
    } else {
      this.startInput();
      return;
    }
  }
};
var Window_Message_prototype_update = Window_Message.prototype.update;
Window_Message.prototype.update = function () {
  Window_Message_prototype_update.call(this);
  this.updateWidth();
};
Window_Message.prototype.updateWidth = function () {
  if ($gameSwitches.value(2)) {
    this.width = 672;
    this.x = 0;
  } else {
    this.width = 872;
    this.x = 200;
  }
};
Window_Message2.prototype.checkToNotClose = function () {
  if (this.isOpen() && this.isClosing() && this.doesContinue()) {
    this.open();
  }
};
Window_Message2.prototype.synchronizeNameBox = function () {
  this._nameBoxWindow.openness = this.openness;
};
Window_Message2.prototype.canStart = function () {
  return $gameMessage.hasText() && !$gameMessage.scrollMode();
};
Window_Message2.prototype.startMessage = function () {
  var text = $gameMessage.allText();
  var textState = this.createTextState(text, 0, 0, 0);
  textState.x = this.newLineX(textState);
  textState.startX = textState.x;
  this._textState = textState;
  this.newPage(this._textState);
  this.updatePlacement();
  this.updateBackground();
  this.open();
  this._nameBoxWindow.start();
};
Window_Message2.prototype.newLineX = function (textState) {
  var faceExists = $gameMessage.faceName() !== "";
  var faceWidth = ImageManager.faceWidth;
  var spacing = 20;
  var margin = faceExists ? faceWidth + spacing : 4;
  return textState.rtl ? this.innerWidth - margin : margin;
};
Window_Message2.prototype.updatePlacement = function () {
  var goldWindow = this._goldWindow;
  this._positionType = $gameMessage.positionType();
  this.y = (this._positionType * (Graphics.boxHeight - this.height)) / 2;
  if (goldWindow) {
    goldWindow.y = this.y > 0 ? 0 : Graphics.boxHeight - goldWindow.height;
  }
};
Window_Message2.prototype.updateBackground = function () {
  this._background = $gameMessage.background();
  this.setBackgroundType(this._background);
};
Window_Message2.prototype.terminateMessage = function () {
  if (!$gameSwitches.value(104)) {
    this.close();
  }
  this._goldWindow.close();
  $gameMessage.clear();
};
Window_Message2.prototype.updateWait = function () {
  if (this._waitCount > 0) {
    this._waitCount--;
    return true;
  } else {
    return false;
  }
};
Window_Message2.prototype.updateLoading = function () {
  if (this._faceBitmap) {
    if (this._faceBitmap.isReady()) {
      this.drawMessageFace();
      this._faceBitmap = null;
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
};
Window_Message2.prototype.updateInput = function () {
  if (this.isAnySubWindowActive()) {
    return true;
  }
  if (this.pause) {
    if (this.isTriggered()) {
      Input.update();
      this.pause = false;
      if (!this._textState) {
        this.terminateMessage();
      }
    }
    return true;
  }
  return false;
};
Window_Message2.prototype.isAnySubWindowActive = function () {
  return (
    this._choiceListWindow.active ||
    this._numberInputWindow.active ||
    this._eventItemWindow.active
  );
};
Window_Message2.prototype.updateMessage = function () {
  var textState = this._textState;
  if (textState) {
    while (!this.isEndOfText(textState)) {
      if (this.needsNewPage(textState)) {
        this.newPage(textState);
      }
      this.updateShowFast();
      this.processCharacter(textState);
      if (this.shouldBreakHere(textState)) {
        break;
      }
    }
    this.flushTextState(textState);
    if (this.isEndOfText(textState) && !this.pause) {
      this.onEndOfText();
    }
    return true;
  } else {
    return false;
  }
};
Window_Message2.prototype.shouldBreakHere = function (textState) {
  if (this.canBreakHere(textState)) {
    if (!this._showFast && !this._lineShowFast) {
      return true;
    }
    if (this.pause || this._waitCount > 0) {
      return true;
    }
  }
  return false;
};
Window_Message2.prototype.canBreakHere = function (textState) {
  if (!this.isEndOfText(textState)) {
    var c = textState.text[textState.index];
    if (c.charCodeAt(0) >= 0xdc00 && c.charCodeAt(0) <= 0xdfff) {
      // surrogate pair
      return false;
    }
    if (textState.rtl && c.charCodeAt(0) > 0x20) {
      return false;
    }
  }
  return true;
};
Window_Message2.prototype.onEndOfText = function () {
  if (!this.startInput()) {
    if (!this._pauseSkip) {
      this.startPause();
    } else {
      this.terminateMessage();
    }
  }
  this._textState = null;
};
Window_Message2.prototype.startInput = function () {
  if ($gameMessage.isChoice()) {
    this._choiceListWindow.start();
    return true;
  } else if ($gameMessage.isNumberInput()) {
    this._numberInputWindow.start();
    return true;
  } else if ($gameMessage.isItemChoice()) {
    this._eventItemWindow.start();
    return true;
  } else {
    return false;
  }
};
Window_Message2.prototype.isTriggered = function () {
  return (
    Input.isRepeated("ok") ||
    Input.isRepeated("cancel") ||
    TouchInput.isRepeated()
  );
};
Window_Message2.prototype.doesContinue = function () {
  return (
    $gameMessage.hasText() &&
    !$gameMessage.scrollMode() &&
    !this.areSettingsChanged()
  );
};
Window_Message2.prototype.areSettingsChanged = function () {
  return (
    this._background !== $gameMessage.background() ||
    this._positionType !== $gameMessage.positionType()
  );
};
Window_Message2.prototype.updateShowFast = function () {
  if (this.isTriggered()) {
    this._showFast = true;
  }
};
Window_Message2.prototype.newPage = function (textState) {
  this.contents.clear();
  this.resetFontSettings();
  this.clearFlags();
  this.updateSpeakerName();
  this.loadMessageFace();
  textState.x = textState.startX;
  textState.y = 0;
  textState.height = this.calcTextHeight(textState);
};
Window_Message2.prototype.updateSpeakerName = function () {
  this._nameBoxWindow.setName($gameMessage.speakerName());
};
Window_Message2.prototype.loadMessageFace = function () {
  this._faceBitmap = ImageManager.loadFace($gameMessage.faceName());
};
Window_Message2.prototype.drawMessageFace = function () {
  var faceName = $gameMessage.faceName();
  var faceIndex = $gameMessage.faceIndex();
  var rtl = $gameMessage.isRTL();
  var width = ImageManager.faceWidth;
  var height = this.innerHeight;
  var x = rtl ? this.innerWidth - width - 4 : 4;
  this.drawFace(faceName, faceIndex, x, 0, width, height);
};
Window_Message2.prototype.processControlCharacter = function (textState, c) {
  Window_Base.prototype.processControlCharacter.call(this, textState, c);
  if (c === "\f") {
    this.processNewPage(textState);
  }
};
Window_Message2.prototype.processNewLine = function (textState) {
  this._lineShowFast = false;
  Window_Base.prototype.processNewLine.call(this, textState);
  if (this.needsNewPage(textState)) {
    this.startPause();
  }
};
Window_Message2.prototype.processNewPage = function (textState) {
  if (textState.text[textState.index] === "\n") {
    textState.index++;
  }
  textState.y = this.contents.height;
  this.startPause();
};
Window_Message2.prototype.isEndOfText = function (textState) {
  return textState.index >= textState.text.length;
};
Window_Message2.prototype.needsNewPage = function (textState) {
  return (
    !this.isEndOfText(textState) &&
    textState.y + textState.height > this.contents.height
  );
};
Window_Message2.prototype.processEscapeCharacter = function (code, textState) {
  switch (code) {
    case "$":
      this._goldWindow.open();
      break;
    case ".":
      this.startWait(15);
      break;
    case "|":
      this.startWait(60);
      break;
    case "!":
      this.startPause();
      break;
    case ">":
      this._lineShowFast = true;
      break;
    case "<":
      this._lineShowFast = false;
      break;
    case "^":
      this._pauseSkip = true;
      break;
    default:
      Window_Base.prototype.processEscapeCharacter.call(this, code, textState);
      break;
  }
};
Window_Message2.prototype.startWait = function (count) {
  this._waitCount = count;
};
Window_Message2.prototype.startPause = function () {
  this.startWait(10);
  this.pause = true;
};
