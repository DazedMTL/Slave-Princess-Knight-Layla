//=============================================================================
// RecollectionMode.js
// Copyright (c) 2015 rinne_grid
// This plugin is released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:ja
 * @plugindesc 回想モード機能を追加します。
 * @author rinne_grid
 *
 *
 * @help このプラグインには、プラグインコマンドはありません。
 * @command reco
 * @text 回想登録
 * @des 回想登録
 * @arg id
 * @type number
 */
{
  const pluginName = "RecollectionMode";
  PluginManager.registerCommand(pluginName, "reco", function (args) {
    recoGlobal(parseInt(args.id));
  });
}
//-----------------------------------------------------------------------------
// ◆ プラグイン設定
//-----------------------------------------------------------------------------

var rngd_recollection_mode_settings = {
  //---------------------------------------------------------------------
  // ★ 回想モードで再生するBGMの設定をします
  //---------------------------------------------------------------------
  rec_mode_bgm: {
    bgm: {
      name: "LNEW_BGM14_Sad1",
      pan: 0,
      pitch: 100,
      volume: 90,
    },
  },
  //---------------------------------------------------------------------
  // ★ 回想CG選択ウィンドウの設定を指定します
  //---------------------------------------------------------------------
  rec_mode_window: {
    x: 200,
    y: 100,
    recollection_title: "回想モード",
    str_select_recollection: "回想を見る",
    str_select_cg: "CGを見る",
    str_select_back_title: "タイトルに戻る",
  },
  //---------------------------------------------------------------------
  // ★ 回想リストウィンドウの設定を指定します
  //---------------------------------------------------------------------
  rec_list_window: {
    // 1画面に表示する縦の数
    item_height: 3,
    // 1画面に表示する横の数
    item_width: 4,
    // 1枚のCGに説明テキストを表示するかどうか
    show_title_text: true,
    // タイトルテキストの表示位置(left:左寄せ、center:中央、right:右寄せ）
    title_text_align: "center",
    // 閲覧したことのないCGの場合に表示するピクチャファイル名
    never_watch_picture_name: "never_watch_picture",
    // 閲覧したことのないCGのタイトルテキスト
    never_watch_title_text: "",
  },
  //---------------------------------------------------------------------
  // ★ 回想用のCGを指定します
  //---------------------------------------------------------------------
  rec_cg_set: [
    /*{
                'title': '冒険者２',
                'thumbnail': '01_09_01',
                'pictures': ['01', 
                {
                    pic: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 19, 19, 18, 18, 17, 17, 16, 16, 15, 15, 14, 14, 13, 13, 12, 12, 11],
                    reverse: false,
                    wait: 1,
                    seIndex: 0,
                    se: ['nure1']
                }, 
                {
                    pic: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 29, 29, 28, 28, 27, 27, 26, 26, 25, 25, 24, 24, 23, 23, 22, 22, 21],
                    reverse: false,
                    wait: 1,
                    seIndex: 0,
                    se: ['nure1']
                },
                {
                    pic: [31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 39, 39, 38, 38, 37, 37, 36, 36, 35, 35, 34, 34, 33, 33, 32, 32, 31],
                    reverse: false,
                    wait: 1,
                    seIndex: 0,
                    se: ['nure1']
                },
                '50'
                ],
                'common_event_id': 909,
                'switch_id': 909,
            },*/
    /*{
                'title': '敗者の末路',
                'thumbnail': '05_01',
                'pictures': ['01', '02', '03'],
                'common_event_id': 951,
                'switch_id': 951,
                'hint': ''
            },*/
    {
      title: "敗北兵士のH",
      thumbnail: "08_07",
      pictures: ["01", "02", "03"],
      common_event_id: 987,
      switch_id: 987,
      hint: "オープニングを見る",
    },
    {
      title: "姉弟でフェラ",
      titleEn: "Sibling Blowjob",
      thumbnail: "07_01",
      pictures: ["01", "02", "03"],
      common_event_id: 971,
      switch_id: 971,
      hint: "オープニングを見る",
    },
    /*{
                'title': '姉弟でフェラ２回目以降',
                'titleEn': 'Sibling Blowjob',
                'thumbnail': '07_01',
                'pictures': ['01', '02', '03'],
                'common_event_id': 983,
                'switch_id': 983,
                'hint': 'オープニングを見る'
            },*/
    {
      title: "レイラ肉便器のはじまり",
      titleEn: "Sex Slave Layla",
      thumbnail: "01_02",
      pictures: ["01", "02", "03"],
      common_event_id: 902,
      switch_id: 902,
      hint: "レイラで肉便器を実行する",
    },
    {
      title: "レイラ肉便器ヤリ部屋",
      thumbnail: "01_03",
      pictures: ["01", "02", "03"],
      common_event_id: 903,
      switch_id: 903,
      hint: "レイラでヤリ部屋に行く",
    },
    {
      title: "レイラ添い寝",
      thumbnail: "01_07",
      pictures: ["01", "02", "03"],
      common_event_id: 907,
      switch_id: 907,
      hint: "レイラでヤリ部屋に行く",
    },
    {
      title: "レイラ種付けプレス",
      thumbnail: "01_05",
      pictures: ["01", "02", "03"],
      common_event_id: 905,
      switch_id: 905,
      hint: "レイラで浮浪者のテントに行く",
    },

    {
      title: "姉弟でセックス",
      thumbnail: "01_14",
      pictures: ["01", "02", "03"],
      common_event_id: 914,
      switch_id: 914,
      hint: "レイラとシャルルのH初回",
    },
    {
      title: "姉弟でセックス2",
      thumbnail: "01_15",
      pictures: ["01", "02", "03"],
      common_event_id: 915,
      switch_id: 915,
      hint: "レイラとシャルルのH2回目",
    },
    {
      title: "姉弟でセックス3",
      thumbnail: "07_06",
      pictures: ["01", "02", "03"],
      common_event_id: 976,
      switch_id: 976,
      hint: "レイラとシャルルのH3回目",
    },
    {
      title: "姉弟でセックス1",
      thumbnail: "03_11",
      pictures: ["01", "02", "03"],
      common_event_id: 1342,
      switch_id: 1342,
      hint: "ミオリとシャルルでH",
    },
    {
      title: "姉弟でセックス2",
      thumbnail: "07_04",
      pictures: ["01", "02", "03"],
      common_event_id: 974,
      switch_id: 974,
      hint: "ミオリとシャルルでH2回目",
    },
    {
      title: "姉弟でセックス3",
      thumbnail: "07_05",
      pictures: ["01", "02", "03"],
      common_event_id: 975,
      switch_id: 975,
      hint: "ミオリとシャルルでH3回目",
    },

    {
      title: "メスショタセックス1",
      thumbnail: "07_02",
      pictures: ["01", "02", "03"],
      common_event_id: 972,
      switch_id: 972,
      hint: "シャルルが肉便器当番になる",
    },
    {
      title: "メスショタセックス2",
      thumbnail: "07_10",
      pictures: ["01", "02", "03"],
      common_event_id: 980,
      switch_id: 980,
      hint: "シャルルが２回肉便器当番になる",
    },
    {
      title: "メスショタセックス３",
      thumbnail: "07_08_alt_05",
      pictures: ["01", "02", "03"],
      common_event_id: 978,
      switch_id: 978,
      hint: "シャルルが３回肉便器当番になる",
    },
    {
      title: "メスショタセックス４",
      thumbnail: "07_12",
      pictures: ["01", "02", "03"],
      common_event_id: 1086,
      switch_id: 1086,
      hint: "シャルルが4回肉便器当番になる",
    },
    {
      title: "メスショタセックス繰り返し",
      thumbnail: "07_02_02",
      pictures: ["01", "02", "03"],
      common_event_id: 1080,
      switch_id: 1080,
      hint: "シャルルを肉便器当番にする",
    },
    {
      title: "メスショタセックス繰り返し",
      thumbnail: "07_10_alt_04",
      pictures: ["01", "02", "03"],
      common_event_id: 1081,
      switch_id: 1081,
      hint: "シャルルを肉便器当番にする",
    },
    {
      title: "メスショタセックス繰り返し",
      thumbnail: "07_08",
      pictures: ["01", "02", "03"],
      common_event_id: 1082,
      switch_id: 1082,
      hint: "シャルルを肉便器当番にする",
    },
    {
      title: "メスショタフェラ繰り返し",
      thumbnail: "07_11",
      pictures: ["01", "02", "03"],
      common_event_id: 1085,
      switch_id: 1085,
      hint: "シャルルを肉便器当番にする",
    },

    {
      title: "シャルル搾精",
      thumbnail: "07_14",
      pictures: ["01", "02", "03"],
      common_event_id: 982,
      switch_id: 982,
      hint: "シャルル乳搾り部屋",
    },
    {
      title: "レイラ肉便器",
      thumbnail: "01_04",
      pictures: ["01", "02", "03"],
      common_event_id: 904,
      switch_id: 904,
      hint: "レイラでヤリ部屋の蛮族に会話する",
    },
    {
      title: "レイラ感覚遮断",
      thumbnail: "01_10",
      pictures: ["01", "02", "03"],
      common_event_id: 910,
      switch_id: 910,
      hint: "レイラでヤリ部屋に行く",
    },
    {
      title: "レイラアナル調教",
      thumbnail: "01_01",
      pictures: ["01", "02", "03"],
      common_event_id: 901,
      switch_id: 901,
      hint: "レイラで拷問部屋に行く",
    },
    {
      title: "レイラムチ調教",
      thumbnail: "01_01_2",
      pictures: ["01", "02", "03"],
      common_event_id: 1251,
      switch_id: 1251,
      hint: "レイラで拷問部屋に行く",
    },
    {
      title: "レイラ精飲調教",
      thumbnail: "01_06",
      pictures: ["01", "02", "03"],
      common_event_id: 906,
      switch_id: 906,
      hint: "レイラで拷問部屋に行く",
    },
    {
      title: "レイラ食ザー",
      thumbnail: "01_12",
      pictures: ["01", "02", "03"],
      common_event_id: 912,
      switch_id: 912,
      hint: "レイラで拷問部屋に行く",
    },

    {
      title: "レイラ×サラ",
      thumbnail: "01_18",
      pictures: ["01", "02", "03"],
      common_event_id: 918,
      switch_id: 918,
      hint: "サラを蛮族の性処理担当にし、\nレイラで肉便器当番にする",
    },
    {
      title: "レイラ×ターニャ",
      thumbnail: "01_11",
      pictures: ["01", "02", "03"],
      common_event_id: 911,
      switch_id: 911,
      hint: "レイラとターニャを蛮族で孕ませ、\nターニャとレイラを肉便器当番にする",
    },
    {
      title: "レイラ×ミオリ",
      thumbnail: "01_30",
      pictures: ["01", "02", "03"],
      common_event_id: 1256,
      switch_id: 911,
      hint: "レイラとミオリがボテ腹ではない時\nレイラをシャルルの部屋に配置する",
    },
    {
      title: "姉妹丼",
      thumbnail: "07_09",
      pictures: ["01", "02", "03"],
      common_event_id: 979,
      switch_id: 979,
      hint: "レイラとミオリがボテ腹ではない時\nレイラをシャルルの部屋に配置する",
    },
    {
      title: "レイラ大臣",
      thumbnail: "01_20",
      pictures: ["01", "02", "03"],
      common_event_id: 920,
      switch_id: 920,
      hint: "レイラで大臣とHする",
    },
    {
      title: "レイラ大臣2回目",
      thumbnail: "01_21",
      pictures: ["01", "02", "03"],
      common_event_id: 1041,
      switch_id: 1041,
      hint: "レイラで大臣と2回Hする",
    },
    {
      title: "レイラゴブリン",
      thumbnail: "01_23",
      pictures: ["01", "02", "03"],
      common_event_id: 1043,
      switch_id: 1043,
      hint: "レイラでゴブリンとHする",
    },
    /*{
                'title': 'レイラゴブリン 汎用',
                'thumbnail': '01_25',
                'pictures': ['01', '02', '03'],
                'common_event_id': 1045,
                'switch_id': 1045,
                'hint': 'レイラでゴブリンとHする'
            },*/
    {
      title: "レイラ放尿",
      thumbnail: "01_09",
      pictures: ["01", "02", "03"],
      common_event_id: 909,
      switch_id: 909,
      hint: "レイラで拷問部屋の右下の\n男に４連続で話しかける",
    },
    {
      title: "レイラ乳搾り",
      thumbnail: "01_26",
      pictures: ["01", "02", "03"],
      common_event_id: 1046,
      switch_id: 1046,
      hint: "レイラ乳搾り",
    },
    {
      title: "レイラ出産(蛮族)",
      thumbnail: "01_19",
      pictures: ["01", "02", "03"],
      common_event_id: 1471,
      switch_id: 1471,
      hint: "レイラで蛮族の子を出産をする",
    },
    {
      title: "レイラ出産(浮浪者)",
      thumbnail: "01_19_02",
      pictures: ["01", "02", "03"],
      common_event_id: 1480,
      switch_id: 1480,
      hint: "レイラで浮浪者の子を出産をする",
    },
    {
      title: "レイラ出産(シャルル)",
      thumbnail: "01_27",
      pictures: ["01", "02", "03"],
      common_event_id: 1477,
      switch_id: 1477,
      hint: "レイラでシャルルの子を出産をする",
    },
    {
      title: "レイラ出産(大臣)",
      thumbnail: "01_22",
      pictures: ["01", "02", "03"],
      common_event_id: 1474,
      switch_id: 1474,
      hint: "レイラで大臣の子を出産をする",
    },
    {
      title: "レイラ出産(ゴブリン)",
      thumbnail: "01_24",
      pictures: ["01", "02", "03"],
      common_event_id: 1483,
      switch_id: 1483,
      hint: "レイラでゴブリンの子を出産をする",
    },
    {
      title: "ミオリ大臣初回",
      thumbnail: "03_01",
      pictures: ["01", "02", "03"],
      common_event_id: 931,
      switch_id: 931,
      hint: "ミオリで肉便器を実行する",
    },

    {
      title: "ミオリ大臣2回目",
      thumbnail: "03_05",
      pictures: ["01", "02", "03"],
      common_event_id: 935,
      switch_id: 935,
      hint: "ミオリが大臣の部屋に行く",
    },
    {
      title: "ミオリ大臣3回目",
      thumbnail: "03_09",
      pictures: ["01", "02", "03"],
      common_event_id: 939,
      switch_id: 939,
      hint: "ミオリが大臣の部屋に行く",
    },
    {
      title: "ミオリ大臣4回目",
      thumbnail: "03_06",
      pictures: ["01", "02", "03"],
      common_event_id: 936,
      switch_id: 936,
      hint: "ミオリが大臣の部屋に行く",
    },
    {
      title: "ミオリ大臣5回目",
      thumbnail: "03_03",
      pictures: ["01", "02", "03"],
      common_event_id: 933,
      switch_id: 933,
      hint: "ミオリで出産後、大臣の部屋に行く",
    },
    {
      title: "ミオリ大臣6回目",
      thumbnail: "03_02",
      pictures: ["01", "02", "03"],
      common_event_id: 932,
      switch_id: 932,
      hint: "ミオリが大臣の部屋に行く",
    },
    {
      title: "ミオリ肉便器ボテ腹",
      thumbnail: "03_08",
      pictures: ["01", "02", "03"],
      common_event_id: 938,
      switch_id: 938,
      hint: "ボテ腹のミオリが大臣の部屋に行く",
    },
    {
      title: "ミオリラビアピアス",
      thumbnail: "03_19",
      pictures: ["01", "02", "03"],
      common_event_id: 1349,
      switch_id: 1349,
      hint: "ミオリが大臣の部屋に行く",
    },
    {
      title: "ミオリ乳搾り(大臣)",
      thumbnail: "03_20",
      pictures: ["01", "02", "03"],
      common_event_id: 1355,
      switch_id: 1355,
      hint: "ミオリで大臣に乳搾りされる",
    },
    {
      title: "ミオリ乳搾り(シャルル)",
      thumbnail: "07_15",
      pictures: ["01", "02", "03"],
      common_event_id: 1356,
      switch_id: 1356,
      hint: "ミオリでシャルルに乳搾りされる",
    },
    /*{
                'title': 'ミオリ汎用H 正常位',
                'thumbnail': '03_17',
                'pictures': ['01', '02', '03'],
                'common_event_id': 1347,
                'switch_id': 1347,
                'hint': 'ミオリの部屋配置H',
                'debug': true
            },
            {
                'title': 'ミオリ汎用H 騎乗位',
                'thumbnail': '03_16',
                'pictures': ['01', '02', '03'],
                'common_event_id': 1346,
                'switch_id': 1346,
                'hint': 'ミオリの部屋配置H'
            },
      
            {
                'title': 'ミオリ汎用H 立ちバック',
                'thumbnail': '03_12',
                'pictures': ['01', '02', '03'],
                'common_event_id': 1343,
                'switch_id': 13436,
                'hint': 'ミオリの部屋配置H'
            },*/
    {
      title: "ミオリ出産(大臣)",
      thumbnail: "03_15",
      pictures: ["01", "02", "03"],
      common_event_id: 1401,
      switch_id: 1401,
      hint: "ミオリで大臣の子を出産をする",
    },
    {
      title: "ミオリ出産(シャルル)",
      thumbnail: "03_18",
      pictures: ["01", "02", "03"],
      common_event_id: 1404,
      switch_id: 1404,
      hint: "ミオリでシャルルの子を出産をする",
    },
    {
      title: "ターニャ敗北1",
      thumbnail: "02_08",
      pictures: ["01", "02", "03"],
      common_event_id: 928,
      switch_id: 928,
      hint: "１面のボスを撃破する",
    },
    {
      title: "ターニャ加入イベント",
      thumbnail: "02_01_02",
      pictures: ["01", "02", "03"],
      common_event_id: 1221,
      switch_id: 1221,
      hint: "１面のボスを撃破する",
    },

    {
      title: "ターニャ強制妊娠",
      thumbnail: "02_01",
      pictures: ["01", "02", "03"],
      common_event_id: 921,
      switch_id: 921,
      hint: "ターニャで肉便器を実行する",
    },

    {
      title: "ターニャヤリ部屋初回",
      thumbnail: "02_02",
      pictures: ["01", "02", "03"],
      common_event_id: 922,
      switch_id: 922,
      hint: "ターニャでヤリ部屋に行く",
    },
    {
      title: "ターニャ捕虜帝国兵",
      thumbnail: "02_13",
      pictures: ["01", "02", "03"],
      common_event_id: 1305,
      switch_id: 1305,
      hint: "ターニャで捕虜帝国兵部屋に行く",
    },
    {
      title: "ターニャ２本刺し",
      thumbnail: "02_07",
      pictures: ["01", "02", "03"],
      common_event_id: 927,
      switch_id: 927,
      hint: "ターニャでヤリ部屋に行く",
    },
    {
      title: "ターニャ感覚遮断",
      thumbnail: "02_18",
      pictures: ["01", "02", "03"],
      common_event_id: 1310,
      switch_id: 1310,
      hint: "ターニャでヤリ部屋に行く",
    },
    {
      title: "ターニャ浮浪者",
      thumbnail: "02_10",
      pictures: ["01", "02", "03"],
      common_event_id: 930,
      switch_id: 930,
      hint: "ターニャでヤリ部屋に行く",
    },
    {
      title: "ターニャゴブリン",
      thumbnail: "02_04",
      pictures: ["01", "02", "03"],
      common_event_id: 924,
      switch_id: 924,
      hint: "ターニャでヤリ部屋に行く",
    },
    {
      title: "ターニャ×グレイ",
      thumbnail: "02_19",
      pictures: ["01", "02", "03"],
      common_event_id: 1311,
      switch_id: 1311,
      hint: "ターニャでグレイの部屋に行く",
    },
    {
      title: "ターニャ×グレイ２",
      thumbnail: "02_05",
      pictures: ["01", "02", "03"],
      common_event_id: 925,
      switch_id: 925,
      hint: "ターニャでグレイの部屋に行く",
    },
    {
      title: "ターニャ×グレイ３",
      thumbnail: "02_12",
      pictures: ["01", "02", "03"],
      common_event_id: 1304,
      switch_id: 1304,
      hint: "ターニャでグレイの部屋に行く",
    },
    {
      title: "ターニャトイレ",
      thumbnail: "013_01",
      pictures: ["01", "02", "03"],
      common_event_id: 1097,
      switch_id: 1097,
      hint: "ターニャでトイレに行く",
    },
    /*{
                'title': 'ターニャ汎用H',
                'thumbnail': '02_09',
                'pictures': ['01', '02', '03'],
                'common_event_id': 929,
                'switch_id': 929,
                'hint': ''
            },*/
    {
      title: "ターニャ乳搾り",
      thumbnail: "02_20",
      pictures: ["01", "02", "03"],
      common_event_id: 1312,
      switch_id: 1312,
      hint: "ターニャの乳を絞る",
    },
    {
      title: "ターニャ出産(蛮族)",
      thumbnail: "02_14",
      pictures: ["01", "02", "03"],
      common_event_id: 1421,
      switch_id: 1421,
      hint: "ターニャで蛮族の子を出産をする",
    },
    {
      title: "ターニャ出産(グレイ)",
      thumbnail: "02_16",
      pictures: ["01", "02", "03"],
      common_event_id: 1424,
      switch_id: 1424,
      hint: "ターニャでグレイの子を出産をする",
    },
    {
      title: "ターニャ出産(浮浪者)",
      thumbnail: "02_10_alt_02",
      pictures: ["01", "02", "03"],
      common_event_id: 1427,
      switch_id: 1427,
      hint: "ターニャで浮浪者の子を出産をする",
    },
    {
      title: "ターニャ出産(ゴブリン)",
      thumbnail: "02_04_alt_02",
      pictures: ["01", "02", "03"],
      common_event_id: 1514,
      switch_id: 1514,
      hint: "ターニャでゴブリンの子を出産をする",
    },
    {
      title: "サラ敗北1",
      thumbnail: "04_02",
      pictures: ["01", "02", "03"],
      common_event_id: 942,
      switch_id: 942,
      hint: "2面のボスを撃破する",
    },
    {
      title: "サラ加入イベント",
      thumbnail: "04_09",
      pictures: ["01", "02", "03"],
      common_event_id: 1222,
      switch_id: 1222,
      hint: "2面のボスを撃破する",
    },
    {
      title: "サラ肉便器初回",
      thumbnail: "04_13",
      pictures: ["01", "02", "03"],
      common_event_id: 1053,
      switch_id: 1053,
      hint: "サラで肉便器当番をする",
    },
    {
      title: "サラヤリ部屋初回",
      thumbnail: "04_05",
      pictures: ["01", "02", "03"],
      common_event_id: 945,
      switch_id: 945,
      hint: "サラでヤリ部屋に行く",
    },
    {
      title: "サラヤリ部屋ボテ腹",
      thumbnail: "04_05_bote",
      pictures: ["01", "02", "03"],
      common_event_id: 1057,
      switch_id: 1057,
      hint: "ボテ腹状態のサラでヤリ部屋に行く",
    },
    {
      title: "サラヤリ部屋2回",
      thumbnail: "04_06",
      pictures: ["01", "02", "03"],
      common_event_id: 946,
      switch_id: 946,
      hint: "サラでヤリ部屋に行く",
    },

    {
      title: "サラ拷問部屋初回",
      thumbnail: "04_01",
      pictures: ["01", "02", "03"],
      common_event_id: 941,
      switch_id: 941,
      hint: "サラで拷問部屋に行く",
    },
    {
      title: "サラ拷問部屋2回",
      thumbnail: "04_03",
      pictures: ["01", "02", "03"],
      common_event_id: 943,
      switch_id: 943,
      hint: "サラで拷問部屋に行く",
    },
    {
      title: "サラ拷問部屋3回",
      thumbnail: "04_16",
      pictures: ["01", "02", "03"],
      common_event_id: 1056,
      switch_id: 1056,
      hint: "サラで拷問部屋に行く",
    },
    {
      title: "サララビアピアス",
      thumbnail: "04_08",
      pictures: ["01", "02", "03"],
      common_event_id: 948,
      switch_id: 948,
      hint: "サラで部屋の門番と話す",
    },
    {
      title: "サラ浮浪者部屋初回",
      thumbnail: "04_15",
      pictures: ["01", "02", "03"],
      common_event_id: 1055,
      switch_id: 1055,
      hint: "サラで浮浪者の部屋に行く",
    },
    {
      title: "サラ浮浪者部屋初回２",
      thumbnail: "04_11",
      pictures: ["01", "02", "03"],
      common_event_id: 1051,
      switch_id: 1055,
      hint: "サラで浮浪者の部屋に行く",
    },

    {
      title: "サラゴブリン",
      thumbnail: "04_12",
      pictures: ["01", "02", "03"],
      common_event_id: 1052,
      switch_id: 1052,
      hint: "サラでゴブリンの巣に行く",
    },
    {
      title: "サラ乳搾り",
      thumbnail: "04_18_alt_02",
      pictures: ["01", "02", "03"],
      common_event_id: 1058,
      switch_id: 1058,
      hint: "サラ乳搾り",
    },
    {
      title: "サラ出産(蛮族)",
      thumbnail: "04_04",
      pictures: ["01", "02", "03"],
      common_event_id: 1411,
      switch_id: 1411,
      hint: "サラで蛮族の子を出産をする",
    },
    {
      title: "サラ出産(浮浪者)",
      thumbnail: "04_11_bote_0",
      pictures: ["01", "02", "03"],
      common_event_id: 1414,
      switch_id: 1414,
      hint: "サラで浮浪者の子を出産をする",
    },
    {
      title: "サラ出産(ゴブリン)",
      thumbnail: "04_12_bote",
      pictures: ["01", "02", "03"],
      common_event_id: 1417,
      switch_id: 1417,
      hint: "サラでゴブリンの子を出産をする",
    },
    /*{
                'title': 'サラ汎用H',
                'thumbnail': '04_10',
                'pictures': ['01', '02', '03'],
                'common_event_id': 950,
                'switch_id': 950,
                'hint': ''
            },*/
    {
      title: "ディーナ敗北H",
      thumbnail: "05_12",
      pictures: ["01", "02", "03"],
      common_event_id: 1062,
      switch_id: 1062,
      hint: "３面をクリアする",
    },
    {
      title: "ディーナ調教",
      thumbnail: "05_05",
      pictures: ["01", "02", "03"],
      common_event_id: 955,
      switch_id: 955,
      hint: "ディーナで拷問部屋に行く",
    },
    {
      title: "ディーナ調教2",
      thumbnail: "05_07",
      pictures: ["01", "02", "03"],
      common_event_id: 957,
      switch_id: 957,
      hint: "ディーナで拷問部屋に行く",
    },
    {
      title: "ディーナ浮浪者調教",
      thumbnail: "05_11",
      pictures: ["01", "02", "03"],
      common_event_id: 1061,
      switch_id: 1061,
      hint: "ディーナで浮浪者の部屋に行く",
    },
    {
      title: "ディーナ浮浪者調教2",
      thumbnail: "05_19",
      pictures: ["01", "02", "03"],
      common_event_id: 1069,
      switch_id: 1069,
      hint: "ディーナで浮浪者の子供を\n孕み浮浪者の部屋に行く",
    },
    {
      title: "ディーナ辱め調教",
      thumbnail: "05_08",
      pictures: ["01", "02", "03"],
      common_event_id: 958,
      switch_id: 958,
      hint: "ディーナで拷問部屋に行く",
    },
    {
      title: "ディーナゴブリン",
      thumbnail: "05_10",
      pictures: ["01", "02", "03"],
      common_event_id: 960,
      switch_id: 960,
      hint: "ディーナでコブリンの部屋に行く",
    },
    {
      title: "ディーナフェラ調教",
      thumbnail: "05_03",
      pictures: ["01", "02", "03"],
      common_event_id: 953,
      switch_id: 953,
      hint: "ディーナで拷問部屋に行く",
    },
    {
      title: "ディーナ公開アナル拡張",
      thumbnail: "05_13",
      pictures: ["01", "02", "03"],
      common_event_id: 1063,
      switch_id: 1063,
      hint: "ディーナでボテ腹状態で\n拷問部屋に行く",
    },
    {
      title: "ディーナグレイ相手",
      thumbnail: "05_06",
      pictures: ["01", "02", "03"],
      common_event_id: 956,
      switch_id: 956,
      hint: "ディーナでグレイの部屋に行く",
    },
    {
      title: "ディーナグレイ相手2",
      thumbnail: "05_18",
      pictures: ["01", "02", "03"],
      common_event_id: 1068,
      switch_id: 1068,
      hint: "ディーナでグレイの部屋に行く",
    },
    {
      title: "ディーナ感覚遮断",
      thumbnail: "05_17",
      pictures: ["01", "02", "03"],
      common_event_id: 1067,
      switch_id: 1067,
      hint: "ディーナで拷問部屋に行く",
    },
    {
      title: "ディーナ乳搾り",
      thumbnail: "05_20_alt_01",
      pictures: ["01", "02", "03"],
      common_event_id: 1801,
      switch_id: 1801,
      hint: "ディーナ乳搾り",
    },
    /*{
                'title': 'ディーナ汎用H',
                'thumbnail': '05_04',
                'pictures': ['01', '02', '03'],
                'common_event_id': 954,
                'switch_id': 954,
                'hint': ''
            },*/
    {
      title: "ディーナ蛮族の子出産",
      thumbnail: "05_15",
      pictures: ["01", "02", "03"],
      common_event_id: 1441,
      switch_id: 1441,
      hint: "ディーナて蛮族の子を出産する",
    },
    {
      title: "ディーナ浮浪者の子出産",
      thumbnail: "05_16",
      pictures: ["01", "02", "03"],
      common_event_id: 1444,
      switch_id: 1444,
      hint: "ディーナて浮浪者の子を出産する",
    },
    {
      title: "ディーナグレイの子出産",
      thumbnail: "05_06_bote",
      pictures: ["01", "02", "03"],
      common_event_id: 1447,
      switch_id: 1447,
      hint: "ディーナてグレイの子を出産する",
    },
    {
      title: "ディーナゴブリンの子出産",
      thumbnail: "05_10_bote",
      pictures: ["01", "02", "03"],
      common_event_id: 1508,
      switch_id: 1508,
      hint: "ディーナてゴブリンの子を出産する",
    },
    {
      title: "ネル敗北H",
      thumbnail: "06_01",
      pictures: ["01", "02", "03"],
      common_event_id: 961,
      switch_id: 961,
      hint: "３面をクリアする",
    },
    {
      title: "ネル調教初回",
      thumbnail: "06_02",
      pictures: ["01", "02", "03"],
      common_event_id: 962,
      switch_id: 962,
      hint: "ネルで拷問部屋に行く",
    },
    {
      title: "ネル調教2回目",
      thumbnail: "06_03",
      pictures: ["01", "02", "03"],
      common_event_id: 963,
      switch_id: 963,
      hint: "ネルで拷問部屋に行く",
    },
    {
      title: "ネル調教3回目",
      thumbnail: "06_05",
      pictures: ["01", "02", "03"],
      common_event_id: 965,
      switch_id: 965,
      hint: "ネルで拷問部屋に行く",
    },
    {
      title: "ネル浮浪者調教",
      thumbnail: "06_09",
      pictures: ["01", "02", "03"],
      common_event_id: 969,
      switch_id: 969,
      hint: "ネルで拷問部屋に行く",
    },
    {
      title: "ネルゴブリン調教",
      thumbnail: "06_10",
      pictures: ["01", "02", "03"],
      common_event_id: 970,
      switch_id: 970,
      hint: "ネルで拷問部屋に行く",
    },
    {
      title: "ネルボテ腹調教",
      thumbnail: "06_03_02",
      pictures: ["01", "02", "03"],
      common_event_id: 1074,
      switch_id: 1074,
      hint: "ボテ腹状態のネルで拷問部屋に行く",
    },
    {
      title: "ネル強制売春",
      thumbnail: "06_11",
      pictures: ["01", "02", "03"],
      common_event_id: 1071,
      switch_id: 1071,
      hint: "ネルで売春をする",
    },
    {
      title: "ネルラビアピアス",
      thumbnail: "06_13",
      pictures: ["01", "02", "03"],
      common_event_id: 1073,
      switch_id: 1073,
      hint: "ネルで売春をする",
    },
    {
      title: "ネル売春",
      thumbnail: "06_12",
      pictures: ["01", "02", "03"],
      common_event_id: 1072,
      switch_id: 1072,
      hint: "ネルで売春をする",
    },
    {
      title: "ネル売春2",
      thumbnail: "06_06",
      pictures: ["01", "02", "03"],
      common_event_id: 966,
      switch_id: 966,
      hint: "ネルで売春をする",
    },
    {
      title: "ネル乳搾り",
      thumbnail: "06_16",
      pictures: ["01", "02", "03"],
      common_event_id: 1076,
      switch_id: 1076,
      hint: "ネル乳搾り",
    },
    /*{
                'title': 'ネル汎用H',
                'thumbnail': '06_07',
                'pictures': ['01', '02', '03'],
                'common_event_id': 967,
                'switch_id': 967,
                'hint': ''
            },*/
    {
      title: "ネル出産(蛮族)",
      thumbnail: "06_15",
      pictures: ["01", "02", "03"],
      common_event_id: 1431,
      switch_id: 1431,
      hint: "ネルで蛮族の子を出産をする",
    },
    {
      title: "ネル出産(売春)",
      thumbnail: "06_12_bote2",
      pictures: ["01", "02", "03"],
      common_event_id: 1434,
      switch_id: 1434,
      hint: "ネルで売春相手の子を出産をする",
    },
    {
      title: "ネル出産(浮浪者)",
      thumbnail: "06_09_bote",
      pictures: ["01", "02", "03"],
      common_event_id: 1437,
      switch_id: 1437,
      hint: "ネルで浮浪者の子を出産をする",
    },
    {
      title: "ネル出産(ゴブリン)",
      thumbnail: "06_10",
      pictures: ["01", "02", "03"],
      common_event_id: 1511,
      switch_id: 1511,
      hint: "ネルでゴブリンの子を出産する",
    },
    {
      title: "リン敗北H",
      thumbnail: "010_01",
      pictures: ["01", "02", "03"],
      common_event_id: 1001,
      switch_id: 1001,
      hint: "４面をクリアする",
    },
    {
      title: "リン肉便器初回",
      thumbnail: "010_12",
      pictures: ["01", "02", "03"],
      common_event_id: 1002,
      switch_id: 1002,
      hint: "リンを肉便器にする",
    },
    {
      title: "リン肉便器２回目騎乗位",
      thumbnail: "010_10",
      pictures: ["01", "02", "03"],
      common_event_id: 1010,
      switch_id: 1010,
      hint: "リンを肉便器にする",
    },
    {
      title: "リン肉便器(浮浪者)",
      thumbnail: "010_03",
      pictures: ["01", "02", "03"],
      common_event_id: 1003,
      switch_id: 1003,
      hint: "リンを肉便器にする",
    },
    {
      title: "リンセックスオークション",
      thumbnail: "010_04",
      pictures: ["01", "02", "03"],
      common_event_id: 1004,
      switch_id: 1004,
      hint: "リンでヤリ部屋に行く",
    },

    {
      title: "リン種付けオークション",
      thumbnail: "010_11",
      pictures: ["01", "02", "03"],
      common_event_id: 1011,
      switch_id: 1011,
      hint: "リンでヤリ部屋に行く",
    },
    {
      title: "リン、ゴブリンの巣へ",
      thumbnail: "010_06",
      pictures: ["01", "02", "03"],
      common_event_id: 1006,
      switch_id: 1006,
      hint: "リンでゴブリンの巣に行く",
    },
    {
      title: "リンラビアピアス",
      thumbnail: "010_16",
      pictures: ["01", "02", "03"],
      common_event_id: 1016,
      switch_id: 1016,
      hint: "リンでボテ腹でヤリ部屋に行く",
    },
    {
      title: "リン乳搾り",
      thumbnail: "010_17",
      pictures: ["01", "02", "03"],
      common_event_id: 1017,
      switch_id: 1017,
      hint: "リン乳搾り",
    },
    {
      title: "リンフェラ",
      thumbnail: "010_08",
      pictures: ["01", "02", "03"],
      common_event_id: 1008,
      switch_id: 1008,
      hint: "リンで拷問部屋に行く",
    },
    /*{
                'title': 'リン汎用H',
                'thumbnail': '010_07',
                'pictures': ['01', '02', '03'],
                'common_event_id': 1007,
                'switch_id': 1007,
                'hint': ''
            },*/
    {
      title: "リン出産(蛮族)",
      thumbnail: "010_02",
      pictures: ["01", "02", "03"],
      common_event_id: 1451,
      switch_id: 1451,
      hint: "リンで蛮族の子を出産をする",
    },
    {
      title: "リン出産(ゴブリン)",
      thumbnail: "010_13",
      pictures: ["01", "02", "03"],
      common_event_id: 1454,
      switch_id: 1454,
      hint: "リンでゴブリンの子を出産をする",
    },
    {
      title: "リン出産(浮浪者)",
      thumbnail: "010_09_bote",
      pictures: ["01", "02", "03"],
      common_event_id: 1457,
      switch_id: 1457,
      hint: "リンで浮浪者の子を出産をする",
    },
    {
      title: "アイリス敗北H",
      thumbnail: "012_01",
      pictures: ["01", "02", "03"],
      common_event_id: 1021,
      switch_id: 1021,
      hint: "５面をクリアする",
    },
    {
      title: "アイリス調教1",
      thumbnail: "012_02",
      pictures: ["01", "02", "03"],
      common_event_id: 1022,
      switch_id: 1022,
      hint: "アイリスで拷問部屋に行く",
    },
    {
      title: "アイリス調教2",
      thumbnail: "012_03",
      pictures: ["01", "02", "03"],
      common_event_id: 1023,
      switch_id: 1023,
      hint: "アイリスで拷問部屋に行く",
    },
    {
      title: "アイリス調教3",
      thumbnail: "012_05",
      pictures: ["01", "02", "03"],
      common_event_id: 1025,
      switch_id: 1025,
      hint: "アイリスで拷問部屋に行く",
    },
    {
      title: "アイリスラビアピアス",
      thumbnail: "012_10",
      pictures: ["01", "02", "03"],
      common_event_id: 1030,
      switch_id: 1030,
      hint: "アイリスで拷問部屋に行く",
    },
    {
      title: "アイリス晒し者",
      thumbnail: "012_11",
      pictures: ["01", "02", "03"],
      common_event_id: 1031,
      switch_id: 1031,
      hint: "ボテ腹状態のアイリスで\n拷問部屋に行く",
    },
    {
      title: "アイリス浮浪者",
      thumbnail: "012_14",
      pictures: ["01", "02", "03"],
      common_event_id: 1034,
      switch_id: 1034,
      hint: "アイリスで拷問部屋に行く",
    },
    {
      title: "アイリス、ゴブリンの巣へ",
      thumbnail: "012_06",
      pictures: ["01", "02", "03"],
      common_event_id: 1026,
      switch_id: 1026,
      hint: "アイリスで拷問部屋に行く",
    },
    {
      title: "アイリス乳搾り",
      thumbnail: "012_15",
      pictures: ["01", "02", "03"],
      common_event_id: 1035,
      switch_id: 1035,
      hint: "アイリス乳搾り",
    },
    /*{
                'title': 'アイリス汎用H',
                'thumbnail': '012_07',
                'pictures': ['01', '02', '03'],
                'common_event_id': 1027,
                'switch_id': 1027,
                'hint': ''
            },*/
    {
      title: "アイリス出産(蛮族)",
      thumbnail: "012_12",
      pictures: ["01", "02", "03"],
      common_event_id: 1461,
      switch_id: 1461,
      hint: "アイリスで蛮族の子を出産をする",
    },
    {
      title: "アイリス出産(ゴブリン)",
      thumbnail: "012_16",
      pictures: ["01", "02", "03"],
      common_event_id: 1464,
      switch_id: 1464,
      hint: "アイリスでゴブリンの子を出産をする",
    },
    {
      title: "アイリス出産(浮浪者)",
      thumbnail: "012_17",
      pictures: ["01", "02", "03"],
      common_event_id: 1467,
      switch_id: 1467,
      hint: "アイリスで浮浪者の子を出産をする",
    },
    {
      title: "母親のフェラ",
      thumbnail: "09_02",
      pictures: ["01", "02", "03"],
      common_event_id: 992,
      switch_id: 992,
      hint: "母親が妊娠してない場合に\n2面のボスを撃破する",
    },
    {
      title: "母親のセックス",
      thumbnail: "09_03",
      pictures: ["01", "02", "03"],
      common_event_id: 993,
      switch_id: 993,
      hint: "母親が妊娠してない場合\n5面で発生する",
    },
    {
      title: "母親のおまんこ観察",
      thumbnail: "09_04",
      pictures: ["01", "02", "03"],
      common_event_id: 994,
      switch_id: 994,
      hint: "母親が妊娠してない場合\n6面で発生する",
    },
    {
      title: "母親とセックス",
      thumbnail: "09_05",
      pictures: ["01", "02", "03"],
      common_event_id: 995,
      switch_id: 995,
      hint: "母親の妊娠１日前",
    },
    {
      title: "母親とセックス2",
      thumbnail: "09_01",
      pictures: ["01", "02", "03"],
      common_event_id: 991,
      switch_id: 991,
      hint: "日数を経過して母親が妊娠する",
    },
    {
      title: "幼年女の子のH",
      thumbnail: "08_05",
      pictures: ["01", "02", "03"],
      common_event_id: 985,
      switch_id: 985,
      hint: "幼年の女の子を肉便器にする",
    },
    {
      title: "若年女の子のH",
      thumbnail: "08_04",
      pictures: ["01", "02", "03"],
      common_event_id: 984,
      switch_id: 984,
      hint: "若年の女の子を肉便器にする",
    },
    {
      title: "人妻のH",
      thumbnail: "08_06",
      pictures: ["01", "02", "03"],
      common_event_id: 986,
      switch_id: 986,
      hint: "人妻を肉便器にする",
    },

    {
      title: "妊娠発覚イベント(レイラ)",
      thumbnail: "01",
      pictures: ["01", "02", "03"],
      common_event_id: 1989,
      switch_id: 604,
      hint: "レイラが妊娠する",
    },
    {
      title: "妊娠発覚イベント(ミオリ)",
      thumbnail: "03",
      pictures: ["01", "02", "03"],
      common_event_id: 1988,
      switch_id: 647,
      hint: "ミオリが妊娠する",
    },
    {
      title: "妊娠発覚イベント(ターニャ)",
      thumbnail: "02",
      pictures: ["01", "02", "03"],
      common_event_id: 1984,
      switch_id: 686,
      hint: "ターニャが妊娠する",
    },
    {
      title: "妊娠発覚イベント(サラ)",
      thumbnail: "04",
      pictures: ["01", "02", "03"],
      common_event_id: 1986,
      switch_id: 724,
      hint: "サラが妊娠する",
    },
    {
      title: "妊娠発覚イベント(ディーナ)",
      thumbnail: "05",
      pictures: ["01", "02", "03"],
      common_event_id: 1990,
      switch_id: 1784,
      hint: "ディーナが妊娠する",
    },
    {
      title: "妊娠発覚イベント(ネル)",
      thumbnail: "06",
      pictures: ["01", "02", "03"],
      common_event_id: 1985,
      switch_id: 766,
      hint: "ネルが妊娠する",
    },
    {
      title: "妊娠発覚イベント(リン)",
      thumbnail: "10",
      pictures: ["01", "02", "03"],
      common_event_id: 1991,
      switch_id: 1701,
      hint: "リンが妊娠する",
    },
    {
      title: "妊娠発覚イベント(アイリス)",
      thumbnail: "12",
      pictures: ["01", "02", "03"],
      common_event_id: 1987,
      switch_id: 1744,
      hint: "アイリスが妊娠する",
    },
    {
      title: "晒し者(レイラ)",
      thumbnail: "01_29",
      pictures: ["01", "02", "03"],
      common_event_id: 1972,
      switch_id: 1972,
      hint: "レイラの晒し者イベント",
    },
    {
      title: "晒し者(ミオリ)",
      thumbnail: "03_21",
      pictures: ["01", "02", "03"],
      common_event_id: 1976,
      switch_id: 1976,
      hint: "ミオリの晒し者イベント",
    },
    {
      title: "晒し者(シャルル)",
      thumbnail: "07_16",
      pictures: ["01", "02", "03"],
      common_event_id: 1980,
      switch_id: 1980,
      hint: "シャルルの晒し者イベント",
    },
    {
      title: "晒し者(ターニャ)",
      thumbnail: "02_21",
      pictures: ["01", "02", "03"],
      common_event_id: 1974,
      switch_id: 1974,
      hint: "ターニャの晒し者イベント",
    },
    {
      title: "晒し者(サラ)",
      thumbnail: "04_20",
      pictures: ["01", "02", "03"],
      common_event_id: 1978,
      switch_id: 1978,
      hint: "サラの晒し者イベント",
    },
    {
      title: "晒し者(ディーナ)",
      thumbnail: "05_21",
      pictures: ["01", "02", "03"],
      common_event_id: 1975,
      switch_id: 1975,
      hint: "ディーナの晒し者イベント",
    },
    {
      title: "晒し者(ネル)",
      thumbnail: "06_17",
      pictures: ["01", "02", "03"],
      common_event_id: 1977,
      switch_id: 1977,
      hint: "ネルの晒し者イベント",
    },
    {
      title: "晒し者(リン)",
      thumbnail: "010_19",
      pictures: ["01", "02", "03"],
      common_event_id: 1979,
      switch_id: 1979,
      hint: "リンの晒し者イベント",
    },
    {
      title: "晒し者(アイリス)",
      thumbnail: "012_19",
      pictures: ["01", "02", "03"],
      common_event_id: 1973,
      switch_id: 1973,
      hint: "アイリスの晒し者イベント",
    },
    /*{
                'title': 'ラストバトル',
                'thumbnail': 'ending',
                'pictures': ['01', '02', '03'],
                'common_event_id': 209,
                'switch_id': 214,
                'hint': 'ゲームをクリアする'
            },*/
    {
      title: "ハッピーエンド",
      thumbnail: "ending",
      pictures: ["01", "02", "03"],
      common_event_id: 214,
      switch_id: 214,
      hint: "ゲームをクリアする",
    },
    {
      title: "エピローグ(主人公たち)",
      thumbnail: "07_09_02",
      pictures: ["01", "02", "03"],
      common_event_id: 227,
      switch_id: 214,
      hint: "ゲームをクリアする",
    },
    {
      title: "ラスボス敗北バッドエンド",
      thumbnail: "09_03_alt_01",
      pictures: ["01", "02", "03"],
      common_event_id: 1810,
      switch_id: 218,
      hint: "最終戦で敗北する",
    },
    {
      title: "蛮族バッドエンド",
      thumbnail: "badend_banzoku",
      pictures: ["01", "02", "03"],
      common_event_id: 1835,
      switch_id: 218,
      hint: "４人以上蛮族の子を妊娠して\n最終戦で敗北する",
    },
    {
      title: "ゴブリンバッドエンド",
      thumbnail: "badend_goblin",
      pictures: ["01", "02", "03"],
      common_event_id: 1836,
      switch_id: 218,
      hint: "４人以上ゴブリンの子を妊娠して\n最終戦で敗北する",
    },
    {
      title: "浮浪者バッドエンド",
      thumbnail: "badend_vagrant",
      pictures: ["01", "02", "03"],
      common_event_id: 1837,
      switch_id: 218,
      hint: "４人以上浮浪者の子を妊娠して\n最終戦で敗北する",
    },
    {
      title: "大臣バッドエンド",
      thumbnail: "07_17",
      pictures: ["01", "02", "03"],
      common_event_id: 1838,
      switch_id: 221,
      hint: "レイラとミオリが大臣の\n子を妊娠して最終戦で敗北する",
    },
    {
      title: "国民反乱バッドエンド",
      thumbnail: "01_28",
      pictures: ["01", "02", "03"],
      common_event_id: 221,
      switch_id: 221,
      hint: "村人残り０人にしてゲームをクリアする",
    },
    {
      title: "妊娠系バッドエンド",
      thumbnail: "06_12_bote_alt_01",
      pictures: ["01", "02", "03"],
      common_event_id: 1840,
      switch_id: 221,
      hint: "最終戦で敗北する",
    },
    {
      title: "お風呂イベント",
      thumbnail: "bath",
      pictures: ["01", "02", "03"],
      common_event_id: 1950,
      switch_id: 214,
      hint: "ゲームをクリアする",
    },
    {
      title: "呪いの装備イベント",
      thumbnail: "curse",
      pictures: ["01", "02", "03"],
      common_event_id: 1951,
      switch_id: 214,
      hint: "ゲームをクリアする",
    },
    /*{
                'title': 'ネル売春(汎用)',
                'thumbnail': '06_12',
                'pictures': ['01', '02', '03'],
                'common_event_id': 1365,
                'switch_id': 1365,
                'hint': '',
                'invisible': true
            },
            {
                'title': 'ネル種付け(汎用)',
                'thumbnail': '06_03',
                'pictures': ['01', '02', '03'],
                'common_event_id': 1074,
                'switch_id': 1074,
                'hint': '',
                'invisible': true
            },*/
  ],
  //---------------------------------------------------------------------
  // ★ 回想時に一時的に利用するマップIDを指定します
  //---------------------------------------------------------------------
  // 通常は何もないマップを指定します
  //---------------------------------------------------------------------
  sandbox_map_id: 7,
};

function rngd_hash_size(obj) {
  var cnt = 0;
  for (var o in obj) {
    cnt++;
  }
  return cnt;
}

//-----------------------------------------------------------------------------
// ◆ Scene関数
//-----------------------------------------------------------------------------

//=========================================================================
// ■ Scene_Recollection
//=========================================================================
// 回想用のシーン関数です
//=========================================================================
function Scene_Recollection() {
  this.initialize.apply(this, arguments);
}

Scene_Recollection.prototype = Object.create(Scene_Base.prototype);
Scene_Recollection.prototype.constructor = Scene_Recollection;

Scene_Recollection.prototype.initialize = function () {
  Scene_Base.prototype.initialize.call(this);
};

Scene_Recollection.prototype.create = function () {
  Scene_Base.prototype.create.call(this);
  this.createWindowLayer();
  this.createCommandWindow();
};

// 回想モードのカーソル
Scene_Recollection.rec_list_index = 0;

// 回想モードの再読み込み判定用 true: コマンドウィンドウを表示せず回想リストを表示 false:コマンドウィンドウを表示
Scene_Recollection.reload_rec_list = false;

Scene_Recollection.prototype.createCommandWindow = function () {
  // 回想モード選択ウィンドウ
  /*this._rec_window = new Window_RecollectionCommand();
        this._rec_window.setHandler('select_recollection', this.commandShowRecollection.bind(this));
        this._rec_window.setHandler('select_cg', this.commandShowCg.bind(this));
        this._rec_window.setHandler('select_back_title', this.commandBackTitle.bind(this));
        this._rec_window.setHandler('cancel', this.commandBackTitle.bind(this));

        this.addWindow(this._rec_window);*/

  // 回想リスト
  this._rec_list = new Window_RecList(-4, -4, Graphics.width, Graphics.height);

  // リロードの場合：回想リストを表示にする。通常はここがfalse
  if (Scene_Recollection.reload_rec_list) {
    //this._rec_window.deactivate();
    //this._rec_window.visible = false;
    this._rec_list.visible = true;
    this._rec_list.activate();
  } else {
    //this._rec_window.activate();
    //this._rec_window.visible = true;
    this._rec_list.visible = false;
    this._rec_list.deactivate();
  }
  this._rec_list.setHandler("ok", this.commandDoRecMode.bind(this));
  this._rec_list.setHandler("cancel", this.commandBackSelectMode.bind(this));
  this._mode = "recollection";
  this._rec_list.select(Scene_Recollection.rec_list_index);

  this.addWindow(this._rec_list);

  // CG参照用ダミーコマンド
  this._dummy_window = new Window_Command(new Rectangle(0, 0, 0, 0));
  this._dummy_window.isCurrentItemEnabled = function () {
    return true;
  };
  this._dummy_window.deactivate();
  this._dummy_window.visible = false;
  this._dummy_window.setHandler("ok", this.commandDummyOk.bind(this));
  this._dummy_window.setHandler("cancel", this.commandDummyCancel.bind(this));
  this._dummy_window.addCommand("next", "ok");
  this.addWindow(this._dummy_window);
  Scene_Recollection.reload_rec_list = false;

  this._dummy_window.isTouchedInsideFrame = function () {
    return true;
  };
  this._dummy_window.onTouch = function (triggered) {
    if (triggered) {
      this.processOk();
    }
  };
  this.commandShowRecollection();
};

function Window_RecCommand() {
  this.initialize.apply(this, arguments);
}

Window_RecCommand.prototype = Object.create(Window_Command.prototype);
Window_RecCommand.prototype.constructor = Window_RecCommand;
Window_RecCommand.prototype.initialize = function () {
  Window_Command.prototype.initialize.call(this, 0, 0);
};
Window_RecCommand.prototype.playOkSound = function () {};
Window_RecCommand.prototype.processCancel = function () {
  this.updateInputData();
  this.deactivate();
  this.callCancelHandler();
};
//-------------------------------------------------------------------------
// ● 開始処理
//-------------------------------------------------------------------------
Scene_Recollection.prototype.start = function () {
  Scene_Base.prototype.start.call(this);
  // this._rec_window.refresh();
  this._rec_list.refresh();
  AudioManager.playBgm(rngd_recollection_mode_settings.rec_mode_bgm.bgm);
  Scene_Recollection._rngd_recollection_doing = false;
};

//-------------------------------------------------------------------------
// ● 更新処理
//-------------------------------------------------------------------------
Scene_Recollection.prototype.update = function () {
  Scene_Base.prototype.update.call(this);
};

//-------------------------------------------------------------------------
// ● 「回想を見る」を選択した際のコマンド
//-------------------------------------------------------------------------
Scene_Recollection.prototype.commandShowRecollection = function () {
  // モードウィンドウの無効化とリストウィンドウの有効化
  this._mode = "recollection";
  this._rec_list._mode = this._mode;
  this.do_exchange_status_window(this._rec_window, this._rec_list);
};

//-------------------------------------------------------------------------
// ● 「CGを見る」を選択した際のコマンド
//-------------------------------------------------------------------------
Scene_Recollection.prototype.commandShowCg = function () {
  this._mode = "cg";
  this._rec_list._mode = this._mode;
  this.do_exchange_status_window(this._rec_window, this._rec_list);
  Scene_Recollection.reload_rec_list = false;
};

//-------------------------------------------------------------------------
// ● 「タイトルに戻る」を選択した際のコマンド
//-------------------------------------------------------------------------
Scene_Recollection.prototype.commandBackTitle = function () {
  Scene_Recollection.rec_list_index = 0;
  SceneManager.goto(Scene_Title);
};

//-------------------------------------------------------------------------
// ● 回想orCGモードから「キャンセル」して前の画面に戻った場合のコマンド
//-------------------------------------------------------------------------
Scene_Recollection.prototype.commandBackSelectMode = function () {
  SceneManager.goto(Scene_Title);

  //this.do_exchange_status_window(this._rec_list, this._rec_window);
};

//-------------------------------------------------------------------------
// ● 回想orCGモードにおいて、実際の回想orCGを選択した場合のコマンド
//-------------------------------------------------------------------------
Scene_Recollection.prototype.commandDoRecMode = function () {
  var target_index = this._rec_list.index();
  Scene_Recollection.rec_list_index = target_index;
  $gameTemp.ignoreFiles = {};
  $gameTemp.eroBack = null;

  if (this._rec_list.is_valid_picture(this._rec_list.index())) {
    // 回想モードの場合
    if (this._mode == "recollection") {
      Scene_Recollection._rngd_recollection_doing = true;

      DataManager.setupNewGame();
      $gamePlayer.setTransparent(255);
      this.fadeOutAll();
      // TODO: パーティを透明状態にする

      //$dataSystem.optTransparent = false;
      var commonEventId =
        rngd_recollection_mode_settings.rec_cg_set[target_index][
          "common_event_id"
        ];
      $gameTemp.reserveCommonEvent(commonEventId);
      $gamePlayer.reserveTransfer(
        rngd_recollection_mode_settings.sandbox_map_id,
        0,
        0,
        0
      );
      $gameSwitches.setValue(999, true);
      sessionStorage.setItem("noreCommonEventId", commonEventId);
      sessionStorage.setItem(
        "norePlayerMap",
        rngd_recollection_mode_settings.sandbox_map_id
      );

      SceneManager.push(Scene_Map);

      // CGモードの場合
    } else if (this._mode == "cg") {
      Scene_Recollection._rngd_recollection_doing = false;
      this._cg_sprites = [];
      this._cg_sprites_index = 0;
      var obj = rngd_recollection_mode_settings.rec_cg_set[target_index];
      $gameTemp.addIgnoreFiles(obj.ignore);
      // シーン画像をロードする
      var n = 15;
      var file = obj.thumbnail.substr(0, 5);
      var self = this;
      var texture = PIXI.utils.TextureCache[file + "_01_01.png"];
      if (texture) {
        onComp();
      } else {
        var file2 = "img/ero/ero" + file + ".json";
        if (obj.file) {
          file2 = "img/ero/ero" + obj.file + ".json";
        }
        ImageManager.loadSpriteSheet(file2, onComp);
        if (obj.file2) {
          ImageManager.loadSpriteSheet("img/ero/ero" + obj.file2 + ".json");
        }
      }
      if (obj.back) {
        $gameTemp.eroBack = obj.back;
      }

      function getFileName(id) {
        if (id == "se") {
          return "se";
        }
        if (id < 10) {
          return file + "_0" + id;
        } else {
          return file + "_" + id;
        }
      }
      function onComp() {
        obj.pictures.forEach(function (name) {
          var sp = new Sprite_Picture(n);

          if (typeof name == "string") {
            var picFile = file + "_" + name;
            $gameScreen.showPicture(
              n,
              Saba.SimpleScenario.webpPrefix + picFile,
              0,
              0,
              0,
              100,
              100,
              255,
              0
            );
          } else if (typeof name == "number") {
            $gameScreen.showPicture(
              n,
              Saba.SimpleScenario.webpPrefix + getFileName(name),
              0,
              0,
              0,
              100,
              100,
              255,
              0
            );
          } else {
            var json = JSON.parse(JSON.stringify(name));
            var names = json.pic;
            var nameList = [];
            for (var i = 0; i < names.length; i++) {
              nameList.push(getFileName(names[i]));
            }
            if (json.reverse) {
              for (var i = names.length - 1; i >= 0; i--) {
                nameList.push(getFileName(names[i]));
              }
            }
            json.pic = nameList;
            if (json.seIndex == undefined) {
              json.seIndex = -1;
            }
            p(JSON.stringify(json));
            var picFile = JSON.stringify(json);
            $gameScreen.showPicture(
              n,
              Saba.SimpleScenario.webpPrefix + picFile,
              0,
              0,
              0,
              100,
              100,
              255,
              0
            );
          }

          //var pic = $gameScreen.picture(n);
          //sp.bitmap = ImageManager.loadSabaJpeg(name);
          // 最初のSprite以外は見えないようにする
          if (self._cg_sprites.length > 0) {
            sp.invisible = true;
          }

          // TODO: 画面サイズにあわせて、拡大・縮小すべき
          self._cg_sprites.push(sp);
          self.addChild(sp);
          n++;
        }, self);
      }

      this.do_exchange_status_window(this._rec_list, this._dummy_window);
      this._dummy_window.visible = false;
      this._dummy_window.activate();
    }
  } else {
    this._rec_list.activate();
  }
  this._rec_list.refresh();
};

Scene_Recollection.prototype.commandDummyOk = function () {
  if (this._cg_sprites_index < this._cg_sprites.length - 1) {
    this._cg_sprites[this._cg_sprites_index].invisible = true;
    this._cg_sprites_index++;
    this._cg_sprites[this._cg_sprites_index].invisible = false;
    this._dummy_window.activate();
    SoundManager.playOk();
  } else {
    if (this._cg_sprites.length == 0) {
      this._dummy_window.activate();
      return;
    }
    SoundManager.playOk();
    this.clearCg();
    this.do_exchange_status_window(this._dummy_window, this._rec_list);
  }
};
Scene_Recollection.prototype.clearCg = function () {
  $gameScreen.clearPictures();
  for (var i = 0; i < this._cg_sprites.length; i++) {
    var sp = this._cg_sprites[i];
    sp.invisible = true;
    this.removeChild(sp);
  }
  this._cg_sprites = [];
};
Scene_Recollection.prototype.commandDummyCancel = function () {
  if (this._cg_sprites_index == 0) {
    SoundManager.playCancel();
    this.clearCg();
    this.do_exchange_status_window(this._dummy_window, this._rec_list);
  } else {
    this._cg_sprites[this._cg_sprites_index].invisible = true;
    this._cg_sprites_index--;
    this._cg_sprites[this._cg_sprites_index].invisible = false;
    this._dummy_window.activate();
    SoundManager.playOk();
  }
};

// コモンイベントから呼び出す関数
Scene_Recollection.prototype.rngd_exit_scene = function () {
  if (Scene_Recollection._rngd_recollection_doing) {
    // Window_RecListを表示する
    Scene_Recollection.reload_rec_list = true;
    SceneManager.push(Scene_Recollection);
  }
};

//-------------------------------------------------------------------------
// ● ウィンドウの無効化と有効化
//-------------------------------------------------------------------------
// win1: 無効化するウィンドウ
// win2: 有効化するウィンドウ
//-------------------------------------------------------------------------
Scene_Recollection.prototype.do_exchange_status_window = function (win1, win2) {
  if (win1) {
    win1.deactivate();
    win1.visible = false;
  }
  if (win2) {
    win2.activate();
    win2.refresh();
    win2.visible = true;
  }
};

//-----------------------------------------------------------------------------
// ◆ Window関数
//-----------------------------------------------------------------------------

//=========================================================================
// ■ Window_RecollectionCommand
//=========================================================================
// 回想モードかCGモードを選択するウィンドウです
//=========================================================================
function Window_RecollectionCommand() {
  this.initialize.apply(this, arguments);
}

Window_RecollectionCommand.prototype = Object.create(Window_Command.prototype);
Window_RecollectionCommand.prototype.constructor = Window_RecollectionCommand;

Window_RecollectionCommand.prototype.initialize = function () {
  Window_Command.prototype.initialize.call(this, 0, 0);
  this.x = rngd_recollection_mode_settings.rec_mode_window.x;
  this.y = rngd_recollection_mode_settings.rec_mode_window.y;
};

Window_RecollectionCommand.prototype.makeCommandList = function () {
  Window_Command.prototype.makeCommandList.call(this);
  this.addCommand(
    rngd_recollection_mode_settings.rec_mode_window.str_select_recollection,
    "select_recollection"
  );
  this.addCommand(
    rngd_recollection_mode_settings.rec_mode_window.str_select_cg,
    "select_cg"
  );
  this.addCommand(
    rngd_recollection_mode_settings.rec_mode_window.str_select_back_title,
    "select_back_title"
  );
};

//=========================================================================
// ■ Window_RecollectionList
//=========================================================================
// 回想またはCGを選択するウィンドウです
//=========================================================================
function Window_RecList() {
  this.initialize.apply(this, arguments);
}

Window_RecList.prototype = Object.create(Window_Selectable.prototype);
Window_RecList.prototype.constructor = Window_RecList;

//-------------------------------------------------------------------------
// ● 初期化処理
//-------------------------------------------------------------------------
Window_RecList.prototype.initialize = function (x, y, width, height) {
  Window_Selectable.prototype.initialize.call(
    this,
    new Rectangle(x, y, width, height)
  );
  this.windowWidth = width;
  this.windowHeight = height;
  this.select(0);
  this._formationMode = false;
  this.get_global_variables();
  var infos = rngd_recollection_mode_settings.rec_cg_set;
  for (var i = 0; i < infos.length; i++) {
    var info = infos[i];
    if (
      this._global_variables["switches"][info.switch_id] ||
      Nore.isRecoShow(info.switch_id)
    ) {
      var bmpName = info.thumbnail;
      var bmp = ImageManager.loadEro(bmpName);
    }
  }
  ImageManager.loadEro("never_watch_picture");
  this.refresh();
};
Window_RecList.prototype.standardPadding = function () {
  return 4;
};
Window_RecList.prototype.refresh = function () {
  this._windowContentsSprite.removeChildren();
  Window_Selectable.prototype.refresh.call(this);
};

Window_RecList.prototype.maxItems = function () {
  var n = rngd_recollection_mode_settings.rec_cg_set.length;
  let length = 0;
  for (const set of rngd_recollection_mode_settings.rec_cg_set) {
    if (!set.invisible) {
      length++;
    }
  }
  if (this._mode == "cg") {
    return n - 2;
  } else {
    return length;
  }
};

Window_RecList.prototype.itemHeight = function () {
  return 258;
};

//Window_RecList.prototype.maxRows = function() {
//    return rngd_recollection_mode_settings.rec_list_window.item_height;
//};

Window_RecList.prototype.maxCols = function () {
  return 4;
};

Window_RecList.prototype.colSpacing = function () {
  return 0;
};
Window_RecList.prototype.maxPageRows = function () {
  var pageHeight = this.height; // - this.padding * 2;
  return Math.floor(pageHeight / this.itemHeight());
};
Window_RecList.prototype.itemRect = function (index) {
  const maxCols = this.maxCols();
  const itemWidth = this.itemWidth();
  const itemHeight = this.itemHeight();
  const colSpacing = this.colSpacing();
  const rowSpacing = this.rowSpacing();
  const col = index % maxCols;
  const row = Math.floor(index / maxCols);
  const x = col * itemWidth + colSpacing / 2 - this.scrollBaseX();
  const y = row * itemHeight + rowSpacing / 2 - this.scrollBaseY();
  const width = itemWidth - colSpacing + 2;
  const height = itemHeight - rowSpacing;
  return new Rectangle(x, y, width, height);
};
Window_RecList.prototype.drawItem = function (index) {
  // 1番目のCGセットを取得

  var rec_cg = null;

  let i = 0;
  for (let set of rngd_recollection_mode_settings.rec_cg_set) {
    if (set.invisible) {
      continue;
    }
    if (i == index) {
      rec_cg = set;
      break;
    }
    i++;
  }
  //rngd_recollection_mode_settings.rec_cg_set[index];
  var rect = this.itemRect(index);
  var text_height = 0;
  //SHOW_ALL = $gameTemp.isPlaytest();
  if (rngd_recollection_mode_settings.rec_list_window.show_title_text) {
    this.contents.fontSize = 20;
    if (
      this._global_variables["switches"][rec_cg.switch_id] ||
      Nore.isRecoShow(rec_cg.switch_id)
    ) {
      this.changeTextColor(ColorManager.normalColor());
      let title = rec_cg.title;
      if (ConfigManager.language == "en" && rec_cg.titleEn) {
        title = rec_cg.titleEn;
      }

      if (false) {
        let hint = rec_cg.hint;
        const hints = hint.split("\n");
        if (hints.length > 1) {
          this.contents.drawText(
            hints[0],
            rect.x + 4,
            rect.y + this.itemHeight() - 62,
            this.itemWidth(),
            32,
            "center"
          );
          this.contents.drawText(
            hints[1],
            rect.x + 4,
            rect.y + this.itemHeight() - 38,
            this.itemWidth(),
            32,
            "center"
          );
        } else {
          this.contents.drawText(
            rec_cg.hint,
            rect.x + 4,
            rect.y + this.itemHeight() - 52,
            this.itemWidth(),
            32,
            "center"
          );
        }
      } else {
        this.contents.drawText(
          title,
          rect.x + 4,
          rect.y + this.itemHeight() - 52,
          this.itemWidth(),
          32,
          rngd_recollection_mode_settings.rec_list_window.title_text_align
        );
      }
    } else {
      this.contents.drawText(
        rngd_recollection_mode_settings.rec_list_window.never_watch_title_text,
        rect.x + 4,
        rect.y + 4,
        this.itemWidth(),
        32,
        rngd_recollection_mode_settings.rec_list_window.title_text_align
      );

      this.changeTextColor(ColorManager.textColor(7));
      if (rec_cg.hint) {
        let hint = rec_cg.hint;
        const hints = hint.split("\n");
        if (hints.length > 1) {
          this.contents.drawText(
            hints[0],
            rect.x + 4,
            rect.y + this.itemHeight() - 62,
            this.itemWidth(),
            32,
            "center"
          );
          this.contents.drawText(
            hints[1],
            rect.x + 4,
            rect.y + this.itemHeight() - 38,
            this.itemWidth(),
            32,
            "center"
          );
        } else {
          this.contents.drawText(
            rec_cg.hint,
            rect.x + 4,
            rect.y + this.itemHeight() - 52,
            this.itemWidth(),
            32,
            "center"
          );
        }
      }
    }
    text_height = 32;
  }

  // CGセットのスイッチ番号が、全てのセーブデータを走査した後にTrueであればピクチャ表示
  if (
    this._global_variables["switches"][rec_cg.switch_id] ||
    Nore.isRecoShow(rec_cg.switch_id)
  ) {
    var thumbnail_file_name = rec_cg.pictures[0];
    if (rec_cg.thumbnail !== undefined && rec_cg.thumbnail !== null) {
      thumbnail_file_name = rec_cg.thumbnail;
    }

    this.drawRecollection(
      thumbnail_file_name,
      0,
      0,
      300,
      188,
      rect.x - 10,
      rect.y - 5 + text_height,
      rec_cg.paso
    );
  } else {
    this.drawRecollection(
      rngd_recollection_mode_settings.rec_list_window.never_watch_picture_name,
      0,
      0,
      300,
      188,
      rect.x - 10,
      rect.y - 5 + text_height,
      rec_cg.paso
    );
  }
};

//-------------------------------------------------------------------------
// ● 全てのセーブデータを走査し、対象のシーンスイッチ情報を取得する
//-------------------------------------------------------------------------
Window_RecList.prototype.get_global_variables = function () {
  this._global_variables = {
    switches: {},
  };
  var info = DataManager._globalInfo;
  //p(info)
  info[99] = info[99] || {};
  var rec_cg_max = rngd_recollection_mode_settings.rec_cg_set.length;
  for (var j = 0; j < rec_cg_max; j++) {
    var cg = rngd_recollection_mode_settings.rec_cg_set[j];
    if (info[99][cg.switch_id]) {
      this._global_variables["switches"][cg.switch_id] = true;
    }
  }
};
//-------------------------------------------------------------------------
// ● index番目に表示された回想orCGが有効かどうか判断する
//-------------------------------------------------------------------------
Window_RecList.prototype.is_valid_picture = function (index) {
  // CG情報の取得と対象スイッチの取得
  var _rec_cg_obj = rngd_recollection_mode_settings.rec_cg_set[index];
  return (
    this._global_variables["switches"][_rec_cg_obj.switch_id] == true ||
    Nore.isRecoShow(_rec_cg_obj.switch_id)
  );
};

(function () {
  //-----------------------------------------------------------------------------
  // ◆ 組み込み関数Fix
  //-----------------------------------------------------------------------------
  /*
    Window_Base.prototype.drawRecollection = function(bmp_name, x, y, width, height, dx, dy) {
        var bmp = ImageManager.loadPicture(bmp_name);

        var _width = width;
        var _height = height;
        if(_width > bmp.width) {
            _width = bmp.width - 1;
        }

        if(_height > bmp.height) {
            _height = bmp.height - 1;
        }
        this.contents.blt(bmp, x, y, _width, _height, dx, dy);
    };
*/
  var Window_TitleCommand_makeCommandList =
    Window_TitleCommand.prototype.makeCommandList;

  Window_TitleCommand.prototype.makeCommandList = function () {
    Window_TitleCommand_makeCommandList.call(this);
    this.clearCommandList();
    this.addCommand(TextManager._newGame, "newGame");
    this.addCommand(
      TextManager._continue_,
      "continue",
      this.isContinueEnabled()
    );
    this.addCommand(TextManager.recollection, "recollection");
    this.addCommand(TextManager._options, "options");
    this.addCommand(TextManager._gameEnd, "gameEnd");
  };

  Scene_Title.prototype.commandRecollection = function () {
    SceneManager.push(Scene_Recollection);
  };

  var Scene_Title_createCommandWindow =
    Scene_Title.prototype.createCommandWindow;
  Scene_Title.prototype.createCommandWindow = function () {
    Scene_Title_createCommandWindow.call(this);
    this._commandWindow.setHandler(
      "recollection",
      this.commandRecollection.bind(this)
    );
    this._commandWindow.setHandler("gameEnd", this.popScene.bind(this));
  };

  Window_Base.prototype.drawRecollection = function (
    bmp_name,
    x,
    y,
    width,
    height,
    dx,
    dy,
    paso
  ) {
    var _width = width;
    var _height = height;
    var bitmap = ImageManager.loadEro(bmp_name);
    if (!bitmap.isReady()) {
      return;
    }
    /*
        var baseTexture = bitmap._baseTexture;
            /*new PIXI.BaseTexture(bitmap._image, PIXI.SCALE_MODES.DEFAULT);
            baseTexture.imageUrl = 'jpg/' + bmp_name;
            PIXI.utils.BaseTextureCache['jpg/' + bmp_name] = baseTexture;*/
    /*
        if(_width > baseTexture.width) {
            _width = baseTexture.width - 1;
        }

        if(_height > baseTexture.height) {
            _height = baseTexture.height - 1;
        }
        var texture = new PIXI.Texture(baseTexture);
        // texture.frame = new PIXI.Rectangle(sx, sy, pw, ph);
        var sprite = new PIXI.Sprite(texture);
        sprite.position.x = dx+20-5;
        sprite.position.y = dy - 12-10;
        sprite.width = width;
        sprite.height = height;
        this._windowContentsSprite.addChild(sprite);

        p(sprite)*/
    this.contents.blt(
      bitmap,
      x,
      y,
      bitmap.width,
      bitmap.height,
      dx + 18,
      dy - 20,
      width,
      height
    );
  };

  Game_Interpreter.prototype.recoAll = function () {
    var info = DataManager._globalInfo;
    if (!info) {
      return;
    }
    info[99] = info[99] || {};
    for (var i = 200; i < 300; i++) {
      info[99][i] = true;
    }

    for (var i = 600; i < 2000; i++) {
      info[99][i] = true;
    }
    DataManager.saveGlobalInfo(info);
  };

  Game_Interpreter.prototype.reco = function (switch_id) {
    p("回想登録:" + switch_id);
    var info = DataManager._globalInfo;
    if (!info) {
      p("失敗");
      return;
    }
    info[99] = info[99] || {};
    if (info[99][switch_id]) {
      return;
    }
    info[99][switch_id] = true;
    DataManager.saveGlobalInfo();
  };
})();

function recoGlobal(switch_id) {
  p("回想登録:" + switch_id);

  var info = DataManager._globalInfo;
  info[99] = info[99] || {};
  if (info[99][switch_id]) {
    return;
  }
  info[99][switch_id] = true;
  DataManager.saveGlobalInfo();
}
function hasFreeHFlah() {
  var info = DataManager._globalInfo;
  info[99] = info[99] || {};
  return info[99][998];
}

DataManager.selectSavefileForNewGame = function () {
  var globalInfo = this._globalInfo;
  this._lastAccessedId = 1;
  if (globalInfo) {
    var numSavefiles = 0;
    for (var i = 1; i <= globalInfo.length; i++) {
      if (i > 20) {
        break;
      }
      if (globalInfo[i]) {
        numSavefiles = i;
      }
    }
    if (numSavefiles < this.maxSavefiles()) {
      this._lastAccessedId = numSavefiles + 1;
    } else {
      var timestamp = Number.MAX_VALUE;
      for (var i = 1; i < globalInfo.length; i++) {
        if (!globalInfo[i]) {
          this._lastAccessedId = i;
          break;
        }
        if (i > 20) {
          break;
        }
        if (globalInfo[i].timestamp < timestamp) {
          timestamp = globalInfo[i].timestamp;
          this._lastAccessedId = i;
        }
      }
    }
  }
};
