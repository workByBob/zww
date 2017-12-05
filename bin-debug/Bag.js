var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Bag = (function (_super) {
    __extends(Bag, _super);
    function Bag() {
        var _this = _super.call(this) || this;
        _this.closeBtn = null;
        _this.tqCheck = null;
        _this.yyCheck = null;
        _this.scrollG = null;
        _this.skinName = "resource/skins/bag.exml";
        return _this;
    }
    Bag.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
        if (instance == this.closeBtn) {
            instance.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        }
        if (instance == this.tqCheck || instance == this.yyCheck) {
            instance.addEventListener(eui.UIEvent.CHANGE, this.onCheckBoxClick, this);
        }
    };
    Bag.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        // 默认打开提取按钮
        this.checkBoxByTarget(this.tqCheck);
    };
    Bag.prototype.onCheckBoxClick = function (e) {
        this.tqCheck.selected = false;
        this.yyCheck.selected = false;
        this.checkBoxByTarget(e.target);
    };
    Bag.prototype.checkBoxByTarget = function (target) {
        switch (target) {
            case this.tqCheck:
                this.tqCheck.selected = true;
                break;
            case this.yyCheck:
                this.yyCheck.selected = true;
                break;
        }
    };
    Bag.prototype.onButtonClick = function (e) {
        switch (e.target) {
            case this.closeBtn:
                this.parent.removeChild(this);
                break;
        }
    };
    return Bag;
}(eui.Component));
__reflect(Bag.prototype, "Bag", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=Bag.js.map