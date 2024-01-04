//=============================================================================
// Nore_TesValidator.js
//=============================================================================
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//=============================================================================
/*:ja
 * @target MZ
 * @author ル
 * @plugindesc  Nore_Tes の文法チェックスクリプトです。
 * @url https://ci-en.dlsite.com/creator/276
 *
 * @help
 * ver 0.1.0
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
  var Tes;
  (function (Tes) {
    Tes.validates = {};
    var NumericValidator = /** @class */ (function () {
      function NumericValidator(_lowerLimit, _upperLimit, _type) {
        this._lowerLimit = _lowerLimit;
        this._upperLimit = _upperLimit;
        this._type = _type;
      }
      NumericValidator.prototype.validate = function (
        context,
        paramName,
        value
      ) {
        if (this._type && context.headerStr(this._type) === "const") {
          return;
        }
        if (value === undefined) {
          return;
        }
        var num = parseInt(value);
        if (isNaN(num)) {
          context.error(
            "param: " +
              paramName +
              " \u306E\u578B\u304C\u305F\u3060\u3057\u304F\u3042\u308A\u307E\u305B\u3093\u3002\u5FC5\u8981\u306A\u3082\u306E: number\u3002\u8A2D\u5B9A\u3055\u308C\u305F\u3082\u306E: " +
              value
          );
          return;
        }
        if (this._lowerLimit == null) {
          return;
        }
        if (this._lowerLimit > num) {
          context.error(
            "param: " +
              paramName +
              " \u306E\u5024\u304C\u305F\u3060\u3057\u304F\u3042\u308A\u307E\u305B\u3093\u3002\u6700\u4F4E\u5024: " +
              this._lowerLimit +
              "\u3002\u8A2D\u5B9A\u3055\u308C\u305F\u3082\u306E: " +
              value
          );
        }
        if (this._upperLimit == null) {
          return;
        }
        if (this._upperLimit < num) {
          context.error(
            "param: " +
              paramName +
              " \u306E\u5024\u304C\u305F\u3060\u3057\u304F\u3042\u308A\u307E\u305B\u3093\u3002\u6700\u5927\u5024: " +
              this._upperLimit +
              "\u3002\u8A2D\u5B9A\u3055\u308C\u305F\u3082\u306E: " +
              value
          );
        }
      };
      NumericValidator.prototype.priority = function () {
        return 10;
      };
      return NumericValidator;
    })();
    Tes.NumericValidator = NumericValidator;
    var NotEmptyValidator = /** @class */ (function () {
      function NotEmptyValidator() {}
      NotEmptyValidator.prototype.validate = function (
        context,
        paramName,
        value
      ) {
        if (value == null) {
          context.error(
            "param: " + paramName + " \u306F\u5FC5\u9808\u3067\u3059\u3002"
          );
        }
      };
      NotEmptyValidator.prototype.priority = function () {
        return 20;
      };
      return NotEmptyValidator;
    })();
    Tes.NotEmptyValidator = NotEmptyValidator;
    var NumericParamValidator = /** @class */ (function () {
      function NumericParamValidator(_target) {
        this._target = _target;
      }
      NumericParamValidator.prototype.validate = function (
        context,
        paramName,
        value
      ) {
        if (value === undefined) {
          return;
        }
        var num = parseInt(value);
        if (isNaN(num)) {
          context.error(
            "param: " +
              paramName +
              " \u306E\u578B\u304C\u305F\u3060\u3057\u304F\u3042\u308A\u307E\u305B\u3093\u3002\u5FC5\u8981\u306A\u3082\u306E: number\u3002\u8A2D\u5B9A\u3055\u308C\u305F\u3082\u306E: " +
              value
          );
          return;
        }
        var target = context.headerInt(this._target);
        if (target > num) {
          context.error(
            "param: " +
              paramName +
              " \u306E\u5024\u304C\u305F\u3060\u3057\u304F\u3042\u308A\u307E\u305B\u3093\u3002\u6700\u4F4E\u5024: " +
              this._target +
              "\u3002\u8A2D\u5B9A\u3055\u308C\u305F\u3082\u306E: " +
              value
          );
        }
      };
      NumericParamValidator.prototype.priority = function () {
        return 0;
      };
      return NumericParamValidator;
    })();
    Tes.NumericParamValidator = NumericParamValidator;
    var ListValidator = /** @class */ (function () {
      function ListValidator(_target) {
        this._target = _target;
      }
      ListValidator.prototype.validate = function (context, paramName, value) {
        if (value === undefined) {
          return;
        }
        if (this._target.indexOf(value) === -1) {
          context.error(
            "param: " +
              paramName +
              " \u306E\u5024\u304C\u305F\u3060\u3057\u304F\u3042\u308A\u307E\u305B\u3093\u3002\u5FC5\u8981\u5024: " +
              JSON.stringify(this._target) +
              "\u3002\u8A2D\u5B9A\u3055\u308C\u305F\u3082\u306E: " +
              value
          );
        }
      };
      ListValidator.prototype.priority = function () {
        return 5;
      };
      return ListValidator;
    })();
    Tes.ListValidator = ListValidator;
    var RegExpValidator = /** @class */ (function () {
      function RegExpValidator(_target) {
        this._target = _target;
      }
      RegExpValidator.prototype.validate = function (
        context,
        paramName,
        value
      ) {
        if (value === undefined) {
          return;
        }
        if (!this._target.exec(value)) {
          context.error(
            "param: " +
              paramName +
              " \u306E\u5024\u304C\u305F\u3060\u3057\u304F\u3042\u308A\u307E\u305B\u3093\u3002\u8A2D\u5B9A\u3055\u308C\u305F\u3082\u306E: " +
              value
          );
        }
      };
      RegExpValidator.prototype.priority = function () {
        return 5;
      };
      return RegExpValidator;
    })();
    Tes.RegExpValidator = RegExpValidator;
    var VarValidator = /** @class */ (function () {
      function VarValidator(_target) {
        this._target = _target;
      }
      VarValidator.prototype.validate = function (context, paramName, value) {
        if (value === undefined) {
          return;
        }
        var ret = this._target.exec(value);
        if (!ret) {
          context.error(
            "param: " +
              paramName +
              " \u306E\u5024\u304C\u305F\u3060\u3057\u304F\u3042\u308A\u307E\u305B\u3093\u3002\u8A2D\u5B9A\u3055\u308C\u305F\u3082\u306E: " +
              value
          );
        }
        var vId = parseInt(ret[2]);
        if (vId < 1) {
          context.error(
            "param: " +
              paramName +
              " \u306E\u5024\u304C\u305F\u3060\u3057\u304F\u3042\u308A\u307E\u305B\u3093\u3002\u6700\u4F4E\u5024: " +
              1 +
              "\u3002\u8A2D\u5B9A\u3055\u308C\u305F\u3082\u306E: " +
              vId
          );
        }
      };
      VarValidator.prototype.priority = function () {
        return 5;
      };
      return VarValidator;
    })();
    Tes.VarValidator = VarValidator;
    var VarValidator2 = /** @class */ (function () {
      function VarValidator2(_type) {
        this._type = _type;
      }
      VarValidator2.prototype.validate = function (context, paramName, value) {
        if (value === undefined) {
          return;
        }
        if (this._type && context.headerStr(this._type) !== "var") {
          return;
        }
        var num = parseInt(value);
        if (isNaN(num)) {
          context.error(
            "param: " +
              paramName +
              " \u306E\u578B\u304C\u305F\u3060\u3057\u304F\u3042\u308A\u307E\u305B\u3093\u3002\u5FC5\u8981\u306A\u3082\u306E: number\u3002\u8A2D\u5B9A\u3055\u308C\u305F\u3082\u306E: " +
              value
          );
          return;
        }
        var lowerLimit = 1;
        if (lowerLimit > num) {
          context.error(
            "param: " +
              paramName +
              " \u306E\u5024\u304C\u305F\u3060\u3057\u304F\u3042\u308A\u307E\u305B\u3093\u3002\u6700\u4F4E\u5024: " +
              lowerLimit +
              "\u3002\u8A2D\u5B9A\u3055\u308C\u305F\u3082\u306E: " +
              value
          );
        }
      };
      VarValidator2.prototype.priority = function () {
        return 5;
      };
      return VarValidator2;
    })();
    Tes.VarValidator2 = VarValidator2;
    Tes.isNumeric = function (lowerLimit, upperLimit, type) {
      return new NumericValidator(lowerLimit, upperLimit, type);
    };
    Tes.isNumericParam = function (paramName) {
      return new NumericParamValidator(paramName);
    };
    Tes.notEmpty = function () {
      return new NotEmptyValidator();
    };
    Tes.list = function () {
      var arg = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        arg[_i] = arguments[_i];
      }
      return new ListValidator(arg);
    };
    Tes.isBool = function () {
      return new ListValidator(["true", "false"]);
    };
    Tes.regCheck = function (reg) {
      return new RegExpValidator(reg);
    };
    Tes.varCheck = function (reg) {
      return new VarValidator(reg);
    };
    Tes.varCheck2 = function (str) {
      return new VarValidator2(str);
    };
    Tes.validates[""] = {};
    Tes.validates["n1"] = {
      index: Tes.isNumeric(0),
      back: Tes.list("0", "1", "2"),
      pos: Tes.list("0", "1", "2"),
    };
    for (var i = 2; i <= 99; i++) {
      Tes.validates["n" + i] = Tes.validates["n1"];
    }
    Tes.validates["m1"] = {
      index: Tes.isNumeric(0),
    };
    for (var i = 2; i <= 99; i++) {
      Tes.validates["m" + i] = Tes.validates["m1"];
    }
    Tes.validates["mob1"] = {
      name: Tes.notEmpty(),
    };
    for (var i = 2; i <= 99; i++) {
      Tes.validates["mob" + i] = Tes.validates["mob1"];
    }
    Tes.validates["messages"] = {};
    Tes.validates["normal_messages"] = {};
    Tes.validates["not_close"] = {
      flag: Tes.list("on", "off"),
    };
    Tes.validates["return"] = {};
    Tes.validates["hide_window"] = {};
    Tes.validates["event_break"] = {};
    Tes.validates["start"] = {};
    Tes.validates["hide"] = {};
    Tes.validates["else"] = {};
    Tes.validates["loop"] = {};
    Tes.validates["loop_end"] = {};
    Tes.validates["loop_break"] = {};
    Tes.validates["return"] = {};
    Tes.validates["hide_left"] = {};
    Tes.validates["hide_right"] = {};
    Tes.validates["hide_center"] = {};
    Tes.validates["color"] = {};
    Tes.validates["default_pos"] = {
      actor: [Tes.notEmpty(), Tes.isNumeric(1)],
      position: Tes.list("right", "left", "center"),
    };
    Tes.validates["turn_left"] = {
      event: [Tes.isNumeric(-1)],
      skip: Tes.isBool(),
      wait: Tes.isBool(),
    };
    Tes.validates["turn_up"] =
      Tes.validates["turn_down"] =
      Tes.validates["turn_right"] =
        Tes.validates["turn_left"];
    Tes.validates["move_up"] =
      Tes.validates["move_down"] =
      Tes.validates["move_right"] =
      Tes.validates["move_left"] =
        Tes.validates["turn_left"];
    Tes.validates["step_anime_on"] = Tes.validates["step_anime_off"] =
      Tes.validates["turn_left"];
    Tes.validates["end"] = {};
    Tes.validates["end_else"] = {};
    Tes.validates["vehicle"] = {};
    Tes.validates["choice_end"] = {};
    Tes.validates["choice_cancel"] = {};
    Tes.validates["input_num"] = {
      var: [Tes.isNumeric(1), Tes.notEmpty()],
      num: Tes.isNumeric(1, 9),
    };
    Tes.validates["choice_item"] = {
      var: [Tes.isNumeric(1), Tes.notEmpty()],
      type: Tes.isNumeric(1),
    };
    Tes.validates["scroll_h"] = {
      speed: [Tes.isNumeric(1, 8), Tes.notEmpty()],
      noSkip: Tes.isBool(),
    };
    Tes.validates["menu_open"] = {};
    Tes.validates["save_open"] = {};
    Tes.validates["gameover"] = {};
    Tes.validates["title_return"] = {};
    Tes.validates["fadein"] = {};
    Tes.validates["fadeout"] = {};
    Tes.validates["eroUp"] = {};
    Tes.validates["stop_se"] = {};
    Tes.validates["message_h"] = {
      index: Tes.isNumeric(0, 7),
      back: Tes.isNumeric(0, 2),
      pos: Tes.isNumeric(0, 29),
    };
    Tes.validates["message"] = {
      value: Tes.notEmpty(),
    };
    Tes.validates["choice_h"] = {
      cancel: Tes.isNumeric(-2, 7),
    };
    Tes.validates["choice_if"] = {
      index: [Tes.notEmpty(), Tes.isNumeric(1, 6)],
    };
    Tes.validates["input_num"] = {
      var: [Tes.notEmpty(), Tes.isNumeric(1)],
      num: [Tes.notEmpty(), Tes.isNumeric(1, 8)],
    };
    Tes.validates["choice_item"] = {
      var: [Tes.notEmpty(), Tes.isNumeric(1)],
    };
    Tes.validates["map_move"] = {
      type: Tes.list("const", "var"),
      map: [Tes.notEmpty(), Tes.isNumeric(1)],
      x: [Tes.notEmpty(), Tes.isNumeric(0), Tes.varCheck2("type")],
      y: [Tes.notEmpty(), Tes.isNumeric(0), Tes.varCheck2("type")],
      direction: Tes.list(
        "0",
        "2",
        "4",
        "6",
        "8",
        "left",
        "right",
        "up",
        "down"
      ),
      fade: Tes.list("0", "1", "2", "black", "white", "none"),
    };
    Tes.validates["vehicle_pos"] = {
      vehicle: [Tes.notEmpty(), Tes.isNumeric(0, 2)],
      type: Tes.list("const", "var"),
      map: [Tes.notEmpty(), Tes.isNumeric(1)],
      x: [Tes.notEmpty(), Tes.isNumeric(0), Tes.varCheck2("type")],
      y: [Tes.notEmpty(), Tes.isNumeric(0), Tes.varCheck2("type")],
    };
    Tes.validates["event_pos"] = {
      id: [Tes.notEmpty(), Tes.isNumeric(-1)],
      type: Tes.list("const", "var", "target"),
      x: [Tes.notEmpty(), Tes.isNumeric(0), Tes.varCheck2("type")],
      y: [Tes.notEmpty(), Tes.isNumeric(0), Tes.varCheck2("type")],
      direction: Tes.list(
        "0",
        "2",
        "4",
        "6",
        "8",
        "left",
        "right",
        "up",
        "down"
      ),
    };
    Tes.validates["scroll_map"] = {
      direction: [
        Tes.notEmpty(),
        Tes.list("2", "4", "6", "8", "left", "right", "up", "down"),
      ],
      num: [Tes.notEmpty(), Tes.isNumeric(0, 100)],
      speed: [Tes.isNumeric(1, 6)],
    };
    Tes.validates["scroll_h"] = {
      speed: [Tes.notEmpty(), Tes.isNumeric(1, 8)],
      noskip: Tes.isBool(),
    };
    Tes.validates["scroll"] = {
      value: Tes.notEmpty(),
    };
    Tes.validates["if_sw"] = {
      id: [Tes.notEmpty(), Tes.isNumeric(1)],
      flag: Tes.list("on", "off"),
    };
    Tes.validates["if_var"] = {
      id: [Tes.notEmpty(), Tes.isNumeric(1)],
      value: [Tes.notEmpty(), Tes.regCheck(/^[-+]{0,1}(var\.){0,1}\d+$/)],
      op: Tes.list("=", ">=", "<=", ">", "<", "><"),
    };
    Tes.validates["if_self_sw"] = {
      id: [Tes.notEmpty(), Tes.list("A", "B", "C", "D")],
      flag: Tes.list("on", "off"),
    };
    Tes.validates["if_timer"] = {
      time: [Tes.notEmpty(), Tes.isNumeric(0, 5999)],
      op: Tes.list(">=", "<="),
    };
    Tes.validates["if_actor"] = {
      id: [Tes.notEmpty(), Tes.isNumeric(1)],
      type: Tes.list(
        "party",
        "name",
        "class",
        "skill",
        "weapon",
        "armor",
        "state"
      ),
    };
    Tes.validates["if_enemy"] = {
      enemy: [Tes.notEmpty(), Tes.isNumeric(1)],
      type: Tes.list("visible", "state"),
      value: Tes.isNumeric(1),
    };
    Tes.validates["if_character"] = {
      id: [Tes.notEmpty(), Tes.isNumeric(-1)],
      direction: [
        Tes.notEmpty(),
        Tes.list("2", "4", "6", "8", "left", "right", "up", "down"),
      ],
    };
    Tes.validates["if_vehicle"] = {
      vehicle: [Tes.notEmpty(), Tes.isNumeric(0, 2)],
    };
    Tes.validates["if_money"] = {
      money: [Tes.notEmpty(), Tes.isNumeric(0)],
      op: Tes.list(">=", "<=", "<"),
    };
    Tes.validates["if_item"] = {
      id: [Tes.notEmpty(), Tes.isNumeric(1)],
    };
    Tes.validates["if_weapon"] = {
      id: [Tes.notEmpty(), Tes.isNumeric(1)],
      equip: Tes.isBool(),
    };
    Tes.validates["if_armor"] = {
      id: [Tes.notEmpty(), Tes.isNumeric(1)],
      equip: Tes.isBool(),
    };
    Tes.validates["if_button"] = {
      button: [
        Tes.notEmpty(),
        Tes.list(
          "2",
          "4",
          "6",
          "8",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "down",
          "left",
          "right",
          "up",
          "A",
          "B",
          "C",
          "X",
          "Y",
          "Z",
          "L",
          "R"
        ),
      ],
    };
    Tes.validates["if_script"] = {
      script: Tes.notEmpty(),
    };
    Tes.validates["common"] = {
      id: [Tes.notEmpty(), Tes.isNumeric(1)],
    };
    Tes.validates["label"] = {
      value: Tes.notEmpty(),
    };
    Tes.validates["label_jump"] = {
      value: Tes.notEmpty(),
    };
    Tes.validates["money"] = {
      value: Tes.notEmpty(),
    };
    Tes.validates["item"] = {
      id: [Tes.notEmpty(), Tes.isNumeric(1)],
      value: Tes.notEmpty(),
    };
    Tes.validates["weapon"] = {
      id: [Tes.notEmpty(), Tes.isNumeric(1)],
      value: Tes.notEmpty(),
      equip: Tes.isBool(),
    };
    Tes.validates["armor"] = {
      id: [Tes.notEmpty(), Tes.isNumeric(1)],
      value: Tes.notEmpty(),
      equip: Tes.isBool(),
    };
    Tes.validates["common"] = {
      id: [Tes.notEmpty(), Tes.isNumeric(1)],
    };
    Tes.validates["sw"] = {
      id: [Tes.notEmpty(), Tes.isNumeric(1)],
      end: Tes.isNumericParam("id"),
      flag: [Tes.notEmpty(), Tes.list("on", "off")],
    };
    Tes.validates["var"] = {
      id: [Tes.notEmpty(), Tes.isNumeric(1)],
      end: Tes.isNumericParam("id"),
      op: [Tes.notEmpty(), Tes.list("=", "+", "-", "*", "/", "%")],
      value: [Tes.notEmpty(), Tes.regCheck(/^[-+]{0,1}(var\.){0,1}\d+$/)],
    };
    Tes.validates["self_sw"] = {
      id: [Tes.notEmpty(), Tes.list("A", "B", "C", "D")],
      flag: [Tes.notEmpty(), Tes.list("on", "off")],
    };
    Tes.validates["timer"] = {
      flag: [Tes.notEmpty(), Tes.list("on", "off")],
      time: Tes.isNumeric(1, 5999),
    };
    Tes.validates["save_disable"] = {
      flag: Tes.isBool(),
    };
    Tes.validates["menu_disable"] = {
      flag: Tes.isBool(),
    };
    Tes.validates["encount_disable"] = {
      flag: Tes.isBool(),
    };
    Tes.validates["formation_disable"] = {
      flag: Tes.isBool(),
    };
    Tes.validates["transparent"] = {
      flag: Tes.isBool(),
    };
    Tes.validates["followers"] = {
      flag: Tes.isBool(),
    };
    Tes.validates["gather"] = {};
    Tes.validates["erace"] = {};
    Tes.validates["save_bgm"] = {};
    Tes.validates["resume_bgm"] = {};
    Tes.validates["anime"] = {
      target: [Tes.notEmpty(), Tes.isNumeric(-1)],
      anime: [Tes.notEmpty(), Tes.isNumeric(1)],
      wait: Tes.isBool(),
    };
    Tes.validates["route_h"] = {
      event: [Tes.notEmpty(), Tes.isNumeric(-1)],
      repeat: Tes.isBool(),
      skip: Tes.isBool(),
      wait: Tes.isBool(),
    };
    Tes.validates["route"] = {};
    Tes.validates["balloon"] = {
      target: [Tes.notEmpty(), Tes.isNumeric(-1)],
      balloon: [Tes.notEmpty(), Tes.isNumeric(1)],
      wait: [Tes.isBool()],
    };
    Tes.validates["tone"] = {
      red: Tes.isNumeric(-255, 255),
      green: Tes.isNumeric(-255, 255),
      blue: Tes.isNumeric(-255, 255),
      gray: Tes.isNumeric(0, 255),
      time: Tes.isNumeric(1, 600),
      wait: Tes.isBool(),
    };
    Tes.validates["flash"] = {
      red: Tes.isNumeric(0, 255),
      green: Tes.isNumeric(0, 255),
      blue: Tes.isNumeric(0, 255),
      strength: Tes.isNumeric(0, 255),
      time: Tes.isNumeric(1, 600),
      wait: Tes.isBool(),
    };
    Tes.validates["shake"] = {
      strength: Tes.isNumeric(1, 9),
      speed: Tes.isNumeric(1, 9),
      time: Tes.isNumeric(1, 600),
      wait: Tes.isBool(),
    };
    Tes.validates["wait"] = {
      time: Tes.isNumeric(1, 999),
    };
    Tes.validates["picture"] = {
      layer: [Tes.notEmpty(), Tes.isNumeric(1, 100)],
      file: Tes.notEmpty(),
      origin: Tes.list("ul", "center"),
      type: Tes.list("const", "var"),
      x: [
        Tes.notEmpty(),
        Tes.isNumeric(-9999, 9999, "type"),
        Tes.varCheck2("type"),
      ],
      y: [
        Tes.notEmpty(),
        Tes.isNumeric(-9999, 9999, "type"),
        Tes.varCheck2("type"),
      ],
      zoom_x: Tes.isNumeric(0, 2000),
      zoom_y: Tes.isNumeric(0, 2000),
      transparent: Tes.isNumeric(0, 255),
      blend: Tes.isNumeric(0, 2),
    };
    Tes.validates["picture_move"] = {
      layer: [Tes.notEmpty(), Tes.isNumeric(1, 100)],
      origin: [Tes.list("ul", "center")],
      type: [Tes.list("const", "var")],
      x: [Tes.notEmpty(), Tes.isNumeric(-9999, 9999)],
      y: [Tes.notEmpty(), Tes.isNumeric(-9999, 9999)],
      zoom_x: Tes.isNumeric(0, 2000),
      zoom_y: Tes.isNumeric(0, 2000),
      transparent: Tes.isNumeric(0, 255),
      blend: Tes.isNumeric(0, 2),
      time: Tes.isNumeric(1, 600),
      wait: Tes.isBool(),
    };
    Tes.validates["picture_rotation"] = {
      layer: [Tes.notEmpty(), Tes.isNumeric(1, 100)],
      speed: Tes.isNumeric(-90, 90),
    };
    Tes.validates["picture_tone"] = {
      layer: [Tes.notEmpty(), Tes.isNumeric(1, 100)],
      red: Tes.isNumeric(-255, 255),
      green: Tes.isNumeric(-255, 255),
      blue: Tes.isNumeric(-255, 255),
      gray: Tes.isNumeric(0, 255),
      time: Tes.isNumeric(1, 600),
      wait: Tes.isBool(),
    };
    Tes.validates["picture_erace"] = {
      layer: [Tes.notEmpty(), Tes.isNumeric(1, 100)],
    };
    Tes.validates["weather"] = {
      weather: Tes.list("none", "rain", "storm", "snow"),
      strength: Tes.isNumeric(1, 9),
      time: Tes.isNumeric(0, 600),
      wait: Tes.isBool(),
    };
    Tes.validates["bgm"] = {
      volume: Tes.isNumeric(0, 100),
      pitch: Tes.isNumeric(50, 150),
      pan: Tes.isNumeric(-100, 100),
    };
    Tes.validates["fadeout_bgm"] = {
      time: Tes.isNumeric(1, 60),
    };
    Tes.validates["bgs"] = {
      volume: Tes.isNumeric(0, 100),
      pitch: Tes.isNumeric(50, 150),
      pan: Tes.isNumeric(-100, 100),
    };
    Tes.validates["fadeout_bgs"] = {
      time: Tes.isNumeric(1, 60),
    };
    Tes.validates["me"] = {
      volume: Tes.isNumeric(0, 100),
      pitch: Tes.isNumeric(50, 150),
      pan: Tes.isNumeric(-100, 100),
    };
    Tes.validates["se"] = {
      volume: Tes.isNumeric(0, 100),
      pitch: Tes.isNumeric(50, 150),
      pan: Tes.isNumeric(-100, 100),
    };
    Tes.validates["movie"] = {
      file: Tes.notEmpty(),
    };
    Tes.validates["all_recovery"] = {
      actor: [
        Tes.notEmpty(),
        Tes.regCheck(/^[+]{0,1}(var\.){0,1}\d+$/),
        Tes.varCheck(/^[+]{0,1}(var\.){0,1}(\d+)$/),
      ],
    };
    Tes.validates["exp"] = {
      actor: [
        Tes.notEmpty(),
        Tes.regCheck(/^[+]{0,1}(var\.){0,1}\d+$/),
        Tes.varCheck(/^[+]{0,1}(var\.){0,1}(\d+)$/),
      ],
      value: [
        Tes.notEmpty(),
        Tes.regCheck(/^[-+]{0,1}(var\.){0,1}\d+$/),
        Tes.varCheck(/^[-+]{0,1}(var\.){0,1}(\d+)$/),
      ],
      message: Tes.isBool(),
    };
    Tes.validates["level"] = {
      actor: [
        Tes.notEmpty(),
        Tes.regCheck(/^[+]{0,1}(var\.){0,1}\d+$/),
        Tes.varCheck(/^[+]{0,1}(var\.){0,1}(\d+)$/),
      ],
      value: [
        Tes.notEmpty(),
        Tes.regCheck(/^[-+]{0,1}(var\.){0,1}\d+$/),
        Tes.varCheck(/^[-+]{0,1}(var\.){0,1}(\d+)$/),
      ],
      message: Tes.isBool(),
    };
    Tes.validates["capability"] = {
      actor: [
        Tes.notEmpty(),
        Tes.regCheck(/^[+]{0,1}(var\.){0,1}\d+$/),
        Tes.varCheck(/^[+]{0,1}(var\.){0,1}(\d+)$/),
      ],
      capability: [
        Tes.notEmpty(),
        Tes.list(
          "0",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "maxhp",
          "maxmp",
          "atk",
          "def",
          "matk",
          "mdef",
          "agi",
          "luk"
        ),
      ],
      value: [
        Tes.notEmpty(),
        Tes.regCheck(/^[-+]{0,1}(var\.){0,1}\d+$/),
        Tes.varCheck(/^[-+]{0,1}(var\.){0,1}(\d+)$/),
      ],
    };
    Tes.validates["skill"] = {
      actor: [
        Tes.notEmpty(),
        Tes.regCheck(/^[+]{0,1}(var\.){0,1}\d+$/),
        Tes.varCheck(/^[+]{0,1}(var\.){0,1}(\d+)$/),
      ],
      value: [Tes.notEmpty(), Tes.isNumeric(0)],
    };
    Tes.validates["equip"] = {
      actor: [Tes.notEmpty(), Tes.isNumeric(1)],
      part: [Tes.notEmpty(), Tes.isNumeric(0, 4)],
      id: [Tes.notEmpty(), Tes.isNumeric(0)],
    };
    Tes.validates["name"] = {
      actor: [Tes.notEmpty(), Tes.isNumeric(1)],
      value: Tes.notEmpty(),
    };
    Tes.validates["class"] = {
      actor: [Tes.notEmpty(), Tes.isNumeric(1)],
      value: [Tes.notEmpty(), Tes.isNumeric(1)],
    };
    Tes.validates["nickname"] = {
      actor: [Tes.notEmpty(), Tes.isNumeric(1)],
      value: Tes.notEmpty(),
    };
    Tes.validates["plugin"] = {
      name: Tes.notEmpty(),
      command: Tes.notEmpty(),
      args: Tes.notEmpty(),
    };
  })((Tes = Nore.Tes || (Nore.Tes = {})));
})(Nore || (Nore = {}));
