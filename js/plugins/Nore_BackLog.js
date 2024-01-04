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
//=============================================================================
// Nore_BackLog.js
//=============================================================================
/*:ja
 * @plugindesc バックログを表示するプラグインです。
 *
 *
 * @param backLogButton
 * @desc バックログを表示するボタンです
 * @default pageup
 *
 * @param marginLeft
 * @desc 本文の左のスペースです。変更した場合、改行位置がずれる場合があります。
 * @default 70
 *
 * @param marginRight
 * @desc 本文の右のスペースです。変更した場合、改行位置がずれる場合があります。
 * @default 30
 *
 * @param nameLeft
 * @desc 名前の左のスペースです。
 * @default 20
 *
 * @param fontSize
 * @desc フォントサイズです。変更した場合、改行位置がずれる場合があります。
 * @default 24
 *
 * @param scrollSpeed
 * @desc カーソルキーでスクロールするときの速度です
 * @default 5
 *
 * @param windowHeight
 * @desc ウィンドウの高さです。大きいほど多く表示できます。
 * @default 2000
 *
 * @param maxLogCount
 * @desc ログを保存しておく最大数です
 * @default 50
 *
 * @param bottmMargin
 * @desc バックログウィンドウの下の空き空間です
 * @default 50
 *
 * @param logMargin
 * @desc ログとログの間の隙間です
 * @default 34
 *
 * @param windowSkin
 * @desc バックログ表示に使うウィンドウです
 * @default WindowBacklog
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param backOpacity
 * @desc 背景の透明度です
 * @default 230
 *
 *
 * @help
 * Ver
 *
 * テキストのバックログを表示するプラグインです。
 * 立ち絵スクリプトとの併用を想定しています。
 * 併用しない場合、独自に
 * $gameBackLog.addLog(name, message);
 * を呼ぶ必要があります。
 *
 */
var Game_BackLog = /** @class */ (function () {
  function Game_BackLog() {
    this.logList = [];
  }
  Game_BackLog.prototype.addLog = function (name, message) {
    message = message.replace("V[20]", $gameVariables.value(20) + "");
    message = message.replace("V[21]", $gameVariables.value(21) + "");
    message = message.replace("V[22]", $gameVariables.value(22) + "");
    message = message.replace("V[23]", $gameVariables.value(23) + "");
    message = message.replace("V[24]", $gameVariables.value(24) + "");
    this.logList.push(new Game_TalkLog(name, message));
    if (this.logList.length >= 50) {
      this.logList.shift();
    }
  };
  return Game_BackLog;
})();
var Game_TalkLog = /** @class */ (function () {
  function Game_TalkLog(name, message) {
    this.name = name;
    this.message = message;
  }
  return Game_TalkLog;
})();
var Nore;
(function (Nore) {
  var BackLog;
  (function (BackLog) {
    var parameters = PluginManager.parameters("Nore_BackLog");
    BackLog.backLogButton = parameters["backLogButton"];
    var scrollSpeed = parseInt(parameters["scrollSpeed"]);
    var bottmMargin = parseInt(parameters["bottmMargin"]);
    var windowHeight = parseInt(parameters["windowHeight"]);
    var fontSize = parseInt(parameters["fontSize"]);
    var logMargin = parseInt(parameters["logMargin"]);
    var marginLeft = parseInt(parameters["marginLeft"]);
    var marginRight = parseInt(parameters["marginRight"]);
    var nameLeft = parseInt(parameters["nameLeft"]);
    var backOpacity = parseInt(parameters["backOpacity"]);
    /**
     * バックログを表示するウィンドウクラスです。
     */
    var Window_BackLog = /** @class */ (function (_super) {
      __extends(Window_BackLog, _super);
      function Window_BackLog() {
        var _this =
          _super.call(
            this,
            new Rectangle(0, 0, Graphics.width, windowHeight)
          ) || this;
        _this._margin = 0;
        _this.frameVisible = false;
        _this.backOpacity = backOpacity;
        _this.opacity = 255;
        _this.contentsOpacity = 255;
        _this._refreshBack();
        _this.drawLogs();
        return _this;
      }
      Window_BackLog.prototype.drawLogs = function () {
        var y = 0;
        for (
          var _i = 0, _a = BackLog.$gameBackLog.logList;
          _i < _a.length;
          _i++
        ) {
          var log = _a[_i];
          y += this.drawLog(log, y);
          y += this.logMargin();
        }
        if (y > windowHeight) {
          this._maxHeight = windowHeight;
          // 一回目の描画ではみだしていたら、はみ出す部分をけずって歳描画
          var diff = y - windowHeight + bottmMargin;
          while (true) {
            if (BackLog.$gameBackLog.logList.length === 0) {
              break;
            }
            var log = BackLog.$gameBackLog.logList.shift();
            if (diff < log.y) {
              break;
            }
          }
          this.contents.clear();
          y = 0;
          for (
            var _b = 0, _c = BackLog.$gameBackLog.logList;
            _b < _c.length;
            _b++
          ) {
            var log = _c[_b];
            y += this.drawLog(log, y);
            y += this.logMargin();
          }
          this._maxHeight = y + bottmMargin;
          if (this._maxHeight > windowHeight) {
            this._maxHeight = windowHeight;
          }
          // 一番下までスクロールさせる
          this.y = Graphics.height - this._maxHeight;
        } else {
          this._maxHeight = y + bottmMargin;
          if (this._maxHeight > windowHeight) {
            this._maxHeight = windowHeight;
          }
          if (this._maxHeight < Graphics.height) {
            this._maxHeight = Graphics.height;
          }
          this.y = Graphics.height - this._maxHeight;
        }
      };
      /**
       * ログをひとつ描画します
       * @param  {Game_TalkLog} log 描画するログ
       * @param  {number}       y   描画する y 座標
       * @return {number}           描画した高さ
       */
      Window_BackLog.prototype.drawLog = function (log, y) {
        this._lineCount = 1;
        var message = log.message;
        var height = 0;
        if (log.name) {
          this.drawTextEx(log.name, nameLeft, y);
          if (message.charAt(message.length - 1) === "。") {
            message = message.substring(0, message.length - 1);
          }
          message = message + "」";
          y += this.standardFontSize() + 8;
          height = this.standardFontSize() + 8;
          this.drawTextEx("「", marginLeft - this.standardFontSize(), y);
        }
        this.drawTextEx(message, marginLeft, y);
        height += this._lineCount * (this.standardFontSize() + 8);
        log.y = y + height;
        return height;
      };
      Window_BackLog.prototype.processNewLine = function (textState) {
        this._lineCount++;
        _super.prototype.processNewLine.call(this, textState);
      };
      Window_BackLog.prototype.logMargin = function () {
        return logMargin;
      };
      Window_BackLog.prototype.textAreaWidth = function () {
        return this.contentsWidth() - marginRight;
      };
      Window_BackLog.prototype.update = function () {
        _super.prototype.update.call(this);
        if (Input.isPressed("down")) {
          this.y -= scrollSpeed;
          if (this.y < Graphics.height - this._maxHeight) {
            this.y = Graphics.height - this._maxHeight;
          }
        } else if (Input.isPressed("up")) {
          this.y += scrollSpeed;
          if (this.y > 0) {
            this.y = 0;
          }
        }
        if (TouchInput.wheelY > 0) {
          this.y -= scrollSpeed * 4;
          if (this.y < Graphics.height - this._maxHeight) {
            this.y = Graphics.height - this._maxHeight;
          }
        } else if (TouchInput.wheelY < 0) {
          this.y += scrollSpeed * 4;
          if (this.y > 0) {
            this.y = 0;
          }
        }
      };
      Window_BackLog.prototype.standardFontSize = function () {
        return fontSize;
      };
      Window_BackLog.prototype.backPaintOpacity = function () {
        return 128;
      };
      return Window_BackLog;
    })(Window_Base);
    BackLog.Window_BackLog = Window_BackLog;
    var _Scene_Message_update = Scene_Message.prototype.update;
    Scene_Message.prototype.update = function () {
      if (this._windowBackLog) {
        this._windowBackLog.update();
        if (
          Input.isTriggered(BackLog.backLogButton) ||
          Input.isTriggered("cancel") ||
          Input.isTriggered("ok") ||
          TouchInput.isTriggered()
        ) {
          this.removeChild(this._windowBackLog);
          this._windowBackLog = null;
          SoundManager.playCancel();
          TouchInput.clear();
          Input.clear();
        }
        return;
      }
      _Scene_Message_update.call(this);
      this.updateBackLog();
    };
    Scene_Message.prototype.updateBackLog = function () {
      if (this._backlogDisabled) {
        return;
      }
      if (Input.isTriggered(BackLog.backLogButton) || TouchInput.wheelY < 0) {
        this._windowBackLog = new Window_BackLog();
        SoundManager.playOk();
        this.addChild(this._windowBackLog);
      }
    };
    var _Scene_Message_updateMain = Scene_Map.prototype.updateMain;
    Scene_Map.prototype.updateMain = function () {
      if (this._windowBackLog) {
        return;
      }
      _Scene_Message_updateMain.call(this);
    };
    var _DataManager_extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function (contents) {
      _DataManager_extractSaveContents.call(this, contents);
      BackLog.$gameBackLog = contents.backlog || new Game_BackLog();
    };
    var _DataManager_makeSaveContents = DataManager.makeSaveContents;
    DataManager.makeSaveContents = function () {
      var contents = _DataManager_makeSaveContents.call(this);
      contents.backlog = BackLog.$gameBackLog;
      return contents;
    };
    BackLog.$gameBackLog = new Game_BackLog();
  })((BackLog = Nore.BackLog || (Nore.BackLog = {})));
})(Nore || (Nore = {}));
