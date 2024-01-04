var Nore;
(function (Nore) {
  var MankoText = /** @class */ (function () {
    function MankoText() {
      this.index = 0;
      this.value = 0;
    }
    return MankoText;
  })();
  function extractText(mankoText) {
    var textIndex = -1;
    var array = $dataScenario[mankoText.fileName];
    if (!array) {
      //console.error(mankoText.fileName + 'のファイルが見つかりません');
      return [];
    }
    var index = mankoText.index;
    var texts = [];
    for (var i = 0; i < array.length; i++) {
      var obj = array[i];
      //p(obj)
      if (obj.code == 101) {
        textIndex++;
        if (textIndex == index) {
          for (var k = i + 1; k < array.length; k++) {
            var obj_1 = array[k];
            //p(obj)
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
  function getMankoText(actorHistory, history) {
    var text = getMankoTextInfo(actorHistory, history, false);
    if (!text) {
      return [""];
    }
    var result = extractText(text);
    if (result.length == 0) {
      var text_1 = getMankoTextInfo(actorHistory, history, true);
      if (!text_1) {
        return [""];
      }
      result = extractText(text_1);
    }
    return result;
  }
  Nore.getMankoText = getMankoText;
  function getEventText(actorHistory, history) {
    var text = getEventTextInfo(actorHistory, history, false);
    if (!text) {
      return [""];
    }
    var result = extractText(text);
    if (result.length == 0) {
      var text_2 = getEventTextInfo(actorHistory, history, true);
      if (!text_2) {
        return [""];
      }
      result = extractText(text_2);
    }
    return result;
  }
  Nore.getEventText = getEventText;
  function getMankoTextInfo(actorHistory, history, isCommon) {
    if (history.day() == $gameSystem.day()) {
      // 本日はまだ
      return null;
    }
    if (history.isMankoChange()) {
      return getMankoChangeText(actorHistory, history, isCommon);
    }
    return null;
  }
  function getEventTextInfo(actorHistory, history, isCommon) {
    if (history.day() == $gameSystem.day()) {
      // 本日はまだ
      return null;
    }
    return null;
    /*
            if (history.isLostVirgin()) {
                return getLostVirginText(actorHistory, history);
            }
        
            if (history.isNinshinBanzoku()) {
                return getNinshinText(actorHistory, history, isCommon);
            }
        
            if (history.isNinshinGrowup()) {
                return getNinshinGrowupText(actorHistory, history);
            }
        
            if (history.isSyusan()) {
                return getSyusanText(actorHistory, history);
            }
        
            return null;
            */
  }
  function getNinshinText(actorHistory, history, isCommon) {
    var actorId = history.actorId();
    var ninshinCount = actorHistory.countNinshinBanzoku(history.day());
    var mankoText = new MankoText();
    mankoText.value = ninshinCount;
    if (ninshinCount == 1) {
      mankoText.index = 0;
    } else {
      mankoText.index = 1;
    }
    if (isCommon) {
      mankoText.fileName = "まんこテキスト_妊娠_共通";
    } else {
      mankoText.fileName = "まんこテキスト_妊娠_%1".format(actorId.padZero(2));
    }
    return mankoText;
  }
  function getNinshinGrowupText(actorHistory, history) {
    var actorId = 3; //history.actorId();
    var ninshinCount = actorHistory.countNinshin(history.day());
    var mankoText = new MankoText();
    mankoText.value = ninshinCount;
    if (ninshinCount == 1) {
      mankoText.index = 0;
    } else {
      mankoText.index = 1;
    }
    if (history.isCaptive()) {
      mankoText.fileName = "まんこテキスト_監禁_ボテ成長_%1".format(
        actorId.padZero(2)
      );
      return mankoText;
    } else {
      mankoText.fileName = "まんこテキスト_拠点_ボテ成長_%1".format(
        actorId.padZero(2)
      );
      return mankoText;
    }
  }
  function getSyusanText(actorHistory, history) {
    var actorId = 3; //history.actorId();
    var ninshinCount = actorHistory.countNinshin(history.day());
    var mankoText = new MankoText();
    mankoText.value = ninshinCount;
    if (ninshinCount == 1) {
      mankoText.index = 0;
    } else {
      mankoText.index = 1;
    }
    if (history.isCaptive()) {
      mankoText.fileName = "まんこテキスト_監禁_出産_%1".format(
        actorId.padZero(2)
      );
      return mankoText;
    } else {
      mankoText.fileName = "まんこテキスト_拠点_出産_%1".format(
        actorId.padZero(2)
      );
      return mankoText;
    }
  }
  function getMankoChangeText(actorHistory, history, isCommon) {
    var actorId = history.actorId();
    var mankoText = new MankoText();
    mankoText.index = history.mankoImageId() - 1;
    mankoText.fileName = "まんこテキスト_%1".format(actorId.padZero(2));
    if (isCommon) {
      mankoText.fileName = "まんこテキスト_共通";
    } else {
      mankoText.fileName = "まんこテキスト_%1".format(actorId.padZero(2));
    }
    return mankoText;
  }
  function getLostVirginText(actorHistory, history) {
    var actorId = history.actorId();
    var mankoText = new MankoText();
    if (history._commonEventId == 920 || history._commonEventId == 931) {
      mankoText.fileName = "まんこテキスト_処女喪失_%1_大臣".format(
        actorId.padZero(2)
      );
    } else if (history._commonEventId == 914) {
      mankoText.fileName = "まんこテキスト_処女喪失_%1_シャルル".format(
        actorId.padZero(2)
      );
    } else {
      mankoText.fileName = "まんこテキスト_処女喪失_%1_蛮族".format(
        actorId.padZero(2)
      );
    }
    return mankoText;
  }
})(Nore || (Nore = {}));
