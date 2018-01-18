var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Info = (function (_super) {
    __extends(Info, _super);
    function Info() {
        var _this = _super.call(this) || this;
        _this.closeBtn = null;
        _this.zqCheck = null;
        _this.wwCheck = null;
        _this.scrollG = null;
        _this.wawaGroup = null;
        _this.wawa = null;
        _this.idText = null;
        _this.nameText = null;
        _this.colorText = null;
        _this.sizeText = null;
        _this.weightText = null;
        _this.skinName = "resource/skins/info.exml";
        return _this;
    }
    Info.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
        if (instance == this.closeBtn) {
            instance.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        }
        if (instance == this.zqCheck || instance == this.wwCheck) {
            instance.addEventListener(eui.UIEvent.CHANGE, this.onCheckBoxClick, this);
        }
    };
    Info.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        // 默认打开提取按钮
        this.checkBoxByTarget(this.zqCheck);
    };
    Info.prototype.onCheckBoxClick = function (e) {
        this.zqCheck.selected = false;
        this.wwCheck.selected = false;
        this.checkBoxByTarget(e.target);
    };
    Info.prototype.checkBoxByTarget = function (target) {
        this.wawaGroup.visible = false;
        switch (target) {
            case this.zqCheck:
                this.zqCheck.selected = true;
                break;
            case this.wwCheck:
                this.wwCheck.selected = true;
                this.wawaGroup.visible = true;
                // wawa
                this.wawa.texture = RES.getRes(Data.selectData.id + "_png");
                this.idText.text = Data.selectData["id"];
                this.nameText.text = Data.selectData["name"];
                this.colorText.text = Data.selectData["color"];
                this.sizeText.text = Data.selectData["size"];
                this.weightText.text = Data.selectData["weight"];
                break;
        }
    };
    Info.prototype.onButtonClick = function (e) {
        switch (e.target) {
            case this.closeBtn:
                this.parent.removeChild(this);
                break;
        }
    };
    return Info;
}(eui.Component));
__reflect(Info.prototype, "Info", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=Info.js.map