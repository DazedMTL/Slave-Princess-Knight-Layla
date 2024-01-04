/*:ja
 * @target MZ
 * @author ル
 *
 * @command Open
 * @text 赤ちゃんリスト表示
 * @des 赤ちゃんリスト表示
 * @arg actorId
 * @text actorId
 *
 * @command OpenAll
 * @text 全赤ちゃんリスト表示
 * @des 全赤ちゃんリスト表示
 *
 */
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
  var pluginName = "Nore_BabyList";
  PluginManager.registerCommand(pluginName, "Open", function (args) {
    var actorId = parseInt(args.actorId);
    $gameParty.setMenuActor($gameActors.actor(actorId));
    SceneManager.push(Scene_BabyList);
  });
  PluginManager.registerCommand(pluginName, "OpenAll", function (args) {
    SceneManager.push(Scene_BabyListAll);
  });
  var SortType;
  (function (SortType) {
    SortType[(SortType["normal"] = 0)] = "normal";
    SortType[(SortType["total"] = 1)] = "total";
    SortType[(SortType["gold"] = 2)] = "gold";
  })(SortType || (SortType = {}));
  var SortOrder;
  (function (SortOrder) {
    SortOrder[(SortOrder["up"] = 0)] = "up";
    SortOrder[(SortOrder["down"] = 1)] = "down";
  })(SortOrder || (SortOrder = {}));
  var SearchType;
  (function (SearchType) {
    SearchType[(SearchType["all"] = 0)] = "all";
    SearchType[(SearchType["actor1"] = 1)] = "actor1";
    SearchType[(SearchType["actor2"] = 2)] = "actor2";
    SearchType[(SearchType["actor3"] = 3)] = "actor3";
    SearchType[(SearchType["actor4"] = 4)] = "actor4";
    SearchType[(SearchType["actor5"] = 5)] = "actor5";
    SearchType[(SearchType["actor6"] = 6)] = "actor6";
    SearchType[(SearchType["actor7"] = 7)] = "actor7";
    SearchType[(SearchType["actor10"] = 10)] = "actor10";
    SearchType[(SearchType["actor12"] = 12)] = "actor12";
  })(SearchType || (SearchType = {}));
  var Scene_BabyListAll = /** @class */ (function (_super) {
    __extends(Scene_BabyListAll, _super);
    function Scene_BabyListAll() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Scene_BabyListAll.prototype.create = function () {
      Scene_MenuBase.prototype.create.call(this);
      this.createWindowLayer();
      this.createCommandWindow();
      this.createStatusWindow();
      this.createHelpWindow();
      this.onChange();
    };
    Scene_BabyListAll.prototype.start = function () {
      _super.prototype.start.call(this);
      this._window.setSortType(SortType.normal);
      this._window.deactivate();
      this._commandWindow.select(0);
      this._window.select(-1);
    };
    Scene_BabyListAll.prototype.createBackground = function () {};
    Scene_BabyListAll.prototype.createButtons = function () {};
    Scene_BabyListAll.prototype.updateActor = function () {
      this._actor = $gameParty.menuActor();
    };
    Scene_BabyListAll.prototype.createCommandWindow = function () {
      this._commandWindow = new Window_BabyCommand();
      this._commandWindow.setHandler("normal", this.onNormalSort.bind(this));
      this._commandWindow.setHandler("total", this.onTotalSort.bind(this));
      this._commandWindow.setHandler("gold", this.onGoldSort.bind(this));
      this._commandWindow.setHandler("searchAll", this.onSearchAll.bind(this));
      this._commandWindow.setHandler("search1", this.onSearch1.bind(this));
      this._commandWindow.setHandler("search2", this.onSearch2.bind(this));
      this._commandWindow.setHandler("search3", this.onSearch3.bind(this));
      this._commandWindow.setHandler("search4", this.onSearch4.bind(this));
      this._commandWindow.setHandler("search5", this.onSearch5.bind(this));
      this._commandWindow.setHandler("search6", this.onSearch6.bind(this));
      this._commandWindow.setHandler("search7", this.onSearch7.bind(this));
      this._commandWindow.setHandler("search10", this.onSearch10.bind(this));
      this._commandWindow.setHandler("search12", this.onSearch12.bind(this));
      this._commandWindow.setHandler("down", this.onDown.bind(this));
      this._commandWindow.setHandler("up", this.onUp.bind(this));
      this._commandWindow.refresh();
      this.addWindow(this._commandWindow);
    };
    Scene_BabyListAll.prototype.onSearchAll = function () {
      this.setSearch(SearchType.all);
    };
    Scene_BabyListAll.prototype.onSearch1 = function () {
      this.setSearch(SearchType.actor1);
    };
    Scene_BabyListAll.prototype.onSearch2 = function () {
      this.setSearch(SearchType.actor2);
    };
    Scene_BabyListAll.prototype.onSearch3 = function () {
      this.setSearch(SearchType.actor3);
    };
    Scene_BabyListAll.prototype.onSearch4 = function () {
      this.setSearch(SearchType.actor4);
    };
    Scene_BabyListAll.prototype.onSearch5 = function () {
      this.setSearch(SearchType.actor5);
    };
    Scene_BabyListAll.prototype.onSearch6 = function () {
      this.setSearch(SearchType.actor6);
    };
    Scene_BabyListAll.prototype.onSearch7 = function () {
      this.setSearch(SearchType.actor7);
    };
    Scene_BabyListAll.prototype.onSearch10 = function () {
      this.setSearch(SearchType.actor10);
    };
    Scene_BabyListAll.prototype.onSearch12 = function () {
      this.setSearch(SearchType.actor12);
    };
    Scene_BabyListAll.prototype.setSearch = function (s) {
      this._window.setSearchType(s);
      this._commandWindow.setSearchType(s);
      this._commandWindow.activate();
    };
    Scene_BabyListAll.prototype.onDown = function () {
      this._window.cursorPagedown();
      this._window.select(-1);
    };
    Scene_BabyListAll.prototype.onUp = function () {
      this._window.cursorPageup();
      this._window.select(-1);
    };
    Scene_BabyListAll.prototype.onNormalSort = function () {
      this._window.setSortType(SortType.normal);
      this._commandWindow.setSortType(SortType.normal);
      this._commandWindow.activate();
    };
    Scene_BabyListAll.prototype.onTotalSort = function () {
      this._window.setSortType(SortType.total);
      this._commandWindow.setSortType(SortType.total);
      this._commandWindow.activate();
    };
    Scene_BabyListAll.prototype.onGoldSort = function () {
      this._window.setSortType(SortType.gold);
      this._commandWindow.setSortType(SortType.gold);
      this._commandWindow.activate();
    };
    Scene_BabyListAll.prototype.createStatusWindow = function () {
      this._window = new Window_BabyList(null);
      this._window.setHandler("change", this.onChange.bind(this));
      this._window.setHandler("pageup", this.onPageup.bind(this));
      this._window.setHandler("pagedown", this.onPagedown.bind(this));
      this.addWindow(this._window);
    };
    Scene_BabyListAll.prototype.onChange = function () {};
    Scene_BabyListAll.prototype.update = function () {
      _super.prototype.update.call(this);
      this.updateOk();
      this.updateCancel();
    };
    Scene_BabyListAll.prototype.updateOk = function () {
      if (!$gameTemp.history) {
        return;
      }
      if (!this._window.active) {
        return;
      }
    };
    Scene_BabyListAll.prototype.updateCancel = function () {
      if (Input.isTriggered("cancel") || TouchInput.isCancelled()) {
        SoundManager.playCancel();
        SceneManager.pop();
      }
    };
    Scene_BabyListAll.prototype.createHelpWindow = function () {
      var rect = this.helpWindowRect();
      this._helpWindow = new Sprite_HelpBig(rect);
      this.addWindow(this._helpWindow);
    };
    Scene_BabyListAll.prototype.helpWindowRect = function () {
      var rect = new Rectangle(0, 0, 0, 0);
      rect.x = 300;
      rect.y = 102;
      rect.width = 670;
      rect.height = 112;
      return rect;
    };
    Scene_BabyListAll.prototype.onPageup = function () {};
    Scene_BabyListAll.prototype.onPagedown = function () {};
    return Scene_BabyListAll;
  })(Scene_MenuBase);
  Nore.Scene_BabyListAll = Scene_BabyListAll;
  var SyusanInfo = /** @class */ (function () {
    function SyusanInfo(syusan) {
      this.syusan = syusan;
    }
    SyusanInfo.prototype.syusanCount = function () {
      return this.ninshin.getActorHistory().countSyusan(this.day());
    };
    SyusanInfo.prototype.day = function () {
      return this.syusan._day;
    };
    SyusanInfo.prototype.getTaneoyaName = function () {
      var type = this.getTaneoyaType();
      return getTaneoyaName(type);
    };
    SyusanInfo.prototype.getTaneoyaType = function () {
      return this.syusan.value();
    };
    SyusanInfo.prototype.isMale = function () {
      return this.ninshinSchedule.child().isMale();
    };
    SyusanInfo.prototype.child = function () {
      return this.ninshinSchedule.child();
    };
    SyusanInfo.prototype.aptitude = function (type) {
      this.ninshinSchedule.child().calcAptitudes();
      return this.ninshinSchedule.child()["aptitude" + type];
    };
    SyusanInfo.prototype.imageId = function () {
      var ninshin = this.ninshin;
      if (ninshin.imageId() && ninshin.imageId().length > 0) {
        return ninshin.imageId();
      }
      var eroUpKey = this.ninshinSchedule.getEroUpKey();
      if (eroUpKey) {
        var list = eroUpKey.split("_");
        if (list && list.length > 1) {
          var eroImg = this.findEroImg(parseInt(list[1]));
          if (eroImg) {
            return eroImg;
          }
        }
      }
      return null;
    };
    SyusanInfo.prototype.findEroImg = function (commonId) {
      for (
        var _i = 0, _a = rngd_recollection_mode_settings.rec_cg_set;
        _i < _a.length;
        _i++
      ) {
        var set = _a[_i];
        //p(set)
        if (set.common_event_id == commonId) {
          return set.thumbnail;
        }
      }
      return null;
    };
    SyusanInfo.prototype.getActorName = function () {
      return $gameActors.actor(this.actorId()).name();
    };
    SyusanInfo.prototype.totalParams = function () {
      var n = 0;
      var child = this.child();
      n += child.aptitude1;
      n += child.aptitude2;
      n += child.aptitude3;
      n += child.aptitude4;
      n += child.aptitude5;
      return n;
    };
    SyusanInfo.prototype.gold = function () {
      return this.child().gold();
    };
    SyusanInfo.prototype.actorId = function () {
      return this.ninshinSchedule.actorId();
    };
    SyusanInfo.prototype.setRank = function (r) {
      this._rank = r;
    };
    SyusanInfo.prototype.rank = function () {
      return this._rank;
    };
    return SyusanInfo;
  })();
  Nore.SyusanInfo = SyusanInfo;
  var Window_BabyBase = /** @class */ (function (_super) {
    __extends(Window_BabyBase, _super);
    function Window_BabyBase() {
      return (_super !== null && _super.apply(this, arguments)) || this;
    }
    Window_BabyBase.prototype.drawBaby = function (item, rect) {
      this.contents.fontSize = 18;
      this.drawText(this.getTitle(item), rect.x + 42, rect.y, rect.width);
      this.contents.fontSize = 14;
      //this.drawText(this.getTaneoyaName(item), rect.x + 252, rect.y + 2, rect.width);
      this.changeTextColor(ColorManager.systemColor());
      this.drawText(TextManager.father, rect.x - 10, rect.y + 30, 75, "right");
      this.changeTextColor(ColorManager.normalColor());
      this.drawText(
        this.getTaneoyaName(item),
        rect.x + 50 + 20,
        rect.y + 30,
        80
      );
      this.drawFuture(item, rect);
      var imageId = item.imageId();
      if (imageId) {
        var bitmap = ImageManager.loadEro(imageId);
        var rate = 2.2;
        var clipX = 20;
        var width = bitmap.width - clipX * 2;
        this.contents.blt(
          bitmap,
          clipX,
          0,
          width,
          bitmap.height,
          rect.x + 4,
          rect.y + 55,
          width / rate,
          bitmap.height / rate
        );
      }
      this.drawParams(item, rect);
      this.drawGold(item, rect);
      this.drawSkills(item, rect);
      this.drawChildImage(rect, item.ninshinSchedule, item.day());
    };
    Window_BabyBase.prototype.getTitle = function (info) {
      var count = this.getCountTitle(info.syusanCount());
      return TextManager.babyTitle.format(count, info.getActorName());
    };
    Window_BabyBase.prototype.drawFuture = function (info, rect) {
      var x = rect.x + 154;
      var y = rect.y + 30;
      this.contents.fontSize = 14;
      this.changeTextColor(ColorManager.systemColor());
      this.drawText(TextManager.babyFuture, x, y, rect.width);
      this.contents.fontSize = 13;
      this.drawTextEx(this.getFutureText(info), x, y + 26, rect.width);
    };
    Window_BabyBase.prototype.getTaneoyaName = function (info) {
      return info.getTaneoyaName();
    };
    Window_BabyBase.prototype.drawGold = function (info, rect) {
      var x = rect.x + 280;
      var y = rect.y + 0;
      this.drawText(TextManager.sellPrice, x, y, 60, "left");
      this.drawText(info.gold() + "Ｇ", x, y, 115, "right");
      if (info.rank() > 0) {
        var icon = this.trophyIcon(info.rank());
        this.drawTrophy(icon, x + 37, y - 2);
      }
    };
    Window_BabyBase.prototype.trophyIcon = function (rank) {
      switch (rank) {
        case 1:
          return 2185;
        case 2:
          return 2186;
        case 3:
          return 2187;
      }
      return 0;
    };
    Window_BabyBase.prototype.drawTrophy = function (iconIndex, x, y) {
      var bitmap = ImageManager.loadSystem("IconSet");
      var pw = ImageManager.iconWidth;
      var ph = ImageManager.iconHeight;
      var sx = (iconIndex % 16) * pw;
      var sy = Math.floor(iconIndex / 16) * ph;
      this.contents.blt(bitmap, sx, sy, pw, ph, x, y);
    };
    Window_BabyBase.prototype.drawSkills = function (info, rect) {
      this.contents.fontSize = 14;
      this.changeTextColor(ColorManager.systemColor());
      var initialX = rect.x + 155;
      var x = initialX;
      var y = rect.y + 90;
      this.contents.fontSize = 14;
      y += 20;
      this.changeTextColor(ColorManager.systemColor());
      this.drawText(TextManager.babySkill, x, y, rect.width);
      this.changeTextColor(ColorManager.normalColor());
      var index = 0;
      for (var _i = 0, _a = info.child().getSkillList(); _i < _a.length; _i++) {
        var skill = _a[_i];
        var name_1 = void 0;
        switch (ConfigManager.language) {
          case "jp":
            name_1 = skill.nameJp;
            break;
          case "en":
            name_1 = skill.nameEn;
            break;
          case "ch":
            name_1 = skill.nameCh;
            break;
        }
        this.drawText(name_1, x + 45, y, 145, "left");
        x += 82;
        index++;
        //if (index % 2 == 0) {
        y += 18;
        x = initialX;
        //}
        if (index == 3) {
          break;
        }
      }
    };
    Window_BabyBase.prototype.drawParams = function (info, rect) {
      var x = rect.x + 325;
      var list = [];
      for (var i = 1; i <= 5; i++) {
        list.push([TextManager["aptitude" + i], info.aptitude(i)]);
      }
      //p(list)
      var y = rect.y + 30;
      for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
        var a = list_1[_i];
        this.drawText(a[0], x, y, 100, "left");
        this.drawRank(a[1], x + 45, y);
        y += 26;
      }
    };
    Window_BabyBase.prototype.resetFontSettings = function () {
      this.contents.fontFace = $gameSystem.mainFontFace();
      this.contents.fontSize = 14;
      this.resetTextColor();
    };
    Window_BabyBase.prototype.getCountTitle = function (num) {
      if (ConfigManager.language != "en") {
        return num;
      }
      var numStr = String(num);
      switch (numStr.substring(numStr.length - 2, numStr.length)) {
        case "11":
        case "12":
        case "13":
          return numStr + "th";
        default:
          switch (numStr.substring(numStr.length - 1, numStr.length)) {
            case "1":
              return numStr + "st";
            case "2":
              return numStr + "nd";
            case "3":
              return numStr + "rd";
            default:
              return numStr + "th";
          }
      }
    };
    Window_BabyBase.prototype.getFutureText = function (item) {
      return getBabyFuture(item.child().future());
    };
    Window_BabyBase.prototype.drawChildImage = function (rect, schedule, day) {
      /*
            let s = new ChildSprite(schedule);
            s.x = rect.x + -4;
            s.y = rect.y + 0;
            this._windowContentsSprite.addChild(s);
            */
      var child = schedule.child();
      var c = new Game_BabyCharacter(child, day, rect.x + 32, rect.y + 54);
      var sprite = new Sprite_Character(c);
      //const c = new Game_DungeonCharacter(actor, x - 13, y + 12);
      //const sprite = new Sprite_Character(c);
      this._windowContentsSprite.addChild(sprite);
    };
    Window_BabyBase.prototype.lineHeight = function () {
      return 28;
    };
    Window_BabyBase.prototype.drawItemBackground = function (index) {
      var rect = this.itemRect(index);
      var item = this._data[index];
      this.drawBackgroundRect(rect, item.isMale());
    };
    Window_BabyBase.prototype.drawBackgroundRect = function (rect, male) {
      var c1 = male ? ColorManager.maleColor1() : ColorManager.femaleColor1();
      var c2 = male ? ColorManager.maleColor2() : ColorManager.femaleColor2();
      var c3 = male ? ColorManager.maleColor3() : ColorManager.femaleColor3();
      var x = rect.x;
      var y = rect.y;
      var w = rect.width;
      var h = rect.height;
      this.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);
      this.contentsBack.strokeRect(x, y, w, h, c3);
    };
    Window_BabyBase.prototype.itemHeight = function () {
      return 174;
    };
    return Window_BabyBase;
  })(Window_Selectable);
  Nore.Window_BabyBase = Window_BabyBase;
  var Window_BabyList = /** @class */ (function (_super) {
    __extends(Window_BabyList, _super);
    function Window_BabyList(actor) {
      var _this = _super.call(this, new Rectangle(10, 70, 1260, 718)) || this;
      _this._searchType = SearchType.all;
      _this._actor = actor;
      _this.makeItemList();
      _this.loadEroList();
      _this.activate();
      return _this;
      //this.refresh();
    }
    Window_BabyList.prototype.setSearchType = function (s) {
      if (this._searchType == s) {
        return;
      }
      this._searchType = s;
      this.search();
      this.sort();
      this.refresh();
    };
    Window_BabyList.prototype.search = function () {
      this._data = [];
      for (var _i = 0, _a = this._allData; _i < _a.length; _i++) {
        var a = _a[_i];
        if (this.isInclude(a)) {
          this._data.push(a);
        }
      }
    };
    Window_BabyList.prototype.isInclude = function (info) {
      switch (this._searchType) {
        case SearchType.all:
          return true;
        case SearchType.actor7:
          return info.getTaneoyaType() == TaneoyaId.charles;
        default:
          return this._searchType == info.actorId();
      }
    };
    Window_BabyList.prototype.setSortType = function (s) {
      if (this._sortType == s) {
        if (this._sortOrder == SortOrder.up) {
          this._sortOrder = SortOrder.down;
        } else {
          this._sortOrder = SortOrder.up;
        }
      } else {
        this._sortOrder = SortOrder.up;
      }
      this._sortType = s;
      this.sort();
      this.refresh();
    };
    Window_BabyList.prototype.sort = function () {
      switch (this._sortType) {
        case SortType.normal:
          this.sortNormal();
          break;
        case SortType.total:
          this.sortTotal();
          break;
        case SortType.gold:
          this.sortGold();
          break;
      }
    };
    Window_BabyList.prototype.sortNormal = function () {
      var order = this._sortOrder;
      this._data = this._data.sort(function (a, b) {
        if (order == SortOrder.down) {
          return a.day() - b.day();
        } else {
          return b.day() - a.day();
        }
      });
    };
    Window_BabyList.prototype.sortTotal = function () {
      var order = this._sortOrder;
      this._data = this._data.sort(function (a, b) {
        if (order == SortOrder.down) {
          return a.totalParams() - b.totalParams();
        } else {
          return b.totalParams() - a.totalParams();
        }
      });
    };
    Window_BabyList.prototype.sortGold = function () {
      var order = this._sortOrder;
      this._data = this._data.sort(function (a, b) {
        if (order == SortOrder.down) {
          return a.gold() - b.gold();
        } else {
          return b.gold() - a.gold();
        }
      });
    };
    Window_BabyList.prototype.loadEroList = function () {
      for (var _i = 0, _a = this._allData; _i < _a.length; _i++) {
        var info = _a[_i];
        if (info.imageId()) {
          ImageManager.loadEro(info.imageId());
        }
      }
    };
    Window_BabyList.prototype.makeItemList = function () {
      if (this._allData) {
        return;
      }
      if (this._actor) {
        this.makeOneActorItemList();
      } else {
        this.makeAllItemList();
      }
      this._data = this._allData.concat();
    };
    Window_BabyList.prototype.makeOneActorItemList = function () {
      var babyList = this._actor.babyList();
      this._allData = babyList;
      this.makeTrophy();
    };
    Window_BabyList.prototype.makeTrophy = function () {
      var goldSort = this._allData.sort(function (a, b) {
        return b.gold() - a.gold();
      });
      for (var i = 0; i < 3; i++) {
        var info = goldSort[i];
        if (!info) {
          return;
        }
        info.setRank(i + 1);
      }
    };
    Window_BabyList.prototype.drawAllItems = function () {
      this._windowContentsSprite.removeChildren();
      _super.prototype.drawAllItems.call(this);
    };
    Window_BabyList.prototype.makeAllItemList = function () {
      var babyList = [];
      var index = 0;
      for (var _i = 0, _a = $gameParty.members(); _i < _a.length; _i++) {
        var actor = _a[_i];
        var list = actor.getActorHistory().getHistoryList();
        for (var _b = 0, list_2 = list; _b < list_2.length; _b++) {
          var history_1 = list_2[_b];
          for (
            var _c = 0, _d = history_1.getEventList();
            _c < _d.length;
            _c++
          ) {
            var event_1 = _d[_c];
            for (
              var _e = 0, _f = event_1.getScheduleList();
              _e < _f.length;
              _e++
            ) {
              var s = _f[_e];
              if (s.countSyusan() > 0) {
                var syusan = new SyusanInfo(s);
                babyList.push(syusan);
              }
            }
          }
        }
        for (var _g = 0, list_3 = list; _g < list_3.length; _g++) {
          var history_2 = list_3[_g];
          for (
            var _h = 0, _j = history_2.getEventList();
            _h < _j.length;
            _h++
          ) {
            var event_2 = _j[_h];
            for (
              var _k = 0, _l = event_2.getScheduleList();
              _k < _l.length;
              _k++
            ) {
              var s = _l[_k];
              //p('s.countNinshin() ' + s.countNinshin())
              if (s.countNinshin() > 0) {
                var syusan = babyList[index];
                if (!syusan) {
                  break;
                }
                syusan.ninshin = history_2;
                syusan.ninshinSchedule = s;
                index++;
              }
            }
          }
        }
      }
      var okList = [];
      for (var _m = 0, babyList_1 = babyList; _m < babyList_1.length; _m++) {
        var a = babyList_1[_m];
        if (a.syusan && a.ninshin) {
          okList.push(a);
        } else {
        }
      }
      this._allData = okList;
      this.makeTrophy();
    };
    Window_BabyList.prototype.drawItem = function (index) {
      var item = this._data[index];
      var rect = this.itemRect(index);
      this.drawBaby(item, rect);
    };
    Window_BabyList.prototype.maxItems = function () {
      if (!this._data) {
        return 0;
      }
      return this._data.length;
    };
    Window_BabyList.prototype.maxCols = function () {
      return 3;
    };
    Window_BabyList.prototype.cursorPageup = function () {
      var index = this.index();
      if (this.topRow() > 0) {
        this.smoothScrollUp(this.maxPageRows());
        this.select(Math.max(index - this.maxPageItems(), 0));
      }
    };
    return Window_BabyList;
  })(Window_BabyBase);
  var SORT_WIDTH = 160;
  var SEARCH_WIDTH = 50;
  var Window_BabyCommand = /** @class */ (function (_super) {
    __extends(Window_BabyCommand, _super);
    function Window_BabyCommand() {
      var _this = _super.call(this, new Rectangle(0, 0, 1090, 70)) || this;
      _this._searchType = SearchType.all;
      _this._sortType = SortType.normal;
      return _this;
    }
    Window_BabyCommand.prototype.makeCommandList = function () {
      this.addCommand(TextManager.sortDay, "normal", true);
      this.addCommand(TextManager.sortAptitude, "total", true);
      this.addCommand(TextManager.sortGold, "gold", true);
      this.addCommand(TextManager.searchAll, "searchAll", true);
      this.addCommand(TextManager.search1, "search1", true);
      this.addCommand(TextManager.search3, "search3", true);
      this.addCommand(TextManager.search7, "search7", true);
      this.addCommand(TextManager.search2, "search2", true);
      this.addCommand(TextManager.search4, "search4", true);
      this.addCommand(TextManager.search5, "search5", true);
      this.addCommand(TextManager.search6, "search6", true);
      this.addCommand(TextManager.search10, "search10", true);
      this.addCommand(TextManager.search12, "search12", true);
    };
    Window_BabyCommand.prototype.refresh = function () {
      this._windowContentsSprite.removeChildren();
      _super.prototype.refresh.call(this);
    };
    Window_BabyCommand.prototype.setSearchType = function (s) {
      if (this._searchType == s) {
        return;
      }
      this._searchType = s;
      this.refresh();
    };
    Window_BabyCommand.prototype.setSortType = function (s) {
      if (this._sortType == s) {
        return;
      }
      this._sortType = s;
      this.refresh();
    };
    Window_BabyCommand.prototype.cursorDown = function () {
      this.callHandler("down");
    };
    Window_BabyCommand.prototype.cursorUp = function () {
      this.callHandler("up");
    };
    Window_BabyCommand.prototype.maxCols = function () {
      return 13;
    };
    Window_BabyCommand.prototype.itemRect = function (index) {
      var rect = _super.prototype.itemRect.call(this, index);
      if (index < 3) {
        rect.width = SORT_WIDTH;
        rect.x = SORT_WIDTH * index;
      } else {
        rect.width = SEARCH_WIDTH;
        rect.x = SORT_WIDTH * 3 + (index - 3) * SEARCH_WIDTH;
      }
      return rect;
    };
    Window_BabyCommand.prototype.drawItem = function (index) {
      if (index < 4) {
        return this.drawItemText(index);
      }
      var rect = this.itemRect(index);
      var symbol = this.commandSymbol(index);
      var regExp = /search([0-9]+)/;
      var match = regExp.exec(symbol);
      if (!match) {
        return;
      }
      var actorId = parseInt(match[1]);
      var cos = new CostumeSaver(actorId);
      var c = new Nore.Game_DungeonCharacter(cos, rect.x + 40, rect.y + 70);
      c.setMonoTone(actorId != this._searchType);
      var sprite = new Sprite_ActorCharacter(c, cos);
      this._windowContentsSprite.addChild(sprite);
    };
    Window_BabyCommand.prototype.drawItemText = function (index) {
      var rect = this.itemLineRect(index);
      var align = this.itemTextAlign();
      this.resetTextColor();
      var enabled = true;
      if (index == 3) {
        enabled = this._searchType == SearchType.all;
      } else {
        enabled = this._sortType == index;
      }
      this.changePaintOpacity(enabled);
      this.drawText(this.commandName(index), rect.x, rect.y, rect.width, align);
    };
    return Window_BabyCommand;
  })(Window_HorzCommand);
  var ChildSprite = /** @class */ (function (_super) {
    __extends(ChildSprite, _super);
    function ChildSprite(schedule) {
      var _this = _super.call(this) || this;
      _this._schedule = schedule;
      _this._child = _this._schedule.child();
      if (!_this._child) {
        return _this;
      }
      _this.createBaseImage();
      _this.createHairImage();
      _this.scale.x = 0.5;
      _this.scale.y = 0.5;
      return _this;
    }
    ChildSprite.prototype.destroy = function (options) {
      this.removeChildren();
      _super.prototype.destroy.call(this, options);
    };
    ChildSprite.prototype.createBaseImage = function () {
      this._baseSprite = new PIXI.Sprite(this.getBaseImage());
      this.addChild(this._baseSprite);
    };
    ChildSprite.prototype.createHairImage = function () {
      var texture = this.getHairImage();
      if (!texture) {
        return;
      }
      this._hairSprite = new PIXI.Sprite(texture);
      this.addChild(this._hairSprite);
    };
    ChildSprite.prototype.getBaseImage = function () {
      var sex = this._child.isMale() ? "boy" : "girl";
      var type = this._child.taneoyaType() == TaneoyaId.banzoku ? 2 : 1;
      if (this._child.taneoyaType() == TaneoyaId.goblin) {
        sex = "gob";
      }
      var text = "0child_%1_0%2.png".format(sex, type);
      return PIXI.utils.TextureCache[text];
    };
    ChildSprite.prototype.getHairImage = function () {
      if (this._child.taneoyaType() == TaneoyaId.goblin) {
        return null;
      }
      var type = this._child.isMale() ? "boy" : "girl";
      var text = "0child_hair_%1_%2.png".format(
        type,
        this._schedule._actorId.padZero(2)
      );
      return PIXI.utils.TextureCache[text];
    };
    return ChildSprite;
  })(Sprite);
  Nore.ChildSprite = ChildSprite;
})(Nore || (Nore = {}));
var Game_BabyCharacter = /** @class */ (function (_super) {
  __extends(Game_BabyCharacter, _super);
  function Game_BabyCharacter(child, day, x, y) {
    var _this = _super.call(this) || this;
    _this._child = child;
    _this._day = day;
    _this._x = x;
    _this._y = y;
    return _this;
  }
  Game_BabyCharacter.prototype.screenX = function () {
    return this._x;
  };
  Game_BabyCharacter.prototype.screenY = function () {
    return this._y;
  };
  Game_BabyCharacter.prototype.characterName = function () {
    return this._child.getCharacterImage();
  };
  Game_BabyCharacter.prototype.direction = function () {
    return this._child.getDirection($gameSystem.realDay() - this._day);
  };
  return Game_BabyCharacter;
})(Game_CharacterBase);
