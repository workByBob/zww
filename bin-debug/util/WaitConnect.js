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
        var self = this;
        egret.Tween.get(this, { loop: false }).wait(20000).call(function () {
            WaitConnect.closeConnect();
        });
        // 动画
        var mcFactory = new egret.MovieClipDataFactory(RES.getRes("wait_json"), RES.getRes("wait_png"));
        var mc1 = new egret.MovieClip(mcFactory.generateMovieClipData("wait"));
        mc1.x = AppCanvas.getStage().stageWidth / 2 - mc1.width / 2;
        mc1.y = AppCanvas.getStage().stageHeight / 2 - mc1.height / 2;
        this.addChild(mc1);
        mc1.gotoAndPlay("connnect", -1);
    };
    WaitConnect.openConnect = function () {
        if (this.wait == null) {
            this.wait = new WaitConnect();
            AppCanvas.addChild(this.wait);
        }
    };
    WaitConnect.closeConnect = function (waitTime) {
        if (waitTime === void 0) { waitTime = 0; }
        var self = this;
        egret.Tween.get(this, { loop: false }).wait(waitTime).call(function () {
            if (self.wait != null) {
                self.wait.parent.removeChild(self.wait);
                self.wait = null;
            }
        });
    };
    WaitConnect.wait = null;
    return WaitConnect;
}(eui.Component));
__reflect(WaitConnect.prototype, "WaitConnect", ["eui.UIComponent", "egret.DisplayObject"]);
