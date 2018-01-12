var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameLayer = (function (_super) {
    __extends(GameLayer, _super);
    function GameLayer() {
        var _this = _super.call(this) || this;
        _this.startBtn = null;
        _this.changeBtn = null;
        _this.wechatBtn = null;
        _this.giftBtn = null;
        _this.invateBtn = null;
        _this.kefuBtn = null;
        _this.payBtn = null;
        _this.taskBtn = null;
        _this.showBtn = null;
        _this.bagBtn = null;
        _this.lightGroup = null;
        _this.showGroup = null;
        _this.wawa01 = null;
        _this.wawa02 = null;
        _this.wawa03 = null;
        _this.wawa04 = null;
        _this.wawa05 = null;
        _this.wawaArray = [];
        _this.startGroup = null;
        _this.playGroup = null;
        // 方向键
        _this.leftBtn = null;
        _this.rightBtn = null;
        _this.upBtn = null;
        _this.downBtn = null;
        _this.goBtn = null;
        // 抓手
        _this.hand = null;
        _this.isTouch = false;
        _this.handSpeedX = 0;
        _this.handSpeedY = 0;
        _this.nameText = null;
        _this.pointX = 0;
        _this.pointY = 0;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.uiCompHandler, _this);
        _this.skinName = "resource/skins/gameLayer.exml";
        // 计时器
        var timer = new egret.Timer(10, 0);
        timer.addEventListener(egret.TimerEvent.TIMER, _this.timerFunc, _this);
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, _this.timerComFunc, _this);
        //开始计时
        timer.start();
        return _this;
    }
    GameLayer.prototype.uiCompHandler = function () {
        console.log(" 进来了 。。。");
        // 动画
        var mcFactory = new egret.MovieClipDataFactory(RES.getRes("lightAction_json"), RES.getRes("lightAction_png"));
        var mc1 = new egret.MovieClip(mcFactory.generateMovieClipData("buling"));
        this.lightGroup.addChild(mc1);
        mc1.gotoAndPlay("action", -1);
    };
    GameLayer.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
        if (instance == this.startBtn || instance == this.changeBtn || instance == this.wechatBtn || instance == this.giftBtn
            || instance == this.invateBtn || instance == this.kefuBtn || instance == this.payBtn || instance == this.taskBtn
            || instance == this.showBtn || instance == this.bagBtn || instance == this.goBtn) {
            instance.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        }
        if (instance == this.leftBtn || instance == this.rightBtn || instance == this.upBtn || instance == this.downBtn) {
            instance.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onButtonTouch, this);
            instance.addEventListener(egret.TouchEvent.TOUCH_END, this.onButtonTouch, this);
            instance.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onButtonTouch, this);
        }
        if (instance == this.nameText) {
            this.nameText.text = Data.weChat_name;
        }
        if (instance == this.wawa01 || instance == this.wawa02 || instance == this.wawa03 || instance == this.wawa04 || instance == this.wawa05) {
            instance.texture = RES.getRes(Data.selectData.id + "_png");
            this.wawaArray.push(instance);
            // console.log(this.getChildIndex( instance ) + " ====");
            if (instance == this.wawa04) {
            }
        }
    };
    GameLayer.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        // 抓手
        this.hand = new Hand();
        this.showGroup.addChild(this.hand);
    };
    GameLayer.prototype.timerFunc = function () {
        if (this.isTouch) {
            this.hand.x = this.hand.x + this.handSpeedX;
            this.hand.y = this.hand.y + this.handSpeedY;
            if (this.hand.x < 0)
                this.hand.x = 0;
            if (this.hand.x > this.showGroup.width - 93)
                this.hand.x = this.showGroup.width - 93;
            if (this.hand.y > 0)
                this.hand.y = 0;
            if (this.hand.y < -70)
                this.hand.y = -70;
        }
    };
    GameLayer.prototype.timerComFunc = function () {
        console.log("计时结束");
    };
    GameLayer.prototype.onButtonTouch = function (e) {
        console.log(e.type);
        if (e.type == egret.TouchEvent.TOUCH_BEGIN) {
            this.isTouch = true;
            switch (e.target) {
                case this.upBtn:
                    this.handSpeedY = -0.5;
                    break;
                case this.downBtn:
                    this.handSpeedY = 0.5;
                    break;
                case this.leftBtn:
                    this.handSpeedX = -1;
                    this.hand.moveAction("left");
                    break;
                case this.rightBtn:
                    this.handSpeedX = 1;
                    this.hand.moveAction("right");
                    break;
            }
        }
        else {
            this.isTouch = false;
            this.handSpeedX = 0;
            this.handSpeedY = 0;
            var self = this;
            egret.Tween.get(this.hand, { loop: false }).wait(150).call(function () {
                self.hand.moveAction("none");
            });
        }
    };
    GameLayer.prototype.onButtonClick = function (e) {
        switch (e.target) {
            case this.startBtn:
                this.startGroup.visible = false;
                this.playGroup.visible = true;
                // 是否抓中
                Utils.sendHttpServer("http://wawa.sz-ayx.com/api/winnig/index/userkey/" + Data.userKey + "/giftkey/" + Data.selectData.id, function (e) {
                    var request = e.currentTarget;
                    console.log("winnig data : ", request.response);
                    // 得到是否夹中结果
                    Data.cmd_winnig = JSON.parse(request.response);
                });
                break;
            case this.bagBtn:
                var bag = new Bag();
                this.addChild(bag);
                break;
            case this.payBtn:
                var charge = new Recharge();
                this.addChild(charge);
                break;
            case this.taskBtn:
                var task = new Task();
                this.addChild(task);
                break;
            case this.goBtn:
                this.hand.playAction();
                break;
            case this.changeBtn:
                AppCanvas.setGameState(2);
                break;
            case this.showBtn:
                var show = new Show();
                this.addChild(show);
                break;
        }
    };
    return GameLayer;
}(eui.Component));
__reflect(GameLayer.prototype, "GameLayer", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=GameLayer.js.map