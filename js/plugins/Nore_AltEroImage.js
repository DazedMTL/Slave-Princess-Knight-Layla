var ALT_ERO_IMAGES = {
  "01_02": 10,
  "01_02_bote": 10,
  "01_03": 6,
  "01_03_bote": 6,
  "01_04": 8,
  "01_04_bote": 8,
  "01_07": 10,
  "01_07_bote": 10,
  "01_10": 14,
  "01_14": 9,
  "01_15": 9,
  "01_17": 17,
  "01_20": 13,
  "01_20_bote": 6,
  "01_21": 20,
  "01_21_bote": 7,
  "01_23": 13,
  "01_25": 13,
  "01_26": 7,
  "01_26_kikai": 7,
  "02_02": 11,
  "02_04": 8,
  "02_07": 5,
  "02_10": 17,
  "02_19": 13,
  "02_20": 8,
  "02_20_kikai": 8,
  "03_01": 13,
  "03_02": 8,
  "03_03": 13,
  "03_03_bote": 13,
  "03_06": 8,
  "03_08": 9,
  "03_09": 13,
  "03_09_bote": 13,
  "03_11": 12,
  "03_15": 12,
  "03_17": 13,
  "03_20": 8,
  "03_20_bote": 8,
  "04_01": 19,
  "04_05": 11,
  "04_06": 22,
  "04_07": 12,
  "04_11": 17,
  "04_12": 14,
  "04_13": 9,
  "04_17": 10,
  "04_18": 6,
  "04_18_kikai": 6,
  "05_03": 10,
  "05_03_bote": 10,
  "05_05": 15,
  "05_07": 12,
  "05_07_bote": 12,
  "05_08": 11,
  "05_10": 14,
  "05_11": 12,
  "05_11_bote": 12,
  "05_13": 5,
  "05_20": 7,
  "05_20_kikai": 7,
  "06_03": 10,
  "06_53": 10,
  "06_06": 8,
  "06_09": 5,
  "06_09_bote": 5,
  "06_56": 8,
  "06_10": 13,
  "06_11": 18,
  "06_61": 18,
  "06_12": 8,
  "06_62": 8,
  "07_01": 6,
  "07_04": 16,
  "07_05": 14,
  "07_06": 14,
  "07_08": 10,
  "07_10": 6,
  "07_11": 3,
  "07_14": 7,
  "010_03": 11,
  "010_04": 11,
  "010_04_bote": 11,
  "010_06": 11,
  "010_06_bote": 3,
  "010_08": 7,
  "010_10": 13,
  "010_10_bote": 13,
  "010_12": 12,
  "010_12_bote": 11,
  "010_17": 6,
  "010_17_kikai": 6,
  "010_18": 9,
  "010_18_bote": 9,
  "012_02": 8,
  "012_02_bote": 8,
  "012_03": 14,
  "012_05": 13,
  "012_06": 10,
  "012_11": 4,
  "012_14": 2,
  "012_14_bote": 2,
  "012_15": 8,
  "012_15_kikai": 8,
  "012_16": 2,
  "012_17": 7,
  "012_18": 7,
  "012_18_bote": 7,
};
function choiceEroImage(imageId, actorHistory) {
  var imageNumCount = ALT_ERO_IMAGES[imageId];
  if (!imageNumCount) {
    return imageId;
  }
  var allCandidates = getAllEroImgCandidates(imageId, imageNumCount);
  var allImageList = actorHistory.getAllNinshinImageList();
  var candidates = [];
  for (
    var _i = 0, allCandidates_1 = allCandidates;
    _i < allCandidates_1.length;
    _i++
  ) {
    var image = allCandidates_1[_i];
    if (!allImageList.contains(image)) {
      candidates.push(image);
    }
  }
  if (candidates.length == 0) {
    candidates = allCandidates;
  }
  /*
    p('choiceEroImage')
    p(allCandidates)
    p(allImageList)
    p(candidates)
    */
  var index = Math.randomInt(candidates.length);
  var newImageId = candidates[index];
  p("choiceEroImage:" + newImageId);
  return newImageId;
}
function getAllEroImgCandidates(imageId, imageNumCount) {
  var candidates = [];
  candidates.push(imageId);
  for (var i = 0; i < imageNumCount; i++) {
    var imageNum = i + 1;
    candidates.push(imageId + "_alt_" + imageNum.padZero(2));
  }
  return candidates;
}
