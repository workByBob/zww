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
var Task = (function (_super) {
    __extends(Task, _super);
    function Task() {
        var _this = _super.call(this) || this;
        _this.closeBtn = null;
        _this.scrollG = null;
        _this.skinName = "resource/skins/task.exml";
        return _this;
    }
    Task.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
        if (instance == this.closeBtn) {
            instance.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        }
    };
    Task.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        for (var i = 0; i < 10; i++) {
            var cell = new TaskCell();
            cell.y = i * cell.height;
            this.scrollG.addChild(cell);
        }
    };
    Task.prototype.onButtonClick = function (e) {
        switch (e.target) {
            case this.closeBtn:
                this.parent.removeChild(this);
                break;
        }
    };
    return Task;
}(eui.Component));
__reflect(Task.prototype, "Task", ["eui.UIComponent", "egret.DisplayObject"]);
