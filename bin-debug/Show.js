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
var Show = (function (_super) {
    __extends(Show, _super);
    function Show() {
        var _this = _super.call(this) || this;
        _this.closeBtn = null;
        _this.editText = null;
        _this.skinName = "resource/skins/show.exml";
        return _this;
    }
    Show.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
        if (instance == this.closeBtn) {
            instance.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        }
        if (instance == this.editText) {
            this.editText.width = 320;
            this.editText.height = 140;
            this.editText.text = "请输入不少于30字的玩家秀内容：";
            this.editText.wordWrap = true;
        }
    };
    Show.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    Show.prototype.onButtonClick = function (e) {
        switch (e.target) {
            case this.closeBtn:
                this.parent.removeChild(this);
                break;
        }
    };
    return Show;
}(eui.Component));
__reflect(Show.prototype, "Show", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=Show.js.map