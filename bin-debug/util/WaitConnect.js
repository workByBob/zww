var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var WaitConnect = (function (_super) {
    __extends(WaitConnect, _super);
    function WaitConnect() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.uiCompHandler, _this);
        _this.skinName = "resource/skins/waitConnect.exml";
        return _this;
    }
    WaitConnect.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    WaitConnect.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    WaitConnect.prototype.uiCompHandler = function () {
        this.visible = false;
        var self = this;
        egret.Tween.get(this, { loop: false }).wait(100).call(function () {
            self.visible = true;
        });
    };
    WaitConnect.openConnect = function () {
        if (this.wait == null) {
            this.wait = new WaitConnect();
            AppCanvas.addChild(this.wait);
        }
    };
    WaitConnect.closeConnect = function () {
        if (this.wait != null) {
            this.wait.parent.removeChild(this.wait);
            this.wait = null;
        }
    };
    return WaitConnect;
}(eui.Component));
WaitConnect.wait = null;
__reflect(WaitConnect.prototype, "WaitConnect", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=WaitConnect.js.map