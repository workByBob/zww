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
        // var mydisp:any = this.wawa01;
        // var rt: egret.RenderTexture = new egret.RenderTexture();   //建立缓冲画布
        // rt.drawToTexture(mydisp, new egret.Rectangle(0, 0, mydisp.width, mydisp.height));  //将对象画到缓冲画布上（可指定画对象的某个区域，或画整个）
        // var imageBase64:string = rt.toDataURL("image/png");  //转换为图片base64。  （对的你没看错！就这么3行。。。。）
        // alert(imageBase64); 
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
                this.checkDirBtnStype(false);
                var self = this;
                var newWawa = null;
                this.hand.playAction(function (type) {
                    if (type == 0) {
                        egret.Tween.get(self.hand, { loop: false }).to({ x: 0, y: 0 }, 400).call(function () {
                            self.checkDirBtnStype(true);
                            self.startGroup.visible = true;
                            self.playGroup.visible = false;
                            if (Data.cmd_winnig["state"] == 1 && newWawa != null) {
                                console.log("提示抓到娃娃了");
                                egret.Tween.get(newWawa, { loop: false }).to({ y: newWawa.y + 225, alpha: 0 }, 200).call(function () {
                                    newWawa.parent.removeChild(newWawa);
                                    newWawa = null;
                                });
                            }
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
    GameLayer.prototype.checkDirBtnStype = function (is) {
        this.upBtn.touchEnabled = is;
        this.downBtn.touchEnabled = is;
        this.leftBtn.touchEnabled = is;
        this.rightBtn.touchEnabled = is;
        this.goBtn.touchEnabled = is;
    };
    return GameLayer;
}(eui.Component));
__reflect(GameLayer.prototype, "GameLayer", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=GameLayer.js.map