var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Hand = (function (_super) {
    __extends(Hand, _super);
    function Hand() {
        var _this = _super.call(this) || this;
        _this.handL = null;
        _this.handR = null;
        _this.skinName = "resource/skins/hand.exml";
        return _this;
    }
    Hand.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    Hand.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    Hand.prototype.moveAction = function (direction) {
        if (direction == "left") {
            egret.Tween.get(this.handL, { loop: false }).to({ rotation: -30 }, 150, egret.Ease.circOut);
            egret.Tween.get(this.handR, { loop: false }).to({ rotation: -30 }, 150, egret.Ease.circOut);
        }
        if (direction == "right") {
            egret.Tween.get(this.handL, { loop: false }).to({ rotation: 30 }, 150, egret.Ease.circOut);
            egret.Tween.get(this.handR, { loop: false }).to({ rotation: 30 }, 150, egret.Ease.circOut);
        }
        if (direction == "none") {
            egret.Tween.get(this.handL, { loop: false }).to({ rotation: 0 }, 100);
            egret.Tween.get(this.handR, { loop: false }).to({ rotation: 0 }, 100);
        }
    };
    return Hand;
}(eui.Component));
__reflect(Hand.prototype, "Hand", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=Hand.js.map