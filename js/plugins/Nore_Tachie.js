//=============================================================================
// Nore_Tachie.js
//=============================================================================
/*:ja
 * @target MZ
 * @author ル
 * @plugindesc 立ち絵を簡単に表示するプラグインです。別途画像が必要です
 *
 * @param disablesTachieActorIdList
 * @desc 立ち絵を使わないアクターの ID のリストです。(カンマ区切り。 1, 2, 3...)無駄な読み込みをしないための設定です。
 * @default 0
 *
 * @param leftPosX
 * @desc 左側に立つ場合のx座標です
 * @type number
 * @default 0
 *
 * @param rightPosX
 * @desc 右側に立つ場合のx座標です
 * @type number
 * @default 800
 *
 * @param centerPosX
 * @desc 中央に立つ場合のx座標です
 * @type number
 * @default 200
 *
 * @param posY
 * @desc 全員のy座標です
 * @type number
 * @default 0
 *
 * @param actor1offset
 * @desc アクター１のキャラのx座標，y座標の補正値です
 * @default 0, 0
 *
 * @param actor2offset
 * @desc アクター２のキャラのx座標，y座標の補正値です
 * @default 0, 0
 *
 * @param actor3offset
 * @desc アクター３のキャラのx座標，y座標の補正値です
 * @default 0, 0
 *
 * @param actor4offset
 * @desc アクター４のキャラのx座標，y座標の補正値です
 * @default 0, 0
 *
 * @param actor5offset
 * @desc アクター５のキャラのx座標，y座標の補正値です
 * @default 0, 0
 *
 * @param actor6offset
 * @desc アクター６のキャラのx座標，y座標の補正値です
 * @default 0, 0
 *
 * @param actor7offset
 * @desc アクター７のキャラのx座標，y座標の補正値です
 * @default 0, 0
 *
 * @param actor8offset
 * @desc アクター８のキャラのx座標，y座標の補正値です
 * @default 0, 0
 *
 * @param actor9offset
 * @desc アクター９のキャラのx座標，y座標の補正値です
 * @default 0, 0
 *
 * @param actor10offset
 * @desc アクター10のキャラのx座標，y座標の補正値です
 * @default 0, 0
 *
 *
 * @param skipKey
 * @desc メッセージスキップに使うボタンです。tab, shift, control, pageup, pagedown などが使えます。
 * @default control
 *
 * @param windowHideKey
 * @desc ウィンドウ消去に使うボタンです。tab, shift, control, pageup, pagedown などが使えます。
 * @default shift
 *
 * @param inactiveActorTone
 * @desc 喋っていない方のキャラの Tone です
 * @default -80, -80, -80, 0
 *
 * @param toneChangeDuration
 * @desc 喋っていない方のキャラの Tone を変える時の時間です
 * @default 25
 *
 * @param windowMargin
 * @desc メッセージウィンドウの表示位置の空きです。上、右、下、左の順です
 * @default 0, 0, 0, 0
 *
 * @param windowPadding
 * @desc メッセージウィンドウの文字と枠の空きです。上、右、下、左の順です
 * @default 0, 0, 0, 0
 *
 * @command showLeft
 * @text 左に表示
 * @des 左に表示
 * @arg actorId
 * @type number
 * @text actorId
 * @desc actorId
 *
 * @command showRight
 * @text 右に表示
 * @des 右に表示
 * @arg actorId
 * @type number
 * @text actorId
 * @desc actorId
 *
 * @command hoppe
 * @text ほっぺ
 * @des ほっぺ
 * @arg actorId
 * @type number
 * @text actorId
 * @desc actorId
 * @arg hoppeId
 * @type number
 * @text hoppeId
 * @desc hoppeId
 *
 * @help
 * Ver
 *
 * 左側に立つキャラは、pictureId 11 のピクチャで表示しているので、
 * イベントコマンドで pictureId 11 を対象とすることで操作できます。
 *
 * 同様に、右側に立つキャラは、pictureId 12
 *
 * ■画像の設定方法
 * img/tachie フォルダを使います。
 * ここに、全キャラ分の立ち絵画像を入れてください。
 * ※「未使用ファイルを含まない」には非対応なので、
 * 　手動でコピーしてください。
 *
 * 以下、アクター１の場合の例です。
 *p
 * actor01_<<表情ID>>.png
 * 　→表情
 * actor01_body_<<ポーズID>>.png
 * 　→体
 * actor01_face_<<ポーズID>>.png
 * 　→後ろ髪
 * actor01_hair_<<ポーズID>>.png
 * 　→頭
 * actor01_hoppe.png
 * 　→ほっぺ
 * actor01_in_<<衣装ID>>_bottom.png
 * 　→パンツ
 * actor01_in_<<衣装ID>>_top.png
 * 　→ブラ
 * actor01_out_<<衣装ID>>_front_<<ポーズID>>.png
 * actor01_out_<<衣装ID>>_main_<<ポーズID>>.png
 * actor01_out_<<衣装ID>>_back_<<ポーズID>>.png
 * 　→上着
 *
 * 必要ない場合でも、画像をよみに行ってエラーになる場合があります。
 * その場合、透明な画像を入れておいてください。
 *
 *
 *
 * プラグインコマンド
 * Tachie showLeft  actorId x y opacity  # 立ち絵を左側に表示する
 * Tachie showRight actorId x y opacity  # 立ち絵を右側に表示する
 * Tachie showCenter actorId x y opacity # 立ち絵を中央に表示する
 * Tachie hideLeft                      # 左側の立ち絵を非表示にする
 * Tachie hideRight                     # 右側の立ち絵を非表示にする
 * Tachie hideCenter                    # 中央の立ち絵を非表示にする
 * Tachie face      actorId faceId      # アクターの表情を変更する
 * Tachie pose      actorId poseId      # アクターのポーズを変更する
 * Tachie hoppe     actorId hoppeId     # アクターのほっぺを変更する
 * Tachie outer     actorId cosId       # アクターのアウターを変更する
 * Tachie innerTop     actorId cosId    # アクターのブラを変更する
 * Tachie innerBottom  actorId cosId    # アクターのパンツを変更する
 * Tachie preload      actorId          # アクターの現在のコスを事前に読み込んでおく
 * Tachie preloadFaces actorId 1 2 3... # アクターの表情を事前に読み込んでおく
 * Tachie notClose on                   # ウィンドウを閉じないようにする
 * Tachie notClose off                  # ↑を解除する
 * Tachie showName hoge                 # 名前欄に hoge を表示する
 * Tachie hideName                      # 名前欄を非表示にする
 * Tachie clear                         # 立ち絵を全て非表示にする
 * Tachie hideBalloon                   # 一時的に吹き出しを非表示にする
 * Tachie deactivateAll                   # すべてのキャラを暗くします
 *
 * @requiredAssets img/tachie/actor01.json
 * @requiredAssets img/tachie/actor01.webp
 * @requiredAssets img/tachie/actor05.json
 * @requiredAssets img/tachie/actor05.webp
 * @requiredAssets audio/se/Chime2.ogg
 * @requiredAssets audio/se/Jump1.ogg
 *
 * @license
 * Nore_Tachie licensed under the MIT License.
 */
var Nore;
(function (Nore) {
  var Tachie;
  (function (Tachie) {
    var parameters = PluginManager.parameters("Nore_Tachie");
    var LEFT_POS_X = parseInt(parameters["leftPosX"]);
    var RIGHT_POS_X = parseInt(parameters["rightPosX"]);
    var CENTER_POS_X = parseInt(parameters["centerPosX"]);
    var POS_Y = parseInt(parameters["posY"]);
    var INACTIVE_ACTOR_TONE = Nore.toIntArrayByStr(
      parameters["inactiveActorTone"],
      4
    );
    var DISALVED_ACTOR_ID_LIST = Nore.toIntArrayByStr(
      parameters["disablesctorIdList"]
    );
    var TONE_CHANGE_DURATION = parseInt(parameters["toneChangeDuration"]);
    var offset = {};
    for (var i = 1; i <= 10; i++) {
      if (parameters["actor" + i + "offset"]) {
        var offset1 = String(parameters["actor" + i + "offset"]).split(",");
        var x = parseInt(offset1[0] || "0");
        var y = parseInt(offset1[1] || "0");
        if (isNaN(x)) {
          x = 0;
        }
        if (isNaN(y)) {
          y = 0;
        }
        offset[i] = new PIXI.Point(x, y);
      }
    }
    var OFFSET_Y = -100;
    var AUTO_MODE_DELAY_COMMON = Nore.parseIntValue(
      parameters["autoModeDelayCommon"],
      2500
    );
    var AUTO_MODE_DELAY_PER_CHAR = Nore.parseIntValue(
      parameters["autoModeDelayPerChar"],
      120
    );
    var AUTO_MODE_MARK_TOTAL_FRAME = parseInt(
      parameters["autoModeMarkFrameNum"]
    );
    var AUTO_MODE_MARK_X = parseInt(parameters["autoModeMarkX"]);
    var AUTO_MODE_MARK_Y = parseInt(parameters["autoModeMarkY"]);
    var DEFAULT_PICTURE_ID1 = 11; // 左
    var DEFAULT_PICTURE_ID2 = 12; // 右
    var DEFAULT_PICTURE_ID3 = 13; // センター
    var DEFAULT_PICTURE_ID4 = 14;
    var DEFAULT_PICTURE_ID5 = 15;
    var DEFAULT_PICTURE_ID6 = 16;
    var DEFAULT_PICTURE_ID7 = 17;
    var DEFAULT_PICTURE_ID8 = 18;
    var DEFAULT_PICTURE_ID9 = 19;
    var ERO_PICTURE_ID = 20; // エロ中
    var PICTURES = [
      DEFAULT_PICTURE_ID1,
      DEFAULT_PICTURE_ID2,
      DEFAULT_PICTURE_ID3,
      DEFAULT_PICTURE_ID4,
      DEFAULT_PICTURE_ID5,
      DEFAULT_PICTURE_ID6,
      DEFAULT_PICTURE_ID7,
      DEFAULT_PICTURE_ID8,
      DEFAULT_PICTURE_ID9,
    ];
    var ACTOR_PREFIX = "___actor";
    Tachie.LEFT_POS = 1;
    Tachie.RIGHT_POS = 2;
    Tachie.CENTER_POS = 3;
    Tachie.OUT_POS = 10;
    Tachie.NONE_POS = 11;
    Tachie.POS4 = 4;
    Tachie.POS5 = 5;
    Tachie.POS6 = 6;
    Tachie.POS7 = 7;
    Tachie.POS8 = 8;
    Tachie.POS9 = 9;
    Tachie.actorCashedSprites = {};
    Game_Actor.prototype.getCashedSprite = function () {
      var s = Tachie.actorCashedSprites[this.actorId()];
      if (s) {
        var renderTexture = $gameTemp.getActorBitmapBodyCache(this.actorId());
        var t = new PIXI.Texture(renderTexture);
        return new PIXI.Sprite(t);
      }
      return null;
    };
    var _DataManager_extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function (contents) {
      _DataManager_extractSaveContents.call(this, contents);
      var len = $dataActors.length;
      for (var i = 0; i < len; i++) {
        var actor = $gameActors._data[i];
        if (actor) {
          actor.setCacheChanged();
          Tachie.actorCashedSprites[actor.actorId()] = false;
        }
      }
    };
    var pluginName = "Nore_Tachie";
    PluginManager.registerCommand(pluginName, "deactivateAll", function (args) {
      for (var _b = 0, PICTURES_1 = PICTURES; _b < PICTURES_1.length; _b++) {
        var pictureId = PICTURES_1[_b];
        var picture = $gameScreen.picture(pictureId);
        if (picture && picture.name() != "") {
          var c = {
            code: 234,
            indent: this._indent,
            parameters: [
              pictureId,
              INACTIVE_ACTOR_TONE,
              TONE_CHANGE_DURATION,
              false,
            ],
          };
          this._list.splice(this._index + 1, 0, c);
        }
      }
    });
    PluginManager.registerCommand(pluginName, "notClose", function (args) {
      $gameTemp.tachieAvairable = args.flag === "on";
    });
    PluginManager.registerCommand(pluginName, "hideLeft", function (args) {
      var commands = [];
      for (var _b = 0, PICTURES_2 = PICTURES; _b < PICTURES_2.length; _b++) {
        var pictureId = PICTURES_2[_b];
        var picture = $gameScreen.picture(pictureId);
        if (pictureId != DEFAULT_PICTURE_ID1) {
          continue;
        }
        if (picture && picture.opacity() > 0) {
          var c = {
            code: 232,
            indent: this._indent,
            parameters: [
              pictureId,
              0,
              0,
              0,
              picture.x(),
              picture.y(),
              100,
              100,
              0,
              0,
              30,
              false,
            ],
          };
          commands.push(c);
        }
      }
      for (var _c = 0, commands_1 = commands; _c < commands_1.length; _c++) {
        var c = commands_1[_c];
        this._list.splice(this._index + 1, 0, c);
      }
      var c2 = {
        code: 356,
        indent: this._indent,
        parameters: ["Tachie clear"],
      };
      this._list.splice(this._index + 1 + commands.length, 0, c2);
      $gameTemp.hideMessage = true;
    });
    PluginManager.registerCommand(pluginName, "hideRight", function (args) {
      var commands = [];
      for (var _b = 0, PICTURES_3 = PICTURES; _b < PICTURES_3.length; _b++) {
        var pictureId = PICTURES_3[_b];
        var picture = $gameScreen.picture(pictureId);
        if (pictureId != DEFAULT_PICTURE_ID2) {
          continue;
        }
        if (picture && picture.opacity() > 0) {
          var c = {
            code: 232,
            indent: this._indent,
            parameters: [
              pictureId,
              0,
              0,
              0,
              picture.x(),
              picture.y(),
              100,
              100,
              0,
              0,
              30,
              false,
            ],
          };
          commands.push(c);
        }
      }
      for (var _c = 0, commands_2 = commands; _c < commands_2.length; _c++) {
        var c = commands_2[_c];
        this._list.splice(this._index + 1, 0, c);
      }
      var c2 = {
        code: 356,
        indent: this._indent,
        parameters: ["Tachie clear"],
      };
      this._list.splice(this._index + 1 + commands.length, 0, c2);
      $gameTemp.hideMessage = true;
    });
    PluginManager.registerCommand(pluginName, "hideCenter", function (args) {
      var commands = [];
      for (var _b = 0, PICTURES_4 = PICTURES; _b < PICTURES_4.length; _b++) {
        var pictureId = PICTURES_4[_b];
        var picture = $gameScreen.picture(pictureId);
        if (pictureId != DEFAULT_PICTURE_ID3) {
          continue;
        }
        if (picture && picture.opacity() > 0) {
          var c = {
            code: 232,
            indent: this._indent,
            parameters: [
              pictureId,
              0,
              0,
              0,
              picture.x(),
              picture.y(),
              100,
              100,
              0,
              0,
              30,
              false,
            ],
          };
          commands.push(c);
        }
      }
      for (var _c = 0, commands_3 = commands; _c < commands_3.length; _c++) {
        var c = commands_3[_c];
        this._list.splice(this._index + 1, 0, c);
      }
      var c2 = {
        code: 356,
        indent: this._indent,
        parameters: ["Tachie clear"],
      };
      this._list.splice(this._index + 1 + commands.length, 0, c2);
      $gameTemp.hideMessage = true;
    });
    PluginManager.registerCommand(pluginName, "hide", function (args) {
      var commands = [];
      for (var _b = 0, PICTURES_5 = PICTURES; _b < PICTURES_5.length; _b++) {
        var pictureId = PICTURES_5[_b];
        var picture = $gameScreen.picture(pictureId);
        if (picture && picture.opacity() > 0) {
          var c = {
            code: 232,
            indent: this._indent,
            parameters: [
              pictureId,
              0,
              0,
              0,
              picture.x(),
              picture.y(),
              100,
              100,
              0,
              0,
              30,
              false,
            ],
          };
          commands.push(c);
        }
      }
      for (var _c = 0, commands_4 = commands; _c < commands_4.length; _c++) {
        var c = commands_4[_c];
        this._list.splice(this._index + 1, 0, c);
      }
      var c2 = {
        code: 356,
        indent: this._indent,
        parameters: ["Tachie clear"],
      };
      this._list.splice(this._index + 1 + commands.length, 0, c2);
      for (var _d = 0, _e = $gameParty.members(); _d < _e.length; _d++) {
        var m = _e[_d];
        m.setHoppeId(0);
      }
      $gameVariables.setValue(12, 0);
      $gameTemp.hideMessage = true;
    });
    PluginManager.registerCommand(pluginName, "clear", function (args) {
      for (var _b = 0, PICTURES_6 = PICTURES; _b < PICTURES_6.length; _b++) {
        var pictureId = PICTURES_6[_b];
        var picture = $gameScreen.picture(pictureId);
        if (picture) {
          //picture.erase();
        }
      }
    });
    PluginManager.registerCommand(pluginName, "showLeft", function (args) {
      var actorId = args.actorId;
      var x = args.x || 0;
      var y = args.y || 0;
      var opacity = args.opacity || 255;
      $gameVariables.setValue(12, Tachie.LEFT_POS);
      this.tachiePictureCommnad("showLeft", actorId, x, y, opacity);
    });
    PluginManager.registerCommand(pluginName, "showRight", function (args) {
      var actorId = args.actorId;
      var x = args.x || 0;
      var y = args.y || 0;
      var opacity = args.opacity || 255;
      $gameVariables.setValue(12, Tachie.RIGHT_POS);
      this.tachiePictureCommnad("showRight", actorId, x, y, opacity);
    });
    PluginManager.registerCommand(pluginName, "showCenter", function (args) {
      var actorId = args.actorId;
      var x = args.x || 0;
      var y = args.y || 0;
      var opacity = args.opacity || 255;
      $gameVariables.setValue(12, Tachie.CENTER_POS);
      this.tachiePictureCommnad("showCenter", actorId, x, y, opacity);
    });
    PluginManager.registerCommand(pluginName, "showOut", function (args) {
      var actorId = args.actorId;
      var x = args.x || 0;
      var y = args.y || 0;
      var opacity = args.opacity || 255;
      $gameVariables.setValue(12, 0);
      this.tachiePictureCommnad("showOut", actorId, x, y, opacity);
    });
    PluginManager.registerCommand(pluginName, "face", function (args) {
      var actorId = args.actorId;
      var actor = $gameActors.actor(actorId);
      var faceId = args.faceId;
      actor.setFaceId(faceId);
    });
    PluginManager.registerCommand(pluginName, "pose", function (args) {
      var actorId = args.actorId;
      var actor = $gameActors.actor(actorId);
      var poseId = args.poseId;
      actor.setPoseId(poseId);
    });
    PluginManager.registerCommand(pluginName, "namida", function (args) {
      var actorId = args.actorId;
      var actor = $gameActors.actor(actorId);
      if (!actor) {
        return;
      }
      var namidaId = args.namidaId;
      actor.setNamidaId(namidaId);
    });
    PluginManager.registerCommand(pluginName, "hoppe", function (args) {
      var actorId = args.actorId;
      var actor = $gameActors.actor(actorId);
      if (!actor) {
        return;
      }
      var hoppeId = args.hoppeId;
      if ($gameVariables.value(29) > 0) {
        hoppeId = $gameVariables.value(29);
      }
      actor.setHoppeId(hoppeId);
    });
    PluginManager.registerCommand(pluginName, "outer", function (args) {
      var actorId = args.actorId;
      var actor = $gameActors.actor(actorId);
      var outerId = args.outerId;
      actor.setOuterId(outerId);
    });
    PluginManager.registerCommand(pluginName, "innerTop", function (args) {
      var actorId = args.actorId;
      var actor = $gameActors.actor(actorId);
      var innerTopId = args.innerTopId;
      actor.setInnerTopId(innerTopId);
    });
    PluginManager.registerCommand(pluginName, "innerBottom", function (args) {
      var actorId = args.actorId;
      var actor = $gameActors.actor(actorId);
      var innerBottomId = args.innerBottomId;
      actor.setInnerBottomId(innerBottomId);
    });
    PluginManager.registerCommand(pluginName, "acceOn", function (args) {
      var actorId = args.actorId;
      var actor = $gameActors.actor(actorId);
      var acceId = args.acceId;
      actor.addAcce(acceId);
    });
    PluginManager.registerCommand(pluginName, "acceOff", function (args) {
      var actorId = args.actorId;
      var actor = $gameActors.actor(actorId);
      var acceId = args.acceId;
      actor.removeAcce(acceId);
    });
    Game_Interpreter.prototype.tachiePictureCommnad = function (
      command,
      actorId,
      x,
      y,
      opacity
    ) {
      switch (command) {
        case "showEro":
          this.showTachiePicture(
            actorId,
            Tachie.RIGHT_POS,
            ERO_PICTURE_ID,
            x,
            y,
            opacity
          );
          break;
        case "showLeft":
          this.showTachiePicture(
            actorId,
            Tachie.LEFT_POS,
            DEFAULT_PICTURE_ID1,
            x,
            y,
            opacity
          );
          this.deactivateTachiePicture(DEFAULT_PICTURE_ID2);
          this.deactivateTachiePicture(DEFAULT_PICTURE_ID3);
          break;
        case "showRight":
          if ($gameSystem.isRightTachieVisible()) {
            $gameSwitches.setValue(4, true);
            this.deactivateTachiePicture(DEFAULT_PICTURE_ID1);
            this.deactivateTachiePicture(DEFAULT_PICTURE_ID3);
            return;
          }
          this.showTachiePicture(
            actorId,
            Tachie.RIGHT_POS,
            DEFAULT_PICTURE_ID2,
            x,
            y,
            opacity
          );
          this.deactivateTachiePicture(DEFAULT_PICTURE_ID1);
          this.deactivateTachiePicture(DEFAULT_PICTURE_ID3);
          break;
        case "showCenter":
          this.showTachiePicture(
            actorId,
            Tachie.CENTER_POS,
            DEFAULT_PICTURE_ID3,
            x,
            y,
            opacity
          );
          this.deactivateTachiePicture(DEFAULT_PICTURE_ID1);
          this.deactivateTachiePicture(DEFAULT_PICTURE_ID2);
          break;
        case "showOut":
          this.deactivateTachiePicture(DEFAULT_PICTURE_ID1);
          this.deactivateTachiePicture(DEFAULT_PICTURE_ID2);
          this.deactivateTachiePicture(DEFAULT_PICTURE_ID3);
          break;
        case "show4":
          this.showTachiePicture(
            actorId,
            Tachie.POS4,
            DEFAULT_PICTURE_ID4,
            x,
            y,
            opacity
          );
          this.deactivateTachiePicture(DEFAULT_PICTURE_ID1);
          this.deactivateTachiePicture(DEFAULT_PICTURE_ID2);
          break;
      }
    };
    Game_Interpreter.prototype.showTachiePicture = function (
      actorId,
      posId,
      pictureId,
      x,
      y,
      opacity
    ) {
      $gameTemp.tachieActorId = actorId;
      $gameTemp.tachieActorPos = posId;
      var lastTone = [0, 0, 0, 0];
      if (opacity < 255) {
        var picture_1 = $gameScreen.picture(pictureId);
        if (picture_1 && picture_1.tachieActorId === actorId) {
          opacity = 255;
          lastTone = picture_1.tone();
        }
      }
      var xx = x + this.getPosX(posId) + getTachieOffsetX(actorId);
      var yy = y + POS_Y;
      $gameScreen.showPicture(
        pictureId,
        ACTOR_PREFIX + actorId,
        0,
        xx,
        yy,
        100,
        100,
        opacity,
        PIXI.BLEND_MODES.NORMAL
      );
      var picture = $gameScreen.picture(pictureId);
      picture.tint(lastTone, 0);
      var c = {
        code: 234,
        indent: this._indent,
        parameters: [pictureId, [0, 0, 0, 0], TONE_CHANGE_DURATION, false],
      };
      this._list.splice(this._index + 1, 0, c);
      if (opacity < 255) {
        var c = {
          code: 232,
          indent: this._indent,
          parameters: [pictureId, 0, 0, 0, xx, yy, 100, 100, 255, 0, 15, false],
        };
        this._list.splice(this._index + 1, 0, c);
      }
      $gameActors.actor(actorId).setDirty();
    };
    function getTachieOffsetX(actorId) {
      switch (actorId) {
        case 3:
          return 60;
        case 7:
          return -10;
      }
      return 0;
    }
    /**
     * 指定の pictureId のピクチャが表示されている場合、暗くします
     */
    Game_Interpreter.prototype.deactivateTachiePicture = function (pictureId) {
      var leftPicture = $gameScreen.picture(pictureId);
      if (leftPicture && leftPicture.name() != "") {
        var c = {
          code: 234,
          indent: this._indent,
          parameters: [
            pictureId,
            INACTIVE_ACTOR_TONE,
            TONE_CHANGE_DURATION,
            false,
          ],
        };
        this._list.splice(this._index + 1, 0, c);
      }
    };
    /**
     * 指定の positionId に対応する x 座標を返します。
     */
    Game_Interpreter.prototype.getPosX = function (posId) {
      switch (posId) {
        case Tachie.LEFT_POS:
          if ($gameSwitches.value(100)) {
            // お風呂
            return 450;
          }
          return LEFT_POS_X;
        case Tachie.RIGHT_POS:
          if ($gameSwitches.value(100)) {
            // お風呂
            return 740;
          }
          return RIGHT_POS_X;
        case Tachie.CENTER_POS:
          if ($gameSwitches.value(100)) {
            // お風呂
            return -120;
          }
          return CENTER_POS_X;
        default:
          console.error("posId  が不正です:" + posId);
      }
    };
    Game_Interpreter.prototype.command232 = function (params) {
      var x, y;
      if (params[3] === 0) {
        x = params[4];
        y = params[5];
      } else {
        x = $gameVariables.value(params[4]);
        y = $gameVariables.value(params[5]);
      }
      var time = params[10];
      if (this.isSkip() && PICTURES.indexOf(params[0]) > 0) {
        time = 1;
      }
      $gameScreen.movePicture(
        params[0],
        params[2],
        x,
        y,
        params[6],
        params[7],
        params[8],
        params[9],
        time,
        0
      );
      if (params[11]) {
        this.wait(time);
      }
      return true;
    };
    Game_Interpreter.prototype.isSkip = function () {
      if ($gameSwitches.value(72)) {
        return false;
      }
      return Input.isPressed("control") || TouchInput.rightButton;
    };
    Object.defineProperty(Game_Actor.prototype, "tachieOffsetX", {
      get: function () {
        return (offset[this.actorId()] || new PIXI.Point()).x;
      },
      enumerable: true,
      configurable: true,
    });
    Object.defineProperty(Game_Actor.prototype, "tachieOffsetY", {
      get: function () {
        return (offset[this.actorId()] || new PIXI.Point()).y;
      },
      enumerable: true,
      configurable: true,
    });
    Game_Actor.prototype.isTachieDisabled = function () {
      return DISALVED_ACTOR_ID_LIST.indexOf(this.actorId()) >= 0;
    };
    var Game_Picture_prototype_initTarget = Game_Picture.prototype.initTarget;
    Game_Picture.prototype.initTarget = function () {
      Game_Picture_prototype_initTarget.call(this);
      this.tachieActorId = this.getTachieActorId();
    };
    Game_Picture.prototype.getTachieActorId = function () {
      var matcher = /^___actor([-+]?\d+)/;
      var result = matcher.exec(this._name);
      if (result && result.length > 1) {
        return parseInt(result[1]) || 0;
      } else {
        return 0;
      }
    };
    ImageManager.loadTachie = function (filename, hue) {
      return this.loadBitmap("img/tachie/", filename, hue, true);
    };
    ImageManager.loadSpriteSheet = function (file, callback) {
      var matcher = /ero\/ero(.+)\.json/;
      var result = matcher.exec(file);
      if (result && PIXI.utils.TextureCache[result[1] + "_01_01.png"]) {
        if (callback) {
          callback();
        }
        return;
      }
      if (result) {
        p(result[0]);
      }
      var loader = new PIXI.Loader();
      loader.add({
        name: "",
        url: file,
      });
      this._loadingSpriteSheet = true;
      var self = this;
      loader.onComplete.add(function (e, resources) {
        //p('comp:' + file)
        for (var key in resources) {
          Nore.spriteSheetCache[key] = resources[key];
        }
        self._loadingSpriteSheet = false;
        if (callback) {
          callback();
        }
      });
      loader.load(); // ロード開始!
    };
    var _ImageManager_isReady = ImageManager.isReady;
    ImageManager.isReady = function () {
      if (this._loadingSpriteSheet) {
        return false;
      }
      return _ImageManager_isReady.call(this);
    };
    Game_Temp.prototype.getActorBitmapBodyCache = function (picId) {
      this.actorBitmapBodyCache = this.actorBitmapBodyCache || {};
      if (!this.actorBitmapBodyCache[picId]) {
        if (picId >= 100) {
          this.actorBitmapBodyCache[picId] = PIXI.RenderTexture.create(
            806,
            1000
          );
        } else if (picId >= 15) {
          this.actorBitmapBodyCache[picId] = PIXI.RenderTexture.create(
            1366,
            1000
          );
        } else {
          this.actorBitmapBodyCache[picId] = PIXI.RenderTexture.create(
            740,
            1000
          );
        }
      }
      return this.actorBitmapBodyCache[picId];
    };
    Game_Temp.prototype.getPictureBitmapCache = function (actorId) {
      this.actorBitmapCache = this.actorBitmapCache || {};
      if (!this.actorBitmapCache[actorId]) {
        this.actorBitmapCache[actorId] = new Bitmap(
          Graphics.width,
          Graphics.height
        );
      }
      return this.actorBitmapCache[actorId];
    };
    Game_Screen.prototype.showActorPicture = function (
      actorId,
      pictureId,
      x,
      y
    ) {
      var name = ACTOR_PREFIX + actorId;
      this.showPicture(pictureId, name, 0, x, y, 1, 1, 1, 0);
    };
    Game_Screen.prototype.getPictureId = function (picture) {
      for (var i = 0; i < this._pictures.length; i++) {
        if (this._pictures[i] === picture) {
          return i;
        }
      }
      console.error("picture not found." + picture);
    };
    var TachieDrawerMixin = function () {
      this.drawTachie = function (
        actorId,
        parent,
        x,
        y,
        rect,
        faceId,
        scale,
        clearByDraw
      ) {
        if (
          $gameSystem.chokyoActorId() > 0 &&
          SceneManager._scene instanceof Scene_Map
        ) {
          if (actorId > 20) {
            return;
          }
          if (actorId == 15) {
            return;
          }
        }
        if (x === void 0) {
          x = 0;
        }
        if (y === void 0) {
          y = 0;
        }
        if (faceId === void 0) {
          faceId = 0;
        }
        if (scale === void 0) {
          scale = 1;
        }
        if (clearByDraw === void 0) {
          clearByDraw = false;
        }
        var actor = $gameActors.actor(actorId);
        if (!actor) {
          console.error(
            "アクターが存在しないため、描画をしませんでした。actorId:" + actorId
          );
          return false;
        }
        return this.drawTachieActor(
          actor,
          parent,
          x,
          y,
          rect,
          faceId,
          scale,
          clearByDraw
        );
      };
      this.drawTachieActor = function (
        actor,
        parent,
        x,
        y,
        rect,
        faceId,
        scale,
        clearByDraw,
        naked,
        alpha,
        argActorId
      ) {
        if (x === void 0) {
          x = 0;
        }
        if (y === void 0) {
          y = 0;
        }
        if (faceId === void 0) {
          faceId = 0;
        }
        if (scale === void 0) {
          scale = 1;
        }
        if (alpha === void 0) {
          alpha = 1;
        }
        if (clearByDraw === void 0) {
          clearByDraw = false;
        }
        if (actor.isTachieDisabled()) {
          return true;
        }
        if (!ImageManager.isReady()) {
          //return false;
        }
        //actor.preloadTachie();
        if (!ImageManager.isReady()) {
          //return false;
        }
        if (!naked) {
          naked = 0;
        }
        var point = this.calcTachieActorPos(actor);
        if (!rect) {
          rect = new Rectangle(0, 0, 0, 0);
        }
        point.y *= scale;
        x += point.x;
        y += point.y;
        y += OFFSET_Y;
        //rect.x += point.x;
        //rect.y += point.y;
        actor.clearDirty();
        actor.clearCacheChanged();
        var actorId = actor.actorId();
        if (argActorId) {
          actorId = argActorId;
        }
        var sprite = new PIXI.Sprite();
        //var time = new Date().getTime();
        var cash = actor.getCashedSprite();
        var renderTexture = $gameTemp.getActorBitmapBodyCache(actorId);
        var offX = 20;
        if (cash == null) {
          var mainSprite = new PIXI.Sprite();
          this.drawTachieHair(actor, mainSprite);
          this.drawTachieOuterBack(actor, mainSprite);
          this.drawTachieBodyBack(actor, mainSprite);
          this.drawTachieFile(actor.legShadowFile(), mainSprite, actor);
          this.drawTachieSeiekiMiddleBack(actor, mainSprite);
          this.drawTachieOuterShadow(actor, mainSprite);
          this.drawTachieSkinAcce(actor, mainSprite);
          this.drawTachieSeiekiMiddle(actor, mainSprite);
          this.drawTachieInnerBottom(actor, mainSprite);
          this.drawTachieInnerTop(actor, mainSprite);
          this.drawTachieFile(actor.legSkinFile(), mainSprite, actor);
          this.drawTachieMiddleAcce(actor, mainSprite);
          //this.drawTachieFile(actor.armMainFile(), mainSprite, actor);
          this.drawTachieFile(actor.legMainFile(), mainSprite, actor);
          this.drawTachieOuterMain(actor, mainSprite);
          this.drawTachieMiddleFrontAcce(actor, mainSprite);
          this.drawTachieBodyFront(actor, mainSprite);
          this.drawTachieOuterFront(actor, mainSprite);
          var renderer = Graphics.app.renderer;
          renderer.render(mainSprite, renderTexture);
          var t = new PIXI.Texture(renderTexture);
          cash = new PIXI.Sprite(t);
          Tachie.actorCashedSprites[actorId] = true;
          mainSprite.destroy({
            texture: true,
            children: true,
          });
        } else {
          //p('cash')
        }
        this.drawTachieHoppe(actor, sprite);
        this.drawTachieFrontRakugakiAcce(actor, sprite);
        this.drawTachieFace(actor, sprite, faceId);
        this.drawTachieFrontAcce(actor, sprite);
        this.drawTachieNamida(actor, sprite, faceId);
        this.drawTachieSeiekiFrontBack(actor, sprite);
        this.drawTachieSeiekiFront(actor, sprite);
        this.drawTachieFile(actor.armFrontFile(), sprite, actor);
        this.lastDrawnActorId = actor.actorId();
        var picId = 0;
        if (this.picture) {
          var picture = this.picture();
          picId = $gameScreen.getPictureId(picture);
        }
        /* if (!Graphics.isWebGL()) {
                     if (renderTexture.baseTexture._canvasRenderTarget) {
                         renderTexture.baseTexture._canvasRenderTarget.context.setTransform(1, 0, 0, 1, 0, 0);
                         renderTexture.baseTexture._canvasRenderTarget.context.clearRect(0, 0, 740, 1000)
                     }
                 }*/
        var sp;
        if (cash) {
          sp = new PIXI.Sprite();
          sp.addChild(cash);
          sp.addChild(sprite);
        } else {
          Graphics._renderer.render(sprite, renderTexture);
          sprite.removeChild(mainSprite);
          sprite.destroy({
            children: true,
            texture: true,
          });
          var t_1 = new PIXI.Texture(renderTexture);
          sp = new PIXI.Sprite(t_1);
        }
        //p(new Date().getTime() - time)
        var myMask = null;
        if (rect.width > 0 && rect.height > 0) {
          myMask = new PIXI.Graphics();
          myMask.beginFill();
          myMask.drawRect(
            rect.x + parent.getGlobalPosition().x,
            rect.y + parent.getGlobalPosition().y,
            rect.width,
            rect.height
          );
          myMask.endFill();
          sp.mask = myMask;
        }
        sp.position.x = x;
        sp.position.y = y;
        sp.scale.x = scale;
        sp.scale.y = scale;
        sp.alpha = alpha;
        if (parent) {
          if (clearByDraw) {
            parent.destroyAndRemoveChildren();
          }
          parent.addChild(sp);
        } else {
          if (clearByDraw) {
            for (var i = 0, j = this.children.length; i < j; ++i) {
              if (this.children[i]) {
                this.children[i].destroy({
                  texture: true,
                  children: true,
                });
              }
            }
            this.destroyAndRemoveChildren();
          }
          this.addChild(sp);
          if (myMask) {
            this.addChild(myMask);
          }
        }
        //cache.context.drawImage(canvas, x, y, canvas.width * scale, canvas.height * scale);
        return true;
      };
      this.drawTachieBack = function (
        actorId,
        parent,
        x,
        y,
        rect,
        faceId,
        scale,
        clearByDraw
      ) {
        if (x === void 0) {
          x = 0;
        }
        if (y === void 0) {
          y = 0;
        }
        if (faceId === void 0) {
          faceId = 0;
        }
        if (scale === void 0) {
          scale = 1;
        }
        if (clearByDraw === void 0) {
          clearByDraw = false;
        }
        var actor = $gameActors.actor(actorId);
        if (!actor) {
          console.error(
            "アクターが存在しないため、描画をしませんでした。actorId:" + actorId
          );
          return false;
        }
        return this.drawTachieBackActor(
          actor,
          parent,
          x,
          y,
          rect,
          faceId,
          scale,
          clearByDraw
        );
      };
      this.drawTachieBackActor = function (
        actor,
        parent,
        x,
        y,
        rect,
        faceId,
        scale,
        clearByDraw,
        naked,
        alpha
      ) {
        if (scale === void 0) {
          scale = 1;
        }
        if (alpha === void 0) {
          alpha = 1;
        }
        if (clearByDraw === void 0) {
          clearByDraw = false;
        }
        var point = this.calcTachieActorPos(actor);
        if (!rect) {
          rect = new Rectangle(0, 0, 0, 0);
        }
        x += point.x;
        y += point.y;
        y += OFFSET_Y;
        var sprite = new PIXI.Sprite();
        this.drawTachieBackAcce(actor, sprite);
        sprite.position.x = x;
        sprite.position.y = y;
        if (clearByDraw) {
          parent.destroyAndRemoveChildren();
        }
        parent.addChild(sprite);
        //cache.context.drawImage(canvas, x, y, canvas.width * scale, canvas.height * scale);
        return true;
      };
      this.calcTachieActorPos = function (actor) {
        var dx = actor.tachieOffsetX;
        var dy = actor.tachieOffsetY;
        if (isNaN(dx)) {
          dx = 0;
        }
        if (isNaN(dy)) {
          dy = 0;
        }
        return new Point(dx, dy);
      };
      this.drawTachieCache = function (
        actor,
        cache,
        bitmap,
        x,
        y,
        rect,
        scale
      ) {
        var xx = -rect.x < 0 ? 0 : -rect.x;
        var yy = -rect.y < 0 ? 0 : -rect.y;
        var ww = rect.width / scale;
        var w = rect.width;
        if (w <= 0 || w + xx > cache.width) {
          w = cache.width - xx;
          ww = w / scale;
        }
        if (xx + ww > cache.width) {
          var xScale = ((cache.width - xx) * 1.0) / ww;
          ww = cache.width - xx;
          w *= xScale;
        }
        var hh = rect.height / scale;
        var h = rect.height;
        if (h <= 0 || h + yy > cache.height) {
          h = cache.height - yy;
          hh = h / scale;
        }
        if (yy + hh > cache.height) {
          var yScale = ((cache.height - yy) * 1.0) / hh;
          hh = cache.height - yy;
          h *= yScale;
        }
        bitmap.blt(cache, xx, yy, ww, hh, x, y, w, h);
      };
      this.drawTachieFile = function (
        file,
        bitmap,
        actor,
        x,
        y,
        rect,
        scale,
        alpha
      ) {
        if (x === void 0) {
          x = 0;
        }
        if (y === void 0) {
          y = 0;
        }
        if (scale === void 0) {
          scale = 1;
        }
        if (alpha === void 0) {
          alpha = 1;
        }
        if (!file) {
          return;
        }
        if (!rect) {
          rect = new Rectangle(0, 0, 0, 0);
        }
        this.drawTachieTextureAtlas(
          file,
          bitmap,
          actor,
          x,
          y,
          rect,
          scale,
          alpha
        );
      };
      this.drawTachieTextureAtlas = function (
        file,
        bitmap,
        actor,
        x,
        y,
        rect,
        scale,
        alpha,
        hue,
        tone
      ) {
        if (hue === void 0) {
          hue = 0;
        }
        if (tone === void 0) {
          tone = 0;
        }
        var textureBase = PIXI.utils.TextureCache[file + ".png"];
        if (!textureBase) {
          return;
        }
        var frame = textureBase.frame;
        var sx = frame.x;
        var sy = frame.y;
        var trim = textureBase.trim;
        var crop = textureBase.trim;
        var ww = crop.width / scale;
        var w = crop.width;
        var hh = crop.height / scale;
        var h = crop.height;
        var dx = trim.x + rect.x;
        var dy = trim.y + rect.y;
        var texture = new PIXI.Texture(textureBase.baseTexture);
        texture.frame = new PIXI.Rectangle(sx, sy, ww, hh);
        var sprite = new PIXI.Sprite(texture);
        if (hue != 0) {
          var colorFilter = new ColorFilter();
          colorFilter.setHue(hue);
          colorFilter.setColorTone([tone, tone, tone, 0]);
          sprite.filters = [];
          sprite.filters.push(colorFilter);
          alpha = 0.75;
        }
        sprite.position.x = dx + x;
        sprite.position.y = dy + y;
        sprite.width = w;
        sprite.height = h;
        sprite.alpha = alpha;
        bitmap.addChild(sprite);
      };
      this.drawTachieHair = function (actor, bitmap) {
        this.drawTachieFile(actor.hairFile(), bitmap, actor);
      };
      this.drawTachieOuterBack = function (actor, bitmap) {
        this.drawTachieFile(
          actor.outerBackFile(),
          bitmap,
          actor,
          undefined,
          undefined,
          undefined,
          undefined,
          $gameSystem.outerAlpha()
        );
      };
      this.drawTachieOuterShadow = function (actor, bitmap) {
        this.drawTachieFile(actor.innerBottomShadowFile(), bitmap, actor);
        this.drawTachieFile(actor.innerTopShadowFile(), bitmap, actor);
        this.drawTachieFile(
          actor.outerShadowFile(),
          bitmap,
          actor,
          undefined,
          undefined,
          undefined,
          undefined,
          $gameSystem.outerAlpha()
        );
        this.drawTachieFile(actor.outerBottomShadowFile(), bitmap, actor);
        this.drawTachieFile(actor.outerTopShadowFile(), bitmap, actor);
        this.drawTachieFile(actor.outerBottomShadowFile(), bitmap, actor);
      };
      this.drawTachieOuterMain = function (actor, bitmap) {
        this.drawTachieFile(actor.outerBottomMainFile(), bitmap, actor);
        this.drawTachieFile(actor.outerMiddleFile(), bitmap, actor);
        this.drawTachieFile(
          actor.outerMainFile(),
          bitmap,
          actor,
          undefined,
          undefined,
          undefined,
          undefined,
          $gameSystem.outerAlpha()
        );
        this.drawTachieFile(actor.outerTopMainFile(), bitmap, actor);
      };
      this.drawTachieOuterFront = function (actor, bitmap) {
        this.drawTachieFile(
          actor.outerFrontFile(),
          bitmap,
          actor,
          undefined,
          undefined,
          undefined,
          undefined,
          $gameSystem.outerAlpha()
        );
      };
      this.drawTachieBodyBack = function (actor, bitmap) {
        this.drawTachieFile(
          actor.backOptionFile(),
          bitmap,
          actor,
          undefined,
          undefined,
          undefined,
          undefined,
          $gameSystem.outerAlpha()
        );
        this.drawTachieFile(actor.bodyBackFile(), bitmap, actor);
        //this.drawTachieFile(actor.bodyBackFileB(), bitmap, actor);
        //this.drawTachieFile(actor.bodyBackFileC(), bitmap, actor);
        this.drawTachieBackAcce(actor, bitmap);
        this.drawTachieFile(actor.breastsFile(), bitmap, actor);
      };
      this.drawTachieSeiekiMiddleBack = function (actor, bitmap) {
        var bodyType = actor.bodyType();
        var list = actor.getSeiekiMiddleAcceList();
        for (var _b = 0, list_1 = list; _b < list_1.length; _b++) {
          var acce = list_1[_b];
          var fileId = acce.meta["acce"];
          if (acce.meta["poseD"] && bodyType == "d") {
            fileId = acce.meta["poseD"];
          }
          this.drawTachieFile(actor.acceBackFile(fileId), bitmap, actor);
        }
      };
      this.drawTachieSeiekiFrontBack = function (actor, bitmap) {
        var list = actor.getSeiekiFrontAcceList();
        for (var _b = 0, list_2 = list; _b < list_2.length; _b++) {
          var acce = list_2[_b];
          this.drawTachieFile(
            actor.acceBackFile(acce.meta["acce"]),
            bitmap,
            actor
          );
        }
      };
      this.drawTachieSeiekiMiddle = function (actor, bitmap) {
        var bodyType = actor.bodyType();
        var list = actor.getSeiekiMiddleAcceList();
        for (var _b = 0, list_3 = list; _b < list_3.length; _b++) {
          var acce = list_3[_b];
          var fileId = acce.meta["acce"];
          this.drawTachieFile(actor.acceFile(fileId), bitmap, actor);
        }
      };
      this.drawTachieSeiekiFront = function (actor, bitmap) {
        var list = actor.getSeiekiFrontAcceList();
        for (var _b = 0, list_4 = list; _b < list_4.length; _b++) {
          var acce = list_4[_b];
          this.drawTachieFile(actor.acceFile(acce.meta["acce"]), bitmap, actor);
        }
      };
      this.drawTachieBodyFront = function (actor, bitmap) {
        this.drawTachieFile(actor.bodyFrontFile(), bitmap, actor);
      };
      this.drawTachieInnerBottom = function (actor, bitmap) {
        this.drawTachieFile(actor.innerBottomFile(), bitmap, actor);
      };
      this.drawTachieInnerTop = function (actor, bitmap) {
        if (!actor.innerTopFile()) {
          return;
        }
        this.drawTachieFile(actor.innerTopFile(), bitmap, actor);
      };
      this.drawTachieInnerTop2 = function (actor, bitmap) {
        if (!actor.innerTopFile()) {
          return;
        }
        this.drawTachieFile(actor.innerTopFile(), bitmap, actor);
      };
      this.drawTachieHoppe = function (actor, bitmap) {
        if (actor.hoppeId == 0) {
          if (actor.hoppeAcceId()) {
            var id = actor.hoppeAcceId();
            this.drawTachieFile(actor.baseId + "hoppe" + id, bitmap, actor);
          }
        } else {
          this.drawTachieFile(actor.hoppeFile(), bitmap, actor);
        }
      };
      this.drawTachieNamida = function (actor, bitmap, faceId) {
        if (actor.namidaId == 0) {
          /*if (actor.hasHoppeAcce()) {
                        this.drawTachieFile(actor.baseId + 'hoppe', bitmap, actor);
                    }*/
        } else {
          this.drawTachieFile(actor.namidaFile(faceId), bitmap, actor);
        }
      };
      this.drawTachieBackAcce = function (actor, bitmap) {
        for (var _i = 0, _a = actor.getBackAcceList(); _i < _a.length; _i++) {
          var acceId = _a[_i];
          var acce = $dataArmors[acceId];
          var alpha = actor.acceFileAlpha(acceId + 1000);
          if (acce.meta["enableAlpha"]) {
            alpha = $gameSystem.outerAlpha();
          }
          this.drawTachieFile(
            actor.acceFile(acceId),
            bitmap,
            actor,
            undefined,
            undefined,
            undefined,
            undefined,
            alpha
          );
        }
      };
      this.drawTachieSkinAcce = function (actor, bitmap) {
        if (actor.hasAcce(1021)) {
          var babyList = actor.babyList();
          for (var i_1 = 0; i_1 < babyList.length; i_1++) {
            var baby = babyList[i_1];
            var index = i_1 + 1;
            var file = actor.getSyusanAcceFile(
              index,
              baby.isMale(),
              baby.getTaneoyaType()
            );
            this.drawSyusanTachieFile(file, bitmap, actor, baby);
          }
        }
        for (var _i = 0, _a = actor.getSkinAcceList(); _i < _a.length; _i++) {
          var acceId = _a[_i];
          this.drawTachieFile(
            actor.acceFile(acceId),
            bitmap,
            actor,
            undefined,
            undefined,
            undefined,
            undefined,
            actor.acceFileAlpha(acceId)
          );
        }
      };
      this.drawSyusanTachieFile = function (file, bitmap, actor, baby) {
        if (!file) {
          return;
        }
        var rect = new Rectangle(0, 0, 0, 0);
        /*let hue = 1;
                let tone = -50;
                switch (baby.getTaneoyaType()) {
                    case TaneoyaId.banzoku:
                        hue = 22;
                        tone = -250;
                        break;
                    case TaneoyaId.charles: hue = 40; break;
                    case TaneoyaId.goblin: hue = 120; break;
                }*/
        this.drawTachieTextureAtlas(file, bitmap, actor, 0, 0, rect, 1, 1);
      };
      this.drawTachieMiddleAcce = function (actor, bitmap) {
        for (var _i = 0, _a = actor.getMiddleAcceList(); _i < _a.length; _i++) {
          var acceId = _a[_i];
          this.drawTachieFile(actor.acceFile(acceId), bitmap, actor);
        }
      };
      this.drawTachieMiddleFrontAcce = function (actor, bitmap) {
        for (
          var _i = 0, _a = actor.getMiddleFrontAcceList();
          _i < _a.length;
          _i++
        ) {
          var acceId = _a[_i];
          var acce = $dataArmors[acceId + 1000];
          var alpha = 1;
          if (acce.meta["enableAlpha"]) {
            alpha = $gameSystem.outerAlpha();
          }
          this.drawTachieFile(
            actor.acceFile(acceId),
            bitmap,
            actor,
            undefined,
            undefined,
            undefined,
            undefined,
            alpha
          );
        }
      };
      this.drawTachieFrontRakugakiAcce = function (actor, bitmap) {
        for (
          var _i = 0, _a = actor.getFrontRakugakiAcceList();
          _i < _a.length;
          _i++
        ) {
          var acceId = _a[_i];
          var acce = $dataArmors[acceId + 1000];
          var alpha = 1;
          if (acce.meta["enableAlpha"]) {
            alpha = $gameSystem.outerAlpha();
          }
          this.drawTachieFile(
            actor.acceFile(acceId),
            bitmap,
            actor,
            undefined,
            undefined,
            undefined,
            undefined,
            alpha
          );
        }
      };
      this.drawTachieFrontAcce = function (actor, bitmap) {
        for (var _i = 0, _a = actor.getFrontAcceList(); _i < _a.length; _i++) {
          var acceId = _a[_i];
          var acce = $dataArmors[acceId + 1000];
          var alpha = 1;
          if (acce.meta["enableAlpha"]) {
            alpha = $gameSystem.outerAlpha();
          }
          this.drawTachieFile(
            actor.acceFile(acceId),
            bitmap,
            actor,
            undefined,
            undefined,
            undefined,
            undefined,
            alpha
          );
        }
      };
      this.drawTachieFace = function (actor, bitmap, faceId) {
        if (faceId === 0) {
          faceId = actor.faceId;
        }
        var file = actor.faceFile(faceId);
        this.drawTachieFile(file, bitmap, actor);
      };
    };
    TachieDrawerMixin.call(Sprite.prototype);
    TachieDrawerMixin.call(Window_Base.prototype);
    var _Sprite_Picture_prototype_updateBitmap =
      Sprite_Picture.prototype.updateBitmap;
    Sprite_Picture.prototype.updateBitmap = function () {
      _Sprite_Picture_prototype_updateBitmap.call(this);
      var picture = this.picture();
      if (picture && picture.tachieActorId !== 0 && picture._opacity > 0) {
        var actorId = picture.tachieActorId;
        var actor = $gameActors.actor(actorId);
        if (actor.isDirty() || this._dirty || this._lastActorId != actorId) {
          this._lastActorId = actorId;
          this.redrawActorImage();
        }
      }
    };
    var _Sprite_Picture_prototype_loadBitmap =
      Sprite_Picture.prototype.loadBitmap;
    Sprite_Picture.prototype.loadBitmap = function () {
      var picture = this.picture();
      this.removeChildren();
      if (picture && picture.tachieActorId !== 0) {
        //this.bitmap = $gameTemp.getPictureBitmapCache($gameScreen.getPictureId(picture));
        this.redrawActorImage();
      } else {
        _Sprite_Picture_prototype_loadBitmap.call(this);
      }
    };
    Sprite_Picture.prototype.redrawActorImage = function () {
      var picture = this.picture();
      if (!picture) {
        return;
      }
      var actorId = picture.tachieActorId;
      if (actorId === 0) {
        return;
      }
      if ($gameSystem.chokyoActorId() == actorId && $gameSystem.inChokyo()) {
        return;
      }
      if (this.lastDrawnActorId !== actorId) {
        this.removeChildren();
      }
      if ($gameSystem.isEroEvent()) {
        this.removeChildren();
        return;
      }
      var actor = $gameActors.actor(actorId);
      var success = this.drawTachie(actorId, null, 0, 0, null, 0, 1, true);
      this._dirty = !success;
    };
  })((Tachie = Nore.Tachie || (Nore.Tachie = {})));
})(Nore || (Nore = {}));
var _TouchInput_clear = TouchInput.clear;
TouchInput.clear = function () {
  _TouchInput_clear.call(this);
  this.rightButton = false;
  this.rightButtonCount = 0;
};
TouchInput._onRightButtonDown = function (event) {
  var x = Graphics.pageToCanvasX(event.pageX);
  var y = Graphics.pageToCanvasY(event.pageY);
  if (Graphics.isInsideCanvas(x, y)) {
    this._onCancel(x, y);
    this.rightButtonCount = this.rightButtonCount || 0;
    this.rightButtonCount++;
  }
};
var _TouchInput_update = TouchInput.update;
TouchInput.update = function () {
  _TouchInput_update.call(this);
  if (this.rightButtonCount > 0) {
    this.rightButtonCount++;
    if (this.rightButtonCount > 5) {
      this.rightButton = true;
    }
  }
};
function isSkipKey() {
  return (
    Input.isPressed("control") ||
    TouchInput.rightButton ||
    Input.isPressed("shift")
  );
}
var _Window_Message_prototype_updateWait = Window_Message.prototype.updateWait;
Window_Message.prototype.updateWait = function () {
  if (isSkipKey()) {
    this._waitCount = 0;
  }
  return _Window_Message_prototype_updateWait.call(this);
};
var _Window_Message_prototype_isTriggered =
  Window_Message.prototype.isTriggered;
Window_Message.prototype.isTriggered = function () {
  if (isSkipKey()) {
    return true;
  }
  return _Window_Message_prototype_isTriggered.call(this);
};
var _TouchInput_onMouseUp = TouchInput._onMouseUp;
TouchInput._onMouseUp = function (event) {
  if (event.button == 2) {
    this.rightButton = false;
    this.rightButtonCount = 0;
  }
  _TouchInput_onMouseUp.call(this, event);
};
Window_Message.prototype.updateBackOpacity = function () {
  this.backOpacity = 255;
};
Window_Base.prototype.updateOpen = function () {
  if (this._opening) {
    this.openness += 32;
    if (isSkipKey()) {
      this.openness += 256;
    }
    if (this.isOpen()) {
      this._opening = false;
    }
  }
};
Window_Base.prototype.updateClose = function () {
  if (this._closing) {
    this.openness -= 32;
    if (isSkipKey()) {
      this.openness = 0;
    }
    if (this.isClosed()) {
      this._closing = false;
    }
  }
};
