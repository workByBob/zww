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
var ChoiceWWCell = (function (_super) {
    __extends(ChoiceWWCell, _super);
    function ChoiceWWCell(cellData) {
        var _this = _super.call(this) || this;
        _this.choiceBtn = null;
        _this.idLabel = null;
        _this.nameLabel = null;
        _this.colorLabel = null;
        _this.sizeLabel = null;
        _this.costLabel = null;
        _this.wawaImg = null;
        _this._data = null;
        _this._data = cellData;
        _this.skinName = "resource/skins/choiceWWCell.exml";
        return _this;
    }
    ChoiceWWCell.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
        if (instance == this.choiceBtn) {
            instance.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        }
        if (instance == this.idLabel) {
            instance.text = this._data.id;
        }
        if (instance == this.nameLabel) {
            instance.text = this._data.name;
        }
        if (instance == this.colorLabel) {
            instance.text = this._data.color;
        }
        if (instance == this.sizeLabel) {
            instance.text = this._data.size;
        }
        if (instance == this.costLabel) {
            instance.text = this._data.cost;
        }
        if (instance == this.wawaImg) {
            instance.texture = RES.getRes(this._data.id + "_png");
        }
    };
    ChoiceWWCell.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    ChoiceWWCell.prototype.onButtonClick = function (e) {
        switch (e.target) {
            case this.choiceBtn:
                Data.selectData = this._data; // 选中的娃娃数据
                AppCanvas.setGameState(3); // 开始游戏
                var choice = AppCanvas.getChildByName("choice");
                if (choice) {
                    egret.Tween.get(choice, { loop: false }).to({ x: -choice.width }, 300).call(function () {
                        AppCanvas.removeChild(choice);
                    });
                }
                break;
        }
    };
    return ChoiceWWCell;
}(eui.Component));
__reflect(ChoiceWWCell.prototype, "ChoiceWWCell", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=ChoiceWWCell.js.map