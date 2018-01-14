var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Show = (function (_super) {
    __extends(Show, _super);
    function Show() {
        var _this = _super.call(this) || this;
        _this.closeBtn = null;
        _this.editText = null;
        _this.textInput = null;
        _this.ciBtn = null;
        _this.skinName = "resource/skins/show.exml";
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.uiCompHandler, _this);
        return _this;
    }
    Show.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
        if (instance == this.closeBtn || instance == this.ciBtn) {
            instance.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        }
        if (instance == this.editText) {
        }
        if (instance == this.textInput) {
        }
    };
    Show.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    Show.prototype.uiCompHandler = function () {
        this.textInput.textDisplay.multiline = true;
    };
    Show.prototype.onButtonClick = function (e) {
        switch (e.target) {
            case this.closeBtn:
                this.parent.removeChild(this);
                break;
            case this.ciBtn:
                console.log(" =======");
                AppCanvas.getChooseImage();
                break;
        }
    };
    return Show;
}(eui.Component));
__reflect(Show.prototype, "Show", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=Show.js.map