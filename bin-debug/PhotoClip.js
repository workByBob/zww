var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var PhotoClip = (function (_super) {
    __extends(PhotoClip, _super);
    function PhotoClip(texture, callback) {
        var _this = _super.call(this) || this;
        _this.sureBtn = null;
        _this.scrollG = null;
        _this.mBmp = null;
        _this.imageGroup = null;
        _this._texture = null;
        _this._callback = null;
        _this.rect = null;
        _this.touchX = 0;
        _this.touchY = 0;
        _this.isTouch = false;
        _this._texture = texture;
        _this._callback = callback;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.uiCompHandler, _this);
        _this.skinName = "resource/skins/photoClip.exml";
        return _this;
    }
    PhotoClip.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
        if (instance == this.sureBtn) {
            instance.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        }
        if (instance == this.rect) {
            instance.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
            instance.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch, this);
            instance.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
            instance.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouch, this);
        }
    };
    PhotoClip.prototype.uiCompHandler = function () {
        this.mBmp = new egret.Bitmap();
        this.imageGroup.addChild(this.mBmp);
        this.mBmp.texture = this._texture;
        this.mBmp.x = this.rect.x;
        this.mBmp.y = this.rect.y;
        var rateW = 300 / this.mBmp.width;
        var rateH = 300 / this.mBmp.height;
        //建立缓冲画布
        var rt = new egret.RenderTexture();
        if (this.mBmp.width >= this.mBmp.height) {
            this.mBmp.height = this.mBmp.height * rateH;
            this.mBmp.width = this.mBmp.width * rateH;
            this.mBmp.x = this.rect.x - (this.mBmp.width - 300) / 2;
            rt.drawToTexture(this.mBmp, new egret.Rectangle((this.rect.x - this.mBmp.x), 0, 300, 300));
        }
        else {
            this.mBmp.height = this.mBmp.height * rateW;
            this.mBmp.width = this.mBmp.width * rateW;
            this.mBmp.y = this.rect.y - (this.mBmp.height - 300) / 2;
            rt.drawToTexture(this.mBmp, new egret.Rectangle(0, (this.rect.y - this.mBmp.y), 300, 300));
        }
        this._texture = rt;
    };
    PhotoClip.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    PhotoClip.prototype.onButtonClick = function (e) {
        switch (e.target) {
            case this.sureBtn:
                this.parent.removeChild(this);
                this._callback(this._texture);
                break;
        }
    };
    PhotoClip.prototype.onTouch = function (e) {
        if (e.type == egret.TouchEvent.TOUCH_BEGIN) {
            this.touchX = e.localX;
            this.touchY = e.localY;
            this.isTouch = true;
        }
        else if (e.type == egret.TouchEvent.TOUCH_MOVE) {
            if (!this.isTouch)
                return;
            this.mBmp.x += e.localX - this.touchX;
            this.mBmp.y += e.localY - this.touchY;
            this.touchX = e.localX;
            this.touchY = e.localY;
            if (this.mBmp.x >= this.rect.x)
                this.mBmp.x = this.rect.x;
            if (this.mBmp.x + this.mBmp.width <= this.rect.x + this.rect.width)
                this.mBmp.x = this.rect.x - (this.mBmp.width - this.rect.width);
            if (this.mBmp.y >= this.rect.y)
                this.mBmp.y = this.rect.y;
            if (this.mBmp.y + this.mBmp.height <= this.rect.y + this.rect.height)
                this.mBmp.y = this.rect.y - (this.mBmp.height - this.rect.height);
        }
        else {
            this.isTouch = false;
        }
    };
    return PhotoClip;
}(eui.Component));
__reflect(PhotoClip.prototype, "PhotoClip", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=PhotoClip.js.map