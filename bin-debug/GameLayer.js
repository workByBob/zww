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
        _this.wawaInfoBtn = null;
        _this.noticeLabel = null;
        _this.showGroup = null;
        _this.wawa01 = null;
        _this.wawa02 = null;
        _this.wawa03 = null;
        _this.wawa04 = null;
        _this.wawa05 = null;
        _this.wawaArray = [];
        _this.startGroup = null;
        _this.prizeLabel = null;
        _this.playGroup = null;
        _this.scoreText = null;
        _this.luckyBar = null;
        _this.luckyText = null;
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
        _this.timerOut = null;
        _this.timeOut = null;
        _this.maxTime = 15;
        _this.headGroup = null;
        _this.friends = null;
        _this.onlines = null;
        _this.pointX = 0;
        _this.pointY = 0;
        // 计时器
        var timer = new egret.Timer(10, 0);
        timer.addEventListener(egret.TimerEvent.TIMER, _this.timerFunc, _this);
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, _this.timerComFunc, _this);
        //开始计时
        timer.start();
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.uiCompHandler, _this);
        _this.skinName = "resource/skins/gameLayer.exml";
        // 抓手
        _this.hand = new Hand();
        _this.showGroup.addChild(_this.hand);
        return _this;
    }
    GameLayer.prototype.uiCompHandler = function () {
        console.log(" 进来了 。。。");
        // 动画
        var mcFactory = new egret.MovieClipDataFactory(RES.getRes("lightAction_json"), RES.getRes("lightAction_png"));
        var mc1 = new egret.MovieClip(mcFactory.generateMovieClipData("buling"));
        this.lightGroup.addChild(mc1);
        mc1.gotoAndPlay("action", -1);
        // 显示单价
        this.prizeLabel.text = Data.selectData["cost"];
        // 第一次刷新总金币
        this.setGameScore(Data.cmd_userInfo["userCoin"]);
        // 第一次刷新幸运值
        this.updateLuckyValue();
        this.showNotice("欢迎来到 就爱抓娃娃 房间～");
        // 计时器
        this.timerOut = new egret.Timer(1000, 0);
        this.timerOut.addEventListener(egret.TimerEvent.TIMER, this.Func, this);
        this.timerOut.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.ComFunc, this);
        // 在线数据
        Utils.sendHttpServer("http://wawa.sz-ayx.com/api/online/index/userkey/" + Data.userKey, false, function (e) {
            WaitConnect.closeConnect();
            var request = e.currentTarget;
            console.log("online data : ", request.response);
            var data = JSON.parse(request.response);
            // 显示在线数量
            this.onlines.text = data["count"];
            // 显示在线玩家头像
            var onlineHeads = data["data"];
            console.log(onlineHeads.length + " ===");
        }, this);
    };
    GameLayer.prototype.Func = function () {
        if (this.maxTime >= 0) {
            this.maxTime -= 1;
            this.timeOut.text = this.maxTime + "";
        }
        else {
            this.timerOut.stop();
            this.goBtnDown();
        }
    };
    GameLayer.prototype.ComFunc = function () {
        this.maxTime = 15;
        console.log("计时结束");
    };
    GameLayer.prototype.showNotice = function (str) {
        this.noticeLabel.text = str;
        var width = this.noticeLabel.width;
        egret.Tween.get(this.noticeLabel, { loop: true }).to({ x: 640 }, 0).to({ x: -width }, 10000);
    };
    GameLayer.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
        if (instance == this.startBtn || instance == this.changeBtn || instance == this.wechatBtn || instance == this.giftBtn
            || instance == this.invateBtn || instance == this.kefuBtn || instance == this.payBtn || instance == this.taskBtn
            || instance == this.showBtn || instance == this.bagBtn || instance == this.goBtn || instance == this.wawaInfoBtn) {
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
        }
    };
    GameLayer.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
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
            var shadowY = this.hand.y + 534;
            // 影子和娃娃的层级显示
            if (shadowY < this.wawaArray[4].y && shadowY > this.wawaArray[0].y) {
                this.showGroup.setChildIndex(this.hand, 4);
            }
            else {
                this.showGroup.setChildIndex(this.hand, 5);
            }
            if (shadowY < this.wawaArray[0].y) {
                this.showGroup.setChildIndex(this.hand, 1);
            }
            else {
                this.showGroup.setChildIndex(this.hand, 4);
            }
            // 检测碰撞
            Data.onWawaIndex = -1;
            for (var i = 0; i < this.wawaArray.length; i++) {
                if (this.wawaArray[i].visible == true && Utils.isCheckCollide(new egret.Point(this.hand.x + 47, shadowY), new egret.Rectangle(this.wawaArray[i].x - 25, this.wawaArray[i].y - 15, 50, 30))) {
                    Data.onWawaIndex = i;
                }
            }
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
                // 判断手中金币是否够
                if (this.getGameScore() >= Data.selectData["cost"]) {
                    this.startGroup.visible = false;
                    this.playGroup.visible = true;
                    // 是否抓中
                    Utils.sendHttpServer("http://wawa.sz-ayx.com/api/usecoin/index/userkey/" + Data.userKey + "/useCoin/" + Data.selectData.cost + "/giftkey/" + Data.selectData.id, false, function (e) {
                        WaitConnect.closeConnect();
                        var request = e.currentTarget;
                        console.log("winnig data : ", request.response);
                        // 得到是否夹中结果
                        Data.cmd_winnig = JSON.parse(request.response);
                        console.log("winnig data : ", Data.cmd_winnig["msg"]);
                        // 刷新当前币数
                        this.setGameScore(Data.cmd_winnig["userCoin"]);
                        // 开始倒计时
                        this.timerOut.start();
                    }, this);
                }
                else {
                    this.addChild(new Recharge());
                }
                break;
            case this.bagBtn:
                var bag = new Bag();
                this.addChild(bag);
                break;
            case this.payBtn:
                this.addChild(new Recharge());
                break;
            case this.taskBtn:
                var task = new Task();
                this.addChild(task);
                break;
            case this.goBtn:
                this.goBtnDown();
                break;
            case this.changeBtn:
                AppCanvas.setGameState(2);
                break;
            case this.showBtn:
                var show = new Show();
                this.addChild(show);
                break;
            case this.wawaInfoBtn:
                var wawa = new Info();
                this.addChild(wawa);
                break;
        }
    };
    GameLayer.prototype.goBtnDown = function () {
        this.timerOut.stop();
        this.checkDirBtnStype(false);
        var self = this;
        var newWawa = null;
        this.hand.playAction(function (type) {
            if (type == 0) {
                egret.Tween.get(self.hand, { loop: false }).to({ x: 0, y: 0 }, 400).call(function () {
                    self.checkDirBtnStype(true);
                    self.startGroup.visible = true;
                    self.playGroup.visible = false;
                    if (Data.cmd_winnig["usestate"] == 1 && newWawa != null) {
                        console.log("提示抓到娃娃了");
                        egret.Tween.get(newWawa, { loop: false }).to({ y: newWawa.y + 225, alpha: 0 }, 200).call(function () {
                            newWawa.parent.removeChild(newWawa);
                            newWawa = null;
                        });
                    }
                    // 每抓一次结束更新一次幸运值
                    self.updateLuckyValue();
                });
            }
            else if (type == 2) {
                var wawaNode = self.wawaArray[Data.onWawaIndex];
                egret.Tween.get(wawaNode, { loop: false }).to({ y: wawaNode.y - 20 }, 100).to({ y: wawaNode.y }, 100);
            }
            else if (type == 1) {
                self.wawaArray[Data.onWawaIndex].visible = false;
                if (newWawa == null) {
                    newWawa = new eui.Image(RES.getRes(Data.selectData.id + "_png"));
                    newWawa.y = self.hand.shadow.y;
                    newWawa.x = -20;
                    newWawa.scaleX = 0.4;
                    newWawa.scaleY = 0.4;
                    newWawa.anchorOffsetX = newWawa.width / 2;
                    newWawa.anchorOffsetY = 280;
                    self.hand.addChild(newWawa);
                    egret.Tween.get(newWawa, { loop: false }).to({ y: newWawa.y - 225 }, 800);
                }
            }
        });
    };
    GameLayer.prototype.checkDirBtnStype = function (is) {
        this.upBtn.touchEnabled = is;
        this.downBtn.touchEnabled = is;
        this.leftBtn.touchEnabled = is;
        this.rightBtn.touchEnabled = is;
        this.goBtn.touchEnabled = is;
    };
    // 刷新总金币 
    GameLayer.prototype.setGameScore = function (score) {
        Data.cmd_userInfo["userCoin"] = score;
        this.scoreText.text = score;
    };
    // 获得金币
    GameLayer.prototype.getGameScore = function () {
        return Data.cmd_userInfo["userCoin"];
    };
    GameLayer.prototype.updateLuckyValue = function () {
        Utils.sendHttpServer("http://wawa.sz-ayx.com/api/Winnig/luck/userkey/" + Data.userKey, false, function (e) {
            WaitConnect.closeConnect();
            var request = e.currentTarget;
            console.log("luck data : ", request.response);
            // luck返回信息
            var data = JSON.parse(request.response);
            // 成功
            if (data["state"] == "1") {
                var luckValue = JSON.parse(data["data"])["luck"];
                // bar
                egret.Tween.get(this.luckyBar, { loop: false }).to({ width: 350 / 100 * luckValue }, 500);
                // Label
                this.luckyText.text = "幸运值：" + luckValue + "/100";
            }
        }, this);
    };
    return GameLayer;
}(eui.Component));
__reflect(GameLayer.prototype, "GameLayer", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=GameLayer.js.map