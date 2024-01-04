//=============================================================================
// Nore_Tes.js
//=============================================================================
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//=============================================================================
/*:ja
 * @target MZ
 * @author ル
 * @plugindesc テキストファイルでツクールのイベントを記述するプラグインです。
 * 「睡工房」さんの TES の不完全移植版です。
 * @base Nore_TesValidator
 * @url https://ci-en.dlsite.com/creator/276
 *
 *
 * @param scenarioFolder
 * @desc シナリオファイルがある場所を設定します
 * @type string
 * @default /../scenario/
 *
 * @param conversionKey
 * @desc 変換を行うキーです。テストプレイ中のみ有効です
 * @type select
 * @option F4 キー
 * @value 115
 * @option F6 キー
 * @value 117
 * @option F7 キー
 * @value 118
 * @option F9 キー
 * @value 120
 * @option F10 キー
 * @value 121
 * @option F11 キー
 * @value 122
 * @default 118
 *
 * @param customFadeInOut
 * @desc フェードイン、フェードアウトの拡張を行います。
 * 他のプラグインと競合する場合は OFF に設定してください。
 * @type boolean
 * @default true
 *
 * @param actor1
 * @desc IDが1のアクターの会話を指定するコマンドを設定できます
 * @type string
 * @default リード
 *
 * @param actor2
 * @desc IDが2のアクターの会話を指定するコマンドを設定できます
 * @type string
 * @default プリシア
 *
 * @param actor3
 * @desc IDが3のアクターの会話を指定するコマンドを設定できます
 * @type string
 * @default ゲイル
 *
 * @param actor4
 * @desc IDが4のアクターの会話を指定するコマンドを設定できます
 * @type string
 * @default ミシェル
 *
 * @param actor5
 * @desc IDが5のアクターの会話を指定するコマンドを設定できます
 * @type string
 * @default アルベール
 *
 * @param actor6
 * @desc IDが6のアクターの会話を指定するコマンドを設定できます
 * @type string
 * @default ケイシー
 *
 * @param actor7
 * @desc IDが7のアクターの会話を指定するコマンドを設定できます
 * @type string
 * @default エリオット
 *
 * @param actor8
 * @desc IDが8のアクターの会話を指定するコマンドを設定できます
 * @type string
 * @default ローザ
 *
 * @param actor9
 * @desc IDが9のアクターの会話を指定するコマンドを設定できます
 * @type string
 * @default
 *
 * @param actor10
 * @desc IDが10のアクターの会話を指定するコマンドを設定できます
 * @type string
 * @default
 *
 * @param actor11
 * @desc IDが11のアクターの会話を指定するコマンドを設定できます
 * @type string
 * @default
 *
 * @param actor12
 * @desc IDが12のアクターの会話を指定するコマンドを設定できます
 * @type string
 * @default
 *
 * @param actor13
 * @desc IDが13のアクターの会話を指定するコマンドを設定できます
 * @type string
 * @default
 *
 * @param actor14
 * @desc IDが14のアクターの会話を指定するコマンドを設定できます
 * @type string
 * @default
 *
 * @param actor15
 * @desc IDが15のアクターの会話を指定するコマンドを設定できます
 * @type string
 * @default
 *
 * @param actor16
 * @desc IDが16のアクターの会話を指定するコマンドを設定できます
 * @type string
 * @default
 *
 * @param actor17
 * @desc IDが17のアクターの会話を指定するコマンドを設定できます
 * @type string
 * @default
 *
 * @param actor18
 * @desc IDが18のアクターの会話を指定するコマンドを設定できます
 * @type string
 * @default
 *
 * @param actor19
 * @desc IDが19のアクターの会話を指定するコマンドを設定できます
 * @type string
 * @default
 *
 * @param actor20
 * @desc IDが20のアクターの会話を指定するコマンドを設定できます
 * @type string
 * @default
 *
 * @param actor21
 * @desc IDが21のアクターの会話を指定するコマンドを設定できます
 * @type string
 * @default
 *
 * @param actor22
 * @desc IDが22のアクターの会話を指定するコマンドを設定できます
 * @type string
 * @default
 *
 * @param actor23
 * @desc IDが23のアクターの会話を指定するコマンドを設定できます
 * @type string
 * @default
 *
 * @param actor24
 * @desc IDが24のアクターの会話を指定するコマンドを設定できます
 * @type string
 * @default
 *
 * @param actor25
 * @desc IDが25のアクターの会話を指定するコマンドを設定できます
 * @type string
 * @default
 *
 *
 * @param actor26
 * @desc IDが26のアクターの会話を指定するコマンドを設定できます
 * @type string
 * @default
 *
 * @param actor27
 * @desc IDが27のアクターの会話を指定するコマンドを設定できます
 * @type string
 * @default
 *
 * @param actor28
 * @desc IDが28のアクターの会話を指定するコマンドを設定できます
 * @type string
 * @default
 *
 * @param actor29
 * @desc IDが29のアクターの会話を指定するコマンドを設定できます
 * @type string
 * @default
 *
 *
 * @param actor30
 * @desc IDが30のアクターの会話を指定するコマンドを設定できます
 * @type string
 * @default
 *
 * @param actor31
 * @desc IDが31のアクターの会話を指定するコマンドを設定できます
 * @type string
 * @default
 *
 * @param actor32
 * @desc IDが32のアクターの会話を指定するコマンドを設定できます
 * @type string
 * @default
 *
 * @param actor33
 * @desc IDが33のアクターの会話を指定するコマンドを設定できます
 * @type string
 * @default
 *
 * @param actor34
 * @desc IDが34のアクターの会話を指定するコマンドを設定できます
 * @type string
 * @default
 *
 * @param actor35
 * @desc IDが35のアクターの会話を指定するコマンドを設定できます
 * @type string
 * @default
 *
 * @param actor36
 * @desc IDが36のアクターの会話を指定するコマンドを設定できます
 * @type string
 * @default
 *
 * @param actor37
 * @desc IDが37のアクターの会話を指定するコマンドを設定できます
 * @type string
 * @default
 *
 * @param actor38
 * @desc IDが38のアクターの会話を指定するコマンドを設定できます
 * @type string
 * @default
 *
 * @param actor39
 * @desc IDが39のアクターの会話を指定するコマンドを設定できます
 * @type string
 * @default
 *
 * @param actor40
 * @desc IDが40のアクターの会話を指定するコマンドを設定できます
 * @type string
 * @default
 *
 * @param actor41
 * @desc IDが41のアクターの会話を指定するコマンドを設定できます
 * @type string
 * @default
 *
 * @param actor42
 * @desc IDが42のアクターの会話を指定するコマンドを設定できます
 * @type string
 * @default
 *
 * @param actor43
 * @desc IDが43のアクターの会話を指定するコマンドを設定できます
 * @type string
 * @default
 *
 * @param actor44
 * @desc IDが44のアクターの会話を指定するコマンドを設定できます
 * @type string
 * @default
 *
 * @param actor45
 * @desc IDが45のアクターの会話を指定するコマンドを設定できます
 * @type string
 * @default
 *
 * @param actor46
 * @desc IDが46のアクターの会話を指定するコマンドを設定できます
 * @type string
 * @default
 *
 * @param actor47
 * @desc IDが47のアクターの会話を指定するコマンドを設定できます
 * @type string
 * @default
 *
 * @param actor48
 * @desc IDが48のアクターの会話を指定するコマンドを設定できます
 * @type string
 * @default
 *
 * @param actor49
 * @desc IDが49のアクターの会話を指定するコマンドを設定できます
 * @type string
 * @default
 *
 * @param actor50
 * @desc IDが50のアクターの会話を指定するコマンドを設定できます
 * @type string
 * @default
 *
 * @param actor51
 * @desc IDが51のアクターの会話を指定するコマンドを設定できます
 * @type string
 * @default
 *
 * @param actor52
 * @desc IDが52のアクターの会話を指定するコマンドを設定できます
 * @type string
 * @default
 *
 * @param actor53
 * @desc IDが53のアクターの会話を指定するコマンドを設定できます
 * @type string
 * @default
 *
 * @param actor54
 * @desc IDが54のアクターの会話を指定するコマンドを設定できます
 * @type string
 * @default
 *
 * @param actor55
 * @desc IDが55のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor56
 * @desc IDが56のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor57
 * @desc IDが57のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor58
 * @desc IDが58のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor59
 * @desc IDが59のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor60
 * @desc IDが60のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor61
 * @desc IDが61のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor62
 * @desc IDが62のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor63
 * @desc IDが63のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor64
 * @desc IDが64のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor65
 * @desc IDが65のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor66
 * @desc IDが66のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor67
 * @desc IDが67のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor68
 * @desc IDが68のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor69
 * @desc IDが69のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor70
 * @desc IDが70のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor71
 * @desc IDが71のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor72
 * @desc IDが72のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor73
 * @desc IDが73のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor74
 * @desc IDが74のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor75
 * @desc IDが75のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor76
 * @desc IDが76のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor77
 * @desc IDが77のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor78
 * @desc IDが78のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor79
 * @desc IDが79のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor80
 * @desc IDが80のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor81
 * @desc IDが81のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor82
 * @desc IDが82のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor83
 * @desc IDが83のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor84
 * @desc IDが84のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor85
 * @desc IDが85のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor86
 * @desc IDが86のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor87
 * @desc IDが87のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor88
 * @desc IDが88のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor89
 * @desc IDが89のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor90
 * @desc IDが90のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor91
 * @desc IDが91のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor92
 * @desc IDが92のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor93
 * @desc IDが93のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor94
 * @desc IDが94のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor95
 * @desc IDが95のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor96
 * @desc IDが96のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor97
 * @desc IDが97のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor98
 * @desc IDが98のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor99
 * @desc IDが99のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor100
 * @desc IDが100のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor101
 * @desc IDが101のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor102
 * @desc IDが102のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor103
 * @desc IDが103のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor104
 * @desc IDが104のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor105
 * @desc IDが105のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor106
 * @desc IDが106のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor107
 * @desc IDが107のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor108
 * @desc IDが108のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor109
 * @desc IDが109のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor110
 * @desc IDが110のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor111
 * @desc IDが111のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor112
 * @desc IDが112のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor113
 * @desc IDが113のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor114
 * @desc IDが114のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor115
 * @desc IDが115のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor116
 * @desc IDが116のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor117
 * @desc IDが117のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor118
 * @desc IDが118のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor119
 * @desc IDが119のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor120
 * @desc IDが120のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor133
 * @desc IDが133のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor134
 * @desc IDが134のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor135
 * @desc IDが135のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor136
 * @desc IDが136のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor137
 * @desc IDが137のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor138
 * @desc IDが138のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor139
 * @desc IDが139のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor140
 * @desc IDが140のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor141
 * @desc IDが141のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor142
 * @desc IDが142のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor143
 * @desc IDが143のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor144
 * @desc IDが144のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor145
 * @desc IDが145のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor146
 * @desc IDが146のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor147
 * @desc IDが147のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor148
 * @desc IDが148のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor149
 * @desc IDが149のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor150
 * @desc IDが150のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor151
 * @desc IDが151のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor152
 * @desc IDが152のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor153
 * @desc IDが153のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor154
 * @desc IDが154のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor155
 * @desc IDが155のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor156
 * @desc IDが156のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor157
 * @desc IDが157のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor158
 * @desc IDが158のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor159
 * @desc IDが159のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor160
 * @desc IDが160のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor161
 * @desc IDが161のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor162
 * @desc IDが162のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor163
 * @desc IDが163のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor164
 * @desc IDが164のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor165
 * @desc IDが165のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor166
 * @desc IDが166のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor167
 * @desc IDが167のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor168
 * @desc IDが168のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor169
 * @desc IDが169のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor170
 * @desc IDが170のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor171
 * @desc IDが171のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor172
 * @desc IDが172のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor173
 * @desc IDが173のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor174
 * @desc IDが174のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor175
 * @desc IDが175のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor176
 * @desc IDが176のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor177
 * @desc IDが177のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor178
 * @desc IDが178のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor179
 * @desc IDが179のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor180
 * @desc IDが180のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor181
 * @desc IDが181のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor182
 * @desc IDが182のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor183
 * @desc IDが183のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor184
 * @desc IDが184のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor185
 * @desc IDが185のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor186
 * @desc IDが186のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor187
 * @desc IDが187のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor188
 * @desc IDが188のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor189
 * @desc IDが189のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor190
 * @desc IDが190のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor191
 * @desc IDが191のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor192
 * @desc IDが192のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor193
 * @desc IDが193のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor194
 * @desc IDが194のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor195
 * @desc IDが195のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor196
 * @desc IDが196のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor197
 * @desc IDが197のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @param actor198
 * @desc IDが198のアクターの会話を指定するコマンドを設定できます
 * @type string
 *
 * @command Run
 * @text 実行
 * @des イベントファイルの実行。
 * @arg id
 * @text ファイル名
 * @desc 実行するイベントファイルのファイル名
 *
 * @command Run自動2回目以降
 * @text 実行(2回目以降が付与)
 * @des イベントファイルの実行。
 * @arg id
 * @text ファイル名
 * @desc 実行するイベントファイルのファイル名
 *
 * @help
 * Ver 0.1.0
 *
 * 睡工房さんのTES　と互換があるようにしています。
 * http://hime.be/rgss3/tes.html
 * リファレンスも、↑をご覧ください。
 * ただし、未実装箇所が多くあります。
 *
 * ■使い方
 * プロジェクトフォルダと同じディレクトリに
 * scenario フォルダを作成します。
 * その中に.txt ファイルを作成し、イベントを書いていきます。
 *
 * （テキストファイルの改行コードは何でも大丈夫ですが、
 * 　文字コードは UTF-8 でお願いします。）
 *
 * その後、ツクールの開発環境からゲームを起動し、
 * F7キーを押すことで変換が完了します。
 *
 //**************************************************************************
 //　MZ拡張
 //**************************************************************************
 *  plugin
 *  ＞プラグインのイベントコマンドです
 * 　■パラメータ
 *      name: string
 *        →プラグイン名
 *      command: string
 *        →コマンド名
 *      args: string(JSON形式)空白が入るとエラーになります。空の場合は {} を指定
 *        →引数
 *
 *
 //**************************************************************************
 //　独自コマンド
 //**************************************************************************
 * 　n1 n2 n3 ... n99
 * 　＞アクターによる会話を表示します。n の後の数字はアクターIDです。
 * 　　■パラメータ
 * 　　　name: string
 * 　　　　→表示する名前
 *      actor: string
 *        →顔画像ファイル名
 *      index: number
 *        →顔画像ファイルインデックス
 *
 * 　turn_left
 * 　turn_right
 * 　turn_up
 * 　turn_down
 * 　＞キャラクターが向きを変えます。
 * 　　@route_h event=-1 skip=true wait=true
 * 　　@route type=turn_XXX
 * 　　と同じです。
 * 　　■パラメータ
 * 　　　event: number
 * 　　　　→イベントID。デフォルトは-1
 * 　　　skil: boolean
 * 　　　　→デフォルトはtrue
 * 　　　wait: boolean
 * 　　　　→デフォルトはtrue
 *
 * 　move_left
 * 　move_right
 * 　move_up
 * 　move_down
 * 　＞キャラクターが移動します。
 * 　　@route_h event=-1 skip=true wait=true
 * 　　@route type=left or right or up or down
 * 　　と同じです。
 * 　　■パラメータ
 * 　　　event: number
 * 　　　　→イベントID。デフォルトは-1
 * 　　　skil: boolean
 * 　　　　→デフォルトはtrue
 * 　　　wait: boolean
 * 　　　　→デフォルトはtrue
 //**************************************************************************
 //　独自拡張
 //**************************************************************************
 * fadeout
 * →time を指定できるようにしました
 *
 * fadein
 * →time を指定できるようにしました
 *
 * イベント実装状況(○→実装済み)
 //**************************************************************************
 //　メッセージ系
 //**************************************************************************
 *○　message_h (name=>表示する名前)
 *○　choice_h
 *○　choice_if
 *○　choice_cancel
 *○　choice_end
 *○　input_num
 *○　choice_item  (type=>1: アイテム, 2:大事なもの, 3:隠しアイテムA, 4:隠しアイテムB)
 *○　scroll_h
//**************************************************************************
//　ゲーム進行系
//**************************************************************************
 *○　sw
 *○　var
 *　　var_random
 *　　var_item
 *　　var_weapon
 *　　var_armor
 *　　var_actor
 *　　var_enemy
 *　　var_character
 *　　var_party
 *　　var_other
 *　　var_script
 *○　self_sw
 *○　timer
//**************************************************************************
//　フロー制御系
//**************************************************************************
 *○　if_sw
 *○　if_var
 *○　if_self_sw
 *○　if_timer
 *○　if_enemy
 *○　if_character
 *○　if_vehicle
 *○　if_money
 *○　if_item
 *○　if_weapon
 *○　if_armor
 *○　if_button
 *○　if_script
 *○　else
 *○　loop
 *○　loop_end
 *○　loop_break
 *○　event_break
 *○　return
 *○　common
 *○　label
 *○　label_jump
 *　　comment
 *　　comment2
//**************************************************************************
//　パーティ系
//**************************************************************************
 *○　money
 *○　item
 *○　weapon
 *○　armor
 *　　member
//**************************************************************************
//　アクター系
//**************************************************************************
 *　　hp
 *　　mp
 *　　state
 *○　all_recovery
 *○　exp
 *○　level
 *　　capability
 *　　skill
 *　　equip
 *○　name
 *○　class
 *○　nickname
//**************************************************************************
//　移動系
//**************************************************************************
 *○　map_move
 *○　vehicle_pos
 *○　event_pos
 *○　scroll_map
 *○　route_h
 *○　route
 *○　vehicle
//**************************************************************************
//　キャラクター系
//**************************************************************************
 *○　transparent
 *○　followers
 *○　gather
 *○　anime
 *○　balloon
 *○　erace
//**************************************************************************
//　画面効果系
//**************************************************************************
 *○　fadeout
 *○　fadein
 *○　tone
 *○　flash
 *○　shake
//**************************************************************************
//　時間調整系
//**************************************************************************
 *○　wait
//**************************************************************************
//　ピクチャと天候系
//**************************************************************************
 *○　picture
 *○　picture_move
 *○　picture_rotation
 *○　picture_tone
 *○　picture_erace
 *○　weather
//**************************************************************************
//　音楽と効果音系
//**************************************************************************
 *○　bgm
 *○　fadeout_bgm
 *○　save_bgm
 *○　resume_bgm
 *○　bgs
 *○　fadeout_bgs
 *○　me
 *○　se
//**************************************************************************
//　シーン制御系
//**************************************************************************
 *　　battle
 *　　battle_win
 *　　battle_escape
 *　　battle_loss
 *　　battle_end
 *　　shop
 *　　input_name
 *○　menu_open
 *○　save_open
 *○　gameover
 *○　title_return
//**************************************************************************
//　システム設定系
//**************************************************************************
 *　　battle_bgm
 *　　battle_end_me
 *○　save_disable
 *○　menu_disable
 *○　encount_disable
 *○　formation_disable
 *　　window_color
 *　　actor_graphic
 *　　vehicle_graphic
//**************************************************************************
//　ムービー系
//**************************************************************************
 *○　movie
//**************************************************************************
//　マップ系
//**************************************************************************
 *　　map_name_disable
 *　　tileset
 *　　battle_background
 *　　parallax
 *　　pos_info
//**************************************************************************
//　バトル系
//**************************************************************************
 *　　enemy_hp
 *　　enemy_mp
 *　　enemy_state
 *　　enemy_all_recovery
 *　　enemy_appear
 *　　enemy_trans
 *　　battle_anime
 *　　force
 *　　battle_abort
//**************************************************************************
//　上級系
//**************************************************************************
 *　　script
 *△　plugin
//**************************************************************************
//　その他
//**************************************************************************
 *○　end
 *
 * ・利用規約
 * 作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 * についても制限はありません。
 * このプラグインはもうあなたのものです。
 */
var Nore;
(function (Nore) {
  var Tes;
  (function (Tes) {
    var parameters = PluginManager.parameters("Nore_Tes");
    var CONVERSION_KEY = parseInt(parameters["conversionKey"]);
    var COSTOM_FADE_IN_OUT =
      parameters["customFadeInOut"].toLowerCase() === "true";
    var AUTO_WARD_WRAP = parameters["autoWordWrap"] === "true";
    var ACTOR_NAME_MAP = [];
    for (var i = 1; i <= 198; i++) {
      ACTOR_NAME_MAP[i] = parameters["actor" + i] || "";
    }
    var fs;
    var path;
    if (Utils.isNwjs()) {
      fs = require("fs");
      path = require("path");
    }
    var pathParam = parameters["scenarioFolder"];
    var SCENARIO_FOLDER_NAME = "scenario";
    Tes.SCENARIO_FILE_NAME = "Scenario.json";
    Tes.SCENARIO_FILE_NAME_EN = "Scenario_en.json";
    Tes.SCENARIO_SRC_PATH = (function () {
      var p = window.location.pathname.replace(/(\/www|)\/[^\/]*$/, pathParam);
      if (p.match(/^\/([A-Z]\:)/)) {
        p = p.slice(1);
      }
      var result = decodeURIComponent(p);
      if (result[0] == "/") {
        return "." + result;
      }
      return result;
    })();
    Tes.SCENARIO_SRC_PATH_EN = (function () {
      var p = window.location.pathname.replace(
        /(\/www|)\/[^\/]*$/,
        "/../scenario_en/"
      );
      if (p.match(/^\/([A-Z]\:)/)) {
        p = p.slice(1);
      }
      var result = decodeURIComponent(p);
      if (result[0] == "/") {
        return "." + result;
      }
      return result;
    })();
    Tes.DATA_PATH = (function () {
      var p = window.location.pathname.replace(
        /(\/www|)\/[^\/]*$/,
        "/" + SCENARIO_FOLDER_NAME + "/"
      );
      if (p.match(/^\/([A-Z]\:)/)) {
        p = p.slice(1);
      }
      var result = decodeURIComponent(p);
      if (result[0] == "/") {
        return "." + result;
      }
      return result;
    })();
    DataManager.loadScenarioFile = function (name, src) {
      var _this = this;
      var xhr = new XMLHttpRequest();
      var url = SCENARIO_FOLDER_NAME + "/" + src;
      window[name] = null;
      xhr.open("GET", url);
      xhr.overrideMimeType("application/json");
      xhr.onload = function () {
        return _this.onXhrLoad(xhr, name, src, url);
      };
      xhr.onerror = function () {
        return _this.onXhrError(name, src, url);
      };
      xhr.send();
    };
    Tes.loadScenarioFile = true;
    var _DataManager_loadDatabase = DataManager.loadDatabase;
    DataManager.loadDatabase = function () {
      if (Tes.loadScenarioFile) {
        this.loadScenarioFile("$dataScenario", Tes.SCENARIO_FILE_NAME);
        this.loadScenarioFile("$dataScenario_en", Tes.SCENARIO_FILE_NAME_EN);
      }
      _DataManager_loadDatabase.call(this);
    };
    var pluginName = "Nore_Tes";
    PluginManager.registerCommand(pluginName, "Run", function (args) {
      var id = args.id + "";
      var normalized = id.normalize("NFC");
      switch (ConfigManager.language) {
        case "en":
          var list_1 = $dataScenario["en_" + normalized];
          if (list_1) {
            console.log(
              "english Scenario \u30B3\u30DE\u30F3\u30C9\u5B9F\u884C: " + id
            );
            this.setupChild(list_1, this._eventId);
            return;
          }
          var list2 = $dataScenario_en[normalized];
          if (list2) {
            console.log(
              "Scenario en \u30B3\u30DE\u30F3\u30C9\u5B9F\u884C: " + id
            );
            this.setupChild(list2, this._eventId);
            return;
          }
          break;
      }
      var list = $dataScenario[normalized];
      if (!list) {
        throw new Error("id:" + id + " のデータが見つかりません");
      }
      console.log("Scenario \u30B3\u30DE\u30F3\u30C9\u5B9F\u884C: " + id);
      this.setupChild(list, this._eventId);
    });
    PluginManager.registerCommand(
      pluginName,
      "Run自動2回目以降",
      function (args) {
        var postfix = $gameSwitches.value(1000) ? "_2回目以降" : "";
        var id = args.id + postfix;
        var normalized = id.normalize("NFC");
        switch (ConfigManager.language) {
          case "en":
            var list_2 = $dataScenario["en_" + normalized];
            if (list_2) {
              console.log(
                "english Scenario \u30B3\u30DE\u30F3\u30C9\u5B9F\u884C: " + id
              );
              this.setupChild(list_2, this._eventId);
              return;
            }
            break;
        }
        var list = $dataScenario[normalized];
        if (!list) {
          throw new Error("id:" + id + " のデータが見つかりません");
        }
        console.log("Scenario \u30B3\u30DE\u30F3\u30C9\u5B9F\u884C: " + id);
        this.setupChild(list, this._eventId);
      }
    );
    var _SceneManager_onKeyDown = SceneManager.onKeyDown;
    SceneManager.onKeyDown = function (event) {
      _SceneManager_onKeyDown.call(this, event);
      if (!$gameTemp || !$gameTemp.isPlaytest()) {
        return;
      }
      if (!event.ctrlKey && !event.altKey) {
        if (event.keyCode == CONVERSION_KEY) {
          var converter = new Scenario_Converter();
          converter.convertAll();
          SoundManager.playSave();
        }
      }
    };
    var _DataManager_checkError = DataManager.checkError;
    DataManager.checkError = function () {
      if (this._errors.length > 0) {
        for (var i = 0; i < this._errors.length; i++) {
          var error = this._errors[i];
          if (error.url.indexOf(Tes.SCENARIO_FILE_NAME) >= 0) {
            console.error("Failed to load: " + error.url);
            this._errors.splice(i, 1);
            break;
          }
        }
      }
      _DataManager_checkError.call(this);
    };
    /**
     * イベントテキストをMZで使えるJSON形式に変換するクラスです
     */
    var Scenario_Converter = /** @class */ (function () {
      function Scenario_Converter(isJp) {
        if (isJp === void 0) {
          isJp = true;
        }
        this._isJp = isJp;
      }
      /**
       * 全てのイベントを変換します。
       */
      Scenario_Converter.prototype.convertAll = function () {
        var self = this;
        this._replaceMap = {};
        var scenario = {};
        var srcPath;
        if (this._isJp) {
          srcPath = Tes.SCENARIO_SRC_PATH;
        } else {
          srcPath = Tes.SCENARIO_SRC_PATH_EN;
          p("英語変換");
        }
        fs.readdir(srcPath, function (err, files) {
          if (err) {
            console.error(err.message);
            return;
          }
          if (!files) {
            return;
          }
          try {
            self.convertReplace(files);
            self.convertFiles(srcPath, files, scenario);
            //console.log(scenario);
            if (!fs.existsSync(Tes.DATA_PATH)) {
              fs.mkdirSync(Tes.DATA_PATH);
            }
            if (self._isJp) {
              fs.writeFileSync(
                Tes.DATA_PATH + "Scenario.json",
                JSON.stringify(scenario)
              );
              DataManager.loadScenarioFile(
                "$dataScenario",
                Tes.SCENARIO_FILE_NAME
              );
              DataManager.loadScenarioFile(
                "$dataScenario_en",
                Tes.SCENARIO_FILE_NAME_EN
              );
              console.log("Nore_TES の変換が終わりました");
            } else {
              fs.writeFileSync(
                Tes.DATA_PATH + "Scenario_en.json",
                JSON.stringify(scenario)
              );
            }
          } catch (e) {
            console.error(e);
          }
        });
      };
      Scenario_Converter.prototype.convertFiles = function (
        basePath,
        files,
        scenario
      ) {
        if (!files) {
          return;
        }
        for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
          var file = files_1[_i];
          var filePath = path.resolve(basePath, file);
          var stat = fs.statSync(filePath);
          if (stat.isDirectory()) {
            var files2 = fs.readdirSync(filePath);
            this.convertFiles(filePath + "/", files2, scenario);
            continue;
          }
          var name_1 = this.parseValidFileName(file);
          if (!name_1) {
            continue;
          }
          var text = fs.readFileSync(basePath + file, "utf8");
          scenario[name_1.normalize("NFC")] = this.convert(file, text);
        }
      };
      /**
       * 指定のファイルがイベントファイルかどうかを返します
       */
      Scenario_Converter.prototype.parseValidFileName = function (file) {
        if (file.indexOf("replace.txt") === 0) {
          return;
        }
        var index = file.indexOf(".txt");
        if (index === -1) {
          index = file.indexOf(".sce");
        }
        if (index === -1) {
          return null;
        }
        var name = file.substr(0, index);
        return name;
      };
      /**
       * replace ファイルを変換します
       */
      Scenario_Converter.prototype.convertReplace = function (files) {
        for (var _i = 0, files_2 = files; _i < files_2.length; _i++) {
          var file = files_2[_i];
          var index = file.indexOf("replace.txt");
          if (index === -1) {
            continue;
          }
          var name_2 = file.substr(0, index);
          var text = fs.readFileSync(Tes.SCENARIO_SRC_PATH + file, "utf8");
          this.parseReplace(text);
          return;
        }
      };
      Scenario_Converter.prototype.parseReplace = function (text) {
        var lines = text.split(/\r\n|\r|\n/);
        for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
          var line = lines_1[_i];
          if (line.indexOf("//") === 0) {
            continue;
          }
          var chars = line.split(/\s/);
          if (chars.length < 2) {
            continue;
          }
          this._replaceMap[chars[0]] = chars[chars.length - 1];
        }
        //console.log(this._replaceMap)
      };
      Scenario_Converter.prototype.connectMultiLines = function (lines) {
        var result = [];
        for (var i = 0; i < lines.length; i++) {
          var line = lines[i];
          while (
            line[line.length - 1] == "," &&
            !isNaN(line[line.length - 2])
          ) {
            i++;
            if (lines[i]) {
              line = line + this.removeWS(lines[i].replace(/^\uFEFF/, ""));
            } else {
              break;
            }
          }
          result.push(line);
        }
        return result;
      };
      Scenario_Converter.prototype.convert = function (file, text) {
        this.initFile();
        var list = [];
        var srcLines = text.split(/\r\n|\r|\n/);
        srcLines = this.connectMultiLines(srcLines);
        var blocks = [];
        var lastHeader = "@normal_messages";
        var lines = [];
        for (var i = 0; i < srcLines.length; i++) {
          var line = srcLines[i];
          line = line.replace(/^\uFEFF/, "");
          line = this.removeWS(line);
          if (line.indexOf("//") === 0) {
            continue;
          }
          if (line.indexOf("#") === 0) {
            continue;
          }
          lines.push(line);
        }
        for (var i = 0; i < lines.length; i++) {
          var line = lines[i];
          if (line.length === 0) {
            continue;
          }
          var block = new Block(i + 1);
          blocks.push(block);
          if (line.indexOf("@") === 0) {
            block.header = line;
            lastHeader = line;
            if (
              line.indexOf("@choice_if") >= 0 ||
              line.indexOf("@choice_h") >= 0
            ) {
              continue;
            }
            var offset = 1;
            if (i + offset === lines.length) {
              break;
            }
            lines[i + offset] = this.removeWS(lines[i + offset]);
            while (
              i + offset < lines.length &&
              (lines[i + offset].indexOf("@") !== 0 ||
                lines[i + offset].indexOf("@route") !== -1) &&
              lines[i + offset].length > 0
            ) {
              block.pushMsg(this.removeWS(lines[i + offset]));
              offset++;
              if (i + offset < lines.length) {
                lines[i + offset] = this.removeWS(lines[i + offset]);
              }
            }
            i += offset - 1;
          } else {
            block.header = lastHeader; //'@normal_messages';
            var offset = 0;
            while (
              i + offset < lines.length &&
              lines[i + offset].indexOf("@") !== 0 &&
              lines[i + offset].length > 0
            ) {
              block.pushMsg(this.removeWS(lines[i + offset]));
              offset++;
            }
            if (offset >= 1) {
              i += offset - 1;
            }
          }
        }
        var context = new Context(file, 0, "start", list, null, null);
        for (var _i = 0, blocks_1 = blocks; _i < blocks_1.length; _i++) {
          var block = blocks_1[_i];
          this.convertCommand(file, list, block);
        }
        context.insertTop({
          code: 355,
          indent: this.indent,
          parameters: ["$gameTemp.ninshinTotal='" + this._ninshinTotal + "'"],
        });
        this.convertCommand_null(list);
        return list;
      };
      Scenario_Converter.prototype.initFile = function () {
        this._defaultMobNameMap = {};
        this._defaultMobFaceMap = {};
        this.indent = 0;
      };
      /**
       * ホワイトスペースを削除します。
       */
      Scenario_Converter.prototype.removeWS = function (line) {
        var ret = line.replace(/^[\x20|\t]+/g, "");
        if (ret === "_") {
          return "　";
        } else {
          return ret;
        }
      };
      /**
       * コマンドを変換します。
       */
      Scenario_Converter.prototype.convertCommand = function (
        file,
        list,
        block
      ) {
        var headerList = block.header.split(/\s/g);
        var command = headerList[0].substr(1);
        var header = this.parseHeader(headerList, false);
        var context = new Context(
          file,
          block.lineNumber,
          command,
          list,
          header,
          block.data
        );
        var n = /n(\d+)/.exec(command);
        var m = /m(\d+)/.exec(command);
        var mob = /mob(\d+)/.exec(command);
        try {
          this.validate(context);
          if (n) {
            this["convertCommand_n"](parseInt(n[1]), context);
          } else if (m) {
            this["convertCommand_m"](parseInt(m[1]), context);
          } else if (mob) {
            this["convertCommand_mob"](parseInt(mob[1]), context);
          } else if (command == "") {
            this["convertCommand_normal_messages"](context);
          } else {
            if (
              command === "n" ||
              command === "a" ||
              command === "m" ||
              command === "mob"
            ) {
              context.error("のコマンドが存在しません");
            } else if (!this["convertCommand_" + command]) {
              var actorIndex = ACTOR_NAME_MAP.indexOf(command);
              if (actorIndex > 0) {
                this["convertCommand_n"](actorIndex, context);
              } else {
                context.error(command + "のコマンドが存在しません");
              }
            } else {
              this["convertCommand_" + command](context);
            }
          }
        } catch (e) {
          console.error(command + "のコマンドでエラーが発生しました");
          console.error(file);
          console.log(e);
          console.log(e.stack);
          throw e;
        }
      };
      Scenario_Converter.prototype.convertCommand_mob = function (
        mobId,
        context
      ) {
        var name = context.headerStr("name");
        this._defaultMobNameMap[mobId] = name;
        var face = context.headerStr("actor");
        var index = context.headerInt("index", 0);
        if (face) {
          this._defaultMobFaceMap[mobId] = [face, index];
        }
      };
      Scenario_Converter.prototype.convertCommand_m = function (
        mobId,
        context
      ) {
        var name = this._defaultMobNameMap[mobId] || "";
        if (context.header["name"]) {
          name = context.headerStr("name");
        }
        var actor = "";
        var index = 0;
        var faceList = this._defaultMobFaceMap[mobId];
        if (faceList) {
          actor = faceList[0];
          index = faceList[1];
        }
        if (context.header["face"]) {
          actor = context.headerStr("face");
        }
        if (context.header["index"]) {
          index = context.headerInt("index");
        }
        context.push({
          code: 101,
          indent: this.indent,
          parameters: [actor, index, 0, 2, name],
        });
        for (var _i = 0, _a = context.data; _i < _a.length; _i++) {
          var msg = _a[_i];
          context.push({
            code: 401,
            indent: this.indent,
            parameters: [this.replaceMessage(msg)],
          });
        }
      };
      Scenario_Converter.prototype.convertCommand_normal_messages = function (
        context
      ) {
        this.convertCommand_n(0, context);
      };
      /**
       * コマンドのパラメータが正しいかどうかを検証します。
       * @param {Context} context [description]
       */
      Scenario_Converter.prototype.validate = function (context) {
        var validaor = Tes.validates[context.command];
        if (!validaor) {
          var actorIndex = ACTOR_NAME_MAP.indexOf(context.command);
          if (actorIndex > 0) {
            validaor = Tes.validates["n" + actorIndex];
          } else {
            console.error(
              context.command + "のコマンドの Validator が存在しません"
            );
            return;
          }
        }
        for (var paramName in validaor) {
          if (!validaor.hasOwnProperty(paramName)) {
            continue;
          }
          var vv = validaor[paramName];
          if (!vv) {
            console.error(
              context.command +
                " " +
                paramName +
                " \u306EValidator \u304C\u5B58\u5728\u3057\u307E\u305B\u3093"
            );
            continue;
          }
          if (Array.isArray(vv)) {
            var validatorList = vv;
            for (
              var _i = 0, validatorList_1 = validatorList;
              _i < validatorList_1.length;
              _i++
            ) {
              var v = validatorList_1[_i];
              if (!v) {
                console.error(
                  context.command +
                    " " +
                    paramName +
                    " \u306EValidator \u304C\u5B58\u5728\u3057\u307E\u305B\u3093"
                );
                continue;
              }
              v.validate(context, paramName, context.header[paramName]);
            }
          } else {
            vv.validate(context, paramName, context.header[paramName]);
          }
        }
      };
      /**
       * ヘッダをパースします。
       */
      Scenario_Converter.prototype.parseHeader = function (
        headerList,
        isActor
      ) {
        var result = {};
        for (var i = 1; i < headerList.length; i++) {
          var text = headerList[i];
          switch (text) {
            case "笑":
              result["index"] = 1;
              break;
            case "明":
              result["index"] = 2;
              break;
            case "困":
              result["index"] = 3;
              break;
            case "呆":
              result["index"] = 4;
              break;
            case "考":
              result["index"] = 5;
              break;
            case "驚":
              result["index"] = 6;
              break;
            case "怒":
              result["index"] = 7;
              break;
            case "悲":
              result["index"] = 8;
              break;
            case "恥":
              result["index"] = 9;
              break;
            case "叫":
              result["index"] = 10;
              break;
            case "閉":
              result["index"] = 11;
              break;
            case "苦":
              result["index"] = 12;
              break;
            case "giza":
              result["giza"] = 12;
              break;
          }
          var index = text.indexOf("=");
          var key = text.substr(0, index);
          var value = text.substr(index + 1);
          result[key] = value;
        }
        return new Header(result);
      };
      Scenario_Converter.prototype.convertCommand_null = function (list) {
        list.push({ code: 0, indent: 0, parameters: [] });
      };
      Scenario_Converter.prototype.convertCommand_move_down = function (
        context
      ) {
        var event = context.headerInt("event", -1);
        var skip = context.headerBool("skip", true);
        var wait = context.headerBool("wait", true);
        var list = [];
        list.push({ code: 1, indent: null, parameters: parameters });
        list.push({ code: 0 });
        var routes = { repeat: false, skippable: skip, wait: wait, list: list };
        context.push({
          code: 205,
          indent: this.indent,
          parameters: [event, routes],
        });
      };
      Scenario_Converter.prototype.convertCommand_move_left = function (
        context
      ) {
        var event = context.headerInt("event", -1);
        var skip = context.headerBool("skip", true);
        var wait = context.headerBool("wait", true);
        var list = [];
        list.push({ code: 2, indent: null, parameters: parameters });
        list.push({ code: 0 });
        var routes = { repeat: false, skippable: skip, wait: wait, list: list };
        context.push({
          code: 205,
          indent: this.indent,
          parameters: [event, routes],
        });
      };
      Scenario_Converter.prototype.convertCommand_move_right = function (
        context
      ) {
        var event = context.headerInt("event", -1);
        var skip = context.headerBool("skip", true);
        var wait = context.headerBool("wait", true);
        var list = [];
        list.push({ code: 3, indent: null, parameters: parameters });
        list.push({ code: 0 });
        var routes = { repeat: false, skippable: skip, wait: wait, list: list };
        context.push({
          code: 205,
          indent: this.indent,
          parameters: [event, routes],
        });
      };
      Scenario_Converter.prototype.convertCommand_move_up = function (context) {
        var event = context.headerInt("event", -1);
        var skip = context.headerBool("skip", true);
        var wait = context.headerBool("wait", true);
        var list = [];
        list.push({ code: 4, indent: null, parameters: parameters });
        list.push({ code: 0 });
        var routes = { repeat: false, skippable: skip, wait: wait, list: list };
        context.push({
          code: 205,
          indent: this.indent,
          parameters: [event, routes],
        });
      };
      Scenario_Converter.prototype.convertCommand_turn_down = function (
        context
      ) {
        var event = context.headerInt("event", -1);
        var skip = context.headerBool("skip", true);
        var wait = context.headerBool("wait", true);
        var list = [];
        list.push({ code: 16, indent: null, parameters: parameters });
        list.push({ code: 0 });
        var routes = { repeat: false, skippable: skip, wait: wait, list: list };
        context.push({
          code: 205,
          indent: this.indent,
          parameters: [event, routes],
        });
      };
      Scenario_Converter.prototype.convertCommand_turn_left = function (
        context
      ) {
        var event = context.headerInt("event", -1);
        var skip = context.headerBool("skip", true);
        var wait = context.headerBool("wait", true);
        var list = [];
        list.push({ code: 17, indent: null, parameters: parameters });
        list.push({ code: 0 });
        var routes = { repeat: false, skippable: skip, wait: wait, list: list };
        context.push({
          code: 205,
          indent: this.indent,
          parameters: [event, routes],
        });
      };
      Scenario_Converter.prototype.convertCommand_turn_right = function (
        context
      ) {
        var event = context.headerInt("event", -1);
        var skip = context.headerBool("skip", true);
        var wait = context.headerBool("wait", true);
        var list = [];
        list.push({ code: 18, indent: null, parameters: parameters });
        list.push({ code: 0 });
        var routes = { repeat: false, skippable: skip, wait: wait, list: list };
        context.push({
          code: 205,
          indent: this.indent,
          parameters: [event, routes],
        });
      };
      Scenario_Converter.prototype.convertCommand_turn_up = function (context) {
        var event = context.headerInt("event", -1);
        var skip = context.headerBool("skip", true);
        var wait = context.headerBool("wait", true);
        var list = [];
        list.push({ code: 19, indent: null, parameters: parameters });
        list.push({ code: 0 });
        var routes = { repeat: false, skippable: skip, wait: wait, list: list };
        context.push({
          code: 205,
          indent: this.indent,
          parameters: [event, routes],
        });
      };
      Scenario_Converter.prototype.convertCommand_step_anime_on = function (
        context
      ) {
        var event = context.headerInt("event", -1);
        var skip = context.headerBool("skip", true);
        var wait = context.headerBool("wait", true);
        var list = [];
        list.push({ code: 33, indent: null, parameters: parameters });
        list.push({ code: 0 });
        var routes = { repeat: false, skippable: skip, wait: wait, list: list };
        context.push({
          code: 205,
          indent: this.indent,
          parameters: [event, routes],
        });
      };
      Scenario_Converter.prototype.convertCommand_step_anime_off = function (
        context
      ) {
        var event = context.headerInt("event", -1);
        var skip = context.headerBool("skip", true);
        var wait = context.headerBool("wait", true);
        var list = [];
        list.push({ code: 34, indent: null, parameters: parameters });
        list.push({ code: 0 });
        var routes = { repeat: false, skippable: skip, wait: wait, list: list };
        context.push({
          code: 205,
          indent: this.indent,
          parameters: [event, routes],
        });
      };
      Scenario_Converter.prototype.convertCommand_n = function (
        actorId,
        context
      ) {
        var face = null;
        if (context.header["actor"]) {
          face = context.header["actor"];
        }
        var index = null;
        if (context.header["index"]) {
          index = context.headerInt("index");
        }
        var name = null;
        if (context.header["name"]) {
          name = context.header["name"];
        }
        this.convertCommand_messages(context, actorId, face, index, name);
      };
      Scenario_Converter.prototype.convertCommand_messages = function (
        context,
        faceActorId,
        argFaceFile,
        argFaceIndex,
        argName
      ) {
        if (faceActorId === void 0) {
          faceActorId = 0;
        }
        if (argFaceFile === void 0) {
          argFaceFile = null;
        }
        if (argFaceIndex === void 0) {
          argFaceIndex = null;
        }
        if (argName === void 0) {
          argName = null;
        }
        var faceName = "";
        var faceIndex = 0;
        var actorName = "";
        if (faceActorId > 0) {
          var actor = $gameActors.actor(faceActorId);
          if (!actor) {
            console.error(
              "IDが" + faceActorId + "のアクターが登録されていません"
            );
          }
          actorName = actor.name();
          faceName = actor.faceName();
          faceIndex = actor.faceIndex();
          if (argFaceIndex != null) {
            faceIndex = argFaceIndex;
          }
        }
        if (argFaceFile != null) {
          faceName = argFaceFile;
        }
        if (argFaceIndex) {
          faceIndex = argFaceIndex;
        }
        if (argName) {
          actorName = argName;
        }
        var back = context.headerInt("back", 0);
        var pos = this.convertPosMz(context.headerInt("pos", 0));
        context.push({
          code: 101,
          indent: this.indent,
          parameters: [faceName, faceIndex, back, pos, actorName],
        });
        for (var _i = 0, _a = context.data; _i < _a.length; _i++) {
          var msg = _a[_i];
          context.push({
            code: 401,
            indent: this.indent,
            parameters: [this.replaceMessage(msg)],
          });
        }
      };
      Scenario_Converter.prototype.convertPosMz = function (pos) {
        switch (pos) {
          case 0:
            return 2;
            break;
          case 1:
            return 1;
            break;
          case 2:
            return 0;
            break;
        }
        return 2;
      };
      Scenario_Converter.prototype.convertCommand_message_h = function (
        context
      ) {
        var actor = context.header["actor"] || "";
        var index = context.headerInt("index", 0);
        var back = context.headerInt("back", 0);
        var pos = this.convertPosMz(context.headerInt("pos", 0));
        var name = context.headerStr("name");
        context.push({
          code: 101,
          indent: this.indent,
          parameters: [actor, index, back, pos, name],
        });
        for (var _i = 0, _a = context.data; _i < _a.length; _i++) {
          var msg = _a[_i];
          context.push({ code: 401, indent: this.indent, parameters: [msg] });
        }
      };
      Scenario_Converter.prototype.replaceMessage = function (text) {
        for (var key in this._replaceMap) {
          if (!this._replaceMap.hasOwnProperty(key)) {
            continue;
          }
          var value = this._replaceMap[key];
          var regExp = new RegExp(key, "g");
          text = text.replace(regExp, value);
        }
        return text;
      };
      Scenario_Converter.prototype.convertCommand_choice_h = function (
        context
      ) {
        var labels = [];
        if (context.header["label1"]) {
          labels.push(context.header["label1"]);
        }
        if (context.header["label2"]) {
          labels.push(context.header["label2"]);
        }
        if (context.header["label3"]) {
          labels.push(context.header["label3"]);
        }
        if (context.header["label4"]) {
          labels.push(context.header["label4"]);
        }
        if (context.header["label5"]) {
          labels.push(context.header["label5"]);
        }
        if (context.header["label6"]) {
          labels.push(context.header["label6"]);
        }
        var cancelType = context.headerInt("cancel", 0) - 1; // -2
        var defaultType = context.headerInt("default", 0) - 1;
        var positionType = context.headerInt("position", 2);
        var background = context.headerInt("background", 0);
        context.push({
          code: 102,
          indent: this.indent,
          parameters: [
            labels,
            cancelType,
            defaultType,
            positionType,
            background,
          ],
        });
      };
      Scenario_Converter.prototype.convertCommand_choice_if = function (
        context
      ) {
        var index = context.headerInt("index") - 1;
        this.indent++;
        context.push({
          code: 402,
          indent: this.indent - 1,
          parameters: [index],
        });
      };
      Scenario_Converter.prototype.convertCommand_choice_cancel = function (
        context
      ) {
        this.indent++;
        context.push({ code: 403, indent: this.indent - 1, parameters: [] });
      };
      Scenario_Converter.prototype.convertCommand_choice_end = function (
        context
      ) {
        this.indent--;
        context.push({ code: 0, indent: this.indent, parameters: [] });
      };
      /**
       * ○ 数値入力
       */
      Scenario_Converter.prototype.convertCommand_input_num = function (
        context
      ) {
        var variable = context.headerInt("var");
        var num = context.headerInt("num");
        context.push({
          code: 103,
          indent: this.indent,
          parameters: [variable, num],
        });
      };
      /**
       * ○ アイテム選択の処理
       */
      Scenario_Converter.prototype.convertCommand_choice_item = function (
        context
      ) {
        var variable = context.headerInt("var");
        var type = context.headerInt("type", 2);
        context.push({
          code: 104,
          indent: this.indent,
          parameters: [variable, type],
        });
      };
      /**
       * ○ 文章スクロール表示（ヘッダー部）
       */
      Scenario_Converter.prototype.convertCommand_scroll_h = function (
        context
      ) {
        var noskip = context.headerBool("noskip", false);
        var speed = context.headerInt("speed");
        context.push({
          code: 105,
          indent: this.indent,
          parameters: [speed, noskip],
        });
        for (var _i = 0, _a = context.data; _i < _a.length; _i++) {
          var msg = _a[_i];
          context.push({ code: 405, indent: this.indent, parameters: [msg] });
        }
      };
      /**
       * ○ 条件分岐（スイッチ）
       */
      Scenario_Converter.prototype.convertCommand_if_sw = function (context) {
        this.indent++;
        var ifnum = 0;
        var id = context.headerInt("id");
        var flag = context.headerStr("flag", "on") === "on" ? 0 : 1;
        context.push({
          code: 111,
          indent: this.indent - 1,
          parameters: [ifnum, id, flag],
        });
      };
      /**
       * ○ 条件分岐（変数）
       */
      Scenario_Converter.prototype.convertCommand_if_var = function (context) {
        this.indent++;
        var ifnum = 1;
        var id = context.headerInt("id");
        var value = context.headerStr("value");
        var reg = /(var\.)/;
        var type = reg.exec(value) ? 1 : 0; //0:数値 1:変数
        var op =
          ["=", ">=", "<=", ">", "<", "><"].indexOf(context.headerStr("op")) ||
          0;
        if (type === 1 && parseInt(value) <= 0) {
          throw new Error("変数指定時に「0」以下が使われました。");
        }
        var valueNum = /(\d+)/.exec(value);
        context.push({
          code: 111,
          indent: this.indent - 1,
          parameters: [ifnum, id, type, parseInt(valueNum[0]), op],
        });
      };
      /**
       * ○ 条件分岐（セルフスイッチ）
       */
      Scenario_Converter.prototype.convertCommand_if_self_sw = function (
        context
      ) {
        this.indent++;
        var ifnum = 2;
        var id = context.headerStr("id");
        var flag = context.headerStr("flag", "on") === "on" ? 0 : 1;
        context.push({
          code: 111,
          indent: this.indent - 1,
          parameters: [ifnum, id, flag],
        });
      };
      /**
       * ○ 条件分岐（タイマー）
       */
      Scenario_Converter.prototype.convertCommand_if_timer = function (
        context
      ) {
        this.indent++;
        var ifnum = 3;
        var time = context.headerInt("time");
        var op = [">=", "<=", "<"].indexOf(context.headerStr("op")) || 0;
        context.push({
          code: 111,
          indent: this.indent - 1,
          parameters: [ifnum, time, op],
        });
      };
      /**
       * ○ 条件分岐（アクター）
       */
      Scenario_Converter.prototype.convertCommand_if_actor = function (
        context
      ) {
        this.indent++;
        var ifnum = 4;
        var id = context.headerInt("id");
        var type = 0;
        var value = 0;
        switch (context.headerStr("type")) {
          case "party":
            type = 0;
            value = 0;
            break;
          case "name":
            type = 1;
            value = context.headerInt("value");
            break;
          case "class":
            type = 2;
            new Tes.NotEmptyValidator().validate(
              context,
              "value",
              context.header["value"]
            );
            new Tes.NumericValidator(1).validate(
              context,
              "value",
              context.header["value"]
            );
            value = context.headerInt("value");
            break;
          case "skill":
            type = 3;
            new Tes.NotEmptyValidator().validate(
              context,
              "value",
              context.header["value"]
            );
            new Tes.NumericValidator(1).validate(
              context,
              "value",
              context.header["value"]
            );
            value = context.headerInt("value");
            break;
          case "weapon":
            type = 4;
            new Tes.NotEmptyValidator().validate(
              context,
              "value",
              context.header["value"]
            );
            new Tes.NumericValidator(1).validate(
              context,
              "value",
              context.header["value"]
            );
            value = context.headerInt("value");
            break;
          case "armor":
            type = 5;
            new Tes.NotEmptyValidator().validate(
              context,
              "value",
              context.header["value"]
            );
            new Tes.NumericValidator(1).validate(
              context,
              "value",
              context.header["value"]
            );
            value = context.headerInt("value");
            break;
          case "state":
            type = 6;
            new Tes.NotEmptyValidator().validate(
              context,
              "value",
              context.header["value"]
            );
            new Tes.NumericValidator(1).validate(
              context,
              "value",
              context.header["value"]
            );
            value = context.headerInt("value");
            break;
          default:
            type = 0;
            value = 0;
            break;
        }
        context.push({
          code: 111,
          indent: this.indent - 1,
          parameters: [ifnum, id, type, value],
        });
      };
      /**
       * ○ 条件分岐（敵キャラ）
       */
      Scenario_Converter.prototype.convertCommand_if_enemy = function (
        context
      ) {
        this.indent++;
        var ifnum = 5;
        var type = 0;
        var value = 0;
        var enemy = context.headerInt("enemy");
        switch (context.headerStr("type")) {
          case "visible":
            type = 0;
            value = 0;
            break;
          case "state":
            type = 1;
            new Tes.NotEmptyValidator().validate(
              context,
              "value",
              context.header["value"]
            );
            new Tes.NumericValidator(1).validate(
              context,
              "value",
              context.header["value"]
            );
            value = context.headerInt("value");
            break;
          default:
            type = 0;
            value = 0;
            break;
        }
        context.push({
          code: 111,
          indent: this.indent - 1,
          parameters: [ifnum, enemy, type, value],
        });
      };
      /**
       * ○ 条件分岐（キャラクター）
       */
      Scenario_Converter.prototype.convertCommand_if_character = function (
        context
      ) {
        this.indent++;
        var ifnum = 6;
        var id = context.headerInt("id");
        var direction = 0;
        switch (context.headerStr("direction")) {
          case "2":
          case "down":
            direction = 2;
            break;
          case "4":
          case "left":
            direction = 4;
            break;
          case "6":
          case "right":
            direction = 6;
            break;
          case "8":
          case "up":
            direction = 8;
            break;
        }
        context.push({
          code: 111,
          indent: this.indent - 1,
          parameters: [ifnum, id, direction],
        });
      };
      /**
       * ○ 条件分岐（乗り物）
       */
      Scenario_Converter.prototype.convertCommand_if_vehicle = function (
        context
      ) {
        this.indent++;
        var ifnum = 13;
        var vehicle = context.headerInt("vehicle");
        context.push({
          code: 111,
          indent: this.indent - 1,
          parameters: [ifnum, vehicle],
        });
      };
      /**
       * ○ 条件分岐（お金）
       */
      Scenario_Converter.prototype.convertCommand_if_money = function (
        context
      ) {
        this.indent++;
        var ifnum = 7;
        var money = context.headerInt("money");
        var op = ["ge", "le", "lt"].indexOf(context.header["op"]) || 0;
        context.push({
          code: 111,
          indent: this.indent - 1,
          parameters: [ifnum, money, op],
        });
      };
      /**
       * ○ 条件分岐（アイテム）
       */
      Scenario_Converter.prototype.convertCommand_if_item = function (context) {
        this.indent++;
        var ifnum = 8;
        var id = context.headerInt("id");
        context.push({
          code: 111,
          indent: this.indent - 1,
          parameters: [ifnum, id],
        });
      };
      /**
       * ○ 条件分岐（武器）
       */
      Scenario_Converter.prototype.convertCommand_if_weapon = function (
        context
      ) {
        this.indent++;
        var ifnum = 9;
        var id = context.headerInt("id");
        var equip =
          context.headerStr("equip", "false") == "true" ? true : false;
        context.push({
          code: 111,
          indent: this.indent - 1,
          parameters: [ifnum, id, equip],
        });
      };
      /**
       * ○ 条件分岐（防具）
       */
      Scenario_Converter.prototype.convertCommand_if_armor = function (
        context
      ) {
        this.indent++;
        var ifnum = 10;
        var id = context.headerInt("id");
        var equip =
          context.headerStr("equip", "false") == "true" ? true : false;
        context.push({
          code: 111,
          indent: this.indent - 1,
          parameters: [ifnum, id, equip],
        });
      };
      /**
       * ○ 条件分岐（ボタン）
       */
      Scenario_Converter.prototype.convertCommand_if_button = function (
        context
      ) {
        this.indent++;
        var ifnum = 11;
        var button = 0;
        switch (context.headerStr("button")) {
          case "2":
          case "down":
            button = 2;
            break;
          case "4":
          case "left":
            button = 4;
            break;
          case "6":
          case "right":
            button = 6;
            break;
          case "8":
          case "up":
            button = 8;
            break;
          case "11":
          case "A":
            button = 11;
            break;
          case "12":
          case "B":
            button = 12;
            break;
          case "13":
          case "C":
            button = 13;
            break;
          case "14":
          case "X":
            button = 14;
            break;
          case "15":
          case "Y":
            button = 15;
            break;
          case "16":
          case "Z":
            button = 16;
            break;
          case "17":
          case "L":
            button = 17;
            break;
          case "18":
          case "R":
            button = 18;
            break;
        }
        context.push({
          code: 111,
          indent: this.indent - 1,
          parameters: [ifnum, button],
        });
      };
      /**
       * ○ 条件分岐（スクリプト）
       */
      Scenario_Converter.prototype.convertCommand_if_script = function (
        context
      ) {
        this.indent++;
        var ifnum = 12;
        var script = context.headerStr("script");
        script = script.replace(/<!!>/g, "=");
        script = script.replace(/<ii>/g, " ");
        context.push({
          code: 111,
          indent: this.indent - 1,
          parameters: [ifnum, script],
        });
      };
      /**
       * ○ 条件分岐（それ以外）
       */
      Scenario_Converter.prototype.convertCommand_else = function (context) {
        this.indent++;
        context.push({ code: 411, indent: this.indent - 1, parameters: [] });
      };
      Scenario_Converter.prototype.convertCommand_end_else = function (
        context
      ) {
        this.indent--;
        context.push({ code: 0, indent: this.indent + 1, parameters: [] });
        this.indent++;
        context.push({ code: 411, indent: this.indent - 1, parameters: [] });
      };
      /**
       * ○ ループ
       */
      Scenario_Converter.prototype.convertCommand_loop = function (context) {
        this.indent++;
        context.push({ code: 112, indent: this.indent - 1, parameters: [] });
      };
      Scenario_Converter.prototype.convertCommand_loop_end = function (
        context
      ) {
        this.indent--;
        context.push({ code: 413, indent: this.indent, parameters: [] });
      };
      Scenario_Converter.prototype.convertCommand_loop_break = function (
        context
      ) {
        context.push({ code: 113, indent: this.indent, parameters: [] });
      };
      /**
       * ○ イベントの中断
       */
      Scenario_Converter.prototype.convertCommand_event_break = function (
        context
      ) {
        context.push({ code: 115, indent: this.indent, parameters: [] });
      };
      /**
       * ○ イベントの中断（returnタグにて）
       */
      Scenario_Converter.prototype.convertCommand_return = function (context) {
        context.push({ code: 115, indent: this.indent, parameters: [] });
      };
      /**
       * ○ コモンイベント
       */
      Scenario_Converter.prototype.convertCommand_common = function (context) {
        var id = context.headerInt("id");
        context.push({ code: 117, indent: this.indent, parameters: [id] });
      };
      /**
       * ○ ラベル
       */
      Scenario_Converter.prototype.convertCommand_label = function (context) {
        var value = context.headerStr("value");
        context.push({ code: 118, indent: this.indent, parameters: [value] });
      };
      /**
       * ○ ラベルジャンプ
       */
      Scenario_Converter.prototype.convertCommand_label_jump = function (
        context
      ) {
        var value = context.headerStr("value");
        context.push({ code: 119, indent: this.indent, parameters: [value] });
      };
      /**
       * ○ 注釈
       */
      Scenario_Converter.prototype.convertCommand_comment = function (context) {
        var value = context.headerStr("value");
        context.push({ code: 108, indent: this.indent, parameters: [value] });
      };
      /**
       * ○ 注釈（２行目以降）
       */
      Scenario_Converter.prototype.convertCommand_comment2 = function (
        context
      ) {
        var value = context.headerStr("value");
        context.push({ code: 408, indent: this.indent, parameters: [value] });
      };
      Scenario_Converter.prototype.convertVarValue = function (type, value) {
        if (type === 1) {
          var reg3 = /var\.([0-9]*)/;
          return parseInt(reg3.exec(value)[1]);
        } else {
          return Math.abs(parseInt(value));
        }
      };
      /**
       * ○ 所持金の増減
       */
      Scenario_Converter.prototype.convertCommand_money = function (context) {
        var value = context.headerStr("value");
        var reg = /(var\.)/;
        var type = reg.exec(value) ? 1 : 0; // 0:数値 1:変数
        var regOp = /(^-)/;
        var operate = regOp.exec(value) ? 1 : 0; // 0:加算 1:減算
        var money = this.convertVarValue(type, value);
        context.push({
          code: 125,
          indent: this.indent,
          parameters: [operate, type, money],
        });
      };
      /**
       * ○ アイテムの増減
       */
      Scenario_Converter.prototype.convertCommand_item = function (context) {
        var id = context.headerInt("id");
        var value = context.headerStr("value");
        var reg = /(var\.)/;
        var type = reg.exec(value) ? 1 : 0; // 0:数値 1:変数
        var regOp = /(^-)/;
        var operate = regOp.exec(value) ? 1 : 0; // 0:加算 1:減算
        var num = this.convertVarValue(type, value);
        context.push({
          code: 126,
          indent: this.indent,
          parameters: [id, operate, type, num],
        });
      };
      /**
       * ○ 武器の増減
       */
      Scenario_Converter.prototype.convertCommand_weapon = function (context) {
        var id = context.headerInt("id");
        var value = context.headerStr("value");
        var equip = context.headerBool("equip", false);
        var reg = /(var\.)/;
        var type = reg.exec(value) ? 1 : 0; // 0:数値 1:変数
        var regOp = /(^-)/;
        var operate = regOp.exec(value) ? 1 : 0; // 0:加算 1:減算
        var num = this.convertVarValue(type, value);
        context.push({
          code: 127,
          indent: this.indent,
          parameters: [id, operate, type, num, equip],
        });
      };
      /**
       * ○ 防具の増減
       */
      Scenario_Converter.prototype.convertCommand_armor = function (context) {
        var id = context.headerInt("id");
        var value = context.headerStr("value");
        var equip = context.headerBool("equip", false);
        var reg = /(var\.)/;
        var type = reg.exec(value) ? 1 : 0; // 0:数値 1:変数
        var regOp = /(^-)/;
        var operate = regOp.exec(value) ? 1 : 0; // 0:加算 1:減算
        var num = this.convertVarValue(type, value);
        context.push({
          code: 128,
          indent: this.indent,
          parameters: [id, operate, type, num, equip],
        });
      };
      Scenario_Converter.prototype.convertCommand_sw = function (context) {
        var id = context.headerInt("id");
        var end = context.headerInt("end", id);
        var flag = context.headerStr("flag") === "on" ? 0 : 1;
        context.push({
          code: 121,
          indent: this.indent,
          parameters: [id, end, flag],
        });
      };
      Scenario_Converter.prototype.convertCommand_var = function (context) {
        var id = context.headerInt("id");
        var end = context.headerInt("end", id);
        var op =
          ["=", "+", "-", "*", "/", "%"].indexOf(context.headerStr("op")) || 0;
        var value = context.headerInt("value");
        context.push({
          code: 122,
          indent: this.indent,
          parameters: [id, end, op, 0, value],
        });
      };
      Scenario_Converter.prototype.convertCommand_self_sw = function (context) {
        var id = context.headerStr("id");
        var flag = context.headerStr("flag") === "on" ? 0 : 1;
        context.push({
          code: 123,
          indent: this.indent,
          parameters: [id, flag],
        });
      };
      Scenario_Converter.prototype.convertCommand_timer = function (context) {
        var flag = context.headerStr("flag") === "on" ? 0 : 1;
        var time = context.headerInt("time");
        context.push({
          code: 124,
          indent: this.indent,
          parameters: [flag, time],
        });
      };
      Scenario_Converter.prototype.convertCommand_save_disable = function (
        context
      ) {
        var flag = context.headerBool("flag", true) ? 0 : 1;
        context.push({ code: 134, indent: this.indent, parameters: [flag] });
      };
      Scenario_Converter.prototype.convertCommand_menu_disable = function (
        context
      ) {
        var flag = context.headerBool("flag", true) ? 0 : 1;
        context.push({ code: 135, indent: this.indent, parameters: [flag] });
      };
      Scenario_Converter.prototype.convertCommand_encount_disable = function (
        context
      ) {
        var flag = context.headerBool("flag", true) ? 0 : 1;
        context.push({ code: 136, indent: this.indent, parameters: [flag] });
      };
      Scenario_Converter.prototype.convertCommand_formation_disable = function (
        context
      ) {
        var flag = context.headerBool("flag", true) ? 0 : 1;
        context.push({ code: 137, indent: this.indent, parameters: [flag] });
      };
      Scenario_Converter.prototype.convertCommand_map_move = function (
        context
      ) {
        var direction;
        switch (context.headerStr("direction")) {
          case "2":
          case "down":
            direction = 2;
            break;
          case "4":
          case "left":
            direction = 4;
            break;
          case "6":
          case "right":
            direction = 6;
            break;
          case "8":
          case "up":
            direction = 8;
        }
        var fade;
        switch (context.headerStr("fade")) {
          case "1":
          case "white":
            fade = 1;
            break;
          case "2":
          case "none":
            fade = 2;
            break;
          default:
            fade = 0;
        }
        var type = context.headerStr("type", "const") === "const" ? 0 : 1;
        var map = context.headerInt("map");
        var x = context.headerInt("x");
        var y = context.headerInt("y");
        context.push({
          code: 201,
          indent: this.indent,
          parameters: [type, map, x, y, direction, fade],
        });
      };
      Scenario_Converter.prototype.convertCommand_vehicle_pos = function (
        context
      ) {
        var vehicle = context.headerInt("vehicle");
        var type = context.headerStr("type", "const") === "const" ? 0 : 1;
        var map = context.headerInt("map");
        var x = context.headerInt("x");
        var y = context.headerInt("y");
        context.push({
          code: 202,
          indent: this.indent,
          parameters: [vehicle, type, map, x, y],
        });
      };
      Scenario_Converter.prototype.convertCommand_event_pos = function (
        context
      ) {
        var id = context.headerInt("id");
        var type;
        if (context.headerStr("type") === "var") {
          type = 1;
        } else if (context.headerStr("type") === "var") {
          type = 2;
        } else {
          type = 0;
        }
        var x = context.headerInt("x");
        var y = context.headerInt("y");
        var direction;
        switch (context.headerStr("direction")) {
          case "2":
          case "down":
            direction = 2;
            break;
          case "4":
          case "left":
            direction = 4;
            break;
          case "6":
          case "right":
            direction = 6;
            break;
          case "8":
          case "up":
            direction = 8;
            break;
          default:
            direction = 0;
            break;
        }
        context.push({
          code: 203,
          indent: this.indent,
          parameters: [id, type, x, y, direction],
        });
      };
      Scenario_Converter.prototype.convertCommand_scroll_map = function (
        context
      ) {
        var direction;
        switch (context.headerStr("direction")) {
          case "2":
          case "down":
            direction = 2;
            break;
          case "4":
          case "left":
            direction = 4;
            break;
          case "6":
          case "right":
            direction = 6;
            break;
          case "8":
          case "up":
            direction = 8;
            break;
        }
        var num = context.headerInt("num");
        var speed = context.headerInt("speed", 4);
        context.push({
          code: 204,
          indent: this.indent,
          parameters: [direction, num, speed],
        });
      };
      Scenario_Converter.prototype.convertCommand_route_h = function (context) {
        var event = context.headerInt("event");
        var repeat = context.headerBool("repeat", false);
        var skip = context.headerBool("skip", false);
        var wait = context.headerBool("wait", true);
        if (context.data.length === 0) {
          context.error("移動ルートが設定されていません。");
          return;
        }
        var list = [];
        for (var _i = 0, _a = context.data; _i < _a.length; _i++) {
          var line = _a[_i];
          list.push(this.convertCommand_route(context, line));
        }
        list.push({ code: 0 });
        var routes = {
          repeat: repeat,
          skippable: skip,
          wait: wait,
          list: list,
        };
        context.push({
          code: 205,
          indent: this.indent,
          parameters: [event, routes],
        });
      };
      Scenario_Converter.prototype.convertCommand_route = function (
        context,
        line
      ) {
        var headerList = line.split(" ");
        var header = this.parseHeader(headerList);
        var type = header.headerStr("type");
        var parameters = [];
        var code = parseInt(type);
        if (isNaN(code)) {
          switch (type) {
            case "down":
              code = 1;
              break;
            case "left":
              code = 2;
              break;
            case "right":
              code = 3;
              break;
            case "up":
              code = 4;
              break;
            case "dl":
              code = 5;
              break;
            case "dr":
              code = 6;
              break;
            case "ul":
              code = 7;
              break;
            case "ur":
              code = 8;
              break;
            case "random":
              code = 9;
              break;
            case "toward":
              code = 10;
              break;
            case "away":
              code = 11;
              break;
            case "foward":
              code = 12;
              break;
            case "backward":
              code = 13;
              break;
            case "jump":
              code = 14;
              new Tes.NumericValidator(-100, 100).validate(
                context,
                "x",
                header["x"]
              );
              new Tes.NumericValidator(-100, 100).validate(
                context,
                "y",
                header["y"]
              );
              parameters.push(header.headerInt("x", 0));
              parameters.push(header.headerInt("y", 0));
              break;
            case "wait":
              code = 15;
              new Tes.NumericValidator(1, 999).validate(
                context,
                "time",
                header["time"]
              );
              parameters.push(header.headerInt("time", 60));
              break;
            case "turn_down":
              code = 16;
              break;
            case "turn_left":
              code = 17;
              break;
            case "turn_right":
              code = 18;
              break;
            case "turn_up":
              code = 19;
              break;
            case "turn_90_r":
              code = 20;
              break;
            case "turn_90_l":
              code = 21;
              break;
            case "turn_180":
              code = 22;
              break;
            case "turn_90_rl":
            case "turn_90_lr":
              code = 23;
              break;
            case "turn_random":
              code = 24;
              break;
            case "turn_toward":
              code = 25;
              break;
            case "turn_away":
              code = 26;
              break;
            case "switch_on":
            case "sw_on":
              code = 27;
              new Tes.NotEmptyValidator().validate(context, "id", header["id"]);
              new Tes.NumericValidator(1).validate(context, "id", header["id"]);
              parameters["id"] = header.headerInt("id");
              break;
            case "switch_off":
            case "sw_off":
              code = 28;
              new Tes.NotEmptyValidator().validate(context, "id", header["id"]);
              new Tes.NumericValidator(1).validate(context, "id", header["id"]);
              parameters.push(header.headerInt("id"));
              break;
            case "change_speed":
              code = 29;
              new Tes.NumericValidator(1, 6).validate(
                context,
                "speed",
                header["speed"]
              );
              parameters.push(header.headerInt("speed", 3));
              break;
            case "change_freq":
              code = 30;
              new Tes.NumericValidator(1, 5).validate(
                context,
                "freq",
                header["freq"]
              );
              parameters.push(header.headerInt("freq", 3));
              break;
            case "walk_anime_on":
              code = 31;
              break;
            case "walk_anime_off":
              code = 32;
              break;
            case "step_anime_on":
              code = 33;
              break;
            case "step_anime_off":
              code = 34;
              break;
            case "dir_fix_on":
              code = 35;
              break;
            case "dir_fix_off":
              code = 36;
              break;
            case "through_on":
              code = 37;
              break;
            case "through_off":
              code = 38;
              break;
            case "transparent_on":
              code = 39;
              break;
            case "transparent_off":
              code = 40;
              break;
            case "change_graphic":
              code = 41;
              new Tes.NotEmptyValidator().validate(
                context,
                "file",
                header["file"]
              );
              new Tes.NotEmptyValidator().validate(
                context,
                "index",
                header["index"]
              );
              new Tes.NumericValidator(0, 7).validate(
                context,
                "index",
                header["index"]
              );
              parameters.push(header.headerStr("file"));
              parameters.push(header.headerInt("index"));
              break;
            case "change_opacity":
              code = 42;
              new Tes.NumericValidator(0, 255).validate(
                context,
                "opacity",
                header["opacity"]
              );
              parameters.push(header.headerInt("opacity", 255));
              break;
            case "change_blend":
              code = 43;
              new Tes.NumericValidator(0, 2).validate(
                context,
                "blend",
                header["blend"]
              );
              parameters.push(header.headerInt("blend", 0));
              break;
            case "play_se":
              code = 44;
              new Tes.NumericValidator(0, 100).validate(
                context,
                "volume",
                header["volume"]
              );
              new Tes.NumericValidator(50, 150).validate(
                context,
                "pitch",
                header["pitch"]
              );
              new Tes.NumericValidator(-100, 100).validate(
                context,
                "pan",
                header["pan"]
              );
              var file = header.headerStr("file", "");
              var volume = header.headerInt("volume", 100);
              var pitch = header.headerInt("pitch", 100);
              var pan = header.headerInt("pan", 0);
              var obj = {};
              obj["name"] = file;
              obj["volume"] = volume;
              obj["pitch"] = pitch;
              obj["pan"] = pan;
              parameters.push(obj);
              break;
            case "script":
              code = 45;
              new Tes.NotEmptyValidator().validate(
                context,
                "script",
                header["script"]
              );
              var script = header["script"];
              script = script.replace(/<!!>/g, "=");
              script = script.replace(/<ii>/g, " ");
              parameters.push(script);
              break;
            default:
              context.error("存在しない移動コマンドです。" + type);
              break;
          }
        }
        return { code: code, indent: null, parameters: parameters };
      };
      Scenario_Converter.prototype.convertCommand_vehicle = function (context) {
        context.push({ code: 206, indent: this.indent, parameters: [] });
      };
      Scenario_Converter.prototype.convertCommand_transparent = function (
        context
      ) {
        var flag = context.headerBool("flag", true) ? 0 : 1;
        context.push({ code: 211, indent: this.indent, parameters: [flag] });
      };
      /**
       * ○ アニメーションの表示
       */
      Scenario_Converter.prototype.convertCommand_anime = function (context) {
        var target = context.headerInt("target");
        var anime = context.headerInt("anime");
        var wait = context.headerBool("wait", false);
        context.push({
          code: 212,
          indent: this.indent,
          parameters: [target, anime, wait],
        });
      };
      /**
       * ○ フキダシアイコンの表示
       */
      Scenario_Converter.prototype.convertCommand_balloon = function (context) {
        var target = context.headerInt("target");
        var balloon = context.headerInt("balloon");
        var wait = context.headerBool("wait", false);
        context.push({
          code: 213,
          indent: this.indent,
          parameters: [target, balloon, wait],
        });
      };
      /**
       * ○ イベントの一時消去
       */
      Scenario_Converter.prototype.convertCommand_erace = function (context) {
        context.push({ code: 214, indent: this.indent, parameters: [] });
      };
      Scenario_Converter.prototype.convertCommand_followers = function (
        context
      ) {
        var flag = context.headerBool("flag", true) ? 0 : 1;
        context.push({ code: 216, indent: this.indent, parameters: [flag] });
      };
      Scenario_Converter.prototype.convertCommand_gather = function (context) {
        context.push({ code: 217, indent: this.indent, parameters: [] });
      };
      Scenario_Converter.prototype.convertCommand_fadeout = function (context) {
        var time = context.headerInt("time", -1);
        context.push({ code: 221, indent: this.indent, parameters: [time] });
      };
      Scenario_Converter.prototype.convertCommand_fadein = function (context) {
        var time = context.headerInt("time", -1);
        context.push({ code: 222, indent: this.indent, parameters: [time] });
      };
      Scenario_Converter.prototype.convertCommand_tone = function (context) {
        var tone = context.headerTone();
        var time = context.headerInt("time", 60);
        var wait = context.headerBool("wait", true);
        context.push({
          code: 223,
          indent: this.indent,
          parameters: [tone, time, wait],
        });
      };
      Scenario_Converter.prototype.convertCommand_flash = function (context) {
        var red = context.headerInt("red", 255);
        var green = context.headerInt("green", 255);
        var blue = context.headerInt("blue", 255);
        var strength = context.headerInt("strength", 170);
        var color = [red, green, blue, strength];
        var time = context.headerInt("time", 60);
        var wait = context.headerBool("wait", true);
        context.push({
          code: 224,
          indent: this.indent,
          parameters: [color, time, wait],
        });
      };
      Scenario_Converter.prototype.convertCommand_shake = function (context) {
        var strength = context.headerInt("strength", 5);
        var speed = context.headerInt("speed", 5);
        var time = context.headerInt("time", 60);
        var wait = context.headerBool("wait", true);
        context.push({
          code: 225,
          indent: this.indent,
          parameters: [strength, speed, time, wait],
        });
      };
      Scenario_Converter.prototype.convertCommand_wait = function (context) {
        var time = context.headerInt("time", 60);
        context.push({ code: 230, indent: this.indent, parameters: [time] });
      };
      Scenario_Converter.prototype.convertCommand_picture = function (context) {
        var layer = context.headerInt("layer");
        var file = context.header["file"];
        var origin = context.header["origin"] === "center" ? 1 : 0;
        var type = context.header["type"] === "var" ? 1 : 0;
        var x = context.headerInt("x", 0);
        var y = context.headerInt("y", 0);
        var zoomX = context.headerInt("zoom_x", 100);
        var zoomy = context.headerInt("zoom_y", 100);
        var opacity = context.headerInt("transparent", 255);
        var blend = context.headerInt("blend", 0);
        context.push({
          code: 231,
          indent: this.indent,
          parameters: [
            layer,
            file,
            origin,
            type,
            x,
            y,
            zoomX,
            zoomy,
            opacity,
            blend,
          ],
        });
      };
      Scenario_Converter.prototype.convertCommand_picture_move = function (
        context
      ) {
        var layer = context.headerInt("layer");
        var origin = context.headerInt("origin", 0);
        var type = context.header["type"] === "var" ? 1 : 0;
        var x = context.headerInt("x", 0);
        var y = context.headerInt("y", 0);
        var zoomX = context.headerInt("zoom_x", 100);
        var zoomy = context.headerInt("zoom_y", 100);
        var opacity = context.headerInt("transparent", 255);
        var blend = context.headerInt("blend", 0);
        var time = context.headerInt("time", 0);
        var wait = context.headerBool("wait", true);
        context.push({
          code: 232,
          indent: this.indent,
          parameters: [
            layer,
            0,
            origin,
            type,
            x,
            y,
            zoomX,
            zoomy,
            opacity,
            blend,
            time,
            wait,
          ],
        });
      };
      Scenario_Converter.prototype.convertCommand_picture_rotation = function (
        context
      ) {
        var layer = context.headerInt("layer");
        var speed = context.headerInt("speed", 5);
        context.push({
          code: 233,
          indent: this.indent,
          parameters: [layer, speed],
        });
      };
      Scenario_Converter.prototype.convertCommand_picture_tone = function (
        context
      ) {
        var layer = context.headerInt("layer");
        var tone = context.headerTone();
        var time = context.headerInt("time", 60);
        var wait = context.headerBool("wait", true);
        context.push({
          code: 234,
          indent: this.indent,
          parameters: [layer, tone, time, wait],
        });
      };
      Scenario_Converter.prototype.convertCommand_picture_erace = function (
        context
      ) {
        var layer = context.headerInt("layer");
        context.push({ code: 235, indent: this.indent, parameters: [layer] });
      };
      Scenario_Converter.prototype.convertCommand_picture_weather = function (
        context
      ) {
        var weather = context.headerStr("weather", "none");
        var strength = context.headerInt("strength", 5);
        var time = context.headerInt("time", 60);
        var wait = context.headerBool("wait", true);
        context.push({
          code: 236,
          indent: this.indent,
          parameters: [weather, strength, time, wait],
        });
      };
      /**
       * ○ ＢＧＭの演奏
       */
      Scenario_Converter.prototype.convertCommand_bgm = function (context) {
        var name = context.headerStr("file");
        var volume = context.headerInt("volume", 100);
        var pitch = context.headerInt("pitch", 100);
        var pan = context.headerInt("pan", 0);
        var bgm = { name: name, volume: volume, pitch: pitch, pan: pan };
        context.push({ code: 241, indent: this.indent, parameters: [bgm] });
      };
      /**
       * ○ ＢＧＭのフェードアウト
       */
      Scenario_Converter.prototype.convertCommand_fadeout_bgm = function (
        context
      ) {
        var time = context.headerInt("time", 10);
        context.push({ code: 242, indent: this.indent, parameters: [time] });
      };
      /**
       * ○ ＢＧＭの保存
       */
      Scenario_Converter.prototype.convertCommand_save_bgm = function (
        context
      ) {
        context.push({ code: 243, indent: this.indent, parameters: [] });
      };
      /**
       * ○ ＢＧＭの再開
       */
      Scenario_Converter.prototype.convertCommand_resume_bgm = function (
        context
      ) {
        context.push({ code: 244, indent: this.indent, parameters: [] });
      };
      /**
       * ○ ＢＧＳの演奏
       */
      Scenario_Converter.prototype.convertCommand_bgs = function (context) {
        var name = context.headerStr("file");
        var volume = context.headerInt("volume", 100);
        var pitch = context.headerInt("pitch", 100);
        var pan = context.headerInt("pan", 0);
        var bgs = { name: name, volume: volume, pitch: pitch, pan: pan };
        context.push({ code: 245, indent: this.indent, parameters: [bgs] });
      };
      /**
       * ○ ＢＧＳのフェードアウト
       */
      Scenario_Converter.prototype.convertCommand_fadeout_bgs = function (
        context
      ) {
        var time = context.headerInt("time", 10);
        context.push({ code: 246, indent: this.indent, parameters: [time] });
      };
      /**
       * ○ ＭＥの演奏
       */
      Scenario_Converter.prototype.convertCommand_me = function (context) {
        var name = context.headerStr("file");
        var volume = context.headerInt("volume", 100);
        var pitch = context.headerInt("pitch", 100);
        var pan = context.headerInt("pan", 0);
        var me = { name: name, volume: volume, pitch: pitch, pan: pan };
        context.push({ code: 249, indent: this.indent, parameters: [me] });
      };
      /**
       * ○ ＳＥの演奏
       */
      Scenario_Converter.prototype.convertCommand_se = function (context) {
        var name = context.headerStr("file");
        var volume = context.headerInt("volume", 100);
        var pitch = context.headerInt("pitch", 100);
        var pan = context.headerInt("pan", 0);
        var se = { name: name, volume: volume, pitch: pitch, pan: pan };
        context.push({ code: 250, indent: this.indent, parameters: [se] });
      };
      /**
       * ○ ＳＥの停止
       */
      Scenario_Converter.prototype.convertCommand_stop_se = function (context) {
        context.push({ code: 251, indent: this.indent, parameters: [] });
      };
      /**
       * ○ メニュー画面を開く
       */
      Scenario_Converter.prototype.convertCommand_menu_open = function (
        context
      ) {
        context.push({ code: 351, indent: this.indent, parameters: [] });
      };
      /**
       * ○ セーブ画面を開く
       */
      Scenario_Converter.prototype.convertCommand_save_open = function (
        context
      ) {
        context.push({ code: 352, indent: this.indent, parameters: [] });
      };
      /**
       * ○ ゲームオーバー
       */
      Scenario_Converter.prototype.convertCommand_gameover = function (
        context
      ) {
        context.push({ code: 353, indent: this.indent, parameters: [] });
      };
      /**
       * ○ タイトル画面に戻す
       */
      Scenario_Converter.prototype.convertCommand_title_return = function (
        context
      ) {
        context.push({ code: 354, indent: this.indent, parameters: [] });
      };
      /**
       * ○ ムービーの再生
       */
      Scenario_Converter.prototype.convertCommand_movie = function (context) {
        var file = context.headerStr("file");
        var playbackRate = parseFloat(context.headerStr("playback_rate"));
        if (isNaN(playbackRate)) {
          playbackRate = 1;
        }
        context.push({
          code: 261,
          indent: this.indent,
          parameters: [file, playbackRate],
        });
      };
      /**
       * ○ タイルセットの変更
       */
      Scenario_Converter.prototype.convertCommand_tileset = function (context) {
        var id = context.headerStr("id");
        context.push({ code: 282, indent: this.indent, parameters: [id] });
      };
      Scenario_Converter.prototype.convertCommand_all_recovery = function (
        context
      ) {
        var params = context.headerVar("actor");
        context.push({
          code: 314,
          indent: this.indent,
          parameters: [params[0], params[1]],
        });
      };
      Scenario_Converter.prototype.convertCommand_exp = function (context) {
        var actor = context.headerVar("actor");
        var value = context.headerOperateVar("value");
        var message = context.headerBool("message", false);
        context.push({
          code: 315,
          indent: this.indent,
          parameters: [
            actor[0],
            actor[1],
            value[0],
            value[1],
            value[2],
            message,
          ],
        });
      };
      Scenario_Converter.prototype.convertCommand_level = function (context) {
        var actor = context.headerVar("actor");
        var value = context.headerOperateVar("value");
        var message = context.headerBool("message", false);
        context.push({
          code: 316,
          indent: this.indent,
          parameters: [
            actor[0],
            actor[1],
            value[0],
            value[1],
            value[2],
            message,
          ],
        });
      };
      Scenario_Converter.prototype.convertCommand_name = function (context) {
        var actor = context.headerInt("actor");
        var value = context.headerStr("value");
        context.push({
          code: 320,
          indent: this.indent,
          parameters: [actor, value],
        });
      };
      Scenario_Converter.prototype.convertCommand_class = function (context) {
        var actor = context.headerInt("actor");
        var value = context.headerInt("value");
        var keep_exp = context.headerBool("keep_exp", false);
        context.push({
          code: 321,
          indent: this.indent,
          parameters: [actor, value, keep_exp],
        });
      };
      Scenario_Converter.prototype.convertCommand_nickname = function (
        context
      ) {
        var actor = context.headerInt("actor");
        var value = context.headerInt("value");
        context.push({
          code: 323,
          indent: this.indent,
          parameters: [actor, value],
        });
      };
      Scenario_Converter.prototype.convertCommand_end = function (context) {
        this.indent--;
        context.push({ code: 0, indent: this.indent + 1, parameters: [] });
      };
      Scenario_Converter.prototype.convertCommand_plugin = function (context) {
        var name = context.headerStr("name");
        var command = context.headerStr("command");
        var argsText = context.headerStr("args");
        var args = {};
        try {
          args = JSON.parse(argsText);
        } catch (e) {
          console.error("plugin　コマンドエラー。以下の args  は不正です");
          console.error(argsText);
        }
        var parameters = [name, command, "", args];
        context.push({
          code: 357,
          indent: this.indent,
          parameters: parameters,
        });
      };
      return Scenario_Converter;
    })();
    Tes.Scenario_Converter = Scenario_Converter;
    var Block = /** @class */ (function () {
      function Block(lineNumber) {
        this.lineNumber = lineNumber;
        this.data = [];
      }
      Block.prototype.pushMsg = function (line) {
        if (AUTO_WARD_WRAP && line.indexOf("@") === -1) {
          if (this.data.length === 0) {
            this.data.push("<wrap>" + line);
          } else {
            this.data.push("<br>" + line);
          }
        } else {
          this.data.push(line);
        }
      };
      return Block;
    })();
    Tes.Block = Block;
    var Context = /** @class */ (function () {
      function Context(file, lineNumber, command, list, _header, data) {
        this.file = file;
        this.lineNumber = lineNumber;
        this.command = command;
        this.list = list;
        this._header = _header;
        this.data = data;
      }
      Context.prototype.push = function (command) {
        this.list.push(command);
      };
      Object.defineProperty(Context.prototype, "header", {
        get: function () {
          return this._header.header;
        },
        enumerable: true,
        configurable: true,
      });
      Context.prototype.headerInt = function (id, defaultValue) {
        if (defaultValue === void 0) {
          defaultValue = 0;
        }
        return this._header.headerInt(id, defaultValue);
      };
      Context.prototype.headerStr = function (id, defaultValue) {
        if (defaultValue === void 0) {
          defaultValue = "";
        }
        return this._header.headerStr(id, defaultValue);
      };
      Context.prototype.headerBool = function (id, defaultValue) {
        if (defaultValue === void 0) {
          defaultValue = false;
        }
        return this._header.headerBool(id, defaultValue);
      };
      Context.prototype.headerTone = function () {
        return this._header.headerTone();
      };
      Context.prototype.headerVar = function (id) {
        return this._header.headerVar(id);
      };
      Context.prototype.headerOperateVar = function (id) {
        return this._header.headerOperateVar(id);
      };
      Context.prototype.error = function (msg) {
        console.error(
          "file: " +
            this.file +
            " line: " +
            this.lineNumber +
            " command: " +
            this.command +
            " " +
            msg
        );
      };
      Context.prototype.insertTop = function (command) {
        this.list.splice(0, 0, command);
      };
      return Context;
    })();
    Tes.Context = Context;
    var Header = /** @class */ (function () {
      function Header(header) {
        this.header = header;
      }
      Header.prototype.headerInt = function (id, defaultValue) {
        if (defaultValue === void 0) {
          defaultValue = 0;
        }
        var value = this.header[id];
        if (!value) {
          return defaultValue;
        }
        var valueInt = parseInt(value);
        if (isNaN(valueInt)) {
          return defaultValue;
        }
        return valueInt;
      };
      Header.prototype.headerStr = function (id, defaultValue) {
        if (defaultValue === void 0) {
          defaultValue = "";
        }
        var value = this.header[id];
        if (!value) {
          return defaultValue;
        }
        return value;
      };
      Header.prototype.headerBool = function (id, defaultValue) {
        if (defaultValue === void 0) {
          defaultValue = false;
        }
        var value = this.header[id];
        if (value === "true") {
          return true;
        }
        if (value === "false") {
          return false;
        }
        return defaultValue;
      };
      Header.prototype.headerTone = function () {
        var red = this.headerInt("red", 0);
        var green = this.headerInt("green", 0);
        var blue = this.headerInt("blue", 0);
        var gray = this.headerInt("gray", 0);
        var tone = [red, green, blue, gray];
        return tone;
      };
      Header.prototype.headerVar = function (id) {
        var value = this.header[id];
        var reg = /^[+]{0,1}(var\.){0,1}(\d+)$/;
        var ret = reg.exec(value);
        var paramId = parseInt(ret[2]);
        if (ret[1] === undefined) {
          return [0, paramId];
        } else {
          return [1, paramId];
        }
      };
      Header.prototype.headerOperateVar = function (id) {
        var value = this.header[id];
        var reg = /^([-]{0,1})(var\.){0,1}(\d+)$/;
        var ret = reg.exec(value);
        var operation = ret[1] === "-" ? 1 : 0;
        var paramId = parseInt(ret[3]);
        if (ret[2] === undefined) {
          return [operation, 0, paramId];
        } else {
          return [operation, 1, paramId];
        }
      };
      return Header;
    })();
    if (COSTOM_FADE_IN_OUT === true) {
      // Fadeout Screen
      var _Game_Interpreter_command221 = Game_Interpreter.prototype.command221;
      Game_Interpreter.prototype.command221 = function (params) {
        if ($gameMessage.isBusy()) {
          return false;
        }
        var fadeSpeed = parseInt(params[0]);
        if (isNaN(fadeSpeed) || fadeSpeed < 0) {
          fadeSpeed = this.fadeSpeed();
        }
        if ($gameVariables.value(21)) {
          fadeSpeed = $gameVariables.value(21);
        }
        if ($gameScreen._brightness == 0) {
          return true;
        }
        $gameScreen.startFadeOut(fadeSpeed);
        this.wait(fadeSpeed);
        return true;
      };
      // Fadein Screen
      var _Game_Interpreter_command222 = Game_Interpreter.prototype.command222;
      Game_Interpreter.prototype.command222 = function (params) {
        if ($gameMessage.isBusy()) {
          return false;
        }
        var fadeSpeed = parseInt(params[0]);
        if (isNaN(fadeSpeed) || fadeSpeed < 0) {
          fadeSpeed = this.fadeSpeed();
        }
        if ($gameVariables.value(21)) {
          fadeSpeed = $gameVariables.value(21);
        }
        if ($gameScreen._brightness == 255) {
          return true;
        }
        $gameScreen.startFadeIn(fadeSpeed);
        this.wait(fadeSpeed);
        return true;
      };
    }
  })((Tes = Nore.Tes || (Nore.Tes = {})));
})(Nore || (Nore = {}));
