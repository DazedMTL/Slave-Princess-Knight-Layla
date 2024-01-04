/*:ja
 * @target MZ
 * @author ル
 *
 */
BattleManager.updateAction = function () {
  var target = this._targets.shift();
  if (target && this._subject.canMove()) {
    this.invokeAction(this._subject, target);
  } else {
    this.endAction();
  }
};
BattleManager.invokeNormalAction = function (subject, target) {
  //p('invokeNormalAction:')
  var isDamage = this._action.isDamage();
  var realTarget = this.applySubstitute(target);
  this._action.apply(realTarget);
  this._logWindow.displayActionResults(this._action, subject, realTarget);
  this.checkInvokeBleeding(subject, target, isDamage);
  this.checkInvokeToge(subject, target, isDamage);
  this.checkInvokeDeathAgony(subject, target, isDamage);
  this.checkInvokeMelting(subject, target);
  this.checkInvokeFinishBlow(subject, target);
  this.checkInvokeCounterAttack(subject, target, isDamage);
  this.checkInvokeSuddenStrike(subject, target, isDamage);
  this.checkInvokeStage5(subject, target, isDamage);
  this._logWindow.push("clearAffectedState", target);
};
BattleManager.checkInvokeBleeding = function (subject, target, isDamage) {
  if (!target) {
    return;
  }
  if (!isDamage) {
    return;
  }
  if (!this._action.isDamage()) {
    return;
  }
  if (subject.hasStateMeta(StateMeta.bleeding)) {
    this._logWindow.push("invokeBleeding", subject, subject);
  }
};
BattleManager.checkInvokeToge = function (subject, target, isDamage) {
  if (!target) {
    return;
  }
  if (!isDamage) {
    return;
  }
  if (!this._action.isPhysical()) {
    return;
  }
  if (target.hasStateMeta(StateMeta.toge)) {
    this._logWindow.push("invokeToge", subject, target);
  }
};
BattleManager.checkInvokeDeathAgony = function (subject, target, isDamage) {
  if (!target) {
    return;
  }
  if (!target.hasStateMeta(StateMeta.invokeDeathAgony)) {
    return;
  }
  if (!isDamage) {
    return;
  }
  /*if (! target.result().addedStates.contains(target.deathStateId())) {
        return;
    }*/
  this._logWindow.push("invokeDeathAgony", target);
};
BattleManager.checkInvokeMelting = function (subject, target) {
  if (!subject || !target) {
    return;
  }
  if (!subject.isActor()) {
    return;
  }
  if (!target.hasStateMeta(SkillMeta.MELTING)) {
    return;
  }
  if (!target.result().addedStates.includes(Nore.STUN_STATE_ID)) {
    return;
  }
  this._logWindow.push("invokeMelting", target, target);
};
BattleManager.checkInvokeFinishBlow = function (subject, target) {
  if (!subject || !target) {
    return;
  }
  if (!subject.isActor()) {
    return;
  }
  var actor = subject;
  if (!target.result().addedStates.includes(Nore.STUN_STATE_ID)) {
    return;
  }
  var stunMp = actor.countSkillMeta(SkillMeta.stunMp);
  if (stunMp > 0) {
    actor.gainMp(1);
    if (stunMp > 1) {
      actor.gainShield(4);
    }
  }
  if (!actor.hasSkillMeta(SkillMeta.FINISH_BLOW)) {
    return;
  }
  this._logWindow.push("invokeFinishBlow", subject, target);
};
BattleManager.checkInvokeCounterAttack = function (subject, target, isDamage) {
  if (subject.isActor() == target.isActor()) {
    return;
  }
  if (!isDamage) {
    return;
  }
  if (target.countState(Nore.STATE_TYPE.counter) > 0) {
    this._logWindow.push("invokeCounter", subject, target);
  }
};
BattleManager.checkInvokeStage5 = function (subject, target, isDamage) {
  if ($gameSystem.stageId() != 5) {
    return;
  }
  if (subject.isEnemy()) {
    return;
  }
  if (!target.isEnemy()) {
    return;
  }
  if (!this._action.isDamage()) {
    return;
  }
  var gimmick = $gameParty.getStage5Gimmick();
  var invoke = gimmick.onAttack(target);
  if (invoke) {
    this._logWindow.push("invokeStage5", subject, target);
  }
};
Window_BattleLog.prototype.invokeFinishBlow = function (subject, target) {
  BattleManager.invokeFinishBlow(subject, target);
};
Window_BattleLog.prototype.invokeMelting = function (subject, target) {
  BattleManager.invokeMelting(subject, target);
};
Window_BattleLog.prototype.invokeBleeding = function (subject, target) {
  BattleManager.invokeBleeding(target, subject);
};
Window_BattleLog.prototype.invokeToge = function (subject, target) {
  BattleManager.invokeToge(target, subject);
};
Window_BattleLog.prototype.invokeDeathAgony = function (subject) {
  BattleManager.invokeDeathAgony(subject);
};
Window_BattleLog.prototype.invokeStage5 = function (subject, target) {
  BattleManager.invokeStage5(subject, target);
};
BattleManager.invokeCounterAttack = function (subject, target) {
  var action = new Game_Action2(target);
  action.setAttack();
  action.apply(subject);
  this._logWindow.displayCounter(target);
  this._logWindow.displayActionResults(action, target, subject);
  this.checkInvokeMelting(target, subject);
};
BattleManager.invokeSuddenStrike = function (subject, target) {
  var action = new Game_Action2(subject);
  action.setAttack();
  action.apply(target);
  this._logWindow.displaySuddenStrike(subject);
  this._logWindow.displayActionResults(action, target, subject);
  this._logWindow.push("wait");
  this._logWindow.push("wait");
  this._logWindow.push("clear");
};
BattleManager.invokeMagicReflection = function (subject, target) {
  this._action._reflectionTarget = target;
  this._logWindow.displayReflection(target);
  this._action.apply(subject);
  this._logWindow.displayActionResults(this._action, target, subject);
};
Window_BattleLog.prototype.reserveAction = function (action, subject, target) {
  this.push("invokeAction", action, subject, target);
};
Window_BattleLog.prototype.clearAffectedState = function (target) {
  target.result().onDisplayResults();
};
Window_BattleLog.prototype.invokeAction = function (action, subject, target) {
  var invokeActions = [];
  while (this._methods[0] && this._methods[0].name == "invokeAction") {
    invokeActions.push(this._methods.shift());
  }
  this.startAction(subject, action, [target]);
  this.push("waitForEffect");
  action.apply(target);
  this.displayActionResults(action, subject, target);
  this.push("wait");
  this.push("wait");
  this.push("clear");
  for (
    var _i = 0, invokeActions_1 = invokeActions;
    _i < invokeActions_1.length;
    _i++
  ) {
    var m = invokeActions_1[_i];
    this._methods.push(m);
  }
};
Window_BattleLog.prototype.invokeAction2 = function (
  action,
  subject,
  target
) {};
Window_BattleLog.prototype.displayCounter = function (target) {
  this.push("performCounter", target);
  this.push("addText", TextManager.counterAttack.format(target.name()));
  this.push("popBaseLine");
};
Window_BattleLog.prototype.displaySuddenStrike = function (target) {
  this.push("performSuddenStrike", target);
  this.push("addText", TextManager.invokeSuddenStrike.format(target.name()));
  this.push("popBaseLine");
};
Window_BattleLog.prototype.performSuddenStrike = function (target) {
  //target.performSuddenStrike();
  target.performCounter();
};
Window_BattleLog.prototype.displayDamage = function (target) {
  if (target.result().barrier) {
    this.displayBarrier(target);
    this.push("popupDamage", target);
  } else if (target.result().missed) {
    this.displayMiss(target);
    this.push("popupDamage", target);
  } else if (target.result().evaded) {
    this.displayEvasion(target);
  } else {
    this.displayDamageEffect(target);
    this.push("popupDamage", target);
    //this.push("popupDamage", subject);
    this.displayShieldDamage(target);
    this.displayArmorDamage(target);
    this.displayHpDamage(target);
    this.displayMpDamage(target);
    this.displayTpDamage(target);
  }
};
Window_BattleLog.prototype.displayBarrier = function (target) {
  var fmt = TextManager.actionBarrier;
  this.push("performBarrier", target);
  this.push("addText", fmt.format(target.name()));
};
Window_BattleLog.prototype.performBarrier = function (target) {
  AudioManager.playSe({ name: "Hammer", volume: 80, pitch: 100, pan: 0 });
};
Window_BattleLog.prototype.displayChangedBuffs = function (target) {
  var result = target.result();
  //this.displayBuffs(target, result.addedBuffs, TextManager.buffAdd);
  //this.displayBuffs(target, result.addedDebuffs, TextManager.debuffAdd);
  //this.displayBuffs(target, result.removedBuffs, TextManager.buffRemove);
};
Window_BattleLog.prototype.displayActionResults = function (
  action,
  subject,
  target
) {
  if (target.result().used) {
    this.push("pushBaseLine");
    this.displayCritical(target);
    //this.push("popupDamage", target);
    //this.push("popupDamage", subject);
    this.displayDamage(target);
    this.displaySpecialEffect(action, subject, target);
    this.displayAffectedStatus(target);
    this.displayReact(action, subject);
    if (!subject.result().isReacted()) {
      this.displayReact(action, target);
    }
    this.displayRenkan(action, target);
    this.displayMagnet(action, target);
    this.displayCancel(action, target);
    this.displayUndead(action, target);
    this.displayClenching(action, target);
    this.displayFailure(action, target);
    this.push("waitForNewLine");
    this.push("popBaseLine");
    this.resetGimmick5(action, target);
  } else {
    this.resetGimmick5(action, target);
  }
};
Window_BattleLog.prototype.displayReact = function (action, subject) {
  if (subject.result().isReacted()) {
    this.push("addText", TextManager.actionReact.format(subject.name()));
  }
  //this.push("waitForNewLine");
};
Window_BattleLog.prototype.displayRegeneDead = function (subject) {
  //this.push("popupDamage", subject);
  this.displayDamage(subject);
  this.displayAffectedStatus(subject);
  this.push("waitForNewLine");
};
Window_BattleLog.prototype.displayAffectedStatus = function (target) {
  if (target.result().isStatusAffected()) {
    this.push("pushBaseLine");
    this.displayChangedStates(target);
    this.displayChangedBuffs(target);
    this.push("waitForNewLine");
    this.push("popBaseLine");
  }
};
Window_BattleLog.prototype.displayRenkan = function (subject, target) {
  if (!target.result().renkan) {
    return;
  }
  this.push("addText", TextManager.actionRenkan.format(target.name()));
};
Window_BattleLog.prototype.displayMagnet = function (subject, target) {
  if (!target.result().magnet) {
    return;
  }
  this.push("addText", TextManager.actionMagnet.format(target.name()));
};
Window_BattleLog.prototype.displayCancel = function (subject, target) {
  if (!target.result().cancel) {
    return;
  }
  this.push("addText", TextManager.actionCancel.format(target.name()));
};
Window_BattleLog.prototype.displayUndead = function (subject, target) {
  if (!target.result().undead) {
    return;
  }
  this.push("addText", TextManager.actionUndead.format(target.name()));
};
Window_BattleLog.prototype.displayClenching = function (subject, target) {
  if (!target.result().clenching) {
    return;
  }
  this.push("addText", TextManager.actionClenching.format(target.name()));
};
Window_BattleLog.prototype.invokeCounter = function (subject, target) {
  //p('displayCounter')
  if (!subject || !target) {
    return;
  }
  BattleManager.invokeCounterAttack(subject, target);
};
Window_BattleLog.prototype.invokeSuddenStrike = function (subject, target) {
  //p('displayCounter')
  if (!subject || !target) {
    return;
  }
  BattleManager.invokeSuddenStrike(subject, target);
};
Window_BattleLog.prototype.displayFailure = function (action, target) {
  if (action.item().meta["ignoreFailure"]) {
    return;
  }
  if (target.result().isReacted()) {
    return;
  }
  if (target.result().isHit() && !target.result().success) {
    this.push("addText", TextManager.actionFailure.format(target.name()));
  } else if (target.result().isNoEffect()) {
    this.push("addText", TextManager.actionFailure.format(target.name()));
  }
};
Window_BattleLog.prototype.displayDamageEffect = function (target) {
  var result = target.result();
  if (!result.drain) {
    if (
      result.hpDamage > 0 ||
      result.shieldDamage() > 0 ||
      result.armorDamage() > 0
    ) {
      this.push("performDamage", target);
    }
  }
};
Window_BattleLog.prototype.displayHpDamage = function (target) {
  if (target.result().hpAffected) {
    if (target.result().hpDamage < 0) {
      this.push("performRecovery", target);
    }
    this.push("addText", this.makeHpDamageText(target));
  }
};
Window_BattleLog.prototype.displayShieldDamage = function (target) {
  if (target.result().shieldDamage() == 0) {
    return;
  }
  if (target.result().shieldDamage() < 0) {
    this.push("performRecovery", target);
  }
  this.push("addText", this.makeShieldDamageText(target));
};
Window_BattleLog.prototype.updateWaitCount = function () {
  if (this._waitCount > 0) {
    this._waitCount -= this.isFastForward() ? 3 : 2;
    if ($gameTemp.isAutoBattle()) {
      this._waitCount -= 2;
    }
    if (this._waitCount < 0) {
      this._waitCount = 0;
    }
    return true;
  }
  return false;
};
Window_BattleLog.prototype.displayArmorDamage = function (target) {
  if (target.result().armorDamage() == 0) {
    return;
  }
  this.push("addText", this.makeArmorDamageText(target));
};
Window_BattleLog.prototype.makeArmorDamageText = function (target) {
  var result = target.result();
  var damage = result.armorDamage();
  var isActor = target.isActor();
  var fmt;
  if (damage > 0) {
    fmt = isActor ? TextManager.actorArmorDamage : TextManager.enemyArmorDamage;
    return fmt.format(target.name(), damage);
  } else if (damage < 0) {
    fmt = isActor ? TextManager.actorRecovery : TextManager.enemyRecovery;
    return fmt.format(target.name(), TextManager.hp, -damage);
  } else {
    fmt = isActor ? TextManager.actorNoDamage : TextManager.enemyNoDamage;
    return fmt.format(target.name());
  }
};
Window_BattleLog.prototype.makeShieldDamageText = function (target) {
  var result = target.result();
  var damage = result.shieldDamage();
  var isActor = target.isActor();
  var fmt;
  if (damage > 0) {
    fmt = isActor
      ? TextManager.actorShieldDamage
      : TextManager.actorShieldDamage;
    return fmt.format(target.name(), damage);
  } else if (damage < 0) {
    fmt = isActor
      ? TextManager.actorShieldRecovery
      : TextManager.actorShieldRecovery;
    return fmt.format(target.name(), TextManager.hp, -damage);
  } else {
    fmt = isActor ? TextManager.actorNoDamage : TextManager.enemyNoDamage;
    return fmt.format(target.name());
  }
};
Window_BattleLog.prototype.displayAction = function (subject, item) {
  var numMethods = this._methods.length;
  if (DataManager.isSkill(item)) {
    var dialog = selectDialogue(subject, item);
    this.displayItemMessage(getMessage1(item), subject, item);
    if (dialog) {
      this.displayItemMessage("「" + dialog + "」", subject, item);
    }
    this.displayItemMessage(item.message2, subject, item);
  } else {
    this.displayItemMessage(TextManager.useItem, subject, item);
  }
  if (this._methods.length === numMethods) {
    this.push("wait");
  }
};
Window_BattleLog.prototype.displayCritical = function (target) {
  if (target.result().critical) {
    if (target.isActor()) {
      this.push("addText", TextManager._criticalToActor);
    } else {
      this.push("addText", TextManager._criticalToEnemy);
    }
  }
};
Window_BattleLog.prototype.makeHpDamageText = function (target) {
  var result = target.result();
  var damage = result.hpDamage;
  var isActor = target.isActor();
  var fmt;
  if (damage > 0 && result.drain) {
    fmt = isActor ? TextManager._actorDrain : TextManager._enemyDrain;
    return fmt.format(target.name(), TextManager.hp, damage);
  } else if (damage > 0) {
    fmt = isActor ? TextManager._actorDamage : TextManager._enemyDamage;
    return fmt.format(target.name(), damage);
  } else if (damage < 0) {
    fmt = isActor ? TextManager._actorRecovery : TextManager._enemyRecovery;
    return fmt.format(target.name(), TextManager.hp, -damage);
  } else {
    fmt = isActor ? TextManager._actorNoDamage : TextManager._enemyNoDamage;
    return fmt.format(target.name());
  }
};
Window_BattleLog.prototype.makeTpDamageText = function (target) {
  var result = target.result();
  var damage = result.tpDamage;
  var isActor = target.isActor();
  var fmt;
  if (damage > 0) {
    fmt = isActor ? TextManager._actorLoss : TextManager._enemyLoss;
    return fmt.format(target.name(), TextManager.tp, damage);
  } else if (damage < 0) {
    fmt = isActor ? TextManager._actorGain : TextManager._enemyGain;
    return fmt.format(target.name(), TextManager.tp, -damage);
  } else {
    return "";
  }
};
Window_BattleLog.prototype.displayMiss = function (target) {
  var fmt;
  if (target.result().physical) {
    var isActor = target.isActor();
    fmt = isActor ? TextManager._actorNoHit : TextManager._enemyNoHit;
    this.push("performMiss", target);
  } else {
    fmt = TextManager._actionFailure;
  }
  this.push("addText", fmt.format(target.name()));
};
Window_BattleLog.prototype.displayEvasion = function (target) {
  var fmt;
  if (target.result().physical) {
    fmt = TextManager._evasion;
    this.push("performEvasion", target);
  } else {
    fmt = TextManager._magicEvasion;
    this.push("performMagicEvasion", target);
  }
  this.push("addText", fmt.format(target.name()));
};
Window_BattleLog.prototype.displayAddedStates = function (target) {
  var result = target.result();
  var states = result.addedStateObjects();
  for (var _i = 0, states_1 = states; _i < states_1.length; _i++) {
    var state = states_1[_i];
    var stateText = target.isActor() ? getMessage1(state) : getMessage2(state);
    if (state.id === target.deathStateId()) {
      this.push("performCollapse", target);
    }
    if (stateText) {
      this.push("popBaseLine");
      this.push("pushBaseLine");
      this.push("addText", stateText.format(target.name()));
      this.push("waitForEffect");
    }
  }
};
Window_BattleLog.prototype.displayRemovedStates = function (target) {
  var result = target.result();
  var states = result.removedStateObjects();
  for (var _i = 0, states_2 = states; _i < states_2.length; _i++) {
    var state = states_2[_i];
    if (state.message4) {
      this.push("popBaseLine");
      this.push("pushBaseLine");
      this.push("addText", getMessage4(state).format(target.name()));
    }
  }
};
Window_BattleLog.prototype.displayItemMessage = function (fmt, subject, item) {
  if (fmt) {
    this.push("addText", fmt.format(subject.name(), getItemName(item)));
  }
};
BattleManager.displayStartMessages = function () {
  for (var _i = 0, _a = $gameTroop.enemyNames(); _i < _a.length; _i++) {
    var name_1 = _a[_i];
    $gameMessage.add(TextManager._emerge.format(name_1));
  }
  if (this._preemptive) {
    $gameMessage.add(TextManager.preemptive.format($gameParty.name()));
  } else if (this._surprise) {
    $gameMessage.add(TextManager.surprise.format($gameParty.name()));
  }
};
