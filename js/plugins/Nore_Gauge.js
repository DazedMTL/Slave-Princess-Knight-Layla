var Nore;
(function (Nore) {
  Nore.SHIELD = "shield";
  Window_StatusBase.prototype.placeBasicGauges = function (actor, x, y) {
    this.placeGauge(actor, Nore.SHIELD, x, y);
    this.placeGauge(actor, "hp", x, y + this.gaugeLineHeight());
    this.placeGauge(actor, "mp", x, y + this.gaugeLineHeight() * 2);
  };
  Window_StatusBase.prototype.gaugeLineHeight = function () {
    return 21;
  };
  var _Sprite_Gauge_prototype_currentValue =
    Sprite_Gauge.prototype.currentValue;
  Sprite_Gauge.prototype.currentValue = function () {
    if (this._battler) {
      switch (this._statusType) {
        case Nore.SHIELD:
          return this._battler.shield();
      }
    }
    return _Sprite_Gauge_prototype_currentValue.call(this);
  };
  var Sprite_Gauge_prototype_valueFontSize =
    Sprite_Gauge.prototype.valueFontSize;
  Sprite_Gauge.prototype.valueFontSize = function () {
    return 16;
  };
  var Sprite_Gauge_prototype_currentMaxValue =
    Sprite_Gauge.prototype.currentMaxValue;
  Sprite_Gauge.prototype.currentMaxValue = function () {
    if (this._battler) {
      switch (this._statusType) {
        case Nore.SHIELD:
          return this._battler.maxShield();
      }
    }
    return Sprite_Gauge_prototype_currentMaxValue.call(this);
  };
  var Sprite_Gauge_prototype_label = Sprite_Gauge.prototype.label;
  Sprite_Gauge.prototype.label = function () {
    switch (this._statusType) {
      case Nore.SHIELD:
        return TextManager.shield;
    }
    return Sprite_Gauge_prototype_label.call(this);
  };
  var _Sprite_Gauge_prototype_gaugeColor1 = Sprite_Gauge.prototype.gaugeColor1;
  Sprite_Gauge.prototype.gaugeColor1 = function () {
    switch (this._statusType) {
      case Nore.SHIELD:
        return ColorManager.tpGaugeColor1();
    }
    return _Sprite_Gauge_prototype_gaugeColor1.call(this);
  };
  var _Sprite_Gauge_prototype_gaugeColor2 = Sprite_Gauge.prototype.gaugeColor2;
  Sprite_Gauge.prototype.gaugeColor2 = function () {
    switch (this._statusType) {
      case Nore.SHIELD:
        return ColorManager.tpGaugeColor2();
    }
    return _Sprite_Gauge_prototype_gaugeColor2.call(this);
  };
  Sprite_Gauge.prototype.createBitmap = function () {
    var width = this.bitmapWidth();
    var height = this.bitmapHeight();
    this.bitmap = new Bitmap(width + 50, height);
  };
  Sprite_Gauge.prototype.drawValue = function () {
    var currentValue = this.currentValue();
    var width = this.bitmapWidth() - 18;
    var xx = 10;
    if ($gameParty.battleMembers().length == 6) {
      width -= 24;
      xx = 20;
    }
    var height = this.bitmapHeight();
    this.setupValueFont();
    this.bitmap.drawText(
      Math.floor(currentValue) + "/",
      -5,
      0,
      width,
      height,
      "right"
    );
    this.bitmap.drawText(
      Math.floor(this.currentMaxValue()),
      38 - xx,
      0,
      width,
      height,
      "right"
    );
  };
  Sprite_Gauge.prototype.gaugeForecastRate = function () {
    if (this.isValid()) {
      if (!this._battler.isForecast()) {
        return 0;
      }
      var value = this.forecastValue();
      var maxValue = this._maxValue;
      return maxValue > 0 ? value / maxValue : 0;
    } else {
      return 0;
    }
  };
  Sprite_Gauge.prototype.forecastValue = function () {
    if (this._battler) {
      switch (this._statusType) {
        case Nore.SHIELD:
          return this._battler.forecastShield();
        case "hp":
          return this._battler.forecastHp();
        case "mp":
          return this._battler.mp;
        case "tp":
          return this._battler.tp;
        case "time":
          return this._battler.tpbChargeTime();
      }
    }
    return NaN;
  };
  Sprite_Gauge.prototype.gaugeHeight = function () {
    switch (this._statusType) {
      case Nore.SHIELD:
        return 12;
    }
    return 12;
  };
  Sprite_Gauge.prototype.updateBitmap = function () {
    var value = this.currentValue();
    var maxValue = this.currentMaxValue();
    if (value !== this._targetValue || maxValue !== this._targetMaxValue) {
      this.updateTargetValue(value, maxValue);
    }
    var forecast = this._battler.isForecast();
    if (
      forecast != this._forecast ||
      this._lastForecast != this._battler.forecastDamage()
    ) {
      this._forecast = forecast;
      this._lastForecast = this._battler.forecastDamage();
      this.redraw();
    }
    this.updateGaugeAnimation();
    this.updateFlashing();
  };
  Sprite_Gauge.prototype.drawGaugeRect = function (x, y, width, height) {
    x -= 60;
    width -= 20;
    var rate = this.gaugeRate();
    var forecast = this.gaugeForecastRate();
    var fillW = Math.floor((width - 2) * rate);
    var fillH = height - 2;
    var color0 = this.gaugeBackColor();
    var color1 = this.gaugeColor1();
    var color2 = this.gaugeColor2();
    this.bitmap.fillRect(x, y, width, height, color0);
    if (this._battler.isForecast()) {
      var fillorecastW = Math.floor((width - 2) * forecast);
      var color = ColorManager.deathColor();
      this.bitmap.gradientFillRect(x + 1, y + 1, fillW, fillH, color, color);
      this.bitmap.gradientFillRect(
        x + 1,
        y + 1,
        fillorecastW,
        fillH,
        color1,
        color2
      );
      return;
    }
    this.bitmap.gradientFillRect(x + 1, y + 1, fillW, fillH, color1, color2);
  };
  Sprite_Gauge.prototype.drawLabel = function () {
    var label = this.label();
    var x = this.labelOutlineWidth() / 2;
    var y = this.labelY();
    var width = this.bitmapWidth();
    var height = this.textHeight();
    this.setupLabelFont();
    this.bitmap.paintOpacity = this.labelOpacity();
    //this.bitmap.drawText(label, x + 6, y, width, height, "left");
    this.bitmap.paintOpacity = 255;
    var baseTexture2 = Nore.getSystemBaseTexture("Battle");
    var rect = new Rectangle(0, 0, 48, 24);
    if (label == "HP") {
      rect.y = 24;
    }
    if (label == "MP") {
      rect.y = 48;
    }
    var texture = new PIXI.Texture(baseTexture2, rect);
    var sprite = new PIXI.Sprite(texture);
    sprite.x = -2;
    sprite.y = 7;
    this.destroyAndRemoveChildren();
    this.addChild(sprite);
  };
})(Nore || (Nore = {}));
