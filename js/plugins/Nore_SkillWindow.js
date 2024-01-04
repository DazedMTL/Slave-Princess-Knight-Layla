var Nore;
(function (Nore) {
  Window_SkillList.prototype.includes = function (item) {
    return item;
  };
  Window_SkillList.prototype.drawSkillCost = function (skill, x, y, width) {
    if (this._actor.skillTpCost(skill) > 0) {
      this.changeTextColor(ColorManager.ougiColor());
      this.drawText(this._actor.skillTpCost(skill), x, y, width, "right");
    } else if (this._actor.skillMpCost(skill) > 0 || skill.mpCost > 0) {
      this.changeTextColor(ColorManager.mpCostColor());
      this.drawText(this._actor.skillMpCost(skill), x, y, width, "right");
    }
  };
})(Nore || (Nore = {}));
