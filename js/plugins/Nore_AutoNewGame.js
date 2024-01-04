//=============================================================================
// Nore_AutoNewGame.js
//=============================================================================
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//=============================================================================
/*:ja
 * @target MZ
 * @plugindesc F6を押した時、自動で NewGame またはゲームロードを行います
 * @author ル
 * @url https://ci-en.dlsite.com/creator/276
 *
 * @param reloadKey
 * @desc 自動で NewGame またはゲームロードを行う時に使用するボタンです
 * @type select
 * @option F4 キー
 * @value 115
 * @option F6 キー
 * @value 117
 * @option F7 キー
 * @value 118
 * @option F9 キー
 * @value 120
 * @option F10 キー
 * @value 121
 * @option F11 キー
 * @value 122
 * @default 117
 *
 * @param showDevTools
 * @desc テストプレイ時、自動で開発ツールを開きます
 * @type boolean
 * @default false
 *
 * @param autoConvert
 * @desc 自動で Nore_TES のシナリオ変換を実行します
 * @type boolean
 * @default false
 *
 * @help
 * Ver 0.2.0
 *
 * New Game を選択した後に F6 を押すと、自動で New Game を開始します。
 *
 * Continue を選択した後に F6 を押すと、自動で最後にロードされたファイルを
 * 読み込んでゲームを開始します。
 *
 * Save を選択した後に F6 を押すと、自動でそのファイル読み込んでゲームを
 * 開始します。
 *
 *
 * この機能を使った再読み込みと、F5による再読み込みは挙動がやや異なります。
 * この機能を使った再読み込みではメモリは解放されません。
 * ご注意ください。
 *
 *
 *
 * プラグインコマンドはありません。
 *
 * ・利用規約
 * 作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 * についても制限はありません。
 * このプラグインはもうあなたのものです。
 */
var Nore;
(function (Nore) {
  var AutoNewGame;
  (function (AutoNewGame) {
    var parameters = PluginManager.parameters("Nore_AutoNewGame");
    var OPEN_DEV_TOOLS = parameters["showDevTools"].toLowerCase() === "true";
    var AUTO_CONVERT = parameters["autoConvert"].toLowerCase() === "true";
    var RELOAD_KEY = parseInt(parameters["reloadKey"]);
    var _SceneManager_onKeyDown = SceneManager.onKeyDown;
    SceneManager.onKeyDown = function (event) {
      _SceneManager_onKeyDown.call(this, event);
      if (!event.ctrlKey && !event.altKey) {
        if (event.keyCode == RELOAD_KEY) {
          if (Utils.isNwjs()) {
            var win = require("nw.gui").Window.get();
            win.reload();
          }
        }
      }
    };
    var _Scene_Boot_prototype_create = Scene_Boot.prototype.create;
    Scene_Boot.prototype.create = function () {
      if (AUTO_CONVERT && Utils.isOptionValid("test")) {
        if (!Nore.Tes) {
          console.error(
            "Nore_AutoNewGame : autoConvert が ON になっていますが、Nore_Tes プラグインが見つかりません"
          );
        } else {
          Nore.Tes.loadScenarioFile = false;
        }
      }
      _Scene_Boot_prototype_create.call(this);
    };
    var _Scene_Boot_prototype_start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function () {
      var _this = this;
      _Scene_Boot_prototype_start.call(this);
      if (!Utils.isOptionValid("test")) {
        return;
      }
      if (AUTO_CONVERT) {
        if (!Nore.Tes) {
          console.error(
            "Nore_AutoNewGame : autoConvert が ON になっていますが、Nore_Tes プラグインが見つかりません"
          );
        } else {
          var converter = new Nore.Tes.Scenario_Converter();
          converter.convertAll();
        }
      }
      if (OPEN_DEV_TOOLS) {
        var win_1 = require("nw.gui").Window.get();
        win_1.showDevTools(null, function () {
          win_1.focus();
        });
      }
      var gameFileData = sessionStorage.getItem("noreGameFile");
      if (gameFileData != null) {
        if (gameFileData === "0") {
          DataManager.setupNewGame();
          SceneManager.goto(Scene_Map);
        } else {
          var savefileId = parseInt(gameFileData);
          DataManager.loadGame(savefileId)
            .then(function () {
              return _this.onLoadSuccess();
            })
            .catch(function () {
              return _this.onLoadFailure();
            });
        }
        return;
      } else {
        var noreCommonEventId = parseInt(
          sessionStorage.getItem("noreCommonEventId")
        );
        var norePlayerMap = parseInt(sessionStorage.getItem("norePlayerMap"));
        if (noreCommonEventId && norePlayerMap) {
          console.log("シーン回想実行。コモンイベントID: " + noreCommonEventId);
          DataManager.setupNewGame();
          $gamePlayer.setTransparent(true);
          $gameTemp.reserveCommonEvent(noreCommonEventId);
          $gamePlayer.reserveTransfer(norePlayerMap, 0, 0, 0, 0);
          SceneManager.goto(Scene_Map);
          $gameSwitches.setValue(999, true);
          return;
        }
      }
    };
    Scene_Boot.prototype.onLoadSuccess = function () {
      this.fadeOutAll();
      this.reloadMapIfUpdated();
      SceneManager.goto(Scene_Map);
      $gameSystem.onAfterLoad();
    };
    Scene_Boot.prototype.onLoadFailure = function () {
      console.error("ファイルロードができませんでした");
    };
    Scene_Boot.prototype.reloadMapIfUpdated = function () {
      if ($gameSystem.versionId() !== $dataSystem.versionId) {
        var mapId = $gameMap.mapId();
        var x = $gamePlayer.x;
        var y = $gamePlayer.y;
        $gamePlayer.reserveTransfer(mapId, x, y);
        $gamePlayer.requestMapReload();
      }
    };
    var _Scene_Title_commandNewGame = Scene_Title.prototype.commandNewGame;
    Scene_Title.prototype.commandNewGame = function () {
      _Scene_Title_commandNewGame.call(this);
      if ($gameTemp.isPlaytest()) {
        sessionStorage.setItem("noreGameFile", "0");
      }
    };
    var _Scene_Load_onLoadSuccess = Scene_Load.prototype.onLoadSuccess;
    Scene_Load.prototype.onLoadSuccess = function () {
      _Scene_Load_onLoadSuccess.call(this);
      if ($gameTemp.isPlaytest()) {
        sessionStorage.setItem("noreGameFile", this.savefileId());
      }
    };
    var _Scene_Save_onSaveSuccess = Scene_Save.prototype.onSaveSuccess;
    Scene_Save.prototype.onSaveSuccess = function () {
      _Scene_Save_onSaveSuccess.call(this);
      if ($gameTemp.isPlaytest()) {
        sessionStorage.setItem("noreGameFile", this.savefileId());
      }
    };
  })((AutoNewGame = Nore.AutoNewGame || (Nore.AutoNewGame = {})));
})(Nore || (Nore = {}));
