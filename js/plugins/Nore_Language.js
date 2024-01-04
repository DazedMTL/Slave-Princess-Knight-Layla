function getItemName(item) {
  switch (ConfigManager.language) {
    case "en":
      if (item.meta["nameEn"]) {
        return item.meta["nameEn"];
      }
      break;
  }
  return item.name;
}
function getMessage1(item) {
  switch (ConfigManager.language) {
    case "en":
      if (item.meta["message1En"]) {
        return item.meta["message1En"];
      } else {
        return replaceSkillMessage1(item.message1);
      }
  }
  return item.message1;
}
function getMessage2(item) {
  switch (ConfigManager.language) {
    case "en":
      if (item.meta["message2En"]) {
        return item.meta["message2En"];
      }
      break;
  }
  return item.message2;
}
function getMessage3(item) {
  switch (ConfigManager.language) {
    case "en":
      if (item.meta["message3En"]) {
        return item.meta["message3En"];
      }
      break;
  }
  return item.message3;
}
function getMessage4(item) {
  switch (ConfigManager.language) {
    case "en":
      if (item.meta["message4En"]) {
        return item.meta["message4En"];
      }
      break;
  }
  return item.message4;
}
function getMapName(mapInfo) {
  var name = mapInfo.name;
  switch (ConfigManager.language) {
    case "en":
    case "ch":
      var index = name.indexOf("<");
      if (index > 0 && name.indexOf(">") > 0) {
        var text = name.substr(index);
        try {
          var meta = parseMetadata(text);
          if (ConfigManager.language == "en") {
            if (meta["nameEn"]) {
              return meta["nameEn"];
            }
          } else {
            if (meta["nameCh"]) {
              return meta["nameCh"];
            }
          }
        } catch (e) {
          console.error(e);
        }
      }
      break;
  }
  return name;
}
function parseMetadata(text) {
  var regExp = /<([^<>:]+)(:?)([^>]*)>/g;
  var data = {};
  for (;;) {
    var match = regExp.exec(text);
    if (match) {
      if (match[2] === ":") {
        data[match[1]] = match[3];
      } else {
        data[match[1]] = true;
      }
    } else {
      break;
    }
  }
  return data;
}
/**
 * よく使われるスキルメッセージをここで置換
 * @param message
 * @returns
 */
function replaceSkillMessage1(message) {
  if (!message) {
    return message;
  }
  switch (ConfigManager.language) {
    case "en":
      message = message.replace("%1は%2を放った！", "%1 uses %2!");
      message = message.replace("%1は%2を唱えた！", "%1 casts %2!");
      return message;
  }
  return message;
}
