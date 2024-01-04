var Nore;
(function (Nore) {
  var StatusText = /** @class */ (function () {
    function StatusText() {
      this.index = 0;
      this.value = 0;
    }
    return StatusText;
  })();
  function extractText(statusText) {
    var textIndex = -1;
    var array = $dataScenario[statusText.fileName];
    //p(statusText.fileName)
    if (!array) {
      console.error(statusText.fileName + "のファイルが見つかりません");
      return [""];
    }
    var index = statusText.index;
    var texts = [];
    for (var i = 0; i < array.length; i++) {
      var obj = array[i];
      if (obj.code == 101) {
        textIndex++;
        if (textIndex == index) {
          for (var k = i + 1; k < array.length; k++) {
            var obj_1 = array[k];
            if (obj_1.code == 401) {
              texts.push(obj_1.parameters[0]);
            } else if (obj_1.code == 101) {
              break;
            }
          }
          return texts;
        }
      }
    }
    return texts;
  }
  function getStatusText(actorHistory, history) {
    var text = getStatusTextInfo(actorHistory, history);
    if (!text) {
      return [""];
    }
    return extractText(text);
  }
  Nore.getStatusText = getStatusText;
  function getStatusTextInfo(actorHistory, history) {
    var actorId = history.actorId();
    var mankoText = new StatusText();
    var fileName = "status_%1".format(actorId.padZero(2));
    if (ConfigManager.language == "en") {
      if ($dataScenario["en_" + fileName]) {
        fileName = "en_" + fileName;
      }
    }
    mankoText.fileName = fileName;
    var nasty = actorHistory.countNasty(history.day());
    var rank = $gameSystem.paramRank(nasty, false);
    mankoText.index = rank - 2;
    return mankoText;
  }
})(Nore || (Nore = {}));
