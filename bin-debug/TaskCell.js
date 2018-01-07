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
var TaskCell = (function (_super) {
    __extends(TaskCell, _super);
    function TaskCell() {
        var _this = _super.call(this) || this;
        _this.receiveBtn = null;
        _this.taskDesc = null;
        _this.taskReward = null;
        _this.taskType = null;
        _this.skinName = "resource/skins/taskCell.exml";
        return _this;
    }
    TaskCell.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
        if (instance == this.receiveBtn) {
            this.receiveBtn.visible = false;
            instance.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        }
        if (instance == this.taskDesc) {
            this.taskDesc.text = "抓2次娃娃（0/2）";
        }
        if (instance == this.taskReward) {
            this.taskReward.text = "+20";
        }
        if (instance == this.taskType) {
            this.taskType.text = "未达成";
        }
    };
    TaskCell.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    TaskCell.prototype.onButtonClick = function (e) {
        switch (e.target) {
            case this.receiveBtn:
                break;
        }
    };
    return TaskCell;
}(eui.Component));
__reflect(TaskCell.prototype, "TaskCell", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=TaskCell.js.map