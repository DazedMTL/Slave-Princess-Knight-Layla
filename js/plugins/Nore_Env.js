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
    return Nore.SHOW_ALL;
  }
  Nore.isRecoShow = isRecoShow;
})(Nore || (Nore = {}));
