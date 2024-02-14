var CHITSU_TIGHTENING;
var ANAL_TIGHTENING;
var getBabyFuture;
var getEroParamTitle;
var getDungeonName;
var getChokyoName;
var getTaneoyaName;
var getDestinationName;
function initVocabJp() {
  // Title
  TextManager._newGame = "New Game";
  TextManager._continue_ = "Continue";
  TextManager.recollection = "Recollection";
  // Battle
  TextManager.hit = "Hit";
  TextManager.alwaysHit = "Guaranteed Hit";
  TextManager.atkUpTarget = "ATK%1 Up";
  TextManager.atkDownTarget = "ATK%1 Down";
  TextManager.defUpTarget = "DEF%1 Up";
  TextManager.defDownTarget = "DEF%1 Down";
  TextManager.mdfDown = "Magic DEF↓";
  TextManager.mdfUp = "Magic DEF↑";
  TextManager.cantAttack = "Cannot Attack";
  TextManager.alwaysMiss = "Miss Confirmed";
  TextManager.skip = "Next Character";
  TextManager.auto = "Auto Battle";
  TextManager.damageText = "Damage";
  TextManager.showDetail = "Shift→Show State Details";
  TextManager.hideDetail = "Shift→Hide State Details";
  TextManager.invokeSuddenStrike = "%1's Sudden Strike!";
  TextManager.actionBarrier = "%1 blocked the attack with a sacred barrier!";
  TextManager._partyName = "%1's Party";
  TextManager._emerge = "%1 Emerged!";
  (TextManager._victory = "%1's Victory!"),
    (TextManager._defeat = "%1 was defeated in battle."),
    (TextManager._obtainExp = "Gained %1 %2!"),
    (TextManager._obtainGold = "Obtained %1\\G in money!"),
    (TextManager._obtainItem = "Obtained %1!"),
    (TextManager._LvUp = "%1 has Lved up to %2 %3!"),
    (TextManager._obtainSkill = "Learned %1!"),
    (TextManager._useItem = "%1 used %2!"),
    (TextManager._criticalToEnemy = "Critical Hit");
  TextManager._criticalToActor = "Critical Hit";
  TextManager._actorDamage = "%1 took %2 damage!";
  TextManager._actorRecovery = "%1's %2 recovered by %3!";
  TextManager._actorGain = "%1's %2 increased by %3!";
  TextManager._actorLoss = "%1's %2 decreased by %3!";
  TextManager._actorDrain = "%1 was drained of %2 by %3!";
  TextManager._actorNoDamage = "%1 took no damage!";
  TextManager._actorNoHit = "Miss! %1 took no damage!";
  TextManager._enemyDamage = "Dealt %2 damage to %1!";
  TextManager._enemyRecovery = "%1's %2 recovered by %3!";
  TextManager._enemyGain = "%1's %2 increased by %3!";
  TextManager._enemyLoss = "%1's %2 decreased by %3!";
  TextManager._enemyDrain = "Drained %3 of %2 from %1!";
  TextManager._enemyNoDamage = "No damage dealt to %1!";
  TextManager._enemyNoHit = "Miss! No damage dealt to %1!";
  TextManager._evasion = "%1 dodged the attack!";
  TextManager._magicEvasion = "%1 negated the magic!";
  TextManager._magicReflection = "%1 reflected the magic!";
  TextManager._counterAttack = "%1's Counterattack!";
  TextManager._substitute = "%1 protected %2!";
  TextManager._buffAdd = "%1's %2 increased!";
  TextManager._debuffAdd = "%1's %2 decreased!";
  TextManager._buffRemove = "%1's %2 returned to normal!";
  TextManager._actionFailure = "It had no effect on %1!";
  TextManager.info = "Info";
  TextManager.prepare = "\\C[16]Prepare %1 turn \\C[0]";
  TextManager.actorShieldDamage = "%1's shield took %2 damage!";
  TextManager.actorShieldRecovery = "Recovered %1's shield by %3!";
  // EroStatus
  TextManager.peopleUnit = "%1 people";
  TextManager.countUnit = "%1 x";
  TextManager.normal = "Normal";
  TextManager.pregnant = "Pregnant";
  TextManager.father = "Seed Parent";
  TextManager.omankoParam = "Pussy Development Lv";
  TextManager.chimpoParam = "Penis Shrinkage Value";
  TextManager.analParam = "Anal Development Lv";
  TextManager.omankoGaba = "Pussy Deformation Degree %1/%2";
  TextManager.miniChinpo = "Penis Shrinkage Degree %1/%2";
  TextManager.analGaba = "Anal Deformation Degree %1/%2";
  TextManager.aptitude = "Aptitude";
  TextManager.aptitude1 = "Martial Strength";
  TextManager.aptitude2 = "Magical Power";
  TextManager.aptitude3 = "Intelligence";
  TextManager.aptitude4 = "Faith";
  TextManager.aptitude5 = "Agility";
  // Menu
  TextManager.language = "Language";
  TextManager._save = "Save";
  TextManager._load = "Load";
  TextManager._skill = "Skill";
  TextManager._equip = "Equip";
  TextManager.eroStatus = "Ero Status";
  TextManager.record = "Adventure Record";
  TextManager._status = "Status";
  TextManager.kigae = "Dress Up";
  TextManager.collection = "Collection";
  TextManager.babyList = "Baby List";
  TextManager.history = "Ero History";
  TextManager.canSortie = "Reserve Members";
  TextManager.inSortie = "Sortieing";
  TextManager.inSortie2 = "Sortie Members";
  TextManager.powerUp = "Power Up";
  TextManager.powerUp2 = "Altar of Prayer";
  TextManager.sortie = "Sortie Members";
  TextManager.captive = "Captive";
  TextManager.ifDefeat = "Penalty upon Defeat";
  TextManager.ifDefeat2 = "%1 people will be captured";
  TextManager.shortMember = "Not enough sortie members";
  TextManager.members = "Member List";
  TextManager.sortieCount = "Sortie";
  TextManager.captiveDay = "Sex Slave";
  TextManager.count = "%1 x";
  TextManager.day = "%1 day";
  TextManager.day2 = "Day %1";
  TextManager.nakadashi = "Creampie";
  TextManager.syusan = "Childbirth";
  TextManager.slave = "Slave Market";
  TextManager.encyclopedia = "Encyclopedia";
  TextManager.delayAction = "Act Last";
  TextManager.menuLv = "Lv Up";
  TextManager.medal = "Medal";
  TextManager.cantKigae = ["Dress Up unlocks after being a sex slave"];
  TextManager.hasNoItems = ["You have no items"];
  TextManager._expNext = "Next %1";
  TextManager._Lv = "Lv";
  TextManager._item = "Item";
  TextManager._options = "Options";
  TextManager._gameEnd = "End Game";
  TextManager.partyExp = "Party EXP";
  TextManager.crystalCount = "pcs";
  TextManager.endlessHMode = "Endless H Mode";
  TextManager.goToPrepare = "Adventure Prep";
  TextManager.use = "Use";
  // Save
  TextManager._file = "File";
  TextManager._autosave = "Autosave";
  TextManager.chapter = "Chapter %1";
  TextManager.prologue = "Prologue";
  TextManager.spSave = "SP %1";
  TextManager.saveLatest = "Latest %1";
  TextManager._saveMessage = "Which file would you like to save to?";
  TextManager._loadMessage = "Which file would you like to load?";
  // Agito
  TextManager.resqueMsg = [
    "You cannot rescue a character",
    "until you find their confinement location in the dungeon",
  ];
  // Collection
  TextManager.collectionHelp = "Status of breast milk delivery";
  // Skill
  TextManager.invalid = "Invalid";
  TextManager.turnRemain = "%1 turns remaining";
  TextManager.turn = "%1 turn(s)";
  TextManager.money = "Money";
  TextManager.price = "Cost";
  TextManager.learned = "✓";
  TextManager.unlearned = "X";
  TextManager.learn = "New acquisition";
  TextManager.confirmPrice1 = "Acquiring the skill will cost %1 pt.";
  TextManager.confirmPrice2 = "Do you want to learn it?";
  TextManager.notEnoughPoint = "Not enough skill points";
  TextManager.notEnoughCrystal = "Not enough blue crystals";
  TextManager.stunBreak =
    "BREAK state! Damage dealt increases by %1%, and there is no variance in damage";
  TextManager.confirmCrystal1 =
    "Unlocking this feature requires %1 blue crystals.";
  TextManager.confirmCrystal2 = "Do you want to enhance it?";
  TextManager.blessText1 =
    "On hit, you accumulate one \\C[2]blessing\\C[0].";
  TextManager.blessText2 =
    "At five blessings, you get an extra action, and";
  TextManager.blessText3 = "the MP cost of skills becomes zero";
  TextManager.blessText4 =
    "You accumulate one \\C[2]blessing\\C[0] at the start of battle and on hit.";
  TextManager.addState = "Inflicts \\C[2]%1\\C[0] %2";
  TextManager.addStateSelf = "Gives self \\C[2]%1\\C[0] %2";
  TextManager.baseRate = "Probability %1%";
  TextManager.bossInvalid = "Boss invalid";
  TextManager.itemReact = "\\C[6]No action consumed";
  TextManager.forUser = "Targets self";
  TextManager.forAllFriend = "Targets all allies";
  TextManager.forFrontFriend = "Targets all allies in the front row";
  TextManager.forLineFriend = "Targets all allies in a line";
  TextManager.regene = "HP regenerates by %1 every turn";
  TextManager.slipDamage = "Inflicts ongoing damage during turn";
  TextManager.slipDamageFixed = "Inflicts %1 damage during turn";
  TextManager.stateTurnHalf = "Value is halved every turn";
  TextManager.stateTurnAll = "Lasts only one turn";
  TextManager.stateTurnNone = "Permanent";
  TextManager.stateTurnInvoke = "Decreases upon activation";
  TextManager.stateBullet =
    "Using Discharge reduces it by 1, and\nit becomes unusable when it reaches 0";
  TextManager.stateBullet2 =
    "Using Flame Shoot reduces it by 1, and\nthe skill becomes unusable when it reaches 0";
  TextManager.stateToge = "Counters physical damage with spikes";
  TextManager.stateTogeDownMagic =
    "Spikes decrease by 1 when taking magic damage";
  TextManager.stateMagicWeakness =
    "Taking magic damage reduces\nthe shield by 1";
  TextManager.stateMikiri = "Dodges physical damage";
  TextManager.stateBoss = "Defeating this enemy leads to victory";
  TextManager.stateSyuchu =
    "Tries to target the same opponent as surrounding enemies";
  TextManager.stateYowaimono = "Targets the opponent with fewer shields";
  TextManager.stateMelting =
    "Takes damage equal to 33% of current HP during BREAK";
  TextManager.stateCounter = "Counters enemy attacks with a normal attack";
  TextManager.stateDamageCut =
    "Reduces damage by %1% and invalidates status effects";
  TextManager.stateUtsurigi = "Starts targeting a random opponent";
  TextManager.stateGekkou =
    "Targets the opponent who inflicted this state\nArea attacks also hit other members";
  TextManager.stateUndead = "Survives with 1 HP when HP would drop to 0";
  TextManager.stateInvalidateDebuff = "Invalidates status effects";
  TextManager.stateCountDown =
    "Decreases by 1 for each kill, and victory is achieved when it reaches 0";
  TextManager.statePhotosynthesize =
    "At the start of the turn, if HP is decreased,\nuses shields to recover HP by %1";
  TextManager.stateDeathAgony = "Executes a prepared attack upon death";
  TextManager.stateMpCharge = "Gains 1 MP each time %1 magic damage is dealt";
  TextManager.stateEarthBenefit =
    "Gains 3 Spikes and 3 Strength every turn\nIt resets when BREAK occurs";
  TextManager.stateDarkBenefit = "Gains 3 Strength every turn";
  TextManager.stateFireBenefit = "Gains a debuff every 10 damage";
  TextManager.stateTransform = "Transforms when this state is removed";
  TextManager.stateCurse = "Loses 2 each time Josel is damaged";
  TextManager.stateShareHp = "Shares HP with other entities";
  TextManager.stateKogoroshi = "Gains 3 Strength when another demon dies";
  TextManager.stateResurection = "Has a %1% chance to resurrect every turn";
  TextManager.stateSyunbin = "Gains %1 evasion every turn";
  TextManager.stateHardening = "Gains %1 defense each time damage is taken";
  TextManager.stateBleeding =
    "Takes 20 damage each time it attacks,\nand loses 1 shield";
  TextManager.stateAntiMadan = "BREAK will no longer be extended";
  TextManager.stateDamageDown =
    "The final damage dealt by this enemy is reduced by %1%";
  TextManager.stateArmor = "Gains a defense buff each turn by this amount";
  TextManager.stateMdfArmor =
    "Gains a magic defense buff each turn by this amount";
  TextManager.cantMove = "Cannot act";
  TextManager.maxDamage = "Damage variation is eliminated";
  TextManager.notRegene = "Does not heal if there is ongoing damage";
  TextManager.ougiBuff =
    "When a front-line ally uses a finisher,\nall allies gain all buffs by %1";
  TextManager.ougiMpRecover1 = "The ally who used the finisher recovers 1 MP";
  //TextManager.ougiMpRecover2 = 'When a front-line ally uses a finisher,\nthat ally recovers 1 MP and the shield recovers by 5';
  TextManager.matDebuff = "Reduces the enemy's MAT by %1";
  TextManager.fixedDamage = "Fixed damage";
  TextManager.madan = "Extends BREAK by 1 turn if it is in progress";
  TextManager.maxShieldDown =
    "Reduces the shield by %1 when recovering from BREAK";
  TextManager.atkUpBattle = "ATK↑%1";
  TextManager.defUpBattle = "DEF↑%1";
  TextManager.matUpBattle = "MAT↑%1";
  TextManager.mdfUpBattle = "MDF↑%1";
  TextManager.atkDownBattle = "ATK↓%1";
  TextManager.defDownBattle = "DEF↓%1";
  TextManager.matDownBattle = "MAT↓%1";
  TextManager.mdfDownBattle = "MDF↓%1";
  TextManager.atkUp = "\\C[61]ATK\\C[0] increases by %1";
  TextManager.defUp = "\\C[62]DEF\\C[0] increases by %1";
  TextManager.matUp = "\\C[61]MAT\\C[0] increases by %1";
  TextManager.mdfUp = "MDF increases by %1";
  TextManager.atkDown = "\\C[61]ATK\\C[0] decreases by %1";
  TextManager.defDown = "\\C[62]DEF\\C[0] decreases by %1";
  TextManager.matDown = "\\C[61]MAT\\C[0] decreases by %1";
  TextManager.mdfDown = "\\C[62]MDF\\C[0] decreases by %1";
  TextManager.physical = "Physical";
  TextManager.masical = "Magical";
  TextManager.hpHeal = "HP recovery";
  TextManager.damage = "Damage";
  TextManager.passive = "Passive skill";
  TextManager.hitRate = "Hit rate";
  TextManager.evaRate = "Evasion rate";
  TextManager.cancelSkill = "Interrupts the enemy's action";
  TextManager.spCost = "MP consumption";
  TextManager.ougiCost = "OP consumption";
  TextManager.shortRange = "Short-range attack";
  TextManager.longRange = "Long-range attack";
  TextManager.targetAll = "All-target attack";
  TextManager.targetRandom = "Attack random %1 targets";
  TextManager.ougi = "Finisher";
  TextManager.react = "Take an extra turn";
  TextManager.giveReact = "Allows an ally to take an extra turn";
  TextManager.reactTodome =
    "Taking an extra turn if finishing off with this technique";
  TextManager.reactAll = "Allows all other characters to take an extra turn";
  TextManager.ougiPlus =
    "Gain an additional %1% OP when finishing off an enemy";
  TextManager.skillOugiPlus = "Gain more OP when using a skill";
  TextManager.ougiAutoPlus = "Increases OP by %1% each turn";
  TextManager.ougiReact = "Allies that use a finisher will take an extra turn";
  TextManager.shieldAutoPlus = "Recovers %1 SH at the start of each turn";
  TextManager.shieldAutoPlusAll =
    "Recovers %1 SH for all allies at the start of each turn";
  TextManager.cheer = "Recovers 1 SP for an ally";
  TextManager.spPlus = "Increases the initial value of MP by %1";
  TextManager.mpPlusTurnOdd = "Gain an additional MP every odd turn";
  TextManager.mpPlusTurnEven = "Gain an additional MP every even turn";
  TextManager.reactCondition =
    "Can only be used after taking an extra turn\nProtection does not increase";
  TextManager.atkUpCondition = "\nCan only be used when ATK is increased";
  TextManager.counter1 = "Counters an enemy's attack with";
  TextManager.counter2 = "a normal attack";
  TextManager.damageCut = "Cuts damage by %1%";
  TextManager.mikiri = "Dodges the enemy's normal attack with a %1% chance";
  TextManager.breakDamage =
    "Increases the damage done by allies to\na BREAKed enemy by an additional %1%";
  TextManager.stunDown = "Cannot reduce shield value";
  TextManager.stunUp = "Reduce shield value by %1";
  TextManager.recoverShield = "Recover shield by %1";
  TextManager.renkan =
    "Increase the skill cooldown of enemies with 'more than 2' by 1";
  TextManager.provoke = "Direct enemy attacks to oneself";
  TextManager.magicShield = "Reduce magic damage to allies by %1%";
  TextManager.mdfBuff = "Allies receive an MDF buff of %1";
  TextManager.matDebuff = "All enemies receive a MAT debuff of %1";
  TextManager.penetrate = "Shield penetration";
  TextManager.recover = "Cure status abnormalities";
  TextManager.recover2 = "Cure status abnormalities of allies";
  TextManager.firstStrike =
    "Damage to enemies with full HP is increased by %1%";
  TextManager.repeats = "×%1";
  TextManager.clenching =
    "If HP is more than 2, survive a fatal blow with 1 HP";
  TextManager.blessPlus =
    "An additional \\C[2]blessing\\C[0] is increased by %1";
  TextManager.bonusBlessBuff = "Receive a buff of ATK+2 when re-acting";
  TextManager.giveReactAll = "Make all allies re-act";
  TextManager.slotText = "Can equip %1 more medals";
  TextManager.requiredExpDown = "Experience needed for LVUP is reduced by %1%";
  TextManager.rareSkillText =
    "Chance of acquiring a rare skill is increased by %1%";
  TextManager.lowerLimitText = "Damage variance is reduced by %1";
  TextManager.skillUpText =
    "One of the initially learned skills is strengthened by %1 Lvs";
  TextManager.damageUp = "Damage dealt is increased by %1% not stackable";
  TextManager.mist = "Normal attacks are always evaded";
  TextManager.shieldHeal = "Heal SH by %1";
  TextManager.mpHeal = "Recover MP by %1";
  // TextManager.finishBlow = 'If this attack causes a BREAK, an additional attack doing \n%1 damage occurs'
  TextManager.finishBlow =
    "If a BREAK is caused on an enemy, an additional attack doing \n%1 damage occurs";
  TextManager.wrashState =
    "Anger ×3 is added to the damage dealt, and anger becomes 0\n";
  TextManager.wrash = "Anger +1 when attacked by an enemy\n";
  TextManager.wrash2 = "Anger +1 when attacking or being attacked\n";
  TextManager.wrash3 =
    "Anger +1 as turns pass, or when attacking\nor being attacked\n";
  TextManager.barrier = "Nullify the first damage received";
  TextManager.combination = "Increase the number of combo attack hits by 1\n";
  TextManager.requiredSkill = "Must have learned %1Lv%2\n";
  TextManager.requiredSkill2 = "Must have learned %1Lv%2 and %3Lv%4\n";
  TextManager.waterShield = "Block one enemy attack";
  TextManager.removeState = "Remove non-passive states";
  TextManager.laboWeapon = "Place %1 weapon treasure boxes in the first room";
  TextManager.laboInitialItem = "Start the adventure with %2 of item %1";
  TextManager.laboItem = "Start the adventure with one attack item";
  TextManager.laboInitialLv =
    "Start the adventure with characters at initial LV %1";
  TextManager.laboExp =
    "Start the adventure with all characters having gained %1 experience";
  TextManager.laboMoney = "Start the adventure with %1G of money";
  TextManager.removeBadStatusAuto =
    "Automatically cure %1 status abnormalities";
  TextManager.holyBlessing =
    "Increase maximum shield value by %1 and recover shield by %2";
  TextManager.holyBlessing2 = "Increase maximum shield value by %1";
  TextManager.stunDeath = "Instantly kill enemies in BREAK";
  TextManager.itemGet = "Item acquisition rate is increased by %1%";
  TextManager.criticalSkill =
    "Normal attacks have a %1% chance to instantly kill";
  TextManager.shopSkill = "Increases the chance of finding a shop by %1%";
  TextManager.priceDown = "Discounts shop item prices by %1%";
  TextManager.encyclopedia =
    "Can listen to trivia before boss battles\nActivates even when not participating in the party";
  TextManager.addBuff = "Receive a buff of %1 every turn %2";
  TextManager.bakusai = "Dies upon BREAK";
  TextManager.remakeTarget = "Reselect attack targets";
  TextManager.stunBonus = "Damage to enemies in BREAK is %1 x";
  TextManager.suddenStrike =
    "When allies dodge an enemy attack, Rin will\nattack that enemy with damage %1";
  TextManager.holyElement = "Deliver a final blow to the undead";
  TextManager.kubihane =
    "At turn end, instantly kill any enemy with HP %1 or less in BREAK";
  TextManager.kubihaneMedal = "☆Increase damage from 'neck-breaker' by %1";
  TextManager.addDef = "Increase own DEF by %1 and recover shield by %1";
  TextManager.cure = "Cure status abnormalities";
  TextManager.cureBreak = "\\C[17]Cure\\C[0] BREAK";
  TextManager.stunMp = "Gain 1 MP when causing \\C[17]BREAK\\C[0] on an enemy";
  TextManager.stunMp2 =
    "Gain 1 MP and 4 SH when causing \\C[17]BREAK\\C[0] on an enemy";
  TextManager.magnet = "Draw rear enemies to the front";
  TextManager.syukuchi = "Enable attacks on the rear row";
  TextManager.hellFire = "\nDamage increases by %1% for each enemy state";
  TextManager.stateMp =
    "Gain 1 MP when a buff from a skill is applied\nOnce per turn only";
  TextManager.mpCharge = "Gain 1 MP and 2 SH for every %1 magic damage";
  TextManager.skillDebuff = "Inflict a DEF debuff when dealing magic damage";
  TextManager.critUp = "Increase critical rate by %1%";
  TextManager.critUpAll = "Increase critical rate for all allies by %1%";
  TextManager.skillCrit = "Skills can critical";
  TextManager.inventory = "Increase possible carried items by 1";
  TextManager.busshi1 = "Acquire one item at the midpoint";
  TextManager.busshi2 =
    "Acquire one item at the midpoint and before the boss\n";
  TextManager.itemMp = "Characters using items gain 1 MP";
  TextManager.expBox = "Gain %1 experience\nPrices revert at the next shop";
  TextManager.powerBoost = "Allies re-acting get all buffs %1";
  TextManager.obento = "Recover HP by %1% at recovery points";
  TextManager.obentoSave = "\nRecover HP by %1% at midpoint and boss crystal";
  TextManager.bunshin = "Start combat with Migi-kiri 1";
  TextManager.kaihiBunsin = "Start combat with Bunshin no Jutsu %1";
  TextManager.jizai =
    "\nAllies targeted by enemies receive \\C[62]DEF\\C[0]+%1 \\C[62]MDF\\C[0]+%1,\nother allies receive \\C[61]ATK\\C[0]+%1 \\C[61]MAT\\C[0]+%1";
  TextManager.partyExpPlus = "EXP gain increased by %1";
  TextManager.partyExpPlus = "EXP gain increased by %1";
  // Item
  TextManager.surrender = "Defeat Item";
  // Status
  TextManager.sp = "SP";
  TextManager.str = "Strength";
  TextManager.dex = "Dexterity";
  TextManager.mgc = "MAT";
  TextManager.vit = "Vitality";
  TextManager.sh = "SH";
  TextManager.shield = "SHIELD";
  TextManager.defeatCount = "Defeats";
  TextManager.baisyunCount = "Prostitutes";
  TextManager.obedience = "Obedience";
  TextManager.sensitivity = "Sensitivity";
  TextManager.mazo = "Masochism";
  TextManager.shame = "Degree of Shame Rumors";
  TextManager.frightened = "Abuse";
  TextManager.maternal = "Maternal";
  TextManager.nasty = "Honor Lost";
  TextManager.nasty3 = "Familiarity";
  TextManager.mesuSyota = "Femboy Lv";
  TextManager.thunderElement = "\\C[6]Thunder Attribute\\C[0]";
  TextManager.low = "Low";
  TextManager.middle = "Moderate";
  TextManager.high = "High";
  TextManager.max = "Maximum";
  TextManager.flame = "Flame";
  TextManager.CriUp = "CRIT";
  TextManager.spPlusLabel = "Initial MP";
  // State
  TextManager.flagile =
    "When BREAK happens, maximum shield value decreases by 1";
  TextManager.longBreak = "BREAK lasts for 2 turns";
  TextManager.defUpState = "Cuts physical damage by %1";
  TextManager.spZeroText = "Skill MP cost becomes 0";
  TextManager.fear = "Receiving an attack inflicts a debuff of %1 to attack";
  TextManager.provoke = "Becomes a target of enemies";
  TextManager.antiBreak = "Recovers from BREAK in one turn";
  TextManager.aiming =
    "Random attacks will target this enemy\nStatus down persists";
  TextManager.haste = "Skills take 1 less turn to prepare";
  TextManager.bunshinState = "Each time Sudden Strike activates\nGain Dodge 1";
  TextManager.nintai =
    "When BREAK happens, maximum shield value increases by 1";
  TextManager.hontai = "When tentacles are defeated, receive 300 damage";
  TextManager.damageRateUpState = "Damage dealt increases by %1%";
  TextManager.mpRecovery = "Recovers 1 more MP this turn";
  TextManager.magicBarrier = "Illusionary Guidance is nullified";
  // Buff
  TextManager.buff2 = "Physical damage dealt increases by %1";
  TextManager.buff3 = "Physical damage received decreases by %1";
  TextManager.buff4 = "Magical damage dealt increases by %1";
  TextManager.buff5 = "Magical damage received decreases by %1";
  TextManager.debuff2 = "Physical damage dealt decreases by %1";
  TextManager.debuff3 = "Physical damage received increases by %1";
  TextManager.debuff4 = "Magical damage dealt decreases by %1";
  TextManager.debuff5 = "Magical damage received increases by %1";
  // Formation
  TextManager.front = "Vanguard";
  TextManager.back = "Rearguard";
  TextManager.frontLine = "Front Line";
  TextManager.frontLineAttack = "Attack all in the front row";
  TextManager.backLine = "Back Line";
  TextManager.forAll = "All Targets";
  TextManager.line = "Line Attack";
  TextManager.lineHeal = "Line Heal";
  TextManager.formationHelp = "Select two characters to switch their positions";
  TextManager.deadFriend = "Incapacitated Ally";
  TextManager.formationSkill = "Total Skill Points";
  // Event
  TextManager.singleSleep = "Sleep Alone";
  TextManager.eventTanetsuke = "Bred %1 x";
  TextManager.eventTanetsukeBote = "Creampied %1 x";
  TextManager.eventTanetsukeLostVirgin = "Virginity taken by breeding %1 x";
  TextManager.eventTanetsukeAcme = "Bred by %1 people, climax %2 x";
  TextManager.eventMankoOshikko = "Piss flushed into the pussy by %1 men";
  TextManager.eventTanetsukeDaijinLostVirgin = "Virginity taken by a minister";
  TextManager.eventTanetsukeDaijinAcme =
    "Bred by the minister, climax %2 x";
  TextManager.eventTanetsukeDaijin = "Creampied by the minister";
  TextManager.felaGokkun = "Suck %1 dicks and swallow semen";
  TextManager.tanetsuke = "Breeding";
  TextManager.chokyo = "Training";
  TextManager.semenMeal = "Meal with semen";
  TextManager.eventCaptured = "Defeated by the enemy and captured";
  TextManager.eventRape = "Gang-raped by %1 barbarians";
  TextManager.eventLostVirgin = "Virginity taken by gang-rape by %1 barbarians";
  TextManager.nakadashiCount = "Creampies %1 x";
  TextManager.eventCaptive = "Meat Toilet No. %1";
  TextManager.ninshin = "Pregnancy No. %2 discovered (Sire is %1)";
  TextManager.eventMankoCheck = "State of the pussy at the start of the game";
  TextManager.eventMankoCheck2 = "State of the anus at the start of the game";
  TextManager.eventKyoseiNinshin2 =
    "Forced pregnancy by the minister using drugs";
  TextManager.eventAcceOn = "Equipped with %1";
  TextManager.eventKairakuChokyo =
    "Receive pleasure training, climaxing %1 x";
  TextManager.eventRelease = "Rescued by companions";
  TextManager.eventPunish = "Purified semen-filled belly";
  TextManager.eventSyusan = "Give birth to the first child\n(Father is %2)";
  TextManager.eventSlave = "Sold at the slave market";
  TextManager.eventBaisyun = "Prostitute to %1 persons";
  TextManager.eventSexTo1 = "Have sex with Leila";
  TextManager.eventSexTo3 = "Have sex with Miori";
  TextManager.eventSexTo7 = "Have sex with Charles";
  TextManager.eventSexTo1And3 = "Have sex with Leila & Miori";
  TextManager.eventSexTo7LostVirgin = "Lose virginity to Charles";
  TextManager.eventFela = "Forced to perform fellatio";
  TextManager.eventFelaBy1 = "Receive fellatio from Leila";
  TextManager.eventFelaTo7 = "Perform fellatio to Charles";
  TextManager.eventAnal = "Have anal sex with %1 people";
  TextManager.eventChichi = "Forced to milk breasts";
  // History
  TextManager.date = "Day %1";
  TextManager.today = "Today";
  TextManager.historyDungeon = "Combat in Chief %1's Dungeon";
  TextManager.historyMove = "Prepare for Combat and Move to Dungeon";
  TextManager.historyReturn = "Safely Returned from Dungeon";
  TextManager.historyDefeat = "Defeated but Somehow Returned";
  TextManager.historyRape = "Raped by Barbarians";
  TextManager.historyLostVirgin = "Gang-raped by Barbarians, Losing Virginity";
  TextManager.historyOpening = "Ordered to Deploy";
  TextManager.historyRelease = "Rescued by Companions";
  TextManager.historyNinshin = "Pregnancy Discovered";
  TextManager.defeat = "Defeat";
  TextManager.morning = "Adventure Preparation";
  TextManager.afternoon = "During Adventure";
  TextManager.night = " Night";
  TextManager.actor7First = "Serve Anally in Drag for the First Time";
  TextManager.actor7Second = "Serve Anally";
  TextManager.actor7Third = "Prostitute for the First Time";
  TextManager.actor7Fourth = "Serve Anally";
  TextManager.felaDaijin = "Perform Fellatio in Front of Leyla";
  TextManager.actor2Gray = "Get Creampied by Grey";
  TextManager.actor4Anal = "Undergo Anal Expansion Training";
  TextManager.actor4Muchi = "Undergo Whip Training";
  TextManager.actor4Boko = "Get Beaten and Serve Vagrants";
  TextManager.actor4Fela = "Forced to Perform Fellatio";
  TextManager.actor5Oshikko = "Become a Vagrant's Toilet";
  TextManager.actor6Kairaku =
    "Undergo Pleasure Training and Beg Barbarians for Forgiveness";
  TextManager.actor6Ninshin = "Undergo Pleasure Training and End up Pregnant";
  TextManager.actor12Sarashi = "Made to be a Public Spectacle";
  // Treasure
  TextManager.confirmCantEquip =
    "Cannot be equipped. Do you want to obtain it?";
  TextManager.confirmCantEquipLv =
    "Not enough LV to equip. Do you want to obtain it?";
  TextManager.confirmBuyCantEquipLv =
    "Not enough LV to equip. Do you want to purchase it?";
  TextManager.obtainTreasure =
    "Discovered new equipment! Please select one piece of equipment to obtain";
  TextManager.obtainTreasure2 =
    "You can change the equipment user with the L/R buttons or mouse wheel";
  TextManager.shopText = "Please select an item to purchase";
  TextManager.shopCantGet = "Not enough money";
  TextManager.shopMaxItems =
    "Cannot carry more items. Do you want to purchase anyway?";
  TextManager.confirmGet = "Do you want to obtain this equipment?";
  TextManager.confirmGetAndEquip =
    "Do you want to obtain and equip this equipment?";
  TextManager.confirmBuy = "Do you want to make a purchase?";
  TextManager.confirmEquip = "Do you want to equip immediately?";
  TextManager.currentEquip = "Current Equipment";
  TextManager.changeEquip = "If equipment is updated";
  TextManager.atk = "ATK";
  TextManager.def = "DEF";
  TextManager.mat = "MAT";
  TextManager.mdf = "MDF";
  // Kigae
  TextManager.miniChimpoEquip =
    "If you wear this, your penis will become smaller";
  TextManager.hint = "Hint for Acquisition";
  TextManager.curse = "You can't remove this accessory because it's cursed";
  TextManager.nakedOnly = "This accessory is only visible when naked";
  TextManager.cosLabel = "Costume";
  TextManager.innerLabel = "Underwear";
  TextManager.acceLabel = "Accessory";
  TextManager.faceLabel = "Expression";
  TextManager.rakugakiLabel = "Graffiti";
  TextManager.kigaeError1 =
    "You can't change equipment due to insufficient lewdness";
  TextManager.kigaeError2 =
    "You can't change equipment due to insufficient obedience";
  TextManager.kigaeNormal = "Setup for usual outfit";
  TextManager.kigaeChokyo = "Setup for meat toilet outfit";
  // Equip
  TextManager.cantEquip = "You can't change medals during an adventure";
  TextManager.equipEroAcce = "Ero Accessory";
  TextManager.autoEquip = "Shift → Automatically equip superior medals";
  TextManager.exclusive = "Exclusive to %1";
  TextManager._weapon = "Weapon";
  TextManager._armor = "Armor";
  TextManager.acce = "Accessory";
  TextManager.hitEnchant =
    "Reduce shield damage by %1";
  // Power Up
  TextManager.cantPowerUp = "You can't power up during an adventure";
  TextManager.cantPowerUp2 = "Not enough skill points";
  TextManager.needGold = "Gold Needed";
  TextManager.currengGold = "Gold in Possession";
  TextManager.currengCrystal = "Azure Crystals in Possession";
  TextManager.needCrystal = "Azure Crystals Needed";
  TextManager.skillPoint = "Skill Points";
  TextManager.needSkillPoint = "Skill Points Needed";
  TextManager.learnLv = "Learn at Lv%1";
  TextManager.learnLv1 = "Learn Initially";
  TextManager.autoSelect = "Auto Select";
  // Medal
  TextManager.goldUp = "Gold Acquired";
  TextManager.expUp = "EXP Acquired";
  TextManager.crystalUp = "Azure Crystals Acquired";
  TextManager.medalCondition = "Acquisition Condition";
  TextManager.medalEffect = "Equipped Effect";
  TextManager.medalEffect2 = "Obtained Effect";
  TextManager.criStun = "Critical hits remove an additional shield";
  TextManager.medalGold = "Start the dungeon with \\C[14] %1G \\C[0]";
  TextManager.obtainMedal = "Get Medal!!";
  TextManager.medalSkillDamagePlus = "Skill Damage";
  TextManager.medalSkillRecoveryPlus = "Skill Recovery Amount";
  TextManager.medalFinishBlow = "Finish Blow Damage";
  TextManager.medalGuardRate = "Guard Damage Reduction Rate";
  // Record
  TextManager.dungeonName = "Dungeon Name";
  TextManager.clearMember = "Clearing Member";
  TextManager.tryCount = "Challenge Count";
  TextManager.elapsedDays = "Number of Days";
  TextManager.playTime = "Play Time";
  TextManager.difficulty = "Difficulty";
  TextManager.hard = "Hard";
  TextManager.normal = "Normal";
  TextManager.easy = "Easy";
  TextManager.veryEasy = "Very Easy";
  TextManager.dungeonSkip = "Dungeon Skip";
  // Action
  TextManager.actionRenkan = "Delayed action of %1!";
  TextManager.actionMagnet = "Lured %1 to the front row!";
  TextManager.actionCancel = "Interrupted the action of %1!";
  TextManager.damageRenkan = "Action Delay";
  TextManager.damageCancel = "Action Interruption";
  TextManager.damageSuddenStrike = "Sudden Strike";
  TextManager.damageHellFire = "Bonus";
  TextManager.actionUndead = "%1 endured with the power of the undead!";
  TextManager.actionClenching = "%1 endured by clenching!";
  TextManager.noEffect = "No effect";
  TextManager.firstStrike2 = "First Strike";
  TextManager.actionReact = "%1 acted again!";
  TextManager.madanTarget = "BREAK Extension";
  // Prison
  TextManager.prisonMsg = "Please allocate a girl to meat toilet duty";
  TextManager.prisonMsg2 = "Please allocate a girl";
  TextManager.prisonConfirm = "Are you sure about this?";
  TextManager.nikubenkiDay = "Meat Toilet";
  TextManager.ministerCount = "Minister";
  TextManager.nikubenkiWoman = "Daughters";
  TextManager.nikubenkiNum = "%1 person";
  TextManager.nikubenki = "Meat Toilet Duty";
  TextManager.remainTime = "Remaining Time";
  TextManager.nikubenkiMob = "%1 / %2 People";
  TextManager.nikubenkiPerson = "Meat Toilet Duty";
  TextManager.baisyunPerson = "Prostitution Duty";
  TextManager.ngaroPerson = "Ngaro's Processing Duty";
  TextManager.settaiPerson = "Sexual Entertainment Duty";
  TextManager.toiletPerson = "Toilet Cleaning Duty";
  TextManager.banzokuPerson = "Barbarian's Sexual Processing Duty";
  TextManager.goblinPerson = "Goblin's Sexual Processing Duty";
  TextManager.vagrantPerson = "Vagrant's Sexual Processing Duty";
  TextManager.ministerPerson = "Minister's Duty";
  TextManager.grayPerson = "Grey's Duty";
  TextManager.charlesPerson = "Sex with Charles";
  TextManager.boteDisabled = "Cannot be assigned during pregnancy";
  TextManager.chichiPerson = "Milk Extraction";
  TextManager.syusanDisabled = "Requires childbirth experience";
  TextManager.prisonCrystal = "Azure Crystals Acquired";
  TextManager.prisonSp = "SP can be Acquired";
  TextManager.prisonChichi = "Breast Milk can be Acquired";
  TextManager.selectNikubenki = "Select Nighttime Activity";
  TextManager.prisonSche = "%1's Meat Toilet";
  TextManager.nikubenkiTitle = "Meat Toilet Duty";
  TextManager.prisonForce = "Forced";
  TextManager.prisonLocked = "Injured";
  TextManager.prisonLocked2 = "Minister Only";
  TextManager.prisonLocked3 = "Cannot be selected yet";
  TextManager.prisonLockedTaikenban = "Not available in the trial version";
  TextManager.prisonNeedExperience = "Meat Toilet experience required";
  TextManager.prisonGirlRequired = "Assignment is mandatory";
  TextManager.prisonNeedVagrantExperience =
    "Meat Toilet experience with vagrants required";
  TextManager.prisonNeedGoblinExperience =
    "Meat Toilet experience with goblins required";
  TextManager.prisonNeedSyusanExperience = "Childbirth experience required";
  TextManager.prisonLockedVagrant = "Cannot Select";
  TextManager.prisonLockedMob = "All have been offered";
  TextManager.nikubenkiResult = "Meat Toilet Results";
  TextManager.nikubenkiResultCount = "Total Meat Toilet Count";
  TextManager.nikubenkiResultNakadashi = "Vaginal Service";
  TextManager.nikubenkiResultAnal = "Anal Service";
  TextManager.nikubenkiResultFela = "Oral Service";
  TextManager.nikubenkiResultRanshi = "Ovum Durability";
  // DungeonResult
  TextManager.dungeonResult = "Adventure Results";
  TextManager.dungeonResultSp = "Skill Points Acquired";
  // Timeline
  TextManager.schedule1 = "Schedule for Day %1";
  TextManager.schedule2 = "Schedule";
  TextManager.timelineNikubenki = "Serving the Barbarians (%1)";
  TextManager.timelineVagrant = "Serving the Vagrants (%1)";
  TextManager.timelineMinister = "Serving the Minister (%1)";
  TextManager.timelineGoblin = "Serving Goblins (%1)";
  TextManager.timelineGray = "Serving Gray (%1)";
  TextManager.timelineCharles = "Naughty Time with Charles (%1)";
  TextManager.timelineChichi = "Milking (%1)";
  TextManager.timelineEvent = "Event";
  TextManager.timelineRest = "Rest";
  TextManager.timelineEroEvent = "Erotic Event";
  TextManager.timelineDungeon = "Dungeon Exploration";
  TextManager.timelineNight = "Night Duty";
  TextManager.timelineBoteGlowup = "Pregnant Belly Growth";
  TextManager.timelineSlave = "Slave Market";
  TextManager.timelineNinshin = "Pregnancy Discovered";
  TextManager.timelineCivilian = "Offering Village Girls to Barbarians";
  TextManager.timelineStart = "Start of the Day";
  TextManager.timelineEnd = "End of the Day";
  TextManager.timelineSyusan = "Giving Birth ";
  TextManager.timelineGetChichi = "Acquiring Breast Milk ";
  TextManager.timelineGetCrystal = "Acquiring Azure Crystals";
  // Option
  TextManager._alwaysDash = "Always Dash";
  TextManager._touchUI = "Touch UI";
  TextManager._bgmVolume = "BGM Volume";
  TextManager._bgsVolume = "BGS Volume";
  TextManager._meVolume = "ME Volume";
  TextManager._seVolume = "SE Volume";
  TextManager.confirmEnter = "Confirmation Before Entering Dungeon Room";
  TextManager._voiceVolume = "VOICE Volume";
  TextManager.showSikyu = "Show Cross-Section";
  TextManager.windowAlpha = "Window Opacity";
  // Difficulty
  TextManager.difficultyText = "Select Difficulty - You can change it later";
  TextManager.cancelText = "Do you want to cancel?";
  // BabyList
  TextManager.babyTitle = "%2 Child No.%1";
  TextManager.babyFuture = "Expected Future";
  TextManager.babySkill = "Talent";
  TextManager.sellPrice = "Valuation";
  TextManager.sortDay = "Sort by Birth Order";
  TextManager.sortAptitude = "Sort by Overall Aptitude";
  TextManager.sortGold = "Sort by G";
  TextManager.searchAll = "ALL";
  TextManager.search1 = "1";
  TextManager.search3 = "3";
  TextManager.search7 = "7";
  TextManager.search2 = "2";
  TextManager.search4 = "4";
  TextManager.search5 = "5";
  TextManager.search6 = "6";
  TextManager.search7 = "7";
  TextManager.search10 = "10";
  TextManager.search12 = "12";
  TextManager.outerAlpha = "Clothing Opacity %1% ←→ can be adjusted";
  TextManager.babyMilk = "OK → Confirm Breastfeeding";
  // Exposed
  TextManager.syusanName = "Child of %1 x%2";
  TextManager.syusanNameGoblin = "%1's offspring x%2";
  TextManager.babyByTanetsukeBanzoku = "Pregnant from barbarian insemination";
  TextManager.babyByTanetsukeBar = "Pregnant from prostitution in a bar";
  TextManager.babyByTanetsukeMinister = "Pregnant from minister insemination";
  TextManager.babyNull = "Unset";
  getBabyFuture = function (type) {
    switch (type) {
      case Future.BANZOKU_FIGHTER:
        return "Fight as a barbarian warrior\non the front lines";
      case Future.COMMON_SOLDIER:
        return "Serve as a barbarian foot soldier\nbecoming a wall of flesh";
      case Future.BANZOKU_STRATEGIST:
        return "Command as a barbarian strategist";
      case Future.BANZOKU_MAGE:
        return "Fight on the battlefield\nas a barbarian mage";
      case Future.BANZOKU_THIEF:
        return "Plunder as a barbarian thief";
      case Future.BANZOKU_KING:
        return "Has the qualities of a\nbarbarian king";
      case Future.BANZOKU_DOREI:
        return "Spend a lifetime as\na barbarian slave";
      case Future.MINISTER:
        return "Involved in governing the country\nusing lineage and knowledge";
      case Future.INSTRUCTER:
        return "Contribute as a swordsmanship instructor";
      case Future.CORRUPTION:
        return "Cause a corruption scandal\nand get executed";
      case Future.ORDINARY:
        return "Live without leaving a name\nas an ordinary person";
      case Future.FIGHTER:
        return "Active as a warrior adventurer\naround the world";
      case Future.MAGE:
        return "Active as a mage adventurer\naround the world";
      case Future.SAGE:
        return "Active as a sage adventurer\naround the world";
      case Future.CLELIC:
        return "Active as a cleric adventurer\naround the world";
      case Future.THIEF:
        return "Active as a thief adventurer\naround the world";
      case Future.ADVENTURER:
        return "Become an adventurer\nand travel to various places";
      case Future.LESSER_ADVENTURER:
        return "Become an adventurer but\ndie soon after";
      case Future.CHARLES_KING:
        return "Have the talent of a king\nand leave a name in history";
      case Future.CHARLES_MINISTER:
        return "Have the talent of a king's aide\nand leave a name in history";
      case Future.CHARLES_FIGHTER:
        return "Contribute as a royal guard";
      case Future.CHARLES_MAGE:
        return "Contribute as a court mage";
      case Future.CHARLES_STRATEGIST:
        return "Contribute as a military strategist";
      case Future.CHARLES_COMMANDER:
        return "Contribute as a military commander";
      case Future.BANZOKU_FIGHTER:
        return "Fight as a barbarian warrior\non the front lines while also\nbecoming a meat toilet";
      case Future.NIKUBENKI_1:
        return "Become a barbarian meat toilet,\nand bear many children";
      case Future.NIKUBENKI_2:
        return "Become a barbarian meat toilet,\nand bear many children\nwith superior magical power";
      case Future.NIKUBENKI_3:
        return "Become a barbarian meat toilet,\nand bear many wise children";
      case Future.NIKUBENKI_4:
        return "Become a barbarian meat toilet,\nbut escape on your own";
      case Future.BANZOKU_DOREI:
        return "Work as a barbarian slave\nalongside male slaves";
      case Future.GOBLIN_MAGE:
        return "Become a goblin mage\nand join the goblin army";
      case Future.GOBLIN_SHAMAN:
        return "Become a goblin shaman\nand join the goblin army";
      case Future.GOBLIN_FIGHTER:
        return "Become a goblin warrior\nand join the goblin army";
    }
    p(type);
    return "none";
  };
  TextManager.dungeonSkipInfo = [
    "\\C[2]For those who just want to see the H scenes\\C[0],",
    "this difficulty Lv is for you.",
    "",
    "・\\C[6]Able to completely skip dungeons",
    "・Deal 300% damage, Shield +20",
    "・\\C[6]Unlimited use of 'Powerful Bomb'",
  ];
  TextManager.veryEasyInfo = [
    "\\C[2]For those who want to quickly finish battles\\C[0],",
    "this difficulty Lv is for you.",
    "You can instantly defeat enemies with",
    "the 'Powerful Bomb' in combat.",
    "",
    "・Save anywhere in the dungeon",
    "・Deal 300% damage, Shield +20",
    "・\\C[6]Unlimited use of 'Powerful Bomb'",
  ];
  TextManager.easyInfo = [
    "\\C[2]For those who want to play the game easily\\C[0],",
    "this difficulty Lv is for you.",
    "The dungeons are moderately difficult,",
    "not too easy, and you can enjoy both H scenes",
    "and the game.",
    "",
    "・Save anywhere in the dungeon",
    "・Deal 130% damage, Shield +10",
  ];
  TextManager.normalInfo = [
    "\\C[2]For those who really want to delve into the game\\C[0],",
    "this difficulty Lv is for you.",
    "",
    "・Save anywhere in the dungeon",
  ];
  TextManager.hardInfo = [
    "\\C[2]For those who are experienced and seek a challenge\\C[0],",
    "this difficulty Lv is for you.",
    "",
    "・\\C[6]Saving in the dungeon only at save points",
    //'・The number of blue crystals obtained in the dungeon decreases',
    "・\\C[6]Some enemies are strengthened",
  ];
  getEroParamTitle = function (label) {
    switch (label) {
      case "nakadashi":
        return "Creampie";
      case "anal":
        return "Anal SEX";
      case "baisyun":
        return "Prostitution";
      case "bukkake":
        return "Bukkake";
      case "seiekiNomu":
        return "Semen Swallowing";
      case "oshikkoNomu":
        return "Urine Drinking";
      case "syusan":
        return "Childbirth";
      case "fela":
        return "Fellatio";
      case "acme":
        return "Climax";
      case "vaginalAcme":
        return "Vaginal Climax";
      case "anal_acme":
        return "Anal Climax";
      case "chichi":
        return "Milk Squeezing";
    }
    return "";
  };
  getTaneoyaName = function (taneoyaId) {
    switch (taneoyaId) {
      case TaneoyaId.banzoku:
        return $gameActors.actor(30).name();
      case TaneoyaId.chosyuhei:
        return $gameActors.actor(61).name();
      case TaneoyaId.charles:
        return $gameActors.actor(7).name();
      case TaneoyaId.goblin:
        return $gameActors.actor(85).name();
      case TaneoyaId.minister:
        return $gameActors.actor(13).name();
      case TaneoyaId.vagrant:
        return $gameActors.actor(93).name();
      case TaneoyaId.bar:
        return $gameActors.actor(113).name();
      case TaneoyaId.gray:
        return $gameActors.actor(16).name();
      case TaneoyaId.loli:
        return $gameActors.actor(140).name();
    }
    return "Name not set";
  };
  getDungeonName = function (stageId) {
    switch (stageId) {
      case 1:
        return "Abyssal Hole";
      case 2:
        return "Waterfall Cavern";
      case 3:
        return "Sage King's Pyramid";
      case 4:
        return "Crystal Cave";
      case 5:
        return "Lost Sanctuary";
      case 6:
        return "Forest of No Return";
      case 7:
        return "Blazing Lava Cave";
      case 8:
        return "Demon Realm";
    }
    return "Kidaru Valley";
  };
  getChokyoName = function (actorId) {
    var actor = $gameActors.actor(actorId);
    var name = "";
    if (actor) {
      name = actor.nameJp();
    }
    return "Meat Toilet (%1)".format(name);
  };
  getDestinationName = function (type) {
    switch (type) {
      case DestType.prison:
        return "Prison";
      case DestType.sexRoom:
        return "Fuck Room";
      case DestType.sexRoom2:
        return "Fuck Room (Conscription Soldier)";
      case DestType.bossRoom:
        return "Ngalo's Room";
      case DestType.bar:
        return "Bar";
      case DestType.slave:
        return "Slave Room";
      case DestType.empire:
        return "Captured Imperial Soldier's Room";
      case DestType.conscript1:
        return "Volunteer Conscription Soldier's Room";
      case DestType.conscript2:
        return "Conscription Soldier's Room";
      case DestType.return:
        return "Return (Less than 30% time)";
      case DestType.monster:
        return "Goblin's Nest";
      case DestType.vagrant:
        return "Vagrant's Room";
      case DestType.merchant:
        return "Merchant's Room";
      case DestType.sm:
        return "Torture Room";
      case DestType.toilet:
        return "Toilet";
      case DestType.minister:
        return "Minister's Room";
      case DestType.gray:
        return "Gray's Room";
    }
    return "Name not set";
  };
}
// Bathroom
TextManager.bathroomHelp = "Please select two girls to enter the bath";
TextManager.bathroomHelp2 =
  "Curses on armors are lifted, and any scribbles or semen are cleaned off";
TextManager.confirmBathroom = "Enter the bath with these two?";
// Syusan
TextManager.syusanCancel = "Cancel";
TextManager._cancel = "Cancel";
/*
CHITSU_TIGHTENING = {
    '1':'締まり抜群、最高の\n極上ロリまんこ',
    '2':'まだまだキツキツな\nロリまんこ',
    '3':'平均的な締まり具合\n少しこなれてきた感',
    '4':'ユルマンといわれる領域に\n達した',
    '5':'自他ともに認めるガバガバまんこ\nレオがかわいそう',
};
ANAL_TIGHTENING = {
    '1':'キツキツアナル。\nほぼ経験なし',
    '2':'挿れるのにまだ苦労する、\n締まり良きアナル',
    '3':'少しこなれてきた尻穴。\n脱初心者アナル',
    '4':'ゆるゆるになったアナル。\n街に数人レベル',
    '5':'ガバガバなアナル。\n国に数人いるかレベル',
};
*/
function getPunishEroName(itemId) {
  switch (itemId) {
    case Nore.PunishCommad.NAKADASHI:
      return "Make confess the number of creampies";
    case Nore.PunishCommad.ACME:
      return "Make confess the number of climaxes";
    case Nore.PunishCommad.ANAL:
      return "Make confess anal experiences";
    case Nore.PunishCommad.SHOJO:
      return "About the loss of virginity";
    case Nore.PunishCommad.PUNISH:
      return "Give a punishment";
    case Nore.PunishCommad.LABIA:
      return "Make confess about labia piercings";
    case Nore.PunishCommad.END:
      return "Finish";
    default:
      return "";
  }
}
// Dialogue during combat
function selectDialogue(subject, skill) {
  if (subject.isEnemy()) {
    return;
  }
  var actor = subject;
  var lv1SkillId = actor.findLv1Skill(skill).id;
  var candidates = [];
  switch (actor.actorId()) {
    case 1:
      candidates = selectDialogue1(actor, lv1SkillId);
      break;
    case 2:
      candidates = selectDialogue2(actor, lv1SkillId);
      break;
    case 3:
      candidates = selectDialogue3(actor, lv1SkillId);
      break;
  }
  if (!candidates || candidates.length == 0) {
    return null;
  }
  var dice = Math.randomInt(candidates.length);
  return candidates[dice];
}
function selectDialogue1(actor, lv1SkillId) {
  switch (lv1SkillId) {
    case 1123: // Holy Saber
      return ["Right there!", "Too slow!", "Ha!"];
    case 1139: // Double Cut
    case 1143: // Lightning Slash
      return ["This will decide it!", "I'm not done yet!"];
    case 1171: // ★Shine Slash
      return ["Engrave this on yourself!", "Got you!"];
  }
}
function selectDialogue2(actor, lv1SkillId) {
  switch (lv1SkillId) {
    case 1221: // Combo Attack
      return ["Small fry!", "Ora Ora!"];
    case 1231: // Heavy Blow
      return ["Still alive, I see!", "Drop dead!"];
    case 1247: // Whirlwind
      return ["Heheh, thought you could escape?!", "Don't look away!"];
    case 1251: // Fighting Spirit
      return ["I'm feeling pumped!", "Here I go!"];
  }
}
function selectDialogue3(actor, lv1SkillId) {
  switch (lv1SkillId) {
    case 1321: // Lightning Charm
      return ["I'll settle this!", "Here I go!"];
    case 1331: // Area Lightning Charm
      return ["I've got you!", "How's this!"];
    case 1381: // ★Roaring Thunder Charm
      return ["No need to hold back!", "Now's the time!"];
  }
}
// Description of breast milk
function getMilkText(actorId) {
  switch (actorId) {
    case 1:
      return "Sweet breast milk with a smooth taste\nIt has an elegant flavor befitting of royalty.\n\nThere is a large volume per serving, but it's in high demand and often in short supply.";
    case 2:
      return "The taste is rich.\nThere is a gentle sweetness that comes later.\n\nThe amount is moderate.\nIt seems Tanya prefers to give it to the baby, so it's hard to find.";
    case 3:
      return "Breast milk with an elegant sweetness.\nDue to the amount of magical power, the sweetness is intense.\n\nThere is a large volume per serving, but it has many fans and often in short supply.";
    case 4:
      return "The flavor is mild. Its gentle sweetness is popular.\n\nThere's not much of it, and it seems to be fought over by girl lovers and sister milk connoisseurs.";
    case 5:
      return "Mild-flavored breast milk. Seems easy to drink with a smooth aftertaste.\n\nThere's quite a large volume, popular with customers who prefer the milk of serious women.";
    case 6:
      return "The sweetness is intense, though the volume per serving is small.\n\nIt seems to be hotly contested by lovers of young girl's milk.";
    case 7:
      return "The taste is reasonably rich.\nOverflowing with tremendous life force and magical power.\n\nThere's a substantial volume.\nIt appears to be popular among a wide range of people from noblewomen to male admirers and magicians.";
    case 10:
      return "The flavor is mild. It has a refreshing aftertaste that suggests potential.\n\nThe volume is also small, and it seems particularly popular among fans of Serena, who is both a mother and a hero.";
    case 12:
      return "While the flavor is simple, it's very rich.\nThere seems to be a refined aftertaste.\n\nHowever, the volume is very small, and it seems to be in demand among royal enthusiasts and fans of her as an adventurer.";
  }
}
