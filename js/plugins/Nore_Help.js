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
var Nore;
(function (Nore) {
  var StateHelp = /** @class */ (function () {
    function StateHelp(skill, state) {
      this.skill = skill;
      this.state = state;
    }
    return StateHelp;
  })();
  var Window_BattleHelp = /** @class */ (function (_super) {
    __extends(Window_BattleHelp, _super);
    function Window_BattleHelp(r) {
      var _this = _super.call(this, r) || this;
      var rect = new Rectangle(0, r.height, 485, 130);
      _this._stateHelp = new Window_StateHelp(rect);
      _this.addChild(_this._stateHelp);
      var rect2 = new Rectangle(0, rect.y + rect.height, 485, 130);
      _this._stateHelp2 = new Window_StateHelp(rect2);
      _this.addChild(_this._stateHelp2);
      return _this;
    }
    Window_BattleHelp.prototype.drawStateHelpKeyInfo = function () {
      if (this._stateHelp.item()) {
        this.contents.fontSize = 14;
        this.contents.textColor = ColorManager.normalColor();
        this.contents.clearRect(this.width - 300, this.height - 45, 300, 60);
        if (this._stateHelp.visible) {
          this.drawText(
            TextManager.hideDetail,
            0,
            this.height - 56,
            this.width - 40,
            "right"
          );
        } else {
          this.drawText(
            TextManager.showDetail,
            0,
            this.height - 56,
            this.width - 40,
            "right"
          );
        }
      }
    };
    Window_BattleHelp.prototype.setItem = function (item) {
      if (item instanceof UsableItem) {
        item = item.item();
      }
      _super.prototype.setItem.call(this, item);
      this._stateHelp.clearItem();
      this._stateHelp2.clearItem();
      this._stateHelp.hide();
      this._stateHelp2.hide();
      var stateList = this.stateHelpList(item);
      for (var i = 0; i < stateList.length; i++) {
        var stateHelp = stateList[i];
        if (i == 0) {
          this._stateHelp.setState(stateHelp.skill, stateHelp.state);
        } else {
          this._stateHelp2.setState(stateHelp.skill, stateHelp.state);
        }
      }
      this.drawStateHelpKeyInfo();
    };
    Window_BattleHelp.prototype.stateHelpList = function (item) {
      var result = [];
      if (!item) {
        return result;
      }
      var skill = this.extractSkill(item);
      if (!skill) {
        return result;
      }
      if (!skill.effects) {
        return result;
      }
      for (var i = 0; i < skill.effects.length; i++) {
        var effect = skill.effects[i];
        if (effect.code == 21) {
          var state = $dataStates[effect.dataId];
          if (!state) {
            console.error(effect.dataId);
            continue;
          }
          if (state.meta["noDisplay"]) {
            continue;
          }
          result.push(new StateHelp(skill, state));
        }
      }
      if (skill.meta["bless"] || skill.meta["initialBless"] != null) {
        result.push(new StateHelp(skill, $dataStates[StateId.BLESS]));
      }
      if (skill.meta["wrash"] || skill.meta["wrash2"] || skill.meta["wrash3"]) {
        result.push(new StateHelp(skill, $dataStates[StateId.WRASH]));
      }
      if (skill.meta["bunshin"]) {
        result.push(new StateHelp(skill, $dataStates[StateId.MIKIRI]));
      }
      if (skill.meta["kaihiBunsin"]) {
        result.push(new StateHelp(skill, $dataStates[StateId.KAIHI_BUNSIN]));
      }
      var stateId = parseInt(skill.meta["addState"]);
      if (stateId > 0) {
        var state = $dataStates[stateId];
        if (state.meta["noDisplay"]) {
        } else {
          result.push(new StateHelp(skill, state));
        }
      }
      return result;
    };
    Window_BattleHelp.prototype.extractSkill = function (item) {
      if (DataManager.isSkill(item)) {
        return item;
      }
      if (DataManager.isItem(item)) {
        return item;
      }
      if (item.isEnemy) {
        return this.extractEnemy(item);
      }
      if (item instanceof Equip) {
        return this.extractEquip(item);
      }
      return null;
    };
    Window_BattleHelp.prototype.extractEquip = function (item) {
      var equip = item;
      return equip.skill();
    };
    Window_BattleHelp.prototype.extractEnemy = function (item) {
      var enemy = item;
      var action = enemy.currentAction();
      if (!action) {
        return;
      }
      if (!action.isSkill()) {
        return;
      }
      return action.item();
    };
    Window_BattleHelp.prototype.processEscapeCharacter = function (
      code,
      textState
    ) {
      switch (code) {
        case "II":
          this.processDrawBigIcon(this.obtainEscapeParam(textState), textState);
          break;
        default:
          _super.prototype.processEscapeCharacter.call(this, code, textState);
      }
    };
    Window_BattleHelp.prototype.processDrawIcon = function (
      iconIndex,
      textState
    ) {
      if (textState.drawing) {
        this.drawIconMini(iconIndex, textState.x + 2, textState.y + 7);
      }
      textState.x += ImageManager.iconWidth + 4 - 4;
    };
    Window_BattleHelp.prototype.processDrawBigIcon = function (
      iconIndex,
      textState
    ) {
      if (textState.drawing) {
        this.drawIcon(iconIndex, textState.x + 2, textState.y + 2);
      }
      textState.x += ImageManager.iconWidth + 4;
    };
    Window_BattleHelp.prototype.update = function () {
      _super.prototype.update.call(this);
      if (this.visible) {
        if (Input.isTriggered("shift")) {
          $gameTemp.hideStateInfo = !$gameTemp.hideStateInfo;
          if ($gameTemp.hideStateInfo) {
            this._stateHelp.hide();
            this._stateHelp2.hide();
            this.drawStateHelpKeyInfo();
          } else {
            if (this._stateHelp.item()) {
              this._stateHelp.show();
              this.drawStateHelpKeyInfo();
            }
            if (this._stateHelp2.item()) {
              this._stateHelp2.show();
            }
          }
        }
      }
    };
    return Window_BattleHelp;
  })(Window_Help);
  Nore.Window_BattleHelp = Window_BattleHelp;
  var Window_StateHelp = /** @class */ (function (_super) {
    __extends(Window_StateHelp, _super);
    function Window_StateHelp() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Window_StateHelp.prototype.setItem = function (item) {
      _super.prototype.setItem.call(this, item);
      this._item = item;
    };
    Window_StateHelp.prototype.clearItem = function () {
      this._item = null;
    };
    Window_StateHelp.prototype.item = function () {
      return this._item;
    };
    Window_StateHelp.prototype.setState = function (item, state) {
      var text = "";
      text += "　\\C[2]" + Nore.$stateManager.getStateName(state) + "\\C[0]";
      text += "\n";
      text += "\\FS[18]";
      text += this.makeStateDescrupion(item, state);
      this.setText(text);
      this.drawIconMini(state.iconIndex, 8, 6);
      this._item = item;
      if (!$gameTemp.hideStateInfo) {
        this.show();
      }
    };
    Window_StateHelp.prototype.makeStateDescrupion = function (item, state) {
      var text = "";
      return Nore.$stateManager.makeStateText(state);
    };
    return Window_StateHelp;
  })(Window_Help);
  Nore.Window_StateHelp = Window_StateHelp;
  Window_Help.prototype.setItem = function (item) {
    if (!$gameTemp.inInfo) {
      $gameParty.clearForecast();
    }
    if (item instanceof Nore.Game_Enemy2) {
      if (!this.visible) {
        return;
      }
      var enemy = item;
      var action = enemy.currentAction();
      if (!action || !action.isValid()) {
        if (enemy.isStun()) {
          var rate = enemy.breakDamageBonusRate() - 100;
          this.setText(TextManager.stunBreak.format(hankaku2Zenkaku(rate)));
        } else {
          this.setText("");
          this.hide();
        }
        return;
      }
      this.setText(makeEnemyDescription(item, action));
      this.contents.fontSize = 12;
      /*const turn = action.remainTurn();
            if (turn > 0) {
                this.drawText(turn + '',  40, 48, 100, 32, 'left');
            }*/
      return;
    }
    if (item && item.stypeId) {
      this.setText(getSkillDescription(item));
      return;
    }
    if (item && item.itypeId) {
      this.setText(getItemDescription(item));
      return;
    }
    if (DataManager.isWeapon(item)) {
      this.setText(getPlusText(item));
      return;
    }
    if ($gameMedals.isMedal(item)) {
      return this.setText(getMedalDescription(item));
    }
    if (item instanceof Item) {
      var itemObj = item;
      this.setText(itemObj.description());
    } else {
      this.setText(item ? item.description : "");
    }
  };
  function getSkillIcon(action) {
    if (action.isNormalAttack()) {
      return 2608;
    } else if (action.isPhysical()) {
      return 2210;
    } else if (action.isMagical()) {
      return 2211;
    }
    if (action.isRecover()) {
      return 392;
    } else {
      return 407;
    }
  }
  function makeEnemyDescription(enemy, action) {
    var text = ""; // '攻撃力:' + enemy.atk;
    var skill = action.item();
    text += "\\II[" + getSkillIcon(action) + "]";
    text += "\\C[2]" + getItemName(skill) + "\\C[0]";
    if (action.isDamage() || action.isRecover() || action.isDebuff()) {
      if (action.isRecover()) {
        text += "\\C[3]";
      }
      var damage = action.makeDamageValue($gameActors.actor(100), false);
      text += "(" + Math.abs(damage) + ")";
      text += "\\C[0]→";
      text += makeTargetText(action);
    } else {
      text += "　";
    }
    text += "　";
    text += getPenetrateText(action.item());
    //text += getParamUpDownText(action.item());
    text += getStateInfo1(action.item());
    text += getStateInfo2(action.item());
    text += getStateInfo3(action.item());
    text += getDelayAction(action.item());
    text += "\n";
    /*if (action.remainTurn() >= 1) {
            text += '\\I[' + 2192 + ']　';
   
            //text +=  TextManager.prepare.format(turn);
        }*/
    for (var i = 0; i < skill.effects.length; i++) {
      var effect = skill.effects[i];
      if (effect.code == 41) {
        text += "攻撃後、どこかへと去っていく";
      }
    }
    var armorBreak = parseInt(skill.meta["armorBreak"]);
    if (!isNaN(armorBreak)) {
      text +=
        "\\C[2]" +
        getItemName($dataStates[7]) +
        "\\C[0]" +
        "(" +
        armorBreak +
        ")";
    }
    text += getStunBonus(action.item());
    return text;
  }
  function makeTargetText(action) {
    var text = "";
    if (action.isForDeadFriend()) {
      return TextManager.deadFriend;
    }
    var actorCount = 0;
    for (var _i = 0, _a = action.makeTargets(); _i < _a.length; _i++) {
      var actor = _a[_i];
      if (actor.isEnemy()) {
        if (action.isForLine()) {
          if (action.isForFront()) {
            return TextManager.front;
          }
          if (action.isForBack()) {
            return TextManager.back;
          }
          return TextManager.line;
        }
        continue;
      }
      var damage2 = action.makeDamageValue(actor, false);
      if (actorCount > 0) {
        text += ", ";
      }
      text += actor.name();
      actorCount++;
      if (!$gameTemp.inInfo) {
        actor.forecast(action, damage2);
      }
    }
    if (action.isForLine()) {
      if (action.isForFront()) {
        return TextManager.frontLineAttack;
      } else if (action.isForBack()) {
        return TextManager.backLine;
      } else {
        var target = action._targets[0];
        if (target) {
          if (target.isFront()) {
            return TextManager.frontLine;
          } else {
            return TextManager.backLine;
          }
        }
      }
    }
    if (action.isForAll()) {
      return TextManager.forAll;
    }
    return text;
  }
  function getPenetrateText(skill) {
    if (skill.meta["penetrate"]) {
      return TextManager.penetrate;
    }
    return "";
  }
  Nore.getPenetrateText = getPenetrateText;
  function getSkillDescription(skill) {
    var text = "";
    text += getOugi(skill);
    text += getSkillSp(skill);
    if (skill.damage.type == 1) {
      if (skill.hitType == 1) {
        text += TextManager.physical;
      }
      if (skill.hitType == 2) {
        text += TextManager.masical;
      }
      text += getElement(skill);
      text += TextManager.damage + ":" + getDamageValue(skill) + "　"; //getDamageRate(skill) + '%　';
    }
    var a = new Game_Action2($gameActors.actor(1));
    a.setSkill(skill.id);
    if (skill.meta["shortRange"]) {
      if (!a.isForLine()) {
        text += "\\C[1]" + TextManager.shortRange + "　\\C[0]";
      }
    } else if (skill.meta["longRange"]) {
      text += "\\C[1]" + TextManager.longRange + "　\\C[0]";
    }
    if (skill.meta["line"]) {
      if (a.isHpRecover()) {
        text += "\\C[1]" + TextManager.lineHeal + "　\\C[0]";
      } else {
      }
    }
    if (a.isForOpponent()) {
      if (a.isForLine()) {
        if (a.isForFront()) {
          text += "\\C[1]" + TextManager.frontLineAttack + "　\\C[0]";
        } else if (a.isForBack()) {
          text += "\\C[1]" + TextManager.backLine + "　\\C[0]";
        } else {
          text += "\\C[1]" + TextManager.line + "　\\C[0]";
        }
      } else if (a.isForAll()) {
        text += "\\C[1]" + TextManager.targetAll + "　\\C[0]";
      } else if (a.isForRandom() && a.numTargets() > 1) {
        text +=
          "\\C[1]" +
          TextManager.targetRandom.format(a.numTargets()) +
          "　\\C[0]";
      }
    }
    text += getParamUp(skill);
    text += getResurrection(skill);
    text += getTargetText(skill);
    if (text.length > 40) {
      text += "\n";
    }
    var last = text.length;
    text += getStateInfo1(skill);
    text += getStateInfo2(skill);
    if (!$gameParty.inBattle()) {
      if (text.length > 0 && last < text.length) {
        text += "\n";
      }
    }
    text += getStateInfo3(skill);
    if ($gameParty.inBattle()) {
      if (text.length > 0 && last < text.length) {
        text += "\n";
      }
    }
    text += getStunDown(skill);
    text += getStunUp(skill);
    text += getCancel(skill);
    text += getBreakDamage(skill);
    text += getCounter(skill);
    text += getMikiri(skill);
    text += getTodome(skill);
    text += getReactAll(skill);
    text += getShield(skill);
    text += getMpPlus(skill);
    text += getMpPlusTurn(skill);
    text += getShieldAutoPlusAll(skill);
    text += getShieldAutoPlus(skill);
    text += getOugiAutoPlus(skill);
    text += getOugiPlus(skill);
    text += getOugiReact(skill);
    text += getSkillOugiPlus(skill);
    text += getProvoke(skill);
    text += getRenkan(skill);
    text += getWaterShield(skill);
    text += getRecover(skill);
    text += getCheer(skill);
    text += getMagicShield(skill);
    text += getMdfBuff(skill);
    text += getFixedDamage(skill);
    text += getMatDebuff(skill);
    text += getCondition(skill);
    text += getOugiMpRecover(skill);
    text += getOugiBuff(skill);
    text += getGiveReact(skill);
    text += getReact(skill);
    text += getFirstStrike(skill);
    text += getRemakeTarget(skill);
    text += getClenching(skill);
    text += getBless(skill);
    text += getBlessPlus(skill);
    text += getBonusBlessBuff(skill);
    text += getAddState(skill);
    text += getSlot(skill);
    text += getRequiredExpDown(skill);
    text += getRareSkill(skill);
    text += getLowerLimit(skill);
    text += getSkillLvUp(skill);
    text += getShieldHeal(skill);
    text += getMpHeal(skill);
    text += getFinishBlow(skill);
    text += getFinishBlow2(skill);
    text += getKubihane(skill);
    text += getWrash(skill);
    text += getBarrier(skill);
    text += getCombination(skill);
    text += getRemoveState(skill);
    text += getHolyBlessing(skill);
    text += getStunDeath(skill);
    text += getItemGet(skill);
    text += getCriticalSkill(skill);
    text += getShopSkill(skill);
    text += getPriceDown(skill);
    text += getEncyclopedia(skill);
    text += getStunBonus(skill);
    text += getSuddenStrike(skill);
    text += getAddDef(skill);
    text += getCure(skill);
    text += getStunMp(skill);
    text += getMagnet(skill);
    text += getSyukuchi(skill);
    text += getHellFire(skill);
    text += getYuugou(skill);
    text += getNokorimono(skill);
    text += getSkillDebuff(skill);
    text += getCritUp(skill);
    text += getCritUpAll(skill);
    text += getSkillCrit(skill);
    text += getInventory(skill);
    text += getBusshi(skill);
    text += getItemMp(skill);
    text += getHolyElement(skill);
    text += getPowerBoost(skill);
    text += getObento(skill);
    text += getObentoSave(skill);
    text += getBunshin(skill);
    text += getKaihiBunsin(skill);
    text += getJizai(skill);
    text += getCureBreak(skill);
    text += getMadan(skill);
    text += getPartyExp(skill);
    text += getLaboMember(skill);
    text += getLaboWeapon(skill);
    text += getLaboInitialLevel(skill);
    text += getLaboItem(skill);
    text += getLaboItem2(skill);
    text += getLaboMoney(skill);
    text += getLaboExp(skill);
    //text += getNumActions(skill);
    text += getRequiredSkill(skill);
    return text;
  }
  Nore.getSkillDescription = getSkillDescription;
  function getTargetText(skill) {
    var action = new Game_Action2($gameActors.actor(100));
    action.setSkill(skill.id);
    if (skill.meta["line"]) {
      if (action.isForFriend()) {
        if (action.isForFront()) {
          return "\\C[1]" + TextManager.forFrontFriend + "　\\C[0]";
        } else {
          return "\\C[1]" + TextManager.forLineFriend + "　\\C[0]";
        }
      }
      return "";
    }
    if (action.isForUser()) {
      return TextManager.forUser + "　";
    }
    if (action.isForAll() && action.isForFriend()) {
      return "\\C[1]" + TextManager.forAllFriend + "　\\C[0]";
    }
    return "";
  }
  function getElement(skill) {
    switch (skill.damage.elementId) {
      case 4:
        return "　" + TextManager.thunderElement + "　";
    }
    return "";
  }
  function getResurrection(skill) {
    for (var _i = 0, _a = skill.effects; _i < _a.length; _i++) {
      var trait = _a[_i];
      if (trait.code == 22 && trait.dataId == 1) {
        if (trait.value1 == 1) {
          return "戦闘不能を解除";
        }
      }
    }
    return "";
  }
  function getOugi(skill) {
    if (skill.meta["ougi"]) {
      return "\\C[10]" + TextManager.ougi + "\\C[0]  ";
    }
    return "";
  }
  function getSkillSp(skill) {
    /*if (! $gameParty.inBattle()) {
            if (skill.mpCost > 0) {
                return '\\C[16]' + TextManager.spCost + ':' + skill.mpCost + '\\C[0]  ';
            }
            if (skill.tpCost > 0) {
                return '\\C[10]' + TextManager.ougiCost + ':' + skill.tpCost + '\\C[0]  ';
            }
        }*/
    return "";
  }
  function getShield(skill) {
    if (skill.meta["shield"]) {
      return TextManager.shield.format(skill.meta["shield"]) + "　";
    }
    return "";
  }
  function getShieldHeal(skill) {
    if (skill.meta["shieldHeal"]) {
      var value = skill.meta["shieldHeal"];
      var actor = findActorBySkill(skill);
      if (actor) {
        var skillRecoveryPlus = actor.countEquipMeta(
          EquipMeta.skillRecoveryPlus
        );
        if (skillRecoveryPlus > 0) {
          value += "(+%1)".format(skillRecoveryPlus);
        }
      }
      return TextManager.shieldHeal.format(value) + "　";
    }
    return "";
  }
  function getMpHeal(skill) {
    if (skill.damage.type == 4) {
      return TextManager.mpHeal.format(skill.damage.formula) + "　";
    }
    return "";
  }
  function getCounter(skill) {
    if (skill.meta["counter"]) {
      var text = TextManager.counter1.format(skill.meta["counter"]) + "　";
      return text + TextManager.counter2;
    }
    return "";
  }
  function getParamUpDownText(skill) {
    for (var _i = 0, _a = skill.effects; _i < _a.length; _i++) {
      var e = _a[_i];
      if (e.code == 21 && e.value1 == 1) {
        if (e.dataId === 0) {
          continue;
        }
        var state = $dataStates[e.dataId];
        var text = getParamUpDownTextByState(state);
        if (text) {
          return text;
        }
      }
    }
    return "";
  }
  function getParamUpDownTextByState(state) {
    var turnText = getTurnText(state);
    if (state.meta["atkUp"]) {
      return TextManager.atkUp.format(state.meta["atkUp"]) + turnText;
    }
    if (state.meta["defUp"]) {
      return TextManager.defUp.format(state.meta["defUp"]) + turnText;
    }
    if (state.meta["matUp"]) {
      return TextManager.matUp.format(state.meta["matUp"]) + turnText;
    }
    if (state.meta["mdfUp"]) {
      return TextManager.mdfUp.format(state.meta["mdfUp"]) + turnText;
    }
    if (state.meta["atkDown"]) {
      return TextManager.atkDown.format(state.meta["atkDown"]) + turnText;
    }
    if (state.meta["defDown"]) {
      return TextManager.defDown.format(state.meta["defDown"]) + turnText;
    }
    if (state.meta["matDown"]) {
      return TextManager.matDown.format(state.meta["matDown"]) + turnText;
    }
    if (state.meta["mdfDown"]) {
      return TextManager.mdfDown.format(state.meta["mdfDown"]) + turnText;
    }
    /*if (state.meta['damageUp']) {
            return TextManager.damageUp.format(state.meta['damageUp']) + '　';
        }*/
    return null;
  }
  function getTurnText(state) {
    if (state.maxTurns <= 1) {
      return "　";
    }
    return "　" + TextManager.turnRemain.format(state.maxTurns) + "　";
  }
  function getStunDown(skill) {
    if (skill.meta["stunDown"]) {
      return TextManager.stunDown.format(skill.meta["stunDown"]) + "　";
    }
    return "";
  }
  function getStunUp(skill) {
    if (skill.meta["stunUp"]) {
      var n = parseInt(skill.meta["stunUp"]);
      var nn = Math.ceil(n / 100);
      return TextManager.stunUp.format(nn + 1) + "　";
    }
    return "";
  }
  function getBreakDamage(skill) {
    if (skill.meta["breakDamage"]) {
      return TextManager.breakDamage.format(skill.meta["breakDamage"]) + "　";
    }
    return "";
  }
  function getMikiri(skill) {
    if (skill.meta["mikiri"]) {
      return TextManager.mikiri.format(skill.meta["mikiri"]) + "　";
    }
    return "";
  }
  function getReact(skill) {
    if (skill.meta["react"]) {
      return TextManager.react + "　";
    }
    return "";
  }
  function getOugiBuff(skill) {
    var buff = Math.trunc(skill.meta["ougiBuff"]);
    if (buff > 0) {
      return TextManager.ougiBuff.format(buff) + "　";
    }
    return "";
  }
  function getOugiMpRecover(skill) {
    var mpRecover = Math.trunc(skill.meta["ougiMpRecover"]);
    switch (mpRecover) {
      case 1:
        return TextManager.ougiMpRecover1 + "　";
      case 2:
        return TextManager.ougiMpRecover2 + "　";
    }
    return "";
  }
  function getGiveReact(skill) {
    if (skill.meta["giveReact"]) {
      if (skill.scope == 8) {
        return TextManager.giveReactAll + "　";
      } else {
        return TextManager.giveReact + "　";
      }
    }
    return "";
  }
  function getReactAll(skill) {
    if (skill.meta["reactAll"]) {
      return TextManager.reactAll.format(skill.meta["reactAll"]);
    }
    return "";
  }
  function getCondition(skill) {
    if (skill.meta["condition"] == "react") {
      return TextManager.reactCondition;
    }
    if (skill.meta["condition"] == "atkUp") {
      return TextManager.atkUpCondition;
    }
    return "";
  }
  function getProvoke(skill) {
    if (skill.meta["provoke"]) {
      return TextManager.provoke + "　";
    }
    return "";
  }
  function getRenkan(skill) {
    if (skill.meta["renkan"]) {
      return TextManager.renkan + "　\n";
    }
    return "";
  }
  function getWaterShield(skill) {
    if (skill.meta["waterShield"]) {
      return TextManager.waterShield + "　\n";
    }
    return "";
  }
  function getMagicShield(skill) {
    if (skill.meta["magicShield"]) {
      return TextManager.magicShield.format(skill.meta["magicShield"]);
    }
    return "";
  }
  function getFixedDamage(skill) {
    if (skill.meta["fixedDamage"]) {
      return TextManager.fixedDamage.format(skill.meta["fixedDamage"]);
    }
    return "";
  }
  function getMatDebuff(skill) {
    if (skill.meta["matDebuff"]) {
      return TextManager.matDebuff.format(skill.meta["matDebuff"]);
    }
    return "";
  }
  function getMdfBuff(skill) {
    if (skill.meta["mdfBuff"]) {
      return TextManager.mdfBuff.format(skill.meta["mdfBuff"]);
    }
    return "";
  }
  function getShieldAutoPlusAll(skill) {
    if (skill.meta["shieldAutoPlusAll"]) {
      return TextManager.shieldAutoPlusAll.format(
        skill.meta["shieldAutoPlusAll"]
      );
    }
    return "";
  }
  function getShieldAutoPlus(skill) {
    if (skill.meta["shieldAutoPlus"]) {
      return TextManager.shieldAutoPlus.format(skill.meta["shieldAutoPlus"]);
    }
    return "";
  }
  function getOugiAutoPlus(skill) {
    if (skill.meta["ougiAutoPlus"]) {
      return TextManager.ougiAutoPlus.format(skill.meta["ougiAutoPlus"]);
    }
    return "";
  }
  function getMpPlus(skill) {
    if (skill.meta["spPlus"]) {
      return TextManager.spPlus.format(hankaku2Zenkaku(skill.meta["spPlus"]));
    }
    return "";
  }
  function getMpPlusTurn(skill) {
    if (skill.meta["mpPlusTurnOdd"]) {
      return TextManager.mpPlusTurnOdd;
    }
    if (skill.meta["mpPlusTurnEven"]) {
      return TextManager.mpPlusTurnEven;
    }
    return "";
  }
  function getSkillOugiPlus(skill) {
    if (skill.meta["skillOugiPlus"]) {
      return TextManager.skillOugiPlus.format(skill.meta["skillOugiPlus"]);
    }
    return "";
  }
  function getOugiPlus(skill) {
    if (skill.meta["ougiPlus"]) {
      return TextManager.ougiPlus.format(skill.meta["ougiPlus"]);
    }
    return "";
  }
  function getOugiReact(skill) {
    if (skill.meta["ougiReact"]) {
      return TextManager.ougiReact.format(skill.meta["ougiReact"]);
    }
    return "";
  }
  function getTodome(skill) {
    if (skill.meta["todome"] == "react") {
      return TextManager.reactTodome + "　";
    }
    return "";
  }
  function getCancel(skill) {
    if (skill.meta["cancel"]) {
      return TextManager.cancelSkill + "　";
    }
    return "";
  }
  function getRecover(skill) {
    if (skill.meta["recover"]) {
      return TextManager.recover.format(skill.meta["recover"]) + "　";
    }
    if (skill.meta["recover2"]) {
      return TextManager.recover2.format(skill.meta["recover2"]) + "　";
    }
    return "";
  }
  function getCheer(skill) {
    if (skill.meta["cheer"]) {
      return TextManager.cheer.format(skill.meta["cheer"]) + "　";
    }
    return "";
  }
  function getFirstStrike(skill) {
    if (skill.meta["firstStrike"]) {
      return TextManager.firstStrike.format(skill.meta["firstStrike"]) + "　";
    }
    return "";
  }
  function getRemakeTarget(skill) {
    if (skill.meta["remakeTarget"]) {
      return TextManager.remakeTarget + "　";
    }
    return "";
  }
  function getClenching(skill) {
    if (skill.meta["clenching"]) {
      return TextManager.clenching.format(skill.meta["clenching"]) + "　";
    }
    return "";
  }
  function getBossInvalid(skill) {
    if (skill.meta["bossInvalid"]) {
      return TextManager.bossInvalid.format(skill.meta["bossInvalid"]) + "　";
    }
    return "";
  }
  function getItemReact(skill) {
    if (skill.meta["itemReact"]) {
      var text = "";
      if (SceneManager._scene instanceof Nore.Scene_Shop2) {
        text += "\n";
      }
      text += TextManager.itemReact.format(skill.meta["itemReact"]) + "　";
      return text;
    }
    return "";
  }
  function getSurrender(skill) {
    if (skill.meta["surrender"]) {
      return TextManager.surrender + "　";
    }
    return "";
  }
  function getRequiredExpDown(skill) {
    if (skill.meta["requiredExpDown"] !== undefined) {
      var n = $gameActors.actor(1).requredExpDownRateAtSkill();
      var text = TextManager.requiredExpDown.format(n);
      return text + "　";
      //return TextManager.bless.format(skill.meta['bless']) + '　';
    }
    return "";
  }
  function getSlot(skill) {
    if (skill.meta["slot"] !== undefined) {
      var text = TextManager.slotText.format(skill.meta["slot"]);
      return text + "　";
    }
    return "";
  }
  function getRareSkill(skill) {
    if (skill.meta["rareSkill"] !== undefined) {
      var text = TextManager.rareSkillText.format(skill.meta["rareSkill"]);
      return text + "　";
    }
    return "";
  }
  function getLowerLimit(skill) {
    if (skill.meta["lowerLimit"] !== undefined) {
      var text = TextManager.lowerLimitText.format(skill.meta["lowerLimit"]);
      return text + "　";
    }
    return "";
  }
  function getSkillLvUp(skill) {
    if (skill.meta["skillUp"] !== undefined) {
      var text = TextManager.skillUpText.format(skill.meta["skillUp"]);
      return text + "　";
    }
    return "";
  }
  function getBless(skill) {
    if (skill.meta["initialBless"] !== undefined) {
      var text = TextManager.blessText1 + "\n";
      if (parseInt(skill.meta["initialBless"]) > 0) {
        text = TextManager.blessText4 + "\n";
        return text;
      }
      // text += TextManager.blessText2 + TextManager.blessText3;
      return text + "　";
    }
    return "";
  }
  function getBlessPlus(skill) {
    if (skill.meta["bless"]) {
      return TextManager.blessPlus.format(skill.meta["bless"]) + "　";
    }
    return "";
  }
  function getBonusBlessBuff(skill) {
    if (skill.meta["bonusBlessBuff"]) {
      return TextManager.bonusBlessBuff + "　";
    }
    return "";
  }
  function getFinishBlow(skill) {
    if (skill.meta["finishBlow"]) {
      return TextManager.finishBlow.format(skill.meta["finishBlow"]) + "　";
    }
    return "";
  }
  function getFinishBlow2(skill) {
    if (skill.meta["finishBlow2"]) {
      var damage = eval(skill.damage.formula);
      return TextManager.finishBlow2.format(damage) + "　";
    }
    return "";
  }
  function getKubihane(skill) {
    if (skill.meta["kubihane"]) {
      var kubihane = parseInt(skill.meta["kubihane"]);
      var actor = $gameActors.actor(10);
      kubihane += actor.countEquipMeta(EquipMeta.kubihane);
      return TextManager.kubihane.format(kubihane) + "　";
    }
    return "";
  }
  function getHolyElement(skill) {
    if ($gameSystem.stageId() != 5) {
      return "";
    }
    if (skill.damage && skill.damage.elementId == 8) {
      return "\n" + TextManager.holyElement + "　";
    }
    return "";
  }
  function getPowerBoost(skill) {
    if (skill.meta["powerBoost"]) {
      return TextManager.powerBoost.format(skill.meta["powerBoost"]) + "　";
    }
    return "";
  }
  function getObento(skill) {
    if (skill.meta["obento"]) {
      return TextManager.obento.format(skill.meta["obento"]) + "　";
    }
    return "";
  }
  function getObentoSave(skill) {
    if (skill.meta["obentoSave"]) {
      return TextManager.obentoSave.format(skill.meta["obentoSave"]) + "　";
    }
    return "";
  }
  function getKaihiBunsin(skill) {
    if (skill.meta["kaihiBunsin"]) {
      return (
        "\n" + TextManager.kaihiBunsin.format(skill.meta["kaihiBunsin"]) + "　"
      );
    }
    return "";
  }
  function getBunshin(skill) {
    if (skill.meta["bunshin"]) {
      return TextManager.bunshin.format(skill.meta["bunshin"]) + "　";
    }
    return "";
  }
  function getJizai(skill) {
    if (skill.meta["jizai"]) {
      var jizai = skill.meta["jizai"];
      return TextManager.jizai.format(jizai) + "　";
    }
    return "";
  }
  function getMadan(skill) {
    if (skill.meta["madan"]) {
      return TextManager.madan + "　";
    }
    return "";
  }
  function getPartyExp(skill) {
    if (skill.meta["partyExpPlus"]) {
      return TextManager.partyExpPlus.format(skill.meta["partyExpPlus"]) + "　";
    }
    return "";
  }
  function getExpBox(skill) {
    if (skill.meta["expBox"]) {
      var exp = $gameSystem.calcCursedArmorExp();
      var partyExp = Math.floor($gameParty.partyExpRate() * exp);
      return TextManager.expBox.format(exp, partyExp) + "　";
    }
    return "";
  }
  function getWrash(skill) {
    if (skill.meta["wrash"]) {
      return TextManager.wrash + "　";
    }
    if (skill.meta["wrash2"]) {
      return TextManager.wrash2 + "　";
    }
    if (skill.meta["wrash3"]) {
      return TextManager.wrash3 + "　";
    }
    return "";
  }
  function getBarrier(skill) {
    if (skill.meta["barrier"]) {
      return TextManager.barrier + "　";
    }
    return "";
  }
  function getRemoveState(skill) {
    if (skill.meta["removeState"]) {
      return TextManager.removeState + "　";
    }
    return "";
  }
  function getCriticalSkill(skill) {
    if (skill.meta["critical"]) {
      return TextManager.criticalSkill.format(skill.meta["critical"]) + "　";
    }
    return "";
  }
  function getStunDeath(skill) {
    if (skill.meta["stunDeath"]) {
      return TextManager.stunDeath + "　";
    }
    return "";
  }
  function getItemGet(skill) {
    if (skill.meta["itemGet"]) {
      return TextManager.itemGet.format(skill.meta["itemGet"]) + "　";
    }
    return "";
  }
  function getHolyBlessing(skill) {
    for (var _i = 0, _a = skill.effects; _i < _a.length; _i++) {
      var trait = _a[_i];
      if (trait.code == 21 && trait.dataId == 182) {
        var state = $dataStates[trait.dataId];
        var plus1 = parseInt(state.meta["maxShiledPlus"]);
        if (plus1 > 1) {
          var plus2 = skill.meta["shieldHeal2"];
          return TextManager.holyBlessing.format(plus1, plus2);
        }
      }
    }
    return "";
  }
  function getCombination(skill) {
    if (skill.meta["combination"]) {
      return TextManager.combination + "　";
    }
    return "";
  }
  function getShopSkill(skill) {
    if (skill.meta["shopSkill"]) {
      return TextManager.shopSkill.format(skill.meta["shopSkill"]) + "\n";
    }
    return "";
  }
  function getEncyclopedia(skill) {
    if (skill.meta["encyclopedia"]) {
      return TextManager.encyclopedia.format(skill.meta["encyclopedia"]) + "　";
    }
    return "";
  }
  function getStunBonus(skill) {
    if (skill.meta["stunBonus"]) {
      return TextManager.stunBonus.format(skill.meta["stunBonus"]) + "　";
    }
    return "";
  }
  function getSuddenStrike(skill) {
    if (skill.meta["suddenStrike"]) {
      return TextManager.suddenStrike.format(skill.meta["suddenStrike"]) + "　";
    }
    return "";
  }
  function getAddDef(skill) {
    if (skill.meta["addDef"]) {
      return TextManager.addDef.format(skill.meta["addDef"]) + "　";
    }
    return "";
  }
  function getCure(skill) {
    if (skill.meta["cure"]) {
      return TextManager.cure.format(skill.meta["cure"]) + "　";
    }
    return "";
  }
  function getCureBreak(skill) {
    if (skill.meta["cureBreak"]) {
      return TextManager.cureBreak.format(skill.meta["cureBreak"]) + "　";
    }
    return "";
  }
  function getStunMp(skill) {
    if (skill.meta["stunMp"]) {
      if (parseInt(skill.meta["stunMp"]) == 1) {
        return TextManager.stunMp.format(skill.meta["stunMp"]) + "　";
      } else {
        return TextManager.stunMp2.format(skill.meta["stunMp"]) + "　";
      }
    }
    return "";
  }
  function getMagnet(skill) {
    if (skill.meta["magnet"]) {
      return TextManager.magnet.format(skill.meta["magnet"]) + "　";
    }
    return "";
  }
  function getSyukuchi(skill) {
    if (skill.meta["syukuchi"]) {
      return TextManager.syukuchi.format(skill.meta["syukuchi"]) + "　";
    }
    return "";
  }
  function getHellFire(skill) {
    if (skill.meta["hellFire"]) {
      return TextManager.hellFire.format(skill.meta["hellFire"]) + "　";
    }
    return "";
  }
  function getYuugou(skill) {
    if (skill.meta["stateMp"]) {
      return TextManager.stateMp.format(skill.meta["stateMp"]) + "　";
    }
    return "";
  }
  function getNokorimono(skill) {
    if (skill.meta["mpCharge"]) {
      return TextManager.mpCharge.format(skill.meta["mpCharge"]) + "　";
    }
    return "";
  }
  function getSkillDebuff(skill) {
    if (skill.meta["skillDebuff"]) {
      return TextManager.skillDebuff.format(skill.meta["skillDebuff"]) + "　";
    }
    return "";
  }
  function getCritUp(skill) {
    if (skill.meta["critUp"]) {
      return TextManager.critUp.format(skill.meta["critUp"]) + "\n";
    }
    return "";
  }
  function getCritUpAll(skill) {
    if (skill.meta["critUpAll"]) {
      return TextManager.critUpAll.format(skill.meta["critUpAll"]) + "\n";
    }
    return "";
  }
  function getSkillCrit(skill) {
    if (skill.meta["skillCrit"]) {
      return TextManager.skillCrit.format(skill.meta["skillCrit"]) + "　";
    }
    return "";
  }
  function getInventory(skill) {
    if (skill.meta["inventory"]) {
      return TextManager.inventory.format(skill.meta["inventory"]) + "　";
    }
    return "";
  }
  function getBusshi(skill) {
    if (skill.meta["busshi"]) {
      var busshi = Math.trunc(skill.meta["busshi"]);
      if (busshi == 1) {
        return TextManager.busshi1 + "　";
      } else {
        return TextManager.busshi2 + "　";
      }
    }
    return "";
  }
  function getItemMp(skill) {
    if (skill.meta["itemMp"]) {
      return TextManager.itemMp.format(skill.meta["itemMp"]) + "　";
    }
    return "";
  }
  function getDelayAction(skill) {
    if (skill.meta["delayAction"]) {
      return TextManager.delayAction.format(skill.meta["delayAction"]) + "　";
    }
    return "";
  }
  function getPriceDown(skill) {
    if (skill.meta["priceDown"]) {
      return TextManager.priceDown.format(skill.meta["priceDown"]) + "　";
    }
    return "";
  }
  function getRequiredSkill(skill) {
    if (!(SceneManager._scene instanceof Nore.Scene_PowerUp2)) {
      return "";
    }
    if (skill.meta["requiredSkill2"]) {
      return "\n\\C[17]" + getRequiredSkill2(skill);
    }
    if (skill.meta["requiredSkill"]) {
      return "\n\\C[17]" + getRequiredSkill1(skill);
    }
    return "";
  }
  Nore.getRequiredSkill = getRequiredSkill;
  function getRequiredSkill1(skill) {
    var skillId = parseInt(skill.meta["requiredSkill"]);
    var requiredSkill = $dataSkills[skillId];
    var lv = requiredSkill.meta["lv"];
    return (
      TextManager.requiredSkill.format(getItemName(requiredSkill), lv) + "　"
    );
  }
  Nore.getRequiredSkill1 = getRequiredSkill1;
  function getRequiredSkill2(skill) {
    var skillId1 = parseInt(skill.meta["requiredSkill"]);
    var skillId2 = parseInt(skill.meta["requiredSkill2"]);
    var requiredSkill1 = $dataSkills[skillId1];
    var requiredSkill2 = $dataSkills[skillId2];
    var lv1 = requiredSkill1.meta["lv"];
    var lv2 = requiredSkill2.meta["lv"];
    return (
      TextManager.requiredSkill2.format(
        getItemName(requiredSkill1),
        lv1,
        requiredSkill2.name,
        lv2
      ) + "　"
    );
  }
  Nore.getRequiredSkill2 = getRequiredSkill2;
  function getAddState(skill) {
    if (skill.meta["addState"]) {
      var stateId = parseInt(skill.meta["addState"]);
      var state = $dataStates[stateId];
      if (skill.meta["stateValue"]) {
        return (
          TextManager.addStateSelf.format(
            getStateName(state),
            skill.meta["stateValue"]
          ) + "　"
        );
      }
    }
    return "";
  }
  function getNumActions(skill) {
    if (skill.repeats >= 2) {
      return TextManager.repeats.format(skill.repeats) + "　";
    }
    return "";
  }
  function getLaboMember(skill) {
    if (skill.meta["laboMember"]) {
      var n = Math.trunc(skill.meta["laboMember"]);
      return TextManager.laboMember.format(n);
    }
    return "";
  }
  function getLaboWeapon(skill) {
    if (skill.meta["laboWeapon"]) {
      var n = Math.trunc(skill.meta["laboWeapon"]);
      return TextManager.laboWeapon.format(n);
    }
    return "";
  }
  function getLaboInitialLevel(skill) {
    if (skill.meta["laboInitialLevel"]) {
      var n = Math.trunc(skill.meta["laboInitialLevel"]);
      return TextManager.laboInitialLevel.format(n);
    }
    return "";
  }
  function getLaboItem(skill) {
    if (skill.meta["laboInitialItem"]) {
      var itemId = Math.trunc(skill.meta["laboInitialItem"]);
      var count = Math.trunc(skill.meta["count"]);
      var name_1 = $dataItems[itemId].name;
      return TextManager.laboInitialItem.format(name_1, count);
    }
    return "";
  }
  function getLaboItem2(skill) {
    if (skill.meta["laboItem"]) {
      var itemId = Math.trunc(skill.meta["laboItem"]);
      var count = Math.trunc(skill.meta["count"]);
      var name_2 = $dataItems[itemId].name;
      return TextManager.laboItem.format(name_2, count);
    }
    return "";
  }
  function getLaboMoney(skill) {
    if (skill.meta["laboMoney"]) {
      var n = Math.trunc(skill.meta["laboMoney"]);
      return TextManager.laboMoney.format(n);
    }
    return "";
  }
  function getLaboExp(skill) {
    if (skill.meta["laboExp"]) {
      var n = Math.trunc(skill.meta["laboExp"]);
      return TextManager.laboExp.format(n);
    }
    return "";
  }
  function getParamUp(skill) {
    if (!skill.meta["passive"]) {
      return "";
    }
    var post = "  ";
    var text;
    if (skill.meta["labo"]) {
      text = skill.description;
    } else {
      text = "\\C[17]" + TextManager.passive + "\\C[0]  " + skill.description;
    }
    if (skill.meta["hp"]) {
      text += TextManager.hp + " +" + skill.meta["hp"] + post;
    }
    if (skill.meta["sp"]) {
      text += TextManager.sp + " +" + skill.meta["sp"] + post;
    }
    if (skill.meta["atk"]) {
      text += TextManager.param(2) + " +" + skill.meta["atk"] + post;
    }
    if (skill.meta["dex"]) {
      text += TextManager.dex + " +" + skill.meta["dex"] + post;
    }
    if (skill.meta["def"]) {
      text += TextManager.param(3) + " +" + skill.meta["def"] + post;
    }
    if (skill.meta["mgc"]) {
      text += TextManager.mgc + " +" + skill.meta["mgc"] + post;
    }
    if (skill.meta["sh"]) {
      text += TextManager.sh + " +" + skill.meta["sh"] + post;
    }
    return text;
  }
  function getTraitsInfo(traits) {
    if (traits.value == 0) {
      return "";
    }
    switch (traits.code) {
      case 21:
        break;
      case 22:
        if (traits.dataId == 0) {
          return TextManager.hitRate + " +" + Math.floor(traits.value * 100);
        } else {
          return TextManager.evaRate + " +" + Math.floor(traits.value * 100);
        }
      default:
        return "";
    }
  }
  function getDamageValue(skill) {
    var actor = findActorBySkill(skill);
    actor.makeActions();
    var action = new Game_Action2(actor);
    action.setSkill(skill.id);
    $gameActors.actor(100).setHp(10);
    var n = action.makeDamageValue($gameActors.actor(100), false);
    if (skill.repeats >= 2) {
      n += TextManager.repeats.format(skill.repeats);
    }
    return n;
  }
  Nore.getDamageValue = getDamageValue;
  function getDamageRate(skill) {
    var actor = $gameActors.actor(100);
    actor.makeActions();
    var action = new Game_Action2(actor);
    action.setSkill(skill.id);
    var n = action.makeDamageValue(actor, false);
    return n;
  }
  Nore.getDamageRate = getDamageRate;
  function findActorBySkill(skill) {
    var actorId = Math.floor((skill.id - 1000) / 100);
    return $gameActors.actor(actorId);
  }
  function getStateInfo1(skill) {
    if (skill.effects.length > 0) {
      return getStateInfo(skill, skill.effects[0]);
    }
    return "";
  }
  Nore.getStateInfo1 = getStateInfo1;
  function getStateInfo2(skill) {
    if (skill.effects.length > 1) {
      return getStateInfo(skill, skill.effects[1]);
    }
    return "";
  }
  function getStateInfo3(skill) {
    if (skill.effects.length > 2) {
      return getStateInfo(skill, skill.effects[2]);
    }
    return "";
  }
  function getStateInfo(skill, effect) {
    //p(effect)
    switch (effect.code) {
      case 21:
        if (effect.dataId > 0) {
          var state = $dataStates[effect.dataId];
          var text = getParamUpDownTextByState(state);
          if (text) {
            return text;
          }
          /*if (state.meta['damageCut']) {
                        return getDamageCut(state);
                    }*/
          if (state.meta["noDisplay"]) {
            return "";
          }
          /*text = getRegeneTextByState(state);
                    if (text) {
                        return '\\C[16]' + getStateName(state) + '\\C[0]:' + text;
                    }*/
          if (skill.meta["stateValue"]) {
            var baseRate = "";
            if (effect.value1 < 1) {
              baseRate =
                TextManager.baseRate.format(effect.value1 * 100) + "　";
            }
            return (
              TextManager.addState.format(
                getStateName(state),
                skill.meta["stateValue"]
              ) +
              "　" +
              baseRate
            );
          }
          //p(effect)
          var desc = Nore.$stateManager.getStateDesc(state);
          var rateDesc = "";
          if (effect.value1 < 1) {
            rateDesc = "(" + Math.round(effect.value1 * 100) + "%)";
          }
          if (desc.length > 0) {
            desc = ":" + desc;
          }
          return "%1%2　".format(
            "\\C[16]" + getStateName(state) + "\\C[0]" + rateDesc,
            desc
          );
        }
        break;
      case 31:
      case 32:
        //p(effect)
        return "%1　".format(
          getParamChangeName(effect).format(effect.value1) + "\\C[0]"
        );
    }
    return "";
  }
  function getDamageCut(state) {
    return "\n" + TextManager.damageCut.format(state.meta["damageCut"]);
  }
  function getStateName(state) {
    if (state.name.indexOf("(") < 0) {
      return getItemName(state);
    }
    var name = getItemName(state);
    var index = name.indexOf("(");
    return name.substring(0, index);
  }
  function getParamChangeName(effect, inBattle) {
    if (inBattle === void 0) {
      inBattle = false;
    }
    if (effect.dataId == 2) {
      if (effect.code == 32) {
        return inBattle ? TextManager.atkDownBattle : TextManager.atkDown;
      } else {
        return inBattle ? TextManager.atkUpBattle : TextManager.atkUp;
      }
    }
    if (effect.dataId == 3) {
      if (effect.code == 32) {
        return inBattle ? TextManager.defDownBattle : TextManager.defDown;
      } else {
        return inBattle ? TextManager.defUpBattle : TextManager.defUp;
      }
    }
    if (effect.dataId == 4) {
      if (effect.code == 32) {
        return inBattle ? TextManager.matDownBattle : TextManager.matDown;
      } else {
        return inBattle ? TextManager.matUpBattle : TextManager.matUp;
      }
    }
    if (effect.dataId == 5) {
      if (effect.code == 32) {
        return inBattle ? TextManager.mdfDownBattle : TextManager.mdfDown;
      } else {
        return inBattle ? TextManager.mdfUpBattle : TextManager.mdfUp;
      }
    }
    return TextManager.atkUp;
  }
  Nore.getParamChangeName = getParamChangeName;
  function getItemDescription(item) {
    var text = "";
    if (item.damage.type == 1) {
      if (item.hitType == 1) {
        text += TextManager.physical;
      }
      if (item.hitType == 2) {
        text += TextManager.masical;
      }
      text += TextManager.damage + ":" + getDamageValueItem(item) + "　　"; //getDamageRate(item) + '%　';
    }
    if (item.damage.type == 3) {
      text += TextManager.hpHeal;
      text += ":" + -1 * getDamageValueItem(item) + "　";
    }
    if (item.meta["shortRange"]) {
      text += "\\C[1]" + TextManager.shortRange + "　\\C[0]";
    } else if (item.meta["longRange"]) {
      text += "\\C[1]" + TextManager.longRange + "　\\C[0]";
    }
    var a = new Game_Action($gameActors.actor(1));
    a.setItem(item.id);
    if (a.isForOpponent() && a.isForAll()) {
      text += "\\C[1]" + TextManager.targetAll + "　\\C[0]";
    }
    text += getParamUp(item);
    text += getStateInfo1(item);
    text += getStateInfo2(item);
    text += getStateInfo3(item);
    if (text.length > 0) {
      //text += '\n';
    }
    text += getStunDown(item);
    text += getStunUp(item);
    text += getCancel(item);
    text += getBreakDamage(item);
    text += getCounter(item);
    text += getMikiri(item);
    text += getTodome(item);
    text += getReactAll(item);
    text += getShield(item);
    text += getMpPlus(item);
    text += getMpPlusTurn(item);
    text += getShieldAutoPlusAll(item);
    text += getShieldAutoPlus(item);
    text += getOugiAutoPlus(item);
    text += getOugiPlus(item);
    text += getOugiReact(item);
    text += getProvoke(item);
    text += getRenkan(item);
    text += getRecover(item);
    text += getCheer(item);
    text += getMagicShield(item);
    text += getCondition(item);
    text += getShieldHeal(item);
    text += getExpBox(item);
    text += getReact(item);
    text += getGiveReact(item);
    text += getFirstStrike(item);
    text += getRemakeTarget(item);
    text += getClenching(item);
    text += getBossInvalid(item);
    text += getMpHeal(item);
    text += getItemReact(item);
    text += getSurrender(item);
    //text += getNumActions(skill);
    if (text.length == 0) {
      text += item.description;
    }
    return text;
  }
  Nore.getItemDescription = getItemDescription;
  function getDamageValueItem(item) {
    var actor = $gameActors.actor(100);
    actor.makeActions();
    var action = new Game_Action2(actor);
    action.setItem(item.id);
    $gameActors.actor(100).setHp(10);
    var n = action.makeDamageValue($gameActors.actor(100), false);
    if (item.repeats >= 2) {
      n += TextManager.repeats.format(item.repeats);
    }
    return n;
  }
  Nore.getDamageValueItem = getDamageValueItem;
})(Nore || (Nore = {}));
