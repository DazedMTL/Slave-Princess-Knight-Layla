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
  TextManager._newGame = "ニューゲーム";
  TextManager._continue_ = "コンティニュー";
  TextManager.recollection = "回想";
  // Battle
  TextManager.hit = "命中";
  TextManager.alwaysHit = "必中";
  TextManager.atkUpTarget = "ATK%1アップ";
  TextManager.atkDownTarget = "ATK%1ダウン";
  TextManager.defUpTarget = "DEF%1アップ";
  TextManager.defDownTarget = "DEF%1ダウン";
  TextManager.mdfDown = "魔防↓";
  TextManager.mdfUp = "魔防↑";
  TextManager.cantAttack = "攻撃不可";
  TextManager.alwaysMiss = "MISS確定";
  TextManager.skip = "次のキャラへ";
  TextManager.auto = "オートバトル";
  TextManager.damageText = "ダメージ";
  TextManager.showDetail = "Shift→ステート詳細を表示する";
  TextManager.hideDetail = "Shift→ステート詳細を非表示にする";
  TextManager.invokeSuddenStrike = "%1の急襲！";
  TextManager.actionBarrier = "%1は聖なる障壁で攻撃を防いだ！";
  TextManager._partyName = "%1たち";
  TextManager._emerge = "%1が出現！";
  (TextManager._victory = "%1の勝利！"),
    (TextManager._defeat = "%1は戦いに敗れた。"),
    (TextManager._obtainExp = "%1 の%2を獲得！"),
    (TextManager._obtainGold = "お金を %1\\G 手に入れた！"),
    (TextManager._obtainItem = "%1を手に入れた！"),
    (TextManager._levelUp = "%1は%2 %3 に上がった！"),
    (TextManager._obtainSkill = "%1を覚えた！"),
    (TextManager._useItem = "%1は%2を使った！"),
    (TextManager._criticalToEnemy = "クリティカルヒット");
  TextManager._criticalToActor = "クリティカルヒット";
  TextManager._actorDamage = "%1は %2 のダメージを受けた！";
  TextManager._actorRecovery = "%1の%2が %3 回復した！";
  TextManager._actorGain = "%1の%2が %3 増えた！";
  TextManager._actorLoss = "%1の%2が %3 減った！";
  TextManager._actorDrain = "%1は%2を %3 奪われた！";
  TextManager._actorNoDamage = "%1はダメージを受けていない！";
  TextManager._actorNoHit = "ミス！　%1はダメージを受けていない！";
  TextManager._enemyDamage = "%1に %2 のダメージを与えた！";
  TextManager._enemyRecovery = "%1の%2が %3 回復した！";
  TextManager._enemyGain = "%1の%2が %3 増えた！";
  TextManager._enemyLoss = "%1の%2が %3 減った！";
  TextManager._enemyDrain = "%1の%2を %3 奪った！";
  TextManager._enemyNoDamage = "%1にダメージを与えられない！";
  TextManager._enemyNoHit = "ミス！　%1にダメージを与えられない！";
  TextManager._evasion = "%1は攻撃をかわした！";
  TextManager._magicEvasion = "%1は魔法を打ち消した！";
  TextManager._magicReflection = "%1は魔法を跳ね返した！";
  TextManager._counterAttack = "%1の反撃！";
  TextManager._substitute = "%1が%2をかばった！";
  TextManager._buffAdd = "%1の%2が上がった！";
  TextManager._debuffAdd = "%1の%2が下がった！";
  TextManager._buffRemove = "%1の%2が元に戻った！";
  TextManager._actionFailure = "%1には効かなかった！";
  TextManager.info = "情報";
  TextManager.prepare = "\\C[16]準備%1ターン　\\C[0]";
  TextManager.actorShieldDamage = "%1のシールドが %2 のダメージを受けた！";
  TextManager.actorShieldRecovery = "%1のシールドを %3 回復した！";
  // EroStatus
  TextManager.peopleUnit = "%1 人";
  TextManager.countUnit = "%1 回";
  TextManager.normal = "通常";
  TextManager.pregnant = "妊娠中";
  TextManager.father = "種親";
  TextManager.omankoParam = "おまんこ開発度";
  TextManager.chimpoParam = "おちんちん縮小値";
  TextManager.analParam = "アナル開発度";
  TextManager.omankoGaba = "まんこ変形度 %1/%2";
  TextManager.miniChinpo = "おちんちん縮小度 %1/%2";
  TextManager.analGaba = "アナル変形度 %1/%2";
  TextManager.aptitude = "素質";
  TextManager.aptitude1 = "武力";
  TextManager.aptitude2 = "魔法力";
  TextManager.aptitude3 = "知力";
  TextManager.aptitude4 = "信仰心";
  TextManager.aptitude5 = "敏捷性";
  // Menu
  TextManager.language = "Language";
  TextManager._save = "セーブ";
  TextManager._load = "ロード";
  TextManager._skill = "スキル";
  TextManager._equip = "装備";
  TextManager.eroStatus = "エロステータス";
  TextManager.record = "冒険の記録";
  TextManager._status = "ステータス";
  TextManager.kigae = "着せ替え";
  TextManager.collection = "コレクション";
  TextManager.babyList = "赤ん坊リスト";
  TextManager.history = "エロヒストリー";
  TextManager.canSortie = "控えメンバー";
  TextManager.inSortie = "出撃中";
  TextManager.inSortie2 = "出撃メンバー";
  TextManager.powerUp = "パワーアップ";
  TextManager.powerUp2 = "祈りの祭壇";
  TextManager.sortie = "出撃メンバー";
  TextManager.captive = "囚われの身";
  TextManager.ifDefeat = "敗北時のペナルティ";
  TextManager.ifDefeat2 = "%1人が囚えられる";
  TextManager.shortMember = "出撃メンバーが足りません";
  TextManager.members = "メンバーリスト";
  TextManager.sortieCount = "出撃";
  TextManager.captiveDay = "肉便器";
  TextManager.count = "%1回";
  TextManager.day = "%1日";
  TextManager.day2 = "%1日目";
  TextManager.nakadashi = "中出し";
  TextManager.syusan = "出産";
  TextManager.slave = "奴隷市場";
  TextManager.encyclopedia = "辞典";
  TextManager.delayAction = "最後に行動する";
  TextManager.menuLevel = "レベルアップ";
  TextManager.medal = "勲章";
  TextManager.cantKigae = ["着替えは肉便器当番をすると解放されます"];
  TextManager.hasNoItems = ["アイテムを所持していません"];
  TextManager._expNext = "次の%1まで";
  TextManager._level = "レベル";
  TextManager._item = "アイテム";
  TextManager._options = "オプション";
  TextManager._gameEnd = "ゲーム終了";
  TextManager.partyExp = "パーティEXP";
  TextManager.crystalCount = "個";
  TextManager.endlessHMode = "エンドレスHモード";
  TextManager.goToPrepare = "冒険準備へ";
  TextManager.use = "使う";
  // Save
  TextManager._file = "ファイル";
  TextManager._autosave = "オートセーブ";
  TextManager.chapter = "%1章";
  TextManager.prologue = "序章";
  TextManager.spSave = "SP %1";
  TextManager.saveLatest = "最新 %1";
  TextManager._saveMessage = "どのファイルにセーブしますか？";
  TextManager._loadMessage = "どのファイルをロードしますか？";
  // Agito
  TextManager.resqueMsg = [
    "ダンジョンでキャラの監禁場所を見つけるまで",
    "救出することができません",
  ];
  // Collection
  TextManager.collectionHelp = "母乳の納品状況";
  // Skill
  TextManager.invalid = "無効";
  TextManager.turnRemain = "%1ターン継続";
  TextManager.turn = "%1ターン";
  TextManager.momey = "所持金";
  TextManager.price = "費用";
  TextManager.learned = "解放済";
  TextManager.unlearned = "未解放";
  TextManager.learn = "新規習得";
  TextManager.confirmPrice1 = "スキル習得には%1 ptかかります。";
  TextManager.confirmPrice2 = "習得しますか？";
  TextManager.notEnoughPoint = "スキル pt が足りません";
  TextManager.notEnoughCrystal = "蒼結晶が足りません";
  TextManager.stunBreak =
    "BREAK中！　与ダメージが%1％アップし、ダメージのブレがなくなる";
  TextManager.confirmCrystal1 = "機能の開放には蒼結晶 %1 個必要です。";
  TextManager.confirmCrystal2 = "強化しますか？";
  TextManager.blessText1 = "敵に攻撃を当てるたびに\\C[2]加護\\C[0]が１貯まる";
  TextManager.blessText2 = "加護が５貯まると再行動し、";
  TextManager.blessText3 = "スキルの消費MPが０になる";
  TextManager.blessText4 =
    "戦闘開始時および敵に攻撃を当てるたびに\n\\C[2]加護\\C[0]が１貯まる";
  TextManager.addState = "\\C[2]%1\\C[0]%2を与える";
  TextManager.addStateSelf = "自身に\\C[2]%1\\C[0]%2を与える";
  TextManager.baseRate = "確率%1%";
  TextManager.bossInvalid = "ボス無効";
  TextManager.itemReact = "\\C[6]行動ターンを消費しない";
  TextManager.forUser = "自身を対象";
  TextManager.forAllFriend = "味方全員を対象";
  TextManager.forFrontFriend = "前列の味方全員を対象";
  TextManager.forLineFriend = "列の味方全員を対象";
  TextManager.regene = "毎ターンの開始時にHPが%1回復";
  TextManager.slipDamage = "自身の行動時に継続ダメージを与える";
  TextManager.slipDamageFixed = "自身の行動時に%1ダメージを与える";
  TextManager.stateTurnHalf = "毎ターン値が半減する";
  TextManager.stateTurnAll = "１ターンのみ継続する";
  TextManager.stateTurnNone = "永続";
  TextManager.stateTurnInvoke = "発動時に減少する";
  TextManager.stateBullet =
    "放電を使うと1減少し、\n0になると放電が使用不可能になる";
  TextManager.stateBullet2 =
    "フレイムシュートを使うと1減少し、\n0になるとスキルが使用不可能になる";
  TextManager.stateToge = "物理ダメージに対してとげで反撃する";
  TextManager.stateTogeDownMagic = "魔法ダメージを受けるととげが１減少する";
  TextManager.stateMagicWeakness =
    "魔法ダメージを受けると\nシールドが１減少する";
  TextManager.stateMikiri = "物理ダメージを回避する";
  TextManager.stateBoss = "この敵を倒すと勝利になる";
  TextManager.stateSyuchu = "周りの敵と同じ相手を狙おうとする";
  TextManager.stateYowaimono = "シールドが少ない相手を狙う";
  TextManager.stateMelting = "BREAK時に現HPの33%のダメージを受ける";
  TextManager.stateCounter = "敵の攻撃に対して通常攻撃で反撃する";
  TextManager.stateDamageCut = "被ダメージを%1%減少、状態異常を無効";
  TextManager.stateUtsurigi = "ランダムな相手を狙うようになる";
  TextManager.stateGekkou =
    "このステートを与えた相手を狙う\n範囲攻撃は他のメンバーにも命中する";
  TextManager.stateUndead = "HPが０になるときHP１で耐える";
  TextManager.stateInvalidateDebuff = "状態異常を無効化する";
  TextManager.stateCountDown = "敵を倒すごとに1減り、0になると勝利する";
  TextManager.statePhotosynthesize =
    "ターン開始時、HPが減っていると\nシールドを消費してHPを%1回復する";
  TextManager.stateDeathAgony = "死亡時、準備中の攻撃を実行する";
  TextManager.stateMpCharge = "魔法ダメージを%1与えるたび、MP１を得る";
  TextManager.stateEarthBenefit =
    "毎ターントゲ３とストレングス３を得る\nBREAKするとリセットされる";
  TextManager.stateDarkBenefit = "毎ターンストレングス３を得る";
  TextManager.stateFireBenefit = "10ダメージごとにデバフを得る";
  TextManager.stateTransform = "このステートが消去されると変身する";
  TextManager.stateCurse = "ジョセルにダメージを与えるたびに2減少する";
  TextManager.stateShareHp = "HPを他の個体と共有する";
  TextManager.stateKogoroshi = "他の魔物が死ぬとストレングス３を得る";
  TextManager.stateResurection = "毎ターン%1%の確率で復活する";
  TextManager.stateSyunbin = "毎ターン回避%1を得る";
  TextManager.stateHardening = "ダメージを受けるたびに防御を%1得る";
  TextManager.stateBleeding =
    "攻撃をするたびに２０ダメージを受け、\nシールドを１失う";
  TextManager.stateAntiMadan = "これ以上BREAKが延長しなくなる";
  TextManager.stateDamageDown = "この敵が与える最終ダメージが%1%減る";
  TextManager.stateArmor = "この値だけ毎ターン防御のバフを得る";
  TextManager.stateMdfArmor = "この値だけ毎ターン魔防のバフを得る";
  TextManager.cantMove = "行動できない";
  TextManager.maxDamage = "ダメージのブレがなくなる";
  TextManager.notRegene = "継続ダメージがある場合は回復しない";
  TextManager.ougiBuff =
    "前衛の味方が奥義を使うと、\n味方全員が全てのバフ%1を得る";
  TextManager.ougiMpRecover1 = "奥義を使った味方のMPが1回復する";
  //TextManager.ougiMpRecover2 = '前衛の味方が奥義を使うと、\nその味方のMPが1回復し、シールドが5回復する';
  TextManager.matDebuff = "敵のＭＡＴを%1減少させる";
  TextManager.fixedDamage = "固定ダメージ";
  TextManager.madan = "BREAK中の場合、BREAKを１ターン延長する";
  TextManager.maxShieldDown = "BREAKから復帰する時、シールドが%1減る";
  TextManager.atkUpBattle = "ATK↑%1";
  TextManager.defUpBattle = "DEF↑%1";
  TextManager.matUpBattle = "MAT↑%1";
  TextManager.mdfUpBattle = "MDF↑%1";
  TextManager.atkDownBattle = "ATK↓%1";
  TextManager.defDownBattle = "DEF↓%1";
  TextManager.matDownBattle = "MAT↓%1";
  TextManager.mdfDownBattle = "MDF↓%1";
  TextManager.atkUp = "\\C[61]ATK\\C[0]が%1アップ";
  TextManager.defUp = "\\C[62]DEF\\C[0]が%1アップ";
  TextManager.matUp = "\\C[61]MAT\\C[0]が%1アップ";
  TextManager.mdfUp = "MDFが%1アップ";
  TextManager.atkDown = "\\C[61]ATK\\C[0]が%1ダウン";
  TextManager.defDown = "\\C[62]DEF\\C[0]が%1ダウン";
  TextManager.matDown = "\\C[61]MAT\\C[0]が%1ダウン";
  TextManager.mdfDown = "\\C[62]MDF\\C[0]が%1ダウン";
  TextManager.physical = "物理";
  TextManager.masical = "魔法";
  TextManager.hpHeal = "HP回復";
  TextManager.damage = "ダメージ";
  TextManager.passive = "パッシブスキル";
  TextManager.hitRate = "命中率";
  TextManager.evaRate = "回避率";
  TextManager.cancelSkill = "敵の行動を中断する";
  TextManager.spCost = "消費MP";
  TextManager.ougiCost = "消費OP";
  TextManager.shortRange = "近接攻撃";
  TextManager.longRange = "遠距離攻撃";
  TextManager.targetAll = "全体攻撃";
  TextManager.targetRandom = "ランダム%1体攻撃";
  TextManager.ougi = "奥義";
  TextManager.react = "再行動する";
  TextManager.giveReact = "味方を再行動させる";
  TextManager.reactTodome = "この技でとどめを刺すと再行動する";
  TextManager.reactAll = "他のキャラを全員再行動させる";
  TextManager.ougiPlus = "敵にとどめを刺すとOPが%1%増加する";
  TextManager.skillOugiPlus = "スキルを使うとOPが%1多く増加する";
  TextManager.ougiAutoPlus = "毎ターンOPが%1%増加する";
  TextManager.ougiReact = "奥義を使う味方が再行動する";
  TextManager.shieldAutoPlus = "毎ターン開始時にSHが%1回復する";
  TextManager.shieldAutoPlusAll = "毎ターン開始時に味方全員のSHが%1回復する";
  TextManager.cheer = "味方のSPが１回復する";
  TextManager.spPlus = "MPの初期値が%1増加する";
  TextManager.mpPlusTurnOdd = "奇数ターンごとにMP１を追加で獲得する";
  TextManager.mpPlusTurnEven = "偶数ターンごとにMP１を追加で獲得する";
  TextManager.reactCondition = "再行動後のみ使用可能\n加護が増えない";
  TextManager.atkUpCondition = "\nATK上昇中のみ使用可能";
  TextManager.counter1 = "敵の攻撃に対して";
  TextManager.counter2 = "通常攻撃で反撃する";
  TextManager.damageCut = "ダメージを%1%カットする";
  TextManager.mikiri = "敵の通常攻撃を%1%の確率で回避";
  TextManager.breakDamage =
    "BREAKしている敵への味方のダメージが\nさらに%1%増える";
  TextManager.stunDown = "シールド値を減らせない";
  TextManager.stunUp = "シールド値を%1減らす";
  TextManager.recoverShield = "シールドを%1回復する";
  TextManager.renkan = "「あと２」以上の敵のスキルの待機時間を１伸ばす";
  TextManager.provoke = "敵の攻撃を自分に向ける";
  TextManager.magicShield = "味方への魔法ダメージを%1%軽減する";
  TextManager.mdfBuff = "味方がMDF%1のバフを得る";
  TextManager.matDebuff = "敵全体がMAT%1のデバフを得る";
  TextManager.penetrate = "シールド貫通";
  TextManager.recover = "状態異常を治療する";
  TextManager.recover2 = "味方の状態異常を治療する";
  TextManager.firstStrike = "HPが全快の敵にダメージ%1%アップ";
  TextManager.repeats = "×%1";
  TextManager.clenching = "HPが２以上の場合、致命傷を負っても\nHP１で耐える";
  TextManager.blessPlus = "追加で\\C[2]加護\\C[0]が%1増える";
  TextManager.bonusBlessBuff = "再行動するとATK＋２のバフを得る";
  TextManager.giveReactAll = "味方を全員再行動させる";
  TextManager.slotText = "勲章をさらに%1つ装備できる";
  TextManager.requiredExpDown = "LVUPに必要な経験値が%1%減少する";
  TextManager.rareSkillText = "レアスキルがでる確率が%1%アップする";
  TextManager.lowerLimitText = "ダメージのぶれ幅が%1減少する";
  TextManager.skillUpText = "初めから覚えてるスキルの１つ目が%1段階強化される";
  TextManager.damageUp = "与ダメージが%1%アップ　重複しない";
  TextManager.mist = "通常攻撃が必ず回避されるようになる";
  TextManager.shieldHeal = "SHを%1回復する";
  TextManager.mpHeal = "MPを%1回復する";
  //TextManager.finishBlow = 'この攻撃でBREAKさせた場合、ダメージ%1の\n追加攻撃が発生する'
  TextManager.finishBlow =
    "敵をBREAKさせた場合、ダメージ%1の\n追加攻撃が発生する";
  TextManager.wrashState = "与ダメージに憤怒×３が加算され、憤怒が０になる\n";
  TextManager.wrash = "敵から攻撃を受けると憤怒＋１\n";
  TextManager.wrash2 = "攻撃をしたり受けたりすると憤怒＋１\n";
  TextManager.wrash3 =
    "ターンが経過したり攻撃をしたり\n攻撃を受けたりすると憤怒＋１\n";
  TextManager.barrier = "自身への最初のダメージを無効化する";
  TextManager.combination = "コンボアタックの攻撃回数が１増える\n";
  TextManager.requiredSkill = "%1Lv%2 の習得が必要です\n";
  TextManager.requiredSkill2 = "%1Lv%2 と %3Lv%4 の習得が必要です\n";
  TextManager.waterShield = "敵の攻撃を１回防ぐ";
  TextManager.removeState = "パッシブでないステートを消去する";
  TextManager.laboWeapon = "最初の部屋に武器宝箱を%1個配置する";
  TextManager.laboInitialItem = "%1を%2個所持して冒険を開始する";
  TextManager.laboItem = "攻撃アイテムを１個所持して冒険を開始する";
  TextManager.laboInitialLevel = "キャラの初期LVが%1になる";
  TextManager.laboExp = "キャラ全員が経験値を%1獲得した状態で冒険ができる";
  TextManager.laboMoney = "お金を%1G所持して冒険ができる";
  TextManager.removeBadStatusAuto = "状態異常を自動で%1回治療する";
  TextManager.holyBlessing = "シールドの最大値が%1上昇し、シールドが%2回復する";
  TextManager.holyBlessing2 = "シールドの最大値が%1上昇する";
  TextManager.stunDeath = "BREAK中の敵を即死させる";
  TextManager.itemGet = "アイテム獲得率が%1%上昇する";
  TextManager.criticalSkill = "通常攻撃が%1%で即死になる";
  TextManager.shopSkill = "店が出る確率が%1％加算される";
  TextManager.priceDown = "店のアイテム価格が%1％値引きされる";
  TextManager.encyclopedia =
    "ボス戦の前にうんちくを聞くことができる\nパーティーに参加していなくても発動する";
  TextManager.addBuff = "毎ターン%1のバフ%2を得る";
  TextManager.bakusai = "BREAKすると死亡する";
  TextManager.remakeTarget = "攻撃対象を再抽選する";
  TextManager.stunBonus = "BREAK中の敵に対してダメージ%1倍";
  TextManager.suddenStrike =
    "味方が敵の攻撃を回避すると、その相手に\nリンがダメージ%1の攻撃を行う";
  TextManager.holyElement = "アンデッドにとどめをさせる";
  TextManager.kubihane = "ターン終了時、HPが%1以下でBREAK中の敵を\n即死させる";
  TextManager.kubihaneMedal = "☆くびはねのダメージが%1上がる";
  TextManager.addDef = "自身のDEFが%1アップ　シールドが%1回復";
  TextManager.cure = "状態異常を治療する";
  TextManager.cureBreak = "\\C[17]BREAK\\C[0]を治療する";
  TextManager.stunMp = "敵を\\C[17]BREAK\\C[0]させるとMP１を得る";
  TextManager.stunMp2 = "敵を\\C[17]BREAK\\C[0]させるとMP１とSH４を得る";
  TextManager.magnet = "後列の敵を前列におびき出す";
  TextManager.syukuchi = "後列に攻撃可能になる";
  TextManager.hellFire = "\n敵のステートごとにダメージが%1%アップする";
  TextManager.stateMp =
    "スキルによるバフが付与されるとMP1を得る\n１ターンに１度のみ";
  TextManager.mpCharge = "魔法ダメージ%1ごとにMP1とSH２を得る";
  TextManager.skillDebuff = "魔法ダメージを与えるとDEFデバフを与える";
  TextManager.critUp = "クリティカル率が%1%アップする";
  TextManager.critUpAll = "味方全員のクリティカル率が%1%アップする";
  TextManager.skillCrit = "スキルでクリティカルが発生する";
  TextManager.inventory = "所持可能アイテムが１つ増える";
  TextManager.busshi1 = "中間ポイントでアイテムを１つ獲得できる";
  TextManager.busshi2 = "中間ポイントとボス前でアイテムを１つ\n獲得できる";
  TextManager.itemMp = "アイテムを使用したキャラがMP1を獲得する";
  TextManager.expBox = "経験値%1を獲得する\n次のショップに行くと価格が戻る";
  TextManager.powerBoost = "再行動した味方は全てのバフ%1を得る";
  TextManager.obento = "回復ポイントでHPが%1％回復する";
  TextManager.obentoSave = "\n中間ポイント、ボス前クリスタルでHPが%1％回復する";
  TextManager.bunshin = "戦闘開始時に見切り1を得る";
  TextManager.kaihiBunsin = "戦闘開始時に分身の術%1を得る";
  TextManager.jizai =
    "\n敵に狙われている味方には \\C[62]DEF\\C[0]+%1 \\C[62]MDF\\C[0]+%1、\nそれ以外の味方には \\C[61]ATK\\C[0]+%1 \\C[61]MAT\\C[0]+%1 を与える";
  TextManager.partyExpPlus = "獲得経験値が%1%増加する";
  // Item
  TextManager.surrender = "敗北用アイテム";
  // Status
  TextManager.sp = "ＳＰ";
  TextManager.str = "力";
  TextManager.dex = "器用さ";
  TextManager.mgc = "ＭＡＴ";
  TextManager.vit = "体力";
  TextManager.sh = "ＳＨ";
  TextManager.shield = "SHIELD";
  TextManager.defeatCount = "敗北回数";
  TextManager.baisyunCount = "売春人数";
  TextManager.obedience = "服従度";
  TextManager.sensitivity = "感度";
  TextManager.mazo = "マゾ度";
  TextManager.shame = "恥辱の噂度";
  TextManager.frightened = "被虐度";
  TextManager.maternal = "母性";
  TextManager.nasty = "名誉の失墜度";
  TextManager.nasty3 = "Hへの慣れ度";
  TextManager.mesuSyota = "メス堕ち度";
  TextManager.thunderElement = "\\C[6]雷属性\\C[0]";
  TextManager.low = "低い";
  TextManager.middle = "中程度";
  TextManager.high = "高い";
  TextManager.max = "最大";
  TextManager.flame = "火炎";
  TextManager.CriUp = "CRIT";
  TextManager.spPlusLabel = "初期MP";
  // State
  TextManager.flagile = "BREAKすると、最大シールド値が１下がる";
  TextManager.longBreak = "BREAKが２ターン継続する";
  TextManager.defUpState = "物理ダメージを%1カットする";
  TextManager.spZeroText = "スキルの消費MPが0になる";
  TextManager.fear = "攻撃を受けると攻撃のデバフ%1を得る";
  TextManager.provoke = "敵の標的になる";
  TextManager.antiBreak = "BREAKから1ターンで回復する";
  TextManager.aiming =
    "ランダムな攻撃がこの敵を狙う\nステータスダウンが持続する";
  TextManager.haste = "スキルの準備にかかるターンが1減る";
  TextManager.bunshinState =
    "サドンストライクがこの回数発動すると\n見切り１を得る";
  TextManager.nintai = "BREAKすると最大シールド値が１増える";
  TextManager.hontai = "触手が倒れると300ダメージを受ける";
  TextManager.damageRateUpState = "与えるダメージが%1%ずつ乗算される";
  TextManager.mpRecovery = "このターンMPが１多く回復する";
  TextManager.magicBarrier = "幻惑の誘導が無効";
  // Buff
  TextManager.buff2 = "与える物理ダメージが%1上昇する";
  TextManager.buff3 = "受ける物理ダメージが%1減少する";
  TextManager.buff4 = "与える魔法ダメージが%1上昇する";
  TextManager.buff5 = "受ける魔法ダメージが%1減少する";
  TextManager.debuff2 = "与える物理ダメージが%1減少する";
  TextManager.debuff3 = "受ける物理ダメージが%1上昇する";
  TextManager.debuff4 = "与える魔法ダメージが%1減少する";
  TextManager.debuff5 = "受ける魔法ダメージが%1上昇する";
  // Formation
  TextManager.front = "前衛";
  TextManager.back = "後衛";
  TextManager.frontLine = "前列";
  TextManager.frontLineAttack = "前列全員に攻撃する";
  TextManager.backLine = "後列";
  TextManager.forAll = "全体";
  TextManager.line = "列攻撃";
  TextManager.lineHeal = "列回復";
  TextManager.formationHelp =
    "キャラを２人選択すると、キャラの位置を入れ替えられます";
  TextManager.deadFriend = "戦闘不能の味方";
  TextManager.formationSkill = "総スキルポイント";
  // Event
  TextManager.singleSleep = "１人で就寝";
  TextManager.eventTanetsuke = "%1回種付けされる";
  TextManager.eventTanetsukeBote = "%1回中出しされる";
  TextManager.eventTanetsukeLostVirgin = "%1人の種付けで処女喪失する";
  TextManager.eventTanetsukeAcme = "%1人に種付けされ、中イキを%2回する";
  TextManager.eventMankoOshikko = "%1人の男におまんこに小便を流し込まれる";
  TextManager.eventTanetsukeDaijinLostVirgin = "大臣によって処女喪失する";
  TextManager.eventTanetsukeDaijinAcme = "大臣に種付けされ、中イキを%2回する";
  TextManager.eventTanetsukeDaijin = "大臣に中出しされる";
  TextManager.felaGokkun = "%1本のちんぽをしゃぶり、精液を飲む";
  TextManager.tanetsuke = "種付け";
  TextManager.chokyo = "調教";
  TextManager.semenMeal = "ザーメンのかかった食事";
  TextManager.eventCaptured = "敵に敗北し、囚えられる";
  TextManager.eventRape = "%1人の蛮族たちに輪姦される";
  TextManager.eventLostVirgin = "%1人の蛮族たちに輪姦され、処女喪失する";
  TextManager.nakadashiCount = "中出し %1回";
  TextManager.eventCaptive = "肉便器%1回目";
  TextManager.ninshin = "%2回目の妊娠が発覚(種親は%1)";
  TextManager.eventMankoCheck = "ゲーム開始時のおまんこの様子";
  TextManager.eventMankoCheck2 = "ゲーム開始時のアナルの様子";
  TextManager.eventKyoseiNinshin2 = "薬を使った種付けで大臣に妊娠させられる";
  TextManager.eventAcceOn = "%1を装着される";
  TextManager.eventKairakuChokyo = "快楽調教を受け、%1回イカされる";
  TextManager.eventRelease = "仲間によって救出される";
  TextManager.eventPunish = "ボテ腹を精液で浄化される";
  TextManager.eventSyusan = "%1人目の子供を出産する\n(種親は%2)";
  TextManager.eventSlave = "奴隷市場に売られる";
  TextManager.eventBaisyun = "%1人相手に売春をする";
  TextManager.eventSexTo1 = "レイラとセックスをする";
  TextManager.eventSexTo3 = "ミオリとセックスをする";
  TextManager.eventSexTo7 = "シャルルとセックスをする";
  TextManager.eventSexTo1And3 = "レイラ＆ミオリとセックスする";
  TextManager.eventSexTo7LostVirgin = "シャルルで処女喪失する";
  TextManager.eventFela = "フェラをさせられる";
  TextManager.eventFelaBy1 = "レイラにフェラをされる";
  TextManager.eventFelaTo7 = "シャルルにフェラをする";
  TextManager.eventAnal = "%1人にアナルを犯される";
  TextManager.eventChichi = "乳搾りをされる";
  // History
  TextManager.date = "%1日目";
  TextManager.today = "本日";
  TextManager.historyDungeon = "第%1酋長のダンジョンで戦闘";
  TextManager.historyMove = "戦闘準備とダンジョンへの移動";
  TextManager.historyReturn = "ダンジョンから無事帰還";
  TextManager.historyDefeat = "敗北するがなんとか帰還";
  TextManager.historyRape = "蛮族たちにレイプされる";
  TextManager.historyLostVirgin = "蛮族たちに輪姦され、処女喪失する";
  TextManager.historyOpening = "出撃を命令される";
  TextManager.historyRelease = "仲間に救出される";
  TextManager.historyNinshin = "妊娠が発覚";
  TextManager.defeat = "敗北";
  TextManager.morning = "冒険準備";
  TextManager.afternoon = "冒険中";
  TextManager.night = "夜";
  TextManager.actor7First = "初めて女装してアナルで奉仕をする";
  TextManager.actor7Second = "アナルで奉仕をする";
  TextManager.actor7Third = "初めて売春をする";
  TextManager.actor7Fourth = "アナルで奉仕する";
  TextManager.felaDaijin = "レイラの前でフェラをする";
  TextManager.actor2Gray = "グレイに種付けされる";
  TextManager.actor4Anal = "アナル拡張調教をされる";
  TextManager.actor4Muchi = "ムチ調教をされる";
  TextManager.actor4Boko = "ボコられて浮浪者の相手をする";
  TextManager.actor4Fela = "フェラをさせられる";
  TextManager.actor5Oshikko = "浮浪者の便所となる";
  TextManager.actor6Kairaku = "快楽調教を受けて、蛮族に許しをこう";
  TextManager.actor6Ninshin = "快楽調教を受けて、妊娠させられてしまう";
  TextManager.actor12Sarashi = "晒し者にされる";
  // Treasure
  TextManager.confirmCantEquip = "装備できませんがこれを獲得しますか？";
  TextManager.confirmCantEquipLv =
    "LVが足りず、装備できませんがこれを獲得しますか？";
  TextManager.confirmBuyCantEquipLv =
    "LVが足りず、装備できませんがこれを購入しますか？";
  TextManager.obtainTreasure =
    "新たな装備を発見しました！ 獲得する装備を１つ選択してください";
  TextManager.obtainTreasure2 =
    "LRボタン、もしくはマウスホイールで装備者を変更可能です";
  TextManager.shopText = "購入するアイテムを選択してください";
  TextManager.shopCantGet = "お金が足りません";
  TextManager.shopMaxItems = "これ以上アイテムをもてませんが、購入しますか？";
  TextManager.confirmGet = "この装備を獲得しますか？";
  TextManager.confirmGetAndEquip = "この装備を獲得して装備しますか";
  TextManager.confirmBuy = "購入しますか？";
  TextManager.confirmEquip = "すぐに装備しますか？";
  TextManager.currentEquip = "現在の装備";
  TextManager.changeEquip = "装備を更新した場合";
  TextManager.atk = "ATK";
  TextManager.def = "DEF";
  TextManager.mat = "MAT";
  TextManager.mdf = "MDF";
  // Kigae
  TextManager.miniChimpoEquip =
    "これをつけるとおちんちんが小さくなっていきます";
  TextManager.hint = "獲得のヒント";
  TextManager.curse = "このアクセは呪われているため、外せません";
  TextManager.nakedOnly = "このアクセは裸の時のみ表示されます";
  TextManager.cosLabel = "コスチューム";
  TextManager.innerLabel = "下着";
  TextManager.acceLabel = "アクセサリ";
  TextManager.faceLabel = "表情";
  TextManager.rakugakiLabel = "男につけられたもの";
  TextManager.kigaeError1 = "淫乱度が足りないために装備変更できません";
  TextManager.kigaeError2 = "服従度が足りないために装備変更できません";
  TextManager.kigaeNormal = "通常時の衣装の設定";
  TextManager.kigaeChokyo = "肉便器時の衣装の設定";
  // Equip
  TextManager.cantEquip = "冒険中は勲章を変更できません";
  TextManager.equipEroAcce = "能力上昇のあるエロアクセ";
  TextManager.autoEquip = "shift → 上位互換の勲章を自動で装備";
  TextManager.exclusive = "%1専用";
  TextManager._weapon = "武器";
  TextManager._armor = "盾";
  TextManager.acce = "装飾品";
  TextManager.hitEnchant = "攻撃がヒットした敵の%1　";
  // PowerUp
  TextManager.cantPowerUp = "冒険中はパワーアップできません";
  TextManager.cantPowerUp2 = "スキルポイントが足りません";
  TextManager.needGold = "必要Ｇ";
  TextManager.currengGold = "所持Ｇ";
  TextManager.currengCrystal = "所持蒼結晶";
  TextManager.needCrystal = "必要蒼結晶";
  TextManager.skillPoint = "スキルポイント";
  TextManager.needSkillPoint = "必要スキルポイント";
  TextManager.learnLv = "習得Lv%1";
  TextManager.learnLv1 = "初期習得";
  TextManager.autoSelect = "自動選択";
  // Medal
  TextManager.goldUp = "獲得Ｇ";
  TextManager.expUp = "獲得EXP";
  TextManager.crystalUp = "獲得蒼水晶";
  TextManager.medalCondition = "獲得条件";
  TextManager.medalEffect = "装備効果";
  TextManager.medalEffect2 = "取得効果";
  TextManager.criStun = "クリティカルでシールドを１追加で減らす";
  TextManager.medalGold = "ダンジョン開始時に\\C[14] %1G \\C[0] を獲得する";
  TextManager.obtainMedal = "勲章ゲット!!";
  TextManager.medalSkillDamagePlus = "スキルダメージ";
  TextManager.medalSkillRecoveryPlus = "スキル回復量";
  TextManager.medalFinishBlow = "フィニッシュブローのダメージ";
  TextManager.medalGuardRate = "ガードのダメージ軽減率";
  // Record
  TextManager.dungeonName = "ダンジョン名";
  TextManager.clearMember = "クリアメンバー";
  TextManager.tryCount = "挑戦回数";
  TextManager.elapsedDays = "日数";
  TextManager.playTime = "プレイ時間";
  TextManager.difficulty = "難易度";
  TextManager.hard = "難しい";
  TextManager.normal = "普通";
  TextManager.easy = "易しい";
  TextManager.veryEasy = "すごく易しい";
  TextManager.dungeonSkip = "ダンジョンスキップ";
  // Action
  TextManager.actionRenkan = "%1の行動を遅らせた！";
  TextManager.actionMagnet = "%1を前列におびき出した！";
  TextManager.actionCancel = "%1の行動を中断させた！";
  TextManager.damageRenkan = "行動遅延";
  TextManager.damageCancel = "行動中断";
  TextManager.damageSuddenStrike = "サドンストライク";
  TextManager.damageHellFire = "ボーナス";
  TextManager.actionUndead = "%1は不死の力で耐えた！";
  TextManager.actionClenching = "%1は食いしばりで耐えた！";
  TextManager.noEffect = "効果なし";
  TextManager.firstStrike2 = "先制攻撃";
  TextManager.actionReact = "%1は再行動した！";
  TextManager.madanTarget = "BREAK延長";
  // Prison
  TextManager.prisonMsg = "肉便器当番に女の子を割当てください";
  TextManager.prisonMsg2 = "女の子を割り当ててください";
  TextManager.prisonConfirm = "これでよろしいですか？";
  TextManager.nikubenkiDay = "肉便器回数";
  TextManager.ministerCount = "大臣との回数";
  TextManager.nikubenkiWoman = "娘数";
  TextManager.nikubenkiNum = "%1人";
  TextManager.nikubenki = "肉便器当番";
  TextManager.remainTime = "残り時間";
  TextManager.nikubenkiMob = "%1 / %2 人";
  TextManager.nikubenkiPerson = "肉便器当番";
  TextManager.baisyunPerson = "売春担当";
  TextManager.ngaroPerson = "ンガロの処理担当";
  TextManager.settaiPerson = "性接待担当";
  TextManager.toiletPerson = "トイレ掃除担当";
  TextManager.banzokuPerson = "蛮族の性処理担当";
  TextManager.goblinPerson = "ゴブリンの性処理担当";
  TextManager.vagrantPerson = "浮浪者の性処理担当";
  TextManager.ministerPerson = "大臣の担当";
  TextManager.grayPerson = "グレイの担当";
  TextManager.charlesPerson = "シャルルとエッチ";
  TextManager.boteDisabled = "妊娠中は担当不可";
  TextManager.chichiPerson = "乳搾り";
  TextManager.syusanDisabled = "出産経験が必要";
  TextManager.prisonCrystal = "獲得蒼結晶";
  TextManager.prisonSp = "SPを獲得可能";
  TextManager.prisonChichi = "母乳を獲得可能";
  TextManager.selectNikubenki = "夜の行動選択";
  TextManager.prisonSche = "%1の肉便器";
  TextManager.nikubenkiTitle = "肉便器の担当メンバー";
  TextManager.prisonForce = "強制的";
  TextManager.prisonLocked = "負傷中";
  TextManager.prisonLocked2 = "大臣以外の担当不可";
  TextManager.prisonLocked3 = "まだ選択できない";
  TextManager.prisonLockedTaikenban = "体験版では不可";
  TextManager.prisonNeedExperience = "肉便器の経験が必要";
  TextManager.prisonGirlRequired = "必ず担当が必要";
  TextManager.prisonNeedVagrantExperience = "肉便器で浮浪者とH経験が必要";
  TextManager.prisonNeedGoblinExperience = "肉便器でゴブリンとH経験が必要";
  TextManager.prisonNeedSyusanExperience = "出産経験が必要";
  TextManager.prisonLockedVagrant = "このキャラは選択不可";
  TextManager.prisonLockedMob = "全員捧げ済み";
  TextManager.nikubenkiResult = "肉便器結果";
  TextManager.nikubenkiResultCount = "総肉便器回数";
  TextManager.nikubenkiResultNakadashi = "おまんこ奉仕回数";
  TextManager.nikubenkiResultAnal = "アナル奉仕回数";
  TextManager.nikubenkiResultFela = "口での奉仕回数";
  TextManager.nikubenkiResultRanshi = "卵子耐久度";
  // DungeonResult
  TextManager.dungeonResult = "冒険の結果";
  TextManager.dungeonResultSp = "獲得したスキルポイント";
  // Timeline
  TextManager.schedule1 = "%1日目のスケジュール";
  TextManager.schedule2 = "スケジュール";
  TextManager.timelineNikubenki = "蛮族に奉仕(%1)";
  TextManager.timelineVagrant = "浮浪者に奉仕(%1)";
  TextManager.timelineMinister = "大臣に奉仕(%1)";
  TextManager.timelineGoblin = "ゴブリンに奉仕(%1)";
  TextManager.timelineGray = "グレイに奉仕(%1)";
  TextManager.timelineCharles = "シャルルとエッチ(%1)";
  TextManager.timelineChichi = "乳搾り(%1)";
  TextManager.timelineEvent = "イベント";
  TextManager.timelineRest = "休息";
  TextManager.timelineEroEvent = "エロイベント";
  TextManager.timelineDungeon = "ダンジョン探索";
  TextManager.timelineNight = "夜パートへ";
  TextManager.timelineBoteGlowup = "ボテ腹成長";
  TextManager.timelineSlave = "奴隷市場";
  TextManager.timelineNinshin = "妊娠発覚";
  TextManager.timelineCivilian = "村娘を蛮族に捧げる";
  TextManager.timelineStart = "一日の始まり";
  TextManager.timelineEnd = "一日の終わり";
  TextManager.timelineSyusan = "出産 ";
  TextManager.timelineGetChichi = "母乳獲得 ";
  TextManager.timelineGetCrystal = "蒼結晶獲得";
  // Option
  TextManager._alwaysDash = "常時ダッシュ";
  TextManager._touchUI = "タッチUI";
  TextManager._bgmVolume = "BGM 音量";
  TextManager._bgsVolume = "BGS 音量";
  TextManager._meVolume = "ME 音量";
  TextManager._seVolume = "SE 音量";
  TextManager.confirmEnter = "ダンジョンの部屋入室前の確認";
  TextManager._voiceVolume = "VOICE 音量";
  TextManager.showSikyu = "断面図表示";
  TextManager.windowAlpha = "ウィンドウ不透明度";
  // Difficulty
  TextManager.difficultyText = "難易度選択 難易度は後から変更できます";
  TextManager.cancelText = "キャンセルしますか？";
  // BabyList
  TextManager.babyTitle = "%2 第%1子";
  TextManager.babyFuture = "想定される未来";
  TextManager.babySkill = "才能";
  TextManager.sellPrice = "評価額";
  TextManager.sortDay = "出産順ソート";
  TextManager.sortAptitude = "総合素質ソート";
  TextManager.sortGold = "G ソート";
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
  TextManager.outerAlpha = "服の不透明度 %1% ←→で変更可能";
  TextManager.babyMilk = "OK→授乳確認";
  // さらし者
  TextManager.syusanName = "%1の子を%2人";
  TextManager.syusanNameGoblin = "%1の子を%2匹";
  TextManager.babyByTanetsukeBanzoku = "蛮族による種付けで妊娠";
  TextManager.babyByTanetsukeBar = "酒場での売春で妊娠";
  TextManager.babyByTanetsukeMinister = "大臣による種付けで妊娠";
  TextManager.babyNull = "未設定";
  getBabyFuture = function (type) {
    switch (type) {
      case Future.BANZOKU_FIGHTER:
        return "蛮族の戦士として\n前線で戦う";
      case Future.COMMON_SOLDIER:
        return "蛮族の雑兵として\n肉壁となる";
      case Future.BANZOKU_STRATEGIST:
        return "蛮族の軍師として\n指揮を執る";
      case Future.BANZOKU_MAGE:
        return "蛮族の魔法使いとして\n戦場で戦う";
      case Future.BANZOKU_THIEF:
        return "蛮族の盗賊として\n略奪を行う";
      case Future.BANZOKU_KING:
        return "蛮族の王としての\n素質を持つ";
      case Future.BANZOKU_DOREI:
        return "蛮族の奴隷として\n一生を過ごす";
      case Future.MINISTER:
        return "血統と知識を活かして\n国の運営に関わる";
      case Future.INSTRUCTER:
        return "剣術指南役として\n活躍する";
      case Future.CORRUPTION:
        return "汚職事件を起こし\n処刑される";
      case Future.ORDINARY:
        return "一般人として\n名を残さず過ごす";
      case Future.FIGHTER:
        return "冒険者の戦士として\n各地で活躍する";
      case Future.MAGE:
        return "冒険者の魔法使いとして\n各地で活躍する";
      case Future.SAGE:
        return "冒険者の賢者として\n各地で活躍する";
      case Future.CLELIC:
        return "冒険者の僧侶として\n各地で活躍する";
      case Future.THIEF:
        return "冒険者の盗賊として\n各地で活躍する";
      case Future.ADVENTURER:
        return "冒険者になり\n各地へと赴く";
      case Future.LESSER_ADVENTURER:
        return "冒険者になるが\nすぐに死亡する";
      case Future.CHARLES_KING:
        return "王としての才を持ち\n歴史に名を残す";
      case Future.CHARLES_MINISTER:
        return "王佐の才を持ち\n歴史に名を残す";
      case Future.CHARLES_FIGHTER:
        return "近衛兵として\n活躍する";
      case Future.CHARLES_MAGE:
        return "宮廷魔術師として\n活躍する";
      case Future.CHARLES_STRATEGIST:
        return "軍師として\n活躍する";
      case Future.CHARLES_COMMANDER:
        return "軍の指揮官として\n活躍する";
      case Future.BANZOKU_FIGHTER:
        return "蛮族の戦士として\n前線で戦いつつ\n肉便器にもなる";
      case Future.NIKUBENKI_1:
        return "蛮族の肉便器になり、\n多くの子供を産まされる";
      case Future.NIKUBENKI_2:
        return "蛮族の肉便器になり、\n魔力に優れた子を\n多く産む";
      case Future.NIKUBENKI_3:
        return "蛮族の肉便器になり、\n知恵に優れた子を\n多く産む";
      case Future.NIKUBENKI_4:
        return "蛮族の肉便器になるが、\n自力で逃げ出す";
      case Future.BANZOKU_DOREI:
        return "蛮族の奴隷として\n男の奴隷とともに\n働かされる";
      case Future.GOBLIN_MAGE:
        return "ゴブリンメイジとして\nゴブリン軍団の\n一員となる";
      case Future.GOBLIN_SHAMAN:
        return "ゴブリンシャーマンとして\nゴブリン軍団の\n一員となる";
      case Future.GOBLIN_FIGHTER:
        return "ゴブリンの戦士として\nゴブリン軍団の\n一員となる";
    }
    p(type);
    return "none";
  };
  TextManager.dungeonSkipInfo = [
    "\\C[2]Ｈシーンだけを見たい人向け\\C[0]の難易度です。",
    "",
    "・\\C[6]ダンジョンをまるまるスキップ可能",
    "・与ダメージ３００％、シールド＋２０",
    "・\\C[6]「強力バクダン」を無制限に使用可能",
  ];
  TextManager.veryEasyInfo = [
    "\\C[2]戦闘をすぐに終わらせたい人向け\\C[0]の難易度です。",
    "戦闘では「強力バクダン」を使えば敵を瞬殺",
    "できます。",
    "",
    "・ダンジョン内でどこでもセーブ可能",
    "・与ダメージ３００％、シールド＋２０",
    "・\\C[6]「強力バクダン」を無制限に使用可能",
  ];
  TextManager.easyInfo = [
    "\\C[2]ゲームを簡単に遊びたい人向け\\C[0]の難易度です。",
    "ダンジョンは程々の難易度で、",
    "ぬるくなりすぎず、Ｈもゲームも楽しめます。",
    "",
    "・ダンジョン内でどこでもセーブ可能",
    "・与ダメージ１３０％、シールド＋１０",
  ];
  TextManager.normalInfo = [
    "\\C[2]ゲームをがっつり遊びたい人向け\\C[0]の難易度です。",
    "",
    "・ダンジョン内でどこでもセーブ可能",
  ];
  TextManager.hardInfo = [
    "\\C[2]ゲームに慣れて、歯ごたえを求めている人向け\\C[0]",
    "の難易度です。",
    "",
    "・\\C[6]ダンジョン内のセーブがセーブポイントのみ",
    //'・ダンジョンで獲得できる蒼結晶が減少',
    "・\\C[6]一部の敵が強化",
  ];
  getEroParamTitle = function (label) {
    switch (label) {
      case "nakadashi":
        return "中出し";
      case "anal":
        return "アナルSEX";
      case "baisyun":
        return "売春";
      case "bukkake":
        return "ぶっかけ";
      case "seiekiNomu":
        return "精液ごっくん";
      case "oshikkoNomu":
        return "おしっこごっくん";
      case "syusan":
        return "出産";
      case "fela":
        return "フェラ";
      case "acme":
        return "絶頂";
      case "acme":
        return "膣イキ";
      case "anal_acme":
        return "アナルイキ";
      case "chichi":
        return "乳搾り";
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
    return "名称未設定";
  };
  getDungeonName = function (stageId) {
    switch (stageId) {
      case 1:
        return "奈落の穴";
      case 2:
        return "滝壺の魔洞";
      case 3:
        return "賢王のピラミッド";
      case 4:
        return "クリスタルケイブ";
      case 5:
        return "失われた聖堂";
      case 6:
        return "還らずの森";
      case 7:
        return "灼熱の溶岩洞";
      case 8:
        return "魔界";
    }
    return "キダル渓谷";
  };
  getChokyoName = function (actorId) {
    var actor = $gameActors.actor(actorId);
    var name = "";
    if (actor) {
      name = actor.nameJp();
    }
    return "肉便器(%1)".format(name);
  };
  getDestinationName = function (type) {
    switch (type) {
      case DestType.prison:
        return "牢獄";
      case DestType.sexRoom:
        return "ヤリ部屋";
      case DestType.sexRoom2:
        return "ヤリ部屋(徴収兵)";
      case DestType.bossRoom:
        return "ンガロの部屋";
      case DestType.bar:
        return "酒場";
      case DestType.slave:
        return "奴隷の部屋";
      case DestType.empire:
        return "捕虜帝国兵の部屋";
      case DestType.conscript1:
        return "志願徴収兵の部屋";
      case DestType.conscript2:
        return "強制徴収兵の部屋";
      case DestType.return:
        return "帰還（時間30%以下）";
      case DestType.monster:
        return "ゴブリンの巣";
      case DestType.vagrant:
        return "浮浪者の部屋";
      case DestType.merchant:
        return "商人の部屋";
      case DestType.sm:
        return "拷問部屋";
      case DestType.toilet:
        return "トイレ";
      case DestType.minister:
        return "大臣の部屋";
      case DestType.gray:
        return "グレイの部屋";
    }
    return "名称未設定";
  };
}
// Bathroom
TextManager.bathroomHelp = "お風呂に入る女の子を２人選択してください";
TextManager.bathroomHelp2 =
  "呪いの防具が外され、落書きや精液などが綺麗になります";
TextManager.confirmBathroom = "この２人でお風呂に入りますか？";
// Syusan
TextManager.syusanCancel = "やめる";
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
      return "中出し回数を告白させる";
    case Nore.PunishCommad.ACME:
      return "絶頂回数を告白させる";
    case Nore.PunishCommad.ANAL:
      return "アナルの経験を告白させる";
    case Nore.PunishCommad.SHOJO:
      return "処女喪失について";
    case Nore.PunishCommad.PUNISH:
      return "罰を与える";
    case Nore.PunishCommad.LABIA:
      return "ラビアピアスについて告白させる";
    case Nore.PunishCommad.END:
      return "終える";
    default:
      return "";
  }
}
// 戦闘時のセリフ
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
    case 1123: // ホーリーセーバー
      return ["そこっ！", "遅いっ！", "はぁっ！"];
    case 1139: // タブルカット
    case 1143: // ライトニングスラッシュ
      return ["これで決める！", "まだ行くわよ！"];
    case 1171: // ★シャインスラッシュ
      return ["その身に刻め！", "もらったわ！"];
  }
}
function selectDialogue2(actor, lv1SkillId) {
  switch (lv1SkillId) {
    case 1221: // コンボアタック
      return ["雑魚がっ！", "オラオラっ！"];
    case 1231: // ヘビーブロウ
      return ["まだ生きてやがるとはな！", "くたばりやがれっ！"];
    case 1247: // ワールウィンド
      return ["へへっ、届かねぇと思ったか！？", "よそ見してんじゃねぇぞ！"];
    case 1251: // 気合い
      return ["みなぎってきたぜ！", "行くぜーっ！"];
  }
}
function selectDialogue3(actor, lv1SkillId) {
  switch (lv1SkillId) {
    case 1321: // 雷撃符
      return ["決めます！", "行きますよ！"];
    case 1331: // 広域雷撃符
      return ["捉えました！", "これでどうでしょう！"];
    case 1381: // ★轟雷符
      return ["手加減の必要はありませんね！", "今しかありません！"];
  }
}
// 母乳の説明文
function getMilkText(actorId) {
  switch (actorId) {
    case 1:
      return "甘くのど越しの良い母乳\n王族のものらしく上品な味がする。\n\n一度の量は多いがファンが多く品薄になりやすい。";
    case 2:
      return "味は濃厚系。\nあとから来る優しい甘みがある。\n\n量はそこそこ。\nターニャが赤ん坊にあげたがるので量がなかなか出回らないらしい。";
    case 3:
      return "上品な甘さの母乳。\n魔力量ゆえか甘さが濃厚。\n\n一度の量は多いがファンが多く品薄になりやすい。";
    case 4:
      return "味は薄味。優しい甘みが人気だそう。\n\n量が少なく、少女愛好家やシスター母乳専門家が争奪戦を\n繰り広げているらしい。";
    case 5:
      return "味は薄味。サラりとした後味で飲みやすいらしい。\n\n量がかなり多く、お堅い系の女性の母乳を飲みたがる客に人気が高いそうだ。";
    case 6:
      return "甘さが濃厚だが、一度に出る量は少ない。\n\n少女母乳の愛好家が争奪戦を繰り広げているらしい。";
    case 7:
      return "味はまぁまぁの濃さ。\nかなりの生命力と魔力に溢れている。\n\n量はなかなか多い。\n貴族の女性から男色家、魔術師まで幅広い者に人気のようだ。";
    case 10:
      return "味は薄味。さわやかな後味で、可能性を感じる味。\n\n量も少なく、母親で、勇者であるセレナのファンから特に人気が高いようだ。";
    case 12:
      return "味は大味ながらとても濃厚。\n後味にどこか上品さがあるらしい。\n\nただ、量はとても少ないらしく、王族ファンや、\n冒険者としての彼女のファンの間で取り合いになっているそうだ。";
  }
}
