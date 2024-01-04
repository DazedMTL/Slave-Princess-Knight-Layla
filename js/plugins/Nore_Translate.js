/*:ja
 * @target MZ
 * @author ル
 *
 * @command toTsv
 * @text TSV作成
 *
 * @command toTxt
 * @text en_txt作成
 *
 * @command toJson
 * @text en_json作成
 */
var Nore;
(function (Nore) {
  var pluginName = "Nore_Translate";
  PluginManager.registerCommand(pluginName, "toTsv", function (args) {
    var converter = new Scenario_Translator();
    converter.convertAll();
    SoundManager.playSave();
  });
  PluginManager.registerCommand(pluginName, "toTxt", function (args) {
    var converter = new Scenario_TranslatorToText();
    converter.convertAll();
    SoundManager.playSave();
  });
  PluginManager.registerCommand(pluginName, "toJson", function (args) {
    var converter = new Nore.Tes.Scenario_Converter(false);
    converter.convertAll();
    SoundManager.playSave();
  });
  var fs;
  var path;
  if (Utils.isNwjs()) {
    fs = require("fs");
    path = require("path");
  }
  var parameters = PluginManager.parameters("Nore_Tes");
  var pathParam = parameters["scenarioFolder"];
  var SCENARIO_FOLDER_NAME = "translate";
  Nore.MAIN_FOLDERS = [
    "イベント",
    "説明",
    "エロ",
    "体験版範囲",
    "晒し者イベント",
    "ヤリ部屋",
    "拠点",
    "肉便器共通",
    "シャルル",
    "ターニャ",
    "サラ",
    "ディーナ",
    "ネル",
    "リン",
    "アイリス",
    "レイラ",
  ];
  Nore.SCENARIO_SRC_PATH = (function () {
    var p = window.location.pathname.replace(/(\/www|)\/[^\/]*$/, pathParam);
    if (p.match(/^\/([A-Z]\:)/)) {
      p = p.slice(1);
    }
    var result = decodeURIComponent(p);
    if (result[0] == "/") {
      return "." + result;
    }
    return result;
  })();
  Nore.SCENARIO_EN_SRC_PATH = (function () {
    var p = window.location.pathname.replace(
      /(\/www|)\/[^\/]*$/,
      "../scenario_en/"
    );
    if (p.match(/^\/([A-Z]\:)/)) {
      p = p.slice(1);
    }
    var result = decodeURIComponent(p);
    if (result[0] == "/") {
      return "." + result;
    }
    return result;
  })();
  Nore.CSV_SRC_PATH = (function () {
    var p = window.location.pathname.replace(/(\/www|)\/[^\/]*$/, "../csv/");
    if (p.match(/^\/([A-Z]\:)/)) {
      p = p.slice(1);
    }
    var result = decodeURIComponent(p);
    if (result[0] == "/") {
      return "." + result;
    }
    return result;
  })();
  var DATA_PATH = (function () {
    var p = window.location.pathname.replace(
      /(\/www|)\/[^\/]*$/,
      "/" + SCENARIO_FOLDER_NAME + "/"
    );
    if (p.match(/^\/([A-Z]\:)/)) {
      p = p.slice(1);
    }
    var result = decodeURIComponent(p);
    if (result[0] == "/") {
      return "." + result;
    }
    return result;
  })();
  var CsvFolder = /** @class */ (function () {
    function CsvFolder(name, parent) {
      this._files = [];
      this._name = name;
      this._parent = parent;
    }
    CsvFolder.prototype.pushCsv = function (csv) {
      this._files.push(csv);
    };
    CsvFolder.prototype.files = function () {
      return this._files;
    };
    CsvFolder.prototype.totalName = function () {
      var parentName = "";
      if (this._parent) {
        parentName = this._parent.totalName() + "_";
      }
      return parentName + this.name();
    };
    CsvFolder.prototype.name = function () {
      var list = this._name.split("/");
      var name1 = list[list.length - 1];
      if (name1.length == 0 && list.length > 1) {
        name1 = list[list.length - 2];
      }
      var list2 = name1.split("\\");
      var name2 = list2[list2.length - 1];
      if (name2.length == 0 && list2.length > 1) {
        name2 = list2[list2.length - 2];
      }
      return name2;
    };
    CsvFolder.prototype.isEmpty = function () {
      return this._files.length == 0;
    };
    return CsvFolder;
  })();
  var Csv = /** @class */ (function () {
    function Csv(file) {
      this.lines = [];
      this.file = file;
    }
    Csv.prototype.pushBlank = function () {
      this.lines.push(new Line());
    };
    Csv.prototype.pushSystem = function (str) {
      var line = new Line();
      line.setSystem(str);
      this.lines.push(line);
    };
    Csv.prototype.pushJapanese = function (str) {
      str = this.convertName(str);
      var last = this.lastLine();
      if (last && last.isJapanese()) {
        last.pushJapanese(str);
        return;
      }
      var line = new Line();
      line.setJapanese(str);
      this.lines.push(line);
    };
    Csv.prototype.convertName = function (str) {
      str = str.replace("ゴブリン", "goblin");
      for (var i = 1; i <= 20; i++) {
        if (i == 13) {
          continue;
        }
        if (i == 15) {
          continue;
        }
        var actor = $gameActors.actor(i);
        str = str.replace(actor.nameJp(), actor.nameEn());
      }
      return str;
    };
    Csv.prototype.lastLine = function () {
      if (this.lines.length == 0) {
        return 0;
      }
      return this.lines[this.lines.length - 1];
    };
    Csv.prototype.write = function (lineNumber) {
      var text = this.file;
      text += "\n";
      lineNumber++;
      for (var _i = 0, _a = this.lines; _i < _a.length; _i++) {
        var line = _a[_i];
        text += line.write(lineNumber);
        text += "\n";
        lineNumber++;
      }
      text += "\n";
      lineNumber++;
      return new WriteResult(text, lineNumber);
    };
    return Csv;
  })();
  var WriteResult = /** @class */ (function () {
    function WriteResult(t, l) {
      this.texts = t;
      this.lineNumber = l;
    }
    return WriteResult;
  })();
  var Line = /** @class */ (function () {
    function Line() {}
    Line.prototype.setSystem = function (str) {
      this.system = str;
    };
    Line.prototype.setJapanese = function (str) {
      this.japanese = str;
    };
    Line.prototype.separator = function () {
      //return ',';
      return "\t";
    };
    Line.prototype.write = function (lineNumber) {
      var text = this.separator();
      if (this.system) {
        text += this.system;
      } else {
        text += "";
      }
      text += this.separator();
      if (this.japanese) {
        text += this.japanese;
        text += this.writeCommand(lineNumber);
      } else {
        text += "";
      }
      return text;
    };
    Line.prototype.writeCommand = function (lineNumber) {
      return "\t" + '=GOOGLETRANSLATE(C%1,"ja","en")'.format(lineNumber);
    };
    Line.prototype.isJapanese = function () {
      return this.japanese != null;
    };
    Line.prototype.pushJapanese = function (str) {
      this.japanese += str;
    };
    return Line;
  })();
  var Scenario_Translator = /** @class */ (function () {
    function Scenario_Translator() {}
    /**
     * 全てのイベントを変換します。
     */
    Scenario_Translator.prototype.convertAll = function () {
      var self = this;
      var scenario = [];
      fs.readdir(Nore.SCENARIO_SRC_PATH, function (err, files) {
        if (err) {
          console.error(err.message);
          return;
        }
        if (!files) {
          return;
        }
        try {
          self.convertFiles(Nore.SCENARIO_SRC_PATH, files, scenario, null);
          //console.log(scenario);
          if (!fs.existsSync(DATA_PATH)) {
            fs.mkdirSync(DATA_PATH);
          }
          for (
            var _i = 0, scenario_1 = scenario;
            _i < scenario_1.length;
            _i++
          ) {
            var folder = scenario_1[_i];
            //fs.writeFileSync(DATA_PATH + 'aaa.csv', self.writeCsv(folder));
            if (folder.isEmpty()) {
              continue;
            }
            fs.writeFileSync(
              DATA_PATH + folder.totalName() + ".tsv",
              self.writeCsv(folder)
            );
          }
          console.log("Nore_TES の変換が終わりました");
        } catch (e) {
          console.error(e);
        }
      });
    };
    Scenario_Translator.prototype.writeCsv = function (scenario) {
      var text = "\ufeff";
      var lineNumber = 1;
      for (var _i = 0, _a = scenario.files(); _i < _a.length; _i++) {
        var csv = _a[_i];
        var result = csv.write(lineNumber);
        text += result.texts;
        lineNumber = result.lineNumber;
      }
      return text;
    };
    Scenario_Translator.prototype.convertFiles = function (
      basePath,
      files,
      scenario,
      parent
    ) {
      if (!files) {
        return;
      }
      var folder;
      if (this.isMainFolder(parent)) {
        //p('mainFolder:' + parent.name())
        folder = parent;
      } else {
        folder = new CsvFolder(basePath, parent);
      }
      for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
        var file = files_1[_i];
        var filePath = path.resolve(basePath, file);
        var stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
          var files2 = fs.readdirSync(filePath);
          this.convertFiles(filePath + "\\", files2, scenario, folder);
          continue;
        }
        var name_1 = this.parseValidFileName(file);
        if (!name_1) {
          continue;
        }
        var text = fs.readFileSync(basePath + file, "utf8");
        folder.pushCsv(this.convert(file, text, name_1));
      }
      scenario.push(folder);
    };
    Scenario_Translator.prototype.isMainFolder = function (folder) {
      if (!folder) {
        return false;
      }
      return Nore.MAIN_FOLDERS.indexOf(folder.name()) >= 0;
    };
    Scenario_Translator.prototype.convert = function (file, text, name) {
      //p('file:' + file);
      var csv = new Csv(file);
      var lines = text.split(/\r\n|\r|\n/);
      lines = this.connectMultiLines(lines);
      for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        line = line.replace(/^\uFEFF/, "");
        lines[i] = this.removeWS(line);
      }
      for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        if (line.length === 0) {
          csv.pushBlank();
          continue;
        }
        if (line.indexOf("//") === 0) {
          csv.pushSystem(line);
          continue;
        }
        if (line.indexOf("#") === 0) {
          csv.pushSystem(line);
          continue;
        }
        if (line.indexOf("@") === 0) {
          csv.pushSystem(line);
        } else {
          csv.pushJapanese(line);
        }
      }
      return csv;
    };
    Scenario_Translator.prototype.connectMultiLines = function (lines) {
      var result = [];
      for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        while (line[line.length - 1] == "," && !isNaN(line[line.length - 2])) {
          i++;
          if (lines[i]) {
            line = line + this.removeWS(lines[i].replace(/^\uFEFF/, ""));
          } else {
            break;
          }
        }
        result.push(line);
      }
      return result;
    };
    /**
     * 指定のファイルがイベントファイルかどうかを返します
     */
    Scenario_Translator.prototype.parseValidFileName = function (file) {
      if (file.indexOf("replace.txt") === 0) {
        return;
      }
      var index = file.indexOf(".txt");
      if (index === -1) {
        index = file.indexOf(".sce");
      }
      if (index === -1) {
        return null;
      }
      var name = file.substr(0, index);
      return name;
    };
    /**
     * ホワイトスペースを削除します。
     */
    Scenario_Translator.prototype.removeWS = function (line) {
      var ret = line.replace(/^[\x20|\t]+/g, "");
      if (ret === "_") {
        return "　";
      } else {
        return ret;
      }
    };
    return Scenario_Translator;
  })();
  var _SceneManager_onKeyDown = SceneManager.onKeyDown;
  SceneManager.onKeyDown = function (event) {
    _SceneManager_onKeyDown.call(this, event);
    if (!$gameTemp || !$gameTemp.isPlaytest()) {
      return;
    }
    if (!event.ctrlKey && !event.altKey) {
      if (event.keyCode == 117) {
        // F6
        var converter = new Scenario_Translator();
        converter.convertAll();
        SoundManager.playSave();
      }
      if (event.keyCode == 118) {
        // F7
        var converter = new Scenario_TranslatorToText();
        converter.convertAll();
        SoundManager.playSave();
      }
      if (event.keyCode == 114) {
        // F3
        var converter = new Nore.Tes.Scenario_Converter(false);
        converter.convertAll();
        SoundManager.playSave();
      }
    }
  };
  var CsvFile = /** @class */ (function () {
    function CsvFile(name) {
      this._lines = [];
      this._name = name;
    }
    CsvFile.prototype.name = function () {
      return this._name;
    };
    CsvFile.prototype.text = function () {
      var text = "";
      for (var _i = 0, _a = this._lines; _i < _a.length; _i++) {
        var line = _a[_i];
        text += line;
        text += "\n";
      }
      return text;
    };
    CsvFile.prototype.pushBlank = function () {
      this._lines.push("");
    };
    CsvFile.prototype.pushSystem = function (system) {
      this._lines.push(system);
    };
    CsvFile.prototype.pushJpMessage = function (msg) {
      this._lines.push("# " + msg);
    };
    CsvFile.prototype.pushEnMessage = function (msg) {
      msg = msg.replace(/"/g, "");
      msg = msg.replace("picture?", "Huh?");
      msg = msg.replace("Japan", "kingdom");
      msg = msg.replace("meat toilet", "promiscuous woman");
      msg = msg.replace("Meat toilet", "Promiscuous woman");
      msg = msg.replace("Ao crystal", "crystal");
      var words = msg.split(" ");
      var t = "";
      var length = 0;
      for (var i = 0; i < words.length; i++) {
        var w = words[i];
        length += w.length + 1;
        t += w;
        if (length > 30 && i != words.length - 2) {
          if (w[w.length - 1] == ",") {
            t += "　";
          }
          t += "\n";
          length = 0;
        } else {
          t += " ";
        }
      }
      this._lines.push(t);
    };
    return CsvFile;
  })();
  var Scenario_TranslatorToText = /** @class */ (function () {
    function Scenario_TranslatorToText() {}
    /**
     * 全てのイベントを変換します。
     */
    Scenario_TranslatorToText.prototype.convertAll = function () {
      var self = this;
      var scenario = [];
      fs.readdir(Nore.CSV_SRC_PATH, function (err, files) {
        if (err) {
          console.error(err.message);
          return;
        }
        if (!files) {
          return;
        }
        try {
          p(files);
          self.convertFiles(Nore.CSV_SRC_PATH, files, scenario, null);
          //console.log(scenario);
          if (!fs.existsSync(DATA_PATH)) {
            fs.mkdirSync(DATA_PATH);
          }
          for (
            var _i = 0, scenario_2 = scenario;
            _i < scenario_2.length;
            _i++
          ) {
            var csvFile = scenario_2[_i];
            //fs.writeFileSync(DATA_PATH + 'aaa.csv', self.writeCsv(folder));
            fs.writeFileSync(
              Nore.SCENARIO_EN_SRC_PATH + csvFile.name(),
              csvFile.text()
            );
            //break;
          }
          console.log("Nore_TES の変換が終わりました");
        } catch (e) {
          console.error(e);
        }
      });
    };
    Scenario_TranslatorToText.prototype.convertFiles = function (
      basePath,
      files,
      scenario,
      parent
    ) {
      if (!files) {
        return;
      }
      for (var _i = 0, files_2 = files; _i < files_2.length; _i++) {
        var file = files_2[_i];
        var filePath = path.resolve(basePath, file);
        var stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
          console.error("エラー　ディレクトリが含まれています");
          continue;
        }
        var text = fs.readFileSync(basePath + file, "utf8");
        this.convert(text, scenario);
      }
    };
    Scenario_TranslatorToText.prototype.convert = function (text, scenario) {
      //p('file:' + file);
      var lines = text.split(/\r\n|\r|\n/);
      var csv = null;
      for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        //p(line)
        var texts = line.split("\t");
        var fileName = texts[0];
        var systemText = texts[1];
        var jpText = texts[2];
        var enText = texts[3];
        if (fileName.length > 0) {
          if (csv) {
            scenario.push(csv);
          }
          csv = new CsvFile(fileName);
          continue;
        }
        if (systemText.length > 0) {
          for (var i_1 = 2; i_1 < texts.length; i_1++) {
            var t = texts[i_1];
            if (t.length > 0) {
              systemText += "," + t;
            }
          }
          csv.pushSystem(systemText);
          continue;
        }
        if (jpText.length > 0) {
          csv.pushJpMessage(jpText);
          csv.pushEnMessage(enText);
          continue;
        }
        csv.pushBlank();
      }
      scenario.push(csv);
    };
    return Scenario_TranslatorToText;
  })();
})(Nore || (Nore = {}));
