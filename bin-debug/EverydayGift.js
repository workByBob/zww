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
var EverydayGift = (function (_super) {
    __extends(EverydayGift, _super);
    function EverydayGift() {
        var _this = _super.call(this) || this;
        _this.closeBtn = null;
        _this.skinName = "resource/skins/loginGift.exml";
        return _this;
    }
    EverydayGift.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
        if (instance == this.closeBtn) {
            instance.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        }
    };
    EverydayGift.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    EverydayGift.prototype.onButtonClick = function (e) {
        switch (e.target) {
            case this.closeBtn:
                this.parent.removeChild(this);
                break;
        }
    };
    return EverydayGift;
}(eui.Component));
__reflect(EverydayGift.prototype, "EverydayGift", ["eui.UIComponent", "egret.DisplayObject"]);
