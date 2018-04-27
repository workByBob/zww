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
var Recharge = (function (_super) {
    __extends(Recharge, _super);
    function Recharge() {
        var _this = _super.call(this) || this;
        _this.closeBtn = null;
        _this.scrollG = null;
        _this.skinName = "resource/skins/recharge.exml";
        return _this;
    }
    Recharge.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
        if (instance == this.closeBtn) {
            instance.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        }
    };
    Recharge.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        Utils.sendHttpServer("http://wawa.sz-ayx.com/api/Buycoin/pull/userkey/" + Data.userKey, true, function (e) {
            WaitConnect.closeConnect();
            var request = e.currentTarget;
            // console.log("luck data : ",request.response);
            // 充值列表
            var info = JSON.parse(request.response);
            if (info["state"] == "1") {
                var data = eval(info["data"]);
                console.log(data);
                for (var i = 0; i < data.length; i++) {
                    var cell = new RechargeCell(data[i]);
                    cell.y = i * cell.height;
                    this.scrollG.addChild(cell);
                }
            }
        }, this);
    };
    Recharge.prototype.onButtonClick = function (e) {
        switch (e.target) {
            case this.closeBtn:
                this.parent.removeChild(this);
                break;
        }
    };
    return Recharge;
}(eui.Component));
__reflect(Recharge.prototype, "Recharge", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=Recharge.js.map