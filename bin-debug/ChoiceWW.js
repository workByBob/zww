var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
        // 获取娃娃信息
        Data.wawaJson = RES.getRes("wwInfo_json");
        // 默认热度
        this.checkBoxByTarget(this.rdCheck);
    };
    ChoiceWW.prototype.updateScroll = function (type) {
        this.scrollG.removeChildren();
        this.scroller.stopAnimation();
        this.scroller.viewport.scrollV = 0;
        this.topBtn.visible = false;
        var wawaArray = new eui.ArrayCollection(Data.wawaJson["wawa"]);
        var wawaNum = wawaArray.length;
        var nWawaArray = new eui.ArrayCollection();
        if (type == 0) {
            for (var i = 0; i < wawaNum; i++) {
                if (i == 0) {
                    nWawaArray.addItem(wawaArray.getItemAt(i));
                }
                if (i + 1 < wawaNum) {
                    for (var j = 0; j < nWawaArray.length; j++) {
                        if (wawaArray.getItemAt(i + 1).hot >= nWawaArray.getItemAt(j).hot) {
                            nWawaArray.addItemAt(wawaArray.getItemAt(i + 1), j); //添加的指定的索引位置
                            break;
                        }
                        else {
                            nWawaArray.addItemAt(wawaArray.getItemAt(i + 1), nWawaArray.length); //添加的指定的索引位置
                            break;
                        }
                    }
                }
            }
        }
        else if (type == 1) {
            for (var i = 0; i < wawaNum; i++) {
                if (i == 0) {
                    nWawaArray.addItem(wawaArray.getItemAt(i));
                }
                if (i + 1 < wawaNum) {
                    for (var j = 0; j < nWawaArray.length; j++) {
                        if (wawaArray.getItemAt(i + 1).cost >= nWawaArray.getItemAt(j).cost) {
                            nWawaArray.addItemAt(wawaArray.getItemAt(i + 1), j); //添加的指定的索引位置
                            break;
                        }
                        else {
                            nWawaArray.addItemAt(wawaArray.getItemAt(i + 1), nWawaArray.length); //添加的指定的索引位置
                            break;
                        }
                    }
                }
            }
        }
        for (var i = 0; i < nWawaArray.length; i++) {
            var cell = new ChoiceWWCell(nWawaArray.getItemAt(i));
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
                this.updateScroll(0);
                break;
            case this.jbCheck:
                this.jbCheck.selected = true;
                this.updateScroll(1);
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