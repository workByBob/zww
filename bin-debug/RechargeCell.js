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
var RechargeCell = (function (_super) {
    __extends(RechargeCell, _super);
    function RechargeCell(data) {
        var _this = _super.call(this) || this;
        _this.coinsText = null;
        _this.payText = null;
        _this.buyBtn = null;
        _this._data = null;
        _this._data = data;
        _this.skinName = "resource/skins/rechargeCell.exml";
        return _this;
    }
    RechargeCell.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
        if (instance == this.buyBtn) {
            instance.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        }
        if (instance == this.coinsText) {
            this.coinsText.text = this._data.contensdesc; // 描述多少金币
        }
        if (instance == this.payText) {
            this.payText.text = this._data.name; // 价值多少元
            this.payText.anchorOffsetX = this.payText.width / 2;
            this.payText.x = this.buyBtn.x;
        }
    };
    RechargeCell.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    RechargeCell.prototype.onButtonClick = function (e) {
        switch (e.target) {
            case this.buyBtn:
                break;
        }
    };
    return RechargeCell;
}(eui.Component));
__reflect(RechargeCell.prototype, "RechargeCell", ["eui.UIComponent", "egret.DisplayObject"]);
