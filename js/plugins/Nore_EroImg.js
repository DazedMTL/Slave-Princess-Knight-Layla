/*:ja
 * @target MZ
 * @author ル
 *
 * @command PreloadJpg
 * @text JPGロード
 * @des JPGロード
 * @arg file
 * @type string
 * @text file
 * @desc file
 *
 * @command PreloadWebp
 * @text webpロード
 * @des webpロード
 * @arg file
 * @type string
 * @text file
 * @desc file
 *
 * @command PreloadWebp2
 * @text webpロード
 * @des webpロード
 * @arg file
 * @type string
 * @text file
 * @desc file
 *
 * @command ReleaseWebp
 * @text webpリリース
 * @des webpリリース
 * @arg file
 * @type string
 * @text file
 * @desc file
 *
 * @command IgnoreFile
 * @text 画像無視
 * @des 画像無視
 * @arg file
 * @type string
 * @text 無視するファイルID
 * @desc 無視するファイルID(01_02)
 * @arg index
 * @type number
 * @text インデックス
 * @desc インデックス
 *
 * @command IgnoreFileList
 * @text 画像無視リスト
 * @des 画像無視リスト
 * @arg file
 * @type string
 * @text 無視するファイルID
 * @desc 無視するファイルID(01_02)
 * @arg indexList
 * @type string
 * @text インデックス
 * @desc インデックス
 *
 * @command removeIgnore
 * @text 画像無視解除
 * @des 画像無視解除
 * @arg file
 * @type string
 * @text 無視するファイルID
 * @desc 無視するファイルID(01_02)
 * @arg index
 * @type number
 * @text インデックス
 * @desc インデックス
 *
 * @command setEroBase
 * @text 基本画像設定
 * @des 基本画像設定
 * @arg value
 * @type number
 *
 * @command hideGion
 *
 * @command hideAegi
 *
 */
var Nore;
(function (Nore) {
  Nore.GION_PIC_ID = 27;
  Nore.AEGI_PIC_ID = 29;
  var GION_RANDOM_X = 70;
  var AEGI_RANDOM_X = 160;
  Nore.spriteSheetCache = {};
  function isCached(id) {
    if (!PIXI.utils.BaseTextureCache) {
      return false;
    }
    return PIXI.utils.BaseTextureCache["img/ero/ero%1_1.webp".format(id)];
  }
  Nore.isCached = isCached;
  var cgFolder = "ero";
  var jpegPrefix = "__CG_JPG__";
  Nore.gionPrefix = "0gion_";
  Nore.aegiPrefix = "0aegi_";
  Nore.webpPrefix = "__CG_WEBP__";
  var pluginName = "Nore_EroImg";
  PluginManager.registerCommand(pluginName, "PreloadJpg", function (args) {
    ImageManager.loadJpeg(args.file);
  });
  PluginManager.registerCommand(pluginName, "PreloadWebp", function (args) {
    var file = "img/ero/ero" + args.file + ".json";
    var sheet = Nore.spriteSheetCache[file];
    if (sheet) {
      return;
    }
    ImageManager.loadSpriteSheet(file);
    this.setWaitMode("image");
  });
  PluginManager.registerCommand(pluginName, "ReleaseWebp", function (args) {
    var file = "img/ero/ero" + args.file + ".json";
    var lastIndex = (args.file + "").lastIndexOf("_");
    ImageManager.releaseSpriteSheetPath(file);
    if (lastIndex > 0) {
      var base = args.file.substring(0, lastIndex + 1);
      var start = parseInt(args.file.substring(lastIndex + 1));
      for (var i = start + 1; i < 7; i++) {
        var otherFile = "img/ero/ero" + base + i + ".json";
        p(otherFile);
        var success = ImageManager.releaseSpriteSheetPath(otherFile, true);
        if (!success) {
          return;
        }
        p("success");
      }
    }
    /*if (args.file2) {
            const file2 = 'img/ero/ero' + args.file2 + '.json';
            ImageManager.releaseSpriteSheetPath(file2, true);
        }
        if (args.file3) {
            const file3 = 'img/ero/ero' + args.file3 + '.json';
            ImageManager.releaseSpriteSheetPath(file3, true);
        }*/
  });
  PluginManager.registerCommand(pluginName, "IgnoreFile", function (args) {
    var index = args.index;
    var file = args.file;
    $gameTemp.addIgnoreFileSet(file, index);
  });
  PluginManager.registerCommand(pluginName, "IgnoreFileList", function (args) {
    var file = args.file;
    var indexList = args.indexList;
    var list = indexList.split(",");
    for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
      var i = list_1[_i];
      $gameTemp.addIgnoreFileSet(file, i);
    }
  });
  PluginManager.registerCommand(pluginName, "removeIgnore", function (args) {
    var index = args.index;
    var file = args.file;
    $gameTemp.removeIgnoreFileSet(file, index);
  });
  PluginManager.registerCommand(pluginName, "setEroBase", function (args) {
    var file = Math.trunc(args.value);
    $gameTemp.setEroBaseId(file);
  });
  PluginManager.registerCommand(pluginName, "showGion", function (args) {
    var file = args.id;
    $gameTemp.showGion(file);
  });
  PluginManager.registerCommand(pluginName, "hideGion", function (args) {
    $gameTemp.hideGion();
  });
  PluginManager.registerCommand(pluginName, "showAegi", function (args) {
    var file = args.id;
    $gameTemp.showAegi(file);
  });
  PluginManager.registerCommand(pluginName, "setAegiIds", function (args) {
    $gameTemp.setAegiIds(args.ids);
  });
  PluginManager.registerCommand(pluginName, "showAegiRandom", function (args) {
    var file = Nore.shuffle(args.ids)[0];
    $gameTemp.showAegi(file);
  });
  PluginManager.registerCommand(pluginName, "hideAegi", function (args) {
    $gameTemp.hideAegi();
  });
  PluginManager.registerCommand(pluginName, "SetEroId", function (args) {
    $gameTemp.setEroId(args.id);
  });
  ImageManager.preloadEro = function (filename, hue, smooth) {
    var folder = "img/ero/";
    if (filename) {
      var path = folder + encodeURIComponent(filename) + ".jpg";
      var key = path + ":" + hue;
      this.cache2 = this.cache2 || {};
      if (!this._cache2[key]) {
        this.loadNormalBitmap2(path, hue || 0);
      }
    }
  };
  ImageManager.loadEro = function (filename, hue, smooth) {
    return this.loadBitmap("img/" + cgFolder + "/", filename, hue, true);
  };
  ImageManager.loadWebp = function (filename, hue) {
    return this._loadWebp("img/" + cgFolder + "/", filename, hue, true);
  };
  ImageManager._loadWebp = function (folder, filename, hue, smooth) {
    if (filename) {
      var path = folder + encodeURIComponent(filename) + ".webp";
      var bitmap = this.loadNormalBitmap2(path, hue || 0);
      bitmap.smooth = smooth;
      return bitmap;
    } else {
      return this.loadEmptyBitmap();
    }
  };
  ImageManager.loadJpeg = function (filename, hue) {
    return this._loadJpeg("img/" + cgFolder + "/", filename, hue, true);
  };
  ImageManager._loadJpeg = function (folder, filename, hue, smooth) {
    if (filename) {
      var path = folder + encodeURIComponent(filename) + ".jpg";
      var bitmap = this.loadNormalBitmap2(path, hue || 0);
      bitmap.smooth = smooth;
      return bitmap;
    } else {
      return this.loadEmptyBitmap();
    }
  };
  ImageManager.loadNormalBitmap2 = function (path, hue) {
    var key = path + ":" + hue;
    this.cache2 = this.cache2 || {};
    var bitmap = this.cache2[key];
    if (!bitmap) {
      bitmap = Bitmap.load(path);
      bitmap.addLoadListener(function () {
        bitmap.rotateHue(hue);
      });
      this.cache2[key] = bitmap;
    }
    return bitmap;
  };
  ImageManager.clearEro = function () {
    p("clearEro");
    this.cache2 = this.cache2 || {};
    for (var key in this.cache2) {
      this.cache2[key].destroy();
    }
    this.cache2 = {};
  };
  ImageManager.releaseSpriteSheet = function (file) {
    var path = "img/ero/" + file + ".json";
    this.releaseSpriteSheetPath(path);
  };
  ImageManager.releaseSpriteSheetPath = function (path, ignoreError) {
    if (ignoreError === void 0) {
      ignoreError = false;
    }
    var sheet = Nore.spriteSheetCache[path];
    if (!sheet) {
      if (!ignoreError) {
        console.error(path);
      }
      return false;
    }
    delete Nore.spriteSheetCache[path];
    //p('release:' + path);
    var baseTex = null;
    for (var key in sheet.textures) {
      sheet.textures[key].destroy(true);
      baseTex = sheet.textures[key].baseTexture;
    }
    PIXI.Texture.removeFromCache(PIXI.utils.TextureCache[path]);
    PIXI.Texture.removeFromCache(PIXI.utils.TextureCache[path + "_image"]);
    if (baseTex) {
      baseTex.destroy(true);
      Graphics.callGC();
    }
    return true;
  };
  Sprite_Picture.prototype.clear = function () {
    this.eroAnime = null;
    this._pictureName = "";
    if (this._gionSprite) {
      this.removeChildren();
      this._gionSprite = null;
    }
    if (this._aegiSprite) {
      this.removeChildren();
      this._aegiSprite = null;
    }
    this.update();
  };
  var _Sprite_Picture_loadBitmap = Sprite_Picture.prototype.loadBitmap;
  Sprite_Picture.prototype.loadBitmap = function () {
    if (this._pictureName instanceof Array) {
      $gameTemp.ignoreFiles = {};
      this.drawEroList(this._pictureName);
    } else if (this._pictureName.indexOf(Nore.gionPrefix) === 0) {
      var gionId_1 = this._pictureName;
      this.eroGionFrame = 100;
      this.drawGionPicture(gionId_1);
    } else if (this._pictureName.indexOf(Nore.aegiPrefix) === 0) {
      var aegiId_1 = this._pictureName;
      this.eroAegiFrame = 140;
      //this.drawAegiPicture(aegiId);
    } else if (this._pictureName.indexOf(jpegPrefix) === 0) {
      this.eroAnime = null;
      this.bitmap = ImageManager.loadJpeg(
        this._pictureName.substr(jpegPrefix.length)
      );
    } else if (this._pictureName.indexOf(Nore.webpPrefix) === 0) {
      var file = this._pictureName.substr(Nore.webpPrefix.length);
      if (file.length <= 17) {
        this.eroAnime = null;
        this.drawEro(file);
      } else {
        try {
          var json = JSON.parse(file);
          var wait = Math.floor(json.wait);
          this.eroAnime = json.pic;
          this.eroAnimeIndex = 0;
          this.eroAnimeWait = wait;
          this.eroAnimeFrameIndex = 0;
          this.eroSeIndex = json.seIndex;
          this.eroGionIndex = json.gionIndex;
          this.eroOnce = json.once;
          this.eroSeList = json.se;
          this.eroGionList = json.gion;
          this.drawEro(this.eroAnime[this.eroAnimeIndex]);
        } catch (e) {
          p(file);
          throw e;
        }
      }
    } else {
      _Sprite_Picture_loadBitmap.call(this);
    }
  };
  var _Sprite_Picture_update = Sprite_Picture.prototype.update;
  Sprite_Picture.prototype.update = function () {
    _Sprite_Picture_update.call(this);
    if (this._pictureName.indexOf(Nore.webpPrefix) === 0) {
      if (this._lastManAlpha != $gameSystem.manAlpha()) {
        var file = this._pictureName.substr(Nore.webpPrefix.length);
        if (file.length <= 15) {
          this.loadBitmap();
        }
      }
      this._lastManAlpha = $gameSystem.manAlpha();
    }
  };
  Sprite_Picture.prototype.drawGionPicture = function (filename) {
    var texture = PIXI.utils.TextureCache[filename + ".png"];
    if (!texture) {
      //p('gion が見つかりません:' + filename)
      return;
    }
    if (this._gionSprite) {
      this.removeChildren();
      this._gionSprite = null;
    }
    if (this._gionSprite) {
      return;
    }
    var sprite = new PIXI.Sprite(texture);
    sprite.x = -(texture.trim.width / 2);
    sprite.y = -(texture.trim.height / 2);
    this.removeChildren();
    this.addChild(sprite);
    this._gionSprite = sprite;
  };
  Sprite_Picture.prototype.drawAegiPicture = function (filename) {
    var texture = PIXI.utils.TextureCache[filename + ".png"];
    if (!texture) {
      //p('aegi が見つかりません:' + filename)
      return;
    }
    if (this._aegiSprite) {
      this.removeChildren();
      this._aegiSprite = null;
    }
    if (this._aegiSprite) {
      return;
    }
    var sprite = new PIXI.Sprite(texture);
    sprite.x = -(texture.trim.width / 2);
    sprite.y = -(texture.trim.height / 2);
    this.removeChildren();
    this.addChild(sprite);
    this._aegiSprite = sprite;
  };
  var _ImageManager_loadPicture = ImageManager.loadPicture;
  ImageManager.loadPicture = function (filename) {
    if (filename.indexOf(Nore.webpPrefix) === 0) {
      return;
    }
    return _ImageManager_loadPicture.call(this, filename);
  };
  Sprite_Picture.prototype.drawEro = function (file) {
    if (file.contains("omanko")) {
      this.drawOmanko(file);
      return;
    }
    var renderTexture = $gameTemp.getActorBitmapBodyCache(this._pictureId);
    var s = new PIXI.Sprite();
    switch ($gameVariables.value(10)) {
      case 1:
        this.drawEro2(s, file.substr(0, 6) + "back1");
        break;
      case 2:
        this.drawEro2(s, file.substr(0, 6) + "back2");
        break;
      case 3:
        this.drawEro2(s, file.substr(0, 6) + "back3");
        break;
      case 4:
        this.drawEro2(s, file.substr(0, 6) + "back4");
        break;
    }
    //p(file)
    var max = $gameVariables.value(14);
    for (var i = 1; i <= max; i++) {
      var imageId = i.padZero(2);
      this.drawEro2(s, file + "_" + imageId, file, i);
    }
    this.drawNakaRakugaki(s, file);
    var renderer = Graphics.app.renderer;
    renderer.render(s, renderTexture);
    var sprite = new PIXI.Sprite(renderTexture);
    this.removeChildren();
    this._eroSprite = sprite;
    this.addChild(sprite);
  };
  Sprite_Picture.prototype.drawNakaRakugaki = function (s, fileId) {
    var eroBaseId = $gameTemp.eroBaseId();
    if (eroBaseId == 0) {
      return;
    }
    if (!fileId) {
      return;
    }
    var list = fileId.split("_");
    var actorId = Math.trunc(list[0]);
    var eroId = Math.trunc(list[2]);
    var animeId;
    if ($gameSwitches.value(10)) {
      animeId = eroBaseId;
    } else {
      if ($gameSwitches.value(11)) {
        animeId = eroBaseId + (eroId % 100);
      } else {
        animeId = eroBaseId + (eroId % 10);
      }
    }
    var actor = $gameActors.actor(actorId);
    var nakadashi = Math.min(
      actor.nakadashiRakugakiCount(),
      $gameTemp.maxNakadashiRakuagki()
    );
    var baseFileId =
      list[0] +
      "_" +
      list[1] +
      "_" +
      animeId.padZero(2) +
      "_" +
      "naka_" +
      nakadashi.padZero(2);
    var texture = this.selectTexture(s, baseFileId);
    if (!texture) {
      return null;
    }
    var sprite = new PIXI.Sprite(texture);
    sprite.x = $gameVariables.value(45);
    sprite.y = $gameVariables.value(46);
    s.addChild(sprite);
  };
  Sprite_Picture.prototype.drawEroList = function (fileList) {
    var renderTexture = $gameTemp.getActorBitmapBodyCache(this._pictureId);
    var s = new PIXI.Sprite();
    //this.drawEro2(s, '01_50_back');
    for (var i = 0; i < fileList.length; i++) {
      this.drawEro2(s, fileList[i]);
    }
    var renderer = Graphics.app.renderer;
    renderer.render(s, renderTexture);
    var sprite = new PIXI.Sprite(renderTexture);
    this.removeChildren();
    this._eroSprite = sprite;
    this.addChild(sprite);
  };
  var _Sprite_Picture_prototype_destroy = Sprite_Picture.prototype.destroy;
  Sprite_Picture.prototype.destroy = function () {
    if (this._eroSprite) {
      this.removeChild(this._eroSprite);
      this._eroSprite = null;
    }
    _Sprite_Picture_prototype_destroy.call(this);
  };
  Sprite_Picture.prototype.drawEro2 = function (s, file, fileId, index) {
    var texture = this.selectTexture(s, file);
    if (!texture) {
      /*if (index != 1) {
                return null;
            }*/
      var eroBaseId = $gameTemp.eroBaseId();
      if (eroBaseId == 0) {
        return null;
      }
      if (!fileId) {
        return null;
      }
      var list = fileId.split("_");
      var eroId = Math.trunc(list[2]);
      var animeId = void 0;
      if ($gameSwitches.value(10)) {
        animeId = eroBaseId;
      } else {
        if ($gameSwitches.value(11)) {
          animeId = eroBaseId + (eroId % 100);
        } else {
          animeId = eroBaseId + (eroId % 10);
        }
      }
      var baseFileId =
        list[0] +
        "_" +
        list[1] +
        "_" +
        animeId.padZero(2) +
        "_" +
        index.padZero(2);
      texture = this.selectTexture(s, baseFileId);
      if (!texture) {
        return null;
      }
      //p(baseFileId)
    }
    var sprite = new PIXI.Sprite(texture);
    sprite.x = $gameVariables.value(45);
    sprite.y = $gameVariables.value(46);
    if (texture.textureCacheIds.length > 0) {
      if (texture.textureCacheIds[0].includes("man")) {
        sprite.alpha = $gameSystem.manAlpha();
      }
    }
    s.addChild(sprite);
  };
  Sprite_Picture.prototype.selectTexture = function (s, file) {
    if ($gameTemp.ignoreFiles[file]) {
      return null;
    }
    var boteId = $gameVariables.value(980);
    var manId = $gameVariables.value(48);
    if (manId > 0) {
      var manFile = file + "_man0" + manId + ".png";
      if (boteId > 0) {
        var texture1_1 =
          PIXI.utils.TextureCache[
            file + "_man0" + manId + "_bote" + boteId + ".png"
          ];
        if (texture1_1) {
          return texture1_1;
        }
        var texture2 =
          PIXI.utils.TextureCache[file + "_man0" + manId + "_bote" + ".png"];
        if (texture2) {
          return texture2;
        }
      }
      var texture1 = PIXI.utils.TextureCache[manFile];
      if (texture1) {
        return texture1;
      }
    }
    var mankoId = $gameVariables.value(979);
    if (mankoId > 0) {
      var mankoFile = file + "_omanko0" + mankoId + ".png";
      var texture1 = PIXI.utils.TextureCache[mankoFile];
      if (texture1) {
        return texture1;
      }
    }
    var analId = $gameVariables.value(976);
    if (analId > 0) {
      var analFile = file + "_anal0" + analId + ".png";
      var texture1 = PIXI.utils.TextureCache[analFile];
      if (texture1) {
        return texture1;
      }
    }
    if (boteId > 0) {
      var texture1 = PIXI.utils.TextureCache[file + "_bote" + boteId + ".png"];
      if (texture1) {
        return texture1;
      }
      var texture2 = PIXI.utils.TextureCache[file + "_bote" + ".png"];
      if (texture2) {
        return texture2;
      }
    }
    var texture = PIXI.utils.TextureCache[file + ".png"];
    if (texture) {
      return texture;
    }
    return texture;
  };
  Sprite_Picture.prototype.updateGion = function () {
    if (this.eroGionFrame > 0) {
    } else {
      return;
    }
    if (!this._gionSprite) {
      return;
    }
    if (
      $gameTemp.gionId &&
      Nore.gionPrefix + $gameTemp.gionId == this._pictureName
    ) {
      return;
    }
    this.eroGionFrame--;
    this.eroGionFrame--;
    this.eroGionFrame--;
    this.eroGionFrame--;
    //p(this.eroGionFrame)
    var f = this.eroGionFrame;
    var opacity = 255;
    if (f > 70) {
      opacity = 255 - (f - 70) * 5;
    } else if (f < 40) {
      opacity = f * 6;
    } else {
      opacity = 255;
    }
    this._gionSprite.alpha = opacity / 255;
    if (this.eroGionFrame <= 0) {
      this.removeChildren();
      this._gionSprite = null;
      this.eroGionFrame = 0;
      this._pictureName = "";
      var picture = this.picture();
      picture.initBasic();
    }
  };
  Sprite_Picture.prototype.updateAegiSprite = function () {
    if (this.eroAegiFrame > 0) {
    } else {
      return;
    }
    if (!this._aegiSprite) {
      return;
    }
    if (
      $gameTemp.aegiId &&
      Nore.aegiPrefix + $gameTemp.aegiId == this._pictureName
    ) {
      return;
    }
    this.eroAegiFrame--;
    this.eroAegiFrame--;
    this.eroAegiFrame--;
    //p(this.eroAegiFrame)
    var f = this.eroAegiFrame;
    var opacity = 255;
    if (f > 70) {
      opacity = 255 - (f - 70) * 5;
    } else if (f < 40) {
      opacity = f * 6;
    } else {
      opacity = 255;
    }
    this._aegiSprite.alpha = opacity / 255;
    if (this.eroAegiFrame <= 0) {
      this.removeChildren();
      this._aegiSprite = null;
      this.eroAegiFrame = 0;
      this._pictureName = "";
      var picture = this.picture();
      picture.initBasic();
    }
  };
  var Sprite_Picture_prototype_updateOther =
    Sprite_Picture.prototype.updateOther;
  Sprite_Picture.prototype.updateOther = function () {
    Sprite_Picture_prototype_updateOther.call(this);
    this.updateGion();
    this.updateAegiSprite();
    var picture = this.picture();
    this.opacity = picture.opacity();
    this.blendMode = picture.blendMode();
    this.alpha = this.opacity / 255;
    this.rotation = (picture.angle() * Math.PI) / 180;
    var lastIndex = this.eroAnimeIndex;
    if (this.opacity == 0 || !this.visible) {
      return;
    }
    if (this.eroAnime) {
      this.alpha = 1;
      this.eroAnimeFrameIndex++;
      if (this.eroAnimeFrameIndex >= this.eroAnimeWait) {
        this.eroAnimeFrameIndex = 0;
        this.eroAnimeIndex++;
        if (this.eroAnimeIndex >= this.eroAnime.length) {
          this.eroAnimeIndex = 0;
          if (this.eroOnce) {
            this.eroAnimeIndex = this.eroAnime.length - 1;
          }
        }
        this.drawEro(this.eroAnime[this.eroAnimeIndex]);
        if (this.eroSeIndex == this.eroAnimeIndex) {
          var dice = Math.floor(this.eroSeList.length * Math.random());
          var se = this.eroSeList[dice];
          if (typeof se == "object") {
            for (var i = 0; i < se.length; i++) {
              AudioManager.playSe({
                name: se[i],
                volume: 100,
                pitch: 100,
                pan: 0,
              });
            }
          } else {
            AudioManager.playSe({ name: se, volume: 100, pitch: 100, pan: 0 });
          }
        }
        if (this.eroGionIndex == this.eroAnimeIndex) {
          var dice = Math.floor(this.eroGionList.length * Math.random());
          var gion = this.eroGionList[dice];
          var xx = $gameVariables.value(41);
          var yy = $gameVariables.value(42);
          var scale = $gameVariables.value(43) || 100;
          if (typeof gion == "object") {
            for (var i = 0; i < se.length; i++) {
              //AudioManager.playSe({ name: se[i], volume: 100, pitch: 100, pan: 0 });
            }
          } else {
            var opacity = 255;
            xx += Math.randomInt(GION_RANDOM_X) - GION_RANDOM_X / 2;
            yy += Math.randomInt(30) - 15;
            var nextGion = nextGionId();
            $gameScreen.showPicture(
              nextGion,
              Nore.gionPrefix + gion,
              0,
              xx,
              yy,
              scale,
              scale,
              opacity,
              PIXI.BLEND_MODES.NORMAL
            );
            //AudioManager.playSe({ name: se, volume: 100, pitch: 100, pan: 0 });
          }
        }
        if (lastIndex != this.eroAnimeIndex) {
          this.updateAegi();
        }
      }
    }
  };
  Sprite_Picture.prototype.drawOmanko = function (file) {
    //p(file)
    var list = file.split("_omanko_");
    var base = list[0];
    var faceId = list[1];
    var s = new PIXI.Sprite();
    var actorId = parseInt(base.split("_")[0]);
    var actor = $gameActors.actor(actorId);
    // back
    if ($gameSystem.isNight()) {
      this.drawEro2(s, base + "_back2");
    } else {
      this.drawEro2(s, base + "_back1");
    }
    if (actor.boteId > 0) {
      this.drawEro2(s, base + "_bote" + actor.boteId);
    } else {
      if (actor.hasAcce(1091)) {
        this.drawEro2(s, base + "_base2");
      } else {
        this.drawEro2(s, base + "_base");
      }
    }
    var history = $gameActors.actor(actorId).getLastHistory();
    // おまんこ
    var mankoId = $gameVariables.value(979);
    var mankoFile = "%1_manko%2".format(base, mankoId);
    this.drawEro2(s, mankoFile);
    // アナル
    var analId = Math.max(1, $gameVariables.value(976));
    var analFile = "%1_anal%2".format(base, analId);
    this.drawEro2(s, analFile);
    if (actor.isKuroChikubi()) {
      var kuroFile = "%1_kuro1".format(base);
      this.drawEro2(s, kuroFile);
    }
    // へそピアス
    if (actor.hasAcce(1004)) {
      var hesoFile = "%1_heso%2".format(base, actor.boteId);
      this.drawEro2(s, hesoFile);
    }
    // 精液
    var nakadashi = history.countNakadashi();
    $gameSwitches.setValue(88, false);
    if (nakadashi > 0) {
      $gameSwitches.setValue(88, true);
      if ($gameVariables.value(95) == 0) {
        var dice = Math.randomInt(3) + 1;
        $gameVariables.setValue(95, dice);
      }
      var seiekiId = $gameVariables.value(95);
      var seiekiFile = "%1_seieki%2".format(base, seiekiId);
      this.drawEro2(s, seiekiFile);
    }
    // ラビアピアス
    if (actor.hasAcce(1014)) {
      var labiaFile = "%1_labia%2".format(base, mankoId);
      this.drawEro2(s, labiaFile);
    }
    // 乳首ピアス
    if (actor.hasAcce(1006) || actor.hasAcce(1030)) {
      var nippleId = 1;
      if (actor.hasAcce(1030)) {
        nippleId = mankoId;
      }
      var nippleFile = "%1_nipple%2".format(base, nippleId);
      this.drawEro2(s, nippleFile);
    }
    // 首輪
    if (actor.hasAcce(1002) || actor.hasAcce(1003)) {
      var acce20File = "%1_acce02".format(base);
      this.drawEro2(s, acce20File);
    }
    // 顔
    var faceFile = "%1_face_%2".format(base, faceId);
    this.drawEro2(s, faceFile);
    // 目隠し
    if (actor.hasAcce(1020)) {
      var acce20File = "%1_acce20".format(base);
      this.drawEro2(s, acce20File);
    }
    // 首輪の鎖
    if (actor.hasAcce(1003)) {
      var acce20File = "%1_acce03".format(base);
      this.drawEro2(s, acce20File);
    }
    // 鼻フック
    if (actor.hasAcce(1038)) {
      var acce38File = "%1_acce38".format(base);
      this.drawEro2(s, acce38File);
    }
    // メガネ
    if (actor.hasAcce(1099)) {
      var acce20File = "%1_megane".format(base);
      this.drawEro2(s, acce20File);
    }
    // 出産マーク
    var babyList = history.babyList();
    if (actor.hasAcce(1021)) {
      for (var i = 0; i < babyList.length; i++) {
        var baby = babyList[i];
        var index = i + 1;
        var file_1 = this.getSyusanAcceFile(
          base,
          actor,
          index,
          baby.isMale(),
          baby.getTaneoyaType()
        );
        //p(file)
        if (PIXI.utils.TextureCache[file_1 + ".png"]) {
          this.drawEro2(s, file_1);
        }
      }
    }
    if ($gameSystem.isNight()) {
      this.drawEro2(s, base + "_night");
    }
    var renderer = Graphics.app.renderer;
    var renderTexture = $gameTemp.getActorBitmapBodyCache(this._pictureId);
    renderer.render(s, renderTexture);
    var sprite = new PIXI.Sprite(renderTexture);
    this.removeChildren();
    this._eroSprite = sprite;
    this.addChild(sprite);
  };
  Sprite_Picture.prototype.getSyusanAcceFile = function (
    baseId,
    actor,
    syusanCount,
    male,
    taneoyaId
  ) {
    var boteId = actor.boteId;
    if (taneoyaId != TaneoyaId.goblin) {
      if (boteId == 0) {
        return "%1_syusan_%2_m".format(baseId, syusanCount.padZero(2));
      } else {
        return "%1_syusan_%2_m_b%3".format(
          baseId,
          syusanCount.padZero(2),
          boteId
        );
      }
    } else {
      if (boteId == 0) {
        return "%1_syusan_%2_f".format(baseId, syusanCount.padZero(2));
      } else {
        return "%1_syusan_%2_f_b%3".format(
          baseId,
          syusanCount.padZero(2),
          boteId
        );
      }
    }
  };
  Sprite_Picture.prototype.updateAegi = function () {
    if (!this._aegiRemain) {
      this._aegiRemain = 120 + Math.randomInt(120);
    }
    this._aegiRemain--;
    if (this._aegiRemain == 0) {
      var aegi = $gameTemp.randomAegi();
      var opacity = 255;
      var xx = $gameVariables.value(54);
      var yy = $gameVariables.value(55);
      var scale = $gameVariables.value(56);
      xx += Math.randomInt(AEGI_RANDOM_X) - AEGI_RANDOM_X / 2;
      yy += Math.randomInt(30) - 15;
      var nextGion = nextAegiId();
      //p(aegi)
      $gameScreen.showPicture(
        nextGion,
        Nore.aegiPrefix + aegi,
        0,
        xx,
        yy,
        scale,
        scale,
        opacity,
        PIXI.BLEND_MODES.NORMAL
      );
    }
  };
  var gionId = 0;
  function nextGionId() {
    if (gionId == 0) {
      gionId++;
    } else {
      gionId = 0;
    }
    return Nore.GION_PIC_ID + gionId;
  }
  var aegiId = 0;
  function nextAegiId() {
    if (aegiId == 0) {
      aegiId++;
    } else {
      aegiId = 0;
    }
    return Nore.AEGI_PIC_ID + aegiId;
  }
  var _Scene_Map_updateMain = Scene_Map.prototype.updateMain;
  Scene_Map.prototype.updateMain = function () {
    _Scene_Map_updateMain.call(this);
    if (!$gameSwitches.value(16)) {
      if (
        Input.isTriggered("ok") ||
        Input.isTriggered("cancel") ||
        TouchInput.isTriggered() ||
        Input.isTriggered("shift")
      ) {
        $gameSwitches.setValue(16, true);
      }
    }
    if ($gameSystem.isEroEvent()) {
      if (Input.isPressed("left")) {
        $gameSystem.downManAlpha();
      }
      if (Input.isPressed("right")) {
        $gameSystem.upManAlpha();
      }
    }
    var messageWindow = SceneManager._scene._messageWindow;
    if (!SceneManager._scene._messageWindow) {
      return;
    }
    if (Input.isTriggered("left")) {
      if (messageWindow.pause) {
        $gameSystem.downOuterAlpha();
      }
    }
    if (Input.isTriggered("right")) {
      if (messageWindow.pause) {
        $gameSystem.upOuterAlpha();
      }
    }
  };
})(Nore || (Nore = {}));
