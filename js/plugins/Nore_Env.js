var Nore;
(function (Nore) {
  function isTaikenban() {
    return false;
  }
  Nore.isTaikenban = isTaikenban;
  function isFreeTaikenban() {
    return false;
  }
  Nore.isFreeTaikenban = isFreeTaikenban;
  function isRecoShow(swId) {
    switch (swId) {
      case 971:
      case 902:
      case 903:
      case 907:
      case 905:
      case 1102:
      case 931:
      case 928:
      case 1221:
      // case 921:
      // case 942:
      // case 1222:
      case 972:
      case 914:
      //case 992:
      case 900:
      case 985:
        //case 972:
        return true;
    }
    return Nore.SHOW_ALL;
  }
  Nore.isRecoShow = isRecoShow;
})(Nore || (Nore = {}));
