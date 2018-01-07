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
var ChoiceWW = (function (_super) {
    __extends(ChoiceWW, _super);
    function ChoiceWW() {
        var _this = _super.call(this) || this;
        _this.scrollG = null;
        _this.scroller = null;
        _this.rdCheck = null;
        _this.jbCheck = null;
        _this.topBtn = null;
        _this.skinName = "resource/skins/choiceWW.exml";
        return _this;
    }
    ChoiceWW.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
        if (instance == this.rdCheck || instance == this.jbCheck) {
            instance.addEventListener(eui.UIEvent.CHANGE, this.onCheckBoxClick, this);
        }
        if (instance == this.topBtn) {
            instance.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        }
        if (instance == this.scroller) {
            instance.addEventListener(eui.UIEvent.CHANGE_END, this.onScroll, this);
            instance.addEventListener(eui.UIEvent.CHANGE_START, this.onScroll, this);
        }
    };
    ChoiceWW.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        // 默认热度
        this.checkBoxByTarget(this.rdCheck);
    };
    ChoiceWW.prototype.updateScroll = function () {
        this.scrollG.removeChildren();
        this.scroller.stopAnimation();
        this.scroller.viewport.scrollV = 0;
        this.topBtn.visible = false;
        for (var i = 0; i < 10; i++) {
            var cell = new ChoiceWWCell();
            cell.y = i * cell.height;
            this.scrollG.addChild(cell);
        }
    };
    ChoiceWW.prototype.onCheckBoxClick = function (e) {
        this.rdCheck.selected = false;
        this.jbCheck.selected = false;
        this.checkBoxByTarget(e.target);
    };
    ChoiceWW.prototype.checkBoxByTarget = function (target) {
        switch (target) {
            case this.rdCheck:
                this.rdCheck.selected = true;
                this.updateScroll();
                break;
            case this.jbCheck:
                this.jbCheck.selected = true;
                this.updateScroll();
                break;
        }
    };
    ChoiceWW.prototype.onButtonClick = function (e) {
        switch (e.target) {
            case this.topBtn:
                this.scroller.stopAnimation();
                this.scroller.viewport.scrollV = 0;
                var self = this;
                egret.Tween.get(this.topBtn, { loop: false }).to({ y: 960 + this.topBtn.height }, 500).call(function () {
                    self.topBtn.visible = false;
                });
                break;
        }
    };
    ChoiceWW.prototype.onScroll = function (e) {
        switch (e.type) {
            case "changeStart":
                var self = this;
                egret.Tween.get(this.topBtn, { loop: false }).to({ y: 960 + this.topBtn.height }, 500).call(function () {
                    self.topBtn.visible = false;
                });
                break;
            case "changeEnd":
                if (this.scroller.viewport.scrollV > 0) {
                    this.topBtn.visible = true;
                    egret.Tween.get(this.topBtn, { loop: false }).to({ y: 960 - this.topBtn.height * 2 }, 500);
                }
                break;
        }
    };
    return ChoiceWW;
}(eui.Component));
__reflect(ChoiceWW.prototype, "ChoiceWW", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=ChoiceWW.js.map