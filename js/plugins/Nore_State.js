var __extends =
  (this && this.__extends) ||
  (function () {
    var extendStatics = function (d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (d, b) {
            d.__proto__ = b;
          }) ||
        function (d, b) {
          for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        };
      return extendStatics(d, b);
    };
    return function (d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype =
        b === null
          ? Object.create(b)
          : ((__.prototype = b.prototype), new __());
    };
  })();
var StateId;
(function (StateId) {
  StateId[(StateId["STUN"] = 15)] = "STUN";
  StateId[(StateId["STUN_LONG"] = 16)] = "STUN_LONG";
  StateId[(StateId["PROVOKE"] = 25)] = "PROVOKE";
  StateId[(StateId["BLESS"] = 32)] = "BLESS";
  StateId[(StateId["GRATIA"] = 33)] = "GRATIA";
  StateId[(StateId["FLAME"] = 41)] = "FLAME";
  StateId[(StateId["STRENGTH"] = 43)] = "STRENGTH";
  StateId[(StateId["TOGE"] = 47)] = "TOGE";
  StateId[(StateId["MIKIRI"] = 48)] = "MIKIRI";
  StateId[(StateId["INVOKE_DEATH_AGONY"] = 64)] = "INVOKE_DEATH_AGONY";
  StateId[(StateId["BARRIER"] = 66)] = "BARRIER";
  StateId[(StateId["KAIHI_BUNSIN"] = 67)] = "KAIHI_BUNSIN";
  StateId[(StateId["WRASH"] = 164)] = "WRASH";
  StateId[(StateId["MP_CHARGE"] = 165)] = "MP_CHARGE";
  StateId[(StateId["DAMAGE_RATE_UP"] = 167)] = "DAMAGE_RATE_UP";
  StateId[(StateId["TRANSFORM"] = 314)] = "TRANSFORM";
})(StateId || (StateId = {}));
var StateMeta;
(function (StateMeta) {
  StateMeta["BAKUSAI"] = "bakusai";
  StateMeta["toge"] = "toge";
  StateMeta["MIKIRI"] = "mikiri";
  StateMeta["PROVOKE"] = "provoke";
  StateMeta["SYUCHU"] = "syuchu";
  StateMeta["YOWAIMONO"] = "yowaimono";
  StateMeta["UTURIGI"] = "utsurigi";
  StateMeta["GEKKOU"] = "gekkou";
  StateMeta["UNDEAD"] = "undead";
  StateMeta["COUNT_DOWN"] = "countDown";
  StateMeta["photosynthesize"] = "photosynthesize";
  StateMeta["deathAgony"] = "deathAgony";
  StateMeta["mpCharge"] = "mpCharge";
  StateMeta["earthBenefit"] = "earthBenefit";
  StateMeta["darkBenefit"] = "darkBenefit";
  StateMeta["fireBenefit"] = "fireBenefit";
  StateMeta["skillDebuff"] = "skillDebuff";
  StateMeta["shareHp"] = "shareHp";
  StateMeta["kogoroshi"] = "kogoroshi";
  StateMeta["resurection"] = "resurection";
  StateMeta["hardening"] = "hardening";
  StateMeta["bleeding"] = "bleeding";
  StateMeta["togeDownMagic"] = "togeDownMagic";
  StateMeta["magicWeakness"] = "magicWeakness";
  StateMeta["aiming"] = "aiming";
  StateMeta["antiBreak"] = "antiBreak";
  StateMeta["haste"] = "haste";
  StateMeta["longBreak"] = "longBreak";
  StateMeta["antiMadan"] = "antiMadan";
  StateMeta["damageDown"] = "damageDown";
  StateMeta["maxShieldDown"] = "maxShieldDown";
  StateMeta["invalidateDebuff"] = "invalidateDebuff";
  StateMeta["damageCut"] = "damageCut";
  StateMeta["invokeDeathAgony"] = "invokeDeathAgony";
  StateMeta["renkan"] = "renkan";
  StateMeta["barrier"] = "barrier";
  StateMeta["kaihiBunsin"] = "kaihiBunsin";
  StateMeta["nintai"] = "nintai";
  StateMeta["hontai"] = "hontai";
  StateMeta["damageRateUp"] = "damageRateUp";
  StateMeta["magicBarrier"] = "magicBarrier";
})(StateMeta || (StateMeta = {}));
var Nore;
(function (Nore) {
  var StateManager = /** @class */ (function () {
    function StateManager() {}
    StateManager.prototype.isParamUpDownState = function (state) {
      if (
        state.meta["atkUp"] ||
        state.meta["defUp"] ||
        state.meta["atkDown"] ||
        state.meta["defDown"]
      ) {
        return true;
      }
      return false;
    };
    StateManager.prototype.isPassiveState = function (state) {
      return state.meta["passive"] != null;
    };
    StateManager.prototype.getParamUpDownName = function (state) {
      if (state.meta["atkUp"]) {
        return TextManager.atkUpTarget.format(state.meta["atkUp"]);
      } else if (state.meta["atkDown"]) {
        return TextManager.atkDownTarget.format(state.meta["atkDown"]);
      } else if (state.meta["defUp"]) {
        return TextManager.atkDownTarget.format(state.meta["atkUp"]);
      } else if (state.meta["defDown"]) {
        return TextManager.defDownTarget.format(state.meta["defDown"]);
      }
      return "";
    };
    StateManager.prototype.getStateDesc = function (state) {
      if (state.id == 1) {
        return "";
      }
      /*if (this.isCantMove(state)) {
                return TextManager.cantMove;
            }*/
      //if (this.isMaxDamage(state)) {
      //    return TextManager.maxDamage;
      //}
      return "";
    };
    StateManager.prototype.isCantMove = function (state) {
      return state.restriction >= 4;
    };
    StateManager.prototype.isMaxDamage = function (state) {
      for (var _i = 0, _a = state.traits; _i < _a.length; _i++) {
        var trait = _a[_i];
        if (trait.code == 22 && trait.dataId == 1) {
          return true;
        }
      }
      return false;
    };
    StateManager.prototype.getStateName = function (state) {
      var name = getItemName(state);
      var index = name.indexOf("(");
      if (index < 0) {
        return name;
      }
      return name.substring(0, index);
    };
    StateManager.prototype.getBuffIcon = function (type, plus) {
      var offset = plus > 0 ? 0 : 16;
      var base = 706 + 16;
      switch (type) {
        case 2:
          return base + offset;
        case 3:
          return base + 1 + offset;
        case 4:
          return base + 2 + offset;
        case 5:
          return base + 3 + offset;
      }
      return 1;
    };
    StateManager.prototype.getBuffName = function (type, plus) {
      var preText = "";
      if (plus > 0) {
        preText = "+";
      }
      switch (type) {
        case 2:
          return "ATK " + preText + plus;
        case 3:
          return "DEF " + preText + plus;
        case 4:
          return "MAT " + preText + plus;
        case 5:
          return "MDF " + preText + plus;
      }
      return "none";
    };
    StateManager.prototype.getBuffText = function (type, plus) {
      if (plus > 0) {
        switch (type) {
          case 2:
            return TextManager.buff2.format(plus);
          case 3:
            return TextManager.buff3.format(plus);
          case 4:
            return TextManager.buff4.format(plus);
          case 5:
            return TextManager.buff5.format(plus);
        }
      } else {
        switch (type) {
          case 2:
            return TextManager.debuff2.format(Math.abs(plus));
          case 3:
            return TextManager.debuff3.format(Math.abs(plus));
          case 4:
            return TextManager.debuff4.format(Math.abs(plus));
          case 5:
            return TextManager.debuff5.format(Math.abs(plus));
        }
      }
      return "none";
    };
    StateManager.prototype.makeStateText = function (
      state,
      stateValue,
      battler
    ) {
      if (stateValue === void 0) {
        stateValue = 0;
      }
      if (battler === void 0) {
        battler = null;
      }
      var texts = [];
      this.makePassiveText(state, texts);
      this.makeFlagileText(state, texts);
      this.makeNintaiText(state, texts);
      this.makeHontaiText(state, texts);
      this.makeLongBreakText(state, texts);
      this.makeFearText(state, texts);
      this.makeProvokeText(state, texts);
      this.makeAimingText(state, texts);
      this.makeHasteText(state, texts);
      this.makeAntiBreakText(state, texts);
      this.makeRegeneText(state, texts);
      this.makeBlessText(state, texts);
      this.makeSpZeroText(state, texts);
      this.makeWrashText(state, texts);
      this.makeMistText(state, texts);
      this.makeDamageUpText(state, texts);
      this.makeCantMoveText(state, texts);
      this.makeBakusaiText(state, texts);
      this.makeBuffText(state, texts);
      this.makeTogeText(state, texts);
      this.makeTogeDownMagicText(state, texts);
      this.makeMagicWeakness(state, texts);
      this.makeMikiriText(state, texts);
      this.makeBossText(state, texts);
      this.makeUtsurigiText(state, texts);
      this.makeGekkouText(state, texts);
      this.makeUndeadText(state, texts);
      this.makeInvalidateDebuffText(state, texts);
      this.makeCountDownText(state, texts);
      this.makePhotosynthesizeText(state, texts, battler);
      this.makeDeathAgonyText(state, texts);
      this.makeSyuchuText(state, texts);
      this.makeMeltingText(state, texts);
      this.makeMpChargeText(state, texts);
      this.makeEarthBenefitText(state, texts);
      this.makeDarkBenefitText(state, texts);
      this.makeFireBenefitText(state, texts);
      this.makeCurseText(state, texts);
      this.makeTransformText(state, texts);
      this.makeShareHpText(state, texts);
      this.makeKogoroshiText(state, texts);
      this.makeCounterText(state, texts);
      this.makeResurectionText(state, texts);
      this.makeSyunbinText(state, texts);
      this.makeHardeningText(state, texts, stateValue);
      this.makeBleedingText(state, texts, stateValue);
      this.makeAntiMadanText(state, texts, stateValue);
      this.makeDamageDownText(state, texts, stateValue);
      this.makeMaxShieldDownText(state, texts, stateValue);
      this.makeArmorText(state, texts);
      this.makeMdfArmorText(state, texts);
      this.makeBarrierText(state, texts);
      this.makeBunshinText(state, texts);
      this.makeDamageRateUpText(state, texts);
      this.makeMpRecoverText(state, texts);
      this.makeMagicBarrierText(state, texts);
      this.makeHalfText(state, texts);
      var text = texts.join("\n");
      if (texts.length >= 3) {
        p(texts);
      }
      return text;
    };
    StateManager.prototype.makePassiveText = function (state, texts) {
      if (state.meta["passive"]) {
        texts.push("\\C[6]" + TextManager.passive + "\\C[0]");
      }
    };
    StateManager.prototype.makeFlagileText = function (state, texts) {
      if (state.meta["flagile"]) {
        texts.push(TextManager.flagile);
      }
    };
    StateManager.prototype.makeNintaiText = function (state, texts) {
      if (state.meta["nintai"]) {
        texts.push(TextManager.nintai);
      }
    };
    StateManager.prototype.makeHontaiText = function (state, texts) {
      if (state.meta["hontai"]) {
        texts.push(TextManager.hontai);
      }
    };
    StateManager.prototype.makeLongBreakText = function (state, texts) {
      if (state.meta["longBreak"]) {
        texts.push(TextManager.longBreak);
      }
    };
    StateManager.prototype.makeFearText = function (state, texts) {
      if (state.meta["fear"]) {
        texts.push(TextManager.fear.format(state.meta["stateValue"]));
      }
    };
    StateManager.prototype.makeProvokeText = function (state, texts) {
      if (state.meta["provoke"]) {
        texts.push(TextManager.provoke.format(state.meta["provoke"]));
      }
    };
    StateManager.prototype.makeAimingText = function (state, texts) {
      if (state.meta["aiming"]) {
        texts.push(TextManager.aiming.format(state.meta["aiming"]));
      }
    };
    StateManager.prototype.makeHasteText = function (state, texts) {
      if (state.meta["haste"]) {
        texts.push(TextManager.haste.format(state.meta["haste"]));
      }
    };
    StateManager.prototype.makeAntiBreakText = function (state, texts) {
      if (state.meta["antiBreak"]) {
        texts.push(TextManager.antiBreak.format(state.meta["antiBreak"]));
      }
    };
    StateManager.prototype.makeRegeneText = function (state, texts) {
      for (var _i = 0, _a = state.traits; _i < _a.length; _i++) {
        var trait = _a[_i];
        if (trait.code == 22 && trait.dataId == 7) {
          var num = Math.round(trait.value * 100);
          if (num > 0) {
            texts.push(TextManager.regene.format(num));
          } else {
            if (num == -1) {
              texts.push(TextManager.slipDamage.format());
            } else {
              texts.push(TextManager.slipDamageFixed.format(Math.abs(num)));
            }
          }
        }
      }
    };
    StateManager.prototype.makeHalfText = function (state, texts) {
      if (state.meta["kaihiBunsin"]) {
        return;
      }
      if (state.meta["bullet"]) {
        if ($gameSystem.stageId() == 7) {
          texts.push(TextManager.stateBullet2);
        } else {
          texts.push(TextManager.stateBullet);
        }
        return;
      }
      switch (state.meta["decrease"]) {
        case "invoke":
          texts.push(TextManager.stateTurnInvoke);
          break;
        case "half":
          texts.push(TextManager.stateTurnHalf);
          break;
        case "all":
          texts.push(TextManager.stateTurnAll);
          break;
        case "none":
          if (!this.isPassiveState(state)) {
            texts.push(TextManager.stateTurnNone);
          }
          break;
      }
    };
    StateManager.prototype.makeBlessText = function (state, texts) {
      if (state.meta["bless"]) {
        texts.push(TextManager.blessText2);
        texts.push(TextManager.blessText3);
      }
    };
    StateManager.prototype.makeTogeText = function (state, texts) {
      if (state.meta["toge"]) {
        texts.push(TextManager.stateToge);
      }
    };
    StateManager.prototype.makeTogeDownMagicText = function (state, texts) {
      if (state.meta["togeDownMagic"]) {
        texts.push(TextManager.stateTogeDownMagic);
      }
    };
    StateManager.prototype.makeMagicWeakness = function (state, texts) {
      if (state.meta["magicWeakness"]) {
        texts.push(TextManager.stateMagicWeakness);
      }
    };
    StateManager.prototype.makeMikiriText = function (state, texts) {
      if (state.meta["mikiri"]) {
        texts.push(TextManager.stateMikiri);
      }
    };
    StateManager.prototype.makeSyuchuText = function (state, texts) {
      if (state.meta["syuchu"]) {
        texts.push(TextManager.stateSyuchu);
      }
    };
    StateManager.prototype.makeMeltingText = function (state, texts) {
      if (state.meta["melting"]) {
        texts.push(TextManager.stateMelting);
      }
    };
    StateManager.prototype.makeCounterText = function (state, texts) {
      if (state.meta["counter"]) {
        texts.push(TextManager.stateCounter);
      }
      if (state.meta["damageCut"]) {
        var n = state.meta["damageCut"];
        var actor = $gameActors.actor(1);
        var plus = actor.countEquipMeta(EquipMeta.guardRate);
        if (plus > 0) {
          n = n + "(+%1)".format(plus);
        }
        texts.push(TextManager.stateDamageCut.format(n));
      }
    };
    StateManager.prototype.makeMpChargeText = function (state, texts) {
      if (state.meta["mpCharge"]) {
        var actorId = state.meta["mpCharge"];
        var actor = $gameActors.actor(actorId);
        var n = actor.countSkill(SkillMeta.mpCharge);
        texts.push(TextManager.stateMpCharge.format(n));
      }
    };
    StateManager.prototype.makeBossText = function (state, texts) {
      if (state.meta["boss"]) {
        texts.push(TextManager.stateBoss);
      }
    };
    StateManager.prototype.makeEarthBenefitText = function (state, texts) {
      if (state.meta["earthBenefit"]) {
        texts.push(TextManager.stateEarthBenefit);
      }
    };
    StateManager.prototype.makeDarkBenefitText = function (state, texts) {
      if (state.meta["darkBenefit"]) {
        texts.push(TextManager.stateDarkBenefit);
      }
    };
    StateManager.prototype.makeFireBenefitText = function (state, texts) {
      if (state.meta["fireBenefit"]) {
        texts.push(TextManager.stateFireBenefit);
      }
    };
    StateManager.prototype.makeCurseText = function (state, texts) {
      if (state.meta["curse"]) {
        texts.push(TextManager.stateCurse);
      }
    };
    StateManager.prototype.makeTransformText = function (state, texts) {
      if (state.meta["transform"]) {
        texts.push(TextManager.stateTransform);
      }
    };
    StateManager.prototype.makeShareHpText = function (state, texts) {
      if (state.meta["shareHp"]) {
        texts.push(TextManager.stateShareHp);
      }
    };
    StateManager.prototype.makeKogoroshiText = function (state, texts) {
      if (state.meta["kogoroshi"]) {
        texts.push(TextManager.stateKogoroshi);
      }
    };
    StateManager.prototype.makeSyunbinText = function (state, texts) {
      if (state.meta["syunbin"]) {
        texts.push(TextManager.stateSyunbin.format(state.meta["buffValue"]));
      }
    };
    StateManager.prototype.makeHardeningText = function (
      state,
      texts,
      stateValue
    ) {
      if (state.meta["hardening"]) {
        texts.push(TextManager.stateHardening.format(stateValue));
      }
    };
    StateManager.prototype.makeBleedingText = function (
      state,
      texts,
      stateValue
    ) {
      if (state.meta["bleeding"]) {
        texts.push(TextManager.stateBleeding.format(stateValue));
      }
    };
    StateManager.prototype.makeAntiMadanText = function (
      state,
      texts,
      stateValue
    ) {
      if (state.meta["antiMadan"]) {
        texts.push(TextManager.stateAntiMadan.format(stateValue));
      }
    };
    StateManager.prototype.makeDamageDownText = function (
      state,
      texts,
      stateValue
    ) {
      if (state.meta["damageDown"]) {
        texts.push(
          TextManager.stateDamageDown.format(state.meta["damageDown"])
        );
      }
    };
    StateManager.prototype.makeMaxShieldDownText = function (
      state,
      texts,
      stateValue
    ) {
      if (state.meta["maxShieldDown"]) {
        texts.push(
          TextManager.maxShieldDown.format(state.meta["maxShieldDown"])
        );
      }
    };
    StateManager.prototype.makeArmorText = function (state, texts) {
      if (state.meta["armor"]) {
        texts.push(TextManager.stateArmor);
      }
    };
    StateManager.prototype.makeMdfArmorText = function (state, texts) {
      if (state.meta["mdfArmor"]) {
        texts.push(TextManager.stateMdfArmor);
      }
    };
    StateManager.prototype.makeBarrierText = function (state, texts) {
      if (state.meta["barrier"]) {
        texts.push(TextManager.barrier);
      }
    };
    StateManager.prototype.makeBunshinText = function (state, texts) {
      if (state.meta["kaihiBunsin"]) {
        texts.push(TextManager.bunshinState);
      }
    };
    StateManager.prototype.makeDamageRateUpText = function (state, texts) {
      if (state.meta["damageRateUp"]) {
        texts.push(
          TextManager.damageRateUpState.format(state.meta["damageRateUp"])
        );
      }
    };
    StateManager.prototype.makeUtsurigiText = function (state, texts) {
      if (state.meta["utsurigi"]) {
        texts.push(TextManager.stateUtsurigi);
      }
    };
    StateManager.prototype.makeResurectionText = function (state, texts) {
      if (state.meta["resurection"]) {
        texts.push(
          TextManager.stateResurection.format(state.meta["resurection"])
        );
      }
    };
    StateManager.prototype.makeGekkouText = function (state, texts) {
      if (state.meta["gekkou"]) {
        texts.push(TextManager.stateGekkou);
      }
    };
    StateManager.prototype.makeUndeadText = function (state, texts) {
      if (state.meta["undead"]) {
        texts.push(TextManager.stateUndead);
      }
    };
    StateManager.prototype.makeInvalidateDebuffText = function (state, texts) {
      if (state.meta["invalidateDebuff"]) {
        texts.push(TextManager.stateInvalidateDebuff);
      }
    };
    StateManager.prototype.makeCountDownText = function (state, texts) {
      if (state.meta["countDown"]) {
        texts.push(TextManager.stateCountDown);
      }
    };
    StateManager.prototype.makePhotosynthesizeText = function (
      state,
      texts,
      battler
    ) {
      if (state.meta["photosynthesize"]) {
        if (battler) {
          if (battler.isEnemy()) {
            var value = battler.photosynthesizeValue();
            texts.push(TextManager.statePhotosynthesize.format(value));
          }
        }
      }
    };
    StateManager.prototype.makeDeathAgonyText = function (state, texts) {
      if (state.meta["deathAgony"]) {
        texts.push(TextManager.stateDeathAgony);
      }
    };
    StateManager.prototype.makeSpZeroText = function (state, texts) {
      if (state.meta["spZero"]) {
        texts.push(TextManager.spZeroText);
      }
    };
    StateManager.prototype.makeWrashText = function (state, texts) {
      if (state.meta["wrash"]) {
        texts.push(TextManager.wrashState);
      }
    };
    StateManager.prototype.makeMistText = function (state, texts) {
      if (state.meta["mist"]) {
        texts.push(TextManager.mist);
      }
    };
    StateManager.prototype.makeDamageUpText = function (state, texts) {
      if (state.meta["damageUp"]) {
        texts.push(TextManager.damageUp.format(state.meta["damageUp"]));
      }
    };
    /*makeCounterText(state: RPG.State, texts: Array<string>) {
            if (state.meta['counter']) {
                texts.push(TextManager.counter1);
                texts.push(TextManager.counter2);
            }
        }*/
    StateManager.prototype.makeDamageCutText = function (state, texts) {
      if (state.meta["damageCut"]) {
        texts.push(TextManager.damageCut.format(state.meta["damageCut"]));
      }
    };
    StateManager.prototype.makeBuffText = function (state, texts) {
      if (state.meta["addBuff"]) {
        texts.push(
          TextManager.addBuff.format(
            state.meta["addBuff"],
            state.meta["buffValue"]
          )
        );
      }
    };
    StateManager.prototype.makeBakusaiText = function (state, texts) {
      if (state.meta["bakusai"]) {
        texts.push(TextManager.bakusai.format(state.meta["bakusai"]));
      }
    };
    StateManager.prototype.makeCantMoveText = function (state, texts) {
      if (this.isCantMove(state)) {
        texts.push(TextManager.cantMove);
        texts.push(TextManager.maxDamage);
      }
    };
    StateManager.prototype.makeMpRecoverText = function (state, texts) {
      if (state.meta["mpRecovery"]) {
        texts.push(TextManager.mpRecovery);
      }
    };
    StateManager.prototype.makeMagicBarrierText = function (state, texts) {
      if (state.meta["magicBarrier"]) {
        texts.push(TextManager.magicBarrier);
      }
    };
    return StateManager;
  })();
  Nore.$stateManager = new StateManager();
  var _Game_Battler_prototype_states = Game_Battler.prototype.states;
  Game_Battler.prototype.states = function () {
    var states = _Game_Battler_prototype_states.call(this);
    states = states.sort(function (a, b) {
      var orderA = a.id;
      var orderB = b.id;
      if (a.meta["order"]) {
        orderA = parseInt(a.meta["order"]);
      }
      if (b.meta["order"]) {
        orderB = parseInt(b.meta["order"]);
      }
      return orderA - orderB;
    });
    return states;
  };
  Game_Battler.prototype.countState = function (label) {
    var total = 0;
    for (var _i = 0, _a = this.states(); _i < _a.length; _i++) {
      var s = _a[_i];
      if (s.meta[label]) {
        total += Math.trunc(s.meta[label]);
      }
    }
    return total;
  };
  Game_Battler.prototype.countArmor = function (label) {
    return 0;
  };
  Game_Battler.prototype.findStateByMeta = function (meta) {
    for (var _i = 0, _a = this.states(); _i < _a.length; _i++) {
      var s = _a[_i];
      if (s.meta[meta]) {
        return s.id;
      }
    }
    console.error("stateが見つかりません" + meta);
    return 0;
  };
  Game_Battler.prototype.addState = function (stateId, turns) {
    if (this.isStateAddable(stateId)) {
      this.onAddState(stateId);
      if (this.canAddState(stateId)) {
        this.addNewState(stateId, turns);
        var state = $dataStates[stateId];
        if (!Nore.$stateManager.isPassiveState(state)) {
          this.refresh();
        }
      }
      this.addStateTurns(stateId, turns);
      this._result.pushAddedState(stateId);
    }
  };
  Game_Battler.prototype.onAddState = function (stateId) {};
  Game_Battler.prototype.addStateTurns = function (stateId, turns) {
    var state = $dataStates[stateId];
    if (state.meta["single"]) {
      if (this._stateTurns[stateId] > 0) {
        return false;
      }
    }
    this._stateTurns[stateId] = this._stateTurns[stateId] || 0;
    this._stateTurns[stateId] += turns;
  };
  Game_Battler.prototype.minusStateTurns = function (stateId, turns) {
    this._stateTurns[stateId] = this._stateTurns[stateId] || 0;
    if (this._stateTurns[stateId] <= 0) {
      return;
    }
    this._stateTurns[stateId] -= turns;
    if (this._stateTurns[stateId] <= 0) {
      this._stateTurns[stateId] = 0;
      this.removeState(stateId);
    }
    this.setDirty();
  };
  Game_Battler.prototype.minusStateTurnsByMeta = function (stateMeta, turns) {
    var stateId = this.findStateIdByMeta(stateMeta);
    if (stateId <= 0) {
      console.error(stateMeta + " " + "のステートが見つかりません");
      return;
    }
    this.minusStateTurns(stateId, turns);
  };
  Game_Battler.prototype.findStateIdByMeta = function (stateMeta) {
    for (var _i = 0, _a = this.states(); _i < _a.length; _i++) {
      var s = _a[_i];
      if (s.meta[stateMeta]) {
        return s.id;
      }
    }
    return -1;
  };
  Game_Battler.prototype.canAddState = function (stateId) {
    var state = $dataStates[stateId];
    if (state.meta["multiple"]) {
      return true;
    }
    return !this.isStateAffected(stateId);
  };
  Game_Battler.prototype.onTurnEnd = function () {
    this.clearResult();
    //if ($gameTroop.turnCount() > 0) {
    this.regenerateAll();
    //}
    //this.updateStateTurns();
    //this.updateBuffTurns();
    //this.removeStatesAuto(2);
    //this.addBuffsAuto();
  };
  Game_Battler.prototype.regenerateAll = function () {
    if (this.isAlive()) {
      /*if (this.isActor()) {
                this.regenerateHpDown();
            }*/
      this.regenerateMp();
      //this.regenerateTp();
    }
  };
  Game_Battler.prototype.regenerateHpDown = function () {
    var minRecover = -this.maxSlipDamage();
    var value = Math.max(Math.floor(this.slipDamage()), minRecover);
    if (value < 0) {
      //p('slipDamage:' + value)
      this.gainHp(value);
      this.onSlipDamage(value);
      this.startDamagePopup();
      if (this.isDead()) {
        this.performCollapse();
      } else {
      }
    }
  };
  Game_Battler.prototype.regenerateHpUp = function () {
    var minRecover = -this.maxSlipDamage();
    var value = Math.max(Math.floor(this.slipDamage()), minRecover);
    if (value > 0) {
      this.gainHp(value);
      this.startDamagePopup();
      if (this.isDead()) {
        this.performCollapse();
      } else {
      }
    }
  };
  Game_BattlerBase.prototype.updateStateTurns = function () {
    for (var _i = 0, _a = this._states; _i < _a.length; _i++) {
      var stateId = _a[_i];
      if (this._stateTurns[stateId] > 0) {
        var state = $dataStates[stateId];
        if (state.meta["decrease"] == "half") {
          this._stateTurns[stateId] = Math.floor(this._stateTurns[stateId] / 2);
        } else if (state.meta["decrease"] == "none") {
          // 何もしない
        } else if (state.meta["decrease"] == "invoke") {
          // 何もしない
        } else if (state.meta["decrease"] == "all") {
          if (this._stateTurns[stateId] > 1) {
            this._stateTurns[stateId] = 1;
          } else {
            this._stateTurns[stateId] = 0;
          }
        } else {
          this._stateTurns[stateId]--;
        }
      }
    }
  };
  Game_BattlerBase.prototype.resetStateCounts = function (stateId) {
    var state = $dataStates[stateId];
    var variance = 1 + Math.max(state.maxTurns - state.minTurns, 0);
    this._stateTurns[stateId] =
      state.minTurns + enemyBonus + Math.randomInt(variance);
  };
  Game_Action.prototype.itemEffectAddNormalState = function (target, effect) {
    var chance = effect.value1;
    if (!this.isCertainHit()) {
      chance *= target.stateRate(effect.dataId);
      chance *= this.lukEffectRate(target);
    }
    if (Math.random() < chance) {
      target.addState(effect.dataId, this.subject().isEnemy());
      this.makeSuccess(target);
    }
  };
  var Sprite_StateIcon2 = /** @class */ (function (_super) {
    __extends(Sprite_StateIcon2, _super);
    function Sprite_StateIcon2() {
      var _this = _super.call(this) || this;
      _this._animationCount = 0;
      _this._lastStates = [];
      _this._lastStateTurns = [];
      _this.bitmap = new Bitmap(200, 50);
      return _this;
    }
    Sprite_StateIcon2.prototype.setup = function (battler) {
      if (this._battler !== battler) {
        this._battler = battler;
      }
    };
    Sprite_StateIcon2.prototype.update = function () {
      _super.prototype.update.call(this);
      this._animationCount++;
      if (this._animationCount >= this.animationWait()) {
        this.updateIcon();
        this._animationCount = 0;
      }
    };
    Sprite_StateIcon2.prototype.updateIcon = function () {
      if (this.isChanged()) {
        this.refresh();
      }
    };
    Sprite_StateIcon2.prototype.refresh = function () {
      this._lastStates = this._battler.states().concat();
      this.bitmap.clear();
      var x = 0;
      this._lastStateTurns = [];
      this.bitmap.fontSize = 12;
      var interval = 30;
      for (var _i = 0, _a = this._lastStates; _i < _a.length; _i++) {
        var s = _a[_i];
        this.drawIconMini(s.iconIndex, x, 0);
        var turn = this.getStateTurns(s);
        this._lastStateTurns.push(turn);
        if (turn >= 1) {
          this.bitmap.drawText(turn + "", x - 8, 15, 30, 30, "right");
        }
        x += interval;
      }
    };
    Sprite_StateIcon2.prototype.isChanged = function () {
      var states = this._battler.states();
      if (states.length != this._lastStates.length) {
        return true;
      }
      for (var _i = 0, states_1 = states; _i < states_1.length; _i++) {
        var s = states_1[_i];
        if (!this._lastStates.contains(s)) {
          return true;
        }
      }
      for (var i = 0; i < this._lastStateTurns.length; i++) {
        var turn = this._lastStateTurns[i];
        var s2 = states[i];
        if (this.getStateTurns(s2) != turn) {
          return true;
        }
      }
      return false;
    };
    Sprite_StateIcon2.prototype.getStateTurns = function (s) {
      if (s.meta["armor"]) {
        var actor = this._battler;
        return actor.armorCount();
      }
      if (s.meta["mdfArmor"]) {
        var actor = this._battler;
        return actor.mdfCount();
      }
      if (s.meta["bless"]) {
        var actorId = Math.trunc(s.meta["bless"]);
        return $gameActors.actor(actorId).bless();
      }
      if (s.meta["wrash"]) {
        var actorId = Math.trunc(s.meta["wrash"]);
        return $gameActors.actor(actorId).wrash();
      }
      if (s.meta[StateMeta.mpCharge]) {
        var actor = this._battler;
        return actor.mpChargeValue();
      }
      var turn = this._battler._stateTurns[s.id];
      if (s.meta["decrease"] == "invoke") {
        return turn;
      }
      if (s.meta["decrease"] == turn) {
        return turn;
      }
      if (s.autoRemovalTiming == 0) {
        return -1;
      }
      if (turn == 0 && s.autoRemovalTiming == 2) {
        // ターン終了時に切れるステート
        return 1;
      }
      return turn;
    };
    Sprite_StateIcon2.prototype.animationWait = function () {
      return 10;
    };
    return Sprite_StateIcon2;
  })(Sprite_Clickable);
  Nore.Sprite_StateIcon2 = Sprite_StateIcon2;
  var BUFF_INTERVAL = 25;
  var ENEMY_BUFF_Y = 490;
  var Sprite_BuffIcon = /** @class */ (function (_super) {
    __extends(Sprite_BuffIcon, _super);
    function Sprite_BuffIcon() {
      var _this = _super.call(this) || this;
      _this._animationCount = 0;
      _this._lastBuffs = [];
      _this.bitmap = new Bitmap(200, 50);
      return _this;
    }
    Sprite_BuffIcon.prototype.setup = function (battler) {
      if (this._battler !== battler) {
        this._battler = battler;
      }
    };
    Sprite_BuffIcon.prototype.update = function () {
      _super.prototype.update.call(this);
      if (this._battler.isEnemy()) {
        this.updateEnemyPosition();
      }
      this._animationCount++;
      if (this._animationCount >= this.animationWait()) {
        this.updateIcon();
        this._animationCount = 0;
      }
    };
    Sprite_BuffIcon.prototype.updateEnemyPosition = function () {
      if (this._battler.isBack()) {
        this.y = ENEMY_BUFF_Y - 60;
      } else {
        this.y = ENEMY_BUFF_Y;
      }
    };
    Sprite_BuffIcon.prototype.updateIcon = function () {
      if (this.isChanged()) {
        this.refresh();
      }
    };
    Sprite_BuffIcon.prototype.refresh = function () {
      this._lastBuffs = this._battler.buffs().concat();
      this.bitmap.clear();
      if (this._battler.isEnemy()) {
        this.drawBg();
      }
      var x = 3;
      var y = 2;
      this.bitmap.fontSize = 12;
      var interval = BUFF_INTERVAL;
      for (var i = 0; i < this._lastBuffs.length; i++) {
        var up = this._lastBuffs[i];
        if (up != 0) {
          this.drawIconMini(Nore.$stateManager.getBuffIcon(i, up), x, y);
          if (up > 0) {
            this.changeTextColor(ColorManager.textColor(24));
          } else {
            this.changeTextColor(ColorManager.textColor(31));
          }
          this.bitmap.drawText(up + "", x - 8, y + 13, 30, 30, "right");
          x += interval;
        }
      }
    };
    Sprite_BuffIcon.prototype.drawBg = function () {
      var count = 0;
      for (var i = 0; i < this._lastBuffs.length; i++) {
        var up = this._lastBuffs[i];
        if (up != 0) {
          count++;
        }
      }
      if (count == 0) {
        return;
      }
      this.bitmap.fillRect(0, 0, count * BUFF_INTERVAL + 6, 38, "#00000096");
    };
    Sprite_BuffIcon.prototype.isChanged = function () {
      var buffs = this._battler.buffs();
      for (var i = 0; i < buffs.length; i++) {
        if (buffs[i] != this._lastBuffs[i]) {
          return true;
        }
      }
      return false;
    };
    Sprite_BuffIcon.prototype.animationWait = function () {
      return 10;
    };
    return Sprite_BuffIcon;
  })(Sprite_Clickable);
  Nore.Sprite_BuffIcon = Sprite_BuffIcon;
})(Nore || (Nore = {}));
